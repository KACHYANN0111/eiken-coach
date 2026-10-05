/* リスニング：第1部 会話の内容一致 / 第2部 文の内容一致
 * 音声：item.audio（音声ファイルURL）があれば再生、なければブラウザ読み上げ。
 * 将来 AI 音声を使う場合は item.audio に生成音声のURLを入れるだけで対応できる。 */
Views.listening = (args, el) => {
  if (args[0] === 'run') return listeningRun(args[1], args[2], el);
  const L = Store.data.listening;
  const by = p => { const l = L.filter(r => r.part == p); return l.length ? `${U.pct(l.filter(r => r.correct).length, l.length)}%（${l.length}問）` : '未学習'; };
  const rv = Store.data.listeningReview;
  el.innerHTML = `
  <h1 class="page">🎧 リスニング</h1>
  <p class="muted">本番は約${CONFIG.exam.first.listeningMinutes}分・放送は1回。選択肢を先に読んで、聞くポイントを予測しましょう。</p>
  <div class="grid2">
    ${CONFIG.exam.first.listening.map((p, i) => `
      <div class="card">
        <small>${p.no}・本番${p.count}問</small><h2>${p.name}</h2>
        <p class="muted small">${i === 0 ? '男女2人の会話を聞き、その内容についての質問に答えます。' : '60語前後のナレーション（物語・説明文・アナウンス）を聞き、質問に答えます。'}</p>
        <p>収録：${LISTENING_DATA.filter(x => x.part === i + 1).length}問 ／ 正答率：<b>${by(i + 1)}</b></p>
        <div class="seg">${[5, 10, 15].map(n => `<a class="btn" href="#listening/run/${i + 1}/${n}">${n}問</a>`).join('')}</div>
      </div>`).join('')}
  </div>
  <div class="card">
    <h2>復習（間違えた問題）</h2>
    ${rv.length ? `<p>${rv.length}問あります。</p><a class="btn primary" href="#listening/run/review/${rv.length}">復習する</a>` : '<p class="muted">間違えた問題はここに自動で追加されます。</p>'}
  </div>
  <div class="card small muted">
    🔊 音声はブラウザ内蔵の読み上げ機能で再生します（インターネット通信・API不要）。読み上げに対応していない環境では「スクリプトを表示」で練習できます。将来、音声ファイルやAI音声に差し替え可能な構造です。
  </div>`;
};

function listeningRun(part, n, el) {
  let pool;
  if (part === 'review') pool = LISTENING_DATA.filter(x => Store.data.listeningReview.includes(x.id));
  else {
    const hist = {}; Store.data.listening.forEach((h, i) => hist[h.id] = { i, ok: h.correct });
    pool = U.shuffle(LISTENING_DATA.filter(x => x.part === +part))
      .sort((a, b) => (hist[a.id] ? (hist[a.id].ok ? 2 : 1) : 0) - (hist[b.id] ? (hist[b.id].ok ? 2 : 1) : 0));
  }
  const qs = pool.slice(0, +n || 5);
  if (!qs.length) { el.innerHTML = '<div class="card empty">問題がありません。<a class="btn" href="#listening">戻る</a></div>'; return; }
  let i = 0, score = 0;

  function render() {
    const q = qs[i];
    Speech.stop();
    el.innerHTML = `
    <div class="quiz-head"><a href="#listening" class="back">← 戻る</a><span>第${q.part}部 ${q.part === 1 ? '会話の内容一致' : '文の内容一致'}</span><span>${i + 1} / ${qs.length}</span></div>
    <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
    <div class="card quiz">
      <div class="qmeta"><span class="pill">${U.esc(q.theme)}</span></div>
      <div class="audio-box">
        <button class="btn primary" id="playBtn">▶ 音声を再生</button>
        <button class="btn" id="slowBtn">ゆっくり再生</button>
        <span class="muted small">${Speech.supported || q.audio ? '放送文 → 質問 の順に流れます' : '🔇 音声プレースホルダー（音声未対応）'}</span>
      </div>
      <details class="script"><summary>スクリプトを表示（解答前は見ないで挑戦！）</summary>${scriptHTML(q)}<p class="en"><b>Question:</b> ${U.esc(q.q)}</p></details>
      <div class="choices">${q.choices.map((c, k) => `<button class="choice en" data-k="${k}"><span class="lbl">${k + 1}</span>${U.esc(c)}</button>`).join('')}</div>
      <div id="fb"></div>
    </div>`;
    const play = rate => Speech.play([...q.script, { sp: 'N', t: 'Question. ' + q.q }], { rate, audio: q.audio });
    U.$('#playBtn', el).onclick = () => play(0.95);
    U.$('#slowBtn', el).onclick = () => play(0.75);
    U.$$('.choice', el).forEach(b => b.onclick = () => answer(+b.dataset.k));
  }

  function answer(k) {
    const q = qs[i];
    const ok = k === q.a; if (ok) score++;
    U.$$('.choice', el).forEach((b, idx) => { b.disabled = true; if (idx === q.a) b.classList.add('correct'); else if (idx === k) b.classList.add('wrong'); });
    Store.data.listening.push({ id: q.id, part: q.part, theme: q.theme, correct: ok, date: U.today() });
    const rv = Store.data.listeningReview, pos = rv.indexOf(q.id);
    if (!ok && pos < 0) rv.push(q.id);
    if (ok && pos >= 0) rv.splice(pos, 1);
    Store.logAnswer('listening', ok);
    Sound.answer(ok);
    U.$('details.script', el).open = true;
    U.$('#fb', el).innerHTML = `<div class="feedback ${ok ? 'ok' : 'ng'}">
      <div class="verdict">${ok ? '⭕ 正解' : '❌ 不正解'}　正解：${q.a + 1}. <span class="en">${U.esc(q.choices[q.a])}</span></div>
      <div class="exp"><b>日本語訳</b><br>${U.esc(q.ja)}</div>
      <div class="exp"><b>解説</b><br>${U.esc(q.why)}</div>
      <button class="btn primary block" id="nextBtn">${i + 1 < qs.length ? '次の問題 →' : '結果を見る'}</button></div>`;
    U.$('#nextBtn', el).onclick = () => { i++; i < qs.length ? render() : finish(); };
  }

  function finish() {
    Speech.stop();
    el.innerHTML = `<h1 class="page">🎧 結果</h1><div class="card result"><div class="score">${score} / ${qs.length}<small>正答率 ${U.pct(score, qs.length)}%</small></div>
    ${Coach.nextStepHTML('listening')}
    <div class="btn-row"><a class="btn" href="#listening/run/${part}/${qs.length}">もう一度</a><a class="btn" href="#listening">リスニングトップ</a></div></div>`;
  }
  render();
}

function scriptHTML(q) {
  return `<div class="dialog">${q.script.map(l => `<p class="en"><b>${l.sp === 'N' ? '' : l.sp === 'W' ? '☆ ' : '★ '}</b>${U.esc(l.t)}</p>`).join('')}</div>`;
}
