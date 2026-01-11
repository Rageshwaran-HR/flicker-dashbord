import { format } from "date-fns";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
  updateDoc,
  where,
} from "@/lib/firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/firestore";

export type TrainingLevel = "Beginner" | "Intermediate" | "Advanced";
export type PlayerStatus = "Available" | "Injury";
export type TournamentStatus = "Upcoming" | "Ongoing" | "Completed";
export type MatchStatus = "Upcoming" | "Ongoing" | "Finished";

export interface FirestorePlayer {
  name: string;
  age: number;
  training: TrainingLevel;
  status: PlayerStatus;
  stamina: number;
  winRate: number;
  speed: number;
  techniques: number;
  footwork: number;
  wins: number;
  losses: number;
  remarks: string;
  batch?: "morning" | "evening" | "weekend";
  imageUrl?: string;
  createdAt?: Timestamp;
}

export interface FirestoreTournament {
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  venue: string;
  category: string[];
  status: TournamentStatus;
  participantsCount: number;
  liveScore?: string;
  winnerPlayerId?: string;
  runnerUpPlayerId?: string;
  createdAt?: Timestamp;
}

export interface FirestoreMatch {
  tournamentId?: string;
  scheduledAt: Timestamp;
  court: string;
  status: MatchStatus;
  player1Id: string;
  player2Id: string;
  playerIds: string[];
  sets?: Array<{ set: number; p1: number; p2: number }>;
  winnerPlayerId?: string;
  scoreText?: string;
  createdAt?: Timestamp;
}

export interface RankingEntry {
  playerId: string;
  rank: number;
  points: number;
  won: number;
  consistency: number;
  movement: "up" | "down" | "none";
  delta?: number;
}

function requiredNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function requiredString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function mapPlayerDoc(docSnap: QueryDocumentSnapshot<DocumentData>) {
  const data = docSnap.data() as Partial<FirestorePlayer>;
  return {
    id: docSnap.id,
    name: requiredString(data.name),
    age: requiredNumber(data.age),
    training: (data.training ?? "Beginner") as TrainingLevel,
    status: (data.status ?? "Available") as PlayerStatus,
    stamina: requiredNumber(data.stamina),
    image: requiredString(data.imageUrl),
    winRate: requiredNumber(data.winRate),
    speed: requiredNumber(data.speed),
    techniques: requiredNumber(data.techniques),
    footwork: requiredNumber(data.footwork),
    wins: requiredNumber(data.wins),
    losses: requiredNumber(data.losses),
    remarks: requiredString(data.remarks),
  };
}

export function mapTournamentDoc(
  docSnap: QueryDocumentSnapshot<DocumentData>,
  playersById?: Record<string, { name: string }>
) {
  const data = docSnap.data() as Partial<FirestoreTournament>;

  const start = data.startDate && typeof (data.startDate as any).toDate === "function"
    ? (data.startDate as any).toDate()
    : data.startDate instanceof Date
      ? data.startDate
      : null;
  const end = data.endDate && typeof (data.endDate as any).toDate === "function"
    ? (data.endDate as any).toDate()
    : data.endDate instanceof Date
      ? data.endDate
      : null;

  const dateText = (() => {
    if (!start || !end) return "";
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    if (sameMonth && start.getDate() !== end.getDate()) {
      return `${format(start, "MMM d")}-${format(end, "d, yyyy")}`;
    }
    if (+start === +end) return format(start, "MMM d, yyyy");
    return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
  })();

  const winnerName = data.winnerPlayerId ? playersById?.[data.winnerPlayerId]?.name : undefined;
  const runnerUpName = data.runnerUpPlayerId ? playersById?.[data.runnerUpPlayerId]?.name : undefined;

  return {
    id: docSnap.id,
    name: requiredString(data.name),
    date: dateText,
    venue: requiredString(data.venue),
    category: Array.isArray(data.category) ? data.category.filter((c) => typeof c === "string") : [],
    status: (data.status ?? "Upcoming") as TournamentStatus,
    participants: requiredNumber(data.participantsCount),
    liveScore: data.liveScore,
    winner: winnerName,
    runnerUp: runnerUpName,
    winnerPlayerId: data.winnerPlayerId,
    runnerUpPlayerId: data.runnerUpPlayerId,
    // Preserve original Timestamp-like object when possible; if underlying data is a Date,
    // wrap it so callers can safely call `toDate()`.
    startDate: data.startDate && typeof (data.startDate as any).toDate === "function"
      ? data.startDate
      : start
        ? { toDate: () => start } as any
        : undefined,
    endDate: data.endDate && typeof (data.endDate as any).toDate === "function"
      ? data.endDate
      : end
        ? { toDate: () => end } as any
        : undefined,
  };
}

export function mapMatchDoc(docSnap: QueryDocumentSnapshot<DocumentData>) {
  const data = docSnap.data() as Partial<FirestoreMatch>;
  return {
    id: docSnap.id,
    tournamentId: requiredString(data.tournamentId),
    // Ensure scheduledAt supports `toDate()` when source is a Date.
    scheduledAt: data.scheduledAt && typeof (data.scheduledAt as any).toDate === "function"
      ? data.scheduledAt
      : data.scheduledAt instanceof Date
        ? { toDate: () => data.scheduledAt } as any
        : data.scheduledAt,
    court: requiredString(data.court),
    status: (data.status ?? "Upcoming") as MatchStatus,
    player1Id: requiredString(data.player1Id),
    player2Id: requiredString(data.player2Id),
    playerIds: Array.isArray(data.playerIds) ? (data.playerIds as string[]) : [],
    sets: Array.isArray(data.sets) ? (data.sets as any) : undefined,
    winnerPlayerId: data.winnerPlayerId,
    scoreText: data.scoreText,
    createdAt: data.createdAt,
  };
}

export async function fetchPlayersOnce() {
  const db = getFirebaseFirestore();
  const q = query(collection(db, "players"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(mapPlayerDoc);
}

export function subscribePlayers(onPlayers: (players: ReturnType<typeof mapPlayerDoc>[]) => void, onError?: (e: Error) => void): Unsubscribe {
  const db = getFirebaseFirestore();
  const q = query(collection(db, "players"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onPlayers(snap.docs.map(mapPlayerDoc)),
    (err) => onError?.(err)
  );
}

export async function addPlayer(player: {
  name: string;
  age: number;
  training: TrainingLevel;
  status: PlayerStatus;
  stamina: number;
  image?: string;
  winRate: number;
  speed: number;
  techniques: number;
  footwork: number;
  wins: number;
  losses: number;
  remarks: string;
}) {
  const db = getFirebaseFirestore();
  await addDoc(collection(db, "players"), {
    name: player.name,
    age: player.age,
    training: player.training,
    status: player.status,
    stamina: player.stamina,
    winRate: player.winRate,
    speed: player.speed,
    techniques: player.techniques,
    footwork: player.footwork,
    wins: player.wins,
    losses: player.losses,
    remarks: player.remarks,
    batch: "evening",
    imageUrl: player.image ?? "",
    createdAt: serverTimestamp(),
  } satisfies Omit<FirestorePlayer, "createdAt"> & { createdAt: any });
}

export async function updatePlayer(playerId: string, player: {
  name: string;
  age: number;
  training: TrainingLevel;
  status: PlayerStatus;
  stamina: number;
  image?: string;
  winRate: number;
  speed: number;
  techniques: number;
  footwork: number;
  wins: number;
  losses: number;
  remarks: string;
}) {
  const db = getFirebaseFirestore();
  await updateDoc(doc(db, "players", playerId), {
    name: player.name,
    age: player.age,
    training: player.training,
    status: player.status,
    stamina: player.stamina,
    winRate: player.winRate,
    speed: player.speed,
    techniques: player.techniques,
    footwork: player.footwork,
    wins: player.wins,
    losses: player.losses,
    remarks: player.remarks,
    imageUrl: player.image ?? "",
  });
}

export async function deletePlayer(playerId: string) {
  const db = getFirebaseFirestore();
  await deleteDoc(doc(db, "players", playerId));
}

export function subscribeTournaments(
  onTournaments: (tournaments: QueryDocumentSnapshot<DocumentData>[]) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const db = getFirebaseFirestore();
  const q = query(collection(db, "tournaments"), orderBy("startDate", "desc"));
  return onSnapshot(
    q,
    (snap) => onTournaments(snap.docs),
    (err) => onError?.(err)
  );
}

function parseTournamentDateRange(dateText: string): { start: Date; end: Date } | null {
  // Supports formats like: "Mar 25-27, 2025" or "Dec 15-18, 2024" or "Mar 25, 2025".
  const trimmed = dateText.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(",");
  if (parts.length < 2) return null;
  const year = Number(parts[parts.length - 1].trim());
  if (!Number.isFinite(year)) return null;

  const left = parts.slice(0, -1).join(",").trim();
  const [monthStr, daysStr] = left.split(/\s+/, 2);
  if (!monthStr || !daysStr) return null;

  const monthIndex = new Date(`${monthStr} 1, ${year}`).getMonth();
  if (!Number.isFinite(monthIndex)) return null;

  const dayRange = daysStr.replace(/\s/g, "");
  const [startDayRaw, endDayRaw] = dayRange.split("-");
  const startDay = Number(startDayRaw);
  const endDay = Number(endDayRaw ?? startDayRaw);
  if (!Number.isFinite(startDay) || !Number.isFinite(endDay)) return null;

  const start = new Date(year, monthIndex, startDay, 0, 0, 0, 0);
  const end = new Date(year, monthIndex, endDay, 0, 0, 0, 0);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  return { start, end };
}

export async function addTournament(tournament: {
  name: string;
  date: string;
  venue: string;
  category: string[];
  status: TournamentStatus;
  participants: number;
}) {
  const parsed = parseTournamentDateRange(tournament.date);
  if (!parsed) throw new Error("Invalid date format. Use e.g. 'Mar 25-27, 2025'.");

  const db = getFirebaseFirestore();
  await addDoc(collection(db, "tournaments"), {
    name: tournament.name,
    startDate: Timestamp.fromDate(parsed.start),
    endDate: Timestamp.fromDate(parsed.end),
    venue: tournament.venue,
    category: tournament.category,
    status: tournament.status,
    participantsCount: tournament.participants,
    createdAt: serverTimestamp(),
  } satisfies Omit<FirestoreTournament, "createdAt"> & { createdAt: any });
}

export async function updateTournament(tournamentId: string, tournament: {
  name: string;
  date: string;
  venue: string;
  category: string[];
  status: TournamentStatus;
  participants: number;
}) {
  const parsed = parseTournamentDateRange(tournament.date);
  if (!parsed) throw new Error("Invalid date format. Use e.g. 'Mar 25-27, 2025'.");

  const db = getFirebaseFirestore();
  await updateDoc(doc(db, "tournaments", tournamentId), {
    name: tournament.name,
    startDate: Timestamp.fromDate(parsed.start),
    endDate: Timestamp.fromDate(parsed.end),
    venue: tournament.venue,
    category: tournament.category,
    status: tournament.status,
    participantsCount: tournament.participants,
  });
}

export async function deleteTournament(tournamentId: string) {
  const db = getFirebaseFirestore();
  await deleteDoc(doc(db, "tournaments", tournamentId));
}

export function subscribeMatches(
  opts: { tournamentId?: string; statuses?: MatchStatus[]; max?: number },
  onMatches: (matches: ReturnType<typeof mapMatchDoc>[]) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const db = getFirebaseFirestore();

  const constraints = [] as any[];
  if (opts.tournamentId) constraints.push(where("tournamentId", "==", opts.tournamentId));
  if (opts.statuses && opts.statuses.length === 1) constraints.push(where("status", "==", opts.statuses[0]));
  constraints.push(orderBy("scheduledAt", "asc"));
  if (opts.max) constraints.push(limit(opts.max));

  const q = query(collection(db, "matches"), ...constraints);
  return onSnapshot(
    q,
    (snap) => onMatches(snap.docs.map(mapMatchDoc)),
    (err) => onError?.(err)
  );
}

export async function fetchRankingEntriesOnce(rankingId: string) {
  const db = getFirebaseFirestore();
  const q = query(collection(db, "rankings", rankingId, "entries"), orderBy("rank", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as RankingEntry);
}

export function subscribeRankingEntries(
  rankingId: string,
  onEntries: (entries: RankingEntry[]) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const db = getFirebaseFirestore();
  const q = query(collection(db, "rankings", rankingId, "entries"), orderBy("rank", "asc"));
  return onSnapshot(
    q,
    (snap) => onEntries(snap.docs.map((d) => d.data() as RankingEntry)),
    (err) => onError?.(err)
  );
}

export function rankingIdForCategorySlug(slug: string) {
  // UI slugs are like: u16-singles -> spring2025_u16_singles
  const normalized = slug.trim().toLowerCase().replace(/-/g, "_");
  return `spring2025_${normalized}`;
}
