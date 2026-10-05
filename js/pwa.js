/* =========================================================
 * スマホアプリ化（PWA）
 * - オフラインで動くようにサービスワーカーを登録（https で公開したときのみ）
 * - Android：インストールボタン / iPhone：ホーム画面への追加手順を案内
 * claude.ai 公開版（埋め込み表示）ではサービスワーカーは使わない。
 * ========================================================= */
const PWA = {
  deferred: null,   // Android Chrome のインストール用イベント
  embedded: !!(window.claude && typeof window.claude.use === 'function'),

  isStandalone() {
    return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  },
  platform() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'pc';
  },

  init() {
    if (!this.embedded && 'serviceWorker' in navigator && (location.protocol === 'https:' || /[?&]sw\b/.test(location.search))) {
      navigator.serviceWorker.register('sw.js').catch(e => console.warn('service worker', e));
    }
    addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.deferred = e;
      const btn = U.$('#pwaInstall');
      if (btn) btn.hidden = false;
    });
    addEventListener('appinstalled', () => { this.deferred = null; U.toast('ホーム画面に追加しました'); });
  },

  async install() {
    if (!this.deferred) return;
    this.deferred.prompt();
    await this.deferred.userChoice.catch(() => null);
    this.deferred = null;
    const btn = U.$('#pwaInstall');
    if (btn) btn.hidden = true;
  },

  dismissed() { try { return localStorage.getItem('pwaGuideHidden') === '1'; } catch (e) { return false; } },
  dismiss() { try { localStorage.setItem('pwaGuideHidden', '1'); } catch (e) {} },

  // ホーム画面に出す案内カード（アプリとして起動中は出さない）
  cardHTML() {
    if (this.isStandalone() || this.dismissed()) return '';
    const url = CONFIG.appUrl;
    if (this.embedded) {
      if (!url) return '';
      return `<div class="card pwa-card">
        <div class="pwa-head"><img src="${url}icons/apple-touch-icon.png" alt="" width="44" height="44" onerror="this.remove()"><div><h2>スマホのアプリ版があります</h2><p class="small muted">ホーム画面のアイコンから起動でき、オフラインでも使えます。</p></div></div>
        <p class="url-box"><a href="${url}" target="_blank" rel="noopener">${url}</a></p>
        <p class="small muted">スマホでこのURLを開き、ホーム画面に追加してください。アプリ版の学習記録はその端末に保存されます（記録の移行は「学習履歴」のバックアップで行えます）。</p>
        <button type="button" class="btn small-btn" data-pwa-dismiss>今後表示しない</button>
      </div>`;
    }
    const p = this.platform();
    const steps = p === 'ios'
      ? `<ol class="pwa-steps">
          <li>Safari で開いていることを確認（他のアプリ内ブラウザでは追加できません）</li>
          <li>画面下の <b>共有ボタン</b>（□に↑のアイコン）をタップ</li>
          <li><b>「ホーム画面に追加」</b>を選ぶ（見つからなければ下にスクロール）</li>
          <li>右上の<b>「追加」</b>をタップ → ホーム画面の「英検コーチ」から起動</li>
        </ol>`
      : p === 'android'
        ? `<ol class="pwa-steps">
            <li>下の<b>「アプリをインストール」</b>ボタンをタップ</li>
            <li>ボタンが出ない場合は、Chrome の<b>メニュー（︙）</b>→<b>「アプリをインストール」</b>または<b>「ホーム画面に追加」</b></li>
          </ol>`
        : `<p class="small">スマホでこのページを開くと、ホーム画面に追加してアプリのように使えます。PC では、アドレスバーのインストールボタンからアプリとして追加できます。</p>`;
    return `<div class="card pwa-card">
      <div class="pwa-head"><img src="icons/apple-touch-icon.png" alt="" width="44" height="44"><div><h2>📲 アプリとして使う</h2><p class="small muted">ホーム画面のアイコンからすぐ起動。全画面で表示され、オフラインでも使えます。</p></div></div>
      ${steps}
      <div class="btn-row">
        <button type="button" class="btn primary" id="pwaInstall" ${this.deferred ? '' : 'hidden'}>アプリをインストール</button>
        <button type="button" class="btn" data-pwa-dismiss>今後表示しない</button>
      </div>
    </div>`;
  },

  bindCard(el) {
    const btn = U.$('#pwaInstall', el);
    if (btn) btn.onclick = () => this.install();
    U.$$('[data-pwa-dismiss]', el).forEach(b => b.onclick = () => { this.dismiss(); b.closest('.pwa-card').remove(); });
  }
};
PWA.init();
