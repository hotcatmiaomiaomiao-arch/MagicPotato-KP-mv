// ===== scenes part 1 : 0 - 89s =====
const fc = (eyes, mouth, x) => ({ eyes, mouth, ...(x || {}) });
const COATS = ['#222121', '#f2b705', '#a51c28', '#0aa5c2', '#6f32ab'];
const HALLX = { K: 400, J: 680, R: 960, S: 1240, I: 1520 };
function bowPose(k) { return { lean: .5 * k, aL: [lerp(-120, -5, k), lerp(135, 80, k), -28 * k], head: { rot: .12 * k } }; }
function hall(t, bow, o = {}) { // entrance hall with the five butlers lined up; bow: fn(id)->0..1
  bgRoom(t, '#fdf1d8', '#fbe6c0', '#ecd0a8'); windowP(300, 150, 230, 420, '#ffd9b0', t); windowP(1620, 150, 230, 420, '#ffd9b0', t);
  curtainP(150, 110, 520, '#e58aa0', 1, 110); curtainP(450, 110, 520, '#e58aa0', -1, 110); curtainP(1470, 110, 520, '#e58aa0', 1, 110); curtainP(1770, 110, 520, '#e58aa0', -1, 110);
  chandelier(960, -30, 1.1, t);
  poly([700, FY, 1220, FY, 1420, H, 500, H], '#e8667c'); poly([730, FY, 1190, FY, 1380, H, 540, H], '#f08a9a');
  for (const id of ['K', 'I', 'J', 'S', 'R']) { if (o.skip && o.skip.includes(id)) continue; const k = bow(id), f = o.face && o.face[id]; bt(id, t, { x: HALLX[id], y: 880, s: .72, ...bowPose(k), ...(o.pose && o.pose[id] || {}), face: f || (k > .5 ? fc('closed', 'smile') : fc('happy', 'smile')), still: k > .3 }); }
}
// ---------- 0 - 7.3 : title ----------
scene(0, 7.3, (t, lt) => {
  bgFill('#fdf6e3'); dots('#fbe9c6', 110, 16, t * 25, t * 18);
  rays(960, 470, 16, 'rgba(255,255,255,.55)', t * .12);
  const fr = E.o(seg(lt, .2, 1.2)); ctx.strokeStyle = '#e6b247'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(960 - 860 * fr, 60, 1720 * fr, 960, 50); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(960 - 835 * fr, 85, 1670 * fr, 910, 34); ctx.stroke();
  const dp = E.bn(seg(lt, .7, 1.7)); tiaraIcon(960, -160 + 330 * dp, 2.2 * (lt > .7 ? 1 : 0), Math.sin(t * 2) * .04);
  spark(820, 150, 26 * Math.max(0, Math.sin(t * 4)) * seg(lt, 1.6, 2), '#e6b247'); spark(1110, 210, 20 * Math.max(0, Math.sin(t * 4 + 2)) * seg(lt, 1.6, 2), '#e6b247');
  alpha(seg(lt, 1.5, 2.1), () => txt('King & Prince', 960, 330 - 20 * (1 - E.o(seg(lt, 1.5, 2.1))), 78, '#c9973a', { f: F.sc, w: 400 }));
  ktxt('バトル・オブ・バトラー！', 960, 500, 138, ['#222121', '#f2b705', '#a51c28', '#0aa5c2', '#6f32ab'], t, 2.2, { sw: 34, sc: '#fff', sh: 'rgba(120,80,50,.22)', gap: 6, st: .07, tilt: .05, jump: 10 });
  ORDER.forEach((id, i) => { const p = pop(lt, 3.6 + i * .16, .35); if (p > 0) { butlerHead(id, 480 + i * 240, 760 + bob(t + i * .2, 12), .5 * p, fc('happy', 'open', { blush: .8 })); } });
  for (let i = 0; i < 4; i++) heart(600 + i * 240, 770, 20 * pop(lt, 4.3 + i * .1), '#f26286');
  alpha(seg(lt, 4.6, 5.2), () => { ribbon(960, 925, 560, 64, '#f26286', '#d94a70'); txt('MG ANIMATION MV', 960, 927, 36, '#fff', { f: F.en, w: 600, ls: 4 }); });
});
// ---------- 7.3 - 14 : lady walks home ----------
scene(7.3, 14, (t, lt) => {
  const g = ctx.createLinearGradient(0, 0, 0, FY); g.addColorStop(0, '#ffc6a0'); g.addColorStop(.6, '#ffe2b8'); g.addColorStop(1, '#fff0d0'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  circ(1500 - lt * 12, 560 + lt * 14, 150, '#fff3c9'); circ(1500 - lt * 12, 560 + lt * 14, 115, '#ffd98a');
  for (let i = 0; i < 4; i++) cloud(((i * 620 - lt * 30) % 2500 + 2500) % 2500 - 250, 170 + (i % 2) * 120, 1 + (i % 3) * .25, 'rgba(255,255,255,.75)');
  const sx = lt * 150;
  for (let i = 0; i < 9; i++) { const x = ((i * 380 - sx * .35) % 3040 + 3040) % 3040 - 400; rect(x, 520 - (i % 3) * 70, 250, 330 + (i % 3) * 70, '#f4c9a8'); poly([x - 20, 520 - (i % 3) * 70, x + 270, 520 - (i % 3) * 70, x + 125, 430 - (i % 3) * 70], '#eaa98c'); for (let k = 0; k < 2; k++) rrect(x + 45 + k * 110, 600 - (i % 3) * 40, 55, 80, 27, '#fff0c9'); }
  castle(2500 - sx * .8, FY, 1.25, '#f6b6c4', '#fff3c0');
  rect(0, FY - 6, W, 12, '#e9b98f'); rect(0, FY, W, H - FY, '#f3d2ac');
  for (let i = 0; i < 7; i++) { const x = ((i * 520 - sx) % 3120 + 3120) % 3120 - 300; rect(x - 6, 470, 12, 380, '#7a5a4a'); rrect(x - 30, 420, 60, 70, 18, '#fff3c0'); rrect(x - 36, 410, 72, 16, 8, '#7a5a4a'); for (let k = 0; k < 4; k++) rect(x + 110 + k * 90, FY + 60, 50, 12, 'rgba(255,255,255,.45)'); }
  const arrive = seg(lt, 5, 6.2), step = Math.sin(lt * 9), tired = 1 - arrive;
  const L = lady(4, { x: tw(lt, 0, 5.2, 520, 800, E.s), y: 900, s: .92, lift: -Math.abs(step) * 9, sway: step * .3, lean: .07 * tired, head: { rot: .1 * tired + step * .02, dy: 8 * tired }, aL: [-100 + step * 14, 122], aR: [100 + step * 14, 122], face: arrive > .5 ? fc('wide', 'o', { blush: .6, brows: 'up' }) : fc('half', 'wavy', { sweat: 1, brows: 'sad', blink: blinkAt(t, 3) }) });
  if (lt < 4.8) { const p = pop(lt, .7, .3) * (1 - seg(lt, 4.4, 4.8)); withT(L.top[0] + 250, L.top[1] + 60, p, 0, () => { bubble(0, 0, 330, 130, '#fff', -1); txt('今日もくたくた…', 0, 2, 38, '#7a5a4a'); }); }
  if (arrive > 0) { burst(L.top[0], L.top[1] + 40, 250, 300, 3, '#f26286', 9, -Math.PI * .8 + .0); sfx('わが家だ！', L.top[0] + 300, L.top[1] + 30, 64, '#f26286', lt, 5.2, { rot: -.08 }); }
}, { tr: 'circle', td: .6 });
// ---------- 14 - 18.78 : the door opens ----------
scene(14, 18.78, (t, lt) => {
  const z = tw(lt, 2.6, 4.78, 1, 3.3, E.io), op = E.io(seg(lt, 2.45, 3.5));
  cam(960, lerp(540, 560, seg(lt, 2.6, 4.78)), z, () => {
    rect(660, 150, 600, 420, '#fdf1d8'); rect(660, 570, 600, 280, '#ecd0a8');
    ctx.save(); ctx.beginPath(); ctx.rect(660, 150, 600, 700); ctx.clip(); ctx.translate(960, 560); ctx.scale(1 / 3.3, 1 / 3.3); ctx.translate(-960, -540);
    hall(t, () => E.io(seg(lt, 3.5, 4.2)) * (1 - 0)); rect(0, 0, W, H, rgba('#fff8e0', .7 * (1 - seg(lt, 2.6, 3.8)))); ctx.restore();
    // wall
    ctx.fillStyle = '#f6c9b0'; ctx.beginPath(); ctx.rect(-200, -300, 2320, 1700); ctx.rect(660, 150, 600, 700); ctx.fill('evenodd');
    ctx.fillStyle = '#f0b89c'; for (let j = 0; j < 9; j++) for (let i = -1; i < 12; i++) { const x = i * 190 + (j % 2) * 95, y = j * 100 - 40; if (x + 170 < 620 || x > 1300 || y + 80 < 100) rrect(x, y, 170, 80, 10, '#f3bfa4'); }
    rect(-200, FY, 2320, 400, '#e9d2b4'); poly([600, FY, 1320, FY, 1420, H + 200, 500, H + 200], '#f3e2c8');
    ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.rect(620, 110, 680, 740); ctx.rect(660, 150, 600, 700); ctx.fill('evenodd'); rrect(590, 80, 740, 40, 12, '#fffaf0');
    for (const sd of [-1, 1]) { const w = 300 * (1 - op * .86), x = sd < 0 ? 660 : 1260 - w; rect(x, 150, w, 700, '#8e5a3c'); rect(x + w * .1, 190, w * .8, 270, '#a56e4b'); rect(x + w * .1, 500, w * .8, 310, '#a56e4b'); circ(sd < 0 ? x + w * .86 : x + w * .14, 500, 15 * (w / 300 + .3), '#e6b247'); }
    for (const sd of [-1, 1]) { rect(960 + sd * 420 - 8, 330, 16, 80, '#7a5a4a'); rrect(960 + sd * 420 - 34, 250, 68, 90, 22, '#fff3c0'); circ(960 + sd * 420, 295, 60 + Math.sin(t * 5) * 6, 'rgba(255,240,180,.3)'); for (let k = 0; k < 3; k++) circ(960 + sd * (520 + k * 30), 810 - k * 40, 70 - k * 10, k % 2 ? '#8fca84' : '#9fd492'); }
    rrect(860, 30, 200, 60, 16, '#e6b247'); tiaraIcon(960, 60, .55);
  });
  sfx('ガチャ…', 1380, 330, 80, '#8e5a3c', lt, 2.35, { end: 3.3, rot: .1 });
  if (lt < 2.6) { const p = pop(lt, .25, .3); withT(960, 1010, p, 0, () => { ribbon(0, -40, 520, 70, '#f26286', '#d94a70'); txt('ただいま〜', 0, -38, 42, '#fff'); }); }
}, { tr: 'wipeR', td: .5 });
// ---------- 18.78 - 28.5 : welcome home ----------
scene(18.78, 20.54, (t, lt) => {
  const z = tw(lt, 0, 1.2, 1, 1.45, E.o);
  cam(960, lerp(540, 600, seg(lt, 0, 1.2)), z, () => hall(t, id => id === 'R' ? 1 - E.io(seg(lt, .05, .5)) : 1, { face: { R: fc('happy', 'talk', { blush: .5 }) }, pose: { R: lt > .4 ? { aL: [-10, 78, -25], aR: [150 + Math.sin(lt * 8) * 6, 70, 20] } : {} } }));
  for (let i = 0; i < 6; i++) spark(700 + i * 110, 250 + (i % 2) * 60, 24 * Math.max(0, Math.sin(t * 5 + i * 1.3)) * seg(lt, .3, .8), '#e6b247');
});
scene(20.54, 22.55, (t, lt) => {
  bgRoom(t, '#fdf1d8', '#fbe6c0', '#ecd0a8'); windowP(960, 130, 300, 470, '#ffd9b0', t); curtainP(770, 90, 580, '#e58aa0', 1, 120); curtainP(1150, 90, 580, '#e58aa0', -1, 120);
  const sm = E.io(seg(lt, .9, 1.3));
  ld(4, t, { x: 640 + slide(lt, 0, .4, -200), y: 890, s: .95, face: sm > .5 ? fc('happy', 'open', { blush: 1 }) : fc('half', 'wavy', { sweat: 1 - sm, brows: 'sad' }), head: { rot: -.05 * sm, dy: 8 * (1 - sm) } });
  const R = bt('R', t, { x: 1270 + slide(lt, 0, .4, 200), y: 890, s: 1, flip: true, aR: [150, 20 + Math.sin(lt * 7) * 8, 20], aL: [-10, 78, -25], head: { rot: .06 }, face: fc('happy', 'talk', { blush: .4 }) });
  for (let i = 0; i < 5; i++) { const p = pop(lt, .9 + i * .08, .3); star(480 + i * 85, 180 - Math.abs(i - 2) * -26 + bob(t + i * .1, 10), 26 * p, '#f2b705', t + i); }
  sfx('がんばった！', 640, 330 - 0, 1, '#fff', lt, 99);
  const p = pop(lt, 1.0, .3); withT(650, 150, p, -.04, () => { ribbon(0, 0, 430, 74, '#f26286', '#d94a70'); txt('よくできました', 0, 2, 42, '#fff'); });
}, { tr: 'wipeL', td: .3 });
scene(22.55, 24.55, (t, lt) => {
  bgFill('#fff');
  const a = E.o5(seg(lt, 0, .3)), b = E.o5(seg(lt, 1.0, 1.3));
  ctx.save(); ctx.translate(-(1 - a) * 1000, 0); panel(-80, 1040, BUT.K.pale, () => { dots('#fff', 100, 14, t * 30, 0); const K = bt('K', t, { x: 480, y: 900, s: 1.05, aR: [130, 40, 20], aL: [-130, 70, -10], face: fc('happy', 'talk', { blush: .6 }), hr: () => clocheP(10, -30, 1, 70 * E.back(seg(lt, .3, .7))) }); for (let i = 0; i < 3; i++) spark(K.hr[0] - 40 + i * 50, K.hr[1] - 150 - i * 20, 20 * pop(lt, .5 + i * .08), '#f2b705'); }); ctx.restore();
  if (lt > 1.0) { ctx.save(); ctx.translate((1 - b) * 1000, 0); panel(960, 1040, BUT.J.pale, () => { stripes('rgba(255,255,255,.5)', 60, -Math.PI / 4, t * 60); const J = bt('J', t, { x: 1440, y: 900, s: 1.05, flip: true, aR: [130, 30, 20], aL: [-130, 70, -10], head: { rot: .05 }, face: fc('open', 'talk', { brows: 'up' }), hr: () => teapot(0, -62, 1, 0) }); steam(J.hr[0] - 100, J.hr[1] - 90, 1, t); }); ctx.restore(); }
  const lk = lt < 1.0 ? -1 : 1; const p = pop(lt, .15, .3);
  circ(960, 250, 150 * p, '#fff'); circ(960, 250, 136 * p, '#fdebf0'); if (p > 0) ladyHead(960 + lk * 8, 262, .62 * p, fc('open', 'o', { look: [lk * 1.4, 0], blush: .7 }), lk * .06);
  sfx('お食事？', 330, 150, 76, '#e9a800', lt, .3, { rot: -.08 }); sfx('お茶！', 1600, 150, 84, '#0aa3c0', lt, 1.2, { rot: .08 });
});
scene(24.55, 26.66, (t, lt) => {
  bgPop(t, BUT.S.pale, '#fbe4e4', 'dots', { r: 20, sp: 130 });
  const pat = Math.max(0, Math.sin((lt - .25) * TAU / BP)) * 22 * seg(lt, .2, .5);
  const L = ld(4, t, { x: 800, y: 1010, s: 1.05, still: true, sq: pat * .0012, face: fc('closed', 'smile', { blush: 1 }), head: { dy: pat * .35, rot: -.03 } });
  const tx = (L.top[0] + 30 - 1290) / 1.15, ty = (L.top[1] + 62 + pat * .5 - (900 - 280 * 1.15)) / 1.15;
  bt('S', t, { x: 1290, y: 900, s: 1.15, lean: -.14, aL: [tx + 60, ty - 6, 70], aR: [110, 130], head: { rot: -.08 }, face: fc('happy', 'talk', { blush: .7 }) });
  for (let k = 0; k < 4; k++) { const tt = .25 + k * BP; sfx('ポン', 560 + (k % 2) * 110, 250 + (k % 2) * 70, 74, '#a51c28', lt, tt, { end: tt + .45, rot: -.15 + (k % 2) * .2 }); }
  hearts(t, 9, ['#f79ab1', '#fff'], { r: 22, speed: 120 });
  const pk = E.o(seg(lt, 1.35, 1.75)); if (pk > 0) { rect(1920 - 210 * pk, 0, 220, H, '#d9c4ee'); rect(1920 - 210 * pk, 0, 14, H, '#b99be0'); butlerHead('I', 1920 - 205 * pk + 20, 420, .9, fc('angry', 'grit', { brows: 'angry', shade: .6, tt: t }), -.12); }
}, { tr: 'heart', td: .35 });
scene(26.66, 28.53, (t, lt) => {
  const sh = shake(t, 9 * (1 - seg(lt, .8, 1.6)));
  bgFill('#3b2460'); stripes('#462c70', 80, -Math.PI / 3, t * 200); flames(t, '#8e44d6', '#d9a6ff', 11, 1.1 * E.o(seg(lt, 0, .4)));
  cam(960 + sh[0], 540 + sh[1], tw(lt, 0, .35, 1.5, 1, E.o), () => {
    speedLines(t, 'rgba(255,255,255,.22)', 36, 560);
    bt('I', t, { x: 960, y: 1180, s: 1.55, still: true, aL: [-70, 30 + Math.sin(t * 40) * 3, -40], aR: [70, 30 + Math.cos(t * 40) * 3, 40], head: { rot: Math.sin(t * 38) * .02 }, face: fc('angry', 'grit', { brows: 'angry', anger: 1 + pulse(t) * .2, tears: .6, shade: .5 }), hl: () => { poly([-10, -8, 70, -44, 96, 8, 30, 40], '#fff'); poly([70, -44, 96, 8, 60, -6], '#e9e3f5'); } });
  });
  ktxt('くっそー！', 960, 170, 190, '#ffe14a', t, 26.7, { sw: 44, sc: '#3b2460', gap: 10, st: .06, tilt: .09, wave: 6 });
}, { tr: 'wipeL', td: .22 });
// ---------- 28.53 - 37.52 : hook 1 ----------
function battlePanels(t, lt, ids, o = {}) {
  bgFill('#fff'); const n = ids.length, w = W / n;
  ids.forEach((id, i) => { const b = BUT[id], p = E.back(seg(lt, i * .07, i * .07 + .32)); panel(i * w, w, b.pale, () => { stripes(rgba(b.lite, .22), 46, i % 2 ? -Math.PI / 4 : Math.PI / 4, t * 120 * (i % 2 ? 1 : -1)); const up = pulse(t, 6) * 14; bt(id, t, { x: i * w + w / 2, y: 900 + (1 - p) * 700, s: .78, bobA: 12, flip: i > 2, aL: [-74, 36 - up, -40], aR: [74, 30 - up, 40], head: { rot: (i - 2) * -.035 }, face: o.face ? o.face(id, i) : fc('angry', i % 2 ? 'grit' : 'big', { brows: 'angry' }) }); }); });
  for (let i = 0; i < n - 1; i++) if (lt > .5 + i * .05) zap(i * w + w - 40, 400 + (i % 2) * 70, i * w + w + 40, 440 - (i % 2) * 70, t + i, '#ffd54a');
}
scene(28.53, 33.01, (t, lt) => {
  battlePanels(t, lt, ['R', 'K', 'S', 'J', 'I']);
  const words = [['秘密裏', 28.55, '#3a2a22'], ['激烈', 29.6, '#e8414e'], ['執事競争', 30.4, '#6f32ab']];
  words.forEach(([s, t0, c], i) => { const t1 = i < 2 ? words[i + 1][1] : 31.75; if (t >= t0 && t < t1 + .1) alpha(1 - seg(t, t1 - .05, t1 + .1), () => ktxt(s, 960, 150, 170, c, t, t0, { sw: 42, sc: '#fff', sh: 'rgba(0,0,0,.18)', gap: 14, st: .05, tilt: .06 })); });
  [[31.72, 480, 170, -.1], [32.24, 1440, 190, .1], [32.5, 960, 150, 0]].forEach(([t0, x, y, r], i) => { if (t >= t0) { const p = pop(t, t0, .22); spiky(x, y, 190 * p, 12, .28, '#fff', r); spiky(x, y, 170 * p, 12, .28, ['#f2b705', '#0aa5c2', '#f26286'][i], r); txt('fight!', x, y + 4, 86 * p, '#fff', { f: F.en, w: 700, rot: r }); } });
}, { tr: 'bars', td: .3 });
function faceOff(t, lt, a, b, mid) {
  const A = BUT[a], B = BUT[b], push = Math.sin(lt * 14) * 10;
  bgFill(A.pale); poly([1060, 0, W, 0, W, H, 860, H], B.pale); stripes('rgba(255,255,255,.35)', 50, -Math.PI / 2.6, t * 240);
  const p = E.o5(seg(lt, 0, .22));
  butlerHead(a, 560 - (1 - p) * 700 + push, 470, 1.55, fc('angry', 'grit', { brows: 'angry', anger: 1 }), .1);
  butlerHead(b, 1360 + (1 - p) * 700 + push, 470, 1.55, fc('angry', 'big', { brows: 'angry' }), -.1);
  if (lt > .15) zap(880 + push, 300, 1040 + push, 620, t, '#ffd54a');
  poly([1060, -10, 1072, -10, 872, H + 10, 860, H + 10], '#fff');
  if (mid && lt > .45) { const q = E.back(seg(lt, .45, .75)); butlerHead(mid, 960, 1180 - 420 * q, 1.2, fc('gt', 'big', { brows: 'angry' }), Math.sin(t * 20) * .04); sfx('わたくしが！', 960, 250, 80, BUT[mid].col, lt, .55, { rot: -.05 }); }
}
scene(33.01, 34.04, (t, lt) => faceOff(t, lt, 'R', 'J'), { tr: 'wipeR', td: .15 });
scene(34.04, 35.04, (t, lt) => faceOff(t, lt, 'K', 'S', 'I'), { tr: 'wipeL', td: .15 });
function titleSlam(t, lt, o = {}) {
  bgPop(t, '#ffe9ee', '#ffd6e0', 'rays', { n: 18, sp: .5, y: 420 }); confetti(t, 70, ['#222121', '#fdd146', '#c9404c', '#0bb8d6', '#9a63d0', '#f79ab1'], { speed: 300 });
  const xs = [300, 630, 960, 1290, 1620];
  ['K', 'J', 'R', 'S', 'I'].forEach((id, i) => { const p = E.back(seg(lt, .1 + i * .05, .45 + i * .05)), j = pulse(t + i * .03, 4) * 26; bt(id, t, { x: xs[i], y: 905 + (1 - p) * 600, s: i === 2 ? .8 : .7, bobA: 0, lift: -j, aL: [-130, i % 2 ? -40 : 60, 20], aR: [130, i % 2 ? 60 : -40, -20], face: fc(i % 2 ? 'happy' : 'open', 'open', { brows: i % 2 ? undefined : 'angry', blush: .5 }) }); });
  const sc = 1 + hit(lt, 0, .18) * .5;
  withT(960, 215, sc, -.03, () => { ktxt('バトル・オブ', 0, -78, 128, ['#222121', '#e9a800', '#a51c28', '#0aa3c0', '#6f32ab'], t, t - lt, { sw: 38, sc: '#fff', sh: 'rgba(120,60,70,.28)', gap: 8, st: .03, tilt: .05 }); ktxt('バトラー！', 0, 82, 178, ['#a51c28', '#0aa3c0', '#6f32ab', '#222121', '#e9a800'], t, t - lt + .18, { sw: 44, sc: '#fff', sh: 'rgba(120,60,70,.28)', gap: 10, st: .04, tilt: .05 }); });
  for (let i = 0; i < 2; i++) withT(i ? 1570 : 350, 150, pop(lt, .5, .3), 0, () => { tiaraIcon(0, 0, .9, (i ? .2 : -.2) + Math.sin(t * 4) * .06); });
}
scene(35.04, 37.52, (t, lt) => titleSlam(t, lt), { tr: 'star', td: .3 });
// ---------- 37.52 - 45.06 : name cards ----------
const CARD = { R: ['BLACK', 'No.1'], K: ['YELLOW', 'No.2'], S: ['CRIMSON', 'No.3'], J: ['TURQUOISE', 'No.4'], I: ['PURPLE', 'No.5'] };
function nameCard(t, lt, id, k) {
  const b = BUT[id], left = k % 2 === 0, bx = left ? 520 : 1400, tx = left ? 1250 : 670, main = id === 'K' ? '#e9a800' : b.col;
  bgPop(t, b.pale, mix(b.pale, '#ffffff', .5), ['stripes', 'dots', 'rays', 'check', 'stripes'][k], { sp: .4, x: bx, y: 500 });
  alpha(.5, () => { for (let r = 0; r < 3; r++) txt((b.name.toUpperCase() + '  ').repeat(4), 960 + ((r % 2 ? 1 : -1) * t * 160) % 600, 170 + r * 330, 230, '#fff', { f: F.en, w: 700 }); });
  const p = E.back(seg(lt, 0, .35)); circ(bx, 520, 400 * p, '#fff'); circ(bx, 520, 372 * p, mix(b.pale, b.lite, .25));
  const poses = [{ aL: [-10, 78, -25], aR: [150, 60, 20] }, { aL: [-140, -40, 20], aR: [140, -40, -20] }, { aL: [-30, 100, -30], aR: [70, 10, 40], head: { rot: -.06 } }, { aL: [-150, 10, 10], aR: [100, -70, -20], fL: [-16, -24] }, { aL: [-70, 30, -40], aR: [150, -60, -10], head: { rot: .06 } }];
  bt(id, t, { x: bx + slide(lt, 0, .35, left ? -500 : 500), y: 960, s: 1.15, bobA: 12, ...poses[k], face: [fc('happy', 'smile', { blush: .6 }), fc('happy', 'open', { blush: .8 }), fc('half', 'smirk'), fc('winkL', 'open', { blush: .5 }), fc('star', 'open', { brows: 'angry' })][k] });
  const q = E.o5(seg(lt, .12, .45)); ctx.save(); ctx.translate((1 - q) * (left ? 900 : -900), 0);
  rrect(tx - 380, 250, 760, 400, 40, '#fff'); rrect(tx - 362, 268, 724, 364, 28, main);
  txt(CARD[id][1], tx - 320, 318, 40, 'rgba(255,255,255,.85)', { f: F.en, w: 600, al: 'left' }); txt(CARD[id][0] + ' BUTLER', tx + 320, 318, 34, 'rgba(255,255,255,.85)', { f: F.en, w: 600, al: 'right', ls: 2 });
  ktxt(b.name, tx, 440, b.name.length > 5 ? 150 : 180, '#fff', t, t - lt + .2, { f: F.en, w: 700, st: .04, gap: 4, jump: 8 });
  rrect(tx - 150, 545, 300, 62, 31, '#fff'); txt(b.jp, tx, 578, 40, main);
  ctx.restore();
  for (let i = 0; i < 5; i++) star(tx - 300 + i * 150, 730 + bob(t + i * .12, 16), 30 * pop(lt, .4 + i * .05), i === k ? main : '#fff', t * 2 + i);
}
ORDER.forEach((id, k) => { const d = (45.06 - 37.52) / 5; scene(37.52 + k * d, 37.52 + (k + 1) * d, (t, lt) => nameCard(t, lt, id, k), { tr: ['diamond', 'wipeR', 'wipeL', 'wipeR', 'wipeL'][k], td: .28 }); });
// ---------- 45.06 - 53.83 : verse 1a ----------
scene(45.06, 45.95, (t, lt) => shotCall(t, lt, 4, 'R', 0), { tr: 'circle', td: .25 });
scene(45.95, 49.57, (t, lt) => {
  bgGarden(t); const bl = i => seg(t, 47.6 + i * .22, 48.1 + i * .22), done = seg(t, 47.6, 48.6);
  for (let i = 0; i < 12; i++) flower(120 + i * 160, 800 - (i % 2) * 22, .62, bl(i % 5) * 1, ['#f79ab1', '#fde27a', '#f5a8d0', '#fff', '#f58a9a'][i % 5], t, 110);
  for (let i = 0; i < 5; i++) flower(790 + i * 105, 905 - (i % 2) * 18, 1.05, bl(i), ['#f26286', '#fdbd6a', '#f79ab1', '#b7a4ea', '#f58a9a'][i], t, 170);
  const wv = Math.sin(lt * 7) * 12;
  const R = bt('R', t, { x: 470 + slide(lt, 0, .4, -300), y: 900, s: .95, aR: [150 + wv, -70 - done * 20, 20], aL: [-10, 78, -25], face: fc(done > .5 ? 'happy' : 'open', 'talk', { blush: .5 }) });
  for (let i = 0; i < 10; i++) { const ph = ((t * 1.1 + i / 10) % 1); spark(lerp(R.hr[0], 1250, ph), R.hr[1] - Math.sin(ph * Math.PI) * 230 + lerp(0, 330, ph), 22 * Math.sin(ph * Math.PI), i % 2 ? '#fff' : '#fde27a', t * 3); }
  ld(4, t, { x: 1560 + slide(lt, 0, .4, 300), y: 900, s: .9, aL: done > .5 ? [-80, 30, 20] : undefined, aR: done > .5 ? [80, 30, -20] : undefined, face: done > .5 ? fc('star', 'open', { blush: 1 }) : fc('open', 'smile', { look: [-1, .5] }) });
  if (done > 0) petals(t, 26, '#f9b9c8');
}, { tr: 'wipeU', td: .3 });
scene(49.57, 50.4, (t, lt) => shotCall(t, lt, 4, 'J', 1), { tr: 'circle', td: .25 });
scene(50.4, 53.83, (t, lt) => {
  const gag = seg(lt, 1.43, 1.6), aft = seg(lt, 2.55, 2.75);
  bgFill('#0d6f88'); for (let i = 0; i < 12; i++) rect(i * 170, 0, 85, FY, '#0b627a'); rect(0, FY, W, H - FY, '#c98f5a'); rect(0, FY, W, 16, '#a8703e');
  ctx.fillStyle = '#e8414e'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 90); for (let i = 12; i >= 0; i--) ctx.quadraticCurveTo(i * 160 + 80, 190, i * 160, 90); ctx.fill();
  spotlight(960, 120, 430, 'rgba(255,250,210,.28)');
  if (gag > 0) { burst(960, 480, 380, 380 + 160 * pulse(t, 3), 16, '#fde27a', 16, t); for (let i = 0; i < 6; i++) star(960 + Math.cos(i * TAU / 6 + t) * 520, 470 + Math.sin(i * TAU / 6 + t) * 300, 40 * gag, ['#fde27a', '#f79ab1', '#fff'][i % 3], t * 3); }
  const g = E.back(gag);
  bt('J', t, { x: 960, y: 900, s: 1.08, still: gag > 0, lift: -hit(lt, 1.45, .25) * 60, rot: g * -.08, aL: [lerp(-120, -70, g), lerp(135, -150, g), -50 * g], aR: [lerp(150, 70, g), lerp(-40 + Math.sin(lt * 8) * 8, -150, g), 50 * g], fL: [-30 * g, -70 * g], head: { rot: g * .1 }, face: gag > 0 ? fc('gt', 'big', { blush: .8 }) : fc('happy', 'talk', { brows: 'up' }) });
  if (gag > 0) sfx('ドヤァ！', 1420, 300, 120, '#fde27a', lt, 1.5, { rot: .12, sc: '#0b627a', wob: .03 });
  if (aft > 0) { const q = E.back(aft); withT(330, 1150 - 500 * q, 1, 0, () => { circ(0, 0, 175, '#fff'); circ(0, 0, 160, '#fdebf0'); ladyHead(0, 14, .7, fc('gt', 'big', { blush: 1 }), Math.sin(t * 22) * .05); }); sfx('ぷっ', 520, 480, 80, '#f26286', lt, 2.7, { rot: -.15 }); ['R', 'K', 'S', 'I'].forEach((id, i) => butlerHead(id, 1330 + i * 150, 1180 - 400 * E.back(seg(lt, 2.6 + i * .05, 2.9 + i * .05)), .42, fc('dot', 'flat', { sweat: 1 }))); }
}, { tr: 'blinds', td: .3 });
// ---------- 54.08 - 65.6 : verse 1b ----------
function tableP(y = 800, col = '#fff', lace = '#f6d3d3') { rect(0, y, W, H - y, col); ctx.fillStyle = lace; ctx.beginPath(); ctx.moveTo(0, y); for (let i = 0; i < 24; i++) ctx.arc(i * 80 + 40, y, 40, Math.PI, 0, true); ctx.lineTo(W, y - 14); ctx.lineTo(0, y - 14); ctx.fill(); rect(0, y - 16, W, 16, col); }
scene(54.08, 58.1, (t, lt) => {
  const two = lt > 2.02, l2 = lt - 2.02;
  bgPop(t, '#fbe4e4', '#f6d3d3', 'stripes', { ang: Math.PI / 2, w: 60 }); windowP(960, 90, 360, 430, '#ffeccc', t);
  for (let i = 0; i < 6; i++) rosette(120 + i * 340, 120 + (i % 2) * 70, 34, i % 2 ? '#c9404c' : '#f79ab1', t * .5 + i);
  const px = E.io(seg(lt, 1.9, 2.4)) * -420;
  const pour = seg(lt, .35, .6) * (1 - seg(lt, 1.6, 1.85));
  const S = bt('S', t, { x: 520 + slide(lt, 0, .4, -300) + px * .5, y: 1000, s: 1.1, aR: [150, 20 - pour * 30, 10], aL: [-10, 78, -25], face: two ? fc('closed', 'talk', { blush: .6 }) : fc('happy', 'talk', { look: [1, 1] }), hr: () => teapot(10, -50, 1.05, pour * .55) });
  ld(4, t, { x: 1500 + px * .3, y: 1010, s: 1.0, aL: two ? [-70, 20, 20] : undefined, aR: two ? [60 + Math.sin(l2 * 10) * 6, -10, -20] : undefined, face: two ? (l2 > .9 ? fc('star', 'cat', { blush: 1 }) : fc('wide', 'o', { blush: .8, look: [-1, 1] })) : fc('open', 'smile', { look: [-1.2, 1], blush: .6 }), hr: two ? () => financier(0, -18, .8, -.3) : undefined });
  tableP(820, '#fff', '#f6d3d3');
  const cx = 960 + px;
  cupP(cx, 800, 1.5, '#d9573f'); if (pour > 0) { qline(S.hr[0] + 105, S.hr[1] - 62, cx - 30, S.hr[1] - 40, cx, 770, '#d9573f', 10 * pour); } steam(cx, 740, 1.4, t);
  if (lt < 2.3) sfx('とぽとぽ', cx + 210, 600, 56, '#c9404c', lt, .5, { end: 1.9, rot: .1, wob: .04 });
  if (lt > 1.9) { const q = E.back(seg(lt, 2.0, 2.4)); const fx = cx + 520; plateP(fx, 830, 1.5 * q); financier(fx - 50, 805, 1.5 * q, -.1); financier(fx + 50, 805, 1.5 * q, .1); financier(fx, 772, 1.5 * q, 0); for (let i = 0; i < 4; i++) spark(fx - 110 + i * 75, 720 - (i % 2) * 40, 26 * Math.max(0, Math.sin(t * 5 + i * 1.6)) * q, '#f2b705'); withT(fx + 190, 690, pop(lt, 2.5, .3), .1, () => { rrect(-95, -34, 190, 68, 34, '#fde27a'); txt('バターたっぷり', 0, 2, 24, '#a56e1b'); }); }
}, { tr: 'wipeR', td: .3 });
scene(58.1, 62.37, (t, lt) => {
  bgPop(t, '#fff3c4', '#ffe9a0', 'dots', { r: 16, sp: 120 }); windowP(1500, 110, 300, 480, '#cfe9fb', t); curtainP(1310, 70, 600, '#f2b705', 1, 110); curtainP(1690, 70, 600, '#f2b705', -1, 110);
  rect(0, FY, W, H - FY, '#f1cf9d');
  const tapA = Math.max(0, Math.sin(lt * TAU / BP * 2)) * 16, tapB = Math.max(0, Math.sin(lt * TAU / BP * 2 + Math.PI)) * 16;
  bt('K', t, { x: 450, y: 905, s: .9, bobA: 4, aR: [205, 12 - tapA, -10], aL: [150, 22 - tapB, -30], head: { rot: Math.sin(beatOf(t) * Math.PI) * .08 }, face: fc('closed', 'talk', { blush: .6 }) });
  piano(900, 900, 1.3);
  for (let i = 0; i < 9; i++) { const ph = ((t * .35 + i / 9) % 1), x = 760 + ph * 900 + Math.sin(ph * 9 + i) * 40, y = 560 - ph * 380 + Math.sin(ph * 12 + i * 2) * 50; alpha(Math.sin(ph * Math.PI), () => note(x, y, .9 + (i % 3) * .25, ['#e9a800', '#f26286', '#0aa3c0', '#6f32ab', '#a51c28'][i % 5], Math.sin(t * 3 + i) * .25, i % 3 === 0)); }
  const sw = Math.sin(beatOf(t) * Math.PI / 1.5);
  ld(4, t, { x: 1500 + sw * 50, y: 905, s: .9, rot: sw * .05, sway: sw * .9, aL: [-125, 60, 10], aR: [125, 60, -10], face: fc('closed', 'smile', { blush: 1 }), head: { rot: sw * .07 } });
  const p = pop(lt, .5, .35); withT(960, 130, p, -.02, () => { ribbon(0, 0, 640, 84, '#fff', '#f2d98a'); txt('Chopin  Waltz No.19', 0, 3, 46, '#b8860b', { f: F.sc, w: 400 }); });
}, { tr: 'diamond', td: .35 });
scene(62.37, 65.6, (t, lt) => {
  bgPop(t, '#e6d6f6', '#d9c4ee', 'rays', { n: 16, sp: .35, y: 480 }); spotlight(960, 150, 460, 'rgba(255,255,255,.4)', 900);
  ['R', 'K', 'S', 'J'].forEach((id, i) => { const lf = i < 2, q = E.back(seg(lt, .7 + i * .1, 1.05 + i * .1)); butlerHead(id, lf ? -150 + 300 * q + (i % 2) * 40 : 2070 - 300 * q - (i % 2) * 40, 330 + (i % 2) * 330, .78, fc('half', 'flat', { brows: 'angry', sweat: i === 1 ? 1 : 0, look: [lf ? 1 : -1, 0] }), lf ? .15 : -.15); });
  const up = E.back(seg(lt, .1, .5));
  const I = bt('I', t, { x: 960, y: 930, s: 1.15, aL: [lerp(-120, -150, up), lerp(135, -70, up), 10], aR: [lerp(120, 26, up), lerp(135, 70, up), -30 * up], head: { rot: -.05 }, face: fc('star', 'talk', { brows: 'angry', blush: .5 }) });
  for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t * .6; rosette(960 + Math.cos(a) * 470, 480 + Math.sin(a) * 330, 30 * pop(lt, .3 + i * .05), i % 2 ? '#9a63d0' : '#f79ab1', t); spark(960 + Math.cos(a + .4) * 560, 480 + Math.sin(a + .4) * 380, 30 * Math.max(0, Math.sin(t * 4 + i)), '#fff'); }
  withT(960, 165, pop(lt, .9, .35), -.03, () => { ribbon(0, 0, 760, 100, '#6f32ab', '#491a7c'); txt('お似合いのバトラー', 0, 4, 60, '#fff'); });
  burst(I.hl[0], I.hl[1], 50, 80 + pulse(t) * 20, 8, '#fde27a', 8, t);
}, { tr: 'wipeL', td: .3 });
// ---------- 66.35 - 74.6 : verse 1c ----------
scene(66.35, 67.1, (t, lt) => shotCall(t, lt, 4, 'K', 2), { tr: 'circle', td: .25 });
scene(67.1, 70.37, (t, lt) => {
  const sun = E.io(seg(lt, 1.3, 2.0));
  bgGarden(t, { sky: mix('#aebfd0', '#d7efff', sun) }); rect(0, 0, W, H, rgba('#5d6f86', .35 * (1 - sun)));
  if (sun > 0) { rainbow(960, 760, 620, seg(lt, 1.7, 2.5)); sunP(1560 + 0, 190, 120 * E.back(sun), t); }
  for (let i = 0; i < 3; i++) cloud(360 + i * 560 + (i - 1) * sun * 1300, 150 + (i % 2) * 60 - sun * 100, 1.9, mix('#8d9db2', '#ffffff', sun * .0 + .0));
  rain(t, 1 - sun);
  const toss = seg(lt, 1.35, 2.2);
  ld(4, t, { x: 1080, y: 900, s: .85, face: sun > .6 ? fc('happy', 'open', { blush: 1 }) : fc('sad', 'frown', { brows: 'sad', look: [0, -1] }), aL: sun > .6 ? [-110, 10, 20] : undefined, aR: sun > .6 ? [110, 10, -20] : undefined });
  const K = bt('K', t, { x: 700 + slide(lt, 0, .4, -400), y: 900, s: .95, aR: toss > 0 ? [150, lerp(0, -110, E.o(toss)), 10] : [150, 0, 20], aL: [-10, 78, -25], face: fc(sun > .5 ? 'happy' : 'open', 'talk', { blush: .5 }) });
  if (toss < 1) { const e = E.i(toss); umbrella(K.hr[0] + 20 - e * 1100, K.hr[1] - e * 900, 1.2, '#fdd146', -.05 - e * 4); }
  if (sun > .3) { burst(K.hr[0], K.hr[1] - 20, 60, 110, 8, '#fde27a', 9, t); sfx('ぱぁっ', 420, 300, 100, '#f2b705', lt, 1.6, { rot: -.1 }); for (let i = 0; i < 8; i++) spark(200 + i * 220, 620 - (i % 3) * 150, 26 * Math.max(0, Math.sin(t * 4 + i * 2)), '#fff'); }
}, { tr: 'wipeD', td: .3 });
scene(70.37, 71.2, (t, lt) => shotCall(t, lt, 4, 'S', 3), { tr: 'circle', td: .25 });
scene(71.2, 74.6, (t, lt) => {
  const eat = seg(lt, 1.42, 1.9), after = seg(lt, 2.0, 2.2), ok = seg(lt, 2.75, 2.95);
  bgPop(t, '#e3f3da', '#d2ebc6', 'dots', { r: 22, sp: 140 });
  const sh = lt < 1.4 ? Math.sin(t * 40) * 3 : 0;
  const S = bt('S', t, { x: 860 + sh, y: 1060, s: 1.25, still: true, aR: ok > 0 ? [150, -40, -10] : [lerp(150, 60, E.io(eat)) * (1 - after) + 120 * after, lerp(20, -55, E.io(eat)) * (1 - after) + 60 * after, 30], aL: [-110, 110], head: { rot: ok > 0 ? .06 : -.03, dy: after * (1 - ok) * 6 },
    face: ok > 0 ? fc('gt', 'grit', { tears: 1, blush: .5 }) : after > 0 ? fc('closed', 'wavy', { tears: seg(lt, 2.1, 2.6), sweat: 1, brows: 'sad' }) : eat > .5 ? fc('closed', 'open', { sweat: 1, brows: 'sad' }) : fc('dot', 'wavy', { sweat: 1, brows: 'sad', look: [.5, 1] }),
    hr: ok > 0 ? () => { rrect(-12, -62, 24, 44, 12, '#fff'); } : after > 0 ? null : () => forkP(0, 10, 1.1, -.5, true) });
  tableP(840, '#fff', '#cfe8c0'); peasPlate(1010, 850, 1.7, after > 0 ? 8 : 9);
  if (lt < 1.4) { for (let i = 0; i < 3; i++) qline(1150 + i * 40, 660, 1170 + i * 40 + Math.sin(t * 6 + i) * 14, 610, 1150 + i * 40, 560, 'rgba(110,160,90,.6)', 8); sfx('うっ…', 1300, 420, 90, '#5b986e', lt, .2, { end: 1.4, wob: .05 }); }
  if (after > 0 && ok <= 0) sfx('ぱくっ', 1320, 380, 110, '#5b986e', lt, 2.0, { rot: .1 });
  if (ok > 0) { sfx('たべた！', 1340, 360, 110, '#a51c28', lt, 2.75, { rot: -.08 }); burst(S.hr[0], S.hr[1] - 40, 70, 120, 8, '#fde27a', 9, t); }
  const q = E.back(seg(lt, .5, .85)); withT(300, 1150 - 560 * q, 1, 0, () => { circ(0, 0, 175, '#fff'); circ(0, 0, 160, '#fdebf0'); ladyHead(0, 14, .7, ok > 0 ? fc('happy', 'open', { blush: 1 }) : fc('wide', 'o', { blush: .6, look: [1, 0] }), Math.sin(t * 6) * .04); });
  if (ok > 0) sfx('えらい！', 300, 330, 70, '#f26286', lt, 2.9, { rot: -.1 });
}, { tr: 'wipeR', td: .3 });
// ---------- 74.63 - 80.5 : Kishi's dark side ----------
scene(74.63, 76.41, (t, lt) => {
  bgFill('#2c1b47'); stripes('#34205a', 90, -Math.PI / 3, t * 60); vignette('#000000', .5);
  bt('I', t, { x: 520, y: 1330, s: 1.7, still: true, aL: [-90, 120], aR: [60, 40, 40], head: { rot: -.06 }, face: fc('half', 'talk', { brows: 'angry', shade: 1, look: [1, 0] }) });
  const p = E.back(seg(lt, .15, .5)); withT(1330, 400, p, 0, () => { ell(0, 0, 470, 300, '#fff'); circ(-420, 250, 46, '#fff'); circ(-500, 330, 26, '#fff'); ['R', 'K', 'S', 'J'].forEach((id, i) => butlerHead(id, -290 + i * 193, 10 + (i % 2) * 40 + Math.sin(t * 5 + i) * 10, .44, [fc('happy', 'cat', { blush: 1 }), fc('dizzy', 'open', { blush: 1 }), fc('closed', 'wavy', { blush: 1 }), fc('heart', 'cat', { blush: 1 })][i], Math.sin(t * 4 + i) * .12)); txt('ふぬけ〜', 0, -205, 54, '#8a7aa0'); });
}, { tr: 'blinds', td: .25 });
scene(76.41, 79.07, (t, lt) => {
  const sh = shake(t, 7); bgFill('#2c1b47'); rays(960, 600, 20, '#3d2466', t * .8); flames(t, '#e8414e', '#ffb14a', 12, 1.5 * E.o(seg(lt, 0, .5)));
  cam(960 + sh[0], 540 + sh[1], tw(lt, 0, 2.6, 1, 1.18, E.o), () => {
    speedLines(t, 'rgba(255,220,150,.3)', 40, 520);
    bt('I', t, { x: 960, y: 1330, s: 1.75, still: true, aR: [120, -130 + Math.sin(t * 30) * 5, -30], aL: [-80, 40, -40], head: { rot: Math.sin(t * 30) * .015 }, face: fc('angry', 'big', { brows: 'angry', anger: 1.2 + pulse(t) * .3, shade: .6 }) });
  });
}, { tr: 'wipeU', td: .2 });
scene(79.07, 80.5, (t, lt) => {
  bgPop(t, '#f3ecfb', '#e6d6f6', 'dots', { r: 14, sp: 110 });
  const I = bt('I', t, { x: 960, y: 960, s: 1.25, still: true, sq: hit(lt, 0, .12) * .06, aR: [34, -6, -40], aL: [-110, 120], head: { rot: .05 }, face: fc('closed', lt > .25 ? 'talk' : 'smile', { sweat: 1, blush: .9 }) });
  for (let i = 0; i < 6; i++) spark(480 + i * 190, 240 + (i % 2) * 380, 30 * Math.max(0, Math.sin(t * 5 + i * 2)), '#c9a6f0');
  sfx('コホン…', 1380, 330, 84, '#6f32ab', lt, .12, { rot: .08 }); flower(520, 900, 1.2, seg(lt, .1, .5), '#c9a6f0', t); flower(1400, 900, 1.2, seg(lt, .2, .6), '#f79ab1', t);
});
// ---------- 80.5 - 88.85 : choose me! / My tiara ----------
function chooseMe(t, lt, ids, t0s, outfit) {
  const kneelT = t0s[4] + 1.0, k = seg(t, kneelT, kneelT + .3);
  if (k <= 0) {
    bgFill('#fff'); const w = W / 5;
    ids.forEach((id, i) => { const b = BUT[id]; if (t < t0s[i]) { panel(i * w, w, '#f6f1e6', () => { txt('?', i * w + w / 2, 480, 200, '#fff', { f: F.en, w: 700 }); }); return; } const l = t - t0s[i], p = E.back(seg(l, 0, .25)); panel(i * w, w, b.pale, () => { rays(i * w + w / 2, 520, 12, 'rgba(255,255,255,.5)', t * .6); bt(id, t, { x: i * w + w / 2, y: 900 + (1 - p) * 700, s: .78, bobA: 10, aR: [120, -120 - pulse(t) * 12, -20], aL: [-10, 78, -25], face: fc(i === 4 ? 'star' : 'open', i === 4 || l < .55 ? 'talk' : 'open', { brows: 'up', blush: .5 }) }); sfx('私を！', i * w + w / 2, 160 + (i % 2) * 40, 86, id === 'K' ? '#e9a800' : b.col, l, .02, { rot: (i % 2 ? .08 : -.08) }); }); });
  } else {
    bgPop(t, '#ffe9ee', '#ffd6e0', 'rays', { n: 18, sp: .4, y: 560 }); hearts(t, 12, ['#f79ab1', '#fff'], { r: 24 });
    const q = E.back(k), xs = [280, 600, 1320, 1640], oth = ids.slice(0, 4);
    oth.forEach((id, i) => bt(id, t, { x: xs[i], y: 830 + (1 - q) * 300, s: .62, flip: i < 2 ? false : true, kneel: 1, still: true, aR: [150, 30 + Math.sin(t * 6 + i) * 6, 10], aL: [-10, 78, -25], face: fc('happy', 'open', { blush: .7 }) }));
    const R = bt(ids[4], t, { x: 960, y: 900, s: 1.05 * (.7 + .3 * q), kneel: 1, still: true, aR: [140, 10 + Math.sin(t * 6) * 6, 10], aL: [-10, 78, -25], head: { rot: .04 }, face: fc('happy', 'talk', { blush: .8 }), hr: () => { withT(26, -40, 1, .3, () => flower(0, 30, .5, 1, '#f26286', t, 80)); } });
    withT(960, 140, pop(t, kneelT + .1, .35), -.02, () => { ribbon(0, 0, 820, 104, '#f26286', '#d94a70'); txt('お選びください', 0, 4, 64, '#fff'); });
  }
}
scene(80.5, 85.09, (t, lt) => chooseMe(t, lt, ['J', 'K', 'S', 'I', 'R'], [80.5, 81.02, 81.54, 82.06, 82.58], 4), { tr: 'bars', td: .25 });
function myTiara(t, lt, outfit, o = {}) {
  bgFill('#fff6e0'); rays(960, 470, 20, '#ffeec4', t * .2); const gl = 1 + pulse(t, 3) * .05;
  circ(960, 480, 470 * gl * E.back(seg(lt, 0, .5)), 'rgba(255,255,255,.75)'); circ(960, 480, 400 * gl * E.back(seg(lt, 0, .5)), '#ffe9ee');
  const ring = (front) => ORDER.forEach((id, i) => { const a = i * TAU / 5 + t * .55, sn = Math.sin(a), p = pop(lt, .25 + i * .07, .3); if ((sn > 0) !== front || p <= 0) return; butlerHead(id, 960 + Math.cos(a) * 700, 470 + sn * 215, (.5 + sn * .1) * p, fc('heart', 'open', { blush: 1, tt: t }), Math.cos(a) * -.12); });
  ring(false);
  const z = E.back(seg(lt, 0, .45)), shy = seg(lt, 1.7, 2.0);
  const L = ld(outfit, t, { x: 960, y: 880, s: .98 * (.6 + .4 * z), aL: shy > .5 ? [-46, 20, 30] : undefined, aR: shy > .5 ? [46, 20, -30] : undefined, face: shy > .5 ? fc('closed', 'smile', { blush: 1.2 }) : fc('wide', 'o', { blush: .9, brows: 'up' }), head: { rot: Math.sin(t * 2.5) * .04 } });
  ring(true);
  twinkles(t, 26, '#f2b705', { r: 26, h: 860, seed: 5 });
  withT(470, 150, 1, -.07, () => ktxt('My tiara', 0, 0, 150, '#e8557a', t, t - lt + .1, { f: F.sc, w: 400, sw: 30, sc: '#fff', sh: 'rgba(160,80,90,.22)', st: .06, gap: 2 }));
  const p = pop(lt, .9, .35); withT(1480, 190, p, .04, () => { rrect(-240, -62, 480, 124, 62, '#fff'); rrect(-228, -50, 456, 100, 50, '#f26286'); txt('＝ わたしのお嬢様', 0, 3, 46, '#fff'); poly([-150, 55, -90, 55, -250, 150], '#fff'); poly([-142, 48, -100, 48, -232, 132], '#f26286'); });
  for (let i = 0; i < 6; i++) heart(L.top[0] - 250 + i * 100, L.top[1] - 30 - Math.abs(i - 2.5) * -14 + bob(t + i * .1, 10), 20 * pop(lt, 1.2 + i * .05), i % 2 ? '#f79ab1' : '#f26286');
}
scene(85.09, 89.1, (t, lt) => myTiara(t, lt, 4), { tr: 'heart', td: .4 });
