// ===== scenes4 : 249.93 – end  (final chorus, hook 3, climax, outro, end card) =====
scene(249.93, 251.68, (t, lt) => chBachi(t, lt), { tr: 'bars', td: .25 });
scene(251.68, 253.76, (t, lt) => chAchi(t, lt), { tr: 'wipeU', td: .25 });
scene(253.76, 257.77, (t, lt) => chGachi(t, lt, 1), { tr: 'heart', td: .35 });
scene(257.77, 260.03, (t, lt) => chSugao(t, lt, 'K', 1), { tr: 'fade', td: .4 });
scene(260.03, 262.29, (t, lt) => chYowasa(t, lt, 'R', 1), { tr: 'wipeL', td: .3 });
scene(262.29, 264.1, (t, lt) => chOshitai(t, lt, 'I'), { tr: 'circle', td: .3 });
scene(264.1, 266.55, (t, lt) => chAllKneel(t, lt, 1), { tr: 'star', td: .3 });
scene(266.55, 270.79, (t, lt) => { battlePanels(t, lt, ['R', 'J', 'I', 'S', 'K'], { face: (id, i) => fc(i % 2 ? 'gt' : 'angry', i % 2 ? 'grit' : 'big', { brows: 'angry', anger: i === 2 ? 1 : 0 }) }); hookWords(t, 266.57); }, { tr: 'bars', td: .3 });
scene(270.79, 271.78, (t, lt) => faceOff(t, lt, 'I', 'R'), { tr: 'wipeR', td: .15 });
scene(271.78, 272.78, (t, lt) => faceOff(t, lt, 'S', 'J', 'K'), { tr: 'wipeL', td: .15 });
scene(272.78, 275.07, (t, lt) => titleSlam(t, lt), { tr: 'star', td: .3 });

// --- 275.07 限界です 抱きしめたい (hi hi hi) ---
const HI = [277.68, 278.2, 278.72];
scene(275.07, 279.32, (t, lt) => {
  bgBall(t); spotlight(960, 120, 560, 'rgba(255,240,220,.35)');
  const lim = seg(t, 276.3, 276.6), rush = E.io(seg(t, 277.3, 278.9));
  // lady in the centre, blushing harder as the butlers close in
  ld(1, t, { x: 960, y: 900, s: 1.0, face: rush > .6 ? fc('closed', 'open', { blush: 1.4 }) : fc(lim > 0 ? 'wide' : 'open', lim > 0 ? 'o' : 'smile', { blush: .8 + lim * .5, look: [Math.sin(t * 2), 0] }), aL: rush > .3 ? [-60, -50, 40] : [-106, 116], aR: rush > .3 ? [60, -50, -40] : [106, 116] });
  const xs0 = { R: 400, K: 650, I: 1290, S: 1560, J: 160 }, xs1 = { R: 650, K: 760, I: 1160, S: 1270, J: 560 };
  ['J', 'R', 'K', 'I', 'S'].forEach((id, i) => {
    const x = id === 'J' ? lerp(-200, 150, E.o(seg(t, 275.2, 275.9))) * (1 - rush) + xs1.J * rush : lerp(xs0[id], xs1[id], rush), right = x > 960;
    const k = hit(t, HI[i % 3], .2);
    bt(id, t, { x, y: 880, s: .78, flip: right, lean: (right ? -1 : 1) * (.05 + rush * .08), lift: k * 30, aL: rush > .2 ? [-170, -80, -20] : [-110, 120], aR: rush > .2 ? [170, -80, 20] : [110, 120],
      face: lim > 0 ? fc(rush > .5 ? 'closed' : 'gt', 'big', { blush: 1.0, look: [right ? -1 : 1, 0] }) : fc('half', 'talk', { blush: .5, look: [right ? -1 : 1, 0] }) });
  });
  if (lim > 0 && rush < .3) alpha(lim, () => { ktxt('限界です！', 960, 190, 140, '#e8557a', t, 276.35, { sw: 32, sc: '#fff', st: .05, tilt: .06, jump: 8 }); });
  HI.forEach((h, i) => sfx('hi!', 560 + i * 400, 300 - (i % 2) * 40, 120, ['#e9a800', '#0aa3c0', '#a51c28'][i], t, h, { f: F.en, end: h + 1.4, rot: (i - 1) * .12 }));
  if (rush > .7) { hearts(t, 20, ['#f26286', '#f79ab1', '#fff'], { r: 28, speed: 90 }); burst(960, 560, 260, 360, 18, 'rgba(255,255,255,.8)', 8, t); }
  if (t < 276.3) withT(960, 210, pop(t, 275.2, .3), 0, () => { bubble(0, 0, 420, 120, '#fff', 0); txt('お嬢様…', 0, 4, 64, '#e8557a'); });
}, { tr: 'circle', td: .35 });

// --- 279.32 誰より大好きです ---
scene(279.32, 281.32, (t, lt) => {
  bgPop(t, '#ffe1ea', '#ffc9d8', 'rays', { sp: .5, n: 20, y: 520 });
  const hb = 1 + pulse(t) * .06; { const p = E.back(seg(lt, .5, .9)); butlerHead('I', 960, 330 - 120 * p, .5 * p, fc('winkR', 'big', { blush: 1, tt: t }), 0); }
  withT(960, 520, hb * E.back(seg(lt, 0, .4)), 0, () => heart(0, 0, 400, '#fff'));
  withT(960, 520, hb * E.back(seg(lt, .05, .45)), 0, () => heart(0, 0, 370, '#f79ab1'));
  ladyHead(960, 470, .95, fc('happy', 'open', { blush: 1.3, tt: t }), Math.sin(t * 2) * .05);
  const HP = { R: [420, 400, -.15], K: [520, 720, -.1], S: [1500, 400, .15], J: [1400, 720, .1] };
  Object.entries(HP).forEach(([id, [x, y, r]], i) => { const p = E.back(seg(lt, .1 + i * .08, .5 + i * .08)); butlerHead(id, x, y + bob(t + i * .3, 10), .55 * p, fc('closed', 'open', { blush: 1, tt: t }), r); });
  ktxt('誰より 大好きです♡', 960, 110, 100, '#e8557a', t, t - lt + .2, { sw: 26, sc: '#fff', st: .06, wave: 6 });
  hearts(t, 18, ['#f26286', '#fff', '#f79ab1'], { r: 22, speed: 70, seed: 5 });
}, { tr: 'heart', td: .35 });

// --- 281.32 I'm your butler! ---
scene(281.32, 286.0, (t, lt) => {
  bgBall(t); confetti(lt, 80, ['#222121', '#fdd146', '#c9404c', '#0bb8d6', '#9a63d0', '#f79ab1', '#fff'], { speed: 260 });
  const bow = E.io(seg(lt, 1.6, 2.3)) * (1 - E.io(seg(lt, 3.6, 4.2)));
  ld(1, t, { x: 985, y: 880, s: 1.0, face: fc('happy', 'open', { blush: 1.1 }), aL: [-160, -40, -20], aR: [160, -40, 20] });
  const xs = [150, 365, 580, 1360, 1640], ids = ['R', 'K', 'I', 'S', 'J'];
  ids.forEach((id, i) => { const p = E.back(seg(lt, i * .06, .4 + i * .06)), right = xs[i] > 960; bt(id, t, { x: xs[i] + (right ? 1 : -1) * (1 - p) * 700, y: 880, s: .76, flip: right, lean: bow * .45 * (right ? -1 : 1), aL: bow > .2 ? [-30, 40, 60] : [-160, -60, -20], aR: bow > .2 ? [100, 110, 40] : [160, -60, 20], face: bow > .2 ? fc('closed', 'smile', { blush: .7 }) : fc('star', 'big', { blush: .7 }) }); });
  withT(960, 160, 1 + hit(lt, 0, .2) * .3, -.02, () => ktxt("I'm your butler!", 0, 0, 150, ['#222121', '#e9a800', '#a51c28', '#0aa3c0', '#6f32ab'], t, t - lt, { f: F.en, w: 700, sw: 34, sc: '#fff', sh: 'rgba(80,50,60,.25)', st: .04, tilt: .04, jump: 8 }));
}, { tr: 'star', td: .3 });

// --- 286.0 outro: lady close-up → camera pulls back through the doorway into the castle corridor → doors close → castle at night ---
// doorway in world coords = the screen rect (0..W, 0..H); the ballroom is drawn inside it
function doorLeaf(a, sd) {   // a: 0 open (perpendicular, swung into the room) .. PI/2 closed; sd -1 left leaf, 1 right leaf
  const D = 1700, P = (u, v) => { const X = u * Math.sin(a), Z = u * Math.cos(a), f = D / (D + Z), x = sd < 0 ? X : W - X; return [960 + (x - 960) * f, 540 + (v - 540) * f]; };
  const quad = (u0, v0, u1, v1, col, stroke) => { const p = [P(u0, v0), P(u1, v0), P(u1, v1), P(u0, v1)]; ctx.beginPath(); ctx.moveTo(...p[0]); for (let i = 1; i < 4; i++) ctx.lineTo(...p[i]); ctx.closePath(); if (col) { ctx.fillStyle = col; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke[0]; ctx.lineWidth = stroke[1]; ctx.stroke(); } };
  if (a < .02) return;
  const shade = Math.cos(a) * .35;
  quad(0, 0, 960, H, mix('#a8653e', '#3a1d10', shade));
  quad(0, 0, 960, 24, '#8a4f2e');
  for (const [y, h] of [[70, 470], [580, 440]]) { quad(110, y, 850, y + h, null, ['#e6b247', 10]); quad(140, y + 30, 820, y + h - 30, mix('#b9744b', '#3a1d10', shade)); }
  const hc = P(480, 300), he = P(540, 300), hv = P(480, 360); ell(hc[0], hc[1], Math.abs(he[0] - hc[0]), Math.abs(hv[1] - hc[1]), '#e6b247');
  quad(900, 470, 934, 640, '#e6b247');
  quad(944, 0, 960, H, '#7c4527');
}
function corridor(t, lit) {   // everything outside the doorway, world coords
  // wall
  const g = ctx.createLinearGradient(0, -1800, 0, 1200); g.addColorStop(0, '#3b2346'); g.addColorStop(1, '#6b3a4e'); ctx.fillStyle = g; ctx.fillRect(-4000, -2200, 9920, 3300);
  // wallpaper diamonds
  ctx.fillStyle = 'rgba(255,220,160,.07)'; for (let x = -4000; x < 6000; x += 160) for (let y = -2200; y < 1080; y += 160) { ctx.beginPath(); ctx.moveTo(x, y - 30); ctx.lineTo(x + 22, y); ctx.lineTo(x, y + 30); ctx.lineTo(x - 22, y); ctx.fill(); }
  // floor + perspective red carpet
  const fg = ctx.createLinearGradient(0, 1080, 0, 3200); fg.addColorStop(0, '#5a3426'); fg.addColorStop(1, '#2c1912'); ctx.fillStyle = fg; ctx.fillRect(-4000, 1080, 9920, 2600);
  poly([200, 1080, 1720, 1080, 2900, 3600, -980, 3600], '#a51c28'); poly([260, 1080, 1660, 1080, 2780, 3600, -860, 3600], '#c9404c');
  ctx.strokeStyle = '#e6b247'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(300, 1080); ctx.lineTo(-760, 3600); ctx.moveTo(1620, 1080); ctx.lineTo(2680, 3600); ctx.stroke();
  // warm light spilling from the doorway onto the carpet
  alpha(lit, () => { const lg = ctx.createLinearGradient(0, 1080, 0, 3000); lg.addColorStop(0, 'rgba(255,236,170,.75)'); lg.addColorStop(1, 'rgba(255,236,170,0)'); ctx.fillStyle = lg; const hw = 960 * lit; ctx.beginPath(); ctx.moveTo(960 - hw, 1080); ctx.lineTo(960 + hw, 1080); ctx.lineTo(960 + hw * 2.1, 3200); ctx.lineTo(960 - hw * 2.1, 3200); ctx.fill(); });
  // pillars
  for (const px of [-700, 2620, -2500, 4420]) { const pw = 300; rect(px - pw / 2, -1700, pw, 2780, '#e8d6c0'); rect(px - pw / 2 - 40, -1760, pw + 80, 90, '#f3e6d2'); rect(px - pw / 2 - 40, 1000, pw + 80, 90, '#f3e6d2'); for (let k = -2; k <= 2; k++) rect(px + k * 52 - 8, -1660, 16, 2650, 'rgba(160,120,90,.18)'); }
  // candelabras (flicker)
  for (const cx of [-1600, 3520]) {
    rect(cx - 12, 300, 24, 780, '#e6b247'); ell(cx, 1080, 120, 26, '#c9973a');
    ctx.strokeStyle = '#e6b247'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(cx - 220, 200); ctx.quadraticCurveTo(cx - 220, 380, cx, 380); ctx.quadraticCurveTo(cx + 220, 380, cx + 220, 200); ctx.stroke();
    for (const dx of [-220, 0, 220]) { const fl = 1 + Math.sin(t * 13 + dx) * .12; rrect(cx + dx - 22, 80, 44, 130, 10, '#fff6e6'); const gg = ctx.createRadialGradient(cx + dx, 40, 4, cx + dx, 40, 260 * fl); gg.addColorStop(0, 'rgba(255,214,120,.55)'); gg.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = gg; ctx.fillRect(cx + dx - 300, -260, 600, 600); ell(cx + dx, 46, 18 * fl, 38 * fl, '#ffd36b'); ell(cx + dx, 56, 9, 20, '#fff'); }
  }
  // door frame + arch
  ctx.fillStyle = '#c9973a'; ctx.beginPath(); ctx.moveTo(-140, 1080); ctx.lineTo(-140, -60); ctx.quadraticCurveTo(960, -560, 2060, -60); ctx.lineTo(2060, 1080); ctx.lineTo(1920, 1080); ctx.lineTo(1920, 0); ctx.lineTo(0, 0); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e6b247'; ctx.beginPath(); ctx.moveTo(-70, 1080); ctx.lineTo(-70, -30); ctx.quadraticCurveTo(960, -470, 1990, -30); ctx.lineTo(1990, 1080); ctx.lineTo(1920, 1080); ctx.lineTo(1920, 0); ctx.lineTo(0, 0); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill();
  // crown crest above the door
  const cy = -470; circ(960, cy, 230, '#c9973a'); circ(960, cy, 205, '#a51c28'); ctx.strokeStyle = '#ffe9a8'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(960, cy, 180, 0, TAU); ctx.stroke();
  for (const sd of [-1, 1]) { ctx.fillStyle = '#c9973a'; ctx.beginPath(); ctx.moveTo(960 + sd * 232, cy - 60); ctx.quadraticCurveTo(960 + sd * 300, cy - 150, 960 + sd * 358, cy - 118); ctx.quadraticCurveTo(960 + sd * 306, cy - 96, 960 + sd * 250, cy - 10); ctx.fill(); }
  tiaraIcon(960, cy - 40, 1.25, 0);
}
scene(286.0, 293.2, (t, lt) => {
  // Beat 1 (0–1.6): close on the lady's smile, butlers bow, petals
  const bow = E.io(seg(lt, .4, 1.1)), inZ = tw(lt, 0, 1.9, 2.3, 1, E.io);
  // Beat 2 (1.6–3.6): pull back with an upward arc  |  Beat 4 (5.1–7.2): keep pulling back
  const pb = E.io(seg(lt, 1.5, 3.7)), pb2 = E.io(seg(lt, 4.9, 7.0));
  let z = lerp(1, .36, pb) * lerp(1, .55, pb2);
  let cx = 960 + Math.sin(pb * Math.PI) * 90, cy = 540 - 330 * pb - Math.sin(pb * Math.PI) * 110 + 300 * pb2;
  // Beat 3 (3.6–4.9): doors close, pause at a slit, then shut + shake + dust
  const c1 = E.io(seg(lt, 3.5, 4.3)) * .93, c2 = seg(lt, 4.52, 4.68) ** 2;
  const cl = c1 + (1 - .93) * c2, shut = lt >= 4.68, st = lt - 4.68;
  if (shut) { const [sx, sy] = shake(t, 22 * Math.exp(-st * 7)); cx += sx / z; cy += sy / z; }
  cam(cx, cy, z, () => {
    corridor(t, 1 - cl * .85);
    // ballroom inside the doorway
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
    bgBall(t); spotlight(960, 100, 620, 'rgba(255,245,220,.4)');
    cam(985, 470 - 60 * (inZ - 1) / .7, inZ, () => {
      const xs = [170, 400, 630, 1290, 1520], ids = ['R', 'K', 'I', 'S', 'J'];
      ids.forEach((id, i) => { const right = xs[i] > 960; bt(id, t, { x: xs[i] + (right ? 110 : 0), y: 880, s: .76, flip: right, lean: bow * .42 * (right ? -1 : 1), aL: bow > .2 ? [-30, 40, 60] : [-110, 120], aR: bow > .2 ? [100, 110, 40] : [110, 120], face: fc('closed', 'smile', { blush: .7 }) }); });
      ld(1, t, { x: 985, y: 880, s: 1.0, sway: Math.sin(t * 2.4) * .5, face: fc('happy', 'open', { blush: 1.0 }), aL: [-150, -50, -20], aR: [150, -50, 20] });
    });
    petals(t, 22, '#f9b9c8', { seed: 11 });
    // door leaves swing in (perspective)
    for (const sd of [-1, 1]) doorLeaf(cl * Math.PI / 2, sd);
    if (cl > .85 && !shut) { const gw = 40 * (1 - c2); alpha(.95, () => { const g = ctx.createLinearGradient(960 - gw * 3, 0, 960 + gw * 3, 0); g.addColorStop(0, 'rgba(255,240,190,0)'); g.addColorStop(.5, 'rgba(255,248,215,1)'); g.addColorStop(1, 'rgba(255,240,190,0)'); ctx.fillStyle = g; ctx.fillRect(960 - gw * 3, 0, gw * 6, H); rect(960 - gw / 2, 0, gw, H, '#fffbe8'); }); }
    if (cl > 0) rect(0, 0, W, H, rgba('#3a1d10', .25 * cl));
    ctx.restore();
    const scy = 540 + (1080 - cy) * z;
    if (shut && st < 1.1 && z > .18) for (let i = 0; i < 16; i++) { const k = st / 1.1, dx = (i / 15 - .5) * 1560 * z, r = (70 + hash(i * 3) * 90) * (.4 + k); alpha((1 - k) * .5, () => circ(960 + dx * (1 + k * .5), scy - 10 - k * 110 * hash(i * 7), r, '#e8d6c0')); }
  });
  alpha(seg(lt, .3, .9) * (1 - seg(lt, 1.5, 2)), () => txt('Thank you, my Tiara ♡', 960, 140, 76, '#e8557a', { f: F.sc, w: 400, sw: 12, sc: '#fff' }));
  // Beat 4: castle exterior at night (cross-dissolve while still pulling back)
  const ex = seg(lt, 5.15, 5.8);
  if (ex > 0) alpha(ex, () => {
    bgNight(t, { c0: '#1d2350', c1: '#4a4888' });
    twinkles(t, 60, '#fff', { h: 700, r: 20, seed: 9 });
    circ(1560, 190, 130, 'rgba(255,246,210,.95)'); alpha(.35, () => circ(1560, 190, 240, 'rgba(255,246,210,.5)'));
    const cs = lerp(1.5, 1.15, E.io(seg(lt, 5.15, 7.2)));
    ell(960, 1180, 1500, 190, '#2d2f63');
    castle(960, 1000, cs, '#8f86cc', '#ffe9a8');
    // glowing windows halo
    alpha(.5 + .2 * Math.sin(t * 3), () => { const g = ctx.createRadialGradient(960, 1000 - 60 * cs, 20, 960, 1000 - 60 * cs, 300 * cs / 2); g.addColorStop(0, 'rgba(255,233,168,.6)'); g.addColorStop(1, 'rgba(255,233,168,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
    // the crown above the tallest tower twinkles
    const ty = 1000 - 527 * cs - 18, tw2 = pop(lt, 5.7, .4);
    if (tw2 > 0) { alpha(.45 + .25 * Math.sin(t * 3), () => { const g2 = ctx.createRadialGradient(960, ty, 10, 960, ty, 260); g2.addColorStop(0, 'rgba(255,246,210,.95)'); g2.addColorStop(1, 'rgba(255,246,210,0)'); ctx.fillStyle = g2; ctx.fillRect(660, ty - 300, 600, 600); }); tiaraIcon(960, ty + 40, .8 * tw2, Math.sin(t * 2) * .05); spark(960, ty - 90, 34 * Math.max(0, Math.sin((lt - 5.7) * 6)), '#fff'); }
  });
  // crown light spreads into the end card
  const wl = seg(lt, 6.72, 7.2);
  if (wl > 0) { const ty = 1000 - 527 * 1.15 - 18; const R = 30 + 1500 * E.io(wl); const g = ctx.createRadialGradient(960, ty, 0, 960, ty, R); g.addColorStop(0, 'rgba(253,246,227,1)'); g.addColorStop(.7, 'rgba(253,246,227,.95)'); g.addColorStop(1, 'rgba(253,246,227,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); alpha(seg(lt, 6.9, 7.2), () => bgFill('#fdf6e3')); }
}, { tr: 'fade', td: .6 });
// --- 293.2 end card ---
scene(293.2, 400, (t, lt) => {
  bgFill('#fdf6e3'); dots('#fbe9c6', 110, 16, t * 25, t * 18); rays(960, 430, 16, 'rgba(255,255,255,.55)', t * .12);
  ctx.strokeStyle = '#e6b247'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(100, 60, 1720, 960, 50); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(125, 85, 1670, 910, 34); ctx.stroke();
  tiaraIcon(960, 150, 1.2 * pop(lt, .1, .4), Math.sin(t * 2) * .04);
  ktxt('バトル・オブ・バトラー！', 960, 300, 110, ['#222121', '#f2b705', '#a51c28', '#0aa5c2', '#6f32ab'], t, t - lt + .2, { sw: 28, sc: '#fff', sh: 'rgba(120,80,50,.22)', gap: 4, st: .05, tilt: .04 });
  alpha(seg(lt, .8, 1.4), () => txt('King & Prince', 960, 410, 64, '#c9973a', { f: F.sc, w: 400 }));
  const cast = [['R', 'Ren', 'BLACK'], ['K', 'Kaito', 'YELLOW'], ['S', 'Sho', 'CRIMSON'], ['J', 'Jin', 'TURQUOISE'], ['I', 'Kishi', 'PURPLE']];
  cast.forEach(([id, nm, cl], i) => { const p = pop(lt, 1.2 + i * .15, .35), x = 400 + i * 280; if (p <= 0) return; butlerHead(id, x, 560 + bob(t + i * .3, 8), .62 * p, fc(i % 2 ? 'closed' : 'happy', 'open', { blush: .8, tt: t })); txt(nm, x, 760, 40, BUT[id].col === '#222121' ? '#222121' : (id === 'K' ? '#e9a800' : BUT[id].col), { f: F.en, w: 600, sx: p }); });
  alpha(seg(lt, 2.2, 2.8), () => { ribbon(960, 880, 760, 64, '#f26286', '#d94a70'); txt('& お嬢様 = My Tiara ♡', 960, 882, 36, '#fff', { w: 900 }); });
  alpha(seg(lt, 2.8, 3.4), () => txt('Fan-made MG Animation MV', 960, 960, 26, '#a08a6a', { f: F.en, w: 600, ls: 3 }));
  for (let i = 0; i < 4; i++) spark(260 + i * 460, 980 - (i % 2) * 60, 18 * Math.max(0, Math.sin(t * 3 + i)), '#e6b247');
}, { tr: 'fade', td: .8 });
