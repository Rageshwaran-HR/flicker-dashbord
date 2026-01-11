import { downloadBlob } from "@/lib/reports/download";

export async function downloadLeaderboardPdf(opts: {
  seasonLabel: string;
  categoryLabel: string;
  rows: Array<{
    rank: number;
    name: string;
    won: number;
    points: number;
    consistency: number;
    movement: string;
    delta: number;
  }>;
}) {
  if (typeof window === "undefined") throw new Error("PDF generation is only supported in the browser");

  const [{ jsPDF }] = await Promise.all([import("jspdf")]);

  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const marginX = 40;
  let y = 50;

  doc.setFontSize(16);
  doc.text(`Leaderboard Report`, marginX, y);

  y += 18;
  doc.setFontSize(11);
  doc.text(`Season: ${opts.seasonLabel}`, marginX, y);
  y += 14;
  doc.text(`Category: ${opts.categoryLabel}`, marginX, y);
  y += 22;

  doc.setFontSize(10);
  doc.text("Rank", marginX, y);
  doc.text("Player", marginX + 50, y);
  doc.text("Won", marginX + 260, y);
  doc.text("Points", marginX + 310, y);
  doc.text("Cons%", marginX + 380, y);
  doc.text("Δ", marginX + 450, y);
  y += 10;
  doc.line(marginX, y, 555, y);
  y += 14;

  const maxY = 780;

  for (const row of opts.rows) {
    const deltaText = row.movement === "up" ? `+${row.delta}` : row.movement === "down" ? `-${row.delta}` : "0";

    const nameLines = doc.splitTextToSize(String(row.name), 190);

    // Page break
    const rowHeight = Math.max(14, nameLines.length * 12);
    if (y + rowHeight > maxY) {
      doc.addPage();
      y = 50;
    }

    doc.text(String(row.rank), marginX, y);
    doc.text(nameLines, marginX + 50, y);
    doc.text(String(row.won), marginX + 260, y);
    doc.text(String(row.points), marginX + 310, y);
    doc.text(String(row.consistency), marginX + 390, y);
    doc.text(deltaText, marginX + 450, y);

    y += rowHeight;
  }

  const blob = doc.output("blob");
  downloadBlob(blob, `leaderboard-${opts.categoryLabel.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
