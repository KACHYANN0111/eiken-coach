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
assets.filter(a => a !== './').forEach(a => hash.update(fs.readFileSync(path.join(ROOT, a))));
const version = hash.digest('hex').slice(0, 10);
const sw = `/* スマホアプリ版（PWA）のサービスワーカー：build.js が自動生成（手で編集しない） */
const CACHE = 'eiken-coach-${version}';
const ASSETS = ${JSON.stringify(assets, null, 2)};

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// 自サイトのファイルはキャッシュ優先（オフラインでも動く）。外部サイトへの通信には関与しない
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('index.html') : undefined))
  );
});
`;
fs.writeFileSync(path.join(ROOT, 'sw.js'), sw);
console.log(`sw.js (cache ${version}, ${assets.length} files)`);

/* ---------- 2. claude.ai 公開版（1ファイル） ---------- */
const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '英検2級 AI学習コーチ';
const css = read('css/style.css');
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('<!-- 設定・共通 -->')).trim();
const js = scripts.map(src => `/* ---- ${src} ---- */\n` + read(src)).join('\n');
if (/<\/script/i.test(js)) throw new Error('JS に </script が含まれています');
const out = `<title>${title}</title>
<style>
${css}
</style>
${body}
<script>
${js}
</script>
`;
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/eiken-coach.html'), out);
console.log(`dist/eiken-coach.html (${(out.length / 1024).toFixed(0)} KB, ${scripts.length} scripts)`);
