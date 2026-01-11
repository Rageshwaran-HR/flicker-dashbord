function ensureBrowser() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("Downloads are only supported in the browser");
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  ensureBrowser();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mimeType });
  downloadBlob(blob, filename);
}

function escapeCsvCell(value: unknown) {
  const str = value == null ? "" : String(value);
  if (/["]|,|\n|\r/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function toCsv(rows: Array<Record<string, unknown>>, columns?: string[]) {
  if (rows.length === 0) return "";
  const cols = columns && columns.length ? columns : Object.keys(rows[0]);
  const header = cols.map(escapeCsvCell).join(",");
  const lines = rows.map((r) => cols.map((c) => escapeCsvCell(r[c])).join(","));
  return [header, ...lines].join("\n");
}

export function downloadCsv(rows: Array<Record<string, unknown>>, filename: string, columns?: string[]) {
  const csv = toCsv(rows, columns);
  downloadText(csv, filename, "text/csv;charset=utf-8");
}
