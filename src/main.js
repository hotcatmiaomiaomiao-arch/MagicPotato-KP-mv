// ===== main: scene manager, lyric overlay, player =====

// scene(t0, t1, fn(t, lt, dur), {tr, td})

const WHOCOL = { R: '#222121', K: '#e9a800', S: '#a51c28', J: '#0aa3c0', I: '#6f32ab', A: '#e8557a' };

function drawLyrics(t) {
  for (const L of LYRICS) {
    const [t0, t1, zh] = L; if (t < t0 - .12 || t > t1 + .18) continue;
    const a = Math.min(seg(t, t0 - .12, t0 + .06), 1 - seg(t, t1 - .02, t1 + .18)); if (a <= 0) continue;
    const segs = L.slice(3), size = 58, gap = 26;
    const ws = segs.map(s => textW(s[1], size, F.jp)); let tot = ws.reduce((x, y) => x + y, 0) + gap * (segs.length - 1);
    const sc = tot > 1640 ? 1640 / tot : 1; const y = 945;
    alpha(a, () => {
      ctx.save(); ctx.translate(W / 2, 0); ctx.scale(sc, 1); let x = -tot / 2;
      segs.forEach((s, i) => {
        const st = s[2] === undefined ? t0 : s[2], p = i === 0 ? 1 : pop(t, st - .05, .25);
        if (p > 0) {
          const col = WHOCOL[s[0]], cx = x + ws[i] / 2, yy = y + (1 - Math.min(1, p)) * 20;
          withT(cx, yy, Math.min(p, 1.08), 0, () => {
            txt(s[1], 0, 4, size, 'rgba(70,45,30,.28)', { sw: 18, sc: 'rgba(70,45,30,.28)' });
            txt(s[1], 0, 0, size, col, { sw: 13, sc: '#fff' });
            // singer chip
            const nm = s[0] === 'A' ? 'ALL' : BUT[s[0]].name, cw = textW(nm, 25, F.en, 600) + (s[0] === 'A' ? 118 : 62), chx = -ws[i] / 2 + cw / 2 - 4, chy = -62;
            rrect(chx - cw / 2 - 3, chy - 21, cw + 6, 42, 21, '#fff'); rrect(chx - cw / 2, chy - 18, cw, 36, 18, s[0] === 'A' ? '#f26286' : (s[0] === 'K' ? '#f2b705' : BUT[s[0]].coat));
            if (s[0] === 'A') { ORDER.forEach((k, j) => { circ(chx - cw / 2 + 20 + j * 15, chy, 8.5, '#fff'); circ(chx - cw / 2 + 20 + j * 15, chy, 6.5, BUT[k].coat); }); txt(nm, chx + 40, chy + 1, 25, '#fff', { f: F.en, w: 600 }); }
            else { circ(chx - cw / 2 + 19, chy, 12, '#fff'); circ(chx - cw / 2 + 19, chy, 9, BUT[s[0]].hair); txt(nm, chx + 15, chy + 1, 25, '#fff', { f: F.en, w: 600 }); }
          });
        }
        x += ws[i] + gap;
      });
      ctx.restore();
      txt(zh, W / 2, 1018, 35, '#5a4034', { f: F.zh, w: 400, sw: 9, sc: 'rgba(255,255,255,.95)' });
    });
  }
}

function renderAt(t) {
  t = clamp(t, 0, DUR - .001);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.clearRect(0, 0, W, H);
  let idx = -1; for (let i = 0; i < SC.length; i++) if (SC[i].t0 <= t) idx = i;
  if (idx < 0) { bgFill(C.bg); } else {
    const s = SC[idx], p = (t - s.t0) / s.td;
    if (p < 1 && s.tr !== 'cut' && idx > 0) {
      const q = SC[idx - 1]; ctx.save(); q.fn(t, t - q.t0, q.t1 - q.t0); ctx.restore();
      ctx.save(); if (s.tr === 'fade') ctx.globalAlpha = E.io(p); else TR[s.tr](p, s.o); s.fn(t, t - s.t0, s.t1 - s.t0); ctx.restore();
    } else { ctx.save(); s.fn(t, t - s.t0, s.t1 - s.t0); ctx.restore(); }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  if (typeof overlayFX === 'function') overlayFX(t);
  drawLyrics(t);
  if (t < .6) rect(0, 0, W, H, rgba('#fdfbf3', 1 - seg(t, 0, .6)));
  if (t > 296.5) rect(0, 0, W, H, rgba('#fdfbf3', seg(t, 296.5, 299)));
}

async function boot() {
  const cv = document.getElementById('cv'); ctx = cv.getContext('2d');
  try { await Promise.all(['900 40px ZenMaru', '400 40px ZCOOL', '600 40px Fredoka', '400 40px Pacifico'].map(f => document.fonts.load(f, 'あ大A'))); await document.fonts.ready; } catch (e) { }
  window.__fontsReady = true; SC.sort((a, b) => a.t0 - b.t0);
  window.renderAt = renderAt; window.__ready = true;
  if (location.hash.includes('render')) { document.body.classList.add('render'); renderAt(0); return; }
  const au = document.getElementById('au'), ui = document.getElementById('ui'), bar = document.getElementById('seek'), tm = document.getElementById('tm'), btn = document.getElementById('pp'), big = document.getElementById('big');
  const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  let last = -1, base = 0, baseAt = 0;
  const now = () => { if (au.paused) return au.currentTime; const c = au.currentTime; if (Math.abs(c - last) > 1e-4) { last = c; base = c; baseAt = performance.now(); } return Math.min(DUR, base + (performance.now() - baseAt) / 1000); };
  const loop = () => { const t = now(); renderAt(t); if (!bar.matches(':active')) bar.value = t / DUR * 1000; tm.textContent = fmt(t) + ' / ' + fmt(DUR); btn.textContent = au.paused ? '▶' : '❚❚'; requestAnimationFrame(loop); };
  const toggle = () => { big.style.display = 'none'; if (au.paused) au.play(); else au.pause(); };
  btn.onclick = toggle; big.onclick = toggle; cv.onclick = toggle;
  bar.oninput = () => { au.currentTime = bar.value / 1000 * DUR; last = -1; };
  document.getElementById('fs').onclick = () => { const el = document.documentElement; if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen(); };
  document.addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); toggle(); } if (e.code === 'ArrowRight') au.currentTime = Math.min(DUR, au.currentTime + 5); if (e.code === 'ArrowLeft') au.currentTime = Math.max(0, au.currentTime - 5); if (e.key === 'f') document.getElementById('fs').click(); });
  let hideT = 0; const show = () => { ui.classList.remove('hide'); document.body.style.cursor = ''; clearTimeout(hideT); hideT = setTimeout(() => { if (!au.paused) { ui.classList.add('hide'); document.body.style.cursor = 'none'; } }, 2500); };
  document.addEventListener('mousemove', show); document.addEventListener('touchstart', show);
  const m = /t=([\d.]+)/.exec(location.hash); if (m) au.currentTime = +m[1];
  loop();
}
window.addEventListener('load', boot);
