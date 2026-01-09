import { useState } from "react";
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

export const Tournament = () => {
  const [activeTab, setActiveTab] = useState<TournamentTab>("ongoing");

  const TAB_CONTENT: Record<TournamentTab, {
    title: string;
    date: string;
    time: string;
    venue: string;
    buttonText: string;
  }> = {
    past: {
      title: "LAST BADMINTON MATCH",
      date: "Saturday, July 2nd, 2023",
      time: "6:30 PM",
      venue: "San Diego Badminton Arena, 500 Shuttle Dr",
      buttonText: "View Results",
    },
    ongoing: {
      title: "NEXT BADMINTON MATCH",
      date: "Sunday, July 9th, 2023",
      time: "8:45 PM",
      venue: "San Diego Badminton Arena, 500 Shuttle Dr",
      buttonText: "View Fixtures",
    },
    future: {
      title: "UPCOMING BADMINTON MATCH",
      date: "Sunday, July 23rd, 2023",
      time: "7:00 PM",
      venue: "Pacific Palms Court, 120 Court Ln",
      buttonText: "Register",
    },
  };

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
              const parts = TAB_CONTENT[activeTab].title.split("BADMINTON");
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
              <p className="text-xs uppercase text-gray-500 mb-2">
                Division One Badminton Championship
              </p>
              <p className="text-sm mb-1">{TAB_CONTENT[activeTab].date}</p>
              <p className="text-2xl md:text-3xl font-extrabold mb-2">{TAB_CONTENT[activeTab].time}</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {TAB_CONTENT[activeTab].venue}
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 text-sm">
                {TAB_CONTENT[activeTab].buttonText}
              </Button>
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
