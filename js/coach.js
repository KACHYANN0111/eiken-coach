/* =========================================================
 * 学習コーチ（ローカルロジック）
 * - 単語データの読み込み
 * - 単語の出題アルゴリズム
 * - 苦手分析
 * - 今日のおすすめ / 今日の10分 の進行
 * AI 連携時は ai.js から同じ形式の結果を返せば画面側は変更不要。
 * ========================================================= */
const IMP_W = { S: 4, A: 3, B: 2, C: 1 };
const FREQ_W = { '高': 3, '中': 2, '低': 1 };

function parseVocab(raw, kind, grade) {
  return raw.trim().split('\n').map(line => line.trim()).filter(l => l && !l.startsWith('#')).map(line => {
    const [en, ja, pos, imp, freq, cat, ex, exJa] = line.split('|').map(s => (s || '').trim());
    return { id: (kind === 'phrase' ? 'p:' : 'w:') + en, kind, grade, en, ja, pos, imp, freq, cat, ex, exJa };
  });
}

const GRADE_ORDER = CONFIG.grades.map(g => g.id);
const gradeName = id => (CONFIG.grades.find(g => g.id === id) || {}).name || '全級';

const VOCAB = (() => {
  const byGrade = (parts, kind) => parts
    .slice().sort((a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade))
    .flatMap(p => parseVocab(p.data, kind, p.grade || CONFIG.defaultGrade));
  // 重複除去（同じ見出し語が複数あれば易しい級を採用）
  const uniq = list => { const seen = new Set(); return list.filter(x => !seen.has(x.id) && seen.add(x.id)); };
  const w = uniq(byGrade(WORDS_PARTS, 'word')), p = uniq(byGrade(PHRASE_PARTS, 'phrase'));
  const all = w.concat(p);
  const byId = Object.fromEntries(all.map(x => [x.id, x]));
  const cats = [...new Set(all.map(x => x.cat))];
  const count = (grade, kind) => all.filter(x => (!grade || grade === 'all' || x.grade === grade) && (!kind || x.kind === kind)).length;
  return { words: w, phrases: p, all, byId, cats, count };
})();

const Coach = {
  /* ---------- 苦手度 ----------
   * 1回間違い: 少し出題頻度UP / 2回: 優先 / 3回以上: 最重要の苦手単語
   * 連続正解（streak）が増えると苦手判定から外れていく */
  weakLevel(stat) {
    if (!stat || !stat.w) return 0;
    if (stat.w >= 3 && stat.streak < 3) return 3;
    if (stat.w === 2 && stat.streak < 2) return 2;
    if (stat.w === 1 && stat.streak < 2) return 1;
    return 0;
  },
  weakLabel(level) { return ['', '苦手', '優先復習', '最重要の苦手'][level]; },

  wordScore(item) {
    const s = Store.wordStat(item.id);
    const t = U.today();
    let score = IMP_W[item.imp] * 2.2 + (FREQ_W[item.freq] || 1) * 1.6;
    const lv = this.weakLevel(s);
    score += [0, 3, 6, 10][lv];
    score += Math.min(s.w, 6) * 0.8;
    if (!s.lastAsked) score += 2.5;                       // 未出題は少し優先
    else score += Math.min(U.daysBetween(s.lastAsked, t), 10) * 0.45; // しばらく出ていない
    if (s.lastAsked === t) score -= 6;                   // 今日すでに出題
    if (s.lastCorrect && U.daysBetween(s.lastCorrect, t) <= 2) score -= 3; // 最近正解
    score -= Math.min(s.streak || 0, 5) * 1.4;           // 連続正解で頻度DOWN
    return score + Math.random() * 3;                    // 適度なゆらぎ
  },

  // mode: normal | frequent | important | weak | wrong | random
  pool(mode, target, grade = 'all') {
    let base = target === 'phrase' ? VOCAB.phrases : target === 'word' ? VOCAB.words : VOCAB.all;
    if (grade && grade !== 'all') base = base.filter(x => x.grade === grade);
    const st = id => Store.wordStat(id);
    switch (mode) {
      case 'normal': { const sa = base.filter(x => x.imp === 'S' || x.imp === 'A'); return sa.length >= 10 ? sa : base; }
      case 'frequent': return base.filter(x => x.freq === '高');
      case 'important': return base.filter(x => x.imp === 'S');
      case 'weak': return base.filter(x => this.weakLevel(st(x.id)) > 0);
      case 'wrong': return base.filter(x => st(x.id).w > 0);
      default: return base;
    }
  },

  selectWords(mode, n, target = 'word', grade = 'all') {
    const pool = this.pool(mode, target, grade);
    if (mode === 'random') return U.pick(pool, n);
    // スコア順に選択（同一テスト内で重複なし）
    return pool.map(x => ({ x, s: this.wordScore(x) })).sort((a, b) => b.s - a.s).slice(0, n).map(o => o.x);
  },

  weakWords(kind) {
    return VOCAB.all.filter(x => (!kind || x.kind === kind))
      .map(x => ({ item: x, stat: Store.wordStat(x.id), lv: this.weakLevel(Store.wordStat(x.id)) }))
      .filter(o => o.lv > 0)
      .sort((a, b) => b.lv - a.lv || b.stat.w - a.stat.w);
  },

  /* ---------- 苦手分析 ---------- */
  analyze() {
    const D = Store.data;
    const rate = (c, n) => n ? c / n : null;

    // カテゴリー別の正答率
    const cat = {}, grd = {};
    for (const [id, s] of Object.entries(D.wordStats)) {
      const it = VOCAB.byId[id]; if (!it) continue;
      const k = it.cat; cat[k] = cat[k] || { c: 0, n: 0 };
      cat[k].c += s.c; cat[k].n += s.c + s.w;
      const g = grd[it.grade] = grd[it.grade] || { c: 0, n: 0, words: 0 };
      g.c += s.c; g.n += s.c + s.w; g.words++;
    }
    const grades = CONFIG.grades.map(g => ({ key: g.id, name: g.name, rate: grd[g.id] ? rate(grd[g.id].c, grd[g.id].n) : null, n: grd[g.id] ? grd[g.id].n : 0, words: grd[g.id] ? grd[g.id].words : 0, total: VOCAB.count(g.id) }));
    const weakCats = Object.entries(cat).filter(([, v]) => v.n >= 3)
      .map(([k, v]) => ({ name: k, rate: rate(v.c, v.n), n: v.n })).sort((a, b) => a.rate - b.rate);

    // 問題形式別
    const groupRate = (list, key, names) => {
      const g = {};
      list.forEach(r => { const k = r[key]; g[k] = g[k] || { c: 0, n: 0 }; g[k].n++; if (r.correct) g[k].c++; });
      return Object.entries(g).map(([k, v]) => ({ key: k, name: names[k] || k, rate: rate(v.c, v.n), n: v.n })).sort((a, b) => a.rate - b.rate);
    };
    const readingTypes = groupRate(D.reading, 'type', { short: '短文の語句空所補充', long: '長文の語句空所補充', content: '長文の内容一致' });
    const listeningParts = groupRate(D.listening, 'part', { 1: '第1部 会話の内容一致', 2: '第2部 文の内容一致', 3: '第3部 Real-Life形式', 4: '第4部 インタビュー' });

    // ライティング：自己チェックでチェックされなかった項目
    const miss = {};
    D.writing.forEach(w => (w.checks || []).forEach(c => { if (!c.ok) miss[c.label] = (miss[c.label] || 0) + 1; }));
    const writingIssues = Object.entries(miss).sort((a, b) => b[1] - a[1]).map(([label, n]) => ({ label, n }));

    // 分野ごとの正答率
    let v = { c: 0, n: 0 };
    Object.values(D.days).forEach(d => { v.c += d.vocabCorrect; v.n += d.vocab; });
    const area = {
      vocab: rate(v.c, v.n),
      reading: rate(D.reading.filter(r => r.correct).length, D.reading.length),
      listening: rate(D.listening.filter(r => r.correct).length, D.listening.length)
    };

    return {
      weakWords: this.weakWords('word'),
      weakPhrases: this.weakWords('phrase'),
      weakCats, readingTypes, listeningParts, writingIssues, area, grades
    };
  },

  /* ---------- 今日のおすすめ ---------- */
  recommend() {
    const D = Store.data;
    const a = this.analyze();
    const weakCount = a.weakWords.length + a.weakPhrases.length;
    const steps = [];

    const g = Store.setting('grade');
    steps.push(weakCount >= 5
      ? { kind: 'vocab', label: '苦手単語の復習 10問', route: '#vocab/start/weak/10/mix/both/all', area: 'vocab', reason: `苦手単語が${weakCount}語あります` }
      : { kind: 'vocab', label: `${gradeName(g)}の単語 10問`, route: `#vocab/start/normal/10/mix/word/${g}`, area: 'vocab', reason: '重要・頻出単語を優先して出題' });

    const rt = a.readingTypes.find(t => t.n >= 3 && t.rate < 0.7);
    const readType = rt ? rt.key : ['short', 'long', 'content'][new Date().getDate() % 3];
    const readLabel = { short: '短文の語句空所補充 5問', long: '長文の語句空所補充 1題', content: '長文の内容一致 1題' }[readType];
    steps.push({ kind: 'reading', label: `${examOf().name}リーディング：` + readLabel, route: '#reading/' + readType + '/auto', area: 'reading', reason: rt ? `正答率${Math.round(rt.rate * 100)}%の苦手形式` : '形式をローテーション' });

    const EX = examOf(), parts = EX.first.listening.map(p => String(p.part));
    const lp = a.listeningParts.find(t => t.n >= 3 && t.rate < 0.7 && parts.includes(String(t.key)));
    const part = lp ? lp.key : parts[new Date().getDate() % parts.length];
    steps.push({ kind: 'listening', label: `${EX.name}リスニング 5問（第${part}部）`, route: `#listening/run/${part}/5`, area: 'listening', reason: lp ? `正答率${Math.round(lp.rate * 100)}%の苦手パート` : 'リスニング力を毎日キープ' });

    const week = U.addDays(U.today(), -7);
    const recent = D.writing.filter(w => w.date >= week);
    const sumN = recent.filter(w => w.type === 'summary').length, opN = recent.filter(w => w.type === 'opinion').length;
    steps.push(sumN <= opN
      ? { kind: 'writing', label: `${examOf().name}英文要約 1問`, route: '#writing/summary/auto', area: 'writing', reason: `今週の要約練習 ${sumN}回` }
      : { kind: 'writing', label: `${examOf().name}意見論述 1問`, route: '#writing/opinion/auto', area: 'writing', reason: `今週の意見論述 ${opN}回` });

    const lastSp = D.speaking.length ? D.speaking[D.speaking.length - 1].date : null;
    if (!lastSp || U.daysBetween(lastSp, U.today()) >= 3) {
      steps.push({ kind: 'speaking', label: `${examOf().name}二次試験 面接1セット`, route: '#speaking/auto', area: 'speaking', reason: lastSp ? '3日以上スピーキング練習なし' : 'まだ面接練習をしていません' });
    }

    // 苦手分野（正答率の低い分野）を先頭へ。単語は常に最初の方に置く
    const r = k => a.area[k] == null ? 0.75 : a.area[k];
    const ordered = steps.slice(1, 3).sort((x, y) => r(x.area) - r(y.area));
    return [steps[0], ...ordered, ...steps.slice(3)];
  },

  /* ---------- 今日の10分 ---------- */
  startPlan() {
    const steps = this.recommend().map(s => ({ ...s, done: false }));
    Store.data.plan = { date: U.today(), steps };
    Store.save();
    App.go(steps[0].route);
  },
  plan() {
    const p = Store.data.plan;
    return p && p.date === U.today() ? p : null;
  },
  completeStep(kind) {
    const p = this.plan(); if (!p) return;
    const s = p.steps.find(x => x.kind === kind && !x.done);
    if (s) { s.done = true; Store.save(); }
  },
  nextStepHTML(kind) {
    this.completeStep(kind);
    const p = this.plan(); if (!p) return '';
    const next = p.steps.find(x => !x.done);
    const done = p.steps.filter(x => x.done).length;
    if (!next) return `<div class="plan-next done">🎉 今日のおすすめ学習をすべて完了しました！（${done}/${p.steps.length}）<a class="btn" href="#home">ホームへ</a></div>`;
    return `<div class="plan-next"><div><small>今日の10分 ${done}/${p.steps.length} 完了</small><br>次のおすすめ：<b>${U.esc(next.label)}</b></div><a class="btn primary" href="${next.route}">次へ進む →</a></div>`;
  }
};

/* 4択の選択肢を起動時にシャッフル（データは正解を先頭に書いているため） */
(function shuffleChoices() {
  const mix = q => {
    const order = U.shuffle(q.choices.map((_, i) => i));
    q.choices = order.map(i => q.choices[i]);
    q.a = order.indexOf(q.a);
  };
  READING_DATA.short.forEach(mix);
  READING_DATA.long.forEach(p => p.qs.forEach(mix));
  LISTENING_DATA.forEach(mix);
})();

/* ---------- 級の切り替え（リーディング・リスニング・ライティング・スピーキング共通） ---------- */
const gOf = x => (x && x.grade) || CONFIG.defaultGrade;
const ofGrade = (list, g = examGradeId()) => list.filter(x => gOf(x) === g);
function examTabsHTML() {
  const cur = examGradeId();
  return `<div class="grade-grid exam-tabs">${CONFIG.examGradeIds.map(id => `<button type="button" class="grade-tile g-${id} ${id === cur ? 'on' : ''}" data-exam="${id}"><b>${CONFIG.exams[id].name}</b><small>${CONFIG.exams[id].level}</small></button>`).join('')}</div>`;
}
function bindExamTabs(el, rerender) {
  U.$$('[data-exam]', el).forEach(b => b.onclick = () => { Store.setSetting('examGrade', b.dataset.exam); rerender(); });
}
