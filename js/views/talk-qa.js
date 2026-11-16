/* 英会話：英語で質疑応答（AIなし・オフラインでも使える）
 * アプリが英語で質問 → 声（または入力）で答える → 相づち＋次の質問が返ってくる。
 * 1つの質問につき、メインの質問＋続けて聞く質問2つで会話を続ける。
 * 続けて聞く質問・相づち・アプリ自身の話は、答えの内容（話題）に合わせて TALK_FLOW から毎回選び、
 * 同じ文はなるべく繰り返さない（話題が見つからないときは、データの「続けて聞く質問」を使う）。
 * 内容の正しさは判定せず、「文で答えたか・理由・具体例・よくある間違い」をその場でアドバイスする。 */

const qaPick = a => a[Math.floor(Math.random() * a.length)];
const qaHasJa = s => /[぀-ヿ㐀-鿿]/.test(s);
const qaWords = s => String(s).match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || [];
const qaCount = id => ((Store.data.talk.qa || {})[id]) || 0;

// 質問の形から、答え方のヒント（書き出し）を作る
function qaHint(q) {
  const rules = [
    [/^(can you )?tell me\b/i, 'I ... ／ One time, I ... ＋ そのときどう感じたか'],
    [/\bprefer\b|^which\b|\bbetter\b|\ba \w+ person or\b/i, 'I prefer ... because ... ／ I think ... is better because ...'],
    [/^do you think\b|^is it important\b|^should\b/i, 'I think ... because ... ／ I don\'t think ... because ...'],
    [/^why\b/i, 'Because ...（理由をひとつ）＋ For example, ...'],
    [/^how often\b/i, 'I ... every day ／ once a week ／ about twice a month.'],
    [/^how long\b/i, 'It takes about ... minutes. ／ For about ... years.'],
    [/^how much time\b/i, 'About ... hours a day. I mostly ...'],
    [/^how did\b/i, '過去形で：First, I ... Then, I ... ／ I asked ... for help.'],
    [/^how (do|would|can)\b/i, 'I usually ... ／ First, I ... Then, I ...'],
    [/^how\b/i, 'It was ... ／ I think ... because ...'],
    [/^where\b/i, 'I ... in ... ／ It\'s near ... ／ The best place is ...'],
    [/^when\b/i, 'Usually ... ／ When I was ..., I ...'],
    [/^who\b/i, 'My ... ／ I usually talk to my ...'],
    [/^what (is|was) (your|the) (favorite|best)\b/i, 'My favorite ... is ... because ...'],
    [/^what did\b/i, '過去形で：I went to ... ／ I watched ... ／ It was ...'],
    [/^(what )?would you\b|^if\b/i, 'I would ... because ... ／ Yes, I would. I ...'],
    [/^(do|does|did|are|is|was|were|have|has|can|could|would|will)\b/i, 'Yes, I do. ／ No, I don\'t. ＋ 理由や具体例をひとこと'],
    [/^what\b/i, 'I ... ／ I think ... because ...']
  ];
  const r = rules.find(([re]) => re.test(q.trim()));
  return r ? r[1] : 'I ... because ...';
}

// 動詞の -ing 形（簡易版）
function qaIng(v) {
  v = v.toLowerCase();
  if (/ie$/.test(v)) return v.slice(0, -2) + 'ying';
  if (/[^aeiou]e$/.test(v) && v !== 'be') return v.slice(0, -1) + 'ing';
  if (/^(swim|run|get|shop|sit|stop|plan|jog|put|cut|begin|win|chat)$/.test(v)) return v + v.slice(-1) + 'ing';
  return v + 'ing';
}

// よくある間違い [見つける形, 自然な言い方（$1 などで置換、または関数）, 説明]
const QA_FIXES = [
  [/\bI am agree\b/i, 'I agree', 'agree は動詞なので am は不要'],
  [/\bvery like\b/i, 'really like', '「とても好き」は really like ／ like ... very much'],
  [/\bI['’]?m boring\b|\bI am boring\b/i, "I'm bored", '「退屈している」は bored（boring は「退屈させる」）'],
  [/\bI['’]?m interesting in\b|\bI am interesting in\b/i, "I'm interested in", '「興味がある」は interested in'],
  [/\b(we|they|you) was\b/i, '$1 were', 'we / they / you のあとは were'],
  [/\benjoy to (\w+)/i, g => 'enjoy ' + qaIng(g[1]), 'enjoy のあとは -ing 形'],
  [/\blook forward to (see|meet|hear|go|visit|talk)\b/i, g => 'look forward to ' + qaIng(g[1]), 'look forward to のあとは -ing 形'],
  [/\bmore better\b/i, 'better', 'better だけで「より良い」'],
  [/\bdiscuss about\b/i, 'discuss', 'discuss は about なしで使う'],
  [/\bmarried with\b/i, 'married to', '「〜と結婚している」は married to'],
  [/\b(go|went|going) to shopping\b/i, '$1 shopping', '「買い物に行く」は go shopping（to は不要）'],
  [/\b(go|went|come|came|get|got|going) to home\b/i, '$1 home', 'home の前に to は不要'],
  [/\b(go|went|going) to there\b/i, '$1 there', 'there の前に to は不要'],
  [/\breturn back\b/i, 'return', 'return だけで「戻る」'],
  [/\bmost of (people|Japanese)\b/i, 'most $1', '「ほとんどの人」は most people（of は不要）'],
  [/\bsince (\d+|one|two|three|four|five|six|seven|eight|nine|ten) years\b/i, 'for $1 years', '期間は for（since は「〜以来」）'],
  [/\bvisit to\b/i, 'visit', 'visit は to なしで「〜を訪れる」'],
  [/\bcan able to\b/i, 'can ／ be able to', 'can と able to はどちらか一方だけ'],
  [/\bevery (days|weeks|months|years|weekends)\b/i, g => 'every ' + g[1].replace(/s$/i, ''), 'every のあとは単数形'],
  [/\bmany (homework|information|advice|money|furniture)\b/i, 'a lot of $1', '$1 は数えられないので many は使わない'],
  [/\b(on|in|at) (last|next) (week|month|year|weekend|night|summer|winter|spring|fall|sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i, '$2 $3', 'last / next の前に on・in・at は不要'],
  [/(^|[\s.,!?])i(?=[\s'’]|$)/, 'I', '「私」の I はいつも大文字']
];

function qaCheck(text, question) {
  const w = qaWords(text), n = w.length;
  const ja = qaHasJa(text);
  const yesNoQ = /^(do|does|did|are|is|was|were|have|has|can|could|would|will|should)\b/i.test(question.trim()) && !/^(can you )?tell me/i.test(question.trim());
  const yesNoOnly = n <= 3 && /\b(yes|no|yeah|nope|sure)\b/i.test(text);
  const reason = /\b(because|since|so|that's why|the reason)\b/i.test(text);
  const example = /\b(for example|for instance|such as)\b/i.test(text);
  const link = /\b(and|but|also|however|then|so)\b/i.test(text);
  const fixes = QA_FIXES.filter(([re]) => re.test(text)).map(([re, to, why]) => {
    const g = text.match(re);
    const m = g[0].trim();
    let conv = typeof to === 'function' ? to(g) : to.includes('$') ? m.replace(new RegExp(re.source, 'i'), to) : to;
    if (/^[A-Z]/.test(m) && /^[a-z]/.test(conv)) conv = conv[0].toUpperCase() + conv.slice(1);
    return { from: m, to: conv, why: why.replace(/\$1/g, g[1] || '') };
  });
  const sentence = n >= 2 && /^\s*(i|we|my|it|they|he|she|there|yes|no|yeah|usually|sometimes|maybe)\b/i.test(text);
  let tip;
  if (ja && n < 3) tip = '英語で答えてみましょう。言えない単語は、知っている簡単な単語で言いかえてOKです。';
  else if (yesNoQ && yesNoOnly) tip = 'Yes / No だけで終わらせず、ひとこと足そう（例：Yes, I do. I ... every weekend.）';
  else if (n < 4 && sentence) tip = 'いいスタートです！「いつ・どこで・だれと・なぜ」を1つ足して、もう少し詳しく話してみよう。';
  else if (n < 4) tip = '主語と動詞のある文で答えてみよう（例：I usually ... ／ I think ...）';
  else if (n < 8 && !reason) tip = '「because ...」で理由を足すと、会話が続きやすくなります。';
  else if (n < 12 && !example && !reason) tip = '「For example, ...」で具体例を足すと、もっと伝わります。';
  else if (fixes.length) tip = '言いたいことはしっかり伝わっています！ 下の「より自然な言い方」も確認しよう。';
  else if (n >= 12 && (reason || example)) tip = 'すばらしい！ 理由や具体例まで話せています。';
  else tip = 'いい答えです！ この調子で、文をもう1つ足してみよう。';
  const level = n >= 12 || (n >= 8 && (reason || example)) ? 3 : n >= 4 ? 2 : 1;
  return { n, ja, yesNoOnly, reason, example, link, fixes, tip, level, short: n < 4 };
}

// 答えに合わせた相づち（英語）
/* ---------- 会話パターン（相づち・自分の話・深掘り） ---------- */
// 使った文（英語）を覚えておき、なるべく同じ文を繰り返さない（アプリを開いている間はずっと有効）
const QA_USED = new Set();     // 相づち・つなぎ・感想
const QA_USED_Q = new Set();   // 深掘りの質問
const QA_RECENT = [];          // 直近に使った文（使い回すときも、すぐには繰り返さない）
// pool：[英語, 日本語訳] の配列。まだ使っていないものから選ぶ。全部使ったら、直近の文を除いて使い回す
function qaFresh(pool, used = QA_USED) {
  let cand = pool.filter(p => !used.has(p[0]));
  if (!cand.length) {
    pool.forEach(p => used.delete(p[0]));
    cand = pool.filter(p => !QA_RECENT.includes(p[0]));
    if (!cand.length) cand = pool;
  }
  const pick = qaPick(cand);
  used.add(pick[0]);
  QA_RECENT.push(pick[0]);
  if (QA_RECENT.length > 8) QA_RECENT.shift();
  return pick;
}
// 答えの中でいちばん先に出てきた話題。その話題の質問を全部聞き終えていたら、もう一度使えるように戻す
function qaTopicOf(text) {
  let best = null, at = Infinity;
  TALK_FLOW.topics.forEach(t => {
    const m = String(text).match(t.re);
    if (m && m.index < at) { best = t; at = m.index; }
  });
  if (best && best.qs.every(q => QA_USED_Q.has(q[0]))) best.qs.forEach(q => QA_USED_Q.delete(q[0]));
  return best;
}
// 相手（アプリ）に質問を返したか（How about you? など）
function qaAskedBack(text) {
  return /\b(how about you|what about you|and you|how about yourself|what do you think|do you like|have you ever|what's yours|what is yours)\b/i.test(text);
}
const QA_NEG = /\b(not really|don't like|do not like|didn't like|don't enjoy|hate|tired|exhausted|busy|stress|stressed|stressful|sick|sad|boring|bored|terrible|awful|problem|problems|missed|lost|failed|worried|lonely|(?:so|very|too|really|it's|it is|was) (?:hard|difficult))\b/;
const QA_POS = /\b(love|loved|like|liked|enjoy|enjoyed|fun|great|happy|favorite|favourite|exciting|excited|interesting|delicious|beautiful|amazing|wonderful|best|nice|relaxing|good)\b/;
// 答えに合った相づち [英語, 訳]
function qaReact(text, check) {
  const R = TALK_FLOW.react, t = String(text).toLowerCase();
  let pool;
  if (/\bnot bad\b/.test(t)) pool = R.notbad;
  else if (/\b(me too|same here|same as you)\b/.test(t)) pool = R.same;
  else if (QA_NEG.test(t)) pool = R.negative;
  else if (/\bnever\b/.test(t)) pool = R.never;
  else if (/\b(\d+|three|four|five|six|seven|eight|nine|ten|many) years\b|\bsince i was (a kid|a child|little|young)\b/.test(t)) pool = R.longtime;
  else if (QA_POS.test(t) && /\b(went|visited|got|won|passed|bought|going to|will go)\b/.test(t)) pool = R.goodnews;
  else if (QA_POS.test(t)) pool = R.positive;
  else if (check && check.reason) pool = R.reason;
  else if (check && check.example) pool = R.example;
  else pool = R.neutral;
  const r = qaFresh(pool);
  // 長くしっかり答えたときは、ときどきほめる
  if (check && check.n >= 18 && Math.random() < 0.5) { const l = qaFresh(R.long); return [`${l[0]} ${r[0]}`, l[1] + r[1]]; }
  return r;
}
// 答えへの返事：相づち＋（質問を返されたら答える／ときどき自分の感想）＋次の質問
// fixedQs：データにある「続けて聞く質問」の残り。話題が見つからないときに使う
// flow：会話の状態 { topic：今話している話題, commented：前の返事で自分の感想を言ったか }
function qaReply(text, check, fixedQs, flow) {
  const en = [], ja = [];
  const add = p => { en.push(p[0]); ja.push(p[1]); };
  const found = text ? qaTopicOf(text) : null;
  const topic = found || flow.topic;      // 答えに話題がなければ、今の話題を続ける
  if (text) {
    add(qaReact(text, check));
    if (qaAskedBack(text)) { add(qaFresh((topic && topic.me) || TALK_FLOW.me)); flow.commented = true; }
    else if (found && !flow.commented && Math.random() < 0.6) { add(qaFresh(found.comments)); flow.commented = true; }
    else flow.commented = false;            // 感想は続けて言わない
  }
  flow.topic = topic;
  let q = null, viaTopic = false;
  if (topic) { q = qaFresh(topic.qs, QA_USED_Q); viaTopic = true; }   // 全部聞いたら、直近の質問を除いて使い回す
  if (!q && fixedQs.length) q = [fixedQs[0], TALK_FLOW.followJa[fixedQs[0]] || ''];
  if (!q) q = qaFresh(TALK_FLOW.general, QA_USED_Q);
  const question = q[0];
  // 話題の質問の前に、ときどきつなぎの一言（, で終わるものは次の文の頭を小文字に）
  if (viaTopic && text && Math.random() < 0.4) {
    const b = qaFresh(TALK_FLOW.bridges);
    add(b);
    if (b[0].endsWith(',')) q = [q[0].charAt(0).toLowerCase() + q[0].slice(1), q[1]];
  }
  add(q);
  return { text: en.join(' '), ja: ja.join(''), q: question };
}
// ヒントに出す「使える表現」（表現集から：理由・例え／質問を返す／考える時間をかせぐ）
function qaBankTips() {
  if (typeof TALK_BANK === 'undefined') return '';
  const card = id => { const [c, n] = id.split('-'); const cat = TALK_BANK.cats.find(x => x.id === c); return cat && cat.cards[+n - 1]; };
  const picks = [qaPick(['opinion-5', 'opinion-6']), 'clarify-5', 'clarify-7'].map(card).filter(Boolean)
    .map(k => qaPick(k.vs.filter(v => v.lv <= 2)));
  return `<div class="small qa-hint">💬 使える表現：${picks.map(v => `<span class="en">${U.esc(v.en)}</span>（${U.esc(v.ja)}）`).join(' ／ ')}</div>`;
}

function qaNotice() {
  return Mic.supported()
    ? '<p class="small muted">🎤 「話す」を押して英語で答えると、音声認識で文字にして次の質問へ進みます（初回はマイクの許可を求められます）。</p>'
    : '<p class="small">📱 <b>iPhone では、キーボードの🎤（音声入力）を押して英語で話すと文字で入力できます。</b>キーボードを「English」に切り替えてから話してください。</p>';
}

/* ---------- テーマ選択 ---------- */
function talkQaMenu(el) {
  const all = TALK_QA.topics.flatMap(t => t.questions);
  const done = all.filter(q => qaCount(q.id)).length;
  el.innerHTML = `
  <h1 class="page">🗣️ 英語で質疑応答</h1>
  ${talkTabs('qa')}
  <div class="card talk-intro">
    <p>アプリが英語で質問するので、<b>英語で答えてください</b>。答えると相づちと次の質問が返ってきて、会話が続きます（1テーマ3問・1問につき質問3つ）。</p>
    <p class="small muted">APIキー不要・無料・オフラインでも使えます。内容の正しさは判定しませんが、「文で答えたか・理由・具体例・よくある間違い」をその場でアドバイスします。自由に話したいときは「🤖 AI会話」を使ってください。</p>
    <div class="talk-progress"><div><i style="width:${U.pct(done, all.length)}%"></i></div><span>${done} / ${all.length} 問に答えました</span></div>
    ${qaNotice()}
    <div class="btn-row"><a class="btn primary" href="#talk/qa/all">🎲 ランダムに3問</a></div>
  </div>
  <h2 class="sec">テーマを選ぶ</h2>
  <div class="scene-grid">
    ${TALK_QA.topics.map(t => { const m = t.questions.filter(q => qaCount(q.id)).length; return `
      <a class="scene-card" href="#talk/qa/${t.id}">
        <span class="scene-ic">${t.icon}</span>
        <b>${U.esc(t.name)}</b>
        <small class="muted">${U.esc(t.desc)}</small>
        <span class="scene-bar"><i style="width:${U.pct(m, t.questions.length)}%"></i></span>
        <small>${m}/${t.questions.length} 問</small>
      </a>`; }).join('')}
  </div>`;
}

/* ---------- 質疑応答の本体 ---------- */
function talkQaRun(topicId, el) {
  const topic = TALK_QA.topics.find(t => t.id === topicId);
  const pool = topic ? topic.questions : TALK_QA.topics.flatMap(t => t.questions);
  // まだ答えていない質問を優先して3問
  const items = U.shuffle(pool.slice()).sort((a, b) => qaCount(a.id) - qaCount(b.id)).slice(0, 3);
  const head = topic ? `${topic.icon} ${U.esc(topic.name)}` : '🎲 ランダム';
  let qi = 0, stage = 0, askedMore = false, current = '', busy = false;
  const view = [];       // {who:'app'|'you'|'sample', ...}
  const answers = [];    // {text, check}
  const asked = new Set();       // この回で聞いた質問（同じ質問を二度聞かない）
  const flow = { topic: null, commented: false };   // 今の話題など（次のメインの質問で戻す）
  let showText = Store.setting('qaShowText') !== false;

  el.innerHTML = `
  <div class="quiz-head"><a href="#talk/qa" class="back">← テーマ</a><span>${head}</span><span id="qaProg"></span></div>
  <div class="card ai-chat">
    <label class="chk small"><input type="checkbox" id="qaShow" ${showText ? 'checked' : ''}> 質問の英文を表示する（オフにすると聞き取りの練習になります）</label>
    ${jaSubToggle('qaJa')}
    <div class="chat" id="chat"></div>
    <div id="qaCtl"></div>
    <p class="small muted" id="chatNote"></p>
  </div>
  <div id="chatSummary"></div>`;
  const chatEl = U.$('#chat', el), ctl = U.$('#qaCtl', el), note = U.$('#chatNote', el);
  U.$('#qaShow', el).onchange = e => { showText = e.target.checked; Store.setSetting('qaShowText', showText); draw(); };
  bindJaSub('qaJa', el, () => draw());

  const say = t => Speech.play([{ sp: 'W', t }], { rate: 0.92 });

  function draw() {
    U.$('#qaProg', el).textContent = `${Math.min(qi + 1, items.length)} / ${items.length}`;
    chatEl.innerHTML = view.map((m, k) => {
      if (m.who === 'app') return `<div class="bubble them"><span class="who">🧑‍🏫</span><div>
        ${showText || m.revealed ? `<p class="en">${U.esc(m.text)} <button type="button" class="icon-btn" data-say="${k}" title="聞く">🔊</button></p>`
          : `<p><button type="button" class="btn small-btn" data-say="${k}">🔊 もう一度聞く</button> <button type="button" class="btn small-btn" data-reveal="${k}">英文を見る</button></p>`}
        ${jaSubHTML(m.ja)}</div></div>`;
      if (m.who === 'sample') return `<div class="qa-sample"><div class="small muted">📘 見本の答え（Q. ${U.esc(m.q)}）</div>
        <p class="en"><b>${U.esc(m.text)}</b> <button type="button" class="icon-btn" data-say="${k}" title="聞く">🔊</button></p>${jaSubHTML(m.ja)}</div>`;
      const c = m.check;
      return `<div class="bubble you"><div><p class="en">${U.esc(m.text)}</p>
        ${c ? `<div class="qa-fb"><span class="qa-tags">${['', '💪', '👍', '🌟'][c.level]} ${c.n}語${c.reason ? '<span class="pill">理由</span>' : ''}${c.example ? '<span class="pill">具体例</span>' : ''}</span><div class="small">${U.esc(c.tip)}</div>
        ${c.fixes.map(f => `<div class="fix"><span class="small">💡 ${U.esc(f.from)} → </span><span class="en">${U.esc(f.to)}</span><div class="small muted">${U.esc(f.why)}</div></div>`).join('')}</div>` : ''}
        </div><span class="who">🙂</span></div>`;
    }).join('');
    U.$$('[data-say]', chatEl).forEach(b => b.onclick = () => say(view[+b.dataset.say].text));
    U.$$('[data-reveal]', chatEl).forEach(b => b.onclick = () => { view[+b.dataset.reveal].revealed = true; draw(); });
    const last = chatEl.lastElementChild;
    if (last) last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // text：画面に出して読み上げる文 / q：答えのチェックやヒントに使う質問（省略時は今の質問のまま）
  function ask(text, ja, q) {
    if (q) { current = q; asked.add(q); }
    view.push({ who: 'app', text, ja });
    draw();
    say(text);
    answerCtl();
  }

  function answerCtl() {
    const useMic = Mic.supported();
    ctl.innerHTML = `
      <div class="chat-input">
        ${useMic ? '<button type="button" class="btn primary mic-btn" id="chatMic">🎤 話す</button>' : ''}
        <form id="chatForm" class="chat-form">
          <input id="chatText" autocomplete="off" autocapitalize="sentences" spellcheck="true" placeholder="${useMic ? 'マイクが使えないときは入力' : '英語で答える（キーボードの🎤でも入力できます）'}">
          <button class="btn primary" id="sendBtn">答える</button>
        </form>
      </div>
      <div class="btn-row qa-sub">
        <button type="button" class="btn small-btn" id="hintBtn">💡 ヒント</button>
        <button type="button" class="btn small-btn" id="passBtn">パス</button>
      </div>
      <div id="hintBox"></div>`;
    U.$('#hintBtn', ctl).onclick = () => {
      U.$('#hintBox', ctl).innerHTML = `<p class="small qa-hint">答え方の例：<span class="en">${U.esc(askedMore ? 'For example, ... ／ Because ... ／ Also, ...' : qaHint(current))}</span></p>${qaBankTips()}`;
    };
    U.$('#passBtn', ctl).onclick = () => { if (!busy) { Speech.stop(); Mic.stop(); advance(null); } };
    U.$('#chatForm', ctl).onsubmit = e => {
      e.preventDefault();
      const inp = U.$('#chatText', ctl);
      const v = inp.value.trim();
      if (!v) return;
      inp.value = '';
      answer(v);
    };
    const mb = U.$('#chatMic', ctl);
    if (mb) mb.onclick = () => {
      if (Mic.current) { Mic.stop({ keep: true }); return; }
      const inp = U.$('#chatText', ctl);
      mb.textContent = '■ 止める';
      mb.classList.add('rec-on');
      const LISTEN = '● 聞いています… 英語で答えてください';
      note.innerHTML = `<span class="listening">${U.esc(Mic.prepText(LISTEN))}</span>`;
      Mic.listen({
        onstart: () => { note.innerHTML = `<span class="listening">${LISTEN}</span>`; },
        onresult: (alts, fin) => {
          inp.value = alts[0];
          if (!fin) { note.innerHTML = `<span class="listening">● ${U.esc(alts[0])}</span>`; return; }
          note.textContent = ''; const v = inp.value.trim(); inp.value = ''; if (v) answer(v);
        },
        onerror: code => { note.innerHTML = `<span class="mic-off">${U.esc(Mic.errorMessage(code))}</span> ${U.esc(Mic.typingTip(code))}`; },
        onend: () => { mb.textContent = '🎤 話す'; mb.classList.remove('rec-on'); if (U.$('.listening', note)) note.textContent = ''; }
      });
    };
  }

  function answer(text) {
    if (busy) return;
    busy = true;
    const c = qaCheck(text, current);
    view.push({ who: 'you', text, check: c });
    draw();
    setTimeout(() => {
      busy = false;
      // 日本語だけの答え → 英語で言い直してもらう
      if (c.ja && c.n < 3) { const m = qaFresh(TALK_FLOW.inEnglish); ask(m[0], m[1]); return; }
      answers.push({ text, check: c });
      Store.day().speaking++; Store.save();
      // 短すぎる答え → 一度だけ「もう少し教えて」と聞く
      // 話題が分かれば、その話題を深掘りする質問（例：I like traveling. → What country would you like to visit?）
      if (c.short && !askedMore) {
        askedMore = true;
        if (qaTopicOf(text)) { const r = qaReply(text, c, [], flow); ask(r.text, r.ja, r.q); return; }
        const lead = qaFresh(TALK_FLOW.moreLead), more = qaFresh(TALK_FLOW.more);
        ask(`${lead[0]} ${more[0]}`, lead[1] + more[1]);
        return;
      }
      advance(text, c);
    }, 500);
  }

  // 次の質問へ進む（text が null ならパス）
  function advance(text, check) {
    askedMore = false;
    stage++;
    const it = items[qi];
    if (stage <= it.follow.length) {
      // 答えの話題（なければ今の話題）に合う質問を優先し、話題がないときはデータの質問を使う
      const fixed = it.follow.filter(f => !asked.has(f));
      const r = qaReply(text, check, fixed, flow);
      QA_USED_Q.add(r.q);
      ask(r.text, r.ja, r.q);
      return;
    }
    // この質問はおしまい：見本の答えを見せる
    Store.data.talk.qa = Store.data.talk.qa || {};
    Store.data.talk.qa[it.id] = qaCount(it.id) + 1;
    Store.save();
    if (text) {
      // 最後に質問を返されたら、短く答えてからお礼を言う
      const me = qaAskedBack(text) ? qaFresh(((flow.topic || qaTopicOf(text)) || {}).me || TALK_FLOW.me) : null;
      const th = qaFresh(TALK_FLOW.thanks);
      view.push({ who: 'app', text: me ? `${me[0]} ${th[0]}` : th[0], ja: me ? me[1] + th[1] : th[1] });
    }
    view.push({ who: 'sample', q: it.q, text: it.sample, ja: it.sampleJa });
    draw();
    if (text) say(view[view.length - 2].text);
    const last = qi === items.length - 1;
    ctl.innerHTML = `<div class="btn-row"><button type="button" class="btn primary" id="nextQ">${last ? '結果を見る' : '次の質問へ ▶'}</button></div>`;
    U.$('#nextQ', ctl).onclick = () => {
      Speech.stop();
      if (last) return finish();
      qi++; stage = 0;
      flow.topic = null; flow.commented = false;
      const nx = items[qi];
      const lead = qaFresh(TALK_FLOW.next);
      ask(`${lead[0]} ${nx.q}`, lead[1] + nx.ja, nx.q);
    };
  }

  function finish() {
    ctl.innerHTML = '';
    const words = answers.reduce((a, x) => a + x.check.n, 0);
    const avg = answers.length ? Math.round(words / answers.length) : 0;
    const best = answers.slice().sort((a, b) => b.check.n - a.check.n)[0];
    const fixes = answers.flatMap(a => a.check.fixes);
    if (answers.length) {
      Store.data.talk.log.push({ id: 'qa:' + (topic ? topic.id : 'all'), turns: answers.length, words, date: U.today() });
      Store.save();
      Sound.finish(avg >= 10 ? 100 : avg >= 6 ? 80 : 60);
    }
    U.$('#chatSummary', el).innerHTML = `
      <div class="card result">
        <div class="score">${answers.length}<small>回 英語で答えました</small></div>
        <p>話した単語：<b>${words}語</b>（1回あたり平均 <b>${avg}語</b>）</p>
        <p class="small muted">${avg >= 12 ? 'すばらしい！ 自然な会話の長さで答えられています。' : avg >= 6 ? 'いい調子です。次は1回の答えに「理由」か「具体例」を1つ足して、12語を目指しましょう。' : 'まずは「I + 動詞 ...」の文で答えることから。ヒントの書き出しを使ってみましょう。'}</p>
        ${best ? `<p class="small">いちばん長く話せた答え：<span class="en">${U.esc(best.text)}</span></p>` : ''}
        ${Coach.nextStepHTML('talk')}
        <div class="btn-row"><a class="btn primary" href="#talk/qa/${topic ? topic.id : 'all'}">もう一度（別の質問）</a><a class="btn" href="#talk/qa">別のテーマ</a></div>
      </div>
      ${fixes.length ? `<div class="card"><h2>今日の言い直しポイント</h2>
        <ul class="fix-list">${fixes.map(f => `<li><span class="small muted">${U.esc(f.from)} → </span><b class="en">${U.esc(f.to)}</b><div class="small">${U.esc(f.why)}</div></li>`).join('')}</ul></div>` : ''}`;
    U.$('#chatSummary', el).scrollIntoView({ behavior: 'smooth' });
  }

  const first = items[0];
  ask(`Hi! Let's talk in English. ${first.q}`, first.ja, first.q);
}
