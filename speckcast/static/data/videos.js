// Video comparisons: the clips behind the paper's video figures (frames 0, 40 and 80 of each clip match the figure).
// Labels are copied from the figures: each clip's own NFE and measured speedup. Each clip has a poster from its own frame 0. Clips are listed reference first, then SpecKCast, then the baselines.
(function () {
  const V = "./static/videos/";
  const clip = (dir, file, label, sub, extra) =>
    Object.assign({src: V + dir + "/" + file + ".mp4", poster: V + dir + "/" + file + ".jpg", label, sub}, extra || {});
  window.SPECK_VIDEOS = [
    {
      id: "bird-cat", tab: "Bird and cat", model: "HunyuanVideo", figure: 4, prompt: "a bird and a cat",
      budget: "Accelerated methods use 10–11 transformer evaluations (NFE) instead of 50.",
      clips: [
        clip("hunyuan-bird-cat", "reference", "Reference", "50 NFE · 1.00×", {ref: true}),
        clip("hunyuan-bird-cat", "speckcast", "SpecKCast (ours)", "10 NFE · 4.40×", {ours: true}),
        clip("hunyuan-bird-cat", "spectrum", "Spectrum", "10 NFE · 4.28×"),
        clip("hunyuan-bird-cat", "taylorseer", "TaylorSeer", "10 NFE · 4.32×"),
        clip("hunyuan-bird-cat", "seacache", "SeaCache", "10 NFE · 4.29×"),
        clip("hunyuan-bird-cat", "hicache", "HiCache", "10 NFE · 4.35×"),
        clip("hunyuan-bird-cat", "teacache", "TeaCache", "11 NFE · 3.97×"),
        clip("hunyuan-bird-cat", "fora", "FORA", "10 NFE · 4.37×"),
      ],
      note: "Most baselines replace the puffin in the first frame with a blurred or different bird, and SeaCache adds a second cat in later frames.",
    },
    {
      id: "panda-cafe", tab: "Panda in a café", model: "Wan2.1-14B", figure: 6, prompt: "A panda drinking coffee in a cafe in Paris, Van Gogh style",
      budget: "Accelerated methods use 13–16 transformer evaluations (NFE) instead of 50.",
      clips: [
        clip("wan-panda-cafe", "reference", "Reference", "50 NFE · 1.00×", {ref: true}),
        clip("wan-panda-cafe", "speckcast", "SpecKCast (ours)", "14 NFE · 3.43×", {ours: true}),
        clip("wan-panda-cafe", "spectrum", "Spectrum", "14 NFE · 3.36×"),
        clip("wan-panda-cafe", "taylorseer", "TaylorSeer", "16 NFE · 2.99×"),
        clip("wan-panda-cafe", "seacache", "SeaCache", "14 NFE · 3.38×"),
        clip("wan-panda-cafe", "hicache", "HiCache", "14 NFE · 3.41×"),
        clip("wan-panda-cafe", "teacache", "TeaCache", "13 NFE · 3.69×"),
        clip("wan-panda-cafe", "fora", "FORA", "14 NFE · 3.48×"),
      ],
      note: "The baselines introduce local artifacts, mostly in the window background, and HiCache also shifts the lighting.",
    },
    {
      id: "bottle-chair", tab: "Bottle and chair", model: "HunyuanVideo", figure: 8, prompt: "a bottle and a chair",
      budget: "Accelerated methods use 10–11 transformer evaluations (NFE) instead of 50.",
      clips: [
        clip("hunyuan-bottle-chair", "reference", "Reference", "50 NFE · 1.00×", {ref: true}),
        clip("hunyuan-bottle-chair", "speckcast", "SpecKCast (ours)", "10 NFE · 4.27×", {ours: true}),
        clip("hunyuan-bottle-chair", "spectrum", "Spectrum", "10 NFE · 4.15×"),
        clip("hunyuan-bottle-chair", "taylorseer", "TaylorSeer", "10 NFE · 4.18×"),
        clip("hunyuan-bottle-chair", "hicache", "HiCache", "10 NFE · 4.22×"),
        clip("hunyuan-bottle-chair", "teacache", "TeaCache", "11 NFE · 3.85×"),
        clip("hunyuan-bottle-chair", "fora", "FORA", "10 NFE · 4.24×"),
      ],
      note: "SpecKCast avoids the severe facial blur visible in FORA and TaylorSeer and keeps the bottle in hand, although the subject’s appearance still differs from the reference.",
    },
    {
      id: "bicycle", tab: "Bicycle", model: "HunyuanVideo", figure: 9, prompt: "a bicycle leaning against a tree",
      budget: "Accelerated methods use 13–16 transformer evaluations (NFE) instead of 50.",
      clips: [
        clip("hunyuan-bicycle", "reference", "Reference", "50 NFE · 1.00×", {ref: true}),
        clip("hunyuan-bicycle", "speckcast", "SpecKCast (ours)", "13 NFE · 3.41×", {ours: true}),
        clip("hunyuan-bicycle", "spectrum", "Spectrum", "14 NFE · 3.13×"),
        clip("hunyuan-bicycle", "taylorseer", "TaylorSeer", "16 NFE · 2.82×"),
      ],
      note: "TaylorSeer and Spectrum introduce an additional wheel-like structure between the bicycle’s two wheels. SpecKCast better preserves the main bicycle geometry, although the front basket is missing.",
    },
    {
      id: "boat-seine", tab: "Boat on the Seine", model: "Wan2.1-14B", figure: 11, prompt: "A boat sailing leisurely along the Seine River with the Eiffel Tower in background, racking focus",
      budget: "Accelerated methods use 8 transformer evaluations (NFE) instead of 50.",
      clips: [
        clip("wan-boat-seine", "reference", "Reference", "50 NFE · 1.00×", {ref: true}),
        clip("wan-boat-seine", "speckcast", "SpecKCast (ours)", "8 NFE · 5.65×", {ours: true}),
        clip("wan-boat-seine", "spectrum", "Spectrum", "8 NFE · 5.65×"),
        clip("wan-boat-seine", "taylorseer", "TaylorSeer", "8 NFE · 5.62×"),
      ],
      note: "TaylorSeer severely distorts the boat and skyline, and Spectrum alters the Eiffel Tower’s shape. SpecKCast retains a more faithful landmark silhouette and river layout at the same 8 NFE and 5.65× speedup as Spectrum.",
    },
  ];
})();
