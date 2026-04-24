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
    var errorEl = document.getElementById("signup-error");

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var email = form.querySelector('input[type="email"]').value;
        if (!email) return;

        var url = SITE_CONFIG.APPWRITE_ENDPOINT
          + "/databases/" + SITE_CONFIG.APPWRITE_DATABASE_ID
          + "/collections/" + SITE_CONFIG.APPWRITE_COLLECTION_ID
          + "/documents";

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Appwrite-Project": SITE_CONFIG.APPWRITE_PROJECT_ID,
          },
          body: JSON.stringify({
            documentId: "unique()",
            data: { email: email },
          }),
        })
          .then(function (response) {
            if (!response.ok) {
              return response.json().then(function (err) {
                throw new Error(err && err.message ? err.message : "HTTP " + response.status);
              });
            }
            form.classList.add("hidden");
            if (errorEl) errorEl.hidden = true;
            successEl.classList.add("visible");
          })
          .catch(function (err) {
            console.error("Signup failed:", err);
            if (errorEl) errorEl.hidden = false;
          });
      });
    }
  }

  // ---- Contact form modal (both prelaunch and launched modes) ----

  var contactModal = document.getElementById("contact-modal");
  var contactOpen = document.getElementById("contact-open");
  var contactForm = document.getElementById("contact-form");
  var contactSuccess = document.getElementById("contact-success");
  var contactError = document.getElementById("contact-error");
  var lastFocused = null;

  function openContactModal() {
    if (!contactModal) return;
    lastFocused = document.activeElement;
    contactModal.hidden = false;
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var firstInput = contactModal.querySelector("input, textarea");
    if (firstInput) firstInput.focus();
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    contactModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (contactOpen && contactModal) {
    contactOpen.addEventListener("click", openContactModal);

    contactModal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-modal-close")) closeContactModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !contactModal.hidden) closeContactModal();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = {
        name: contactForm.elements.name.value.trim(),
        email: contactForm.elements.email.value.trim(),
        subject: contactForm.elements.subject.value.trim(),
        message: contactForm.elements.message.value.trim(),
      };
      if (!data.name || !data.email || !data.subject || !data.message) return;

      var endpoint = SITE_CONFIG.APPWRITE_APP_ENDPOINT;
      var projectId = SITE_CONFIG.APPWRITE_APP_PROJECT_ID;
      var databaseId = SITE_CONFIG.APPWRITE_DATABASE_ID;
      var collectionId = SITE_CONFIG.APPWRITE_CONTACT_COLLECTION_ID;
      if (!endpoint || !projectId) return;

      var url = endpoint + "/databases/" + databaseId + "/collections/" + collectionId + "/documents";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectId,
        },
        body: JSON.stringify({ documentId: "unique()", data: data }),
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().then(function (err) {
              throw new Error(err && err.message ? err.message : "HTTP " + response.status);
            });
          }
          contactForm.classList.add("hidden");
          contactError.hidden = true;
          contactSuccess.classList.add("visible");
        })
        .catch(function (err) {
          console.error("Contact submit failed:", err);
          contactError.hidden = false;
        });
    });
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
