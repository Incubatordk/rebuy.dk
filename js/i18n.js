/* ==========================================================================
   Rebuy.dk — Internationalization (i18n)
   Supports Danish (da) and English (en) with auto-detection.
   ========================================================================== */

var I18N = (function () {
  "use strict";

  var DEFAULT_LANG = "da";
  var SUPPORTED = ["da", "en"];
  var STORAGE_KEY = "rebuy-lang";

  var translations = {
    da: {
      // Meta
      "meta.title": "Rebuy — Køb og sælg børneting lokalt",
      "meta.description": "Rebuy er en ny markedsplads for børnefamilier i Danmark. Køb og sælg børnetøj, legetøj og udstyr lokalt.",

      // Header
      "lang.toggle": "EN",

      // Pre-launch hero
      "prelaunch.badge": "Kommer snart",
      "prelaunch.title": "Noget nyt er på vej",

      // Cards
      "card.local.title": "Lokalt og nemt",
      "card.local.text": "Find køb og salg i dit nærområde. Ingen forsendelse, ingen besvær — bare en hurtig udveksling med en anden familie.",
      "card.safe.title": "Trygt og sikkert",
      "card.safe.text": "Direkte kontakt med andre forældre. Chat i appen, aftal et møde, og handel ansigt til ansigt.",
      "card.sustainable.title": "Bæredygtigt",
      "card.sustainable.text": "Giv børneting et nyt liv. Godt for pengepungen, godt for miljøet — og godt for den næste familie.",

      // Signup
      "signup.title": "Bliv den første til at høre nyt",
      "signup.text": "Tilmeld dig og få besked, når Rebuy er klar til download.",
      "signup.placeholder": "Din e-mail",
      "signup.button": "Tilmeld",
      "signup.success": "Tak for din tilmelding! Vi sender dig en besked, når Rebuy er klar. 🎉",
      "signup.aria": "E-mailadresse",

      // Launched hero
      "launched.title": "Køb og sælg børneting i dit nærområde",
      "launched.subtitle": "Rebuy forbinder børnefamilier lokalt. Find gode tilbud på børnetøj, legetøj og udstyr — eller sælg det, dine børn er vokset fra.",

      // Store buttons
      "store.download": "Download fra",
      "store.appstore": "App Store",
      "store.playstore": "Google Play",

      // CTA
      "cta.title": "Download Rebuy i dag",
      "cta.text": "Begynd at købe og sælge børneting i dit nærområde.",

      // Footer
      "footer.privacy": "Privatlivspolitik",
      "footer.terms": "Vilkår og betingelser",
      "footer.copyright": "© 2026 Rebuy. Alle rettigheder forbeholdes.",

      // Privacy page
      "privacy.title": "Privatlivspolitik",
      "privacy.updated": "Sidst opdateret: marts 2026",
      "privacy.h1": "1. Dataansvarlig",
      "privacy.p1": "Rebuy er dataansvarlig for behandlingen af de personoplysninger, som vi modtager om dig. Hvis du har spørgsmål, kan du kontakte os på support@rebuy.dk.",
      "privacy.h2": "2. Hvilke oplysninger indsamler vi",
      "privacy.p2": "Når du opretter en konto, indsamler vi dit navn, e-mailadresse og valgfrit profilbillede. Når du opretter annoncer, gemmer vi annoncens indhold, billeder og din omtrentlige lokation.",
      "privacy.h3": "3. Formål med behandlingen",
      "privacy.p3": "Vi bruger dine oplysninger til at levere Rebuy-tjenesten, herunder at vise annoncer i dit nærområde, muliggøre kontakt mellem købere og sælgere samt sende dig relevante notifikationer.",
      "privacy.h4": "4. Deling af oplysninger",
      "privacy.p4": "Vi deler ikke dine personoplysninger med tredjeparter, medmindre det er nødvendigt for at levere tjenesten (f.eks. hosting-udbydere) eller påkrævet ved lov.",
      "privacy.h5": "5. Opbevaring",
      "privacy.p5": "Vi opbevarer dine oplysninger, så længe din konto er aktiv. Du kan til enhver tid slette din konto, hvorefter dine data bliver fjernet.",
      "privacy.h6": "6. Dine rettigheder",
      "privacy.p6": "Du har ret til at få indsigt i, rette eller slette dine personoplysninger. Du har også ret til at gøre indsigelse mod behandlingen. Kontakt os på support@rebuy.dk for at udøve dine rettigheder.",
      "privacy.h7": "7. Cookies",
      "privacy.p7": "Denne hjemmeside bruger ikke cookies til sporing. Vi bruger kun teknisk nødvendige cookies, hvis det kræves af tjenesten.",

      // Terms page
      "terms.title": "Vilkår og betingelser",
      "terms.updated": "Sidst opdateret: marts 2026",
      "terms.h1": "1. Generelt",
      "terms.p1": "Disse vilkår gælder for din brug af Rebuy-appen og rebuy.dk. Ved at oprette en konto accepterer du disse vilkår.",
      "terms.h2": "2. Tjenesten",
      "terms.p2": "Rebuy er en markedsplads, der forbinder købere og sælgere af brugte børneartikler. Rebuy er ikke part i transaktioner mellem brugere og er ikke ansvarlig for varer, der købes eller sælges via platformen.",
      "terms.h3": "3. Brugerkrav",
      "terms.p3": "Du skal være mindst 18 år for at oprette en konto. Du er ansvarlig for at holde dine kontooplysninger sikre og for al aktivitet på din konto.",
      "terms.h4": "4. Annoncer",
      "terms.p4": "Du er ansvarlig for indholdet af dine annoncer. Annoncer skal være sandfærdige og vedrøre børneartikler. Vi forbeholder os retten til at fjerne annoncer, der overtræder vores retningslinjer.",
      "terms.h5": "5. Ansvar",
      "terms.p5": "Rebuy leverer platformen \"som den er\" og påtager sig ikke ansvar for transaktioner mellem brugere, herunder kvaliteten af varer eller betalingsforhold.",
      "terms.h6": "6. Opsigelse",
      "terms.p6": "Du kan til enhver tid slette din konto. Vi kan lukke konti, der overtræder disse vilkår.",
      "terms.h7": "7. Ændringer",
      "terms.p7": "Vi kan opdatere disse vilkår fra tid til anden. Ved væsentlige ændringer giver vi dig besked via appen eller e-mail.",
      "terms.h8": "8. Kontakt",
      "terms.p8": "Har du spørgsmål til disse vilkår, kan du kontakte os på support@rebuy.dk.",
    },

    en: {
      // Meta
      "meta.title": "Rebuy — Buy and sell kids' items locally",
      "meta.description": "Rebuy is a new marketplace for families in Denmark. Buy and sell kids' clothes, toys and gear locally.",

      // Header
      "lang.toggle": "DA",

      // Pre-launch hero
      "prelaunch.badge": "Coming soon",
      "prelaunch.title": "Something new is on the way",

      // Cards
      "card.local.title": "Local and easy",
      "card.local.text": "Find buyers and sellers nearby. No shipping, no hassle — just a quick exchange with another family.",
      "card.safe.title": "Safe and secure",
      "card.safe.text": "Direct contact with other parents. Chat in the app, arrange a meetup, and trade face to face.",
      "card.sustainable.title": "Sustainable",
      "card.sustainable.text": "Give kids' items a new life. Good for your wallet, good for the planet — and good for the next family.",

      // Signup
      "signup.title": "Be the first to know",
      "signup.text": "Sign up and get notified when Rebuy is ready to download.",
      "signup.placeholder": "Your email",
      "signup.button": "Sign up",
      "signup.success": "Thanks for signing up! We'll let you know when Rebuy is ready. 🎉",
      "signup.aria": "Email address",

      // Launched hero
      "launched.title": "Buy and sell kids' items in your neighbourhood",
      "launched.subtitle": "Rebuy connects families locally. Find great deals on kids' clothes, toys and gear — or sell what your kids have outgrown.",

      // Store buttons
      "store.download": "Download on",
      "store.appstore": "App Store",
      "store.playstore": "Google Play",

      // CTA
      "cta.title": "Download Rebuy today",
      "cta.text": "Start buying and selling kids' items in your neighbourhood.",

      // Footer
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms & Conditions",
      "footer.copyright": "© 2026 Rebuy. All rights reserved.",

      // Privacy page
      "privacy.title": "Privacy Policy",
      "privacy.updated": "Last updated: March 2026",
      "privacy.h1": "1. Data Controller",
      "privacy.p1": "Rebuy is the data controller for the personal data we receive about you. If you have questions, you can contact us at support@rebuy.dk.",
      "privacy.h2": "2. What information do we collect",
      "privacy.p2": "When you create an account, we collect your name, email address and optional profile photo. When you create listings, we store the listing content, images and your approximate location.",
      "privacy.h3": "3. Purpose of processing",
      "privacy.p3": "We use your information to provide the Rebuy service, including showing listings in your area, enabling contact between buyers and sellers, and sending you relevant notifications.",
      "privacy.h4": "4. Sharing of information",
      "privacy.p4": "We do not share your personal data with third parties unless it is necessary to provide the service (e.g. hosting providers) or required by law.",
      "privacy.h5": "5. Storage",
      "privacy.p5": "We store your information as long as your account is active. You can delete your account at any time, after which your data will be removed.",
      "privacy.h6": "6. Your rights",
      "privacy.p6": "You have the right to access, correct or delete your personal data. You also have the right to object to processing. Contact us at support@rebuy.dk to exercise your rights.",
      "privacy.h7": "7. Cookies",
      "privacy.p7": "This website does not use tracking cookies. We only use technically necessary cookies if required by the service.",

      // Terms page
      "terms.title": "Terms & Conditions",
      "terms.updated": "Last updated: March 2026",
      "terms.h1": "1. General",
      "terms.p1": "These terms apply to your use of the Rebuy app and rebuy.dk. By creating an account, you accept these terms.",
      "terms.h2": "2. The Service",
      "terms.p2": "Rebuy is a marketplace that connects buyers and sellers of used children's items. Rebuy is not a party in transactions between users and is not responsible for items bought or sold through the platform.",
      "terms.h3": "3. User Requirements",
      "terms.p3": "You must be at least 18 years old to create an account. You are responsible for keeping your account information secure and for all activity on your account.",
      "terms.h4": "4. Listings",
      "terms.p4": "You are responsible for the content of your listings. Listings must be truthful and relate to children's items. We reserve the right to remove listings that violate our guidelines.",
      "terms.h5": "5. Liability",
      "terms.p5": "Rebuy provides the platform \"as is\" and does not assume responsibility for transactions between users, including the quality of items or payment conditions.",
      "terms.h6": "6. Termination",
      "terms.p6": "You can delete your account at any time. We may close accounts that violate these terms.",
      "terms.h7": "7. Changes",
      "terms.p7": "We may update these terms from time to time. For significant changes, we will notify you via the app or email.",
      "terms.h8": "8. Contact",
      "terms.p8": "If you have questions about these terms, you can contact us at support@rebuy.dk.",
    },
  };

  function detect() {
    // 1. Check localStorage for saved preference
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    // 2. Auto-detect from browser
    var browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.indexOf("da") === 0) return "da";
    if (browserLang.indexOf("en") === 0) return "en";

    // 3. Fallback
    return DEFAULT_LANG;
  }

  function t(key, lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];
    return dict[key] || translations[DEFAULT_LANG][key] || key;
  }

  function apply(lang) {
    // Update <html lang>
    document.documentElement.lang = lang;

    // Update <title>
    document.title = t("meta.title", lang);

    // Update meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description", lang));

    // Update all [data-i18n] elements
    var elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = t(key, lang);
    });

    // Update all [data-i18n-placeholder] elements
    var placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key, lang));
    });

    // Update all [data-i18n-aria] elements
    var arias = document.querySelectorAll("[data-i18n-aria]");
    arias.forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", t(key, lang));
    });

    // Save preference
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function toggle() {
    var current = document.documentElement.lang || DEFAULT_LANG;
    var next = current === "da" ? "en" : "da";
    apply(next);
    return next;
  }

  return {
    detect: detect,
    apply: apply,
    toggle: toggle,
    t: t,
  };
})();
