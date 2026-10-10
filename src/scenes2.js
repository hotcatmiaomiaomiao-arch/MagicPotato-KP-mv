// ===== scenes part 2 : 89.1 - 171.15 =====
const ALLC = ['#222121', '#e9a800', '#a51c28', '#0aa3c0', '#6f32ab'];
// ---------- chorus (shared by 1st and last chorus) ----------
function chBachi(t, lt) {
  bgPop(t, '#fff3c4', '#ffe58a', 'rays', { n: 20, sp: .7, y: 520 });
  const xs = [250, 605, 960, 1315, 1670];
  ['K', 'J', 'R', 'S', 'I'].forEach((id, i) => { const p = E.back(seg(lt, i * .05, .3 + i * .05)), pu = pulse(t, 5) * 16; bt(id, t, { x: xs[i], y: 900 + (1 - p) * 600, s: .74, bobA: 14, flip: i > 2, lean: (i < 2 ? .1 : i > 2 ? .1 : 0), aL: [-80, 30 - pu, -40], aR: [86, 20 - pu, 40], face: fc('angry', i % 2 ? 'big' : 'grit', { brows: 'angry' }) }); });
  for (let i = 0; i < 4; i++) if (lt > .3) zap(xs[i] + 110, 420 + (i % 2) * 60, xs[i + 1] - 110, 470 - (i % 2) * 60, t + i * .3, i % 2 ? '#ff8a3c' : '#ffd54a');
  ktxt('バチバチ', 960, 150, 190, ['#e8414e', '#e9a800'], t, t - lt, { sw: 44, sc: '#fff', sh: 'rgba(120,80,0,.25)', gap: 12, st: .05, tilt: .1, jump: 14 });
}
function chAchi(t, lt) {
  bgPop(t, '#ffd9d2', '#ffc2b8', 'dots', { r: 22, sp: 140 }); flames(t, '#ff7a6a', '#ffc46a', 11, 1.25 * E.o(seg(lt, 0, .4)));
  const xs = [250, 605, 960, 1315, 1670];
  ['I', 'S', 'J', 'K', 'R'].forEach((id, i) => { const p = E.back(seg(lt, i * .05, .3 + i * .05)), sw = Math.sin(beatOf(t) * Math.PI + i) * .06; const B = bt(id, t, { x: xs[i], y: 900 + (1 - p) * 600, s: .74, bobA: 12, rot: sw, aL: [-36, 62, -30], aR: [36, 62, 30], head: { rot: sw }, face: fc('heart', 'open', { blush: 1.2 }) }); heart(B.head[0], B.head[1] + 300 * .74 - 60, (46 + pulse(t, 4) * 26) * p, '#f26286'); });
  hearts(t, 16, ['#f26286', '#fff', '#ff9a8a'], { r: 30, speed: 220 });
  ktxt('アチアチ', 620, 150, 170, ['#ff5a4a', '#ff8a3c'], t, t - lt, { sw: 42, sc: '#fff', sh: 'rgba(150,40,20,.25)', gap: 10, st: .05, tilt: .1, wave: 8 });
  sfx('Fall in Love', 1400, 170, 96, '#f26286', lt, .95, { f: F.sc, w: 400, rot: -.06, sw: 26 });
}
function chGachi(t, lt, outfit) {
  bgPop(t, '#ffe9ee', '#ffd6e0', 'rays', { n: 18, sp: .3, y: 560 }); hearts(t, 14, ['#f79ab1', '#fff'], { r: 24 });
  const xs = [250, 520, 1400, 1670], ids = ['K', 'J', 'S', 'I'], kn = E.io(seg(lt, 2.0, 2.4));
  ids.forEach((id, i) => { const sd = i < 2 ? 1 : -1, sw = Math.sin(beatOf(t) * Math.PI) * 26; bt(id, t, { x: xs[i] + sw * (1 - kn), y: 890, s: .7, flip: i > 1, kneel: kn, still: kn > .3, aR: [150, lerp(-40, 30, kn) - pulse(t) * 14 * (1 - kn), 10], aL: [lerp(-120, -10, kn), lerp(60, 78, kn), -25 * kn], face: fc(kn > .5 ? 'happy' : 'open', 'talk', { blush: .8, brows: 'up' }) }); });
  bt('R', t, { x: 960, y: 1000, s: .0001, shadow: false });
  const L = ld(outfit, t, { x: 960, y: 880, s: .92, aL: [-60, 30, 30], aR: [60, 30, -30], face: fc(kn > .5 ? 'closed' : 'wide', kn > .5 ? 'smile' : 'o', { blush: 1.2 }), head: { rot: Math.sin(t * 3) * .04 } });
  const Rk = bt('R', t, { x: 1180 - 0, y: 905, s: .78, flip: true, kneel: kn, still: kn > .3, aR: [150, lerp(-40, 20, kn), 10], aL: [-10, 78, -25], face: fc('happy', 'talk', { blush: .8 }), hr: kn > .6 ? () => heart(30, -50, 40 + pulse(t, 4) * 10, '#f26286') : undefined });
  ktxt('ガチガチ', 500, 140, 150, ['#f26286', '#e8557a'], t, t - lt, { sw: 38, sc: '#fff', sh: 'rgba(150,60,80,.22)', gap: 8, st: .05, tilt: .08 });
  withT(1400, 150, pop(lt, 1.3, .35), .04, () => { ribbon(0, 0, 620, 96, '#f26286', '#d94a70'); txt('ガチで恋してます', 0, 4, 56, '#fff'); });
}
function nightRoom(t, c0 = '#2b3566', c1 = '#55579a') { bgNight(t, { c0, c1 }); windowP(1500, 110, 330, 500, '#1d2550', t, true); curtainP(1290, 70, 620, '#7d7cc4', 1, 120); curtainP(1710, 70, 620, '#7d7cc4', -1, 120); rect(0, FY, W, H - FY, '#3c3f78'); ell(960, FY + 80, 760, 110, 'rgba(255,240,190,.12)'); }
function chSugao(t, lt, who, outfit) { // 誰もが知らない素顔 : lady without tiara, relaxed
  nightRoom(t); const g = ctx.createRadialGradient(700, 560, 60, 700, 560, 620); g.addColorStop(0, 'rgba(255,236,180,.42)'); g.addColorStop(1, 'rgba(255,236,180,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  rrect(250, 700, 240, 22, 8, '#8a6a8a'); rect(360, 720, 20, 130, '#8a6a8a'); rrect(300, 838, 140, 14, 7, '#8a6a8a'); rrect(318, 668, 110, 34, 12, '#f79ab1'); tiaraIcon(372, 640, .62, Math.sin(t * 2) * .03); spark(440, 590, 20 * Math.max(0, Math.sin(t * 4)), '#fff3c0');
  const yawn = seg(lt, .5, 1.0) * (1 - seg(lt, 1.4, 1.7));
  ld(outfit, t, { x: 800, y: 900, s: .95, tiara: false, bobA: 2, aL: yawn > .3 ? [-60, -40, 40] : [-90, 110], aR: [70, 30, -30], head: { rot: -.07, dy: 4 }, face: yawn > .3 ? fc('closed', 'o', { blush: .8 }) : fc('half', 'smile', { blush: .9 }) });
  for (let i = 0; i < 3; i++) alpha(.5 + .5 * Math.sin(t * 3 + i), () => txt('z', 960 + i * 46, 430 - i * 50, 50 + i * 16, '#fff3c0', { f: F.en, w: 600 }));
  const p = E.o5(seg(lt, .15, .6)); bt(who, t, { x: 1330 + (1 - p) * 500, y: 900, s: .95, flip: true, bobA: 2, aR: [40, 40, -40], aL: [-110, 125], head: { rot: .07 }, face: fc('happy', 'talk', { blush: .9 }) });
  heart(1130, 330 + bob(t, 10), 34 * pop(lt, 1.1, .3), '#f79ab1');
}
function chYowasa(t, lt, who, outfit) { // 弱さも全部 受け止めよう
  const b = BUT[who]; bgPop(t, mix(b.pale, '#ffffff', .3), b.pale, 'dots', { r: 18, sp: 130 });
  const run = E.io(seg(lt, .25, 1.05)), hug = seg(lt, 1.0, 1.25);
  const B = bt(who, t, { x: 1250, y: 900, s: 1, flip: true, bobA: 3, aL: [-150, 40 - hug * 20, 10], aR: [150 - hug * 40, 40 - hug * 20, -10], face: fc(hug > .5 ? 'closed' : 'happy', 'talk', { blush: .7 }), head: { rot: .05 } });
  ld(outfit, t, { x: lerp(560, 1010, run), y: 900, s: .92, tiara: true, lift: -Math.abs(Math.sin(lt * 14)) * 12 * (run < 1 ? 1 : 0), lean: .08 * (1 - hug), aL: [-90, 60, 20], aR: [90, 40, -20], face: hug > .5 ? fc('closed', 'smile', { blush: 1, tears: .5 }) : fc('sad', 'wavy', { tears: 1, brows: 'sad' }), head: { rot: .06 + hug * .06 } });
  if (hug > 0) { burst(1120, 520, 250, 300 + pulse(t) * 30, 12, '#fff', 10, t * .4); for (let i = 0; i < 5; i++) heart(900 + i * 110, 230 + bob(t + i * .12, 14) + Math.abs(i - 2) * 30, 30 * pop(lt, 1.1 + i * .06), i % 2 ? '#f79ab1' : '#f26286'); sfx('ぎゅっ', 520, 380, 120, id2col(who), lt, 1.1, { rot: -.1 }); }
}
const id2col = id => id === 'K' ? '#e9a800' : BUT[id].col;
function chOshitai(t, lt, who) {
  const b = BUT[who]; bgFill(mix(b.coat, '#1a1020', .55)); rays(960, 560, 18, 'rgba(255,255,255,.06)', t * .2); spotlight(960, 130, 470, 'rgba(255,245,220,.22)', 905); petals(t, 30, who === 'S' ? '#e8667c' : '#c9a6f0');
  const k = E.io(seg(lt, .1, .55));
  const B = bt(who, t, { x: 960, y: 920, s: 1.2, kneel: k, still: true, aL: [lerp(-120, -6, k), lerp(135, 70, k), -30 * k], aR: [lerp(120, 160, k), lerp(135, 10, k), 10], head: { rot: .05 * k, dy: 4 * k }, face: fc(lt > .9 ? 'open' : 'closed', 'talk', { blush: 1 }), hr: () => withT(30, -30, 1, .25, () => flower(0, 40, .8, seg(lt, .5, .9), '#f26286', t, 110)) });
  twinkles(t, 18, '#fff3c0', { r: 22, h: 800, seed: 9 });
  ktxt('お慕いします', 960, 150, 120, '#fff', t, t - lt + .15, { sw: 30, sc: id2col(who), gap: 10, st: .07, wave: 5 });
}
function chAllKneel(t, lt, outfit) {
  bgPop(t, '#fff6e0', '#ffeec4', 'rays', { n: 20, sp: .25, y: 480 }); circ(960, 500, 430 + pulse(t, 3) * 20, 'rgba(255,255,255,.7)');
  const xs = [250, 540, 1380, 1670];
  ['K', 'J', 'S', 'I'].forEach((id, i) => { const p = E.back(seg(lt, i * .06, .35 + i * .06)); bt(id, t, { x: xs[i], y: 900 + (1 - p) * 500, s: .72, flip: i > 1, kneel: 1, still: true, aR: [150, 10 + Math.sin(t * 5 + i) * 8, 10], aL: [-10, 78, -25], face: fc('happy', 'open', { blush: 1 }), hr: () => heart(28, -42, 30 + pulse(t, 4) * 8, '#f26286') }); });
  const L = ld(outfit, t, { x: 960, y: 890, s: 1, aL: [-120, 20, 20], aR: [120, 20, -20], face: fc('happy', 'open', { blush: 1.2 }), head: { rot: Math.sin(t * 3) * .05 } });
  const p = E.back(seg(lt, .2, .55)); bt('R', t, { x: 960, y: 1075 + (1 - p) * 400, s: .5, kneel: 1, still: true, aR: [150, -30, 10], aL: [-150, -30, -10], face: fc('happy', 'open', { blush: 1 }), shadow: false });
  ktxt('お嬢様', 960, 135, 150, '#f26286', t, t - lt, { sw: 36, sc: '#fff', sh: 'rgba(150,60,80,.22)', gap: 20, st: .08, tilt: .06, jump: 12 });
  if (lt > 1.2) { for (let i = 0; i < 2; i++) sfx('hoo!', i ? 1560 : 360, 330, 90, i ? '#0aa3c0' : '#e9a800', lt, 1.25 + i * .12, { f: F.en, w: 700, rot: i ? .12 : -.12 }); }
  confetti(t, 50, ['#222121', '#fdd146', '#c9404c', '#0bb8d6', '#9a63d0', '#f79ab1'], { speed: 260 });
}
scene(89.1, 91.08, (t, lt) => chBachi(t, lt), { tr: 'bars', td: .25 });
scene(91.08, 93.09, (t, lt) => chAchi(t, lt), { tr: 'wipeU', td: .25 });
scene(93.09, 97.35, (t, lt) => chGachi(t, lt, 4), { tr: 'heart', td: .35 });
scene(97.35, 99.61, (t, lt) => chSugao(t, lt, 'J', 4), { tr: 'fade', td: .4 });
scene(99.61, 101.62, (t, lt) => chYowasa(t, lt, 'K', 4), { tr: 'wipeL', td: .3 });
scene(101.62, 103.4, (t, lt) => chOshitai(t, lt, 'S'), { tr: 'circle', td: .3 });
scene(103.4, 106.18, (t, lt) => chAllKneel(t, lt, 4), { tr: 'star', td: .3 });
// ---------- hook 2 ----------
function hookWords(t, base) { const words = [['秘密裏', 0, '#3a2a22'], ['激烈', 1.05, '#e8414e'], ['執事競争', 1.85, '#6f32ab']]; words.forEach(([s, d, c], i) => { const t0 = base + d, t1 = base + (i < 2 ? words[i + 1][1] : 3.1); if (t >= t0 && t < t1 + .1) alpha(1 - seg(t, t1 - .05, t1 + .1), () => ktxt(s, 960, 150, 170, c, t, t0, { sw: 42, sc: '#fff', sh: 'rgba(0,0,0,.18)', gap: 14, st: .05, tilt: .06 })); }); [[3.1, 480, 170, -.1], [3.45, 1440, 190, .1], [3.75, 960, 150, 0]].forEach(([d, x, y, r], i) => { const t0 = base + d; if (t >= t0) { const p = pop(t, t0, .22); spiky(x, y, 190 * p, 12, .28, '#fff', r); spiky(x, y, 170 * p, 12, .28, ['#f2b705', '#0aa5c2', '#f26286'][i], r); txt('fight!', x, y + 4, 86 * p, '#fff', { f: F.en, w: 700, rot: r }); } }); }
scene(106.18, 110.2, (t, lt) => { battlePanels(t, lt, ['I', 'S', 'R', 'K', 'J'], { face: (id, i) => fc(i % 2 ? 'angry' : 'gt', i % 2 ? 'big' : 'grit', { brows: 'angry', anger: i === 2 ? 1 : 0 }) }); hookWords(t, 106.2); }, { tr: 'bars', td: .3 });
scene(110.2, 111.3, (t, lt) => faceOff(t, lt, 'S', 'I'), { tr: 'wipeR', td: .15 });
scene(111.3, 112.47, (t, lt) => faceOff(t, lt, 'J', 'K', 'R'), { tr: 'wipeL', td: .15 });
scene(112.47, 115.0, (t, lt) => titleSlam(t, lt), { tr: 'star', td: .3 });
// ---------- 115 - 122.27 : interlude, outfit change + race ----------
scene(115.0, 118.7, (t, lt) => {
  bgRoom(t, '#e9f3fc', '#dcebf9', '#ecd0a8'); windowP(330, 130, 280, 460, '#cfe9fb', t); curtainP(150, 90, 580, '#a9d2fa', 1, 110); curtainP(510, 90, 580, '#a9d2fa', -1, 110);
  rrect(1480, 250, 330, 600, 16, '#c79a6a'); rrect(1500, 270, 140, 560, 10, '#dab488'); rrect(1650, 270, 140, 560, 10, '#dab488'); circ(1632, 550, 9, '#e6b247'); circ(1658, 550, 9, '#e6b247');
  const sw = seg(lt, 1.45, 1.75), out = E.io(seg(lt, 1.9, 2.5));
  const lx = lt < 1.6 ? tw(lt, 0, 1.2, 520, 960) : lerp(960, 960, out), walk = lt < 1.2 ? Math.abs(Math.sin(lt * 10)) * 10 : 0;
  if (lt < 1.6) ld(4, t, { x: lx, y: 900, s: .9, lift: -walk, face: fc('happy', 'smile', { blush: .6 }) });
  else if (out > 0) ld(2, t, { x: 960, y: 900, s: .9 * (.3 + .7 * E.back(seg(lt, 1.9, 2.4))), aL: [-130, 30, 20], aR: [130, 30, -20], sway: Math.sin(lt * 5) * .8, face: fc('happy', 'open', { blush: 1 }) });
  // folding screen
  const sy = lt < 1.6 ? (1 - E.o(seg(lt, .9, 1.4))) * -900 : E.i(seg(lt, 1.85, 2.3)) * -900;
  for (let i = 0; i < 3; i++) { const x = 720 + i * 160; rrect(x, 330 + sy + (i % 2) * 14, 164, 590, 14, i % 2 ? '#f9c8d4' : '#fbdbe3'); rosette(x + 82, 470 + sy, 26, '#fff', t); rosette(x + 82, 690 + sy, 20, '#f79ab1', t); }
  if (sw > 0 && lt < 2.4) { for (let i = 0; i < 8; i++) { const a = i * TAU / 8 + t * 4; spark(960 + Math.cos(a) * 300, 580 + Math.sin(a) * 300, 44 * Math.sin(seg(lt, 1.45, 2.4) * Math.PI), i % 2 ? '#fde27a' : '#fff'); } sfx('おきがえ', 960, 200, 110, '#3d689e', lt, 1.5, { end: 2.5, wob: .04 }); }
  if (lt > 2.4) { sfx('じゃーん！', 960, 170, 120, '#3d689e', lt, 2.4, { rot: -.04 }); burst(960, 560, 380, 450 + pulse(t) * 30, 14, '#fff', 12, t * .5); }
  ['K', 'I'].forEach((id, i) => { const p = E.back(seg(lt, 2.6 + i * .1, 2.95 + i * .1)); butlerHead(id, i ? 2070 - 330 * p : -150 + 330 * p, 700, .8, fc('heart', 'open', { blush: 1, tt: t }), i ? -.2 : .2); });
}, { tr: 'wipeR', td: .4 });
scene(118.7, 122.27, (t, lt) => {
  bgFill('#fdf1d8'); const sx = lt * 900; ctx.fillStyle = '#fbe6c0'; for (let x = -(sx * .5 % 160); x < W; x += 160) ctx.fillRect(x, 0, 80, FY - 96);
  for (let i = 0; i < 4; i++) { const x = ((i * 700 - sx * .5) % 2800 + 2800) % 2800 - 300; windowP(x, 150, 220, 400, '#cfe9fb', t); }
  rect(0, FY - 100, W, 12, '#fffaf0'); rect(0, FY - 88, W, 88, '#e9cfa6'); rect(0, FY, W, H - FY, '#ecd0a8'); poly([0, FY + 40, W, FY + 40, W, FY + 170, 0, FY + 170], '#f08a9a');
  for (let i = 0; i < 12; i++) { const x = ((i * 200 - sx * 1.6) % 2400 + 2400) % 2400 - 200; rect(x, 300 + (i % 5) * 110, 150, 8, 'rgba(255,255,255,.8)'); }
  const ids = ['I', 'K', 'R', 'J', 'S'];
  ids.forEach((id, i) => { const ph = lt * 13 + i * 1.3, lead = Math.sin(lt * 1.9 + i * 1.7) * 90, x = 330 + i * 320 + lead + slide(lt, i * .05, .5, -900), s1 = Math.sin(ph), c1 = Math.cos(ph);
    bt(id, t, { x, y: 900, s: .72, still: true, lift: -Math.abs(s1) * 16, lean: .22, fL: [s1 * 46, -Math.max(0, c1) * 34], fR: [-s1 * 46, -Math.max(0, -c1) * 34], aL: [-100 - s1 * 50, 70, -30], aR: [110 + s1 * 50, 40, 30], face: fc(i % 2 ? 'gt' : 'angry', i % 2 ? 'big' : 'grit', { brows: 'angry', sweat: 1 }),
      hr: [() => { rrect(-40, -40, 80, 34, 10, '#fff'); rrect(-40, -40, 80, 12, 6, '#c9a6f0'); }, () => cakeP(0, -52, .6), null, () => teapot(0, -50, .7), () => letter(0, -46, .5, .2)][i] });
    for (let k = 0; k < 2; k++) cloud(x - 150 - k * 70, 880 - k * 10, .28 * (1 + Math.sin(ph + k)) * .9, 'rgba(255,255,255,.9)'); });
  ktxt('お嬢様のもとへ！', 960, 150, 110, ALLC, t, t - lt + .3, { sw: 30, sc: '#fff', sh: 'rgba(120,80,50,.2)', gap: 8, st: .05, tilt: .06, jump: 10 });
  sfx('ダダダダ', 1560, 330, 80, '#b98a5a', lt, .5, { rot: .1, wob: .05 });
}, { tr: 'wipeL', td: .3 });
// ---------- 122.27 - 138.37 : verse 2 ----------
scene(122.27, 123.1, (t, lt) => shotCall(t, lt, 2, 'I', 0), { tr: 'circle', td: .25 });
scene(123.1, 126.78, (t, lt) => {
  bgRoom(t, '#efe6fa', '#e6d6f6', '#ecd0a8'); windowP(380, 120, 280, 460, '#cfe9fb', t); sofa(800, 900, 1.25, '#c9a6f0', '#b58fe0');
  const tap = lt * TAU / BP * 2, a = Math.max(0, Math.sin(tap)) * 22, b = Math.max(0, Math.sin(tap + Math.PI)) * 22, good = seg(lt, 1.7, 2.0);
  ld(2, t, { x: 800, y: 1000, s: 1, still: true, sq: (a + b) * .0006, face: good > .5 ? fc('happy', 'cat', { blush: 1.2 }) : fc('closed', 'smile', { blush: .8 }), head: { rot: Math.sin(tap) * .025, dy: 3 } });
  const I = bt('I', t, { x: 1150, y: 930, s: 1.1, still: true, lean: -.16, aL: [-255, 46 + a, 30], aR: [-185, 60 + b, -60], head: { rot: -.07 }, face: fc('happy', 'talk', { blush: .6, sweat: seg(lt, 2.4, 2.8) }) });
  for (let k = 0; k < 7; k++) { const t0 = .1 + k * BP / 1; sfx('トン', 470 + (k % 2) * 120, 270 + (k % 3) * 60, 70, '#6f32ab', lt, t0, { end: t0 + .42, rot: -.15 + (k % 2) * .25 }); }
  if (good > 0) { for (let i = 0; i < 4; i++) note(980 + i * 60, 330 - i * 40 + Math.sin(t * 4 + i) * 12, .7, '#f79ab1', 0, i % 2 === 0); withT(1500, 250, pop(lt, 1.8, .3), .05, () => { bubble(0, 0, 360, 130, '#fff', -1); txt('きもちいい〜', 0, 2, 44, '#f26286'); }); }
}, { tr: 'wipeU', td: .3 });
scene(126.78, 127.55, (t, lt) => shotCall(t, lt, 2, 'K', 1), { tr: 'circle', td: .25 });
scene(127.55, 131.29, (t, lt) => {
  bgPop(t, '#fff3c4', '#ffe9a0', 'check', { sz: 110 }); rect(0, 0, W, H, 'rgba(255,255,255,.35)');
  const aan = lt > 1.23, l2 = lt - 1.23, feed = E.io(seg(l2, .2, .9)), bite = seg(l2, 1.2, 1.4);
  const present = E.back(seg(lt, .1, .5));
  ld(2, t, { x: 1340, y: 960, s: 1.05, still: aan, lean: -.05 * feed, face: bite > .5 ? fc('happy', 'cat', { blush: 1.3 }) : aan ? fc('closed', 'open', { blush: 1 }) : fc('star', 'open', { blush: .8 }), head: { rot: -.05 * feed } });
  const K = bt('K', t, { x: 620, y: 960, s: 1.1, still: aan, lean: .1 * feed, aL: [-130, 60, -10], aR: aan ? [lerp(150, 330, feed), lerp(40, -40, feed), 10] : [150, 20, 20], face: fc('happy', aan ? 'open' : 'talk', { blush: .8 }),
    hl: () => cakeP(0, -62 - (1 - present) * 0, 1.0 * present), hr: aan ? () => { withT(0, 0, 1, 1.25, () => forkP(0, 10, 1, 0, false)); if (bite < .5) { poly([92, -70, 150, -52, 150, -14, 92, -32], '#fff6e4'); poly([92, -70, 150, -52, 150, -42, 92, -60], '#fff'); circ(120, -66, 10, '#ee4b62'); } } : undefined });
  if (!aan) { for (let i = 0; i < 6; i++) spark(380 + i * 70, 330 + (i % 2) * 70, 26 * Math.max(0, Math.sin(t * 5 + i * 1.4)), '#f2b705'); withT(960, 150, pop(lt, .3, .3), -.03, () => { ribbon(0, 0, 520, 90, '#f2b705', '#c2941e'); txt('手作りケーキ', 0, 4, 54, '#fff'); }); }
  else { ktxt('あーん', 960, 170, 190, '#f26286', t, t - lt + 1.3, { sw: 44, sc: '#fff', sh: 'rgba(150,60,80,.22)', gap: 24, st: .16, wave: 10 }); for (let i = 0; i < 5; i++) heart(1180 + i * 90, 360 + bob(t + i * .1, 12) - (i % 2) * 40, 26 * pop(l2, 1.3 + i * .05), i % 2 ? '#f79ab1' : '#f26286'); if (bite > 0) sfx('もぐもぐ', 1620, 470, 64, '#e9a800', l2, 1.35, { rot: .1, wob: .05 }); }
  ['R', 'J', 'S', 'I'].forEach((id, i) => { const p = E.back(seg(lt, 2.0 + i * .08, 2.35 + i * .08)); butlerHead(id, 180 + i * 150, 1190 - 330 * p, .42, fc('angry', 'grit', { brows: 'angry', tears: .6 })); });
}, { tr: 'wipeR', td: .3 });
scene(131.29, 131.9, (t, lt) => shotCall(t, lt, 2, 'R', 2), { tr: 'circle', td: .2 });
scene(131.9, 134.55, (t, lt) => {
  const two = seg(lt, 1.1, 1.3);
  bgPop(t, '#e9e6df', '#dcd8cf', 'stripes', { w: 80 }); 
  const push = E.back(seg(lt, .1, .4)), away = E.i(seg(lt, 1.05, 1.45));
  butlerHead('K', 520 - push * 120 - away * 900, 500, 1.0, fc('gt', 'wavy', { sweat: 1 }), -.3 * push - away); butlerHead('I', 1400 + push * 120 + away * 900, 500, 1.0, fc('gt', 'big', { brows: 'angry' }), .3 * push + away);
  butlerHead('S', 300 - away * 900, 850, .7, fc('dot', 'flat', { sweat: 1 }), -.1); butlerHead('J', 1620 + away * 900, 850, .7, fc('wide', 'o', {}), .1);
  const R = bt('R', t, { x: 960, y: 1000, s: 1.2, still: two < 1, aL: two > 0 ? [-10, 78, -25] : [-200 - push * 20, 10, 10], aR: two > 0 ? [150, -50, -10] : [200 + push * 20, 10, -10], face: two > 0 ? fc('star', 'talk', { blush: .6 }) : fc('angry', 'talk', { brows: 'angry' }), head: { rot: two * .05 } });
  if (two <= 0) { sfx('しっしっ', 960, 150, 100, '#222121', lt, .2, { wob: .04 }); for (const sd of [-1, 1]) burst(960 + sd * 330, 500, 40, 80, 6, '#fff', 10, t * 3); }
  else { rays(960, 520, 16, 'rgba(255,255,255,.0)', 0); for (let i = 0; i < 8; i++) spark(960 + Math.cos(i * TAU / 8 + t) * 520, 480 + Math.sin(i * TAU / 8 + t) * 330, 36 * Math.max(.2, Math.sin(t * 4 + i)), '#f2b705'); withT(960, 150, pop(lt, 1.25, .3), -.03, () => { spiky(0, 0, 210, 16, .16, '#fff', t * .3); spiky(0, 0, 190, 16, .16, '#222121', t * .3); txt('最適', 0, 4, 120, '#fde27a'); }); }
}, { tr: 'wipeL', td: .2 });
scene(134.55, 135.2, (t, lt) => shotCall(t, lt, 2, 'J', 3), { tr: 'circle', td: .2 });
scene(135.2, 138.62, (t, lt) => {
  const two = seg(lt, 1.36, 1.56);
  bgPop(t, '#cdf1f7', '#b8e9f2', 'dots', { r: 20, sp: 130 });
  const push = E.back(seg(lt, .05, .4));
  butlerHead('R', 760 - push * 560, 520, 1.0, fc('gt', 'tri', { sweat: 1 }), -.5 * push); sfx('ぐいっ', 420, 240, 90, '#0aa3c0', lt, .1, { end: 1.4, rot: -.12 });
  const wag = Math.sin(lt * 16) * 24 * (1 - two);
  bt('J', t, { x: 960 + (1 - push) * 700, y: 1000, s: 1.2, aL: [-190 * (1 - two) - 110 * two, 30 + 90 * two, 10], aR: two > 0 ? [150, -70, -10] : [110 + wag, -60, 30], head: { rot: two > 0 ? -.05 : Math.sin(lt * 16) * .04 }, face: two > 0 ? fc('winkL', 'talk', { blush: .6 }) : fc('closed', 'talk', { brows: 'up' }) });
  if (two <= 0) ktxt('いやいや', 1380, 220, 130, '#0aa3c0', t, t - lt + .15, { sw: 32, sc: '#fff', gap: 8, st: .08, tilt: .1 });
  else { for (let i = 0; i < 7; i++) star(960 + Math.cos(i * TAU / 7 - t) * 540, 480 + Math.sin(i * TAU / 7 - t) * 340, 34, i % 2 ? '#fde27a' : '#fff', t * 2); withT(1400, 200, pop(lt, 1.5, .3), .05, () => { ribbon(0, 0, 560, 100, '#0aa3c0', '#0384a6'); txt('ふさわしい！', 0, 4, 62, '#fff'); }); }
  const an = seg(lt, 1.7, 3.3); if (an > 0) { const q = E.back(seg(lt, 1.7, 2.1)); butlerHead('S', 330, 1200 - 330 * q + Math.sin(t * 40) * 4 * an, .95, fc('half', 'flat', { brows: 'angry', anger: .6 + an * .8, shade: an }), .05); sfx('ゴゴゴ…', 330, 600, 70, '#a51c28', lt, 2.2, { wob: .06 }); }
}, { tr: 'wipeR', td: .2 });
// ---------- 138.62 - 145.36 : Sho snaps ----------
scene(138.62, 140.13, (t, lt) => {
  const sh = shake(t, 10); bgFill('#4a0d14'); rays(960, 560, 20, '#5e121b', t); flames(t, '#e8414e', '#ffb14a', 12, 1.5 * E.o(seg(lt, 0, .35)));
  cam(960 + sh[0], 540 + sh[1], tw(lt, 0, .3, 1.6, 1, E.o), () => {
    speedLines(t, 'rgba(255,200,150,.3)', 40, 540);
    [['R', 250, 260], ['K', 1670, 260], ['J', 230, 720], ['I', 1690, 720]].forEach(([id, x, y], i) => butlerHead(id, x + Math.sin(t * 50 + i) * 5, y, .62, fc('wide', 'o', { sweat: 1, brows: 'sad' }), (i % 2 ? .15 : -.15)));
    bt('S', t, { x: 960, y: 1300, s: 1.7, still: true, aL: [-130, -100 + Math.sin(t * 30) * 6, 30], aR: [130, -100 + Math.cos(t * 30) * 6, -30], head: { rot: Math.sin(t * 34) * .02 }, face: fc('angry', 'big', { brows: 'angry', anger: 1.3 + pulse(t) * .3, shade: .5 }) });
  });
  ktxt('てめえら！', 960, 160, 180, '#ffe14a', t, t - lt + .02, { sw: 44, sc: '#4a0d14', gap: 10, st: .05, tilt: .1, wave: 6 });
}, { tr: 'wipeU', td: .18 });
scene(140.13, 142.6, (t, lt) => {
  bgPop(t, '#f6d3d3', '#f0bcbc', 'rays', { n: 18, sp: 1.2, x: 960, y: 560 });
  const pull = E.back(seg(lt, .05, .4));
  ['R', 'K', 'J', 'I'].forEach((id, i) => butlerHead(id, 190 + (i % 2) * 150 + (i > 1 ? 1390 : 0), 330 + (i % 2) * 330 + Math.sin(t * 9 + i) * 8, .5, fc('wide', 'big', { brows: 'sad', sweat: 1 }), i > 1 ? .15 : -.15));
  const L = ld(2, t, { x: lerp(560, 820, pull), y: 990, s: 1.05, still: true, lean: .05 * pull, face: fc('wide', 'o', { blush: 1.4, brows: 'up' }), head: { rot: .08 * pull } });
  bt('S', t, { x: 1150, y: 990, s: 1.2, still: true, lean: -.1, aL: [-330 * pull - 60, 60, 60], aR: [150, -60 + Math.sin(t * 20) * 6, -10], head: { rot: -.06 }, face: fc('angry', 'talk', { brows: 'angry', blush: .8, anger: 1 }) });
  ktxt('俺のモン！', 960, 150, 190, '#a51c28', t, t - lt + .55, { sw: 46, sc: '#fff', sh: 'rgba(100,10,20,.25)', gap: 12, st: .07, tilt: .08 });
  for (let i = 0; i < 6; i++) heart(480 + i * 190, 330 + (i % 2) * 60 + bob(t + i * .1, 14), 30 * pop(lt, .9 + i * .05), '#f26286');
}, { tr: 'diamond', td: .25 });
scene(142.6, 145.36, (t, lt) => {
  bgPop(t, '#fbf3f3', '#f6e3e3', 'dots', { r: 14, sp: 110 });
  const frz = lt < .55, co = seg(lt, .55, .7);
  ld(2, t, { x: 640, y: 960, s: 1.0, still: true, face: fc('dizzy', 'wavy', { blush: 1.4 }), head: { rot: Math.sin(t * 5) * .06 }, aL: [-60, 20, 30], aR: [60, 20, -30] });
  bt('S', t, { x: 1200, y: 960, s: 1.15, still: true, sq: hit(lt, .55, .12) * .05, aR: frz ? [150, -60, -10] : [34, -6, -40], aL: [-110, 120], head: { rot: co * .05 }, face: frz ? fc('dot', 'flat', { sweat: 1, blush: 1 }) : fc('closed', lt > .9 && lt < 2.1 ? 'talk' : 'smile', { sweat: 1, blush: 1.2 }) });
  if (frz) for (let i = 0; i < 3; i++) circ(1380 + i * 44, 330, 13 * pop(lt, .08 + i * .12, .15), '#a51c28');
  else { sfx('ゴホン', 1500, 320, 100, '#a51c28', lt, .6, { rot: .08 }); for (let i = 0; i < 5; i++) spark(980 + i * 110, 250 + (i % 2) * 420, 28 * Math.max(0, Math.sin(t * 5 + i * 2)), '#e8a0a8'); }
  ['R', 'K', 'J', 'I'].forEach((id, i) => { const p = E.back(seg(lt, .9 + i * .08, 1.25 + i * .08)); butlerHead(id, 1260 + i * 170, 1200 - 330 * p, .44, fc('half', 'flat', { look: [-1, -1], sweat: i % 2 }), 0); });
}, { tr: 'wipeD', td: .2 });
// ---------- 145.36 - 153.84 ----------
scene(145.36, 149.6, (t, lt) => chooseMe(t, lt, ['I', 'R', 'J', 'S', 'K'], [145.36, 145.88, 146.4, 146.92, 147.44], 2), { tr: 'bars', td: .25 });
scene(149.6, 153.84, (t, lt) => myTiara(t, lt, 2), { tr: 'heart', td: .4 });
// ---------- 153.84 - 170.65 : bridge ----------
scene(153.84, 155.85, (t, lt) => {
  bgPop(t, '#e9f3fc', '#dcebf9', 'dots', { r: 18, sp: 130 }); rect(0, FY, W, H - FY, '#d6e6f5');
  const turn = E.back(seg(lt, .5, .8)), st = Math.max(0, Math.sin(lt * TAU / BP)) * 10;
  ld(2, t, { x: 960, y: 900, s: 1, still: true, lift: -st, aL: [-30, 60, 40], aR: [30, 66, -40], head: { rot: -.12 * turn, dx: -8 * turn }, face: fc('closed', 'pout', { brows: 'angry', blush: 1 }) });
  sfx('ぷいっ', 620, 250, 110, '#3d689e', lt, .5, { rot: -.12 });
  const K = bt('K', t, { x: 380 + slide(lt, 0, .4, -400), y: 900, s: .85, aR: [150, 30, 10], aL: [-120, 100], face: fc('sad', 'wavy', { sweat: 1, brows: 'sad' }), hr: () => cakeP(0, -56, .7) });
  bt('J', t, { x: 1540 + slide(lt, .1, .4, 400), y: 900, s: .85, flip: true, aR: [150, 30, 10], aL: [-120, 100], face: fc('wide', 'o', { sweat: 1, brows: 'sad' }), hr: () => teapot(0, -52, .75) });
  withT(1330, 210, pop(lt, .9, .3), .06, () => { bubble(0, 0, 400, 130, '#fff', -1); txt('今日はいらない！', 0, 2, 42, '#3d689e'); });
}, { tr: 'wipeR', td: .3 });
scene(155.85, 157.85, (t, lt) => {
  bgPop(t, '#fff3c4', '#ffe9a0', 'stripes', { w: 70 });
  const I = bt('I', t, { x: 1180, y: 1090, s: 1.4, still: true, aL: [-110, 120], aR: [110, 120], head: { rot: .04 }, face: fc('closed', 'flat', {}) });
  const hx = I.head[0], hy = I.head[1] + 150; for (const sd of [-1, 1]) for (let k = -1; k <= 1; k++) line([hx + sd * 150, hy + k * 22, hx + sd * 230, hy + k * 40 - 8], '#3a2a22', 7); circ(hx, hy - 22, 22, '#e8414e');
  for (let i = 0; i < 3; i++) alpha(.5 + .5 * Math.sin(t * 3 + i), () => txt('z', hx + 250 + i * 46, hy - 260 - i * 50, 60 + i * 16, '#6f32ab', { f: F.en, w: 600 }));
  ld(2, t, { x: 560, y: 990, s: 1.0, bobA: 16, aR: [120, 10, -20], aL: [-40, 20, 40], face: fc('gt', 'big', { blush: 1 }), head: { rot: Math.sin(t * 18) * .05 }, hr: () => { withT(10, -20, 1, .7, () => { rrect(-9, -80, 18, 80, 8, '#3a2a22'); poly([-9, -80, 9, -80, 0, -100], '#e8414e'); }); } });
  ktxt('にしし', 500, 180, 130, '#e9a800', t, t - lt + .2, { sw: 34, sc: '#fff', gap: 10, st: .1, tilt: .12, jump: 12 });
}, { tr: 'wipeL', td: .3 });
scene(157.85, 162.12, (t, lt) => {
  const g = ctx.createRadialGradient(960, 480, 100, 960, 480, 1100); g.addColorStop(0, '#fff8ee'); g.addColorStop(1, '#ffd9c4'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  rays(960, 480, 20, 'rgba(255,255,255,.35)', t * .1); twinkles(t, 30, '#fff', { r: 30, seed: 4 });
  const z = tw(lt, 0, 4.2, 2.0, 2.35, E.o), soft = seg(lt, 1.0, 1.4);
  ladyHead(960, 470, z, soft > .5 ? fc('open', 'smile', { blush: 1.2, look: [0, 0], blink: blinkAt(t, 9) }) : fc('happy', 'smile', { blush: 1 }), Math.sin(t * 1.5) * .03);
  for (let i = 0; i < 4; i++) spark(700 + i * 175, 300 + (i % 2) * 40, 34 * Math.max(0, Math.sin(t * 3 + i * 1.7)) * soft, '#fff');
  ORDER.forEach((id, i) => { const p = E.back(seg(lt, 1.6 + i * .25, 1.95 + i * .25)); butlerHead(id, 250 + i * 355, 1240 - 420 * p + bob(t + i * .1, 10), .55, fc('heart', 'cat', { blush: 1.2, tt: t })); });
  ktxt('でも、でも…', 400, 150, 100, '#e8557a', t, t - lt + .1, { sw: 28, sc: '#fff', gap: 6, st: .1, wave: 6 });
}, { tr: 'circle', td: .5 });
scene(162.12, 164.13, (t, lt) => {
  bgFill('#2a2422'); rays(620, 540, 18, '#332c29', t * .2);
  const p = E.back(seg(lt, 0, .4)), ex = 640, ey = 520;
  ell(ex, ey, 400 * p, 500 * p, '#fff'); ell(ex, ey, 372 * p, 470 * p, '#3a1803');
  ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, 372 * p, 470 * p, 0, 0, TAU); ctx.clip(); ell(ex, ey + 120, 330, 380, '#5a2c12'); butler('R', { x: ex + 20, y: ey + 400, s: .95 * p, shadow: false, aR: [150, -60 + Math.sin(t * 7) * 10, -10], face: fc('happy', 'open', { blush: .8 }) }); ctx.restore();
  circ(ex - 150, ey - 250, 95 * p, '#fff'); circ(ex + 170, ey + 260, 44 * p, 'rgba(255,255,255,.9)');
  const q = E.o5(seg(lt, .3, .7)); bt('R', t, { x: 1480 + (1 - q) * 600, y: 1010, s: 1.15, flip: true, aR: [130, -10, 30], aL: [-10, 78, -25], head: { rot: .06 }, face: fc('open', 'talk', { blush: 1, brows: 'up', look: [1, 0] }) });
  ktxt('私だけ', 1440, 170, 130, '#fde27a', t, t - lt + .3, { sw: 30, sc: '#2a2422', gap: 10, st: .1 });
  for (let i = 0; i < 5; i++) spark(1150 + i * 150, 330 + (i % 2) * 380, 28 * Math.max(0, Math.sin(t * 4 + i * 2)), '#fde27a');
}, { tr: 'wipeR', td: .3 });
scene(164.13, 166.38, (t, lt) => {
  bgPop(t, '#e6d6f6', '#d9c4ee', 'stripes', { w: 80 });
  ['R', 'K', 'S', 'J'].forEach((id, i) => { const hop = Math.abs(Math.sin(lt * 9 + i * 1.3)) * 90; butlerHead(id, 520 + i * 290, 330 - hop, .6, fc('happy', 'open', { blush: .6 }), Math.sin(lt * 9 + i) * .1); withT(520 + i * 290 + 90, 300 - hop, .6, Math.sin(lt * 14 + i) * .4, () => circ(40, 40, 30, '#fff')); });
  const sw = Math.sin(lt * 10) * 60;
  bt('I', t, { x: 1080 + sw, y: 1010, s: 1.3, still: true, aL: [-230, -30 + Math.sin(lt * 20) * 20, 10], aR: [230, -30 - Math.sin(lt * 20) * 20, -10], face: fc('gt', 'big', { brows: 'sad', tears: .8, sweat: 1 }), head: { rot: sw * .0015 } });
  ld(2, t, { x: 330, y: 1030, s: .95, face: fc('open', 'cat', { look: [1.4, -1], blush: .7 }), head: { rot: .08 + Math.sin(lt * 5) * .04 } });
  ktxt('見ないで〜！', 1250, 170, 120, '#6f32ab', t, t - lt + .25, { sw: 32, sc: '#fff', gap: 8, st: .06, tilt: .08, wave: 8 });
}, { tr: 'wipeL', td: .3 });
scene(166.38, 171.15, (t, lt) => {
  const ok = seg(lt, 2.7, 3.0);
  bgFill(mix('#123a48', '#cdf1f7', ok)); if (ok < 1) alpha(1 - ok, () => { stripes('#0f3340', 90, Math.PI / 2, 0); spotlight(1060, 110, 420, 'rgba(220,245,255,.2)', 905); });
  if (ok > 0) { rays(960, 540, 18, rgba('#ffffff', .4 * ok), t * .2); hearts(t, 12, ['#f79ab1', '#fff'], { r: 24 }); }
  const k = E.io(seg(lt, .2, .7));
  bt('J', t, { x: 1060, y: 920, s: 1.15, kneel: k, still: true, aL: [-90, 120], aR: [lerp(120, 40, k), lerp(135, 50, k), -30 * k], head: { rot: ok > .5 ? -.08 : .1 * k, dy: (1 - ok) * 14 * k }, face: ok > .5 ? fc('wide', 'o', { blush: 1.2, tears: .5, brows: 'up' }) : fc('sad', lt < 3.2 ? 'talk' : 'frown', { brows: 'sad', tears: seg(lt, .8, 1.5), look: [0, 1] }) });
  if (ok < 1) { const p = pop(lt, 1.1, .25); alpha(1 - ok, () => withT(1500, 330, p, -.2 + Math.sin(t * 3) * .03, () => { ctx.strokeStyle = '#e8414e'; ctx.lineWidth = 12; ctx.beginPath(); ctx.roundRect(-230, -90, 460, 180, 20); ctx.stroke(); txt('執事失格？', 0, 4, 80, '#e8414e'); })); for (let i = 0; i < 4; i++) rect(700 + i * 60, 260 + ((t * 300 + i * 90) % 300), 8, 50, 'rgba(160,210,230,.5)'); }
  const q = E.o5(seg(lt, 2.3, 2.9)); if (q > 0) { const sh = Math.sin(lt * 12) * .08 * seg(lt, 2.9, 3.1) * (1 - seg(lt, 3.9, 4.2)); ld(2, t, { x: 520 - (1 - q) * 800, y: 930, s: 1.0, still: true, aR: [150, 40, -10], aL: [-90, 110], head: { rot: sh }, face: fc('happy', 'smile', { blush: 1 }) }); }
  if (ok > 0) { sfx('ううん！', 520, 190, 100, '#f26286', lt, 2.9, { rot: -.06 }); withT(1500, 300, pop(lt, 3.3, .3), .06, () => { spiky(0, 0, 200, 14, .18, '#fff', t * .3); spiky(0, 0, 180, 14, .18, '#f26286', t * .3); txt('合格', 0, 4, 120, '#fff'); }); }
}, { tr: 'blinds', td: .35 });
