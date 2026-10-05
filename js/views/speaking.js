/* 二次試験・スピーキング
 * 今回は「自分ならどう答えるか」をテキストで入力して練習する。
 * 将来の拡張ポイント：
 *  - 音声録音：Recorder.start/stop（MediaRecorder）を実装
 *  - 発音分析・AI評価：AI.evaluateSpeaking を API 実装に差し替え */
const Recorder = { available: false, start() {}, stop() {} };

Views.speaking = (args, el) => {
  if (args[0]) return speakingSet(args[0], el);
  const S = Store.data.speaking;
  el.innerHTML = `
  <h1 class="page">🗣️ 二次試験（面接）</h1>
  <div class="card">
    <h2>二次試験の流れ（約${CONFIG.exam.second.minutes}分）</h2>
    <ol class="flow">${CONFIG.exam.second.parts.map(p => `<li><b>${p.name}</b><br><small class="muted">${p.note}</small></li>`).join('')}</ol>
    <p class="small muted">入室・あいさつ・氏名と級の確認・簡単な質問のあと、問題カードが渡されます。公式の <a href="${CONFIG.official.virtualSecond}" target="_blank" rel="noopener">バーチャル二次試験</a> で流れを確認できます。</p>
  </div>
  <a class="btn primary block" href="#speaking/auto">おすすめの1セットに挑戦</a>
  <div class="plist">${SPEAKING_DATA.map(s => { const n = S.filter(x => x.setId === s.id).length; return `<a class="card link-card row" href="#speaking/${s.id}"><span class="pill">${U.esc(s.theme)}</span><b class="en">${U.esc(s.title)}</b><small class="muted">${n ? `練習 ${n}回` : '未挑戦'}</small></a>`; }).join('')}</div>`;
};

function speakingSet(id, el) {
  const S = Store.data.speaking;
  const s = id === 'auto'
    ? U.shuffle(SPEAKING_DATA).sort((a, b) => S.filter(x => x.setId === a.id).length - S.filter(x => x.setId === b.id).length)[0]
    : SPEAKING_DATA.find(x => x.id === id);
  if (!s) { el.innerHTML = '<div class="card empty">問題が見つかりません。</div>'; return; }

  const part = (key, title, qHTML, model, modelJa, extra = '') => `
    <div class="card sp-part" data-part="${key}">
      <h2>${title}</h2>
      ${qHTML}
      ${extra}
      <textarea class="answer en" rows="4" placeholder="自分ならどう答えるか、英語で書いてみましょう"></textarea>
      <div class="btn-row">
        <button class="btn" disabled title="今後追加予定">🎙 録音（今後追加予定）</button>
        <button class="btn primary save">練習を記録</button>
        <button class="btn show">解答例を見る</button>
      </div>
      <div class="out"></div>
      <div class="model-ans" hidden><div class="label">解答例</div><p class="en">${U.esc(model)} <button class="icon-btn" data-say="${U.esc(model)}">🔊</button></p><p class="small muted">${U.esc(modelJa)}</p></div>
    </div>`;

  el.innerHTML = `
  <div class="quiz-head"><a href="#speaking" class="back">← 戻る</a><span>二次試験 練習</span><span class="pill">${U.esc(s.theme)}</span></div>
  <div class="card">
    <div class="label">問題カード</div>
    <h2 class="en center">${U.esc(s.title)}</h2>
    <p class="en passage-sp">${U.esc(s.passage)}</p>
    <div class="btn-row">
      <button class="btn" id="silent">⏱ 黙読20秒</button>
      <button class="btn" id="model">🔊 お手本の音読</button>
      <label class="chk"><input type="checkbox" id="readDone"> 音読した</label>
    </div>
    <div id="timer" class="muted small"></div>
    <p class="small muted">音読のコツ：意味のまとまり（スラッシュ）ごとに区切り、タイトルも読みます。固有名詞や数字は落ち着いて。</p>
  </div>
  ${part('q1', 'No.1 パッセージについての質問', `<p class="en q">${U.esc(s.q1)}</p>`, s.a1, s.a1ja)}
  ${part('q2', 'No.2 3コマのイラスト展開説明', `<p class="en q">Now, please look at the picture and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card.</p>`, s.a2, s.a2ja,
    `<div class="card-start en">${U.esc(s.card)}</div><div class="panels">${s.panels.map((p, i) => `<div class="panel"><div class="pn">${i + 1}</div><div class="pi">${p.icon}</div><p>${U.esc(p.desc)}</p></div>`).join('')}</div><p class="small muted">※ イラストは文章で説明しています（将来、画像に差し替え可能）。</p>`)}
  ${part('q3', 'No.3 受験者自身の意見', `<p class="small muted">Now, please turn over the card and put it down.</p><p class="en q">${U.esc(s.q3)}</p>`, s.a3, s.a3ja)}
  ${part('q4', 'No.4 日常生活に関する意見', `<p class="en q">${U.esc(s.q4)}</p>`, s.a4, s.a4ja)}
  <div id="spDone"></div>`;

  U.$('#model', el).onclick = () => Speech.play(s.title + '. ' + s.passage, { rate: 0.9 });
  U.$('#silent', el).onclick = () => {
    let t = 20; const tm = U.$('#timer', el);
    clearInterval(speakingSet.iv);
    tm.textContent = `黙読中… ${t}秒`;
    speakingSet.iv = setInterval(() => { t--; tm.textContent = t > 0 ? `黙読中… ${t}秒` : '⏰ では音読してください（Please read the passage aloud.）'; if (t <= 0) clearInterval(speakingSet.iv); }, 1000);
  };
  U.$('#readDone', el).onchange = e => { if (e.target.checked) logPart('read', '(音読)'); };
  U.$$('[data-say]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.say));

  function logPart(key, text) {
    S.push({ setId: s.id, part: key, text, date: U.today(), time: new Date().toTimeString().slice(0, 5) });
    Store.day().speaking++;
    Store.save();
    const parts = new Set(S.filter(x => x.setId === s.id && x.date === U.today()).map(x => x.part));
    if (['q1', 'q2', 'q3', 'q4'].every(k => parts.has(k))) {
      U.$('#spDone', el).innerHTML = `<div class="card result"><b>🎉 このセットの練習を記録しました！</b>${Coach.nextStepHTML('speaking')}</div>`;
    }
  }

  U.$$('.sp-part', el).forEach(box => {
    const key = box.dataset.part, ta = U.$('textarea', box);
    U.$('.show', box).onclick = () => { U.$('.model-ans', box).hidden = false; };
    U.$('.save', box).onclick = async () => {
      const text = ta.value.trim();
      if (!text) return U.toast('回答を入力してください');
      logPart(key, text);
      Sound.saved();
      const r = await AI.evaluateSpeaking({ part: key, text, start: s.card });
      U.$('.out', box).innerHTML = `<div class="ai-box"><b>💾 記録しました</b>（${U.countWords(text)}語）<ul class="tips">${r.tips.map(t => `<li>${U.esc(t)}</li>`).join('')}</ul></div>`;
      U.$('.model-ans', box).hidden = false;
    };
  });
}
