/* 準1級 リーディング問題（すべてオリジナル。準1級の形式・難易度・テーマを参考に作成）
 * 形式は reading.js と同じ。grade: 'p1' */
READING_DATA.short.push(...[
  { q: 'The new manager was praised for her ability to ( ) complex problems into simple steps that everyone could understand.', choices: ['break down', 'turn down', 'put off', 'give in'], why: 'break down A into B で「AをBに分解する」。複雑な問題を簡単な手順に分けるという文脈に合う。turn down（断る）、put off（延期する）、give in（屈する）は合わない。', ja: '新しい部長は、複雑な問題を誰もが理解できる簡単な手順に分解する能力を称賛された。', words: [['break down', '〜を分解する、故障する'], ['complex', '複雑な']] },
  { q: 'Despite years of research, scientists have been unable to ( ) the exact cause of the disease.', choices: ['pinpoint', 'postpone', 'provoke', 'prosper'], why: '「正確な原因を特定する」は pinpoint。postpone（延期する）、provoke（引き起こす）、prosper（繁栄する）では意味が通らない。', ja: '何年も研究しているにもかかわらず、科学者たちはその病気の正確な原因を特定できていない。', words: [['pinpoint', '〜を正確に特定する'], ['despite', '〜にもかかわらず']] },
  { q: 'The government introduced new measures to ( ) the spread of the virus, including limits on large gatherings.', choices: ['curb', 'boast', 'lure', 'cherish'], why: '感染拡大を「抑制する」は curb。大規模な集まりの制限という具体策からも判断できる。', ja: '政府はウイルスの拡大を抑えるため、大規模な集会の制限を含む新たな対策を導入した。', words: [['curb', '〜を抑制する'], ['measure', '対策、措置']] },
  { q: 'A: Did you finish the report? B: Not yet. I had to ( ) for a colleague who was sick, so I didn\'t have time.', choices: ['fill in', 'drop out', 'stand out', 'run over'], why: 'fill in for A で「Aの代わりを務める」。病気の同僚の代わりに働いたので時間がなかった、という流れ。', ja: 'A：報告書は終わった？ B：まだなんだ。病気の同僚の代わりをしなければならなくて、時間がなかったんだ。', words: [['fill in for', '〜の代わりを務める'], ['colleague', '同僚']] },
  { q: 'The company\'s profits have been ( ) for three years, so the board has decided to change its strategy.', choices: ['stagnant', 'lavish', 'vigorous', 'abundant'], why: '戦略を変える理由なので、利益が「停滞している」stagnant が適切。vigorous（活発な）や abundant（豊富な）では戦略変更の理由にならない。', ja: 'その会社の利益は3年間横ばいなので、取締役会は戦略を変えることにした。', words: [['stagnant', '停滞した'], ['strategy', '戦略']] },
  { q: 'Many residents were ( ) to leave their homes, even though the river was rising quickly.', choices: ['reluctant', 'eligible', 'compatible', 'indispensable'], why: 'even though（〜にもかかわらず）があるので、川の水位が急上昇していても家を離れる「気が進まなかった」reluctant が自然。', ja: '川の水位が急速に上昇していたにもかかわらず、多くの住民は家を離れたがらなかった。', words: [['reluctant', '気が進まない'], ['resident', '住民']] },
  { q: 'The museum\'s new exhibition is expected to ( ) thousands of visitors from overseas.', choices: ['draw', 'deter', 'drain', 'dread'], why: 'draw は「（人を）引きつける」。expected to と visitors から、多くの来館者を集めることが予想されていると判断する。deter（思いとどまらせる）は逆の意味。', ja: 'その博物館の新しい展示は、海外から何千人もの来館者を呼ぶと見込まれている。', words: [['draw', '〜を引きつける'], ['exhibition', '展示会']] },
  { q: 'After the scandal, the politician tried to ( ) himself from the company he had once supported.', choices: ['distance', 'devote', 'disguise', 'dedicate'], why: 'distance oneself from A で「Aと距離を置く」。不祥事の後に関係を断とうとしたという流れ。devote/dedicate oneself to は「〜に専念する」で逆。', ja: '不祥事の後、その政治家はかつて支援していた会社と距離を置こうとした。', words: [['distance oneself from', '〜と距離を置く'], ['scandal', '不祥事']] },
  { q: 'Critics argue that the new law will ( ) freedom of speech by allowing the government to block websites.', choices: ['undermine', 'underline', 'undertake', 'undergo'], why: '政府がサイトを遮断できるようになることで言論の自由を「むしばむ」undermine。underline（強調する）、undertake（引き受ける）、undergo（経験する）。', ja: '批判する人々は、その新法は政府がウェブサイトを遮断できるようにすることで、言論の自由を損なうと主張している。', words: [['undermine', '〜を徐々に損なう'], ['critic', '批判する人、評論家']] },
  { q: 'The professor\'s explanation was so ( ) that even students with no background in physics could follow it.', choices: ['lucid', 'obscure', 'tedious', 'hostile'], why: '物理の知識がない学生でも理解できたのだから、説明は「明快な」lucid。obscure（わかりにくい）は逆。', ja: '教授の説明はとても明快だったので、物理の素養がない学生でも理解できた。', words: [['lucid', '明快な'], ['background', '素養、背景']] },
  { q: 'A: I heard the concert was canceled. B: Yes, the organizers had to ( ) it because of the typhoon.', choices: ['call off', 'call on', 'call for', 'call up'], why: 'call off で「中止する」。call on（訪問する）、call for（要求する）、call up（電話をかける）。', ja: 'A：コンサートが中止になったと聞いたよ。 B：うん、台風のせいで主催者が中止しなければならなかったんだ。', words: [['call off', '〜を中止する'], ['organizer', '主催者']] },
  { q: 'The two companies have been in fierce ( ) for control of the smartphone market for over a decade.', choices: ['rivalry', 'remedy', 'refuge', 'remnant'], why: '市場の支配をめぐる「激しい競争」は fierce rivalry。remedy（治療法）、refuge（避難所）、remnant（残り）は合わない。', ja: 'その2社は10年以上にわたって、スマートフォン市場の支配をめぐって激しく競い合っている。', words: [['rivalry', '競争、対抗'], ['fierce', '激しい']] },
  { q: 'Because of the economic downturn, many young people are struggling to ( ) a living.', choices: ['make', 'take', 'hold', 'keep'], why: 'make a living で「生計を立てる」。決まった言い方として覚える。', ja: '景気の悪化により、多くの若者が生計を立てるのに苦労している。', words: [['make a living', '生計を立てる'], ['downturn', '下降、不況']] },
  { q: 'The doctor warned that the medicine could cause ( ) effects such as dizziness and nausea.', choices: ['adverse', 'adequate', 'abundant', 'authentic'], why: 'めまいや吐き気は「有害な」影響＝副作用。adverse effects で「副作用、悪影響」。', ja: '医者は、その薬はめまいや吐き気などの副作用を引き起こす可能性があると警告した。', words: [['adverse', '有害な、不利な'], ['dizziness', 'めまい']] },
  { q: 'The town has been trying to ( ) its economy by attracting young entrepreneurs.', choices: ['revitalize', 'retaliate', 'reimburse', 'relinquish'], why: '若い起業家を呼び込んで経済を「活性化させる」revitalize。retaliate（報復する）、reimburse（払い戻す）、relinquish（放棄する）。', ja: 'その町は若い起業家を呼び込むことで経済を活性化させようとしている。', words: [['revitalize', '〜を活性化させる'], ['entrepreneur', '起業家']] },
  { q: 'When asked about the accident, the company spokesperson refused to ( ) any details.', choices: ['disclose', 'dispose', 'dispute', 'dismiss'], why: '詳細を「公表する」は disclose。dispose（処分する）、dispute（反論する）、dismiss（退ける）。', ja: '事故について尋ねられると、会社の広報担当者は詳細を明かすことを拒んだ。', words: [['disclose', '〜を公表する、明かす'], ['spokesperson', '広報担当者']] },
  { q: 'The athlete\'s success did not happen overnight; it was the result of years of ( ) training.', choices: ['rigorous', 'trivial', 'tentative', 'fragile'], why: '一夜にして成功したのではなく、長年の「厳しい」練習の成果。rigorous が適切。', ja: 'その選手の成功は一夜にして起きたものではなく、長年の厳しい練習の結果だった。', words: [['rigorous', '厳しい、厳密な'], ['overnight', '一夜にして']] },
  { q: 'A: How is your new job? B: It\'s challenging, but I\'m slowly getting the ( ) of it.', choices: ['hang', 'grip', 'touch', 'point'], why: 'get the hang of A で「Aのこつをつかむ」。', ja: 'A：新しい仕事はどう？ B：大変だけど、少しずつこつをつかんできているよ。', words: [['get the hang of', '〜のこつをつかむ'], ['challenging', 'やりがいのある、難しい']] },
  { q: 'The charity relies heavily on ( ) from the public to fund its programs.', choices: ['donations', 'deductions', 'deviations', 'declarations'], why: '慈善団体が活動資金として頼るのは一般からの「寄付」donations。', ja: 'その慈善団体は、活動資金を一般からの寄付に大きく頼っている。', words: [['donation', '寄付'], ['rely on', '〜に頼る']] },
  { q: 'The plan was rejected because it was not financially ( ); it would have cost far more than the city could afford.', choices: ['feasible', 'fertile', 'flexible', 'frugal'], why: 'セミコロン以下で「市が払える額をはるかに超える」と説明しているので、財政的に「実行可能ではない」。feasible が正解。', ja: 'その計画は財政的に実現可能ではなかったため却下された。市が負担できる額をはるかに超える費用がかかっただろうからだ。', words: [['feasible', '実行可能な'], ['reject', '〜を却下する']] }
].map((q, i) => ({ id: `rp1s${String(i + 1).padStart(2, '0')}`, grade: 'p1', theme: ['仕事', '科学', '健康', '仕事', 'ビジネス', '社会', '文化', '政治・法', '政治・法', '教育', '文化', 'ビジネス', '経済', '健康', '経済', 'ビジネス', '健康', '仕事', '社会', '経済'][i], a: 0, ...q })));

READING_DATA.long.push(
  {
    id: 'rp1l01', grade: 'p1', type: 'long', theme: '環境', title: 'Urban Heat Islands',
    paras: [
      'Cities are often several degrees warmer than the surrounding countryside, a phenomenon known as the urban heat island effect. Buildings, roads, and parking lots absorb heat during the day and release it slowly at night. In addition, cars and air conditioners produce large amounts of waste heat. {1}, residents of large cities face a higher risk of heatstroke during summer, especially elderly people who live alone.',
      'To tackle the problem, some cities have started to use "cool roofs" painted in light colors that reflect sunlight instead of absorbing it. Studies show that these roofs can lower the temperature inside buildings by several degrees, which in turn {2}. Other cities are planting trees along streets and creating rooftop gardens, which provide shade and cool the air through the evaporation of water from leaves.',
      'However, experts caution that such measures alone are not enough. Because heat islands are caused by the way cities are designed, long-term solutions will require changes in city planning, such as {3}. Some urban planners argue that future cities should be built with more open spaces and wind corridors that allow cool air to flow through densely built areas.'
    ],
    qs: [
      { choices: ['As a consequence', 'Nevertheless', 'In contrast', 'Even so'], a: 0, why: '前の文までで「都市が暑くなる原因」を説明し、空所の後で「熱中症のリスクが高い」という結果を述べている。因果関係なので As a consequence（その結果）。' },
      { choices: ['reduces the need for air conditioning', 'increases electricity prices', 'makes buildings more expensive', 'attracts more residents'], a: 0, why: '建物内の温度が下がれば、エアコンの必要性が減る。in turn（その結果として）でつながる自然な結果。' },
      { choices: ['limiting the amount of land covered by concrete', 'building more parking lots downtown', 'encouraging people to drive', 'painting roads in dark colors'], a: 0, why: '原因は熱を吸収する建物・道路なので、コンクリートで覆われる土地を減らすことが長期的な解決策になる。他の選択肢は問題を悪化させる。' }
    ],
    ja: [
      '都市は周辺の田園地帯より数度暑いことが多く、これはヒートアイランド現象として知られている。建物、道路、駐車場は日中に熱を吸収し、夜にゆっくり放出する。加えて、車やエアコンが大量の排熱を出す。その結果、大都市の住民は夏に熱中症になる危険が高く、特に一人暮らしの高齢者はそうである。',
      'この問題に取り組むため、太陽光を吸収する代わりに反射する明るい色に塗られた「クールルーフ」を使い始めた都市もある。研究によると、こうした屋根は建物内の温度を数度下げることができ、それによってエアコンの必要性が減る。街路沿いに木を植えたり屋上庭園を作ったりしている都市もあり、それらは日陰を作り、葉からの水分の蒸発によって空気を冷やす。',
      'しかし専門家は、こうした対策だけでは十分ではないと警告する。ヒートアイランドは都市の設計のされ方によって生じるため、長期的な解決には、コンクリートで覆われた土地の量を制限するなど、都市計画の変更が必要になるだろう。将来の都市は、密集した地域に冷たい空気が流れ込むよう、より多くの空き地や風の通り道を備えて建設すべきだと主張する都市計画家もいる。'
    ],
    words: [['phenomenon', '現象'], ['absorb', '〜を吸収する'], ['heatstroke', '熱中症'], ['reflect', '〜を反射する'], ['evaporation', '蒸発'], ['caution', '〜と警告する'], ['densely', '密集して']],
    phrases: [['in turn', 'その結果として'], ['such as', '〜のような'], ['tackle the problem', '問題に取り組む']]
  },
  {
    id: 'rp1l02', grade: 'p1', type: 'long', theme: '心理・感情', title: 'The Power of Boredom',
    paras: [
      'In today\'s world, people rarely experience boredom. Whenever there is a free moment, many of us reach for our smartphones to check messages or watch videos. While this constant stimulation may seem harmless, some psychologists believe that we are {1}.',
      'Research suggests that boredom can actually encourage creativity. In one well-known study, participants were first asked to do a dull task, such as copying numbers from a phone book. Afterward, they were given a creative challenge and asked to think of as many uses for a plastic cup as possible. Surprisingly, those who had done the boring task {2} than those who had not. The researchers concluded that boredom pushes the mind to wander, which helps people make unexpected connections.',
      'This does not mean that people should seek out boredom all the time. Long periods of it can lead to frustration or even depression. {3}, experts recommend setting aside short periods each day without screens, such as during walks or while commuting, to allow the mind to rest and explore new ideas.'
    ],
    qs: [
      { choices: ['losing something valuable', 'becoming more patient', 'sleeping too much', 'spending less money'], a: 0, why: '次の段落で「退屈は創造性を促す」と退屈の価値を説明している。常に刺激を受けることで「価値あるものを失っている」という流れ。' },
      { choices: ['came up with more ideas', 'gave up more quickly', 'made more mistakes', 'felt more tired'], a: 0, why: '研究者は「退屈が思考をさまよわせ、思いがけない結びつきを生む」と結論づけている。つまり退屈な作業をした人の方が多くのアイデアを出した。' },
      { choices: ['Instead', 'As a result', 'For example', 'Similarly'], a: 0, why: '「いつも退屈を求めるべきではない（長時間は害）」と述べた後、「その代わりに短い時間をとることを勧める」と代案を示しているので Instead。' }
    ],
    ja: [
      '今日の世界では、人々が退屈を経験することはめったにない。少しでも空き時間があると、私たちの多くはメッセージを確認したり動画を見たりするためにスマートフォンに手を伸ばす。この絶え間ない刺激は無害に思えるかもしれないが、私たちは何か価値あるものを失っていると考える心理学者もいる。',
      '研究によると、退屈は実は創造性を促すことがある。ある有名な研究では、参加者はまず電話帳から数字を書き写すなどの退屈な作業をするよう求められた。その後、創造的な課題を与えられ、プラスチックのコップの使い道をできるだけ多く考えるよう求められた。驚いたことに、退屈な作業をした人は、しなかった人よりも多くのアイデアを思いついた。研究者たちは、退屈が心をさまよわせ、それが思いがけない結びつきを生む助けになると結論づけた。',
      'これは、人々が常に退屈を求めるべきだという意味ではない。長時間の退屈はいら立ちや、うつにさえつながることがある。その代わりに専門家は、散歩中や通勤中など、毎日画面を見ない短い時間を設け、心を休ませて新しい考えを探らせることを勧めている。'
    ],
    words: [['boredom', '退屈'], ['stimulation', '刺激'], ['psychologist', '心理学者'], ['participant', '参加者'], ['dull', '退屈な'], ['wander', 'さまよう'], ['depression', 'うつ病']],
    phrases: [['come up with', '〜を思いつく'], ['set aside', '（時間などを）取っておく'], ['seek out', '〜を探し求める']]
  },
  {
    id: 'rp1c01', grade: 'p1', type: 'content', format: 'article', theme: '科学', title: 'Lab-Grown Meat',
    paras: [
      'Lab-grown meat, also called cultivated meat, is produced by taking a small number of cells from a living animal and growing them in a nutrient-rich liquid. Supporters say the technology could transform the food industry. Raising livestock uses vast amounts of land and water and is responsible for a significant share of global greenhouse gas emissions. Producing meat from cells, by contrast, could require far fewer resources and would not involve slaughtering animals.',
      'Despite these potential benefits, the industry faces major obstacles. The most pressing is cost. Although prices have fallen dramatically since the first lab-grown burger was presented in 2013, at a cost of over 300,000 dollars, cultivated meat is still considerably more expensive than conventional meat. Producing it on a large scale requires huge stainless steel tanks called bioreactors, and building enough of them would demand enormous investment.',
      'Consumer acceptance is another uncertainty. Surveys show that many people are curious about lab-grown meat, but a sizable portion say they would be unwilling to eat it, often describing it as "unnatural." Some governments have also responded cautiously. While a few countries have approved its sale, others have proposed banning it, partly to protect traditional farmers whose livelihoods could be threatened.',
      'Researchers emphasize that cultivated meat is unlikely to replace conventional meat entirely in the near future. Instead, many expect it to occupy a niche alongside plant-based alternatives, gradually expanding as costs fall and consumers become more familiar with it.'
    ],
    qs: [
      { q: 'According to supporters, one advantage of lab-grown meat is that it', choices: ['could reduce the environmental impact of producing meat.', 'tastes better than meat from farm animals.', 'can be produced without any special equipment.', 'has already become cheaper than conventional meat.'], a: 0, why: '第1段落：家畜の飼育は大量の土地・水を使い温室効果ガスを多く出すが、細胞からの肉はずっと少ない資源で済む＝環境負荷を減らせる。' },
      { q: 'What is the biggest challenge for the lab-grown meat industry?', choices: ['The high cost of production.', 'A shortage of animal cells.', 'A lack of interest from scientists.', 'Strict rules about stainless steel.'], a: 0, why: '第2段落：The most pressing is cost.（最も差し迫ったのは費用）。' },
      { q: 'Why have some governments proposed banning lab-grown meat?', choices: ['To protect farmers who could lose their jobs.', 'Because it has been proven to be unsafe.', 'Because consumers have no interest in it.', 'To encourage the use of bioreactors.'], a: 0, why: '第3段落：伝統的な農家の生計が脅かされうるので、彼らを守るため。livelihoods could be threatened の言い換え。' },
      { q: 'What do researchers expect to happen in the future?', choices: ['Cultivated meat will gradually grow as a smaller part of the market.', 'Cultivated meat will soon replace all conventional meat.', 'Plant-based foods will disappear from stores.', 'Governments will stop approving new foods.'], a: 0, why: '第4段落：完全に置き換わる可能性は低く、ニッチを占めて徐々に拡大すると予想されている。' }
    ],
    ja: [
      '培養肉とも呼ばれるラボ育ちの肉は、生きた動物から少数の細胞を取り出し、栄養豊富な液体の中で育てることで作られる。支持者は、この技術が食品産業を一変させうると言う。家畜の飼育には膨大な土地と水が使われ、世界の温室効果ガス排出のかなりの割合の原因となっている。対照的に、細胞から肉を作ることははるかに少ない資源で済み、動物を殺す必要もない。',
      'こうした潜在的な利点にもかかわらず、この産業は大きな障害に直面している。最も差し迫っているのは費用だ。2013年に30万ドル以上の費用で初めてラボ育ちのハンバーガーが発表されて以来、価格は劇的に下がったが、培養肉は依然として従来の肉よりかなり高価である。大規模に生産するにはバイオリアクターと呼ばれる巨大なステンレス製タンクが必要で、十分な数を作るには莫大な投資が必要になる。',
      '消費者に受け入れられるかどうかも不確かだ。調査によると、多くの人がラボ育ちの肉に興味を持っているが、かなりの割合の人が食べたくないと答え、しばしば「不自然だ」と表現している。慎重な対応をとる政府もある。販売を承認した国がいくつかある一方で、生計が脅かされうる伝統的な農家を守ることもあって、禁止を提案した国もある。',
      '研究者たちは、培養肉が近い将来に従来の肉に完全に取って代わる可能性は低いと強調する。その代わり、多くの人は、植物由来の代替品と並んで一定の市場を占め、費用が下がり消費者がなじむにつれて徐々に拡大していくと予想している。'
    ],
    words: [['cultivated', '培養された'], ['livestock', '家畜'], ['emission', '排出'], ['slaughter', '〜を食肉処理する'], ['pressing', '差し迫った'], ['conventional', '従来の'], ['livelihood', '生計'], ['niche', 'すき間市場']],
    phrases: [['by contrast', '対照的に'], ['on a large scale', '大規模に'], ['be responsible for', '〜の原因である']]
  },
  {
    id: 'rp1c02', grade: 'p1', type: 'content', format: 'article', theme: '歴史', title: 'The Library of Alexandria',
    paras: [
      'Founded in the third century BC in the Egyptian city of Alexandria, the Great Library is often described as the greatest center of learning in the ancient world. The rulers of Egypt at the time were determined to collect all the knowledge of the known world. According to one famous account, ships arriving in the city\'s harbor were searched for books, which were copied by scholars. The originals were kept by the library, while the owners received the copies.',
      'The library attracted scholars from across the Mediterranean, and it became the site of remarkable intellectual achievements. Scholars working there are credited with producing an accurate estimate of the Earth\'s size and with making advances in geometry and astronomy.',
      'The popular image of the library is of a single dramatic fire that destroyed it, along with countless irreplaceable works. Historians, however, now believe that its decline was gradual. Funding was reduced over several centuries, and political conflicts drove many scholars to leave the city. By the time the library was finally lost, it may have already been a shadow of its former self.'
    ],
    qs: [
      { q: 'What does the passage say about how the library collected books?', choices: ['Books found on ships were copied, and the library kept the originals.', 'Scholars traveled the world to buy books from other libraries.', 'Ship owners were paid to write new books for the library.', 'The rulers of Egypt wrote most of the books themselves.'], a: 0, why: '第1段落：船で見つかった本を学者が写し、原本は図書館が保管し、持ち主は写本を受け取った。' },
      { q: 'What is one achievement associated with the library?', choices: ['A fairly accurate calculation of the size of the Earth.', 'The invention of paper.', 'The first map of the Mediterranean Sea.', 'The construction of the city\'s harbor.'], a: 0, why: '第2段落：地球の大きさの正確な推定を行ったとされる。' },
      { q: 'What do historians now believe about the end of the library?', choices: ['It declined slowly over a long period of time.', 'It was destroyed in a single fire.', 'It was moved to another city by scholars.', 'It became more famous after it lost funding.'], a: 0, why: '第3段落：衰退は徐々に進んだ（its decline was gradual）。一度の大火という一般的なイメージとは異なる。' }
    ],
    ja: [
      '紀元前3世紀にエジプトの都市アレクサンドリアで設立された大図書館は、しばしば古代世界で最大の学問の中心地と言われる。当時のエジプトの統治者たちは、既知の世界のあらゆる知識を集めようと決意していた。ある有名な話によると、市の港に到着した船は本がないか調べられ、見つかった本は学者たちによって写された。原本は図書館が保管し、持ち主には写本が渡された。',
      '図書館は地中海全域から学者を引きつけ、注目すべき知的業績の場となった。そこで研究した学者たちは、地球の大きさの正確な推定を行い、幾何学や天文学を発展させたとされている。',
      '図書館についての一般的なイメージは、数え切れないほどのかけがえのない作品とともにそれを焼き尽くした一度の劇的な火災である。しかし現在、歴史家たちはその衰退は徐々に進んだと考えている。資金は数世紀にわたって削減され、政治的な対立によって多くの学者が都市を去った。図書館が最終的に失われた時には、すでに見る影もなくなっていたのかもしれない。'
    ],
    words: [['scholar', '学者'], ['account', '話、記述'], ['harbor', '港'], ['intellectual', '知的な'], ['geometry', '幾何学'], ['astronomy', '天文学'], ['irreplaceable', 'かけがえのない'], ['decline', '衰退']],
    phrases: [['be determined to', '〜しようと決意している'], ['be credited with', '〜の功績があるとされる'], ['a shadow of one\'s former self', '見る影もない']]
  }
);
