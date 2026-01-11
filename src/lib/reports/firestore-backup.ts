import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "@/lib/firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/firestore";
import { downloadText } from "@/lib/reports/download";

function serializeValue(value: any): any {
  if (value == null) return value;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serializeValue);
  if (typeof value === "object") {
    // Firestore Timestamp-like
    if (typeof value.toDate === "function") {
      try {
        const dt = value.toDate();
        if (dt instanceof Date && !Number.isNaN(dt.getTime())) return dt.toISOString();
      } catch {
        // ignore
      }
    }

    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) out[k] = serializeValue(v);
    return out;
  }
  return value;
}

async function fetchCollectionAsObject(collectionName: string) {
  const db = getFirebaseFirestore();
  const snap = await getDocs(collection(db, collectionName));
  const out: Record<string, any> = {};
  for (const docSnap of snap.docs) {
    out[docSnap.id] = serializeValue(docSnap.data());
  }
  return out;
}

async function fetchRankingsWithEntries() {
  const db = getFirebaseFirestore();
  const rankingsSnap = await getDocs(collection(db, "rankings"));
  const rankings: Record<string, any> = {};

  for (const rankingDoc of rankingsSnap.docs) {
    const base = serializeValue(rankingDoc.data());

    const entriesSnap = await getDocs(
      query(collection(db, "rankings", rankingDoc.id, "entries"), orderBy("rank", "asc"))
    );

    const entries: Record<string, any> = {};
    for (const entry of entriesSnap.docs) entries[entry.id] = serializeValue(entry.data());

    rankings[rankingDoc.id] = { ...base, entries };
  }

  return rankings;
}

export async function downloadFirestoreBackup(filenamePrefix = "academy-backup") {
  const payload = {
    exportedAt: new Date().toISOString(),
    players: await fetchCollectionAsObject("players"),
    tournaments: await fetchCollectionAsObject("tournaments"),
    matches: await fetchCollectionAsObject("matches"),
    rankings: await fetchRankingsWithEntries(),
  };

  const date = new Date();
  const stamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

  downloadText(JSON.stringify(payload, null, 2), `${filenamePrefix}-${stamp}.json`, "application/json;charset=utf-8");
}
