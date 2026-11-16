/* 英語で質疑応答（AIなし）の会話パターン（オリジナル）
 * 答えの内容から話題を見つけて、相づち → 自分の話 → 深掘りの質問 を毎回組み合わせを変えて返す。
 * すべて [英語, 日本語訳] の組（日本語字幕に使う）。
 * topics[]: re＝話題を見つける単語 / qs＝深掘りの質問 / comments＝アプリ自身の感想・経験 / me＝質問を返されたときの答え */
var TALK_FLOW = {
  topics: [
    { id: 'cooking', re: /\b(cook|cooks|cooking|cooked|bake|baking|baked|recipe|recipes|kitchen)\b/i,
      qs: [
        ["What's the best dish you can make?", "あなたが作れるいちばんおいしい料理は何ですか。"],
        ["Who taught you how to cook?", "誰に料理を教わりましたか。"],
        ["How often do you cook?", "どのくらいの頻度で料理しますか。"],
        ["Do you follow recipes, or do you cook without them?", "レシピどおりに作りますか、それともレシピなしで作りますか。"],
        ["What would you like to learn to cook next?", "次はどんな料理を作れるようになりたいですか。"]
      ],
      comments: [
        ["Cooking is a great skill. I wish I could cook better!", "料理ってすばらしい特技ですね。私ももっと上手に作れたらいいのに！"],
        ["Homemade food is always the best, isn't it?", "手作りの料理がいちばんですよね。"]
      ],
      me: [["Me? I can only make simple things, like fried rice.", "私ですか？チャーハンみたいな簡単なものしか作れません。"]] },
    { id: 'pets', re: /\b(dog|dogs|cat|cats|pet|pets|puppy|kitten|rabbit|hamster|parrot|turtle)\b/i,
      qs: [
        ["What's your pet's name?", "ペットの名前は何ですか。"],
        ["How long have you had your pet?", "ペットを飼ってどのくらいですか。"],
        ["What's the funniest thing your pet does?", "ペットのいちばん面白いところは何ですか。"],
        ["Do you prefer dogs or cats?", "犬と猫、どちらが好きですか。"],
        ["Would you like to have another pet in the future?", "将来、ほかのペットも飼いたいですか。"]
      ],
      comments: [
        ["Pets can make us so happy, can't they?", "ペットって私たちをとても幸せにしてくれますよね。"],
        ["I love animals. Just looking at them makes me smile.", "動物が大好きです。見ているだけで笑顔になります。"]
      ],
      me: [["Me? I'm a dog person. I love going for walks with dogs.", "私ですか？犬派です。犬と散歩するのが大好きです。"]] },
    { id: 'music', re: /\b(music|song|songs|sing|singing|singer|singers|karaoke|guitar|piano|drums|violin|band|bands|concert|concerts|k-pop|kpop|j-pop|rock|jazz|album|idol|idols)\b/i,
      qs: [
        ["What kind of music do you listen to?", "どんな音楽を聴きますか。"],
        ["Who is your favorite singer or band?", "好きな歌手やバンドは誰ですか。"],
        ["Have you ever been to a concert?", "コンサートに行ったことはありますか。"],
        ["Do you play any instruments?", "何か楽器を演奏しますか。"],
        ["What song do you usually sing at karaoke?", "カラオケではふだん何の歌を歌いますか。"],
        ["Do you listen to music while you study or work?", "勉強や仕事をしながら音楽を聴きますか。"]
      ],
      comments: [
        ["Music can really change your mood, can't it?", "音楽って気分をがらっと変えてくれますよね。"],
        ["I love listening to music on the train. It makes the time go faster.", "電車で音楽を聴くのが大好きです。時間が早く過ぎる気がします。"]
      ],
      me: [["Me? I listen to all kinds of music, but I especially like old pop songs.", "私ですか？いろいろ聴きますが、特に昔のポップスが好きです。"]] },
    { id: 'movies', re: /\b(movie|movies|film|films|drama|dramas|anime|netflix|tv|series|youtube|videos|cinema|theater|theatre|actor|actress)\b/i,
      qs: [
        ["What's the best movie you've seen recently?", "最近見た中でいちばんよかった映画は何ですか。"],
        ["What kind of movies do you like?", "どんな映画が好きですか。"],
        ["Do you prefer watching movies at home or in a theater?", "映画は家で見るのと映画館で見るのと、どちらが好きですか。"],
        ["Who is your favorite actor?", "好きな俳優は誰ですか。"],
        ["Is there a show you'd recommend?", "おすすめの番組はありますか。"],
        ["Do you ever watch anything in English?", "英語で何か見ることはありますか。"]
      ],
      comments: [
        ["I love movies, too. A good story can stay with you for a long time.", "私も映画が大好きです。いい物語はずっと心に残りますよね。"],
        ["Watching dramas in English is a great way to learn, too.", "英語でドラマを見るのは、いい勉強にもなりますよ。"]
      ],
      me: [["Me? I like funny movies the most. I watch them when I'm tired.", "私ですか？コメディ映画がいちばん好きです。疲れているときに見ます。"]] },
    { id: 'reading', re: /\b(read|reading|book|books|novel|novels|manga|comic|comics|library|author|magazine|magazines)\b/i,
      qs: [
        ["What kind of books do you like?", "どんな本が好きですか。"],
        ["What are you reading now?", "今は何を読んでいますか。"],
        ["Do you prefer paper books or e-books?", "紙の本と電子書籍、どちらが好きですか。"],
        ["Who is your favorite author?", "好きな作家は誰ですか。"],
        ["Is there a book that changed the way you think?", "考え方が変わった本はありますか。"]
      ],
      comments: [
        ["Reading is a great way to relax and learn new things at the same time.", "読書はリラックスしながら新しいことも学べる、いい方法ですよね。"],
        ["I like reading before bed. It helps me sleep.", "寝る前に読むのが好きです。よく眠れるんです。"]
      ],
      me: [["Me? I like mystery novels. I can't stop reading until I find out the ending!", "私ですか？推理小説が好きです。結末が分かるまで読むのをやめられません！"]] },
    { id: 'games', re: /\b(game|games|gaming|nintendo|switch|playstation|minecraft|pokemon)\b/i,
      qs: [
        ["What game are you playing these days?", "最近は何のゲームをしていますか。"],
        ["Do you play online with friends?", "友達とオンラインで遊びますか。"],
        ["How many hours a week do you play?", "1週間に何時間くらい遊びますか。"],
        ["What was the first game you ever played?", "初めて遊んだゲームは何ですか。"],
        ["Do you think games can help people learn?", "ゲームは学ぶ助けになると思いますか。"]
      ],
      comments: [
        ["Games are so much fun, especially with friends.", "ゲームってすごく楽しいですよね。特に友達と遊ぶと。"],
        ["Some games are really beautiful, like movies.", "映画みたいにきれいなゲームもありますよね。"]
      ],
      me: [["Me? I sometimes play puzzle games on my phone.", "私ですか？ときどきスマホでパズルゲームをします。"]] },
    { id: 'sports', re: /\b(sport|sports|soccer|football|baseball|tennis|basketball|volleyball|badminton|golf|swim|swimming|run|running|jogging|marathon|gym|exercise|workout|yoga|ski|skiing|snowboarding|rugby|judo|karate|dance|dancing|cycling)\b/i,
      qs: [
        ["How long have you been doing it?", "どのくらい続けていますか。"],
        ["Do you prefer playing sports or watching them?", "スポーツはするのと見るのと、どちらが好きですか。"],
        ["Who is your favorite athlete?", "好きなスポーツ選手は誰ですか。"],
        ["Do you do it on a team or by yourself?", "チームでしていますか、それとも一人でしていますか。"],
        ["How do you feel after you exercise?", "運動したあとはどんな気分ですか。"],
        ["Have you ever been in a competition?", "大会に出たことはありますか。"]
      ],
      comments: [
        ["That's great. Exercise is good for your body and your mind.", "いいですね。運動は体にも心にもいいですから。"],
        ["I tried tennis a few times, but it was harder than I thought!", "テニスを何回かやってみましたが、思ったより難しかったです！"],
        ["Watching games with friends is so exciting, too.", "友達と試合を見るのもすごく盛り上がりますよね。"]
      ],
      me: [["Me? I like walking. I try to walk for thirty minutes every day.", "私ですか？歩くのが好きです。毎日30分歩くようにしています。"]] },
    { id: 'travel', re: /\b(travel|travels|traveling|travelling|traveled|travelled|trip|trips|abroad|overseas|vacation|sightseeing|visit|visited|country|countries|hawaii|kyoto|okinawa|hokkaido|europe|america|korea|taiwan|paris|london|hotel)\b/i,
      qs: [
        ["Where have you traveled?", "今までにどこへ旅行しましたか。"],
        ["What country would you like to visit?", "どの国に行ってみたいですか。"],
        ["Do you prefer traveling alone or with friends?", "一人旅と友達との旅行、どちらが好きですか。"],
        ["What was your best travel experience?", "いちばんよかった旅行の思い出は何ですか。"],
        ["Why do you enjoy traveling?", "どうして旅行が好きなのですか。"],
        ["What do you always pack when you travel?", "旅行のときにいつも持っていくものは何ですか。"],
        ["Do you like to plan everything, or do you just go with the flow?", "全部計画したい派ですか、それとも流れにまかせる派ですか。"]
      ],
      comments: [
        ["I love traveling, too. Seeing new places always gives me energy.", "私も旅行が大好きです。新しい場所を見ると元気が出ます。"],
        ["For me, the best part of traveling is trying the local food.", "私にとって旅行の一番の楽しみは、地元の食べ物を食べることです。"],
        ["I went to Hokkaido last winter, and the snow was so beautiful.", "去年の冬に北海道に行ったのですが、雪がとてもきれいでした。"]
      ],
      me: [
        ["Me? I'd love to visit Iceland someday. I want to see the Northern Lights.", "私ですか？いつかアイスランドに行ってみたいです。オーロラを見たいんです。"],
        ["For me, small towns are more fun than big cities. They're more relaxing.", "私は大都市より小さな町のほうが楽しいです。のんびりできるので。"]
      ] },
    { id: 'english', re: /\b(english|language|languages|eiken|toeic|grammar|vocabulary|pronunciation)\b/i,
      qs: [
        ["Why are you learning English?", "どうして英語を勉強しているのですか。"],
        ["How do you usually practice English?", "ふだんどうやって英語を練習していますか。"],
        ["What's the most difficult part of English for you?", "あなたにとって英語のいちばん難しいところは何ですか。"],
        ["Have you ever talked with someone in English outside of class?", "授業以外で英語で誰かと話したことはありますか。"],
        ["What would you like to do with your English in the future?", "将来、英語を使って何をしたいですか。"]
      ],
      comments: [
        ["Your English is getting better every time we talk!", "話すたびに英語が上達していますね！"],
        ["Practicing a little every day is the best way to improve.", "毎日少しずつ練習するのが上達のいちばんの近道です。"]
      ],
      me: [["Me? I think the best way to learn is to talk a lot, just like we're doing now.", "私ですか？たくさん話すのがいちばんの勉強法だと思います。ちょうど今みたいに。"]] },
    { id: 'school', re: /\b(school|class|classes|teacher|teachers|student|students|homework|test|tests|exam|exams|study|studying|studied|university|college|club|subject|subjects|lesson|lessons|math|science|history)\b/i,
      qs: [
        ["What's your favorite subject?", "好きな教科は何ですか。"],
        ["Are you in any clubs?", "何か部活やサークルに入っていますか。"],
        ["How do you usually study for tests?", "テスト勉強はふだんどうやっていますか。"],
        ["Who was your favorite teacher?", "好きだった先生は誰ですか。"],
        ["What do you want to study in the future?", "将来は何を勉強したいですか。"]
      ],
      comments: [
        ["Studying can be hard, but it's worth it.", "勉強は大変なこともあるけど、その価値はありますよね。"],
        ["School is also a great place to make friends.", "学校は友達を作るのにもいい場所ですよね。"]
      ],
      me: [["Me? I liked art class the most when I was a student.", "私ですか？学生のころは美術の授業がいちばん好きでした。"]] },
    { id: 'work', re: /\b(work|works|working|job|jobs|company|office|boss|meeting|meetings|overtime|part-time|business|career|customer|customers|sales)\b/i,
      qs: [
        ["What do you like about your job?", "仕事のどんなところが好きですか。"],
        ["What's a typical day like at work?", "職場でのふだんの一日はどんな感じですか。"],
        ["How do you get to work?", "職場へはどうやって行きますか。"],
        ["What's the most challenging part of your work?", "仕事でいちばん大変なのはどんなところですか。"],
        ["What would you like to do in the future?", "将来は何をしたいですか。"]
      ],
      comments: [
        ["It sounds like you work really hard.", "とてもがんばって働いているんですね。"],
        ["Having good coworkers makes a big difference, I think.", "いい同僚がいると全然違いますよね。"]
      ],
      me: [["Me? I enjoy my work most when I'm learning something new.", "私ですか？新しいことを学んでいるときがいちばん仕事を楽しめます。"]] },
    { id: 'family', re: /\b(family|mother|father|mom|mum|dad|parents|brother|brothers|sister|sisters|grandmother|grandfather|grandma|grandpa|grandparents|son|daughter|wife|husband|kids|children|cousin|cousins)\b/i,
      qs: [
        ["What do you usually do together?", "ふだん一緒に何をしますか。"],
        ["Who are you most similar to in your family?", "家族の中で誰にいちばん似ていますか。"],
        ["Does your family have any special traditions?", "家族の特別な習慣はありますか。"],
        ["How often do you see them?", "どのくらいの頻度で会いますか。"],
        ["What's your favorite memory with your family?", "家族とのいちばんの思い出は何ですか。"]
      ],
      comments: [
        ["That's nice. Family time is really special.", "いいですね。家族との時間って特別ですよね。"],
        ["It sounds like you have a close family.", "仲のいいご家族のようですね。"]
      ],
      me: [["Me? I have a younger brother. We argue sometimes, but we're close.", "私ですか？弟が1人います。たまに言い合いもしますが、仲はいいです。"]] },
    { id: 'friends', re: /\b(friend|friends|classmate|classmates|coworker|coworkers|colleague|colleagues|teammate|teammates)\b/i,
      qs: [
        ["How did you meet?", "どうやって知り合いましたか。"],
        ["What do you like most about your friends?", "友達のいちばん好きなところは何ですか。"],
        ["What do you usually talk about with your friends?", "友達とはふだん何の話をしますか。"],
        ["Do you have any friends from other countries?", "外国の友達はいますか。"],
        ["What's the most fun thing you've done with your friends?", "友達としたいちばん楽しいことは何ですか。"]
      ],
      comments: [
        ["Good friends make life so much better.", "いい友達がいると人生がずっと楽しくなりますよね。"],
        ["It's great to have people you can relax with.", "気楽にいられる人がいるのはすばらしいことです。"]
      ],
      me: [["Me? My best friend lives far away now, but we still talk every week.", "私ですか？親友は今遠くに住んでいますが、今でも毎週話しています。"]] },
    { id: 'nature', re: /\b(park|parks|mountain|mountains|hiking|hike|camping|camp|beach|sea|ocean|river|lake|walk|walking|nature|garden|gardening|flowers|fishing|picnic)\b/i,
      qs: [
        ["Do you prefer the mountains or the beach?", "山と海、どちらが好きですか。"],
        ["What's your favorite place to relax outside?", "外でリラックスするお気に入りの場所はどこですか。"],
        ["Have you ever gone camping?", "キャンプに行ったことはありますか。"],
        ["What season is best for spending time outside?", "外で過ごすのにいちばんいい季節はいつですか。"],
        ["Is there a beautiful place near your home?", "家の近くにきれいな場所はありますか。"]
      ],
      comments: [
        ["Being in nature is so refreshing.", "自然の中にいると、すごく気分がすっきりしますよね。"],
        ["I love the sound of the waves at the beach.", "海の波の音が大好きです。"]
      ],
      me: [["Me? I like walking in the park on sunny mornings.", "私ですか？晴れた朝に公園を歩くのが好きです。"]] },
    { id: 'shopping', re: /\b(shopping|shop|shops|clothes|fashion|buy|bought|store|stores|mall|brand|brands|shoes)\b/i,
      qs: [
        ["Where do you usually go shopping?", "ふだんどこで買い物をしますか。"],
        ["Do you prefer shopping online or in stores?", "ネットとお店、どちらで買い物するのが好きですか。"],
        ["What's the last thing you bought for yourself?", "最近自分のために買ったものは何ですか。"],
        ["Do you have a favorite brand?", "好きなブランドはありますか。"],
        ["Are you careful with money, or do you sometimes buy things on impulse?", "お金は慎重に使うほうですか、それともときどき衝動買いしますか。"]
      ],
      comments: [
        ["Shopping is a good way to change your mood.", "買い物は気分転換にいいですよね。"],
        ["It's fun to find something nice on sale.", "セールですてきなものを見つけると楽しいですよね。"]
      ],
      me: [["Me? I usually shop online because it's easy, but I love bookstores.", "私ですか？楽なのでたいていネットで買いますが、本屋さんは大好きです。"]] },
    { id: 'art', re: /\b(draw|drawing|paint|painting|photo|photos|photography|pictures|camera|art|museum|museums|design|writing|illustration|illustrations|crafts)\b/i,
      qs: [
        ["How did you get into it?", "どうやってそれにハマったのですか。"],
        ["What do you like to draw or take pictures of?", "何を描いたり撮ったりするのが好きですか。"],
        ["Do you share your work online?", "作品をネットで公開していますか。"],
        ["Have you been to any museums recently?", "最近美術館に行きましたか。"],
        ["Who is an artist you really like?", "本当に好きな芸術家は誰ですか。"]
      ],
      comments: [
        ["That's wonderful. Being creative is a great way to express yourself.", "すてきですね。何かを作ることは自分を表現するいい方法です。"],
        ["I'd love to see your work someday!", "いつかあなたの作品を見てみたいです！"]
      ],
      me: [["Me? I'm not good at drawing, but I like taking photos of the sky.", "私ですか？絵は苦手ですが、空の写真を撮るのが好きです。"]] },
    { id: 'weather', re: /\b(weather|rain|rainy|sunny|snow|snowy|summer|winter|spring|autumn|season|seasons|typhoon)\b/i,
      qs: [
        ["What's your favorite season?", "いちばん好きな季節はいつですか。"],
        ["What do you like to do on rainy days?", "雨の日は何をするのが好きですか。"],
        ["Do you prefer hot weather or cold weather?", "暑いのと寒いの、どちらが好きですか。"],
        ["What's the weather usually like where you live?", "あなたの住んでいるところは、ふだんどんな天気ですか。"],
        ["What do you like to do in summer?", "夏は何をするのが好きですか。"]
      ],
      comments: [
        ["Each season has something special, doesn't it?", "どの季節にも特別なよさがありますよね。"],
        ["I love spring because of the cherry blossoms.", "桜が咲くので春が大好きです。"]
      ],
      me: [["Me? I like autumn the most. The weather is cool, and the food is great.", "私ですか？秋がいちばん好きです。涼しいし、食べ物もおいしいので。"]] },
    { id: 'food', re: /\b(food|foods|eat|eating|ate|lunch|dinner|breakfast|ramen|sushi|curry|pizza|pasta|cake|sweets|chocolate|coffee|tea|restaurant|restaurants|cafe|café|delicious|tasty|meat|fish|vegetables|fruit|snack|snacks|noodles|rice|bread)\b/i,
      qs: [
        ["What's your favorite dish?", "いちばん好きな料理は何ですか。"],
        ["Is there any food you can't eat?", "食べられないものはありますか。"],
        ["What's the best restaurant you've ever been to?", "今までで最高のレストランはどこですか。"],
        ["What do you usually have for breakfast?", "朝ごはんはふだん何を食べますか。"],
        ["Do you prefer sweet food or spicy food?", "甘いものと辛いもの、どちらが好きですか。"],
        ["Have you ever tried food from another country that surprised you?", "驚いた外国の料理を食べたことはありますか。"]
      ],
      comments: [
        ["That sounds delicious! Now I'm getting hungry.", "おいしそう！お腹がすいてきました。"],
        ["I love trying new food. Last week I tried Thai curry for the first time.", "新しい料理を食べるのが大好きです。先週初めてタイカレーを食べました。"],
        ["Food is one of the best things in life, I think.", "食べることは人生で最高の楽しみの一つだと思います。"]
      ],
      me: [
        ["Me? I'm a big fan of ramen. I could eat it every day!", "私ですか？ラーメンが大好きです。毎日でも食べられます！"],
        ["My favorite is probably curry and rice. It's simple, but so good.", "たぶんカレーライスが一番好きです。シンプルだけど、すごくおいしいです。"]
      ] },
    { id: 'relax', re: /\b(sleep|sleeping|slept|relax|relaxing|rest|nap|bath|lazy)\b/i,
      qs: [
        ["What helps you relax the most?", "いちばんリラックスできることは何ですか。"],
        ["How many hours do you usually sleep?", "ふだん何時間くらい寝ますか。"],
        ["What does a perfect day off look like for you?", "あなたにとって完璧な休日はどんな一日ですか。"],
        ["Are you a morning person or a night person?", "朝型ですか、夜型ですか。"],
        ["What do you do when you can't sleep?", "眠れないときはどうしますか。"]
      ],
      comments: [
        ["Rest is really important. You need time to recharge.", "休むことは本当に大切です。充電する時間が必要ですよね。"],
        ["Staying home and doing nothing is sometimes the best plan!", "家で何もしないのが最高の予定のときもありますよね！"]
      ],
      me: [["Me? I relax by taking a long bath and listening to music.", "私ですか？ゆっくりお風呂に入って音楽を聴くとリラックスできます。"]] }
  ],

  // 相づち（答えの内容に合わせて選ぶ）
  react: {
    positive: [
      ["That sounds great!", "それはいいですね！"], ["Oh, nice!", "いいですね！"], ["That sounds like a lot of fun!", "すごく楽しそうですね！"],
      ["Wow, I like that!", "わあ、いいですね！"], ["How nice!", "すてきですね！"], ["That's awesome!", "最高ですね！"],
      ["I love that!", "それ、いいですね！"], ["That's cool!", "かっこいいですね！"]
    ],
    goodnews: [
      ["Lucky you!", "いいなあ！"], ["Good for you!", "よかったですね！"], ["That's exciting!", "わくわくしますね！"],
      ["Wow, that sounds amazing!", "わあ、すごくよさそう！"]
    ],
    negative: [
      ["Oh, I see. That sounds tough.", "そうなんですね。大変そうですね。"], ["I understand.", "分かります。"],
      ["Oh no. I know how that feels.", "ああ、その気持ち分かります。"], ["That must be hard.", "それは大変ですね。"],
      ["I'm sorry to hear that.", "それはお気の毒に。"], ["That sounds stressful.", "ストレスがたまりそうですね。"]
    ],
    notbad: [["Not bad? Good to hear.", "悪くない？それはよかった。"], ["Oh, good.", "よかったです。"]],
    never: [
      ["Oh, never? Maybe you should try it sometime!", "一度もないんですか？いつか試してみてもいいかもしれませんね！"],
      ["Really? Not even once?", "本当に？一度も？"],
      ["I see. There's a first time for everything!", "なるほど。何事にも初めてはありますからね！"]
    ],
    longtime: [
      ["Wow, that's a long time!", "わあ、長いですね！"],
      ["That's amazing. You must be really good at it now.", "すごい。もうかなり上手なんでしょうね。"]
    ],
    same: [["Oh, we have something in common!", "共通点がありますね！"], ["Great minds think alike!", "気が合いますね！"]],
    reason: [
      ["That makes sense.", "なるほど、納得です。"], ["I see what you mean.", "言いたいこと、分かります。"],
      ["That's a good reason.", "いい理由ですね。"], ["Oh, I see why.", "なるほど、だからなんですね。"]
    ],
    example: [["That's a good example.", "いい例ですね。"], ["Oh, I can picture that.", "目に浮かびます。"]],
    neutral: [
      ["I see.", "なるほど。"], ["Oh, really?", "へえ、そうなんですか。"], ["Interesting!", "面白いですね！"],
      ["Got it.", "なるほどね。"], ["Thanks for telling me.", "教えてくれてありがとう。"],
      ["Okay, I see.", "なるほど、そうなんですね。"], ["Is that so?", "そうなんですね。"]
    ],
    long: [
      ["Wow, you explained that really well.", "わあ、とても上手に説明してくれましたね。"],
      ["Great answer!", "いい答えですね！"], ["I can tell you thought about that.", "よく考えてくれたのが分かります。"]
    ]
  },
  // 深掘りの質問の前に付けるつなぎ（, で終わるものは次の質問の頭を小文字にする）
  bridges: [
    ["By the way,", "ところで、"], ["I'm curious.", "気になるんですが、"], ["Can I ask you something?", "聞いてもいいですか。"],
    ["So,", "それで、"], ["Let me ask you this.", "これを聞かせてください。"], ["Speaking of that,", "そういえば、"]
  ],
  // 答えが短いときに、もう少し聞く
  more: [
    ["Can you tell me a little more?", "もう少し教えてもらえますか。"], ["Oh? Tell me more!", "へえ、もっと聞かせて！"],
    ["Could you tell me why?", "理由を教えてもらえますか。"], ["Can you give me an example?", "例を挙げてもらえますか。"],
    ["What else can you tell me about it?", "ほかにも何か教えてもらえますか。"]
  ],
  moreLead: [["I see.", "なるほど。"], ["Okay.", "そうなんですね。"], ["Oh, really?", "へえ、そうなんですか。"]],
  // 話題が見つからないときの深掘り
  general: [
    ["Why is that?", "それはどうしてですか。"], ["How did you feel about that?", "それについてどう感じましたか。"],
    ["Can you tell me more about it?", "それについてもっと教えてもらえますか。"],
    ["What do you like most about it?", "そのどんなところがいちばん好きですか。"],
    ["Has it always been like that?", "ずっとそうなのですか。"]
  ],
  // 質問を返されたときの答え（話題が分からないとき）
  me: [
    ["Good question! For me, I really enjoy talking with people, just like this.", "いい質問ですね！私は、こうして人と話すのが本当に好きです。"],
    ["Me? I think I'm pretty similar to you!", "私ですか？あなたとけっこう似ていると思います！"]
  ],
  thanks: [
    ["Thank you. I enjoyed hearing about that!", "ありがとう。その話、楽しかったです！"],
    ["Thanks for sharing. That was interesting!", "話してくれてありがとう。面白かったです！"],
    ["Great, thank you!", "いいですね、ありがとう！"],
    ["I really enjoyed our talk. Thank you!", "話せて本当に楽しかったです。ありがとう！"],
    ["Thanks! I learned a lot about you.", "ありがとう！あなたのことがよく分かりました。"]
  ],
  next: [
    ["Okay, next question.", "では、次の質問です。"], ["Here is my next question.", "次の質問です。"],
    ["Let me ask you something else.", "別のことを聞かせてください。"],
    ["Now, let's talk about something different.", "では、別の話をしましょう。"],
    ["Okay, I have another question for you.", "では、もう一つ質問があります。"]
  ],
  inEnglish: [
    ["Can you try saying that in English? Simple words are fine.", "それを英語で言ってみてもらえますか。簡単な言葉で大丈夫です。"],
    ["Let's try it in English! Even a few words are okay.", "英語で言ってみましょう！少しの単語でも大丈夫です。"]
  ],
  // データにある「続けて聞く質問」の日本語訳（字幕用）
  followJa: {
    "What do you like to do in your free time?": "暇なときは何をするのが好きですか。",
    "How would your friends describe you?": "友達はあなたのことをどんな人だと言うと思いますか。",
    "What is the best thing about your town?": "あなたの町のいちばんいいところは何ですか。",
    "Is there anything you would change about it?": "変えたいところはありますか。",
    "What time do you usually get up?": "ふだん何時に起きますか。",
    "When do you feel most productive?": "いちばんはかどるのはいつですか。",
    "How did you get good at it?": "どうやって上手になったのですか。",
    "Is there something you want to be better at?": "もっと上手になりたいことはありますか。",
    "Do you get along well with your family?": "家族とは仲がいいですか。",
    "What do you usually do together?": "ふだん一緒に何をしますか。",
    "What is the hardest part of learning English for you?": "あなたにとって英語の勉強でいちばん大変なのは何ですか。",
    "How do you usually study English?": "ふだんどうやって英語を勉強していますか。",
    "What is your favorite part of the day?": "一日の中でいちばん好きな時間はいつですか。",
    "Is your weekend very different from your weekdays?": "週末は平日とかなり違いますか。",
    "How long does it take?": "どのくらい時間がかかりますか。",
    "What do you do while you are commuting?": "通勤・通学中は何をしていますか。",
    "Do you ever skip breakfast?": "朝ごはんを抜くことはありますか。",
    "Do you prefer a Japanese or a Western breakfast?": "和食と洋食の朝ごはん、どちらが好きですか。",
    "Do you take a bath or a shower?": "お風呂に入りますか、それともシャワーですか。",
    "What time do you usually go to bed?": "ふだん何時に寝ますか。",
    "Which housework do you dislike the most?": "いちばん嫌いな家事は何ですか。",
    "Do you think housework should be shared equally?": "家事は平等に分担するべきだと思いますか。",
    "What apps do you use the most?": "いちばんよく使うアプリは何ですか。",
    "Do you think you use your phone too much?": "スマホを使いすぎていると思いますか。",
    "When did you start it?": "いつ始めましたか。",
    "How often do you do it?": "どのくらいの頻度でしていますか。",
    "Do you have a favorite singer or band?": "好きな歌手やバンドはいますか。",
    "Have you ever been to a concert?": "コンサートに行ったことはありますか。",
    "What was it about?": "どんな内容でしたか。",
    "Do you prefer watching movies at home or in a theater?": "映画は家で見るのと映画館で見るのと、どちらが好きですか。",
    "Do you like watching sports too?": "スポーツを見るのも好きですか。",
    "What sport would you like to try in the future?": "将来やってみたいスポーツは何ですか。",
    "What kind of books do you usually read?": "ふだんどんな本を読みますか。",
    "Do you prefer paper books or e-books?": "紙の本と電子書籍、どちらが好きですか。",
    "Would you spend it alone or with someone?": "一人で過ごしますか、それとも誰かと過ごしますか。",
    "Why would you choose that?": "どうしてそれを選ぶのですか。",
    "How often do you eat it?": "どのくらいの頻度で食べますか。",
    "Can you make it yourself?": "自分で作れますか。",
    "What is the best dish you can make?": "あなたが作れるいちばんおいしい料理は何ですか。",
    "Who taught you how to cook?": "誰に料理を教わりましたか。",
    "What kind of restaurant do you like?": "どんなレストランが好きですか。",
    "How often do you eat out?": "どのくらいの頻度で外食しますか。",
    "Have you always disliked it?": "昔からずっと苦手なのですか。",
    "Is there a food you didn't like as a child but like now?": "子どものころは苦手だったけど、今は好きな食べ物はありますか。",
    "Why do you recommend it?": "どうしてそれをすすめるのですか。",
    "Where is the best place to eat it?": "それを食べるならどこがいちばんですか。",
    "What do you do to stay healthy?": "健康のために何をしていますか。",
    "Do you ever eat junk food?": "ジャンクフードを食べることはありますか。",
    "Do you prefer traveling alone or with others?": "一人旅と誰かとの旅行、どちらが好きですか。",
    "How do you usually plan your trips?": "旅行の計画はふだんどうやって立てますか。",
    "What did you do there?": "そこで何をしましたか。",
    "Would you like to go back someday?": "いつかまた行きたいですか。",
    "What would you like to do there?": "そこで何をしたいですか。",
    "How long would you like to stay?": "どのくらい滞在したいですか。",
    "How did you solve it?": "どうやって解決しましたか。",
    "What did you learn from that experience?": "その経験から何を学びましたか。",
    "Do you usually pack a lot or a little?": "荷物はふだん多いですか、少ないですか。",
    "Have you ever forgotten something important?": "大事なものを忘れたことはありますか。",
    "What is the best season to go there?": "そこへ行くのにいちばんいい季節はいつですか。",
    "How do people usually get there?": "そこへはふつうどうやって行きますか。",
    "What do you like about it?": "そのどんなところが好きですか。",
    "What is the most difficult part?": "いちばん大変なところは何ですか。",
    "What was your favorite subject?": "好きな教科は何でしたか。",
    "Were you in any clubs?": "何か部活に入っていましたか。",
    "Why do you think so?": "どうしてそう思うのですか。",
    "Can you give an example?": "例を挙げてもらえますか。",
    "What skills would you need for that job?": "その仕事にはどんな力が必要だと思いますか。",
    "What are you doing now to get closer to it?": "それに近づくために今何をしていますか。",
    "Who do you talk to when you have a problem?": "困ったときは誰に相談しますか。",
    "What do you do on a really bad day?": "本当についていない日は何をしますか。",
    "What are the good points of working from home?": "在宅勤務のいいところは何ですか。",
    "What are the bad points?": "よくないところは何ですか。",
    "Who were you with?": "誰と一緒でしたか。",
    "What was the best part?": "いちばんよかったのはどんなところですか。",
    "How old were you then?": "そのとき何歳でしたか。",
    "Why do you remember it so well?": "どうしてそんなによく覚えているのですか。",
    "How did you celebrate?": "どうやってお祝いしましたか。",
    "Who did you tell first?": "最初に誰に伝えましたか。",
    "What surprised you the most?": "いちばん驚いたことは何ですか。",
    "Would you do it again?": "またやりたいですか。",
    "Do you laugh easily?": "よく笑うほうですか。",
    "Who is the funniest person you know?": "あなたの知っているいちばん面白い人は誰ですか。",
    "Who gave it to you?": "誰にもらいましたか。",
    "Do you still have it?": "今でも持っていますか。",
    "What is one problem with your choice?": "その選択の問題点を1つ挙げるとしたら何ですか。",
    "Where would you like to live when you are older?": "年をとったらどこに住みたいですか。",
    "At what age is it okay to have one?": "何歳から持ってもいいと思いますか。",
    "What rules should parents make?": "親はどんなルールを作るべきですか。",
    "What is the best way to learn a language?": "言葉を学ぶいちばんいい方法は何ですか。",
    "Which language would you like to learn next?": "次はどの言葉を学びたいですか。",
    "What makes people so busy?": "人はどうしてそんなに忙しいのでしょうか。",
    "How can people make more free time?": "どうすれば自由な時間を増やせますか。",
    "What do you usually buy online?": "ネットでふだん何を買いますか。",
    "Is there anything you would never buy online?": "ネットでは絶対に買わないものはありますか。",
    "What do you do in your daily life?": "ふだんの生活で何をしていますか。",
    "Do you think companies should do more?": "企業はもっと取り組むべきだと思いますか。"
  }
};
