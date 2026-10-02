(function () {
  "use strict";

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok ? Promise.resolve() : Promise.reject();
  }

  function init() {
    var btn = document.getElementById("citation-copy");
    var code = document.getElementById("citation-bibtex");
    if (!btn || !code) return;
    var label = btn.querySelector(".citation-copy-text");
    var resetTimer;

    function show(text) {
      if (label) label.textContent = text;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        if (label) label.textContent = "Copy";
      }, 1600);
    }

    btn.addEventListener("click", function () {
      var text = code.textContent;
      var copy =
        navigator.clipboard && window.isSecureContext
          ? navigator.clipboard.writeText(text)
          : fallbackCopy(text);
      copy.then(
        function () {
          show("Copied");
        },
        function () {
          // Leave the BibTeX selected so it can be copied by hand.
          var range = document.createRange();
          range.selectNodeContents(code);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          show("Press Ctrl+C");
        }
      );
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
