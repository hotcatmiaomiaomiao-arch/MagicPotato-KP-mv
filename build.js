// build single-file HTML:  node build.js [--dev]   (dev: audio referenced by relative path instead of embedded)
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const subsetFont = require('subset-font');
const root = __dirname, dev = process.argv.includes('--dev');
const order = ['art.js', 'lyrics.js', 'core.js', 'chars.js', 'props.js', 'scenes1.js', 'scenes2.js', 'scenes3.js', 'scenes4.js', 'debug.js', 'main.js'];
(async () => {
  let js = ''; for (let f of order) { if (f === 'lyrics.js' && !fs.existsSync(path.join(root, 'src', f))) { f = 'lyrics.example.js'; console.log('src/lyrics.js not found -> using src/lyrics.example.js'); } const p = path.join(root, 'src', f); if (fs.existsSync(p)) js += `\n// ---- ${f}\n` + fs.readFileSync(p, 'utf8'); }
  const chars = [...new Set(js.replace(/^const ART = .*$/m, '') + ' 0123456789:/▶❚')].filter(c => c >= ' ').join('');
  const fonts = [['ZenMaru', 'ZenMaru-Black.ttf', 900], ['ZCOOL', 'ZCOOLKuaiLe.ttf', 400], ['Fredoka', 'Fredoka.ttf', '300 700'], ['Pacifico', 'Pacifico.ttf', 400]];
  fs.mkdirSync(path.join(root, 'tmp/fontcache'), { recursive: true });
  let css = '';
  for (const [name, file, wt] of fonts) {
    const key = crypto.createHash('md5').update(file + chars).digest('hex').slice(0, 12), cp = path.join(root, 'tmp/fontcache', `${name}-${key}.woff2`);
    let buf; if (fs.existsSync(cp)) buf = fs.readFileSync(cp); else { buf = await subsetFont(fs.readFileSync(path.join(root, 'fonts', file)), chars, { targetFormat: 'woff2' }); fs.writeFileSync(cp, buf); }
    css += `@font-face{font-family:'${name}';font-weight:${wt};src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');}\n`;
  }
  const songP = path.join(root, 'assets/song.m4a'), hasSong = fs.existsSync(songP);
  if (!hasSong) console.log('assets/song.m4a not found -> the player will be silent');
  const audio = !hasSong ? '' : dev ? '../assets/song.m4a' : 'data:audio/mp4;base64,' + fs.readFileSync(songP).toString('base64');
  const html = `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>バトル・オブ・バトラー！ - MG Animation MV</title>
<style>
${css}
html,body{margin:0;height:100%;background:#2a2024;overflow:hidden;font-family:'Fredoka','ZenMaru',sans-serif}
#stage{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
#cv{max-width:100vw;max-height:100vh;aspect-ratio:16/9;width:auto;height:auto;background:#fdfbf3;box-shadow:0 10px 60px rgba(0,0,0,.45);cursor:pointer}
@media (min-aspect-ratio:16/9){#cv{height:100vh}} @media (max-aspect-ratio:16/9){#cv{width:100vw}}
#ui{position:fixed;left:0;right:0;bottom:0;display:flex;gap:14px;align-items:center;padding:14px 22px;background:linear-gradient(transparent,rgba(30,20,24,.78));color:#fff;transition:opacity .4s;font-size:16px}
#ui.hide{opacity:0;pointer-events:none}
#ui button{background:#f26286;border:0;color:#fff;width:44px;height:44px;border-radius:22px;font-size:16px;cursor:pointer}
#seek{flex:1;accent-color:#f26286;height:6px}
#big{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(253,251,243,.82);cursor:pointer;color:#5a4034}
#big .b{width:150px;height:150px;border-radius:75px;background:#f26286;color:#fff;font-size:64px;display:flex;align-items:center;justify-content:center;padding-left:10px;box-sizing:border-box;box-shadow:0 10px 0 #d94a70}
#big p{font-size:22px;letter-spacing:.1em;margin-top:28px}
body.render #ui,body.render #big{display:none} body.render #cv{box-shadow:none}
</style></head><body>
<div id="stage"><canvas id="cv" width="1920" height="1080"></canvas></div>
<div id="big"><div class="b">▶</div><p>CLICK TO PLAY　/　Space: 再生・一時停止　F: 全画面</p></div>
<div id="ui"><button id="pp">▶</button><input id="seek" type="range" min="0" max="1000" value="0"><span id="tm">0:00</span><button id="fs">⛶</button></div>
<audio id="au" preload="auto" src="${audio}"></audio>
<script>
${js}
</script></body></html>`;
  fs.mkdirSync(path.join(root, 'out'), { recursive: true });
  const outp = path.join(root, 'out', dev ? 'dev.html' : 'index.html'); fs.writeFileSync(outp, html);
  console.log('built', outp, (html.length / 1e6).toFixed(2) + ' MB', 'chars', chars.length);
})().catch(e => { console.error(e); process.exit(1); });
