// "The idea": the two phases as abstract token grids (after the videos' IdeaPage and the paper's Figure 4), driven by
// one noise level sigma on the axis below them. Before sigma* (Phase I) a query reaches every pooled key, one per f x f
// block, with f decreasing; after it (Phase II) local windows shrink and windows over smooth regions split in four.
// It plays once when first in view, then freezes with both phases on; dragging the marker shows one noise level.
(function () {
  "use strict";
  const root = document.getElementById("idea");
  const s1 = document.getElementById("mini1");
  const s2 = document.getElementById("mini2");
  const axis = document.getElementById("axis");
  if (!root || !s1 || !s2 || !axis) return;

  const C = {text: "#EEE8DC", muted: "#8C9BB4", coarse: "#7DB4FF", fine: "#F2A65A"};
  const SSTAR = 0.89; // FLUX.1's switch (paper App. A.3); the axis is drawn in sigma, 1 -> 0
  const N = 16, PAD = 10, CELL = (300 - 2 * PAD) / N;
  const Q = [5, 6]; // the query token (col, row)
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const smooth = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
  const px = (i) => PAD + i * CELL;
  const ctr = (i) => PAD + (i + 0.5) * CELL;
  const f2 = (n) => n.toFixed(1);
  axis.style.setProperty("--star", `${(1 - SSTAR) * 100}%`);
  root.querySelector(".axis__lab--star").style.left = `${(1 - SSTAR) * 100}%`;

  // ---------- Phase I ----------
  const phase1 = (p, on) => {
    const out = [];
    out.push(`<rect x="${PAD - 4}" y="${PAD - 4}" width="${300 - 2 * PAD + 8}" height="${300 - 2 * PAD + 8}" rx="12" fill="rgba(17,33,58,0.6)" stroke="${C.coarse}" stroke-opacity="0.55" stroke-width="1.5"/>`);
    // a coarse factor for the first half of the phase, then a finer one, crossfading (drawn as 4 and 2 on this 16-token toy grid)
    const mixF = smooth((p - 0.45) / 0.12);
    const layer = (f, a) => {
      if (a < 0.01) return;
      const nb = N / f, bs = f * CELL;
      for (let by = 0; by < nb; by++) for (let bx = 0; bx < nb; bx++) {
        out.push(`<rect x="${f2(px(bx * f) + 1.5)}" y="${f2(px(by * f) + 1.5)}" width="${f2(bs - 3)}" height="${f2(bs - 3)}" rx="${f === 4 ? 6 : 4}" fill="${C.coarse}" fill-opacity="${0.05 * a}" stroke="${C.coarse}" stroke-opacity="${0.4 * a}" stroke-width="1"/>`);
      }
      const qx = ctr(Q[0]), qy = ctr(Q[1]);
      for (let by = 0; by < nb; by++) for (let bx = 0; bx < nb; bx++) {
        const kx = PAD + (bx + 0.5) * bs, ky = PAD + (by + 0.5) * bs;
        out.push(`<line x1="${f2(qx)}" y1="${f2(qy)}" x2="${f2(kx)}" y2="${f2(ky)}" stroke="${C.coarse}" stroke-opacity="${(0.32 * a * on).toFixed(3)}" stroke-width="0.9"/>`);
      }
      for (let by = 0; by < nb; by++) for (let bx = 0; bx < nb; bx++) {
        const kx = PAD + (bx + 0.5) * bs, ky = PAD + (by + 0.5) * bs;
        out.push(`<circle cx="${f2(kx)}" cy="${f2(ky)}" r="${f === 4 ? 4.6 : 3.4}" fill="${C.coarse}" fill-opacity="${a}" filter="url(#g1)"/>`);
      }
      return nb;
    };
    // the full-resolution tokens, faint: the queries stay full-res
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) out.push(`<circle cx="${f2(ctr(c))}" cy="${f2(ctr(r))}" r="1.1" fill="${C.muted}" fill-opacity="0.35"/>`);
    layer(4, 1 - mixF);
    layer(2, mixF);
    out.push(`<circle cx="${f2(ctr(Q[0]))}" cy="${f2(ctr(Q[1]))}" r="6" fill="${C.text}" filter="url(#g2)"/>`);
    // the label stays general: f starts at the factor matching the native grid and shrinks (the values depend on
    // the model and the target size)
    const lab = mixF > 0.5 ? "f smaller" : "f = f₀";
    out.push(`<g transform="translate(212 -26)"><rect width="82" height="22" rx="7" fill="rgba(11,22,40,0.8)" stroke="${C.coarse}" stroke-opacity="0.6"/><text x="41" y="15" text-anchor="middle" font-family="IBM Plex Mono, IBM Plex Sans, monospace" font-size="12" fill="${C.coarse}">${lab}</text></g>`);
    return out.join("");
  };

  // ---------- Phase II ----------
  // Windows shrink continuously. Each axis takes the fewest windows that cover it, spaced evenly, so neighbours overlap
  // slightly; when the windows get small enough one more fits per axis and the tiling steps to it. Late in the phase,
  // windows over smooth regions split in four while windows over detail keep their size. Sizes are for this toy grid.
  // a toy detail map: a subject left of centre and a horizon line; everything else smooth
  const detail = (c, r) => Math.exp(-(((c - 5.5) ** 2) / 10 + ((r - 7) ** 2) / 14)) + 0.8 * Math.exp(-((r - 11) ** 2) / 1.2);
  // [p from, p to, side from, side to]: per window count, a side just above N / count, shrinking (slight overlap)
  const STAGES = [[0, 0.3, 8.8, 8.3], [0.3, 0.6, 5.8, 5.45], [0.6, 1, 4.45, 4.15]];
  const sideAt = (p) => {
    for (const [a, b, w0, w1] of STAGES) if (p <= b) return w0 + (w1 - w0) * smooth((p - a) / (b - a));
    return STAGES[STAGES.length - 1][3];
  };
  const tiling = (w) => {
    const n = Math.ceil(N / w - 1e-6);
    const st = Array.from({length: n}, (_, i) => (n === 1 ? 0 : (i * (N - w)) / (n - 1)));
    const out = [];
    for (const y of st) for (const x of st) out.push([x, y, w]);
    return out;
  };
  const meanDetail = ([x, y, w]) => {
    let s = 0, k = 0;
    for (let r = Math.floor(y); r < Math.ceil(y + w); r++) for (let c = Math.floor(x); c < Math.ceil(x + w); c++) { s += detail(c, r); k++; }
    return s / k;
  };
  const phase2 = (p, on) => {
    const out = [];
    out.push(`<rect x="${PAD - 4}" y="${PAD - 4}" width="${300 - 2 * PAD + 8}" height="${300 - 2 * PAD + 8}" rx="12" fill="rgba(17,33,58,0.6)" stroke="${C.fine}" stroke-opacity="0.55" stroke-width="1.5"/>`);
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) out.push(`<circle cx="${f2(ctr(c))}" cy="${f2(ctr(r))}" r="1.1" fill="${C.muted}" fill-opacity="0.35"/>`);
    const w = sideAt(p);
    const sp = smooth((p - 0.74) / 0.1); // the splits arrive near the end
    const qx = Q[0] + 0.5, qy = Q[1] + 0.5;
    let qwin = null, qd = Infinity;
    const rect = (x, y, s, stroke, sw, so, fill, fo, rx) =>
      `<rect x="${f2(px(x) + 1.5)}" y="${f2(px(y) + 1.5)}" width="${f2(s * CELL - 3)}" height="${f2(s * CELL - 3)}" rx="${rx}" fill="${fill}" fill-opacity="${fo.toFixed(3)}" stroke="${stroke}" stroke-opacity="${so.toFixed(3)}" stroke-width="${sw}"/>`;
    for (const b of tiling(w)) {
      const [x, y, s] = b;
      const split = sp > 0 && meanDetail(b) < 0.12;
      // a faint fill, so the overlaps between neighbours read as darker bands
      out.push(rect(x, y, s, C.fine, 1.6, 0.85 * (split ? 1 - sp : 1), C.fine, 0.05, 5));
      const parts = split ? [[x, y, s / 2], [x + s / 2, y, s / 2], [x, y + s / 2, s / 2], [x + s / 2, y + s / 2, s / 2]] : [b];
      if (split) for (const [a, c, h] of parts) out.push(rect(a, c, h, C.text, 1.2, 0.7 * sp, "none", 0, 3));
      for (const q of (split && sp > 0.5 ? parts : [b])) {
        if (qx < q[0] || qx > q[0] + q[2] || qy < q[1] || qy > q[1] + q[2]) continue;
        const d = Math.hypot(q[0] + q[2] / 2 - qx, q[1] + q[2] / 2 - qy);
        if (d < qd) { qd = d; qwin = q; }
      }
    }
    if (qwin && on > 0) {
      const [x, y, s] = qwin;
      out.push(rect(x, y, s, C.fine, 2.2, 1, C.fine, 0.22 * on, 5));
      out.push(`<circle cx="${f2(ctr(Q[0]))}" cy="${f2(ctr(Q[1]))}" r="6" fill="${C.text}" filter="url(#g4)"/>`);
    }
    const chip = (x, col, label, a) => `<g transform="translate(${x} 314)" opacity="${a.toFixed(2)}"><rect width="10" height="10" y="-9" rx="2" fill="none" stroke="${col}" stroke-width="1.6"/><text x="15" y="0" font-family="IBM Plex Mono, monospace" font-size="11" fill="${C.muted}">${label}</text></g>`;
    out.push(chip(76, C.fine, "window", 1), chip(160, C.text, "split", 0.35 + 0.65 * sp));
    return out.join("");
  };

  const defs = (id, col, sd) => `<filter id="${id}" x="-200%" y="-200%" width="500%" height="500%"><feDropShadow dx="0" dy="0" stdDeviation="${sd}" flood-color="${col}" flood-opacity="0.9"/></filter>`;
  const D1 = `<defs>${defs("g1", C.coarse, 2.5)}${defs("g2", C.text, 4)}</defs>`;
  const D2 = `<defs>${defs("g4", C.text, 4)}</defs>`;

  const p1el = document.getElementById("phase1"), p2el = document.getElementById("phase2");
  let sigma = 1, last1 = "", last2 = "", frozen = false;
  // frozen: the animation has played once; both phases stay on, each at its end state
  const render = () => {
    const p1 = frozen ? 1 : clamp((1 - sigma) / (1 - SSTAR));
    const p2 = frozen ? 1 : clamp((SSTAR - sigma) / SSTAR);
    const in1 = sigma > SSTAR;
    const a = phase1(p1, frozen || in1 ? 1 : 0.45);
    const b = phase2(p2, frozen || !in1 ? 1 : 0);
    if (a !== last1) s1.innerHTML = D1 + (last1 = a);
    if (b !== last2) s2.innerHTML = D2 + (last2 = b);
    p1el.classList.toggle("is-dim", !frozen && !in1);
    p2el.classList.toggle("is-dim", !frozen && in1);
    const s = frozen ? 0 : sigma;
    axis.style.setProperty("--pos", `${(1 - s) * 100}%`);
    axis.style.setProperty("--knob", s > SSTAR ? C.coarse : C.fine);
    axis.setAttribute("aria-valuenow", s.toFixed(2));
    axis.setAttribute("aria-valuetext", frozen ? "both phases shown" : `σ = ${sigma.toFixed(2)}, ${in1 ? "Phase I" : "Phase II"}`);
  };
  const freeze = () => {
    frozen = true;
    render();
  };

  // plays once when first in view: Phase I's sweep, a beat at sigma*, Phase II's; then it freezes with both phases on
  const KEYS = [[0, 1], [0.7, 1], [4.4, SSTAR], [5.2, SSTAR], [12, 0]];
  const END = 12.6;
  const at = (t) => {
    for (let i = 1; i < KEYS.length; i++) {
      const [ta, sa] = KEYS[i - 1], [tb, sb] = KEYS[i];
      if (t <= tb) return sa + (sb - sa) * (t - ta) / Math.max(1e-6, tb - ta);
    }
    return 0;
  };
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = false, raf = 0, clock = 0, prev = 0, played = false, io = null;
  const tick = (now) => {
    const dt = Math.min(0.1, (now - prev) / 1000);
    prev = now;
    clock += dt;
    if (clock >= END) {
      played = true;
      if (io) io.disconnect();
      freeze();
      return;
    }
    sigma = at(clock);
    render();
    if (visible) raf = requestAnimationFrame(tick);
  };
  if (still) freeze();
  else {
    render();
    io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !played) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }, {threshold: 0.25});
    io.observe(root);
  }

  // scrubbing: dragging the marker (or the arrow keys) shows one noise level; letting go returns to the frozen view
  let back = 0;
  const show = (sg) => {
    if (!played) {
      played = true;
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
    }
    clearTimeout(back);
    frozen = false;
    sigma = sg;
    render();
  };
  const settle = (ms) => {
    clearTimeout(back);
    back = setTimeout(freeze, ms);
  };
  const setFrom = (x) => {
    const r = axis.getBoundingClientRect();
    show(1 - clamp((x - r.left) / r.width));
  };
  let dragging = false;
  axis.addEventListener("pointerdown", (e) => {
    dragging = true;
    axis.setPointerCapture(e.pointerId);
    setFrom(e.clientX);
  });
  axis.addEventListener("pointermove", (e) => dragging && setFrom(e.clientX));
  const release = () => {
    if (!dragging) return;
    dragging = false;
    settle(1200);
  };
  axis.addEventListener("pointerup", release);
  axis.addEventListener("pointercancel", release);
  axis.addEventListener("keydown", (e) => {
    const d = {ArrowLeft: 0.02, ArrowDown: 0.02, ArrowRight: -0.02, ArrowUp: -0.02, Home: 1, End: -1}[e.key];
    if (d === undefined) return;
    e.preventDefault();
    show(e.key === "Home" ? 1 : e.key === "End" ? 0 : clamp((frozen ? 0 : sigma) + d));
    settle(2000);
  });
})();
