(function () {
  "use strict";

  /* One ZOOM for every magnified image. Lens uses a real <img> (not CSS background) so EXIF
     orientation matches the thumbnail — fixes odd YaRN / DyPE lens vs on-screen mismatch. */
  var LENS_PX = 200;
  var ZOOM = 1.72;

  function prefersMagnifier() {
    try {
      return window.matchMedia("(min-width: 769px) and (hover: hover) and (pointer: fine)").matches;
    } catch (e) {
      return window.innerWidth >= 769;
    }
  }

  function shouldMagnify(img) {
    if (!img || img.nodeName !== "IMG") return false;
    if (img.closest(".img-magnifier-wrap")) return false;
    if (img.closest(".footer")) return false;
    var src = img.getAttribute("src") || "";
    if (src.indexOf("placeholder.svg") !== -1) return false;
    if (src.indexOf("favicon") !== -1) return false;
    if (img.classList.contains("site-magnifier-skip")) return false;
    if (img.closest(".compare-slider")) return true;
    if (img.closest(".hero-teaser-figure")) return true;
    return false;
  }

  function wrapImage(img) {
    if (!prefersMagnifier() || !shouldMagnify(img)) return;
    if (img.parentElement && img.parentElement.classList.contains("img-magnifier-wrap")) return;
    var parent = img.parentNode;
    if (!parent) return;

    var wrap = document.createElement("span");
    wrap.className = "img-magnifier-wrap";

    parent.insertBefore(wrap, img);
    img.classList.add("img-magnifier-base");
    wrap.appendChild(img);

    var lens = document.createElement("span");
    lens.className = "img-magnifier-lens";
    lens.setAttribute("aria-hidden", "true");
    var lensImg = document.createElement("img");
    lensImg.className = "img-magnifier-lens-img";
    lensImg.alt = "";
    lensImg.decoding = "async";
    lensImg.draggable = false;
    lens.appendChild(lensImg);
    wrap.appendChild(lens);

    function hide() {
      wrap.classList.remove("is-magnifying");
    }

    function onMove(e) {
      if (!prefersMagnifier()) {
        hide();
        return;
      }
      if (!img.complete || img.naturalWidth < 8) return;

      var rect = img.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        hide();
        return;
      }

      var nw = img.naturalWidth;
      var nh = img.naturalHeight;
      var rx = x / rect.width;
      var ry = y / rect.height;
      var bgW = nw * ZOOM;
      var bgH = nh * ZOOM;
      var url = img.currentSrc || img.src || "";
      if (url && lensImg.src !== url) {
        lensImg.src = url;
      }
      lensImg.style.width = bgW + "px";
      lensImg.style.height = bgH + "px";
      lensImg.style.left = LENS_PX / 2 - rx * bgW + "px";
      lensImg.style.top = LENS_PX / 2 - ry * bgH + "px";

      lens.style.width = LENS_PX + "px";
      lens.style.height = LENS_PX + "px";

      var half = LENS_PX / 2;
      lens.style.left = Math.max(0, Math.min(rect.width - LENS_PX, x - half)) + "px";
      lens.style.top = Math.max(0, Math.min(rect.height - LENS_PX, y - half)) + "px";

      wrap.classList.add("is-magnifying");
    }

    img.addEventListener("load", function () {
      hide();
    });

    wrap.addEventListener("mouseenter", onMove);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", hide);
  }

  function scan(root) {
    if (!prefersMagnifier()) return;
    (root || document).querySelectorAll("img").forEach(function (img) {
      if (shouldMagnify(img)) wrapImage(img);
    });
  }

  function observe() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function (records) {
      if (!prefersMagnifier()) return;
      records.forEach(function (rec) {
        rec.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === "IMG" && shouldMagnify(node)) wrapImage(node);
          if (node.querySelectorAll) {
            node.querySelectorAll("img").forEach(function (img) {
              if (shouldMagnify(img)) wrapImage(img);
            });
          }
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      scan(document);
    }, 150);
  }

  function boot() {
    scan(document);
    observe();
    window.addEventListener("resize", onResize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
