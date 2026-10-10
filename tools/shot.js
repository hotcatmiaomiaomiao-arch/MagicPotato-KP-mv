// preview frames: node tools/shot.js name [--cols N] [--w 640] [--sheet] t1 t2 ...   -> tmp/shot_<name>.jpg (contact sheet)
// rebuilds dev html first. Prints page errors.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const puppeteer = require('puppeteer-core');
const root = path.join(__dirname, '..');
(async () => {
  const args = process.argv.slice(2); const name = args.shift(); let cols = 3, w = 640, sheet = false; const ts = [];
  while (args.length) { const a = args.shift(); if (a === '--cols') cols = +args.shift(); else if (a === '--w') w = +args.shift(); else if (a === '--sheet') sheet = true; else ts.push(+a); }
  console.log(execFileSync('node', [path.join(root, 'build.js'), '--dev']).toString().trim());
  const browser = await puppeteer.launch({ executablePath: require('./chrome.js')(), headless: 'new', args: ['--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required', '--mute-audio'] });
  const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
  const errs = []; page.on('pageerror', e => errs.push('PAGEERROR ' + (e.stack || e.message).split('\n').slice(0, 4).join(' | '))); page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await page.goto('file:///' + path.join(root, 'out/dev.html').replace(/\\/g, '/') + '#render');
  try { await page.waitForFunction('window.__ready===true', { timeout: 20000 }); } catch (e) { console.log('not ready'); }
  const url = await page.evaluate(async (ts, cols, w, sheet) => {
    const h = Math.round(w * 9 / 16), rows = Math.ceil(ts.length / cols), c = document.createElement('canvas'); c.width = cols * w; c.height = rows * h; const g = c.getContext('2d'); const cv = document.getElementById('cv'); const errs = [];
    ts.forEach((t, i) => { try { if (sheet) window.__sheet(t); else window.renderAt(t); } catch (e) { errs.push('t=' + t + ' ' + (e.stack || e).toString().split('\n').slice(0, 3).join(' | ')); } const x = (i % cols) * w, y = Math.floor(i / cols) * h; g.drawImage(cv, x, y, w, h); g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(x, y, 78, 22); g.fillStyle = '#fff'; g.font = '15px monospace'; g.fillText(t.toFixed(2), x + 5, y + 16); });
    return { url: c.toDataURL('image/jpeg', .9), errs };
  }, ts, cols, w, sheet);
  fs.writeFileSync(path.join(root, 'tmp', `shot_${name}.jpg`), Buffer.from(url.url.split(',')[1], 'base64'));
  for (const e of [...errs, ...url.errs].slice(0, 8)) console.log(e);
  console.log('saved tmp/shot_' + name + '.jpg');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
