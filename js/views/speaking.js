/* 二次試験・スピーキング（2級・準1級・1級）
 * 今回は「自分ならどう答えるか」をテキストで入力して練習する。
 * 将来の拡張ポイント：
 *  - 音声録音：Recorder.start/stop（MediaRecorder）を実装
 *  - 発音分析・AI評価：AI.evaluateSpeaking を API 実装に差し替え */
const Recorder = { available: false, start() {}, stop() {} };

Views.speaking = (args, el) => {
  if (args[0]) return speakingSet(args[0], el);
  const g = examGradeId(), E = examOf(g);
  const S = Store.data.speaking;
  const sets = ofGrade(SPEAKING_DATA, g);
  el.innerHTML = `
  <h1 class="page">🗣️ 二次試験（面接）</h1>
  ${examTabsHTML()}
  <div class="card">
    <h2>${E.name}の二次試験の流れ（約${E.second.minutes}分）</h2>
    <ol class="flow">${E.second.parts.map(p => `<li><b>${p.name}</b><br><small class="muted">${p.note}</small></li>`).join('')}</ol>
    <p class="small muted">入室・あいさつ・氏名の確認・簡単な日常会話のあと、${g === '1' ? 'トピックカード' : '問題カード'}が渡されます。公式の <a href="${E.official.virtualSecond}" target="_blank" rel="noopener">バーチャル二次試験</a> で流れを確認できます。</p>
  </div>
  <a class="btn primary block" href="#speaking/auto">おすすめの1セットに挑戦</a>
  <div class="plist">${sets.map(s => { const n = S.filter(x => x.setId === s.id).length; return `<a class="card link-card row" href="#speaking/${s.id}"><span class="pill">${U.esc(s.theme)}</span><b class="en">${U.esc(s.title)}</b><small class="muted">${n ? `練習 ${n}回` : '未挑戦'}</small></a>`; }).join('')}</div>`;
  bindExamTabs(el, () => Views.speaking(args, el));
};

function speakingSet(id, el) {
  const S = Store.data.speaking;
  const s = id === 'auto'
    ? U.shuffle(ofGrade(SPEAKING_DATA)).sort((a, b) => S.filter(x => x.setId === a.id).length - S.filter(x => x.setId === b.id).length)[0]
    : SPEAKING_DATA.find(x => x.id === id);
  if (!s) { el.innerHTML = '<div class="card empty">問題が見つかりません。</div>'; return; }
  const g = gOf(s);

  const part = (key, title, qHTML, model, modelJa, extra = '', rows = 4) => `
    <div class="card sp-part" data-part="${key}">
      <h2>${title}</h2>
      ${qHTML}
      ${extra}
      <textarea class="answer en" rows="${rows}" placeholder="自分ならどう答えるか、英語で書いてみましょう"></textarea>
      <div class="btn-row">
        <button type="button" class="btn" disabled title="今後追加予定">🎙 録音（今後追加予定）</button>
        <button type="button" class="btn primary save">練習を記録</button>
        <button type="button" class="btn show">解答例を見る</button>
      </div>
      <div class="out"></div>
      <div class="model-ans" hidden><div class="label">解答例</div><p class="en">${U.esc(model)} <button type="button" class="icon-btn" data-say="${U.esc(model)}">🔊</button></p><p class="small muted">${U.esc(modelJa)}</p></div>
    </div>`;
  const timer = (label, sec, done) => `<button type="button" class="btn" data-timer="${sec}" data-done="${U.esc(done)}">⏱ ${label}</button>`;
  const panelsHTML = panels => `<div class="panels ${panels.length === 4 ? 'p4' : ''}">${panels.map((p, i) => `<div class="panel"><div class="pn">${i + 1}</div>${p.time ? `<div class="ptime">${U.esc(p.time)}</div>` : ''}<div class="pi">${p.icon}</div><p>${U.esc(p.desc)}</p></div>`).join('')}</div><p class="small muted">※ イラストは文章で説明しています（将来、画像に差し替え可能）。</p>`;

  let body = '', required = [];
  if (g === 'p1') {
    required = ['narration', ...s.qs.map(q => q.key)];
    body = `
    <div class="card">
      <div class="label">問題カード</div>
      <h2 class="en">${U.esc(s.title)}</h2>
      <p class="small">次の指示にしたがって話します：<span class="en">You have one minute to prepare. This is a story about ${U.esc(s.about)}. You have two minutes to narrate the story. Your story should begin with the following sentence:</span></p>
      <div class="card-start en">${U.esc(s.card)}</div>
      ${panelsHTML(s.panels)}
      <div class="btn-row">${timer('準備1分', 60, 'では、ナレーションを始めてください（Please begin your narration.）')}${timer('ナレーション2分', 120, '⏰ 2分たちました。ここで終わりです。')}</div>
      <div class="timer muted small"></div>
    </div>
    ${part('narration', 'ナレーション（4コマの展開を説明）', '<p class="small muted">カードの最初の文で話し始め、4コマすべてを過去形で説明します。コマの上の時間表示や吹き出しも使いましょう。</p>', s.narration, s.narrationJa, '', 8)}
    <p class="small muted center">Now, please turn over the card and put it down.</p>
    ${s.qs.map((q, i) => part(q.key, `No.${i + 1} ${i === 0 ? 'イラストに関連した質問' : i === 3 ? '社会性のある質問' : 'トピックに関連した質問'}`, `<p class="en q">${U.esc(q.q)}</p>`, q.a, q.aJa)).join('')}`;
  } else if (g === '1') {
    required = ['speech', ...s.qa.map(q => q.key)];
    body = `
    <div class="card">
      <div class="label">トピックカード（5つから1つ選ぶ）</div>
      <ol class="topics en">${s.topics.map((t, i) => `<li class="${i === s.model.topic ? 'model-topic' : ''}">${U.esc(t)}</li>`).join('')}</ol>
      <p class="small muted">考える時間は1分（メモは取れません）。スピーチは2分間です。解答例は <b>${s.model.topic + 1}番</b> のトピックで作っています。</p>
      <div class="btn-row">${timer('準備1分', 60, 'では、スピーチを始めてください。')}${timer('スピーチ2分', 120, '⏰ 2分たちました。ここで終わりです。')}</div>
      <div class="timer muted small"></div>
    </div>
    ${part('speech', 'スピーチ（2分間）', `<p class="small">構成の目安：<b>①主張</b>（自分の立場）→ <b>②理由1・2</b>（具体例つき）→ <b>③結論</b>。2分間でおよそ200〜260語です。</p><details><summary>解答例の構成メモ</summary><ul>${s.model.outline.map(o => `<li>${U.esc(o)}</li>`).join('')}</ul></details>`, s.model.text, s.model.ja, '', 10)}
    ${s.qa.map((q, i) => part(q.key, `Q&A ${i + 1}`, `<p class="en q">${U.esc(q.q)}</p>`, q.a, q.aJa)).join('')}`;
  } else {
    required = ['q1', 'q2', 'q3', 'q4'];
    body = `
    <div class="card">
      <div class="label">問題カード</div>
      <h2 class="en center">${U.esc(s.title)}</h2>
      <p class="en passage-sp">${U.esc(s.passage)}</p>
      <div class="btn-row">
        ${timer('黙読20秒', 20, '⏰ では音読してください（Please read the passage aloud.）')}
        <button type="button" class="btn" id="model">🔊 お手本の音読</button>
        <label class="chk"><input type="checkbox" id="readDone"> 音読した</label>
      </div>
      <div class="timer muted small"></div>
      <p class="small muted">音読のコツ：意味のまとまり（スラッシュ）ごとに区切り、タイトルも読みます。固有名詞や数字は落ち着いて。</p>
    </div>
    ${part('q1', 'No.1 パッセージについての質問', `<p class="en q">${U.esc(s.q1)}</p>`, s.a1, s.a1ja)}
    ${part('q2', 'No.2 3コマのイラスト展開説明', `<p class="en q">Now, please look at the picture and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card.</p>`, s.a2, s.a2ja,
      `<div class="card-start en">${U.esc(s.card)}</div>${panelsHTML(s.panels)}`)}
    ${part('q3', 'No.3 受験者自身の意見', `<p class="small muted">Now, please turn over the card and put it down.</p><p class="en q">${U.esc(s.q3)}</p>`, s.a3, s.a3ja)}
    ${part('q4', 'No.4 日常生活に関する意見', `<p class="en q">${U.esc(s.q4)}</p>`, s.a4, s.a4ja)}`;
  }

  el.innerHTML = `
  <div class="quiz-head"><a href="#speaking" class="back">← 戻る</a><span>二次試験 練習</span><span>${gradeBadge(g)} <span class="pill">${U.esc(s.theme)}</span></span></div>
  ${body}
  <div id="spDone"></div>`;

  const md = U.$('#model', el);
  if (md) md.onclick = () => Speech.play(s.title + '. ' + s.passage, { rate: 0.9 });
  U.$$('[data-timer]', el).forEach(b => b.onclick = () => {
    let t = +b.dataset.timer;
    const tm = U.$('.timer', b.closest('.card'));
    const fmt = n => n >= 60 ? `${Math.floor(n / 60)}分${String(n % 60).padStart(2, '0')}秒` : `${n}秒`;
    clearInterval(speakingSet.iv);
    tm.textContent = `残り ${fmt(t)}`;
    speakingSet.iv = setInterval(() => {
      t--;
      tm.textContent = t > 0 ? `残り ${fmt(t)}` : b.dataset.done;
      if (t <= 0) { clearInterval(speakingSet.iv); Sound.play('finish'); }
    }, 1000);
  });
  const rd = U.$('#readDone', el);
  if (rd) rd.onchange = e => { if (e.target.checked) logPart('read', '(音読)'); };
  U.$$('[data-say]', el).forEach(b => b.onclick = () => Speech.play(b.dataset.say));

  function logPart(key, text) {
    S.push({ setId: s.id, grade: g, part: key, text, date: U.today(), time: new Date().toTimeString().slice(0, 5) });
    Store.day().speaking++;
    Store.save();
    const parts = new Set(S.filter(x => x.setId === s.id && x.date === U.today()).map(x => x.part));
    if (required.every(k => parts.has(k))) {
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
      const r = await AI.evaluateSpeaking({ part: key, text, start: s.card || '', grade: g });
      U.$('.out', box).innerHTML = `<div class="ai-box"><b>💾 記録しました</b>（${U.countWords(text)}語）<ul class="tips">${r.tips.map(t => `<li>${U.esc(t)}</li>`).join('')}</ul></div>`;
      U.$('.model-ans', box).hidden = false;
    };
  });
}
