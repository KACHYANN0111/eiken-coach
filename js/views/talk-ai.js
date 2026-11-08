/* 英会話：AIと会話（英語で話す → 英語で返事＋質問が返ってくる質疑応答）
 * AIの呼び出しは ai-chat.js（AIChat）が担当する。 */
async function talkAiMenu(el) {
  el.innerHTML = `<h1 class="page">💬 AIと英語で会話</h1>${talkTabs('ai')}<div class="card"><p class="muted">準備しています…</p></div>`;
  const mode = await AIChat.mode();
  const embedded = PWA.embedded;
  const how = mode === 'sample'
    ? '<p class="small">claude.ai のAIが会話相手になります（初回に利用の許可を求められます）。claude.ai の中ではアプリのマイク機能が使えないため、英語は<b>文字で入力</b>してください（iPhone は<b>キーボードの🎤</b>を押して話すと文字になります）。返事は音声で読み上げます。</p>'
    : mode === 'api'
      ? `<p class="small">${Mic.supported() ? '🎤 マイクで英語を話すと、AIが英語で返事をして音声で読み上げます。' : '英語を入力すると、AIが英語で返事をして音声で読み上げます。'}あなたのAPIキーを使います（利用料はAnthropicのアカウントに請求されます）。</p>`
      : '';
  const noKey = `<div class="card">
      <h2>APIキーなしで英語の質疑応答をする</h2>
      <p class="small"><b>🗣️ 質疑応答</b>：アプリが英語で質問し、あなたが声で答えると、相づちと次の質問が返ってきます。無料・オフラインで使えます（決まった質問に答える形式です）。</p>
      <div class="btn-row"><a class="btn primary" href="#talk/qa/all">🗣️ 質疑応答を始める</a></div>
      ${!embedded && CONFIG.claudeUrl ? `<p class="small" style="margin-top:12px"><b>🤖 claude.ai 版</b>：claude.ai にログインしていれば、APIキーなしでAIと自由に会話できます（英語は文字入力。iPhone はキーボードの🎤で音声入力できます）。学習記録はアプリ版とは別に保存されます。</p>
      <div class="btn-row"><a class="btn" href="${CONFIG.claudeUrl}" target="_blank" rel="noopener">claude.ai 版を開く</a></div>` : ''}
    </div>`;
  const setup = embedded
    ? `<div class="card callout"><b>このページでは、AI会話はまだ使えません。</b><p class="small">AIの利用許可が設定されていないか、claude.ai にログインしていない可能性があります。</p></div>${noKey}`
    : `${noKey}<div class="card callout">
        <b>AI会話をアプリ版で使うには、Anthropic の APIキーが必要です</b>
        <ol class="small">
          <li>パソコンで <span class="en">console.anthropic.com</span> にアクセスし、アカウントを作成（利用料は従量課金です）</li>
          <li>「API Keys」でキーを作成してコピー</li>
          <li>このアプリの「⚙️ 設定」→「AI会話」にキーを貼り付けて保存</li>
        </ol>
        <p class="small muted">キーはこの端末の中だけに保存され、学習記録やクラウドには送られません。使いすぎを防ぐため、Console で利用上限（Spend limit）を設定しておくと安心です。</p>
        <a class="btn primary" href="#settings">設定を開く</a>
      </div>
      <p class="small muted">APIキーがなくても、「質疑応答」「話して練習」「ロールプレイ」で声に出す練習ができます。</p>`;
  el.innerHTML = `
  <h1 class="page">💬 AIと英語で会話</h1>
  ${talkTabs('ai')}
  <div class="card">
    <p>英語で話しかけると、AIが英語で返事をして質問を返してくれます。間違えた英語は、より自然な言い方を日本語の説明つきで教えてくれます。</p>
    ${mode ? how : setup}
  </div>
  ${mode ? `<h2 class="sec">話すテーマを選ぶ</h2>
  <div class="scene-grid">${CHAT_TOPICS.map(t => `<a class="scene-card" href="#talk/ai/${t.id}"><span class="scene-ic">${t.icon}</span><b>${U.esc(t.name)}</b></a>`).join('')}</div>` : ''}`;
}

async function talkAiChat(topicId, el) {
  const topic = CHAT_TOPICS.find(t => t.id === topicId) || CHAT_TOPICS[0];
  const mode = await AIChat.mode();
  if (!mode) return talkAiMenu(el);
  const history = [];     // AIに送る会話（user / assistant の交互）
  const view = [];        // 画面表示用 {who, text, ja, correction, tip}
  const START = '(The learner is ready. Greet them briefly and ask your first question about the theme.)';
  let busy = false, userTurns = 0;
  let autoSpeak = Store.setting('chatAutoSpeak') !== false;
  const useMic = Mic.supported() && mode === 'api';

  el.innerHTML = `
  <div class="quiz-head"><a href="#talk/ai" class="back">← テーマ</a><span>${topic.icon} ${U.esc(topic.name)}</span><button type="button" class="btn small-btn" id="endBtn">終わる</button></div>
  <div class="card ai-chat">
    <label class="chk small"><input type="checkbox" id="autoSpeak" ${autoSpeak ? 'checked' : ''}> AIの返事を自動で読み上げる</label>
    <div class="chat" id="chat"></div>
    <div class="chat-input">
      ${useMic ? '<button type="button" class="btn primary mic-btn" id="chatMic">🎤 話す</button>' : ''}
      <form id="chatForm" class="chat-form">
        <input id="chatText" autocomplete="off" autocapitalize="sentences" spellcheck="true" placeholder="英語で入力（日本語でもOK）">
        <button class="btn primary" id="sendBtn">送信</button>
      </form>
    </div>
    ${useMic ? '' : '<p class="small muted">📱 iPhone：キーボードの🎤（音声入力）を押して英語で話すと、文字で入力できます（キーボードを English にしておく）。</p>'}
    <p class="small muted" id="chatNote"></p>
  </div>
  <div id="chatSummary"></div>`;

  const chatEl = U.$('#chat', el), note = U.$('#chatNote', el);
  U.$('#autoSpeak', el).onchange = e => { autoSpeak = e.target.checked; Store.setSetting('chatAutoSpeak', autoSpeak); if (!autoSpeak) Speech.stop(); };

  function draw(thinking) {
    chatEl.innerHTML = view.map((m, k) => m.who === 'ai'
      ? `<div class="bubble them"><span class="who">🤖</span><div><p class="en">${U.esc(m.text)} <button type="button" class="icon-btn" data-say="${k}" title="聞く">🔊</button></p>${m.ja ? `<details><summary class="small muted">日本語訳</summary><p class="small">${U.esc(m.ja)}</p></details>` : ''}</div></div>`
      : `<div class="bubble you"><div><p class="en">${U.esc(m.text)}</p>${m.correction ? `<div class="fix"><span class="small">💡 より自然に：</span><span class="en">${U.esc(m.correction)}</span> <button type="button" class="icon-btn" data-fix="${k}" title="聞く">🔊</button>${m.tip ? `<div class="small muted">${U.esc(m.tip)}</div>` : ''}</div>` : ''}</div><span class="who">🙂</span></div>`).join('')
      + (thinking ? '<div class="bubble them"><span class="who">🤖</span><div><p class="muted">考え中…</p></div></div>' : '');
    U.$$('[data-say]', chatEl).forEach(b => b.onclick = () => Speech.play([{ sp: 'W', t: view[+b.dataset.say].text }]));
    U.$$('[data-fix]', chatEl).forEach(b => b.onclick = () => Speech.play(view[+b.dataset.fix].correction));
    const last = chatEl.lastElementChild;
    if (last) last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  async function send(text, isStart) {
    if (busy) return;
    text = (text || '').trim();
    if (!text) return;
    busy = true;
    U.$('#sendBtn', el).disabled = true;
    note.textContent = '';
    history.push({ role: 'user', content: text });
    if (!isStart) { view.push({ who: 'you', text }); userTurns++; }
    draw(true);
    try {
      const r = await AIChat.send({ topic, history });
      history.push({ role: 'assistant', content: r.reply });
      if (!isStart && r.correction) {
        const same = r.correction.replace(/\W/g, '').toLowerCase() === text.replace(/\W/g, '').toLowerCase();
        if (!same) { const me = view[view.length - 1]; me.correction = r.correction; me.tip = r.tip_ja; }
      }
      view.push({ who: 'ai', text: r.reply, ja: r.reply_ja });
      if (!isStart) { Store.day().speaking++; Store.save(); }
      draw(false);
      if (autoSpeak) Speech.play([{ sp: 'W', t: r.reply }], { rate: 0.95 });
    } catch (e) {
      history.pop();
      if (!isStart) { view.pop(); userTurns--; U.$('#chatText', el).value = text; }
      draw(false);
      note.innerHTML = `<span class="mic-off">${U.esc((e && e.message) || 'エラーが起きました。')}</span>${isStart ? ' <button type="button" class="btn small-btn" id="retryStart">もう一度</button>' : ''}`;
      const rs = U.$('#retryStart', el);
      if (rs) rs.onclick = () => send(START, true);
    } finally {
      busy = false;
      U.$('#sendBtn', el).disabled = false;
    }
  }

  U.$('#chatForm', el).onsubmit = e => {
    e.preventDefault();
    const inp = U.$('#chatText', el);
    const v = inp.value;
    inp.value = '';
    send(v);
  };

  const mb = U.$('#chatMic', el);
  if (mb) mb.onclick = () => {
    if (Mic.current) { Mic.stop({ keep: true }); return; }
    if (busy) return;
    const inp = U.$('#chatText', el);
    mb.textContent = '■ 止める';
    mb.classList.add('rec-on');
    note.innerHTML = '<span class="listening">● 聞いています… 英語で話してください</span>';
    Mic.listen({
      onresult: (alts, fin) => {
        inp.value = alts[0];
        if (fin) { note.textContent = ''; const v = inp.value; inp.value = ''; send(v); }
      },
      onerror: code => { note.innerHTML = `<span class="mic-off">${U.esc(Mic.errorMessage(code))}</span> ${U.esc(Mic.typingTip())}`; },
      onend: () => { mb.textContent = '🎤 話す'; mb.classList.remove('rec-on'); if (U.$('.listening', note)) note.textContent = ''; }
    });
  };

  U.$('#endBtn', el).onclick = () => {
    Speech.stop(); Mic.stop();
    const fixes = view.filter(m => m.who === 'you' && m.correction);
    if (userTurns) {
      Store.data.talk.log.push({ id: 'ai:' + topic.id, turns: userTurns, fixes: fixes.length, date: U.today() });
      Store.save();
      Sound.finish(100);
    }
    U.$('#chatSummary', el).innerHTML = `
      <div class="card result">
        <div class="score">${userTurns}<small>回 英語で話しました</small></div>
        ${Coach.nextStepHTML('talk')}
        <div class="btn-row"><a class="btn" href="#talk/ai/${topic.id}">同じテーマでもう一度</a><a class="btn" href="#talk/ai">別のテーマ</a></div>
      </div>
      ${fixes.length ? `<div class="card"><h2>今日の言い直しフレーズ</h2><p class="small muted">声に出して読み、次の会話で使ってみましょう。</p>
        <ul class="fix-list">${fixes.map((f, k) => `<li><div class="small muted">あなた：<span class="en">${U.esc(f.text)}</span></div><div class="en"><b>${U.esc(f.correction)}</b> <button type="button" class="icon-btn" data-sum="${k}">🔊</button></div>${f.tip ? `<div class="small">${U.esc(f.tip)}</div>` : ''}</li>`).join('')}</ul></div>` : ''}`;
    U.$$('[data-sum]', el).forEach(b => b.onclick = () => Speech.play(fixes[+b.dataset.sum].correction));
    U.$('#chatSummary', el).scrollIntoView({ behavior: 'smooth' });
  };

  send(START, true);
}
