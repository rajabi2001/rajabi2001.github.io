// Teaser: Wan2.1-14B samples, each the original 50-step sample next to SpecKCast from the same prompt and seed.
// SpecKCast speedups were supplied by the authors for these runs.
(function () {
  const V = "./static/videos/";
  const pair = (dir, desc, quoted, ours) => ({
    desc, quoted,
    ref: {src: V + dir + "/reference.mp4", poster: V + dir + "/reference.jpg", label: "no acceleration"},
    ours: {src: V + dir + "/speckcast.mp4", poster: V + dir + "/speckcast.jpg", label: ours},
  });
  window.SPECK_TEASER = {
    model: "Wan2.1-14B",
    samples: [
      pair("teaser-panda", "A panda drinking coffee in a cafe in Paris, zoom in", true, "4.63× faster"),
      pair("teaser-teddy", "a teddy bear playing drums in Times Square", false, "3.01× faster"),
      pair("teaser-astronaut", "an astronaut floating above the Earth", false, "3.29× faster"),
    ],
  };
})();
