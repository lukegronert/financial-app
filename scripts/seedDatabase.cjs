const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const firebaseServiceAccountKey = require("../secrets/firebaseServiceAccountKey.json");

initializeApp({
  credential: cert(firebaseServiceAccountKey),
});

const db = getFirestore();

const resetTestUser = async () => {
  const res = await db.collection("users").doc("+12345678901").delete();
};

module.exports = resetTestUser;
