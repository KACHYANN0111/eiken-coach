/* スマホアプリ版（PWA）のサービスワーカー：build.js が自動生成（手で編集しない） */
const CACHE = 'eiken-coach-a8a6323c4a';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/version.js",
  "js/config.js",
  "js/util.js",
  "js/store.js",
  "js/data/words-pre2.js",
  "js/data/words.js",
  "js/data/words2.js",
  "js/data/words3.js",
  "js/data/words4.js",
  "js/data/words-pre1.js",
  "js/data/words-pre1b.js",
  "js/data/words-pre1c.js",
  "js/data/words-pre1d.js",
  "js/data/words-1.js",
  "js/data/words-1b.js",
  "js/data/words-1c.js",
  "js/data/words-1d.js",
  "js/data/words-toeic600.js",
  "js/data/words-toeic730.js",
  "js/data/words-toeic860.js",
  "js/data/words-toeic-extra.js",
  "js/data/phrases.js",
  "js/data/phrases-grades.js",
  "js/data/reading.js",
  "js/data/reading-p1.js",
  "js/data/reading-1.js",
  "js/data/listening.js",
  "js/data/listening-p1.js",
  "js/data/listening-1.js",
  "js/data/writing.js",
  "js/data/writing-p1-1.js",
  "js/data/speaking.js",
  "js/data/speaking-p1-1.js",
  "js/data/talk.js",
  "js/coach.js",
  "js/ai.js",
  "js/pwa.js",
  "js/sound.js",
  "js/mic.js",
  "js/ai-chat.js",
  "js/views/home.js",
  "js/views/vocab.js",
  "js/views/reading.js",
  "js/views/listening.js",
  "js/views/writing.js",
  "js/views/speaking.js",
  "js/views/past.js",
  "js/views/history.js",
  "js/views/settings.js",
  "js/views/talk.js",
  "js/views/talk-ai.js",
  "js/app.js",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

// 新しい版のファイルを（ブラウザの一時保存を使わず）取り直して保存し、すぐ切り替える
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// ネットにつながっていれば常に最新を読み込み、つながらないときだけ保存済みの版を使う
// （外部サイトへの通信には関与しない）
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
