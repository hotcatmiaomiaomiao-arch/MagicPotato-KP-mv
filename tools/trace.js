// Trace head art (hair / skin / tiara) from the reference images into vector paths -> src/art.js
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { PNG } = require('pngjs'); const potrace = require('potrace');
const root = path.join(__dirname, '..');
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function upscale(src, dst, k) { if (!fs.existsSync(dst)) execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-vf', `scale=iw*${k}:ih*${k}:flags=lanczos`, dst]); return PNG.sync.read(fs.readFileSync(dst)); }
// ---- mask helpers
function classify(img, x0, y0, w, h, classes) { // -> Uint8Array of class index
  const out = new Uint8Array(w * h), C = classes.map(hex);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = ((y + y0) * img.width + x + x0) * 4, r = img.data[i], g = img.data[i + 1], b = img.data[i + 2];
    let bi = 0, bd = 1e9; for (let c = 0; c < C.length; c++) { const d = (r - C[c][0]) ** 2 + (g - C[c][1]) ** 2 + (b - C[c][2]) ** 2; if (d < bd) { bd = d; bi = c; } }
    out[y * w + x] = bi;
  } return out;
}
const pick = (cls, ...ids) => { const m = new Uint8Array(cls.length); for (let i = 0; i < cls.length; i++) if (ids.includes(cls[i])) m[i] = 1; return m; };
const or = (a, b) => a.map((v, i) => v | b[i]), and = (a, b) => a.map((v, i) => v & b[i]), not = a => a.map(v => v ? 0 : 1);
function morph(m, w, h, n, dil) { let a = m; for (let k = 0; k < n; k++) { const b = new Uint8Array(a.length); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = y * w + x; let v = a[i]; const nb = [x > 0 ? a[i - 1] : (dil ? 0 : 1), x < w - 1 ? a[i + 1] : (dil ? 0 : 1), y > 0 ? a[i - w] : (dil ? 0 : 1), y < h - 1 ? a[i + w] : (dil ? 0 : 1)]; if (dil) v = v | nb[0] | nb[1] | nb[2] | nb[3]; else v = v & nb[0] & nb[1] & nb[2] & nb[3]; b[i] = v; } a = b; } return a; }
const dilate = (m, w, h, n) => morph(m, w, h, n, true), erode = (m, w, h, n) => morph(m, w, h, n, false);
const open = (m, w, h, n) => dilate(erode(m, w, h, n), w, h, n), close = (m, w, h, n) => erode(dilate(m, w, h, n), w, h, n);
function comps(m, w, h) { // connected components sorted by size
  const lab = new Int32Array(m.length), list = []; let n = 0; const st = [];
  for (let s = 0; s < m.length; s++) if (m[s] && !lab[s]) { n++; let cnt = 0, sx = 0, sy = 0, x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1; st.push(s); lab[s] = n; while (st.length) { const i = st.pop(), x = i % w, y = (i - x) / w; cnt++; sx += x; sy += y; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; if (x > 0 && m[i - 1] && !lab[i - 1]) { lab[i - 1] = n; st.push(i - 1); } if (x < w - 1 && m[i + 1] && !lab[i + 1]) { lab[i + 1] = n; st.push(i + 1); } if (y > 0 && m[i - w] && !lab[i - w]) { lab[i - w] = n; st.push(i - w); } if (y < h - 1 && m[i + w] && !lab[i + w]) { lab[i + w] = n; st.push(i + w); } } list.push({ id: n, n: cnt, cx: sx / cnt, cy: sy / cnt, x0, x1, y0, y1 }); }
  list.sort((a, b) => b.n - a.n); return { lab, list };
}
function largest(m, w, h, k = 1) { const { lab, list } = comps(m, w, h); const keep = new Set(list.slice(0, k).map(c => c.id)); return m.map((v, i) => keep.has(lab[i]) ? 1 : 0); }
function fillHoles(m, w, h, yCut = h) { // holes = not reachable from border (rows >= yCut are walls)
  const out = new Uint8Array(m.length), st = [];
  const push = i => { if (!m[i] && !out[i] && Math.floor(i / w) < yCut) { out[i] = 1; st.push(i); } };
  for (let x = 0; x < w; x++) push(x); for (let y = 0; y < Math.min(h, yCut); y++) { push(y * w); push(y * w + w - 1); }
  while (st.length) { const i = st.pop(), x = i % w; if (x > 0) push(i - 1); if (x < w - 1) push(i + 1); if (i >= w) push(i - w); if (i < m.length - w) push(i + w); }
  return out.map((v, i) => (!v && Math.floor(i / w) < yCut) ? 1 : 0);
}
const rows = (m, w, y0, y1) => m.map((v, i) => { const y = Math.floor(i / w); return (y >= y0 && y < y1) ? v : 0; });
function trace(m, w, h, o = {}) {
  const png = new PNG({ width: w, height: h }); for (let i = 0; i < m.length; i++) { const v = m[i] ? 0 : 255; png.data[i * 4] = png.data[i * 4 + 1] = png.data[i * 4 + 2] = v; png.data[i * 4 + 3] = 255; }
  return new Promise((res, rej) => { const p = new potrace.Potrace(); p.setParameters({ threshold: 128, turdSize: o.turd || 60, optTolerance: o.tol || 0.6, alphaMax: 1 }); p.loadImage(PNG.sync.write(png), e => { if (e) return rej(e); const d = /d="([^"]+)"/.exec(p.getPathTag())[1]; res(d); }); });
}
function xform(d, ox, oy, k) { if (/[^MLCZ0-9.,\s-]/.test(d)) throw new Error('unexpected path cmd: ' + d.match(/[^MLCZ0-9.,\s-]/)[0]); let n = 0; return d.replace(/-?\d+(\.\d+)?/g, s => { const v = (+s - (n++ % 2 ? oy : ox)) * k; return (Math.round(v * 10) / 10).toString(); }).replace(/\s+/g, ' ').trim(); }
function dump(name, layers, w, h) { // debug composite
  const png = new PNG({ width: w, height: h }); png.data.fill(255); for (const [m, c] of layers) { const C = hex(c); for (let i = 0; i < m.length; i++) if (m[i]) { png.data[i * 4] = C[0]; png.data[i * 4 + 1] = C[1]; png.data[i * 4 + 2] = C[2]; } }
  fs.writeFileSync(path.join(root, 'tmp', name), PNG.sync.write(png));
}

(async () => {
  const ART = { butlers: [], lady: {} };
  // ================= butlers =================
  const K = 3, img = upscale(path.join(root, 'assets/butlers.png'), path.join(root, 'tmp/butlers3.png'), K);
  const hairCol = ['#f7d082', '#32261f', '#c9c8c8', '#252524', '#2f2520'], coatCol = ['#222121', '#fdd146', '#911b25', '#0bb8d6', '#6f32ab'];
  for (let b = 0; b < 5; b++) {
    const w = 434 * K, h = 400 * K, x0 = b * 434 * K;
    // classes: 0 bg, 1 white, 2 skin, 3 hair, 4 eye, 5 mouth pink, 6 coat, 7 black
    const cls = classify(img, x0, 0, w, h, ['#fdfbf3', '#ffffff', '#fdeedb', hairCol[b], '#380702', '#fc9c98', coatCol[b], b === 0 ? '#380702' : '#1d1c1c']);
    const darkHair = b === 1 || b === 3 || b === 4;
    let hair = pick(cls, ...(darkHair ? [3, 7] : [3]));
    hair = rows(hair, w, 0, 380 * K); hair = largest(open(hair, w, h, 3), w, h);
    let skin = largest(open(pick(cls, 2), w, h, 3), w, h);
    const eyes = comps(open(rows(pick(cls, 4), w, 0, 380 * K), w, h, 4), w, h).list.filter(c => !darkHair || true).slice(0, 2).sort((a, c) => a.cx - c.cx);
    const sil = erode(fillHoles(dilate(or(hair, skin), w, h, 6), w, h), w, h, 6);
    const near = dilate(not(sil), w, h, 4 * K);
    const skinDraw = and(sil, not(and(hair, near)));
    // pivot: x mid of eyes, y = chin bottom (max y of skin near centre)
    const px = (eyes[0].cx + eyes[1].cx) / 2; let py = 0; for (let y = h - 1; y > 0 && !py; y--) if (skin[y * w + Math.round(px)]) py = y;
    dump(`dbg_b${b}.png`, [[skinDraw, '#fdeedb'], [hair, hairCol[b]]], w, h);
    const e = eyes.map(c => [(c.cx - px) / K, (c.cy - py) / K, (c.x1 - c.x0 + 1) / 2 / K, (c.y1 - c.y0 + 1) / 2 / K].map(v => +v.toFixed(1)));
    ART.butlers.push({ hair: xform(await trace(hair, w, h), px, py, 1 / K), skin: xform(await trace(skinDraw, w, h), px, py, 1 / K), eyes: e, pivot: [+(px / K).toFixed(1), +(py / K).toFixed(1)] });
    console.log('butler', b, 'pivot', (px / K).toFixed(1), (py / K).toFixed(1), 'eyes', JSON.stringify(e));
  }
  // ================= lady (hair & skin from lady3, tiara from lady1) =================
  {
    const K = 2, S = 0.5 / K; // output units: reference px * 0.5
    const img = upscale(path.join(root, 'assets/lady3.png'), path.join(root, 'tmp/lady3x2.png'), K);
    const w = img.width, h = 1040 * K;
    // 0 bg,1 white,2 skin,3 hairL,4 hairD,5 eye,6 gold,7 gem,8 pink1,9 pink2
    const cls = classify(img, 0, 0, w, h, ['#fefdf5', '#ffffff', '#fde6d3', '#8b5533', '#744828', '#341603', '#edba4f', '#f07a94', '#fdc7d6', '#faaec1']);
    let hairAll = largest(close(pick(cls, 3, 4), w, h, 2), w, h);
    const headY = 738 * K;
    let skin = largest(open(rows(pick(cls, 2), w, 0, 760 * K), w, h, 3), w, h);
    const eyes = comps(open(rows(pick(cls, 5), w, 480 * K, 660 * K), w, h, 4), w, h).list.slice(0, 2).sort((a, c) => a.cx - c.cx);
    const px = (eyes[0].cx + eyes[1].cx) / 2;
    // chin bottom: lowest skin row whose run is wider than the neck -> find width jump
    let py = 0; { const wd = y => { let n = 0; for (let x = 0; x < w; x++) n += skin[y * w + x]; return n; }; for (let y = 760 * K - 1; y > 600 * K; y--) { if (wd(y) > 110 * K) { py = y; break; } } }
    // hair top under the tiara: quadratic fit of hair top contour beside the tiara
    const top = x => { for (let y = 0; y < h; y++) if (hairAll[y * w + x]) return y; return -1; };
    const pts = []; for (let x = 290 * K; x < 735 * K; x += 4) { if (x > 372 * K && x < 655 * K) continue; pts.push([x - px, top(x)]); }
    for (let x = -70 * K; x <= 70 * K; x += 4) pts.push([x, 172 * K]); // anchors: dome apex hidden behind the tiara
    let s4 = 0, s2 = 0, s0 = pts.length, sy2 = 0, sy = 0; for (const [x, y] of pts) { s4 += x ** 4; s2 += x * x; sy2 += x * x * y; sy += y; }
    const c = 170 * K, xl = 364 * K, xr = 662 * K; const aL = (top(xl) - c) / (xl - px) ** 2, aR = (top(xr) - c) / (xr - px) ** 2; const a = 0; const ytf = x => c + (x < px ? aL : aR) * (x - px) ** 2;
    const tiara = rows(pick(cls, 6, 7), w, 0, 260 * K);
    for (let y = 0; y < 300 * K; y++) for (let x = xl + 1; x < xr; x++) { const yt = ytf(x); if (y > yt + 1) hairAll[y * w + x] = 1; else if (y < yt - 1 && x > xl && x < xr) hairAll[y * w + x] = 0; }
    hairAll = or(hairAll, rows(fillHoles(hairAll, w, h), w, 0, 420 * K));
    const all = or(or(hairAll, skin), rows(pick(cls, 8, 9, 7, 5), w, 320 * K, h));
    const cut = 985 * K;
    const backSil = fillHoles(all, w, h, cut);
    let hairL = and(close(open(pick(cls, 3), w, h, 2), w, h, 2), hairAll); // light part
    for (let y = 0; y < 300 * K; y++) for (let x = 330 * K; x < 700 * K; x++) hairL[y * w + x] = hairAll[y * w + x];
    let dark = and(rows(backSil, w, 700 * K, cut), not(hairL)); dark = largest(open(dark, w, h, 4), w, h);
    let front = largest(rows(hairL, w, 0, headY), w, h); front = or(front, rows(fillHoles(front, w, h), w, 0, 420 * K));
    const sil = fillHoles(or(front, rows(skin, w, 0, headY + 30 * K)), w, h);
    const near = dilate(not(sil), w, h, 4 * K);
    const skinDraw = and(sil, not(and(front, near)));
    dump('dbg_lady.png', [[backSil, '#8b5533'], [dark, '#744828'], [skinDraw, '#fde6d3'], [front, '#9b6543']], w, h);
    const e = eyes.map(c => [(c.cx - px) * S, (c.cy - py) * S, (c.x1 - c.x0 + 1) / 2 * S, (c.y1 - c.y0 + 1) / 2 * S].map(v => +v.toFixed(1)));
    ART.lady = { back: xform(await trace(backSil, w, h, { turd: 200 }), px, py, S), dark: xform(await trace(dark, w, h, { turd: 400, tol: 1 }), px, py, S), front: xform(await trace(front, w, h), px, py, S), skin: xform(await trace(skinDraw, w, h), px, py, S), eyes: e, pivot: [px / K, py / K] };
    console.log('lady pivot', px / K, py / K, 'eyes', JSON.stringify(e), 'hairTop fit', a.toFixed(5), (c / K).toFixed(1));
    // tiara from lady1
    const img1 = upscale(path.join(root, 'assets/lady1.png'), path.join(root, 'tmp/lady1x2.png'), K);
    const h1 = 270 * K; // 0 bg,1 hair,2 gold,3 gem,4 gemHi,5 hairD
    const c1 = classify(img1, 0, 0, w, h1, ['#fefdf6', '#88512f', '#e6b247', '#f26286', '#fbb0c4', '#714223']);
    const gemAll = largest(close(pick(c1, 3, 4), w, h1, 2), w, h1);
    const gold = or(open(pick(c1, 2), w, h1, 1), [0]); const goldM = pick(c1, 2);
    const gemHi = largest(open(and(pick(c1, 4), erode(gemAll, w, h1, 3)), w, h1, 1), w, h1);
    // lady1 pivot: assume same construction (eyes mid / chin) -> recompute quickly
    const cF = classify(img1, 0, 0, w, 780 * K, ['#fefdf6', '#ffffff', '#fde8d2', '#88512f', '#3f1902', '#f79ab1']);
    const ey1 = comps(open(rows(pick(cF, 4), w, 480 * K, 660 * K), w, 780 * K, 4), w, 780 * K).list.slice(0, 2);
    const px1 = (ey1[0].cx + ey1[1].cx) / 2; const sk1 = largest(open(pick(cF, 2), w, 780 * K, 3), w, 780 * K);
    let py1 = 0; { const wd = y => { let n = 0; for (let x = 0; x < w; x++) n += sk1[y * w + x]; return n; }; for (let y = 760 * K - 1; y > 600 * K; y--) if (wd(y) > 110 * K) { py1 = y; break; } }
    ART.lady.tiara = { gold: xform(await trace(goldM, w, h1, { turd: 8, tol: 0.3 }), px1, py1, S), gem: xform(await trace(gemAll, w, h1, { turd: 8 }), px1, py1, S), hi: xform(await trace(gemHi, w, h1, { turd: 4 }), px1, py1, S) };
    console.log('lady1 pivot', px1 / K, py1 / K);
  }
  const js = 'const ART = ' + JSON.stringify(ART) + ';\n';
  fs.writeFileSync(path.join(root, 'src/art.js'), js); console.log('art.js bytes', js.length);
})().catch(e => { console.error(e); process.exit(1); });
