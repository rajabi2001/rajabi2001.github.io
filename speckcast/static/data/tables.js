// Generated from the paper's Tables 1-3 (two independent transcriptions, cross-checked cell by cell). Do not edit by hand.
window.SPECK_TABLES = {
 "t2i": {
  "columns": [
   {
    "key": "nfe",
    "label": "NFE",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "method",
    "label": "Method",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "flux_latency",
    "label": "Latency (s)",
    "group": "Acceleration",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "flux_speedup",
    "label": "Speedup",
    "group": "Acceleration",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "flux_mem",
    "label": "Mem. Δ (GiB)",
    "group": "",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "flux_psnr",
    "label": "PSNR",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "flux_ssim",
    "label": "SSIM",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "flux_lpips",
    "label": "LPIPS",
    "group": "Quality",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "flux_imagereward",
    "label": "ImageReward",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "flux_clip",
    "label": "CLIP",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "qwen_latency",
    "label": "Latency (s)",
    "group": "Acceleration",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "qwen_speedup",
    "label": "Speedup",
    "group": "Acceleration",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "qwen_mem",
    "label": "Mem. Δ (GiB)",
    "group": "",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "qwen_psnr",
    "label": "PSNR",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "qwen_ssim",
    "label": "SSIM",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "qwen_lpips",
    "label": "LPIPS",
    "group": "Quality",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "qwen_imagereward",
    "label": "ImageReward",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "qwen_clip",
    "label": "CLIP",
    "group": "",
    "better": "higher",
    "numeric": true
   }
  ],
  "rows": [
   {
    "cells": [
     "50",
     "Reference",
     "11.68",
     "1.00",
     "–",
     "–",
     "–",
     "–",
     "0.98",
     "27.20",
     "52.22",
     "1.00",
     "–",
     "–",
     "–",
     "–",
     "1.24",
     "29.14"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "Base",
     "3.35",
     "3.48",
     "0.00",
     "15.30",
     "0.633",
     "0.423",
     "0.98",
     "27.51",
     "14.83",
     "3.52",
     "0.00",
     "15.18",
     "0.640",
     "0.393",
     "1.08",
     "29.19"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "FORA",
     "3.98",
     "2.93",
     "2.01",
     "15.03",
     "0.628",
     "0.433",
     "0.96",
     "27.48",
     "16.11",
     "3.24",
     "9.46",
     "14.03",
     "0.571",
     "0.456",
     "1.02",
     "28.97"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "TeaCache",
     "3.55",
     "3.29",
     "0.07",
     "16.86",
     "0.684",
     "0.355",
     "1.01",
     "27.57",
     "15.68",
     "3.33",
     "0.20",
     "19.42",
     "0.781",
     "0.229",
     "1.19",
     "29.36"
    ],
    "bold": [
     "flux_imagereward",
     "flux_clip",
     "qwen_clip"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "HiCache",
     "4.42",
     "2.64",
     "4.02",
     "18.02",
     "0.708",
     "0.292",
     "1.00",
     "27.50",
     "19.16",
     "2.72",
     "18.97",
     "16.04",
     "0.647",
     "0.335",
     "1.16",
     "29.08"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "SeaCache",
     "3.59",
     "3.25",
     "0.09",
     "22.30",
     "0.813",
     "0.184",
     "0.98",
     "27.40",
     "15.78",
     "3.31",
     "0.24",
     "21.43",
     "0.821",
     "0.190",
     "1.20",
     "29.11"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "TaylorSeer",
     "4.59",
     "2.55",
     "4.02",
     "17.74",
     "0.700",
     "0.305",
     "1.00",
     "27.32",
     "18.37",
     "2.84",
     "18.97",
     "14.22",
     "0.598",
     "0.423",
     "1.05",
     "28.58"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "Spectrum",
     "3.49",
     "3.36",
     "1.15",
     "23.60",
     "0.814",
     "0.165",
     "0.98",
     "27.33",
     "15.72",
     "3.32",
     "2.84",
     "23.66",
     "0.851",
     "0.135",
     "1.21",
     "29.16"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "SpecKCast",
     "3.45",
     "3.38",
     "0.005",
     "24.28",
     "0.836",
     "0.146",
     "0.98",
     "27.32",
     "15.01",
     "3.48",
     "0.01",
     "24.16",
     "0.852",
     "0.134",
     "1.22",
     "29.17"
    ],
    "bold": [
     "flux_latency",
     "flux_speedup",
     "flux_mem",
     "flux_psnr",
     "flux_ssim",
     "flux_lpips",
     "qwen_latency",
     "qwen_speedup",
     "qwen_mem",
     "qwen_psnr",
     "qwen_ssim",
     "qwen_lpips",
     "qwen_imagereward"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "Base",
     "2.48",
     "4.71",
     "0.00",
     "14.55",
     "0.599",
     "0.483",
     "0.87",
     "27.31",
     "10.60",
     "4.93",
     "0.00",
     "14.03",
     "0.586",
     "0.480",
     "0.95",
     "28.89"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "FORA",
     "3.16",
     "3.70",
     "2.01",
     "14.32",
     "0.591",
     "0.502",
     "0.84",
     "27.40",
     "12.16",
     "4.29",
     "9.46",
     "12.73",
     "0.502",
     "0.561",
     "0.65",
     "28.15"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "TeaCache",
     "2.56",
     "4.57",
     "0.07",
     "15.66",
     "0.631",
     "0.440",
     "0.97",
     "27.50",
     "11.46",
     "4.56",
     "0.20",
     "16.11",
     "0.656",
     "0.390",
     "1.06",
     "28.84"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "HiCache",
     "3.62",
     "3.23",
     "4.02",
     "16.30",
     "0.635",
     "0.390",
     "0.99",
     "27.60",
     "15.41",
     "3.39",
     "18.97",
     "12.77",
     "0.488",
     "0.519",
     "0.88",
     "28.02"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "SeaCache",
     "2.55",
     "4.59",
     "0.09",
     "19.29",
     "0.731",
     "0.304",
     "0.97",
     "27.52",
     "11.75",
     "4.45",
     "0.24",
     "19.61",
     "0.767",
     "0.257",
     "1.15",
     "29.08"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "TaylorSeer",
     "3.55",
     "3.29",
     "4.02",
     "15.28",
     "0.607",
     "0.436",
     "0.97",
     "27.37",
     "14.40",
     "3.63",
     "18.97",
     "10.79",
     "0.405",
     "0.623",
     "0.62",
     "26.85"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "Spectrum",
     "2.55",
     "4.59",
     "0.87",
     "21.27",
     "0.729",
     "0.261",
     "0.98",
     "27.62",
     "11.53",
     "4.53",
     "2.21",
     "20.85",
     "0.746",
     "0.318",
     "1.17",
     "29.80"
    ],
    "bold": [
     "qwen_clip"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "SpecKCast",
     "2.46",
     "4.74",
     "0.005",
     "21.77",
     "0.749",
     "0.258",
     "0.98",
     "27.57",
     "10.80",
     "4.83",
     "0.01",
     "22.28",
     "0.790",
     "0.201",
     "1.19",
     "29.01"
    ],
    "bold": [
     "flux_latency",
     "flux_speedup",
     "flux_mem",
     "flux_psnr",
     "flux_ssim",
     "flux_lpips",
     "qwen_latency",
     "qwen_speedup",
     "qwen_mem",
     "qwen_psnr",
     "qwen_ssim",
     "qwen_lpips",
     "qwen_imagereward"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "Base",
     "1.98",
     "5.89",
     "0.00",
     "14.29",
     "0.578",
     "0.518",
     "0.81",
     "27.39",
     "8.54",
     "6.11",
     "0.00",
     "13.53",
     "0.561",
     "0.531",
     "0.80",
     "28.78"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "FORA",
     "2.70",
     "4.33",
     "2.01",
     "14.12",
     "0.574",
     "0.529",
     "0.74",
     "27.07",
     "10.15",
     "5.15",
     "9.46",
     "12.39",
     "0.475",
     "0.589",
     "0.40",
     "27.76"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "TeaCache",
     "2.13",
     "5.75",
     "0.07",
     "15.07",
     "0.600",
     "0.506",
     "0.82",
     "27.48",
     "11.50",
     "4.54",
     "0.20",
     "16.00",
     "0.648",
     "0.397",
     "1.04",
     "28.83"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "HiCache",
     "3.23",
     "3.48",
     "4.02",
     "15.13",
     "0.582",
     "0.466",
     "0.98",
     "27.53",
     "13.50",
     "3.87",
     "18.97",
     "10.86",
     "0.391",
     "0.639",
     "0.56",
     "27.21"
    ],
    "bold": [
     "flux_imagereward"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "SeaCache",
     "2.13",
     "5.48",
     "0.09",
     "18.47",
     "0.688",
     "0.370",
     "0.96",
     "27.52",
     "10.38",
     "5.03",
     "0.24",
     "18.41",
     "0.733",
     "0.307",
     "1.09",
     "28.95"
    ],
    "bold": [
     "flux_ssim"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "TaylorSeer",
     "3.14",
     "3.72",
     "4.02",
     "13.80",
     "0.543",
     "0.516",
     "0.93",
     "27.16",
     "12.48",
     "4.18",
     "18.97",
     "9.17",
     "0.322",
     "0.720",
     "0.26",
     "25.90"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "Spectrum",
     "2.15",
     "5.43",
     "0.73",
     "18.71",
     "0.632",
     "0.397",
     "0.90",
     "27.73",
     "10.23",
     "5.48",
     "1.89",
     "16.91",
     "0.604",
     "0.527",
     "0.90",
     "29.68"
    ],
    "bold": [
     "qwen_clip"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "SpecKCast",
     "2.11",
     "5.54",
     "0.005",
     "19.81",
     "0.683",
     "0.353",
     "0.89",
     "27.48",
     "8.70",
     "6.00",
     "0.01",
     "20.44",
     "0.740",
     "0.267",
     "1.11",
     "28.93"
    ],
    "bold": [
     "flux_latency",
     "flux_speedup",
     "flux_mem",
     "flux_psnr",
     "flux_lpips",
     "qwen_latency",
     "qwen_speedup",
     "qwen_mem",
     "qwen_psnr",
     "qwen_ssim",
     "qwen_lpips",
     "qwen_imagereward"
    ],
    "underline": []
   }
  ],
  "groupKey": "nfe", "refBudget": "50",
  "oursKey": "method",
  "oursValue": "SpecKCast",
  "views": [
   {
    "label": "FLUX.1-dev (1024×1024)",
    "keys": [
     "nfe",
     "method",
     "flux_latency",
     "flux_speedup",
     "flux_mem",
     "flux_psnr",
     "flux_ssim",
     "flux_lpips",
     "flux_imagereward",
     "flux_clip"
    ]
   },
   {
    "label": "Qwen-Image (1328×1328)",
    "keys": [
     "nfe",
     "method",
     "qwen_latency",
     "qwen_speedup",
     "qwen_mem",
     "qwen_psnr",
     "qwen_ssim",
     "qwen_lpips",
     "qwen_imagereward",
     "qwen_clip"
    ]
   }
  ]
 },
 "t2v": {
  "columns": [
   {
    "key": "nfe",
    "label": "NFE",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "method",
    "label": "Method",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "wan_latency",
    "label": "Latency (s)",
    "group": "Acceleration",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "wan_speedup",
    "label": "Speedup",
    "group": "Acceleration",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "wan_mem",
    "label": "Mem. Δ (GiB)",
    "group": "",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "wan_psnr",
    "label": "PSNR",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "wan_ssim",
    "label": "SSIM",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "wan_lpips",
    "label": "LPIPS",
    "group": "Quality",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "wan_vbench",
    "label": "VBench Quality",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "hy_latency",
    "label": "Latency (s)",
    "group": "Acceleration",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "hy_speedup",
    "label": "Speedup",
    "group": "Acceleration",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "hy_mem",
    "label": "Mem. Δ (GiB)",
    "group": "",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "hy_psnr",
    "label": "PSNR",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "hy_ssim",
    "label": "SSIM",
    "group": "Quality",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "hy_lpips",
    "label": "LPIPS",
    "group": "Quality",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "hy_vbench",
    "label": "VBench Quality",
    "group": "",
    "better": "higher",
    "numeric": true
   }
  ],
  "rows": [
   {
    "cells": [
     "50",
     "Reference",
     "370",
     "1.00",
     "–",
     "–",
     "–",
     "–",
     "81.11",
     "183",
     "1.00",
     "–",
     "–",
     "–",
     "–",
     "80.26"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "Base",
     "116",
     "3.20",
     "0.00",
     "13.95",
     "0.471",
     "0.518",
     "79.81",
     "58.3",
     "3.14",
     "0.00",
     "17.33",
     "0.641",
     "0.417",
     "78.38"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "FORA",
     "108.3",
     "3.42",
     "0.62",
     "21.62",
     "0.753",
     "0.192",
     "80.63",
     "56.8",
     "3.22",
     "0.19",
     "23.46",
     "0.775",
     "0.216",
     "78.90"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "TeaCache",
     "105.2",
     "3.52",
     "0.94",
     "22.13",
     "0.772",
     "0.191",
     "80.24",
     "61.2",
     "2.99",
     "0.37",
     "20.56",
     "0.709",
     "0.279",
     "79.35"
    ],
    "bold": [
     "wan_latency",
     "wan_speedup"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "HiCache",
     "111.9",
     "3.31",
     "3.75",
     "18.42",
     "0.675",
     "0.267",
     "80.12",
     "56.8",
     "3.22",
     "1.12",
     "23.43",
     "0.785",
     "0.198",
     "79.54"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "SeaCache",
     "113.2",
     "3.27",
     "4.37",
     "23.10",
     "0.795",
     "0.157",
     "80.38",
     "71.3",
     "2.57",
     "0.37",
     "27.59",
     "0.864",
     "0.121",
     "79.53"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "TaylorSeer",
     "109.4",
     "3.38",
     "4.69",
     "17.94",
     "0.667",
     "0.264",
     "80.12",
     "57.2",
     "3.20",
     "1.49",
     "22.29",
     "0.767",
     "0.217",
     "79.98"
    ],
    "bold": [
     "hy_vbench"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "Spectrum",
     "110.3",
     "3.35",
     "13.12",
     "22.93",
     "0.789",
     "0.136",
     "80.76",
     "58.0",
     "3.15",
     "3.56",
     "26.95",
     "0.831",
     "0.133",
     "79.32"
    ],
    "bold": [
     "wan_lpips"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈14",
     "SpecKCast",
     "105.2",
     "3.52",
     "0.05",
     "24.47",
     "0.813",
     "0.140",
     "80.86",
     "55.0",
     "3.33",
     "0.03",
     "29.72",
     "0.884",
     "0.107",
     "79.68"
    ],
    "bold": [
     "wan_latency",
     "wan_speedup",
     "wan_mem",
     "wan_psnr",
     "wan_ssim",
     "wan_vbench",
     "hy_latency",
     "hy_speedup",
     "hy_mem",
     "hy_psnr",
     "hy_ssim",
     "hy_lpips"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "Base",
     "80.50",
     "4.59",
     "0.00",
     "13.66",
     "0.452",
     "0.578",
     "78.05",
     "42.7",
     "4.28",
     "0.00",
     "16.73",
     "0.621",
     "0.469",
     "76.59"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "FORA",
     "79.6",
     "4.65",
     "0.62",
     "20.68",
     "0.709",
     "0.270",
     "79.76",
     "43.0",
     "4.26",
     "0.19",
     "22.03",
     "0.726",
     "0.306",
     "77.12"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "TeaCache",
     "80.3",
     "4.61",
     "0.94",
     "21.11",
     "0.732",
     "0.245",
     "79.05",
     "47.2",
     "3.88",
     "0.37",
     "19.65",
     "0.672",
     "0.329",
     "78.19"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "HiCache",
     "80.3",
     "4.61",
     "3.75",
     "14.04",
     "0.519",
     "0.474",
     "74.96",
     "43.0",
     "4.26",
     "1.12",
     "21.17",
     "0.718",
     "0.293",
     "78.06"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "SeaCache",
     "89.5",
     "4.13",
     "4.37",
     "19.53",
     "0.686",
     "0.271",
     "79.87",
     "45.4",
     "4.03",
     "0.37",
     "19.34",
     "0.698",
     "0.338",
     "78.08"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "TaylorSeer",
     "80.2",
     "4.61",
     "4.69",
     "14.57",
     "0.549",
     "0.404",
     "76.20",
     "43.4",
     "4.22",
     "1.49",
     "19.54",
     "0.689",
     "0.318",
     "78.19"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "Spectrum",
     "80.8",
     "4.58",
     "9.38",
     "21.41",
     "0.733",
     "0.175",
     "80.42",
     "43.8",
     "4.17",
     "2.81",
     "24.60",
     "0.767",
     "0.191",
     "78.80"
    ],
    "bold": [
     "wan_lpips"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈10",
     "SpecKCast",
     "79.1",
     "4.68",
     "0.05",
     "21.62",
     "0.750",
     "0.181",
     "80.48",
     "42.7",
     "4.29",
     "0.03",
     "25.62",
     "0.821",
     "0.172",
     "79.25"
    ],
    "bold": [
     "wan_latency",
     "wan_speedup",
     "wan_mem",
     "wan_psnr",
     "wan_ssim",
     "wan_vbench",
     "hy_latency",
     "hy_speedup",
     "hy_mem",
     "hy_psnr",
     "hy_ssim",
     "hy_lpips",
     "hy_vbench"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "Base",
     "80.2",
     "4.61",
     "0.00",
     "13.56",
     "0.449",
     "0.614",
     "76.98",
     "38.2",
     "4.79",
     "0.00",
     "16.35",
     "0.612",
     "0.510",
     "75.01"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "FORA",
     "65.5",
     "5.65",
     "0.62",
     "20.19",
     "0.669",
     "0.336",
     "78.38",
     "36.2",
     "5.06",
     "0.19",
     "21.22",
     "0.655",
     "0.346",
     "75.00"
    ],
    "bold": [
     "wan_psnr"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "TeaCache",
     "65.8",
     "5.62",
     "0.94",
     "19.61",
     "0.656",
     "0.335",
     "76.52",
     "36.9",
     "4.96",
     "0.37",
     "18.37",
     "0.617",
     "0.415",
     "76.00"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "HiCache",
     "66.3",
     "5.58",
     "3.75",
     "12.06",
     "0.430",
     "0.578",
     "72.01",
     "36.2",
     "5.06",
     "1.12",
     "19.83",
     "0.643",
     "0.346",
     "75.42"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "SeaCache",
     "65.0",
     "5.69",
     "4.37",
     "15.27",
     "0.519",
     "0.482",
     "76.97",
     "37.0",
     "4.95",
     "0.37",
     "18.98",
     "0.681",
     "0.380",
     "76.81"
    ],
    "bold": [
     "wan_latency",
     "wan_speedup",
     "hy_vbench"
    ],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "TaylorSeer",
     "65.7",
     "5.63",
     "4.69",
     "13.02",
     "0.480",
     "0.475",
     "73.57",
     "36.5",
     "5.01",
     "1.49",
     "18.15",
     "0.620",
     "0.387",
     "74.90"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "Spectrum",
     "66.0",
     "5.61",
     "7.50",
     "17.81",
     "0.638",
     "0.303",
     "78.74",
     "37.9",
     "4.82",
     "2.43",
     "21.74",
     "0.674",
     "0.297",
     "75.77"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "≈8",
     "SpecKCast",
     "65.3",
     "5.67",
     "0.05",
     "19.94",
     "0.683",
     "0.271",
     "79.20",
     "35.8",
     "5.12",
     "0.03",
     "22.34",
     "0.747",
     "0.295",
     "76.32"
    ],
    "bold": [
     "wan_mem",
     "wan_ssim",
     "wan_lpips",
     "wan_vbench",
     "hy_latency",
     "hy_speedup",
     "hy_mem",
     "hy_psnr",
     "hy_ssim",
     "hy_lpips"
    ],
    "underline": []
   }
  ],
  "groupKey": "nfe", "refBudget": "50",
  "oursKey": "method",
  "oursValue": "SpecKCast",
  "views": [
   {
    "label": "Wan2.1-14B",
    "keys": [
     "nfe",
     "method",
     "wan_latency",
     "wan_speedup",
     "wan_mem",
     "wan_psnr",
     "wan_ssim",
     "wan_lpips",
     "wan_vbench"
    ]
   },
   {
    "label": "HunyuanVideo",
    "keys": [
     "nfe",
     "method",
     "hy_latency",
     "hy_speedup",
     "hy_mem",
     "hy_psnr",
     "hy_ssim",
     "hy_lpips",
     "hy_vbench"
    ]
   }
  ]
 },
 "ablation": {
  "columns": [
   {
    "key": "forecaster",
    "label": "Forecaster",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "scheduler",
    "label": "Scheduler",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "time_variable",
    "label": "Time variable",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "freq_decomp",
    "label": "Frequency decomposition",
    "group": "",
    "better": "none",
    "numeric": false
   },
   {
    "key": "latency",
    "label": "Latency (s)",
    "group": "",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "psnr",
    "label": "PSNR",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "ssim",
    "label": "SSIM",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "lpips",
    "label": "LPIPS",
    "group": "",
    "better": "lower",
    "numeric": true
   },
   {
    "key": "imagereward",
    "label": "ImageReward",
    "group": "",
    "better": "higher",
    "numeric": true
   },
   {
    "key": "clip",
    "label": "CLIP",
    "group": "",
    "better": "higher",
    "numeric": true
   }
  ],
  "rows": [
   {
    "cells": [
     "Taylor",
     "fixed",
     "warped-logSNR",
     "✓",
     "3.46",
     "21.90",
     "0.811",
     "0.171",
     "0.978",
     "27.24"
    ],
    "bold": [],
    "underline": [
     "ssim",
     "lpips",
     "imagereward"
    ]
   },
   {
    "cells": [
     "Chebyshev",
     "fixed",
     "warped-logSNR",
     "✓",
     "3.97",
     "21.10",
     "0.761",
     "0.252",
     "0.975",
     "27.66"
    ],
    "bold": [
     "clip"
    ],
    "underline": []
   },
   {
    "cells": [
     "Kalman",
     "fixed",
     "warped-logSNR",
     "✓",
     "3.43",
     "22.09",
     "0.810",
     "0.178",
     "0.973",
     "27.27"
    ],
    "bold": [
     "latency"
    ],
    "underline": [
     "psnr"
    ]
   },
   {
    "cells": [
     "Kalman",
     "adaptive",
     "raw-logSNR",
     "✓",
     "3.52",
     "21.03",
     "0.775",
     "0.210",
     "0.977",
     "27.24"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "Kalman",
     "adaptive",
     "uniform step index",
     "✓",
     "3.51",
     "19.54",
     "0.740",
     "0.256",
     "0.969",
     "27.28"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "Kalman",
     "adaptive",
     "warped-logSNR",
     "×",
     "3.48",
     "21.19",
     "0.785",
     "0.201",
     "0.966",
     "27.13"
    ],
    "bold": [],
    "underline": []
   },
   {
    "cells": [
     "Kalman",
     "adaptive",
     "warped-logSNR",
     "✓",
     "3.45",
     "24.28",
     "0.836",
     "0.146",
     "0.980",
     "27.32"
    ],
    "bold": [
     "psnr",
     "ssim",
     "lpips",
     "imagereward"
    ],
    "underline": [
     "latency",
     "clip"
    ]
   }
  ],
  "oursRow": 6
 }
};
