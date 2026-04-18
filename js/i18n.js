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
      "prelaunch.title": "En ny måde at købe og sælge børneting er på vej",

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

      // Contact form
      "contact.openLink": "Kontakt",
      "contact.openAria": "Åbn kontaktformular",
      "contact.title": "Kontakt os",
      "contact.text": "Har du spørgsmål? Send os en besked.",
      "contact.close": "Luk",
      "contact.nameLabel": "Navn",
      "contact.namePlaceholder": "Dit navn",
      "contact.emailLabel": "E-mail",
      "contact.emailPlaceholder": "Din e-mail",
      "contact.subjectLabel": "Emne",
      "contact.subjectPlaceholder": "Hvad handler det om?",
      "contact.messageLabel": "Besked",
      "contact.messagePlaceholder": "Skriv din besked",
      "contact.submit": "Send besked",
      "contact.success": "Tak! Vi vender tilbage så hurtigt som muligt.",
      "contact.error": "Noget gik galt. Prøv igen eller skriv til support@rebuy.dk.",

      // Privacy page
      "privacy.title": "Privatlivspolitik",
      "privacy.updated": "Sidst opdateret: 16. april 2026",
      "privacy.intro": "Rebuy er en lokal markedsplads, hvor familier kan købe og sælge brugte børneting. Vi tager din databeskyttelse alvorligt, og denne politik beskriver, hvilke personoplysninger vi indsamler, hvorfor vi gør det, og hvilke rettigheder du har.",
      "privacy.s1_title": "1. Dataansvarlig",
      "privacy.s1_p": "Rebuy er dataansvarlig for behandlingen af de personoplysninger, vi modtager om dig via rebuy.dk og Rebuy-appen. Har du spørgsmål til denne politik eller ønsker at udøve dine rettigheder, kan du kontakte os på support@rebuy.dk.",
      "privacy.s2_title": "2. Hvilke oplysninger indsamler vi",
      "privacy.s2_intro": "Vi indsamler kun de oplysninger, der er nødvendige for at levere og forbedre tjenesten:",
      "privacy.s2_li1": "Kontooplysninger: dit navn, din e-mailadresse og valgfrit profilbillede. Hvis du logger ind med Apple eller Google, modtager vi også et brugerident og din e-mail fra udbyderen.",
      "privacy.s2_li2": "Annonceindhold: titel, beskrivelse, pris, billeder, kategori, stand og placering for de annoncer, du opretter.",
      "privacy.s2_li3": "Lokation: din nøjagtige geografiske placering, så vi kan vise annoncer i nærheden og hjælpe købere med at finde dine. Andre brugere ser kun byen eller området — aldrig præcise koordinater.",
      "privacy.s2_li4": "Billeder: fotos, du tager med kameraet eller vælger fra dit billedbibliotek, når du opretter en annonce eller opdaterer dit profilbillede.",
      "privacy.s2_li5": "Beskeder: indholdet af de chats, du sender til andre brugere via appen.",
      "privacy.s2_li6": "Notifikationer: en enheds-token (APNs), så vi kan sende dig push-notifikationer om beskeder og annoncer.",
      "privacy.s2_li7": "Feedback: hvis du bruger \"Send feedback\" i appen, modtager vi din besked, din e-mail og teknisk metadata (app-version, iOS-version, enhedstype, sprog).",
      "privacy.s2_li8": "Teknisk information: enhedstype, operativsystem og app-version til fejlsøgning og support.",
      "privacy.s3_title": "3. Formål og retsgrundlag",
      "privacy.s3_intro": "Vi behandler dine personoplysninger med følgende formål:",
      "privacy.s3_li1": "At levere og vedligeholde Rebuy-tjenesten (retsgrundlag: opfyldelse af aftale, GDPR art. 6, stk. 1, litra b).",
      "privacy.s3_li2": "At vise annoncer i dit nærområde og muliggøre kontakt mellem købere og sælgere (opfyldelse af aftale).",
      "privacy.s3_li3": "At sende push-notifikationer og service-beskeder om nye chats og annoncer (opfyldelse af aftale / legitim interesse).",
      "privacy.s3_li4": "At forebygge svindel og misbrug samt holde platformen sikker (legitim interesse, art. 6, stk. 1, litra f).",
      "privacy.s3_li5": "At overholde gældende lovgivning (retlig forpligtelse, art. 6, stk. 1, litra c).",
      "privacy.s4_title": "4. Deling af oplysninger",
      "privacy.s4_intro": "Vi sælger aldrig dine personoplysninger. Vi videregiver kun oplysninger til:",
      "privacy.s4_li1": "Vores backend-leverandør Appwrite, som hoster din konto, beskeder, billeder og annoncer på vores egne servere. Apple (APNs) for at levere push-notifikationer. Google og Apple, hvis du vælger at logge ind via en af deres konti. Vi bruger ingen tredjeparts analyse- eller annonce-leverandører.",
      "privacy.s4_li2": "Andre brugere i det omfang, du selv vælger at dele oplysninger — f.eks. dit fornavn og omtrentlig placering i dine annoncer.",
      "privacy.s4_li3": "Offentlige myndigheder, hvis vi er retligt forpligtet til det.",
      "privacy.s5_title": "5. Opbevaring",
      "privacy.s5_p": "Vi opbevarer dine personoplysninger, så længe din konto er aktiv. Du kan til enhver tid slette din konto inde i appen via Profil → Slet konto, hvilket straks fjerner din konto, annoncer, beskeder og billeder fra vores systemer. Eventuelle kopier i krypterede sikkerhedskopier slettes inden for 30 dage. Visse oplysninger kan gemmes længere, hvis lovgivningen kræver det (f.eks. bogføringsloven).",
      "privacy.s6_title": "6. Dine rettigheder",
      "privacy.s6_intro": "Efter databeskyttelsesforordningen (GDPR) har du ret til:",
      "privacy.s6_li1": "Indsigt i de oplysninger, vi behandler om dig.",
      "privacy.s6_li2": "Berigtigelse af forkerte eller ufuldstændige oplysninger.",
      "privacy.s6_li3": "Sletning af dine personoplysninger (\"retten til at blive glemt\").",
      "privacy.s6_li4": "Begrænsning af behandlingen.",
      "privacy.s6_li5": "Dataportabilitet — at modtage dine data i et struktureret, maskinlæsbart format.",
      "privacy.s6_li6": "At gøre indsigelse mod behandlingen.",
      "privacy.s6_outro": "Du kan udøve dine rettigheder ved at kontakte os på support@rebuy.dk.",
      "privacy.s7_title": "7. Cookies og sporing",
      "privacy.s7_p": "rebuy.dk bruger kun teknisk nødvendige cookies samt anonym besøgsstatistik via Umami (selvhostet, uden cookies og uden personhenførbare data). Vi placerer ikke reklame- eller tracking-cookies. Rebuy-appen indeholder ingen tredjeparts analyse- eller sporings-værktøjer.",
      "privacy.s8_title": "8. Børn",
      "privacy.s8_p": "Rebuy er ikke beregnet til børn under 13 år. Vi indsamler ikke bevidst personoplysninger fra børn. Hvis du mener, at et barn har afgivet oplysninger til os, bedes du kontakte support@rebuy.dk, så vi kan slette dem.",
      "privacy.s9_title": "9. Sikkerhed",
      "privacy.s9_p": "Vi træffer passende tekniske og organisatoriske foranstaltninger for at beskytte dine personoplysninger mod uautoriseret adgang, tab eller ændring — herunder kryptering under transport (TLS), adgangskontrol og regelmæssige sikkerhedsgennemgange.",
      "privacy.s10_title": "10. Ændringer til denne politik",
      "privacy.s10_p": "Vi kan opdatere denne privatlivspolitik fra tid til anden. Ved væsentlige ændringer informerer vi dig via e-mail eller en notifikation i appen. Den seneste opdateringsdato fremgår øverst på siden.",
      "privacy.s11_title": "11. Klager",
      "privacy.s11_p": "Du har ret til at klage til Datatilsynet, hvis du mener, at vi behandler dine personoplysninger i strid med databeskyttelseslovgivningen. Du finder Datatilsynets kontaktoplysninger på datatilsynet.dk.",
      "privacy.s12_title": "Kontakt",
      "privacy.s12_p": "Har du spørgsmål til denne privatlivspolitik, kan du skrive til support@rebuy.dk.",

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
      "prelaunch.title": "A new way to buy and sell kids' items is coming",

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

      // Contact form
      "contact.openLink": "Contact",
      "contact.openAria": "Open contact form",
      "contact.title": "Get in touch",
      "contact.text": "Got a question? Send us a message.",
      "contact.close": "Close",
      "contact.nameLabel": "Name",
      "contact.namePlaceholder": "Your name",
      "contact.emailLabel": "Email",
      "contact.emailPlaceholder": "Your email",
      "contact.subjectLabel": "Subject",
      "contact.subjectPlaceholder": "What's it about?",
      "contact.messageLabel": "Message",
      "contact.messagePlaceholder": "Write your message",
      "contact.submit": "Send message",
      "contact.success": "Thanks! We'll get back to you as soon as possible.",
      "contact.error": "Something went wrong. Please try again or email support@rebuy.dk.",

      // Privacy page
      "privacy.title": "Privacy Policy",
      "privacy.updated": "Last updated: April 16, 2026",
      "privacy.intro": "Rebuy is a local marketplace where families can buy and sell used kids' items. We take your data protection seriously, and this policy describes what personal data we collect, why we collect it, and what rights you have.",
      "privacy.s1_title": "1. Data Controller",
      "privacy.s1_p": "Rebuy is the data controller for the personal data we receive about you via rebuy.dk and the Rebuy app. If you have questions about this policy or wish to exercise your rights, you can contact us at support@rebuy.dk.",
      "privacy.s2_title": "2. What information do we collect",
      "privacy.s2_intro": "We only collect the information that is necessary to provide and improve the service:",
      "privacy.s2_li1": "Account information: your name, email address, and optional profile photo. If you sign in with Apple or Google, we also receive a user identifier and your email from the provider.",
      "privacy.s2_li2": "Listing content: title, description, price, images, category, condition, and location for listings you create.",
      "privacy.s2_li3": "Location: your precise geographic location, so we can show listings nearby and help buyers find yours. Other users only see the city or area — never precise coordinates.",
      "privacy.s2_li4": "Photos: images you take with the camera or pick from your photo library when creating a listing or updating your profile photo.",
      "privacy.s2_li5": "Messages: the content of chats you send to other users through the app.",
      "privacy.s2_li6": "Notifications: a device token (APNs) so we can send you push notifications about messages and listings.",
      "privacy.s2_li7": "Feedback: if you use \"Send feedback\" in the app, we receive your message, your email, and technical metadata (app version, iOS version, device type, language).",
      "privacy.s2_li8": "Technical information: device type, operating system, and app version for troubleshooting and support.",
      "privacy.s3_title": "3. Purpose and legal basis",
      "privacy.s3_intro": "We process your personal data for the following purposes:",
      "privacy.s3_li1": "To provide and maintain the Rebuy service (legal basis: performance of a contract, GDPR art. 6(1)(b)).",
      "privacy.s3_li2": "To show listings in your area and enable contact between buyers and sellers (performance of a contract).",
      "privacy.s3_li3": "To send push notifications and service messages about new chats and listings (performance of a contract / legitimate interest).",
      "privacy.s3_li4": "To prevent fraud and abuse and keep the platform safe (legitimate interest, art. 6(1)(f)).",
      "privacy.s3_li5": "To comply with applicable law (legal obligation, art. 6(1)(c)).",
      "privacy.s4_title": "4. Sharing of information",
      "privacy.s4_intro": "We never sell your personal data. We only share information with:",
      "privacy.s4_li1": "Our backend provider Appwrite, which hosts your account, messages, images, and listings on our own servers. Apple (APNs) to deliver push notifications. Google and Apple, if you choose to sign in through one of their accounts. We do not use any third-party analytics or advertising providers.",
      "privacy.s4_li2": "Other users, to the extent you choose to share information — e.g. your first name and approximate location in your listings.",
      "privacy.s4_li3": "Public authorities, where we are legally required to do so.",
      "privacy.s5_title": "5. Storage",
      "privacy.s5_p": "We retain your personal data for as long as your account is active. You can delete your account at any time from inside the app under Profile → Delete account, which immediately removes your account, listings, messages, and photos from our systems. Residual copies in encrypted backups are purged within 30 days. Certain records may be retained longer where required by law (e.g. Danish bookkeeping law).",
      "privacy.s6_title": "6. Your rights",
      "privacy.s6_intro": "Under the General Data Protection Regulation (GDPR) you have the right to:",
      "privacy.s6_li1": "Access the information we process about you.",
      "privacy.s6_li2": "Rectification of inaccurate or incomplete information.",
      "privacy.s6_li3": "Erasure of your personal data (the \"right to be forgotten\").",
      "privacy.s6_li4": "Restrict our processing.",
      "privacy.s6_li5": "Data portability — to receive your data in a structured, machine-readable format.",
      "privacy.s6_li6": "Object to our processing.",
      "privacy.s6_outro": "You can exercise your rights by contacting us at support@rebuy.dk.",
      "privacy.s7_title": "7. Cookies and tracking",
      "privacy.s7_p": "rebuy.dk only uses technically necessary cookies and anonymous visitor statistics via Umami (self-hosted, cookie-less, no personally identifiable data). We do not use advertising or tracking cookies. The Rebuy app contains no third-party analytics or tracking tools.",
      "privacy.s8_title": "8. Children",
      "privacy.s8_p": "Rebuy is not intended for children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact support@rebuy.dk so we can delete it.",
      "privacy.s9_title": "9. Security",
      "privacy.s9_p": "We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or alteration — including encryption in transit (TLS), access controls and regular security reviews.",
      "privacy.s10_title": "10. Changes to this policy",
      "privacy.s10_p": "We may update this privacy policy from time to time. For material changes we will notify you via email or an in-app notification. The date of the most recent update is shown at the top of this page.",
      "privacy.s11_title": "11. Complaints",
      "privacy.s11_p": "You have the right to lodge a complaint with the Danish Data Protection Agency (Datatilsynet) if you believe we process your personal data in breach of data protection law. Contact information is available at datatilsynet.dk.",
      "privacy.s12_title": "Contact",
      "privacy.s12_p": "If you have questions about this privacy policy, you can write to us at support@rebuy.dk.",

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
