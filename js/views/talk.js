/* 英会話（試験に関係なく使える日常会話のスピーキング練習）
 * - フレーズを覚える：場面別フレーズを音声つきで確認
 * - 話して練習：日本語を見て英語で言う → 音声認識で判定（使えない環境は自己判定）
 * - 録音して聞き比べ：自分の声とお手本を比べる
 * - ロールプレイ：相手のセリフを聞いて、自分の番で答える */
const talkStat = id => Store.data.talk.stats[id] || { ok: 0, ng: 0, last: null, best: 0 };
const talkAll = () => TALK_DATA.scenes.flatMap(s => s.phrases);
const talkScene = id => TALK_DATA.scenes.find(s => s.id === id);
const talkMastered = p => { const s = talkStat(p.id); return s.last === 'ok' && s.ok >= 2; };
const talkWeak = p => talkStat(p.id).last === 'ng';

function talkTabs(active) {
  const weakN = talkAll().filter(talkWeak).length;
  const t = [['#talk', 'top', '場面'], ['#talk/qa', 'qa', '🗣️ 質疑応答'], ['#talk/ai', 'ai', '🤖 AI会話'], ['#talk/practice/all/10', 'practice', '話す練習'], ['#talk/practice/weak/10', 'weak', `苦手(${weakN})`]];
  return `<div class="tabs">${t.map(([h, k, n]) => `<a href="${h}" class="${k === active ? 'on' : ''}">${n}</a>`).join('')}</div>`;
}

function micNotice() {
  if (Mic.supported()) return '<p class="small muted">🎤 マイクで話すと、ブラウザの音声認識で英語を聞き取って判定します（初回はマイクの許可を求められます）。</p>';
  return '<p class="small mic-off">🎤 この環境では音声認識が使えません。声に出して言ってから「答えを見る」で確認し、自分で判定してください。（iPhone は Safari、PC は Chrome でアプリ版を開くと使えます）</p>';
}

Views.talk = (args, el) => {
  const [mode, a1, a2] = args;
  if (mode === 'scene') return talkSceneView(a1, el);
  if (mode === 'practice') return talkPractice(a1 || 'all', +a2 || 10, el);
  if (mode === 'role') return talkRole(a1, el);
  if (mode === 'ai') return a1 ? talkAiChat(a1, el) : talkAiMenu(el);
  if (mode === 'qa') return a1 ? talkQaRun(a1, el) : talkQaMenu(el);

  const all = talkAll();
  const done = all.filter(talkMastered).length;
  el.innerHTML = `
  <h1 class="page">💬 英会話</h1>
  ${talkTabs('top')}
  <div class="card talk-intro">
    <p>試験に関係なく、ふだんの会話で使える英語を<b>声に出して</b>身につけるコーナーです（中級レベル・${TALK_DATA.scenes.length}場面・${all.length}フレーズ）。</p>
    <div class="talk-progress"><div><i style="width:${U.pct(done, all.length)}%"></i></div><span>${done} / ${all.length} フレーズ習得</span></div>
    <ol class="talk-steps">
      <li><b>フレーズを覚える</b>：場面を選んで、音声を聞きながら意味と使い方を確認</li>
      <li><b>話して練習</b>：日本語を見て、英語で言ってみる（マイクで判定）</li>
      <li><b>ロールプレイ</b>：相手のセリフを聞いて、自分の番で答える</li>
      <li><b>質疑応答</b>：英語の質問に英語で答えて、会話を続ける（APIキー不要）</li>
      <li><b>AI会話</b>：AIと自由に英語で話す</li>
    </ol>
    ${micNotice()}
    <div class="btn-row">
      <a class="btn primary" href="#talk/qa/all">🗣️ 英語で質疑応答（キー不要）</a>
      <a class="btn" href="#talk/ai">🤖 AIと英語で会話する</a>
      <a class="btn" href="#talk/practice/all/10">🎤 ランダムに10フレーズ話す</a>
      ${all.some(talkWeak) ? `<a class="btn" href="#talk/practice/weak/10">苦手フレーズを練習</a>` : ''}
    </div>
  </div>
  <h2 class="sec">場面を選ぶ</h2>
  <div class="scene-grid">
    ${TALK_DATA.scenes.map(s => { const m = s.phrases.filter(talkMastered).length; return `
      <a class="scene-card" href="#talk/scene/${s.id}">
        <span class="scene-ic">${s.icon}</span>
        <b>${U.esc(s.name)}</b>
        <small class="muted">${U.esc(s.desc)}</small>
        <span class="scene-bar"><i style="width:${U.pct(m, s.phrases.length)}%"></i></span>
        <small>${m}/${s.phrases.length} 習得</small>
      </a>`; }).join('')}
  </div>`;
};

function talkSceneView(id, el) {
  const s = talkScene(id);
  if (!s) { el.innerHTML = '<div class="card empty">場面が見つかりません。<a class="btn" href="#talk">戻る</a></div>'; return; }
  el.innerHTML = `
  <div class="quiz-head"><a href="#talk" class="back">← 場面一覧</a><span>${s.icon} ${U.esc(s.name)}</span><span></span></div>
  <div class="btn-row talk-actions">
    <a class="btn primary" href="#talk/practice/${s.id}/${s.phrases.length}">🎤 この場面を話して練習</a>
    <a class="btn" href="#talk/role/${s.id}">🎭 ロールプレイ</a>
    <button type="button" class="btn" id="playAll">▶ 全部聞く</button>
  </div>
  <div class="phrase-list">
    ${s.phrases.map(p => { const st = talkStat(p.id); return `
      <div class="card phrase">
        <div class="phrase-top">
          <p class="en phrase-en">${U.esc(p.en)}</p>
          <span class="phrase-state">${talkMastered(p) ? '<span class="pill">習得</span>' : talkWeak(p) ? '<span class="pill weak">苦手</span>' : st.ok || st.ng ? '<span class="pill">練習中</span>' : ''}</span>
        </div>
        <p class="phrase-ja">${U.esc(p.ja)}</p>
        <p class="small muted">💡 ${U.esc(p.note)}</p>
        <div class="btn-row">
          <button type="button" class="btn" data-say="${U.esc(p.en)}">🔊 聞く</button>
          <button type="button" class="btn" data-slow="${U.esc(p.en)}">🐢 ゆっくり</button>
        </div>
      </div>`; }).join('')}
  </div>`;
  U.$$('[data-say]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.say));
  U.$$('[data-slow]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.slow, { rate: 0.7 }));
  U.$('#playAll', el).onclick = () => Speech.play(s.phrases.map(p => ({ sp: 'W', t: p.en })), { rate: 0.9 });
}

/* ---------- 話して練習 ---------- */
function talkPractice(target, n, el) {
  let pool;
  if (target === 'weak') pool = talkAll().filter(talkWeak);
  else if (target === 'all') pool = talkAll();
  else pool = (talkScene(target) || { phrases: [] }).phrases;
  // 未練習 → 苦手 → 習得済みの順に優先
  const rank = p => talkMastered(p) ? 2 : talkStat(p.id).last ? 1 : 0;
  const qs = U.shuffle(pool).sort((a, b) => (talkWeak(b) - talkWeak(a)) || (rank(a) - rank(b))).slice(0, n);
  if (!qs.length) {
    el.innerHTML = `<h1 class="page">💬 話して練習</h1>${talkTabs(target === 'weak' ? 'weak' : 'practice')}<div class="card empty">${target === 'weak' ? '苦手フレーズはまだありません。言えなかったフレーズが自動でここに入ります。' : '練習するフレーズがありません。'}<br><a class="btn primary" href="#talk/practice/all/10">ランダムに10フレーズ話す</a></div>`;
    return;
  }
  const scene = talkScene(target);
  const title = scene ? `${scene.icon} ${scene.name}` : target === 'weak' ? '苦手フレーズ' : 'ランダム';
  let i = 0;
  const results = [];

  function render() {
    const p = qs[i], sc = talkScene(p.scene);
    let best = 0, rated = null, recUrl = null;
    Mic.stop();
    el.innerHTML = `
    <div class="quiz-head"><a href="${scene ? '#talk/scene/' + scene.id : '#talk'}" class="back">← 戻る</a><span>${U.esc(title)}</span><span>${i + 1} / ${qs.length}</span></div>
    <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
    <div class="card quiz talk-q">
      <div class="qmeta"><span class="pill">${sc.icon} ${U.esc(sc.name)}</span>${talkWeak(p) ? '<span class="pill weak">苦手</span>' : ''}</div>
      <p class="talk-ja">${U.esc(p.ja)}</p>
      <p class="qinst">この日本語を英語で言ってみましょう</p>
      <div class="btn-row talk-controls">
        ${Mic.supported() ? '<button type="button" class="btn primary mic-btn" id="micBtn">🎤 話す</button>' : ''}
        <button type="button" class="btn" id="hintBtn">💡 ヒント</button>
        <button type="button" class="btn" id="showBtn">👀 答えを見る</button>
      </div>
      <div id="hint" class="small muted" hidden></div>
      <div id="heard" class="heard" hidden></div>
      <div id="ans" hidden>
        <div class="model-line"><span class="en">${U.esc(p.en)}</span>
          <button type="button" class="icon-btn" data-say="${U.esc(p.en)}" title="聞く">🔊</button>
          <button type="button" class="icon-btn" data-slow="${U.esc(p.en)}" title="ゆっくり">🐢</button>
        </div>
        <p class="small muted">💡 ${U.esc(p.note)}</p>
        ${VoiceRecorder.supported() ? `<div class="rec-box"><button type="button" class="btn" id="recBtn">⏺ 録音して聞き比べ</button><audio id="recAudio" controls hidden></audio></div>` : ''}
        <div class="self-rate" id="selfRate">
          <span class="small">自分で判定：</span>
          <button type="button" class="btn" data-rate="ok">⭕ 言えた</button>
          <button type="button" class="btn" data-rate="mid">🔺 少し</button>
          <button type="button" class="btn" data-rate="ng">❌ 言えなかった</button>
        </div>
      </div>
      <button type="button" class="btn primary block" id="nextBtn" hidden>${i + 1 < qs.length ? '次のフレーズ →' : '結果を見る'}</button>
    </div>`;

    const reveal = () => { U.$('#ans', el).hidden = false; U.$('#nextBtn', el).hidden = false; };
    U.$$('[data-say]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.say));
    U.$$('[data-slow]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.slow, { rate: 0.7 }));
    U.$('#hintBtn', el).onclick = () => {
      const h = U.$('#hint', el);
      const words = p.en.split(' ');
      h.textContent = `最初の言葉：${words.slice(0, Math.min(2, words.length)).join(' ')} …（全部で${words.length}語）`;
      h.hidden = false;
    };
    U.$('#showBtn', el).onclick = reveal;
    U.$$('[data-rate]', el).forEach(b => b.onclick = () => {
      rated = b.dataset.rate;
      U.$$('[data-rate]', el).forEach(x => x.classList.toggle('on', x === b));
      if (best === 0) Sound.answer(rated === 'ok');
    });

    const mb = U.$('#micBtn', el);
    if (mb) mb.onclick = () => {
      if (Mic.current) { Mic.stop({ keep: true }); return; }
      const heard = U.$('#heard', el);
      heard.hidden = false;
      heard.innerHTML = '<span class="listening">● 聞いています… 英語で話してください</span>';
      mb.textContent = '■ 止める';
      mb.classList.add('rec-on');
      let finalDone = false;
      Mic.listen({
        onresult: (alts, isFinal) => {
          if (!isFinal) { heard.innerHTML = `<span class="listening">● ${U.esc(alts[0])}</span>`; return; }
          finalDone = true;
          const tries = alts.map(a => ({ a, r: compareSpeech(p.en, a) })).sort((x, y) => y.r.score - x.r.score);
          const { a, r } = tries[0];
          best = Math.max(best, r.score);
          const verdict = r.score >= 90 ? ['ok', '完璧！'] : r.score >= 70 ? ['ok', 'いいね！ほぼ言えています'] : r.score >= 40 ? ['mid', 'おしい！もう一度'] : ['ng', 'もう一度チャレンジ'];
          heard.innerHTML = `
            <div class="heard-head ${verdict[0]}"><b>${verdict[1]}</b><span>${r.score}点</span></div>
            <div class="small">聞き取った英語：<span class="en">${U.esc(a)}</span></div>
            <div class="word-check en">${r.words.map(w => `<span class="${w.ok ? 'hit' : 'miss'}">${U.esc(w.w)}</span>`).join(' ')}</div>
            <div class="small muted">赤い単語が言えていない（聞き取れなかった）部分です。</div>`;
          Sound.answer(r.score >= 70);
          reveal();
        },
        onerror: code => { heard.innerHTML = `<span class="mic-off">${U.esc(Mic.errorMessage(code))}</span>`; if (code === 'not-allowed' || code === 'service-not-allowed') reveal(); },
        onend: () => { mb.textContent = best ? '🎤 もう一度話す' : '🎤 話す'; mb.classList.remove('rec-on'); if (!finalDone && U.$('.listening', el)) heard.innerHTML = `<span class="mic-off">${Mic.errorMessage('no-speech')}</span>`; }
      });
    };

    const rb = U.$('#recBtn', el);
    if (rb) rb.onclick = async () => {
      if (VoiceRecorder.rec) {
        recUrl = await VoiceRecorder.stop();
        const au = U.$('#recAudio', el);
        au.src = recUrl; au.hidden = false;
        rb.textContent = '⏺ もう一度録音';
        rb.classList.remove('rec-on');
        return;
      }
      try {
        Speech.stop(); Mic.stop();
        await VoiceRecorder.start();
        rb.textContent = '■ 録音を止める';
        rb.classList.add('rec-on');
      } catch (e) { U.toast('マイクを使えませんでした。ブラウザの設定でマイクを許可してください。'); }
    };

    U.$('#nextBtn', el).onclick = async () => {
      if (VoiceRecorder.rec) await VoiceRecorder.stop();
      const result = best >= 70 || rated === 'ok' ? 'ok' : (best || rated) ? 'ng' : 'ng';
      const st = talkStat(p.id);
      st[result === 'ok' ? 'ok' : 'ng']++;
      st.last = result;
      st.best = Math.max(st.best || 0, best);
      st.date = U.today();
      Store.data.talk.stats[p.id] = st;
      Store.data.talk.log.push({ id: p.id, score: best, rated, date: U.today() });
      Store.day().speaking++;
      Store.save();
      results.push({ p, ok: result === 'ok', score: best });
      i++;
      i < qs.length ? render() : finish();
    };
  }

  function finish() {
    Mic.stop();
    const ok = results.filter(r => r.ok).length;
    Sound.finish(U.pct(ok, results.length));
    el.innerHTML = `
    <h1 class="page">💬 練習結果</h1>
    <div class="card result">
      <div class="score">${ok} / ${results.length}<small>言えたフレーズ</small></div>
      <p>${ok === results.length ? 'すばらしい！全部言えました。' : '言えなかったフレーズは「苦手」に入ります。声に出して繰り返しましょう。'}</p>
      ${Coach.nextStepHTML('talk')}
      <div class="btn-row">
        ${results.some(r => !r.ok) ? '<a class="btn" href="#talk/practice/weak/10">苦手フレーズを練習</a>' : ''}
        <a class="btn" href="#talk/practice/${target}/${n}">もう一度</a>
        <a class="btn" href="#talk">場面一覧</a>
      </div>
    </div>
    <div class="card"><h2>練習したフレーズ</h2>
      <ul class="wordlist">${results.map(r => `<li class="${r.ok ? '' : 'ng'}"><span>${r.ok ? '⭕' : '❌'}</span><b class="en">${U.esc(r.p.en)}</b><span>${U.esc(r.p.ja)}</span>${r.score ? `<small>${r.score}点</small>` : ''}</li>`).join('')}</ul>
    </div>`;
  }
  render();
}

/* ---------- ロールプレイ ---------- */
function talkRole(id, el) {
  const s = talkScene(id);
  if (!s) { el.innerHTML = '<div class="card empty">場面が見つかりません。</div>'; return; }
  let idx = -1;
  const scores = [];

  function speakThem(line) { Speech.play([{ sp: 'W', t: line.en }], { rate: 0.95 }); }

  function render() {
    Mic.stop();
    const shown = s.role.slice(0, idx + 1);
    const cur = s.role[idx];
    const ended = idx >= s.role.length - 1 && (!cur || cur.who === 'them' || cur.answered);
    el.innerHTML = `
    <div class="quiz-head"><a href="#talk/scene/${s.id}" class="back">← 戻る</a><span>🎭 ${U.esc(s.name)}</span><span></span></div>
    <div class="card">
      <p class="small muted">相手（☆）のセリフが音声で流れます。あなた（★）の番になったら、日本語の指示を見て英語で答えましょう。</p>
      ${micNotice()}
      ${idx < 0 ? '<button type="button" class="btn primary block" id="startBtn">▶ ロールプレイを始める</button>' : ''}
      <div class="chat">
        ${shown.map((l, k) => l.who === 'them'
          ? `<div class="bubble them"><span class="who">☆</span><div><p class="en">${U.esc(l.en)} <button type="button" class="icon-btn" data-replay="${k}">🔊</button></p><details><summary class="small muted">日本語訳</summary><p class="small">${U.esc(l.ja)}</p></details></div></div>`
          : `<div class="bubble you ${l.answered ? '' : 'turn'}"><div><p class="small"><b>あなたの番：</b>${U.esc(l.ja)}</p>
              ${l.answered ? `${l.heard ? `<p class="small">あなた：<span class="en">${U.esc(l.heard)}</span>（${l.score}点）</p>` : ''}<p class="en model">例：${U.esc(l.en)} <button type="button" class="icon-btn" data-say="${U.esc(l.en)}">🔊</button></p>` : ''}
              </div><span class="who">★</span></div>`).join('')}
      </div>
      <div id="roleCtl"></div>
    </div>`;
    U.$$('[data-replay]', el).forEach(b => b.onclick = () => speakThem(s.role[+b.dataset.replay]));
    U.$$('[data-say]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.say));
    const st = U.$('#startBtn', el);
    if (st) st.onclick = () => advance();
    const ctl = U.$('#roleCtl', el);

    if (cur && cur.who === 'you' && !cur.answered) {
      ctl.innerHTML = `<div class="btn-row">
        ${Mic.supported() ? '<button type="button" class="btn primary" id="roleMic">🎤 答える</button>' : ''}
        <button type="button" class="btn" id="roleShow">${Mic.supported() ? '答えの例を見る' : '声に出して言ったら → 答えの例を見る'}</button>
      </div><div id="roleHeard" class="heard" hidden></div>
      <p class="small muted">※ 自分の言葉で答えてかまいません。点数は「例」との近さの目安です。</p>`;
      U.$('#roleShow', el).onclick = () => { cur.answered = true; render(); };
      const rm = U.$('#roleMic', el);
      if (rm) rm.onclick = () => {
        const h = U.$('#roleHeard', el);
        h.hidden = false; h.innerHTML = '<span class="listening">● 聞いています…</span>';
        rm.disabled = true;
        Mic.listen({
          onresult: (alts, fin) => {
            if (!fin) { h.innerHTML = `<span class="listening">● ${U.esc(alts[0])}</span>`; return; }
            const r = alts.map(a => ({ a, s: compareSpeech(cur.en, a).score })).sort((x, y) => y.s - x.s)[0];
            cur.heard = r.a; cur.score = r.s; cur.answered = true;
            scores.push(r.s);
            Sound.play(r.s >= 50 ? 'correct' : 'save');
            render();
          },
          onerror: code => { h.innerHTML = `<span class="mic-off">${U.esc(Mic.errorMessage(code))}</span>`; rm.disabled = false; },
          onend: () => { rm.disabled = false; }
        });
      };
    } else if (idx >= 0 && !ended) {
      ctl.innerHTML = '<button type="button" class="btn primary block" id="nextLine">次へ →</button>';
      U.$('#nextLine', el).onclick = () => advance();
    } else if (ended) {
      Store.day().speaking++;
      Store.data.talk.log.push({ id: s.id + ':role', score: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0, date: U.today() });
      Store.save();
      ctl.innerHTML = `<div class="feedback ok"><div class="verdict">🎉 ロールプレイ完了！</div><p class="small">例の英語も声に出して読んでみましょう。</p>${Coach.nextStepHTML('talk')}
        <div class="btn-row"><button type="button" class="btn" id="again">もう一度</button><a class="btn" href="#talk/practice/${s.id}/${s.phrases.length}">この場面のフレーズを練習</a></div></div>`;
      Sound.finish(100);
      U.$('#again', el).onclick = () => { s.role.forEach(l => { delete l.answered; delete l.heard; delete l.score; }); idx = -1; scores.length = 0; render(); };
    }
    const last = el.querySelector('.chat .bubble:last-child');
    if (last) last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function advance() {
    idx++;
    const line = s.role[idx];
    render();
    if (line && line.who === 'them') speakThem(line);
  }
  s.role.forEach(l => { delete l.answered; delete l.heard; delete l.score; });
  render();
}
