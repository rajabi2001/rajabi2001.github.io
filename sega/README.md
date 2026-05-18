# SEGA Project Page — Managing Slider Images

All sliders on the page are **manifest-driven** — the HTML doesn't list images directly. Each slider points to a `manifest.json` file, and that JSON controls which images appear, in what order, with what prompt/caption.

## Where the sliders and manifests live

Each `compare-slider` in `index.html` has a `data-manifest` attribute pointing at its manifest:

- **Results (Flux)** → `static/images/slider/flux4096/manifest.json`
- **Baseline comparisons** → `static/images/slider/aesthetic/p00036/manifest.json`, `p00100/manifest.json`, `p00106/manifest.json`, `p00168/manifest.json`, `p00166/manifest.json`, and `static/images/slider/crocodile/manifest.json`

The image files themselves live in the **same folder** as the manifest (or in a relative subfolder). For example, `flux_01.png` lives next to `flux4096/manifest.json`.

## How a manifest works

There are two slider layouts, and they use the manifest slightly differently.

### 1. Clicker layout (the Results slider — one image at a time, with arrows/pills)

```json
{
  "note": "",
  "backend": "4096×4096 · SEGA (Flux)",
  "slides": [
    {
      "label": "A wooden cabin sits in a snowy landscape...",
      "file": "flux_03.png"
    },
    {
      "label": "A towering brown bear stands on its hind legs...",
      "file": "flux_04.png",
      "backend": "4096×4096 · SEGA (Qwen)"
    }
  ]
}
```

- `slides` is an **ordered array** — top-to-bottom = first-to-last.
- Each slide needs:
  - `file`: filename relative to the manifest folder (e.g., `flux_03.png`).
  - `label`: the prompt shown above the image (auto-capitalized).
  - `backend` *(optional)*: per-image override for the small grey line under the prompt. If omitted, the top-level `backend` is used.
- `backend` (top-level): the default backend/resolution line for every slide.

### 2. Grid layout (the Baseline comparison sliders — 4 images side-by-side)

```json
{
  "slides": [
    { "label": "YaRN",       "file": "yarn.png" },
    { "label": "DyPE",       "file": "dype.png" },
    { "label": "UltraImage", "file": "ultra.png" },
    { "label": "SEGA",       "file": "sega.png" }
  ]
}
```

- Same format, but here `label` is the **method name** shown above each cell, not the prompt (the prompt is the static `baseline-prompt-line` in `index.html` above the slider).
- Order in `slides` = left-to-right in the grid.

## To remove an image

1. Open the relevant `manifest.json`.
2. Delete that slide's `{ ... }` block from the `slides` array (and the trailing comma so JSON stays valid).
3. *(Optional)* Delete the actual image file from the folder to keep the repo clean.

Example — removing `flux_02.png` from the Results slider:

```json
{
  "note": "",
  "backend": "4096×4096 · SEGA (Flux)",
  "slides": [
    { "label": "A mysterious woman...", "file": "flux_01.png" },
    { "label": "A wooden cabin...",     "file": "flux_03.png" }
  ]
}
```

## To add a new image

1. **Drop the image file** in the same folder as the manifest (e.g., `static/images/slider/flux4096/flux_17.png`). Keep filenames simple (lowercase, no spaces).
2. **Add an entry** to the `slides` array at the position you want it shown:

```json
{
  "label": "A futuristic city skyline at dawn with floating airships and warm orange light.",
  "file": "flux_17.png"
}
```

3. *(Optional)* Add `"backend": "..."` to that entry if this particular sample uses a different model/resolution from the manifest default.

## Adding a new baseline grid comparison

The grid sliders are always 4-up (one row per prompt). To add a brand-new prompt comparison:

1. Create a new folder, e.g., `static/images/slider/aesthetic/p00200/`.
2. Drop the 4 images in it (`yarn.png`, `dype.png`, `ultra.png`, `sega.png` — or whatever methods you're comparing).
3. Create `manifest.json` in that folder with 4 slides.
4. Add a new heading + slider block in `index.html` inside the `<section class="section fullwidth-gray-bg">` for baselines:

```html
<div class="baseline-block-heading has-text-centered">
  <p class="baseline-prompt-line">
    <strong>Your new prompt here.</strong>
  </p>
  <p class="baseline-backend-line is-size-7 has-text-grey">
    4096×4096 · YaRN, DyPE, UltraImage &amp; SEGA (Flux)
  </p>
</div>
<div
  class="compare-slider"
  data-layout="grid"
  data-manifest="./static/images/slider/aesthetic/p00200/manifest.json"
>
  <p class="subtitle is-6 compare-slider-caption" aria-live="polite"></p>
</div>
```

## Previewing locally

Because manifests are fetched with JavaScript, browsers block `fetch` on `file://`. To preview locally, run a static server from the repo root:

```bash
# from rajabi2001.github.io/
python -m http.server 8765
```

Then open <http://localhost:8765/sega/>. Any other static server works too (`npx serve`, etc.).

## Quick checklist when changing slides

- File is in the same folder as the `manifest.json`? ✓
- Filename in `"file"` matches exactly (case-sensitive on web servers)? ✓
- JSON is still valid (no trailing commas, matching quotes)? ✓
- Hard-refresh the browser (Ctrl+F5) — the manifest is fetched with `cache: "no-store"`, but images are not.

## File layout reference

```
sega/
├── index.html
├── README.md                              ← this file
└── static/
    ├── css/index.css
    ├── js/compare-slider.js               ← slider logic (manifest fetch, layouts)
    └── images/
        └── slider/
            ├── flux4096/
            │   ├── manifest.json          ← Results (clicker) slider
            │   ├── flux_01.png
            │   └── ...
            ├── aesthetic/
            │   ├── p00036/manifest.json   ← Baseline grid slider
            │   ├── p00036/yarn.png
            │   ├── p00036/dype.png
            │   ├── p00036/ultra.png
            │   ├── p00036/sega.png
            │   └── p00100/, p00106/, ...
            └── crocodile/manifest.json
```
