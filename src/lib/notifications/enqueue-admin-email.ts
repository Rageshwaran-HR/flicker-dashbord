"use client";

import { sendAdminEmail } from "@/lib/notifications/send-admin-email";

type AdminEmailItem = {
  kind: "player.created" | "player.updated" | "tournament.created" | "tournament.updated" | "match.created" | "match.finished";
  title: string;
  text: string;
  dedupeKey?: string;
};

const queue: AdminEmailItem[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const inMemoryDedupe = new Set<string>();

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function hasDedupe(key: string) {
  if (inMemoryDedupe.has(key)) return true;
  if (!canUseLocalStorage()) return false;
  try {
    return window.localStorage.getItem(`emailNotif.sent.${key}`) === "1";
  } catch {
    return false;
  }
}

function markDedupe(key: string) {
  inMemoryDedupe.add(key);
  if (!canUseLocalStorage()) return;
  try {
    window.localStorage.setItem(`emailNotif.sent.${key}`, "1");
  } catch {
    // ignore
  }
}

function summarizeSubject(items: AdminEmailItem[]) {
  if (items.length === 1) return items[0].title;
  return `Academy updates (${items.length})`;
}

function formatBody(items: AdminEmailItem[]) {
  const now = new Date().toLocaleString();
  const lines: string[] = [];
  lines.push(`Updates generated at: ${now}`);
  lines.push("");

  for (const item of items) {
    lines.push(`- ${item.title}`);
    if (item.text) {
      const indented = item.text
        .split("\n")
        .map((l) => (l.trim().length ? `  ${l}` : ""))
        .join("\n");
      lines.push(indented);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

async function flushQueue() {
  flushTimer = null;
  if (!queue.length) return;

  const items = queue.splice(0, queue.length);
  try {
    await sendAdminEmail({
      subject: summarizeSubject(items),
      text: formatBody(items),
    });
  } catch {
    // Ignore failures to avoid blocking UI.
  }
}

export function enqueueAdminEmail(item: AdminEmailItem) {
  const key = item.dedupeKey;
  if (key) {
    if (hasDedupe(key)) return;
    markDedupe(key);
  }

  queue.push(item);

  // Debounce: combine multiple updates into one email.
  if (!flushTimer) {
    flushTimer = setTimeout(() => {
      void flushQueue();
    }, 1500);
  }
}
