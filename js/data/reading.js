/* リーディング問題（すべてオリジナル。英検2級の形式・難易度・テーマを参考に作成）
 * short：大問1形式（短文の語句空所補充） q 内の "( )" が空所
 * long ：大問2/3形式（type: 'long' 長文空所補充 / 'content' 長文内容一致）
 *        paras 内の {1}{2}{3} が空所。qs[i] が空所 i+1 に対応（long の場合） */
var READING_DATA = { short: [], long: [] };

READING_DATA.short = [
  { id: 'rs01', theme: '環境', q: 'The city decided to ( ) the use of plastic bags in all supermarkets to protect the environment.', choices: ['ban', 'invite', 'mention', 'admire'], a: 0, ja: '市は環境を守るため、すべてのスーパーでレジ袋の使用を禁止することに決めた。', why: '「環境を守るため」にレジ袋の使用を「禁止する」が自然。ban は「〜を禁止する」。invite（招待する）、mention（言及する）、admire（称賛する）は文脈に合わない。', words: [['ban', '〜を禁止する'], ['protect', '〜を守る']] },
  { id: 'rs02', theme: '仕事', q: 'A: How was your job interview yesterday? B: I think it went well. The manager said I had the right ( ) for the position.', choices: ['experience', 'atmosphere', 'ceremony', 'shortage'], a: 0, ja: 'A：昨日の面接はどうだった？ B：うまくいったと思う。部長がその職に必要な経験を持っていると言ってくれたんだ。', why: '面接で評価されるのは「経験」。the right experience for the position で「その職にふさわしい経験」。', words: [['position', '職、地位'], ['experience', '経験']] },
  { id: 'rs03', theme: '健康', q: 'Doctors say that getting enough sleep can help ( ) many kinds of illnesses.', choices: ['prevent', 'pretend', 'predict', 'present'], a: 0, ja: '十分な睡眠をとることで多くの種類の病気を予防できると医者は言う。', why: '睡眠が病気を「防ぐ」という意味の prevent が正解。つづりの似た pretend（ふりをする）、predict（予測する）、present（贈る）に注意。', words: [['prevent', '〜を防ぐ'], ['illness', '病気']] },
  { id: 'rs04', theme: '教育', q: 'Kenta received a ( ) from the university, so he does not have to pay for most of his tuition.', choices: ['scholarship', 'membership', 'citizenship', 'friendship'], a: 0, ja: 'ケンタは大学から奨学金を受け取ったので、授業料のほとんどを払う必要がない。', why: '授業料を払わなくてよい理由は「奨学金」。scholarship が正解。', words: [['scholarship', '奨学金'], ['tuition', '授業料']] },
  { id: 'rs05', theme: '社会', q: 'Because of the heavy snow, the train was ( ) for more than two hours.', choices: ['delayed', 'decorated', 'defended', 'designed'], a: 0, ja: '大雪のため、電車は2時間以上遅れた。', why: 'Because of the heavy snow（大雪のため）という原因から、電車が「遅れた」が自然。be delayed で「遅れる」。', words: [['delay', '〜を遅らせる'], ['because of', '〜のために']] },
  { id: 'rs06', theme: 'テクノロジー', q: 'The new smartphone has a ( ) that lets users translate conversations in real time.', choices: ['feature', 'failure', 'fortune', 'furniture'], a: 0, ja: 'その新しいスマートフォンには、会話をリアルタイムで翻訳できる機能がある。', why: '製品の「機能・特徴」は feature。lets users 〜（ユーザーに〜させる）という説明が続くことからも判断できる。', words: [['feature', '特徴、機能'], ['translate', '〜を翻訳する']] },
  { id: 'rs07', theme: 'ビジネス', q: 'The company had to ( ) its prices because the cost of materials went up.', choices: ['raise', 'rise', 'arise', 'praise'], a: 0, ja: '材料費が上がったので、その会社は価格を上げなければならなかった。', why: '目的語 its prices をとるので他動詞 raise（〜を上げる）。rise は自動詞で目的語をとれない。', words: [['raise', '〜を上げる'], ['material', '材料']] },
  { id: 'rs08', theme: '日常', q: 'A: Excuse me, is this seat ( )? B: Yes, please sit down.', choices: ['available', 'valuable', 'responsible', 'reliable'], a: 0, ja: 'A：すみません、この席は空いていますか。 B：はい、どうぞお座りください。', why: '席が「利用できる＝空いている」は available。', words: [['available', '利用できる、空いている']] },
  { id: 'rs09', theme: '科学', q: 'The scientists ( ) an experiment to find out how the new medicine works.', choices: ['conducted', 'confessed', 'consumed', 'connected'], a: 0, ja: '科学者たちは新薬がどのように効くのかを調べるために実験を行った。', why: 'conduct an experiment で「実験を行う」。carry out an experiment も同じ意味。', words: [['conduct', '〜を行う'], ['experiment', '実験'], ['find out', '〜を調べる、知る']] },
  { id: 'rs10', theme: '環境', q: 'Many kinds of animals are losing their natural ( ) because forests are being cut down.', choices: ['habitats', 'habits', 'harvests', 'hobbies'], a: 0, ja: '森林が伐採されているため、多くの種類の動物が自然の生息地を失いつつある。', why: '森林伐採で動物が失うのは「生息地」habitat。habit（習慣）と混同しないように注意。', words: [['habitat', '生息地'], ['cut down', '〜を切り倒す']] },
  { id: 'rs11', theme: '日常', q: 'My computer suddenly stopped working, so I had to ( ) it to the store to get it repaired.', choices: ['take', 'make', 'give', 'keep'], a: 0, ja: 'パソコンが突然動かなくなったので、修理してもらうために店に持って行かなければならなかった。', why: 'take A to B で「AをBへ持っていく」。get it repaired は「それを修理してもらう」。', words: [['repair', '〜を修理する']] },
  { id: 'rs12', theme: '社会', q: 'The number of elderly people living alone is increasing, and many of them feel ( ).', choices: ['lonely', 'lovely', 'lively', 'likely'], a: 0, ja: '一人暮らしの高齢者の数が増えており、その多くが孤独を感じている。', why: '一人暮らしの高齢者が感じるのは「孤独」lonely。lively（活発な）、likely（ありそうな）はつづりが似ているので注意。', words: [['elderly', '高齢の'], ['lonely', '孤独な']] },
  { id: 'rs13', theme: '仕事', q: 'Ms. Sato is ( ) for training new employees at her company.', choices: ['responsible', 'comfortable', 'available', 'reasonable'], a: 0, ja: 'サトウさんは会社で新入社員の研修を担当している。', why: 'be responsible for 〜 で「〜に責任がある、〜を担当している」。', words: [['be responsible for', '〜に責任がある'], ['employee', '従業員']] },
  { id: 'rs14', theme: '教育', q: 'Before the test, the teacher ( ) the students that they could not use their dictionaries.', choices: ['reminded', 'remained', 'removed', 'repeated'], a: 0, ja: 'テストの前に、先生は生徒たちに辞書を使えないことを改めて伝えた。', why: 'remind A that 〜 で「Aに〜ということを思い出させる」。人＋that節をとれるのは remind。', words: [['remind', '〜に思い出させる']] },
  { id: 'rs15', theme: '旅行', q: 'If you want to stay at that popular hotel, you should make a ( ) at least two months before.', choices: ['reservation', 'conversation', 'population', 'situation'], a: 0, ja: 'その人気のホテルに泊まりたいなら、少なくとも2か月前には予約をすべきだ。', why: 'ホテルに泊まるために前もってするのは「予約」。make a reservation で「予約する」。', words: [['reservation', '予約'], ['at least', '少なくとも']] },
  { id: 'rs16', theme: '健康', q: 'After the accident, it took him six months to fully ( ) from his injuries.', choices: ['recover', 'discover', 'cover', 'uncover'], a: 0, ja: '事故の後、彼がけがから完全に回復するのに6か月かかった。', why: 'recover from 〜 で「〜から回復する」。', words: [['recover from', '〜から回復する'], ['injury', 'けが']] },
  { id: 'rs17', theme: 'ビジネス', q: 'The store offers a 20 percent ( ) to customers who bring their own bags.', choices: ['discount', 'account', 'amount', 'count'], a: 0, ja: 'その店は自分の袋を持参した客に20パーセントの割引をしている。', why: '20 percent と組み合わせて「割引」discount。', words: [['discount', '割引'], ['customer', '顧客']] },
  { id: 'rs18', theme: '文化', q: 'The festival has a long history. It ( ) back to the 15th century.', choices: ['dates', 'turns', 'gives', 'brings'], a: 0, ja: 'その祭りには長い歴史がある。15世紀にまでさかのぼる。', why: 'date back to 〜 で「（起源が）〜にさかのぼる」。', words: [['date back to', '〜にさかのぼる'], ['century', '世紀']] },
  { id: 'rs19', theme: '日常', q: 'We ran ( ) of milk, so I went to the convenience store to buy some.', choices: ['out', 'off', 'over', 'away'], a: 0, ja: '牛乳を切らしたので、コンビニに買いに行った。', why: 'run out of 〜 で「〜を使い果たす、切らす」。', words: [['run out of', '〜を使い果たす']] },
  { id: 'rs20', theme: '社会', q: 'The city council decided to put ( ) the decision about the new stadium until next year.', choices: ['off', 'on', 'up', 'out'], a: 0, ja: '市議会は新しいスタジアムに関する決定を来年まで延期することにした。', why: 'put off 〜 で「〜を延期する」。until next year（来年まで）がヒント。put on（着る）、put up（掲げる）、put out（消す）。', words: [['put off', '〜を延期する'], ['council', '議会']] },
  { id: 'rs21', theme: '教育', q: 'Jane could not ( ) out the answer to the math problem, so she asked her teacher for help.', choices: ['figure', 'check', 'point', 'carry'], a: 0, ja: 'ジェーンは数学の問題の答えがわからなかったので、先生に助けを求めた。', why: 'figure out 〜 で「〜を理解する、解き明かす」。', words: [['figure out', '〜を理解する、解決する']] },
  { id: 'rs22', theme: 'ビジネス', q: 'The two companies came ( ) with a new plan to reduce costs.', choices: ['up', 'down', 'off', 'across'], a: 0, ja: 'その2社は費用を削減する新たな計画を考え出した。', why: 'come up with 〜 で「〜を思いつく、考え出す」。come across は「偶然出会う」。', words: [['come up with', '〜を思いつく'], ['reduce', '〜を減らす']] },
  { id: 'rs23', theme: '環境', q: 'Using public transportation instead of driving can ( ) to cleaner air in cities.', choices: ['contribute', 'compete', 'complain', 'consist'], a: 0, ja: '車を運転する代わりに公共交通機関を使うことは、都市の空気をきれいにすることにつながる。', why: 'contribute to 〜 で「〜に貢献する、〜の一因となる」。', words: [['contribute to', '〜に貢献する'], ['instead of', '〜の代わりに']] },
  { id: 'rs24', theme: '日常', q: 'A: Can you ( ) after my cat while I am on vacation? B: Sure, I love cats.', choices: ['look', 'take', 'turn', 'put'], a: 0, ja: 'A：休暇中、私の猫の世話をしてもらえる？ B：もちろん、猫は大好きだよ。', why: 'look after 〜 で「〜の世話をする」（= take care of 〜）。', words: [['look after', '〜の世話をする']] },
  { id: 'rs25', theme: '仕事', q: 'Mr. Brown is in ( ) of the sales department, so please talk to him about the price.', choices: ['charge', 'change', 'chance', 'case'], a: 0, ja: 'ブラウンさんが営業部の担当なので、価格については彼と話してください。', why: 'in charge of 〜 で「〜を担当して」。', words: [['in charge of', '〜を担当して']] },
  { id: 'rs26', theme: '健康', q: 'My doctor told me to cut ( ) on salty food to lower my blood pressure.', choices: ['down', 'off', 'up', 'out'], a: 0, ja: '医者は血圧を下げるために塩辛い食べ物を減らすように言った。', why: 'cut down on 〜 で「〜（の量）を減らす」。', words: [['cut down on', '〜を減らす'], ['blood pressure', '血圧']] },
  { id: 'rs27', theme: '社会', q: 'More than 3,000 people took ( ) in the city marathon last Sunday.', choices: ['part', 'place', 'care', 'turns'], a: 0, ja: '先週の日曜日、3,000人以上が市民マラソンに参加した。', why: 'take part in 〜 で「〜に参加する」。take place は「行われる」で後ろに in 〜 の参加対象はとらない。', words: [['take part in', '〜に参加する']] },
  { id: 'rs28', theme: 'テクノロジー', q: 'It is important to keep your software up to ( ) to protect your computer from viruses.', choices: ['date', 'time', 'day', 'now'], a: 0, ja: 'ウイルスからパソコンを守るためには、ソフトウェアを最新の状態に保つことが重要だ。', why: 'up to date で「最新の」。keep A up to date で「Aを最新に保つ」。', words: [['up to date', '最新の'], ['protect A from B', 'AをBから守る']] },
  { id: 'rs29', theme: '心理・感情', q: 'Tom could not put up ( ) the noise from the construction site, so he moved to a new apartment.', choices: ['with', 'to', 'for', 'on'], a: 0, ja: 'トムは工事現場の騒音に我慢できなかったので、新しいアパートに引っ越した。', why: 'put up with 〜 で「〜を我慢する」。', words: [['put up with', '〜を我慢する'], ['construction', '建設']] },
  { id: 'rs30', theme: '教育', q: 'The students were asked to hand ( ) their reports by the end of the week.', choices: ['in', 'on', 'over', 'up'], a: 0, ja: '生徒たちは週末までにレポートを提出するよう求められた。', why: 'hand in 〜 で「〜を提出する」（= submit）。', words: [['hand in', '〜を提出する']] },
  { id: 'rs31', theme: '社会', q: 'The rumor about the famous singer ( ) out to be false.', choices: ['turned', 'took', 'brought', 'gave'], a: 0, ja: 'その有名な歌手についてのうわさは誤りだとわかった。', why: 'turn out to be 〜 で「〜だとわかる、判明する」。', words: [['turn out', '〜だとわかる'], ['rumor', 'うわさ']] },
  { id: 'rs32', theme: '仕事', q: 'Because she had a lot of work to do, Lisa ( ) down her friend\'s invitation to the party.', choices: ['turned', 'broke', 'cut', 'let'], a: 0, ja: 'やることがたくさんあったので、リサは友人からのパーティーの誘いを断った。', why: 'turn down 〜 で「〜を断る」。break down は「故障する」。', words: [['turn down', '〜を断る'], ['invitation', '招待']] },
  { id: 'rs33', theme: '日常', q: 'Please make ( ) that all the windows are closed before you leave.', choices: ['sure', 'clear', 'fine', 'safe'], a: 0, ja: '出かける前に、必ずすべての窓が閉まっていることを確かめてください。', why: 'make sure that 〜 で「〜を確かめる、必ず〜するようにする」。', words: [['make sure', '確かめる']] },
  { id: 'rs34', theme: '科学', q: 'According to recent research, people who walk regularly are less ( ) to suffer from heart disease.', choices: ['likely', 'lately', 'lonely', 'lively'], a: 0, ja: '最近の研究によると、定期的に歩く人は心臓病になる可能性が低い。', why: 'be likely to do で「〜しそうだ」。less likely to 〜 で「〜する可能性が低い」。', words: [['be likely to', '〜しそうだ'], ['according to', '〜によると']] },
  { id: 'rs35', theme: 'ビジネス', q: 'The new manager wants to take ( ) of the company\'s popularity among young people.', choices: ['advantage', 'attention', 'account', 'action'], a: 0, ja: '新しい部長は、会社の若者の間での人気を利用したいと考えている。', why: 'take advantage of 〜 で「〜を利用する」。', words: [['take advantage of', '〜を利用する'], ['popularity', '人気']] },
  { id: 'rs36', theme: '旅行', q: 'The flight was canceled ( ) to bad weather, so the passengers had to stay at the airport hotel.', choices: ['due', 'thanks', 'because', 'according'], a: 0, ja: '悪天候のためその便は欠航となり、乗客は空港のホテルに泊まらなければならなかった。', why: 'due to 〜 で「〜が原因で」。thanks to（〜のおかげで）は良い結果に使う。because は because of の形が必要。according to は「〜によると」。', words: [['due to', '〜が原因で'], ['passenger', '乗客']] },
  { id: 'rs37', theme: '環境', q: 'In order to save energy, the school ( ) solar panels on the roof of the gym.', choices: ['installed', 'invested', 'invented', 'invited'], a: 0, ja: 'エネルギーを節約するため、学校は体育館の屋根にソーラーパネルを設置した。', why: '屋根にソーラーパネルを「設置した」で install。invest（投資する）、invent（発明する）。', words: [['install', '〜を設置する'], ['in order to', '〜するために']] },
  { id: 'rs38', theme: '心理・感情', q: 'Although Yuki was ( ) before her speech, she spoke clearly and the audience loved it.', choices: ['nervous', 'generous', 'curious', 'serious'], a: 0, ja: 'ユキはスピーチの前に緊張していたが、はっきりと話し、聴衆はそれをとても気に入った。', why: 'Although（〜だけれども）があるので、後半の「はっきり話せた」と対照的な「緊張していた」が入る。', words: [['nervous', '緊張して'], ['audience', '聴衆']] },
  { id: 'rs39', theme: '社会', q: 'The government is trying to ( ) with the shortage of workers by hiring more people from overseas.', choices: ['deal', 'treat', 'handle', 'solve'], a: 0, ja: '政府は海外からより多くの人を雇うことで、労働者不足に対処しようとしている。', why: '後ろに with があるので deal with 〜（〜に対処する）。handle と solve は他動詞で with は不要。', words: [['deal with', '〜に対処する'], ['shortage', '不足']] },
  { id: 'rs40', theme: '教育', q: 'Studying abroad gave Mika the ( ) to make friends from many different countries.', choices: ['opportunity', 'operation', 'opposition', 'organization'], a: 0, ja: '留学はミカにさまざまな国の友達を作る機会を与えた。', why: 'the opportunity to do で「〜する機会」。', words: [['opportunity', '機会'], ['abroad', '海外で']] },
  { id: 'rs41', theme: '日常', q: 'A: I\'m sorry I\'m late. I ( ) into an old friend on the way here. B: That\'s OK.', choices: ['ran', 'got', 'went', 'looked'], a: 0, ja: 'A：遅れてごめんなさい。来る途中で昔の友人に偶然会ったの。 B：大丈夫だよ。', why: 'run into 〜 で「〜に偶然出会う」。', words: [['run into', '〜に偶然出会う']] },
  { id: 'rs42', theme: '仕事', q: 'Many workers prefer jobs with ( ) hours so that they can take care of their children.', choices: ['flexible', 'fragile', 'familiar', 'formal'], a: 0, ja: '多くの労働者は子どもの世話ができるよう、勤務時間に融通のきく仕事を好む。', why: '子育てと両立するための「柔軟な」勤務時間で flexible。', words: [['flexible', '柔軟な'], ['so that', '〜するために']] }
];

READING_DATA.long = [
  /* ---------- 大問2形式：長文の語句空所補充 ---------- */
  {
    id: 'rl01', type: 'long', theme: '環境', title: 'Edible Spoons',
    paras: [
      'Every year, billions of plastic spoons and forks are thrown away after being used only once. Most of them are not recycled, and many end up in the ocean. To solve this problem, some companies have started making spoons that people can eat. These spoons are made from flour, rice, and other grains, and they come in different flavors, such as sweet or spicy.',
      'Edible spoons have several advantages. They do not create any waste, and if people do not want to eat them, the spoons break down naturally in about a week. {1}, they can make a meal more fun. Some restaurants say that children are more excited about eating vegetables when they can eat the spoon afterward.',
      'However, edible spoons are not perfect. They cost more to produce than plastic ones, so many restaurants are not willing to use them. Also, if they are left in hot soup for a long time, they {2}. Because of this, the companies are now trying to find ways to make the spoons stronger. Experts believe that if the price {3}, edible spoons may become a common sight in the future.'
    ],
    qs: [
      { choices: ['In addition', 'In contrast', 'For this reason', 'Even so'], a: 0, why: '空所の前で「ごみを出さない」という利点、後ろで「食事を楽しくする」という別の利点を述べている。利点を追加するので In addition（さらに）。' },
      { choices: ['become soft', 'taste better', 'get colder', 'look bigger'], a: 0, why: '「エディブルスプーンは完璧ではない」という欠点の段落。直後に「だから会社はスプーンをもっと強くする方法を探している」とあるので、熱いスープに長く入れると「柔らかくなる」が自然。' },
      { choices: ['comes down', 'goes up', 'stays the same', 'is decided'], a: 0, why: '欠点として「プラスチックより高い」が挙げられている。普及するための条件なので「価格が下がれば」で comes down。' }
    ],
    ja: [
      '毎年、何十億本ものプラスチックのスプーンやフォークが一度使われただけで捨てられている。そのほとんどはリサイクルされず、多くが最終的に海へ流れ着く。この問題を解決するため、食べられるスプーンを作り始めた会社がある。これらのスプーンは小麦粉や米などの穀物から作られ、甘いものや辛いものなど、さまざまな味がある。',
      '食べられるスプーンにはいくつかの利点がある。ごみを一切出さず、もし食べたくなければ、約1週間で自然に分解される。さらに、食事をより楽しくすることもできる。子どもたちは後でスプーンを食べられると、野菜を食べることにもっとわくわくすると言うレストランもある。',
      'しかし、食べられるスプーンは完璧ではない。プラスチックのものより製造コストが高いため、多くのレストランは使いたがらない。また、熱いスープに長時間入れておくと柔らかくなってしまう。このため、会社は現在スプーンをより丈夫にする方法を探している。専門家は、価格が下がれば、食べられるスプーンは将来よく見かけるものになるかもしれないと考えている。'
    ],
    words: [['edible', '食べられる'], ['billion', '10億'], ['grain', '穀物'], ['flavor', '味、風味'], ['advantage', '利点'], ['produce', '〜を生産する'], ['expert', '専門家']],
    phrases: [['throw away', '〜を捨てる'], ['end up in', '最終的に〜に行き着く'], ['break down', '分解する'], ['be willing to', '〜するのをいとわない']]
  },
  {
    id: 'rl02', type: 'long', theme: '仕事', title: 'The Four-Day Workweek',
    paras: [
      'In many countries, people usually work five days a week. Recently, however, some companies have been testing a four-day workweek. In these tests, employees work for four days but receive the same salary as before. Many people were surprised at first because they thought that the companies would {1}.',
      'The results of the tests, though, have been positive. Most companies reported that their workers were just as productive as before. Employees said that having an extra day off allowed them to rest, spend time with their families, and enjoy their hobbies. As a result, they felt less stressed and {2}. Some companies also found that fewer workers quit their jobs.',
      'Still, a four-day workweek may not work for every business. For example, hospitals and stores need staff every day, so it is difficult for them to {3}. Experts say that each company should think carefully about whether the system suits the kind of work it does.'
    ],
    qs: [
      { choices: ['lose money', 'hire more people', 'become famous', 'move overseas'], a: 0, why: '「給料は同じで働く日数が減る」と聞いて人々が驚いた理由なので、「会社が損をする（お金を失う）」と考えたが自然。直後の段落の「しかし結果は良かった」とも対応する。' },
      { choices: ['more motivated at work', 'worried about money', 'too busy to relax', 'bored at home'], a: 0, why: '「休みが増えて休息できた→ストレスが減った」に続くので、良い変化である「仕事へのやる気が高まった」が正解。' },
      { choices: ['give workers an extra day off', 'pay their workers', 'open new shops', 'use computers'], a: 0, why: '病院や店は毎日スタッフが必要→「従業員に追加の休日を与える」のが難しい、という流れ。' }
    ],
    ja: [
      '多くの国では、人々は通常週5日働く。しかし最近、週4日勤務を試験的に導入する会社がある。これらの試験では、従業員は4日間働くが、以前と同じ給料を受け取る。最初は多くの人が驚いた。会社が損をするだろうと思ったからだ。',
      'しかし、試験の結果は良好だった。ほとんどの会社が、従業員の生産性は以前と変わらなかったと報告した。従業員は、休日が1日増えたことで休息をとり、家族と過ごし、趣味を楽しめたと述べた。その結果、ストレスが減り、仕事へのやる気が高まった。辞める従業員が減った会社もあった。',
      'それでも、週4日勤務はすべての業種でうまくいくとは限らない。例えば、病院や店は毎日スタッフが必要なので、従業員に追加の休日を与えるのは難しい。専門家は、それぞれの会社がその制度が自社の仕事に合っているかどうかを慎重に考えるべきだと言う。'
    ],
    words: [['employee', '従業員'], ['salary', '給料'], ['productive', '生産的な'], ['quit', '〜を辞める'], ['suit', '〜に合う']],
    phrases: [['day off', '休日'], ['as a result', 'その結果'], ['at first', '最初は']]
  },
  {
    id: 'rl03', type: 'long', theme: '科学', title: 'Why Do Cats Purr?',
    paras: [
      'Cats make a low, soft sound called purring. Many people believe that cats purr only when they are happy, such as when they are being petted. However, scientists have found that this is {1}. Cats also purr when they are hurt, sick, or giving birth.',
      'Some researchers think that purring may help cats {2}. The sound waves of purring are at a frequency that is known to help bones and muscles grow stronger. This might explain why cats tend to recover from injuries faster than many other animals.',
      'Purring may also be good for humans. One study found that cat owners had a lower risk of heart attacks than people who had never owned a cat. Although the reason is not clear, the researchers believe that spending time with a purring cat may {3}. More research is needed, but these findings suggest that cats give their owners more than just company.'
    ],
    qs: [
      { choices: ['not always true', 'a new discovery', 'an old tradition', 'easy to prove'], a: 0, why: '直後に「けがや病気のときにも喉を鳴らす」とあり、「幸せなときだけ」という考えを否定している。よって「いつも正しいわけではない」。' },
      { choices: ['heal their bodies', 'catch mice', 'find their owners', 'sleep longer'], a: 0, why: '次の文で「骨や筋肉を強くする周波数」「けがからの回復が早い」と説明しているので「体を治す」。' },
      { choices: ['reduce people\'s stress', 'make people hungry', 'increase people\'s weight', 'keep people awake'], a: 0, why: '心臓発作のリスクが低い理由として推測されているので、「人のストレスを減らす」が最も自然。' }
    ],
    ja: [
      '猫は「ゴロゴロ」という低く柔らかい音を出す。多くの人は、猫はなでられているときなど、うれしいときにだけ喉を鳴らすと信じている。しかし、科学者たちはこれがいつも正しいわけではないことを発見した。猫はけがをしたとき、病気のとき、出産のときにも喉を鳴らすのだ。',
      '喉を鳴らすことは猫が体を治すのに役立っているのかもしれないと考える研究者もいる。ゴロゴロという音の波は、骨や筋肉を強くするのに役立つことが知られている周波数なのだ。これは、猫がほかの多くの動物よりもけがから早く回復する傾向がある理由を説明するかもしれない。',
      '喉を鳴らすことは人間にも良いのかもしれない。ある研究では、猫の飼い主は猫を飼ったことのない人よりも心臓発作のリスクが低いことがわかった。理由ははっきりしないが、研究者たちは、喉を鳴らす猫と過ごすことが人のストレスを減らすのかもしれないと考えている。さらなる研究が必要だが、これらの発見は、猫が飼い主に単なる仲間以上のものを与えていることを示唆している。'
    ],
    words: [['purr', '（猫が）喉を鳴らす'], ['frequency', '周波数、頻度'], ['muscle', '筋肉'], ['injury', 'けが'], ['risk', '危険（性）'], ['suggest', '〜を示唆する']],
    phrases: [['give birth', '出産する'], ['tend to', '〜する傾向がある'], ['recover from', '〜から回復する']]
  },
  {
    id: 'rl04', type: 'long', theme: 'テクノロジー', title: 'Robots on the Farm',
    paras: [
      'Japan has a serious shortage of farmers. Many farmers are over 65 years old, and young people are not very interested in farming because the work is hard and the income is often low. {1}, the amount of farmland that is not used is increasing every year.',
      'To deal with this problem, engineers have been developing robots that can help farmers. Some robots can plant seeds, while others can pick fruit such as strawberries. Drones are also used to check the condition of crops from the sky. These machines can work for many hours without {2}, which means farmers can manage larger areas with fewer workers.',
      'However, farming robots are still very expensive, and many small farms cannot afford them. Some local governments now help farmers by {3}. They hope that new technology will make farming more attractive to young people.'
    ],
    qs: [
      { choices: ['As a result', 'On the other hand', 'For example', 'In the same way'], a: 0, why: '「農家が高齢化し、若者は農業に興味がない」→「使われていない農地が増えている」という原因と結果の関係なので As a result。' },
      { choices: ['getting tired', 'being cheap', 'using data', 'making noise'], a: 0, why: '機械が長時間働けるのは「疲れない」から。直後の「少ない人数で広い面積を管理できる」にもつながる。' },
      { choices: ['paying part of the cost', 'selling their land', 'teaching them English', 'building new roads'], a: 0, why: '直前の「ロボットは高価で小さな農家には買えない」という問題への支援策なので、「費用の一部を負担する」。' }
    ],
    ja: [
      '日本では農業従事者が深刻に不足している。多くの農家は65歳を超えており、仕事がきつく収入が低いことが多いため、若者はあまり農業に興味を持たない。その結果、使われていない農地の量が毎年増えている。',
      'この問題に対処するため、技術者たちは農家を手助けできるロボットを開発している。種をまくロボットもあれば、イチゴなどの果物を収穫するロボットもある。ドローンも空から作物の状態を確認するのに使われている。これらの機械は疲れることなく何時間も働けるので、農家はより少ない人数でより広い面積を管理できる。',
      'しかし、農業用ロボットはまだとても高価で、多くの小規模農家は購入する余裕がない。現在、費用の一部を負担することで農家を支援している地方自治体もある。彼らは新しい技術が農業を若者にとってより魅力的なものにすることを期待している。'
    ],
    words: [['shortage', '不足'], ['income', '収入'], ['farmland', '農地'], ['crop', '作物'], ['condition', '状態'], ['afford', '〜を買う余裕がある'], ['attractive', '魅力的な']],
    phrases: [['deal with', '〜に対処する'], ['such as', '〜のような'], ['be interested in', '〜に興味がある']]
  },
  {
    id: 'rl05', type: 'long', theme: '歴史', title: 'The History of Chocolate',
    paras: [
      'Today, chocolate is a sweet treat enjoyed by people around the world. However, when it was first made over 3,000 years ago in Central America, it was {1}. People there mixed cacao beans with water and spices to make a bitter drink. It was often used in religious ceremonies.',
      'Cacao beans were so valuable that they were even used as money. For instance, a rabbit could be bought for about 10 beans. When Spanish explorers arrived in the 16th century, they took cacao back to Europe. At first, Europeans did not like the bitter taste, so they {2}. The sweet drink soon became popular among rich people.',
      'In the 19th century, new machines made it possible to produce solid chocolate cheaply. {3}, chocolate was no longer a luxury for the rich, and ordinary people could also enjoy it. Now, the chocolate industry is worth billions of dollars.'
    ],
    qs: [
      { choices: ['very different', 'already sweet', 'sold in shops', 'eaten by children'], a: 0, why: '後に「苦い飲み物だった」とあり、現在の甘いお菓子とは「とても違っていた」。' },
      { choices: ['added sugar to it', 'stopped drinking it', 'used it as medicine', 'grew it at home'], a: 0, why: '苦い味が好まれなかった→次の文で「甘い飲み物」になったので、「砂糖を加えた」。' },
      { choices: ['Because of this', 'Even so', 'In contrast', 'On the other hand'], a: 0, why: '「安く固形チョコレートを作れるようになった」ことが原因で「一般の人も楽しめるようになった」という因果関係。' }
    ],
    ja: [
      '今日、チョコレートは世界中の人々に楽しまれている甘いお菓子だ。しかし、3,000年以上前に中央アメリカで初めて作られたとき、それはまったく違うものだった。そこの人々はカカオ豆を水や香辛料と混ぜて苦い飲み物を作っていた。それはしばしば宗教的な儀式で使われた。',
      'カカオ豆はとても貴重だったので、お金としてさえ使われた。例えば、ウサギ1匹が約10粒の豆で買えた。16世紀にスペインの探検家たちが到着すると、彼らはカカオをヨーロッパに持ち帰った。最初、ヨーロッパの人々は苦い味を好まなかったので、砂糖を加えた。その甘い飲み物はすぐに裕福な人々の間で人気になった。',
      '19世紀になると、新しい機械によって固形のチョコレートを安く生産できるようになった。このため、チョコレートはもはやお金持ちのぜいたく品ではなくなり、一般の人々も楽しめるようになった。現在、チョコレート産業には何十億ドルもの価値がある。'
    ],
    words: [['treat', 'ごちそう、お菓子'], ['religious', '宗教の'], ['valuable', '貴重な'], ['explorer', '探検家'], ['solid', '固形の'], ['luxury', 'ぜいたく品'], ['ordinary', '普通の']],
    phrases: [['for instance', '例えば'], ['make it possible to', '〜することを可能にする'], ['no longer', 'もはや〜ない']]
  },
  {
    id: 'rl06', type: 'long', theme: '教育', title: 'Learning Outside the Classroom',
    paras: [
      'In some schools in Northern Europe, children spend a large part of the school day outdoors. Even in winter, they study math, science, and language in forests and parks. Teachers believe that learning outside {1}. For example, children can learn about plants by touching real leaves instead of looking at pictures in a textbook.',
      'Studies have shown that outdoor learning has other benefits as well. Children who spend more time outside tend to be more active and get sick less often. They also seem to {2}. In one study, students who had lessons outdoors were able to focus better when they returned to the classroom.',
      'Some parents, however, worry about safety. They are afraid that their children may get hurt or catch colds. To {3}, schools make sure that teachers are trained in first aid and that children wear proper clothes for the weather.'
    ],
    qs: [
      { choices: ['makes lessons more real', 'is too difficult', 'costs a lot of money', 'is only for older children'], a: 0, why: '直後の例「教科書の写真ではなく本物の葉に触れて学ぶ」から、「授業をより現実的・実感のあるものにする」。' },
      { choices: ['concentrate better', 'need more sleep', 'dislike school', 'forget things'], a: 0, why: '次の文で「教室に戻ったときによく集中できた」と具体例が示されている。' },
      { choices: ['reduce these concerns', 'save money', 'attract more students', 'win the contest'], a: 0, why: '保護者の安全面の心配に対して「応急手当の訓練」「天候に合った服装」で対応しているので、「こうした心配を減らすために」。' }
    ],
    ja: [
      '北欧の一部の学校では、子どもたちは授業時間の大部分を屋外で過ごす。冬でさえ、森や公園で算数、理科、言語を学ぶ。教師たちは、外で学ぶことが授業をより実感のあるものにすると信じている。例えば、子どもたちは教科書の写真を見る代わりに本物の葉に触れて植物について学ぶことができる。',
      '研究によると、屋外学習にはほかにも利点がある。外で長く過ごす子どもはより活動的で、病気になりにくい傾向がある。また、よりよく集中できるようだ。ある研究では、屋外で授業を受けた生徒は教室に戻ったときによりよく集中することができた。',
      'しかし、安全を心配する保護者もいる。子どもがけがをしたり風邪をひいたりするのではないかと恐れているのだ。こうした心配を減らすために、学校は教師が応急手当の訓練を受け、子どもたちが天候に合った適切な服装をするよう徹底している。'
    ],
    words: [['outdoors', '屋外で'], ['benefit', '利点'], ['active', '活動的な'], ['focus', '集中する'], ['proper', '適切な']],
    phrases: [['instead of', '〜の代わりに'], ['as well', '〜もまた'], ['first aid', '応急手当'], ['make sure that', '〜を確実にする']]
  },

  /* ---------- 大問3形式：長文の内容一致選択 ---------- */
  {
    id: 'rc01', type: 'content', format: 'email', theme: '学校', title: 'School Festival Volunteers',
    email: { from: 'Emma Clark <e-clark@greenhill-high.edu>', to: 'All Students <students@greenhill-high.edu>', date: 'September 10', subject: 'Volunteers for the School Festival' },
    paras: [
      'Dear students,',
      'As you know, our school festival will be held on October 15. This year, we are planning to invite people from the local community, including elderly residents from the nursing home near our school. We expect more than 1,000 visitors, so we need volunteers to help on the day of the festival.',
      'Volunteers will guide visitors around the school, help at the food stands, and clean up after the festival. We are especially looking for students who can speak English or Chinese, because some international students from the nearby university will also come. If you are interested, please fill out the form at the student office by September 20.',
      'There will be a short meeting for all volunteers on October 8 after school in the library. At the meeting, we will explain your jobs and give you a festival T-shirt. If you cannot come to the meeting, please tell me in advance. I hope many of you will join us!',
      'Emma Clark, Student Council Teacher'
    ],
    qs: [
      { q: 'What is different about this year\'s school festival?', choices: ['People from the local community will be invited.', 'It will be held at the nursing home.', 'It will be held for two days.', 'Only students can join it.'], a: 0, why: '第2段落「今年は地域の人々を招待する予定」とある。This year がヒント。' },
      { q: 'Why are students who can speak English or Chinese needed?', choices: ['Students from a nearby university will visit.', 'They will teach a language class.', 'They will write the festival guide.', 'They will sell food from other countries.'], a: 0, why: '第3段落「近くの大学から留学生も来るため」。international students from the nearby university の言い換え。' },
      { q: 'What should students do if they cannot attend the meeting?', choices: ['Tell Ms. Clark before the meeting.', 'Go to the library on October 15.', 'Fill out another form.', 'Buy a festival T-shirt.'], a: 0, why: '第4段落「来られない場合は前もって私に伝えて」。in advance = before the meeting と言い換えられている。' }
    ],
    ja: [
      '生徒の皆さんへ',
      'ご存じのとおり、本校の文化祭は10月15日に開催されます。今年は、学校の近くにある老人ホームの高齢の入居者を含め、地域の方々を招待する予定です。1,000人以上の来場者を見込んでいるので、文化祭当日に手伝ってくれるボランティアが必要です。',
      'ボランティアは来場者の校内案内、食べ物の屋台の手伝い、文化祭後の片付けを行います。近くの大学から留学生も来るので、特に英語か中国語を話せる生徒を探しています。興味のある人は、9月20日までに生徒会室で用紙に記入してください。',
      '10月8日の放課後、図書館でボランティア全員のための短いミーティングを行います。ミーティングでは仕事内容を説明し、文化祭Tシャツを配ります。ミーティングに来られない場合は、前もって私に知らせてください。たくさんの人が参加してくれることを願っています！',
      '生徒会担当教員　エマ・クラーク'
    ],
    words: [['resident', '住民'], ['nursing home', '老人ホーム'], ['volunteer', 'ボランティア'], ['especially', '特に'], ['international student', '留学生']],
    phrases: [['fill out', '〜に記入する'], ['in advance', '前もって'], ['clean up', '片付ける']]
  },
  {
    id: 'rc02', type: 'content', format: 'email', theme: 'ビジネス', title: 'Your Order',
    email: { from: 'Green Garden Shop <support@greengarden.com>', to: 'Daniel Lee <d-lee@mailbox.com>', date: 'May 3', subject: 'About your recent order' },
    paras: [
      'Dear Mr. Lee,',
      'Thank you for ordering from Green Garden Shop. We are writing to tell you about a problem with your order. You ordered two tomato plants and a large flower pot. Unfortunately, the flower pot you chose is currently out of stock because our supplier had trouble delivering it to us.',
      'We expect to receive more pots in about two weeks. If you would like to wait, we will send the tomato plants now and the pot as soon as it arrives. Because of the delay, we will not charge you for delivery. Alternatively, you can choose a different pot from our website. We have a similar pot in blue, which is available now and is the same price.',
      'Please reply to this e-mail by May 7 and let us know which option you prefer. If we do not hear from you by then, we will cancel the pot and give you a full refund for it. We are very sorry for any inconvenience.',
      'Sincerely, Karen Wood, Customer Service'
    ],
    qs: [
      { q: 'What is the problem with Mr. Lee\'s order?', choices: ['The flower pot is not available right now.', 'The tomato plants were damaged.', 'He paid the wrong price.', 'His address was incorrect.'], a: 0, why: '第2段落「選んだ植木鉢は現在在庫切れ」。out of stock = not available right now。' },
      { q: 'If Mr. Lee decides to wait for the pot, he will', choices: ['not have to pay for delivery.', 'receive a blue pot.', 'get a discount on the plants.', 'have to order the plants again.'], a: 0, why: '第3段落「遅れのため配送料は請求しない」。not charge you for delivery の言い換え。' },
      { q: 'What will happen if Mr. Lee does not reply by May 7?', choices: ['He will get his money back for the pot.', 'The shop will send him a different pot.', 'The whole order will be canceled.', 'He will receive a phone call.'], a: 0, why: '第4段落「返事がなければ植木鉢はキャンセルし、その分を全額返金する」。植木鉢だけなので whole order ではない点に注意。' }
    ],
    ja: [
      'リー様',
      'グリーン・ガーデン・ショップでご注文いただきありがとうございます。ご注文について問題がありましたのでご連絡いたします。お客様はトマトの苗2つと大きな植木鉢1つをご注文されました。あいにく、お選びいただいた植木鉢は、仕入れ先からの配送に問題があったため、現在在庫切れとなっております。',
      '約2週間後に植木鉢が追加で入荷する見込みです。お待ちいただける場合は、トマトの苗を先にお送りし、植木鉢は到着しだいお送りします。遅れのお詫びとして配送料は請求いたしません。または、当店のウェブサイトから別の植木鉢をお選びいただくこともできます。似たような青い植木鉢があり、こちらはすぐにご用意でき、価格も同じです。',
      '5月7日までにこのメールにご返信いただき、どちらをご希望かお知らせください。それまでにご連絡がない場合は、植木鉢をキャンセルし、その代金を全額返金いたします。ご不便をおかけし誠に申し訳ございません。',
      'カスタマーサービス　カレン・ウッド'
    ],
    words: [['unfortunately', 'あいにく'], ['supplier', '供給業者'], ['charge', '（料金を）請求する'], ['alternatively', '代わりに'], ['refund', '返金'], ['inconvenience', '不便']],
    phrases: [['out of stock', '在庫切れで'], ['as soon as', '〜するとすぐに'], ['hear from', '〜から連絡がある']]
  },
  {
    id: 'rc03', type: 'content', format: 'article', theme: '社会', title: 'Little Free Libraries',
    paras: [
      'In 2009, a man in the United States built a small wooden box that looked like a schoolhouse and put it in front of his home. He filled it with books and put up a sign that said "Free Books." He wanted to remember his late mother, who had been a teacher and loved reading. His neighbors loved the idea, and soon they started taking books and leaving their own.',
      'The idea quickly spread. People began building similar boxes in their own neighborhoods, and the movement became known as "Little Free Libraries." The rule is simple: take a book, leave a book. Today, there are more than 150,000 of these small libraries in over 100 countries. Some are made from old refrigerators or phone booths, and many are decorated with colorful paintings.',
      'Supporters say that Little Free Libraries do more than just share books. In areas where there are no public libraries or bookstores nearby, they give children a chance to read. They also help neighbors meet and talk to each other. Some owners say they have made new friends by chatting with people who stop by their library.',
      'However, not everyone is happy about them. Some public librarians worry that cities may use them as an excuse to cut library budgets. Others point out that the books in the boxes are sometimes old or in poor condition. Still, many people believe that these small libraries are a simple way to build a stronger community.'
    ],
    qs: [
      { q: 'Why did the man build the first Little Free Library?', choices: ['To honor his mother, who loved books.', 'To sell old books to his neighbors.', 'To advertise his new school.', 'To protest against closing a library.'], a: 0, why: '第1段落「読書が好きだった亡き母を偲びたかった」。remember his late mother → honor his mother の言い換え。' },
      { q: 'What is one rule of Little Free Libraries?', choices: ['People should leave a book when they take one.', 'Only children can borrow books.', 'Books must be returned within a week.', 'Each box must look like a school.'], a: 0, why: '第2段落 The rule is simple: take a book, leave a book.' },
      { q: 'According to supporters, Little Free Libraries', choices: ['help people in a neighborhood communicate.', 'make money for public libraries.', 'are better than public libraries.', 'are only popular in big cities.'], a: 0, why: '第3段落「近所の人々が出会い、話す手助けにもなる」。' },
      { q: 'What is one concern that some librarians have?', choices: ['Cities might spend less money on public libraries.', 'People might steal books from libraries.', 'The boxes might take away their jobs at schools.', 'Children might stop reading new books.'], a: 0, why: '第4段落「市がそれを図書館予算削減の口実に使うかもしれない」。cut library budgets → spend less money on public libraries。' },
      { q: 'Which of the following statements is true?', choices: ['Some Little Free Libraries are made from old phone booths.', 'The first box was built by a teacher.', 'There are Little Free Libraries in only ten countries.', 'All the books in the boxes are new.'], a: 0, why: '第2段落「古い冷蔵庫や電話ボックスで作られたものもある」。教師だったのは男性の母親。100か国以上にある。本は古いこともある。' }
    ],
    ja: [
      '2009年、アメリカのある男性が校舎のような形の小さな木箱を作り、自宅の前に置いた。彼はそれを本でいっぱいにし、「無料の本」と書いた看板を立てた。教師で読書が大好きだった亡き母を偲びたかったのだ。近所の人々はこのアイデアを気に入り、すぐに本を持って行ったり自分の本を置いていったりし始めた。',
      'このアイデアはすぐに広まった。人々は自分の地域にも同じような箱を作り始め、この運動は「リトル・フリー・ライブラリー」として知られるようになった。ルールは簡単で、本を1冊取ったら1冊置いていく、というものだ。今日では、100か国以上に15万以上のこうした小さな図書館がある。古い冷蔵庫や電話ボックスで作られたものもあり、多くはカラフルな絵で飾られている。',
      '支持者たちは、リトル・フリー・ライブラリーは本を共有する以上のことをしていると言う。近くに公共図書館や書店がない地域では、子どもたちに読書の機会を与えている。また、近所の人々が出会い、話す手助けにもなっている。立ち寄った人とおしゃべりして新しい友達ができたという持ち主もいる。',
      'しかし、誰もがそれを喜んでいるわけではない。一部の公共図書館の司書は、市がそれを図書館予算削減の口実にするかもしれないと心配している。箱の中の本が古かったり状態が悪かったりすることがあると指摘する人もいる。それでも多くの人は、この小さな図書館がより強い地域社会を築く簡単な方法だと信じている。'
    ],
    words: [['late', '亡くなった'], ['spread', '広まる'], ['movement', '運動'], ['decorate', '〜を飾る'], ['supporter', '支持者'], ['excuse', '口実'], ['budget', '予算']],
    phrases: [['put up', '〜を掲げる'], ['stop by', '立ち寄る'], ['point out', '〜を指摘する'], ['in poor condition', '状態が悪い']]
  },
  {
    id: 'rc04', type: 'content', format: 'article', theme: '自然', title: 'The Return of the Wolves',
    paras: [
      'Yellowstone National Park in the United States is famous for its beautiful nature and wildlife. However, in the early 20th century, wolves in the park were killed because people believed they were dangerous to farm animals. By 1926, there were no wolves left in Yellowstone.',
      'Without wolves, the number of elk, a kind of large deer, increased greatly. The elk ate so many young trees and plants near rivers that these areas began to lose their plants. As a result, birds and beavers that depended on the trees had fewer places to live, and the riverbanks were damaged because there were no roots to hold the soil.',
      'In 1995, scientists brought 31 wolves from Canada to Yellowstone. The wolves hunted the elk, and the elk began to avoid open areas near rivers where they could easily be seen. Gradually, trees grew back along the rivers. Beavers returned and built dams, which created new habitats for fish and birds.',
      'This series of changes is called a "trophic cascade," which means that changes at the top of the food chain affect the whole ecosystem. Not all scientists agree on how much of the change was caused by wolves, because other factors such as weather also played a role. Still, the story of Yellowstone shows how important a single species can be.'
    ],
    qs: [
      { q: 'Why were the wolves in Yellowstone killed in the early 20th century?', choices: ['People thought they were a danger to farm animals.', 'They were eating all the trees in the park.', 'There were too many of them in Canada.', 'Scientists needed them for research.'], a: 0, why: '第1段落「家畜にとって危険だと信じられていたため」。' },
      { q: 'What happened after the wolves disappeared?', choices: ['Elk ate many of the plants near rivers.', 'Beavers built more dams.', 'The number of elk decreased.', 'More trees grew along the rivers.'], a: 0, why: '第2段落「エルクが川の近くの若木や植物を大量に食べた」。' },
      { q: 'How did the wolves help the trees grow back?', choices: ['They caused elk to stay away from areas near rivers.', 'They carried seeds to new places.', 'They hunted beavers that damaged trees.', 'They made the soil richer.'], a: 0, why: '第3段落「エルクが見つかりやすい川の近くの開けた場所を避けるようになった」→木が再び育った。' },
      { q: 'Why do some scientists disagree about the story?', choices: ['Other things like weather may also have caused the changes.', 'The wolves did not come from Canada.', 'They think there were never any elk in the park.', 'The number of wolves was too small to study.'], a: 0, why: '第4段落「天候など他の要因も影響したため、どれほどがオオカミによるものか意見が分かれる」。' }
    ],
    ja: [
      'アメリカのイエローストーン国立公園は、美しい自然と野生生物で有名だ。しかし20世紀初め、家畜にとって危険だと信じられていたため、公園のオオカミは殺された。1926年までにイエローストーンにはオオカミが1頭もいなくなった。',
      'オオカミがいなくなると、大型のシカの一種であるエルクの数が大幅に増えた。エルクが川の近くの若木や植物をあまりにも多く食べたので、これらの地域は植物を失い始めた。その結果、木に頼っていた鳥やビーバーのすみかが減り、土をつなぎとめる根がなくなったために川岸が損なわれた。',
      '1995年、科学者たちはカナダから31頭のオオカミをイエローストーンに連れてきた。オオカミはエルクを狩り、エルクは見つかりやすい川の近くの開けた場所を避けるようになった。徐々に川沿いに木が再び育った。ビーバーが戻ってきてダムを作り、それが魚や鳥の新しい生息地を生み出した。',
      'この一連の変化は「栄養カスケード」と呼ばれ、食物連鎖の頂点での変化が生態系全体に影響を与えることを意味する。天候など他の要因も役割を果たしたため、変化のどれほどがオオカミによって引き起こされたのかについて、すべての科学者の意見が一致しているわけではない。それでも、イエローストーンの話は、たった一つの種がいかに重要になり得るかを示している。'
    ],
    words: [['wildlife', '野生生物'], ['elk', 'エルク（大型のシカ）'], ['riverbank', '川岸'], ['soil', '土'], ['habitat', '生息地'], ['ecosystem', '生態系'], ['species', '種'], ['factor', '要因']],
    phrases: [['depend on', '〜に頼る'], ['as a result', 'その結果'], ['food chain', '食物連鎖'], ['play a role', '役割を果たす']]
  },
  {
    id: 'rc05', type: 'content', format: 'article', theme: '健康', title: 'The Power of Napping',
    paras: [
      'In many countries, taking a nap during the day is seen as a sign of laziness. However, recent research suggests that short naps can be good for both the body and the mind. Some companies in Japan and the United States have even created special rooms where employees can sleep for a short time during work hours.',
      'According to studies, a nap of 15 to 20 minutes can improve memory, mood, and concentration. One study by a space agency found that pilots who took a 26-minute nap performed 34 percent better than those who did not. Short naps may also reduce the risk of accidents caused by sleepiness, especially among drivers and factory workers.',
      'However, the length of the nap is important. If people sleep for more than 30 minutes, they may enter a deep sleep. Waking up from deep sleep often makes people feel more tired than before. Long naps in the late afternoon can also make it difficult to fall asleep at night.',
      'Experts recommend taking a nap in the early afternoon, when many people naturally feel sleepy after lunch. Some people even drink a cup of coffee just before napping. Because caffeine takes about 20 minutes to work, they wake up feeling especially refreshed. Still, experts say naps should not be used to replace a good night\'s sleep.'
    ],
    qs: [
      { q: 'What have some companies done?', choices: ['Made rooms where workers can take short naps.', 'Stopped workers from sleeping at their desks.', 'Asked workers to come to work earlier.', 'Given workers longer lunch breaks.'], a: 0, why: '第1段落「従業員が短時間眠れる特別な部屋を作った」。' },
      { q: 'What did the study of pilots show?', choices: ['A short nap improved their performance.', 'Pilots need more than eight hours of sleep.', 'Napping caused more accidents.', 'Pilots who did not nap remembered more.'], a: 0, why: '第2段落「26分の昼寝をしたパイロットは34%成績が良かった」。' },
      { q: 'Why should people avoid napping for more than 30 minutes?', choices: ['They may feel more tired after waking up.', 'They may miss lunch.', 'Their memory will become worse.', 'They will need to drink coffee.'], a: 0, why: '第3段落「深い眠りに入り、起きると以前より疲れを感じる」。' },
      { q: 'Why do some people drink coffee just before napping?', choices: ['The caffeine starts working when they wake up.', 'It helps them fall asleep quickly.', 'It replaces a good night\'s sleep.', 'It makes their naps longer.'], a: 0, why: '第4段落「カフェインは効くのに約20分かかるので、起きたときにすっきりする」。' }
    ],
    ja: [
      '多くの国で、日中に昼寝をすることは怠けている証拠と見なされている。しかし、最近の研究は、短い昼寝が体と心の両方に良いことを示唆している。日本やアメリカの一部の企業は、勤務時間中に従業員が短時間眠れる特別な部屋まで作っている。',
      '研究によると、15〜20分の昼寝は記憶力、気分、集中力を向上させることができる。ある宇宙機関の研究では、26分間の昼寝をしたパイロットは、しなかったパイロットより34%成績が良かった。短い昼寝は、特に運転手や工場労働者の間で、眠気による事故の危険を減らすかもしれない。',
      'しかし、昼寝の長さが重要だ。30分以上眠ると、深い眠りに入ることがある。深い眠りから目覚めると、以前より疲れを感じることが多い。夕方の長い昼寝は夜の寝つきを悪くすることもある。',
      '専門家は、多くの人が昼食後に自然と眠くなる午後の早い時間に昼寝をすることを勧めている。昼寝の直前にコーヒーを1杯飲む人さえいる。カフェインが効くまで約20分かかるため、特にすっきりした気分で目覚めるのだ。それでも専門家は、昼寝で夜の十分な睡眠を代用すべきではないと言う。'
    ],
    words: [['nap', '昼寝'], ['laziness', '怠惰'], ['concentration', '集中力'], ['agency', '機関'], ['perform', '成果を上げる'], ['refreshed', 'すっきりした'], ['replace', '〜に取って代わる']],
    phrases: [['fall asleep', '眠りに落ちる'], ['according to', '〜によると'], ['be seen as', '〜と見なされる']]
  },
  {
    id: 'rc06', type: 'content', format: 'article', theme: 'テクノロジー', title: 'Cashless Societies',
    paras: [
      'In recent years, more and more people have been paying for things with smartphones and cards instead of cash. In Sweden, for example, fewer than 10 percent of payments in stores are made with cash. Many shops and even some banks in the country no longer accept coins or paper money.',
      'There are several reasons for this change. Cashless payments are fast and convenient, and people do not need to carry a wallet. Businesses also benefit because they do not have to count money or worry about theft. In addition, governments can collect taxes more easily because electronic payments leave a record.',
      'However, a cashless society also creates problems. Some elderly people are not used to using smartphones, and people without bank accounts cannot pay electronically. There are also concerns about privacy, since companies can see what people buy. Furthermore, if there is a power cut or a computer system stops working, people may not be able to buy food or other necessities.',
      'Because of these concerns, the Swedish government now asks people to keep some cash at home for emergencies. Some experts believe that cash and electronic payments should exist side by side, so that everyone can choose the method that suits them best.'
    ],
    qs: [
      { q: 'What is true about Sweden?', choices: ['Most payments in stores are made without cash.', 'All banks there have stopped using computers.', 'People there must pay a tax to use cash.', 'Coins are becoming more popular there.'], a: 0, why: '第1段落「店での支払いのうち現金は10%未満」→ほとんどが現金以外。' },
      { q: 'How do businesses benefit from cashless payments?', choices: ['They do not need to count cash.', 'They can pay lower taxes.', 'They can see the records of other stores.', 'They can hire fewer customers.'], a: 0, why: '第2段落「お金を数えたり盗難を心配したりする必要がない」。' },
      { q: 'What is one problem with a cashless society?', choices: ['People may not be able to shop when the power goes out.', 'Smartphones are becoming too expensive.', 'Banks are giving out too much cash.', 'Young people do not like cards.'], a: 0, why: '第3段落「停電やシステム停止の際、食べ物などを買えなくなるかもしれない」。power cut = the power goes out。' },
      { q: 'What does the Swedish government ask people to do?', choices: ['Keep some cash at home in case of emergencies.', 'Stop using smartphones for payments.', 'Open a bank account by a certain date.', 'Use only cash in small shops.'], a: 0, why: '第4段落「緊急時に備えて家に現金を置いておくよう求めている」。' }
    ],
    ja: [
      '近年、ますます多くの人々が現金の代わりにスマートフォンやカードで支払いをするようになっている。例えばスウェーデンでは、店での支払いのうち現金で行われるのは10%未満だ。国内の多くの店や一部の銀行でさえ、もはや硬貨や紙幣を受け付けていない。',
      'この変化にはいくつかの理由がある。キャッシュレス決済は速くて便利で、財布を持ち歩く必要がない。企業にとっても、お金を数えたり盗難を心配したりする必要がないので利点がある。さらに、電子決済は記録が残るので、政府は税金をより簡単に徴収できる。',
      'しかし、キャッシュレス社会は問題も生む。スマートフォンを使い慣れていない高齢者もいるし、銀行口座を持たない人は電子的に支払うことができない。企業が人々の買う物を知ることができるので、プライバシーへの懸念もある。さらに、停電やコンピューターシステムの停止が起きると、食料などの必需品を買えなくなるかもしれない。',
      'こうした懸念から、スウェーデン政府は現在、緊急時に備えて家に現金をいくらか置いておくよう国民に求めている。現金と電子決済は共存すべきで、そうすれば誰もが自分に最も合った方法を選べると考える専門家もいる。'
    ],
    words: [['payment', '支払い'], ['accept', '〜を受け入れる'], ['theft', '盗難'], ['electronic', '電子の'], ['account', '口座'], ['necessity', '必需品'], ['emergency', '緊急事態']],
    phrases: [['instead of', '〜の代わりに'], ['no longer', 'もはや〜ない'], ['be used to doing', '〜するのに慣れている'], ['side by side', '並んで、共存して']]
  }
];
