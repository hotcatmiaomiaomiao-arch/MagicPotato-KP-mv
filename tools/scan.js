// scanline colour runs: node scan.js file [--col] p1 p2 ...   (prints runs of similar colour along row y / column x)
const fs = require('fs'); const { PNG } = require('pngjs');
const args = process.argv.slice(2); const file = args.shift(); const col = args[0] === '--col'; if (col) args.shift();
let range = null; const ri = args.indexOf('--range'); if (ri >= 0) { range = [+args[ri + 1], +args[ri + 2]]; args.splice(ri, 3); }
const png = PNG.sync.read(fs.readFileSync(file));
const hx = v => Math.round(v).toString(16).padStart(2, '0');
for (const p of args.map(Number)) {
  const n = col ? png.height : png.width; const runs = []; let cur = null;
  const a = range ? range[0] : 0, b = range ? range[1] : n;
  for (let k = a; k < b; k++) {
    const i = col ? (k * png.width + p) * 4 : (p * png.width + k) * 4; const c = [png.data[i], png.data[i + 1], png.data[i + 2]];
    if (cur && Math.hypot(c[0] - cur.c[0], c[1] - cur.c[1], c[2] - cur.c[2]) < 14) { cur.e = k; cur.s[0] += c[0]; cur.s[1] += c[1]; cur.s[2] += c[2]; cur.n++; }
    else { cur = { a: k, e: k, c, s: [...c], n: 1 }; runs.push(cur); }
  }
  console.log(`${col ? 'x' : 'y'}=${p}: ` + runs.filter(r => r.n >= 3).map(r => `${r.a}-${r.e} #${hx(r.s[0] / r.n)}${hx(r.s[1] / r.n)}${hx(r.s[2] / r.n)}`).join(' | '));
}
