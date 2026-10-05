/* 英検2級 単語データ（オリジナル学習用データ）
 * 形式：英単語|日本語訳|品詞|重要度(S/A/B/C)|頻出度(高/中/低)|カテゴリー|例文|例文の日本語訳
 * 複数の一般的な学習情報・高校英語の頻出語彙を参考に、独自に選定・作成。
 * 正解回数・不正解回数・最後に出題された日・最後に間違えた日は Store.wordStats に保存。 */
var WORDS_PARTS = window.WORDS_PARTS || (window.WORDS_PARTS = []);
WORDS_PARTS.push({ grade: '2', data: `
environment|環境|名詞|S|高|環境|We should protect the environment for future generations.|私たちは将来の世代のために環境を守るべきだ。
pollution|汚染、公害|名詞|S|高|環境|Air pollution is a serious problem in big cities.|大気汚染は大都市の深刻な問題だ。
climate|気候|名詞|S|高|環境|The climate of this region is mild all year round.|この地域の気候は一年中穏やかだ。
reduce|〜を減らす|動詞|S|高|環境|We need to reduce the amount of plastic waste.|私たちはプラスチックごみの量を減らす必要がある。
recycle|〜を再利用する、リサイクルする|動詞|A|高|環境|Many towns recycle glass bottles and cans.|多くの町がガラス瓶や缶をリサイクルしている。
waste|廃棄物、無駄／〜を無駄にする|名詞|S|高|環境|Food waste is a big issue in many countries.|食品廃棄は多くの国で大きな問題だ。
resource|資源|名詞|S|高|環境|Water is one of our most important natural resources.|水は最も重要な天然資源の一つだ。
renewable|再生可能な|形容詞|A|中|環境|Solar power is a renewable source of energy.|太陽光発電は再生可能なエネルギー源だ。
emission|排出、排気|名詞|A|中|環境|The government wants to cut carbon emissions.|政府は二酸化炭素の排出を削減したいと考えている。
global warming|地球温暖化|名詞|S|高|環境|Global warming is causing sea levels to rise.|地球温暖化が海面上昇を引き起こしている。
species|（生物の）種|名詞|S|高|自然|Many species of birds live in this forest.|多くの種類の鳥がこの森に住んでいる。
extinct|絶滅した|形容詞|A|高|自然|Dinosaurs became extinct millions of years ago.|恐竜は何百万年も前に絶滅した。
endangered|絶滅の危機にある|形容詞|A|高|自然|The panda was once an endangered animal.|パンダはかつて絶滅危惧種だった。
habitat|生息地|名詞|A|高|自然|Cutting down forests destroys the habitat of many animals.|森林伐採は多くの動物の生息地を破壊する。
wildlife|野生生物|名詞|A|中|自然|The park is home to a wide variety of wildlife.|その公園には多種多様な野生生物がいる。
conservation|（自然などの）保護、保存|名詞|A|中|環境|The group works for the conservation of the ocean.|その団体は海洋保護のために活動している。
preserve|〜を保存する、保護する|動詞|A|中|環境|We must preserve this old building for the future.|この古い建物を未来のために保存しなければならない。
natural|自然の、当然の|形容詞|B|高|自然|The country is rich in natural beauty.|その国は自然の美しさに恵まれている。
disaster|災害|名詞|S|高|社会|The town was badly damaged by the natural disaster.|その町は自然災害で大きな被害を受けた。
flood|洪水|名詞|A|中|自然|Heavy rain caused a flood in the village.|大雨が村に洪水を引き起こした。
earthquake|地震|名詞|A|中|自然|Japan has many earthquakes every year.|日本では毎年多くの地震が起こる。
drought|干ばつ|名詞|B|低|自然|The drought destroyed most of the crops.|干ばつで作物のほとんどがだめになった。
temperature|温度、気温|名詞|A|高|自然|The temperature dropped below zero last night.|昨夜は気温が氷点下まで下がった。
carbon dioxide|二酸化炭素|名詞|B|中|環境|Trees absorb carbon dioxide from the air.|木は空気中の二酸化炭素を吸収する。
fuel|燃料|名詞|A|中|環境|Electric cars do not need gasoline as fuel.|電気自動車は燃料としてガソリンを必要としない。
energy|エネルギー、活力|名詞|A|高|環境|Wind energy is becoming more popular.|風力エネルギーはより普及してきている。
plastic|プラスチック（の）|名詞|B|高|環境|Many shops no longer give out plastic bags.|多くの店がもうレジ袋を配っていない。
ecosystem|生態系|名詞|A|中|自然|Invasive plants can damage the local ecosystem.|外来植物は地域の生態系を損なうことがある。
ocean|海洋|名詞|B|高|自然|Plastic waste is polluting the ocean.|プラスチックごみが海を汚染している。
protect|〜を守る、保護する|動詞|S|高|環境|This law protects rare animals.|この法律は珍しい動物を保護している。
damage|損害／〜に損害を与える|名詞|S|高|環境|The storm caused serious damage to the farm.|嵐は農場に深刻な損害を与えた。
destroy|〜を破壊する|動詞|A|高|環境|The fire destroyed the old temple.|火事がその古い寺を焼き尽くした。
harmful|有害な|形容詞|A|高|健康|Smoking is harmful to your health.|喫煙は健康に有害だ。
affect|〜に影響を与える|動詞|S|高|思考・抽象|The weather can affect people's moods.|天気は人の気分に影響を与えることがある。
effect|影響、効果|名詞|S|高|思考・抽象|The new medicine had a good effect on the patient.|新しい薬は患者によく効いた。
influence|影響（力）／〜に影響を及ぼす|名詞|S|高|思考・抽象|Parents have a strong influence on their children.|親は子どもに強い影響力を持つ。
impact|影響、衝撃|名詞|S|高|思考・抽象|Tourism has a big impact on the local economy.|観光は地域経済に大きな影響を与える。
cause|〜を引き起こす／原因|動詞|S|高|思考・抽象|Stress can cause health problems.|ストレスは健康問題を引き起こすことがある。
result|結果|名詞|S|高|思考・抽象|As a result of the rain, the game was canceled.|雨の結果、試合は中止になった。
increase|増加する／増加|動詞|S|高|思考・抽象|The number of foreign visitors has increased.|外国人観光客の数が増加している。
decrease|減少する／減少|動詞|S|高|思考・抽象|The population of the village is decreasing.|その村の人口は減少している。
rise|上がる、増える／上昇|動詞|A|高|思考・抽象|Prices continue to rise every year.|物価は毎年上がり続けている。
decline|減少する、断る／減少|動詞|A|中|思考・抽象|The number of young farmers has declined.|若い農家の数は減少した。
improve|〜を改善する、向上する|動詞|S|高|思考・抽象|Reading every day will improve your English.|毎日読むことで英語力が向上するだろう。
develop|〜を発達させる、開発する|動詞|S|高|テクノロジー|The company developed a new type of battery.|その会社は新しい種類の電池を開発した。
technology|科学技術|名詞|S|高|テクノロジー|Technology has changed the way we work.|科学技術は私たちの働き方を変えた。
device|装置、機器|名詞|S|高|テクノロジー|Smartphones are useful devices for students.|スマートフォンは学生にとって便利な機器だ。
invent|〜を発明する|動詞|A|高|テクノロジー|Who invented the telephone?|誰が電話を発明したのですか。
invention|発明（品）|名詞|A|中|テクノロジー|The printing press was an important invention.|印刷機は重要な発明だった。
artificial|人工の|形容詞|A|中|テクノロジー|Artificial intelligence is used in many fields.|人工知能は多くの分野で使われている。
robot|ロボット|名詞|B|中|テクノロジー|Robots are used to clean large buildings.|大きな建物の掃除にロボットが使われている。
digital|デジタルの|形容詞|B|高|テクノロジー|Many people now read digital books.|今では多くの人が電子書籍を読んでいる。
online|オンラインの、インターネット上で|形容詞|A|高|テクノロジー|More people are shopping online these days.|最近はネットで買い物をする人が増えている。
data|データ、資料|名詞|A|高|テクノロジー|The scientists collected data for three years.|科学者たちは3年間データを集めた。
software|ソフトウェア|名詞|B|中|テクノロジー|You need to update the software regularly.|ソフトウェアは定期的に更新する必要がある。
access|利用（する権利）、接近／〜にアクセスする|名詞|A|高|テクノロジー|Students have free access to the library.|学生は図書館を無料で利用できる。
security|安全、警備|名詞|A|中|テクノロジー|Online security is important for companies.|オンラインのセキュリティは企業にとって重要だ。
privacy|プライバシー|名詞|A|中|テクノロジー|Social media can be a threat to privacy.|ソーシャルメディアはプライバシーへの脅威になり得る。
virtual|仮想の、事実上の|形容詞|B|中|テクノロジー|Students can take a virtual tour of the museum.|生徒は博物館をバーチャル見学できる。
automatic|自動の|形容詞|B|中|テクノロジー|The doors are automatic.|そのドアは自動だ。
electricity|電気|名詞|A|中|テクノロジー|The storm cut off the electricity.|嵐で停電した。
battery|電池|名詞|B|中|テクノロジー|My phone battery runs out quickly.|私の携帯の電池はすぐ切れる。
engineer|技術者、エンジニア|名詞|B|中|仕事|She works as an engineer at a car company.|彼女は自動車会社でエンジニアとして働いている。
scientist|科学者|名詞|B|高|科学|Scientists have found a new kind of fish.|科学者たちは新種の魚を発見した。
research|研究、調査／〜を研究する|名詞|S|高|科学|Research shows that sleep is important for memory.|研究によると睡眠は記憶にとって重要だ。
experiment|実験|名詞|A|高|科学|They did an experiment to test the idea.|彼らはその考えを検証するために実験をした。
discover|〜を発見する|動詞|S|高|科学|The scientist discovered a new star.|その科学者は新しい星を発見した。
discovery|発見|名詞|A|中|科学|The discovery changed medical history.|その発見は医学の歴史を変えた。
evidence|証拠|名詞|S|高|科学|There is no evidence that the drug works.|その薬が効くという証拠はない。
theory|理論、学説|名詞|A|中|科学|His theory was later proved to be correct.|彼の理論は後に正しいと証明された。
prove|〜を証明する、〜だとわかる|動詞|A|高|科学|The test proved that the water was safe.|検査でその水が安全だと証明された。
analyze|〜を分析する|動詞|A|中|科学|The team analyzed the results carefully.|チームは結果を注意深く分析した。
observe|〜を観察する、気づく|動詞|A|中|科学|Students observed the plants for a month.|生徒たちは1か月間植物を観察した。
laboratory|研究所、実験室|名詞|B|中|科学|The samples were sent to a laboratory.|サンプルは研究所に送られた。
planet|惑星|名詞|B|中|科学|Mars is the fourth planet from the sun.|火星は太陽から4番目の惑星だ。
space|宇宙、空間|名詞|B|高|科学|The rocket was sent into space.|ロケットが宇宙に打ち上げられた。
brain|脳|名詞|A|高|科学|Exercise is good for the brain.|運動は脳に良い。
gene|遺伝子|名詞|C|低|科学|Eye color is decided by genes.|目の色は遺伝子によって決まる。
chemical|化学物質／化学の|名詞|A|中|科学|Some chemicals are dangerous to touch.|一部の化学物質は触ると危険だ。
material|材料、素材|名詞|A|高|科学|The bag is made from recycled materials.|そのバッグは再生素材で作られている。
method|方法|名詞|S|高|思考・抽象|This is a new method of teaching English.|これは英語を教える新しい方法だ。
process|過程、工程|名詞|A|高|思考・抽象|Learning a language is a long process.|言語を学ぶのは長い過程だ。
system|制度、体系|名詞|A|高|社会|The country changed its education system.|その国は教育制度を変えた。
health|健康|名詞|S|高|健康|Regular exercise is good for your health.|定期的な運動は健康に良い。
disease|病気|名詞|S|高|健康|Heart disease is common in older people.|心臓病は高齢者によく見られる。
illness|病気|名詞|A|中|健康|He missed school because of a serious illness.|彼は重い病気で学校を休んだ。
symptom|症状|名詞|A|中|健康|A high fever is a common symptom of the flu.|高熱はインフルエンザのよくある症状だ。
treatment|治療、扱い|名詞|A|高|健康|The new treatment helped many patients.|新しい治療法は多くの患者を救った。
patient|患者／我慢強い|名詞|A|高|健康|The doctor examined the patient carefully.|医者は患者を注意深く診察した。
medicine|薬、医学|名詞|A|高|健康|Take this medicine three times a day.|この薬を1日3回飲んでください。
medical|医療の、医学の|形容詞|A|高|健康|She wants to work in the medical field.|彼女は医療分野で働きたいと思っている。
cure|〜を治す／治療法|動詞|A|中|健康|There is still no cure for this disease.|この病気の治療法はまだない。
recover|回復する|動詞|A|高|健康|He recovered from his injury quickly.|彼はけがからすぐに回復した。
injury|けが|名詞|A|中|健康|She had a knee injury during the game.|彼女は試合中にひざをけがした。
exercise|運動／運動する|名詞|S|高|健康|Light exercise helps you sleep better.|軽い運動はよく眠る助けになる。
diet|食事、ダイエット|名詞|A|高|健康|A balanced diet is necessary for good health.|バランスの良い食事は健康に必要だ。
nutrition|栄養|名詞|B|中|健康|School lunches are planned with nutrition in mind.|学校給食は栄養を考えて作られている。
stress|ストレス、圧迫|名詞|A|高|健康|Many workers suffer from stress.|多くの労働者がストレスに苦しんでいる。
mental|精神の、心の|形容詞|A|高|健康|Mental health is as important as physical health.|心の健康は体の健康と同じくらい大切だ。
physical|身体の、物理的な|形容詞|A|高|健康|Physical activity is good for children.|身体活動は子どもに良い。
prevent|〜を防ぐ|動詞|S|高|健康|Washing your hands helps prevent colds.|手洗いはかぜの予防に役立つ。
infection|感染（症）|名詞|B|中|健康|Wear a mask to avoid infection.|感染を避けるためにマスクを着けなさい。
hospital|病院|名詞|B|高|健康|My grandmother is in the hospital.|祖母は入院している。
surgery|手術|名詞|B|低|健康|He needed surgery on his shoulder.|彼は肩の手術が必要だった。
pain|痛み|名詞|B|高|健康|I have a pain in my back.|背中が痛い。
weight|体重、重さ|名詞|B|高|健康|He lost weight by walking every day.|彼は毎日歩いて体重を減らした。
sleep|睡眠／眠る|名詞|B|高|健康|Lack of sleep makes it hard to concentrate.|睡眠不足は集中を難しくする。
habit|習慣、癖|名詞|S|高|健康|Eating breakfast is a good habit.|朝食を食べるのは良い習慣だ。
healthy|健康的な、健康な|形容詞|A|高|健康|She tries to eat healthy food.|彼女は健康的な食べ物を食べるようにしている。
education|教育|名詞|S|高|教育|Everyone has the right to education.|誰もが教育を受ける権利を持っている。
student|学生、生徒|名詞|C|高|教育|The students are preparing for the exam.|生徒たちは試験の準備をしている。
knowledge|知識|名詞|S|高|教育|Reading gives you a lot of knowledge.|読書は多くの知識を与えてくれる。
skill|技能、技術|名詞|S|高|教育|Communication skills are important at work.|仕事ではコミュニケーション能力が重要だ。
ability|能力|名詞|S|高|教育|She has the ability to speak four languages.|彼女は4か国語を話す能力がある。
subject|教科、話題、主題|名詞|A|高|教育|Math is my favorite subject.|数学は私の好きな教科だ。
lecture|講義、講演|名詞|A|中|教育|The professor gave a lecture on history.|教授は歴史について講義をした。
professor|教授|名詞|B|中|教育|She is a professor at a university in Tokyo.|彼女は東京の大学の教授だ。
graduate|卒業する|動詞|A|高|教育|He graduated from high school last year.|彼は昨年高校を卒業した。
degree|学位、程度、（温度の）度|名詞|A|中|教育|She has a degree in economics.|彼女は経済学の学位を持っている。
semester|学期|名詞|B|中|教育|The new semester starts in April.|新学期は4月に始まる。
scholarship|奨学金|名詞|A|中|教育|He received a scholarship to study abroad.|彼は留学のための奨学金を受けた。
tuition|授業料|名詞|B|中|教育|University tuition is very expensive.|大学の授業料はとても高い。
assignment|課題、宿題|名詞|A|中|教育|I have to finish the assignment by Friday.|金曜日までに課題を終わらせなければならない。
exam|試験|名詞|C|高|教育|I passed the exam on my first try.|私は一回目でその試験に合格した。
grade|成績、学年、等級|名詞|B|高|教育|She got a good grade in science.|彼女は理科で良い成績を取った。
require|〜を必要とする、要求する|動詞|S|高|思考・抽象|This job requires a lot of patience.|この仕事には多くの忍耐が必要だ。
encourage|〜を励ます、促す|動詞|S|高|教育|Teachers encourage students to ask questions.|先生は生徒に質問するよう促している。
attend|〜に出席する、通う|動詞|S|高|教育|Over 100 people attended the meeting.|100人以上が会議に出席した。
participate|参加する|動詞|A|高|教育|Many students participated in the volunteer program.|多くの学生がボランティア活動に参加した。
explain|〜を説明する|動詞|B|高|コミュニケーション|Can you explain the rules to me?|ルールを説明してくれますか。
memorize|〜を暗記する|動詞|B|中|教育|I memorized twenty new words today.|今日は新しい単語を20個暗記した。
concentrate|集中する|動詞|A|高|教育|It is hard to concentrate in a noisy room.|騒がしい部屋では集中しにくい。
focus|焦点／集中する|動詞|A|高|教育|You should focus on your studies.|勉強に集中するべきだ。
career|経歴、職業|名詞|S|高|仕事|She wants a career in international business.|彼女は国際ビジネスの仕事に就きたいと思っている。
employee|従業員|名詞|S|高|仕事|The company has about 500 employees.|その会社には約500人の従業員がいる。
employer|雇い主|名詞|A|中|仕事|Employers are looking for workers with good skills.|雇用主は優れた技能を持つ労働者を探している。
employ|〜を雇う|動詞|A|中|仕事|The factory employs many local people.|その工場は多くの地元の人を雇っている。
hire|〜を雇う|動詞|A|高|仕事|The restaurant hired two new cooks.|そのレストランは新しく料理人を2人雇った。
salary|給料|名詞|A|高|仕事|He got a higher salary at his new job.|彼は新しい職場でより高い給料を得た。
wage|賃金|名詞|B|中|仕事|The minimum wage was raised this year.|今年、最低賃金が引き上げられた。
position|地位、位置、職|名詞|A|高|仕事|She applied for a position at the bank.|彼女はその銀行の職に応募した。
apply|申し込む、応募する、適用する|動詞|S|高|仕事|I applied for a part-time job at the cafe.|私はカフェのアルバイトに応募した。
interview|面接、インタビュー|名詞|A|高|仕事|I have a job interview tomorrow.|明日、就職の面接がある。
experience|経験／〜を経験する|名詞|S|高|仕事|Working abroad was a great experience.|海外で働くことはすばらしい経験だった。
responsible|責任がある|形容詞|S|高|仕事|He is responsible for the sales team.|彼は営業チームの責任者だ。
responsibility|責任|名詞|A|高|仕事|Taking care of a pet is a big responsibility.|ペットの世話は大きな責任だ。
colleague|同僚|名詞|A|中|仕事|I had lunch with my colleagues.|私は同僚と昼食をとった。
manager|管理者、部長|名詞|B|高|仕事|The manager approved my plan.|部長は私の計画を承認した。
promote|〜を昇進させる、促進する|動詞|A|高|ビジネス|She was promoted to manager last month.|彼女は先月、部長に昇進した。
retire|引退する、退職する|動詞|A|中|仕事|My father will retire next year.|父は来年退職する。
overtime|残業、時間外に|名詞|B|中|仕事|Many workers do a lot of overtime.|多くの労働者が多くの残業をしている。
remote|遠隔の、離れた|形容詞|A|高|仕事|Remote work has become common.|リモートワークは一般的になった。
commute|通勤する／通勤|動詞|A|高|仕事|I commute to work by train.|私は電車で通勤している。
task|仕事、課題|名詞|A|高|仕事|Robots can do simple tasks quickly.|ロボットは簡単な作業を素早くこなせる。
efficient|効率的な|形容詞|A|高|ビジネス|This new system is more efficient.|この新しいシステムの方が効率的だ。
productive|生産的な|形容詞|B|中|仕事|I am most productive in the morning.|私は朝が最も生産的だ。
labor|労働|名詞|B|中|仕事|There is a shortage of labor in rural areas.|地方では労働力が不足している。
shortage|不足|名詞|S|高|社会|There is a shortage of nurses in Japan.|日本では看護師が不足している。
business|商売、事業、会社|名詞|A|高|ビジネス|He started his own business at 25.|彼は25歳で自分の事業を始めた。
company|会社、仲間|名詞|C|高|ビジネス|She works for a computer company.|彼女はコンピューター会社に勤めている。
customer|顧客|名詞|S|高|ビジネス|The store offers good service to customers.|その店は客に良いサービスを提供している。
product|製品|名詞|S|高|ビジネス|The company sells its products all over the world.|その会社は製品を世界中で販売している。
produce|〜を生産する|動詞|A|高|ビジネス|This factory produces 1,000 cars a day.|この工場は1日に1,000台の車を生産する。
production|生産|名詞|A|中|ビジネス|Rice production fell because of the cold summer.|冷夏で米の生産量が減った。
consumer|消費者|名詞|A|高|ビジネス|Consumers are becoming more interested in eco-friendly products.|消費者は環境に優しい製品にますます関心を持つようになっている。
advertise|〜を宣伝する、広告する|動詞|A|高|ビジネス|The company advertises its products on TV.|その会社はテレビで製品を宣伝している。
advertisement|広告|名詞|A|中|ビジネス|I saw an advertisement for a new phone.|新しい携帯電話の広告を見た。
profit|利益|名詞|A|高|ビジネス|The company made a large profit last year.|その会社は昨年大きな利益を上げた。
sales|売上（高）、販売|名詞|A|高|ビジネス|Sales of electric cars are increasing.|電気自動車の売上が伸びている。
market|市場|名詞|A|高|ビジネス|The company wants to enter the Asian market.|その会社はアジア市場に参入したいと考えている。
competition|競争、競技会|名詞|A|高|ビジネス|There is strong competition between the two stores.|その2店の間には激しい競争がある。
compete|競争する|動詞|A|中|ビジネス|Small shops find it hard to compete with big stores.|小さな店は大型店と競争するのが難しい。
succeed|成功する|動詞|S|高|ビジネス|She succeeded in starting her own company.|彼女は自分の会社を立ち上げることに成功した。
success|成功|名詞|A|高|ビジネス|The event was a great success.|そのイベントは大成功だった。
fail|失敗する、〜しない|動詞|A|高|ビジネス|He failed to catch the last train.|彼は終電に乗れなかった。
failure|失敗|名詞|B|中|ビジネス|Failure is a part of learning.|失敗は学びの一部だ。
budget|予算|名詞|A|中|ビジネス|We have a small budget for the project.|そのプロジェクトの予算は少ない。
cost|費用／（費用が）かかる|名詞|S|高|経済|The cost of living is high in Tokyo.|東京は生活費が高い。
expense|費用、出費|名詞|A|中|経済|Travel expenses will be paid by the company.|旅費は会社が支払う。
expensive|高価な|形容詞|C|高|経済|This bag is too expensive for me.|このかばんは私には高すぎる。
afford|〜を買う余裕がある|動詞|S|高|経済|I can't afford a new car.|私には新車を買う余裕がない。
economy|経済|名詞|A|高|経済|Tourism is important for the local economy.|観光は地域経済にとって重要だ。
economic|経済の|形容詞|A|中|経済|The country is facing economic problems.|その国は経済問題に直面している。
financial|財政の、金融の|形容詞|A|中|経済|Many students have financial difficulties.|多くの学生が経済的な困難を抱えている。
income|収入|名詞|A|高|経済|Her income has increased this year.|彼女の収入は今年増えた。
tax|税金|名詞|A|中|経済|The government raised the sales tax.|政府は消費税を引き上げた。
loan|貸付金、ローン|名詞|B|中|経済|He took out a loan to buy a house.|彼は家を買うためにローンを組んだ。
invest|〜を投資する|動詞|B|中|経済|The city invested a lot of money in public transportation.|市は公共交通機関に多額のお金を投資した。
fund|資金|名詞|A|中|経済|They are raising funds for the new library.|彼らは新しい図書館のための資金を集めている。
donate|〜を寄付する|動詞|A|高|社会|She donated money to the hospital.|彼女は病院にお金を寄付した。
donation|寄付|名詞|B|中|社会|The museum depends on donations.|その博物館は寄付に頼っている。
charity|慈善（団体）|名詞|A|中|社会|The concert raised money for charity.|そのコンサートは慈善のためにお金を集めた。
volunteer|ボランティア／自発的に申し出る|名詞|A|高|社会|Many volunteers helped clean the beach.|多くのボランティアが浜辺の清掃を手伝った。
` });
