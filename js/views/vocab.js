/* 単語・熟語：級別テスト / 一覧 */
const VOCAB_MODES = [
  { id: 'normal', name: '通常テスト', desc: 'S・Aランク優先＋苦手を自動ミックス' },
  { id: 'frequent', name: '頻出単語テスト', desc: '頻出度「高」から出題' },
  { id: 'important', name: '重要単語テスト', desc: 'Sランクのみ' },
  { id: 'weak', name: '苦手単語テスト', desc: '苦手判定中の単語' },
  { id: 'wrong', name: '間違えた単語テスト', desc: '一度でも間違えた単語' },
  { id: 'random', name: '全部からランダム', desc: '選んだ級のすべてから' }
];
const VOCAB_FORMATS = [
  { id: 'e2j', name: '英語 → 日本語（4択）' },
  { id: 'j2e', name: '日本語 → 英語（4択）' },
  { id: 'spell', name: '日本語 → 英語（入力）' },
  { id: 'mix', name: 'ミックス' }
];
const GRADE_OPTS = [...CONFIG.grades.map(g => [g.id, g.name]), ['all', '全級']];

function vocabTabs(active) {
  const t = [['#vocab', 'test', '単語テスト'], ['#vocab/list', 'list', '単語一覧'], ['#vocab/list/phrase', 'phrase', '熟語・表現'], ['#vocab/list/weak', 'weak', '苦手単語']];
  return `<div class="tabs">${t.map(([h, k, n]) => `<a href="${h}" class="${k === active ? 'on' : ''}">${n}</a>`).join('')}</div>`;
}
function gradeBadge(g) { return `<span class="grade-badge g-${g}">${U.esc(gradeName(g))}</span>`; }

Views.vocab = (args, el) => {
  if (args[0] === 'start') return vocabRun(args.slice(1), el);
  if (args[0] === 'list') return vocabList(args[1], el);

  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem('vocabSetup') || '{}'); } catch (e) {}
  const sel = Object.assign({ mode: 'normal', n: 10, format: 'e2j', target: 'word' }, saved, { grade: Store.setting('grade') || CONFIG.defaultGrade });
  const cnt = mode => Coach.pool(mode, sel.target, sel.grade).length;

  el.innerHTML = `
  <h1 class="page">📘 単語・熟語</h1>
  ${vocabTabs('test')}
  <div class="card">
    <h2>級を選ぶ</h2>
    <div class="grade-grid" id="grade">
      ${GRADE_OPTS.map(([id, name]) => {
        const g = CONFIG.grades.find(x => x.id === id);
        return `<button type="button" class="grade-tile g-${id} ${id === sel.grade ? 'on' : ''}" data-v="${id}"><b>${name}</b><small>${g ? g.level : 'すべての級から'}</small><span>${VOCAB.count(id, 'word')}語・熟語${VOCAB.count(id, 'phrase')}</span></button>`;
      }).join('')}
    </div>
    <h3>テストモード</h3>
    <div class="choice-grid" id="modes">
      ${VOCAB_MODES.map(m => `<button type="button" class="opt ${m.id === sel.mode ? 'on' : ''}" data-v="${m.id}"><b>${m.name}</b><small>${m.desc}</small><small class="pill">対象 ${cnt(m.id)}語</small></button>`).join('')}
    </div>
    <h3>出題範囲</h3>
    <div class="seg" id="target">
      ${[['word', '単語'], ['phrase', '熟語・表現'], ['both', '単語＋熟語']].map(([v, n]) => `<button type="button" class="${v === sel.target ? 'on' : ''}" data-v="${v}">${n}</button>`).join('')}
    </div>
    <h3>出題数</h3>
    <div class="seg" id="count">${[10, 20, 30, 50].map(n => `<button type="button" class="${n === sel.n ? 'on' : ''}" data-v="${n}">${n}問</button>`).join('')}</div>
    <h3>問題形式</h3>
    <div class="seg wrap" id="format">${VOCAB_FORMATS.map(f => `<button type="button" class="${f.id === sel.format ? 'on' : ''}" data-v="${f.id}">${f.name}</button>`).join('')}</div>
    <button type="button" class="btn primary block" id="startBtn">${U.esc(gradeName(sel.grade))}のテストを開始</button>
  </div>
  <div class="card muted small">
    <b>出題アルゴリズム</b>：① 重要度 ② 頻出度 ③ 間違えた回数 ④ 最近出題されていない単語 を優先し、最近正解した単語・連続正解した単語は出題頻度を下げます。同じテスト内で同じ単語は出題されません。重要度（S〜C）は各級の中での目安です。<br>
    間違えた単語は自動で苦手単語に登録されます（1回：少し優先 / 2回：優先復習 / 3回以上：最重要の苦手）。
  </div>`;

  const bind = (id, key, num) => U.$$(`#${id} button`, el).forEach(b => b.onclick = () => {
    sel[key] = num ? +b.dataset.v : b.dataset.v;
    if (key === 'grade') Store.setSetting('grade', sel.grade);
    else try { sessionStorage.setItem('vocabSetup', JSON.stringify({ mode: sel.mode, n: sel.n, format: sel.format, target: sel.target })); } catch (e) {}
    if (key === 'target' || key === 'grade') return Views.vocab(args, el);
    U.$$(`#${id} button`, el).forEach(x => x.classList.toggle('on', x === b));
  });
  bind('grade', 'grade'); bind('modes', 'mode'); bind('count', 'n', true); bind('format', 'format'); bind('target', 'target');
  U.$('#startBtn', el).onclick = () => App.go(`#vocab/start/${sel.mode}/${sel.n}/${sel.format}/${sel.target}/${sel.grade}`);
};

async function vocabRun([mode = 'normal', n = '10', format = 'e2j', target, grade], el) {
  target = target || (mode === 'weak' || mode === 'wrong' ? 'both' : 'word');
  grade = grade || Store.setting('grade') || CONFIG.defaultGrade;
  const items = await AI.generateWordQuestions({ mode, count: +n, target, grade });
  const modeName = (VOCAB_MODES.find(m => m.id === mode) || {}).name || '';
  const title = `${gradeName(grade)}・${modeName}`;
  if (!items.length) {
    el.innerHTML = `<h1 class="page">📘 ${U.esc(title)}</h1><div class="card empty">${mode === 'weak' || mode === 'wrong' ? `${U.esc(gradeName(grade))}の苦手・間違えた単語はまだありません。通常テストから始めましょう！` : '出題できる単語がありません。'}<br><a class="btn primary" href="#vocab/start/normal/10/e2j/word/${grade}">通常テスト10問</a></div>`;
    return;
  }
  const qs = items.map(item => makeVocabQuestion(item, format));
  let i = 0;
  const results = [];
  const startedAt = Date.now();

  function render() {
    const q = qs[i];
    const isPhrase = q.item.kind === 'phrase';
    el.innerHTML = `
    <div class="quiz-head"><a href="#vocab" class="back">← 戻る</a><span>${U.esc(title)}</span><span>${i + 1} / ${qs.length}</span></div>
    <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
    <div class="card quiz">
      <div class="qmeta">${gradeBadge(q.item.grade)}<span class="rank r${q.item.imp}">${q.item.imp}</span><span class="pill">${isPhrase ? '熟語' : U.esc(q.item.pos)}</span><span class="pill">${U.esc(q.item.cat)}</span>${(() => { const lv = Coach.weakLevel(Store.wordStat(q.item.id)); return lv ? `<span class="pill weak">${Coach.weakLabel(lv)}</span>` : ''; })()}</div>
      <div class="qword ${q.type === 'e2j' ? 'en' : ''}">${U.esc(q.prompt)}</div>
      <p class="qinst">${q.type === 'e2j' ? '意味として最も適切なものを選んでください。' : q.type === 'j2e' ? 'この意味を表す英語を選んでください。' : 'この意味を表す英語を入力してください。'}</p>
      ${q.type === 'spell'
        ? `<form id="spellForm" class="spell"><input id="spellIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="英語で入力" /><button class="btn primary">回答</button></form><p class="muted small">ヒント：${U.esc(q.item.en[0])}${'＿'.repeat(Math.max(q.item.en.length - 1, 0))}（${q.item.en.length}文字）</p>`
        : `<div class="choices">${q.choices.map((c, k) => `<button type="button" class="choice ${q.type === 'j2e' ? 'en' : ''}" data-k="${k}"><span class="lbl">${U.label(k)}</span>${U.esc(c.text)}</button>`).join('')}</div>`}
      <div id="fb"></div>
    </div>`;
    if (q.type === 'spell') {
      const inp = U.$('#spellIn', el); inp.focus();
      U.$('#spellForm', el).onsubmit = e => { e.preventDefault(); answer(inp.value); };
    } else {
      U.$$('.choice', el).forEach(b => b.onclick = () => answer(+b.dataset.k));
    }
  }

  function answer(k) {
    const q = qs[i];
    if (q.answered) return; q.answered = true;
    let correct, chosen = null;
    if (q.type === 'spell') {
      const norm = s => s.trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ').replace(/[.]$/, '');
      correct = norm(k) === norm(q.item.en);
      U.$('#spellIn', el).disabled = true;
    } else {
      correct = k === q.answer;
      chosen = q.choices[k].item;
      U.$$('.choice', el).forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.answer) b.classList.add('correct');
        else if (idx === k) b.classList.add('wrong');
      });
    }
    const stat = Store.recordWord(q.item.id, correct);
    Sound.answer(correct);
    results.push({ item: q.item, correct });
    const lv = Coach.weakLevel(stat);
    const it = q.item;
    U.$('#fb', el).innerHTML = `
      <div class="feedback ${correct ? 'ok' : 'ng'}">
        <div class="verdict">${correct ? '⭕ 正解' : '❌ 不正解'}</div>
        <div class="ans"><b class="en">${U.esc(it.en)}</b>：${U.esc(it.ja)} <small>（${U.esc(it.pos)}）</small></div>
        <div class="ex"><div class="en">${U.esc(it.ex)} <button type="button" class="icon-btn" data-say="${U.esc(it.ex)}" title="読み上げ">🔊</button></div><div class="ja">${U.esc(it.exJa)}</div></div>
        <div class="exp">💡 「${U.esc(it.en)}」は${U.esc(gradeName(it.grade))}レベルの${U.esc(it.pos)}で「${U.esc(it.ja)}」。重要度${it.imp}・頻出度${U.esc(it.freq)}（${U.esc(it.cat)}）。
          ${!correct && chosen && chosen.id !== it.id ? `<br>あなたが選んだ「${U.esc(q.type === 'e2j' ? chosen.ja : chosen.en)}」は「${U.esc(q.type === 'e2j' ? chosen.en : chosen.ja)}」の意味です。` : ''}
          ${!correct && q.type === 'spell' && k ? `<br>あなたの回答：<span class="en">${U.esc(k)}</span>` : ''}
          ${!correct ? `<br><b class="weak-t">苦手単語に登録しました（間違い${stat.w}回目${lv ? '・' + Coach.weakLabel(lv) : ''}）</b>` : stat.streak >= 3 ? '<br>連続正解中！出題頻度を下げます。' : ''}
        </div>
        <button type="button" class="btn primary block" id="nextBtn">${i + 1 < qs.length ? '次の問題 →' : '結果を見る'}</button>
      </div>`;
    U.$('[data-say]', el).onclick = e => Speech.play(e.currentTarget.dataset.say);
    const nb = U.$('#nextBtn', el); nb.focus();
    nb.onclick = () => { i++; i < qs.length ? render() : finish(); };
  }

  function finish() {
    const c = results.filter(r => r.correct).length;
    Sound.finish(U.pct(c, results.length));
    Store.data.tests.push({ date: U.today(), mode, format, grade, n: results.length, correct: c, sec: Math.round((Date.now() - startedAt) / 1000) });
    Store.save();
    const wrong = results.filter(r => !r.correct);
    el.innerHTML = `
    <h1 class="page">📘 テスト結果 <small class="muted">${U.esc(title)}</small></h1>
    <div class="card result">
      <div class="score">${c} / ${results.length}<small>正答率 ${U.pct(c, results.length)}%</small></div>
      <p>${U.pct(c, results.length) >= 80 ? '素晴らしい！この調子で続けましょう。' : U.pct(c, results.length) >= 60 ? 'あと少し！間違えた単語を復習しましょう。' : '間違えた単語は苦手単語に登録されました。繰り返し復習しましょう。'}</p>
      ${Coach.nextStepHTML('vocab')}
      <div class="btn-row">
        ${wrong.length ? `<a class="btn" href="#vocab/start/wrong/${Math.min(wrong.length, 10)}/${format}/both/${grade}">間違えた単語を復習</a>` : ''}
        <button type="button" class="btn" id="again">同じ設定でもう一度</button>
        <a class="btn" href="#vocab">テスト設定へ</a>
      </div>
    </div>
    <div class="card">
      <h2>出題した単語</h2>
      <ul class="wordlist">${results.map(r => `<li class="${r.correct ? '' : 'ng'}"><span>${r.correct ? '⭕' : '❌'}</span><b class="en">${U.esc(r.item.en)}</b><span>${U.esc(r.item.ja)}</span></li>`).join('')}</ul>
    </div>`;
    U.$('#again', el).onclick = () => vocabRun([mode, n, format, target, grade], el);
  }

  render();
}

function makeVocabQuestion(item, format) {
  const type = format === 'mix' ? ['e2j', 'j2e', 'e2j', 'spell'][Math.floor(Math.random() * 4)] : format;
  const pool = item.kind === 'phrase' ? VOCAB.phrases : VOCAB.words;
  const head = s => s.split(/[、，,・（(／]/)[0];
  // 同じ級・同じ品詞の語を優先して紛らわしい選択肢を作る
  const cand = U.shuffle(pool.filter(x => x.id !== item.id && head(x.ja) !== head(item.ja) && x.en !== item.en));
  const sameGradePos = cand.filter(x => x.grade === item.grade && x.pos === item.pos);
  const sameGrade = cand.filter(x => x.grade === item.grade);
  const distract = [];
  for (const x of sameGradePos.concat(sameGrade, cand)) {
    if (distract.length >= 3) break;
    if (!distract.includes(x) && !distract.some(d => head(d.ja) === head(x.ja))) distract.push(x);
  }
  const opts = U.shuffle([item, ...distract]);
  return {
    item, type,
    prompt: type === 'e2j' ? item.en : item.ja,
    choices: opts.map(o => ({ item: o, text: type === 'e2j' ? o.ja : o.en })),
    answer: opts.indexOf(item)
  };
}

function vocabList(filter, el) {
  const isPhrase = filter === 'phrase', isWeak = filter === 'weak';
  let state = {};
  try { state = JSON.parse(sessionStorage.getItem('vocabList') || '{}'); } catch (e) {}
  const f = Object.assign({ q: '', cat: '', imp: '', flag: '', limit: 100, grade: Store.setting('grade') || CONFIG.defaultGrade }, isWeak ? { grade: 'all' } : state, isWeak ? { flag: 'weak' } : {});
  const base = isPhrase ? VOCAB.phrases : isWeak ? VOCAB.all : VOCAB.words;
  const cats = [...new Set(base.map(x => x.cat))];

  el.innerHTML = `
  <h1 class="page">📘 ${isPhrase ? '熟語・重要表現' : isWeak ? '苦手単語' : '単語一覧'}</h1>
  ${vocabTabs(isPhrase ? 'phrase' : isWeak ? 'weak' : 'list')}
  <div class="card filters">
    <div class="seg wrap" id="lgrade">${GRADE_OPTS.map(([v, n]) => `<button type="button" class="${v === f.grade ? 'on' : ''}" data-v="${v}">${n}</button>`).join('')}</div>
    <input id="q" type="search" placeholder="英語・日本語で検索" value="${U.esc(f.q)}" autocapitalize="off" autocorrect="off">
    <div class="row">
      <select id="cat" aria-label="カテゴリー"><option value="">カテゴリー：すべて</option>${cats.map(c => `<option ${c === f.cat ? 'selected' : ''}>${U.esc(c)}</option>`).join('')}</select>
      <select id="imp" aria-label="重要度"><option value="">重要度：すべて</option>${['S', 'A', 'B', 'C'].map(c => `<option value="${c}" ${c === f.imp ? 'selected' : ''}>${c}ランク</option>`).join('')}</select>
    </div>
    <div class="seg wrap" id="flag">
      ${[['', 'すべて'], ['S', 'Sランク'], ['A', 'Aランク'], ['freq', '頻出'], ['weak', '苦手'], ['new', '未学習']].map(([v, n]) => `<button type="button" class="${v === f.flag ? 'on' : ''}" data-v="${v}">${n}</button>`).join('')}
    </div>
  </div>
  <div id="listOut"></div>`;

  const out = U.$('#listOut', el);
  function draw() {
    if (!isWeak) try { sessionStorage.setItem('vocabList', JSON.stringify(f)); } catch (e) {}
    const q = f.q.trim().toLowerCase();
    let list = base.filter(x => {
      const s = Store.wordStat(x.id);
      if (f.grade !== 'all' && x.grade !== f.grade) return false;
      if (q && !(x.en.toLowerCase().includes(q) || x.ja.includes(q) || x.cat.includes(q))) return false;
      if (f.cat && x.cat !== f.cat) return false;
      if (f.imp && x.imp !== f.imp) return false;
      if (f.flag === 'S' && x.imp !== 'S') return false;
      if (f.flag === 'A' && x.imp !== 'A') return false;
      if (f.flag === 'freq' && x.freq !== '高') return false;
      if (f.flag === 'weak' && !Coach.weakLevel(s)) return false;
      if (f.flag === 'new' && s.lastAsked) return false;
      return true;
    });
    if (f.flag === 'weak') list.sort((a, b) => Store.wordStat(b.id).w - Store.wordStat(a.id).w);
    const total = list.length;
    list = list.slice(0, f.limit);
    out.innerHTML = `<p class="muted small">${U.esc(gradeName(f.grade))}：${total}件${total > f.limit ? `（${f.limit}件表示）` : ''}</p>
    ${f.flag === 'weak' && total ? `<a class="btn primary block" href="#vocab/start/weak/${Math.min(total, 20)}/e2j/both/${f.grade}">苦手単語をテストする（${Math.min(total, 20)}問）</a>` : ''}
    ${total ? '' : `<div class="card empty">${f.flag === 'weak' ? '苦手単語はまだありません。テストで間違えた単語が自動で登録されます。' : '該当する単語がありません。'}</div>`}
    <div class="vlist">${list.map(x => {
      const s = Store.wordStat(x.id), lv = Coach.weakLevel(s);
      return `<details class="vitem"><summary><span class="rank r${x.imp}">${x.imp}</span><b class="en">${U.esc(x.en)}</b><span class="ja">${U.esc(x.ja)}</span>${f.grade === 'all' ? gradeBadge(x.grade) : ''}${lv ? `<span class="pill weak">${Coach.weakLabel(lv)}</span>` : ''}</summary>
        <div class="vbody">
          <div class="meta">${gradeBadge(x.grade)}<span class="pill">${U.esc(x.pos)}</span><span class="pill">${U.esc(x.cat)}</span><span class="pill">頻出度 ${U.esc(x.freq)}</span></div>
          <div class="en">${U.esc(x.ex)} <button type="button" class="icon-btn" data-say="${U.esc(x.ex)}">🔊</button></div><div class="ja">${U.esc(x.exJa)}</div>
          <div class="muted small">正解 ${s.c}回 / 不正解 ${s.w}回 / 最終出題 ${s.lastAsked || '未出題'} / 最終ミス ${s.lastWrong || '—'}</div>
        </div></details>`;
    }).join('')}</div>
    ${total > f.limit ? '<button type="button" class="btn block" id="more">さらに表示</button>' : ''}`;
    U.$$('[data-say]', out).forEach(b => b.onclick = e => { e.preventDefault(); Speech.play(b.dataset.say); });
    const m = U.$('#more', out); if (m) m.onclick = () => { f.limit += 100; draw(); };
  }
  U.$('#q', el).oninput = e => { f.q = e.target.value; f.limit = 100; draw(); };
  U.$('#cat', el).onchange = e => { f.cat = e.target.value; draw(); };
  U.$('#imp', el).onchange = e => { f.imp = e.target.value; draw(); };
  U.$$('#flag button', el).forEach(b => b.onclick = () => { f.flag = b.dataset.v; U.$$('#flag button', el).forEach(x => x.classList.toggle('on', x === b)); draw(); });
  U.$$('#lgrade button', el).forEach(b => b.onclick = () => { f.grade = b.dataset.v; f.limit = 100; U.$$('#lgrade button', el).forEach(x => x.classList.toggle('on', x === b)); draw(); });
  draw();
}
