// ===== scenes3 : 171.15 – 249.93  (call & response battle, faint, ballad, ballroom) =====
const bAt = k => 0.29 + k * BP;                      // beat time (post-143.6 grid)
const bNear = x => bAt(Math.round((x - 0.29) / BP));
// generic "game show" stage backdrop for the call&response battle
function stageBg(t, id, o = {}) {
  const b = BUT[id]; bgPop(t, b.pale, mix(b.pale, '#ffffff', .5), 'rays', { sp: .3, n: 18, y: 380 });
  rect(0, FY - 10, W, H - FY + 10, mix(b.col, '#ffffff', .55)); rect(0, FY - 10, W, 14, mix(b.col, '#ffffff', .25));
  for (let i = 0; i < 16; i++) circ(60 + i * 120, 40, 12, (Math.floor(t * 4) + i) % 2 ? '#fff6c8' : mix(b.col, '#ffffff', .3));
  if (o.vs !== false) { // VS score board
    withT(960, 92, 1, 0, () => { rrect(-210, -46, 420, 92, 46, '#fff'); rrect(-200, -38, 400, 76, 38, b.col); txt(b.name, -95, 2, 40, '#fff', { f: F.en, w: 600 }); txt('VS', 0, 2, 40, '#fde27a', { f: F.en, w: 700 }); txt('Lady', 95, 2, 40, '#fff', { f: F.en, w: 600 }); });
  }
}
function vsDivider(t, col) { ctx.save(); ctx.globalAlpha = .9; poly([930, 150, 990, 150, 1000, FY, 920, FY], '#fff'); ctx.restore(); spiky(960, 500, 70 + pulse(t) * 12, 10, .35, col, t); txt('VS', 960, 504, 54, '#fff', { f: F.en, w: 700 }); }

// --- 171.15 Kishi announces the battle ---
scene(171.15, 178.93, (t, lt) => {
  bgPop(t, '#e6d6f6', '#d6c0ee', 'rays', { sp: .4, n: 16, y: 420 }); rect(0, FY, W, H - FY, '#c7aee6');
  // stage + curtains
  curtainP(0, 0, 900, '#9a63d0', 1, 260); curtainP(W, 0, 900, '#9a63d0', -1, 260);
  const ann = seg(lt, 3.5, 3.8), ys = lt >= 6.45;
  const I = bt('I', t, { x: ys ? 1520 : 960, y: 880, s: ys ? .9 : 1.15, lean: ann * .05, aL: [-120, 135], aR: [210, -60 - 30 * ann, -30], face: lt < 3.5 ? fc('half', 'talk', { brows: 'angry', blush: .3 }) : fc('star', 'talk', { blush: .6 }), head: { rot: -.05 + Math.sin(lt * 3) * .03 },
    hr: () => megaphone(10, -10, .9, -.35 - .2 * ann, '#f26286') });
  if (!ys) {
    if (lt < 1.75) withT(960, 210, pop(lt, .1, .3), -.03, () => { bubble(0, 0, 520, 130, '#fff', 1); txt('執事諸君！', 0, 4, 66, '#6f32ab'); });
    else if (lt < 3.5) withT(960, 210, pop(lt, 1.75, .3), .03, () => { bubble(0, 0, 640, 130, '#fff', 1); txt('お嬢様争奪…', 0, 4, 66, '#6f32ab'); });
    else {
      withT(960, 230, pop(lt, 3.5, .35), Math.sin(t * 3) * .02, () => { ribbon(0, 0, 1180, 150, '#f26286', '#c23b62'); txt('コール＆レスポンス対決', 0, 6, 88, '#fff', { sw: 10, sc: '#c23b62' }); });
      for (let i = 0; i < 10; i++) spark(400 + i * 125, 360 + (i % 2) * 60, 30 * Math.max(0, Math.sin(t * 5 + i)), i % 2 ? '#fde27a' : '#fff');
      confetti(lt - 3.5, 40, ['#f26286', '#fde27a', '#9a63d0', '#0bb8d6', '#fff'], { seed: 3 });
    }
  } else {
    // (Yes, sir!) all four salute
    ['R', 'K', 'S', 'J'].forEach((id, i) => { const p = E.back(seg(lt, 6.45 + i * .06, 6.8 + i * .06)); bt(id, t, { x: 260 + i * 290, y: 880 + (1 - p) * 500, s: .85, still: true, aR: [80, -150, 60], face: fc('closed', 'open', { brows: 'angry', blush: .4 }), head: { rot: .03 } }); });
    ktxt('Yes, sir!', 640, 190, 150, '#6f32ab', t, t - lt + 6.5, { f: F.en, sw: 30, sc: '#fff', st: .05, tilt: .06 });
  }
}, { tr: 'blinds', td: .4 });

// --- 178.93 Ren: bang! → lady falls cutely ---
const BANG = [183.40, 184.44, 185.22, 186.26];
scene(178.93, 186.97, (t, lt) => {
  stageBg(t, 'R');
  const intro = t < 182.96;
  let fall = 0; BANG.forEach(b => { if (t >= b + .08) fall = Math.max(fall, Math.sin(Math.PI * seg(t, b + .08, b + .9)) ); });
  const last = t >= BANG[3];
  const rec = BANG.reduce((a, b) => t >= b ? b : a, -9), kick = hit(t, rec, .15);
  bt('R', t, { x: 520, y: 880, s: 1.05, lean: -.05 - kick * .08, aL: [-110, 120], aR: intro && t < 180.9 ? [120, 40, -20] : [250, -20 - kick * 40, 0], face: intro ? fc('happy', 'talk', { blush: .4 }) : fc(kick > .3 ? 'winkL' : 'half', kick > .3 ? 'open' : 'smirk', { blush: .5 }),
    hr: !intro || t > 180.9 ? () => { rect(0, -10, 46, 14, BUT.R.coat); circ(0, -2, 15, C.skin); rect(6, -14, 50, 12, C.skin); if (kick > .1) { spiky(70, -8, 40 * kick, 8, .4, '#fde27a', t * 5); } } : undefined });
  // lady: falls backwards cutely
  const back = last ? Math.max(fall, seg(t, 186.26, 186.6)) : fall;
  ld(3, t, { x: 1380 - 200 * E.io(back), y: 880, s: 1.0, still: true, rot: E.io(back) * .95, aL: back > .3 ? [-140, -40, 30] : [-106, 116], aR: back > .3 ? [140, -40, -30] : [106, 116],
    face: back > .3 ? fc('gt', 'o', { blush: 1.2 }) : intro ? fc('open', 'smile', { blush: .6, look: [-1, 0] }) : fc('happy', 'smile', { blush: .8 }) });
  // bullet hearts
  BANG.forEach((b, i) => { const q = seg(t, b, b + .2); if (q > 0 && q < 1) heart(lerp(800, 1340, q), 600 - Math.sin(q * Math.PI) * 60, 40, '#f26286', q * 2); sfx('バキュン！', 800 + (i % 2) * 300, 230 + (i % 2) * 50, 110, '#222121', t, b, { end: b + .55, rot: i % 2 ? .1 : -.1, sc: '#fde27a' }); if (t > b + .3 && t < b + .9) for (let k = 0; k < 3; k++) heart(1380 + 160 + k * 40, 380 - (t - b) * 200 - k * 30, 22, '#f79ab1'); });
  if (intro) { if (t > 180.9) withT(1380, 300, pop(t, 180.9, .3), .05, () => { bubble(0, 0, 500, 120, '#fff', -1); txt('かわいく倒れてね', 0, 4, 52, '#222121'); }); else withT(520, 240, pop(t, 179.1, .3), -.04, () => { bubble(0, 0, 460, 120, '#fff', 1); txt('撃ったら…', 0, 4, 58, '#222121'); }); }
  if (last && t > 186.5) sfx('ばたん♡', 1500, 420, 80, '#f26286', t, 186.5, { rot: .2 });
}, { tr: 'wipeL', td: .35 });

// --- 186.97 Sho: don-don → clap ---
const DON = [0, 1, 2, 3].map(r => 191.75 + r * 2 * BP);
scene(186.97, 195.54, (t, lt) => {
  stageBg(t, 'S');
  const intro = t < 191.53;
  let don = 0, pan = 0, last = -9;
  DON.forEach(d => { don = Math.max(don, hit(t, d, .12), hit(t, d + BP * .5, .12)); pan = Math.max(pan, hit(t, d + BP, .18)); if (t >= d) last = d; });
  if (intro) { don = Math.max(hit(t, 188.6, .12), hit(t, 188.86, .12)); pan = hit(t, 190.4, .2); }
  const cs = Math.sin(t * 60) * don * 10;
  cam(960 + cs, 540 + don * 6, 1, () => {
    stageBg(t, 'S');
    bt('S', t, { x: 560, y: 880, s: 1.1, still: true, fL: [0, -don * 50], sq: don * .05, aL: [-150, 40, 20], aR: [150, 40, -20], face: fc(intro ? 'half' : 'angry', intro ? 'talk' : 'grit', { brows: 'angry', blush: .3 }), head: { rot: -don * .05 } });
    for (const sd of [-1, 1]) if (don > .2) burst(560 + sd * 60, 880, 40, 40 + don * 120, 5, '#a51c28', 10, sd > 0 ? -1.3 : -2.6);
    const clapping = pan > .05, cl = 1 - pan;
    ld(3, t, { x: 1380, y: 880, s: 1.0, still: true, aL: [-40 - cl * 60, -20, 20], aR: [40 + cl * 60, -20, -20], face: clapping ? fc('closed', 'open', { blush: 1 }) : fc('open', 'smile', { blush: .6, look: [-1, 0] }) });
    if (pan > .1) { burst(1380, 600, 60, 100 + pan * 80, 10, '#fde27a', 10); }
  });
  if (intro) { withT(560, 250, pop(t, 187.2, .3), -.04, () => { bubble(0, 0, 520, 120, '#fff', 1); txt('ドンドンしたら…', 0, 4, 54, '#a51c28'); }); if (t > 189.5) withT(1380, 250, pop(t, 189.5, .3), .04, () => { bubble(0, 0, 420, 120, '#fff', -1); txt('パン！', 0, 4, 70, '#f26286'); }); }
  else DON.forEach((d, i) => { sfx('ドン', 300 + (i % 2) * 90, 330, 90, '#a51c28', t, d, { end: d + .5, rot: -.15 }); sfx('ドン', 470 + (i % 2) * 90, 260, 90, '#a51c28', t, d + BP * .5, { end: d + .7, rot: .1 }); sfx('パン！', 1380, 260, 130, '#f26286', t, d + BP, { end: d + BP + .5, rot: (i % 2 ? .08 : -.08) }); });
}, { tr: 'wipeR', td: .35 });

// --- 195.54 Kishi: wink exchange ---
const WINK = [0, 1, 2, 3].map(r => 199.84 + r * 2 * BP);
scene(195.54, 203.91, (t, lt) => {
  stageBg(t, 'I');
  const intro = t < 199.57;
  let kw = 0, lw = 0; WINK.forEach(w => { kw = Math.max(kw, seg(t, w, w + .05) * (1 - seg(t, w + .45, w + .5))); lw = Math.max(lw, seg(t, w + BP, w + BP + .05) * (1 - seg(t, w + BP + .45, w + BP + .5))); });
  if (intro) kw = seg(t, 196.6, 196.65) * (1 - seg(t, 197.2, 197.25));
  bt('I', t, { x: 560, y: 880, s: 1.1, lean: .05, aL: [-110, 120], aR: kw ? [90, -120, 40] : [120, 40, -20], face: kw ? fc('winkR', 'smile', { blush: .8 }) : fc('happy', intro ? 'talk' : 'smile', { blush: .5 }), head: { rot: kw ? .1 : 0 } });
  const lad = intro && t > 198 ? .5 : 0;
  ld(3, t, { x: 1380, y: 880, s: 1.0, aL: lw ? [-80, -100, -40] : [-106, 116], face: lw ? fc('winkL', 'cat', { blush: 1 }) : intro ? fc('open', 'smile', { blush: .6 + lad, look: [-1, 0] }) : fc('open', 'smile', { blush: .7 }), head: { rot: lw ? -.1 : 0 } });
  // star beams
  WINK.forEach((w, i) => {
    const q = seg(t, w, w + .35), r = seg(t, w + BP, w + BP + .35);
    if (q > 0 && q < 1) for (let k = 0; k < 3; k++) star(lerp(640, 1300, sat(q - k * .1)), 420 + Math.sin(q * 9 + k) * 30, 28 - k * 6, '#fde27a', t * 6);
    if (r > 0 && r < 1) for (let k = 0; k < 3; k++) star(lerp(1300, 640, sat(r - k * .1)), 460 + Math.sin(r * 9 + k) * 30, 28 - k * 6, '#f79ab1', -t * 6);
    sfx(i < 2 ? 'パチ！' : 'ウインク！', 560, 240, 96, '#6f32ab', t, w, { end: w + .5, rot: -.08 });
    sfx(i < 2 ? 'パチ☆' : 'ウインク☆', 1380, 240, 96, '#f26286', t, w + BP, { end: w + BP + .5, rot: .08 });
  });
  if (intro) withT(560, 250, pop(t, 195.7, .3), -.04, () => { bubble(0, 0, 580, 120, '#fff', 1); txt(t < 197.82 ? 'ウインクしたら…' : '素敵なウインクを', 0, 4, 54, '#6f32ab'); });
  if (!intro) twinkles(t, 16, '#fde27a', { r: 22, seed: 8 });
}, { tr: 'circle', td: .35 });

// --- 203.91 Kaito: half heart + lady makes the other half ---
const KYU = [0, 1, 2, 3].map(r => 208.45 + r * 2 * BP);
scene(203.91, 212.22, (t, lt) => {
  stageBg(t, 'K');
  const intro = t < 208.19, join = seg(t, KYU[2], KYU[2] + .35), big = join > 0;
  let kq = 0; KYU.forEach(k => { kq = Math.max(kq, hit(t, k, .25)); });
  const hx = lerp(0, 1, E.io(join));
  if (t >= KYU[2] + .35) { burst(960, 470, 230, 300 + pulse(t) * 60, 20, '#fff', 14, t * .5); burst(960, 470, 200, 250 + pulse(t) * 40, 20, '#fde692', 9, t * .5 + .16); }
  bt('K', t, { x: lerp(560, 700, hx), y: 880, s: 1.1, still: true, lean: .06 * hx, aL: [-110, 120], aR: t > 204.4 ? [175 + 40 * hx, -110, 30] : [120, 40, -20], face: fc(big ? 'heart' : 'happy', intro ? 'talk' : 'open', { blush: .7 + kq * .5 }), head: { rot: .05 + kq * .06 } });
  const lp = intro ? seg(t, 206.4, 207.2) : 1;
  ld(3, t, { x: lerp(1380, 1220, hx), y: 880, s: 1.0, still: true, lean: -.05 * hx, aL: lp > 0 ? [-140 - 30 * hx, lerp(116, -110, E.io(lp)), -30] : [-106, 116], face: big ? fc('heart', 'cat', { blush: 1.3 }) : fc('open', 'smile', { blush: .7, look: [-1, 0] }), head: { rot: -.06 } });
  // halves
  const jE = E.io(join), kx = lerp(800, 960, jE), lx = lerp(1120, 960, jE), hs = 120 + kq * 30 + join * 40;
  const done = join >= 1, jt = t - (KYU[2] + .35);
  if (!done) {
    if (t > 204.4) halfHeart(kx, 470, hs * pop(t, 204.4, .3), '#f2b705', false);
    if (lp > .5) halfHeart(lx, 470, hs * pop(t, 207.0, .3), '#f79ab1', true);
  } else {
    // joined: one full heart with a squash-bounce and a yellow→pink gradient
    const bn = 1 + Math.exp(-jt * 6) * Math.sin(jt * 22) * .18, S = hs * bn;
    withT(960, 470, 1, 0, () => {
      const g = ctx.createLinearGradient(-S * .55, 0, S * .55, 0); g.addColorStop(0, '#f2b705'); g.addColorStop(.5, '#fbb27a'); g.addColorStop(1, '#f79ab1');
      ctx.save(); ctx.scale(S / 100 * (2 - bn), S / 100 * bn); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 88); ctx.bezierCurveTo(-120, 5, -78, -92, 0, -32); ctx.bezierCurveTo(78, -92, 120, 5, 0, 88); ctx.fill();
      alpha(.55, () => ell(-42, -18, 16, 26, '#fff', -.5)); ctx.restore();
    });
    alpha(Math.exp(-jt * 5), () => { heart(960, 470, hs * (1 + jt * 1.4), '#fff'); });
    alpha(Math.exp(-jt * 9) * .5, () => rect(0, 0, W, H, '#fffbe8'));
  }
  if (big) hearts(t, 14, ['#f2b705', '#f79ab1', '#fff'], { r: 26, seed: 2 });
  KYU.forEach((k, i) => sfx(i < 2 ? 'キュルン！' : 'ハート♡', i % 2 ? 1460 : 460, 250, 100, i < 2 ? '#e9a800' : '#f26286', t, k, { end: k + .9, rot: i % 2 ? .08 : -.08 }));
  if (intro) withT(560, 230, pop(t, 204.0, .3), -.04, () => { bubble(0, 0, 560, 120, '#fff', 1); txt(t < 206.18 ? 'ハート作ったら…' : 'もう片方を♡', 0, 4, 54, '#c2941e'); });
}, { tr: 'heart', td: .4 });

// --- 212.22 Jinguji: blown kiss → lady faints ---
scene(212.22, 220.23, (t, lt) => {
  stageBg(t, 'J', { vs: t < 216.4 });
  const kissT = 216.75, fly = seg(t, kissT, kissT + .55), faint = E.io(seg(t, kissT + .6, kissT + 1.3)), ask = t > 218.3;
  bt('J', t, { x: 560, y: 880, s: 1.1, lean: t > kissT - .4 && t < kissT + .4 ? .08 : 0, aL: [-110, 120], aR: t > kissT - .5 && t < kissT ? [40, -150, 40] : t < kissT + .6 && t > kissT ? [260, -60, 0] : ask ? [120, -10, 30] : [120, 40, -20],
    face: ask ? fc('open', 'talk', { brows: 'up', sweat: seg(t, 218.6, 219), look: [1, .5] }) : t > kissT - .5 && t < kissT + .3 ? fc('closed', 'kiss', { blush: .8 }) : fc('happy', 'talk', { blush: .5 }), head: { rot: ask ? .12 : 0 } });
  // kiss heart flies
  if (fly > 0 && fly < 1) { heart(lerp(760, 1360, E.i(fly)), 470 - Math.sin(fly * Math.PI) * 120, 60 + fly * 30, '#f26286', fly); for (let k = 1; k < 4; k++) heart(lerp(760, 1360, E.i(sat(fly - k * .08))), 470 - Math.sin(sat(fly - k * .08) * Math.PI) * 120, 30 - k * 5, '#f79ab1'); }
  ld(3, t, { x: 1380 - 260 * faint, y: 880, s: 1.0, still: faint > 0, rot: faint * 1.15, aL: faint > .3 ? [-150, -60, 30] : [-106, 116], aR: faint > .3 ? [150, -60, -30] : [106, 116], face: faint > .2 ? fc('dizzy', 'wavy', { blush: 1.4 }) : fly >= 1 ? fc('heart', 'o', { blush: 1.4 }) : fc('open', 'smile', { blush: .6, look: [-1, 0] }) });
  if (faint > .5) { for (let i = 0; i < 5; i++) { const a = t * 3 + i * TAU / 5; heart(1440 + Math.cos(a) * 70, 760 + Math.sin(a) * 22, 26, '#f26286'); } sfx('きゅ〜♡', 1560, 520, 80, '#f26286', t, kissT + 1.0, { rot: .15 }); }
  if (t < 216.45) withT(560, 230, pop(t, 212.4, .3), -.04, () => { bubble(0, 0, 560, 120, '#fff', 1); txt(t < 214.47 ? '投げキッスしたら…' : '華麗に返してね', 0, 4, 54, '#0384a6'); });
  else if (t < kissT + .6) ktxt('んーわっ', 960, 220, 150, '#0aa5c2', t, 216.45, { sw: 32, sc: '#fff', gap: 8, st: .1, wave: 8 });
  if (ask) withT(820, 250, pop(t, 218.3, .3), .03, () => { bubble(0, 0, 600, 130, '#fff', 1); txt('お嬢様？ どうされました？', 0, 4, 46, '#0384a6'); });
}, { tr: 'wipeL', td: .35 });

// --- 220.23 everybody: お嬢様ー！ ---
scene(220.23, 222.76, (t, lt) => {
  const sh = hit(lt, .1, .5) * 14;
  cam(960 + Math.sin(t * 50) * sh, 540, 1 + .04 * E.o(seg(lt, 0, 2)), () => {
    bgPop(t, '#cdf1f7', '#fff', 'rays', { sp: 1.2, n: 24, y: 560 }); rect(0, 760, W, H - 760, '#ecd0a8');
    // lady lying on the floor, hearts spinning
    withT(980, 760, 1, 0, () => ld(3, t, { x: 0, y: 0, s: .85, still: true, shadow: false, rot: -Math.PI / 2 + .02, face: fc('dizzy', 'wavy', { blush: 1.3 }) }));
    for (let i = 0; i < 5; i++) { const a = t * 3 + i * TAU / 5; heart(720 + Math.cos(a) * 80, 600 + Math.sin(a) * 26, 24, '#f26286'); }
    ORDER.forEach((id, i) => { const p = E.o5(seg(lt, .05 + i * .07, .45 + i * .07)), sd = i % 2 ? 1 : -1, x0 = 330 + i * 315; butlerHead(id, x0 + sd * (1 - p) * 900, 300 + (i % 2) * 80 + Math.sin(t * 20 + i) * 6, .62, fc('wide', 'big', { brows: 'sad', sweat: 1, tt: t }), sd * .12); });
  });
  ktxt('お嬢様ーーー！', 960, 140, 150, '#f26286', t, t - lt + .15, { sw: 34, sc: '#fff', gap: 4, st: .06, tilt: .06, sh: 'rgba(80,40,60,.3)' });
  speedLines(t, 'rgba(255,255,255,.75)', 46, 640);
}, { tr: 'cut' });

function lerpArr(a, b, k) { return a.map((v, i) => lerp(v, b[i], k)); }
// late-night study desk (front view). part 'back': lamp, books, papers on the top | 'front': desk body (hides the lady's legs)
function studyDesk(t, part, lamp = 1) {
  const x0 = 420, x1 = 1120, top = 730, gold = '#e6b247';
  if (part === 'back') {
    // book stacks
    const stack = (x, n, seed) => { for (let i = 0; i < n; i++) { const w = 150 - (hash(seed + i) * 40), c = ['#c9404c', '#7d7cc4', '#e6b247', '#0aa3c0', '#f29ab3'][(seed + i) % 5]; rrect(x - w / 2 + (hash(seed * 3 + i) - .5) * 20, top - 30 - i * 30, w, 28, 6, c); rect(x - w / 2 + 12 + (hash(seed * 3 + i) - .5) * 20, top - 22 - i * 30, w - 24, 4, 'rgba(255,255,255,.6)'); } };
    stack(500, 6, 2); stack(1040, 4, 7);
    // paper pile
    for (let i = 0; i < 7; i++) rrect(560 + (hash(i * 5) - .5) * 30, top - 8 - i * 7, 150, 10, 3, i % 2 ? '#fffaf0' : '#f2eadb');
    // desk lamp (warm)
    withT(1010, top - 150, 1, 0, () => { rect(-5, 0, 10, 120, gold); ell(0, 122, 46, 12, gold); ctx.fillStyle = '#f7c8d6'; ctx.beginPath(); ctx.moveTo(-60, 10); ctx.lineTo(60, 10); ctx.lineTo(38, -60); ctx.lineTo(-38, -60); ctx.fill(); rect(-60, 4, 120, 10, gold); });
    alpha(lamp, () => { const g = ctx.createRadialGradient(1010, top - 120, 10, 1010, top - 120, 520); g.addColorStop(0, 'rgba(255,226,150,.55)'); g.addColorStop(1, 'rgba(255,226,150,0)'); ctx.fillStyle = g; ctx.fillRect(400, 0, 1300, 1000); });
  } else {
    rrect(x0 - 20, top - 6, x1 - x0 + 40, 34, 12, '#b9744b');
    rrect(x0, top + 26, x1 - x0, 230, 10, '#a8653e');
    ctx.strokeStyle = gold; ctx.lineWidth = 6;
    for (const xx of [x0 + 30, (x0 + x1) / 2 + 15]) { ctx.beginPath(); ctx.roundRect(xx, top + 56, (x1 - x0) / 2 - 45, 170, 18); ctx.stroke(); }
    for (const xx of [x0 + (x1 - x0) / 4, x0 + (x1 - x0) * 3 / 4]) { circ(xx, top + 140, 12, gold); }
    heart((x0 + x1) / 2, top + 140, 26, '#f29ab3');
    rect(x0 + 10, top + 256, 26, 40, '#8a4f2e'); rect(x1 - 36, top + 256, 26, 40, '#8a4f2e');
  }
}
// --- 222.76 Kaito slow ballad: healing (tired lady at her desk → Kaito brings warm cocoa) ---
scene(222.76, 233.35, (t, lt) => {
  nightRoom(t, '#2b3566', '#55579a');
  const part2 = t >= 226.28, p2 = t - 226.28;
  const z = tw(lt, 0, 10.5, 1, 1.1, E.io);
  // phases
  const walk = E.io(seg(lt, .5, 2.4));               // Kaito walks in
  const give = E.io(seg(p2, .0, .8));                // offers cup
  const take = E.io(seg(p2, .8, 1.4));               // lady takes it
  const warm = seg(p2, 1.6, 2.6);                    // warmth spreads, she smiles
  const tiredF = fc('half', 'wavy', { sweat: 1, shade: .25, look: [0, 1] });
  cam(860, 560, z, () => {
    studyDesk(t, 'back', .6 + .4 * warm);
    // the lady stands behind the desk, writing → slumps a little
    const write = !part2 ? Math.sin(t * 9) * 8 : 0, slump = part2 ? (1 - give) * .08 : .08;
    const holding = take > .3;
    ld(3, t, {
      x: 740, y: 900, s: 1.0, still: true, lean: slump * .5, tiara: true,
      head: { rot: part2 ? lerp(.12, .04, warm) : .12 + Math.sin(t * 1.3) * .03 },
      aL: holding ? [50, 100, -20] : [-110, 150, -20],
      aR: holding ? [125, 85, 20] : (part2 ? lerpArr([100, 150 + write, 30], [125, 85, 20], take) : [100, 150 + write, 30]),
      face: !part2 ? tiredF : (warm > .1 ? fc('happy', 'open', { blush: .6 + .6 * warm }) : fc('open', 'o', { blush: .5, look: [1, 0] })),
      hr: !holding ? () => { withT(0, -20, 1, .5, () => { rrect(-6, -70, 12, 80, 6, '#fff'); poly([-6, 10, 6, 10, 0, 26], '#555'); }); } : () => { cupP(-20, -34, .9, '#9a5a3a', '#fff', '#f2b705'); },
    });
    if (holding) {
      // steam that curls into a heart
      const hx = 740 + 125 - 20, hy = 548 + 85 - 70;
      steam(hx, hy, 1, t, 'rgba(255,255,255,.85)');
      const hh = E.back(seg(p2, 1.6, 2.4));
      if (hh > 0) alpha(Math.min(1, hh) * (.75 + .25 * Math.sin(t * 3)), () => { heart(hx + 140, hy - 170 - Math.sin(t * 1.2) * 10, 58 * hh, '#fde692'); spark(hx + 200, hy - 230, 16 * Math.max(0, Math.sin(t * 4)), '#fff'); });
    }
    studyDesk(t, 'front');
    // Kaito
    const kx = lerp(1700, 1250, walk), bowk = E.io(seg(p2, 2.8, 3.6)) * (1 - E.io(seg(p2, 5.0, 5.8)));
    bt('K', t, {
      x: kx, y: 900, s: 1.02, flip: true, still: walk >= 1, lean: -.04 * give - .25 * bowk,
      aL: [-110, 120], aR: part2 ? lerpArr([140, 60, 20], [200, 40, 10], give * (1 - take)) : [140, 60, 20],
      face: !part2 ? fc('open', 'smile', { look: [-1, .5], blush: .4 }) : (bowk > .2 ? fc('closed', 'smile', { blush: .8 }) : fc('happy', 'open', { blush: .6, look: [-1, 0] })),
      head: { rot: -.06 },
      hr: take < .3 ? () => { rrect(-70, -46, 140, 12, 6, '#e6b247'); cupP(0, -76, 1.05, '#9a5a3a', '#fff', '#f2b705'); steam(0, -112, .8, t); } : () => rrect(-70, -46, 140, 12, 6, '#e6b247'),
    });
  });
  // speech bubbles
  if (!part2) { alpha(seg(lt, .2, .6) * (1 - seg(lt, 2.2, 2.6)), () => withT(560, 260, 1, -.04, () => { bubble(0, 0, 260, 100, '#fff', 1); txt('ふぅ…', 0, 4, 50, '#6a6aa8'); })); }
  if (!part2) alpha(seg(lt, 2.4, 2.8), () => withT(1320, 240, pop(lt, 2.4, .3), .04, () => { bubble(0, 0, 460, 110, '#fff', 1); txt('お疲れさまです', 0, 4, 48, '#c2941e'); }));
  // soft floating notes & stars
  for (let i = 0; i < 6; i++) { const y = ((lt * 40 + i * 120) % 700); alpha(Math.sin(Math.PI * y / 700) * .7, () => note(260 + i * 260 + Math.sin(t + i) * 20, 760 - y, .55, i % 2 ? '#fde692' : '#fff', Math.sin(t + i) * .2, i % 3 === 0)); }
  if (part2) {
    alpha(seg(p2, 1.8, 2.6), () => { const g = ctx.createRadialGradient(860, 520, 40, 860, 520, 900); g.addColorStop(0, 'rgba(255,230,160,.28)'); g.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
    alpha(seg(p2, .3, 1.0), () => txt('Healing', 960, 140, 84, '#fde692', { f: F.sc, w: 400 }));
    if (p2 > 2) hearts(t, 10, ['#fde692', '#f9b9c8'], { r: 20, speed: 45, seed: 4 });
  } else alpha(seg(lt, .4, 1.2) * (1 - seg(lt, 2.2, 2.6)), () => txt('Late at night…', 960, 140, 64, '#fff', { f: F.sc, w: 400 }));
}, { tr: 'fade', td: .6 });

// --- 233.35 all: slow バチバチ / 一生おそばに ---
scene(233.35, 241.15, (t, lt) => {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fbd9e0'); g.addColorStop(1, '#fff3dc'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  rays(960, 300, 16, 'rgba(255,255,255,.35)', t * .08); rect(0, FY, W, H - FY, '#f2d4b8');
  const vow = t >= 237.13, k = E.io(seg(t, 237.2, 237.9));
  // gentle sparks between them early (バチバチ but soft)
  if (!vow) for (let i = 0; i < 4; i++) { const x = [335, 625, 1295, 1585][i]; zap(x - 60, 300, x + 60, 300, t, i % 2 ? '#fde27a' : '#f79ab1'); }
  const pos = [[190, 0], [480, 1], [1150, 1], [1440, 0], [1730, 0]], ids = ['R', 'K', 'I', 'S', 'J'];
  ids.forEach((id, i) => { const [x, f] = pos[i]; bt(id, t, { x, y: 880, s: .8, kneel: k, flip: x > 815, still: vow, aL: vow ? [-30, 30, 40] : [-110, 120], aR: vow ? [30, 40, -40] : [110, 120], face: vow ? fc('closed', 'smile', { blush: .9 }) : fc('half', 'smirk', { blush: .3, look: [x > 815 ? -1 : 1, 0] }), head: { rot: vow ? .05 : 0 } }); });
  if (0) bt('I', t, { x: 960, y: 640 + 240 * k, s: .62, kneel: k, still: vow, aL: vow ? [-30, 30, 40] : [-110, 120], aR: vow ? [30, 40, -40] : [110, 120], face: vow ? fc('closed', 'smile', { blush: .9 }) : fc('half', 'smirk', { blush: .3 }) });
  ld(3, t, { x: 815, y: 900, s: .95, aL: vow ? [-50, 30, 30] : [-106, 116], aR: vow ? [50, 30, -30] : [106, 116], face: vow ? fc('happy', 'smile', { blush: 1.2, tears: .3 }) : fc('open', 'o', { blush: .6, look: [Math.sin(t * .8), 0] }) });
  if (vow) { hearts(t, 14, ['#f79ab1', '#fff', '#f26286'], { r: 24, speed: 50 }); alpha(seg(t, 237.5, 238.3), () => txt('Forever by your side', 960, 150, 70, '#e8557a', { f: F.sc, w: 400, sw: 10, sc: '#fff' })); }
  else alpha(seg(lt, .2, 1), () => txt('Battle of Butler', 960, 150, 70, '#a24a6a', { f: F.sc, w: 400, sw: 10, sc: '#fff' }));
}, { tr: 'fade', td: .6 });

// --- 241.15 Kishi: castle ball invitation…  243.4 Sho: please rest ---
scene(241.15, 245.66, (t, lt) => {
  const sho = t >= 243.4;
  if (!sho) {
    bgNight(t, { c0: '#3a3f86', c1: '#9a86c8' }); castle(1440, 860, 1.15); rect(0, FY, W, H - FY, '#5a5a9a');
    for (let i = 0; i < 6; i++) { const a = seg(t, 241.4 + i * .1, 241.8 + i * .1); alpha(a, () => spark(1240 + i * 80, 300 + (i % 2) * 90, 22 * Math.max(0, Math.sin(t * 4 + i)), '#fde27a')); }
    const shrug = seg(t, 242.4, 242.8);
    bt('I', t, { x: 620, y: 880, s: 1.1, aL: shrug > .5 ? [-200, -20, -30] : [-110, 120], aR: [210, -60 + shrug * 60, -20], face: shrug > .5 ? fc('closed', 'smirk', { blush: .3 }) : fc('open', 'talk', { blush: .3 }), head: { rot: shrug * .08 }, hr: () => withT(30, -40, .8 * (1 - shrug * .3), -.2 - shrug * 1.2, () => letter(0, 0, 1)) });
    if (shrug > .5) sfx('ポイッ', 960, 260, 90, '#6f32ab', t, 242.6, { rot: -.1 });
  } else {
    nightRoom(t, '#2f3a70', '#6f6fae');
    sofa(1180, 880, 1.1, '#c9a6f0', '#b58fe0');
    ld(3, t, { x: 1180, y: 860, s: .9, tiara: false, face: fc(lt > 3.2 ? 'half' : 'open', lt > 3.4 ? 'o' : 'smile', { blush: .8 }), aL: lt > 3.4 ? [-50, -30, 40] : [-106, 116], head: { rot: -.06 } });
    bt('S', t, { x: 600, y: 880, s: 1.1, lean: .12 * E.io(seg(t, 243.6, 244.2)), aL: [-20, 40, 40], aR: [160, 60, -20], face: fc('closed', 'smile', { blush: .5 }), head: { rot: .1 },
      hr: () => { rrect(-50, -40, 110, 70, 30, '#fff'); rrect(-40, -32, 90, 54, 26, '#f6d3d3'); } });
    for (let i = 0; i < 3; i++) { const q = ((lt * .5 + i / 3) % 1); alpha(Math.sin(q * Math.PI) * seg(t, 244.6, 245), () => txt('z', 1300 + q * 120, 400 - q * 160, 40 + q * 30, '#fff', { f: F.en, w: 600 })); }
    withT(600, 260, pop(t, 243.5, .3), -.03, () => { bubble(0, 0, 520, 120, '#fff', 1); txt('お休みなさいませ', 0, 4, 54, '#a51c28'); });
  }
}, { tr: 'wipeD', td: .4 });

// --- 245.66 Jinguji: shall we dance?  (outfit3 → ballgown outfit1) ---
scene(245.66, 249.93, (t, lt) => {
  const tf = seg(lt, .9, 1.9), mag = Math.sin(Math.PI * tf), done = lt > 1.4, bgk = E.io(seg(lt, .9, 1.6));
  nightRoom(t, '#2f3a70', '#6f6fae');
  if (bgk > 0) alpha(bgk, () => { bgBall(t); spotlight(960, 140, 520, 'rgba(255,250,220,.35)'); });
  const dance = seg(lt, 2.6, 3.0), sway = Math.sin((t - 248.3) * Math.PI / BP / 2) * 30 * dance;
  bt('J', t, { x: lerp(560, 760, dance) + sway, y: 880, s: 1.1, lean: lt < 2.6 ? .14 : 0, aL: [-110, 120], aR: lt < 2.6 ? [210, 40, 10] : [150, -40, 10], face: fc(lt < .9 ? 'open' : 'happy', lt < 1 ? 'talk' : 'smile', { blush: .6, look: [1, 0] }), head: { rot: .05 } });
  const lx = lerp(1260, 1110, dance) + sway, s = 1.0 + mag * .05;
  if (!done) ld(3, t, { x: lx, y: 880, s, tiara: false, face: fc('open', 'o', { blush: .8, look: [-1, 0] }) });
  else ld(1, t, { x: lx, y: 880, s, sway: Math.sin(t * 3) * .5, aL: dance > .5 ? [-160, -20, -20] : [-106, 116], face: fc(dance > .5 ? 'happy' : 'star', 'smile', { blush: 1.1 }), head: { rot: -.05 } });
  if (mag > 0) { for (let i = 0; i < 12; i++) { const a = i * TAU / 12 + t * 5, r = 260 * (1 - tf * .5); spark(1260 + Math.cos(a) * r, 560 + Math.sin(a) * r * 1.3, 46 * mag, i % 2 ? '#fde27a' : '#fff'); } alpha(mag, () => { const gg = ctx.createRadialGradient(1260, 560, 20, 1260, 560, 420); gg.addColorStop(0, 'rgba(255,255,255,1)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gg; ctx.fillRect(700, 0, 1220, H); }); }
  if (done) { petals(t, 18, '#f9b9c8', { seed: 9 }); twinkles(t, 18, '#fff', { r: 20, seed: 6 }); }
  if (lt < 1.4) withT(560, 230, pop(lt, .1, .3), -.03, () => { bubble(0, 0, 560, 120, '#fff', 1); txt('私と踊りませんか？', 0, 4, 52, '#0384a6'); });
  else ktxt('Shall we dance?', 960, 160, 110, '#e8557a', t, t - lt + 1.6, { f: F.sc, w: 400, sw: 16, sc: '#fff', st: .05 });
}, { tr: 'circle', td: .4 });
