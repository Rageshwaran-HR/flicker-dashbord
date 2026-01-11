export type DashboardView =
  | "dashboard"
  | "tournaments"
  | "rankings"
  | "players"
  | "profile"
  | "settings";

const EVENT_NAME = "dashboard:navigate";

export function emitDashboardNavigate(view: DashboardView) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: view }));
}

export function onDashboardNavigate(handler: (view: DashboardView) => void) {
  if (typeof window === "undefined") return () => {};

  const listener = (evt: Event) => {
    const ce = evt as CustomEvent;
    const next = ce.detail as DashboardView;
    if (!next) return;
    handler(next);
  };

  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
