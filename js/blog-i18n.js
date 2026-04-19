/* ==========================================================================
   Rebuy.dk — Blog internationalization
   Keeps blog pages in sync with the shared Rebuy language preference.
   ========================================================================== */

(function () {
  "use strict";

  var DEFAULT_LANG = "da";
  var SUPPORTED = ["da", "en"];
  var STORAGE_KEY = "rebuy-lang";

  var pageMeta = {
    index: {
      da: {
        title: "Blog — Rebuy",
        description: "Fortællinger og praktiske noter fra Rebuy om lokalt genbrug for børnefamilier.",
        ogTitle: "Blog — Rebuy",
        ogDescription: "Fortællinger og praktiske noter fra Rebuy om lokalt genbrug for børnefamilier.",
        locale: "da_DK",
      },
      en: {
        title: "Blog — Rebuy",
        description: "Stories and practical notes from Rebuy about local secondhand shopping for families.",
        ogTitle: "Blog — Rebuy",
        ogDescription: "Stories and practical notes from Rebuy about local secondhand shopping for families.",
        locale: "en_GB",
      },
    },
    post: {
      da: {
        title: "Genbrugsbutikken for enden af din gade — Rebuy",
        description: "Hvorfor lokalt genbrug ofte giver mere mening end fragt, når børnetøj, legetøj og bøger skal videre til næste familie.",
        ogTitle: "Genbrugsbutikken for enden af din gade — Rebuy",
        ogDescription: "Hvorfor lokalt genbrug ofte giver mere mening end fragt, når børnetøj, legetøj og bøger skal videre til næste familie.",
        locale: "da_DK",
      },
      en: {
        title: "The Secondhand Shop at the End of Your Street — Rebuy",
        description: "Why local secondhand beats shipping for kids' clothes, toys, and books — and how Rebuy is making neighborhood reuse the easy option for Danish families.",
        ogTitle: "The Secondhand Shop at the End of Your Street — Rebuy",
        ogDescription: "Why local secondhand beats shipping for kids' clothes, toys, and books — and how Rebuy is making neighborhood reuse the easy option for Danish families.",
        locale: "en_GB",
      },
    },
  };

  var strings = {
    da: {
      "lang.toggle": "EN",
      "nav.blog": "Blog",
      "footer.privacy": "Privatlivspolitik",
      "footer.terms": "Vilkår og betingelser",
      "footer.copyright": "© 2026 Rebuy. Alle rettigheder forbeholdes.",
      "blog.index.eyebrow": "Blog",
      "blog.index.title": "Noter fra nabolaget",
      "blog.index.text": "Fortællinger om lokalt genbrug, familieliv og de små kredsløb, der gør det lettere at sende børneting videre.",
      "blog.card.aria": "Læs Genbrugsbutikken for enden af din gade",
      "blog.image.alt": "Forælder med barnevogn finder et brugt trætog tæt på i et dansk nabolag",
      "blog.post.date": "19. april 2026 · Rebuy",
      "blog.post.title": "Genbrugsbutikken for enden af din gade",
      "blog.post.dek": "Hvorfor lokale handler ansigt til ansigt giver mere mening for børnefamilier end apps, der starter med fragt.",
      "blog.post.excerpt": "Hvorfor lokalt genbrug ofte giver mere mening end fragt, når børnetøj, legetøj og bøger skal videre.",
      "blog.read": "Læs artiklen",
      "blog.back": "Blog",
    },
    en: {
      "lang.toggle": "DA",
      "nav.blog": "Blog",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms & Conditions",
      "footer.copyright": "© 2026 Rebuy. All rights reserved.",
      "blog.index.eyebrow": "Blog",
      "blog.index.title": "Notes from the neighborhood",
      "blog.index.text": "Stories about local secondhand shopping, family life, and the small loops that make reuse easier.",
      "blog.card.aria": "Read The Secondhand Shop at the End of Your Street",
      "blog.image.alt": "Parent with stroller discovering a secondhand wooden train set nearby in a Danish neighborhood",
      "blog.post.date": "April 19, 2026 · Rebuy",
      "blog.post.title": "The Secondhand Shop at the End of Your Street",
      "blog.post.dek": "Why local, in-person trades make more sense for families than shipping-first apps — and how we're building something around that idea.",
      "blog.post.excerpt": "Why local, in-person trades make more sense for families than shipping-first apps.",
      "blog.read": "Read the article",
      "blog.back": "Blog",
    },
  };

  function detect() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.indexOf("en") === 0) return "en";
    return DEFAULT_LANG;
  }

  function t(key, lang) {
    var dict = strings[lang] || strings[DEFAULT_LANG];
    return dict[key] || strings[DEFAULT_LANG][key] || key;
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function apply(lang) {
    var selected = SUPPORTED.indexOf(lang) !== -1 ? lang : DEFAULT_LANG;
    var page = document.body.getAttribute("data-blog-page") || "index";
    var meta = pageMeta[page] && pageMeta[page][selected];

    document.documentElement.lang = selected;
    document.body.setAttribute("data-lang", selected);
    localStorage.setItem(STORAGE_KEY, selected);

    if (meta) {
      document.title = meta.title;
      setMeta('meta[name="description"]', "content", meta.description);
      setMeta('meta[property="og:title"]', "content", meta.ogTitle);
      setMeta('meta[property="og:description"]', "content", meta.ogDescription);
      setMeta('meta[property="og:locale"]', "content", meta.locale);
      setMeta('meta[name="twitter:title"]', "content", meta.ogTitle);
      setMeta('meta[name="twitter:description"]', "content", meta.ogDescription);
    }

    document.querySelectorAll("[data-blog-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-blog-i18n"), selected);
    });

    document.querySelectorAll("[data-blog-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-blog-i18n-aria"), selected));
    });

    document.querySelectorAll("[data-blog-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-blog-i18n-alt"), selected));
    });

    document.querySelectorAll("[data-blog-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-blog-lang") !== selected;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(detect());

    var langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        apply((document.documentElement.lang || DEFAULT_LANG) === "da" ? "en" : "da");
      });
    }
  });
})();
