// The efficiency chart (latency of full attention vs AReA, per resolution, from Table 1) and the result tables.
(function () {
  "use strict";
  const T1 = window.AREA_TABLE1;
  const C = {text: "#EEE8DC", muted: "#8C9BB4", rule: "rgba(238,232,220,0.12)", panel: "#11213A", base: "#FF8A7A", area: "#7DB4FF"};
  const fmt = (v, dp) => v.toFixed(dp); // the paper's own precision, per column
  const h = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  // ---------- shared tooltip ----------
  const tip = h("div", "tip");
  tip.setAttribute("role", "status");
  document.body.appendChild(tip);
  const showTip = (html, x, y) => {
    tip.innerHTML = html;
    tip.classList.add("is-on");
    const w = tip.offsetWidth, hh = tip.offsetHeight;
    tip.style.left = `${Math.min(window.innerWidth - w - 8, Math.max(8, x - w / 2))}px`;
    tip.style.top = `${Math.max(8, y - hh - 14)}px`;
  };
  const hideTip = () => tip.classList.remove("is-on");

  // ---------- latency: one dumbbell per resolution, one panel per model (each on its own scale) ----------
  function latency(root) {
    if (!root || !T1) return;
    const head = h("div", "chart__head");
    head.append(h("div", "chart__title", "Generation time per image"),
      h("div", "legend", `<span style="--c:${C.base}"><i></i>full attention</span><span style="--c:${C.area}"><i></i>AReA</span>`));
    const pair = h("div", "chart__pair");
    root.append(head, pair);
    const order = ["2048×4096", "6144×2048", "4096×4096", "5120×5120"];
    const F6 = window.AREA_FIG6 || {};
    for (const model of ["FLUX.1", "Qwen-Image"]) {
      const rows = order.map((res) => {
        const d = T1.data[model][res];
        return {res, base: d[0][0], area: d[5][0]};
      });
      if (F6[model]) rows.push(F6[model]);
      const max = Math.max(...rows.map((r) => r.base));
      const step = max > 2500 ? 1000 : max > 1000 ? 500 : 200;
      const top = Math.ceil((max * 1.02) / step) * step;
      const W = 420, L = 86, R = 60, rowH = 40, T = 30, Hh = T + rows.length * rowH + 30;
      const X = (v) => L + (v / top) * (W - L - R);
      let s = `<svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${model}: seconds per image, full attention vs AReA">`;
      s += `<text x="0" y="14" font-size="12" fill="${C.text}" font-family="IBM Plex Sans, sans-serif" font-weight="600">${model}</text>`;
      for (let v = 0; v <= top; v += step) {
        s += `<line x1="${X(v)}" y1="${T - 6}" x2="${X(v)}" y2="${T + rows.length * rowH}" stroke="${C.rule}" stroke-width="1"/>`;
        s += `<text x="${X(v)}" y="${T + rows.length * rowH + 16}" font-size="10" fill="${C.muted}" text-anchor="middle">${v.toLocaleString("en-US")}${v === top ? " s" : ""}</text>`;
      }
      rows.forEach((r, i) => {
        const y = T + i * rowH + rowH / 2;
        const sp = r.speedup || (r.base / r.area).toFixed(2);
        s += `<g class="row" data-i="${i}">`;
        s += `<rect x="0" y="${y - rowH / 2}" width="${W}" height="${rowH}" fill="transparent"/>`;
        s += `<text x="0" y="${y + 4}" font-size="10.5" fill="${C.muted}">${r.res.replace("×", " × ")}</text>`;
        s += `<line x1="${X(r.area)}" y1="${y}" x2="${X(r.base)}" y2="${y}" stroke="${C.muted}" stroke-opacity="0.45" stroke-width="2" stroke-linecap="round"/>`;
        s += `<circle cx="${X(r.base)}" cy="${y}" r="5.5" fill="${C.base}" stroke="${C.panel}" stroke-width="2"/>`;
        s += `<circle cx="${X(r.area)}" cy="${y}" r="5.5" fill="${C.area}" stroke="${C.panel}" stroke-width="2"/>`;
        s += `<text x="${Math.min(X(r.base) + 11, W - 34)}" y="${y + 4}" font-size="11" fill="${C.text}">${sp}×</text>`;
        s += `</g>`;
      });
      s += `</svg>`;
      const box = h("div", null, s);
      box.querySelectorAll(".row").forEach((g) => {
        const r = rows[+g.dataset.i];
        const ap = r.approx ? "≈ " : "";
        const html = `<b>${model} · ${r.res}</b><br><span class="k">full attention</span> ${ap}${r.base.toLocaleString("en-US")} s<br><span class="k">AReA</span> ${ap}${r.area.toLocaleString("en-US")} s · <b>${r.speedup || (r.base / r.area).toFixed(2)}× faster</b>`;
        g.addEventListener("pointermove", (e) => showTip(html, e.clientX, e.clientY));
        g.addEventListener("pointerleave", hideTip);
      });
      pair.appendChild(box);
    }
    root.appendChild(h("p", "table-note", "Seconds per image on Aesthetic-4K."));
  }

  // ---------- tables ----------
  const ranks = (cols, dirs) => cols.map((col, j) => {
    const vals = col.map((v) => v * dirs[j]);
    const uniq = [...new Set(vals)].sort((a, b) => b - a);
    return vals.map((v) => (v === uniq[0] ? "best" : v === uniq[1] ? "second" : ""));
  });

  function table1(root) {
    if (!root || !T1) return;
    const models = Object.keys(T1.data);
    let model = models[0], res = Object.keys(T1.data[model])[2];
    const tools = h("div", "table-tools");
    const title = h("div", null, `<div class="chart__title">Comparison with direct-inference methods</div><div class="table-note" style="margin:0.15rem 0 0">Aesthetic-4K · ↑ higher is better, ↓ lower is better</div>`);
    const mt = h("div", "tabs");
    const rt = h("div", "tabs");
    const wrap = h("div", "scroll-x");
    // on narrow screens the table scrolls sideways; say so, and hide the hint once the reader has scrolled
    const hint = h("p", "swipe-hint", "swipe for more metrics →");
    wrap.addEventListener("scroll", () => hint.classList.toggle("is-gone", wrap.scrollLeft > 8), {passive: true});
    mt.classList.add("tabs--model");
    rt.classList.add("tabs--res");
    // backbone and resolution are different kinds of choice: each gets its own labelled row and its own control style
    const group = (label, tabs) => {
      const g = h("div", "tabgroup");
      g.append(h("span", "tabgroup__label", label), tabs);
      return g;
    };
    tools.append(title, h("div", "table-tools__tabs"));
    tools.lastChild.append(group("Backbone", mt), group("Resolution", rt));
    root.append(tools, hint, wrap, h("p", "table-note", "<i></i>best &nbsp;·&nbsp; <u>underlined</u>: second best, per column at each resolution. Latency in seconds per image."));
    const tab = (label, sel, on) => {
      const b = h("button", "tab", label);
      b.type = "button";
      b.setAttribute("aria-selected", String(sel));
      b.addEventListener("click", on);
      return b;
    };
    const draw = () => {
      mt.replaceChildren(...models.map((m) => tab(m, m === model, () => { model = m; draw(); })));
      rt.replaceChildren(...Object.keys(T1.data[model]).map((r) => tab(r.replace("×", " × "), r === res, () => { res = r; draw(); })));
      const rows = T1.data[model][res];
      const rk = ranks(T1.metrics.map((_, j) => rows.map((r) => r[j])), T1.metrics.map((m) => m.dir));
      let s = `<table class="num"><thead><tr><th>Method</th>${T1.metrics.map((m) => `<th>${m.label} ${m.dir > 0 ? "↑" : "↓"}</th>`).join("")}</tr></thead><tbody>`;
      rows.forEach((r, i) => {
        const name = T1.methods[i];
        s += `<tr class="${name === "AReA" ? "ours" : ""}"><td>${name === "Base" ? "Base (full attention)" : name}</td>`;
        s += r.map((v, j) => `<td class="${rk[j][i]}">${fmt(v, T1.metrics[j].dp)}</td>`).join("") + "</tr>";
      });
      wrap.innerHTML = s + "</tbody></table>";
    };
    draw();
  }


  latency(document.getElementById("latency"));
  table1(document.getElementById("table1"));
})();
