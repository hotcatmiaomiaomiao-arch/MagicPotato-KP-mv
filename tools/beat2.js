// refine beat grid: per-window phase using bass-only onsets; test on-beat vs off-beat
const fs = require('fs'); const path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, '../tmp/onset.json')));
const b = d.b, e = d.e, N = b.length;
const fb = new Float32Array(N), ff = new Float32Array(N);
for (let i = 1; i < N; i++) { fb[i] = Math.max(0, Math.log(1e-4 + b[i]) - Math.log(1e-4 + b[i - 1])); ff[i] = Math.max(0, Math.log(1e-4 + e[i]) - Math.log(1e-4 + e[i - 1])); }
function score(arr, p, ph, t0, t1) { let s = 0, c = 0; for (let t = t0 + ((ph - t0) % p + p) % p; t < t1; t += p) { const i = Math.round(t * 100); s += Math.max(arr[i - 2] || 0, arr[i - 1] || 0, arr[i] || 0, arr[i + 1] || 0, arr[i + 2] || 0); c++; } return s / Math.max(1, c); }
// fine tempo: maximise over whole-song segments separately
function best(arr, t0, t1, pmin, pmax) { let bs = -1, bp = 0, bph = 0; for (let p = pmin; p <= pmax; p += 0.0001) for (let k = 0; k < 60; k++) { const ph = p * k / 60; const s = score(arr, p, ph, t0, t1); if (s > bs) { bs = s; bp = p; bph = ph; } } return [bp, bph, bs]; }
for (const [t0, t1] of [[19, 78], [81, 142], [146, 170], [171, 217], [229, 293]]) {
  const [p, ph, s] = best(fb, t0, t1, 0.515, 0.528);
  console.log(`seg ${t0}-${t1}: bass period=${p.toFixed(4)} phase(mod p)=${ph.toFixed(3)} score=${s.toFixed(3)}  offbeat score=${score(fb, p, ph + p / 2, t0, t1).toFixed(3)}`);
  const [p2, ph2, s2] = best(ff, t0, t1, 0.515, 0.528);
  console.log(`            full period=${p2.toFixed(4)} phase=${ph2.toFixed(3)} score=${s2.toFixed(3)}`);
}
// with fixed P, 10s windows, bass
const P = 0.5217;
for (let t0 = 0; t0 < 294; t0 += 8) {
  let bs = -1, bph = 0; for (let k = 0; k < 60; k++) { const ph = P * k / 60; const s = score(fb, P, ph, t0, t0 + 8); if (s > bs) { bs = s; bph = ph; } }
  console.log(`w ${t0}: ph=${bph.toFixed(3)} s=${bs.toFixed(2)} off=${score(fb, P, bph + P / 2, t0, t0 + 8).toFixed(2)}`);
}
