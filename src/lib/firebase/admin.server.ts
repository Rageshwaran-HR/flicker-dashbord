import admin from "firebase-admin";
import fs from "node:fs";

function parseServiceAccount(): Record<string, any> {
  const fromJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (fromJson) {
    try {
      return JSON.parse(fromJson);
    } catch {
      throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON (must be valid JSON)");
    }
  }

  const fromPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (fromPath) {
    try {
      const raw = fs.readFileSync(fromPath, "utf8");
      return JSON.parse(raw);
    } catch {
      throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_PATH (could not read/parse JSON)");
    }
  }

  throw new Error(
    "Missing FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH for firebase-admin"
  );
}

export function getFirebaseAdminApp() {
  if (admin.apps.length) return admin.app();

  const serviceAccount = parseServiceAccount();
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });

  return admin.app();
}

export function getAdminAuth() {
  getFirebaseAdminApp();
  return admin.auth();
}

export function getAdminFirestore() {
  getFirebaseAdminApp();
  return admin.firestore();
}
