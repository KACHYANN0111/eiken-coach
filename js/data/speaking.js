/* 二次試験（面接）練習セット（オリジナル）
 * passage：60語程度の音読パッセージ
 * q1：パッセージについての質問 / q2：3コマのイラスト展開（panels は文章によるイラスト説明。将来画像に差し替え可）
 * q3：受験者自身の意見（パッセージ関連） / q4：日常生活に関する意見 */
var SPEAKING_DATA = [
  {
    id: 'sp01', theme: '環境', title: 'Saving Energy at Home',
    passage: 'These days, electricity prices are rising in many countries. Because of this, more families are trying to save energy at home. Some families use special light bulbs that need less power, and others turn off machines when they are not using them. By doing so, they can reduce their electricity bills and also help protect the environment.',
    q1: 'According to the passage, how can families reduce their electricity bills?',
    a1: 'By using special light bulbs that need less power and turning off machines when they are not using them.',
    a1ja: '電力の少ない特別な電球を使い、使っていない機械の電源を切ることによって。',
    card: 'One day, Mr. and Mrs. Kato were talking about their electricity bill.',
    panels: [
      { icon: '🧾💬', desc: '加藤夫妻がリビングで高い電気料金の請求書を見て話している。夫人が「Let\'s save energy.」と言っている。' },
      { icon: '💡🏬', desc: '夫妻が家電店でLED電球を選んでいる。店員が電球の説明をしている。' },
      { icon: '🌙👦', desc: 'その夜、息子が部屋の電気をつけたままテレビを見ながら寝ている。加藤氏がそれを見て「電気を消さなきゃ」と考えている。' }
    ],
    a2: 'One day, Mr. and Mrs. Kato were talking about their electricity bill. Mrs. Kato said to her husband, "Let\'s save energy." A few days later, they went to an electronics store. A clerk was explaining LED light bulbs to them. That night, their son fell asleep while he was watching TV with the light on. Mr. Kato was thinking of turning off the light and the TV.',
    a2ja: 'ある日、加藤夫妻は電気料金について話していた。加藤さんの妻は夫に「節電しましょう」と言った。数日後、彼らは家電店に行った。店員が彼らにLED電球の説明をしていた。その夜、息子は電気をつけたままテレビを見ながら眠ってしまった。加藤氏は電気とテレビを消そうと考えていた。',
    q3: 'Some people say that companies should do more to protect the environment. What do you think about that?',
    a3: 'I agree. Companies use a lot of energy and produce a lot of waste. If they use renewable energy and make products that can be recycled, it will have a big effect on the environment.',
    a3ja: '賛成です。企業は多くのエネルギーを使い、多くの廃棄物を出しています。再生可能エネルギーを使い、リサイクルできる製品を作れば、環境に大きな効果があるでしょう。',
    q4: 'Today, many people bring their own bags when they go shopping. Do you bring your own bag when you go shopping?',
    a4: 'Yes. (Why?) Plastic bags cost money at most stores now. Also, I think using my own bag is a simple way to reduce plastic waste.',
    a4ja: 'はい。（なぜですか）今ではほとんどの店でレジ袋は有料です。また、自分の袋を使うことはプラスチックごみを減らす簡単な方法だと思います。'
  },
  {
    id: 'sp02', theme: '健康', title: 'Walking for Health',
    passage: 'Walking is one of the easiest ways to stay healthy. It does not cost any money, and people of all ages can do it. Recently, some cities have created walking courses in parks and along rivers. Many people use these courses on weekends, and in this way they can enjoy nature while getting exercise.',
    q1: 'According to the passage, how can many people enjoy nature while getting exercise?',
    a1: 'By using walking courses in parks and along rivers on weekends.',
    a1ja: '週末に公園や川沿いのウォーキングコースを利用することによって。',
    card: 'One day, Yuta was talking with his grandfather.',
    panels: [
      { icon: '👦👴', desc: 'ユウタが祖父と家で話している。祖父が「I want to get more exercise.」と言っている。' },
      { icon: '🚶🌳', desc: '週末、ユウタと祖父が川沿いのウォーキングコースを歩いている。' },
      { icon: '📷🦆', desc: '祖父が川の鳥の写真を撮っている。ユウタは「次は友達も連れて来よう」と考えている。' }
    ],
    a2: 'One day, Yuta was talking with his grandfather. His grandfather said to Yuta, "I want to get more exercise." On the weekend, Yuta and his grandfather were walking along the river. Later, his grandfather was taking pictures of birds in the river. Yuta was thinking of bringing his friends there next time.',
    a2ja: 'ある日、ユウタは祖父と話していた。祖父はユウタに「もっと運動したい」と言った。週末、ユウタと祖父は川沿いを歩いていた。その後、祖父は川にいる鳥の写真を撮っていた。ユウタは次回は友達をそこに連れて来ようと考えていた。',
    q3: 'Some people say that schools should have more physical education classes. What do you think about that?',
    a3: 'I agree. Many students sit for long hours at their desks. More P.E. classes would help them stay healthy and reduce stress, which may also help them study better.',
    a3ja: '賛成です。多くの生徒は長時間机に座っています。体育の授業が増えれば健康を保ちストレスを減らす助けになり、勉強の効率も上がるかもしれません。',
    q4: 'These days, many people use fitness apps on their smartphones. Do you think these apps are useful?',
    a4: 'Yes. (Why?) They can record how many steps we walk each day. Seeing the numbers can motivate people to exercise more.',
    a4ja: 'はい。（なぜですか）毎日何歩歩いたかを記録できます。数字を見ることで、もっと運動しようというやる気が出ます。'
  },
  {
    id: 'sp03', theme: 'テクノロジー', title: 'Online Shopping',
    passage: 'Online shopping has become very popular. People can buy almost anything without leaving their homes. However, a large number of packages means delivery workers are very busy. Some companies now allow customers to choose a place to leave their packages, such as in front of the door. By doing this, they can reduce the number of second deliveries.',
    q1: 'According to the passage, how can some companies reduce the number of second deliveries?',
    a1: 'By allowing customers to choose a place to leave their packages, such as in front of the door.',
    a1ja: '玄関前など、荷物を置く場所を客に選ばせることによって。',
    card: 'One evening, Ms. Ito was shopping online at home.',
    panels: [
      { icon: '💻🛒', desc: 'イトウさんが家でパソコンを使って靴を注文している。' },
      { icon: '📦🚪', desc: '翌日、配達員がイトウさんの家の玄関前に荷物を置いている。イトウさんは仕事中で家にいない。' },
      { icon: '👟😟', desc: 'イトウさんが帰宅して箱を開けると、靴が小さすぎる。彼女は「返品しなければ」と考えている。' }
    ],
    a2: 'One evening, Ms. Ito was shopping online at home. She ordered a pair of shoes on her computer. The next day, a delivery worker left the package in front of her door while she was at work. That evening, she opened the box, but the shoes were too small. She was thinking that she would have to send them back.',
    a2ja: 'ある晩、イトウさんは家でネットショッピングをしていた。彼女はパソコンで靴を1足注文した。翌日、彼女が仕事に行っている間に配達員が玄関の前に荷物を置いた。その夜、彼女は箱を開けたが、靴は小さすぎた。彼女は返品しなければならないと考えていた。',
    q3: 'Some people say that online shopping will replace shopping at stores in the future. What do you think about that?',
    a3: 'I disagree. Many people like to see and touch products before buying them. Also, shopping at stores can be a fun way to spend time with friends and family.',
    a3ja: '反対です。多くの人は買う前に商品を見たり触ったりしたいと思っています。また、店での買い物は友人や家族と過ごす楽しい方法にもなります。',
    q4: 'Today, many people pay with smartphones instead of cash. Do you think this is a good idea?',
    a4: 'Yes. (Why?) It is fast and convenient because we don\'t need to carry coins. Also, we can easily check how much money we have spent.',
    a4ja: 'はい。（なぜですか）小銭を持ち歩く必要がないので速くて便利です。また、いくら使ったかを簡単に確認できます。'
  },
  {
    id: 'sp04', theme: '社会', title: 'Helping Foreign Residents',
    passage: 'The number of foreign people living in Japan is increasing. Some of them have difficulty understanding Japanese, especially when they need to go to a hospital or city office. Some towns now offer free translation services through tablets, and in this way they help foreign residents to live more comfortably in their communities.',
    q1: 'According to the passage, how do some towns help foreign residents to live more comfortably?',
    a1: 'By offering free translation services through tablets.',
    a1ja: 'タブレットを通して無料の翻訳サービスを提供することによって。',
    card: 'One day, Mr. Mori was working at the city office.',
    panels: [
      { icon: '🏢❓', desc: '市役所で働くモリさんのところに、外国人の男性が困った顔で書類を持って来ている。' },
      { icon: '📱🗣️', desc: 'モリさんがタブレットの翻訳アプリを使って男性と話している。' },
      { icon: '📚🏫', desc: '週末、モリさんが英会話教室で英語を勉強している。' }
    ],
    a2: 'One day, Mr. Mori was working at the city office. A foreign man came to him with some documents, and he looked worried. Mr. Mori used a translation app on a tablet to talk with him. On the weekend, Mr. Mori was studying English at an English conversation school.',
    a2ja: 'ある日、モリさんは市役所で働いていた。外国人の男性が書類を持って彼のところに来た。男性は困っているようだった。モリさんはタブレットの翻訳アプリを使って彼と話した。週末、モリさんは英会話教室で英語を勉強していた。',
    q3: 'Some people say that translation machines will make learning foreign languages unnecessary. What do you think about that?',
    a3: 'I disagree. Translation machines are useful, but they sometimes make mistakes. Also, learning a language helps us understand the culture and feelings of other people.',
    a3ja: '反対です。翻訳機は便利ですが、時々間違えます。また、言語を学ぶことで他の人々の文化や気持ちを理解できるようになります。',
    q4: 'Some people take part in international exchange events in their towns. Would you like to join such an event?',
    a4: 'Yes. (Why?) I want to make friends from other countries and practice my English. It would also be interesting to learn about their food and customs.',
    a4ja: 'はい。（なぜですか）他の国の友達を作って英語を練習したいです。また、彼らの食べ物や習慣について知るのも面白そうです。'
  },
  {
    id: 'sp05', theme: '教育', title: 'Reading E-books',
    passage: 'More and more students are reading e-books on tablets. E-books are light, and students can carry many of them at once. Some schools have started using digital textbooks for this reason. However, some teachers worry that looking at screens for a long time is bad for students\' eyes, so they ask students to take regular breaks.',
    q1: 'According to the passage, why do some teachers ask students to take regular breaks?',
    a1: 'Because they worry that looking at screens for a long time is bad for students\' eyes.',
    a1ja: '長時間画面を見ることは生徒の目に悪いと心配しているから。',
    card: 'One day, Saki was talking with her mother in a bookstore.',
    panels: [
      { icon: '📚👩‍👧', desc: 'サキと母親が書店にいる。サキは重い本をたくさん抱えている。母親が「How about using e-books?」と言っている。' },
      { icon: '📱📖', desc: '家でサキがタブレットで電子書籍を読んでいる。' },
      { icon: '😵🕐', desc: '夜遅く、サキが目をこすっている。時計は午前0時を指している。母親が「もう寝なさい」と思っている。' }
    ],
    a2: 'One day, Saki was talking with her mother in a bookstore. Saki was carrying many heavy books, and her mother said to her, "How about using e-books?" Later at home, Saki was reading e-books on a tablet. That night, it was already midnight, and Saki\'s eyes were tired. Her mother was thinking of telling her to go to bed.',
    a2ja: 'ある日、サキは書店で母親と話していた。サキは重い本をたくさん運んでいて、母親は彼女に「電子書籍を使ったら？」と言った。その後家で、サキはタブレットで電子書籍を読んでいた。その夜、もう午前0時でサキの目は疲れていた。母親はサキに寝るように言おうと考えていた。',
    q3: 'Some people say that libraries will not be necessary in the future because of e-books. What do you think about that?',
    a3: 'I disagree. Libraries are not only places to borrow books. People can study quietly there, and libraries hold events for children and elderly people.',
    a3ja: '反対です。図書館は本を借りるだけの場所ではありません。静かに勉強できますし、子どもや高齢者向けのイベントも開かれています。',
    q4: 'Today, some high school students take online lessons at home. Do you think online lessons are a good way to study?',
    a4: 'Yes. (Why?) Students can watch the lessons again if they don\'t understand something. They can also save time because they don\'t need to travel.',
    a4ja: 'はい。（なぜですか）わからないことがあれば授業をもう一度見られます。また、移動しなくてよいので時間を節約できます。'
  },
  {
    id: 'sp06', theme: '仕事', title: 'Robots in Restaurants',
    passage: 'Some restaurants in Japan have started using robots. Robots can carry food to tables and clean dishes, so restaurants can work with fewer staff members. Many restaurants are short of workers, and they hope that robots will solve this problem. Robots also attract customers who are interested in new technology, and in this way they help restaurants increase their sales.',
    q1: 'According to the passage, how do robots help restaurants increase their sales?',
    a1: 'By attracting customers who are interested in new technology.',
    a1ja: '新しい技術に興味のある客を引きつけることによって。',
    card: 'One day, Ken and his father were walking in front of a restaurant.',
    panels: [
      { icon: '🍜📢', desc: 'ケンと父親がレストランの前を歩いている。店の前に「Robot Service!」という看板がある。' },
      { icon: '🤖🍽️', desc: '店内でロボットが二人のテーブルに料理を運んでいる。ケンが写真を撮っている。' },
      { icon: '🏠💻', desc: '家に帰って、ケンがロボットについてインターネットで調べている。父親はケンが将来エンジニアになるかもしれないと思っている。' }
    ],
    a2: 'One day, Ken and his father were walking in front of a restaurant. They saw a sign that said the restaurant had robot service. Inside the restaurant, a robot was carrying food to their table, and Ken was taking pictures of it. After they got home, Ken was looking for information about robots on the Internet. His father thought that Ken might become an engineer in the future.',
    a2ja: 'ある日、ケンと父親はレストランの前を歩いていた。彼らはそのレストランにロボットのサービスがあるという看板を見た。店内では、ロボットが彼らのテーブルに料理を運んでいて、ケンはその写真を撮っていた。家に帰った後、ケンはインターネットでロボットについての情報を探していた。父親はケンが将来エンジニアになるかもしれないと思った。',
    q3: 'Some people say that robots will take away many people\'s jobs in the future. What do you think about that?',
    a3: 'I think so. Robots can do simple tasks faster and more cheaply than humans. However, new jobs, such as making and repairing robots, will also be created.',
    a3ja: 'そう思います。ロボットは単純作業を人間より速く安くこなせます。しかし、ロボットを作ったり修理したりするような新しい仕事も生まれるでしょう。',
    q4: 'Many high school students have part-time jobs. Do you think high school students should have part-time jobs?',
    a4: 'No. (Why not?) High school students should focus on their studies and club activities. They will have plenty of time to work after they graduate.',
    a4ja: 'いいえ。（なぜですか）高校生は勉強や部活動に集中すべきです。卒業後に働く時間は十分あります。'
  }
];
