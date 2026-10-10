// print dominant colours of regions of an image:  node palette.js file x y w h
const fs = require('fs'); const { PNG } = require('pngjs');
const [, , file, X, Y, W, H] = process.argv;
const png = PNG.sync.read(fs.readFileSync(file));
const x0 = +X || 0, y0 = +Y || 0, w = +W || png.width, h = +H || png.height;
const m = new Map();
for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) {
  const i = (y * png.width + x) * 4; const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2];
  const k = (r >> 3) << 10 | (g >> 3) << 5 | (b >> 3);
  let o = m.get(k); if (!o) { o = [0, 0, 0, 0]; m.set(k, o); } o[0]++; o[1] += r; o[2] += g; o[3] += b;
}
// merge close bins greedily
let arr = [...m.values()].map(o => ({ n: o[0], r: o[1] / o[0], g: o[2] / o[0], b: o[3] / o[0] })).sort((a, b) => b.n - a.n);
const out = [];
for (const c of arr) { const f = out.find(o => Math.hypot(o.r - c.r, o.g - c.g, o.b - c.b) < 22); if (f) { const t = f.n + c.n; f.r = (f.r * f.n + c.r * c.n) / t; f.g = (f.g * f.n + c.g * c.n) / t; f.b = (f.b * f.n + c.b * c.n) / t; f.n = t; } else out.push({ ...c }); }
out.sort((a, b) => b.n - a.n);
const hx = v => Math.round(v).toString(16).padStart(2, '0');
console.log(out.slice(0, 14).map(c => `#${hx(c.r)}${hx(c.g)}${hx(c.b)} ${(c.n / (w * h) * 100).toFixed(2)}%`).join('  '));
