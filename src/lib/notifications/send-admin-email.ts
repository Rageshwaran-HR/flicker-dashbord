"use client";

import { getFirebaseAuth } from "@/lib/firebase/auth";

type SendAdminEmailPayload = {
  subject: string;
  text?: string;
  html?: string;
  event?: {
    kind: "player.created" | "tournament.created" | "match.created" | "match.finished";
    entityId?: string;
  };
};

export async function sendAdminEmail(payload: SendAdminEmailPayload) {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("Not signed in");

  const token = await user.getIdToken();
  const res = await fetch("/api/notifications/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "Failed to send email");
    throw new Error(message || "Failed to send email");
  }
}
