(function () {
  "use strict";

  var STORAGE_KEY = "sega-theme";

  function placeholderUrl() {
    var theme = document.documentElement.getAttribute("data-theme");
    return theme === "dark"
      ? "./static/images/placeholder-dark.svg"
      : "./static/images/placeholder.svg";
  }

  window.segaPlaceholderUrl = placeholderUrl;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function resolveTheme() {
    var stored = getStoredTheme();
    return stored === "light" || stored === "dark" ? stored : getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  function updateToggleButton(btn, theme) {
    var isDark = theme === "dark";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    btn.title = isDark ? "Light mode" : "Dark mode";
    btn.classList.toggle("is-dark-active", isDark);
  }

  function init() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    var theme = resolveTheme();
    applyTheme(theme);
    updateToggleButton(btn, theme);

    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      persistTheme(next);
      updateToggleButton(btn, next);
      syncPlaceholderImages();
    });

    function syncPlaceholderImages() {
      var url = placeholderUrl();
      document.querySelectorAll('img[src*="placeholder"]').forEach(function (img) {
        if (img.src.indexOf("placeholder") !== -1) {
          img.src = url;
        }
      });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (getStoredTheme()) return;
      var next = e.matches ? "dark" : "light";
      applyTheme(next);
      updateToggleButton(btn, next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
