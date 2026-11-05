/* 英会話（試験に関係なく使える日常会話）データ：中級レベル（オリジナル）
 * scenes[].phrases: 覚えるフレーズ（en / ja / note：使い方のポイント）
 * scenes[].role: ロールプレイ（who: 'them' は相手のセリフ、'you' は自分の番。you の en は解答例） */
var TALK_DATA = { scenes: [
  {
    id: 'greet', icon: '👋', name: 'あいさつ・自己紹介', desc: '初対面での自己紹介や近況のやりとり',
    phrases: [
      { en: 'Nice to meet you. I\'ve heard a lot about you.', ja: 'はじめまして。お噂はかねがね伺っています。', note: '紹介されたときの定番。I\'ve heard a lot about you. を足すと好印象。' },
      { en: 'Please call me Ken.', ja: 'ケンと呼んでください。', note: '名前の呼び方を伝える表現。フルネームのあとに付け加える。' },
      { en: 'What do you do for a living?', ja: 'お仕事は何をされていますか。', note: 'What\'s your job? より自然で丁寧な聞き方。' },
      { en: 'I work in marketing for a small tech company.', ja: '小さなIT企業でマーケティングの仕事をしています。', note: 'work in＋分野、for＋会社。職種を言うときの基本形。' },
      { en: 'How long have you been living here?', ja: 'ここに住んでどのくらいですか。', note: '現在完了進行形で「ずっと〜している期間」を聞く。' },
      { en: 'It\'s been a while. How have you been?', ja: '久しぶりですね。元気にしていましたか。', note: '久しぶりに会った人へ。How are you? の代わりに使う。' },
      { en: 'I\'m originally from Osaka, but I live in Tokyo now.', ja: 'もともとは大阪出身ですが、今は東京に住んでいます。', note: 'originally from で「もともとの出身」。' },
      { en: 'It was great talking to you. Let\'s keep in touch.', ja: 'お話しできてよかったです。これからも連絡を取り合いましょう。', note: '会話を終えるときの締めの一言。' }
    ],
    role: [
      { who: 'them', en: 'Hi, I don\'t think we\'ve met. I\'m Sarah.', ja: 'こんにちは、初めてですよね。サラです。' },
      { who: 'you', ja: 'はじめまして、と言って自分の名前を伝える', en: 'Nice to meet you, Sarah. I\'m Ken.' },
      { who: 'them', en: 'Nice to meet you too. So, what do you do?', ja: 'こちらこそ。お仕事は何を？' },
      { who: 'you', ja: '仕事を説明する（例：IT企業でマーケティング）', en: 'I work in marketing for a tech company. How about you?' },
      { who: 'them', en: 'I\'m a nurse. I just moved here last month.', ja: '看護師です。先月ここに引っ越してきたばかりなんです。' },
      { who: 'you', ja: '新しい街はどうかと聞く', en: 'Oh, really? How do you like it here so far?' }
    ]
  },
  {
    id: 'smalltalk', icon: '☕', name: '雑談・週末の話', desc: '天気や休日、趣味などの軽い会話',
    phrases: [
      { en: 'Did you do anything fun over the weekend?', ja: '週末は何か楽しいことをしましたか。', note: '月曜日の会話の切り出しに。over the weekend で「週末の間に」。' },
      { en: 'Not much. I just stayed home and relaxed.', ja: '特に何も。家でゆっくりしていました。', note: 'Nothing. だけで終わらせず、何をしたかを一言加える。' },
      { en: 'It\'s really hot today, isn\'t it?', ja: '今日は本当に暑いですね。', note: '付加疑問文で相手の同意を求めると会話が続きやすい。' },
      { en: 'What do you usually do in your free time?', ja: 'ふだん空いた時間は何をしていますか。', note: '趣味を聞く自然な言い方。What\'s your hobby? より会話向き。' },
      { en: 'I\'ve been really into cooking lately.', ja: '最近、料理にはまっています。', note: 'be into ～ で「〜に夢中」。lately は現在完了と相性がよい。' },
      { en: 'Have you seen any good movies recently?', ja: '最近何かいい映画を見ましたか。', note: '話題を広げる質問。Have you ～ recently? の形で応用できる。' },
      { en: 'That sounds like a lot of fun.', ja: 'それはすごく楽しそうですね。', note: '相手の話へのリアクション。That sounds ～ は万能。' },
      { en: 'I know what you mean.', ja: 'わかります、その気持ち。', note: '共感を示すあいづち。会話がぐっと自然になる。' }
    ],
    role: [
      { who: 'them', en: 'Morning! How was your weekend?', ja: 'おはよう！週末はどうだった？' },
      { who: 'you', ja: 'よかったと言い、何をしたか伝える（例：友達とハイキング）', en: 'It was great. I went hiking with some friends.' },
      { who: 'them', en: 'Nice! Where did you go?', ja: 'いいね！どこに行ったの？' },
      { who: 'you', ja: '行った場所と感想を言う', en: 'We went to Mt. Takao. The view from the top was amazing.' },
      { who: 'them', en: 'I\'ve always wanted to go there.', ja: 'ずっと行ってみたかったんだ。' },
      { who: 'you', ja: '次は一緒に行こうと誘う', en: 'You should come with us next time!' }
    ]
  },
  {
    id: 'restaurant', icon: '🍽️', name: 'レストラン・カフェ', desc: '注文・おすすめを聞く・会計',
    phrases: [
      { en: 'Do you have a table for two?', ja: '2人ですが、席は空いていますか。', note: '入店時の定番。人数を for ～ で伝える。' },
      { en: 'Could we see the menu, please?', ja: 'メニューを見せていただけますか。', note: 'Could we ～? は丁寧なお願い。' },
      { en: 'What would you recommend?', ja: 'おすすめは何ですか。', note: '迷ったときの一言。店員さんとの会話のきっかけにもなる。' },
      { en: 'I\'ll have the pasta, please.', ja: 'パスタをお願いします。', note: '注文は I\'ll have ～. が自然。I want ～. は子どもっぽく聞こえることも。' },
      { en: 'Could I get this without onions?', ja: 'これを玉ねぎ抜きにしてもらえますか。', note: 'without ～ で「〜抜きで」。アレルギーや好みを伝える。' },
      { en: 'Excuse me, I think there\'s been a mistake with my order.', ja: 'すみません、注文が間違っているようです。', note: 'I think を付けると柔らかく伝えられる。' },
      { en: 'Can we get the check, please?', ja: 'お会計をお願いします。', note: 'アメリカでは check、イギリスでは bill が一般的。' },
      { en: 'Is it okay if we split the bill?', ja: '別々に払ってもいいですか。', note: 'split the bill で「割り勘・別会計にする」。' }
    ],
    role: [
      { who: 'them', en: 'Hi, are you ready to order?', ja: 'ご注文はお決まりですか。' },
      { who: 'you', ja: 'おすすめを聞く', en: 'Not yet. What would you recommend?' },
      { who: 'them', en: 'Our salmon is very popular. It comes with a salad.', ja: 'サーモンがとても人気です。サラダが付きます。' },
      { who: 'you', ja: 'それにすると言う', en: 'That sounds good. I\'ll have the salmon, please.' },
      { who: 'them', en: 'Great. Anything to drink?', ja: 'かしこまりました。お飲み物は？' },
      { who: 'you', ja: '炭酸水（sparkling water）を頼む', en: 'Could I get a sparkling water, please?' }
    ]
  },
  {
    id: 'shopping', icon: '🛍️', name: '買い物', desc: 'サイズ・試着・値段・返品',
    phrases: [
      { en: 'I\'m just looking, thanks.', ja: '見ているだけです、ありがとう。', note: '店員さんに声をかけられたときの返事。' },
      { en: 'Do you have this in a smaller size?', ja: 'これのもっと小さいサイズはありますか。', note: 'in ＋ サイズ／色 で「〜の（サイズ・色）で」。' },
      { en: 'Can I try this on?', ja: '試着してもいいですか。', note: 'try on で「試着する」。代名詞は try it on の語順。' },
      { en: 'It\'s a little too tight around the shoulders.', ja: '肩のあたりが少しきついです。', note: 'too tight / too loose でサイズの感想を伝える。' },
      { en: 'Is this on sale?', ja: 'これはセール品ですか。', note: 'on sale は「特売中」。for sale は「売り物」なので注意。' },
      { en: 'I\'d like to return this. It doesn\'t work properly.', ja: 'これを返品したいです。ちゃんと動かないんです。', note: 'I\'d like to ～. は丁寧な希望。理由も添える。' },
      { en: 'Do you accept credit cards?', ja: 'クレジットカードは使えますか。', note: 'accept で「受け付ける」。Can I pay by card? でもOK。' },
      { en: 'Could you gift-wrap it for me?', ja: 'プレゼント用に包んでもらえますか。', note: 'gift-wrap で「贈り物用に包む」。' }
    ],
    role: [
      { who: 'them', en: 'Hi there! Can I help you find anything?', ja: 'いらっしゃいませ！何かお探しですか。' },
      { who: 'you', ja: 'このシャツの小さいサイズがあるか聞く', en: 'Yes, do you have this shirt in a smaller size?' },
      { who: 'them', en: 'Let me check. Here you go, this is a medium.', ja: '確認しますね。こちら、Mサイズです。' },
      { who: 'you', ja: '試着していいか聞く', en: 'Thanks. Can I try it on?' },
      { who: 'them', en: 'Of course. The fitting room is over there.', ja: 'もちろんです。試着室はあちらです。' },
      { who: 'you', ja: '（試着後）ぴったりなので買うと言う', en: 'It fits perfectly. I\'ll take it.' }
    ]
  },
  {
    id: 'travel', icon: '✈️', name: '空港・ホテル', desc: 'チェックイン・トラブル・お願い',
    phrases: [
      { en: 'I\'d like to check in, please. I have a reservation under Tanaka.', ja: 'チェックインをお願いします。田中で予約しています。', note: 'under ＋ 名前 で「〜の名前で」。' },
      { en: 'Could I have a window seat?', ja: '窓側の席にしてもらえますか。', note: '通路側は an aisle seat。' },
      { en: 'My luggage didn\'t come out.', ja: '荷物が出てきませんでした。', note: '荷物が届かないとき。baggage claim（受取所）で使う。' },
      { en: 'What time is checkout?', ja: 'チェックアウトは何時ですか。', note: '短く聞ける便利な質問。' },
      { en: 'Is breakfast included?', ja: '朝食は含まれていますか。', note: 'included で「含まれている」。料金の確認に。' },
      { en: 'The air conditioner in my room isn\'t working.', ja: '部屋のエアコンが動きません。', note: 'isn\'t working で「故障している」。' },
      { en: 'Could you keep my bags until this afternoon?', ja: '午後まで荷物を預かってもらえますか。', note: 'チェックアウト後に荷物を預けたいとき。' },
      { en: 'How do I get to the city center from here?', ja: 'ここから市の中心部へはどうやって行けばいいですか。', note: 'How do I get to ～? は行き方を聞く定番。' }
    ],
    role: [
      { who: 'them', en: 'Good evening. How can I help you?', ja: 'こんばんは。ご用件をお伺いします。' },
      { who: 'you', ja: 'チェックインしたいと言い、田中で予約していると伝える', en: 'Hi, I\'d like to check in. I have a reservation under Tanaka.' },
      { who: 'them', en: 'Yes, Mr. Tanaka. Three nights in a single room. Could I see your passport?', ja: '田中様ですね。シングルで3泊ですね。パスポートを拝見できますか。' },
      { who: 'you', ja: 'パスポートを渡し、朝食が含まれているか聞く', en: 'Here you are. Is breakfast included?' },
      { who: 'them', en: 'Yes, it\'s served from 7 to 10 on the second floor.', ja: 'はい、2階で7時から10時までです。' },
      { who: 'you', ja: 'Wi-Fiのパスワードを聞く', en: 'Great. And what\'s the Wi-Fi password?' }
    ]
  },
  {
    id: 'directions', icon: '🗺️', name: '道案内・交通', desc: '道を聞く・教える・乗り換え',
    phrases: [
      { en: 'Excuse me, could you tell me how to get to the station?', ja: 'すみません、駅への行き方を教えていただけますか。', note: '知らない人に話しかけるときは Excuse me で始める。' },
      { en: 'Is it within walking distance?', ja: '歩いて行ける距離ですか。', note: 'within walking distance で「徒歩圏内」。' },
      { en: 'Go straight and turn left at the second corner.', ja: 'まっすぐ行って、2つ目の角を左に曲がってください。', note: '道を教えるときの基本。at the ～ corner / at the lights（信号で）。' },
      { en: 'It\'s right across from the post office.', ja: '郵便局の真向かいです。', note: 'across from で「〜の向かい側」。next to（隣）、behind（裏）も一緒に。' },
      { en: 'Which line should I take to get to Shibuya?', ja: '渋谷に行くには何線に乗ればいいですか。', note: 'line は電車の「〜線」。' },
      { en: 'Do I need to change trains?', ja: '乗り換えは必要ですか。', note: 'change trains（複数形）で「乗り換える」。' },
      { en: 'Sorry, I\'m not from around here.', ja: 'すみません、このあたりの者ではないんです。', note: '道を聞かれてわからないときの返事。' },
      { en: 'How long does it take by bus?', ja: 'バスでどのくらいかかりますか。', note: 'How long does it take ～? で所要時間を聞く。' }
    ],
    role: [
      { who: 'them', en: 'Excuse me, do you know where the museum is?', ja: 'すみません、博物館がどこかわかりますか。' },
      { who: 'you', ja: 'わかると言い、まっすぐ行って2つ目の角を右と教える', en: 'Yes. Go straight and turn right at the second corner.' },
      { who: 'them', en: 'Is it far from here?', ja: 'ここから遠いですか。' },
      { who: 'you', ja: '歩いて10分くらいと答える', en: 'Not really. It\'s about a ten-minute walk.' },
      { who: 'them', en: 'Thank you so much!', ja: 'どうもありがとうございます！' },
      { who: 'you', ja: 'どういたしまして、楽しんでと言う', en: 'You\'re welcome. Enjoy the museum!' }
    ]
  },
  {
    id: 'phone', icon: '📞', name: '電話・予約', desc: '電話をかける・予約する・伝言',
    phrases: [
      { en: 'Hello, this is Ken Sato calling.', ja: 'もしもし、佐藤ケンと申します。', note: '電話では I am ではなく This is ～ で名乗る。' },
      { en: 'Could I speak to Ms. Brown, please?', ja: 'ブラウンさんをお願いできますか。', note: '取り次いでもらうときの定番。' },
      { en: 'I\'d like to make a reservation for Friday night.', ja: '金曜日の夜に予約をしたいのですが。', note: 'make a reservation で「予約する」。' },
      { en: 'Could you hold on a moment, please?', ja: '少々お待ちいただけますか。', note: 'hold on で「電話を切らずに待つ」。' },
      { en: 'Sorry, could you speak a little more slowly?', ja: 'すみません、もう少しゆっくり話していただけますか。', note: '聞き取れないときに遠慮せず使おう。' },
      { en: 'Can I leave a message?', ja: '伝言をお願いできますか。', note: '相手が不在のとき。' },
      { en: 'I\'m calling to change my appointment.', ja: '予約を変更したくてお電話しました。', note: 'I\'m calling to ～. で電話の用件を最初に伝える。' },
      { en: 'Sorry, I think I have the wrong number.', ja: 'すみません、番号を間違えたようです。', note: '間違い電話をしたとき。' }
    ],
    role: [
      { who: 'them', en: 'Good afternoon, Bella Italia. How can I help you?', ja: 'こんにちは、ベラ・イタリアです。ご用件は？' },
      { who: 'you', ja: '土曜の夜に4人で予約したいと言う', en: 'Hi, I\'d like to make a reservation for four on Saturday night.' },
      { who: 'them', en: 'Sure. What time would you like?', ja: 'かしこまりました。何時がよろしいですか。' },
      { who: 'you', ja: '7時ごろと伝える', en: 'Around seven, if possible.' },
      { who: 'them', en: 'Seven is fine. May I have your name and phone number?', ja: '7時で大丈夫です。お名前とお電話番号をいただけますか。' },
      { who: 'you', ja: '名前と電話番号を伝える（例：佐藤です）', en: 'Sure. It\'s Sato, and my number is 090-1234-5678.' }
    ]
  },
  {
    id: 'work', icon: '💼', name: '職場・オンライン会議', desc: '頼む・確認する・会議で発言する',
    phrases: [
      { en: 'Do you have a minute? I\'d like to ask you something.', ja: '少しお時間ありますか。聞きたいことがあるのですが。', note: '同僚や上司に話しかけるときの前置き。' },
      { en: 'Could you take a look at this when you have time?', ja: 'お時間のあるときにこれを見ていただけますか。', note: 'when you have time を付けると相手に配慮した頼み方になる。' },
      { en: 'Sorry, you\'re on mute.', ja: 'すみません、ミュートになっていますよ。', note: 'オンライン会議の頻出表現。' },
      { en: 'Can everyone see my screen?', ja: '皆さん、私の画面は見えていますか。', note: '画面共有をしたときの確認。' },
      { en: 'Just to clarify, the deadline is next Friday, right?', ja: '確認ですが、締め切りは来週の金曜日ですよね。', note: 'Just to clarify, ～ で誤解を防ぐ確認ができる。' },
      { en: 'I\'ll get back to you by the end of the day.', ja: '今日中にお返事します。', note: 'get back to ～ で「〜に折り返し連絡する」。' },
      { en: 'Could I add something to that?', ja: 'それに一言付け加えてもいいですか。', note: '会議で発言に割り込むときの丁寧な言い方。' },
      { en: 'Let\'s wrap up for today.', ja: '今日はこのへんで終わりにしましょう。', note: 'wrap up で「（会議などを）締めくくる」。' }
    ],
    role: [
      { who: 'them', en: 'Hi, can everyone hear me okay?', ja: 'こんにちは、皆さん聞こえていますか。' },
      { who: 'you', ja: 'よく聞こえると答える', en: 'Yes, I can hear you clearly.' },
      { who: 'them', en: 'Great. Could you give us a quick update on the project?', ja: 'よかった。プロジェクトの進捗を簡単に教えてもらえますか。' },
      { who: 'you', ja: '予定通り進んでいて、来週デザインが完成すると伝える', en: 'Sure. We\'re on schedule, and the design will be finished next week.' },
      { who: 'them', en: 'Perfect. Any problems so far?', ja: '完璧ですね。今のところ問題は？' },
      { who: 'you', ja: '予算について少し心配があると伝える', en: 'Not really, but I\'m a little worried about the budget.' }
    ]
  },
  {
    id: 'opinion', icon: '💡', name: '意見を言う・賛成と反対', desc: '自分の考えを伝える・やんわり反対する',
    phrases: [
      { en: 'In my opinion, working from home is more efficient.', ja: '私の意見では、在宅勤務のほうが効率的です。', note: 'In my opinion, ～ ／ Personally, I think ～ で意見を切り出す。' },
      { en: 'I totally agree with you.', ja: '完全に同意します。', note: 'totally / completely で強い賛成。' },
      { en: 'I see your point, but I\'m not sure about that.', ja: 'おっしゃることはわかりますが、それはどうでしょうか。', note: '反対するときは、まず相手の意見を認めると角が立たない。' },
      { en: 'That\'s a good point.', ja: 'それはいい指摘ですね。', note: '相手の発言を評価するあいづち。' },
      { en: 'It depends on the situation.', ja: '状況によりますね。', note: 'どちらとも言えないときの便利な表現。' },
      { en: 'What do you think about that?', ja: 'それについてどう思いますか。', note: '相手の意見を引き出す質問。' },
      { en: 'The main reason is that it saves a lot of time.', ja: '主な理由は、時間を大幅に節約できるからです。', note: 'The main reason is that ～ で理由をはっきり示す。' },
      { en: 'I used to think so, but I\'ve changed my mind.', ja: '以前はそう思っていましたが、考えが変わりました。', note: 'used to で「以前は〜だった」。change my mind で「考えを変える」。' }
    ],
    role: [
      { who: 'them', en: 'Do you think high school students should have part-time jobs?', ja: '高校生はアルバイトをすべきだと思う？' },
      { who: 'you', ja: '賛成と言い、理由を述べる（例：お金の大切さを学べる）', en: 'Yes, I think so. The main reason is that they can learn the value of money.' },
      { who: 'them', en: 'But won\'t it affect their studies?', ja: 'でも勉強に影響しないかな？' },
      { who: 'you', ja: '相手の意見を認めつつ、時間を決めれば大丈夫と答える', en: 'I see your point, but it\'s fine if they only work a few hours a week.' },
      { who: 'them', en: 'Hmm, that\'s true.', ja: 'うーん、それはそうだね。' },
      { who: 'you', ja: '相手はどう思うか聞き返す', en: 'What do you think about it?' }
    ]
  },
  {
    id: 'trouble', icon: '🙏', name: 'お願い・謝る・困ったとき', desc: '丁寧に頼む・謝る・聞き返す',
    phrases: [
      { en: 'Would you mind opening the window?', ja: '窓を開けていただけませんか。', note: 'Would you mind ～ing? はとても丁寧な依頼。答えは Not at all.（いいですよ）。' },
      { en: 'Sorry, I didn\'t catch that. Could you say it again?', ja: 'すみません、聞き取れませんでした。もう一度言っていただけますか。', note: 'didn\'t catch で「聞き取れなかった」。' },
      { en: 'I\'m sorry I\'m late. The train was delayed.', ja: '遅れてすみません。電車が遅れていて。', note: '謝罪のあとに理由を簡潔に添える。' },
      { en: 'I\'m afraid I can\'t make it tomorrow.', ja: '申し訳ないのですが、明日は行けそうにありません。', note: 'I\'m afraid ～ で残念な知らせを柔らかく伝える。make it は「都合をつける」。' },
      { en: 'Could you do me a favor?', ja: 'お願いがあるのですが。', note: '頼みごとの前置き。' },
      { en: 'No worries. It happens.', ja: '気にしないで。よくあることだよ。', note: '謝られたときの返事。' },
      { en: 'I think I left my wallet on the train.', ja: '電車に財布を忘れたみたいです。', note: 'leave ＋ 物 ＋ 場所 で「〜に置き忘れる」。forget は場所と一緒に使わない。' },
      { en: 'What does this word mean?', ja: 'この単語はどういう意味ですか。', note: 'わからない言葉を聞くときの定番。' }
    ],
    role: [
      { who: 'them', en: 'Hey, you\'re finally here! The meeting already started.', ja: 'あ、やっと来た！会議はもう始まってるよ。' },
      { who: 'you', ja: '遅れたことを謝り、電車が遅れたと説明する', en: 'I\'m so sorry I\'m late. The train was delayed.' },
      { who: 'them', en: 'No worries. Can you help me with something after the meeting?', ja: '大丈夫。会議のあと、ちょっと手伝ってもらえる？' },
      { who: 'you', ja: 'もちろんと答え、何をすればいいか聞く', en: 'Of course. What do you need me to do?' },
      { who: 'them', en: 'I need some help preparing the slides for tomorrow.', ja: '明日のスライドの準備を手伝ってほしいんだ。' },
      { who: 'you', ja: '問題ないと答え、会議後に話そうと言う', en: 'No problem. Let\'s talk about it after the meeting.' }
    ]
  },
  {
    id: 'health', icon: '🏥', name: '体調・病院', desc: '症状を伝える・薬局で聞く',
    phrases: [
      { en: 'I don\'t feel very well today.', ja: '今日はあまり体調がよくありません。', note: 'I\'m sick. よりやわらかく、日常でよく使う。' },
      { en: 'I have a sore throat and a slight fever.', ja: 'のどが痛くて、少し熱があります。', note: 'sore throat（のどの痛み）、headache（頭痛）、stomachache（腹痛）。' },
      { en: 'It started two days ago.', ja: '2日前からです。', note: '症状がいつからかを伝える。' },
      { en: 'Do I need a prescription for this?', ja: 'これには処方箋が必要ですか。', note: '薬局で。prescription は「処方箋」。' },
      { en: 'How often should I take this medicine?', ja: 'この薬はどのくらいの頻度で飲めばいいですか。', note: '薬は take で「飲む」。drink は使わない。' },
      { en: 'I\'m allergic to peanuts.', ja: 'ピーナッツアレルギーがあります。', note: 'be allergic to ～ で「〜にアレルギーがある」。' },
      { en: 'I think I should take the day off.', ja: '今日は休んだほうがいいと思います。', note: 'take the day off で「1日休む」。' },
      { en: 'I hope you feel better soon.', ja: '早くよくなるといいですね。', note: '体調の悪い人へのお見舞いの言葉。' }
    ],
    role: [
      { who: 'them', en: 'Hello. What seems to be the problem today?', ja: 'こんにちは。今日はどうされましたか。' },
      { who: 'you', ja: 'のどが痛くて熱があると伝える', en: 'I have a sore throat and a fever.' },
      { who: 'them', en: 'I see. When did it start?', ja: 'なるほど。いつからですか。' },
      { who: 'you', ja: '昨日の夜からと答える', en: 'It started last night.' },
      { who: 'them', en: 'Are you allergic to any medicine?', ja: '何か薬のアレルギーはありますか。' },
      { who: 'you', ja: 'ないと思うと答え、どのくらいで治るか聞く', en: 'No, I don\'t think so. How long will it take to get better?' }
    ]
  },
  {
    id: 'feelings', icon: '😊', name: '気持ち・あいづち', desc: '感情を伝える・会話を自然に続ける',
    phrases: [
      { en: 'That\'s great news! I\'m so happy for you.', ja: 'それはいい知らせだね！本当によかったね。', note: '相手のうれしい知らせに。I\'m happy for you. は「あなたのために喜んでいる」。' },
      { en: 'Oh no, I\'m sorry to hear that.', ja: 'ああ、それは残念だったね。', note: '悪い知らせへの返事。sorry は謝罪だけでなく同情も表す。' },
      { en: 'Really? I had no idea.', ja: '本当？全然知らなかった。', note: 'I had no idea. で「まったく知らなかった」。' },
      { en: 'I\'m really looking forward to it.', ja: 'すごく楽しみにしています。', note: 'look forward to ＋ 名詞／～ing。' },
      { en: 'I was so nervous before the interview.', ja: '面接の前はすごく緊張していました。', note: 'nervous（緊張して）、excited（わくわくして）、relieved（ほっとして）。' },
      { en: 'You must be exhausted.', ja: 'くたくたでしょう。', note: 'must be ～ で「〜にちがいない」。相手を気づかう表現。' },
      { en: 'Exactly. That\'s what I was thinking.', ja: 'まさに。私もそう思っていました。', note: '強い同意のあいづち。' },
      { en: 'Anyway, let\'s talk about something else.', ja: 'とにかく、何か別の話をしよう。', note: 'Anyway, ～ で話題を変える。' }
    ],
    role: [
      { who: 'them', en: 'Guess what? I passed my driving test!', ja: '聞いて！運転免許の試験に受かったよ！' },
      { who: 'you', ja: 'すごい！よかったね、と喜ぶ', en: 'That\'s great news! I\'m so happy for you.' },
      { who: 'them', en: 'Thanks! I was so nervous, though.', ja: 'ありがとう！すごく緊張したけどね。' },
      { who: 'you', ja: 'わかると共感し、初めはどこに運転しに行きたいか聞く', en: 'I know what you mean. So, where do you want to drive first?' },
      { who: 'them', en: 'Maybe to the beach this weekend.', ja: '今週末、海に行こうかな。' },
      { who: 'you', ja: 'それは楽しそうと言う', en: 'That sounds like a lot of fun!' }
    ]
  }
] };
TALK_DATA.scenes.forEach(s => s.phrases.forEach((p, i) => { p.id = `${s.id}-${i + 1}`; p.scene = s.id; }));
