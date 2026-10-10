// Audio analysis: onset envelope, tempo, beat phase, loudness curve
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const buf = fs.readFileSync(path.join(root, 'tmp/song.f32'));
const sr = 22050;
const x = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
const hop = 220.5; // 100 fps
const N = Math.floor(x.length / hop) - 4;
// simple one-pole lowpass for bass
const bass = new Float32Array(x.length);
let lp = 0, a = 1 - Math.exp(-2 * Math.PI * 150 / sr);
for (let i = 0; i < x.length; i++) { lp += a * (x[i] - lp); bass[i] = lp; }
const eFull = new Float32Array(N), eBass = new Float32Array(N);
for (let n = 0; n < N; n++) {
  const s = Math.floor(n * hop), e = Math.floor((n + 2) * hop);
  let sf = 0, sb = 0;
  for (let i = s; i < e; i++) { sf += x[i] * x[i]; sb += bass[i] * bass[i]; }
  eFull[n] = Math.sqrt(sf / (e - s)); eBass[n] = Math.sqrt(sb / (e - s));
}
function flux(e) { const f = new Float32Array(e.length); for (let i = 1; i < e.length; i++) { const d = Math.log(1e-4 + e[i]) - Math.log(1e-4 + e[i - 1]); f[i] = d > 0 ? d : 0; } return f; }
const fF = flux(eFull), fB = flux(eBass);
const on = new Float32Array(N); for (let i = 0; i < N; i++) on[i] = fF[i] + 1.5 * fB[i];

// tempo search: comb score for period p (seconds) and phase
function comb(p, t0, t1) {
  let best = -1, bestPh = 0;
  const steps = 50;
  for (let k = 0; k < steps; k++) {
    const ph = p * k / steps; let s = 0, c = 0;
    for (let t = t0 + ph; t < t1; t += p) { const i = Math.round(t * 100); if (i >= 0 && i < N) { s += Math.max(on[i - 1] || 0, on[i], on[i + 1] || 0); c++; } }
    s /= Math.max(1, c);
    if (s > best) { best = s; bestPh = ph; }
  }
  return [best, bestPh];
}
const dur = x.length / sr;
console.log('duration', dur.toFixed(2));
let res = [];
for (let p = 0.44; p <= 0.56; p += 0.0002) { const [s, ph] = comb(p, 10, 280); res.push([p, s, ph]); }
res.sort((a, b) => b[1] - a[1]);
console.log('top periods (whole song):', res.slice(0, 8).map(r => `${r[0].toFixed(4)}s bpm=${(60 / r[0]).toFixed(2)} score=${r[1].toFixed(3)} ph=${r[2].toFixed(3)}`).join('\n'));
const P = res[0][0];
// local phase per window with fixed period
for (let t0 = 0; t0 < dur - 20; t0 += 20) {
  const [s, ph] = comb(P, t0, t0 + 20);
  // normalise phase relative to global grid: first beat time >= t0 modulo P
  const g = ((t0 + ph) % P + P) % P;
  console.log(`win ${t0}-${t0 + 20}: score=${s.toFixed(3)} gridOffset=${g.toFixed(3)}`);
}
// loudness per second
let line = '';
for (let s = 0; s < dur; s++) { let m = 0; for (let i = s * 100; i < (s + 1) * 100 && i < N; i++) m += eFull[i]; line += `${s}:${(m / 100).toFixed(3)} `; if (s % 10 === 9) line += '\n'; }
console.log(line);
fs.writeFileSync(path.join(root, 'tmp/onset.json'), JSON.stringify({ fps: 100, on: Array.from(on, v => +v.toFixed(3)), e: Array.from(eFull, v => +v.toFixed(4)), b: Array.from(eBass, v => +v.toFixed(4)) }));
