// compact tempo analysis by autocorrelation of onset envelope per segment
const fs = require('fs'); const path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, '../tmp/onset.json')));
const on = d.on, e = d.e, b = d.b, N = on.length;
console.log('N', N, 'dur', (N / 100).toFixed(2));
function ac(t0, t1) {
  const s = Math.round(t0 * 100), en = Math.min(N, Math.round(t1 * 100));
  let mean = 0; for (let i = s; i < en; i++) mean += on[i]; mean /= (en - s);
  const out = [];
  for (let lag = 15; lag <= 110; lag++) { let a = 0; for (let i = s; i + lag < en; i++) a += (on[i] - mean) * (on[i + lag] - mean); out.push([lag / 100, a / (en - s - lag)]); }
  out.sort((x, y) => y[1] - x[1]);
  return out.slice(0, 6).map(r => `${r[0].toFixed(2)}(${r[1].toFixed(3)})`).join(' ');
}
for (const [a, bb] of [[0, 18], [18, 45], [45, 89], [89, 122], [122, 171], [171, 222], [222, 250], [250, 285], [285, 299]]) console.log(`seg ${a}-${bb}: ${ac(a, bb)}`);
// loudness per 0.5 s (0-9 scale)
let mx = 0; for (const v of e) mx = Math.max(mx, v);
let line = '';
for (let s = 0; s < N / 50; s++) { let m = 0, c = 0; for (let i = s * 50; i < (s + 1) * 50 && i < N; i++) { m += e[i]; c++; } line += Math.min(9, Math.floor(m / c / mx * 14)); if (s % 20 === 19) { console.log(`${String((s - 19) / 2).padStart(3)}s ${line}`); line = ''; } }
console.log(line);
