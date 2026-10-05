/* =========================================================
 * 効果音・キャラクターボイス
 * - 効果音：Web Audio API でその場で合成（音声ファイル不要・オフライン可）
 * - キャラクターの声：端末内蔵の日本語読み上げ（声の高さ・速さでキャラを表現）
 * - 吹き出し：音を消していてもキャラクターの反応が見える
 * 将来、録音した音声やAI音声に差し替える場合は CHARACTERS に audio を追加して say() を拡張する。
 * ========================================================= */
const CHARACTERS = {
  mirai: {
    name: 'ミライ', desc: '元気な女の子', icon: '👧', pitch: 1.55, rate: 1.12,
    correct: ['正解！', 'やったね！', 'すごい！', 'ばっちり！', 'その調子！'],
    wrong: ['残念…', 'おしい！', 'ドンマイ！', '次はいけるよ！'],
    combo: n => `${n}問連続正解！すごすぎ！`,
    great: 'すばらしい！完ぺきだね！', good: 'よくできました！', ok: 'おつかれさま！復習しようね！', saved: '保存したよ！がんばったね！'
  },
  neko: {
    name: 'ねこ先生', desc: 'のんびりした猫', icon: '🐱', pitch: 1.95, rate: 1.0,
    correct: ['正解だにゃ！', 'やるにゃ！', 'さすがだにゃ！', 'えらいにゃ！'],
    wrong: ['残念だにゃ…', 'おしいにゃ！', 'ドンマイだにゃ！'],
    combo: n => `${n}問連続だにゃ！天才だにゃ！`,
    great: '完ぺきだにゃ！', good: 'よくできたにゃ！', ok: 'おつかれにゃ。復習するにゃ！', saved: '保存したにゃ！'
  },
  robo: {
    name: 'ロボ', desc: 'まじめなロボット', icon: '🤖', pitch: 0.45, rate: 0.9,
    correct: ['セイカイ。', 'カンペキ デス。', 'スバラシイ。'],
    wrong: ['ザンネン。', 'エラー ハッセイ。', 'モウイチド。'],
    combo: n => `${n}モン レンゾク セイカイ。ノウリョク ジョウショウチュウ。`,
    great: 'ゼンモン セイカイ。ミッション カンリョウ。', good: 'ヨク デキマシタ。', ok: 'オツカレサマ デス。フクシュウ ヲ スイショウ。', saved: 'ホゾン カンリョウ。'
  },
  sensei: {
    name: '先生', desc: '落ち着いた先生', icon: '👩‍🏫', pitch: 1.05, rate: 1.0,
    correct: ['正解です。', 'よくできました。', 'いいですね。'],
    wrong: ['残念。', '惜しいですね。', 'もう一度確認しましょう。'],
    combo: n => `${n}問連続正解です。素晴らしいですね。`,
    great: '全問正解です。素晴らしい！', good: 'よくできました。', ok: 'おつかれさまでした。間違えたところを復習しましょう。', saved: '保存しました。よく頑張りましたね。'
  }
};

const Sound = {
  ctx: null, master: null, combo: 0,
  opt(k) { return Store.setting(k); },
  enabled(k) { return !this.opt('muted') && this.opt(k) !== false; },
  char() { return CHARACTERS[this.opt('character')] || CHARACTERS.mirai; },

  // iPhone では最初のタップで音声を有効にする必要がある
  unlock() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) { /* 音が出せない環境では何もしない */ }
  },

  tone(freq, start, dur, { type = 'triangle', gain = 0.35, slide = 0 } = {}) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + start;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.linearRampToValueAtTime(freq + slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.02);
  },

  play(name) {
    if (!this.enabled('sfx')) return;
    this.unlock();
    if (!this.ctx) return;
    this.master.gain.value = (this.opt('volume') ?? 0.8) * 0.9;
    switch (name) {
      case 'correct':   // ピンポーン
        this.tone(1318.5, 0, 0.18, { gain: 0.4 });
        this.tone(1046.5, 0.16, 0.55, { gain: 0.4 });
        break;
      case 'wrong':     // ブブー
        this.tone(170, 0, 0.2, { type: 'square', gain: 0.18 });
        this.tone(140, 0.24, 0.42, { type: 'square', gain: 0.18, slide: -25 });
        break;
      case 'combo':     // キラキラ
        [1046.5, 1318.5, 1568, 2093].forEach((f, i) => this.tone(f, 0.55 + i * 0.07, 0.25, { type: 'sine', gain: 0.22 }));
        break;
      case 'fanfare':   // ファンファーレ
        [523.3, 659.3, 784, 1046.5].forEach((f, i) => this.tone(f, i * 0.12, 0.22, { gain: 0.3 }));
        [523.3, 659.3, 784].forEach(f => this.tone(f, 0.5, 0.9, { type: 'sine', gain: 0.18 }));
        this.tone(1046.5, 0.5, 0.9, { gain: 0.28 });
        break;
      case 'finish':    // おつかれさま
        [659.3, 784, 880].forEach((f, i) => this.tone(f, i * 0.14, 0.3, { type: 'sine', gain: 0.25 }));
        break;
      case 'save':      // ポン
        this.tone(880, 0, 0.12, { type: 'sine', gain: 0.3 });
        this.tone(1318.5, 0.08, 0.25, { type: 'sine', gain: 0.25 });
        break;
    }
  },

  // キャラクターの声（端末内蔵の日本語音声）
  voice() {
    if (!('speechSynthesis' in window)) return null;
    const vs = speechSynthesis.getVoices().filter(v => /^ja(-|_|$)/i.test(v.lang));
    return vs.find(v => /kyoko|o-ren|nanami|haruka|sayaka/i.test(v.name)) || vs[0] || null;
  },
  say(text, delay = 0) {
    if (!this.enabled('voice') || !('speechSynthesis' in window)) return;
    const c = this.char();
    setTimeout(() => {
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ja-JP';
        const v = this.voice(); if (v) u.voice = v;
        u.pitch = Math.min(2, Math.max(0, c.pitch));
        u.rate = c.rate;
        u.volume = Math.min(1, (this.opt('volume') ?? 0.8) + 0.2);
        speechSynthesis.speak(u);
      } catch (e) {}
    }, delay);
  },

  // 吹き出し
  bubble(text, kind) {
    if (this.opt('mascot') === false) return;
    let el = document.getElementById('mascot');
    if (!el) { el = document.createElement('div'); el.id = 'mascot'; el.setAttribute('aria-live', 'polite'); document.body.appendChild(el); }
    const c = this.char();
    el.className = 'mascot ' + kind;
    el.innerHTML = `<span class="m-face">${c.icon}</span><span class="m-text">${U.esc(text)}</span>`;
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(this._bt);
    this._bt = setTimeout(() => el.classList.remove('show'), 1900);
  },

  // 1問ごとの反応
  answer(correct) {
    const c = this.char();
    const pick = a => a[Math.floor(Math.random() * a.length)];
    if (correct) {
      this.combo++;
      const isCombo = [3, 5, 10, 15, 20, 30].includes(this.combo);
      const line = isCombo ? c.combo(this.combo) : pick(c.correct);
      this.play('correct');
      if (isCombo) this.play('combo');
      this.say(line, 380);
      this.bubble(line, 'ok');
    } else {
      this.combo = 0;
      const line = pick(c.wrong);
      this.play('wrong');
      this.say(line, 420);
      this.bubble(line, 'ng');
    }
  },

  // 長文など複数問をまとめて答え合わせしたとき
  batch(score, total) {
    const c = this.char();
    const all = score === total;
    this.play(all ? 'correct' : score >= total / 2 ? 'finish' : 'wrong');
    const line = all ? c.great : `${total}問中${score}問正解！`;
    this.say(line, 400);
    this.bubble(line, all ? 'ok' : score >= total / 2 ? 'mid' : 'ng');
  },

  // テストの結果画面
  finish(pct) {
    const c = this.char();
    const line = pct >= 80 ? c.great : pct >= 60 ? c.good : c.ok;
    this.play(pct >= 80 ? 'fanfare' : 'finish');
    this.say(line, 500);
    this.bubble(line, pct >= 80 ? 'ok' : 'mid');
    this.combo = 0;
  },

  saved() {
    const line = this.char().saved;
    this.play('save');
    this.say(line, 250);
    this.bubble(line, 'ok');
  },

  // 設定画面の「試しに聞く」
  preview(id) {
    const prev = Store.data.settings.character;
    Store.data.settings.character = id;
    this.play('correct');
    this.say(CHARACTERS[id].correct[0], 380);
    this.bubble(CHARACTERS[id].correct[0], 'ok');
    Store.data.settings.character = prev;
  }
};

['pointerdown', 'touchstart', 'keydown'].forEach(e => addEventListener(e, () => Sound.unlock(), { once: true, passive: true }));
if ('speechSynthesis' in window) speechSynthesis.getVoices();
