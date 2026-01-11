import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseApp } from "@/lib/firebase/client";

let firestoreInstance: Firestore | null = null;

export function getFirebaseFirestore() {
  if (firestoreInstance) return firestoreInstance;

  const app = getFirebaseApp();
  try {
    // Using memory cache avoids IndexedDB/persistence issues that can surface
    // as internal assertion failures during fast refresh / dev.
    firestoreInstance = initializeFirestore(app, {
      localCache: memoryLocalCache(),
    });
  } catch {
    // Fallback if Firestore was already initialized elsewhere.
    firestoreInstance = getFirestore(app);
  }

  return firestoreInstance;
}

export {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type Query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
