/* =========================================================
 * AIと英会話（質疑応答）
 * 呼び出し方は環境で切り替える：
 *  - claude.ai 版（埋め込み表示）：claude.ai の sample 機能（APIキー不要、初回に許可）
 *  - スマホアプリ版・ローカル版：ユーザー自身の APIキーで直接呼ぶ
 *    Anthropic（sk-ant-…）→ Messages API ／ OpenAI（sk-…）→ Responses API（キーの形で自動で見分ける）
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
  OPENAI_KEY_STORE: 'eikenCoach.openaiKey',
  OPENAI_MODEL_STORE: 'eikenCoach.openaiModel',   // 動いたモデル、または設定画面で入力したモデル
  OPENAI_EFFORT_STORE: 'eikenCoach.openaiEffort', // 動いた推論の設定（次から最初に使う）
  PROVIDER_STORE: 'eikenCoach.aiProvider',        // 両方のキーがあるとき、最後に保存した方を使う
  MODEL: 'claude-opus-5-5',
  // OpenAI のモデル候補（安くて速い順）。使えないモデルなら自動で次を試し、動いたものを覚える
  OPENAI_MODELS: ['gpt-6-luna', 'gpt-5.6-luna', 'gpt-5-mini', 'gpt-4o-mini'],

  _get(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } },
  _set(k, v) { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) {} },
  getKey() { return this._get(this.KEY_STORE); },               // Anthropic
  getOpenAIKey() { return this._get(this.OPENAI_KEY_STORE); },
  isOpenAIKey(k) { return /^sk-/.test(k) && !/^sk-ant-/.test(k); },
  // キーの形で Anthropic / OpenAI を見分けて保存する
  setKey(k) {
    k = k.trim();
    if (this.isOpenAIKey(k)) { this._set(this.OPENAI_KEY_STORE, k); this._set(this.PROVIDER_STORE, 'openai'); }
    else { this._set(this.KEY_STORE, k); this._set(this.PROVIDER_STORE, 'anthropic'); }
  },
  clearKey() { [this.KEY_STORE, this.OPENAI_KEY_STORE, this.OPENAI_MODEL_STORE, this.OPENAI_EFFORT_STORE, this.PROVIDER_STORE].forEach(k => this._set(k, '')); },
  // 使うサービス：'anthropic' | 'openai' | null
  provider() {
    const a = !!this.getKey(), o = !!this.getOpenAIKey();
    if (a && o) return this._get(this.PROVIDER_STORE) === 'openai' ? 'openai' : 'anthropic';
    return o ? 'openai' : a ? 'anthropic' : null;
  },
  providerName() { return this.provider() === 'openai' ? 'OpenAI' : 'Anthropic'; },
  openaiModel() { return this._get(this.OPENAI_MODEL_STORE); },
  setOpenAIModel(m) {
    m = (m || '').trim();
    if (m !== this.openaiModel()) this._set(this.OPENAI_EFFORT_STORE, '');   // モデルが変わったら推論の設定も選び直す
    this._set(this.OPENAI_MODEL_STORE, m);
  },

  // 'sample' | 'api' | null（使えない）
  async mode() {
    if (PWA.embedded) {
      const s = await claude.use('sample').catch(() => null);
      return s ? 'sample' : null;
    }
    return this.provider() ? 'api' : null;
  },

  instructions(topic) {
    return [
      'You are a friendly native English conversation partner for a Japanese learner at an intermediate level (around high-school English).',
      `Conversation theme: ${topic.en}.`,
      'Rules for your reply:',
      '- Speak natural, everyday English that an intermediate learner can follow. Keep each reply short: one to three sentences.',
      '- React to what the learner said, then ask exactly one follow-up question so the conversation keeps going, unless the learner says goodbye.',
      '- If the learner writes in Japanese or seems stuck, gently help in simple English and give an example sentence they could say.',
      'How to keep the conversation natural (like a real chat with a friend from abroad, not a quiz):',
      '- React to a specific detail from the learner\'s message, not just a general "Nice!".',
      '- Vary your wording every turn. Do not start two replies in a row with the same reaction, and never repeat a question you have already asked. Rotate reactions such as "Oh, nice!", "No way!", "That makes sense.", "I didn\'t know that!", "Lucky you!", "That must be tough.", "Same here!", "How interesting!", "Good for you!".',
      '- About every other turn, share a short, simple comment or experience of your own before your question, as a real conversation partner would.',
      '- Choose the next question based on the learner\'s answer, not from a fixed list. Mix question types: dig deeper (why / how / who with / what it was like / an example), experience ("Have you ever...?"), preference ("Do you prefer A or B?"), plans ("What are you going to...?"), opinion ("What do you think about...?") and recommendations ("Do you have any recommendations?"). For example, if they say "I like traveling", you could ask where they have traveled, which country they want to visit, whether they prefer traveling alone or with friends, their best travel memory, or why they enjoy it.',
      '- Make questions easy to answer. If their last answer was very short, ask a simpler question or offer two choices.',
      '- Mostly use simple, beginner-friendly English, but now and then naturally include one slightly more advanced expression (e.g. "I\'m really into...", "That sounds like a blast!", "I couldn\'t agree more.").',
      '- If the learner asks you a question, answer it briefly in a natural way, then turn the conversation back to them.',
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
    if (mode === 'sample') return this.viaSample(topic, turns);
    return this.provider() === 'openai' ? this.viaOpenAI(topic, turns) : this.viaApi(topic, turns);
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

  // OpenAI（Responses API）。モデルや推論の設定が合わないときは、次の候補で自動でやり直す
  async viaOpenAI(topic, turns) {
    const key = this.getOpenAIKey();
    const saved = this.openaiModel();
    const models = saved ? [saved, ...this.OPENAI_MODELS.filter(m => m !== saved)] : this.OPENAI_MODELS;
    const okEffort = this._get(this.OPENAI_EFFORT_STORE);
    const all = ['none', 'minimal', 'low', 'default'];   // 推論の量（使える値はモデルで違う。default は指定しない）
    const efforts = (okEffort ? [okEffort, ...all.filter(e => e !== okEffort)] : all).map(e => e === 'default' ? null : e);
    let modelErr = null;
    for (const model of models) {
      for (const effort of efforts) {
        const body = {
          model,
          instructions: this.instructions(topic),
          input: turns.map(t => ({ role: t.role, content: t.content })),
          text: { format: { type: 'json_schema', name: 'chat_reply', schema: this.schema, strict: true } },
          max_output_tokens: 4000,
          store: false
        };
        if (effort) body.reasoning = { effort };
        let res;
        try {
          res = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
            body: JSON.stringify(body)
          });
        } catch (e) {
          throw { code: 'network', message: 'インターネットに接続できませんでした。通信環境を確認してください。' };
        }
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          this.setOpenAIModel(model);      // 動いたモデルと設定を覚えて、次からはこれを最初に使う
          this._set(this.OPENAI_EFFORT_STORE, effort || 'default');
          const parts = (data.output || []).filter(o => o.type === 'message').flatMap(o => o.content || []);
          if (parts.some(c => c.type === 'refusal')) throw { code: 'refusal', message: 'この内容には返事ができませんでした。別の話題にしてみましょう。' };
          const text = data.output_text || parts.filter(c => c.type === 'output_text').map(c => c.text).join('');
          try { return this.normalize(JSON.parse(text)); }
          catch (e) { throw { code: 'parse', message: 'AIの返事を読み取れませんでした。もう一度試してください。' }; }
        }
        const err = data.error || {};
        const msg = String(err.message || '');
        // 推論の設定が合わない → 同じモデルで次の設定（先に判定する。メッセージに model が入ることがあるため）
        if (res.status === 400 && (/reasoning/i.test(err.param || '') || /reasoning|effort/i.test(msg))) continue;
        // このモデルが使えない → 次のモデル
        if (res.status === 404 || err.code === 'model_not_found' || err.param === 'model' || (res.status === 403 && /\bmodel\b/i.test(msg))) {
          modelErr = { code: 'model', message: `OpenAI のモデル（${model} など）が使えませんでした。設定画面の「OpenAI のモデル」に、使えるモデル名を入力してください。` };
          break;
        }
        throw { code: 'http_' + res.status, message: this.openaiError(res.status, err) };
      }
    }
    throw modelErr || { code: 'model', message: 'OpenAI のAIを呼び出せませんでした。設定画面でモデル名を確認してください。' };
  },
  openaiError(status, err) {
    const code = err.code || '', type = err.type || '';
    if (status === 401) return 'APIキーが正しくありません。設定画面でキーを確認してください（OpenAI のキーは sk- で始まります）。';
    if (status === 429 && (code === 'credit_balance_exhausted' || code === 'insufficient_quota' || type === 'insufficient_quota'))
      return 'OpenAI のクレジット（残高）がありません。platform.openai.com の Billing でクレジットを追加してください（ChatGPT の有料プランとは別です）。';
    if (status === 429 && /limit_exceeded/.test(code)) return 'OpenAI の利用上限に達しました。platform.openai.com で上限の設定を確認してください。';
    if (status === 429) return '利用が集中しています。少し時間をおいて試してください。';
    if (status === 403) return 'このAPIキーでは利用できません。OpenAI のプロジェクトの権限を確認してください。';
    if (status >= 500) return 'AIが混み合っています。少し時間をおいて試してください。';
    return err.message || `エラーが起きました（${status}）`;
  },

  normalize(v) {
    const s = x => (typeof x === 'string' ? x.trim() : '');
    return { reply: s(v && v.reply), reply_ja: s(v && v.reply_ja), correction: s(v && v.correction), tip_ja: s(v && v.tip_ja) };
  }
};
