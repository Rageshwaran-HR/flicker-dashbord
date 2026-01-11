import {
  collection,
  getDocs,
  orderBy,
  query,
  type DocumentData,
} from "@/lib/firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase/firestore";
import { downloadCsv } from "@/lib/reports/download";

export async function downloadTournamentResultsCsv(opts: {
  tournaments: Array<{ id: string; name: string }>;
  playersById: Record<string, { name?: string }>;
}) {
  const db = getFirebaseFirestore();
  const tournamentsById = Object.fromEntries(opts.tournaments.map((t) => [t.id, t.name]));

  const matchesSnap = await getDocs(query(collection(db, "matches"), orderBy("scheduledAt", "desc")));

  const rows = matchesSnap.docs.map((d) => {
    const data = d.data() as DocumentData;
    const tournamentId = String(data.tournamentId ?? "");
    const p1Id = String(data.player1Id ?? "");
    const p2Id = String(data.player2Id ?? "");

    const scheduledAt = data.scheduledAt?.toDate?.() ? data.scheduledAt.toDate().toISOString() : "";

    return {
      matchId: d.id,
      tournamentId,
      tournamentName: tournamentsById[tournamentId] ?? "",
      scheduledAt,
      court: String(data.court ?? ""),
      status: String(data.status ?? ""),
      player1Id: p1Id,
      player1Name: opts.playersById[p1Id]?.name ?? p1Id,
      player2Id: p2Id,
      player2Name: opts.playersById[p2Id]?.name ?? p2Id,
      score: String(data.scoreText ?? ""),
      winnerPlayerId: String(data.winnerPlayerId ?? ""),
    };
  });

  downloadCsv(rows, "tournament-results.csv");
}
