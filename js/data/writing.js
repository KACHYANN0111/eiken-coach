/* ライティング問題（オリジナル）
 * summary：英文要約（約150語の英文 → 45〜55語。語数は CONFIG.wordLimits で管理）
 * opinion：意見論述（TOPIC＋POINTS → 80〜100語） */
var WRITING_DATA = { summary: [], opinion: [] };

WRITING_DATA.summary = [
  {
    id: 'ws01', theme: 'テクノロジー', title: 'Self-Checkout Machines',
    text: [
      'In recent years, many supermarkets and convenience stores have introduced self-checkout machines. With these machines, customers scan the items they want to buy and pay without the help of a cashier.',
      'There are some reasons why stores are using these machines. Stores can reduce the number of workers they need at the registers, which helps them save money. Also, because several machines can be used at the same time, customers often do not have to wait in long lines.',
      'However, self-checkout machines also have some problems. Some customers, especially older people, find the machines difficult to use and need help from staff. In addition, some people forget to scan items, and stores lose money because of this. For these reasons, some stores have decided to bring back more regular checkout counters.'
    ],
    ja: [
      '近年、多くのスーパーやコンビニがセルフレジを導入している。この機械では、客は買いたい商品を自分でスキャンし、レジ係の手を借りずに支払う。',
      '店がこの機械を使う理由はいくつかある。店はレジに必要な従業員の数を減らすことができ、お金の節約になる。また、複数の機械を同時に使えるので、客は長い列に並ばなくてよいことが多い。',
      'しかし、セルフレジには問題もある。特に高齢者など一部の客は機械を使いにくいと感じ、スタッフの助けが必要になる。さらに、商品をスキャンし忘れる人もいて、そのせいで店が損をする。こうした理由から、通常のレジを増やして戻すことに決めた店もある。'
    ],
    model: 'Many stores have started using self-checkout machines. They help stores save money on staff, and customers can avoid waiting in long lines. However, some people, such as the elderly, have trouble using them, and stores lose money when customers do not scan items. Therefore, some stores are returning to regular checkouts.',
    modelJa: '多くの店がセルフレジを使い始めている。セルフレジは店が人件費を節約するのに役立ち、客は長い列に並ぶのを避けられる。しかし、高齢者など使うのに苦労する人もおり、客が商品をスキャンしないと店は損をする。そのため、通常のレジに戻している店もある。',
    points: [
      { p: '導入：多くの店がセルフレジを導入している', why: '文章全体のテーマ（何についての文章か）を最初に示さないと、要約を読む人が話題をつかめないため。' },
      { p: '利点：人件費の節約・待ち時間の短縮', why: '第2段落の中心内容。店側と客側、両方の利点をまとめると情報のバランスが良くなる。' },
      { p: '欠点：使いにくい人がいる・スキャン漏れで損失', why: '第3段落の中心内容。However で始まる「反対の側面」は要約で必ず入れるべきポイント。' },
      { p: '結果：通常のレジに戻す店もある', why: '最後の結論部分で、文章の「その後どうなったか」を示しているため。' }
    ],
    cut: ['scan the items they want to buy and pay without the help of a cashier（セルフレジの細かい仕組み）', 'several machines can be used at the same time（理由の詳細）', 'especially older people → the elderly などに短く言い換え'],
    expressions: [['save money on 〜', '〜の費用を節約する'], ['have trouble doing', '〜するのに苦労する'], ['such as 〜', '〜のような'], ['return to 〜', '〜に戻る'], ['Therefore, 〜', 'そのため']],
    structure: ['1文目：テーマ（セルフレジが広まっている）', '2文目：利点（店と客）', '3文目：However＋欠点2つ', '4文目：Therefore＋結果']
  },
  {
    id: 'ws02', theme: '教育', title: 'School Uniforms',
    text: [
      'In Japan, most junior high and high schools require students to wear school uniforms. Recently, however, some schools have started to allow students to choose what they wear, such as pants or skirts, regardless of gender.',
      'People who support uniforms say that they have several good points. Students do not need to worry about choosing clothes every morning, and families can save money because they do not need to buy many different clothes. Also, uniforms help students feel that they are part of the school.',
      'On the other hand, some people think that uniforms should be more flexible. Uniforms can be expensive to buy at first, and they are sometimes uncomfortable in hot or cold weather. Moreover, some students feel that wearing the same clothes as everyone else prevents them from showing their personality. Because of these opinions, more schools are reviewing their uniform rules.'
    ],
    ja: [
      '日本では、ほとんどの中学校や高校が生徒に制服の着用を求めている。しかし最近、性別に関係なくズボンやスカートなど着るものを生徒が選べるようにする学校が出てきた。',
      '制服を支持する人は、制服にはいくつかの良い点があると言う。生徒は毎朝服を選ぶことを心配しなくてよく、家庭はさまざまな服を買う必要がないのでお金を節約できる。また、制服は生徒が学校の一員だと感じる助けになる。',
      '一方で、制服はもっと柔軟であるべきだと考える人もいる。制服は最初に買うときに高価なことがあり、暑い日や寒い日には着心地が悪いこともある。さらに、他の人と同じ服を着ることで個性を表現できないと感じる生徒もいる。こうした意見から、制服のルールを見直す学校が増えている。'
    ],
    model: 'Most Japanese schools have uniforms, but some now let students choose what to wear. Supporters say uniforms save time and money and make students feel like members of their school. However, others say that uniforms can be costly and uncomfortable, and that they stop students from expressing themselves. So, more schools are changing their rules.',
    modelJa: 'ほとんどの日本の学校には制服があるが、着るものを生徒に選ばせる学校も出てきた。支持者は、制服は時間とお金の節約になり、生徒に学校の一員だと感じさせると言う。しかし、制服は高く着心地が悪いことがあり、生徒が自分を表現するのを妨げると指摘する人もいる。そのため、ルールを変える学校が増えている。',
    points: [
      { p: '現状：制服が一般的だが、選択制の学校も出てきた', why: '第1段落の「変化」が文章の出発点。要約の導入として必要。' },
      { p: '賛成側の意見：時間・お金の節約、学校への帰属意識', why: '第2段落全体の主張。3つの具体例を「time and money」のように短くまとめる。' },
      { p: '反対側の意見：費用・着心地・個性を出せない', why: '第3段落の中心内容。賛否両方を入れることで本文の構成を正しく反映できる。' },
      { p: '結果：ルールを見直す学校が増えている', why: '最後の一文は文章の結論なので入れる。' }
    ],
    cut: ['pants or skirts, regardless of gender（具体例）', 'every morning（細部）', 'in hot or cold weather → uncomfortable にまとめる'],
    expressions: [['let A do', 'Aに〜させる'], ['Supporters say that 〜', '支持者は〜と言う'], ['point out that 〜', '〜と指摘する'], ['stop A from doing', 'Aが〜するのを妨げる'], ['express oneself', '自分を表現する']],
    structure: ['1文目：現状と変化', '2文目：賛成意見', '3文目：However＋反対意見', '4文目：So＋結果']
  },
  {
    id: 'ws03', theme: '環境', title: 'Food Waste',
    text: [
      'Every year, a large amount of food is thrown away around the world. In Japan alone, millions of tons of food that could still be eaten are wasted. This happens in homes, restaurants, and supermarkets.',
      'There are several causes of food waste. Many people buy more food than they need, and then they cannot finish it before it goes bad. Also, stores often throw away products that are close to their "best before" dates, even though the food is still safe to eat. Wasting food is bad for the environment because producing and transporting it uses a lot of energy and water.',
      'To solve this problem, some companies and groups have taken action. For example, some apps let stores sell unsold food at a discount, and food banks collect food from companies and give it to people in need. Experts say individuals can also help by planning their meals carefully.'
    ],
    ja: [
      '毎年、世界中で大量の食べ物が捨てられている。日本だけでも、まだ食べられる何百万トンもの食べ物が無駄にされている。これは家庭、レストラン、スーパーで起きている。',
      '食品ロスにはいくつかの原因がある。多くの人が必要以上に食べ物を買い、悪くなる前に食べきれない。また、店はまだ安全に食べられるにもかかわらず、賞味期限が近い商品をよく捨てる。食べ物を無駄にすることは環境に悪い。食べ物の生産と輸送には多くのエネルギーと水が使われるからだ。',
      'この問題を解決するために、行動を起こしている企業や団体がある。例えば、店が売れ残った食品を割引価格で売れるアプリがあり、フードバンクは企業から食べ物を集めて困っている人に配っている。専門家は、個人も食事を注意深く計画することで貢献できると言う。'
    ],
    model: 'A lot of food is wasted in Japan and around the world. This is because people buy too much and stores throw away food near its best-before date. Food waste harms the environment. To reduce it, some groups sell or give away extra food, and people can help by planning their meals.',
    modelJa: '日本や世界中で多くの食べ物が無駄にされている。これは、人々が買いすぎたり、店が賞味期限の近い食べ物を捨てたりするからだ。食品ロスは環境に害を与える。それを減らすため、余った食べ物を販売したり配ったりする団体があり、人々も食事を計画することで貢献できる。',
    points: [
      { p: '問題：大量の食べ物が捨てられている', why: '第1段落の主題。何の問題かを最初に示す。' },
      { p: '原因：買いすぎ・期限が近い商品の廃棄', why: '第2段落の中心。This is because 〜 で原因をまとめると論理が明確になる。' },
      { p: '影響：環境に悪い', why: 'なぜ問題なのかという理由づけ。短く1文で入れる。' },
      { p: '対策：企業・団体の取り組み＋個人の工夫', why: '第3段落の中心。具体的なアプリやフードバンクは「sell or give away extra food」に抽象化する。' }
    ],
    cut: ['In Japan alone, millions of tons（数字の詳細）', 'homes, restaurants, and supermarkets（場所の列挙）', 'producing and transporting it uses a lot of energy and water（理由の詳細 → harms the environment）', 'apps / food banks の具体的な説明'],
    expressions: [['This is because 〜', 'これは〜だからだ'], ['harm', '〜に害を与える'], ['To reduce 〜', '〜を減らすために'], ['give away', '〜を無料で配る'], ['extra', '余分な']],
    structure: ['1文目：問題提起', '2文目：原因（This is because）', '3文目：影響', '4文目：対策（To reduce it）']
  },
  {
    id: 'ws04', theme: '仕事', title: 'Working from Home',
    text: [
      'Since the early 2020s, many companies have allowed their employees to work from home. Thanks to the Internet and video meeting tools, people can now do many kinds of jobs without going to the office.',
      'Working from home has some clear benefits. Workers do not need to spend time commuting on crowded trains, so they have more time for their families and hobbies. Companies can also save money because they do not need large offices.',
      'However, working from home has some disadvantages, too. Some workers feel lonely because they rarely see their coworkers in person. It can also be difficult for managers to check how their team members are doing, and new employees may find it hard to learn their jobs. Because of this, many companies now use a mix of office work and remote work.'
    ],
    ja: [
      '2020年代初めから、多くの企業が従業員の在宅勤務を認めている。インターネットとビデオ会議ツールのおかげで、人々は今やオフィスに行かずに多くの種類の仕事ができる。',
      '在宅勤務には明らかな利点がある。労働者は混雑した電車で通勤する時間を使う必要がないので、家族や趣味のための時間が増える。企業も大きなオフィスが必要ないのでお金を節約できる。',
      'しかし、在宅勤務には欠点もある。同僚と直接会うことがめったにないので、孤独を感じる労働者もいる。また、管理者がチームメンバーの様子を確認するのが難しいこともあり、新入社員は仕事を覚えにくいと感じるかもしれない。このため、現在多くの企業がオフィス勤務とリモートワークを組み合わせている。'
    ],
    model: 'Many companies now let people work from home using the Internet. This saves workers time because they do not have to commute, and companies need smaller offices. On the other hand, workers may feel lonely, and it is harder to manage teams and train new staff. Therefore, many companies combine office and home working.',
    modelJa: '多くの企業がインターネットを使って在宅勤務をさせている。通勤しなくてよいので労働者は時間を節約でき、企業はより小さなオフィスで済む。一方で、労働者は孤独を感じることがあり、チームの管理や新人の育成も難しくなる。そのため、多くの企業がオフィス勤務と在宅勤務を組み合わせている。',
    points: [
      { p: 'テーマ：在宅勤務が広がっている', why: '第1段落の内容。年代やツール名は省いてテーマだけ示す。' },
      { p: '利点：通勤時間がなくなる・オフィス費用削減', why: '第2段落の中心。労働者と企業、両方の視点を1文にまとめる。' },
      { p: '欠点：孤独・管理と育成の難しさ', why: '第3段落の中心。On the other hand で対比を示す。' },
      { p: '結果：組み合わせる企業が多い', why: '文章の結論。最後に入れることで要約が完結する。' }
    ],
    cut: ['Since the early 2020s（時期の細部）', 'video meeting tools（具体例）', 'more time for their families and hobbies（利点の詳細）'],
    expressions: [['let A do', 'Aに〜させる'], ['commute', '通勤する'], ['On the other hand', '一方で'], ['manage', '〜を管理する'], ['combine A and B', 'AとBを組み合わせる']],
    structure: ['1文目：テーマ', '2文目：利点', '3文目：On the other hand＋欠点', '4文目：Therefore＋現状']
  },
  {
    id: 'ws05', theme: '社会', title: 'Akiya: Empty Houses',
    text: [
      'In Japan, the number of empty houses, called "akiya," has been increasing. Many of these houses are in rural areas, where the population is getting smaller and older. When elderly owners die or move into care homes, their children often live in cities and do not want to use the houses.',
      'Empty houses can cause problems for local communities. If nobody takes care of them, they become old and dangerous, and they may fall down in a strong earthquake. Some empty houses also make towns look less attractive, which can cause more people to leave.',
      'To deal with this situation, some local governments have created "akiya banks." These websites show empty houses that people can buy or rent at low prices. Some towns even give money to young families who move there and repair old houses. As a result, a few areas have succeeded in attracting new residents.'
    ],
    ja: [
      '日本では「空き家」と呼ばれる空いている家の数が増えている。こうした家の多くは人口が減少し高齢化している地方にある。高齢の所有者が亡くなったり介護施設に移ったりすると、子どもは都市に住んでいることが多く、家を使いたがらない。',
      '空き家は地域社会に問題を引き起こすことがある。誰も手入れをしなければ古く危険になり、強い地震で倒壊するかもしれない。また空き家があると町の魅力が下がり、さらに多くの人が出て行く原因にもなり得る。',
      'この状況に対処するため、「空き家バンク」を作った自治体がある。これらのウェブサイトでは、安い価格で買ったり借りたりできる空き家が紹介されている。移住して古い家を修理する若い家族にお金を出す町さえある。その結果、新しい住民を呼び込むことに成功した地域もある。'
    ],
    model: 'Empty houses are increasing in rural Japan as owners age and their children live in cities. They can become dangerous and make towns less attractive. To solve this, some local governments introduce empty houses at low prices online and support young families who move in, and this has brought new residents to some areas.',
    modelJa: '所有者が高齢になり子どもが都市に住んでいるため、日本の地方では空き家が増えている。これらの家は危険になったり、町の魅力を下げたりすることがある。これを解決するため、空き家をネットで安く紹介したり、移住する若い家族を支援したりする自治体があり、いくつかの地域では新しい住民が増えた。',
    points: [
      { p: '現状と原因：地方で空き家が増えている（高齢化・子は都市に）', why: '第1段落の中心。現状と原因を1文にまとめられる。' },
      { p: '問題：危険・町の魅力低下', why: '第2段落の中心。地震などの具体例は「dangerous」に含める。' },
      { p: '対策：空き家バンク・若い家族への支援', why: '第3段落の中心。固有名「akiya banks」は説明的に言い換えるとわかりやすい。' },
      { p: '結果：新住民が増えた地域もある', why: '対策の効果まで入れると内容が完結する。' }
    ],
    cut: ['care homes（細部）', 'fall down in a strong earthquake（具体例）', 'buy or rent（細部）'],
    expressions: [['because 〜', '〜なので'], ['To solve this', 'これを解決するために'], ['at low prices', '安い価格で'], ['support', '〜を支援する'], ['bring A to B', 'AをBにもたらす']],
    structure: ['1文目：現状＋原因', '2文目：問題', '3文目：対策＋結果']
  },
  {
    id: 'ws06', theme: '健康', title: 'Plant-Based Meat',
    text: [
      'Plant-based meat is food that looks and tastes like meat but is made from plants such as soybeans and peas. In the past, it was mainly eaten by vegetarians. Today, however, it is sold in many supermarkets and fast-food restaurants.',
      'One reason for its popularity is that many people are trying to eat more healthily. Plant-based meat usually contains less fat than beef or pork. Another reason is the environment. Raising cows and other animals requires a lot of land and water, and it produces large amounts of greenhouse gases.',
      'However, plant-based meat is not perfect. It is often more expensive than regular meat, and some people say it does not taste as good. In addition, some products contain a lot of salt and other additives. Experts say that people should check the labels carefully before buying.'
    ],
    ja: [
      '代替肉（プラントベースミート）は、肉のように見えて肉のような味がするが、大豆やエンドウ豆などの植物から作られた食品だ。かつては主に菜食主義者が食べていた。しかし今日では、多くのスーパーやファストフード店で売られている。',
      '人気の理由の一つは、多くの人がより健康的に食べようとしていることだ。代替肉はたいてい牛肉や豚肉より脂肪が少ない。もう一つの理由は環境だ。牛などの動物を育てるには多くの土地と水が必要で、大量の温室効果ガスを出す。',
      'しかし、代替肉は完璧ではない。普通の肉より高価なことが多く、それほどおいしくないと言う人もいる。さらに、塩分やその他の添加物を多く含む製品もある。専門家は、買う前にラベルを注意深く確認すべきだと言う。'
    ],
    model: 'Plant-based meat, which is made from plants but tastes like meat, has become widely available. People choose it because it is healthier and better for the environment than raising animals. However, it can be expensive and less tasty, and some products contain many additives, so experts advise checking labels.',
    modelJa: '植物から作られているが肉のような味がする代替肉は、広く手に入るようになった。動物を育てるより健康的で環境に良いので、人々はそれを選ぶ。しかし、高価でおいしくないこともあり、添加物を多く含む製品もあるので、専門家はラベルの確認を勧めている。',
    points: [
      { p: '定義と現状：植物から作られた肉が広まっている', why: '読者が「代替肉とは何か」を理解できるよう、定義と現状を1文で示す。' },
      { p: '人気の理由：健康・環境', why: '第2段落の2つの理由を1文にまとめる。具体的な脂肪の話や温室効果ガスは抽象化。' },
      { p: '問題点：価格・味・添加物', why: '第3段落の However 以降。対立する視点として必須。' },
      { p: '専門家の助言：ラベルを確認', why: '文章の締めくくり。語数に余裕があれば入れる。' }
    ],
    cut: ['soybeans and peas（具体例）', 'In the past, it was mainly eaten by vegetarians（過去の細部）', 'land and water / greenhouse gases（環境の詳細）'],
    expressions: [['be made from 〜', '〜から作られる'], ['widely available', '広く手に入る'], ['be better for 〜', '〜にとってより良い'], ['advise doing', '〜することを勧める']],
    structure: ['1文目：定義と現状', '2文目：理由', '3文目：However＋問題点＋助言']
  }
];

WRITING_DATA.opinion = [
  {
    id: 'wo01', theme: 'テクノロジー', topic: 'Some people say that high school students should be allowed to use smartphones during classes. Do you agree with this opinion?',
    topicJa: '高校生は授業中にスマートフォンを使うことを認められるべきだと言う人がいる。あなたはこの意見に賛成か。',
    points: ['Learning', 'Concentration', 'Safety'],
    model: {
      stance: 'disagree',
      text: 'I disagree with this opinion. First, smartphones can make it hard for students to concentrate. For example, if students receive messages from friends or see notifications from games, they may stop listening to their teachers. Second, schools already have computers and tablets for learning. These devices are set up only for studying, so students can search for information without being distracted by social media. For these reasons, I do not think high school students should be allowed to use smartphones during classes.',
      ja: '私はこの意見に反対だ。第一に、スマートフォンは生徒が集中するのを難しくする可能性がある。例えば、友人からメッセージを受け取ったりゲームの通知を見たりすると、先生の話を聞かなくなるかもしれない。第二に、学校にはすでに学習用のコンピューターやタブレットがある。これらの機器は勉強専用に設定されているので、生徒はソーシャルメディアに気を取られることなく情報を検索できる。これらの理由から、私は高校生が授業中にスマートフォンを使うことを認められるべきではないと思う。',
      reason1: '集中を妨げる（具体例：メッセージやゲームの通知）', reason2: '学校にはすでに学習専用の機器がある（だからスマホは不要）',
      expressions: [['make it hard for A to do', 'Aが〜するのを難しくする'], ['be distracted by 〜', '〜に気を取られる'], ['set up', '設定する']],
      structure: ['意見：I disagree with this opinion.', '理由1：集中できない＋For example', '理由2：代わりの機器がある＋説明', '結論：For these reasons, ...']
    },
    other: ['調べ物や辞書としてすぐに使える（Learning）', '災害時など緊急時に家族と連絡がとれる（Safety）', '将来に必要なデジタルスキルが身につく']
  },
  {
    id: 'wo02', theme: '環境', topic: 'Some people say that stores should stop giving out plastic bags for free. Do you agree with this opinion?',
    topicJa: '店はレジ袋を無料で配るのをやめるべきだと言う人がいる。あなたはこの意見に賛成か。',
    points: ['Environment', 'Cost', 'Customers\' habits'],
    model: {
      stance: 'agree',
      text: 'I agree with this opinion. First, it would help protect the environment. Many plastic bags are used only once and then thrown away, and some of them end up in the ocean, where they harm sea animals. Second, charging for bags changes people\'s habits. When people have to pay even a small amount of money, they start to bring their own bags. In fact, the number of plastic bags used in Japan decreased after stores began charging for them. For these reasons, I think stores should stop giving out free plastic bags.',
      ja: '私はこの意見に賛成だ。第一に、環境を守るのに役立つだろう。多くのレジ袋は一度だけ使われて捨てられ、その一部は海にたどり着き、海の動物に害を与える。第二に、袋を有料にすると人々の習慣が変わる。少しでもお金を払わなければならないと、人々は自分の袋を持ってくるようになる。実際、日本では店が袋を有料にし始めてから使われるレジ袋の数が減った。これらの理由から、私は店が無料のレジ袋を配るのをやめるべきだと思う。',
      reason1: '環境保護（一度で捨てられ、海の動物に害）', reason2: '有料化でエコバッグを持つ習慣がつく（実際に減った）',
      expressions: [['end up in 〜', '最終的に〜に行き着く'], ['charge for 〜', '〜の料金を取る'], ['In fact', '実際に']],
      structure: ['意見：I agree with this opinion.', '理由1：環境＋具体的な説明', '理由2：習慣の変化＋In fact で裏付け', '結論：For these reasons, ...']
    },
    other: ['袋を買い忘れた客にとって不便になる（Customers\' habits）', 'ごみ袋として再利用している家庭もある', '袋代が客の負担になる（Cost）']
  },
  {
    id: 'wo03', theme: '教育', topic: 'Do you think that more Japanese students will study abroad in the future?',
    topicJa: '将来、留学する日本人学生は増えると思うか。',
    points: ['Cost', 'Technology', 'Jobs'],
    model: {
      stance: 'agree',
      text: 'I think that more Japanese students will study abroad in the future. First, English and international experience are becoming more important for getting good jobs. Many companies do business with other countries, so they want workers who can communicate with people from different cultures. Second, it is becoming easier to get information about studying abroad. Students can use the Internet to find programs and scholarships, and they can talk with students overseas online before they go. For these reasons, I believe the number of students who study abroad will increase.',
      ja: '将来、留学する日本人学生は増えると思う。第一に、良い仕事に就くために英語と国際的な経験がより重要になってきている。多くの企業が他国と取引しているので、異なる文化の人々と意思疎通できる労働者を求めている。第二に、留学についての情報を得るのが簡単になってきている。学生はインターネットを使ってプログラムや奨学金を探せるし、行く前にオンラインで海外の学生と話すこともできる。これらの理由から、留学する学生の数は増えると思う。',
      reason1: '仕事で英語・国際経験が重要になっている（Jobs）', reason2: 'ネットで情報や奨学金を見つけやすい（Technology）',
      expressions: [['do business with 〜', '〜と取引する'], ['communicate with 〜', '〜と意思疎通する'], ['the number of 〜 will increase', '〜の数は増えるだろう']],
      structure: ['意見：I think that ...', '理由1：仕事＋説明', '理由2：情報の得やすさ＋具体例', '結論：For these reasons, ...']
    },
    other: ['留学費用が高く、円安で負担が増えている（Cost）', 'オンラインで海外の授業を受けられるので留学する必要が減る（Technology）', '国内でも英語を学ぶ機会が増えている']
  },
  {
    id: 'wo04', theme: '社会', topic: 'Some people say that the government should do more to help elderly people living alone. Do you agree with this opinion?',
    topicJa: '政府は一人暮らしの高齢者を助けるためにもっと多くのことをすべきだと言う人がいる。あなたはこの意見に賛成か。',
    points: ['Health', 'Safety', 'Community'],
    model: {
      stance: 'agree',
      text: 'I agree with this opinion. First, elderly people living alone may not get help quickly when they are sick or injured. If the government provides services such as regular visits by staff, problems can be found early, and lives can be saved. Second, many elderly people feel lonely. The government could support community centers where they can meet others and join activities like exercise classes. This would help them stay healthy both physically and mentally. For these reasons, I think the government should do more for elderly people living alone.',
      ja: '私はこの意見に賛成だ。第一に、一人暮らしの高齢者は病気やけがのときにすぐに助けを得られないかもしれない。政府がスタッフによる定期的な訪問などのサービスを提供すれば、問題を早く見つけることができ、命を救うことができる。第二に、多くの高齢者は孤独を感じている。政府は、彼らが他の人に会い、運動教室のような活動に参加できる地域センターを支援することができる。これは彼らが心身ともに健康でいる助けになるだろう。これらの理由から、政府は一人暮らしの高齢者のためにもっと多くのことをすべきだと思う。',
      reason1: '病気やけがのときに早く助けが必要（Safety / Health）', reason2: '孤独を防ぎ心身の健康を保つ（Community）',
      expressions: [['such as 〜', '〜のような'], ['lives can be saved', '命が救われる'], ['both physically and mentally', '心身ともに']],
      structure: ['意見：I agree with this opinion.', '理由1：安全＋具体的な対策', '理由2：孤独＋具体的な対策', '結論：For these reasons, ...']
    },
    other: ['家族や地域が支えるべきで、政府の負担（税金）が増えすぎる', 'ボランティアや民間サービスの方が柔軟に対応できる']
  },
  {
    id: 'wo05', theme: '仕事', topic: 'Some people say that more companies should allow their workers to work from home. Do you agree with this opinion?',
    topicJa: 'もっと多くの企業が従業員に在宅勤務を認めるべきだと言う人がいる。あなたはこの意見に賛成か。',
    points: ['Time', 'Communication', 'Family'],
    model: {
      stance: 'agree',
      text: 'I agree with this opinion. First, working from home saves a lot of time. Many workers in big cities spend more than an hour on crowded trains every day. If they do not have to commute, they can use that time to rest or study, and they may work more efficiently. Second, it makes it easier for people to balance work and family. For example, parents can be at home when their children come back from school. For these reasons, I think more companies should allow their workers to work from home.',
      ja: '私はこの意見に賛成だ。第一に、在宅勤務は多くの時間を節約する。大都市の多くの労働者は毎日1時間以上混雑した電車に乗っている。通勤しなくてよければ、その時間を休息や勉強に使えるし、より効率的に働けるかもしれない。第二に、仕事と家庭の両立がしやすくなる。例えば、親は子どもが学校から帰ってくるときに家にいることができる。これらの理由から、もっと多くの企業が従業員に在宅勤務を認めるべきだと思う。',
      reason1: '通勤時間がなくなり時間を有効に使える（Time）', reason2: '仕事と家庭を両立しやすい（Family）',
      expressions: [['balance A and B', 'AとBを両立させる'], ['efficiently', '効率的に'], ['make it easier for A to do', 'Aが〜しやすくする']],
      structure: ['意見：I agree with this opinion.', '理由1：時間＋具体的な数字', '理由2：家庭との両立＋For example', '結論：For these reasons, ...']
    },
    other: ['直接会わないとコミュニケーションが難しい（Communication）', '新入社員が仕事を学びにくい', '家だと仕事とプライベートの区別がつきにくい']
  },
  {
    id: 'wo06', theme: '健康', topic: 'Do you think that people should spend less time using the Internet?',
    topicJa: '人々はインターネットを使う時間を減らすべきだと思うか。',
    points: ['Health', 'Relationships', 'Information'],
    model: {
      stance: 'agree',
      text: 'I think people should spend less time using the Internet. First, using the Internet for long hours can be bad for our health. Looking at screens late at night makes it difficult to sleep well, and sitting for a long time can lead to back pain and weight gain. Second, spending too much time online can weaken real relationships. When family members look at their phones during dinner, they talk to each other less. For these reasons, I believe people should reduce the time they spend on the Internet.',
      ja: '人々はインターネットを使う時間を減らすべきだと思う。第一に、長時間インターネットを使うことは健康に悪い可能性がある。夜遅くに画面を見るとよく眠れなくなり、長時間座っていると腰痛や体重増加につながることがある。第二に、オンラインで過ごす時間が長すぎると、現実の人間関係が弱まる可能性がある。家族が夕食中に携帯電話を見ていると、互いに話すことが少なくなる。これらの理由から、人々はインターネットに費やす時間を減らすべきだと思う。',
      reason1: '健康に悪い（睡眠・腰痛・体重）', reason2: '現実の人間関係が弱まる（家族の会話が減る）',
      expressions: [['lead to 〜', '〜につながる'], ['weaken', '〜を弱める'], ['reduce the time S spend on 〜', '〜に費やす時間を減らす']],
      structure: ['意見：I think ...', '理由1：健康＋具体的な悪影響', '理由2：人間関係＋具体的な場面', '結論：For these reasons, ...']
    },
    other: ['ネットで役立つ情報や学習教材に簡単にアクセスできる（Information）', '遠くの家族や友人と連絡を取り合える（Relationships）']
  },
  {
    id: 'wo07', theme: '文化', topic: 'Some people say that Japan should accept more tourists from other countries. Do you agree with this opinion?',
    topicJa: '日本はもっと多くの外国人観光客を受け入れるべきだと言う人がいる。あなたはこの意見に賛成か。',
    points: ['Economy', 'Culture', 'Overcrowding'],
    model: {
      stance: 'agree',
      text: 'I agree with this opinion. First, tourists help the economy, especially in rural areas. When visitors stay at local hotels, eat at restaurants, and buy souvenirs, local businesses earn more money and new jobs are created. Second, tourism helps people from different countries understand each other. Visitors can learn about Japanese culture directly, and Japanese people can learn about other cultures by talking with them. However, it is important to spread tourists to many areas to avoid crowds. For these reasons, I think Japan should accept more tourists.',
      ja: '私はこの意見に賛成だ。第一に、観光客は特に地方の経済を助ける。旅行者が地元のホテルに泊まり、レストランで食事をし、お土産を買うと、地元の企業はより多くのお金を稼ぎ、新しい仕事が生まれる。第二に、観光は異なる国の人々が互いを理解する助けになる。旅行者は日本文化を直接学ぶことができ、日本人も彼らと話すことで他の文化について学べる。ただし、混雑を避けるために観光客を多くの地域に分散させることが大切だ。これらの理由から、日本はもっと多くの観光客を受け入れるべきだと思う。',
      reason1: '地方経済の活性化・雇用創出（Economy）', reason2: '異文化理解が深まる（Culture）',
      expressions: [['especially', '特に'], ['new jobs are created', '新しい仕事が生まれる'], ['understand each other', '互いを理解する']],
      structure: ['意見：I agree with this opinion.', '理由1：経済＋具体的な流れ', '理由2：文化交流＋説明', '補足：However で懸念への対策', '結論：For these reasons, ...']
    },
    other: ['観光地が混雑し住民の生活に影響が出る（Overcrowding）', 'ごみやマナーの問題が増える']
  },
  {
    id: 'wo08', theme: '教育', topic: 'Some people say that all high school students should do volunteer work. Do you agree with this opinion?',
    topicJa: 'すべての高校生はボランティア活動をすべきだと言う人がいる。あなたはこの意見に賛成か。',
    points: ['Experience', 'Community', 'Time'],
    model: {
      stance: 'agree',
      text: 'I agree with this opinion. First, volunteer work gives students valuable experiences that they cannot get in the classroom. For example, by helping at a nursing home, students can learn how to communicate with elderly people and understand the problems of an aging society. Second, volunteer work helps local communities. Many towns do not have enough people to clean parks or help at events, so students can make a big difference. For these reasons, I think all high school students should do volunteer work.',
      ja: '私はこの意見に賛成だ。第一に、ボランティア活動は生徒に教室では得られない貴重な経験を与える。例えば、老人ホームで手伝うことで、生徒は高齢者とのコミュニケーションの仕方を学び、高齢化社会の問題を理解できる。第二に、ボランティア活動は地域社会の助けになる。多くの町では公園の清掃やイベントの手伝いをする人が足りないので、生徒は大きな変化をもたらすことができる。これらの理由から、すべての高校生はボランティア活動をすべきだと思う。',
      reason1: '教室では得られない経験（Experience）', reason2: '地域社会の役に立つ（Community）',
      expressions: [['valuable', '貴重な'], ['aging society', '高齢化社会'], ['make a big difference', '大きな変化をもたらす']],
      structure: ['意見：I agree with this opinion.', '理由1：経験＋For example', '理由2：地域への貢献＋説明', '結論：For these reasons, ...']
    },
    other: ['勉強や部活動で忙しく時間がない（Time）', '強制されたボランティアは本来の意味を失う']
  }
];
