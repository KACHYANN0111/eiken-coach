/* =========================================================
 * データ保存
 * - 端末内：localStorage（オフラインでも即座に読み書き）
 * - クラウド：claude.ai で公開した版では、ログイン中の本人だけが読める
 *   領域（data/users/<id>/）にも自動で同期する。iPhone と PC で同じ記録を使える。
 * すべての学習記録はこのモジュール経由で読み書きする。
 * ========================================================= */
const Store = (() => {
  const KEY = CONFIG.storageKey;
  // 長期利用でも保存容量を超えないよう、履歴は新しい順に上限を設ける
  const LIMITS = { tests: 300, reading: 2000, listening: 2000, writing: 100, speaking: 400 };
  const defaults = () => ({
    version: 2,
    updatedAt: 0,
    settings: { grade: CONFIG.defaultGrade, sfx: true, voice: true, mascot: true, character: 'mirai', volume: 0.8, muted: false },
    wordStats: {},        // id -> {c, w, streak, lastAsked, lastWrong, lastCorrect}
    days: {},             // YYYY-MM-DD -> 日別集計
    tests: [],            // 単語テスト結果
    reading: [],          // {id, type, theme, correct, date}
    readingReview: [],    // 間違えたリーディング問題ID
    listening: [],        // {id, part, theme, correct, date}
    listeningReview: [],
    writing: [],          // {type, promptId, title, text, words, opinion, checks, date}
    speaking: [],         // {setId, part, text, date}
    pastExams: [],        // 過去問の学習記録
    drafts: {},           // 書きかけの英作文
    plan: null            // 今日の10分 の進行状況
  });
  const normalize = d => {
    const out = Object.assign(defaults(), d || {});
    out.settings = Object.assign(defaults().settings, out.settings || {});
    return out;
  };

  let data = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return normalize(JSON.parse(raw));
    } catch (e) { console.warn('load failed', e); }
    return defaults();
  }
  function saveLocal() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch (e) { console.warn('local save failed', e); }
  }
  function trim() {
    for (const [k, n] of Object.entries(LIMITS)) if (data[k].length > n) data[k] = data[k].slice(-n);
  }
  function save() {
    trim();
    data.updatedAt = Date.now();
    saveLocal();
    Cloud.schedule();
  }

  function day(key = U.today()) {
    if (!data.days[key]) {
      data.days[key] = { seconds: 0, questions: 0, correct: 0, vocab: 0, vocabCorrect: 0, reading: 0, readingCorrect: 0, listening: 0, listeningCorrect: 0, writing: 0, speaking: 0 };
    }
    return data.days[key];
  }

  // 回答1件を日別集計に記録（area: vocab | reading | listening）
  function logAnswer(area, correct) {
    const d = day();
    d.questions++; d[area]++;
    if (correct) { d.correct++; d[area + 'Correct']++; }
    save();
  }

  // 学習時間は10秒ごとに加算されるため端末内にだけ保存し、クラウドへは次の操作時にまとめて送る
  function addSeconds(sec) { day().seconds += sec; data.updatedAt = Date.now(); saveLocal(); }

  function setting(k) { return data.settings[k]; }
  function setSetting(k, v) { if (data.settings[k] !== v) { data.settings[k] = v; save(); } }

  /* ---------- 単語 ---------- */
  function wordStat(id) { return data.wordStats[id] || { c: 0, w: 0, streak: 0, lastAsked: null, lastWrong: null, lastCorrect: null }; }
  function recordWord(id, correct) {
    const s = wordStat(id);
    const t = U.today();
    s.lastAsked = t;
    if (correct) { s.c++; s.streak = (s.streak || 0) + 1; s.lastCorrect = t; }
    else { s.w++; s.streak = 0; s.lastWrong = t; }
    data.wordStats[id] = s;
    logAnswer('vocab', correct);
    return s;
  }

  /* ---------- 連続学習 ---------- */
  function isActive(d) { return d && (d.questions > 0 || d.writing > 0 || d.speaking > 0 || d.seconds >= 60); }
  function streak() {
    let key = U.today();
    if (!isActive(data.days[key])) key = U.addDays(key, -1); // 今日まだなら昨日から数える
    let n = 0;
    while (isActive(data.days[key])) { n++; key = U.addDays(key, -1); }
    return n;
  }

  function exportJSON() { return JSON.stringify(data, null, 2); }
  function importJSON(text) { data = normalize(JSON.parse(text)); save(); }
  function reset() { data = defaults(); save(); }
  function replace(d) { data = normalize(d); saveLocal(); }

  return {
    get data() { return data; },
    save, saveLocal, replace, day, logAnswer, addSeconds, setting, setSetting, wordStat, recordWord, streak, isActive, exportJSON, importJSON, reset
  };
})();

/* =========================================================
 * クラウド同期（claude.ai の db 機能。使えない環境では何もしない）
 * 1人分のデータを数個のドキュメントに分けて保存する（1ドキュメント最大256KB）。
 * ========================================================= */
const Cloud = {
  status: 'local',   // local | connecting | synced | saving | error
  db: null, uid: null, last: {}, timer: null, busy: false, pending: false,
  onChange: null,     // 状態表示の更新
  onRemote: null,     // クラウドの新しいデータを読み込んだとき

  docNames() { return ['core', 'reading', 'listening', 'writing', 'speaking', ...CONFIG.grades.map(g => 'words_' + g.id)]; },

  split(d) {
    const words = {};
    CONFIG.grades.forEach(g => { words['words_' + g.id] = { stats: {} }; });
    for (const [id, s] of Object.entries(d.wordStats)) {
      const it = typeof VOCAB !== 'undefined' && VOCAB.byId[id];
      const key = 'words_' + (it ? it.grade : CONFIG.defaultGrade);
      (words[key] || words['words_' + CONFIG.defaultGrade]).stats[id] = s;
    }
    return {
      core: { version: d.version, updatedAt: d.updatedAt, settings: d.settings, days: d.days, tests: d.tests, readingReview: d.readingReview, listeningReview: d.listeningReview, pastExams: d.pastExams, drafts: d.drafts, plan: d.plan },
      reading: { items: d.reading },
      listening: { items: d.listening },
      writing: { items: d.writing },
      speaking: { items: d.speaking },
      ...words
    };
  },
  join(docs) {
    const c = docs.core || {};
    const wordStats = {};
    for (const [k, v] of Object.entries(docs)) if (k.startsWith('words_') && v && v.stats) Object.assign(wordStats, v.stats);
    return {
      ...c, wordStats,
      reading: (docs.reading || {}).items || [], listening: (docs.listening || {}).items || [],
      writing: (docs.writing || {}).items || [], speaking: (docs.speaking || {}).items || []
    };
  },
  ref(name) { return this.db.doc('data/users/' + this.uid + '/' + name); },
  set(s) { this.status = s; if (this.onChange) this.onChange(s); },

  async init() {
    if (!window.claude || typeof window.claude.use !== 'function') return; // ローカル版
    this.set('connecting');
    try {
      const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
      const uid = user ? await user.id() : null;
      if (!db || !uid) return this.set('local');
      this.db = db; this.uid = uid;
      await this.pull();
      addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') this.pull(); });
    } catch (e) { console.warn('cloud init failed', e); this.set('local'); }
  },

  // クラウドの方が新しければ取り込み、端末の方が新しければ送る
  async pull() {
    if (!this.db || this.busy) return;
    try {
      const names = this.docNames();
      const snaps = await Promise.all(names.map(n => this.ref(n).get()));
      const remote = {};
      snaps.forEach((s, i) => { if (s.exists) remote[names[i]] = s.data(); });
      names.forEach(n => { this.last[n] = remote[n] ? JSON.stringify(remote[n]) : null; });
      const remoteAt = (remote.core && remote.core.updatedAt) || 0;
      if (remoteAt > (Store.data.updatedAt || 0)) {
        Store.replace(this.join(remote));
        this.set('synced');
        if (this.onRemote) this.onRemote();
      } else if (remoteAt < (Store.data.updatedAt || 0)) {
        this.set('saving');
        await this.push();
      } else this.set('synced');
    } catch (e) { console.warn('cloud pull failed', e); this.set('error'); }
  },

  schedule() {
    if (!this.db) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.push(), 1500);
  },

  // 変更のあったドキュメントだけを1件ずつ書き込む
  async push() {
    if (!this.db) return;
    if (this.busy) { this.pending = true; return; }
    this.busy = true;
    this.set('saving');
    try {
      const docs = this.split(Store.data);
      for (const [name, body] of Object.entries(docs)) {
        const json = JSON.stringify(body);
        if (this.last[name] === json) continue;
        await this.ref(name).set(body);
        this.last[name] = json;
      }
      this.set('synced');
    } catch (e) {
      console.warn('cloud push failed', e);
      this.set('error');
      if (e && e.code === 'quota_exceeded') U.toast('クラウドの保存容量がいっぱいです。端末内には保存されています。');
    } finally {
      this.busy = false;
      if (this.pending) { this.pending = false; this.schedule(); }
    }
  }
};

/* 学習時間トラッカー：学習ページを表示中かつタブが見えている間だけ加算 */
const Tracker = {
  start() {
    setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      const r = (App.current || '#home').slice(1).split('/')[0];
      if (['home', 'history', 'past'].includes(r)) return;
      if (Date.now() - (Tracker.lastInput || 0) > 3 * 60 * 1000) return; // 3分操作なしなら停止
      Store.addSeconds(10);
    }, 10000);
    ['click', 'keydown', 'touchstart', 'scroll'].forEach(e => addEventListener(e, () => { Tracker.lastInput = Date.now(); }, { passive: true }));
    Tracker.lastInput = Date.now();
  }
};
