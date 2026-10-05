/* =========================================================
 * AI 機能インターフェース
 * 今回は API を使わず、すべてローカルのルールベースで動作する。
 * 将来 AI API を追加する場合は CONFIG.ai.provider を変更し、
 * remote.* に実装を追加するだけで画面側はそのまま使える。
 * すべて Promise を返す（API 化しても呼び出し側を変えないため）。
 * ========================================================= */
const AI = (() => {
  const local = {
    // AIによる単語問題生成（ローカル：出題アルゴリズムで選定）
    async generateWordQuestions({ mode = 'normal', count = 10, target = 'word', grade = 'all' } = {}) {
      return Coach.selectWords(mode, count, target, grade);
    },

    // AIによるライティング添削（ローカル：形式チェック）
    async reviewWriting({ type, text, source = '', opinion = '' }) {
      const lim = CONFIG.wordLimits[type];
      const n = U.countWords(text);
      const sentences = text.split(/[.!?]+\s/).filter(s => s.trim()).length;
      const low = text.toLowerCase();
      const tips = [];
      const good = [];
      if (n < lim.min) tips.push(`語数が${lim.min - n}語不足しています（${lim.min}〜${lim.max}語）。`);
      else if (n > lim.max) tips.push(`語数が${n - lim.max}語オーバーしています（${lim.min}〜${lim.max}語）。`);
      else good.push('指定語数の範囲内です。');
      if (/^[a-z]/.test(text.trim()) || /[.!?]\s+[a-z]/.test(text)) tips.push('文頭は大文字で始めましょう。');
      if (/\bi\b(?!')/.test(text)) tips.push('一人称の I は大文字で書きましょう。');
      if (/(\b\w+\b) \1\b/i.test(text)) tips.push('同じ単語が連続している箇所があります。');

      if (type === 'summary') {
        if (/\b(i think|in my opinion|i agree|i believe)\b/.test(low)) tips.push('要約では自分の意見を書かないようにしましょう。');
        const copy = copiedChunks(source, text);
        if (copy.length) tips.push(`本文をそのまま写している部分があります：「${copy.slice(0, 2).join('」「')}」。自分の言葉に言い換えましょう。`);
        else if (source) good.push('本文の丸写しは見られません。');
        if (!/\b(however|but|although|on the other hand|while)\b/.test(low)) tips.push('本文に「利点と欠点」「対比」がある場合は however / on the other hand などで対比を示すと伝わりやすくなります。');
        if (sentences > 4) tips.push('要約は2〜3文程度にまとめると読みやすくなります。');
      } else {
        if (!/\b(agree|disagree|i think|i believe|in my opinion)\b/.test(low)) tips.push('最初に自分の意見（I agree / I disagree / I think ...）をはっきり書きましょう。');
        else good.push('意見が明確に書けています。');
        const markers = ['first', 'second', 'also', 'another', 'in addition', 'moreover', 'finally'];
        const found = markers.filter(m => low.includes(m));
        if (found.length < 2) tips.push('理由を2つ示す目印（First, ... Second, ... / Also, ...）を使いましょう。');
        else good.push('理由が2つ示されています。');
        if (!/\b(for example|for instance|such as)\b/.test(low)) tips.push('理由を具体化するために For example, ... などで具体例を加えましょう。');
        if (!/\b(for these reasons|therefore|in conclusion|that is why)\b/.test(low)) tips.push('最後に結論（For these reasons, ...）を書きましょう。');
        if (opinion === 'agree' && /\bi disagree\b/.test(low)) tips.push('選んだ立場（Agree）と本文の意見が一致していません。');
        if (opinion === 'disagree' && /\bi agree\b/.test(low)) tips.push('選んだ立場（Disagree）と本文の意見が一致していません。');
      }
      return { words: n, sentences, good, tips, engine: 'local' };
    },

    // AIによる英文要約のアドバイス
    async summaryAdvice({ prompt }) {
      return prompt.points.map((p, i) => `ポイント${i + 1}：${p}`);
    },

    // AIによる苦手分析
    async analyzeWeakness() { return Coach.analyze(); },

    // AIによる学習計画
    async makeStudyPlan() { return Coach.recommend(); },

    // AIによるスピーキング評価（ローカル：形式チェック）
    async evaluateSpeaking({ part, text, start = '' }) {
      const n = U.countWords(text), low = text.toLowerCase(), tips = [];
      if (n === 0) return { tips: ['回答を入力しましょう。'], engine: 'local' };
      if (part === 'q1') { if (n < 12) tips.push('No.1 は本文の該当箇所を使い、1〜2文で答えましょう。'); if (/^because/i.test(text.trim())) tips.push('Why の質問でも「By doing ...」「Because ...」で始めてOK。主語・動詞のある完全な文にするとより良いです。'); }
      if (part === 'q2') {
        if (start && !low.startsWith(start.toLowerCase().slice(0, 12))) tips.push('No.2 はカードに書かれた文で話し始めましょう。');
        if (n < 40) tips.push('3コマそれぞれについて1〜2文ずつ、合計5〜6文程度で説明しましょう。');
        if (!/\b(was|were|did|went|said|decided|\w+ed)\b/.test(low)) tips.push('過去形で物語を説明しましょう。');
      }
      if (part === 'q3' || part === 'q4') {
        if (!/\b(i think|i don't think|i agree|i disagree|yes|no)\b/.test(low)) tips.push('最初に自分の立場（I think ... / Yes. / No.）を述べましょう。');
        if (!/\b(because|so|this is because|for example)\b/.test(low)) tips.push('理由（because ... / For example, ...）を2文程度で付け加えましょう。');
      }
      if (!tips.length) tips.push('よく書けています。声に出して、30秒以内でスムーズに言えるか練習しましょう。');
      return { words: n, tips, engine: 'local' };
    },

    // AIによる例文生成（ローカル：収録済みの例文を返す）
    async generateExample(item) { return { en: item.ex, ja: item.exJa }; }
  };

  // 本文と5語以上連続で一致する部分を検出
  function copiedChunks(source, text, n = 6) {
    const tok = s => (s.toLowerCase().match(/[a-z0-9']+/g) || []);
    const src = tok(source), t = tok(text);
    if (!src.length) return [];
    const grams = new Set();
    for (let i = 0; i + n <= src.length; i++) grams.add(src.slice(i, i + n).join(' '));
    const hits = [];
    for (let i = 0; i + n <= t.length; i++) {
      const g = t.slice(i, i + n).join(' ');
      if (grams.has(g)) { hits.push(g); i += n - 1; }
    }
    return hits;
  }

  // 将来の API 実装をここに追加（例：fetch(CONFIG.ai.endpoint, ...)）
  const remote = {};

  return new Proxy({}, {
    get(_, name) {
      const impl = CONFIG.ai.provider !== 'local' && remote[name] ? remote[name] : local[name];
      return impl;
    }
  });
})();
