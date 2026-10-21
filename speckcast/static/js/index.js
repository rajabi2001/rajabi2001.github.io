// SpecKCast project page: results tables, synchronised videos, figure zoom and the BibTeX copy button.
// Data comes from static/data/*.js (tables.js is generated from the paper's tables).
(function () {
  "use strict";

  const el = (tag, cls, attrs) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  // a row of buttons where exactly one is pressed
  const segmented = (label, items, onPick) => {
    const g = el("div", "seg", {role: "group", "aria-label": label});
    items.forEach((text, i) => {
      const b = g.appendChild(el("button", "seg__btn", {type: "button", "aria-pressed": String(i === 0)}));
      b.textContent = text;
      b.addEventListener("click", () => {
        [...g.children].forEach((t) => t.setAttribute("aria-pressed", String(t === b)));
        onPick(i);
      });
    });
    return g;
  };


  // ---------- arrow carousel: arrows on either side of the content, dots underneath ----------
  // Returns {wrap, dots, go}; the caller places wrap and dots. ← / → step through while focus is inside `keys`.
  const chevron = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  function carousel(content, items, label, onShow, keys) {
    const n = items.length;
    const wrap = el("div", "carousel");
    const prev = wrap.appendChild(el("button", "carousel__nav carousel__nav--prev", {type: "button", "aria-label": `Previous ${label}`}));
    wrap.appendChild(content);
    const next = wrap.appendChild(el("button", "carousel__nav carousel__nav--next", {type: "button", "aria-label": `Next ${label}`}));
    prev.innerHTML = chevron("M15 5l-7 7 7 7");
    next.innerHTML = chevron("M9 5l7 7-7 7");
    const dots = el("div", "carousel__dots", {role: "group", "aria-label": label});
    let at = 0;
    const go = (i) => {
      at = (i + n) % n;
      dotBtns.forEach((d, k) => d.setAttribute("aria-pressed", String(k === at)));
      onShow(at);
    };
    const dotBtns = items.map((name, i) => {
      const d = dots.appendChild(el("button", "carousel__dot", {type: "button", "aria-label": `${label} ${i + 1} of ${n}: ${name}`}));
      d.addEventListener("click", () => go(i));
      return d;
    });
    prev.addEventListener("click", () => go(at - 1));
    next.addEventListener("click", () => go(at + 1));
    (keys || wrap).addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.target instanceof HTMLVideoElement) return; // video controls use the arrow keys to seek
      e.preventDefault();
      go(at + (e.key === "ArrowRight" ? 1 : -1));
    });
    if (n < 2) { prev.hidden = next.hidden = true; dots.hidden = true; }
    return {wrap, dots, go};
  }

  // ---------- tables ----------
  // A table spec (window.SPECK_TABLES[id]) has columns [{key, label, group, better}] and rows [{cells, bold, underline}].
  // Views pick which columns to show, so a wide two-model table can be shown one model at a time.
  function renderTable(mount, spec, keys) {
    const cols = keys.map((k) => spec.columns.find((c) => c.key === k));
    const table = el("table", "results-table");
    const thead = table.appendChild(el("thead"));
    // group header row (e.g. "Acceleration", "Quality") when any shown column has a group
    if (cols.some((c) => c.group)) {
      const tr = thead.appendChild(el("tr", "group-row"));
      let i = 0;
      while (i < cols.length) {
        const g = cols[i].group || "";
        let span = 1;
        while (i + span < cols.length && (cols[i + span].group || "") === g) span++;
        const th = tr.appendChild(el("th", g ? "group" : "", {colspan: span}));
        th.textContent = g;
        i += span;
      }
    }
    const hr = thead.appendChild(el("tr"));
    cols.forEach((c) => {
      const th = hr.appendChild(el("th", c.numeric ? "num" : ""));
      th.textContent = c.label;
      if (c.better === "higher" || c.better === "lower") {
        th.appendChild(el("span", "arrow", {"aria-hidden": "true"})).textContent = c.better === "higher" ? "↑" : "↓";
        th.appendChild(el("span", "sr-only")).textContent = c.better === "higher" ? " (higher is better)" : " (lower is better)";
      }
    });
    const tbody = table.appendChild(el("tbody"));
    let prevGroup = null;
    spec.rows.forEach((r) => {
      const group = spec.groupKey ? r.cells[spec.columns.findIndex((c) => c.key === spec.groupKey)] : null;
      const tr = tbody.appendChild(el("tr"));
      if (spec.groupKey && group !== prevGroup) tr.classList.add("group-start");
      if (spec.oursKey && r.cells[spec.columns.findIndex((c) => c.key === spec.oursKey)] === spec.oursValue) tr.classList.add("ours");
      if (spec.oursRow != null && spec.rows.indexOf(r) === spec.oursRow) tr.classList.add("ours");
      cols.forEach((c) => {
        const idx = spec.columns.indexOf(c);
        const td = tr.appendChild(el("td", c.numeric ? "num" : c.key === "method" ? "method" : ""));
        // budget labels span their group: print them once, on the group's first row
        if (c.key === spec.groupKey) {
          td.classList.add("budget");
          if (group === prevGroup) { td.textContent = ""; return; }
        }
        let text = r.cells[idx];
        if (c.key === "nfe" && /^≈/.test(text)) text = text.replace("≈", "≈ ");
        td.textContent = text;
        if ((r.bold || []).includes(c.key)) td.classList.add("best");
        if ((r.underline || []).includes(c.key)) td.classList.add("second");
      });
      prevGroup = group;
    });
    mount.replaceChildren(table);
  }

  // Tables with a budget column (groupKey) show one budget at a time, plus the reference row, so each view stays short;
  // the budget column itself is then dropped. Model views and budgets are picked with segmented buttons.
  function tables() {
    const T = window.SPECK_TABLES || {};
    document.querySelectorAll("[data-table]").forEach((host) => {
      const spec = T[host.dataset.table];
      if (!spec) return;
      const views = spec.views || [{label: "", keys: spec.columns.map((c) => c.key)}];
      const gi = spec.groupKey ? spec.columns.findIndex((c) => c.key === spec.groupKey) : -1;
      const budgets = gi < 0 ? [] : [...new Set(spec.rows.map((r) => r.cells[gi]).filter((b) => b !== spec.refBudget))];
      let view = 0, budget = budgets[0];
      const mount = el("div", "table-scroll");
      const draw = () => {
        let keys = views[view].keys, rows = spec.rows;
        if (gi >= 0) {
          keys = keys.filter((k) => k !== spec.groupKey);
          rows = rows.filter((r) => r.cells[gi] === spec.refBudget || r.cells[gi] === budget);
        }
        renderTable(mount, Object.assign({}, spec, {rows, groupKey: gi >= 0 ? null : spec.groupKey}), keys);
      };
      const seg = (label, items, pick) => segmented(label, items, (i) => { pick(i); draw(); });
      const controls = el("div", "table-controls");
      if (views.length > 1) controls.appendChild(seg("Model", views.map((v) => v.label), (i) => { view = i; }));
      if (budgets.length > 1) controls.appendChild(seg("Compute budget", budgets.map((b) => b.replace("≈", "≈ ") + " NFE"), (i) => { budget = budgets[i]; }));
      if (controls.children.length) host.appendChild(controls);
      host.appendChild(mount);
      draw();
    });
  }

  // ---------- teaser: one original / SpecKCast pair at a time, arrows to switch ----------
  function teaser() {
    const host = document.getElementById("teaser");
    const T = window.SPECK_TEASER;
    if (!host || !T || !T.samples.length) return;
    const pairEl = el("div", "teaser-videos");
    const cell = (cls, name) => {
      const fig = pairEl.appendChild(el("figure", "video-cell " + cls));
      const v = fig.appendChild(el("video", null, {muted: "", loop: "", playsinline: "", autoplay: "", preload: "auto"}));
      v.muted = true;
      const cap = fig.appendChild(el("figcaption"));
      cap.appendChild(el("span", "m")).textContent = name;
      const sub = cap.appendChild(el("span", "s"));
      return {v, sub};
    };
    const ref = cell("ref", "Original"), ours = cell("ours", "SpecKCast (ours)");
    // keep SpecKCast on the original's clock
    ref.v.addEventListener("timeupdate", () => { if (Math.abs(ours.v.currentTime - ref.v.currentTime) > 0.08) ours.v.currentTime = ref.v.currentTime; });
    let ready = 0;
    const startTogether = () => { if (++ready === 2) [ref.v, ours.v].forEach((v) => { v.currentTime = 0; v.play().catch(() => {}); }); };
    const show = (i) => {
      const s = T.samples[i];
      ready = 0;
      for (const [c, d] of [[ref, s.ref], [ours, s.ours]]) {
        c.v.addEventListener("canplay", startTogether, {once: true});
        c.v.poster = d.poster;
        c.v.src = d.src;
        c.v.setAttribute("aria-label", `${c === ref ? "Original" : "SpecKCast"}, ${d.label}`);
        c.sub.textContent = d.label;
      }
    };
    const c = carousel(pairEl, T.samples.map((s) => s.desc), "sample", show, host);
    c.wrap.classList.add("carousel--teaser");
    host.append(c.wrap, c.dots);
    c.go(0);
  }

  // ---------- comparison videos: one set at a time, clips in sync ----------
  // window.SPECK_VIDEOS lists the sets (one per paper figure). Only the selected set's clips are in the page, so
  // switching sets stops the previous downloads. The clips of a set play, pause and restart together.
  function videoSets() {
    const host = document.getElementById("video-sets");
    const sets = window.SPECK_VIDEOS || [];
    if (!host || !sets.length) return;
    const head = el("p", "prompt-line");
    const grid = el("div", "video-grid");
    const tools = el("div", "video-tools");
    const btn = tools.appendChild(el("button", "tool-btn", {type: "button", "aria-pressed": "false"}));
    const restart = tools.appendChild(el("button", "tool-btn", {type: "button"}));
    restart.textContent = "Restart all";
    const note = el("p", "caption");
    let showSet = () => {};
    const nav = carousel(grid, sets.map((s) => `${s.tab}, ${s.model}`), "video sample", (i) => showSet(i), host);
    host.append(head, nav.wrap, note, nav.dots, tools);

    // autoplay only when the reader has not asked for reduced motion; the Play button always works
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vids = [], playing = false, userPaused = still, onScreen = false;
    const setBtn = () => { btn.textContent = playing ? "Pause" : "Play"; btn.setAttribute("aria-pressed", String(playing)); };
    // the button reflects what actually plays (autoplay can be blocked, e.g. in low-power modes)
    const play = () => {
      const current = vids;
      Promise.allSettled(current.map((v) => v.play())).then(() => {
        if (current !== vids) return;
        playing = vids.some((v) => !v.paused);
        setBtn();
      });
    };
    const pause = () => { vids.forEach((v) => v.pause()); playing = false; setBtn(); };
    // keep the followers within about a frame of the lead clip
    const sync = () => {
      const lead = vids[0];
      vids.forEach((v) => { if (v !== lead && Math.abs(v.currentTime - lead.currentTime) > 0.08) v.currentTime = lead.currentTime; });
    };
    btn.addEventListener("click", () => { if (playing) { pause(); userPaused = true; } else { play(); userPaused = false; } });
    restart.addEventListener("click", () => { vids.forEach((v) => { v.currentTime = 0; }); play(); userPaused = false; });

    const show = (i) => {
      const s = sets[i];
      vids.forEach((v) => { v.pause(); v.removeAttribute("src"); v.load(); });
      grid.replaceChildren();
      head.innerHTML = "";
      head.append(`${s.model} · Prompt: `);
      head.appendChild(el("q")).textContent = s.prompt;
      vids = s.clips.map((c) => {
        const fig = grid.appendChild(el("figure", "video-cell" + (c.ours ? " ours" : "") + (c.ref ? " ref" : "")));
        const v = fig.appendChild(el("video", null, {muted: "", loop: "", playsinline: "", preload: "auto", poster: c.poster, "aria-label": `${c.label}, ${c.sub}`}));
        v.muted = true;
        v.src = c.src;
        const cap = fig.appendChild(el("figcaption"));
        cap.appendChild(el("span", "m")).textContent = c.label;
        cap.appendChild(el("span", "s")).textContent = c.sub;
        return v;
      });
      vids[0].addEventListener("timeupdate", sync);
      note.textContent = `${s.note} ${s.budget}`;
      playing = false;
      setBtn();
      if (onScreen && !userPaused) play();
    };
    showSet = show;
    // play while on screen, pause when scrolled away (unless the reader paused)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !userPaused) play();
        else if (!onScreen) pause();
      }, {threshold: 0.25}).observe(grid);
    }
    nav.go(0);
  }

  // ---------- text-to-image comparisons: the paper's image figures rebuilt from their tiles ----------
  // window.SPECK_T2I lists one set per figure; each row is one prompt, each tile one method with its printed label.
  function imageSets() {
    const host = document.getElementById("image-sets");
    const slides = window.SPECK_T2I || [];
    if (!host || !slides.length) return;
    const head = el("p", "prompt-line");
    const body = el("div", "t2i-body");
    const note = el("p", "caption");
    // one prompt per slide; the line above names the model, then the prompt (or a description when the paper prints none)
    const show = (i) => {
      const s = slides[i];
      body.replaceChildren();
      head.replaceChildren();
      head.append(`${s.model} · `);
      if (s.quoted) { head.append("Prompt: "); head.appendChild(el("q")).textContent = s.prompt; } else head.append(s.prompt);
      const grid = body.appendChild(el("div", "t2i-grid"));
      s.tiles.forEach((t) => {
        const fig = grid.appendChild(el("figure", "t2i-cell" + (t.ours ? " ours" : "") + (t.ref ? " ref" : "")));
        const a = fig.appendChild(el("a", null, {href: t.src, "data-zoom": ""}));
        a.appendChild(el("img", null, {src: t.src, width: 512, height: 512, loading: "lazy", decoding: "async", alt: `${t.method}, ${t.label}: ${s.prompt}`}));
        const cap = fig.appendChild(el("figcaption"));
        cap.appendChild(el("span", "m")).textContent = t.method;
        cap.appendChild(el("span", "s")).textContent = t.label;
      });
      note.textContent = `${s.note} ${s.budget}`;
      bindZoom(body);
    };
    const nav = carousel(body, slides.map((s) => `${s.model}, ${s.prompt}`), "image comparison", show, host);
    host.append(head, nav.wrap, note, nav.dots);
    nav.go(0);
    // fetch the other slides' tiles once the page has settled, so switching is instant
    window.addEventListener("load", () => setTimeout(() => slides.forEach((s) => s.tiles.forEach((t) => { new Image().src = t.src; })), 2000));
  }

  // ---------- simple synced groups ([data-sync]): every clip follows the first ----------
  function syncGroups() {
    document.querySelectorAll("[data-sync]").forEach((g) => {
      const vids = [...g.querySelectorAll("video")];
      if (vids.length < 2) return;
      const lead = vids[0];
      lead.addEventListener("timeupdate", () => {
        vids.forEach((v) => { if (v !== lead && Math.abs(v.currentTime - lead.currentTime) > 0.08) v.currentTime = lead.currentTime; });
      });
      // restart together once all can play, so they begin on the same frame
      let ready = 0;
      vids.forEach((v) => v.addEventListener("canplay", () => {
        if (++ready === vids.length) vids.forEach((x) => { x.currentTime = 0; x.play().catch(() => {}); });
      }, {once: true}));
    });
  }

  // ---------- figure zoom: open the full-resolution file ----------
  // One lightbox for the page. It opens fitted to the screen; when the file is larger than that, a click on the image shows
  // it at its own size (scroll to pan). bindZoom() wires links added later, e.g. the text-to-image tiles.
  let bindZoom = () => {};
  function zoom() {
    const box = el("div", "lightbox", {role: "dialog", "aria-modal": "true", "aria-label": "Figure", hidden: ""});
    const img = box.appendChild(el("img", null, {alt: ""}));
    const close = box.appendChild(el("button", "lightbox__close", {type: "button", "aria-label": "Close"}));
    close.textContent = "×";
    document.body.appendChild(box);
    let opener = null;
    const hide = () => {
      box.hidden = true;
      document.documentElement.classList.remove("no-scroll");
      if (opener) opener.focus();
    };
    const canZoom = () => img.naturalWidth > img.clientWidth + 1 || box.classList.contains("is-zoomed");
    box.addEventListener("click", (e) => {
      if (e.target !== img) hide();
      else if (canZoom()) box.classList.toggle("is-zoomed");
    });
    img.addEventListener("load", () => box.classList.toggle("can-zoom", canZoom()));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) hide(); });
    bindZoom = (root) => root.querySelectorAll("a[data-zoom]").forEach((a) => {
      if (a.dataset.zoomBound) return;
      a.dataset.zoomBound = "1";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        opener = a;
        box.classList.remove("is-zoomed", "can-zoom");
        img.src = a.getAttribute("href");
        img.alt = a.querySelector("img")?.alt || "";
        box.hidden = false;
        document.documentElement.classList.add("no-scroll");
        close.focus();
      });
    });
    bindZoom(document);
  }

  // ---------- BibTeX copy ----------
  function bibtex() {
    const btn = document.getElementById("copy-bib");
    const pre = document.getElementById("bibtex-entry");
    if (!btn || !pre) return;
    btn.addEventListener("click", () => {
      const done = (t) => { btn.textContent = t; setTimeout(() => (btn.textContent = "Copy"), 1600); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(pre.textContent).then(() => done("Copied"), () => done("Select and copy"));
      else {
        const r = document.createRange();
        r.selectNodeContents(pre);
        const s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        done("Press Ctrl+C");
      }
    });
  }

  zoom();
  tables();
  videoSets();
  imageSets();
  teaser();
  syncGroups();
  bibtex();
})();
