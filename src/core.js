// ===== core: math, easing, drawing helpers =====
const W = 1920, H = 1080, TAU = Math.PI * 2, DUR = 299.69;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v, sat = v => v < 0 ? 0 : v > 1 ? 1 : v;
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (t, a, b) => sat((t - a) / (b - a));
const E = {
  io: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  o: t => 1 - Math.pow(1 - t, 3), i: t => t * t * t, o5: t => 1 - Math.pow(1 - t, 5),
  back: t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  backIn: t => { const c = 1.9; return (c + 1) * t * t * t - c * t * t; },
  el: t => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -9 * t) * Math.sin((t * 8 - .75) * TAU / 3) + 1,
  bn: t => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375; return n * (t -= 2.625 / d) * t + .984375; },
  s: t => t * t * (3 - 2 * t),
};
// tween helper: value from a to b while t goes t0..t1 with easing
const tw = (t, t0, t1, a, b, e = E.io) => lerp(a, b, e(seg(t, t0, t1)));
// in-out envelope 0..1..0
const env = (t, a, b, din = .3, dout = .3) => Math.min(seg(t, a, a + din), 1 - seg(t, b - dout, b));
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const rr2 = (i, a, b) => a + (b - a) * hash(i);
// beat grid
const BP = 0.5217;
const beatOf = t => (t - (t < 143.6 ? 0.42 : 0.29)) / BP;       // fractional beat index
const bph = t => { const b = beatOf(t); return b - Math.floor(b); }; // 0..1 inside beat
const pulse = (t, k = 5) => Math.exp(-bph(t) * k);                 // 1 at beat, decays
const bob = (t, amp = 1) => -Math.abs(Math.sin(beatOf(t) * Math.PI)) * amp; // bounce on each beat
const hit = (t, t0, d = .35) => t < t0 ? 0 : Math.exp(-(t - t0) / d);       // impulse decay
const pop = (t, t0, d = .35) => t < t0 ? 0 : E.back(sat((t - t0) / d));    // scale-in with overshoot

// ---- colours
const C = {
  bg: '#fdfbf3', cream: '#fdf6e3', ink: '#3a2a22', skin: '#fdeedb', eye: '#380702', mouth: '#fc9c98', blush: '#f9b4ae',
  black: '#1d1c1c', white: '#ffffff', gold: '#e6b247', gold2: '#fbd85e', pink: '#f79ab1', pink2: '#feccd9', rose: '#f26286',
  mint: '#bfe6d6', sky: '#cfe8f7', lav: '#e2d6f5', lemon: '#fdeeb0', peach: '#fde0d0',
};
const hex2 = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, t) => { const A = hex2(a), B = hex2(b); return 'rgb(' + A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',') + ')'; };
const rgba = (h, a) => { const A = hex2(h); return `rgba(${A[0]},${A[1]},${A[2]},${a})`; };

// ---- path cache
const _pc = new Map();
const P2 = d => { let p = _pc.get(d); if (!p) { p = new Path2D(d); _pc.set(d, p); } return p; };
let ctx = null; // current context (set by main)
const fillP = (d, col) => { ctx.fillStyle = col; ctx.fill(P2(d)); };
const circ = (x, y, r, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, TAU); ctx.fill(); };
const ell = (x, y, rx, ry, col, rot = 0) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), rot, 0, TAU); ctx.fill(); };
const rect = (x, y, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); };
const rrect = (x, y, w, h, r, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };
const poly = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]); ctx.closePath(); ctx.fill(); };
const line = (pts, col, w, cap = 'round') => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = cap; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]); ctx.stroke(); };
const qline = (x0, y0, cx, cy, x1, y1, col, w, cap = 'round') => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = cap; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(cx, cy, x1, y1); ctx.stroke(); };
const arc = (x, y, r, a0, a1, col, w, cap = 'round') => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = cap; ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), a0, a1); ctx.stroke(); };
const withT = (x, y, s, rot, fn, sy) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1 || sy !== undefined) ctx.scale(s, sy === undefined ? s : sy); fn(); ctx.restore(); };
const alpha = (a, fn) => { if (a <= 0.003) return; const o = ctx.globalAlpha; ctx.globalAlpha = o * sat(a); fn(); ctx.globalAlpha = o; };
function star(x, y, r, col, rot = 0, n = 5, inner = .45) { ctx.fillStyle = col; ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = rot - Math.PI / 2 + i * Math.PI / n, rad = i % 2 ? r * inner : r; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rad, y + Math.sin(a) * rad); } ctx.closePath(); ctx.fill(); }
function spark(x, y, r, col, rot = 0) { // 4-point twinkle
  ctx.fillStyle = col; ctx.beginPath(); for (let i = 0; i < 4; i++) { const a = rot + i * Math.PI / 2, b = a + Math.PI / 4; if (!i) ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.quadraticCurveTo(x + Math.cos(b) * r * .12, y + Math.sin(b) * r * .12, x + Math.cos(a + Math.PI / 2) * r, y + Math.sin(a + Math.PI / 2) * r); } ctx.closePath(); ctx.fill();
}
function heart(x, y, s, col, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s / 100, s / 100); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 88); ctx.bezierCurveTo(-120, 5, -78, -92, 0, -32); ctx.bezierCurveTo(78, -92, 120, 5, 0, 88); ctx.fill(); ctx.restore(); }
function halfHeart(x, y, s, col, right) { ctx.save(); ctx.translate(x, y); ctx.scale((right ? -1 : 1) * s / 100, s / 100); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 88); ctx.bezierCurveTo(-120, 5, -78, -92, 0, -32); ctx.closePath(); ctx.fill(); ctx.restore(); }
function burst(x, y, r0, r1, n, col, w, rot = 0) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i < n; i++) { const a = rot + i * TAU / n; ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); } ctx.stroke(); }
function spiky(x, y, r, n, depth, col, rot = 0) { ctx.fillStyle = col; ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = rot + i * Math.PI / n, rad = i % 2 ? r * (1 - depth) : r; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rad, y + Math.sin(a) * rad); } ctx.closePath(); ctx.fill(); }
function cloud(x, y, s, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x - 60 * s, y, 42 * s, 0, TAU); ctx.arc(x, y - 30 * s, 58 * s, 0, TAU); ctx.arc(x + 62 * s, y - 4 * s, 46 * s, 0, TAU); ctx.rect(x - 60 * s, y, 122 * s, 42 * s); ctx.fill(); rrect(x - 102 * s, y, 210 * s, 42 * s, 21 * s, col); }
function note(x, y, s, col, rot = 0, dbl = false) { withT(x, y, s, rot, () => { ell(-12, 30, 17, 12, col, -.4); rect(1, -42, 7, 72, col); if (dbl) { ell(48, 18, 17, 12, col, -.4); rect(61, -54, 7, 72, col); poly([1, -42, 68, -54, 68, -36, 1, -24], col); } else { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(8, -42); ctx.quadraticCurveTo(40, -30, 34, 2); ctx.quadraticCurveTo(30, -18, 8, -22); ctx.fill(); } }); }
// ---- text
const F = { jp: "'ZenMaru','Yu Gothic','Meiryo',sans-serif", zh: "'ZCOOL','Microsoft YaHei','PingFang SC',sans-serif", en: "'Fredoka','ZenMaru',sans-serif", sc: "'Pacifico','Fredoka',cursive" };
function txt(s, x, y, size, col, o = {}) {
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); if (o.sx) ctx.scale(o.sx, o.sy || o.sx);
  ctx.font = `${o.w || 900} ${size}px ${o.f || F.jp}`; ctx.textAlign = o.al || 'center'; ctx.textBaseline = o.bl || 'middle';
  if (o.ls !== undefined) ctx.letterSpacing = o.ls + 'px';
  if (o.sw) { ctx.lineJoin = 'round'; ctx.lineWidth = o.sw; ctx.strokeStyle = o.sc || '#fff'; ctx.strokeText(s, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(s, 0, 0); ctx.restore();
}
const tw_ = new Map();
function textW(s, size, f = F.jp, w = 900) { const k = s + '|' + size + f + w; let v = tw_.get(k); if (v === undefined) { ctx.save(); ctx.font = `${w} ${size}px ${f}`; v = ctx.measureText(s).width; ctx.restore(); if (window.__fontsReady) tw_.set(k, v); } return v; }
// per-character kinetic text: each char pops in with stagger
function ktxt(s, x, y, size, col, t, t0, o = {}) {
  const f = o.f || F.jp, gap = o.gap || 0, st = o.st === undefined ? .045 : o.st; const ws = [...s].map(ch => textW(ch, size, f) + gap); const tot = ws.reduce((a, b) => a + b, 0) - gap;
  let cx = x - (o.al === 'left' ? 0 : tot / 2);
  const x0 = cx; for (const pass of (o.sw ? (o.sh ? [0, 1, 2] : [1, 2]) : [2])) { cx = x0; [...s].forEach((ch, i) => { const p = pop(t, t0 + i * st, o.d || .3); if (p > 0 && ch !== ' ') { const yy = y + (o.wave ? Math.sin(t * 6 + i * .7) * o.wave : 0) + (o.jump ? bob(t + i * .06, o.jump) : 0), c = Array.isArray(col) ? col[i % col.length] : col, oo = { ...o, f, al: 'center', sx: p, rot: (o.tilt || 0) * (i % 2 ? 1 : -1) }; if (pass === 0) txt(ch, cx + ws[i] / 2 - gap / 2, yy + (o.shy || 12), size, o.sh, { ...oo, sc: o.sh }); else if (pass === 1) txt(ch, cx + ws[i] / 2 - gap / 2, yy, size, o.sc || '#fff', oo); else txt(ch, cx + ws[i] / 2 - gap / 2, yy, size, c, { ...oo, sw: 0 }); } cx += ws[i]; }); }
}
// ---- backgrounds / patterns
function bgFill(col) { rect(0, 0, W, H, col); }
function dots(col, sp = 90, r = 7, ox = 0, oy = 0) { ctx.fillStyle = col; ctx.beginPath(); for (let j = -1, y = (oy % sp) - sp; y < H + sp; y += sp, j++) for (let x = (ox % (sp)) - sp + (j & 1 ? sp / 2 : 0); x < W + sp; x += sp) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, TAU); } ctx.fill(); }
function stripes(col, wd = 60, ang = -Math.PI / 4, off = 0) { ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(ang); ctx.fillStyle = col; const L = 2400; for (let x = -L + ((off % (wd * 2)) + wd * 2) % (wd * 2); x < L; x += wd * 2) ctx.fillRect(x, -L, wd, L * 2); ctx.restore(); }
function rays(x, y, n, col, rot = 0, R = 2600) { ctx.fillStyle = col; ctx.beginPath(); for (let i = 0; i < n; i++) { const a = rot + i * TAU / n, b = a + Math.PI / n; ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * R, y + Math.sin(a) * R); ctx.lineTo(x + Math.cos(b) * R, y + Math.sin(b) * R); ctx.closePath(); } ctx.fill(); }
function checker(c1, sz = 120, ox = 0, oy = 0, persp = 0) { ctx.fillStyle = c1; for (let j = -2; j < H / sz + 2; j++) for (let i = -2; i < W / sz + 2; i++) if ((i + j) & 1) ctx.fillRect(i * sz + (ox % (sz * 2)), j * sz + (oy % (sz * 2)), sz, sz); }
function floorShadow(x, y, w, a = .13) { ell(x, y, w, w * .16, `rgba(90,60,40,${a})`); }
function vignette(col = '#5a3a28', a = .18) { const g = ctx.createRadialGradient(W / 2, H / 2, 520, W / 2, H / 2, 1250); g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, a)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
// confetti / floating particles (deterministic)
function confetti(t, n, cols, o = {}) { const sp = o.speed || 220; for (let i = 0; i < n; i++) { const x = hash(i * 3.1 + (o.seed || 0)) * W, ph = hash(i * 7.7 + 1) * 10, y = ((hash(i * 5.3) * (H + 200) + t * sp * (.6 + hash(i) * .8)) % (H + 200)) - 100; const sz = 10 + hash(i * 2.2) * 16; withT(x + Math.sin(t * 2 + ph) * 40, y, 1, t * 3 * (hash(i) - .5) * 2 + ph, () => { ctx.fillStyle = cols[i % cols.length]; if (i % 3 === 0) { ctx.beginPath(); ctx.arc(0, 0, sz * .45, 0, TAU); ctx.fill(); } else ctx.fillRect(-sz / 2, -sz * .3 * Math.cos(t * 5 + ph), sz, sz * .6 * Math.cos(t * 5 + ph)); }); } }
function floaters(t, n, fn, o = {}) { const sp = o.speed || 60; for (let i = 0; i < n; i++) { const x = hash(i * 3.3 + (o.seed || 0)) * W + Math.sin(t * .8 + i) * 30, y = H + 80 - ((hash(i * 9.1 + (o.seed || 0)) * (H + 160) + t * sp * (.5 + hash(i * 1.7))) % (H + 160)); fn(x, y, i); } }
function twinkles(t, n, col, o = {}) { for (let i = 0; i < n; i++) { const x = hash(i * 4.4 + (o.seed || 0)) * W, y = hash(i * 8.8 + (o.seed || 0)) * (o.h || H), ph = hash(i * 1.9) * TAU; const s = Math.max(0, Math.sin(t * (o.sp || 2.5) + ph)); spark(x, y, (o.r || 22) * (.4 + hash(i * 6.1) * .8) * s, col, 0); } }
// ---- transitions: clip shapes for incoming scene, p in 0..1
const TR = {
  cut: () => { },
  wipeR: p => { const x = E.io(p) * (W + 300); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(x, 0); ctx.lineTo(x - 300, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip(); },
  wipeL: p => { const x = W - E.io(p) * (W + 300); ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(x, 0); ctx.lineTo(x + 300, H); ctx.lineTo(W, H); ctx.closePath(); ctx.clip(); },
  wipeU: p => { const y = H - E.io(p) * (H + 10); ctx.beginPath(); ctx.rect(0, y, W, H - y + 2); ctx.clip(); },
  wipeD: p => { const y = E.io(p) * (H + 10); ctx.beginPath(); ctx.rect(0, 0, W, y); ctx.clip(); },
  circle: (p, o = {}) => { ctx.beginPath(); ctx.arc(o.x || W / 2, o.y || H / 2, E.io(p) * 1250, 0, TAU); ctx.clip(); },
  blinds: p => { ctx.beginPath(); const n = 8, h = H / n; for (let i = 0; i < n; i++) { const q = E.io(sat(p * 1.6 - i * .075)); ctx.rect(0, i * h, W * q + (q > 0 ? 2 : 0), h + 1); } ctx.clip(); },
  bars: p => { ctx.beginPath(); const n = 10, w = W / n; for (let i = 0; i < n; i++) { const q = E.io(sat(p * 1.7 - i * .07)); if (i & 1) ctx.rect(i * w, 0, w + 1, H * q); else ctx.rect(i * w, H - H * q, w + 1, H * q); } ctx.clip(); },
  diamond: p => { const r = E.io(p) * 1700; ctx.beginPath(); ctx.moveTo(W / 2, H / 2 - r); ctx.lineTo(W / 2 + r, H / 2); ctx.lineTo(W / 2, H / 2 + r); ctx.lineTo(W / 2 - r, H / 2); ctx.closePath(); ctx.clip(); },
  heart: p => { const s = E.i(p) * 4200; ctx.beginPath(); ctx.save(); ctx.translate(W / 2, H / 2 - s * .05); ctx.scale(s / 100, s / 100); ctx.moveTo(0, 88); ctx.bezierCurveTo(-120, 5, -78, -92, 0, -32); ctx.bezierCurveTo(78, -92, 120, 5, 0, 88); ctx.restore(); ctx.clip(); },
  star: p => { const r = E.i(p) * 3600; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5 + p * 1.2, rad = i % 2 ? r * .45 : r; ctx[i ? 'lineTo' : 'moveTo'](W / 2 + Math.cos(a) * rad, H / 2 + Math.sin(a) * rad); } ctx.closePath(); ctx.clip(); },
  fade: () => { },
};
// colour-swipe curtain overlay (drawn on top between scenes): p 0..1, covers at .5
function curtain(p, cols, dir = 1) { if (p <= 0 || p >= 1) return; cols.forEach((c, i) => { const d = i * .08, a = E.io(sat((p - d) / .42)), b = E.io(sat((p - .5 - d * .6) / .42)); const x0 = dir > 0 ? -400 + b * (W + 800) : W + 400 - a * (W + 800), x1 = dir > 0 ? -400 + a * (W + 800) : W + 400 - b * (W + 800); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x1, 0); ctx.lineTo(x1 - 260, H); ctx.lineTo(x0 - 260, H); ctx.closePath(); ctx.fill(); }); }

// scene registry (used by scenes*.js, consumed by main.js)
const SC = [];
function scene(t0, t1, fn, o = {}) { SC.push({ t0, t1, fn, tr: o.tr || 'cut', td: o.td || .4, o }); }
