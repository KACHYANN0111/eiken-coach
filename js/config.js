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
  checkedAt: '2026-10-07',

  // 単語の級（英検公式のレベル目安）。並び順＝易しい順
  grades: [
    { id: 'p2', name: '準2級', level: '高校中級程度' },
    { id: '2', name: '2級', level: '高校卒業程度' },
    { id: 'p1', name: '準1級', level: '大学中級程度' },
    { id: '1', name: '1級', level: '大学上級程度' }
  ],
  defaultGrade: '2',

  // 級ごとの試験形式（英検公式サイトで 2026-10-07 確認。形式が変わった場合はここを修正）
  // ※ リスニング各部の問題数と英作文の語数は公式ページから自動取得できなかったため、
  //   2024年度リニューアル後の形式として一般に案内されている値。公式情報を優先すること。
  exams: {
    '2': {
      name: '2級', level: '高校卒業程度',
      first: {
        readingWritingMinutes: 85, listeningMinutes: 25,
        reading: [
          { id: 'short', no: '大問1', name: '短文の語句空所補充', count: 17, note: '単語＋熟語。4択' },
          { id: 'long', no: '大問2', name: '長文の語句空所補充', count: 6, note: '長文2題×3問。4択' },
          { id: 'content', no: '大問3', name: '長文の内容一致選択', count: 8, note: 'Eメール＋説明文。4択' }
        ],
        writing: [
          { id: 'summary', no: '大問4', name: '英文要約', count: 1, note: '約150語の英文を要約' },
          { id: 'opinion', no: '大問5', name: '意見論述（英作文）', count: 1, note: 'TOPICに対する意見と理由2つ' }
        ],
        listening: [
          { part: 1, no: '第1部', name: '会話の内容一致選択', count: 15, note: '放送は1回' },
          { part: 2, no: '第2部', name: '文の内容一致選択', count: 15, note: '放送は1回' }
        ]
      },
      wordLimits: { summary: { min: 45, max: 55 }, opinion: { min: 80, max: 100 } },
      second: {
        minutes: 7,
        parts: [
          { id: 'read', name: '音読', note: '60語程度のパッセージを音読（20秒の黙読後）' },
          { id: 'q1', name: 'No.1 パッセージについての質問', note: '本文の内容を答える' },
          { id: 'q2', name: 'No.2 3コマのイラスト展開説明', note: '20秒準備。指定の文で話し始める' },
          { id: 'q3', name: 'No.3 受験者自身の意見', note: 'パッセージに関連するテーマ' },
          { id: 'q4', name: 'No.4 日常生活に関する意見', note: 'Yes/No ＋ 理由' }
        ]
      },
      official: {
        grade: 'https://www.eiken.or.jp/eiken/exam/grade_2/',
        pastExams: 'https://www.eiken.or.jp/eiken/exam/grade_2/solutions.html',
        virtualSecond: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_2/',
        secondSample: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_2/pdf/grade_2.pdf',
        editions: [
          { label: '2026年度 第1回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji-2kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202601F2kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji_2kyuscript.pdf', audio: ['https://media.eiken.or.jp/listening/grade_2/2026_01/2Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_2/2026_01/2Q-part2.mp3'] },
          { label: '2025年度 第3回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-2kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202503F2kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-2kyuscript.pdf', audio: ['https://media.eiken.or.jp/listening/grade_2/2025-30/2Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_2/2025-30/2Q-part2.mp3'] },
          { label: '2025年度 第2回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-2kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202502F2kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-2kyu_script.pdf', audio: ['https://media.eiken.or.jp/listening/grade_2/2025-2/2Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_2/2025-2/2Q-part2.mp3'] }
        ]
      }
    },
    'p1': {
      name: '準1級', level: '大学中級程度',
      first: {
        readingWritingMinutes: 90, listeningMinutes: 30,
        reading: [
          { id: 'short', no: '大問1', name: '短文の語句空所補充', count: 18, note: '単語＋句動詞。4択' },
          { id: 'long', no: '大問2', name: '長文の語句空所補充', count: 6, note: '長文2題×3問。4択' },
          { id: 'content', no: '大問3', name: '長文の内容一致選択', count: 7, note: '長文2題（3問＋4問）。4択' }
        ],
        writing: [
          { id: 'summary', no: '大問4', name: '英文要約', count: 1, note: '約200語の英文を要約' },
          { id: 'opinion', no: '大問5', name: '意見論述（英作文）', count: 1, note: 'TOPIC＋POINTSから理由2つ' }
        ],
        listening: [
          { part: 1, no: '第1部', name: '会話の内容一致選択', count: 12, note: '放送は1回' },
          { part: 2, no: '第2部', name: '文の内容一致選択', count: 12, note: 'パッセージ6題×2問。放送は1回' },
          { part: 3, no: '第3部', name: 'Real-Life形式の内容一致選択', count: 5, note: '状況と質問を読んでからアナウンス等を聞く' }
        ]
      },
      wordLimits: { summary: { min: 60, max: 70 }, opinion: { min: 120, max: 150 } },
      second: {
        minutes: 8,
        parts: [
          { id: 'narration', name: 'ナレーション', note: '4コマのイラストの展開を説明（1分考えて2分で話す）' },
          { id: 'q1', name: 'No.1 イラストに関連した質問', note: '登場人物の立場で考えを述べる' },
          { id: 'q2', name: 'No.2 カードのトピックに関連した質問', note: '意見＋理由' },
          { id: 'q3', name: 'No.3 カードのトピックに関連した質問', note: '意見＋理由' },
          { id: 'q4', name: 'No.4 社会性のある質問', note: 'トピックにやや関連した社会問題' }
        ]
      },
      official: {
        grade: 'https://www.eiken.or.jp/eiken/exam/grade_p1/',
        pastExams: 'https://www.eiken.or.jp/eiken/exam/grade_p1/solutions.html',
        virtualSecond: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_p1/',
        secondSample: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_p1/pdf/grade_p1.pdf',
        editions: [
        { label: '2026年度 第1回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji-p1kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202601Fp1kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji_p1kyuscript.pdf', audio: ['https://media.eiken.or.jp/listening/grade_p1/2026_01/P1Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_p1/2026_01/P1Q-part2.mp3', 'https://media.eiken.or.jp/listening/grade_p1/2026_01/P1Q-part3.mp3'] },
        { label: '2025年度 第3回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-p1kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202503Fp1kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-p1kyuscript.pdf', audio: ['https://media.eiken.or.jp/listening/grade_p1/2025-30/P1Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_p1/2025-30/P1Q-part2.mp3', 'https://media.eiken.or.jp/listening/grade_p1/2025-30/P1Q-part3.mp3'] },
        { label: '2025年度 第2回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-p1kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202502Fp1kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-p1kyu_script.pdf', audio: ['https://media.eiken.or.jp/listening/grade_p1/2025-2/P1Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_p1/2025-2/P1Q-part2.mp3', 'https://media.eiken.or.jp/listening/grade_p1/2025-2/P1Q-part3.mp3'] }
        ]
      }
    },
    '1': {
      name: '1級', level: '大学上級程度',
      first: {
        readingWritingMinutes: 100, listeningMinutes: 35,
        reading: [
          { id: 'short', no: '大問1', name: '短文の語句空所補充', count: 22, note: '高度な単語＋句動詞。4択' },
          { id: 'long', no: '大問2', name: '長文の語句空所補充', count: 6, note: '長文2題×3問。4択' },
          { id: 'content', no: '大問3', name: '長文の内容一致選択', count: 7, note: '長文2題（3問＋4問）。4択' }
        ],
        writing: [
          { id: 'summary', no: '大問4', name: '英文要約', count: 1, note: '約300語の英文を要約' },
          { id: 'opinion', no: '大問5', name: '意見論述（英作文）', count: 1, note: 'TOPICについて序論・本論（理由3つ程度）・結論のエッセイ' }
        ],
        listening: [
          { part: 1, no: '第1部', name: '会話の内容一致選択', count: 10, note: '放送は1回' },
          { part: 2, no: '第2部', name: '文の内容一致選択', count: 10, note: 'パッセージ5題×2問。放送は1回' },
          { part: 3, no: '第3部', name: 'Real-Life形式の内容一致選択', count: 5, note: '状況と質問を読んでから聞く' },
          { part: 4, no: '第4部', name: 'インタビューの内容一致選択', count: 2, note: '専門家などへのインタビュー' }
        ]
      },
      wordLimits: { summary: { min: 90, max: 110 }, opinion: { min: 200, max: 240 } },
      second: {
        minutes: 10,
        parts: [
          { id: 'speech', name: 'スピーチ', note: '5つのトピックから1つを選び、1分考えて2分間スピーチ' },
          { id: 'qa', name: 'Q&A', note: 'スピーチの内容やトピックに関連した質問に答える（約4分）' }
        ]
      },
      official: {
        grade: 'https://www.eiken.or.jp/eiken/exam/grade_1/',
        pastExams: 'https://www.eiken.or.jp/eiken/exam/grade_1/solutions.html',
        virtualSecond: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_1/',
        secondSample: 'https://www.eiken.or.jp/eiken/exam/virtual/grade_1/pdf/grade_1.pdf',
        editions: [
        { label: '2026年度 第1回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji-1kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202601F1kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2026-1-1ji_1kyuscript.pdf', audio: ['https://media.eiken.or.jp/listening/grade_1/2026_01/1Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_1/2026_01/1Q-part2.mp3', 'https://media.eiken.or.jp/listening/grade_1/2026_01/1Q-part3.mp3', 'https://media.eiken.or.jp/listening/grade_1/2026_01/1Q-part4.mp3'] },
        { label: '2025年度 第3回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-1kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202503F1kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-1kyuscript.pdf', audio: ['https://media.eiken.or.jp/listening/grade_1/2025-30/1Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_1/2025-30/1Q-part2.mp3', 'https://media.eiken.or.jp/listening/grade_1/2025-30/1Q-part3.mp3', 'https://media.eiken.or.jp/listening/grade_1/2025-30/1Q-part4.mp3'] },
        { label: '2025年度 第2回', booklet: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-1kyu.pdf', answer: 'https://www.eiken.or.jp/eiken/result/pdf/202502F1kyu.pdf', script: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-2-1ji-1kyu_script.pdf', audio: ['https://media.eiken.or.jp/listening/grade_1/2025-2/1Q-part1.mp3', 'https://media.eiken.or.jp/listening/grade_1/2025-2/1Q-part2.mp3', 'https://media.eiken.or.jp/listening/grade_1/2025-2/1Q-part3.mp3', 'https://media.eiken.or.jp/listening/grade_1/2025-2/1Q-part4.mp3'] }
        ]
      }
    }
  },
  examGradeIds: ['2', 'p1', '1'],

  // 将来のAI API連携設定（今回は未使用。provider を 'local' 以外にすると ai.js の remote 実装へ切替）
  ai: {
    provider: 'local',
    endpoint: '',
    model: ''
  }
};
CONFIG.official = { renewal: 'https://www.eiken.or.jp/eiken/2024renewal/' };

/* 学習中の級（単語以外の分野で使う。2級・準1級・1級） */
function examGradeId() {
  const g = typeof Store !== 'undefined' ? Store.setting('examGrade') : null;
  return CONFIG.exams[g] ? g : CONFIG.defaultGrade;
}
function examOf(g) { return CONFIG.exams[g || examGradeId()]; }
