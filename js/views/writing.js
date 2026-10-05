/* ライティング：英文要約 / 意見論述 / 攻略法 / 履歴 */
const CHECKS = {
  summary: ['重要な内容を入れた', '内容から外れていない', '自分の意見を入れていない', '語数を守った', '文法を確認した', 'スペルを確認した'],
  opinion: ['意見を明確にした', '理由を2つ書いた', '理由を具体的に説明した', 'TOPICからずれていない', '文法を確認した', 'スペルを確認した']
};

function writingTabs(active) {
  const t = [['#writing', 'top', 'トップ'], ['#writing/summary', 'summary', '英文要約'], ['#writing/opinion', 'opinion', '意見論述'], ['#writing/guide-summary', 'gs', '要約の攻略法'], ['#writing/guide-opinion', 'go', '意見論述の書き方'], ['#writing/history', 'history', '回答履歴']];
  return `<div class="tabs">${t.map(([h, k, n]) => `<a href="${h}" class="${k === active ? 'on' : ''}">${n}</a>`).join('')}</div>`;
}

Views.writing = (args, el) => {
  const [type, sub] = args;
  if (type === 'summary' || type === 'opinion') return sub ? writingTask(type, sub, el) : writingMenu(type, el);
  if (type === 'guide-summary') return guideSummary(el);
  if (type === 'guide-opinion') return guideOpinion(el);
  if (type === 'history') return writingHistory(el);

  const W = Store.data.writing;
  const L = CONFIG.wordLimits;
  el.innerHTML = `<h1 class="page">✍️ ライティング</h1>${writingTabs('top')}
  <div class="grid2">
    <a class="card link-card" href="#writing/summary"><small>大問4</small><h2>英文要約</h2><p class="muted small">約150語の英文を ${L.summary.min}〜${L.summary.max}語 で要約</p><p>収録 ${WRITING_DATA.summary.length}問 ／ 練習 ${W.filter(w => w.type === 'summary').length}回</p></a>
    <a class="card link-card" href="#writing/opinion"><small>大問5</small><h2>意見論述（英作文）</h2><p class="muted small">TOPICに対する意見と理由2つを ${L.opinion.min}〜${L.opinion.max}語 で</p><p>収録 ${WRITING_DATA.opinion.length}問 ／ 練習 ${W.filter(w => w.type === 'opinion').length}回</p></a>
    <a class="card link-card" href="#writing/guide-summary"><h2>要約の攻略法</h2><p class="muted small">7つのステップで要約の書き方をマスター</p></a>
    <a class="card link-card" href="#writing/guide-opinion"><h2>意見論述の基本構成</h2><p class="muted small">意見 → 理由1 → 理由2 → 結論</p></a>
  </div>
  <p class="muted small">※ 語数の指定は設定値（js/config.js）で管理しています。公式の形式が変わった場合は公式情報を優先してください。</p>`;
};

function writingMenu(type, el) {
  const list = WRITING_DATA[type];
  const W = Store.data.writing;
  el.innerHTML = `<h1 class="page">✍️ ${type === 'summary' ? '英文要約' : '意見論述'}</h1>${writingTabs(type)}
  <a class="btn primary block" href="#writing/${type}/auto">おすすめの1問に挑戦</a>
  <div class="plist">${list.map(p => { const n = W.filter(w => w.promptId === p.id).length; return `<a class="card link-card row" href="#writing/${type}/${p.id}"><span class="pill">${U.esc(p.theme)}</span><b>${U.esc(type === 'summary' ? p.title : p.topicJa)}</b><small class="muted">${n ? `練習 ${n}回` : '未挑戦'}</small></a>`; }).join('')}</div>`;
}

function writingTask(type, sub, el) {
  const list = WRITING_DATA[type];
  let p;
  if (sub === 'auto') {
    const cnt = id => Store.data.writing.filter(w => w.promptId === id).length;
    p = U.shuffle(list).sort((a, b) => cnt(a.id) - cnt(b.id))[0];
  } else p = list.find(x => x.id === sub);
  if (!p) { el.innerHTML = '<div class="card empty">問題が見つかりません。</div>'; return; }
  const lim = CONFIG.wordLimits[type];
  Store.data.drafts = Store.data.drafts || {};
  const draft = Store.data.drafts[p.id] || { text: '', opinion: '' };
  const isSum = type === 'summary';

  el.innerHTML = `
  <div class="quiz-head"><a href="#writing/${type}" class="back">← 戻る</a><span>${isSum ? '英文要約' : '意見論述'}</span><span class="pill">${U.esc(p.theme)}</span></div>
  ${isSum ? `
  <div class="card">
    <div class="instr">● 以下の英文を読んで、その内容を英語で要約し、解答欄に記入しなさい。<br>● 語数の目安は${lim.min}語〜${lim.max}語です。<br>● 解答が英文の要約になっていないと判断された場合は、0点と採点されることがあります。英文をよく読んでから答えてください。</div>
    <article class="passage en">${p.text.map(t => `<p>${U.esc(t)}</p>`).join('')}</article>
    <details><summary>日本語訳を見る</summary>${p.ja.map(t => `<p class="small">${U.esc(t)}</p>`).join('')}</details>
  </div>` : `
  <div class="card">
    <div class="instr">● 以下のTOPICについて、あなたの意見とその理由を2つ書きなさい。<br>● POINTSは理由を書く際の参考となる観点を示したものです。ただし、これら以外の観点から理由を書いてもかまいません。<br>● 語数の目安は${lim.min}語〜${lim.max}語です。</div>
    <div class="label">TOPIC</div>
    <p class="topic en">${U.esc(p.topic)}</p>
    <p class="muted small">${U.esc(p.topicJa)}</p>
    <div class="label">POINTS</div>
    <ul class="points en">${p.points.map(x => `<li>${U.esc(x)}</li>`).join('')}</ul>
    <div class="label">YOUR OPINION</div>
    <div class="seg" id="op">${['agree', 'disagree'].map(v => `<button data-v="${v}" class="${draft.opinion === v ? 'on' : ''}">${v === 'agree' ? 'Agree（賛成）' : 'Disagree（反対）'}</button>`).join('')}</div>
  </div>`}
  <div class="card">
    <div class="label">${isSum ? 'YOUR SUMMARY' : 'YOUR ANSWER'}</div>
    <textarea id="ans" class="answer en" rows="${isSum ? 6 : 10}" placeholder="${isSum ? 'ここに英文要約を書いてください' : '自分の意見と、その理由を書いてください。'}" spellcheck="false">${U.esc(draft.text)}</textarea>
    <div id="wc" class="wc"></div>
    <div class="label">自己チェック</div>
    <div class="checks">${CHECKS[type].map((c, i) => `<label><input type="checkbox" data-i="${i}"> ${c}</label>`).join('')}</div>
    <div class="btn-row">
      <button class="btn" id="aiBtn">🤖 簡易チェック</button>
      <button class="btn primary" id="saveBtn">回答を保存</button>
      <button class="btn" id="modelBtn">解答例を見る</button>
    </div>
    <div id="aiOut"></div>
    <div id="saved"></div>
  </div>
  <div id="model"></div>`;

  const ta = U.$('#ans', el);
  let opinion = draft.opinion;
  const update = () => {
    const n = U.countWords(ta.value);
    const st = n === 0 ? '' : n < lim.min ? 'under' : n > lim.max ? 'over' : 'ok';
    const msg = { '': '', under: `あと${lim.min - n}語必要です`, over: `${n - lim.max}語オーバーしています`, ok: '指定語数の範囲内です ✓' }[st];
    U.$('#wc', el).className = 'wc ' + st;
    U.$('#wc', el).innerHTML = `<b>Word Count: ${n} / ${lim.min}–${lim.max}</b> <span>${msg}</span>`;
    Store.data.drafts[p.id] = { text: ta.value, opinion };
    clearTimeout(update.t); update.t = setTimeout(() => Store.save(), 600);
  };
  ta.oninput = update; update();
  U.$$('#op button', el).forEach(b => b.onclick = () => { opinion = b.dataset.v; U.$$('#op button', el).forEach(x => x.classList.toggle('on', x === b)); update(); });

  U.$('#aiBtn', el).onclick = async () => {
    const r = await AI.reviewWriting({ type, text: ta.value, source: isSum ? p.text.join(' ') : '', opinion });
    U.$('#aiOut', el).innerHTML = `<div class="ai-box"><b>簡易チェック結果</b> <small class="muted">（ローカル判定・将来AI添削に置き換え可能）</small>
      ${r.good.length ? `<ul class="good">${r.good.map(t => `<li>✓ ${U.esc(t)}</li>`).join('')}</ul>` : ''}
      ${r.tips.length ? `<ul class="tips">${r.tips.map(t => `<li>▲ ${U.esc(t)}</li>`).join('')}</ul>` : '<p>形式面の問題は見つかりませんでした。</p>'}</div>`;
  };

  U.$('#saveBtn', el).onclick = () => {
    const text = ta.value.trim();
    if (!text) return U.toast('回答を入力してください');
    if (!isSum && !opinion) return U.toast('YOUR OPINION（Agree / Disagree）を選んでください');
    const checks = U.$$('.checks input', el).map((c, i) => ({ label: CHECKS[type][i], ok: c.checked }));
    Store.data.writing.push({ type, promptId: p.id, title: isSum ? p.title : p.topic, text, words: U.countWords(text), opinion, checks, date: U.today(), time: new Date().toTimeString().slice(0, 5) });
    Store.day().writing++;
    delete Store.data.drafts[p.id];
    Store.save();
    U.toast('回答を保存しました');
    U.$('#saved', el).innerHTML = `<div class="feedback ok"><div class="verdict">💾 保存しました（${U.countWords(text)}語）</div><p class="small">解答例と比べて、入れるべきポイントが入っているか確認しましょう。</p>${Coach.nextStepHTML('writing')}</div>`;
  };

  U.$('#modelBtn', el).onclick = () => {
    const m = U.$('#model', el);
    m.innerHTML = isSum ? summaryModelHTML(p) : opinionModelHTML(p);
    m.scrollIntoView({ behavior: 'smooth' });
  };
}

function summaryModelHTML(p) {
  return `<div class="card model">
    <h2>解答例</h2>
    <p class="en model-text">${U.esc(p.model)}</p><p class="muted small">(${U.countWords(p.model)} words)</p>
    <h3>日本語訳</h3><p>${U.esc(p.modelJa)}</p>
    <h3>要約の構成</h3><ol>${p.structure.map(s => `<li>${U.esc(s)}</li>`).join('')}</ol>
    <h3>入れるべきポイントと「なぜ入れるのか」</h3>
    <ul class="why">${p.points.map(x => `<li><b>${U.esc(x.p)}</b><br><small>なぜ？ → ${U.esc(x.why)}</small></li>`).join('')}</ul>
    <h3>削ってよい情報</h3><ul>${p.cut.map(s => `<li>${U.esc(s)}</li>`).join('')}</ul>
    <h3>重要表現</h3><ul class="kw">${p.expressions.map(([e, j]) => `<li><span class="en">${U.esc(e)}</span>：${U.esc(j)}</li>`).join('')}</ul>
  </div>`;
}

function opinionModelHTML(p) {
  const m = p.model;
  return `<div class="card model">
    <h2>解答例（${m.stance === 'agree' ? 'Agree' : 'Disagree'}）</h2>
    <p class="en model-text">${U.esc(m.text)}</p><p class="muted small">(${U.countWords(m.text)} words)</p>
    <h3>日本語訳</h3><p>${U.esc(m.ja)}</p>
    <h3>理由1</h3><p>${U.esc(m.reason1)}</p>
    <h3>理由2</h3><p>${U.esc(m.reason2)}</p>
    <h3>文章構成</h3><ol>${m.structure.map(s => `<li>${U.esc(s)}</li>`).join('')}</ol>
    <h3>重要表現</h3><ul class="kw">${m.expressions.map(([e, j]) => `<li><span class="en">${U.esc(e)}</span>：${U.esc(j)}</li>`).join('')}</ul>
    <h3>反対の立場で書くなら（理由のアイデア）</h3><ul>${p.other.map(s => `<li>${U.esc(s)}</li>`).join('')}</ul>
  </div>`;
}

function guideSummary(el) {
  const L = CONFIG.wordLimits.summary;
  const steps = [
    ['文章全体を読む', 'まずは細部にこだわらず、最後まで一気に読みます。何について書かれた文章か（テーマ）をつかみましょう。'],
    ['中心となる内容を探す', '各段落の役割を確認します。2級の要約問題は「導入（テーマ）→ 利点・理由 → 欠点・問題点／解決策」のような構成が多いです。各段落の要点を一言でまとめます。'],
    ['重要なポイントを整理する', '「何が」「なぜ」「どうなる」を軸に、要約に必ず入れるポイントを2〜3個に絞ります。'],
    ['具体例など不要な細部を削る', 'For example 以降の具体例、人名・数字・固有名詞、繰り返しの説明は原則として削ります。具体例は「抽象的な言葉」にまとめます（例：smartphones, tablets → digital devices）。'],
    ['自分の言葉でまとめる', '本文の表現をそのまま並べるのではなく、言い換え（パラフレーズ）を使います。However / Therefore / On the other hand などで段落同士の関係を示すと論理的になります。'],
    ['語数を確認する', `${L.min}〜${L.max}語に収まっているか確認します。足りない場合は理由や結果を少し詳しく、多い場合は修飾語や重複を削ります。`],
    ['文法・スペルを確認する', '時制、主語と動詞の一致、三単現の s、複数形、冠詞、スペルを最後に見直します。']
  ];
  el.innerHTML = `<h1 class="page">✍️ 要約の攻略法</h1>${writingTabs('gs')}
  <div class="card callout">
    <b>大切な考え方</b><br>
    要約とは「本文をそのままコピーする」ことではありません。<b>重要な内容を残して、自分の言葉で短くまとめる</b>ことです。本文の文を切り貼りすると、内容のバランスが崩れたり、語数がオーバーしやすくなります。また、要約には<b>自分の意見を入れません</b>。
  </div>
  ${steps.map(([t, d], i) => `<div class="card step"><div class="no">STEP ${i + 1}</div><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
  <div class="card">
    <h2>よく使う要約の型</h2>
    <ul class="kw en">
      <li>These days, more and more people are ~. （導入）</li>
      <li>This is because ~. / One reason is that ~. （理由）</li>
      <li>~ has some advantages. For one thing, ~. Also, ~. （利点）</li>
      <li>However, there are also some problems, such as ~. （欠点）</li>
      <li>To solve this problem, ~ have started to ~. （解決策）</li>
    </ul>
    <h2>言い換えの例</h2>
    <ul class="kw">
      <li><span class="en">smartphones, tablets, and laptops</span> → <span class="en">digital devices</span></li>
      <li><span class="en">doctors and nurses</span> → <span class="en">medical workers</span></li>
      <li><span class="en">it costs less money</span> → <span class="en">it is cheaper</span></li>
      <li><span class="en">many people have started to ~</span> → <span class="en">~ is becoming popular</span></li>
    </ul>
    <a class="btn primary" href="#writing/summary/auto">要約を練習する</a>
  </div>`;
}

function guideOpinion(el) {
  const L = CONFIG.wordLimits.opinion;
  el.innerHTML = `<h1 class="page">✍️ 意見論述の基本構成</h1>${writingTabs('go')}
  <div class="card">
    <p>英検2級の意見論述は、TOPICに対して<b>自分の意見と理由2つ</b>を ${L.min}〜${L.max}語 で書きます。まずは次の4つのパーツで組み立てましょう。</p>
    <div class="structure">
      <div><span>① 意見</span><p class="en">I agree with this idea. / I do not think that ~.</p><small>TOPICに対する賛成・反対を最初にはっきり書く（1文）</small></div>
      <div><span>② 理由1</span><p class="en">First, ~. For example, ~.</p><small>理由＋具体的な説明・例（2〜3文）</small></div>
      <div><span>③ 理由2</span><p class="en">Second, ~. This means that ~.</p><small>理由1とは別の観点（2〜3文）</small></div>
      <div><span>④ 結論</span><p class="en">For these reasons, I agree with this idea.</p><small>意見をもう一度まとめる（1文）</small></div>
    </div>
  </div>
  <div class="card callout">
    <b>テンプレートの丸暗記だけでは不十分です</b><br>
    型はあくまで「骨組み」です。採点では<b>内容（理由が適切か）・構成・語彙・文法</b>が見られます。「便利だから」「良いから」で終わらせず、<b>誰にとって・どのように・その結果どうなるのか</b>を具体的に書きましょう。
    <ul>
      <li>✕ First, it is convenient.（抽象的すぎる）</li>
      <li>◯ First, online shopping saves time. People who are busy with work can buy things at night without going to stores.（具体的）</li>
    </ul>
  </div>
  <div class="card">
    <h2>理由を考えるときの観点（POINTSの例）</h2>
    <p>Cost（費用）/ Time（時間）/ Health（健康）/ Safety（安全）/ Environment（環境）/ Convenience（便利さ）/ Education（教育）/ Communication（コミュニケーション）/ Experience（経験）</p>
    <h2>使える表現</h2>
    <ul class="kw">
      <li><span class="en">I think that ~ / I do not think that ~</span>：〜だと思う／思わない</li>
      <li><span class="en">First, ~ / Second, ~ / In addition, ~</span>：第一に／第二に／さらに</li>
      <li><span class="en">For example, ~ / For instance, ~</span>：例えば</li>
      <li><span class="en">As a result, ~ / Therefore, ~</span>：その結果／したがって</li>
      <li><span class="en">This is because ~</span>：これは〜だからだ</li>
      <li><span class="en">For these reasons, ~</span>：これらの理由から</li>
    </ul>
    <a class="btn primary" href="#writing/opinion/auto">意見論述を練習する</a>
  </div>`;
}

function writingHistory(el) {
  const W = Store.data.writing.slice().reverse();
  el.innerHTML = `<h1 class="page">✍️ 回答履歴</h1>${writingTabs('history')}
  ${W.length ? W.map(w => `<details class="card"><summary><span class="pill">${w.type === 'summary' ? '要約' : '意見論述'}</span> ${U.esc(w.date)} ${w.opinion ? `<span class="pill">${w.opinion === 'agree' ? 'Agree' : 'Disagree'}</span>` : ''} <b>${w.words}語</b><br><small class="muted en">${U.esc(w.title)}</small></summary>
    <p class="en model-text">${U.esc(w.text)}</p>
    <div class="small">${(w.checks || []).map(c => `<span class="pill ${c.ok ? '' : 'weak'}">${c.ok ? '☑' : '☐'} ${U.esc(c.label)}</span>`).join(' ')}</div>
    <a class="btn" href="#writing/${w.type}/${w.promptId}">もう一度書く</a></details>`).join('') : '<div class="card empty">まだ回答はありません。</div>'}`;
}
