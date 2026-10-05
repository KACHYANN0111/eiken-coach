/* 過去問・公式問題（公式サイトへのリンクのみ。問題はアプリ内に転載しない） */
Views.past = (args, el) => {
  const O = CONFIG.official;
  const P = Store.data.pastExams;
  const thisYear = new Date().getFullYear();
  const link = (href, text) => `<a class="btn" href="${href}" target="_blank" rel="noopener">${text} ↗</a>`;

  el.innerHTML = `
  <h1 class="page">📚 過去問・公式問題</h1>
  <div class="card">
    <p>英検公式サイトでは、2級の<b>直近3回分の一次試験（問題冊子・解答・リスニング音声と原稿）</b>と<b>二次試験のサンプル問題</b>が公開されています。著作権保護のため、このアプリには過去問を転載していません。公式サイトで解いて、結果をここに記録しましょう。</p>
    <a class="btn primary block" href="${O.pastExams}" target="_blank" rel="noopener">英検公式の2級過去問を見る ↗</a>
  </div>

  <h2 class="sec">公開中の過去問 <small>（${CONFIG.checkedAt} 時点）</small></h2>
  <div class="grid3">
    ${O.editions.map(e => `
      <div class="card">
        <h3>${e.label}</h3>
        <div class="links">
          ${link(e.booklet, '問題冊子（PDF）')}
          ${link(e.answer, '解答（PDF）')}
          ${link(e.audio1, 'リスニング 第1部 音声')}
          ${link(e.audio2, 'リスニング 第2部 音声')}
          ${link(e.script, 'リスニング原稿（PDF）')}
        </div>
      </div>`).join('')}
  </div>
  <div class="card">
    <h3>二次試験</h3>
    <div class="links">${link(O.secondSample, '二次試験サンプル問題（PDF）')}${link(O.virtualSecond, 'バーチャル二次試験（流れの確認）')}${link(O.grade2, '2級の試験内容')}</div>
    <p class="small muted">公開される回は定期的に入れ替わります。リンクが開けない場合は「英検公式の2級過去問を見る」から最新の回を確認してください。</p>
  </div>

  <div class="card">
    <h2>過去問の学習記録</h2>
    <form id="pastForm" class="past-form">
      <div class="row">
        <select name="year">${[0, 1, 2].map(d => `<option>${thisYear - d}年度</option>`).join('')}</select>
        <select name="round"><option>第1回</option><option>第2回</option><option>第3回</option></select>
      </div>
      <div class="checks">
        ${[['reading', 'リーディング'], ['listening', 'リスニング'], ['summary', '英文要約'], ['opinion', '意見論述'], ['second', '二次試験サンプル']].map(([k, n]) => `<label><input type="checkbox" name="${k}"> ${n}：完了</label>`).join('')}
      </div>
      <div class="row">
        <input name="rscore" type="number" min="0" max="31" placeholder="リーディング正解数（/31）">
        <input name="lscore" type="number" min="0" max="30" placeholder="リスニング正解数（/30）">
      </div>
      <div class="label">自己評価</div>
      <div class="seg" id="selfEval">${['○', '△', '×'].map(v => `<button type="button" data-v="${v}">${v}</button>`).join('')}</div>
      <textarea name="memo" rows="2" placeholder="メモ（間違えた分野・次回の目標など）"></textarea>
      <button class="btn primary block">記録を保存</button>
    </form>
  </div>

  <div class="card">
    <h2>記録一覧</h2>
    ${P.length ? `<div class="table-wrap"><table class="tbl">
      <tr><th>回</th><th>R</th><th>L</th><th>要約</th><th>意見</th><th>評価</th><th>日付</th></tr>
      ${P.slice().reverse().map(r => `<tr><td>${U.esc(r.label)}</td><td>${r.reading ? '完了' : '—'}${r.rscore !== '' && r.rscore != null ? `<br><small>${r.rscore}/31</small>` : ''}</td><td>${r.listening ? '完了' : '—'}${r.lscore !== '' && r.lscore != null ? `<br><small>${r.lscore}/30</small>` : ''}</td><td>${r.summary ? '完了' : '—'}</td><td>${r.opinion ? '完了' : '—'}</td><td class="big">${U.esc(r.self || '')}</td><td><small>${r.date}</small></td></tr>${r.memo ? `<tr><td colspan="7" class="small muted">📝 ${U.esc(r.memo)}</td></tr>` : ''}`).join('')}
    </table></div>` : '<p class="muted">まだ記録はありません。</p>'}
  </div>`;

  let self = '';
  U.$$('#selfEval button', el).forEach(b => b.onclick = () => { self = b.dataset.v; U.$$('#selfEval button', el).forEach(x => x.classList.toggle('on', x === b)); });
  U.$('#pastForm', el).onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const rec = {
      label: `${f.year.value} ${f.round.value}`,
      reading: f.reading.checked, listening: f.listening.checked, summary: f.summary.checked, opinion: f.opinion.checked, second: f.second.checked,
      rscore: f.rscore.value, lscore: f.lscore.value, self, memo: f.memo.value.trim(), date: U.today()
    };
    if (!rec.reading && !rec.listening && !rec.summary && !rec.opinion && !rec.second) return U.toast('完了した項目にチェックを入れてください');
    P.push(rec);
    Store.save();
    U.toast('過去問の記録を保存しました');
    Views.past(args, el);
  };
};
