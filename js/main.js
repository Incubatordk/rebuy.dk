/* ==========================================================================
   Rebuy.dk — Main JavaScript
   ========================================================================== */

(function () {
  "use strict";

  // ---- i18n: detect and apply language ----

  var lang = I18N.detect();
  I18N.apply(lang);

  // ---- Language toggle button ----

  var langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      I18N.toggle();
    });
  }

  // ---- Site mode switching ----
  // URL param ?mode=launched or ?mode=prelaunch overrides config (for testing)

  var urlMode = new URLSearchParams(window.location.search).get("mode");
  var mode = (urlMode === "launched" || urlMode === "prelaunch") ? urlMode : SITE_CONFIG.SITE_MODE;
  var prelaunchEl = document.getElementById("prelaunch-content");
  var launchedEl = document.getElementById("launched-content");

  if (mode === "launched") {
    prelaunchEl.classList.add("hidden");
    launchedEl.classList.remove("hidden");
  } else {
    prelaunchEl.classList.remove("hidden");
    launchedEl.classList.add("hidden");

    // Hide footer links (privacy/terms) in prelaunch mode
    var footerLinks = document.querySelector(".footer-links");
    if (footerLinks) footerLinks.classList.add("hidden");
  }

  // ---- Store button URLs (launched mode) ----

  if (mode === "launched") {
    var appStoreBtn = document.getElementById("app-store-btn");
    var playStoreBtn = document.getElementById("play-store-btn");
    var appStoreBtnCta = document.getElementById("app-store-btn-cta");
    var playStoreBtnCta = document.getElementById("play-store-btn-cta");

    if (appStoreBtn) appStoreBtn.href = SITE_CONFIG.APP_STORE_URL;
    if (playStoreBtn) playStoreBtn.href = SITE_CONFIG.PLAY_STORE_URL;
    if (appStoreBtnCta) appStoreBtnCta.href = SITE_CONFIG.APP_STORE_URL;
    if (playStoreBtnCta) playStoreBtnCta.href = SITE_CONFIG.PLAY_STORE_URL;
  }

  // ---- Email signup form (prelaunch mode) ----

  if (mode === "prelaunch") {
    var form = document.getElementById("signup-form");
    var successEl = document.getElementById("signup-success");

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var email = form.querySelector('input[type="email"]').value;
        if (!email) return;

        // If Formspree ID is configured, submit to Formspree
        if (SITE_CONFIG.FORMSPREE_ID) {
          var formAction = "https://formspree.io/f/" + SITE_CONFIG.FORMSPREE_ID;

          fetch(formAction, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ email: email }),
          })
            .then(function (response) {
              if (response.ok) {
                form.classList.add("hidden");
                successEl.classList.add("visible");
              }
            })
            .catch(function () {
              form.classList.add("hidden");
              successEl.classList.add("visible");
            });
        } else {
          // No Formspree ID — just show success UI
          form.classList.add("hidden");
          successEl.classList.add("visible");
        }
      });
    }
  }

  // ---- Header scroll effect ----

  var header = document.querySelector(".header");
  var scrollThreshold = 10;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Scroll animations ----

  var animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length > 0 && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
