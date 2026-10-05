/* ホーム画面 */
const Views = window.Views || (window.Views = {});

Views.home = (args, el) => {
  const d = Store.day();
  const streak = Store.streak();
  const weak = Coach.weakWords().length;
  const writingTotal = Store.data.writing.length;
  const plan = Coach.plan();
  const rec = plan ? plan.steps : Coach.recommend();
  const doneN = plan ? plan.steps.filter(s => s.done).length : 0;
  const E = CONFIG.exam.first;
  const gradeStats = Coach.analyze().grades;

  el.innerHTML = `
  <section class="hero card">
    <div>
      <h1>${U.esc(CONFIG.appName)}</h1>
      <p class="sub">${U.esc(CONFIG.subtitle)}</p>
    </div>
    <div class="streak-badge ${streak ? '' : 'zero'}">🔥 ${streak ? `${streak}日連続学習中` : '今日から連続学習をスタート'}</div>
  </section>

  <h2 class="sec">今日の学習状況 <small>${U.today()}</small></h2>
  <div class="stats">
    ${stat('今日の問題数', d.questions, '問')}
    ${stat('今日の正答率', d.questions ? U.pct(d.correct, d.questions) : '—', d.questions ? '%' : '')}
    ${stat('今日の学習時間', Math.floor(d.seconds / 60), '分')}
    ${stat('連続学習日数', streak, '日')}
    ${stat('苦手単語数', weak, '語', '#vocab/list/weak')}
    ${stat('ライティング練習数', writingTotal, '回', '#writing')}
  </div>

  <button class="today-btn" id="todayBtn">
    <span class="big">▶ 今日の10分</span>
    <span class="small">${plan ? `続きから再開（${doneN}/${plan.steps.length} 完了）` : 'あなたの学習履歴からおすすめ学習を開始'}</span>
  </button>

  ${PWA.cardHTML()}

  <div class="card">
    <h2>今日のおすすめ</h2>
    <ol class="rec">
      ${rec.map(s => `<li class="${s.done ? 'done' : ''}"><a href="${s.route}"><span>${s.done ? '✅' : '○'} ${U.esc(s.label)}</span><small>${U.esc(s.reason || '')}</small></a></li>`).join('')}
    </ol>
  </div>

  <h2 class="sec">英検2級対策</h2>
  <div class="grid5">
    ${area('#vocab', '📘', '単語', `準2級〜1級 ${VOCAB.words.length}語＋熟語${VOCAB.phrases.length}`)}
    ${area('#reading', '📖', 'リーディング', `大問1〜3 / ${E.reading.reduce((a, b) => a + b.count, 0)}問`)}
    ${area('#listening', '🎧', 'リスニング', `第1部・第2部 / 約${E.listeningMinutes}分`)}
    ${area('#writing', '✍️', 'ライティング', `要約${CONFIG.wordLimits.summary.min}–${CONFIG.wordLimits.summary.max}語・意見論述${CONFIG.wordLimits.opinion.min}–${CONFIG.wordLimits.opinion.max}語`)}
    ${area('#speaking', '🗣️', 'スピーキング', `二次試験 面接 約${CONFIG.exam.second.minutes}分`)}
  </div>

  <div class="card">
    <h2>級別 単語テスト <small class="muted">（すぐに10問）</small></h2>
    <div class="grade-grid">
      ${CONFIG.grades.map(g => { const st = gradeStats.find(x => x.key === g.id); return `<a class="grade-tile g-${g.id}" href="#vocab/start/normal/10/e2j/word/${g.id}"><b>${g.name}</b><small>${g.level}</small><span>${VOCAB.count(g.id, 'word')}語${st && st.rate != null ? `・正答率${Math.round(st.rate * 100)}%` : ''}</span></a>`; }).join('')}
    </div>
  </div>

  <div class="card exam-info">
    <h2>現在の英検2級の試験構成 <small>（公式情報 ${CONFIG.checkedAt} 確認）</small></h2>
    <p class="muted">レベル：${CONFIG.exam.level}。一次試験：リーディング・ライティング ${E.readingWritingMinutes}分 / リスニング 約${E.listeningMinutes}分。二次試験：英語での面接 約${CONFIG.exam.second.minutes}分。</p>
    <div class="table-wrap"><table class="tbl">
      <tr><th>技能</th><th>大問</th><th>形式</th><th>問題数</th></tr>
      ${E.reading.map(r => `<tr><td>リーディング</td><td>${r.no}</td><td>${r.name}<br><small>${r.note}</small></td><td>${r.count}</td></tr>`).join('')}
      ${E.writing.map(r => `<tr><td>ライティング</td><td>${r.no}</td><td>${r.name}<br><small>${r.note}・${CONFIG.wordLimits[r.id].min}〜${CONFIG.wordLimits[r.id].max}語</small></td><td>${r.count}</td></tr>`).join('')}
      ${E.listening.map(r => `<tr><td>リスニング</td><td>${r.no}</td><td>${r.name}<br><small>${r.note}</small></td><td>${r.count}</td></tr>`).join('')}
    </table></div>
    <p class="muted small">※ 試験形式は変更される場合があります。最新情報は <a href="${CONFIG.official.grade2}" target="_blank" rel="noopener">英検公式サイト</a> を優先してください。</p>
  </div>`;

  PWA.bindCard(el);
  U.$('#todayBtn', el).onclick = () => {
    const p = Coach.plan();
    if (p) { const next = p.steps.find(s => !s.done); if (next) { App.go(next.route); return; } }
    Coach.startPlan();
  };

  function stat(label, val, unit, href) {
    const inner = `<div class="v">${val}<small>${unit}</small></div><div class="l">${label}</div>`;
    return href ? `<a class="stat" href="${href}">${inner}</a>` : `<div class="stat">${inner}</div>`;
  }
  function area(href, icon, name, desc) {
    return `<a class="area" href="${href}"><span class="ic">${icon}</span><b>${name}</b><small>${desc}</small></a>`;
  }
};
