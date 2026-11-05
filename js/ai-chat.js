/* =========================================================
 * AIと英会話（質疑応答）
 * 呼び出し方は環境で切り替える：
 *  - claude.ai 版（埋め込み表示）：claude.ai の sample 機能（APIキー不要、初回に許可）
 *  - スマホアプリ版・ローカル版：ユーザー自身の Anthropic APIキーで Messages API を直接呼ぶ
 *    （キーはこの端末の localStorage にだけ保存し、学習記録やクラウドには含めない）
 * どちらも同じ形の結果 {reply, reply_ja, correction, tip_ja} を返す。
 * ========================================================= */
const CHAT_TOPICS = [
  { id: 'free', icon: '☕', name: '自由に雑談', en: 'casual small talk about everyday life, hobbies, food, and recent events' },
  { id: 'intro', icon: '👋', name: '自己紹介', en: 'getting to know each other: name, hometown, job or school, family, and hobbies' },
  { id: 'travel', icon: '✈️', name: '旅行', en: 'travel experiences, dream destinations, and travel tips' },
  { id: 'work', icon: '💼', name: '仕事・学校', en: 'the learner\'s work or school life, daily routine, and goals' },
  { id: 'culture', icon: '🗾', name: '日本の文化を紹介', en: 'the learner explaining Japanese culture, food, festivals, and customs to a foreign friend' },
  { id: 'opinion', icon: '💡', name: '意見を言う', en: 'friendly debates on everyday social topics (e.g. remote work, smartphones, cashless payments); ask the learner\'s opinion and reasons' },
  { id: 'interview', icon: '🎤', name: '英語の面接練習', en: 'a friendly mock job interview in English; ask one common interview question at a time' }
];

const AIChat = {
  KEY_STORE: 'eikenCoach.anthropicKey',
  MODEL: 'claude-opus-5-5',

  getKey() { try { return localStorage.getItem(this.KEY_STORE) || ''; } catch (e) { return ''; } },
  setKey(k) { try { localStorage.setItem(this.KEY_STORE, k.trim()); } catch (e) {} },
  clearKey() { try { localStorage.removeItem(this.KEY_STORE); } catch (e) {} },

  // 'sample' | 'api' | null（使えない）
  async mode() {
    if (PWA.embedded) {
      const s = await claude.use('sample').catch(() => null);
      return s ? 'sample' : null;
    }
    return this.getKey() ? 'api' : null;
  },

  instructions(topic) {
    return [
      'You are a friendly native English conversation partner for a Japanese learner at an intermediate level (around high-school English).',
      `Conversation theme: ${topic.en}.`,
      'Rules for your reply:',
      '- Speak natural, everyday English that an intermediate learner can follow. Keep each reply short: one to three sentences.',
      '- React to what the learner said, then ask exactly one follow-up question so the conversation keeps going, unless the learner says goodbye.',
      '- If the learner writes in Japanese or seems stuck, gently help in simple English and give an example sentence they could say.',
      'Feedback on the learner\'s last message:',
      '- If it contains grammar mistakes, wrong word choices, or clearly unnatural phrasing, put a corrected, natural version of their whole message in "correction" and a short explanation in Japanese (under 60 characters) in "tip_ja".',
      '- If it was fine, or if there is no learner message yet, set both "correction" and "tip_ja" to an empty string. Do not correct capitalization or punctuation only.',
      'Also give a natural Japanese translation of your reply in "reply_ja".'
    ].join('\n');
  },

  schema: {
    type: 'object',
    properties: {
      reply: { type: 'string', description: 'Your reply in English (1-3 short sentences, usually ending with one question).' },
      reply_ja: { type: 'string', description: 'Japanese translation of the reply.' },
      correction: { type: 'string', description: 'Natural corrected version of the learner\'s last message, or empty string.' },
      tip_ja: { type: 'string', description: 'Short Japanese explanation of the correction, or empty string.' }
    },
    required: ['reply', 'reply_ja', 'correction', 'tip_ja'],
    additionalProperties: false
  },

  // history: [{role:'user'|'assistant', content:string}]（最後は user）
  async send({ topic, history }) {
    const mode = await this.mode();
    if (!mode) throw { code: 'unavailable', message: 'AI会話を使う準備ができていません。' };
    // 長い会話でも費用が増えすぎないよう、直近の20発言だけ送る（先頭は必ず user）
    let turns = history.slice(-20);
    while (turns.length && turns[0].role !== 'user') turns = turns.slice(1);
    return mode === 'sample' ? this.viaSample(topic, turns) : this.viaApi(topic, turns);
  },

  async viaSample(topic, turns) {
    const sample = await claude.use('sample');
    const fmt = 'Answer ONLY with a JSON object with the keys "reply", "reply_ja", "correction", "tip_ja" (all strings).';
    const input = turns.map((t, i) => i === 0 && t.role === 'user'
      ? { role: 'user', content: `${this.instructions(topic)}\n${fmt}\n\nLearner: ${t.content}` }
      : { role: t.role, content: t.role === 'user' ? `Learner: ${t.content}` : t.content });
    let v;
    try { v = await sample.json(input, { cache: false, modelTier: 'quick' }); }
    catch (e) {
      const code = e && e.code;
      throw { code: code || 'error', message: code === 'not_granted' ? 'claude.ai のAIの利用が許可されていません。' : code === 'rate_limited' ? '少し時間をおいてから、もう一度話しかけてください。' : 'AIからの返事を受け取れませんでした。もう一度試してください。' };
    }
    return this.normalize(v);
  },

  async viaApi(topic, turns) {
    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': this.getKey(),
          'anthropic-version': '2026-10-21',
          'anthropic-beta': 'server-side-fallback-2026-07-01',
          // ブラウザから直接呼び出すためのヘッダー（キーは本人の端末にだけ保存）
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: this.MODEL,
          max_tokens: 4096,
          fallbacks: 'default',
          system: this.instructions(topic),
          output_config: { effort: 'low', format: { type: 'json_schema', schema: this.schema } },
          messages: turns
        })
      });
    } catch (e) {
      throw { code: 'network', message: 'インターネットに接続できませんでした。通信環境を確認してください。' };
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = {
        401: 'APIキーが正しくありません。設定画面でキーを確認してください。',
        403: 'このAPIキーでは利用できません。Anthropic Console で権限を確認してください。',
        429: '利用が集中しているか、利用上限に達しました。少し時間をおいて試してください。',
        529: 'AIが混み合っています。少し時間をおいて試してください。'
      }[res.status] || (data.error && data.error.message) || `エラーが起きました（${res.status}）`;
      throw { code: 'http_' + res.status, message: msg };
    }
    if (data.stop_reason === 'refusal') throw { code: 'refusal', message: 'この内容には返事ができませんでした。別の話題にしてみましょう。' };
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    try { return this.normalize(JSON.parse(text)); }
    catch (e) { throw { code: 'parse', message: 'AIの返事を読み取れませんでした。もう一度試してください。' }; }
  },

  normalize(v) {
    const s = x => (typeof x === 'string' ? x.trim() : '');
    return { reply: s(v && v.reply), reply_ja: s(v && v.reply_ja), correction: s(v && v.correction), tip_ja: s(v && v.tip_ja) };
  }
};
