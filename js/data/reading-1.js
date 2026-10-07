/* 1級 リーディング問題（すべてオリジナル。1級の形式・難易度・テーマを参考に作成）
 * 形式は reading.js と同じ。grade: '1' */
READING_DATA.short.push(...[
  { q: 'The scientist\'s claims were quickly ( ) by other researchers, who were unable to reproduce any of her results.', choices: ['debunked', 'bolstered', 'endorsed', 'emulated'], why: '他の研究者が結果を再現できなかったのだから、主張は「誤りを暴かれた」debunked。bolstered（強化された）や endorsed（支持された）は逆。', ja: 'その科学者の主張は他の研究者たちによってすぐに誤りだと暴かれた。彼らは彼女の結果をまったく再現できなかったのだ。', words: [['debunk', '〜の誤りを暴く'], ['reproduce', '〜を再現する']] },
  { q: 'Years of drought have ( ) the region\'s food shortage, leaving millions in need of aid.', choices: ['exacerbated', 'alleviated', 'abated', 'placated'], why: '干ばつが食糧不足を「悪化させた」結果、何百万人が援助を必要としている。exacerbate が正解。alleviate（緩和する）は逆。', ja: '何年も続く干ばつがその地域の食糧不足を悪化させ、何百万人もが援助を必要としている。', words: [['exacerbate', '〜を悪化させる'], ['aid', '援助']] },
  { q: 'Although the CEO tried to appear ( ) during the press conference, his trembling hands revealed how nervous he was.', choices: ['nonchalant', 'belligerent', 'despondent', 'gregarious'], why: 'Although があるので「緊張していた」と対照的な「平然とした」nonchalant が入る。', ja: '最高経営責任者は記者会見で平然としているように見せようとしたが、震える手が彼の緊張ぶりを表していた。', words: [['nonchalant', '平然とした、無頓着な'], ['tremble', '震える']] },
  { q: 'The new regulations are designed to ( ) companies from dumping toxic waste into rivers.', choices: ['deter', 'exhort', 'induce', 'compel'], why: 'deter A from doing で「Aに〜するのを思いとどまらせる」。from を取る点からも判断できる。', ja: '新しい規制は、企業が有毒廃棄物を川に投棄するのを抑止するよう作られている。', words: [['deter', '〜を思いとどまらせる'], ['dump', '〜を投棄する']] },
  { q: 'Negotiations between the two sides reached an ( ) after neither was willing to compromise on the issue of land rights.', choices: ['impasse', 'epiphany', 'accolade', 'antidote'], why: 'どちらも妥協しなかったので交渉は「行き詰まり」に達した。reach an impasse で「行き詰まる」。', ja: 'どちらも土地の権利の問題で妥協しようとしなかったため、両者の交渉は行き詰まった。', words: [['impasse', '行き詰まり'], ['compromise', '妥協する']] },
  { q: 'Despite her ( ) appearance at the start of her career, the actress went on to become one of the most celebrated performers of her generation.', choices: ['inauspicious', 'illustrious', 'exuberant', 'magnanimous'], why: 'Despite（〜にもかかわらず）の後なので、後半の「最も称賛される俳優になった」と対照的な「幸先の悪い」inauspicious が入る。', ja: 'キャリアの初めはぱっとしない出だしだったにもかかわらず、その女優は同世代で最も称賛される俳優の一人になった。', words: [['inauspicious', '幸先の悪い'], ['celebrated', '有名な、称賛された']] },
  { q: 'The professor was known for his ( ) lectures, which often ran far beyond the scheduled time and wandered off topic.', choices: ['verbose', 'succinct', 'cogent', 'lucid'], why: '予定時間を大幅に超え、話がそれる講義は「冗長な」verbose。succinct（簡潔な）は逆。', ja: 'その教授は冗長な講義で知られており、講義はしばしば予定時間を大幅に超え、話題からそれた。', words: [['verbose', '冗長な'], ['wander off', '（話が）それる']] },
  { q: 'Investors grew increasingly ( ) about the company\'s future after it reported its third consecutive quarterly loss.', choices: ['apprehensive', 'complacent', 'sanguine', 'jubilant'], why: '3四半期連続の赤字を受けて投資家は「不安になった」apprehensive。sanguine（楽観的な）や complacent（油断した）は合わない。', ja: '3四半期連続の赤字を報告した後、投資家たちはその会社の将来についてますます不安を募らせた。', words: [['apprehensive', '不安な'], ['consecutive', '連続した']] },
  { q: 'The detective was determined to ( ) the truth, no matter how long the investigation took.', choices: ['ferret out', 'stave off', 'fizzle out', 'gloss over'], why: 'ferret out で「（真実などを）探り出す」。stave off（食い止める）、fizzle out（立ち消えになる）、gloss over（ごまかす）は合わない。', ja: 'その刑事は、捜査にどれだけ時間がかかろうとも真実を突き止めようと決意していた。', words: [['ferret out', '〜を探り出す'], ['investigation', '捜査']] },
  { q: 'The company tried to ( ) the scandal by announcing a new product on the same day, hoping the media would focus elsewhere.', choices: ['downplay', 'galvanize', 'corroborate', 'reiterate'], why: '同じ日に新製品を発表してメディアの注目をそらそうとしたので、不祥事を「軽く見せる」downplay。', ja: 'その会社は、メディアが他のことに注目するのを期待して同じ日に新製品を発表することで、不祥事を目立たなくしようとした。', words: [['downplay', '〜を軽く扱う、目立たなくする'], ['scandal', '不祥事']] },
  { q: 'Critics say the government\'s response to the crisis has been ( ), arriving far too late to make a real difference.', choices: ['belated', 'premature', 'impetuous', 'meticulous'], why: '「遅すぎて実質的な違いを生まない」と説明されているので「遅きに失した」belated。premature（早すぎる）は逆。', ja: '批評家たちは、危機への政府の対応は遅きに失し、本当の違いを生むには遅すぎたと言っている。', words: [['belated', '遅すぎた'], ['make a difference', '違いを生む']] },
  { q: 'Many of the town\'s historic buildings had fallen into ( ) after decades of neglect.', choices: ['disrepair', 'disarray', 'disrepute', 'discretion'], why: '何十年も放置されて建物が「荒廃した」状態は fall into disrepair。disrepute（悪評）、disarray（混乱）、discretion（思慮分別）は建物の状態には使わない。', ja: 'その町の歴史的建造物の多くは、何十年も放置された後、荒れ果てていた。', words: [['disrepair', '荒廃、破損'], ['neglect', '放置']] },
  { q: 'The tech giant has been accused of trying to ( ) smaller competitors by copying their products and selling them at lower prices.', choices: ['stifle', 'bolster', 'appease', 'exonerate'], why: '製品を真似て安く売ることで小さな競合を「抑えつける」stifle。bolster（支える）や appease（なだめる）は合わない。', ja: 'その巨大IT企業は、製品を模倣して安値で売ることで小さな競合他社を押さえつけようとしたと非難されている。', words: [['stifle', '〜を抑えつける'], ['competitor', '競合他社']] },
  { q: 'A: Did the board approve your proposal? B: Not exactly. They said they would ( ) it over before making a final decision.', choices: ['mull', 'brush', 'peter', 'bog'], why: 'mull over で「じっくり考える」。brush off（はねつける）、peter out（次第に消える）、bog down（停滞させる）は over とは結びつかない。', ja: 'A：取締役会はあなたの提案を承認したの？ B：そうとも言えない。最終決定の前にじっくり検討すると言っていたよ。', words: [['mull over', '〜をじっくり考える'], ['proposal', '提案']] },
  { q: 'The documentary offers a ( ) look at the lives of factory workers, showing the harsh conditions they endure without exaggeration.', choices: ['candid', 'cryptic', 'facetious', 'grandiose'], why: '誇張せずに過酷な状況を見せるのだから「率直な、ありのままの」candid。', ja: 'そのドキュメンタリーは工場労働者の生活をありのままに描き、彼らが耐えている過酷な状況を誇張なく見せている。', words: [['candid', '率直な、ありのままの'], ['exaggeration', '誇張']] },
  { q: 'After the merger, thousands of employees were laid off in a ( ) effort to cut costs.', choices: ['ruthless', 'benevolent', 'tentative', 'perfunctory'], why: '何千人も解雇してコストを削減する「冷酷な」取り組み＝ ruthless。', ja: '合併の後、コスト削減のための容赦ない取り組みとして何千人もの従業員が解雇された。', words: [['ruthless', '冷酷な、容赦ない'], ['lay off', '〜を解雇する']] },
  { q: 'Scientists warn that if current trends continue, many coral reefs could be ( ) within a few decades.', choices: ['obliterated', 'replenished', 'rejuvenated', 'consolidated'], why: '現在の傾向が続けばサンゴ礁が「消滅させられる」という警告。obliterate が適切。replenish（補充する）、rejuvenate（若返らせる）は逆。', ja: '科学者たちは、現在の傾向が続けば、多くのサンゴ礁が数十年以内に消滅しかねないと警告している。', words: [['obliterate', '〜を完全に破壊する'], ['coral reef', 'サンゴ礁']] },
  { q: 'The senator\'s speech was full of ( ) promises that few voters believed could actually be fulfilled.', choices: ['grandiose', 'pragmatic', 'modest', 'tangible'], why: '有権者のほとんどが実現できると信じなかったのだから、「大げさな、壮大すぎる」grandiose。pragmatic（現実的な）、tangible（具体的な）は逆。', ja: 'その上院議員の演説は、実現できると信じる有権者がほとんどいないような大げさな約束であふれていた。', words: [['grandiose', '大げさな、壮大すぎる'], ['fulfill', '〜を果たす']] },
  { q: 'Although the evidence against him was largely ( ), the jury found him guilty.', choices: ['circumstantial', 'conclusive', 'irrefutable', 'compelling'], why: 'Although があるので、有罪にするには弱い「状況的な」証拠 circumstantial が入る。conclusive（決定的な）などでは逆接にならない。', ja: '彼に不利な証拠はほとんどが状況証拠だったが、陪審は彼を有罪とした。', words: [['circumstantial', '状況的な'], ['jury', '陪審']] },
  { q: 'The city council\'s decision to cut library funding ( ) a storm of protest from residents.', choices: ['sparked', 'quelled', 'stymied', 'forestalled'], why: 'spark a storm of protest で「抗議の嵐を巻き起こす」。quell（鎮める）、forestall（未然に防ぐ）は逆。', ja: '図書館の予算を削減するという市議会の決定は、住民から抗議の嵐を巻き起こした。', words: [['spark', '〜を引き起こす'], ['council', '議会']] }
].map((q, i) => ({ id: `r1s${String(i + 1).padStart(2, '0')}`, grade: '1', theme: ['科学', '社会', 'ビジネス', '環境', '政治・法', '文化', '教育', '経済', '社会', 'ビジネス', '政治・法', '歴史', 'ビジネス', 'ビジネス', '文化', 'ビジネス', '環境', '政治・法', '政治・法', '社会'][i], a: 0, ...q })));

READING_DATA.long.push(
  {
    id: 'r1l01', grade: '1', type: 'long', theme: '科学', title: 'The Placebo Paradox',
    paras: [
      'The placebo effect, in which patients experience real improvements after receiving a treatment with no active ingredients, has long puzzled doctors. For decades, it was regarded largely as a nuisance in clinical trials, something that made it harder to determine whether a new drug truly worked. Researchers would compare a drug against a placebo, and if the two produced similar results, the drug was deemed ineffective. More recently, however, scientists have begun to {1}.',
      'One striking finding is that placebos can work even when patients know they are taking them. In a series of so-called "open-label" studies, people with chronic conditions such as back pain were given pills and told plainly that the pills contained nothing but sugar. Remarkably, many still reported reduced symptoms. Some researchers believe this is because the ritual of taking medicine {2}, triggering the body\'s own pain-relieving mechanisms.',
      'Nonetheless, the ethics of using placebos remain contentious. Critics warn that encouraging their use could lead patients to forgo effective treatments for serious illnesses. Proponents counter that, used responsibly, placebos could {3}, particularly for conditions where conventional drugs offer only modest benefits and carry significant side effects.'
    ],
    qs: [
      { choices: ['view it as a phenomenon worth studying in its own right', 'abandon the use of placebos in drug trials', 'doubt that the placebo effect exists at all', 'replace clinical trials with patient surveys'], a: 0, why: '「かつては厄介者とみなされていた」が However で転換し、次の段落で研究成果が紹介される。それ自体を研究に値する現象と見なし始めた、が流れに合う。' },
      { choices: ['creates an expectation of relief', 'removes the need for doctors', 'makes patients forget their pain immediately', 'changes the chemical content of the pills'], a: 0, why: '空所の後に「体自身の鎮痛の仕組みを引き起こす」とある。薬を飲むという儀式が「楽になるという期待」を生み、それが体の仕組みを作動させる、という説明。' },
      { choices: ['become a valuable complement to standard care', 'cure every type of disease', 'be sold without any regulation', 'eliminate the need for clinical trials'], a: 0, why: '「責任をもって使えば」という条件付きの主張で、従来の薬の効果が小さく副作用が大きい症状について述べている。標準治療を「補う価値ある手段」が適切。他は誇張しすぎ。' }
    ],
    ja: [
      '有効成分を含まない治療を受けた後に患者が実際に改善を経験するプラシーボ効果は、長い間医師たちを悩ませてきた。何十年もの間、それは主に臨床試験における厄介なもの、つまり新薬が本当に効くかどうかを判断しにくくするものとみなされていた。研究者は薬をプラシーボと比較し、両者が同じような結果を示せば、その薬は効果がないとされた。しかし最近になって、科学者たちはそれをそれ自体として研究する価値のある現象と見なし始めている。',
      '注目すべき発見の一つは、患者がプラシーボを飲んでいると知っていても効果が出ることがあるというものだ。一連のいわゆる「オープンラベル」研究では、腰痛などの慢性疾患を持つ人々に錠剤が渡され、その錠剤には砂糖しか入っていないとはっきり告げられた。驚くべきことに、それでも多くの人が症状の軽減を報告した。薬を飲むという儀式が楽になるという期待を生み、体自身の鎮痛の仕組みを引き起こすからだと考える研究者もいる。',
      'それでもなお、プラシーボを使うことの倫理は議論を呼んでいる。批判する人々は、その使用を勧めることで、患者が重い病気に対する有効な治療を受けなくなるおそれがあると警告する。支持者は、責任をもって使えば、特に従来の薬の効果が控えめで重い副作用を伴うような症状について、プラシーボは標準的な治療を補う価値ある手段になりうると反論する。'
    ],
    words: [['placebo', '偽薬、プラシーボ'], ['active ingredient', '有効成分'], ['nuisance', '厄介なもの'], ['deem', '〜とみなす'], ['chronic', '慢性の'], ['contentious', '論争を呼ぶ'], ['forgo', '〜なしで済ませる'], ['proponent', '支持者']],
    phrases: [['in its own right', 'それ自体で'], ['nothing but', '〜だけ'], ['counter that', '〜と反論する']]
  },
  {
    id: 'r1l02', grade: '1', type: 'long', theme: '歴史', title: 'The Myth of the Dark Ages',
    paras: [
      'The period in Europe between the fall of the Western Roman Empire in the fifth century and the Renaissance has often been called the "Dark Ages." The label suggests an era of ignorance and stagnation in which the achievements of classical civilization were lost. Many modern historians, however, consider this characterization {1}.',
      'During these centuries, monasteries preserved and copied ancient texts that would otherwise have disappeared. Agricultural innovations, such as the heavy plow and the three-field system of crop rotation, {2}, which in turn supported population growth and the rise of towns. Meanwhile, scholars in the Islamic world were translating and expanding upon Greek works in mathematics, medicine, and philosophy, knowledge that would later flow back into Europe.',
      'Why, then, has the negative image persisted? Part of the answer lies with the writers of the Renaissance themselves, who were eager to present their own age as a glorious rebirth. {3}, they portrayed the preceding centuries as a time of darkness, a view that later generations largely accepted without question.'
    ],
    qs: [
      { choices: ['to be deeply misleading', 'to be generally accurate', 'to have been invented recently', 'to apply only to Asia'], a: 0, why: '次の段落で、この時代にも文献保存・農業革新などの成果があったと説明している。したがって「暗黒時代」という特徴づけは「大いに誤解を招く」。' },
      { choices: ['significantly increased food production', 'caused widespread famine', 'were quickly abandoned', 'were introduced by the Romans'], a: 0, why: '空所の後に「それが人口増加と町の発展を支えた」とある。人口増加を支えたのは「食料生産の大幅な増加」。' },
      { choices: ['To heighten the contrast', 'Despite this', 'On the contrary', 'In the same way'], a: 0, why: '自分たちの時代を輝かしい再生として示したかった→「対比を際立たせるために」前の時代を暗黒として描いた、という目的の関係。' }
    ],
    ja: [
      '5世紀の西ローマ帝国の滅亡からルネサンスまでのヨーロッパの時代は、しばしば「暗黒時代」と呼ばれてきた。この呼び名は、古典文明の業績が失われた無知と停滞の時代を思わせる。しかし、現代の多くの歴史家はこの特徴づけを大いに誤解を招くものだと考えている。',
      'この数世紀の間、修道院は、そうしなければ失われていたであろう古代の文献を保存し、書き写した。重い犂（すき）や三圃式農業などの農業の革新によって食料生産が大幅に増え、それが人口増加と町の発展を支えた。一方、イスラム世界の学者たちは数学、医学、哲学のギリシャの著作を翻訳し発展させており、その知識は後にヨーロッパへと還流することになる。',
      'では、なぜ否定的なイメージが残り続けてきたのか。答えの一部はルネサンスの著述家たち自身にある。彼らは自分たちの時代を輝かしい再生として示したがっていた。その対比を際立たせるために、彼らは先行する数世紀を暗黒の時代として描き、後の世代はその見方をほとんど疑うことなく受け入れたのである。'
    ],
    words: [['stagnation', '停滞'], ['characterization', '特徴づけ'], ['monastery', '修道院'], ['plow', '犂（すき）'], ['crop rotation', '輪作'], ['philosophy', '哲学'], ['persist', '残り続ける'], ['portray', '〜を描く']],
    phrases: [['expand upon', '〜を発展させる'], ['be eager to', 'しきりに〜したがる'], ['without question', '疑うことなく']]
  },
  {
    id: 'r1c01', grade: '1', type: 'content', format: 'article', theme: '経済', title: 'The Gig Economy and Its Discontents',
    paras: [
      'Over the past decade, digital platforms have transformed the way millions of people work. Ride-sharing apps, food delivery services, and online marketplaces for freelance tasks have given rise to what is commonly called the "gig economy." Advocates praise the flexibility these platforms offer. Workers can choose when and how much they work, which appeals to students, parents with caregiving responsibilities, and people seeking to supplement their income.',
      'Yet this flexibility comes at a cost. Because platform companies typically classify their workers as independent contractors rather than employees, they are not obliged to provide benefits such as health insurance, paid leave, or pensions. Critics argue that this arrangement shifts risk from corporations onto individuals. When demand falls or an algorithm changes the way tasks are assigned, workers can see their earnings drop sharply with little warning and no recourse.',
      'The algorithms themselves have become a focus of concern. Workers are often rated by customers and monitored by software that tracks their speed and acceptance rates. Those whose scores fall below certain thresholds may find themselves "deactivated," effectively dismissed, without any human review. Labor advocates contend that such opaque systems give companies the power of an employer without the corresponding responsibilities.',
      'Governments have responded in varying ways. Some courts have ruled that gig workers should be treated as employees, while some legislatures have created a new intermediate category that grants limited protections. The companies, for their part, warn that heavy regulation would force them to raise prices and reduce the number of available jobs. How to balance flexibility with security remains one of the defining labor questions of the era.'
    ],
    qs: [
      { q: 'According to the passage, why do some people value gig work?', choices: ['It allows them to decide their own working hours.', 'It provides better health insurance than regular jobs.', 'It guarantees a stable monthly salary.', 'It requires no use of digital technology.'], a: 0, why: '第1段落：いつ・どれだけ働くかを選べる柔軟性が評価されている。' },
      { q: 'What do critics say about classifying workers as independent contractors?', choices: ['It moves financial risk from companies to workers.', 'It helps workers earn more during busy periods.', 'It makes it easier for workers to receive pensions.', 'It allows workers to choose their customers.'], a: 0, why: '第2段落：この仕組みはリスクを企業から個人に移すと批判されている（shifts risk from corporations onto individuals）。' },
      { q: 'What concern is raised about the algorithms used by platforms?', choices: ['Workers can lose access to work without any human decision.', 'They make it impossible for customers to rate workers.', 'They assign too many tasks to new workers.', 'They are controlled directly by governments.'], a: 0, why: '第3段落：スコアが基準を下回ると、人による審査なしに「無効化」＝事実上の解雇がされうる。' },
      { q: 'Which of the following best describes the current situation regarding regulation?', choices: ['Approaches differ, and the issue has not been settled.', 'All governments now treat gig workers as employees.', 'Companies have welcomed strict new regulations.', 'Courts have banned gig work entirely.'], a: 0, why: '第4段落：政府の対応はさまざまで、柔軟性と安定の両立はいまだ大きな問題として残っている。' }
    ],
    ja: [
      '過去10年間で、デジタルプラットフォームは何百万人もの働き方を変えた。配車アプリ、料理宅配サービス、単発の仕事を扱うオンライン市場が、一般に「ギグエコノミー」と呼ばれるものを生み出した。支持者はこれらのプラットフォームが提供する柔軟性を称賛する。働き手はいつ、どれだけ働くかを選ぶことができ、それは学生、介護や育児の責任を負う親、収入を補いたい人々にとって魅力的だ。',
      'しかし、この柔軟性には代償がある。プラットフォーム企業は通常、働き手を従業員ではなく個人事業主として分類するため、健康保険、有給休暇、年金といった福利厚生を提供する義務を負わない。批判する人々は、この仕組みがリスクを企業から個人へと移すと主張する。需要が落ちたり、アルゴリズムが仕事の割り振り方を変えたりすると、働き手はほとんど予告もなく、頼る手段もないまま収入が急落することがある。',
      'アルゴリズム自体も懸念の的になっている。働き手はしばしば客から評価され、速さや受諾率を追跡するソフトウェアに監視される。スコアが一定の基準を下回った人は、人による審査もなく「アカウント停止」、事実上の解雇となることがある。労働者の権利を擁護する人々は、そのような不透明な仕組みは、企業に雇用主の権力を与える一方で、それに見合う責任を負わせていないと主張する。',
      '各国政府の対応はさまざまだ。ギグワーカーは従業員として扱われるべきだと判断した裁判所もあれば、限定的な保護を与える新たな中間的な区分を設けた議会もある。企業側は、厳しい規制は価格の引き上げと仕事の数の削減を余儀なくさせると警告する。柔軟性と安定をどう両立させるかは、この時代を特徴づける労働問題の一つであり続けている。'
    ],
    words: [['advocate', '支持者、擁護者'], ['supplement', '〜を補う'], ['classify', '〜を分類する'], ['independent contractor', '個人事業主'], ['recourse', '頼る手段'], ['threshold', '基準、しきい値'], ['opaque', '不透明な'], ['legislature', '議会']],
    phrases: [['give rise to', '〜を生み出す'], ['come at a cost', '代償を伴う'], ['for their part', '彼らとしては']]
  },
  {
    id: 'r1c02', grade: '1', type: 'content', format: 'article', theme: '自然', title: 'The Hidden Network of Forests',
    paras: [
      'For much of the twentieth century, foresters viewed trees as individuals competing with one another for sunlight, water, and nutrients. Research over the past few decades has complicated that picture. Beneath the forest floor, the roots of many trees are connected by vast networks of fungi known as mycorrhizal networks. The fungi supply trees with water and minerals, and in exchange receive sugars that the trees produce through photosynthesis.',
      'Some studies have suggested that these networks allow trees to share resources with one another. In experiments using radioactive carbon as a tracer, researchers found that carbon could move from one tree to another through fungal connections. Such findings led to popular claims that older "mother trees" nurture their offspring and that forests behave like cooperative communities.',
      'However, a number of scientists have recently urged caution. They point out that many of the original studies were small, conducted under specific conditions, and difficult to replicate. The amount of carbon transferred between trees may be too small to matter, and it is unclear whether trees actively send resources or whether the fungi simply move them for their own benefit. Critics worry that compelling stories about generous trees have spread faster than the evidence supporting them.'
    ],
    qs: [
      { q: 'What is the relationship between trees and mycorrhizal fungi?', choices: ['Each provides something that the other needs.', 'The fungi compete with trees for sunlight.', 'The fungi damage tree roots to obtain sugar.', 'Trees use the fungi only during winter.'], a: 0, why: '第1段落：菌類は水とミネラルを木に供給し、代わりに光合成でできた糖を受け取る＝相互に必要なものを提供し合う。' },
      { q: 'What did experiments using radioactive carbon show?', choices: ['Carbon could travel between trees via fungal networks.', 'Older trees absorb all the carbon in a forest.', 'Fungi produce sugar without the help of trees.', 'Trees grow faster when they are isolated.'], a: 0, why: '第2段落：放射性炭素を追跡すると、炭素が菌類のつながりを通って木から木へ移動しうることがわかった。' },
      { q: 'Why have some scientists urged caution about the popular claims?', choices: ['The supporting evidence may be weaker than people assume.', 'They believe fungi do not exist under most forests.', 'Experiments have proven that trees never share resources.', 'They think trees should be studied only in laboratories.'], a: 0, why: '第3段落：元の研究は小規模で再現が難しく、魅力的な話が証拠より速く広まっている＝証拠は思われているより弱いかもしれない。' }
    ],
    ja: [
      '20世紀の大半を通じて、林業の専門家は木を、日光、水、養分をめぐって互いに競争する個体とみなしていた。過去数十年の研究は、その見方を複雑なものにした。林床の下では、多くの木の根が菌根ネットワークとして知られる菌類の広大なネットワークでつながっている。菌類は木に水とミネラルを供給し、その見返りに木が光合成によって作る糖を受け取る。',
      'いくつかの研究は、これらのネットワークによって木が互いに資源を分け合えることを示唆した。放射性炭素を追跡用の目印として使った実験で、研究者たちは炭素が菌類のつながりを通じて木から木へと移動しうることを発見した。こうした発見から、年老いた「母なる木」が子孫を育てている、森は協力的な共同体のように振る舞っている、といった一般向けの主張が広まった。',
      'しかし、最近では多くの科学者が慎重になるよう呼びかけている。彼らは、元の研究の多くが小規模で、特定の条件下で行われ、再現が難しかったと指摘する。木の間で移動する炭素の量は意味を持たないほど少ないかもしれず、木が積極的に資源を送っているのか、それとも菌類が自らの利益のために単に移動させているだけなのかは明らかではない。批判する人々は、気前のよい木という魅力的な話が、それを裏付ける証拠よりも速く広まってしまったことを懸念している。'
    ],
    words: [['nutrient', '養分'], ['fungi', '菌類（fungus の複数形）'], ['photosynthesis', '光合成'], ['radioactive', '放射性の'], ['tracer', '追跡用の目印'], ['nurture', '〜を育てる'], ['replicate', '〜を再現する'], ['compelling', '説得力のある、魅力的な']],
    phrases: [['in exchange', '見返りに'], ['urge caution', '慎重さを促す'], ['point out', '〜を指摘する']]
  }
);
