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
      // Meta. Kept in sync with the static HEAD in index.html.
      "meta.title": "Rebuy app — Køb og sælg brugt børnetøj og babyudstyr lokalt i Danmark",
      "meta.description": "Hent Rebuy gratis — appen hvor danske børnefamilier køber og sælger brugt børnetøj, babyudstyr og legetøj lokalt i dit nærområde.",

      // Hero logo alt (in sync with index.html data-i18n-alt)
      "hero.logoAlt": "Rebuy — mor med barnevogn der køber og sælger brugt børnetøj lokalt",

      // Header
      "lang.toggle": "EN",

      // Pre-launch hero
      "prelaunch.badge": "Kommer snart",
      "prelaunch.title": "En ny måde at købe og sælge børneting er på vej",
      "prelaunch.subtitle": "Børnetøjet de er vokset fra fortjener et nyt hjem. Sparepengene fortjener du. Rebuy bliver Danmarks nye markedsplads for børnefamilier — kun lokalt, kun ansigt til ansigt.",

      // Waitlist benefits (prelaunch)
      "waitlist.title": "Hvorfor tilmelde sig?",
      "waitlist.benefit1Title": "Tidlig adgang",
      "waitlist.benefit1Text": "Du får appen før den brede lancering, så du allerede er i gang, når dit nabolag opdager Rebuy.",
      "waitlist.benefit2Title": "Lanceringstilbud",
      "waitlist.benefit2Text": "Som tilmeldt får du som de første besked om gratis funktioner og bonusser, vi gemmer til ventelisten.",
      "waitlist.benefit3Title": "Ingen spam",
      "waitlist.benefit3Text": "Vi skriver kun, når vi har noget at fortælle — og du kan altid afmelde med ét klik.",

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
      "signup.error": "Noget gik galt. Prøv igen, eller",
      "signup.errorCta": "kontakt os via formularen",
      "signup.aria": "E-mailadresse",
      "signup.counterPrefix": "Allerede",
      "signup.counterSuffix": "danske familier står på ventelisten",

      // FAQ (launched). Keep in sync with FAQPage JSON-LD in index.html <head>.
      "faq.title": "Ofte stillede spørgsmål",
      "faq.q1": "Hvad er Rebuy?",
      "faq.a1": "Rebuy er en dansk markedsplads, hvor børnefamilier nemt kan købe og sælge brugt børnetøj, legetøj og udstyr lokalt. Vi forbinder forældre i samme nabolag, så handlerne kan ske ansigt til ansigt — uden forsendelse, gebyrer eller besvær.",
      "faq.q2": "Hvordan kommer jeg i gang?",
      "faq.a2": "Hent Rebuy gratis i App Store eller Google Play, opret en konto, og du er klar til at finde annoncer i dit nærområde eller sælge det, dine børn er vokset fra.",
      "faq.q3": "Hvad kan jeg købe og sælge på Rebuy?",
      "faq.a3": "Brugt børnetøj og babytøj i alle størrelser, legetøj, bøger, sko, overtøj, barnevogne, autostole, babyudstyr og andet, som danske børnefamilier har brug for. Hvis det vedrører børn, hører det hjemme på Rebuy.",
      "faq.q4": "Hvad koster det at bruge Rebuy?",
      "faq.a4": "Rebuy er gratis at bruge. Der er ingen gebyrer for at oprette annoncer, chatte med en sælger eller gennemføre en handel. Vi tager heller ikke en del af salgsprisen.",
      "faq.q5": "Hvor i Danmark virker Rebuy?",
      "faq.a5": "Rebuy virker i hele Danmark. Appen finder annoncer og købere i dit nærområde — uanset om du bor i København, Aarhus, Odense, Aalborg eller en mindre by.",
      "faq.q7": "Hvordan adskiller Rebuy sig fra andre genbrugsapps?",
      "faq.a7": "Rebuy er bygget specifikt til danske børnefamilier og lokal handel ansigt til ansigt. Ingen forsendelse, ingen tredjeparts betaling — bare et nemt værktøj til at finde og afhænde børneting i dit eget nabolag.",

      // Launched hero
      "launched.title": "Køb og sælg børneting i dit nærområde",
      "launched.subtitle": "Rebuy forbinder børnefamilier lokalt. Find gode tilbud på børnetøj, legetøj og udstyr — eller sælg det, dine børn er vokset fra.",

      // App Showcase
      "showcase.title": "Tag et kig i appen",
      "showcase.subtitle": "Fra første swipe til afhentning — alt det vigtigste på fem skærme.",
      "showcase.feed.title": "Find tilbud i nærheden",
      "showcase.feed.text": "Se annoncer i dit lokalområde med ét swipe.",
      "showcase.detail.title": "Se alle detaljer",
      "showcase.detail.text": "Pris, stand, billeder og afstand — samlet ét sted.",
      "showcase.messages.title": "Chat med sælger",
      "showcase.messages.text": "Aftal pris og afhentning direkte i appen.",
      "showcase.post.title": "Sælg på få sekunder",
      "showcase.post.text": "Tag et billede, sæt en pris, og du er online.",
      "showcase.profile.title": "Hold styr på det hele",
      "showcase.profile.text": "Dine annoncer, favoritter og indstillinger samlet ét sted.",

      // How it works
      "howit.title": "Sådan virker det",
      "howit.subtitle": "Tre trin — uanset om du køber eller sælger.",
      "howit.tablist": "Vælg køb eller salg",
      "howit.tab.buy": "Køb",
      "howit.tab.sell": "Sælg",
      "howit.buy.1.title": "Find",
      "howit.buy.1.text": "Browse annoncer i dit nærområde.",
      "howit.buy.2.title": "Chat",
      "howit.buy.2.text": "Aftal pris og afhentning med sælger.",
      "howit.buy.3.title": "Mød op",
      "howit.buy.3.text": "Handl ansigt til ansigt med en anden familie.",
      "howit.sell.1.title": "Tag billede",
      "howit.sell.1.text": "Snap et foto af det, dine børn er vokset fra.",
      "howit.sell.2.title": "Sæt pris",
      "howit.sell.2.text": "Vælg en fair pris, og din annonce er online.",
      "howit.sell.3.title": "Aftal afhentning",
      "howit.sell.3.text": "Chat med køberen og aftal et lokalt møde.",

      // Store buttons
      "store.download": "Download fra",
      "store.appstore": "App Store",
      "store.playstore": "Google Play",

      // CTA
      "cta.title": "Download Rebuy i dag",
      "cta.text": "Begynd at købe og sælge børneting i dit nærområde.",

      // Footer
      "footer.privacy": "Privatlivspolitik",
      "footer.terms": "Vilkår for brug",
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
      "contact.error": "Noget gik galt. Prøv venligst igen om lidt.",

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

      // Account deletion page
      "delete.title": "Sletning af konto",
      "delete.updated": "Sidst opdateret: 11. maj 2026",
      "delete.intro": "Rebuy drives af Anchorit ApS. Du kan til enhver tid bede om at få din Rebuy-konto og dine tilhørende data slettet. Denne side beskriver, hvordan du gør det, og hvad der sker med dine data bagefter.",
      "delete.s1_title": "1. Sådan beder du om sletning",
      "delete.s1_intro": "I appen:",
      "delete.s1_step1": "Åbn Rebuy-appen og log ind.",
      "delete.s1_step2": "Gå til Profil → Slet konto.",
      "delete.s1_step3": "Tryk på Anmod om sletning og bekræft.",
      "delete.s1_email": "Hvis du ikke har adgang til appen, kan du skrive til support@rebuy.dk fra den e-mailadresse, der er knyttet til din konto, med emnet \"Slet min konto\". Vi behandler anmodningen inden for 30 dage.",
      "delete.s2_title": "2. Hvad sker der med dine data",
      "delete.s2_li1": "Din profil skjules med det samme. Dine annoncer forsvinder fra søgning, og købere kan ikke længere skrive til dig.",
      "delete.s2_li2": "Du har 30 dage til at logge ind og fortryde sletningen. Ved at logge ind genaktiveres din konto.",
      "delete.s2_li3": "Efter 30 dage slettes følgende permanent: din profil (navn, e-mail, telefon, profilbillede), dine annoncer og annoncebilleder, dine beskeder, dine gemte varer og dine favoritter.",
      "delete.s3_title": "3. Hvad vi opbevarer",
      "delete.s3_li1": "Aggregerede, ikke-identificerbare logfiler kan opbevares i op til 12 måneder af hensyn til sikkerhed og forebyggelse af misbrug.",
      "delete.s3_li2": "Oplysninger, som vi efter dansk lovgivning er forpligtet til at gemme (f.eks. bogføringsmateriale efter bogføringsloven), opbevares i den lovpligtige periode.",
      "delete.s4_title": "4. Kontakt",
      "delete.s4_p": "Spørgsmål eller behov for hjælp? Skriv til support@rebuy.dk.",

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

      // Terms of Use page (rebuy.dk/terms-of-use) — full ToU
      "tou.title": "Vilkår for brug",
      "tou.updated": "Sidst opdateret: 8. maj 2026",
      "tou.intro1": "Disse vilkår for brug regulerer din adgang til og brug af Rebuy-appen og rebuy.dk. De udgør en bindende aftale mellem dig og Rebuy.",
      "tou.intro2": "Ved at oprette en konto eller bruge Rebuy accepterer du disse vilkår. Hvis du ikke accepterer dem, må du ikke bruge tjenesten.",
      "tou.intro3": "Din brug af Rebuy er også omfattet af vores privatlivspolitik, der beskriver, hvordan vi indsamler, bruger, opbevarer og sletter personoplysninger.",
      "tou.s1_title": "1. Tjenesten",
      "tou.s1_p1": "Rebuy er en lokal markedsplads, der forbinder købere og sælgere af brugte familievarer.",
      "tou.s1_p2": "Medmindre andet udtrykkeligt er angivet, er Rebuy ikke part i transaktioner mellem brugere. Rebuy hverken ejer, inspicerer, sælger, køber, leverer eller garanterer de varer, der lægges op af brugere. Rebuy kontrollerer ikke kvaliteten, lovligheden, sikkerheden, nøjagtigheden, betalingen, afhentningen, leveringen eller gennemførelsen af transaktioner mellem brugere, undtagen hvor Rebuy har ufravigelige juridiske forpligtelser, der ikke kan fravælges.",
      "tou.s1_p3": "Købere og sælgere er ansvarlige for selv at aftale varens stand, pris, betaling, afhentning, levering, returnering, refusion og eventuelle andre transaktionsvilkår direkte med hinanden.",
      "tou.s1_p4": "Medmindre andet udtrykkeligt er angivet, behandler Rebuy ikke betalinger mellem brugere.",
      "tou.s2_title": "2. Brugerkrav og konto",
      "tou.s2_p1": "Du skal være mindst 18 år for at oprette en konto og bruge Rebuy.",
      "tou.s2_p2": "Du er ansvarlig for at holde dine loginoplysninger sikre og for al aktivitet på din konto. Du må kun oprette én konto. Du må ikke udgive dig for en anden person, bruge falske oplysninger eller oprette en konto på vegne af en anden uden tilladelse.",
      "tou.s2_p3": "Du skal holde dine kontooplysninger korrekte og opdaterede.",
      "tou.s3_title": "3. Sælgere og annoncer",
      "tou.s3_p1": "Sælgere er ansvarlige for, at deres annoncer er nøjagtige, lovlige, sikre, fuldstændige og ikke vildledende.",
      "tou.s3_p2": "En annonce skal beskrive varen ærligt, herunder dens stand, relevante defekter, manglende dele, alder, mærke, størrelse og andre oplysninger, der kan være vigtige for en køber.",
      "tou.s3_p3": "Hvis en sælger optræder som virksomhed, erhvervsdrivende eller professionel sælger, er denne sælger ansvarlig for at overholde alle gældende forbrugerbeskyttelsesforpligtelser, herunder lovpligtig fortrydelsesret, klageadgang, garantioplysninger, oplysninger om den erhvervsdrivendes identitet og andre lovpligtige oplysninger.",
      "tou.s3_p4": "Rebuy kan fjerne eller begrænse annoncer, der fremstår som usikre, ulovlige, vildledende, upassende eller i strid med disse vilkår.",
      "tou.s4_title": "4. Købere",
      "tou.s4_p1": "Købere er ansvarlige for at gennemgå annoncer omhyggeligt, før de aftaler at købe en vare.",
      "tou.s4_p2": "Købere bør stille sælgeren relevante spørgsmål om varen, herunder dens stand, sikkerhed, alder, defekter, ægthed og egnethed.",
      "tou.s4_p3": "Enhver aftale om at købe en vare indgås direkte mellem køberen og sælgeren. Rebuy er ikke ansvarlig for, om en sælger gennemfører et salg, om en køber gennemfører betaling, eller om en vare lever op til køberens forventninger, medmindre ufravigelig lov bestemmer andet.",
      "tou.s5_title": "5. Produktsikkerhed og forbudte varer",
      "tou.s5_p1": "Brugere må kun lægge varer op, der er sikre, lovlige og passende for en familieorienteret markedsplads.",
      "tou.s5_listIntro": "Du må ikke lægge op, sælge, købe, efterspørge, uploade, dele eller promovere varer, der er:",
      "tou.s5_li1": "ulovlige, stjålne, forfalskede, usikre eller vildledende;",
      "tou.s5_li2": "tilbagekaldte eller underlagt salgsbegrænsninger;",
      "tou.s5_li3": "våben, sprængstoffer eller farligt gods;",
      "tou.s5_li4": "alkohol, tobak, narkotika eller stof-relaterede produkter;",
      "tou.s5_li5": "voksen- eller seksuelt eksplicitte produkter;",
      "tou.s5_li6": "receptpligtig medicin eller medicinske produkter, der kræver godkendelse;",
      "tou.s5_li7": "dyr eller levende skabninger;",
      "tou.s5_li8": "varer, der krænker ophavsret, varemærke, privatlivets fred, retten til eget billede eller andre rettigheder;",
      "tou.s5_li9": "varer, der ikke er egnede til Rebuys formål som markedsplads for brugte familievarer.",
      "tou.s5_p2": "For børne- og familievarer skal sælgere være særligt opmærksomme på sikkerhed. Dette omfatter, men er ikke begrænset til, legetøj, babyudstyr, autostole, hjelme, klapvogne, møbler, kosmetik, tøj, elektronik og spiseprodukter.",
      "tou.s5_p3": "Sælgere er ansvarlige for at kontrollere, om en vare er omfattet af en tilbagekaldelse, sikkerhedsadvarsel, aldersbegrænsning, produktstandard eller anden lovmæssig begrænsning, før den lægges op.",
      "tou.s5_p4": "Rebuy kan fjerne enhver annonce, som vi med rimelighed mener kan være usikker, ulovlig, vildledende, begrænset eller upassende.",
      "tou.s6_title": "6. Brugergenereret indhold",
      "tou.s6_p1": "Du bevarer ejerskabet til det indhold, du uploader til Rebuy, herunder annoncer, billeder, beskeder, profiloplysninger, anmeldelser, rapporter og andet indhold.",
      "tou.s6_p2": "Ved at uploade eller dele indhold på Rebuy giver du Rebuy en ikke-eksklusiv, verdensomspændende, royaltyfri licens til at hoste, opbevare, gengive, vise, distribuere og bruge dette indhold inden for tjenesten med det formål at drive, forbedre, moderere, beskytte og promovere platformen.",
      "tou.s6_p3": "Du er ansvarlig for, at dit indhold er sandfærdigt, lovligt, nøjagtigt og ikke krænker andres rettigheder.",
      "tou.s6_p4": "Du må ikke uploade indhold, som du ikke har ret til at bruge.",
      "tou.s6_p5": "Hvis du mener, at indhold på Rebuy krænker din ophavsret, dit varemærke, dit privatliv eller andre rettigheder, kan du kontakte os på support@rebuy.dk med tilstrækkelig information til, at vi kan vurdere kravet.",
      "tou.s7_title": "7. Nul tolerance for stødende indhold og krænkende brugere",
      "tou.s7_p1": "Rebuy har nul tolerance over for stødende indhold og krænkende brugere.",
      "tou.s7_intro": "Du må ikke uploade, dele, vise, sende eller fremme indhold, eller udvise adfærd, der:",
      "tou.s7_li1": "er ulovligt, skadeligt, truende, krænkende, chikanerende, hadefuldt, voldeligt eller diskriminerende;",
      "tou.s7_li2": "er racistisk, sexistisk, homofobisk, transfobisk eller på anden måde nedværdigende over for enkeltpersoner eller grupper;",
      "tou.s7_li3": "er seksuelt eksplicit, udnyttende eller upassende for en familieorienteret tjeneste;",
      "tou.s7_li4": "målretter, udnytter, mobber eller bringer børn eller sårbare personer i fare;",
      "tou.s7_li5": "bedrager, snyder, manipulerer eller udnytter andre brugere;",
      "tou.s7_li6": "krænker andres rettigheder, herunder ophavsret, varemærke, privatlivets fred eller retten til eget billede;",
      "tou.s7_li7": "promoverer ulovlige produkter, usikre produkter, våben, narkotika, stjålne varer eller andre begrænsede genstande;",
      "tou.s7_li8": "indeholder spam, kædebreve, phishing, malware, ondsindet kode eller uautoriseret reklame;",
      "tou.s7_li9": "forsøger at omgå moderation, indrapportering, blokering, kontorestriktioner eller platformens sikkerhed;",
      "tou.s7_li10": "på anden måde er upassende eller i strid med Rebuys formål.",
      "tou.s7_outro1": "Brugere, der overtræder disse regler, kan få deres indhold fjernet, deres konto suspenderet eller lukket.",
      "tou.s7_outro2": "Vi kan handle øjeblikkeligt og uden forudgående varsel, hvor det er nødvendigt for at beskytte brugere, Rebuy, tredjeparter eller integriteten af tjenesten, eller hvor det kræves ved lov.",
      "tou.s7_outro3": "Vi forbeholder os retten til at samarbejde med myndigheder ved alvorlige overtrædelser.",
      "tou.s8_title": "8. Anmeldelse, blokering og moderation",
      "tou.s8_p1": "Hver bruger kan anmelde stødende indhold og blokere andre brugere direkte i appen.",
      "tou.s8_p2": "For at anmelde en annonce eller profil skal du trykke på \"Anmeld\" på annoncen eller profilen. Anmeldelser sendes til vores moderationsteam.",
      "tou.s8_p3": "For at blokere en anden bruger skal du trykke på \"Bloker bruger\". Blokering af en bruger fjerner brugerens indhold fra dit feed og dine samtaler.",
      "tou.s8_p4": "Vi forpligter os til at gennemgå anmeldelser inden for 24 timer. Indhold, der overtræder disse vilkår, fjernes hurtigst muligt. Brugere, der bidrager med stødende indhold eller misbruger tjenesten, kan blive udelukket fra platformen.",
      "tou.s8_p5": "Rebuy kan fjerne indhold, begrænse synlighed, suspendere konti, lukke konti, forhindre fremtidige tilmeldinger eller træffe andre passende foranstaltninger, hvor vi med rimelighed mener, at disse vilkår eller gældende lovgivning er blevet overtrådt.",
      "tou.s8_p6": "Hvis dit indhold eller din konto bliver begrænset, og du mener, at det var en fejl, kan du kontakte os på support@rebuy.dk. Hvor det kræves ved lov, vil vi give oplysninger om årsagen til vores beslutning og om eventuelle tilgængelige klagemuligheder.",
      "tou.s9_title": "9. Kommunikation mellem brugere",
      "tou.s9_p1": "Rebuy kan tillade, at brugere kommunikerer med hinanden via beskeder eller andre funktioner i appen.",
      "tou.s9_p2": "Du skal bruge kommunikationsfunktionerne respektfuldt og kun til formål, der vedrører køb, salg, afhentning, levering eller forespørgsler om varer på Rebuy.",
      "tou.s9_p3": "Du må ikke bruge Rebuy til at sende spam, chikane, trusler, svindel, phishing-forsøg, ekstern reklame eller indhold, der overtræder disse vilkår.",
      "tou.s9_p4": "Rebuy kan moderere, begrænse eller fjerne beskeder, hvor det er nødvendigt for at beskytte brugere, undersøge anmeldelser, håndhæve disse vilkår eller overholde retlige forpligtelser.",
      "tou.s10_title": "10. Gebyrer og betalinger",
      "tou.s10_p1": "Rebuy er i øjeblikket gratis at bruge.",
      "tou.s10_p2": "Medmindre andet udtrykkeligt er angivet, behandler Rebuy ikke betalinger mellem købere og sælgere. Købere og sælgere er ansvarlige for selv at aftale betalingsvilkår direkte med hinanden.",
      "tou.s10_p3": "Hvis Rebuy fremover introducerer betalte funktioner, gebyrer, abonnementer, betalingsbehandling, kampagner eller provisioner, vil vi oplyse de relevante vilkår, før du bruger disse betalte funktioner.",
      "tou.s11_title": "11. Sletning af konto",
      "tou.s11_p1": "Du kan til enhver tid slette din konto via Profil → Slet konto.",
      "tou.s11_p2": "Sletning af din konto kan fjerne din profil og aktive annoncer fra tjenesten. Visse oplysninger kan blive opbevaret, hvor det er nødvendigt af juridiske, sikkerhedsmæssige, svindelforebyggende, tvistløsende, regnskabsmæssige eller andre legitime forretningsmæssige hensyn, som beskrevet i vores privatlivspolitik.",
      "tou.s11_p3": "Sletning af din konto annullerer eller tilbagefører ikke automatisk transaktioner, som du allerede har aftalt med en anden bruger.",
      "tou.s12_title": "12. Suspension, opsigelse og udelukkelse",
      "tou.s12_p1": "Vi kan suspendere eller lukke din konto, hvis vi med rimelighed mener, at du har overtrådt disse vilkår, skabt risiko for andre brugere, misbrugt tjenesten, krænket andres rettigheder eller handlet ulovligt.",
      "tou.s12_p2": "Vi kan handle øjeblikkeligt, hvor det er nødvendigt for at beskytte brugere, Rebuy, tredjeparter eller integriteten af tjenesten, eller hvor det kræves ved lov.",
      "tou.s12_p3": "Lukkede konti kan ikke genåbnes, medmindre Rebuy beslutter andet. Vi kan også træffe rimelige foranstaltninger for at forhindre samme person i at oprette nye konti efter en udelukkelse.",
      "tou.s12_p4": "Du kan til enhver tid stoppe med at bruge Rebuy.",
      "tou.s13_title": "13. Tilgængelighed og ændringer af tjenesten",
      "tou.s13_p1": "Rebuy leveres \"som den er\" og \"som tilgængelig\".",
      "tou.s13_p2": "Vi kan ændre, suspendere, begrænse eller indstille hele eller dele af tjenesten til enhver tid. Vi kan også opdatere, forbedre, fjerne eller modificere funktioner, annoncer, kategorier, moderationsværktøjer eller kontofunktionalitet.",
      "tou.s13_p3": "Vi garanterer ikke, at tjenesten altid er tilgængelig, uafbrudt, sikker eller fejlfri.",
      "tou.s14_title": "14. Ansvar",
      "tou.s14_p1": "I det omfang det er tilladt ved lov, er Rebuy ikke ansvarlig for transaktioner eller tvister mellem brugere, herunder varens kvalitet, sikkerhed, lovlighed, betaling, afhentning, levering, returnering, refusion, skade, tab eller brugeradfærd.",
      "tou.s14_p2": "Intet i disse vilkår udelukker eller begrænser ansvar, der ikke kan udelukkes eller begrænses efter gældende lov.",
      "tou.s14_p3": "I det omfang det er tilladt ved lov, er Rebuys samlede ansvar for krav, der opstår som følge af eller i forbindelse med tjenesten, begrænset til det beløb, du har betalt til Rebuy i de 12 måneder, før kravet opstod. Hvis du ikke har betalt noget til Rebuy, er Rebuys samlede ansvar begrænset til 0 kr., medmindre en sådan begrænsning ikke er tilladt ved lov.",
      "tou.s15_title": "15. Ændringer af disse vilkår",
      "tou.s15_p1": "Vi kan opdatere disse vilkår fra tid til anden.",
      "tou.s15_p2": "Ved væsentlige ændringer giver vi dig besked via appen, e-mail eller en anden rimelig metode. Den seneste opdateringsdato fremgår øverst på siden.",
      "tou.s15_p3": "Hvis du fortsætter med at bruge Rebuy, efter at opdaterede vilkår er trådt i kraft, accepterer du de opdaterede vilkår. Hvis du ikke accepterer de opdaterede vilkår, skal du holde op med at bruge tjenesten.",
      "tou.s16_title": "16. Lovvalg og tvister",
      "tou.s16_p1": "Disse vilkår er underlagt dansk ret.",
      "tou.s16_p2": "Eventuelle tvister, der ikke kan løses i mindelighed, behandles af de kompetente danske domstole, medmindre ufravigelige forbrugerbeskyttelsesregler giver dig ret til at rejse et krav et andet sted.",
      "tou.s17_title": "17. Kontakt",
      "tou.s17_p1": "Har du spørgsmål til disse vilkår, ønsker at anmelde indhold uden for appen, mener at dine rettigheder er blevet krænket, eller ønsker at klage over en moderationsbeslutning, kan du kontakte os på:",
    },

    en: {
      // Meta. Kept in sync with the static HEAD in index.html.
      "meta.title": "Rebuy app — Buy and sell used kids' clothes and baby gear locally in Denmark",
      "meta.description": "Download Rebuy for free — the app where Danish families buy and sell used kids' clothes, baby gear, and toys locally in their neighbourhood.",

      // Hero logo alt
      "hero.logoAlt": "Rebuy — mom with stroller buying and selling used kids' items locally",

      // Header
      "lang.toggle": "DA",

      // Pre-launch hero
      "prelaunch.badge": "Coming soon",
      "prelaunch.title": "A new way to buy and sell kids' items is coming",
      "prelaunch.subtitle": "The clothes they've outgrown deserve a new home. The savings deserve you. Rebuy is a new marketplace for families across Denmark — local only, face-to-face only.",

      // Waitlist benefits (prelaunch)
      "waitlist.title": "Why join?",
      "waitlist.benefit1Title": "Early access",
      "waitlist.benefit1Text": "You get the app before the wider launch, so you're already up and running when your neighbourhood discovers Rebuy.",
      "waitlist.benefit2Title": "Launch perks",
      "waitlist.benefit2Text": "Waitlist members hear first about free features and bonuses we reserve for early supporters.",
      "waitlist.benefit3Title": "No spam",
      "waitlist.benefit3Text": "We only write when we have something to say — and you can unsubscribe with a single click.",

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
      "signup.error": "Something went wrong. Please try again, or",
      "signup.errorCta": "contact us via the form",
      "signup.aria": "Email address",
      "signup.counterPrefix": "Already",
      "signup.counterSuffix": "Danish families on the waitlist",

      // FAQ (launched). Visible text only — JSON-LD stays in Danish (default).
      "faq.title": "Frequently asked questions",
      "faq.q1": "What is Rebuy?",
      "faq.a1": "Rebuy is a Danish marketplace where families can easily buy and sell used kids' clothes, toys, and gear locally. We connect parents in the same neighbourhood so trades can happen face-to-face — no shipping, fees, or hassle.",
      "faq.q2": "How do I get started?",
      "faq.a2": "Download Rebuy for free on the App Store or Google Play, create an account, and you're ready to browse listings in your area or sell what your kids have outgrown.",
      "faq.q3": "What can I buy and sell on Rebuy?",
      "faq.a3": "Used kids' and baby clothes in every size, toys, books, shoes, outerwear, strollers, car seats, baby gear, and other things Danish families need. If it's for a child, it belongs on Rebuy.",
      "faq.q4": "How much does Rebuy cost?",
      "faq.a4": "Rebuy is free to use. There are no fees for posting listings, chatting with a seller, or completing a trade. We don't take a cut of the sale price either.",
      "faq.q5": "Where in Denmark does Rebuy work?",
      "faq.a5": "Rebuy works across Denmark. The app finds listings and buyers in your local area — whether you live in Copenhagen, Aarhus, Odense, Aalborg, or a smaller town.",
      "faq.q7": "How is Rebuy different from other secondhand apps?",
      "faq.a7": "Rebuy is built specifically for Danish families and local, face-to-face trading. No shipping, no third-party payments — just a simple tool for finding and passing on kids' items in your own neighbourhood.",

      // Launched hero
      "launched.title": "Buy and sell kids' items in your neighbourhood",
      "launched.subtitle": "Rebuy connects families locally. Find great deals on kids' clothes, toys and gear — or sell what your kids have outgrown.",

      // App Showcase
      "showcase.title": "Take a look inside",
      "showcase.subtitle": "From first swipe to pick-up — everything that matters, in five screens.",
      "showcase.feed.title": "Find deals nearby",
      "showcase.feed.text": "Browse listings in your neighbourhood with a single swipe.",
      "showcase.detail.title": "See every detail",
      "showcase.detail.text": "Price, condition, photos and distance — all in one place.",
      "showcase.messages.title": "Chat with the seller",
      "showcase.messages.text": "Agree on price and pick-up directly in the app.",
      "showcase.post.title": "Sell in seconds",
      "showcase.post.text": "Snap a photo, set a price, and you're live.",
      "showcase.profile.title": "Stay on top of it all",
      "showcase.profile.text": "Your listings, favourites and settings, neatly together.",

      // How it works
      "howit.title": "How it works",
      "howit.subtitle": "Three steps — whether you're buying or selling.",
      "howit.tablist": "Choose buying or selling",
      "howit.tab.buy": "Buy",
      "howit.tab.sell": "Sell",
      "howit.buy.1.title": "Find",
      "howit.buy.1.text": "Browse listings in your neighbourhood.",
      "howit.buy.2.title": "Chat",
      "howit.buy.2.text": "Agree on price and pick-up with the seller.",
      "howit.buy.3.title": "Meet up",
      "howit.buy.3.text": "Trade face to face with another family.",
      "howit.sell.1.title": "Snap a photo",
      "howit.sell.1.text": "Take a picture of what your kids outgrew.",
      "howit.sell.2.title": "Set a price",
      "howit.sell.2.text": "Pick a fair price and your listing goes live.",
      "howit.sell.3.title": "Arrange pick-up",
      "howit.sell.3.text": "Chat with the buyer and meet up locally.",

      // Store buttons
      "store.download": "Download on",
      "store.appstore": "App Store",
      "store.playstore": "Google Play",

      // CTA
      "cta.title": "Download Rebuy today",
      "cta.text": "Start buying and selling kids' items in your neighbourhood.",

      // Footer
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Use",
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
      "contact.error": "Something went wrong. Please try again in a moment.",

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

      // Account deletion page
      "delete.title": "Account deletion",
      "delete.updated": "Last updated: 11 May 2026",
      "delete.intro": "Rebuy is operated by Anchorit ApS. You can request that your Rebuy account and associated data be deleted at any time. This page explains how to do it and what happens to your data afterwards.",
      "delete.s1_title": "1. How to request deletion",
      "delete.s1_intro": "In the app:",
      "delete.s1_step1": "Open the Rebuy app and sign in.",
      "delete.s1_step2": "Go to Profile → Delete account.",
      "delete.s1_step3": "Tap Request deletion and confirm.",
      "delete.s1_email": "If you can't access the app, write to support@rebuy.dk from the email address on your account, with the subject \"Delete my account\". We process the request within 30 days.",
      "delete.s2_title": "2. What happens to your data",
      "delete.s2_li1": "Your profile is hidden immediately. Your listings disappear from search and buyers can no longer message you.",
      "delete.s2_li2": "You have 30 days to sign in and cancel the deletion. Signing in restores your account.",
      "delete.s2_li3": "After 30 days the following are permanently deleted: your profile (name, email, phone, profile picture), your listings and listing photos, your messages, your saved items and your favourites.",
      "delete.s3_title": "3. What we retain",
      "delete.s3_li1": "Aggregated, non-identifying log data may be retained for up to 12 months for security and abuse prevention.",
      "delete.s3_li2": "Information we are required to retain under Danish law (e.g. accounting records under the Danish Bookkeeping Act) is kept for the statutory period.",
      "delete.s4_title": "4. Contact",
      "delete.s4_p": "Questions or need help? Write to support@rebuy.dk.",

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

      // Terms of Use page (rebuy.dk/terms-of-use) — full ToU
      "tou.title": "Terms of Use",
      "tou.updated": "Last updated: 8 May 2026",
      "tou.intro1": "These Terms of Use govern your access to and use of the Rebuy app and rebuy.dk. They form a binding agreement between you and Rebuy.",
      "tou.intro2": "By creating an account or using Rebuy, you agree to these Terms. If you do not agree, you may not use the service.",
      "tou.intro3": "Your use of Rebuy is also governed by our Privacy Policy, which explains how we collect, use, store, and delete personal data.",
      "tou.s1_title": "1. The Service",
      "tou.s1_p1": "Rebuy is a local marketplace that connects buyers and sellers of preloved family items.",
      "tou.s1_p2": "Unless expressly stated otherwise, Rebuy is not a party to transactions between users. Rebuy does not own, inspect, sell, buy, deliver, or guarantee the items listed by users. Rebuy does not control the quality, legality, safety, accuracy, payment, collection, delivery, or completion of transactions between users, except where Rebuy has mandatory legal obligations that cannot be excluded.",
      "tou.s1_p3": "Buyers and sellers are responsible for agreeing on item condition, price, payment, collection, delivery, returns, refunds, and any other transaction terms directly with each other.",
      "tou.s1_p4": "Unless expressly stated otherwise, Rebuy does not process payments between users.",
      "tou.s2_title": "2. Eligibility and Account",
      "tou.s2_p1": "You must be at least 18 years old to create an account and use Rebuy.",
      "tou.s2_p2": "You are responsible for keeping your login details secure and for all activity on your account. You may only create one account. You may not impersonate another person, use false information, or create an account on behalf of someone else without permission.",
      "tou.s2_p3": "You must keep your account information accurate and up to date.",
      "tou.s3_title": "3. Sellers and Listings",
      "tou.s3_p1": "Sellers are responsible for ensuring that their listings are accurate, lawful, safe, complete, and not misleading.",
      "tou.s3_p2": "A listing must describe the item honestly, including its condition, relevant defects, missing parts, age, brand, size, and any other information that may be important to a buyer.",
      "tou.s3_p3": "If a seller acts as a business, trader, or professional seller, that seller is responsible for complying with all applicable consumer protection obligations, including any mandatory withdrawal rights, complaint rights, warranty information, trader identity information, and other statutory information required by law.",
      "tou.s3_p4": "Rebuy may remove or restrict listings that appear unsafe, unlawful, misleading, inappropriate, or contrary to these Terms.",
      "tou.s4_title": "4. Buyers",
      "tou.s4_p1": "Buyers are responsible for reviewing listings carefully before agreeing to buy an item.",
      "tou.s4_p2": "Buyers should ask the seller any relevant questions about the item, including its condition, safety, age, defects, authenticity, and suitability.",
      "tou.s4_p3": "Any agreement to buy an item is made directly between the buyer and the seller. Rebuy is not responsible for whether a seller completes a sale, whether a buyer completes payment, or whether an item meets the buyer's expectations, except where mandatory law provides otherwise.",
      "tou.s5_title": "5. Product Safety and Prohibited Items",
      "tou.s5_p1": "Users may only list items that are safe, lawful, and appropriate for a family-focused marketplace.",
      "tou.s5_listIntro": "You may not list, sell, buy, request, upload, share, or promote items that are:",
      "tou.s5_li1": "illegal, stolen, counterfeit, unsafe, or misleading;",
      "tou.s5_li2": "recalled or subject to sale restrictions;",
      "tou.s5_li3": "weapons, explosives, or dangerous goods;",
      "tou.s5_li4": "alcohol, tobacco, drugs, or drug-related products;",
      "tou.s5_li5": "adult or sexually explicit products;",
      "tou.s5_li6": "prescription medicine or medical products requiring authorisation;",
      "tou.s5_li7": "animals or live creatures;",
      "tou.s5_li8": "items that infringe copyright, trademark, privacy, publicity, or other rights;",
      "tou.s5_li9": "items that are not suitable for Rebuy's purpose as a marketplace for preloved family items.",
      "tou.s5_p2": "For children's and family items, sellers must take particular care with safety. This includes, but is not limited to, toys, baby equipment, car seats, helmets, strollers, furniture, cosmetics, clothing, electronics, and feeding products.",
      "tou.s5_p3": "Sellers are responsible for checking whether an item is subject to a recall, safety warning, age restriction, product standard, or other legal restriction before listing it.",
      "tou.s5_p4": "Rebuy may remove any listing that we reasonably believe may be unsafe, unlawful, misleading, restricted, or inappropriate.",
      "tou.s6_title": "6. User-Generated Content",
      "tou.s6_p1": "You retain ownership of the content you upload to Rebuy, including listings, photos, messages, profile information, reviews, reports, and other content.",
      "tou.s6_p2": "By uploading or sharing content on Rebuy, you grant Rebuy a non-exclusive, worldwide, royalty-free licence to host, store, reproduce, display, distribute, and use that content within the service for the purpose of operating, improving, moderating, protecting, and promoting the platform.",
      "tou.s6_p3": "You are responsible for ensuring that your content is truthful, lawful, accurate, and does not infringe the rights of others.",
      "tou.s6_p4": "You may not upload content that you do not have the right to use.",
      "tou.s6_p5": "If you believe content on Rebuy infringes your copyright, trademark, privacy, or other rights, you can contact us at support@rebuy.dk with enough information for us to assess the claim.",
      "tou.s7_title": "7. Zero Tolerance for Objectionable Content and Abusive Users",
      "tou.s7_p1": "Rebuy has zero tolerance for objectionable content and abusive users.",
      "tou.s7_intro": "You may not upload, share, display, send, or promote content, or engage in behaviour, that:",
      "tou.s7_li1": "is unlawful, harmful, threatening, abusive, harassing, hateful, violent, or discriminatory;",
      "tou.s7_li2": "is racist, sexist, homophobic, transphobic, or otherwise degrading towards individuals or groups;",
      "tou.s7_li3": "is sexually explicit, exploitative, or inappropriate for a family-focused service;",
      "tou.s7_li4": "targets, exploits, bullies, or endangers children or vulnerable persons;",
      "tou.s7_li5": "deceives, defrauds, scams, manipulates, or exploits other users;",
      "tou.s7_li6": "infringes the rights of others, including copyright, trademark, privacy, or publicity rights;",
      "tou.s7_li7": "promotes illegal products, unsafe products, weapons, drugs, stolen goods, or other restricted items;",
      "tou.s7_li8": "contains spam, chain messages, phishing attempts, malware, malicious code, or unauthorised advertising;",
      "tou.s7_li9": "attempts to bypass moderation, reporting, blocking, account restrictions, or platform security;",
      "tou.s7_li10": "is otherwise inappropriate or contrary to the purpose of Rebuy.",
      "tou.s7_outro1": "Users who violate these rules may have their content removed, their account suspended, or their account closed.",
      "tou.s7_outro2": "We may act immediately and without prior notice where necessary to protect users, Rebuy, third parties, or the integrity of the service, or where required by law.",
      "tou.s7_outro3": "We reserve the right to cooperate with authorities in cases of serious violations.",
      "tou.s8_title": "8. Reporting, Blocking, and Moderation",
      "tou.s8_p1": "Every user can report objectionable content and block other users directly in the app.",
      "tou.s8_p2": "To report a listing or profile, tap \"Report\" on the listing or profile. Reports are sent to our moderation team.",
      "tou.s8_p3": "To block another user, tap \"Block user\". Blocking a user removes that user's content from your feed and conversations.",
      "tou.s8_p4": "We commit to reviewing reports within 24 hours. Content that violates these Terms will be removed as quickly as possible. Users who contribute objectionable content or abuse the service may be banned from the platform.",
      "tou.s8_p5": "Rebuy may remove content, restrict visibility, suspend accounts, close accounts, prevent future sign-ups, or take other appropriate action where we reasonably believe that these Terms or applicable law have been violated.",
      "tou.s8_p6": "If your content or account is restricted and you believe this was a mistake, you may contact us at support@rebuy.dk. Where required by law, we will provide information about the reason for our decision and any available appeal options.",
      "tou.s9_title": "9. Communications Between Users",
      "tou.s9_p1": "Rebuy may allow users to communicate with each other through messages or other in-app features.",
      "tou.s9_p2": "You must use communication features respectfully and only for purposes related to buying, selling, collecting, delivering, or asking about items on Rebuy.",
      "tou.s9_p3": "You may not use Rebuy to send spam, harassment, threats, scams, phishing attempts, external advertising, or content that violates these Terms.",
      "tou.s9_p4": "Rebuy may moderate, restrict, or remove messages where necessary to protect users, investigate reports, enforce these Terms, or comply with legal obligations.",
      "tou.s10_title": "10. Fees and Payments",
      "tou.s10_p1": "Rebuy is currently free to use.",
      "tou.s10_p2": "Unless expressly stated otherwise, Rebuy does not process payments between buyers and sellers. Buyers and sellers are responsible for agreeing payment terms directly with each other.",
      "tou.s10_p3": "If Rebuy introduces paid features, fees, subscriptions, payment processing, promotions, or commissions in the future, we will provide the applicable terms before you use those paid features.",
      "tou.s11_title": "11. Account Deletion",
      "tou.s11_p1": "You may delete your account at any time via Profile → Delete account.",
      "tou.s11_p2": "Deleting your account may remove your profile and active listings from the service. Some information may be retained where necessary for legal, security, fraud-prevention, dispute-resolution, accounting, or legitimate business purposes, as described in our Privacy Policy.",
      "tou.s11_p3": "Deleting your account does not automatically cancel or reverse any transaction you have already agreed with another user.",
      "tou.s12_title": "12. Suspension, Termination, and Bans",
      "tou.s12_p1": "We may suspend or close your account if we reasonably believe that you have violated these Terms, created risk for other users, misused the service, infringed the rights of others, or acted unlawfully.",
      "tou.s12_p2": "We may act immediately where necessary to protect users, Rebuy, third parties, or the integrity of the service, or where required by law.",
      "tou.s12_p3": "Closed accounts cannot be reopened unless Rebuy decides otherwise. We may also take reasonable steps to prevent the same person from creating new accounts after a ban.",
      "tou.s12_p4": "You may stop using Rebuy at any time.",
      "tou.s13_title": "13. Availability and Changes to the Service",
      "tou.s13_p1": "Rebuy is provided on an \"as is\" and \"as available\" basis.",
      "tou.s13_p2": "We may change, suspend, restrict, or discontinue all or part of the service at any time. We may also update, improve, remove, or modify features, listings, categories, moderation tools, or account functionality.",
      "tou.s13_p3": "We do not guarantee that the service will always be available, uninterrupted, secure, or error-free.",
      "tou.s14_title": "14. Liability",
      "tou.s14_p1": "To the extent permitted by law, Rebuy is not liable for transactions or disputes between users, including item quality, item safety, item legality, payment, collection, delivery, returns, refunds, damage, loss, or user conduct.",
      "tou.s14_p2": "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.",
      "tou.s14_p3": "To the extent permitted by law, Rebuy's total liability for claims arising from or related to the service is limited to the amount paid by you to Rebuy in the 12 months before the claim arose. If you have not paid anything to Rebuy, Rebuy's total liability is limited to DKK 0, except where such limitation is not permitted by law.",
      "tou.s15_title": "15. Changes to These Terms",
      "tou.s15_p1": "We may update these Terms from time to time.",
      "tou.s15_p2": "For material changes, we will notify you via the app, email, or another reasonable method. The date of the most recent update is shown at the top of this page.",
      "tou.s15_p3": "If you continue to use Rebuy after updated Terms take effect, you accept the updated Terms. If you do not agree to the updated Terms, you must stop using the service.",
      "tou.s16_title": "16. Governing Law and Disputes",
      "tou.s16_p1": "These Terms are governed by Danish law.",
      "tou.s16_p2": "Any disputes that cannot be resolved amicably will be handled by the competent Danish courts, unless mandatory consumer protection rules give you the right to bring a claim elsewhere.",
      "tou.s17_title": "17. Contact",
      "tou.s17_p1": "If you have questions about these Terms, want to report content outside the app, believe your rights have been infringed, or want to appeal a moderation decision, you can contact us at:",
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

    // Update all [data-i18n-alt] elements (image alt text)
    var alts = document.querySelectorAll("[data-i18n-alt]");
    alts.forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      el.setAttribute("alt", t(key, lang));
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
