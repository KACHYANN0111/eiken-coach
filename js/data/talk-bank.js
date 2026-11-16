/* 英会話の表現集（オリジナル）
 * cats[].cards[]: 同じ意味・同じ場面で使える表現のまとまり
 *   ja：まとまりの意味 / scene：使う場面 / ex・exJa：使用例（" / " で発言を区切る）
 *   vs[]：表現 { en, ja（日本語訳）, lv（1 初級・2 中級・3 上級）, note（ニュアンス・使い分け） }
 *   類似表現 = 同じまとまりの他の表現
 * 書き方：C(意味, 場面, [[英語, 日本語訳, 難易度, ニュアンス], ...], 使用例, 使用例の訳) */
var TALK_BANK = (() => {
  const C = (ja, scene, vs, ex, exJa) => ({ ja, scene, ex, exJa, vs: vs.map(([en, vja, lv, note]) => ({ en, ja: vja, lv, note })) });
  const groups = [
    { id: 'daily', name: '日常会話', desc: '話題ごとの定番表現' },
    { id: 'skill', name: '会話を続けるコツ', desc: '質問・返事・相づち・意見・聞き返し・気持ち' }
  ];
  const cats = [
    /* ===================== 日常会話 ===================== */
    { id: 'greet', group: 'daily', icon: '👋', name: 'あいさつ', cards: [
      C('調子を聞く', '会ったときのあいさつ', [
        ["How are you?", "元気ですか。", 1, "いちばん基本。誰にでも使える"],
        ["How's it going?", "調子どう？", 1, "友達・同僚に。カジュアルで、会話ではとてもよく使う"],
        ["How have you been?", "元気にしてた？", 2, "しばらく会っていなかった人に（現在完了で「この間ずっと」）"],
        ["What's new?", "最近どう？", 2, "近況を聞く軽いあいさつ。Not much. （特に何も）と返すことが多い"],
        ["How are things with you?", "そちらはお変わりありませんか。", 3, "少していねいで温かみのある聞き方"]
      ], "A: Hi, Emma! How's it going? / B: Pretty good, thanks. How about you?", "A: やあエマ、調子どう？ / B: いい感じだよ、ありがとう。あなたは？"),
      C('元気だと答える', '調子を聞かれたとき', [
        ["I'm good, thanks.", "元気だよ、ありがとう。", 1, "基本の返事。thanks を付けると自然"],
        ["Pretty good.", "まあまあいいよ。", 1, "くだけた返事。good より少し控えめ"],
        ["Not bad.", "悪くないよ。", 1, "実は前向きな返事。英語では「なかなかいい」に近い"],
        ["Same as usual.", "いつもどおりだよ。", 2, "特に変わりがないとき"],
        ["Couldn't be better!", "最高だよ！", 3, "「これ以上よくなりようがない」＝とても調子がいい"]
      ], "A: How are you today? / B: Not bad. I'm a little tired, but I'm okay.", "A: 今日の調子はどう？ / B: 悪くないよ。少し疲れてるけど大丈夫。"),
      C('久しぶりに会う', 'しばらくぶりに会ったとき', [
        ["Long time no see!", "久しぶり！", 1, "くだけた定番。友達に"],
        ["It's been a while.", "しばらくぶりだね。", 2, "幅広く使える。目上の人にもOK"],
        ["It's been ages!", "ほんとに久しぶり！", 2, "ages＝長い時間。再会をおおげさに喜ぶ"],
        ["I haven't seen you in a long time.", "長いこと会っていなかったね。", 2, "文の形でていねいに言う"]
      ], "A: Ken? Long time no see! / B: I know! It's been ages. You look great.", "A: ケン？久しぶり！ / B: ほんとに！何年ぶりだろう。元気そうだね。"),
      C('はじめまして', '初対面のあいさつ', [
        ["Nice to meet you.", "はじめまして。", 1, "基本。返事は Nice to meet you, too."],
        ["It's a pleasure to meet you.", "お会いできて光栄です。", 2, "ていねい。仕事や目上の人に"],
        ["Good to finally meet you.", "やっとお会いできましたね。", 2, "話には聞いていた人・オンラインで知っていた人に"],
        ["I've heard a lot about you.", "お噂はかねがね伺っています。", 3, "紹介されて会ったときに添えると好印象"]
      ], "A: This is my friend, Lisa. / B: Nice to meet you, Lisa. I've heard a lot about you.", "A: こちらは友達のリサ。 / B: はじめまして、リサ。お話はよく聞いています。"),
      C('別れのあいさつ', '別れるとき', [
        ["See you later.", "またね。", 1, "その日のうちに会わなくても使える定番"],
        ["See you soon.", "また近いうちに。", 1, "近いうちに会う予定があるとき"],
        ["Take care.", "気をつけてね。", 1, "別れ際の気づかい。メールの最後にも"],
        ["Have a good one!", "よい一日を！", 2, "店員さんや知り合いに。day / weekend の代わりに one"],
        ["Let's catch up soon.", "近いうちにゆっくり話そう。", 2, "catch up＝近況を話し合う"]
      ], "A: I have to go now. / B: Okay. Take care, and let's catch up soon!", "A: もう行かなきゃ。 / B: わかった。気をつけてね、近いうちにまた話そう！"),
      C('会話を切り上げる', '話を終えたいとき', [
        ["It was nice talking to you.", "話せてよかったです。", 1, "会話の締めの定番"],
        ["I should get going.", "そろそろ行かなきゃ。", 2, "やんわり切り上げる。I'd better go. も同じ"],
        ["Let's talk again sometime.", "また話しましょう。", 2, "次につなげる一言"],
        ["I'll let you go.", "このへんで失礼しますね。", 3, "「（忙しいでしょうから）解放しますね」と相手を気づかう"]
      ], "A: Oh, it's already six. I should get going. / B: Sure. It was nice talking to you!", "A: もう6時だ。そろそろ行かなきゃ。 / B: うん。話せてよかった！")
    ] },
    { id: 'intro', group: 'daily', icon: '🙋', name: '自己紹介', cards: [
      C('名前を伝える', '自己紹介の最初に', [
        ["I'm Yuki.", "ユキです。", 1, "会話ではこれがいちばん自然"],
        ["My name is Yuki.", "私の名前はユキです。", 1, "少しかしこまった言い方。スピーチや電話で"],
        ["Please call me Yuki.", "ユキと呼んでください。", 1, "呼んでほしい名前を伝える"],
        ["Everyone calls me Yu.", "みんなからはユウと呼ばれています。", 2, "ニックネームを伝える"]
      ], "A: Hi, I'm Tom. / B: Hi, Tom. I'm Yukiko, but everyone calls me Yuki.", "A: やあ、トムです。 / B: こんにちは、トム。ユキコです。みんなにはユキって呼ばれてるよ。"),
      C('出身を伝える', '出身を聞かれたとき', [
        ["I'm from Japan.", "日本出身です。", 1, "基本"],
        ["I'm from Osaka, in western Japan.", "西日本の大阪出身です。", 1, "海外の人には場所を付け足すと伝わりやすい"],
        ["I grew up in a small town near Sendai.", "仙台の近くの小さな町で育ちました。", 2, "grow up＝育つ"],
        ["I'm originally from Fukuoka.", "もともとは福岡の出身です。", 2, "今は別の場所に住んでいるときに originally"],
        ["I was born in Nagoya, but I live in Tokyo now.", "名古屋生まれですが、今は東京に住んでいます。", 2, "生まれた場所と今住んでいる場所"]
      ], "A: Where are you from? / B: I'm originally from Fukuoka, but I live in Tokyo now.", "A: どこの出身？ / B: もともとは福岡だけど、今は東京に住んでるよ。"),
      C('学校・仕事を伝える', '何をしているか聞かれたとき', [
        ["I'm a high school student.", "高校生です。", 1, "基本"],
        ["I'm in my second year of university.", "大学2年生です。", 2, "学年は in my ___ year"],
        ["I work as a nurse.", "看護師をしています。", 1, "work as＋職業"],
        ["I work for a car company.", "自動車会社に勤めています。", 2, "work for＋会社"],
        ["I'm between jobs right now.", "今は仕事を探しているところです。", 3, "「求職中」をやわらかく言う"]
      ], "A: So, what do you do? / B: I work for a car company. I'm in the design team.", "A: お仕事は何を？ / B: 自動車会社に勤めていて、デザインのチームにいます。"),
      C('住んでいる場所・暮らし', '住まいについて話すとき', [
        ["I live in Yokohama.", "横浜に住んでいます。", 1, "基本"],
        ["I live with my family.", "家族と住んでいます。", 1, "誰と住んでいるか"],
        ["I live alone in an apartment.", "アパートで一人暮らしです。", 1, "live alone＝一人暮らし"],
        ["I've lived here for about five years.", "ここに住んで5年くらいです。", 2, "期間は現在完了＋for"]
      ], "A: Do you live near here? / B: Yes, I live alone in an apartment. I've lived here for about five years.", "A: この近くに住んでるの？ / B: うん、アパートで一人暮らし。ここに住んで5年くらいかな。"),
      C('性格を伝える', '自分のことを説明するとき', [
        ["I'm a little shy at first.", "最初は少し人見知りです。", 1, "at first で「慣れれば大丈夫」のニュアンス"],
        ["I'm pretty outgoing.", "わりと社交的です。", 2, "outgoing＝人付き合いが好き"],
        ["I'm an easygoing person.", "のんびりした性格です。", 2, "細かいことを気にしない、おおらか"],
        ["People say I'm a good listener.", "聞き上手だと言われます。", 3, "人から言われる長所。自慢っぽくならない"]
      ], "A: What are you like? / B: I'm a little shy at first, but people say I'm a good listener.", "A: どんな性格？ / B: 最初は少し人見知りだけど、聞き上手だって言われるよ。"),
      C('英語を学ぶ理由', '英語の勉強について聞かれたとき', [
        ["I'm learning English to travel abroad.", "海外旅行のために英語を勉強しています。", 1, "to＋動詞で目的"],
        ["I want to make friends from other countries.", "外国の友達を作りたいです。", 1, "make friends＝友達を作る"],
        ["I need English for my job.", "仕事で英語が必要です。", 1, "need A for B"],
        ["I've always wanted to speak English fluently.", "ずっと英語をすらすら話せるようになりたかったんです。", 2, "have always wanted＝ずっと〜したかった"]
      ], "A: Why are you learning English? / B: I want to make friends from other countries. It's fun!", "A: どうして英語を勉強してるの？ / B: 外国の友達を作りたいんだ。楽しいよ！")
    ] },
    { id: 'hobby', group: 'daily', icon: '🎨', name: '趣味', cards: [
      C('趣味を言う', '趣味を聞かれたとき', [
        ["I like playing video games.", "テレビゲームが好きです。", 1, "会話では My hobby is ... より自然"],
        ["My hobby is taking photos.", "趣味は写真を撮ることです。", 1, "hobby はやや改まった響き。自己紹介文で"],
        ["In my free time, I usually read manga.", "暇なときはたいてい漫画を読んでいます。", 1, "いつもしていることを伝える"],
        ["I'm really into K-pop these days.", "最近K-POPにハマっています。", 2, "be into＝夢中になっている"],
        ["I've recently gotten into camping.", "最近キャンプを始めて、ハマっています。", 3, "get into＝（新しく）ハマる"]
      ], "A: What do you do in your free time? / B: I'm really into baking these days. I made a cake last weekend.", "A: 暇なときは何してるの？ / B: 最近お菓子作りにハマってて、先週末はケーキを作ったよ。"),
      C('趣味を聞く', '相手のことを知りたいとき', [
        ["Do you have any hobbies?", "何か趣味はありますか。", 1, "基本"],
        ["What do you do in your free time?", "暇なときは何をしていますか。", 1, "hobby より答えやすい聞き方"],
        ["What do you like to do on weekends?", "週末は何をするのが好きですか。", 1, "具体的で答えやすい"],
        ["What are you into these days?", "最近ハマっていることは？", 2, "くだけた聞き方"],
        ["How do you usually unwind?", "ふだんどうやって息抜きしていますか。", 3, "unwind＝くつろぐ・リラックスする"]
      ], "A: What are you into these days? / B: Running! I just signed up for a 10K race.", "A: 最近ハマってることある？ / B: ランニング！10キロのレースに申し込んだところなんだ。"),
      C('どのくらいやるか', '頻度を伝えるとき', [
        ["I play tennis every weekend.", "毎週末テニスをしています。", 1, "every＋時"],
        ["I go to the gym two or three times a week.", "週に2〜3回ジムに行きます。", 1, "回数＋a week"],
        ["I try to read a little every night.", "毎晩少しずつ読むようにしています。", 2, "try to＝〜するようにしている"],
        ["Not as often as I'd like.", "思っているほどはできていません。", 3, "時間がなくてなかなかできないとき"]
      ], "A: How often do you play the guitar? / B: Not as often as I'd like. Maybe once a week.", "A: ギターはどのくらい弾くの？ / B: 思うほどは弾けてないんだ。週に1回くらいかな。"),
      C('始めたきっかけ', 'きっかけを聞かれたとき', [
        ["I started playing the guitar in high school.", "高校でギターを始めました。", 1, "start＋〜ing"],
        ["My friend got me into it.", "友達がきっかけでハマりました。", 2, "get 人 into＝人をハマらせる"],
        ["I've been doing it since I was a kid.", "子どもの頃からやっています。", 2, "現在完了進行形で「ずっと続けている」"],
        ["I got hooked after watching a video online.", "ネットで動画を見てハマりました。", 3, "get hooked＝夢中になる"]
      ], "A: How did you start climbing? / B: My friend got me into it. Now I go every week!", "A: どうしてクライミングを始めたの？ / B: 友達がきっかけでハマったんだ。今は毎週行ってるよ！"),
      C('好きな理由', '理由を伝えるとき', [
        ["It helps me relax.", "リラックスできるんです。", 1, "help 人 動詞"],
        ["It's a good way to relieve stress.", "ストレス解消にいいんです。", 2, "relieve stress＝ストレスを和らげる"],
        ["I can forget about everything else.", "ほかのことを全部忘れられます。", 2, "夢中になれる理由"],
        ["It's fun to see myself improve.", "上達していくのが楽しいんです。", 2, "see 人 動詞＝人が〜するのを見る"]
      ], "A: Why do you like swimming? / B: It's a good way to relieve stress. I feel refreshed after.", "A: どうして水泳が好きなの？ / B: ストレス解消にいいんだ。泳いだあとはすっきりするよ。"),
      C('やってみたいこと', '挑戦したいことを話すとき', [
        ["I'd like to try surfing someday.", "いつかサーフィンをやってみたいです。", 2, "I'd like to＝〜したい（ていねい）"],
        ["I've always wanted to learn the piano.", "ずっとピアノを習いたいと思っていました。", 2, "長年の願い"],
        ["I'm not very good at it, but I enjoy it.", "上手ではないけど、楽しんでいます。", 1, "謙遜しながら好きなことを言う"],
        ["It's on my bucket list.", "死ぬまでにやりたいことリストに入っています。", 3, "bucket list＝人生でやりたいことリスト"]
      ], "A: Have you ever tried skydiving? / B: Not yet, but it's on my bucket list!", "A: スカイダイビングしたことある？ / B: まだだけど、死ぬまでにやりたいことリストに入ってるよ！")
    ] },
    { id: 'food', group: 'daily', icon: '🍜', name: '好きな食べ物', cards: [
      C('好きな食べ物を言う', '食べ物の好みを聞かれたとき', [
        ["I love sushi.", "お寿司が大好きです。", 1, "like より気持ちが強い"],
        ["My favorite food is ramen.", "いちばん好きな食べ物はラーメンです。", 1, "基本"],
        ["I'm a big fan of Italian food.", "イタリア料理が大好きです。", 2, "a big fan of＝〜の大ファン"],
        ["I have a sweet tooth.", "甘いものに目がないんです。", 2, "sweet tooth＝甘党"],
        ["I can't get enough of spicy food.", "辛い料理はいくらでも食べられます。", 3, "「いくらあっても足りない」ほど好き"]
      ], "A: What kind of food do you like? / B: I have a sweet tooth. I could eat cake every day!", "A: どんな食べ物が好き？ / B: 甘いものに目がないの。毎日ケーキを食べられるくらい！"),
      C('苦手な食べ物を言う', '苦手・食べられないものを伝えるとき', [
        ["I don't really like tomatoes.", "トマトはあまり好きじゃないです。", 1, "really を入れると「あまり」とやわらかくなる"],
        ["I'm not a big fan of natto.", "納豆はちょっと苦手です。", 2, "やんわり苦手を伝える"],
        ["I can't eat raw fish.", "生の魚が食べられません。", 1, "食べられないことをはっきり"],
        ["I'm allergic to shrimp.", "エビのアレルギーがあります。", 2, "be allergic to＝〜にアレルギーがある"]
      ], "A: Is there anything you can't eat? / B: I'm allergic to shrimp, but everything else is fine.", "A: 食べられないものはある？ / B: エビのアレルギーがあるけど、ほかは大丈夫。"),
      C('味の感想を言う', '食べながら', [
        ["This is delicious!", "これ、おいしい！", 1, "基本のほめ言葉"],
        ["This is so good. I could eat this every day.", "すごくおいしい。毎日でも食べられる。", 2, "could で「（仮に）できるくらい」"],
        ["It's a little too salty for me.", "私には少ししょっぱすぎます。", 1, "for me で個人の感想にする"],
        ["It tastes like chicken.", "鶏肉みたいな味がします。", 1, "taste like＝〜のような味"],
        ["It has a really rich flavor.", "すごくコクがありますね。", 3, "rich＝濃厚・コクがある"]
      ], "A: How's the curry? / B: It's so good. It has a really rich flavor.", "A: カレーはどう？ / B: すごくおいしい。コクがあるね。"),
      C('料理について話す', '自炊・外食の話', [
        ["I cook dinner almost every day.", "ほぼ毎日夕食を作ります。", 1, "almost every day＝ほぼ毎日"],
        ["I'm not very good at cooking.", "料理はあまり得意ではありません。", 1, "be good at＝得意"],
        ["I usually eat out.", "たいてい外食です。", 1, "eat out＝外食する"],
        ["I'm trying to cook at home more.", "もっと家で料理するようにしています。", 2, "be trying to＝努力中"]
      ], "A: Do you cook? / B: Not really. I usually eat out, but I'm trying to cook at home more.", "A: 料理する？ / B: あまり。たいてい外食だけど、もっと家で作るようにしてるんだ。"),
      C('食事に誘う・おすすめを聞く', '食事の場面で', [
        ["Do you want to grab lunch?", "お昼を食べに行かない？", 2, "grab＝さっと食べる・飲む"],
        ["What do you recommend?", "おすすめは何ですか。", 1, "店員さんや詳しい人に"],
        ["Is there anything you can't eat?", "食べられないものはありますか。", 1, "誘う前・料理を出す前の気づかい"],
        ["Have you ever tried Japanese curry?", "日本のカレーを食べたことはありますか。", 1, "経験を聞く"]
      ], "A: Do you want to grab lunch? / B: Sure! What do you recommend around here?", "A: お昼食べに行かない？ / B: いいね！このへんでおすすめある？"),
      C('日本の食べ物を説明する', '海外の人に食べ物を紹介するとき', [
        ["It's a kind of noodle soup.", "麺の入ったスープの一種です。", 1, "a kind of＝〜の一種"],
        ["It's made from soybeans.", "大豆からできています。", 1, "made from＝（原料）から作られる"],
        ["It's similar to a pancake.", "パンケーキに似ています。", 1, "similar to＝〜に似ている"],
        ["It's usually eaten at New Year's.", "ふつうはお正月に食べます。", 2, "受け身で習慣を説明"]
      ], "A: What's okonomiyaki? / B: It's similar to a pancake, but it has cabbage and meat in it.", "A: お好み焼きって何？ / B: パンケーキに似てるけど、キャベツやお肉が入ってるんだ。")
    ] },
    { id: 'holiday', group: 'daily', icon: '🏖️', name: '休日の過ごし方', cards: [
      C('週末のことを聞く', '週明けのあいさつ代わりに', [
        ["How was your weekend?", "週末はどうでしたか。", 1, "月曜日の定番"],
        ["Did you do anything fun?", "何か楽しいことした？", 1, "答えやすい聞き方"],
        ["Did you have a good weekend?", "いい週末だった？", 1, "Yes / No で答えやすい"],
        ["What did you get up to?", "何してたの？", 3, "くだけた聞き方（イギリス英語でよく使う）"]
      ], "A: How was your weekend? / B: It was great! I went to the beach with my friends.", "A: 週末どうだった？ / B: 最高だったよ！友達と海に行ったんだ。"),
      C('週末にしたことを話す', '何をしたか聞かれたとき', [
        ["I just stayed home and relaxed.", "家でのんびりしていただけです。", 1, "just で「特別なことはせず」"],
        ["I went shopping with my sister.", "姉と買い物に行きました。", 1, "go shopping（to は付けない）"],
        ["Nothing special.", "特に何も。", 1, "短い返事。このあと少し付け足すと会話が続く"],
        ["I caught up on some sleep.", "寝不足を取り戻しました。", 2, "catch up on＝たまっていたことを片付ける"],
        ["I binge-watched a drama.", "ドラマを一気見しました。", 3, "binge-watch＝一気に見る"]
      ], "A: What did you do on Sunday? / B: Nothing special. I caught up on some sleep and watched TV.", "A: 日曜は何したの？ / B: 特に何も。寝だめしてテレビを見てたよ。"),
      C('予定を言う', 'これからの予定を話すとき', [
        ["I'm going to see a movie this weekend.", "今週末は映画を見に行きます。", 1, "be going to＝予定"],
        ["I'm planning to visit my grandparents.", "祖父母の家に行く予定です。", 2, "plan to＝〜するつもり"],
        ["I don't have any plans yet.", "まだ何も予定はありません。", 1, "yet＝まだ"],
        ["I might go hiking if the weather is nice.", "天気がよければハイキングに行くかも。", 2, "might＝〜かもしれない"]
      ], "A: Any plans for the weekend? / B: I might go hiking if the weather is nice.", "A: 週末は何か予定ある？ / B: 天気がよければハイキングに行くかも。"),
      C('予定を聞く', '相手の予定を知りたいとき', [
        ["Do you have any plans for the weekend?", "週末は何か予定がありますか。", 1, "基本"],
        ["What are you doing this weekend?", "今週末は何するの？", 1, "現在進行形で近い予定を聞く"],
        ["Any big plans?", "何か大きな予定ある？", 2, "短いくだけた聞き方"],
        ["Are you doing anything special for the holidays?", "休みは何か特別なことをする？", 2, "連休・年末年始の前に"]
      ], "A: What are you doing this weekend? / B: I'm going camping with my family.", "A: 今週末は何するの？ / B: 家族でキャンプに行くんだ。"),
      C('誘う', '遊びに誘うとき', [
        ["Do you want to go to the beach?", "海に行かない？", 1, "Do you want to ...? で気軽に誘う"],
        ["How about going to a café?", "カフェに行くのはどう？", 1, "How about＋〜ing"],
        ["Are you free on Saturday?", "土曜日はあいてる？", 1, "まず予定を聞く"],
        ["Would you like to join us?", "一緒に来ませんか。", 2, "ていねいな誘い方"],
        ["Let me know if you're interested.", "興味があったら教えてね。", 2, "相手に断る余地を残す"]
      ], "A: We're having a barbecue on Saturday. Would you like to join us? / B: I'd love to!", "A: 土曜にバーベキューをするんだけど、来ない？ / B: ぜひ！"),
      C('誘いに答える', '誘われたとき', [
        ["Sure, I'd love to!", "うん、ぜひ！", 1, "喜んで受ける"],
        ["Sounds great.", "いいね。", 1, "短い返事"],
        ["I'm sorry, I already have plans.", "ごめん、もう予定があるんだ。", 1, "断るときは理由を短く"],
        ["Maybe next time.", "また今度ね。", 1, "断ったあとに添える"],
        ["Can I let you know later?", "あとで返事してもいい？", 2, "すぐに決められないとき"]
      ], "A: Do you want to see a movie tonight? / B: I'm sorry, I already have plans. Maybe next time!", "A: 今夜映画見に行かない？ / B: ごめん、もう予定があるんだ。また今度ね！")
    ] },
    { id: 'schoolwork', group: 'daily', icon: '🏫', name: '学校・仕事', cards: [
      C('学校について話す', '学校生活を聞かれたとき', [
        ["I go to a high school in Saitama.", "埼玉の高校に通っています。", 1, "go to＋学校"],
        ["I'm studying economics at university.", "大学で経済学を勉強しています。", 1, "専攻を伝える"],
        ["My favorite subject is history.", "好きな教科は歴史です。", 1, "subject＝教科"],
        ["I'm in the tennis club.", "テニス部に入っています。", 1, "部活は club / team"],
        ["I have a test next week, so I'm studying hard.", "来週テストがあるので、がんばって勉強しています。", 1, "so でつなぐ"]
      ], "A: What's your favorite subject? / B: History. I love learning about the past.", "A: 好きな教科は？ / B: 歴史。昔のことを知るのが大好きなんだ。"),
      C('仕事について話す', '仕事を聞かれたとき', [
        ["I work at a hospital.", "病院で働いています。", 1, "work at＋場所"],
        ["I'm in charge of sales.", "営業を担当しています。", 2, "in charge of＝〜の担当"],
        ["I work from home two days a week.", "週2日は在宅勤務です。", 2, "work from home＝在宅勤務"],
        ["I've been at my company for three years.", "今の会社に3年います。", 2, "期間は現在完了"]
      ], "A: Do you go to the office every day? / B: No, I work from home two days a week.", "A: 毎日出社してるの？ / B: ううん、週2日は在宅勤務なんだ。"),
      C('仕事を聞く', '相手の仕事を知りたいとき', [
        ["What do you do?", "お仕事は何をされていますか。", 1, "仕事を聞く定番（今何をしているかではない）"],
        ["What kind of work do you do?", "どんなお仕事ですか。", 1, "もう少し詳しく聞く"],
        ["How do you like your job?", "お仕事はどうですか。", 2, "仕事が気に入っているかを聞く"],
        ["What's the best part of your job?", "お仕事のいちばんいいところは？", 2, "前向きな話を引き出す"]
      ], "A: How do you like your job? / B: I love it. The best part is working with kids.", "A: 仕事はどう？ / B: 大好き。いちばんいいのは子どもたちと関われることかな。"),
      C('忙しさを伝える', '最近の様子を話すとき', [
        ["I've been really busy lately.", "最近すごく忙しいです。", 1, "lately＝最近（現在完了と一緒に）"],
        ["I have a lot of homework.", "宿題がたくさんあります。", 1, "homework は数えられない（a lot of）"],
        ["I worked overtime every day this week.", "今週は毎日残業でした。", 2, "work overtime＝残業する"],
        ["Things have finally calmed down.", "やっと落ち着きました。", 3, "calm down＝落ち着く"]
      ], "A: How's work? / B: I've been really busy lately, but things have finally calmed down.", "A: 仕事はどう？ / B: 最近すごく忙しかったけど、やっと落ち着いたよ。"),
      C('目標・将来を話す', '将来について聞かれたとき', [
        ["I want to be a teacher in the future.", "将来は先生になりたいです。", 1, "want to be＋職業"],
        ["My goal is to study abroad.", "目標は留学することです。", 1, "My goal is to＋動詞"],
        ["I'm thinking about changing jobs.", "転職を考えています。", 2, "be thinking about＋〜ing"],
        ["I'd like to work overseas someday.", "いつか海外で働きたいです。", 2, "overseas＝海外で"]
      ], "A: What do you want to do in the future? / B: My goal is to study abroad and work overseas someday.", "A: 将来は何がしたい？ / B: 留学して、いつか海外で働くのが目標なんだ。")
    ] },
    { id: 'family', group: 'daily', icon: '👨‍👩‍👧', name: '家族', cards: [
      C('家族構成を伝える', '家族について聞かれたとき', [
        ["There are four people in my family.", "うちは4人家族です。", 1, "基本の言い方"],
        ["I have an older brother and a younger sister.", "兄と妹がいます。", 1, "older / younger で上下を言う"],
        ["I'm an only child.", "一人っ子です。", 1, "only child＝一人っ子"],
        ["I live with my parents and my grandmother.", "両親と祖母と住んでいます。", 1, "誰と住んでいるか"]
      ], "A: Do you have any brothers or sisters? / B: Yes, I have an older brother and a younger sister.", "A: 兄弟はいる？ / B: うん、兄と妹がいるよ。"),
      C('家族のことを話す', '家族の人について', [
        ["My father works at a bank.", "父は銀行で働いています。", 1, "基本"],
        ["My mother is a great cook.", "母は料理がとても上手です。", 1, "a great cook＝料理上手（cooker は調理器具）"],
        ["My sister and I are very close.", "姉とはとても仲がいいです。", 2, "close＝仲がいい"],
        ["We don't see each other very often.", "あまり会えていません。", 2, "each other＝お互い"],
        ["I take after my mother.", "私は母親似です。", 3, "take after＝（親）に似ている"]
      ], "A: Who do you look like? / B: I take after my mother. We have the same smile.", "A: 誰に似てるの？ / B: 母親似なんだ。笑顔がそっくりなの。"),
      C('家族について聞く', '相手の家族を知りたいとき', [
        ["Do you have any brothers or sisters?", "兄弟姉妹はいますか。", 1, "基本"],
        ["How many people are in your family?", "何人家族ですか。", 1, "家族の人数"],
        ["Are you close to your family?", "家族とは仲がいいですか。", 2, "close to＝〜と親しい"],
        ["What are your parents like?", "ご両親はどんな人ですか。", 2, "What is ___ like?＝どんな人・もの？"]
      ], "A: What are your parents like? / B: They're kind, but a little strict.", "A: ご両親はどんな人？ / B: 優しいけど、ちょっと厳しいかな。"),
      C('ペットの話', 'ペットについて話すとき', [
        ["I have a dog named Momo.", "モモという名前の犬を飼っています。", 1, "named＝〜という名前の"],
        ["We have two cats.", "猫を2匹飼っています。", 1, "家族で飼っているときは We"],
        ["I've always wanted a pet.", "ずっとペットが欲しかったんです。", 2, "長年の願い"],
        ["She's like a member of the family.", "あの子は家族の一員みたいなものです。", 2, "ペットも he / she で呼ぶことが多い"]
      ], "A: Do you have any pets? / B: Yes, I have a dog named Momo. She's like a member of the family.", "A: ペットは飼ってる？ / B: うん、モモって犬。家族の一員みたいなものだよ。"),
      C('家族との時間', '家族との過ごし方を話すとき', [
        ["We usually have dinner together.", "たいてい一緒に夕食を食べます。", 1, "習慣は現在形"],
        ["We go on a family trip every summer.", "毎年夏に家族旅行に行きます。", 1, "go on a trip＝旅行に行く"],
        ["I call my parents every weekend.", "毎週末、両親に電話します。", 1, "離れて暮らしているとき"],
        ["Family time is important to me.", "家族との時間は私にとって大切です。", 2, "important to me＝自分にとって大切"]
      ], "A: Do you spend a lot of time with your family? / B: Yes. We go on a family trip every summer.", "A: 家族とよく過ごす？ / B: うん。毎年夏は家族旅行に行くよ。")
    ] },
    { id: 'friends', group: 'daily', icon: '🤝', name: '友達', cards: [
      C('友達について話す', '友達を紹介するとき', [
        ["She's my best friend.", "彼女は親友です。", 1, "best friend＝いちばんの友達"],
        ["He always makes me laugh.", "彼はいつも笑わせてくれます。", 1, "make 人 laugh"],
        ["We've been friends since elementary school.", "小学校からの友達です。", 2, "since＝〜以来"],
        ["We have a lot in common.", "共通点がたくさんあります。", 2, "have ... in common＝共通点がある"]
      ], "A: How do you know Aya? / B: We've been friends since elementary school. We have a lot in common.", "A: アヤとはどういう知り合い？ / B: 小学校からの友達なんだ。共通点が多いの。"),
      C('友達と何をするか', '遊び方を話すとき', [
        ["We often go to karaoke together.", "よく一緒にカラオケに行きます。", 1, "often＝よく"],
        ["We hang out at the mall.", "ショッピングモールでぶらぶらします。", 2, "hang out＝（友達と）遊ぶ・過ごす"],
        ["We talk on the phone for hours.", "何時間も電話で話します。", 1, "for hours＝何時間も"],
        ["We get together once a month.", "月に1回集まります。", 2, "get together＝集まる"]
      ], "A: What do you usually do with your friends? / B: We hang out at the mall or go to karaoke.", "A: 友達とはふだん何してるの？ / B: モールでぶらぶらしたり、カラオケに行ったりかな。"),
      C('友達ができた話', '出会いを話すとき', [
        ["We met at a part-time job.", "アルバイト先で知り合いました。", 1, "meet の過去形 met"],
        ["I'd like to make more friends.", "もっと友達を作りたいです。", 1, "make friends"],
        ["It's not easy for me to make friends.", "友達を作るのは得意ではありません。", 1, "It's ___ for 人 to ..."],
        ["We hit it off right away.", "すぐに意気投合しました。", 3, "hit it off＝気が合う"]
      ], "A: How did you two meet? / B: We met at a part-time job, and we hit it off right away.", "A: 2人はどうやって知り合ったの？ / B: バイト先で会って、すぐに意気投合したんだ。"),
      C('相談に乗る', '友達が困っているとき', [
        ["What's wrong?", "どうしたの？", 1, "元気がなさそうな人に"],
        ["Do you want to talk about it?", "話を聞こうか？", 1, "無理に聞かない優しさ"],
        ["That must be hard.", "それはつらいよね。", 2, "must＝きっと〜に違いない"],
        ["Don't worry. It'll be okay.", "心配しないで。大丈夫だよ。", 1, "はげます"],
        ["I'm here for you.", "いつでも味方だよ。", 2, "「そばにいるよ」という気持ち"]
      ], "A: You look down. What's wrong? / B: I failed my driving test. / A: That must be hard. I'm here for you.", "A: 元気ないね。どうしたの？ / B: 運転免許の試験に落ちたんだ。 / A: それはつらいね。いつでも話聞くよ。"),
      C('友達にお礼を言う・ほめる', '感謝を伝えるとき', [
        ["You're the best!", "最高だよ！", 1, "くだけた感謝・ほめ言葉"],
        ["You're a really good friend.", "本当にいい友達だね。", 1, "気持ちをまっすぐ伝える"],
        ["Thanks for always being there for me.", "いつもそばにいてくれてありがとう。", 2, "be there for＝支えになる"],
        ["I owe you one.", "借りができたね。", 3, "助けてもらったときの軽いお礼"]
      ], "A: I saved you a seat. / B: Thanks! I owe you one.", "A: 席とっておいたよ。 / B: ありがとう！借りができたね。")
    ] },
    { id: 'travel', group: 'daily', icon: '✈️', name: '旅行', cards: [
      C('旅行の経験を話す', '旅行について聞かれたとき', [
        ["I went to Hawaii last year.", "去年ハワイに行きました。", 1, "いつ行ったかを言うときは過去形"],
        ["I've been to Korea twice.", "韓国には2回行ったことがあります。", 2, "経験は have been to"],
        ["I've never been abroad.", "海外に行ったことはありません。", 2, "abroad の前に to は付けない"],
        ["I traveled around Hokkaido by train.", "電車で北海道を旅しました。", 2, "travel around＝あちこち旅する"]
      ], "A: Have you been abroad? / B: Yes, I've been to Korea twice. I went to Busan last year.", "A: 海外に行ったことある？ / B: うん、韓国に2回。去年は釜山に行ったよ。"),
      C('行きたい場所を話す', '旅行の夢を話すとき', [
        ["I want to go to Italy someday.", "いつかイタリアに行きたいです。", 1, "someday＝いつか"],
        ["I'd love to visit New York.", "ぜひニューヨークに行ってみたいです。", 2, "I'd love to＝ぜひ〜したい"],
        ["Have you ever been to Kyoto?", "京都に行ったことはありますか。", 1, "経験を聞く"],
        ["It's my dream to see the Northern Lights.", "オーロラを見るのが夢です。", 3, "It's my dream to＋動詞"]
      ], "A: Where would you like to go next? / B: I'd love to visit New York. It's my dream to see a Broadway show.", "A: 次はどこに行きたい？ / B: ニューヨークにぜひ行ってみたい。ブロードウェイのショーを見るのが夢なんだ。"),
      C('旅行の感想を言う', '旅行の話をするとき', [
        ["It was amazing!", "最高でした！", 1, "強いほめ言葉"],
        ["The food was great, and the people were so friendly.", "食べ物がおいしくて、人もすごく親切でした。", 1, "よかった点を2つ並べる"],
        ["It was a little expensive, but worth it.", "少し高かったけど、その価値はありました。", 2, "worth it＝それだけの価値がある"],
        ["The view from the hotel was breathtaking.", "ホテルからの景色は息をのむほどでした。", 3, "breathtaking＝息をのむような"]
      ], "A: How was your trip to Okinawa? / B: It was amazing! The sea was so blue.", "A: 沖縄旅行はどうだった？ / B: 最高だった！海がすごく青かったよ。"),
      C('旅先で使う', '旅行中のお願い・質問', [
        ["Could you take a picture of us?", "写真を撮っていただけますか。", 1, "Could you ...? でていねいに頼む"],
        ["Where's the nearest station?", "いちばん近い駅はどこですか。", 1, "nearest＝いちばん近い"],
        ["How do I get to the museum?", "美術館へはどう行けばいいですか。", 1, "get to＝〜に着く"],
        ["Is it within walking distance?", "歩いて行ける距離ですか。", 2, "within walking distance＝徒歩圏内"],
        ["Can you recommend a good place to eat around here?", "このあたりでおすすめの食事場所はありますか。", 2, "地元の人に聞く"]
      ], "A: Excuse me. How do I get to the museum? / B: Go straight for two blocks. It's within walking distance.", "A: すみません。美術館へはどう行けばいいですか。 / B: 2ブロックまっすぐ行ってください。歩いて行けますよ。"),
      C('旅のスタイルを話す', '旅行の好みを話すとき', [
        ["I prefer traveling alone.", "一人旅のほうが好きです。", 2, "prefer＝〜のほうを好む"],
        ["I like to plan everything in advance.", "全部前もって計画したいタイプです。", 2, "in advance＝前もって"],
        ["I usually travel on a budget.", "たいてい節約旅行です。", 3, "on a budget＝予算を抑えて"],
        ["I'm more of a beach person than a city person.", "都会より海が好きなタイプです。", 3, "more of a ___ person＝どちらかというと〜派"]
      ], "A: Do you like big cities? / B: Not really. I'm more of a beach person than a city person.", "A: 大都市は好き？ / B: あんまり。都会より海が好きなタイプなんだ。")
    ] },
    { id: 'abroad', group: 'daily', icon: '🌍', name: '海外生活', cards: [
      C('住んでいる期間を話す', '海外で自己紹介するとき', [
        ["I just moved here last month.", "先月引っ越してきたばかりです。", 1, "just＝〜したばかり"],
        ["I've been living here for two years.", "ここに2年住んでいます。", 2, "現在完了進行形で「ずっと住んでいる」"],
        ["I'm still getting used to life here.", "ここでの生活にまだ慣れているところです。", 2, "get used to＝慣れる"],
        ["I'm here on a working holiday.", "ワーキングホリデーで来ています。", 2, "on＋目的"]
      ], "A: How long have you been here? / B: I just moved here last month, so I'm still getting used to life here.", "A: ここに来てどのくらい？ / B: 先月来たばかりだから、まだこっちの生活に慣れているところなんだ。"),
      C('生活の違いを話す', '日本との違いについて', [
        ["Things are very different from Japan.", "日本とはいろいろ違います。", 1, "different from＝〜と違う"],
        ["The portions here are huge!", "ここの料理の量はすごく多い！", 1, "portion＝一人前の量"],
        ["People here are very friendly.", "ここの人たちはとても親切です。", 1, "基本"],
        ["It took me a while to get used to tipping.", "チップに慣れるのに少し時間がかかりました。", 3, "It took me a while to＝〜するのに時間がかかった"]
      ], "A: What surprised you the most? / B: The portions here are huge! I can never finish my plate.", "A: いちばん驚いたことは？ / B: 料理の量がすごく多いこと！いつも食べきれないんだ。"),
      C('困っていることを伝える', '悩みを話すとき', [
        ["I miss Japanese food.", "日本の食べ物が恋しいです。", 1, "miss＝恋しい"],
        ["Sometimes I feel a little homesick.", "ときどき少しホームシックになります。", 2, "homesick＝ホームシック"],
        ["I'm having trouble understanding the accent.", "なまりを聞き取るのに苦労しています。", 2, "have trouble 〜ing＝〜に苦労する"],
        ["I'm not used to driving on the right.", "右側通行の運転にまだ慣れていません。", 2, "be used to 〜ing＝〜に慣れている"]
      ], "A: How's life here? / B: It's good, but sometimes I feel a little homesick. I miss Japanese food.", "A: こっちの生活はどう？ / B: いいけど、ときどきホームシックになるんだ。日本の食べ物が恋しくて。"),
      C('手続きでお願いする', '銀行・役所・お店で', [
        ["Where can I get a SIM card?", "SIMカードはどこで買えますか。", 1, "Where can I get ...?"],
        ["I'd like to open a bank account.", "銀行口座を開きたいのですが。", 2, "I'd like to＝〜したいのですが（ていねい）"],
        ["What documents do I need?", "どんな書類が必要ですか。", 2, "document＝書類"],
        ["Could you help me fill out this form?", "この用紙の記入を手伝っていただけますか。", 2, "fill out＝記入する"]
      ], "A: Hi. I'd like to open a bank account. / B: Sure. Do you have your passport with you?", "A: こんにちは。銀行口座を開きたいのですが。 / B: かしこまりました。パスポートはお持ちですか。"),
      C('ご近所・地元の人と話す', '新しい場所で交流するとき', [
        ["I'm your new neighbor.", "新しく隣に越してきた者です。", 1, "あいさつのきっかけ"],
        ["Is there a good supermarket around here?", "このあたりにいいスーパーはありますか。", 1, "around here＝この辺に"],
        ["I'd love to learn more about the culture here.", "ここの文化をもっと知りたいです。", 2, "前向きな気持ちを伝える"],
        ["Let me know if there's anything I can do.", "何かできることがあったら言ってください。", 2, "手伝いを申し出る"]
      ], "A: Hi, I'm your new neighbor, Yuki. / B: Welcome! Let me know if you need anything.", "A: こんにちは、隣に越してきたユキです。 / B: ようこそ！何かあったら言ってね。")
    ] },

    /* ===================== 会話を続けるコツ ===================== */
    { id: 'ask', group: 'skill', icon: '❓', name: '質問する表現', cards: [
      C('あなたはどう思いますか？', '相手の意見を聞くとき', [
        ["What do you think?", "どう思う？", 1, "いちばん基本。何にでも使える"],
        ["What do you think about this idea?", "このアイデアについてどう思う？", 1, "about＋話題で具体的に"],
        ["How do you feel about it?", "それについてどう感じる？", 2, "考えより気持ちを聞く"],
        ["What's your opinion on remote work?", "在宅勤務についてのあなたの意見は？", 2, "少し改まった聞き方"],
        ["What's your take on it?", "あなたはどう見てる？", 3, "くだけた言い方。take＝見方"]
      ], "A: Some people say homework should be banned. What do you think? / B: I think a little homework is good.", "A: 宿題をなくすべきだという人もいるけど、どう思う？ / B: 少しの宿題はいいと思うな。"),
      C('なぜそう思いますか？', '理由を聞くとき', [
        ["Why do you think so?", "どうしてそう思うの？", 1, "基本"],
        ["Why is that?", "それはどうして？", 1, "短く自然な聞き方"],
        ["What makes you say that?", "どうしてそう言えるの？", 2, "責める感じがなく、理由を引き出せる"],
        ["How come?", "なんで？", 2, "くだけた言い方。文にするときは普通の語順（How come you're tired?）"]
      ], "A: I think summer is the best season. / B: Oh, why is that? / A: Because I love swimming!", "A: 夏がいちばんいい季節だと思う。 / B: へえ、どうして？ / A: 泳ぐのが大好きだから！"),
      C('どこに行きましたか？', '出かけた先を聞くとき', [
        ["Where did you go?", "どこに行ったの？", 1, "基本（過去形）"],
        ["Where did you go on your trip?", "旅行ではどこに行ったの？", 1, "話題をしぼる"],
        ["Did you go anywhere nice?", "どこかいいところに行った？", 2, "Yes / No で答えやすい"],
        ["Where have you been?", "（最近・今まで）どこに行ってたの？", 2, "久しぶりに会った人に。経験を聞くことも"]
      ], "A: I took a few days off last week. / B: Nice! Did you go anywhere nice?", "A: 先週何日か休みをとったんだ。 / B: いいね！どこかいいところに行った？"),
      C('何をする予定ですか？', '予定を聞くとき', [
        ["What are you going to do?", "何をするつもり？", 1, "基本"],
        ["What are your plans for tomorrow?", "明日の予定は？", 1, "plans で聞く"],
        ["What are you planning to do after graduation?", "卒業後は何をするつもり？", 2, "将来の予定"],
        ["What's next for you?", "次は何をするの？", 3, "次の目標・ステップを聞く"]
      ], "A: I finally finished my exams! / B: Congratulations! What are you going to do now?", "A: やっと試験が終わった！ / B: おめでとう！これから何するの？"),
      C('今までに経験したことがありますか？', '経験を聞くとき', [
        ["Have you ever tried skiing?", "スキーをしたことはある？", 1, "Have you ever＋過去分詞"],
        ["Have you ever been to Okinawa?", "沖縄に行ったことはある？", 1, "行ったことは been to"],
        ["Is this your first time here?", "ここは初めて？", 1, "初めてかどうか"],
        ["Have you had a chance to visit the museum yet?", "もう美術館に行く機会はありましたか。", 3, "had a chance to＝〜する機会があった"]
      ], "A: Have you ever tried natto? / B: Once. It was a little strange, but not bad!", "A: 納豆を食べたことある？ / B: 一度だけ。ちょっと変わってたけど、悪くなかったよ！"),
      C('おすすめはありますか？', 'すすめてほしいとき', [
        ["Do you have any recommendations?", "何かおすすめはある？", 1, "基本"],
        ["What would you recommend?", "何がおすすめ？", 1, "would でていねいに"],
        ["What's good here?", "ここは何がおいしい？", 1, "お店で店員さんに"],
        ["Is there anything you'd suggest?", "何か提案はありますか。", 2, "少していねい"],
        ["If you were me, what would you choose?", "もしあなたが私なら、何を選ぶ？", 3, "仮定法で意見を聞く"]
      ], "A: I want to read more English books. Do you have any recommendations? / B: Try 'Wonder.' It's easy to read and really touching.", "A: もっと英語の本を読みたいんだけど、おすすめある？ / B: 『ワンダー』を読んでみて。読みやすくて、すごく感動するよ。"),
      C('もう一度説明してもらえますか？', '説明がよく分からなかったとき', [
        ["Could you explain that again?", "もう一度説明してもらえますか。", 1, "基本"],
        ["Could you say that in a different way?", "別の言い方で言ってもらえますか。", 2, "言い換えをお願いする"],
        ["I'm not sure I understand. Could you give me an example?", "よく分からないので、例を挙げてもらえますか。", 2, "例をお願いすると分かりやすい"],
        ["Sorry, could you go over that one more time?", "すみません、もう一度だけ説明してもらえますか。", 3, "go over＝もう一度説明する・確認する"]
      ], "A: ...so you need to transfer at the second stop. / B: Sorry, could you explain that again?", "A: …だから2つ目の駅で乗り換えてね。 / B: ごめん、もう一度説明してくれる？")
    ] },
    { id: 'reply', group: 'skill', icon: '💬', name: '返答する表現', cards: [
      C('私もそう思います', '相手の意見に賛成するとき', [
        ["I think so, too.", "私もそう思う。", 1, "いちばん基本。軽く同意する"],
        ["I agree.", "賛成です。", 1, "はっきり賛成。意見や提案に対して"],
        ["I feel the same way.", "私も同じ気持ちです。", 2, "考えより気持ち・感想に共感するとき"],
        ["That's what I think, too.", "まさに私もそう考えています。", 2, "自分も同じ考えを持っていたことを強調"],
        ["I couldn't agree more.", "大賛成です。", 3, "「これ以上賛成できない」＝全面的に賛成"]
      ], "A: I think summer is the best season. / B: I feel the same way. I love going to the beach.", "A: 夏がいちばんいい季節だと思う。 / B: 私も同じ気持ち。海に行くのが大好きなんだ。"),
      C('私は少し違う意見です', 'やんわり反対するとき', [
        ["That's true, but...", "確かにそうだけど…", 1, "相手の意見を一部認めてから自分の意見へ"],
        ["I'm not so sure about that.", "それはどうかなあ。", 2, "強く否定せずに疑問を伝える"],
        ["I have a slightly different opinion.", "私は少し違う意見です。", 2, "slightly＝少し。ていねい"],
        ["I see your point, but I think differently.", "言いたいことは分かるけど、私は違う考えです。", 2, "まず理解を示すと角が立たない"],
        ["I see it a little differently.", "私の見方は少し違います。", 3, "落ち着いた大人の言い方"]
      ], "A: Smartphones are bad for kids. / B: I see your point, but I think they can be useful for learning, too.", "A: スマホは子どもに悪いよ。 / B: 言いたいことは分かるけど、勉強にも役立つと思うな。"),
      C('それは面白いですね', '話に興味を示すとき', [
        ["That's interesting.", "それは面白いね。", 1, "興味深い話に"],
        ["That sounds fun!", "楽しそう！", 1, "楽しそうな話に（sound＝〜に聞こえる）"],
        ["How interesting!", "なんて面白いんだろう！", 2, "感情をこめた言い方"],
        ["I've never thought about it that way.", "そんなふうに考えたことはなかったです。", 3, "新しい見方に感心したとき"]
      ], "A: In Finland, people often go to the sauna with their coworkers. / B: Really? That's interesting!", "A: フィンランドでは同僚とよくサウナに行くんだって。 / B: 本当？面白いね！"),
      C('私も経験したことがあります', '共感・同じ経験を伝えるとき', [
        ["Me too!", "私も！", 1, "いちばん短い共感"],
        ["I've done that, too.", "私もそれ、やったことある。", 1, "同じ経験"],
        ["The same thing happened to me.", "私にも同じことがあったよ。", 2, "出来事が同じだったとき"],
        ["I know exactly what you mean.", "言いたいこと、すごく分かる。", 2, "強い共感"],
        ["I've been there.", "その気持ち、分かるよ（経験済み）。", 3, "大変な状況に共感するときによく使う"]
      ], "A: I left my umbrella on the train again. / B: The same thing happened to me last week!", "A: また電車に傘を忘れちゃった。 / B: 私も先週同じことがあったよ！"),
      C('まだ分かりません', 'すぐに答えられないとき', [
        ["I'm not sure yet.", "まだ分からない。", 1, "基本"],
        ["I haven't decided yet.", "まだ決めていません。", 1, "決めていないとき"],
        ["It depends.", "場合によるかな。", 1, "このあとに on ... を付けると具体的"],
        ["Let me think about it.", "少し考えさせて。", 1, "すぐに決めたくないとき"],
        ["I'll have to see.", "様子を見てみないと。", 2, "状況次第で決める"]
      ], "A: Are you coming to the party on Friday? / B: I'm not sure yet. It depends on my work.", "A: 金曜のパーティー来る？ / B: まだ分からない。仕事次第かな。"),
      C('そうかもしれません', 'はっきり言えないとき', [
        ["Maybe.", "たぶんね。", 1, "短い返事。半々くらい"],
        ["I guess so.", "そうだと思う。", 1, "少し消極的な同意"],
        ["You might be right.", "そうかもしれないね。", 2, "相手の意見を認める"],
        ["That could be true.", "それは本当かもしれない。", 2, "可能性を認める"],
        ["Possibly.", "かもしれないね。", 2, "maybe より少し改まった響き"]
      ], "A: I think it's going to rain this afternoon. / B: You might be right. Look at those clouds.", "A: 午後は雨が降ると思う。 / B: そうかもね。あの雲を見て。"),
      C('私の場合は違います', '自分の場合を伝えるとき', [
        ["For me, it's different.", "私の場合は違います。", 1, "基本"],
        ["In my case, I prefer mornings.", "私の場合は、朝のほうが好きです。", 2, "in my case＝私の場合"],
        ["It's not like that for me.", "私はそうじゃないんです。", 2, "自分は当てはまらないとき"],
        ["Personally, I don't mind it.", "個人的には気にならないです。", 2, "personally＝個人的には"]
      ], "A: Mondays are the worst. / B: Really? For me, it's different. I like starting the week.", "A: 月曜日って最悪だよね。 / B: そう？私は違うな。週の始まりが好きなんだ。")
    ] },
    { id: 'react', group: 'skill', icon: '😮', name: '相づち・リアクション', cards: [
      C('本当ですか？', '驚いたとき', [
        ["Really?", "本当？", 1, "いちばん基本。上げ調子で言う"],
        ["Is that so?", "そうなんですか。", 2, "落ち着いた反応"],
        ["Are you serious?", "本気で言ってる？", 2, "驚き・半信半疑"],
        ["No way!", "まさか！", 2, "くだけた強い驚き（うれしい話にも使う）"],
        ["You're kidding!", "冗談でしょ！", 2, "信じられないとき"]
      ], "A: I won two tickets to the concert! / B: No way! That's amazing!", "A: コンサートのチケットが2枚当たったんだ！ / B: まさか！すごい！"),
      C('すごいですね！', '相手の話に感心したとき', [
        ["That's amazing!", "すごい！", 1, "基本の強いほめ言葉"],
        ["Wow, great job!", "わあ、よくやったね！", 1, "相手の成果をほめる"],
        ["That's impressive.", "それは見事だね。", 2, "感心したとき"],
        ["Good for you!", "よかったね！", 2, "相手の成功・幸せを一緒に喜ぶ"],
        ["You must be proud.", "誇らしいでしょう。", 3, "大きな成果に"]
      ], "A: I passed the Eiken Grade 2 test! / B: Wow, great job! You must be proud.", "A: 英検2級に合格したよ！ / B: わあ、よくやったね！誇らしいでしょう。"),
      C('なるほど', '理解したとき', [
        ["I see.", "なるほど。", 1, "いちばん基本の相づち"],
        ["Oh, I get it.", "ああ、分かった。", 1, "分からなかったことが分かったとき"],
        ["Got it.", "了解。", 1, "指示や説明を理解したとき"],
        ["That makes sense.", "それは納得。", 2, "理由を聞いて筋が通っていると感じたとき"],
        ["That explains it.", "それで分かった。", 3, "不思議だったことの理由が分かったとき"]
      ], "A: She's tired because she worked all night. / B: Oh, that explains it.", "A: 彼女、徹夜で仕事してたから疲れてるんだ。 / B: ああ、それでか。"),
      C('それはいいですね', '良い話を聞いたとき', [
        ["That's nice.", "いいね。", 1, "軽い反応"],
        ["That sounds great!", "それはいいね！", 1, "予定や計画に"],
        ["That sounds like a lot of fun.", "すごく楽しそう。", 1, "楽しそうな予定に"],
        ["Lucky you!", "いいなあ！", 2, "うらやましい気持ち"],
        ["I'm happy for you.", "（あなたのことで）私もうれしいよ。", 2, "相手のよい知らせを喜ぶ"]
      ], "A: I'm going to Hawaii next month. / B: Lucky you! That sounds like a lot of fun.", "A: 来月ハワイに行くんだ。 / B: いいなあ！すごく楽しそう。"),
      C('私も同じです', '同じだと伝えるとき', [
        ["Me too.", "私も。", 1, "肯定の文に対して"],
        ["Same here.", "こっちも同じ。", 2, "くだけた言い方"],
        ["Me neither.", "私も（〜ない）。", 2, "否定の文に対して（I don't like it. → Me neither.）"],
        ["So do I.", "私もそうです。", 2, "一般動詞の肯定文に。否定文には Neither do I."]
      ], "A: I don't like horror movies. / B: Me neither. They're too scary!", "A: ホラー映画は好きじゃないんだ。 / B: 私も。怖すぎるよね！"),
      C('知りませんでした', '新しい情報を聞いたとき', [
        ["I didn't know that.", "知らなかった。", 1, "基本"],
        ["Oh, I never knew that.", "へえ、全然知らなかった。", 2, "never で「一度も」"],
        ["I had no idea!", "まったく知らなかった！", 2, "驚きをこめて"],
        ["That's news to me.", "それは初耳です。", 3, "news＝初めて聞く話"]
      ], "A: Did you know that octopuses have three hearts? / B: Really? I had no idea!", "A: タコって心臓が3つあるって知ってた？ / B: 本当？まったく知らなかった！"),
      C('それは大変ですね', '悪い話を聞いたとき', [
        ["Oh no!", "ええっ！", 1, "とっさの反応"],
        ["That's too bad.", "それは残念だね。", 1, "軽めの同情"],
        ["That must be tough.", "それは大変だね。", 2, "相手の状況を思いやる"],
        ["That sounds stressful.", "ストレスがたまりそうだね。", 2, "sound＋形容詞"],
        ["I'm sorry to hear that.", "それはお気の毒に。", 2, "悪い知らせへのていねいな反応"]
      ], "A: I have three tests tomorrow. / B: That must be tough. Good luck!", "A: 明日テストが3つあるんだ。 / B: それは大変だね。がんばって！")
    ] },
    { id: 'opinion', group: 'skill', icon: '💡', name: '自分の意見を伝える', cards: [
      C('私は〜だと思います', '考えを伝えるとき', [
        ["I think it's a good idea.", "それはいい考えだと思います。", 1, "基本"],
        ["I feel like it's too expensive.", "ちょっと高すぎる気がします。", 2, "くだけた、感覚的な意見"],
        ["I believe everyone should learn to swim.", "誰もが泳ぎを習うべきだと思います。", 2, "強い考え・信念"],
        ["It seems to me that people are busier these days.", "最近みんな前より忙しいように思えます。", 3, "観察にもとづく控えめな意見"]
      ], "A: Should we take the train or the bus? / B: I think the train is better. It's faster.", "A: 電車とバス、どっちにする？ / B: 電車がいいと思う。速いから。"),
      C('私は〜が好きです', '好みを伝えるとき', [
        ["I like cats more than dogs.", "犬より猫が好きです。", 1, "more than で比べる"],
        ["I really enjoy talking with people.", "人と話すのが本当に好きです。", 1, "enjoy＋〜ing"],
        ["I prefer tea to coffee.", "コーヒーより紅茶のほうが好きです。", 2, "prefer A to B"],
        ["I'm crazy about soccer.", "サッカーに夢中です。", 2, "くだけた強い「大好き」"]
      ], "A: Coffee or tea? / B: I prefer tea to coffee, thanks.", "A: コーヒーと紅茶どっちにする？ / B: 紅茶のほうがいいな、ありがとう。"),
      C('私は〜に興味があります', '興味を伝えるとき', [
        ["I'm interested in art.", "美術に興味があります。", 1, "interested in（interesting ではない）"],
        ["I'm curious about other cultures.", "ほかの文化に興味があります。", 2, "curious＝知りたくてたまらない"],
        ["I've become interested in cooking recently.", "最近、料理に興味が出てきました。", 2, "become interested＝興味を持つようになる"],
        ["I'd like to learn more about history.", "歴史についてもっと知りたいです。", 2, "learn more about"]
      ], "A: What are you interested in? / B: I'm curious about other cultures, so I love meeting people from abroad.", "A: 何に興味があるの？ / B: ほかの文化に興味があって、海外の人と会うのが大好きなんだ。"),
      C('私の意見では〜です', '意見を前置きするとき', [
        ["Personally, I think...", "個人的には…と思います。", 1, "やわらかい前置き"],
        ["In my opinion,...", "私の意見では…", 2, "少し改まった前置き。議論やスピーチで"],
        ["If you ask me,...", "私に言わせれば…", 3, "くだけた前置き"],
        ["From my point of view,...", "私の立場から見ると…", 3, "立場・視点を強調"]
      ], "A: Is it better to live in the city or the countryside? / B: Personally, I think the countryside is better. It's quiet and relaxing.", "A: 都会と田舎、住むならどっちがいい？ / B: 個人的には田舎がいいと思う。静かで落ち着くから。"),
      C('理由を言う', '理由を説明するとき', [
        ["That's because...", "それは…だからです。", 1, "理由の説明を始める"],
        ["There are two reasons.", "理由は2つあります。", 1, "数を先に言うと分かりやすい"],
        ["First,... Second,...", "まず…、次に…", 1, "理由を順番に並べる"],
        ["The main reason is that...", "いちばんの理由は…です。", 2, "一番大事な理由"],
        ["One reason is..., and another is...", "理由の1つは…、もう1つは…です。", 2, "2つの理由をつなげる"]
      ], "A: Why do you like your town? / B: There are two reasons. First, it's safe. Second, the people are kind.", "A: どうして自分の町が好きなの？ / B: 理由は2つあるよ。まず安全なこと。次に人が優しいこと。"),
      C('例えば〜です', '具体例を挙げるとき', [
        ["For example,...", "例えば…", 1, "基本"],
        ["Like...", "例えば…みたいな", 1, "会話でくだけた言い方"],
        ["For instance,...", "例えば…", 2, "for example と同じ。少し改まった響き"],
        ["Let me give you an example.", "例を挙げますね。", 2, "説明の途中で"],
        ["Take Tokyo, for example.", "東京を例にとると…", 3, "Take ___, for example.＝〜を例にとると"]
      ], "A: Is Japan expensive? / B: Some things are. For example, fruit can be really expensive.", "A: 日本って物価高い？ / B: 物によるね。例えば果物はすごく高いことがあるよ。"),
      C('まとめる', '話をまとめるとき', [
        ["So, that's why I think...", "だから…だと思うんです。", 1, "理由のあとに結論"],
        ["Overall, I think it's worth it.", "全体的に、その価値はあると思います。", 2, "overall＝全体として"],
        ["In short,...", "要するに…", 2, "短くまとめる"],
        ["All in all,...", "いろいろあったけど結局…", 3, "よい点も悪い点もふまえてまとめる"]
      ], "A: How was your trip? / B: It rained a lot, but the food was great. All in all, it was a good trip.", "A: 旅行どうだった？ / B: 雨が多かったけど、食べ物は最高だった。いろいろあったけど、いい旅だったよ。")
    ] },
    { id: 'clarify', group: 'skill', icon: '🔁', name: '聞き返す・会話を続ける', cards: [
      C('もう一度言ってください', '聞き取れなかったとき', [
        ["Sorry?", "えっ？", 1, "上げ調子で。いちばん短い聞き返し"],
        ["Could you say that again?", "もう一度言ってもらえますか。", 1, "基本"],
        ["Pardon?", "何とおっしゃいましたか。", 2, "ていねいな聞き返し"],
        ["Sorry, I didn't catch that.", "すみません、聞き取れませんでした。", 2, "catch＝聞き取る"],
        ["Could you repeat the last part?", "最後のところをもう一度言ってもらえますか。", 2, "一部だけ聞き直す"]
      ], "A: The meeting is at three thirty in room B. / B: Sorry, I didn't catch that. Which room?", "A: 会議は3時半にB室です。 / B: すみません、聞き取れませんでした。どの部屋ですか。"),
      C('ゆっくり話してもらえますか？', '速くて分からないとき', [
        ["Could you speak more slowly?", "もっとゆっくり話してもらえますか。", 1, "基本"],
        ["Could you slow down a little?", "少しゆっくりにしてもらえますか。", 2, "slow down＝速度を落とす"],
        ["Sorry, you're talking a bit fast for me.", "すみません、私には少し速いです。", 2, "for me を付けて相手を責めない"]
      ], "A: (talking fast) ...and then we can meet at the station. / B: Sorry, could you slow down a little?", "A:（早口で）…それで駅で会えばいいよ。 / B: ごめん、少しゆっくり話してくれる？"),
      C('どういう意味ですか？', '言葉の意味が分からないとき', [
        ["What does that mean?", "それはどういう意味ですか。", 1, "単語や表現の意味"],
        ["What do you mean?", "どういうこと？", 1, "相手の言いたいことを聞く"],
        ["What does 'awesome' mean?", "「awesome」ってどういう意味？", 1, "単語を入れて聞く"],
        ["Sorry, I'm not familiar with that word.", "すみません、その言葉はなじみがなくて。", 3, "be familiar with＝よく知っている"]
      ], "A: That movie was lit! / B: Sorry, what does 'lit' mean? / A: It means really exciting.", "A: あの映画、litだったよ！ / B: ごめん、litってどういう意味？ / A: すごく盛り上がるって意味だよ。"),
      C('具体的にはどういうことですか？', 'もう少し詳しく聞きたいとき', [
        ["What do you mean by that?", "それはどういう意味で？", 1, "相手の言葉の真意を聞く"],
        ["Can you give me an example?", "例を挙げてもらえますか。", 1, "具体例をお願いする"],
        ["Like what?", "例えば？", 2, "くだけた短い聞き方"],
        ["Could you be more specific?", "もう少し具体的に言ってもらえますか。", 2, "specific＝具体的な"]
      ], "A: I want to try something new this year. / B: Like what? / A: Maybe surfing!", "A: 今年は何か新しいことに挑戦したいんだ。 / B: 例えば？ / A: サーフィンとか！"),
      C('あなたはどうですか？', '質問を相手に返すとき', [
        ["How about you?", "あなたは？", 1, "自分が答えたあとに返す定番"],
        ["What about you?", "あなたはどう？", 1, "How about you? とほぼ同じ"],
        ["And you?", "あなたは？", 1, "いちばん短い"],
        ["Have you ever done that?", "あなたはそれをしたことある？", 1, "経験を返す"],
        ["What's it like for you?", "あなたの場合はどんな感じ？", 2, "相手の状況を聞く"]
      ], "A: I usually get up at six. How about you? / B: I get up at seven, but I'm always in a hurry!", "A: 私はたいてい6時に起きるよ。あなたは？ / B: 7時に起きるけど、いつもバタバタなんだ！"),
      C('それについてもっと教えてください', '話を広げたいとき', [
        ["Tell me more.", "もっと聞かせて。", 1, "短い定番"],
        ["Tell me more about it.", "それについてもっと教えて。", 1, "about it で話題をはっきり"],
        ["What happened next?", "それでどうなったの？", 1, "話の続きを聞く"],
        ["How did that go?", "それはどうだった？", 2, "結果を聞く"],
        ["I'd love to hear more about that.", "その話、もっと聞きたいです。", 2, "興味を強く示す"]
      ], "A: I had a job interview yesterday. / B: Oh, how did that go?", "A: 昨日、仕事の面接があったんだ。 / B: へえ、どうだった？"),
      C('考える時間をかせぐ', '言葉に詰まったとき', [
        ["Let me think.", "ちょっと考えさせて。", 1, "黙ってしまうより自然"],
        ["Well,...", "ええと…", 1, "答え始めのつなぎ言葉"],
        ["That's a good question.", "いい質問ですね。", 2, "考える時間をかせぎつつ相手をほめる"],
        ["What's the word?", "何て言うんだっけ？", 2, "単語が出てこないとき"],
        ["How can I put it?", "どう言えばいいかな。", 3, "put＝言葉で表す"]
      ], "A: What's your biggest dream? / B: Hmm, that's a good question. Let me think...", "A: いちばん大きな夢は何？ / B: うーん、いい質問だね。ちょっと考えさせて…"),
      C('話題を変える', '話を切り替えるとき', [
        ["By the way,...", "ところで…", 1, "話題を変える定番"],
        ["Anyway,...", "とにかく・それはそうと…", 1, "話を元に戻す・切り上げる"],
        ["Speaking of which,...", "そういえば…", 2, "今の話題に関連して"],
        ["That reminds me,...", "それで思い出したけど…", 3, "今の話から何かを思い出したとき"]
      ], "A: I went to a new ramen shop yesterday. / B: Oh, speaking of which, have you been to the one near the station?", "A: 昨日新しいラーメン屋に行ったんだ。 / B: そういえば、駅の近くの店には行ったことある？")
    ] },
    { id: 'emotion', group: 'skill', icon: '😊', name: '感情を表現する', cards: [
      C('嬉しいです', 'うれしいとき', [
        ["I'm so happy!", "すごくうれしい！", 1, "基本"],
        ["I'm glad to hear that.", "それを聞いてうれしいです。", 1, "よい知らせを聞いたとき"],
        ["I'm thrilled.", "大喜びです。", 3, "わくわくするほどうれしい"],
        ["That made my day!", "おかげで最高の一日になりました！", 3, "ちょっとしたことでうれしくなったとき"]
      ], "A: Your English has really improved! / B: Thank you! That made my day!", "A: 英語すごく上達したね！ / B: ありがとう！今日一日うれしい気分だよ！"),
      C('驚きました', '驚いたとき', [
        ["I was surprised.", "驚きました。", 1, "基本（surprised は「驚かされた」）"],
        ["What a surprise!", "びっくりした！", 1, "うれしい驚きに"],
        ["I can't believe it!", "信じられない！", 1, "よい驚きにも悪い驚きにも"],
        ["I was shocked.", "ショックでした。", 2, "悪い驚き・強い衝撃"]
      ], "A: Surprise! Happy birthday! / B: Oh my gosh, what a surprise! Thank you!", "A: サプライズ！誕生日おめでとう！ / B: うわあ、びっくりした！ありがとう！"),
      C('緊張しています', '緊張しているとき', [
        ["I'm a little nervous.", "少し緊張しています。", 1, "基本"],
        ["I'm nervous about the interview.", "面接のことで緊張しています。", 2, "nervous about＋緊張の原因"],
        ["My heart is pounding.", "心臓がドキドキしています。", 2, "pound＝激しく打つ"],
        ["I have butterflies in my stomach.", "そわそわして落ち着きません。", 3, "お腹の中に蝶がいるような感じ＝緊張してそわそわ"]
      ], "A: Are you ready for your speech? / B: I'm a little nervous. I have butterflies in my stomach.", "A: スピーチの準備はできた？ / B: 少し緊張してる。そわそわして落ち着かないよ。"),
      C('楽しみにしています', '楽しみなことがあるとき', [
        ["I can't wait!", "待ちきれない！", 1, "くだけた強い楽しみ"],
        ["I'm excited about the trip.", "旅行が楽しみです。", 1, "excited about＝〜にわくわくしている"],
        ["I'm looking forward to it.", "楽しみにしています。", 1, "ていねいにも使える定番"],
        ["I'm really looking forward to seeing you.", "会えるのを本当に楽しみにしています。", 2, "look forward to のあとは〜ing"]
      ], "A: See you at the concert next week! / B: I can't wait! I'm really looking forward to it.", "A: 来週コンサートで会おうね！ / B: 待ちきれない！本当に楽しみ。"),
      C('残念です', 'がっかりしたとき', [
        ["Oh, that's too bad.", "ああ、残念。", 1, "基本"],
        ["I'm disappointed.", "がっかりしました。", 1, "自分の気持ち"],
        ["That's a shame.", "それは残念ですね。", 2, "shame＝残念なこと（恥ではない）"],
        ["What a pity.", "なんて残念な。", 2, "やや改まった言い方"]
      ], "A: The festival was canceled because of the rain. / B: Oh, that's a shame. I was looking forward to it.", "A: 雨でお祭りが中止になったんだ。 / B: それは残念。楽しみにしてたのに。"),
      C('不安です', '心配なとき', [
        ["I'm worried.", "心配です。", 1, "基本"],
        ["I'm a bit worried about the test.", "テストが少し心配です。", 1, "worried about＋心配ごと"],
        ["I'm not sure I can do it.", "できるか自信がありません。", 2, "自信がないとき"],
        ["I'm anxious about moving to a new city.", "新しい町への引っ越しが不安です。", 2, "anxious＝（先のことが）不安な"]
      ], "A: You start your new job tomorrow, right? / B: Yes. I'm a bit worried, but I'm excited, too.", "A: 明日から新しい仕事だよね？ / B: うん。少し不安だけど、楽しみでもあるよ。"),
      C('疲れた・うんざり', '疲れやいらだちを伝えるとき', [
        ["I'm so tired.", "すごく疲れた。", 1, "基本"],
        ["I'm exhausted.", "くたくたです。", 2, "tired よりずっと強い"],
        ["It's really annoying.", "本当にイライラする。", 2, "annoying＝イライラさせる"],
        ["I'm fed up with it.", "もううんざりです。", 3, "be fed up with＝〜にうんざりしている"]
      ], "A: The train was late again this morning. / B: Again? That's really annoying.", "A: 今朝も電車が遅れたよ。 / B: また？本当にイライラするね。"),
      C('感謝を伝える', 'お礼を言うとき', [
        ["Thank you so much.", "本当にありがとう。", 1, "基本"],
        ["I really appreciate it.", "本当に感謝しています。", 2, "appreciate＝ありがたく思う（it＝してくれたこと）"],
        ["That's very kind of you.", "ご親切にありがとうございます。", 2, "相手の親切をほめる"],
        ["I can't thank you enough.", "感謝してもしきれません。", 3, "とても大きな助けへのお礼"]
      ], "A: I can help you move this weekend. / B: Really? That's very kind of you. I really appreciate it.", "A: 今週末の引っ越し、手伝えるよ。 / B: 本当？ご親切に。本当に助かるよ。")
    ] }
  ];
  // id を付ける（練習の記録に使う）
  cats.forEach(c => c.cards.forEach((card, i) => {
    card.id = `${c.id}-${i + 1}`;
    card.cat = c.id;
    card.vs.forEach((v, j) => { v.id = `bank:${c.id}-${i + 1}-${j + 1}`; });
  }));
  return { groups, cats, levels: ['', '初級', '中級', '上級'] };
})();
