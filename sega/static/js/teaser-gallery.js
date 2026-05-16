(function () {
  const PLACEHOLDER = "./static/images/placeholder.svg";

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(function (entry) {
        var k = entry[0];
        var v = entry[1];
        if (k === "className") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v;
        else if (k.startsWith("data")) node.setAttribute(k, v);
        else node.setAttribute(k, v);
      });
    }
    (children || []).forEach(function (c) {
      if (c != null) node.appendChild(c);
    });
    return node;
  }

  function wireImg(img) {
    img.addEventListener("error", function once() {
      img.removeEventListener("error", once);
      if (img.getAttribute("src") !== PLACEHOLDER) {
        img.src = PLACEHOLDER;
      }
    });
  }

  function validateManifest(m) {
    if (!m || !Array.isArray(m.columnLabels) || m.columnLabels.length < 1) {
      return "manifest.json: columnLabels must be a non-empty array.";
    }
    if (!Array.isArray(m.blocks) || m.blocks.length === 0) {
      return "manifest.json: blocks must be a non-empty array.";
    }
    var n = m.columnLabels.length;
    for (var b = 0; b < m.blocks.length; b++) {
      var block = m.blocks[b];
      if (!block || !Array.isArray(block.rows)) {
        return "manifest.json: each block needs a rows array.";
      }
      for (var r = 0; r < block.rows.length; r++) {
        var row = block.rows[r];
        if (!row || !Array.isArray(row.images)) {
          return "manifest.json: each row needs an images array.";
        }
        if (row.images.length !== n) {
          return (
            "Row " +
            (r + 1) +
            ' in block "' +
            (block.heading || b) +
            '" has ' +
            row.images.length +
            " images but columnLabels has " +
            n +
            "."
          );
        }
      }
    }
    return null;
  }

  function render(manifest) {
    var validationErr = validateManifest(manifest);
    if (validationErr) {
      return el("p", { className: "has-text-danger", text: validationErr });
    }

    var root = el("div", { className: "teaser-gallery" });
    var n = manifest.columnLabels.length;
    if (n === 1) {
      root.classList.add("teaser-gallery--solo");
    }

    var headerWrap = el("div", { className: "teaser-gallery-scroll" });
    var headerGrid = el("div", {
      className: "teaser-gallery-columns",
      style: "grid-template-columns: repeat(" + n + ", minmax(140px, 1fr));",
    });
    manifest.columnLabels.forEach(function (label) {
      headerGrid.appendChild(
        el("div", { className: "has-text-centered" }, [
          el("p", { className: "is-size-6", style: "margin-bottom:0" }, [
            el("strong", {}, [document.createTextNode(label)]),
          ]),
        ])
      );
    });
    headerWrap.appendChild(headerGrid);
    root.appendChild(headerWrap);

    manifest.blocks.forEach(function (block) {
      if (block.heading) {
        root.appendChild(
          el("h3", {
            className: "title is-5 teaser-gallery-block-heading",
            text: block.heading,
          })
        );
      }
      block.rows.forEach(function (row) {
        if (row.caption) {
          root.appendChild(
            el("p", { className: "is-size-6 teaser-gallery-caption" }, [
              el("strong", {}, [document.createTextNode(row.caption)]),
            ])
          );
        }
        var rowWrap = el("div", { className: "teaser-gallery-scroll" });
        var rowGrid = el("div", {
          className: "teaser-gallery-row",
          style: "grid-template-columns: repeat(" + n + ", minmax(140px, 1fr));",
        });
        row.images.forEach(function (src) {
          var url = src && String(src).trim() ? src : PLACEHOLDER;
          var cell = el("div", { className: "teaser-gallery-cell" });
          var img = el("img", {
            src: url,
            alt: row.caption || "Comparison",
            loading: "lazy",
            decoding: "async",
          });
          wireImg(img);
          cell.appendChild(img);
          rowGrid.appendChild(cell);
        });
        rowWrap.appendChild(rowGrid);
        root.appendChild(rowWrap);
      });
    });

    return root;
  }

  function init() {
    var mount = document.getElementById("teaser-gallery");
    if (!mount) return;

    fetch("./static/images/teaser/manifest.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (manifest) {
        mount.innerHTML = "";
        mount.appendChild(render(manifest));
      })
      .catch(function () {
        mount.innerHTML = "";
        mount.appendChild(
          el("p", {
            className: "has-text-grey",
            text: "Could not load static/images/teaser/manifest.json. Serve the site over HTTP (e.g. docker compose up) and check the file path.",
          })
        );
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
