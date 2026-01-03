import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy, Users } from "lucide-react";

type TournamentTab = "past" | "ongoing" | "future";

interface TournamentMatch {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  teams: { name: string; score?: number }[];
  status: TournamentTab;
  category: string;
}

const tournaments: TournamentMatch[] = [
  {
    id: 1,
    title: "Flick Badminton League Junior",
    location: "Flick Academy, Chennai",
    date: "Dec 15, 2025",
    time: "9:00 AM",
    teams: [{ name: "U-13 Boys", score: 21 }, { name: "U-15 Boys", score: 18 }],
    status: "past",
    category: "Junior League",
  },
  {
    id: 2,
    title: "Intramural Juniors Tournament",
    location: "Flick Academy, Chennai",
    date: "Jan 10, 2026",
    time: "10:00 AM",
    teams: [{ name: "Team Alpha" }, { name: "Team Beta" }],
    status: "ongoing",
    category: "Internal",
  },
  {
    id: 3,
    title: "Chennai District Championship",
    location: "SDAT Stadium, Chennai",
    date: "Feb 20, 2026",
    time: "8:00 AM",
    teams: [{ name: "Flick Academy" }, { name: "TBD" }],
    status: "future",
    category: "District Level",
  },
  {
    id: 4,
    title: "Mens Doubles Championship",
    location: "Flick Academy, Chennai",
    date: "Nov 28, 2025",
    time: "2:00 PM",
    teams: [{ name: "Team Winners", score: 21 }, { name: "Team Runners", score: 15 }],
    status: "past",
    category: "Doubles",
  },
];

export const Tournament = () => {
  const [activeTab, setActiveTab] = useState<TournamentTab>("ongoing");

  const filteredTournaments = tournaments.filter((t) => t.status === activeTab);

  return (
    <section id="tournament" className="section-padding bg-card/30">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Competitions</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-4">
            TOURNAMENTS & <span className="text-primary">MATCHES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest tournaments, ongoing matches, and upcoming events
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted/50 rounded-xl p-1.5">
            {(["past", "ongoing", "future"] as TournamentTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTournaments.map((tournament, index) => (
            <div
              key={tournament.id}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {tournament.category}
                </span>
                {tournament.status === "ongoing" && (
                  <span className="flex items-center gap-1.5 text-xs text-flick-gold font-medium">
                    <div className="w-2 h-2 bg-flick-gold rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors">
                {tournament.title}
              </h3>

              {/* Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {tournament.location}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    {tournament.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    {tournament.time}
                  </div>
                </div>
              </div>

              {/* Teams */}
              <div className="bg-muted/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{tournament.teams[0].name}</p>
                      {tournament.teams[0].score !== undefined && (
                        <p className="text-2xl font-display text-primary">{tournament.teams[0].score}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-muted-foreground font-display text-xl">VS</span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-sm">{tournament.teams[1].name}</p>
                      {tournament.teams[1].score !== undefined && (
                        <p className="text-2xl font-display text-muted-foreground">{tournament.teams[1].score}</p>
                      )}
                    </div>
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <Button variant="outline" className="w-full group-hover:variant-default">
                <Trophy className="w-4 h-4 mr-2" />
                View Fixtures
              </Button>
            </div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No {activeTab} tournaments available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};
