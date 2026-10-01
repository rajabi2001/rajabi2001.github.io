// The backdrop's drifting, twinkling token dust: the same motion as the videos' Dust (remotion/src/method/Cinematic.tsx),
// on a fixed canvas behind the page. Its colour follows the accent of the section in view (the story's accent:
// problem, coarse, fine), easing from one to the next. Reduced motion draws one still frame.
(function () {
  "use strict";
  const cv = document.getElementById("dust");
  if (!cv || !cv.getContext) return;
  const g = cv.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ACCENTS = {
    coarse: [125, 180, 255], fine: [242, 166, 90], bad: [255, 138, 122], halo: [79, 209, 184],
    bridge: [247, 215, 116], text: [238, 232, 220], mix: [200, 175, 190],
  };
  let col = ACCENTS.coarse.slice();
  let target = ACCENTS.coarse;

  // deterministic per-particle randoms (the videos use remotion's random(seed))
  const rnd = (s) => {
    let t = (s * 0x6d2b79f5) | 0;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  let parts = [];
  let W = 0, H = 0, dpr = 1, unit = 1;
  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    unit = Math.max(0.6, Math.min(1, Math.hypot(W, H) / Math.hypot(1920, 1080)));
    const n = Math.round(Math.max(28, Math.min(90, (70 * W * H) / (1920 * 1080))));
    parts = Array.from({length: n}, (_, k) => ({k, x: rnd(k * 3 + 1), y: rnd(k * 3 + 2), z: 0.3 + rnd(k * 3 + 3) * 0.7}));
    if (still) frame(0);
  };

  // one glow sprite, rebuilt only when the colour moves
  const sprite = document.createElement("canvas");
  const sg = sprite.getContext("2d");
  let spriteKey = "";
  const S = 64;
  sprite.width = sprite.height = S;
  const buildSprite = () => {
    const key = col.map(Math.round).join(",");
    if (key === spriteKey) return;
    spriteKey = key;
    sg.clearRect(0, 0, S, S);
    const r = sg.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    r.addColorStop(0, `rgba(${key},1)`);
    r.addColorStop(0.16, `rgba(${key},0.95)`);
    r.addColorStop(0.3, `rgba(${key},0.28)`);
    r.addColorStop(1, `rgba(${key},0)`);
    sg.fillStyle = r;
    sg.fillRect(0, 0, S, S);
  };

  const frame = (f) => {
    buildSprite();
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    for (const p of parts) {
      const z = p.z;
      const x = (((p.x * W + f * 0.25 * z + Math.sin(f / (80 + p.k)) * 14 * z) % W) + W) % W;
      const y = (((p.y * H - f * 0.35 * z) % H) + H) % H;
      const r = (1.5 + 4.5 * z) * unit;
      const tw = 0.55 + 0.45 * Math.sin(f / 20 + p.k * 1.7); // the blink
      g.globalAlpha = 0.55 * z * tw;
      const s = r * 4; // the dot plus its glow (box-shadow r*3 in the videos)
      g.drawImage(sprite, x - s / 2, y - s / 2, s, s);
    }
    g.globalAlpha = 1;
  };

  // which section's accent: the one whose box holds the viewport's upper-middle line
  const sections = Array.from(document.querySelectorAll("[data-accent]"));
  const glow = document.querySelector(".backdrop__glow");
  const pick = () => {
    const y = window.innerHeight * 0.45;
    let best = null;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom >= y) best = s;
    }
    if (!best) return;
    target = ACCENTS[best.dataset.accent] || ACCENTS.coarse;
    if (still) {
      col = target.slice();
      frame(0);
    }
  };
  const tintGlow = () => {
    if (glow) glow.style.setProperty("--glow", `rgba(${col.map(Math.round).join(",")},0.09)`);
  };

  window.addEventListener("resize", resize, {passive: true});
  window.addEventListener("scroll", pick, {passive: true});
  resize();
  pick();
  col = target.slice();
  tintGlow();
  if (still) return;

  let t0 = null, last = 0;
  const tick = (now) => {
    if (t0 === null) t0 = now;
    const dt = Math.min(0.1, (now - last) / 1000 || 0);
    last = now;
    const a = 1 - Math.exp(-dt * 2.2); // ease the colour toward the section's accent
    for (let i = 0; i < 3; i++) col[i] += (target[i] - col[i]) * a;
    tintGlow();
    frame(((now - t0) / 1000) * 30); // the videos' frame clock: 30 fps
    raf = requestAnimationFrame(tick);
  };
  let raf = requestAnimationFrame(tick);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  });
})();
