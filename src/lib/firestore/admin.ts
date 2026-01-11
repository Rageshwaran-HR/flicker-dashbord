import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type Unsubscribe,
} from "@/lib/firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/firestore";

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  image?: string;
}

export interface AdminPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  compactView: boolean;
}

export interface AdminDoc {
  profile?: AdminProfile;
  preferences?: AdminPreferences;
  updatedAt?: unknown;
}

const DEFAULT_PREFERENCES: AdminPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  darkMode: true,
  compactView: false,
};

export function subscribeAdminDoc(
  uid: string,
  onData: (doc: AdminDoc) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const db = getFirebaseFirestore();
  const ref = doc(db, "admins", uid);

  return onSnapshot(
    ref,
    (snap) => {
      const data = (snap.data() ?? {}) as DocumentData;
      onData({
        profile: data.profile,
        preferences: data.preferences ?? DEFAULT_PREFERENCES,
        updatedAt: data.updatedAt,
      });
    },
    (err) => onError?.(err)
  );
}

export async function upsertAdminProfile(uid: string, profile: AdminProfile) {
  const db = getFirebaseFirestore();
  const ref = doc(db, "admins", uid);
  await setDoc(
    ref,
    {
      profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function upsertAdminPreferences(uid: string, preferences: AdminPreferences) {
  const db = getFirebaseFirestore();
  const ref = doc(db, "admins", uid);
  await setDoc(
    ref,
    {
      preferences,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export { DEFAULT_PREFERENCES };
