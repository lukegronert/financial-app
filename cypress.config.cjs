const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyBEzGSCWE7hVsjS1AstF1Nvszf8WvQwKpY",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "financial-app-b8cb1.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "financial-app-b8cb1",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "financial-app-b8cb1.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "1058959573403",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:1058959573403:web:59b4ce22f6ebf81fafe13e",
  },
});
