// Sensei support site: the FR / EN switch (hash #fr / #en, then the last choice, then the browser's language).
(function () {
  var KEY = "sensei-lang";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function initial() {
    var hash = location.hash.replace("#", "");
    if (hash === "fr" || hash === "en") return hash;
    var saved = stored();
    if (saved === "fr" || saved === "en") return saved;
    return (navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === lang));
    });
    document.dispatchEvent(new CustomEvent("sensei-lang", { detail: lang }));
  }

  window.senseiLang = function () { return document.documentElement.lang; };

  // Loaded in the head: the language is set before the page draws, so the other one never flashes.
  var first = initial();
  document.documentElement.lang = first;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem(KEY, b.dataset.set); } catch (e) { /* private mode: no memory */ }
        apply(b.dataset.set);
      });
    });
    apply(first);
  });
})();
