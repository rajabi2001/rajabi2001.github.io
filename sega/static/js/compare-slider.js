(function () {
  "use strict";

  function dirname(url) {
    const i = url.lastIndexOf("/");
    return i >= 0 ? url.slice(0, i + 1) : "";
  }

  function slideUrl(baseUrl, file) {
    const rel = baseUrl + encodeURI(file);
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  /** Uppercase first letter of the prompt for display (manifest labels often start with "a …"). */
  function capitalizePromptFirst(str) {
    if (!str || typeof str !== "string") return str;
    var s = str.trim();
    if (s.length === 0) return str;
    var c = s.charAt(0);
    if (c >= "a" && c <= "z") {
      return c.toUpperCase() + s.slice(1);
    }
    return s;
  }

  /** Four-up qualitative layout (YaRN / DyPE / …). */
  function buildGrid(root, manifest, baseUrl) {
    const slides = manifest.slides;
    if (!slides || slides.length === 0) return;

    const mount = document.createElement("div");
    mount.className = "baseline-grid-mount";

    slides.forEach(function (s) {
      const cell = document.createElement("div");
      cell.className = "baseline-grid-cell";

      const lab = document.createElement("p");
      lab.className = "baseline-grid-label is-size-6";
      const strong = document.createElement("strong");
      var displayLabel = capitalizePromptFirst(s.label || "");
      strong.textContent = displayLabel;
      lab.appendChild(strong);

      const img = document.createElement("img");
      img.src = slideUrl(baseUrl, s.file);
      img.alt = displayLabel;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function once() {
        img.removeEventListener("error", once);
        img.src = "./static/images/placeholder.svg";
      });

      cell.appendChild(lab);
      cell.appendChild(img);
      mount.appendChild(cell);
    });

    root.appendChild(mount);
  }

  /** Results: clean carousel — round arrows + numbered pills (cf. project-site toggles). */
  function buildClicker(root, manifest, baseUrl) {
    const slides = manifest.slides;
    if (!slides || slides.length === 0) return;

    root.classList.add("compare-slider--clicker");

    const n = slides.length;
    const stage = document.createElement("div");
    stage.className = "clicker-stage";
    stage.tabIndex = 0;
    stage.setAttribute("role", "region");
    stage.setAttribute("aria-label", "Result samples");

    const frame = document.createElement("div");
    frame.className = "clicker-frame";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "clicker-arrow clicker-arrow--prev";
    prev.setAttribute("aria-label", "Previous sample");
    prev.innerHTML = "&#8249;";

    const mainWrap = document.createElement("div");
    mainWrap.className = "compare-slider-viewport clicker-main";
    const mainImg = document.createElement("img");
    mainImg.className = "compare-slider-img clicker-main-img";
    mainImg.alt = "";
    mainImg.decoding = "async";
    mainImg.loading = "eager";
    mainWrap.appendChild(mainImg);

    const next = document.createElement("button");
    next.type = "button";
    next.className = "clicker-arrow clicker-arrow--next";
    next.setAttribute("aria-label", "Next sample");
    next.innerHTML = "&#8250;";

    frame.appendChild(prev);
    frame.appendChild(mainWrap);
    frame.appendChild(next);

    const pills = document.createElement("div");
    pills.className = "clicker-pills";
    pills.setAttribute("role", "tablist");
    pills.setAttribute("aria-label", "Sample index");

    const promptHero = document.createElement("p");
    promptHero.className = "clicker-prompt-hero is-size-6";
    promptHero.setAttribute("aria-live", "polite");
    promptHero.setAttribute("aria-atomic", "true");

    const backendLine = document.createElement("p");
    backendLine.className = "clicker-backend-line is-size-7 has-text-grey";
    backendLine.setAttribute("aria-live", "polite");
    backendLine.setAttribute("aria-atomic", "true");

    const indexLine = document.createElement("p");
    indexLine.className = "clicker-index is-size-7 has-text-grey";
    indexLine.style.textAlign = "center";
    indexLine.style.margin = "0.2rem 0 0 0";

    const pillBtns = [];
    var currentIdx = 0;

    function setPromptHero(label) {
      while (promptHero.firstChild) {
        promptHero.removeChild(promptHero.firstChild);
      }
      if (!label) return;
      var pref = document.createElement("span");
      pref.className = "clicker-prompt-prefix";
      pref.textContent = "Prompt: ";
      var body = document.createElement("span");
      body.className = "clicker-prompt-body";
      body.textContent = capitalizePromptFirst(label);
      promptHero.appendChild(pref);
      promptHero.appendChild(body);
    }

    function setIndex(i) {
      const idx = Math.max(0, Math.min(n - 1, i));
      currentIdx = idx;
      const s = slides[idx];
      var displayLabel = capitalizePromptFirst(s.label || "");
      mainImg.src = slideUrl(baseUrl, s.file);
      mainImg.alt = displayLabel || "Sample";
      setPromptHero(s.label || "");
      var backendText = (s.backend || manifest.backend || "").trim();
      backendLine.textContent = backendText;
      backendLine.hidden = !backendText;
      backendLine.setAttribute("aria-hidden", backendText ? "false" : "true");
      indexLine.textContent = String(idx + 1) + " / " + String(n);
      prev.disabled = idx <= 0;
      next.disabled = idx >= n - 1;
      pillBtns.forEach(function (btn, j) {
        btn.classList.toggle("is-active", j === idx);
        btn.setAttribute("aria-selected", j === idx ? "true" : "false");
      });
      var activePill = pillBtns[idx];
      if (activePill && typeof activePill.scrollIntoView === "function") {
        activePill.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
      }
    }

    prev.addEventListener("click", function () {
      setIndex(currentIdx - 1);
    });
    next.addEventListener("click", function () {
      setIndex(currentIdx + 1);
    });

    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex(currentIdx - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex(currentIdx + 1);
      }
    });

    slides.forEach(function (s, idx) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "clicker-pill";
      btn.setAttribute("role", "tab");
      btn.textContent = String(idx + 1);
      btn.setAttribute("aria-label", capitalizePromptFirst(s.label || "Sample " + (idx + 1)).slice(0, 80));
      btn.addEventListener("click", function () {
        setIndex(idx);
      });
      pills.appendChild(btn);
      pillBtns.push(btn);
    });

    stage.appendChild(promptHero);
    stage.appendChild(backendLine);
    stage.appendChild(frame);
    stage.appendChild(pills);
    stage.appendChild(indexLine);
    root.appendChild(stage);

    setIndex(0);
  }

  function init(root) {
    const url = root.getAttribute("data-manifest");
    if (!url) return;
    if (root.querySelector(".baseline-grid-mount, .clicker-main")) return;

    const layout = (root.getAttribute("data-layout") || "grid").toLowerCase();
    const baseUrl = dirname(url);

    fetch(url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("manifest " + r.status);
        return r.json();
      })
      .then(function (manifest) {
        const cap = root.querySelector(".compare-slider-caption");
        if (cap) {
          var capText = (manifest.note || manifest.title || "").trim();
          cap.textContent = capText;
          cap.hidden = !capText;
          cap.setAttribute("aria-hidden", capText ? "false" : "true");
        }
        if (layout === "clicker") {
          buildClicker(root, manifest, baseUrl);
        } else {
          buildGrid(root, manifest, baseUrl);
        }
      })
      .catch(function () {
        const err = document.createElement("p");
        err.className = "has-text-danger is-size-7";
        err.textContent =
          "Could not load " +
          url +
          ". Run a local server from the repo root (python3 -m http.server 8765), not file://.";
        root.appendChild(err);
      });
  }

  function run() {
    document.querySelectorAll(".compare-slider").forEach(function (root) {
      if (!root.getAttribute("data-manifest")) return;
      init(root);
    });
  }

  run();
})();
