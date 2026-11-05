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
  </div>

  <div class="card" id="aiKeyCard">
    <h2>🤖 AI会話</h2>
    ${PWA.embedded
      ? '<p class="small">claude.ai 版では、APIキーなしで claude.ai のAIと会話できます（「💬 英会話」→「🤖 AIと会話」）。</p>'
      : `<p class="small">「💬 英会話」の「🤖 AIと会話」で、英語で話しかけるとAIが英語で答えてくれます。使うには Anthropic の APIキーが必要です（<span class="en">console.anthropic.com</span> で作成。利用料は従量課金で、あなたのアカウントに請求されます）。</p>
        <p class="small muted">キーはこの端末の中だけに保存され、学習記録・クラウド・バックアップファイルには含まれません。使いすぎを防ぐため、Console で利用上限（Spend limit）を設定しておくと安心です。共用の端末では保存しないでください。</p>
        <div class="key-row">
          <input id="apiKey" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${AIChat.getKey() ? '保存済み（変更する場合は新しいキーを入力）' : 'sk-ant- で始まるAPIキーを貼り付け'}" aria-label="Anthropic APIキー">
          <button type="button" class="btn primary" id="saveKey">保存</button>
          ${AIChat.getKey() ? '<button type="button" class="btn danger" id="clearKey">削除</button>' : ''}
        </div>
        <p class="small">${AIChat.getKey() ? '✅ APIキーが保存されています。' : 'まだAPIキーは保存されていません。'}</p>`}
  </div>`;
  const sk = U.$('#saveKey', el);
  if (sk) sk.onclick = () => {
    const v = U.$('#apiKey', el).value.trim();
    if (!v) return U.toast('APIキーを入力してください');
    if (!/^sk-ant-/.test(v)) return U.toast('Anthropic の APIキーは sk-ant- で始まります');
    AIChat.setKey(v);
    U.toast('APIキーを保存しました');
    Views.settings(args, el);
  };
  const ck = U.$('#clearKey', el);
  if (ck) ck.onclick = () => { AIChat.clearKey(); U.toast('APIキーを削除しました'); Views.settings(args, el); };

  const save = (k, v) => { Store.setSetting(k, v); updateMuteBtn(); };
  U.$('#opt-all', el).onchange = e => save('muted', !e.target.checked);
  U.$$('[data-k]', el).forEach(c => c.onchange = () => save(c.dataset.k, c.checked));
  U.$('#opt-volume', el).onchange = e => { save('volume', +e.target.value); Sound.play('correct'); };
  U.$$('[data-preview]', el).forEach(b => b.onclick = () => { if (Store.setting('muted')) U.toast('音がオフになっています（上の「すべての音をオンにする」をオンにしてください）'); Sound.preview(b.dataset.preview); });
  U.$$('[data-pick]', el).forEach(b => b.onclick = () => { save('character', b.dataset.pick); Sound.preview(b.dataset.pick); Views.settings(args, el); });
  U.$('#testWrong', el).onclick = () => { Sound.answer(false); };
  U.$('#testFanfare', el).onclick = () => { Sound.finish(100); };
};
