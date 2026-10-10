// node tools/render.js [--workers N] [--from s] [--to s] [--out file]
// Parallel deterministic render: each worker renders a contiguous frame range -> its own ffmpeg (mjpeg pipe -> x264 segment); then concat + mux audio.
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const puppeteer = require('puppeteer-core');
const root = path.join(__dirname, '..');
const FPS = 30, DUR = 299.69;
const args = process.argv.slice(2); const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const NW = +opt('--workers', 12), from = +opt('--from', 0), to = +opt('--to', DUR), out = path.resolve(opt('--out', path.join(root, 'out', 'mv.mp4')));
const f0 = Math.round(from * FPS), f1 = Math.floor(to * FPS); const N = f1 - f0;
const segDir = path.join(root, 'tmp', 'seg'); fs.mkdirSync(segDir, { recursive: true });
for (const f of fs.readdirSync(segDir)) fs.unlinkSync(path.join(segDir, f));
console.log(execFileSync('node', [path.join(root, 'build.js'), '--dev']).toString().trim());
(async () => {
  const t0 = Date.now(); let done = 0;
  const browser = await puppeteer.launch({ executablePath: require('./chrome.js')(), headless: 'new', args: ['--allow-file-access-from-files', '--mute-audio', '--disable-gpu-vsync'] });
  const per = Math.ceil(N / NW), segs = [];
  const job = async w => {
    const a = f0 + w * per, b = Math.min(f1, a + per); if (a >= b) return;
    const seg = path.join(segDir, `seg_${String(w).padStart(2, '0')}.mp4`); segs[w] = seg;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-threads', '3', '-r', String(FPS), seg], { stdio: ['pipe', 'inherit', 'inherit'] });
    const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
    page.on('pageerror', e => console.log('PAGEERROR', e.message));
    await page.goto('file:///' + path.join(root, 'out/dev.html').replace(/\\/g, '/') + '#render');
    await page.waitForFunction('window.__ready===true', { timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const B = 8;
    for (let f = a; f < b; f += B) {
      const n = Math.min(B, b - f);
      const urls = await page.evaluate((f, n, FPS) => { const cv = document.getElementById('cv'), r = []; for (let i = 0; i < n; i++) { window.renderAt((f + i) / FPS); r.push(cv.toDataURL('image/jpeg', .96).split(',')[1]); } return r; }, f, n, FPS);
      for (const u of urls) { const buf = Buffer.from(u, 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
      done += n;
      if (w === 0 && (f - a) % (B * 15) === 0) { const el = (Date.now() - t0) / 1000; console.log(`${done}/${N} frames  ${el.toFixed(0)}s  eta ${(el / done * (N - done)).toFixed(0)}s`); }
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); await page.close();
  };
  await Promise.all([...Array(NW).keys()].map(job));
  await browser.close();
  const list = path.join(segDir, 'list.txt'); fs.writeFileSync(list, segs.filter(Boolean).map(s => `file '${s.replace(/\\/g, '/')}'`).join('\n'));
  const song = path.join(root, 'assets', 'song.m4a');
  if (fs.existsSync(song)) execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-ss', String(from), '-i', song, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
  else { console.log('assets/song.m4a not found -> rendering a silent video'); execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c:v', 'copy', '-movflags', '+faststart', out], { stdio: 'inherit' }); }
  console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
})().catch(e => { console.error(e); process.exit(1); });
