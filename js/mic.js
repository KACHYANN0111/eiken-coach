/* =========================================================
 * マイク機能（スピーキング練習用）
 * - Mic：ブラウザ内蔵の音声認識（Web Speech API）で話した英語を文字にする
 *   ※ 認識処理はブラウザ（Apple / Google など）が行う。APIキー等は不要
 * - VoiceRecorder：自分の声を録音して再生（端末内だけで完結）
 * - compareSpeech：お手本と話した内容を単語単位で比べて採点
 * 使えない環境（未対応ブラウザ・埋め込み表示・マイク拒否）では自己判定モードにする。
 * ========================================================= */
const Mic = {
  Rec: window.SpeechRecognition || window.webkitSpeechRecognition || null,
  supported() { return !!this.Rec && !(window.PWA && PWA.embedded); },
  current: null,      // 聞いている間だけ値が入る（「■ 止める」の判定用）
  session: null,
  fails: 0,           // 続けて失敗した回数（成功すると 0 に戻す）
  SILENCE_MS: 2500,   // 文字が増えなくなってからこの時間で区切る（iPhone は自動で確定しないことがある）
  WAIT_MS: 10000,     // 何も聞こえないまま、この時間で終える
  MAX_MS: 30000,      // 1回に聞く最長時間

  // 1回話した内容を認識する。onresult(候補文字列の配列, 確定したか)
  // ・確定の結果は1回だけ返す。確定のあとに来るエラー（効果音などで中断された等）は無視する
  // ・確定前に止まったときは、そこまで聞こえた文で確定する
  // ・押した直後の失敗（読み上げ音声からの切り替えなど）は一度だけ自動でやり直す
  listen({ lang = 'en-US', onresult, onend, onerror } = {}) {
    if (!this.supported()) { if (onerror) onerror('unsupported'); return null; }
    this.drop();                       // 前の認識は黙って終わらせる（後から届くイベントも無視）
    try { Speech.stop(); } catch (e) {}
    const self = this;
    const s = { r: null, last: null, final: false, stopping: false, byUser: false, done: false, retried: false, firstErr: null, err: null, t0: 0, timers: [] };
    const later = (fn, ms) => s.timers.push(setTimeout(() => { if (!s.done) fn(); }, ms));
    s.close = (notify = true) => {
      if (s.done) return;
      s.done = true;
      s.timers.forEach(clearTimeout);
      clearTimeout(s.silence);
      if (self.session === s) { self.session = null; self.current = null; }
      if (notify && onend) onend();
    };
    s.giveFinal = alts => {
      if (s.final || !alts || !alts.length) return;
      s.final = true;
      self.fails = 0;
      if (onresult) onresult(alts, true);
    };
    s.fail = code => {
      self.fails++;
      if (onerror) onerror(code);
    };
    // 聞くのをやめて、聞こえた分で確定する
    s.stopNow = byUser => {
      if (s.done || s.stopping) return;
      s.stopping = true;
      s.byUser = !!byUser;
      clearTimeout(s.silence);
      try { s.r.stop(); } catch (e) {}
      // 止めても終わりの合図が来ない端末向けの保険
      later(() => { try { s.r.abort(); } catch (e) {} if (s.last) s.giveFinal(s.last); else if (!s.byUser) s.fail('no-speech'); s.close(); }, 2000);
    };
    const begin = () => {
      const r = new self.Rec();
      s.r = r; s.err = null; s.t0 = Date.now();
      r.lang = lang;
      r.interimResults = true;
      r.maxAlternatives = 3;
      r.continuous = false;
      const mine = () => !s.done && s.r === r;
      r.onresult = e => {
        if (!mine() || s.final) return;
        const list = [...e.results];
        if (!list.length) return;
        const alts = list.length === 1
          ? [...list[0]].map(a => a.transcript.trim()).filter(Boolean)
          : [list.map(x => x[0].transcript).join(' ').replace(/\s+/g, ' ').trim()].filter(Boolean);
        if (!alts.length) return;
        if (list.every(x => x.isFinal)) {
          s.stopping = true;
          s.giveFinal(alts);
          try { r.stop(); } catch (er) {}
          return;
        }
        const changed = !s.last || s.last[0] !== alts[0];
        s.last = alts;
        if (onresult) onresult(alts, false);
        if (changed) { clearTimeout(s.silence); s.silence = setTimeout(() => { if (mine()) s.stopNow(false); }, self.SILENCE_MS); }
      };
      r.onerror = e => { if (mine()) s.err = e.error || 'error'; };
      r.onend = () => {
        if (!mine()) return;
        clearTimeout(s.silence);
        if (s.final) return s.close();
        if (s.last) { s.giveFinal(s.last); return s.close(); }      // 確定前に終わった → 聞こえた分で答える
        if (s.byUser) return s.close();                             // 何も話さずに自分で止めた
        let code = s.err || 'no-speech';
        if (s.stopping && code === 'aborted') code = 'no-speech';   // 時間切れで止めた
        const quick = Date.now() - s.t0 < 1500;
        if (!s.retried && quick && !['not-allowed', 'service-not-allowed', 'language-not-supported', 'no-speech'].includes(code)) {
          s.retried = true;
          s.firstErr = code;
          later(() => { try { begin(); } catch (er) { s.fail(code); s.close(); } }, 400);
          return;
        }
        // やり直しても失敗したときは、最初の原因を伝える（「声が聞こえない」は除く）
        if (s.firstErr && code !== 'no-speech') code = s.firstErr;
        s.fail(code);
        s.close();
      };
      r.start();
    };
    this.session = s;
    this.current = s;
    try { begin(); } catch (e) { s.fail('start'); s.close(); return null; }
    later(() => { if (!s.last) s.stopNow(false); }, this.WAIT_MS);
    later(() => s.stopNow(false), this.MAX_MS);
    return s;
  },

  // 止める。keep:true なら、そこまで聞こえた英語で答えを確定する（「■ 止める」ボタン用）
  // keep なし（画面の切り替え・パスなど）は結果を捨てて終える
  stop({ keep = false } = {}) {
    const s = this.session;
    if (!s) return;
    if (keep) return s.stopNow(true);
    this.drop(true);
  },
  // 結果を捨てて終える（notify:true なら onend だけは呼んでボタン表示を戻す）
  drop(notify = false) {
    const s = this.session;
    if (!s) return;
    s.close(notify);
    try { s.r && (s.r.abort ? s.r.abort() : s.r.stop()); } catch (e) {}
  },

  errorMessage(code) {
    const known = {
      'not-allowed': 'マイクが許可されていません。もう一度🎤を押して「許可」を選んでください。出てこないときは、iPhone の「設定」→（アプリ →）Safari →「マイク」を「確認」か「許可」にしてください。',
      'service-not-allowed': '音声認識が使えない設定になっています。iPhone は「設定」→「一般」→「キーボード」→「音声入力」をオンにしてください。',
      'language-not-supported': 'この端末では英語の音声認識が使えません。iPhone は「設定」→「一般」→「キーボード」→「音声入力」をオンにしてください。',
      'no-speech': '声が聞き取れませんでした。🎤を押したら、すぐに英語で話し始めてください。',
      'aborted': 'うまく聞き取れませんでした。もう一度🎤を押して、話し始めてください。',
      'audio-capture': 'マイクの準備ができませんでした。音楽や動画を止めてから、もう一度🎤を押してください。',
      'network': '音声認識に接続できませんでした。通信環境を確認して、もう一度試してください。',
      'start': 'マイクの準備ができませんでした。少し待ってから、もう一度🎤を押してください。',
      'unsupported': 'このブラウザは音声認識に対応していません。声に出して言ってから「答えを見る」で確認しましょう。'
    };
    return known[code] || `音声認識がうまく動きませんでした（${code}）。もう一度🎤を押してください。`;
  },
  // 何度か失敗したときの案内（入力欄がある画面用）
  typingTip() {
    return this.fails >= 2 ? '何度もうまくいかないときは、入力欄をタップして、キーボードの🎤（音声入力）で話しても答えられます。' : '';
  }
};

const VoiceRecorder = {
  rec: null, chunks: [], stream: null,
  supported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder) && !(window.PWA && PWA.embedded); },
  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.chunks = [];
    this.rec = new MediaRecorder(this.stream);
    this.rec.ondataavailable = e => { if (e.data.size) this.chunks.push(e.data); };
    this.rec.start();
  },
  stop() {
    return new Promise(resolve => {
      if (!this.rec) return resolve(null);
      this.rec.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.rec.mimeType || 'audio/mp4' });
        this.stream.getTracks().forEach(t => t.stop());
        this.rec = null;
        resolve(URL.createObjectURL(blob));
      };
      this.rec.stop();
    });
  }
};

/* 話した英語とお手本の比較 */
const CONTRACTIONS = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "it's": 'it is', "that's": 'that is',
  "what's": 'what is', "there's": 'there is', "here's": 'here is', "let's": 'let us', "i've": 'i have', "we've": 'we have',
  "you've": 'you have', "i'll": 'i will', "you'll": 'you will', "we'll": 'we will', "i'd": 'i would', "you'd": 'you would',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "isn't": 'is not',
  "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "haven't": 'have not', "hasn't": 'has not',
  "couldn't": 'could not', "wouldn't": 'would not', "shouldn't": 'should not', "he's": 'he is', "she's": 'she is'
};
const NUMS = { '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten' };
function speechTokens(s) {
  return String(s).toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9'\s-]/g, ' ').replace(/-/g, ' ')
    .split(/\s+/).filter(Boolean)
    .flatMap(w => (CONTRACTIONS[w] || NUMS[w] || w).split(' '))
    .map(w => w === 'can' ? 'can' : w === 'cannot' ? 'can not' : w).join(' ').split(' ').filter(Boolean);
}
// 最長共通部分列で、お手本のどの単語が言えたかを判定
function compareSpeech(target, spoken) {
  const t = speechTokens(target), s = speechTokens(spoken);
  const dp = Array.from({ length: t.length + 1 }, () => new Array(s.length + 1).fill(0));
  for (let i = t.length - 1; i >= 0; i--) for (let j = s.length - 1; j >= 0; j--)
    dp[i][j] = t[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(t.length).fill(false);
  for (let i = 0, j = 0; i < t.length && j < s.length;) {
    if (t[i] === s[j]) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  const score = t.length ? Math.round(hit.filter(Boolean).length / t.length * 100) : 0;
  return { score, words: t.map((w, i) => ({ w, ok: hit[i] })) };
}
