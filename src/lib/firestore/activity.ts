import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "@/lib/firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/firestore";
import type { DashboardView } from "@/lib/dashboard/navigation";

export type ActivityKind = "player" | "tournament" | "ranking" | "system";

export type AdminActivity = {
  kind: ActivityKind;
  message: string;
  view?: DashboardView;
  createdAt?: Timestamp;
};

export function subscribeAdminActivity(
  uid: string,
  opts: { max?: number },
  onData: (items: Array<AdminActivity & { id: string }>) => void,
  onError?: (err: unknown) => void,
) {
  const db = getFirebaseFirestore();
  const max = opts.max ?? 10;

  const q = query(
    collection(db, "admins", uid, "activity"),
    orderBy("createdAt", "desc"),
    limit(max)
  );

  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as AdminActivity) }));
      onData(items);
    },
    (err) => onError?.(err)
  );
}

export async function logAdminActivity(uid: string, activity: Omit<AdminActivity, "createdAt">) {
  const db = getFirebaseFirestore();
  await addDoc(collection(db, "admins", uid, "activity"), {
    ...activity,
    createdAt: serverTimestamp(),
  });
}
