// The AReA title on the page: the videos' own title (area-title.js, built from remotion/src/title/title.ts), unmodified,
// plus the rest of the paper's title as a third line in the same style.
//
// The title draws on a 1920 x 1080 canvas into an offscreen buffer cropped to CROP (title units, at the screen's pixel
// density). The visible canvas takes the word band as is and lifts the subtitle band by LIFT, so the subtitle sits closer
// to the word than in the videos; the third line ("for Efficient ...") fades in under it the way the subtitle does.
//
// Sequence: the title plays once per page load at the viewport's centre; when it finishes it glides straight up, and the
// authors and links rise in below it. Reduced motion shows the finished state at once. Fires "area:title-done".
(function () {
  "use strict";
  const html = document.documentElement;
  const metaIn = () => html.classList.add("is-meta-in");
  const up = () => html.classList.add("is-title-up");
  const done = () => {
    html.classList.add("is-title-done");
    window.dispatchEvent(new CustomEvent("area:title-done"));
  };
  const cv = document.getElementById("title");
  const stage = document.getElementById("title-stage");
  const T = window.AReATitle;
  if (!cv || !cv.getContext || !T) {
    html.classList.add("no-canvas");
    up();
    metaIn();
    done();
    return;
  }

  const CROP = {x: 300, y: 230, w: 1320, h: 550};
  const SPLIT = 672; // below the word's box (it ends at 650), above the subtitle (from ~694)
  const LIFT = 56; // how much closer the subtitle sits to the word than in the videos
  const LINE = "for Efficient High-Resolution Diffusion Transformers";
  const LINE_Y = 736 - LIFT + 60; // baseline: one line under the lifted subtitle (its baseline is 736 in the videos)
  const LINE_AT = 136; // the subtitle fades in from frame 124; this line follows it
  const END = LINE_AT + 28; // everything has settled; the title's remaining frames are a hold
  const META_DELAY = 450; // ms into the glide before the authors rise in
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const g = cv.getContext("2d");
  const off = document.createElement("canvas");
  const og = off.getContext("2d");
  let k = 1, draw = null, f = 0, t0 = null, ended = false, linePx = 40;

  const smooth = (x) => {
    const t = Math.max(0, Math.min(1, x));
    return t * t * (3 - 2 * t);
  };
  const size = () => {
    const css = stage.clientWidth || CROP.w;
    k = Math.max(0.5, Math.min(2, ((window.devicePixelRatio || 1) * css) / CROP.w));
    off.width = cv.width = Math.round(CROP.w * k);
    off.height = cv.height = Math.round(CROP.h * k);
  };
  const paint = (frame) => {
    og.setTransform(1, 0, 0, 1, 0, 0);
    og.clearRect(0, 0, off.width, off.height);
    og.setTransform(k, 0, 0, k, -CROP.x * k, -CROP.y * k);
    draw(frame);
    const W = cv.width, s = Math.round((SPLIT - CROP.y) * k), lift = Math.round(LIFT * k);
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, W, cv.height);
    g.drawImage(off, 0, 0, W, s, 0, 0, W, s);
    g.drawImage(off, 0, s, W, off.height - s, 0, s - lift, W, off.height - s);
    const a = smooth((frame - LINE_AT) / 26);
    if (a <= 0) return;
    g.setTransform(k, 0, 0, k, -CROP.x * k, -CROP.y * k);
    g.globalAlpha = a;
    g.fillStyle = T.PAL.muted; // the subtitle's colour
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.font = `400 ${linePx}px "IBM Plex Sans", sans-serif`;
    g.fillText(LINE, 960, LINE_Y + (1 - a) * 12);
    g.globalAlpha = 1;
  };
  const finish = () => {
    if (ended) return;
    ended = true;
    done();
    up();
    setTimeout(metaIn, still ? 0 : META_DELAY);
  };
  const tick = (now) => {
    if (t0 === null) t0 = now;
    f = Math.min(END, ((now - t0) / 1000) * 30);
    paint(f);
    if (f >= END) finish();
    else requestAnimationFrame(tick);
  };

  // while the title plays alone, hold it at the viewport's centre
  const centre = () => {
    if (still || window.scrollY > 0) return;
    const r = stage.getBoundingClientRect();
    const shift = Math.max(0, Math.round(window.innerHeight / 2 - (r.top + r.height / 2)));
    stage.style.transition = "none"; // jump there now; only the glide back up is animated
    stage.style.setProperty("--intro-shift", `${shift}px`);
    void stage.offsetHeight;
    stage.style.transition = "";
  };
  const start = () => {
    size();
    centre();
    draw = T.createTitle(off);
    // the third line in the subtitle's family, narrowed if it would not fit the crop
    g.font = '400 40px "IBM Plex Sans", sans-serif';
    linePx = Math.min(40, (40 * (CROP.w - 80)) / g.measureText(LINE).width);
    if (still) {
      f = END;
      paint(f);
      finish();
    } else requestAnimationFrame(tick);
  };
  // the canvas draws text: wait for the faces, or the first frames fall back to another font (give up after 3 s)
  const faces = Promise.all([document.fonts.load('500 100px "IBM Plex Sans"'), document.fonts.load('400 56px "IBM Plex Sans"')]);
  Promise.race([faces, new Promise((r) => setTimeout(r, 3000))]).then(start, start);

  let rt = 0;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (!draw) return;
      size();
      paint(f);
    }, 120);
  });
})();
