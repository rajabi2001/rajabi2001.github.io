// Page glue: reveal-on-scroll (a short rise, blur to sharp; keywords resolve coarse to fine) and the BibTeX copy button.
(function () {
  "use strict";
  const els = document.querySelectorAll(".rv, .kw.res");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const d = +(en.target.dataset.d || 0);
        if (en.target.classList.contains("kw")) setTimeout(() => en.target.classList.add("is-in"), d * 180);
        else en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    }, {rootMargin: "0px 0px -8% 0px", threshold: 0.12});
    els.forEach((e) => io.observe(e));
  }

  const copy = document.getElementById("copy-bib");
  if (copy) copy.addEventListener("click", async () => {
    const txt = document.getElementById("bibtex").textContent;
    try {
      await navigator.clipboard.writeText(txt);
      copy.textContent = "copied";
    } catch (e) {
      copy.textContent = "select & copy";
    }
    setTimeout(() => (copy.textContent = "copy"), 1600);
  });
})();
