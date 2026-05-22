/* ==========================================================================
   Rebuy.dk — Blog internationalization
   Keeps blog pages in sync with the shared Rebuy language preference.

   Per-post content (the <title>/meta tags plus the in-page header text:
   date, title, dek, excerpt, image alt, card aria) is namespaced by slug so
   the blog can carry many posts. A post page declares its slug via
   `data-blog-post="<slug>"` on <body>; its header nodes reference
   `post.<slug>.title`, `post.<slug>.dek`, etc. To add a post, add an entry to
   `postMeta` and a matching set of `post.<slug>.*` strings to `strings`.
   ========================================================================== */

(function () {
  "use strict";

  var DEFAULT_LANG = "da";
  var SUPPORTED = ["da", "en"];
  var STORAGE_KEY = "rebuy-lang";

  // <title>/description/og metadata for non-post pages, keyed by data-blog-page.
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
  };

  // <title>/description/og metadata for post pages, keyed by data-blog-post slug.
  var postMeta = {
    "the-secondhand-shop-at-the-end-of-your-street": {
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
    "vuggestue-tjekliste": {
      da: {
        title: "Klar til vuggestue: tøj og must-haves til dit barn — Rebuy",
        description: "Skal dit barn snart starte i vuggestue? Her er en praktisk tjekliste over tøj, skiftetøj, overtøj og de små ting, der gør hverdagen lettere.",
        ogTitle: "Klar til vuggestue: tøj og must-haves til dit barn — Rebuy",
        ogDescription: "Skal dit barn snart starte i vuggestue? Her er en praktisk tjekliste over tøj, skiftetøj, overtøj og de små ting, der gør hverdagen lettere.",
        locale: "da_DK",
      },
      en: {
        title: "Starting Daycare: A Clothes & Must-Haves Checklist — Rebuy",
        description: "Is your little one about to start daycare? Here's a practical checklist of clothes, spare outfits, outerwear and the small things that make the day run smoothly.",
        ogTitle: "Starting Daycare: A Clothes & Must-Haves Checklist — Rebuy",
        ogDescription: "Is your little one about to start daycare? Here's a practical checklist of clothes, spare outfits, outerwear and the small things that make the day run smoothly.",
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
      "blog.read": "Læs artiklen",
      "blog.back": "Blog",

      "post.the-secondhand-shop-at-the-end-of-your-street.card.aria": "Læs Genbrugsbutikken for enden af din gade",
      "post.the-secondhand-shop-at-the-end-of-your-street.image.alt": "Forælder med barnevogn finder et brugt trætog tæt på i et dansk nabolag",
      "post.the-secondhand-shop-at-the-end-of-your-street.date": "19. april 2026 · Rebuy",
      "post.the-secondhand-shop-at-the-end-of-your-street.title": "Genbrugsbutikken for enden af din gade",
      "post.the-secondhand-shop-at-the-end-of-your-street.dek": "Hvorfor lokale handler ansigt til ansigt giver mere mening for børnefamilier end apps, der starter med fragt.",
      "post.the-secondhand-shop-at-the-end-of-your-street.excerpt": "Hvorfor lokalt genbrug ofte giver mere mening end fragt, når børnetøj, legetøj og bøger skal videre.",

      "post.vuggestue-tjekliste.card.aria": "Læs Klar til vuggestue: tøj og must-haves til dit barn",
      "post.vuggestue-tjekliste.image.alt": "Kasse med navngivet skiftetøj, flyverdragt og gummistøvler klar til vuggestuens garderobe",
      "post.vuggestue-tjekliste.date": "22. maj 2026 · Rebuy",
      "post.vuggestue-tjekliste.title": "Klar til vuggestue: tøj og must-haves til dit barn",
      "post.vuggestue-tjekliste.dek": "En rolig gennemgang af, hvad der skal i garderoben — fra skiftetøj og flyverdragt til navnelapper og en tryg indkøring.",
      "post.vuggestue-tjekliste.excerpt": "Praktisk tjekliste over tøj, skiftetøj og must-haves, når den lille skal starte i vuggestue.",
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
      "blog.read": "Read the article",
      "blog.back": "Blog",

      "post.the-secondhand-shop-at-the-end-of-your-street.card.aria": "Read The Secondhand Shop at the End of Your Street",
      "post.the-secondhand-shop-at-the-end-of-your-street.image.alt": "Parent with stroller discovering a secondhand wooden train set nearby in a Danish neighborhood",
      "post.the-secondhand-shop-at-the-end-of-your-street.date": "April 19, 2026 · Rebuy",
      "post.the-secondhand-shop-at-the-end-of-your-street.title": "The Secondhand Shop at the End of Your Street",
      "post.the-secondhand-shop-at-the-end-of-your-street.dek": "Why local, in-person trades make more sense for families than shipping-first apps — and how we're building something around that idea.",
      "post.the-secondhand-shop-at-the-end-of-your-street.excerpt": "Why local, in-person trades make more sense for families than shipping-first apps.",

      "post.vuggestue-tjekliste.card.aria": "Read Starting Daycare: A Clothes & Must-Haves Checklist",
      "post.vuggestue-tjekliste.image.alt": "A labelled box of spare clothes, a snowsuit and rubber boots ready for the daycare cubby",
      "post.vuggestue-tjekliste.date": "May 22, 2026 · Rebuy",
      "post.vuggestue-tjekliste.title": "Starting Daycare: A Clothes & Must-Haves Checklist",
      "post.vuggestue-tjekliste.dek": "A calm walk-through of what to pack in the cubby — from spare clothes and a snowsuit to name labels and a gentle settling-in.",
      "post.vuggestue-tjekliste.excerpt": "A practical checklist of clothes, spares and must-haves for your child's first weeks in daycare.",
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
    var slug = document.body.getAttribute("data-blog-post");
    var meta;
    if (page === "post" && slug && postMeta[slug]) {
      meta = postMeta[slug][selected];
    } else if (pageMeta[page]) {
      meta = pageMeta[page][selected];
    }

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
