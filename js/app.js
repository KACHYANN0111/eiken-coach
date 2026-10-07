/* ルーター・ナビゲーション
 * 画面遷移は App.go(route) に集約。URLの # が使える環境では履歴（戻る）にも対応し、
 * 使えない環境（埋め込み表示など）でも画面だけは確実に切り替わる。 */
const NAV = [
  ['home', '🏠', 'ホーム'],
  ['vocab', '📘', '単語'],
  ['reading', '📖', 'リーディング'],
  ['listening', '🎧', 'リスニング'],
  ['writing', '✍️', 'ライティング'],
  ['speaking', '🗣️', 'スピーキング'],
  ['past', '📚', '過去問'],
  ['history', '📊', '学習履歴'],
  ['settings', '⚙️', '設定']
];

const App = {
  current: '#home',
  go(route) {
    route = route.startsWith('#') ? route : '#' + route;
    let viaHash = false;
    try {
      if (location.hash !== route) { location.hash = route; viaHash = true; }
    } catch (e) { /* 埋め込み環境で # が使えない場合 */ }
    if (!viaHash) return render(route);
    // hashchange が届かない環境のための保険
    setTimeout(() => { if (App.current !== route) render(route); }, 60);
  }
};

function renderNav() {
  const html = NAV.map(([id, ic, name]) => `<a href="#${id}" data-r="${id}"><span class="ic">${ic}</span><span>${name}</span></a>`).join('');
  U.$('#sideNav').innerHTML = html;
  U.$('#bottomNav').innerHTML = NAV.filter(n => ['home', 'vocab', 'reading', 'listening', 'writing'].includes(n[0]))
    .map(([id, ic, name]) => `<a href="#${id}" data-r="${id}"><span class="ic">${ic}</span><span>${name === 'リーディング' ? '読む' : name === 'リスニング' ? '聞く' : name === 'ライティング' ? '書く' : name}</span></a>`).join('')
    + `<button id="moreBtn" type="button"><span class="ic">☰</span><span>メニュー</span></button>`;
  U.$('#moreBtn').onclick = () => toggleMenu();
  U.$('#menuBtn').onclick = () => toggleMenu();
  U.$('#scrim').onclick = () => toggleMenu(false);
}
function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
}

function render(route) {
  Speech.stop();
  toggleMenu(false);
  App.current = route || '#home';
  const [name, ...args] = App.current.slice(1).split('/').map(decodeURIComponent);
  const view = Views[name] ? name : 'home';
  U.$$('[data-r]').forEach(a => a.classList.toggle('on', a.dataset.r === view));
  const el = U.$('#app');
  el.innerHTML = '';
  try { Views[view](args, el); }
  catch (e) { console.error(e); el.innerHTML = `<div class="card empty">画面の表示中にエラーが発生しました。<br><small>${U.esc(e.message)}</small><br><a class="btn" href="#home">ホームへ</a></div>`; }
  window.scrollTo(0, 0);
  const logo = U.$('.brand .logo'); if (logo) logo.textContent = examOf().name;
  const st = Store.streak();
  U.$('#streakTop').textContent = st ? `🔥${st}日` : '';
}

// 画面上部の 🔊 ボタン（すべての音のオン／オフ）
function updateMuteBtn() {
  const b = U.$('#muteBtn');
  if (!b) return;
  const muted = !!Store.setting('muted');
  b.textContent = muted ? '🔇' : '🔊';
  b.setAttribute('aria-label', muted ? '音をオンにする' : '音をオフにする');
  b.title = muted ? '音をオンにする' : '音をオフにする';
}

function syncChip(state) {
  const el = U.$('#syncState');
  if (!el) return;
  const map = { local: ['', ''], connecting: ['接続中…', 'wait'], synced: ['☁ 同期済み', 'ok'], saving: ['☁ 保存中…', 'wait'], error: ['☁ 未同期', 'ng'] };
  const [text, cls] = map[state] || map.local;
  el.textContent = text;
  el.className = 'sync-chip ' + cls;
  el.title = state === 'error' ? 'クラウドに保存できませんでした。端末内には保存されています。' : state === 'synced' ? '学習記録はクラウドに保存され、他の端末と共有されます' : '';
}

// 画面内リンク（#...）はすべて App.go 経由で開く
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  e.preventDefault();
  App.go(a.getAttribute('href'));
});
addEventListener('hashchange', () => { if (location.hash && location.hash !== App.current) render(location.hash); });
addEventListener('DOMContentLoaded', () => {
  renderNav();
  updateMuteBtn();
  U.$('#muteBtn').onclick = () => {
    const muted = !Store.setting('muted');
    Store.setSetting('muted', muted);
    updateMuteBtn();
    if (muted) { try { speechSynthesis.cancel(); } catch (e) {} U.toast('音をオフにしました'); }
    else { Sound.play('save'); U.toast('音をオンにしました'); }
    if (App.current === '#settings') render('#settings');
  };
  let start = '#home';
  try { if (/^#[a-z]/.test(location.hash)) start = location.hash; } catch (e) {}
  render(start);
  Tracker.start();
  Cloud.onChange = syncChip;
  Cloud.onRemote = () => {
    // 学習途中の画面は作り直さない（入力中の回答を消さないため）
    const r = App.current;
    if (/\/(start|run)\//.test(r) || /^#(writing|speaking)\/[a-z-]+\/./.test(r) || /^#reading\/(short|long|content)\/./.test(r)) return;
    render(r);
  };
  Cloud.init();
});
