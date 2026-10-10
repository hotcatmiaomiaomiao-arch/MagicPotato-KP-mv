// ===== characters: butler() and lady() rigs =====
const BUT = {
  R: { i: 0, name: 'Ren', jp: 'レン', coat: '#222121', dark: '#0e0e0e', hair: '#f7d082', btn: '#dcdbda', col: '#222121', lite: '#8a8782', pale: '#e9e6df' },
  K: { i: 1, name: 'Kaito', jp: 'カイト', coat: '#fdd146', dark: '#c2941e', hair: '#32261f', btn: '#fde692', col: '#f2b705', lite: '#fdd146', pale: '#fff3c4' },
  S: { i: 2, name: 'Sho', jp: 'ショウ', coat: '#911b25', dark: '#5b0a0f', hair: '#c9c8c8', btn: '#fbd85e', col: '#a51c28', lite: '#c9404c', pale: '#f6d3d3' },
  J: { i: 3, name: 'Jin', jp: 'ジン', coat: '#0bb8d6', dark: '#0384a6', hair: '#252524', btn: '#f9dd69', col: '#0aa5c2', lite: '#0bb8d6', pale: '#cdf1f7' },
  I: { i: 4, name: 'Kishi', jp: 'キシ', coat: '#6f32ab', dark: '#491a7c', hair: '#2f2520', btn: '#fada69', col: '#6f32ab', lite: '#9a63d0', pale: '#e6d6f6' },
};
const ORDER = ['R', 'K', 'S', 'J', 'I'];
const BF = 280, LF = 352; // feet distance below chin (butler / lady)
const blinkAt = (t, seed = 0) => { const p = 3.1 + hash(seed) * 1.7, x = ((t + hash(seed + 5) * 9) % p) / .16; return x < 1 ? Math.sin(x * Math.PI) : 0; };
const sing = (t, k = 2) => .3 + .7 * Math.abs(Math.sin(beatOf(t) * Math.PI * k));
// filter stray sub-paths of the tiara
(() => { const g = ART.lady.tiara; g.gold = g.gold.split('M').filter(s => s.trim()).filter(s => { const n = s.match(/-?\d+(\.\d+)?/g).map(Number); let mx = -1e9, mn = 1e9; for (let i = 0; i < n.length; i += 2) { mx = Math.max(mx, n[i]); mn = Math.min(mn, n[i]); } return mx < 76 && mn > -76; }).map(s => 'M' + s).join(' '); })();

// ---- face ----  g = geometry {ex, ey, rx, ry, ny, my, mw, eye, ms(mouth stroke)}
function drawFace(g, f = {}) {
  const gtcat = f.eyes === 'gt' || f.mouth === 'cat';
  const lk = f.look || [0, 0], bl = f.blink || 0, type = gtcat ? 'gt' : (f.eyes || 'open');
  if (f.shade) { const gr = ctx.createLinearGradient(0, g.ey - 130, 0, g.ey + 40); gr.addColorStop(0, `rgba(40,20,60,${.55 * f.shade})`); gr.addColorStop(1, 'rgba(40,20,60,0)'); ctx.fillStyle = gr; ctx.fillRect(-150, g.ey - 140, 300, 190); }
  if (f.blush) alpha(f.blush, () => { ell(-g.ex - 14, g.ey + g.ry + 14, g.rx * .95, g.ry * .36, C.blush); ell(g.ex + 14, g.ey + g.ry + 14, g.rx * .95, g.ry * .36, C.blush); });
  for (const s of [-1, 1]) {
    let ty = type; if (ty === 'winkL') ty = s < 0 ? 'happy' : 'open'; if (ty === 'winkR') ty = s > 0 ? 'happy' : 'open';
    const ex = s * g.ex + lk[0] * 5, ey = g.ey + lk[1] * 4, rx = g.rx, ry = g.ry;
    ctx.save(); ctx.translate(ex, ey);
    if (ty === 'happy') { qline(-rx, ry * .3, 0, -ry * .75, rx, ry * .3, g.eye, 7); }
    else if (ty === 'closed') { qline(-rx, -2, 0, ry * .55, rx, -2, g.eye, 7); }
    else if (ty === 'gt') { ctx.lineJoin = 'round'; line([s * rx * 1.0, -ry * .62, -s * rx * .75, 0, s * rx * 1.0, ry * .62], g.eye, 6.2); }
    else if (ty === 'heart') { heart(0, 0, rx * 1.25 * (1 + .12 * Math.sin((f.tt || 0) * 12)), C.rose); }
    else if (ty === 'dizzy') { ctx.strokeStyle = g.eye; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let a = 0; a < 15; a += .25) { const r = a * rx / 15 * 1.15, an = a + (f.tt || 0) * 8 * s; ctx[a ? 'lineTo' : 'moveTo'](Math.cos(an) * r, Math.sin(an) * r); } ctx.stroke(); }
    else if (ty === 'dot') { circ(0, 0, rx * .42, g.eye); }
    else {
      const k = ty === 'wide' ? 1.13 : 1, sy = Math.max(.08, 1 - bl);
      if (ty === 'angry' || ty === 'sad' || ty === 'half') { ctx.beginPath(); if (ty === 'half') ctx.rect(-rx * 2, -ry * .25, rx * 4, ry * 3); else { const d = (ty === 'angry' ? 1 : -1) * s; ctx.moveTo(-rx * 1.6, -ry * (.55 + d * .6)); ctx.lineTo(rx * 1.6, -ry * (.55 - d * .6)); ctx.lineTo(rx * 1.6, ry * 2); ctx.lineTo(-rx * 1.6, ry * 2); ctx.closePath(); } ctx.clip(); }
      ell(0, 0, rx * k, ry * k * sy, g.eye);
      if (sy > .5) { if (ty === 'star') { spark(-rx * .25, -ry * .3, rx * .62, '#fff', (f.tt || 0) * 1.5); spark(rx * .38, ry * .42, rx * .3, '#fff'); } else { circ(-rx * .36 + lk[0] * 2, -ry * .42 + lk[1] * 2, rx * .31 * k, '#fff'); if (ty === 'wide' || ty === 'sad') circ(rx * .34, ry * .42, rx * .16, '#fff'); } }
    }
    ctx.restore();
    // brows
    const by = g.ey - g.ry - 13, bx = s * g.ex, col = g.brow || 'rgba(70,40,25,.85)';
    if (f.brows === 'angry') line([bx - s * rx * 1.05, by + 15, bx + s * rx * .9, by - 6], col, 6.5);
    else if (f.brows === 'sad') line([bx - s * rx * .9, by - 6, bx + s * rx * 1.0, by + 9], col, 6);
    else if (f.brows === 'up') qline(bx - rx * .9, by - 4, bx, by - 17, bx + rx * .9, by - 4, col, 5.5);
    if (f.tears) { const tv = f.tears, y0 = ey + ry * .6; ctx.fillStyle = '#8fd3f4'; ctx.beginPath(); ctx.moveTo(ex - 9, y0); ctx.quadraticCurveTo(ex - 13, y0 + 40 * tv, ex, y0 + 58 * tv); ctx.quadraticCurveTo(ex + 13, y0 + 40 * tv, ex + 9, y0); ctx.fill(); }
  }
  circ(0, g.ny, 4.2, g.nose || '#b8763f');
  // mouth
  const mw = g.mw, my = g.my, ms = g.ms; let m = gtcat ? 'cat' : (f.mouth || 'smile'); const op = f.open === undefined ? 1 : f.open;
  if (m === 'talk') { if (op < .18) m = 'smile'; }
  ctx.save(); ctx.translate(0, my);
  if (m === 'smile') qline(-mw, -3, 0, mw * .62, mw, -3, ms, 4.6);
  else if (m === 'smirk') { ctx.strokeStyle = ms; ctx.lineWidth = 4.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-mw * .8, 2); ctx.quadraticCurveTo(mw * .1, mw * .5, mw, -8); ctx.stroke(); }
  else if (m === 'flat') line([-mw * .6, 3, mw * .6, 3], ms, 4.6);
  else if (m === 'frown') qline(-mw * .8, 9, 0, -6, mw * .8, 9, ms, 4.6);
  else if (m === 'wavy') { ctx.strokeStyle = ms; ctx.lineWidth = 4.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-mw, 3); for (let i = 1; i <= 16; i++) ctx.lineTo(-mw + i * mw / 8, 3 + Math.sin(i * 1.18) * 4.5); ctx.stroke(); }
  else if (m === 'cat') { ctx.strokeStyle = ms; ctx.lineWidth = 4.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-mw * 1.05, -6); ctx.bezierCurveTo(-mw * .9, mw * .62, -mw * .12, mw * .62, 0, -3); ctx.bezierCurveTo(mw * .12, mw * .62, mw * .9, mw * .62, mw * 1.05, -6); ctx.stroke(); }
  else if (m === 'o') ell(0, 5, mw * .33, mw * .44, '#f58a86');
  else if (m === 'kiss') { ctx.strokeStyle = '#e8717c'; ctx.lineWidth = 4.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-5, -6); ctx.quadraticCurveTo(9, -3, -2, 3); ctx.quadraticCurveTo(9, 8, -5, 12); ctx.stroke(); }
  else if (m === 'open' || m === 'talk') { const d = mw * 1.25 * (m === 'talk' ? .35 + .65 * op : 1), w2 = mw * (m === 'talk' ? 1.0 + .25 * op : 1.3); ctx.fillStyle = C.mouth; ctx.beginPath(); ctx.moveTo(-w2, -5); ctx.lineTo(w2, -5); ctx.bezierCurveTo(w2, d * .9, w2 * .5, d, 0, d); ctx.bezierCurveTo(-w2 * .5, d, -w2, d * .9, -w2, -5); ctx.fill(); }
  else if (m === 'big') { const w2 = mw * 1.35, d = mw * 1.75; ctx.fillStyle = '#8e2f2a'; ctx.beginPath(); ctx.moveTo(-w2, -7); ctx.lineTo(w2, -7); ctx.bezierCurveTo(w2, d * .9, w2 * .55, d, 0, d); ctx.bezierCurveTo(-w2 * .55, d, -w2, d * .9, -w2, -7); ctx.fill(); ctx.save(); ctx.clip(); ell(0, d + 2, w2 * .75, d * .45, C.mouth); ctx.restore(); }
  else if (m === 'grit') { rrect(-mw * 1.15, -8, mw * 2.3, 22, 9, '#fff'); ctx.strokeStyle = ms; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-mw * 1.15, -8, mw * 2.3, 22, 9); ctx.moveTo(-mw * .4, -8); ctx.lineTo(-mw * .4, 14); ctx.moveTo(mw * .4, -8); ctx.lineTo(mw * .4, 14); ctx.moveTo(-mw * 1.15, 3); ctx.lineTo(mw * 1.15, 3); ctx.stroke(); }
  else if (m === 'tri') { ctx.fillStyle = C.mouth; ctx.beginPath(); ctx.moveTo(-mw * .75, -4); ctx.lineTo(mw * .75, -4); ctx.lineTo(0, mw * .7); ctx.closePath(); ctx.lineJoin = 'round'; ctx.strokeStyle = C.mouth; ctx.lineWidth = 6; ctx.stroke(); ctx.fill(); }
  else if (m === 'pout') { qline(-mw * .45, 6, 0, -5, mw * .45, 6, ms, 4.6); }
  ctx.restore();
  if (f.sweat) alpha(f.sweat, () => { const x = g.ex + g.rx + 38, y = g.ey - 62 + (1 - f.sweat) * -10; ctx.fillStyle = '#9ed8f5'; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.quadraticCurveTo(x + 15, y + 6, x, y + 13); ctx.quadraticCurveTo(x - 15, y + 6, x, y - 20); ctx.fill(); });
  if (f.anger) withT(-g.ex - 52, g.ey - 105, f.anger, 0, () => { ctx.strokeStyle = '#e8414e'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; ctx.save(); ctx.rotate(a); ctx.moveTo(7, 22); ctx.quadraticCurveTo(7, 7, 22, 7); ctx.restore(); const c = Math.cos(a), s_ = Math.sin(a); ctx.moveTo(c * 7 - s_ * 22, s_ * 7 + c * 22); ctx.quadraticCurveTo(c * 7 - s_ * 7, s_ * 7 + c * 7, c * 22 - s_ * 7, s_ * 22 + c * 7); } ctx.stroke(); });
}

// tapered limb with a bend; returns nothing
function limb(x0, y0, x1, y1, w0, w1, col, bend = 0) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, mx = (x0 + x1) / 2 + nx * bend, my = (y0 + y1) / 2 + ny * bend;
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0 + nx * w0, y0 + ny * w0); ctx.quadraticCurveTo(mx + nx * (w0 + w1) / 2, my + ny * (w0 + w1) / 2, x1 + nx * w1, y1 + ny * w1); ctx.lineTo(x1 - nx * w1, y1 - ny * w1); ctx.quadraticCurveTo(mx - nx * (w0 + w1) / 2, my - ny * (w0 + w1) / 2, x0 - nx * w0, y0 - ny * w0); ctx.closePath(); ctx.fill(); circ(x0, y0, w0, col);
}
const _anchor = (m0, x, y) => { const p = m0.multiply(ctx.getTransform()).transformPoint(new DOMPoint(x, y)); return [p.x, p.y]; };

// ---- butler ----  o: {x,y(feet),s,flip,rot,lean(body rot about hips),sq, head:{rot,dx,dy}, aL:[x,y,bend], aR, fL:[dx,dy], fR, face:{}, kneel, armsBack, hl, hr (callbacks at hands), shadow}
function butler(id, o = {}) {
  const b = BUT[id], A = ART.butlers[b.i], s = o.s || 1, hd = o.head || {}, m0 = ctx.getTransform().inverse(), out = {};
  const aL = o.aL || [-120, 135], aR = o.aR || [120, 135], fL = o.fL || [0, 0], fR = o.fR || [0, 0], kn = o.kneel || 0, sq = o.sq || 0;
  if (o.shadow !== false) floorShadow(o.x, o.y + 4 * s, 130 * s * (o.shw || 1), o.sha || .12);
  ctx.save(); ctx.translate(o.x, o.y); ctx.scale(s * (o.flip ? -1 : 1) * (1 + sq * .5), s * (1 - sq)); if (o.rot) ctx.rotate(o.rot); ctx.translate(0, -BF + kn * 78 + (o.lift || 0));
  // legs
  const leg = (sd, f) => { const hx = sd * 34, fx = sd * 34 + f[0], fy = 250 + f[1] - kn * 78; if (kn && sd > 0) { limb(hx, 168, hx + 62, 182, 27, 26, C.black); limb(hx + 62, 182, hx + 64, 250 - kn * 78 + 78 * (1 - kn), 26, 25, C.black); ell(hx + 78, 262 - kn * 78 + 78 * (1 - kn), 36, 19, C.black); } else if (kn) { limb(hx, 168, hx - 10, 262 - 78 * kn, 27, 26, C.black); limb(hx - 10, 256 - 78 * kn, hx - 86, 262 - 78 * kn, 24, 20, C.black); ell(hx - 96, 256 - 78 * kn, 22, 26, C.black); } else { limb(hx, 165, fx, fy, 29, 27, C.black); ell(fx + sd * 12, fy + 11, 37, 19.5, C.black, f[2] || 0); } };
  ctx.save(); ctx.translate(0, 165); ctx.rotate(-(o.lean || 0) * .0); ctx.translate(0, -165); leg(-1, fL); leg(1, fR); ctx.restore();
  // upper body (lean rotates around hips)
  ctx.save(); ctx.translate(0, 160); ctx.rotate(o.lean || 0); ctx.translate(0, -160);
  const arm = (sd, a, cb) => { const sx = sd * 58, sy = 8, hx = a[0], hy = a[1]; limb(sx, sy + 8, hx - (hx - sx) * .1, hy - (hy - sy) * .1, 26, 19, b.coat, (a[2] || 0) * sd); if (cb && cb.under) cb.fn(hx, hy); circ(hx, hy, 25, '#fff'); if (cb && !cb.under) { ctx.save(); ctx.translate(hx, hy); (cb.fn || cb)(); ctx.restore(); } out[sd < 0 ? 'hl' : 'hr'] = _anchor(m0, hx, hy); };
  if (o.armsBack) { arm(-1, aL, o.hl); arm(1, aR, o.hr); }
  for (const sd of [-1, 1]) poly([sd * 36, 150, sd * 88, 150, sd * 92, 226, sd * 60, 186], b.dark);
  
  ctx.fillStyle = b.coat; ctx.beginPath(); ctx.moveTo(-56, -10); ctx.lineTo(56, -10); ctx.lineTo(68, 30); ctx.lineTo(86, 156); ctx.lineTo(14, 156); ctx.lineTo(0, 138); ctx.lineTo(-14, 156); ctx.lineTo(-86, 156); ctx.lineTo(-68, 30); ctx.closePath(); ctx.fill();
  for (const sd of [-1, 1]) poly([sd * 92, 226, sd * 85, 150, sd * 71, 150], b.coat);
  poly([-36, -10, 36, -10, 0, 98], '#fff');
  poly([-34, -10, -56, -10, -66, 20, -50, 24, 0, 102, 0, 90], b.dark); poly([34, -10, 56, -10, 66, 20, 50, 24, 0, 102, 0, 90], b.dark);
  poly([0, 13, -36, -5, -36, 31], '#161616'); poly([0, 13, 36, -5, 36, 31], '#161616'); circ(0, 13, 10.5, '#161616');
  poly([40, 61, 56, 43, 68, 61], '#fff');
  circ(-24, 117, 9.5, b.btn); circ(24, 117, 9.5, b.btn);
  // head
  ctx.save(); ctx.translate(hd.dx || 0, (hd.dy || 0) - 8); ctx.rotate(hd.rot || 0); ctx.translate(0, 8);
  if (hd.s) ctx.scale(hd.s, hd.s);
  fillP(A.skin, C.skin); fillP(A.hair, b.hair);
  const e = A.eyes[1];
  drawFace({ ex: e[0], ey: e[1], rx: 23.6, ry: 31.5, ny: e[1] + 25, my: e[1] + 52, mw: 27, eye: C.eye, ms: '#5a1009' }, o.face);
  out.head = _anchor(m0, 0, -170); out.top = _anchor(m0, 0, -360); out.mouth = _anchor(m0, 0, e[1] + 56);
  ctx.restore();
  if (!o.armsBack) { arm(-1, aL, o.hl); arm(1, aR, o.hr); }
  ctx.restore(); ctx.restore();
  return out;
}

// ---- lady ----  outfit 1..4
const LAD = {
  1: { main: '#f79ab1', lite: '#feccd9', sash: '#f26286', shoe: '#f26286', hem: 190, hy: 282 },
  2: { main: '#a9d2fa', lite: '#fdf6e3', sash: '#3d689e', shoe: '#3d689e', hem: 168, hy: 274 },
  3: { main: '#fdc7d6', lite: '#faaec1', sash: '#f07a94', shoe: '#f07a94', hem: 166, hy: 272 },
  4: { main: '#a6ca9c', lite: '#fdf6e3', sash: '#5b986e', shoe: '#5b986e', hem: 190, hy: 282 },
};
const LSK = '#fde6d3';
function lady(outfit, o = {}) {
  const L = LAD[outfit], A = ART.lady, s = o.s || 1, hd = o.head || {}, m0 = ctx.getTransform().inverse(), out = {}, sq = o.sq || 0;
  const aL = o.aL || [-106, 116], aR = o.aR || [106, 116], sw = o.sway || 0, hm = L.hem, hy = L.hy;
  if (o.shadow !== false) floorShadow(o.x, o.y - 8 * s, (hm + 10) * s, .12);
  ctx.save(); ctx.translate(o.x, o.y); ctx.scale(s * (o.flip ? -1 : 1) * (1 + sq * .5), s * (1 - sq)); if (o.rot) ctx.rotate(o.rot); ctx.translate(0, -LF + (o.lift || 0));
  const headT = () => { ctx.translate(hd.dx || 0, (hd.dy || 0) - 6); ctx.rotate(hd.rot || 0); ctx.translate(0, 6); };
  // back hair
  ctx.save(); headT(); ctx.transform(1, 0, sw * .12, 1, 0, 0); fillP(A.back, '#8b5533'); ell(-126, 123, 27, 12, '#8b5533'); ell(126, 123, 27, 12, '#8b5533'); fillP(A.dark, '#744828'); ctx.fillStyle = '#744828'; ctx.beginPath(); ctx.roundRect(-98, -72, 196, 58, [38, 38, 0, 0]); ctx.fill(); ell(-78, 124, 30, 9, '#744828'); ell(78, 124, 30, 9, '#744828'); ctx.restore();
  // feet
  for (const sd of [-1, 1]) { rect(sd * 27 - 9, 300, 18, 34, LSK); ell(sd * 27, 337, 24, 15.5, L.shoe); ell(sd * 27, 330, 15, 8, LSK); }
  ctx.save(); ctx.translate(0, 75); ctx.rotate(o.lean || 0); ctx.translate(0, -75);
  // neck + chest skin
  rect(-17, -8, 34, 30, '#fbdcc5'); ctx.fillStyle = LSK; ctx.beginPath(); ctx.moveTo(-17, 6); ctx.quadraticCurveTo(-40, 10, -78, 26); ctx.lineTo(-70, 52); ctx.lineTo(70, 52); ctx.lineTo(78, 26); ctx.quadraticCurveTo(40, 10, 17, 6); ctx.closePath(); ctx.fill();
  const arm = (sd, a, cb) => { const sx = sd * 70, sy = 44, hx = a[0], hy2 = a[1]; limb(sx, sy, hx, hy2, 11, 10, LSK, (a[2] || 0) * sd); if (outfit === 1 || outfit === 4) { const k = .55; limb(lerp(sx, hx, k), lerp(sy, hy2, k), hx, hy2, 12.5, 12, '#fff'); } circ(hx, hy2, 20, '#fff'); if (cb) { ctx.save(); ctx.translate(hx, hy2); cb(); ctx.restore(); } out[sd < 0 ? 'hl' : 'hr'] = _anchor(m0, hx, hy2); };
  if (o.armsBack) { arm(-1, aL, o.hl); arm(1, aR, o.hr); }
  // skirt
  const skirt = (hw, col, hy = L.hy) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-42, 70); ctx.lineTo(42, 70); ctx.bezierCurveTo(90 + sw * 10, 110, hw - 30 + sw * 22, hy - 90, hw + sw * 30, hy); ctx.bezierCurveTo(hw * .6 + sw * 30, hy + 50, -hw * .6 + sw * 30, hy + 50, -hw + sw * 30, hy); ctx.bezierCurveTo(-hw + 30 + sw * 22, hy - 90, -90 + sw * 10, 110, -42, 70); ctx.closePath(); };
  if (outfit === 3) { skirt(hm + 5, '#fff', hy + 12); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.moveTo(-400, 0); ctx.lineTo(400, 0); const yb = x => hy + 37 * (1 - (x / hm) * (x / hm)) - 26, ox = sw * 30; ctx.lineTo(400, yb(hm)); for (let k = 0; k < 5; k++) { const xa = hm * (1 - 2 * k / 5), xb = hm * (1 - 2 * (k + 1) / 5); if (!k) ctx.lineTo(xa + ox, yb(xa)); ctx.quadraticCurveTo((xa + xb) / 2 + ox, (yb(xa) + yb(xb)) / 2 + 40, xb + ox, yb(xb)); } ctx.lineTo(-400, yb(hm)); ctx.closePath(); ctx.clip(); skirt(hm, L.main); ctx.fill(); skirt(hm, L.main); ctx.clip(); ctx.fillStyle = L.lite; ctx.beginPath(); ctx.moveTo(0, 70); ctx.quadraticCurveTo(-20, 200, -210, 212); ctx.lineTo(-210, 60); ctx.closePath(); ctx.moveTo(0, 70); ctx.quadraticCurveTo(20, 200, 210, 212); ctx.lineTo(210, 60); ctx.closePath(); ctx.fill(); ctx.restore(); }
  else { skirt(hm, L.main); ctx.fill(); ctx.save(); skirt(hm, L.main); ctx.clip(); if (outfit === 1 || outfit === 4) poly([0, 76, 78 + sw * 30, hy + 60, -78 + sw * 30, hy + 60], L.lite); else { ctx.strokeStyle = L.lite; ctx.lineWidth = 27; ctx.beginPath(); ctx.moveTo(-hm - 20 + sw * 30, hy - 42); ctx.bezierCurveTo(-hm * .6 + sw * 30, hy + 10, hm * .6 + sw * 30, hy + 10, hm + 20 + sw * 30, hy - 42); ctx.stroke(); } ctx.restore(); }
  // bodice
  if (outfit === 1) { poly([-44, 30, 44, 30, 42, 74, -42, 74], L.main); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-80, 20); ctx.quadraticCurveTo(-40, 14, 0, 32); ctx.quadraticCurveTo(40, 14, 80, 20); ctx.quadraticCurveTo(88, 34, 80, 46); ctx.quadraticCurveTo(40, 36, 0, 52); ctx.quadraticCurveTo(-40, 36, -80, 46); ctx.quadraticCurveTo(-88, 34, -80, 20); ctx.fill(); }
  else {
    const pc = outfit === 3 ? '#fff' : L.main; ell(-64, 30, 25, 33, pc, .35); ell(64, 30, 25, 33, pc, -.35);
    if (outfit === 4) { line([-86, 46, -58, 60], L.lite, 9, 'butt'); line([86, 46, 58, 60], L.lite, 9, 'butt'); }
    ctx.fillStyle = L.main; ctx.beginPath(); ctx.moveTo(-44, 2); ctx.lineTo(44, 2); ctx.lineTo(42, 74); ctx.lineTo(-42, 74); ctx.closePath(); ctx.fill();
    if (outfit === 2) { poly([-33, 2, 33, 2, 36, 74, -36, 74], L.lite); rect(-33, -4, 66, 18, LSK); }
    if (outfit === 3) { ell(0, 1, 27, 17, LSK); }
    if (outfit === 4) { ell(0, 0, 20, 10, '#fbdcc5'); ctx.fillStyle = L.lite; ctx.beginPath(); ctx.ellipse(-22, 4, 23, 21, 0, 0, Math.PI); ctx.ellipse(22, 4, 23, 21, 0, 0, Math.PI); ctx.fill(); circ(0, 34, 6.5, L.lite); circ(0, 54, 6.5, L.lite); }
  }
  ctx.fillStyle = L.sash; ctx.beginPath(); ctx.moveTo(-43, 64); ctx.quadraticCurveTo(0, 72, 43, 64); ctx.lineTo(45, 84); ctx.quadraticCurveTo(0, 96, -45, 84); ctx.closePath(); ctx.fill();
  // head
  ctx.save(); headT(); if (hd.s) ctx.scale(hd.s, hd.s);
  fillP(A.skin, LSK); fillP(A.front, '#8b5533');
  drawFace({ ex: 61, ey: -81, rx: 19.3, ry: 25.3, ny: -67 + 0, my: -46, mw: 19, eye: '#3a1803', ms: '#5a2412', nose: '#c0804c' }, o.face);
  if (o.tiara !== false) { withT(0, o.tiaraDy || 0, 1, 0, () => { fillP(A.tiara.gold, '#e6b247'); fillP(A.tiara.gem, '#f26286'); fillP(A.tiara.hi, '#fbb0c4'); }); }
  out.head = _anchor(m0, 0, -150); out.top = _anchor(m0, 0, -330); out.mouth = _anchor(m0, 0, -40);
  ctx.restore();
  if (!o.armsBack) { arm(-1, aL, o.hl); arm(1, aR, o.hr); }
  ctx.restore(); ctx.restore();
  return out;
}
// head-only icons (for name chips / close-ups)
function butlerHead(id, x, y, s, face, rot = 0) { const b = BUT[id], A = ART.butlers[b.i], e = A.eyes[1]; withT(x, y, s, rot, () => { ctx.translate(0, 170); fillP(A.skin, C.skin); fillP(A.hair, b.hair); drawFace({ ex: e[0], ey: e[1], rx: 23.6, ry: 31.5, ny: e[1] + 25, my: e[1] + 52, mw: 27, eye: C.eye, ms: '#5a1009' }, face); }); }
function ladyHead(x, y, s, face, rot = 0, o = {}) { const A = ART.lady; withT(x, y, s, rot, () => { ctx.translate(0, 150); fillP(A.back, '#8b5533'); if (o.dark !== false) fillP(A.dark, '#744828'); fillP(A.skin, LSK); fillP(A.front, '#8b5533'); drawFace({ ex: 61, ey: -81, rx: 19.3, ry: 25.3, ny: -67, my: -46, mw: 19, eye: '#3a1803', ms: '#5a2412', nose: '#c0804c' }, face); if (o.tiara !== false) { fillP(A.tiara.gold, '#e6b247'); fillP(A.tiara.gem, '#f26286'); fillP(A.tiara.hi, '#fbb0c4'); } }); }
