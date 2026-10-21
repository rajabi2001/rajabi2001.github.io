// Text-to-image comparisons: Figures 3, 5 and 7 of the paper, one prompt per slide, rebuilt from their 512x512 tiles.
// Tile labels (speedup, NFE) were transcribed twice independently from the figures. Figure 5 prints its prompts; for
// Figures 3 and 7 the prompts are not printed, so those slides carry a short description (quoted: false).
window.SPECK_T2I = [
 {
  "id": "fig3-r0",
  "figure": 3,
  "model": "FLUX.1-dev",
  "prompt": "A rose on a checkerboard",
  "quoted": false,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig3/r0_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "6.20× · NFE 8",
    "src": "./static/images/t2i/fig3/r0_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "6.04× · NFE 8",
    "src": "./static/images/t2i/fig3/r0_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "4.49× · NFE 8",
    "src": "./static/images/t2i/fig3/r0_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "5.97× · NFE 8",
    "src": "./static/images/t2i/fig3/r0_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "4.44× · NFE 8",
    "src": "./static/images/t2i/fig3/r0_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "6.11× · NFE 8",
    "src": "./static/images/t2i/fig3/r0_c3.webp"
   }
  ],
  "note": "TaylorSeer and HiCache blur the image.",
  "budget": "Accelerated methods use 8 NFE instead of 50."
 },
 {
  "id": "fig3-r1",
  "figure": 3,
  "model": "FLUX.1-dev",
  "prompt": "A sign reading “TEXT TO IMAGE”",
  "quoted": false,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig3/r1_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "4.94× · NFE 10",
    "src": "./static/images/t2i/fig3/r1_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "4.85× · NFE 10",
    "src": "./static/images/t2i/fig3/r1_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "3.83× · NFE 10",
    "src": "./static/images/t2i/fig3/r1_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "4.83× · NFE 10",
    "src": "./static/images/t2i/fig3/r1_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "3.78× · NFE 10",
    "src": "./static/images/t2i/fig3/r1_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "4.92× · NFE 10",
    "src": "./static/images/t2i/fig3/r1_c3.webp"
   }
  ],
  "note": "Every baseline misspells or distorts the text on the sign; the red box marks the misshapen letter on Spectrum’s sign. TaylorSeer and HiCache also blur the image.",
  "budget": "Accelerated methods use 10 NFE instead of 50."
 },
 {
  "id": "fig5-r0",
  "figure": 5,
  "model": "Qwen-Image",
  "prompt": "A pyramid made of falafel with a partial solar eclipse in the background.",
  "quoted": true,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig5/r0_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "4.96× · NFE 10",
    "src": "./static/images/t2i/fig5/r0_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "4.22× · NFE 10",
    "src": "./static/images/t2i/fig5/r0_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "3.39× · NFE 10",
    "src": "./static/images/t2i/fig5/r0_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "4.21× · NFE 10",
    "src": "./static/images/t2i/fig5/r0_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "2.94× · NFE 10",
    "src": "./static/images/t2i/fig5/r0_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "4.30× · NFE 10",
    "src": "./static/images/t2i/fig5/r0_c3.webp"
   }
  ],
  "note": "TaylorSeer and HiCache blur the image, and TeaCache and SeaCache alter textures and lighting.",
  "budget": "Accelerated methods use 10 NFE instead of 50."
 },
 {
  "id": "fig5-r1",
  "figure": 5,
  "model": "Qwen-Image",
  "prompt": "A Gothic cathedral facade with intricate stone tracery, two symmetrical towers and a large circular rose window, frontal architectural photograph at sunrise.",
  "quoted": true,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig5/r1_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "6.19× · NFE 8",
    "src": "./static/images/t2i/fig5/r1_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "5.04× · NFE 8",
    "src": "./static/images/t2i/fig5/r1_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "3.87× · NFE 8",
    "src": "./static/images/t2i/fig5/r1_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "5.07× · NFE 8",
    "src": "./static/images/t2i/fig5/r1_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "3.26× · NFE 8",
    "src": "./static/images/t2i/fig5/r1_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "5.14× · NFE 8",
    "src": "./static/images/t2i/fig5/r1_c3.webp"
   }
  ],
  "note": "TaylorSeer and HiCache blur the image, and TeaCache and SeaCache alter textures and lighting.",
  "budget": "Accelerated methods use 8 NFE instead of 50."
 },
 {
  "id": "fig7-r0",
  "figure": 7,
  "model": "Qwen-Image",
  "prompt": "Strawberries in a basket",
  "quoted": false,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig7/r0_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "6.21× · NFE 8",
    "src": "./static/images/t2i/fig7/r0_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "5.03× · NFE 8",
    "src": "./static/images/t2i/fig7/r0_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "3.88× · NFE 8",
    "src": "./static/images/t2i/fig7/r0_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "5.07× · NFE 8",
    "src": "./static/images/t2i/fig7/r0_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "3.26× · NFE 8",
    "src": "./static/images/t2i/fig7/r0_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "5.13× · NFE 8",
    "src": "./static/images/t2i/fig7/r0_c3.webp"
   }
  ],
  "note": "TaylorSeer and HiCache give the scene a strong blue cast, and TeaCache changes the basket’s contents.",
  "budget": "Accelerated methods use 8 NFE instead of 50."
 },
 {
  "id": "fig7-r1",
  "figure": 7,
  "model": "Qwen-Image",
  "prompt": "An astronaut riding a horse",
  "quoted": false,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig7/r1_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "6.19× · NFE 8",
    "src": "./static/images/t2i/fig7/r1_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "5.04× · NFE 8",
    "src": "./static/images/t2i/fig7/r1_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "3.89× · NFE 8",
    "src": "./static/images/t2i/fig7/r1_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "5.08× · NFE 8",
    "src": "./static/images/t2i/fig7/r1_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "3.27× · NFE 8",
    "src": "./static/images/t2i/fig7/r1_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "5.15× · NFE 8",
    "src": "./static/images/t2i/fig7/r1_c3.webp"
   }
  ],
  "note": "TeaCache introduces a second astronaut, SeaCache adds an extra horse leg, and Spectrum introduces grain and distorts the rider.",
  "budget": "Accelerated methods use 8 NFE instead of 50."
 },
 {
  "id": "fig7-r2",
  "figure": 7,
  "model": "Qwen-Image",
  "prompt": "A fox in snow",
  "quoted": false,
  "tiles": [
   {
    "method": "Reference",
    "label": "1.00× · NFE 50",
    "src": "./static/images/t2i/fig7/r2_c0.webp",
    "ref": true
   },
   {
    "method": "SpecKCast (ours)",
    "label": "4.97× · NFE 10",
    "src": "./static/images/t2i/fig7/r2_c6.webp",
    "ours": true
   },
   {
    "method": "Spectrum",
    "label": "4.18× · NFE 10",
    "src": "./static/images/t2i/fig7/r2_c5.webp"
   },
   {
    "method": "TaylorSeer",
    "label": "3.40× · NFE 10",
    "src": "./static/images/t2i/fig7/r2_c1.webp"
   },
   {
    "method": "SeaCache",
    "label": "4.23× · NFE 10",
    "src": "./static/images/t2i/fig7/r2_c4.webp"
   },
   {
    "method": "HiCache",
    "label": "2.90× · NFE 10",
    "src": "./static/images/t2i/fig7/r2_c2.webp"
   },
   {
    "method": "TeaCache",
    "label": "4.28× · NFE 10",
    "src": "./static/images/t2i/fig7/r2_c3.webp"
   }
  ],
  "note": "TaylorSeer and HiCache darken the scene, and SeaCache smooths the fox’s fur.",
  "budget": "Accelerated methods use 10 NFE instead of 50."
 }
];
