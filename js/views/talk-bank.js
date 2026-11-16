/* 英会話：表現集（データは js/data/talk-bank.js の TALK_BANK）
 * 分類ごとに、同じ意味・同じ場面で使える言い方をまとめて見せる。
 * 1つの表現：英語・日本語訳・難易度・ニュアンス（使い分け）／まとまり：使う場面・使用例・類似表現（同じまとまりの他の言い方） */
const bankLv = () => +(Store.setting('bankLv') || 0);   // 0＝すべて / 1 初級 / 2 中級 / 3 上級
const bankCat = id => TALK_BANK.cats.find(c => c.id === id);
const bankCount = c => c.cards.reduce((a, k) => a + k.vs.length, 0);
const bankSpeakable = v => !v.en.includes('...');       // 「In my opinion,...」のような言いかけは練習から外す

function bankLvBadge(lv) { return `<span class="lv lv${lv}">${TALK_BANK.levels[lv]}</span>`; }
function bankLvFilter() {
  const cur = bankLv();
  return `<div class="lv-filter" role="group" aria-label="難易度">${['すべて', '初級', '中級', '上級']
    .map((n, i) => `<button type="button" class="btn small-btn ${cur === i ? 'primary' : ''}" data-lv="${i}">${n}</button>`).join('')}</div>`;
}
function bindBankCommon(el, redraw) {
  U.$$('[data-lv]', el).forEach(b => b.onclick = () => { Store.setSetting('bankLv', +b.dataset.lv); redraw(); });
  U.$$('[data-say]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.say));
  U.$$('[data-dialog]', el).forEach(b => b.onclick = () => {
    const [c, n] = b.dataset.dialog.split('-');
    const k = bankCat(c).cards[+n - 1];
    // A は女性の声、B は男性の声で読み上げる（「（早口で）」などの書きは読まない）
    Speech.play(k.ex.split(' / ').map(l => ({ sp: /^B:/.test(l) ? 'M' : 'W', t: l.replace(/^[A-Z]:\s*/, '').replace(/\(.*?\)\s*/g, '') })), { rate: 0.92 });
  });
}

// 練習用の問題（「話して練習」で使う）：その分類の表現ごとに1問。同じまとまりの他の言い方で答えても正解にする
function bankPracticeItems(catId, lv = 0) {
  const c = bankCat(catId);
  if (!c) return [];
  const items = c.cards.flatMap(k => {
    const ok = k.vs.filter(bankSpeakable);
    return ok.filter(v => !lv || v.lv === lv).map(v => ({
      id: v.id, en: v.en, ja: v.ja, lv: v.lv, scene: 'bank-' + c.id,
      note: `${k.ja}（${k.scene}）｜${v.note}`,
      alts: ok.filter(x => x !== v).map(x => x.en)
    }));
  });
  return items.length || !lv ? items : bankPracticeItems(catId, 0);
}

function bankCardHTML(k, lv, cat) {
  const vs = k.vs.filter(v => !lv || v.lv === lv);
  if (!vs.length) return '';
  const others = lv ? k.vs.filter(v => v.lv !== lv) : [];
  const lines = k.ex.split(' / '), linesJa = k.exJa.split(' / ');
  return `<div class="card bank-card">
    <div class="bank-head"><h3>${U.esc(k.ja)}</h3>${cat ? `<a class="small" href="#talk/bank/${cat.id}">${cat.icon} ${U.esc(cat.name)}</a>` : ''}</div>
    <p class="small muted">🗣️ 使う場面：${U.esc(k.scene)}</p>
    <p class="small bank-label">言い方のバリエーション（類似表現）と使い分け</p>
    <ul class="bank-vs">
      ${vs.map(v => `<li>
        <div class="bank-en">${bankLvBadge(v.lv)} <span class="en">${U.esc(v.en)}</span> <button type="button" class="icon-btn" data-say="${U.esc(v.en)}" title="聞く">🔊</button></div>
        <div class="bank-ja">${U.esc(v.ja)}</div>
        <div class="small muted">💡 ${U.esc(v.note)}</div>
      </li>`).join('')}
    </ul>
    ${others.length ? `<p class="small muted">ほかのレベルの言い方：${others.map(v => `<span class="en">${U.esc(v.en)}</span>（${TALK_BANK.levels[v.lv]}）`).join(' ／ ')}</p>` : ''}
    <div class="bank-ex">
      <div class="small muted">📘 使用例 <button type="button" class="icon-btn" data-dialog="${U.esc(k.id)}" title="会話を聞く">🔊</button></div>
      ${lines.map((l, i) => `<p class="en">${U.esc(l)}</p>${jaSubHTML(linesJa[i])}`).join('')}
    </div>
  </div>`;
}

/* ---------- 表現集トップ（分類一覧・検索） ---------- */
function talkBankMenu(el, query = '') {
  const total = TALK_BANK.cats.reduce((a, c) => a + bankCount(c), 0);
  const cards = TALK_BANK.cats.reduce((a, c) => a + c.cards.length, 0);
  el.innerHTML = `
  <h1 class="page">📚 英会話の表現集</h1>
  ${talkTabs('bank')}
  <div class="card talk-intro">
    <p>会話でそのまま使える表現を <b>${TALK_BANK.cats.length}分類・${cards}場面・${total}表現</b> 集めました。同じ意味でも言い方がいくつかあるので、<b>ニュアンスと使い分け</b>もいっしょに覚えましょう。</p>
    <p class="small muted">それぞれの表現に「日本語訳・使う場面・難易度・使用例・類似表現」が付いています。分類を開いて🔊で聞き、「話して練習」で声に出してみましょう。</p>
    <input type="search" id="bankQ" class="bank-search" value="${U.esc(query)}" placeholder="🔍 英語か日本語で探す（例：agree、驚いた、おすすめ）" aria-label="表現を探す">
    ${bankLvFilter()}
  </div>
  <div id="bankResult"></div>
  <div id="bankCats">
    ${TALK_BANK.groups.map(g => `<h2 class="sec">${U.esc(g.name)} <small class="muted">${U.esc(g.desc)}</small></h2>
      <div class="scene-grid">${TALK_BANK.cats.filter(c => c.group === g.id).map(c => `
        <a class="scene-card" href="#talk/bank/${c.id}">
          <span class="scene-ic">${c.icon}</span>
          <b>${U.esc(c.name)}</b>
          <small class="muted">${c.cards.slice(0, 3).map(k => U.esc(k.ja)).join('・')} など</small>
          <small>${c.cards.length}場面・${bankCount(c)}表現</small>
        </a>`).join('')}</div>`).join('')}
  </div>`;
  const inp = U.$('#bankQ', el), res = U.$('#bankResult', el), list = U.$('#bankCats', el);
  const search = () => {
    const q = inp.value.trim().toLowerCase();
    list.hidden = !!q;
    if (!q) { res.innerHTML = ''; return; }
    const lv = bankLv();
    const hits = [];
    TALK_BANK.cats.forEach(c => c.cards.forEach(k => {
      const text = [k.ja, k.scene, ...k.vs.flatMap(v => [v.en, v.ja, v.note])].join(' ').toLowerCase();
      if (text.includes(q) && k.vs.some(v => !lv || v.lv === lv)) hits.push({ c, k });
    }));
    const html = hits.slice(0, 30).map(h => bankCardHTML(h.k, lv, h.c)).join('');
    res.innerHTML = html
      ? `<p class="small muted">${hits.length}件見つかりました${hits.length > 30 ? '（最初の30件を表示）' : ''}</p>${html}`
      : `<div class="card empty">「${U.esc(inp.value.trim())}」に合う表現は見つかりませんでした${lv ? '（難易度を「すべて」にすると増えるかもしれません）' : ''}。</div>`;
    bindBankCommon(res, () => talkBankMenu(el, inp.value));
  };
  inp.oninput = search;
  bindBankCommon(el.querySelector('.talk-intro'), () => talkBankMenu(el, inp.value));
  if (query) search();
}

/* ---------- 分類ごとの表現 ---------- */
function talkBankCat(id, el) {
  const c = bankCat(id);
  if (!c) { el.innerHTML = '<div class="card empty">分類が見つかりません。<a class="btn" href="#talk/bank">表現集へ</a></div>'; return; }
  const lv = bankLv();
  const shown = c.cards.map(k => bankCardHTML(k, lv)).join('');
  el.innerHTML = `
  <div class="quiz-head"><a href="#talk/bank" class="back">← 表現集</a><span>${c.icon} ${U.esc(c.name)}</span><span></span></div>
  <div class="card">
    <div class="btn-row talk-actions">
      <a class="btn primary" href="#talk/practice/bank-${c.id}/10">🎤 この分類を話して練習</a>
      <button type="button" class="btn" id="playAll">▶ 全部聞く</button>
    </div>
    ${bankLvFilter()}
    ${jaSubToggle('bankJa')}
  </div>
  ${shown || '<div class="card empty">このレベルの表現はありません。難易度を「すべて」にしてください。</div>'}`;
  const redraw = () => talkBankCat(id, el);
  bindBankCommon(el, redraw);
  bindJaSub('bankJa', el, redraw);
  U.$('#playAll', el).onclick = () => Speech.play(c.cards.flatMap(k => k.vs.filter(v => !lv || v.lv === lv)).map(v => ({ sp: 'W', t: v.en })), { rate: 0.9 });
}
