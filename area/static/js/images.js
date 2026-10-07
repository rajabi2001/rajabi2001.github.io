// Progressive images and zoom.
//
// <div data-img="ID"> becomes a box sized from the manifest (static/data/images.js, written by tools/build_images.py),
// so nothing shifts as it loads, in three stages:
//   1. the ~600 byte blurred placeholder inlined in the manifest, shown at once;
//   2. a display image the browser picks for the screen (AVIF, else WebP, else JPEG; srcset + sizes), loaded lazily
//      unless data-priority="high", fading in over the placeholder;
//   3. with data-zoom, the full-resolution file, fetched only when the viewer zooms in past what the display image holds.
// With data-magnifier instead, a lens sits on the image and follows the cursor (see Magnifier).
// Zoom: click to zoom at a point, click again for full detail, drag to pan, Esc or Reset to leave. Boxes that share
// data-zoom-group zoom and pan together (side-by-side comparisons). An id missing from the manifest renders a labelled
// placeholder, so the layout can be built before the images exist.
(function () {
  "use strict";
  const M = window.AREA_IMAGES || {};
  const BASE = "./static/img/";
  const LEVELS = [1, 2.5, 5];
  const DRAG = 5;

  const el = (tag, cls, attrs) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  const srcset = (id, e, fmt) => e.widths.map((w) => `${BASE}${id}/w${w}.${fmt} ${w}w`).join(", ");

  function picture(host) {
    const id = host.dataset.img;
    const e = M[id];
    const box = el("div", "pimg");
    if (!e) {
      box.classList.add("pimg--pending");
      box.style.setProperty("--ar", host.dataset.ar || "16 / 9");
      box.appendChild(el("span")).textContent = `image · ${id}`;
      return {box, e: null};
    }
    box.style.setProperty("--ar", `${e.w} / ${e.h}`);
    box.style.backgroundImage = `url("${e.lqip}")`;
    const pic = el("picture");
    const sizes = host.dataset.sizes || "100vw";
    for (const fmt of e.formats) {
      if (fmt === "jpg") continue;
      pic.appendChild(el("source", null, {type: `image/${fmt}`, srcset: srcset(id, e, fmt), sizes}));
    }
    const high = host.dataset.priority === "high";
    const img = el("img", null, {
      src: `${BASE}${id}/w${e.fallback}.jpg`, alt: host.dataset.alt || "", width: e.w, height: e.h,
      decoding: "async", loading: high ? "eager" : "lazy", fetchpriority: high ? "high" : "auto",
    });
    const loaded = () => box.classList.add("is-loaded");
    img.addEventListener("load", loaded, {once: true});
    pic.appendChild(img);
    box.appendChild(pic);
    if (img.complete && img.naturalWidth) loaded();
    return {box, e, img};
  }

  // ---------- zoom, optionally shared by a group ----------
  const groups = new Map();

  function Zoom(host, id, e, img) {
    const stage = el("div", "zoom__stage");
    const ui = el("div", "zoom__ui");
    const reset = el("button", "zoom__btn", {type: "button"});
    reset.textContent = "reset";
    ui.appendChild(reset);
    const badge = el("div", "zoom__badge");
    badge.textContent = "loading detail";
    host.classList.add("zoom");
    host.setAttribute("tabindex", "0");
    host.setAttribute("role", "button");
    host.setAttribute("aria-label", (host.dataset.alt ? host.dataset.alt + ": " : "") + "click to zoom");
    host.style.aspectRatio = `${e.w} / ${e.h}`;
    while (host.firstChild) stage.appendChild(host.firstChild);
    host.append(stage, ui, badge);

    let hq = null; // the full-resolution layer, created on first need
    const needHq = (s) => {
      if (hq || !e.hq) return;
      const shown = img.currentSrc ? parseInt((img.currentSrc.match(/w(\d+)\.\w+$/) || [])[1] || e.fallback, 10) : e.fallback;
      if (host.clientWidth * s * (window.devicePixelRatio || 1) <= shown * 1.05) return;
      hq = el("img", "zoom__hq", {alt: "", decoding: "async"});
      host.classList.add("is-loading-hq");
      hq.onload = () => {
        host.classList.remove("is-loading-hq");
        requestAnimationFrame(() => hq.classList.add("is-loaded"));
      };
      hq.onerror = () => host.classList.remove("is-loading-hq");
      hq.src = `./${e.hq.src}`;
      stage.appendChild(hq);
    };

    const z = {host, stage, needHq};
    const gid = host.dataset.zoomGroup || `solo-${Math.random()}`;
    if (!groups.has(gid)) groups.set(gid, {level: 0, fx: 0.5, fy: 0.5, members: []});
    const G = groups.get(gid);
    G.members.push(z);

    const apply = (animate) => {
      const s = LEVELS[G.level];
      for (const m of G.members) {
        const W = m.host.clientWidth, H = m.host.clientHeight;
        let tx = W / 2 - G.fx * W * s, ty = H / 2 - G.fy * H * s;
        tx = Math.min(0, Math.max(W - W * s, tx));
        ty = Math.min(0, Math.max(H - H * s, ty));
        m.stage.style.transition = animate ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
        m.stage.style.transform = s === 1 ? "none" : `translate(${tx}px, ${ty}px) scale(${s})`;
        m.host.classList.toggle("is-zoomed", G.level > 0);
        if (G.level > 0) m.needHq(s);
      }
    };
    // the image point under the pointer, as fractions of the image
    const at = (cx, cy) => {
      const r = host.getBoundingClientRect();
      const s = LEVELS[G.level];
      const W = r.width, H = r.height;
      let tx = W / 2 - G.fx * W * s, ty = H / 2 - G.fy * H * s;
      tx = Math.min(0, Math.max(W - W * s, tx));
      ty = Math.min(0, Math.max(H - H * s, ty));
      return {fx: (cx - r.left - tx) / (W * s), fy: (cy - r.top - ty) / (H * s)};
    };
    const clampC = () => {
      const s = LEVELS[G.level];
      const h = 0.5 / s;
      G.fx = Math.min(1 - h, Math.max(h, G.fx));
      G.fy = Math.min(1 - h, Math.max(h, G.fy));
    };
    const zoomAt = (cx, cy) => {
      const p = at(cx, cy);
      G.level = Math.min(LEVELS.length - 1, G.level + 1);
      G.fx = p.fx;
      G.fy = p.fy;
      clampC();
      apply(true);
    };
    const out = () => {
      G.level = 0;
      G.fx = G.fy = 0.5;
      apply(true);
    };

    let down = null, dragging = false;
    host.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0 || ev.target.closest(".zoom__ui")) return;
      down = {x: ev.clientX, y: ev.clientY, fx: G.fx, fy: G.fy, id: ev.pointerId};
      dragging = false;
    });
    host.addEventListener("pointermove", (ev) => {
      if (!down || ev.pointerId !== down.id || G.level === 0) return;
      const dx = ev.clientX - down.x, dy = ev.clientY - down.y;
      if (!dragging) {
        if (Math.hypot(dx, dy) < DRAG) return;
        dragging = true;
        host.setPointerCapture(ev.pointerId);
        host.classList.add("is-dragging");
      }
      const s = LEVELS[G.level];
      G.fx = down.fx - dx / (host.clientWidth * s);
      G.fy = down.fy - dy / (host.clientHeight * s);
      clampC();
      apply(false);
    });
    const up = (ev) => {
      if (!down || ev.pointerId !== down.id) return;
      if (!dragging && ev.type === "pointerup") zoomAt(ev.clientX, ev.clientY);
      host.classList.remove("is-dragging");
      down = null;
      dragging = false;
    };
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    reset.addEventListener("click", (ev) => {
      ev.stopPropagation();
      out();
    });
    host.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") out();
      else if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        const r = host.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2);
      }
    });
    window.addEventListener("resize", () => apply(false), {passive: true});
  }

  // ---------- magnifier: a lens parked on the image that follows the cursor ----------
  // data-magnifier on the host; data-lens="x,y" parks it (fractions of the image), data-lens-zoom sets the power, and
  // data-lens-zooms="4,8" offers a choice of powers: a switch on the image's corner, a mouse click on the image, or +/-.
  // The lens first magnifies the largest display file; the full-resolution file is fetched on the first interaction.
  // Mouse: the lens glides after the cursor and returns to its spot on leave. Touch: drag it, or tap to move it.
  // Keyboard: focus the image and use the arrow keys.
  function Magnifier(host, id, e, img) {
    const [px0, py0] = (host.dataset.lens || "0.5,0.5").split(",").map(Number);
    const Z0 = Number(host.dataset.lensZoom || 4);
    const powers = [...new Set([Z0, ...(host.dataset.lensZooms || "").split(",").map(Number).filter((n) => n > 1)])]
      .sort((a, b) => a - b);
    let Z = Z0, zT = Z0; // the power drawn, easing towards the chosen one
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    host.classList.add("magnify");
    host.style.aspectRatio = `${e.w} / ${e.h}`;
    host.setAttribute("tabindex", "0");
    host.setAttribute("aria-label", (host.dataset.alt ? host.dataset.alt + ". " : "") + "Magnifier: move the pointer over the image, or use the arrow keys"
      + (powers.length > 1 ? `; press + or − to change the power (${powers.map((p) => p + "×").join(", ")}).` : "."));
    // the lens paints its source as a background, so only the lens' own circle is drawn each frame
    const lens = el("div", "lens");
    const tag = el("div", "lens__tag");
    tag.textContent = `${Z}×`;
    host.append(lens, tag);
    // layers, sharpest first: the full-resolution file once fetched; before that, a small full-resolution crop of the
    // parked spot (e.lens, so the lens is sharp at rest) over the largest display file
    let src = "", full = "", ready = false; // ready: draw() exists (it is defined further down)
    const crop = e.lens || null;
    const use = (u) => {
      src = u;
      if (ready) draw();
    };

    // the lens' base layer: the very display file the page already shows (no extra download); the full-resolution file
    // replaces it on the first interaction
    const setSrc = () => { if (!src) use(img.currentSrc || img.src); };
    if (img.complete && img.naturalWidth) setSrc();
    else img.addEventListener("load", setSrc, {once: true});
    let hq = false;
    const upgrade = () => {
      if (hq || !e.hq) return;
      hq = true;
      host.classList.add("is-loading-hq");
      const img2 = new Image();
      img2.decoding = "async";
      img2.onload = () => {
        // decode before swapping, so the lens never flashes empty
        (img2.decode ? img2.decode() : Promise.resolve()).catch(() => {}).then(() => {
          full = img2.src;
          draw();
          host.classList.remove("is-loading-hq");
          draw();
        });
      };
      img2.onerror = () => host.classList.remove("is-loading-hq");
      img2.src = `./${e.hq.src}`;
    };

    let cur = {x: px0, y: py0}, tgt = {x: px0, y: py0}, raf = 0;
    const lensD = () => Math.round(Math.min(Math.max(host.clientWidth < 560 ? 110 : 150, host.clientWidth * 0.26), 300));
    const draw = () => {
      const W = host.clientWidth, H = host.clientHeight;
      const D = lensD();
      const x = cur.x * W, y = cur.y * H;
      lens.style.width = lens.style.height = `${D}px`;
      lens.style.transform = `translate(${x - D / 2}px, ${y - D / 2}px)`;
      const layer = (u, x0, y0, x1, y1) => ({
        img: `url("${u}")`,
        size: `${(x1 - x0) * W * Z}px ${(y1 - y0) * H * Z}px`,
        pos: `${D / 2 - x * Z + x0 * W * Z}px ${D / 2 - y * Z + y0 * H * Z}px`,
      });
      const layers = full ? [layer(full, 0, 0, 1, 1)] : [];
      if (!full && crop) layers.push(layer(`./${crop.src}`, crop.x0, crop.y0, crop.x1, crop.y1));
      if (!full && src) layers.push(layer(src, 0, 0, 1, 1));
      lens.style.backgroundImage = layers.map((l) => l.img).join(", ");
      lens.style.backgroundSize = layers.map((l) => l.size).join(", ");
      lens.style.backgroundPosition = layers.map((l) => l.pos).join(", ");
      // the label rides on the lens' lower rim
      tag.style.transform = `translate(${x - tag.offsetWidth / 2}px, ${y + D / 2 - tag.offsetHeight - 6}px)`;
    };
    const step = () => {
      const k = still ? 1 : 0.22;
      cur.x += (tgt.x - cur.x) * k;
      cur.y += (tgt.y - cur.y) * k;
      // the power eases in log space, so 4× → 8× feels as even as 8× → 4×
      Z = Math.exp(Math.log(Z) + (Math.log(zT) - Math.log(Z)) * k);
      if (Math.abs(zT - Z) < 0.01) Z = zT;
      draw();
      if (Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) > 0.0005 || Z !== zT) raf = requestAnimationFrame(step);
      else raf = 0;
    };
    // the lens' centre can go anywhere on the image, so every corner can be magnified; at the edges the lens hangs
    // over the frame like a loupe
    const go = (x, y) => {
      tgt = {x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y))};
      if (!raf) raf = requestAnimationFrame(step);
    };
    const at = (ev) => {
      const r = host.getBoundingClientRect();
      return [(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height];
    };

    // the power switch: one button per power, on the image's top-right corner
    let power = null;
    const setPower = (p) => {
      if (p === zT) return;
      zT = p;
      tag.textContent = `${p}×`;
      for (const b of power.querySelectorAll("button")) b.setAttribute("aria-pressed", String(Number(b.dataset.power) === p));
      upgrade(); // a higher power outruns the display file quickly, so fetch the full-resolution file now
      if (!raf) raf = requestAnimationFrame(step);
    };
    // d = +1 / -1; wrap: from the highest power back to the lowest (the mouse click)
    const cycle = (d, wrap) => {
      const i = powers.indexOf(zT), n = powers.length;
      setPower(powers[wrap ? (i + d + n) % n : Math.min(n - 1, Math.max(0, i + d))]);
    };
    if (powers.length > 1) {
      power = el("div", "lens-power", {role: "group", "aria-label": "Magnifier power"});
      power.appendChild(el("span", "lens-power__label", {"aria-hidden": "true"})).textContent = "lens";
      for (const p of powers) {
        const b = el("button", "lens-power__opt", {type: "button", "aria-pressed": String(p === Z0)});
        b.dataset.power = p;
        b.textContent = `${p}×`;
        b.addEventListener("click", () => setPower(p));
        power.appendChild(b);
      }
      host.appendChild(power);
    }
    // over the switch the lens holds still and the cursor shows, so a power can be picked without moving the lens
    const onSwitch = (ev) => !!(power && ev.target instanceof Element && ev.target.closest(".lens-power"));

    // mouse: follow; leave: back to the parked spot
    host.addEventListener("pointermove", (ev) => {
      if (ev.pointerType !== "mouse" && !dragging) return;
      if (onSwitch(ev)) {
        host.classList.remove("is-following");
        return;
      }
      upgrade();
      host.classList.add("is-following");
      go(...at(ev));
    });
    host.addEventListener("pointerleave", (ev) => {
      if (ev.pointerType !== "mouse") return;
      host.classList.remove("is-following");
      go(px0, py0);
    });
    // touch and pen: drag the lens, or tap to move it there
    let dragging = false, lastType = "";
    host.addEventListener("pointerdown", (ev) => {
      lastType = ev.pointerType;
      if (ev.pointerType === "mouse" || onSwitch(ev)) return;
      upgrade();
      const [x, y] = at(ev);
      const W = host.clientWidth, H = host.clientHeight, R = lens.offsetWidth / 2;
      if (Math.hypot((x - cur.x) * W, (y - cur.y) * H) <= R) {
        dragging = true;
        host.setPointerCapture(ev.pointerId);
      }
    });
    host.addEventListener("pointerup", (ev) => {
      if (ev.pointerType === "mouse" || onSwitch(ev)) return;
      if (!dragging) go(...at(ev));
      dragging = false;
    });
    host.addEventListener("pointercancel", () => (dragging = false));
    // mouse: a click on the image steps to the next power, right where the lens is (touch taps move the lens instead)
    host.addEventListener("click", (ev) => {
      if (power && lastType === "mouse" && !onSwitch(ev)) cycle(1, true);
    });
    host.addEventListener("keydown", (ev) => {
      if (power && (ev.key === "+" || ev.key === "=" || ev.key === "-" || ev.key === "_")) {
        ev.preventDefault();
        cycle(ev.key === "+" || ev.key === "=" ? 1 : -1, false);
        return;
      }
      const d = {ArrowLeft: [-0.03, 0], ArrowRight: [0.03, 0], ArrowUp: [0, -0.03], ArrowDown: [0, 0.03]}[ev.key];
      if (!d) return;
      ev.preventDefault();
      upgrade();
      go(tgt.x + d[0], tgt.y + d[1]);
    });
    window.addEventListener("resize", draw, {passive: true});
    ready = true;
    draw();
  }

  // a plain link to the full-resolution file, with its size, in the figure's caption; never fetched until clicked
  function fullLink(host, e) {
    const cap = host.closest("figure")?.querySelector("figcaption");
    if (!cap || !e.hq?.src || host.dataset.fullLink === "none") return; // data-full-link="none": no link
    // data-full-href points the link at an original kept elsewhere in the repo (e.g. a vector figure in assets/AReA)
    if (host.dataset.fullHref) {
      const a = el("a", "full-link", {href: host.dataset.fullHref, target: "_blank", rel: "noopener"});
      a.textContent = `${host.dataset.fullLabel || "original"} ↗`;
      cap.appendChild(a);
      return;
    }
    const a = el("a", "full-link", {href: `./${e.hq.src}`, target: "_blank", rel: "noopener"});
    const mb = `${(e.hq.bytes / 1e6).toFixed(1)} MB`;
    a.textContent = host.closest(".cmp__cell") ? `full res · ${mb} ↗`
      : `full resolution · ${e.hq.w.toLocaleString("en-US")} × ${e.hq.h.toLocaleString("en-US")} · ${mb} ↗`;
    cap.appendChild(a);
  }

  function mount(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const {box, e, img} = picture(host);
    host.appendChild(box);
    if (e && (host.hasAttribute("data-zoom") || host.hasAttribute("data-magnifier"))) fullLink(host, e);
    if (e && host.hasAttribute("data-magnifier")) Magnifier(host, host.dataset.img, e, img);
    else if (e && host.hasAttribute("data-zoom")) Zoom(host, host.dataset.img, e, img);
  }

  // ---------- side-by-side comparisons (window.AREA_COMPARISONS, in static/data/results.js) ----------
  function comparisons(root) {
    const sets = window.AREA_COMPARISONS || [];
    if (!root || !sets.length) return;
    const tabs = el("div", "tabs", {role: "tablist", "aria-label": "Comparison"});
    const body = el("div");
    const show = (i) => {
      const c = sets[i];
      [...tabs.children].forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
      body.innerHTML = "";
      const meta = el("div", "cmp__meta");
      // backbone and resolution, each labelled and styled apart
      for (const [k, v, cls] of [["backbone", c.model, "pill pill--model"], ["resolution", c.res, "pill pill--res"]]) {
        const pill = meta.appendChild(el("span", cls));
        pill.appendChild(el("i")).textContent = k;
        pill.appendChild(document.createTextNode(v));
      }
      const prompt = el("p", "prompt");
      prompt.textContent = c.prompt;
      const grid = el("div", "cmp__grid");
      grid.style.setProperty("--n", c.methods.length);
      c.methods.forEach((m) => {
        const fig = el("figure", "cmp__cell" + (m.ours ? " cmp__cell--ours" : ""));
        const host = el("div", null, {"data-img": m.img, "data-zoom": "", "data-zoom-group": `cmp-${c.id}`, "data-full-link": "none",
          "data-sizes": `(min-width: 1180px) ${Math.round(1152 / c.methods.length)}px, 34vw`, "data-alt": m.label, "data-ar": "1 / 1"});
        const cap = el("figcaption");
        cap.textContent = m.label;
        if (m.ours) cap.appendChild(el("small")).textContent = " (ours)";
        fig.append(host, cap);
        grid.appendChild(fig);
        mount(host);
      });
      const hint = el("p", "caption");
      hint.innerHTML = `${c.caption ? c.caption + " " : ""}<span class="hint" style="display:block;margin-top:.3rem;font:.68rem var(--mono);letter-spacing:.06em;opacity:.75">Click any image to zoom all of them at that point · drag to pan together</span>`;
      body.append(meta, prompt, grid, hint);
    };
    if (sets.length > 1) {
      sets.forEach((c, i) => {
        const b = el("button", "tab", {type: "button", role: "tab"});
        b.textContent = c.label;
        b.addEventListener("click", () => show(i));
        tabs.appendChild(b);
      });
      root.appendChild(tabs);
    }
    root.appendChild(body);
    show(0);
  }

  document.querySelectorAll("[data-img]").forEach(mount);
  comparisons(document.getElementById("compare"));
  window.AreaImages = {mount};
})();
