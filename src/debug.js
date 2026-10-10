// debug character sheet
window.__sheet = function (k) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); bgFill(C.bg);
  if (k === 0) { ORDER.forEach((id, i) => butler(id, { x: 200 + i * 300, y: 760, s: 1 })); [4, 2, 3, 1].forEach((o, i) => lady(o, { x: 1500 + (i % 2) * 300 - 150 * 0, y: 520 + Math.floor(i / 2) * 520, s: .72 })); return; }
  if (k === 1) {
    const eyes = ['open', 'happy', 'closed', 'winkL', 'wide', 'angry', 'sad', 'half', 'heart', 'star', 'dizzy', 'gt', 'dot'], mouths = ['smile', 'open', 'talk', 'big', 'o', 'flat', 'frown', 'grit', 'wavy', 'kiss', 'smirk', 'cat', 'tri', 'pout'];
    for (let i = 0; i < 14; i++) { const id = ORDER[i % 5]; const x = 140 + (i % 7) * 270, y = 250 + Math.floor(i / 7) * 330; butlerHead(id, x, y, .62, { eyes: eyes[i % 13], mouth: mouths[i], brows: ['none', 'none', 'none', 'none', 'up', 'angry', 'sad', 'none'][i % 8], blush: i % 3 === 0 ? 1 : 0, sweat: i === 8 ? 1 : 0, anger: i === 5 ? 1 : 0, tears: i === 6 ? 1 : 0, shade: i === 7 ? 1 : 0, open: .7, tt: 1 }); txt(eyes[i % 13] + '/' + mouths[i], x, y + 130, 22, '#333', { f: F.en, w: 500 }); }
    for (let i = 0; i < 6; i++) ladyHead(200 + i * 300, 900, .6, { eyes: ['open', 'happy', 'winkR', 'heart', 'dizzy', 'closed'][i], mouth: ['smile', 'open', 'cat', 'o', 'wavy', 'smile'][i], blush: 1, tt: 1 });
    return;
  }
  if (k === 3) { [4, 2, 3, 1].forEach((o, i) => lady(o, { x: 250 + i * 470, y: 1040, s: 1.3 })); return; }
  if (k === 4) { ORDER.slice(0, 3).forEach((id, i) => butler(id, { x: 330 + i * 630, y: 1050, s: 1.75 })); return; }
  if (k === 2) {
    butler('R', { x: 200, y: 800, aR: [150, -60, 30], aL: [-20, 70, -30], face: { eyes: 'happy', mouth: 'open' } });
    butler('K', { x: 560, y: 800, lean: .45, aR: [40, 90, -20], aL: [-140, 60], head: { rot: .1 }, face: { eyes: 'closed' } });
    butler('S', { x: 920, y: 800, kneel: 1, aR: [150, 40, 0], aL: [-30, 60, -30], face: { eyes: 'half', mouth: 'smirk' } });
    butler('J', { x: 1280, y: 800, aR: [60, -40, 40], aL: [-60, -40, -40], fL: [-20, -30], head: { rot: -.12 }, face: { eyes: 'gt', mouth: 'big' }, sq: .05 });
    butler('I', { x: 1640, y: 800, flip: true, aR: [170, 20], aL: [-90, 110, 30], face: { eyes: 'angry', mouth: 'grit', brows: 'angry', shade: 1, anger: 1 } });
    lady(3, { x: 960, y: 420, s: .5, aL: [-130, 20], aR: [130, 20], face: { eyes: 'happy', mouth: 'open', blush: 1 }, sway: 1 });
  }
};
