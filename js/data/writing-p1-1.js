/* 準1級・1級 ライティング問題（オリジナル） */
WRITING_DATA.summary.push(
  {
    id: 'wsp101', grade: 'p1', theme: '社会', title: 'Four-Day School Weeks',
    text: [
      'In recent years, a growing number of school districts in rural parts of the United States have adopted a four-day school week. Students attend classes for longer hours from Monday to Thursday and have Fridays off. The change is often driven by financial pressures, as districts in sparsely populated areas struggle with the high costs of running buses over long distances and maintaining old buildings.',
      'Supporters say the shorter week benefits both students and teachers. Districts report that it has become easier to recruit and keep teachers, who value the extra day for planning lessons or resting. Attendance has also improved in some schools, as families can schedule medical appointments on Fridays instead of taking children out of class.',
      'However, critics point out several drawbacks. Working parents may have to pay for childcare on Fridays, which can be a burden for low-income families. Moreover, some studies suggest that students in four-day schools learn slightly less, particularly in mathematics, though the results vary widely. As a result, some districts that adopted the system have decided to return to a five-day week.'
    ],
    ja: [
      '近年、アメリカの地方の学区で週4日制の学校を導入するところが増えている。生徒は月曜から木曜まで長い時間授業を受け、金曜日は休みになる。この変更は財政的な圧力によることが多く、人口の少ない地域の学区は、長距離のバス運行や古い校舎の維持にかかる高い費用に苦しんでいる。',
      '支持者は、短い週は生徒と教師の両方に利益があると言う。学区からは、教師を採用し、引き留めることが容易になったという報告がある。教師は授業準備や休息のための1日を重視しているからだ。家族が子どもを授業から抜けさせる代わりに金曜日に通院の予定を入れられるため、出席率が改善した学校もある。',
      'しかし、批判する人々はいくつかの欠点を指摘する。働く親は金曜日の保育にお金を払わなければならないかもしれず、それは低所得の家庭にとって負担になりうる。さらに、週4日制の学校の生徒は、特に数学で学ぶ量がやや少ないことを示す研究もあるが、結果は大きくばらついている。その結果、この制度を導入した学区の中には週5日制に戻すことを決めたところもある。'
    ],
    model: 'Some rural U.S. school districts have switched to a four-day week, mainly to save money on transportation and old buildings in sparsely populated areas. This change has helped schools attract teachers and improved attendance. However, it can force working parents to pay for extra childcare, and students may learn less. Consequently, some districts have gone back to the traditional five-day schedule.',
    modelJa: 'アメリカの地方の学区の中には、主に交通や校舎にかかる費用を節約するため週4日制に切り替えたところがある。この変更は学校が教師を集めるのに役立ち、出席率を改善した。しかし、働く親に追加の保育費を払わせることがあり、生徒の学ぶ量が減るかもしれない。その結果、従来の週5日制に戻した学区もある。',
    points: [
      { p: '現状と背景：地方の学区が費用節約のため週4日制を導入', why: '第1段落の中心。「なぜ導入されたのか」は要約の出発点として欠かせない。' },
      { p: '利点：教師の確保・出席率の改善', why: '第2段落の中心。支持者の主張を2点にまとめる。' },
      { p: '欠点：保育費の負担・学力低下の可能性', why: '第3段落の However 以降。対立する視点は必ず入れる。' },
      { p: '結果：週5日制に戻した学区もある', why: '文章の結論部分。最後に入れることで全体の流れが完結する。' }
    ],
    cut: ['Monday to Thursday / Fridays off（曜日の細部）', 'planning lessons or resting（理由の細部）', 'particularly in mathematics / results vary widely（研究結果の細部）'],
    expressions: [['switch to 〜', '〜に切り替える'], ['save money on 〜', '〜の費用を節約する'], ['force A to do', 'Aに〜させる'], ['Consequently,', 'その結果'], ['go back to 〜', '〜に戻る']],
    structure: ['1文目：現状＋背景（費用）', '2文目：利点2つ', '3文目：However＋欠点2つ', '4文目：Consequently＋結果']
  },
  {
    id: 'wsp102', grade: 'p1', theme: 'テクノロジー', title: 'Facial Recognition in Public Spaces',
    text: [
      'Facial recognition technology, which identifies people by analyzing images of their faces, is increasingly being used in public spaces such as airports, train stations, and shopping centers. Police departments in some countries have also adopted it to help locate suspects and missing persons.',
      'Proponents argue that the technology improves public safety and convenience. At some airports, travelers can board planes simply by having their faces scanned, which shortens waiting times. Police say the technology has helped them solve crimes more quickly by matching faces captured on security cameras with existing records.',
      'Nevertheless, the technology has generated strong opposition. Privacy advocates warn that constant monitoring could allow governments or companies to track people\'s movements without their consent. Studies have also found that some systems are less accurate at identifying people with darker skin, raising concerns that innocent people could be wrongly accused. In response, several cities have banned police from using facial recognition, while others have introduced rules requiring public notice and independent audits.'
    ],
    ja: [
      '顔の画像を分析して人を識別する顔認証技術は、空港、駅、ショッピングセンターなどの公共の場でますます使われるようになっている。一部の国の警察も、容疑者や行方不明者を探すのに役立てるためにこれを導入している。',
      '支持者は、この技術が公共の安全と利便性を高めると主張する。いくつかの空港では、旅行者は顔をスキャンするだけで飛行機に搭乗でき、待ち時間が短くなる。警察は、防犯カメラに映った顔を既存の記録と照合することで、事件をより早く解決できるようになったと言う。',
      'それでも、この技術は強い反対を生んでいる。プライバシー擁護派は、常時の監視によって政府や企業が同意なしに人々の動きを追跡できるようになりかねないと警告する。また、一部のシステムは肌の色の濃い人を識別する精度が低いことが研究でわかっており、無実の人が誤って告発されるのではないかという懸念が生じている。これを受けて、警察による顔認証の使用を禁止した都市もあれば、公への告知と独立した監査を義務づける規則を導入した都市もある。'
    ],
    model: 'Facial recognition technology is now widely used in public places and by police to find suspects. Supporters say it makes society safer and more convenient, for example by speeding up airport boarding and helping solve crimes. However, critics worry that it threatens privacy and may misidentify certain groups, leading to false accusations. As a result, some cities have banned or strictly regulated its use.',
    modelJa: '顔認証は今や公共の場や警察で広く使われている。支持者は、例えば空港での搭乗を早めたり事件解決を助けたりすることで、社会をより安全で便利にすると言う。しかし批判する人々は、それがプライバシーを脅かし、特定の集団を誤認して誤った告発につながるかもしれないと懸念している。その結果、その使用を禁止したり厳しく規制したりした都市もある。',
    points: [
      { p: 'テーマ：顔認証が公共の場や警察で広く使われている', why: '第1段落の内容。何についての文章かを最初に示す。' },
      { p: '利点：安全性と利便性（空港・事件解決）', why: '第2段落の中心。具体例は「for example」で短く添える程度にとどめる。' },
      { p: '懸念：プライバシー・誤認識による誤った告発', why: '第3段落の Nevertheless 以降。反対意見の2つの柱。' },
      { p: '対応：禁止・規制する都市が出てきた', why: '結論として社会の反応を示し、要約を締めくくる。' }
    ],
    cut: ['airports, train stations, and shopping centers（場所の列挙）', 'suspects and missing persons（細部）', 'public notice and independent audits（規則の細部）'],
    expressions: [['be widely used', '広く使われている'], ['speed up 〜', '〜を速める'], ['threaten privacy', 'プライバシーを脅かす'], ['misidentify', '〜を誤認する'], ['strictly regulate', '〜を厳しく規制する']],
    structure: ['1文目：テーマ', '2文目：利点（具体例つき）', '3文目：However＋懸念2つ', '4文目：As a result＋社会の対応']
  },
  {
    id: 'ws101', grade: '1', theme: '経済', title: 'Universal Basic Income',
    text: [
      'Universal basic income (UBI) refers to a policy under which governments provide every adult citizen with a regular cash payment, regardless of employment status or income. Once considered a utopian idea, it has attracted renewed attention in recent years, partly due to concerns that automation and artificial intelligence could eliminate large numbers of jobs. Several countries and cities have conducted pilot programs to test its effects.',
      'Advocates contend that UBI would provide a financial safety net in an economy where stable employment is becoming less common. Because payments are unconditional, they argue, the system would be simpler and cheaper to administer than existing welfare programs, which often involve complex eligibility rules. Results from some pilot programs suggest that recipients experienced less stress and were more likely to invest in education or start small businesses, contrary to fears that they would stop working.',
      'Opponents, however, raise serious objections. The most frequently cited is cost: providing a meaningful income to every adult would require enormous public spending, likely funded by substantial tax increases. Critics also question whether pilot programs, which are typically small and temporary, can reliably predict how people would behave if UBI were permanent and nationwide. Some economists further warn that giving everyone extra money could push up prices, reducing the real value of the payments. Others argue that targeted assistance for those most in need would be a more efficient use of limited resources.',
      'Given these competing considerations, many policymakers favor more gradual approaches, such as expanding existing tax credits or introducing partial payments for specific groups, while continuing to study the results of larger experiments.'
    ],
    ja: [
      'ユニバーサル・ベーシックインカム（UBI）とは、雇用状況や収入にかかわらず、政府がすべての成人市民に定期的に現金を支給する政策を指す。かつては空想的な考えとみなされていたが、自動化や人工知能が大量の仕事をなくすかもしれないという懸念もあって、近年あらためて注目を集めている。いくつかの国や都市が、その効果を検証するための試験的な事業を行ってきた。',
      '支持者は、安定した雇用が少なくなりつつある経済において、UBIは経済的なセーフティネットになると主張する。支給は無条件なので、複雑な受給資格の規則を伴うことが多い既存の福祉制度よりも、運営が簡単で安く済むと彼らは言う。いくつかの試験事業の結果は、受給者が働かなくなるという懸念に反して、受給者のストレスが減り、教育に投資したり小さな事業を始めたりする可能性が高かったことを示唆している。',
      'しかし、反対する人々は深刻な異議を唱える。最もよく挙げられるのは費用だ。すべての成人に意味のある額の収入を与えるには莫大な公的支出が必要であり、その財源はおそらく大幅な増税になるだろう。批判する人々はまた、通常は小規模で一時的な試験事業が、UBIが恒久的かつ全国的になった場合に人々がどう行動するかを確実に予測できるのかを疑問視している。さらに、全員に追加のお金を配ると物価が上がり、支給額の実質的な価値が下がりかねないと警告する経済学者もいる。最も困っている人への的を絞った支援の方が、限られた資源の効率的な使い方だと主張する者もいる。',
      'こうした相反する考慮事項を踏まえ、多くの政策立案者は、より大規模な実験の結果を引き続き検証しながら、既存の税額控除の拡大や特定の集団への部分的な支給など、より段階的な方法を支持している。'
    ],
    model: 'Universal basic income, a regular payment to all adults regardless of their situation, has gained renewed attention amid fears that automation and AI will destroy many jobs, and several pilot programs have tested it. Supporters believe it would offer security and be easier to manage than current welfare systems, and trials suggest recipients continue to work and invest in themselves. However, critics point to its huge cost, the limited reliability of small trials, and the risk of inflation, and some prefer targeted support. Therefore, many policymakers favor gradual measures while further research is carried out.',
    modelJa: 'ベーシックインカム、つまり状況にかかわらずすべての成人に定期的に支給されるお金は、自動化が仕事を奪うという懸念の中で注目を集めている。支持者は、それが安心をもたらし、現行の福祉制度より管理しやすいと考えており、試験事業では受給者が働き続け、自己投資していることが示されている。しかし批判する人々は、その莫大な費用、小規模な試験の信頼性の限界、インフレの危険を指摘し、的を絞った支援を好む人もいる。そのため、多くの政策立案者は、さらなる研究を進めながら段階的な対策を支持している。',
    points: [
      { p: '定義と背景：全成人への定期的な支給／自動化への懸念で注目', why: '第1段落。UBIが何かを一言で定義しないと、読み手が内容を理解できない。' },
      { p: '支持者の主張：安心・運営の簡単さ・試験事業の好結果', why: '第2段落の3つの論点を1文に凝縮する。1級は情報量が多いので、名詞句でまとめる力が問われる。' },
      { p: '反対意見：費用・試験の信頼性・インフレ・的を絞った支援', why: '第3段落の However 以降。論点が多いので列挙して簡潔にまとめる。' },
      { p: '結論：段階的なアプローチが支持されている', why: '第4段落。筆者がたどり着く現状の結論なので必ず入れる。' }
    ],
    cut: ['Once considered a utopian idea（経緯の細部）', 'complex eligibility rules（説明の細部）', 'tax credits / partial payments for specific groups（具体策の細部）'],
    expressions: [['regardless of 〜', '〜にかかわらず'], ['amid fears that 〜', '〜という懸念の中で'], ['point to 〜', '〜を（根拠として）挙げる'], ['targeted support', '的を絞った支援'], ['while further research is carried out', 'さらなる研究を進めながら']],
    structure: ['1文目：定義＋注目される背景', '2文目：支持者の主張（3点）', '3文目：However＋反対意見（3〜4点）', '4文目：Therefore＋現在の方向性']
  },
  {
    id: 'ws102', grade: '1', theme: '環境', title: 'Rewilding',
    text: [
      'Rewilding is an approach to conservation that aims to restore natural processes by reducing human management of landscapes. Rather than carefully controlling individual species or habitats, rewilding projects often reintroduce large animals, such as wolves, beavers, or bison, and then allow ecosystems to develop with minimal intervention. In Europe, where large areas of farmland have been abandoned as people move to cities, the idea has gained considerable momentum.',
      'Proponents emphasize that rewilding can deliver a wide range of benefits. Reintroduced species can reshape their environments in ways that support biodiversity; beavers, for instance, build dams that create wetlands, which store water, reduce flooding downstream, and provide habitats for insects and birds. Rewilded areas can also attract tourists, offering new sources of income for rural communities that have suffered from economic decline.',
      'Nonetheless, rewilding has provoked considerable controversy. Farmers in some regions have reported livestock losses after the return of predators such as wolves, and they argue that compensation schemes are inadequate. Others object on cultural grounds, viewing traditional farming landscapes as part of their heritage. Some scientists also caution that the outcomes of rewilding are difficult to predict, since ecosystems have changed significantly since the reintroduced species last lived there.',
      'In light of these concerns, many practitioners now stress the importance of involving local communities from the outset, ensuring that projects reflect local needs and that those affected are fairly compensated.'
    ],
    ja: [
      '再野生化とは、景観に対する人間の管理を減らすことで自然のプロセスを回復させることを目指す保全の方法である。個々の種や生息地を注意深く管理するのではなく、再野生化の事業では、オオカミ、ビーバー、バイソンなどの大型動物を再導入し、その後は最小限の介入で生態系の発展に任せることが多い。人々が都市へ移り住むにつれて広大な農地が放棄されてきたヨーロッパでは、この考えがかなりの勢いを得ている。',
      '支持者は、再野生化が幅広い利益をもたらしうると強調する。再導入された種は生物多様性を支える形で環境を作り変えることがある。例えばビーバーはダムを作って湿地を生み出し、それが水を蓄え、下流の洪水を減らし、昆虫や鳥のすみかとなる。再野生化された地域は観光客を引きつけることもでき、経済的な衰退に苦しんできた地方の共同体に新たな収入源をもたらす。',
      'それでもなお、再野生化はかなりの論争を引き起こしている。一部の地域の農家は、オオカミなどの捕食動物が戻ってきた後に家畜の被害を報告しており、補償制度が不十分だと主張している。伝統的な農村の景観を自分たちの遺産の一部とみなし、文化的な理由で反対する人々もいる。また、再導入された種がかつてそこに生息していた時から生態系は大きく変わっているため、再野生化の結果は予測が難しいと注意を促す科学者もいる。',
      'こうした懸念を踏まえ、現在多くの実践者は、事業が地域のニーズを反映し、影響を受ける人々が公平に補償されるよう、最初から地域社会を関わらせることの重要性を強調している。'
    ],
    model: 'Rewilding is a conservation method that restores natural processes by reintroducing large animals and limiting human management, and it has become increasingly popular in Europe as large areas of farmland are abandoned. Supporters say it boosts biodiversity, for example through wetlands created by beavers, helps prevent floods, and brings tourism income to struggling rural areas. However, it is controversial because farmers lose livestock to predators, some people value traditional landscapes, and the results are hard to predict. Consequently, experts now emphasize involving local communities from the start and fairly compensating those affected.',
    modelJa: '再野生化とは、大型動物を再導入し人間の管理を制限することで自然のプロセスを回復させる保全の方法であり、農地が放棄される中でヨーロッパで人気が高まっている。支持者は、それが生物多様性を高め、洪水の防止に役立ち、苦しんでいる地方に観光収入をもたらすと言う。しかし、農家が捕食動物に家畜を奪われること、伝統的な景観を大切にする人がいること、結果の予測が難しいことから、論争を呼んでいる。そのため専門家は今、最初から地域社会を関わらせ、公平に補償することを重視している。',
    points: [
      { p: '定義と現状：大型動物の再導入と管理の削減／ヨーロッパで広がる', why: '第1段落。専門用語は要約の中で簡潔に定義しておくと読み手に親切。' },
      { p: '利点：生物多様性・洪水防止・観光収入', why: '第2段落。ビーバーの例は「helps prevent floods」など結果だけを抽出する。' },
      { p: '論争：家畜被害・文化的反対・予測の難しさ', why: '第3段落の3つの反対理由をbecause節に並べてまとめる。' },
      { p: '結論：地域社会を最初から関与させ公平に補償する', why: '第4段落の結論。問題への対応策として入れる。' }
    ],
    cut: ['wolves, beavers, or bison（動物の列挙）', 'insects and birds / store water（ビーバーの例の細部）', 'compensation schemes are inadequate（細部。補償の話は結論で触れる）'],
    expressions: [['reintroduce', '〜を再導入する'], ['boost biodiversity', '生物多様性を高める'], ['lose A to B', 'AをBに奪われる'], ['be hard to predict', '予測しにくい'], ['from the start', '最初から']],
    structure: ['1文目：定義＋現状', '2文目：利点3つ', '3文目：However＋論争の理由3つ', '4文目：Consequently＋今後の方向性']
  }
);

WRITING_DATA.opinion.push(
  {
    id: 'wop101', grade: 'p1', theme: '仕事', topic: 'Agree or disagree: Companies should be required to allow employees to work from home.',
    topicJa: '企業は従業員に在宅勤務を認めることを義務づけられるべきか（賛成か反対か）。',
    points: ['Productivity', 'Work-life balance', 'Teamwork', 'Costs'],
    model: {
      stance: 'disagree',
      text: 'Although working from home has clear benefits, I do not believe companies should be required by law to allow it.\n\nFirst, a legal requirement would ignore the differences between industries. In fields such as manufacturing, healthcare, and retail, most tasks must be performed on-site. Even in office jobs, some roles depend heavily on face-to-face communication, so a single rule for every company would be impractical.\n\nSecond, forcing companies to offer remote work could harm teamwork. New employees, in particular, learn a great deal by observing experienced colleagues and asking quick questions. If firms cannot decide when staff should come to the office, it may become harder to train young workers and maintain a shared company culture.\n\nIn conclusion, decisions about remote work should be left to each company, which understands its own needs best.',
      ja: '在宅勤務には明らかな利点があるが、企業が法律でそれを認めることを義務づけられるべきだとは思わない。\n\n第一に、法的な義務は業種による違いを無視することになる。製造業、医療、小売業などの分野では、ほとんどの仕事は現場で行わなければならない。事務職でさえ、対面のコミュニケーションに大きく依存する役割もあるので、すべての企業に一律の規則を課すのは非現実的だ。\n\n第二に、企業に在宅勤務の提供を強制するとチームワークが損なわれかねない。特に新入社員は、経験豊かな同僚を観察したり、ちょっとした質問をしたりすることで多くを学ぶ。社員がいつ出社すべきかを会社が決められなければ、若い社員を育成し、共通の企業文化を保つことが難しくなるかもしれない。\n\n結論として、在宅勤務についての判断は、自社の必要性を最もよく理解しているそれぞれの企業に委ねられるべきだ。',
      reason1: '業種ごとの違いを無視することになる（Productivity：現場が必要な仕事が多い）', reason2: 'チームワークや新人育成が難しくなる（Teamwork）',
      expressions: [['be required by law to do', '法律で〜することを義務づけられる'], ['be impractical', '非現実的である'], ['be left to 〜', '〜に委ねられる'], ['in particular', '特に']],
      structure: ['序論：主張（反対）', '本論1：First＋業種の違い＋具体例', '本論2：Second＋チームワーク＋新人の例', '結論：In conclusion＋主張の言い換え']
    },
    other: ['通勤時間がなくなり、生産性やワークライフバランスが向上する（Work-life balance）', 'オフィスの費用を削減できる（Costs）', '育児や介護をする人が働き続けやすくなる']
  },
  {
    id: 'wop102', grade: 'p1', theme: '環境', topic: 'Should the government do more to reduce plastic waste?',
    topicJa: '政府はプラスチックごみを減らすためにもっと多くのことをすべきか。',
    points: ['Environment', 'Business', 'Consumer behavior', 'Recycling'],
    model: {
      stance: 'agree',
      text: 'I strongly believe that the government should take stronger action to reduce plastic waste.\n\nFirst, individual efforts alone are not enough to solve the problem. Although many consumers try to bring their own bags and bottles, most products in supermarkets are still wrapped in plastic. Only the government has the power to set rules for manufacturers, such as limiting unnecessary packaging or requiring companies to use recyclable materials.\n\nSecond, government action can change people\'s behavior effectively. For example, after Japan began charging for plastic shopping bags in 2020, the number of bags used dropped sharply. Similar policies, such as deposit systems for plastic bottles, could encourage more people to recycle.\n\nFor these reasons, I think the government should play a leading role in reducing plastic waste.',
      ja: '政府はプラスチックごみを減らすために、より強力な措置をとるべきだと強く思う。\n\n第一に、個人の努力だけでは問題を解決するのに十分ではない。多くの消費者が自分の袋やボトルを持参しようとしているが、スーパーのほとんどの商品はいまだにプラスチックで包装されている。不要な包装を制限したり、企業にリサイクル可能な素材の使用を義務づけたりといった、製造業者に対する規則を定める力を持つのは政府だけだ。\n\n第二に、政府の措置は人々の行動を効果的に変えることができる。例えば、日本が2020年にレジ袋の有料化を始めた後、使われる袋の数は急激に減った。ペットボトルのデポジット制度のような同様の政策は、より多くの人にリサイクルを促すだろう。\n\nこれらの理由から、政府はプラスチックごみの削減で主導的な役割を果たすべきだと思う。',
      reason1: '個人の努力だけでは不十分で、企業へのルール作りは政府にしかできない（Business）', reason2: '政府の政策は人々の行動を効果的に変える（Consumer behavior）',
      expressions: [['take stronger action', 'より強力な措置をとる'], ['set rules for 〜', '〜に対する規則を定める'], ['drop sharply', '急激に減る'], ['play a leading role in 〜', '〜で主導的な役割を果たす']],
      structure: ['序論：主張（賛成）', '本論1：First＋個人の限界＋政府にできること', '本論2：Second＋行動の変化＋日本の具体例', '結論：For these reasons＋主張の言い換え']
    },
    other: ['規制は企業のコストを増やし、価格上昇につながる（Business）', '教育や企業の自主的な取り組みに任せた方が柔軟に対応できる', 'リサイクル技術の開発に投資する方が効果的（Recycling）']
  },
  {
    id: 'wop103', grade: 'p1', theme: '教育', topic: 'Agree or disagree: University education should be free for all students.',
    topicJa: '大学教育はすべての学生にとって無償であるべきか（賛成か反対か）。',
    points: ['Equal opportunity', 'Cost to taxpayers', 'Quality of education', 'Economy'],
    model: {
      stance: 'agree',
      text: 'I agree that university education should be free for all students, for two main reasons.\n\nFirst, free tuition would give every young person an equal opportunity to develop their talents. At present, many capable students from low-income families give up on university because they cannot afford the fees or fear taking on large loans. As a result, society loses people who could have become doctors, engineers, or researchers.\n\nSecond, investing in higher education benefits the economy as a whole. University graduates tend to earn higher incomes, which means they pay more taxes over their lifetimes. In addition, a well-educated workforce attracts companies and encourages innovation, helping the country remain competitive in the global market.\n\nFor these reasons, I believe the cost of free university education is a worthwhile investment in the nation\'s future.',
      ja: '大学教育はすべての学生にとって無償であるべきだという考えに、主に2つの理由から賛成する。\n\n第一に、授業料が無償になれば、すべての若者が才能を伸ばす平等な機会を得られる。現在、低所得家庭出身の有能な学生の多くが、学費を払えなかったり多額の借金を負うのを恐れたりして、大学進学をあきらめている。その結果、社会は医師、技術者、研究者になれたかもしれない人々を失っている。\n\n第二に、高等教育への投資は経済全体に利益をもたらす。大学卒業者は収入が高い傾向があり、それは生涯でより多くの税金を払うことを意味する。さらに、教育水準の高い労働力は企業を引きつけ、技術革新を促し、国が世界市場で競争力を保つのに役立つ。\n\nこれらの理由から、大学教育無償化の費用は、国の未来への価値ある投資だと思う。',
      reason1: 'すべての若者に平等な機会を与える（Equal opportunity）', reason2: '高等教育への投資は経済全体に利益をもたらす（Economy）',
      expressions: [['give up on 〜', '〜をあきらめる'], ['take on loans', '借金を負う'], ['as a whole', '全体として'], ['a worthwhile investment', '価値ある投資']],
      structure: ['序論：主張（賛成）', '本論1：First＋機会の平等＋現状の問題', '本論2：Second＋経済効果＋税収・競争力', '結論：For these reasons＋投資という言い換え']
    },
    other: ['税負担が増え、大学に進まない人にも負担を強いる（Cost to taxpayers）', '入学者が増えすぎて教育の質が下がるおそれ（Quality of education）', '奨学金を必要な人に集中させる方が効率的']
  },
  {
    id: 'wo101', grade: '1', theme: 'テクノロジー', topic: 'Agree or disagree: The benefits of artificial intelligence outweigh its risks.',
    topicJa: '人工知能の利点はその危険性を上回るか（賛成か反対か）。',
    points: ['Healthcare', 'Employment', 'Privacy', 'Productivity'],
    model: {
      stance: 'agree',
      text: 'Artificial intelligence (AI) has provoked both excitement and anxiety. While its risks deserve serious attention, I firmly believe that its benefits outweigh them, particularly in the areas of healthcare and productivity.\n\nFirst, AI is already transforming medicine in ways that save lives. Algorithms trained on millions of medical images can detect early signs of cancer and other diseases, sometimes more accurately than experienced doctors. In regions where specialists are scarce, such tools can give patients access to diagnoses they would otherwise never receive. As populations age and healthcare systems come under growing strain, this capacity will become even more valuable.\n\nSecond, AI can dramatically boost productivity across the economy. By automating routine tasks such as data entry, translation, and scheduling, it frees workers to focus on creative and interpersonal work that requires human judgment. Historically, technological revolutions have eliminated some jobs but created many new ones, and there is little reason to believe AI will be different, provided that governments invest in retraining.\n\nAdmittedly, concerns about privacy and misinformation are legitimate. However, these are problems of regulation rather than of the technology itself, and they can be addressed through clear laws and oversight.\n\nIn conclusion, if it is developed responsibly, AI offers benefits that far exceed its risks.',
      ja: '人工知能（AI）は期待と不安の両方を引き起こしてきた。その危険性には真剣に注意を払うべきだが、特に医療と生産性の分野において、その利点が危険性を上回ると私は固く信じている。\n\n第一に、AIはすでに命を救う形で医療を変えつつある。何百万もの医療画像で訓練されたアルゴリズムは、がんやその他の病気の初期の兆候を、時に経験豊富な医師よりも正確に発見できる。専門医の少ない地域では、こうした道具によって、患者はそうでなければ決して受けられない診断を受けることができる。人口が高齢化し医療制度への負担が増す中で、この能力はさらに価値あるものになるだろう。\n\n第二に、AIは経済全体の生産性を劇的に高めることができる。データ入力、翻訳、予定調整などの定型業務を自動化することで、働く人々は人間の判断を必要とする創造的な仕事や対人の仕事に集中できるようになる。歴史的に見て、技術革命は一部の仕事をなくしたが、多くの新しい仕事を生み出してきた。政府が再訓練に投資するならば、AIが違うと考える理由はほとんどない。\n\n確かに、プライバシーや誤情報に関する懸念はもっともだ。しかし、これらは技術そのものではなく規制の問題であり、明確な法律と監督によって対処できる。\n\n結論として、責任をもって開発されるなら、AIはその危険性をはるかに上回る利点をもたらす。',
      reason1: '医療を変え、命を救う（Healthcare：画像診断・専門医不足の地域）', reason2: '経済全体の生産性を劇的に高める（Productivity / Employment：定型業務の自動化と新しい仕事）',
      expressions: [['deserve serious attention', '真剣な注意に値する'], ['come under growing strain', 'ますます負担がかかる'], ['free A to do', 'Aを解放して〜できるようにする'], ['provided that 〜', '〜という条件で'], ['Admittedly, ... However, ...', '確かに〜だが、しかし…（譲歩→反論）']],
      structure: ['序論：背景＋主張（賛成）＋取り上げる観点', '本論1：First＋医療＋具体例＋将来の重要性', '本論2：Second＋生産性＋歴史的根拠', '譲歩と反論：Admittedly＋However', '結論：In conclusion＋条件つきの再主張']
    },
    other: ['大量の失業を招き、格差を広げるおそれ（Employment）', '個人データの収集・監視によるプライバシー侵害（Privacy）', '誤情報やディープフェイクが民主主義を脅かす']
  },
  {
    id: 'wo102', grade: '1', theme: '社会', topic: 'Should developed nations accept more immigrants to address their labor shortages?',
    topicJa: '先進国は労働力不足に対処するため、より多くの移民を受け入れるべきか。',
    points: ['Economy', 'Aging society', 'Social integration', 'Public services'],
    model: {
      stance: 'agree',
      text: 'Many developed nations face shrinking workforces as their populations age and birth rates decline. In my view, accepting more immigrants is an essential part of the solution, for both economic and social reasons.\n\nFirst, immigration is the fastest way to fill critical labor shortages. Industries such as nursing care, construction, and agriculture already struggle to find enough workers, and automation cannot replace the human labor these sectors require in the short term. Without newcomers, essential services may deteriorate, and businesses may be forced to close or relocate overseas, further weakening the economy.\n\nSecond, immigrants help sustain the social security systems on which aging societies depend. Because most immigrants arrive at working age, they pay taxes and contribute to pension and healthcare funds. This helps ease the burden on younger domestic workers, who would otherwise have to support an ever-growing number of retirees.\n\nCritics argue that large-scale immigration may cause social tension. This concern should not be dismissed, but it is best addressed through effective integration policies, such as language education and support for local communities, rather than by closing the door.\n\nIn conclusion, developed nations should welcome more immigrants while investing in programs that help them become full members of society.',
      ja: '多くの先進国は、人口の高齢化と出生率の低下に伴い、労働力の縮小に直面している。私の考えでは、より多くの移民を受け入れることは、経済的理由と社会的理由の両方から、解決策の不可欠な一部である。\n\n第一に、移民は深刻な労働力不足を埋める最も速い方法である。介護、建設、農業などの産業はすでに十分な働き手を見つけるのに苦労しており、短期的には、これらの分野が必要とする人間の労働を自動化で置き換えることはできない。新たな人々がいなければ、不可欠なサービスが悪化し、企業は閉鎖や海外移転を余儀なくされ、経済をさらに弱めかねない。\n\n第二に、移民は高齢化社会が頼る社会保障制度を支える助けとなる。移民の多くは働く年齢でやってくるので、税金を払い、年金や医療の財源に貢献する。これは、そうでなければ増え続ける退職者を支えなければならない国内の若い働き手の負担を和らげるのに役立つ。\n\n批判する人々は、大規模な移民は社会的な緊張を生むかもしれないと主張する。この懸念は退けるべきではないが、門戸を閉ざすことではなく、語学教育や地域社会への支援といった効果的な統合政策によって対処するのが最善である。\n\n結論として、先進国は、移民が社会の完全な一員となるのを助ける施策に投資しながら、より多くの移民を受け入れるべきである。',
      reason1: '深刻な労働力不足を最も速く埋められる（Economy：介護・建設・農業）', reason2: '高齢化社会の社会保障制度を支える（Aging society / Public services）',
      expressions: [['face shrinking workforces', '労働力の縮小に直面する'], ['fill labor shortages', '労働力不足を埋める'], ['ease the burden on 〜', '〜の負担を和らげる'], ['should not be dismissed', '退けるべきではない'], ['rather than by closing the door', '門戸を閉ざすことによってではなく']],
      structure: ['序論：背景（人口減少）＋主張（賛成）', '本論1：First＋労働力不足＋具体的な産業', '本論2：Second＋社会保障＋若い世代の負担', '譲歩と反論：Critics argue ... but ...', '結論：In conclusion＋統合政策を伴う受け入れ']
    },
    other: ['言語や文化の違いから社会的な摩擦が生じるおそれ（Social integration）', '自動化やロボットへの投資で労働力不足を補うべき', '女性や高齢者の就労支援を先に進めるべき']
  }
);
