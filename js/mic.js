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
  current: null,

  // 1回話した内容を認識する。onresult(候補文字列の配列, 確定したか)
  listen({ lang = 'en-US', onresult, onend, onerror } = {}) {
    if (!this.supported()) { if (onerror) onerror('unsupported'); return null; }
    this.stop();
    try { Speech.stop(); } catch (e) {}
    const r = new this.Rec();
    r.lang = lang;
    r.interimResults = true;
    r.maxAlternatives = 3;
    r.continuous = false;
    r.onresult = e => {
      const res = e.results[e.results.length - 1];
      const alts = [...res].map(a => a.transcript.trim()).filter(Boolean);
      if (onresult) onresult(alts, res.isFinal);
    };
    r.onerror = e => { if (onerror) onerror(e.error || 'error'); };
    r.onend = () => { this.current = null; if (onend) onend(); };
    try { r.start(); } catch (e) { if (onerror) onerror('start'); return null; }
    this.current = r;
    return r;
  },
  stop() { if (this.current) { try { this.current.stop(); } catch (e) {} this.current = null; } },

  errorMessage(code) {
    return {
      'not-allowed': 'マイクの使用が許可されていません。ブラウザの設定でマイクを許可してください。',
      'service-not-allowed': 'この環境では音声認識が使えません。Safari や Chrome で開いてください。',
      'no-speech': '声が聞き取れませんでした。もう一度、はっきり話してみましょう。',
      'audio-capture': 'マイクが見つかりませんでした。',
      'network': '音声認識に接続できませんでした。通信環境を確認してください。',
      'unsupported': 'このブラウザは音声認識に対応していません。声に出して言ってから「答えを見る」で確認しましょう。'
    }[code] || '音声認識でエラーが起きました。もう一度試してください。';
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
