// Sensei support site: the FR / EN / ES switch (hash #fr / #en / #es, then the last choice, then the browser's language).
(function () {
  var KEY = "sensei-lang";
  var LANGS = ["fr", "en", "es"];

  function known(lang) { return LANGS.indexOf(lang) >= 0; }

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function initial() {
    var hash = location.hash.replace("#", "");
    if (known(hash)) return hash;
    var saved = stored();
    if (known(saved)) return saved;
    var browser = (navigator.language || "en").toLowerCase().slice(0, 2);
    return known(browser) ? browser : "en";
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
