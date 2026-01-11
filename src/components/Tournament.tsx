import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import leftPlayerImg from "@/assets/Image13.png";
import rightPlayerImg from "@/assets/Image12.png";
import leftRacket from "@/assets/Image1.png";
import rightRacket from "@/assets/Image.png";

/* ================= IMAGES ================= */
const IMAGES = {
  leftPlayer: leftPlayerImg,
  rightPlayer: rightPlayerImg,
  leftRacket,
  rightRacket,
};
/* ========================================== */

type TournamentTab = "past" | "ongoing" | "future";

import { subscribeTournaments, mapTournamentDoc } from "@/lib/firestore/academy";
import { fetchCollection } from "@/lib/firebase";

export const Tournament = () => {
  const [activeTab, setActiveTab] = useState<TournamentTab>("ongoing");
  const [tournaments, setTournaments] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Titles per tab (keeps heading structure but no fake date/time/venue)
  const titleForTab = (tab: TournamentTab) =>
    tab === "past" ? "LAST BADMINTON MATCH" : tab === "ongoing" ? "NEXT BADMINTON MATCH" : "UPCOMING BADMINTON MATCH";

  useEffect(() => {
    let mounted = true;

    const isFirebaseConfigured = () => {
      const env = (import.meta as any).env || {};
      return !!(env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID && env.VITE_FIREBASE_APP_ID);
    };

    if (!isFirebaseConfigured()) {
      setError("Missing Firebase env vars. Set VITE_FIREBASE_* in .env.local to fetch real data.");
      setLoading(false);
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        // Prefetch once to populate quickly
        const raw = await fetchCollection("tournaments");
        if (!mounted) return;
        if (raw && raw.length > 0) {
          // raw items are plain objects with `id`
          const docs = raw.map((r: any) => ({ id: r.id, data: () => { const c = { ...r }; delete c.id; return c; } }));
          const items = docs.map((d: any) => mapTournamentDoc(d)).map((it: any) => ({
            ...it,
            startTs: it.startDate && typeof it.startDate.toDate === "function" ? it.startDate.toDate().getTime() : 0,
          }));
          items.sort((a: any, b: any) => (a.startTs || 0) - (b.startTs || 0));
          setTournaments(items);
        }
      } catch (e) {
        console.warn("fetchCollection(tournaments) failed", e);
      }

      // Then subscribe for live updates
      const unsub = subscribeTournaments(
        (docs) => {
          if (!mounted) return;
          try {
            const items = docs.map((d: any) => mapTournamentDoc(d)).map((it: any) => ({
              ...it,
              startTs: it.startDate && typeof it.startDate.toDate === "function" ? it.startDate.toDate().getTime() : 0,
            }));
            items.sort((a: any, b: any) => (a.startTs || 0) - (b.startTs || 0));
            setTournaments(items);
            console.log("tournaments mapped:", items);
            setError(null);
          } catch (err) {
            console.error("tournaments subscribe error", err);
            setError(String(err));
          } finally {
            setLoading(false);
          }
        },
        (err: Error) => {
          console.error("tournaments subscribe error", err);
          setError(String(err));
          setLoading(false);
        }
      );

      return unsub;
    };

    let unsubPromise: any;
    (async () => {
      const u = await run();
      unsubPromise = u;
    })();

    return () => {
      mounted = false;
      if (typeof unsubPromise === "function") unsubPromise();
      if (unsubPromise && typeof unsubPromise.then === "function") {
        unsubPromise.then((u: any) => u && typeof u === "function" && u());
      }
    };
  }, []);

  function tournamentForTab(tab: TournamentTab) {
    if (!tournaments || tournaments.length === 0) return null;
    const now = Date.now();

    if (tab === "ongoing") {
      const ongoing = tournaments.find((t) => t.status === "Ongoing");
      if (ongoing) return ongoing;
      // nearest upcoming (start >= now)
      const nearestUpcoming = tournaments.filter((t) => t.startTs >= now).sort((a, b) => (a.startTs || 0) - (b.startTs || 0))[0];
      if (nearestUpcoming) return nearestUpcoming;
      // fallback to most recent completed
      const recentPast = tournaments.filter((t) => t.startTs < now).sort((a, b) => (b.startTs || 0) - (a.startTs || 0))[0];
      return recentPast || tournaments[0];
    }

    if (tab === "future") {
      const nearestUpcoming = tournaments.filter((t) => t.startTs >= now).sort((a, b) => (a.startTs || 0) - (b.startTs || 0))[0];
      return nearestUpcoming || tournaments.find((t) => t.status === "Upcoming") || tournaments[0];
    }

    // past
    const recentPast = tournaments.filter((t) => t.startTs < now).sort((a, b) => (b.startTs || 0) - (a.startTs || 0))[0];
    return recentPast || tournaments.find((t) => t.status === "Completed") || tournaments[0];
  }

  return (
    <section id="tournament" className="py-16 md:py-24 bg-[#f4fff5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-5xl font-extrabold tracking-tight mb-14">
          TOURNAMENT
        </h2>

        {/* Main Panel */}
        <div className="relative bg-[#dff2c2] rounded-[36px] px-6 md:px-10 py-8 md:py-16 overflow-hidden">
          {/* Rackets */}
          <img
            src={IMAGES.leftRacket}
            className="hidden md:block absolute left-[-10px] top-[70%] -translate-y-1/2 w-[150px] opacity-80"
            alt=""
          />
          <img
            src={IMAGES.rightRacket}
            className="hidden md:block absolute right-[-10px] top-[70%] -translate-y-1/2 w-[150px] opacity-80"
            alt=""
          />

          {/* Tabs */}
          <div className="flex justify-center gap-8 md:gap-14 mb-8 md:mb-12 text-base md:text-lg font-semibold">
            {(["past", "ongoing", "future"] as TournamentTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative transition ${
                  activeTab === tab
                    ? "text-black after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-[3px] after:bg-green-600 after:rounded-full"
                    : "text-black/50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h3 className="text-center text-2xl md:text-3xl font-bold mb-6 md:mb-14">
            {(() => {
              const parts = titleForTab(activeTab).split("BADMINTON");
              return (
                <>
                  {parts[0]}
                  <span className="text-green-600">BADMINTON</span>
                  {parts[1]}
                </>
              );
            })()}
          </h3>

          {/* Match Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-12">
            {/* Left Player */}
            <div className="text-center">
              <img
                src={IMAGES.leftPlayer}
                className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 md:mb-5"
                alt=""
              />
              <p className="text-sm text-black/50">#7 SAN DIEGO</p>
              <h4 className="text-2xl font-extrabold mt-1">CHENNAI</h4>
            </div>

            {/* Center Card */}
            <div className="bg-white rounded-3xl px-6 py-6 text-center shadow-[0_14px_28px_rgba(0,0,0,0.10)] w-full max-w-[320px] mx-auto md:mx-0">
                  {(() => {
                    const t = tournamentForTab(activeTab);
                    if (!t) {
                      return (
                        <>
                          <p className="text-xs uppercase text-gray-500 mb-2">No tournament data</p>
                          <p className="text-sm mb-1">TBA</p>
                          <p className="text-2xl md:text-3xl font-extrabold mb-2">TBA</p>
                          <p className="text-xs text-gray-500 leading-relaxed mb-4">Details will appear here when tournaments are available.</p>
                          <Button disabled className="bg-green-600 text-white rounded-full px-6 py-2 text-sm opacity-50 cursor-not-allowed">TBA</Button>
                        </>
                      );
                    }

                    const buttonText = t.status === "Completed" ? "View Results" : t.status === "Ongoing" ? "View Fixtures" : "Register";
                    const timeText = (() => {
                      if (t.startDate && typeof t.startDate.toDate === "function") {
                        try {
                          const dt = t.startDate.toDate();
                          return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                        } catch {
                          return "TBA";
                        }
                      }
                      return "TBA";
                    })();

                    return (
                      <>
                        <p className="text-xs uppercase text-gray-500 mb-2">{t.name}</p>
                        <p className="text-sm mb-1">{t.date || "TBA"}</p>
                        <p className="text-2xl md:text-3xl font-extrabold mb-2">{timeText}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.venue || "TBA"}</p>
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 text-sm">{buttonText}</Button>
                      </>
                    );
                  })()}
            </div>

            {/* Right Player */}
            <div className="text-center">
              <img
                src={IMAGES.rightPlayer}
                className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 md:mb-5"
                alt=""
              />
              <p className="text-sm text-black/50">#8 PACIFIC PALMS</p>
              <h4 className="text-2xl font-extrabold mt-1">THIRUVALLUR</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
