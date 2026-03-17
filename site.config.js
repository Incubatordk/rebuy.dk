const SITE_CONFIG = {
  // "prelaunch" = teaser page with email signup
  // "launched"  = app download page with store links
  SITE_MODE: "prelaunch",

  // Appwrite config for email signup (pre-launch mode only)
  APPWRITE_ENDPOINT: "https://base.12f.dk/v1",
  APPWRITE_PROJECT_ID: "69b9195d00185a0c3d84",
  APPWRITE_DATABASE_ID: "rebuy",
  APPWRITE_COLLECTION_ID: "signups",

  // App store URLs (launched mode only)
  APP_STORE_URL: "https://apps.apple.com/dk/app/rebuy/id000000000",
  PLAY_STORE_URL: "https://play.google.com/store/apps/details?id=dk.rebuy.app",

  // Contact
  SUPPORT_EMAIL: "support@rebuy.dk",
};
