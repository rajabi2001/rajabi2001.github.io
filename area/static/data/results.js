// Numbers and comparison sets shown on the page. Numbers are copied from the paper (Table 1, Figure 6); keep them in sync
// with it. Best / second-best marks are computed on the page, per resolution and metric.

// Table 1: FLUX.1 and Qwen-Image on Aesthetic-4K. Columns follow the paper.
window.AREA_TABLE1 = {
  metrics: [
    {key: "lat", dp: 0, label: "Latency (s)", dir: -1},
    {key: "ir", dp: 4, label: "ImageReward", dir: 1},
    {key: "aes", dp: 2, label: "Aesthetic", dir: 1},
    {key: "clip", dp: 2, label: "CLIP", dir: 1},
    {key: "pick", dp: 2, label: "PickScore", dir: 1},
    {key: "fid", dp: 1, label: "FID", dir: -1},
    {key: "fidp", dp: 1, label: "FIDp", dir: -1},
  ],
  methods: ["Base", "UltraImage", "DyPE", "SigMa", "SEGA", "AReA"],
  // rows in method order: [lat, ir, aes, clip, pick, fid, fidp]
  data: {
    "FLUX.1": {
      "2048×4096": [[97, -0.8696, 5.91, 26.49, 20.41, 171.4, 67.4], [89, -0.1474, 6.25, 28.11, 21.28, 173.3, 79.0], [97, 0.5927, 6.30, 28.43, 22.15, 156.5, 79.9], [103, 0.6727, 6.14, 28.07, 22.01, 152.5, 63.9], [98, 0.7863, 6.28, 28.95, 22.47, 153.9, 76.1], [66, 1.0881, 6.34, 29.23, 22.95, 151.9, 62.5]],
      "6144×2048": [[185, -0.3800, 5.82, 25.15, 20.73, 173.5, 83.6], [183, 0.4103, 6.11, 27.55, 21.81, 171.4, 74.0], [185, 0.8060, 6.24, 28.08, 22.34, 173.3, 97.4], [191, 0.4321, 5.88, 26.69, 21.43, 181.3, 86.1], [188, 0.5357, 6.12, 27.64, 21.88, 168.2, 94.2], [107, 1.0450, 6.26, 29.02, 22.74, 161.0, 62.0]],
      "4096×4096": [[314, -0.7177, 5.80, 25.72, 20.34, 179.8, 112.0], [256, -0.1379, 6.11, 26.77, 20.85, 169.4, 82.0], [314, 1.1070, 6.32, 28.98, 22.79, 155.2, 95.4], [322, 1.0149, 6.16, 28.36, 22.47, 156.8, 83.3], [319, 1.2702, 6.31, 29.16, 23.16, 150.6, 71.8], [151, 1.3250, 6.37, 29.71, 23.31, 148.5, 58.2]],
      "5120×5120": [[685, -1.8620, 5.15, 19.32, 18.68, 252.7, 212.5], [546, -1.2421, 5.60, 22.50, 19.47, 206.1, 165.8], [685, 0.8389, 6.14, 27.79, 22.01, 163.4, 148.0], [704, 0.5278, 5.88, 26.01, 21.43, 178.5, 225.2], [693, 1.1143, 6.25, 29.16, 22.86, 155.7, 85.0], [269, 1.2319, 6.29, 29.34, 22.94, 152.1, 63.3]],
    },
    "Qwen-Image": {
      "2048×4096": [[274, -0.5186, 5.96, 27.25, 20.83, 167.6, 57.8], [301, 0.4448, 5.79, 28.19, 21.07, 161.7, 62.6], [274, 0.5769, 6.12, 28.71, 21.64, 159.0, 74.7], [275, 0.6155, 6.22, 28.87, 22.03, 152.5, 63.0], [276, 1.2467, 6.42, 29.89, 23.10, 146.1, 69.6], [221, 1.3260, 6.44, 30.07, 23.26, 144.5, 68.5]],
      "6144×2048": [[544, 0.1886, 5.86, 26.92, 21.10, 175.3, 68.2], [552, 0.3310, 5.71, 27.59, 20.80, 173.4, 63.1], [544, 0.1442, 5.60, 26.60, 20.47, 181.7, 100.6], [545, 0.6295, 6.04, 28.43, 21.75, 161.6, 65.1], [548, 1.3047, 6.33, 29.28, 23.22, 160.8, 73.4], [355, 1.2752, 6.34, 29.16, 22.69, 159.6, 62.2]],
      "4096×4096": [[902, -0.1313, 5.95, 27.20, 20.84, 167.9, 77.2], [983, 0.6911, 5.84, 28.64, 21.43, 155.3, 65.1], [902, 0.7669, 6.05, 28.70, 21.62, 165.1, 82.1], [906, 1.2614, 6.26, 29.40, 22.66, 152.2, 60.8], [906, 1.4548, 6.47, 29.83, 23.65, 147.4, 65.6], [487, 1.4847, 6.49, 29.62, 23.53, 147.3, 55.3]],
      "5120×5120": [[2014, -0.6020, 5.78, 26.64, 20.24, 186.4, 128.4], [2057, 0.2061, 5.64, 27.13, 20.73, 181.5, 98.3], [2014, -0.3734, 5.38, 25.06, 19.86, 202.8, 178.9], [2019, 0.5555, 5.90, 27.83, 21.38, 172.5, 100.5], [2020, 1.4192, 6.42, 29.90, 23.72, 149.2, 63.4], [862, 1.4540, 6.50, 29.80, 23.27, 146.7, 55.8]],
    },
  },
};


// Figure 6 at 6144 x 6144: the paper gives the speedups (3.2x, 2.9x) but not the seconds, so the seconds here are read
// off its log-scale plot (dot centres against the 100 / 300 / 1000 / 3000 s ticks, rounded to 10 s). Replace with
// the measured values when available.
window.AREA_FIG6 = {
  "FLUX.1": {res: "6144×6144", base: 1310, area: 420, speedup: "3.2", approx: true},
  "Qwen-Image": {res: "6144×6144", base: 3980, area: 1390, speedup: "2.9", approx: true},
};

// Side-by-side comparisons. Each image id is a master's file name under the masters folder (see README).
// Images come from the paper's Figure 5 (assets/AReA/comparison.svg); the order follows the figure.
window.AREA_COMPARISONS = [
  {
    id: "bottle", label: "Glass bottle", model: "FLUX.1", res: "4096 × 4096",
    prompt: "A glass bottle labeled MINT rests before striped paper that bends visibly through the curved glass, with the short text spelled exactly and remaining legible without extra lettering…",
    methods: [
      {label: "UltraImage", img: "cmp-bottle-ultraimage"},
      {label: "SigMa", img: "cmp-bottle-sigma"},
      {label: "DyPE", img: "cmp-bottle-dype"},
      {label: "SEGA", img: "cmp-bottle-sega"},
      {label: "AReA", img: "cmp-bottle-area", ours: true},
    ],
  },
  {
    id: "sidewalk", label: "Sidewalk", model: "Qwen-Image", res: "4096 × 4096",
    prompt: "A woman in a black top and a green striped skirt stands on a sidewalk, looking back over her shoulder, while pedestrians walk by, including a man in a suit and a boy glancing at her…",
    methods: [
      {label: "UltraImage", img: "cmp-sidewalk-ultraimage"},
      {label: "SigMa", img: "cmp-sidewalk-sigma"},
      {label: "DyPE", img: "cmp-sidewalk-dype"},
      {label: "SEGA", img: "cmp-sidewalk-sega"},
      {label: "AReA", img: "cmp-sidewalk-area", ours: true},
    ],
  },
  {
    id: "footbridge", label: "Footbridge", model: "FLUX.1", res: "4096 × 4096",
    prompt: "A cedar footbridge crossing a public garden collects fresh snow during a windless blue-hour evening, with a dramatic sky retaining believable cloud structure and tonal detail…",
    methods: [
      {label: "UltraImage", img: "cmp-footbridge-ultraimage"},
      {label: "SigMa", img: "cmp-footbridge-sigma"},
      {label: "DyPE", img: "cmp-footbridge-dype"},
      {label: "SEGA", img: "cmp-footbridge-sega"},
      {label: "AReA", img: "cmp-footbridge-area", ours: true},
    ],
  },
  {
    id: "uniforms", label: "Uniforms", model: "FLUX.1", res: "4096 × 2048",
    prompt: "Four characters in detailed, ornate military-style uniforms stand side by side, each exuding a unique persona; the first two are men with various facial hair styles, intricate coat designs, and accessories, while the third…",
    methods: [
      {label: "UltraImage", img: "cmp-uniforms-ultraimage"},
      {label: "SigMa", img: "cmp-uniforms-sigma"},
      {label: "DyPE", img: "cmp-uniforms-dype"},
      {label: "SEGA", img: "cmp-uniforms-sega"},
      {label: "AReA", img: "cmp-uniforms-area", ours: true},
    ],
  },
];
