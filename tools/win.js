// print onset peaks in a time window: node win.js t0 t1 [t0 t1 ...]
const fs = require('fs'); const path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, '../tmp/onset.json')));
const on = d.on, e = d.e;
const a = process.argv.slice(2).map(Number);
for (let k = 0; k < a.length; k += 2) {
  const s = Math.round(a[k] * 100), en = Math.round(a[k + 1] * 100);
  const pk = [];
  for (let i = s + 2; i < en - 2; i++) if (on[i] > 0.35 && on[i] >= on[i - 1] && on[i] >= on[i + 1] && on[i] >= on[i - 2] && on[i] >= on[i + 2]) pk.push(`${(i / 100).toFixed(2)}(${on[i].toFixed(1)})`);
  console.log(`[${a[k]}-${a[k + 1]}] ` + pk.join(' '));
  let line = ''; let mx = 0; for (let i = s; i < en; i++) mx = Math.max(mx, e[i]);
  for (let i = s; i < en; i += 10) { let m = 0; for (let j = i; j < i + 10; j++) m += e[j] || 0; line += Math.min(9, Math.floor(m / 10 / mx * 10)); }
  console.log('   env/0.1s: ' + line);
}
