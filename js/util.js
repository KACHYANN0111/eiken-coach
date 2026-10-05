/* 共通ユーティリティ */
const U = {
  esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  $(sel, root = document) { return root.querySelector(sel); },
  $$(sel, root = document) { return [...root.querySelectorAll(sel)]; },
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  pick(arr, n) { return U.shuffle(arr).slice(0, n); },
  // ローカル日付 YYYY-MM-DD
  dateKey(d = new Date()) {
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  },
  today() { return U.dateKey(); },
  daysBetween(a, b) {
    const da = new Date(a + 'T00:00:00'), db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
  },
  addDays(key, n) {
    const d = new Date(key + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return U.dateKey(d);
  },
  pct(c, t) { return t ? Math.round((c / t) * 100) : 0; },
  fmtMin(sec) {
    const m = Math.floor(sec / 60);
    return m >= 60 ? `${Math.floor(m / 60)}時間${m % 60}分` : `${m}分`;
  },
  countWords(text) {
    const m = String(text).trim().match(/[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g);
    return m ? m.length : 0;
  },
  toast(msg) {
    let t = U.$('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(U._tt);
    U._tt = setTimeout(() => t.classList.remove('show'), 2200);
  },
  // 4択の選択肢ラベル
  label(i) { return 'ABCD'[i]; }
};

/* 音声プロバイダ：
 * 1) データに audio(URL) があれば音声ファイルを再生
 * 2) なければブラウザ内蔵の読み上げ（Web Speech API、外部通信なし）
 * 3) どちらも使えない場合はプレースホルダー表示
 * 将来 AI 音声を使う場合は Audio.provider を差し替える */
const Speech = {
  supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  _voices() {
    return this.supported ? speechSynthesis.getVoices().filter(v => /^en(-|_)/i.test(v.lang)) : [];
  },
  stop() {
    if (this.supported) speechSynthesis.cancel();
    if (this._audio) { this._audio.pause(); this._audio = null; }
  },
  // lines: [{sp:'W'|'M'|'N', t:'...'}] or string
  play(lines, { rate = 0.95, audio = null, onend = null } = {}) {
    this.stop();
    if (audio) {
      this._audio = new Audio(audio);
      this._audio.onended = onend;
      this._audio.play().catch(() => U.toast('音声ファイルを再生できませんでした'));
      return true;
    }
    if (!this.supported) { U.toast('このブラウザは読み上げに対応していません（スクリプトを表示して練習してください）'); return false; }
    const list = typeof lines === 'string' ? [{ sp: 'N', t: lines }] : lines;
    const voices = this._voices();
    const female = voices.find(v => /samantha|female|zira|karen|victoria|susan|aria|jenny/i.test(v.name)) || voices[0];
    const male = voices.find(v => /daniel|alex|male|david|fred|guy|tom|aaron/i.test(v.name) && v !== female) || voices[1] || voices[0];
    list.forEach((l, i) => {
      const u = new SpeechSynthesisUtterance(l.t);
      u.lang = 'en-US';
      u.rate = rate;
      const v = l.sp === 'M' ? male : female;
      if (v) u.voice = v;
      if (l.sp === 'M' && (!v || v === female)) u.pitch = 0.75;
      if (i === list.length - 1 && onend) u.onend = onend;
      speechSynthesis.speak(u);
    });
    return true;
  }
};
if (Speech.supported) speechSynthesis.onvoiceschanged = () => {};
