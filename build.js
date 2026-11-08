// ビルドスクリプト（外部ライブラリ不要）
// 使い方: node build.js
//  1. sw.js         … スマホアプリ版（PWA）のオフライン用キャッシュ一覧を更新
//  2. dist/eiken-coach.html … claude.ai 公開版（全ファイルを1つにまとめたHTML）
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const html = read('index.html');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);

/* ---------- 1. sw.js（PWA） ---------- */
const assets = ['./', 'index.html', 'manifest.webmanifest', 'css/style.css', ...scripts,
  ...fs.readdirSync(path.join(ROOT, 'icons')).filter(f => f.endsWith('.png')).map(f => 'icons/' + f)];
const hash = crypto.createHash('sha256');
assets.filter(a => a !== './' && a !== 'js/version.js').forEach(a => hash.update(fs.readFileSync(path.join(ROOT, a))));
const version = hash.digest('hex').slice(0, 10);

// アプリのバージョン表示用（設定画面に出す）
const d = new Date(), p2 = n => String(n).padStart(2, '0');
const label = `${d.getFullYear()}.${p2(d.getMonth() + 1)}.${p2(d.getDate())}-${version.slice(0, 6)}`;
fs.writeFileSync(path.join(ROOT, 'js/version.js'), `/* build.js が自動生成（手で編集しない） */\nvar APP_VERSION = '${label}';\n`);

const sw = `/* スマホアプリ版（PWA）のサービスワーカー：build.js が自動生成（手で編集しない） */
const CACHE = 'eiken-coach-${version}';
const ASSETS = ${JSON.stringify(assets, null, 2)};

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
`;
fs.writeFileSync(path.join(ROOT, 'sw.js'), sw);
console.log(`sw.js (cache ${version}, ${assets.length} files) / version ${label}`);

/* ---------- 2. claude.ai 公開版（1ファイル） ---------- */
const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '英検2級 AI学習コーチ';
const css = read('css/style.css');
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('<!-- 設定・共通 -->')).trim();
const js = scripts.map(src => `/* ---- ${src} ---- */\n` + read(src)).join('\n');
if (/<\/script/i.test(js)) throw new Error('JS に </script が含まれています');
const out = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<style>
${css}
</style>
</head>
<body>
${body}
<script>
${js}
</script>
</body>
</html>
`;
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/eiken-coach.html'), out);
console.log(`dist/eiken-coach.html (${(out.length / 1024).toFixed(0)} KB, ${scripts.length} scripts)`);
