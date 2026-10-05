/* =========================================================
 * 試験形式・アプリ設定
 * 英検公式サイト（https://www.eiken.or.jp/eiken/exam/grade_2/）の
 * 情報をもとに設定。形式が変わった場合はここだけ修正する。
 * 最終確認日: 2026-10-03
 * ========================================================= */
const CONFIG = {
  appName: '英検2級 AI学習コーチ',
  subtitle: '毎日の10分で、英検2級合格に必要な力を伸ばす',
  storageKey: 'eiken2coach.v1',
  // スマホアプリ版（PWA）の公開URL（末尾 / 付き）。未公開なら空文字
  appUrl: 'https://kachyann0111.github.io/eiken-coach/',
  checkedAt: '2026-10-03',

  exam: {
    level: '高校卒業程度',
    first: {
      readingWritingMinutes: 85,
      listeningMinutes: 25,
      reading: [
        { id: 'short', no: '大問1', name: '短文の語句空所補充', count: 17, note: '単語10問程度＋熟語。4択' },
        { id: 'long', no: '大問2', name: '長文の語句空所補充', count: 6, note: '長文2題×3問。4択' },
        { id: 'content', no: '大問3', name: '長文の内容一致選択', count: 8, note: 'Eメール＋説明文。4択' }
      ],
      writing: [
        { id: 'summary', no: '大問4', name: '英文要約', count: 1, note: '約150語の英文を要約' },
        { id: 'opinion', no: '大問5', name: '意見論述（英作文）', count: 1, note: 'TOPICに対する意見と理由2つ' }
      ],
      listening: [
        { id: 'part1', no: '第1部', name: '会話の内容一致選択', count: 15, note: '放送は1回' },
        { id: 'part2', no: '第2部', name: '文の内容一致選択', count: 15, note: '放送は1回' }
      ]
    },
    second: {
      minutes: 7,
      parts: [
        { id: 'read', name: '音読', note: '60語程度のパッセージを音読（20秒の黙読後）' },
        { id: 'q1', name: 'No.1 パッセージについての質問', note: '本文の内容を答える' },
        { id: 'q2', name: 'No.2 3コマのイラスト展開説明', note: '20秒準備。指定の文で話し始める' },
        { id: 'q3', name: 'No.3 受験者自身の意見', note: 'パッセージに関連するテーマ' },
        { id: 'q4', name: 'No.4 日常生活に関する意見', note: 'Yes/No ＋ 理由' }
      ]
    }
  },

  // 単語の級（英検公式のレベル目安）。並び順＝易しい順
  grades: [
    { id: 'p2', name: '準2級', level: '高校中級程度' },
    { id: '2', name: '2級', level: '高校卒業程度' },
    { id: 'p1', name: '準1級', level: '大学中級程度' },
    { id: '1', name: '1級', level: '大学上級程度' }
  ],
  defaultGrade: '2',

  // 語数制限（公式形式が変わった場合はここを変更）
  wordLimits: {
    summary: { min: 45, max: 55 },
    opinion: { min: 80, max: 100 }
  },

  // 英検公式リンク（過去問は転載せず、リンクのみ）
  official: {
    grade2: 'https://www.eiken.or.jp/eiken/exam/grade_2/',
    pastExams: 'https://www.eiken.or.jp/eiken/exam/grade_2/solutions.html',
    renewal: 'https://www.eiken.or.jp/eiken/2024renewal/',
    virtualSecond: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_2/',
    secondSample: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_2/pdf/grade_2.pdf',
    // 2026-10-03時点で公式に公開されていた回（公開回は入れ替わるため、リンク切れの場合は pastExams を参照）
    editions: [
      { label: '2026年度 第1回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji-2kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202601F2kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji_2kyuscript.pdf', audio1: 'https://media.eiken.or.jp/listening/grade_2/2026_01/2Q-part1.mp3', audio2: 'https://media.eiken.or.jp/listening/grade_2/2026_01/2Q-part2.mp3' },
      { label: '2025年度 第3回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-2kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202503F2kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-2kyuscript.pdf', audio1: 'https://media.eiken.or.jp/listening/grade_2/2025-30/2Q-part1.mp3', audio2: 'https://media.eiken.or.jp/listening/grade_2/2025-30/2Q-part2.mp3' },
      { label: '2025年度 第2回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-2kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202502F2kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-2kyu_script.pdf', audio1: 'https://media.eiken.or.jp/listening/grade_2/2025-2/2Q-part1.mp3', audio2: 'https://media.eiken.or.jp/listening/grade_2/2025-2/2Q-part2.mp3' }
    ]
  },

  // 将来のAI API連携設定（今回は未使用。provider を 'local' 以外にすると ai.js の remote 実装へ切替）
  ai: {
    provider: 'local',
    endpoint: '',
    model: ''
  }
};
