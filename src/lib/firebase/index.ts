import { type DocumentData } from "firebase/firestore";
import { getFirebaseFirestore } from "./firestore";
import { collection, getDocs } from "./firestore";

export async function fetchCollection<T = any>(collectionName: string): Promise<T[]> {
  const db = getFirebaseFirestore();
  const colRef = collection(db, collectionName);
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as T[];
}

export * from "./client";
export * from "./auth";
export * from "./firestore";
