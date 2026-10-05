/* リーディング：短文空所補充 / 長文空所補充 / 長文内容一致 / 復習リスト */
const READ_TYPES = {
  short: { name: '短文の語句空所補充', no: '大問1' },
  long: { name: '長文の語句空所補充', no: '大問2' },
  content: { name: '長文の内容一致', no: '大問3' }
};

function readingTabs(active) {
  const t = [['#reading', 'top', 'トップ'], ['#reading/short', 'short', '短文空所'], ['#reading/long', 'long', '長文空所'], ['#reading/content', 'content', '内容一致'], ['#reading/review', 'review', `復習(${Store.data.readingReview.length})`]];
  return `<div class="tabs">${t.map(([h, k, n]) => `<a href="${h}" class="${k === active ? 'on' : ''}">${n}</a>`).join('')}</div>`;
}

function readingRecord(type, item, qIndex, correct) {
  const key = type === 'short' ? item.id : `${item.id}#${qIndex}`;
  Store.data.reading.push({ id: key, type, theme: item.theme, correct, date: U.today() });
  const rv = Store.data.readingReview;
  const pos = rv.indexOf(key);
  if (!correct && pos < 0) rv.push(key);
  if (correct && pos >= 0) rv.splice(pos, 1);
  Store.logAnswer('reading', correct);
}

// 出題順：未回答 → 間違えた → 古い順
function readingPriority(list, keyOf) {
  const hist = Store.data.reading;
  const last = {}, wrong = {};
  hist.forEach((h, i) => { last[h.id] = i; if (!h.correct) wrong[h.id] = (wrong[h.id] || 0) + 1; });
  return U.shuffle(list).map(x => {
    const ks = keyOf(x);
    const seen = ks.some(k => k in last);
    const w = ks.reduce((a, k) => a + (wrong[k] || 0), 0);
    const recent = Math.max(-1, ...ks.map(k => last[k] ?? -1));
    return { x, s: (seen ? 0 : 1000) + w * 50 - recent * 0.01 };
  }).sort((a, b) => b.s - a.s).map(o => o.x);
}

Views.reading = (args, el) => {
  const [type, sub] = args;
  if (type === 'short') return sub ? readingShortRun(sub, el) : readingMenu('short', el);
  if (type === 'long' || type === 'content') return sub ? readingPassage(type, sub, el) : readingMenu(type, el);
  if (type === 'review') return readingReview(el);

  const R = Store.data.reading;
  const by = t => { const l = R.filter(r => r.type === t); return l.length ? `${U.pct(l.filter(r => r.correct).length, l.length)}%（${l.length}問）` : '未学習'; };
  el.innerHTML = `
  <h1 class="page">📖 リーディング</h1>
  ${readingTabs('top')}
  <p class="muted">英検2級のリーディングは、リーディング・ライティング合わせて${CONFIG.exam.first.readingWritingMinutes}分。すべてオリジナル問題です。</p>
  <div class="grid3">
    ${CONFIG.exam.first.reading.map(r => `
      <a class="card link-card" href="#reading/${r.id}">
        <small>${r.no}・本番${r.count}問</small><h2>${r.name}</h2>
        <p class="muted small">${r.note}</p>
        <p>収録：${r.id === 'short' ? READING_DATA.short.length + '問' : READING_DATA.long.filter(p => p.type === r.id).length + '題（' + READING_DATA.long.filter(p => p.type === r.id).reduce((a, p) => a + p.qs.length, 0) + '問）'}</p>
        <p class="small">あなたの正答率：<b>${by(r.id)}</b></p>
      </a>`).join('')}
  </div>
  <div class="card small">
    <b>解き方のコツ</b>
    <ul>
      <li><b>大問1</b>：空所の前後（目的語・前置詞・文脈）から品詞と意味を絞る。熟語は動詞＋前置詞のセットで覚える。</li>
      <li><b>大問2</b>：空所の前後の文の「つながり」（逆接・因果・例示）を見る。接続表現（However / As a result / For example）の問題も頻出。</li>
      <li><b>大問3</b>：先に設問を読み、本文の該当段落を探す。本文の言い換え（パラフレーズ）になっている選択肢が正解になりやすい。</li>
    </ul>
  </div>`;
};

function readingMenu(type, el) {
  const T = READ_TYPES[type];
  if (type === 'short') {
    el.innerHTML = `<h1 class="page">📖 ${T.name}</h1>${readingTabs('short')}
    <div class="card"><p>空所に入る最も適切な語句を4つの選択肢から選びます（本番：${T.no}・17問）。収録 ${READING_DATA.short.length}問。</p>
    <div class="seg">${[5, 10, 17].map(n => `<a class="btn" href="#reading/short/${n}">${n}問</a>`).join('')}</div></div>`;
    return;
  }
  const list = READING_DATA.long.filter(p => p.type === type);
  const done = id => Store.data.reading.filter(r => r.id.startsWith(id + '#'));
  el.innerHTML = `<h1 class="page">📖 ${T.name}</h1>${readingTabs(type)}
  <p class="muted">${type === 'long' ? '長文の空所に入る最も適切な語句を選びます（本番：2題×3問）。' : 'Eメールや説明文を読み、内容に合うものを選びます（本番：Eメール1題＋説明文1題・計8問）。'}</p>
  <a class="btn primary block" href="#reading/${type}/auto">おすすめの1題を解く</a>
  <div class="plist">${list.map(p => { const d = done(p.id); return `<a class="card link-card row" href="#reading/${type}/${p.id}"><span class="pill">${U.esc(p.theme)}</span><b>${U.esc(p.title)}</b>${p.format === 'email' ? '<span class="pill">Eメール</span>' : ''}<small class="muted">${d.length ? `正答 ${d.filter(r => r.correct).length}/${d.length}` : '未挑戦'}</small></a>`; }).join('')}</div>`;
}

function readingShortRun(sub, el) {
  const n = sub === 'auto' ? 5 : +sub || 5;
  const qs = sub.startsWith('id:') ? READING_DATA.short.filter(q => q.id === sub.slice(3)) : readingPriority(READING_DATA.short, x => [x.id]).slice(0, n);
  let i = 0, score = 0;
  function render() {
    const q = qs[i];
    el.innerHTML = `
    <div class="quiz-head"><a href="#reading/short" class="back">← 戻る</a><span>短文の語句空所補充</span><span>${i + 1} / ${qs.length}</span></div>
    <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
    <div class="card quiz">
      <div class="qmeta"><span class="pill">${U.esc(q.theme)}</span></div>
      <p class="sentence en">${U.esc(q.q).replace('( )', '<span class="blank">(　　　)</span>')}</p>
      <div class="choices">${q.choices.map((c, k) => `<button class="choice en" data-k="${k}"><span class="lbl">${k + 1}</span>${U.esc(c)}</button>`).join('')}</div>
      <div id="fb"></div>
    </div>`;
    U.$$('.choice', el).forEach(b => b.onclick = () => answer(+b.dataset.k));
  }
  function answer(k) {
    const q = qs[i];
    const ok = k === q.a; if (ok) score++;
    U.$$('.choice', el).forEach((b, idx) => { b.disabled = true; if (idx === q.a) b.classList.add('correct'); else if (idx === k) b.classList.add('wrong'); });
    readingRecord('short', q, 0, ok);
    Sound.answer(ok);
    U.$('#fb', el).innerHTML = `<div class="feedback ${ok ? 'ok' : 'ng'}">
      <div class="verdict">${ok ? '⭕ 正解' : '❌ 不正解'}　正解：${q.a + 1}. <span class="en">${U.esc(q.choices[q.a])}</span></div>
      <div class="exp"><b>日本語訳</b><br>${U.esc(q.ja)}</div>
      <div class="exp"><b>なぜこの答えになるのか</b><br>${U.esc(q.why)}</div>
      ${q.words && q.words.length ? `<div class="exp"><b>重要単語・熟語</b><ul class="kw">${q.words.map(([e, j]) => `<li><span class="en">${U.esc(e)}</span>：${U.esc(j)}</li>`).join('')}</ul></div>` : ''}
      ${ok ? '' : '<div class="weak-t small">復習リストに追加しました</div>'}
      <button class="btn primary block" id="nextBtn">${i + 1 < qs.length ? '次の問題 →' : '結果を見る'}</button></div>`;
    Store.save();
    U.$('#nextBtn', el).onclick = () => { i++; i < qs.length ? render() : finish(); };
  }
  function finish() {
    el.innerHTML = `<h1 class="page">📖 結果</h1><div class="card result"><div class="score">${score} / ${qs.length}<small>正答率 ${U.pct(score, qs.length)}%</small></div>
    ${Coach.nextStepHTML('reading')}
    <div class="btn-row"><a class="btn" href="#reading/short/${qs.length}">もう一度（別の問題）</a><a class="btn" href="#reading/review">復習リスト</a><a class="btn" href="#reading">リーディングトップ</a></div></div>`;
  }
  render();
}

function readingPassage(type, sub, el) {
  const list = READING_DATA.long.filter(p => p.type === type);
  const p = sub === 'auto' ? readingPriority(list, x => x.qs.map((_, i) => `${x.id}#${i}`))[0] : list.find(x => x.id === sub);
  if (!p) { el.innerHTML = '<div class="card empty">問題が見つかりません。</div>'; return; }
  const picks = new Array(p.qs.length).fill(null);
  let checked = false;
  const blankNo = i => i + 1;

  function passageHTML() {
    const body = p.paras.map(t => `<p>${U.esc(t).replace(/\{(\d)\}/g, (_, d) => {
      const idx = +d - 1;
      const v = picks[idx];
      const cls = checked ? (v === p.qs[idx].a ? 'ok' : 'ng') : '';
      return `<span class="blank ${cls}">(${blankNo(idx)}) ${v != null ? U.esc(p.qs[idx].choices[v]) : '　　　　'}</span>`;
    })}</p>`).join('');
    const head = p.format === 'email' && p.email ? `<div class="email-head"><div>From: ${U.esc(p.email.from)}</div><div>To: ${U.esc(p.email.to)}</div><div>Date: ${U.esc(p.email.date)}</div><div>Subject: ${U.esc(p.email.subject)}</div></div>` : '';
    return `<article class="passage en"><h3>${U.esc(p.title)}</h3>${head}${body}</article>`;
  }

  function render() {
    el.innerHTML = `
    <div class="quiz-head"><a href="#reading/${type}" class="back">← 戻る</a><span>${READ_TYPES[type].name}</span><span class="pill">${U.esc(p.theme)}</span></div>
    <div class="card">${passageHTML()}</div>
    <div class="card">
      ${p.qs.map((q, qi) => `
        <div class="pq" id="pq${qi}">
          <p class="qtext"><b>(${qi + 1})</b> ${type === 'content' ? `<span class="en">${U.esc(q.q)}</span>` : '空所に入る最も適切なものを選んでください。'}</p>
          <div class="choices">${q.choices.map((c, k) => {
            let cls = picks[qi] === k ? 'on' : '';
            if (checked) { if (k === q.a) cls = 'correct'; else if (picks[qi] === k) cls = 'wrong'; }
            return `<button class="choice en ${cls}" data-q="${qi}" data-k="${k}" ${checked ? 'disabled' : ''}><span class="lbl">${k + 1}</span>${U.esc(c)}</button>`;
          }).join('')}</div>
          ${checked ? `<div class="feedback ${picks[qi] === q.a ? 'ok' : 'ng'}"><div class="verdict">${picks[qi] === q.a ? '⭕ 正解' : '❌ 不正解'}　正解：${q.a + 1}</div><div class="exp"><b>なぜこの答えになるのか</b><br>${U.esc(q.why)}</div></div>` : ''}
        </div>`).join('')}
      ${checked ? '' : `<button class="btn primary block" id="checkBtn" ${picks.includes(null) ? 'disabled' : ''}>答え合わせ</button>`}
    </div>
    ${checked ? explainHTML() : ''}`;
    U.$$('.choice', el).forEach(b => b.onclick = () => { picks[+b.dataset.q] = +b.dataset.k; render(); });
    const cb = U.$('#checkBtn', el);
    if (cb) cb.onclick = () => {
      checked = true;
      p.qs.forEach((q, qi) => readingRecord(type, p, qi, picks[qi] === q.a));
      Sound.batch(p.qs.filter((q, qi) => picks[qi] === q.a).length, p.qs.length);
      Store.save();
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  function explainHTML() {
    const sc = p.qs.filter((q, i) => picks[i] === q.a).length;
    return `
    <div class="card result"><div class="score">${sc} / ${p.qs.length}</div>${sc < p.qs.length ? '<p class="weak-t small">間違えた問題は復習リストに追加しました。</p>' : ''}
      ${Coach.nextStepHTML('reading')}
      <div class="btn-row"><a class="btn" href="#reading/${type}/auto">次の1題</a><a class="btn" href="#reading/review">復習リスト</a></div></div>
    <div class="card"><h2>日本語訳</h2>${p.ja.map(t => `<p>${U.esc(t)}</p>`).join('')}</div>
    <div class="card"><h2>重要単語</h2><ul class="kw">${p.words.map(([e, j]) => `<li><span class="en">${U.esc(e)}</span>：${U.esc(j)}</li>`).join('')}</ul>
    ${p.phrases && p.phrases.length ? `<h2>重要熟語・表現</h2><ul class="kw">${p.phrases.map(([e, j]) => `<li><span class="en">${U.esc(e)}</span>：${U.esc(j)}</li>`).join('')}</ul>` : ''}</div>`;
  }
  render();
}

function readingReview(el) {
  const rv = Store.data.readingReview;
  const rows = rv.map(key => {
    const [id] = key.split('#');
    const s = READING_DATA.short.find(q => q.id === id);
    if (s) return { key, label: s.q, type: 'short', href: `#reading/short/id:${s.id}`, theme: s.theme };
    const p = READING_DATA.long.find(x => x.id === id);
    if (p) return { key, label: `${p.title}（問${+key.split('#')[1] + 1}）`, type: p.type, href: `#reading/${p.type}/${p.id}`, theme: p.theme };
    return null;
  }).filter(Boolean);
  el.innerHTML = `<h1 class="page">📖 復習リスト</h1>${readingTabs('review')}
  ${rows.length ? `<p class="muted">間違えた問題です。もう一度正解するとリストから外れます。</p>
  <div class="plist">${rows.map(r => `<a class="card link-card row" href="${r.href}"><span class="pill">${READ_TYPES[r.type].name}</span><span class="en small">${U.esc(r.label)}</span></a>`).join('')}</div>`
  : '<div class="card empty">復習リストは空です。間違えた問題が自動で追加されます。</div>'}`;
}
