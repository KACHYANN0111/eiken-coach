/* 設定：効果音・キャラクターボイス */
Views.settings = (args, el) => {
  const S = Store.data.settings;
  const sw = (key, label, desc) => `
    <label class="switch-row">
      <span><b>${label}</b><small class="muted">${desc}</small></span>
      <input type="checkbox" id="opt-${key}" data-k="${key}" ${S[key] !== false ? 'checked' : ''}>
    </label>`;

  el.innerHTML = `
  <h1 class="page">⚙️ 設定</h1>
  <div class="card">
    <h2>サウンド</h2>
    <label class="switch-row">
      <span><b>すべての音をオンにする</b><small class="muted">オフにすると効果音も声も鳴りません（画面上部の🔊でも切り替えできます）</small></span>
      <input type="checkbox" id="opt-all" ${S.muted ? '' : 'checked'}>
    </label>
    ${sw('sfx', '効果音', '正解は「ピンポーン」、不正解は「ブブー」、結果発表はファンファーレ')}
    ${sw('voice', 'キャラクターの声', '「正解！」「残念…」などをキャラクターが話します')}
    ${sw('mascot', 'キャラクターの吹き出し', '音を消していても、画面にキャラクターの反応が出ます')}
    <label class="vol-row" for="opt-volume"><b>音量</b>
      <input type="range" id="opt-volume" min="0.1" max="1" step="0.1" value="${S.volume ?? 0.8}">
    </label>
    <p class="small muted">iPhone がマナーモード（消音）のときは音が鳴りません。端末の音量もあわせて確認してください。</p>
  </div>

  <div class="card">
    <h2>キャラクターを選ぶ</h2>
    <div class="char-grid">
      ${Object.entries(CHARACTERS).map(([id, c]) => `
        <div class="char-card ${S.character === id ? 'on' : ''}" data-id="${id}">
          <div class="char-face">${c.icon}</div>
          <b>${c.name}</b><small class="muted">${c.desc}</small>
          <small class="char-lines">「${U.esc(c.correct[0])}」「${U.esc(c.wrong[0])}」</small>
          <div class="btn-row">
            <button type="button" class="btn" data-preview="${id}">▶ 聞いてみる</button>
            <button type="button" class="btn ${S.character === id ? 'primary' : ''}" data-pick="${id}">${S.character === id ? '選択中' : 'これにする'}</button>
          </div>
        </div>`).join('')}
    </div>
    <div class="btn-row">
      <button type="button" class="btn" id="testWrong">不正解の音を試す</button>
      <button type="button" class="btn" id="testFanfare">結果発表の音を試す</button>
    </div>
  </div>`;

  const save = (k, v) => { Store.setSetting(k, v); updateMuteBtn(); };
  U.$('#opt-all', el).onchange = e => save('muted', !e.target.checked);
  U.$$('[data-k]', el).forEach(c => c.onchange = () => save(c.dataset.k, c.checked));
  U.$('#opt-volume', el).onchange = e => { save('volume', +e.target.value); Sound.play('correct'); };
  U.$$('[data-preview]', el).forEach(b => b.onclick = () => { if (Store.setting('muted')) U.toast('音がオフになっています（上の「すべての音をオンにする」をオンにしてください）'); Sound.preview(b.dataset.preview); });
  U.$$('[data-pick]', el).forEach(b => b.onclick = () => { save('character', b.dataset.pick); Sound.preview(b.dataset.pick); Views.settings(args, el); });
  U.$('#testWrong', el).onclick = () => { Sound.answer(false); };
  U.$('#testFanfare', el).onclick = () => { Sound.finish(100); };
};
