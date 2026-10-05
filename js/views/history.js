/* 学習履歴・苦手分析 */
const ISSUE_NAMES = {
  '重要な内容を入れた': '要約：重要ポイントの抽出', '内容から外れていない': '要約：内容の正確さ', '自分の意見を入れていない': '要約：意見を入れない',
  '語数を守った': '語数の調整', '文法を確認した': '文法の見直し', 'スペルを確認した': 'スペルの見直し',
  '意見を明確にした': '意見の明確化', '理由を2つ書いた': '理由を2つ書くこと', '理由を具体的に説明した': '理由の具体化', 'TOPICからずれていない': 'TOPICとの一貫性'
};

Views.history = async (args, el) => {
  const D = Store.data;
  const days = Object.entries(D.days).sort((a, b) => b[0].localeCompare(a[0]));
  const tot = days.reduce((a, [, d]) => { for (const k in d) a[k] = (a[k] || 0) + d[k]; return a; }, {});
  const A = await AI.analyzeWeakness();
  const streak = Store.streak();

  // 直近14日のグラフ
  const last14 = [...Array(14)].map((_, i) => U.addDays(U.today(), i - 13));
  const mins = last14.map(k => Math.round((D.days[k]?.seconds || 0) / 60));
  const qs = last14.map(k => D.days[k]?.questions || 0);
  const maxQ = Math.max(10, ...qs);

  const pctTxt = r => r == null ? '—' : Math.round(r * 100) + '%';
  const weakest = list => list.find(x => x.n >= 3 && x.rate < 0.8);

  el.innerHTML = `
  <h1 class="page">📊 学習履歴・苦手分析</h1>
  <div class="stats">
    <div class="stat"><div class="v">${streak}<small>日</small></div><div class="l">連続学習日数</div></div>
    <div class="stat"><div class="v">${days.filter(([, d]) => Store.isActive(d)).length}<small>日</small></div><div class="l">学習した日数</div></div>
    <div class="stat"><div class="v">${U.fmtMin(tot.seconds || 0)}</div><div class="l">合計学習時間</div></div>
    <div class="stat"><div class="v">${tot.questions || 0}<small>問</small></div><div class="l">合計問題数</div></div>
    <div class="stat"><div class="v">${tot.questions ? U.pct(tot.correct, tot.questions) : '—'}<small>%</small></div><div class="l">全体の正答率</div></div>
    <div class="stat"><div class="v">${Object.keys(D.wordStats).length}<small>語</small></div><div class="l">学習した単語・熟語</div></div>
  </div>

  <div class="card">
    <h2>あなたの苦手分野</h2>
    <div class="weak-grid">
      <div><span>単語</span><b>${A.weakCats.length && A.weakCats[0].rate < 0.8 ? A.weakCats.slice(0, 2).filter(c => c.rate < 0.8).map(c => U.esc(c.name)).join('・') : 'データ収集中'}</b></div>
      <div><span>リーディング</span><b>${(weakest(A.readingTypes) || {}).name || 'データ収集中'}</b></div>
      <div><span>リスニング</span><b>${(weakest(A.listeningParts) || {}).name || 'データ収集中'}</b></div>
      <div><span>ライティング</span><b>${A.writingIssues.length ? ISSUE_NAMES[A.writingIssues[0].label] || A.writingIssues[0].label : 'データ収集中'}</b></div>
    </div>
    <p class="small muted">※ 各形式3問以上解くと分析されます。ライティングは自己チェックで ☐ のままだった項目から分析します。</p>
  </div>

  <div class="grid2">
    <div class="card">
      <h3>苦手単語（${A.weakWords.length}語）</h3>
      ${weakTable(A.weakWords)}
      ${A.weakWords.length ? '<a class="btn" href="#vocab/start/weak/10/e2j/word/all">苦手単語テスト</a>' : ''}
    </div>
    <div class="card">
      <h3>苦手熟語（${A.weakPhrases.length}個）</h3>
      ${weakTable(A.weakPhrases)}
      ${A.weakPhrases.length ? '<a class="btn" href="#vocab/start/weak/10/e2j/phrase/all">苦手熟語テスト</a>' : ''}
    </div>
    <div class="card">
      <h3>級別の単語正答率</h3>
      ${barList(A.grades.filter(g => g.rate != null).map(g => [g.name, g.rate, g.n]))}
      <p class="small muted">${A.grades.map(g => `${g.name}：${g.words}/${g.total}語句 学習済み`).join('　')}</p>
    </div>
    <div class="card">
      <h3>苦手カテゴリー（正答率の低い順）</h3>
      ${A.weakCats.length ? barList(A.weakCats.slice(0, 8).map(c => [c.name, c.rate, c.n])) : '<p class="muted small">単語テストを解くと表示されます。</p>'}
    </div>
    <div class="card">
      <h3>問題形式別の正答率</h3>
      ${barList([
        ['単語', A.area.vocab, tot.vocab || 0],
        ...A.readingTypes.map(t => [t.name, t.rate, t.n]),
        ...A.listeningParts.map(t => [t.name, t.rate, t.n])
      ].filter(x => x[1] != null))}
      ${A.writingIssues.length ? `<h3>ライティングの課題</h3><ul class="small">${A.writingIssues.slice(0, 4).map(w => `<li>${U.esc(ISSUE_NAMES[w.label] || w.label)}（${w.n}回）</li>`).join('')}</ul>` : ''}
    </div>
  </div>

  <div class="card">
    <h2>直近14日間</h2>
    <div class="chart">${last14.map((k, i) => `<div class="col" title="${k}：${qs[i]}問・${mins[i]}分"><span class="num">${qs[i] || ''}</span><i style="height:${(qs[i] / maxQ) * 100}%"></i><small>${+k.slice(8)}</small></div>`).join('')}</div>
    <p class="small muted center">棒＝問題数（日別）</p>
  </div>

  <div class="card">
    <h2>日別の学習記録</h2>
    ${days.length ? `<div class="table-wrap"><table class="tbl hist">
      <tr><th>学習日</th><th>時間</th><th>問題数</th><th>正答率</th><th>単語</th><th>R</th><th>L</th><th>W</th><th>S</th></tr>
      ${days.map(([k, d]) => `<tr><td>${k.slice(5)}</td><td>${Math.floor(d.seconds / 60)}分</td><td>${d.questions}</td><td>${d.questions ? U.pct(d.correct, d.questions) + '%' : '—'}</td><td>${d.vocab}</td><td>${d.reading}</td><td>${d.listening}</td><td>${d.writing}</td><td>${d.speaking}</td></tr>`).join('')}
    </table></div><p class="small muted">R=リーディング問題数 / L=リスニング問題数 / W=ライティング問題数 / S=スピーキング練習数</p>` : '<p class="muted">まだ記録はありません。「今日の10分」から始めましょう！</p>'}
  </div>

  <div class="card">
    <h2>データ管理</h2>
    <p class="small muted">学習データはこのブラウザの localStorage に保存されています（ブラウザを閉じても残ります）。別の端末に移す場合はバックアップを使ってください。</p>
    ${Cloud.db ? '<p class="small">☁ claude.ai にログインしているため、学習記録はあなた専用のクラウド領域にも自動保存され、iPhone・PCなど他の端末と共有されます（他の人には見えません）。</p>' : ''}
    <div class="btn-row">
      <button type="button" class="btn" id="exp">バックアップを保存</button>
      <label class="btn">バックアップから復元<input type="file" id="imp" accept="application/json,.json" hidden></label>
      <button type="button" class="btn danger" id="reset">すべての学習データを削除</button>
    </div>
    <div id="resetConfirm" class="confirm-box" hidden>
      <p><b>すべての学習記録を削除します。</b>元に戻せません。${Cloud.db ? 'クラウドに保存された記録も削除されます。' : ''}</p>
      <div class="btn-row"><button type="button" class="btn danger" id="resetYes">削除する</button><button type="button" class="btn" id="resetNo">やめる</button></div>
    </div>
  </div>`;

  U.$('#exp', el).onclick = async () => {
    const filename = `eiken-coach-backup-${U.today()}.json`;
    const dl = window.claude && window.claude.use ? await claude.use('downloads') : null;
    if (dl) {
      try { await dl.save({ filename, data: Store.exportJSON() }); U.toast('バックアップを保存しました'); }
      catch (e) { if (e && e.code !== 'declined') U.toast('保存できませんでした'); }
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([Store.exportJSON()], { type: 'application/json' }));
    a.download = filename;
    a.click();
  };
  U.$('#imp', el).onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try { Store.importJSON(await f.text()); U.toast('復元しました'); Views.history(args, el); }
    catch { U.toast('ファイルを読み込めませんでした'); }
  };
  U.$('#reset', el).onclick = () => { U.$('#resetConfirm', el).hidden = false; };
  U.$('#resetNo', el).onclick = () => { U.$('#resetConfirm', el).hidden = true; };
  U.$('#resetYes', el).onclick = () => { Store.reset(); U.toast('学習記録を削除しました'); Views.history(args, el); };

  function weakTable(list) {
    if (!list.length) return '<p class="muted small">まだありません。</p>';
    return `<ul class="wordlist">${list.slice(0, 10).map(o => `<li class="ng"><span class="pill weak">${Coach.weakLabel(o.lv)}</span>${gradeBadge(o.item.grade)}<b class="en">${U.esc(o.item.en)}</b><span>${U.esc(o.item.ja)}</span><small>×${o.stat.w}</small></li>`).join('')}</ul>${list.length > 10 ? `<p class="small muted">ほか${list.length - 10}件</p>` : ''}`;
  }
  function barList(rows) {
    if (!rows.length) return '<p class="muted small">問題を解くと表示されます。</p>';
    return `<div class="bars">${rows.map(([n, r, c]) => `<div class="bar"><span>${U.esc(n)}</span><div><i class="${r < 0.6 ? 'low' : r < 0.8 ? 'mid' : ''}" style="width:${Math.round(r * 100)}%"></i></div><b>${pctTxt(r)}</b><small>${c}問</small></div>`).join('')}</div>`;
  }
};
