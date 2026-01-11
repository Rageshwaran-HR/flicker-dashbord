import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import type { FirebaseOptions } from "firebase/app";

const _env =
  (typeof process !== "undefined" && (process.env as any)) ||
  ((import.meta as any).env as Record<string, any>) ||
  {};

const apiKey = _env.NEXT_PUBLIC_FIREBASE_API_KEY || _env.VITE_FIREBASE_API_KEY;
const authDomain = _env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || _env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = _env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || _env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = _env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || _env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = _env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || _env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = _env.NEXT_PUBLIC_FIREBASE_APP_ID || _env.VITE_FIREBASE_APP_ID;
const measurementId = _env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || _env.VITE_FIREBASE_MEASUREMENT_ID;

function getFirebaseConfig(): FirebaseOptions {
  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    throw new Error(
      "Missing Firebase env vars. Set VITE_FIREBASE_* or NEXT_PUBLIC_FIREBASE_* in your .env (see .env.local.example)."
    );
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  };
}

export function getFirebaseApp(): FirebaseApp {
  if (getApps().length) return getApp();
  return initializeApp(getFirebaseConfig());
}

export async function getFirebaseAnalytics() {
  if (typeof window === "undefined") return null;

  const [{ getAnalytics, isSupported }] = await Promise.all([
    import("firebase/analytics"),
  ]);

  const supported = await isSupported();
  if (!supported) return null;

  return getAnalytics(getFirebaseApp());
}
