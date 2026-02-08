import { Button } from "@/components/ui/button";
import { Play, ChevronRight } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.png";
import academyCourt from "@/assets/academy-court.jpg";
import ach1 from "@/assets/achievement-1.jpg";
import ach2 from "@/assets/achievement-2.jpg";

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen overflow-hidden pt-6 md:pt-12 scroll-mt-24" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/40" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/6 via-transparent to-transparent opacity-20" />

      <div className="relative z-10 container-custom mx-auto text-center text-white flex items-center h-full">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-3 py-1 text-sm animate-fade-in">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-medium text-primary">Elite coaching. Simple plans.</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider leading-tight mt-4 animate-fade-in">
            UNLEASH YOUR
            <br />
            <span className="text-primary">POTENTIAL</span>
          </h1>

          <p className="text-base md:text-lg text-white/85 mt-4 max-w-2xl mx-auto animate-fade-in">
            Expert Coaching for All Ages. World-class training, modern courts, and performance-driven programs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 animate-fade-in">
            <Button
              variant="hero"
              onClick={() =>
                window.open(
                  whatsappLink("Hello, I would like to book a free trial."),
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Book Your Free Trial
            </Button>

            <Button variant="heroOutline"  onClick={() => scrollToSection("#about")} className="text-white border-white hover:bg-white/10">
              <Play className="w-4 h-4 mr-2 text-white fill-white" />
              Watch Video
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 max-w-xl mx-auto text-sm">
            {[{ value: "80+", label: "Students" }, { value: "15+", label: "Years Experience" }, { value: "50+", label: "Tournaments Won" }].map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { img: academyCourt, title: "BADMINTON ", subtitle: "Summer Camp 2025" },
                { img: ach1, title: "BADMINTON ", subtitle: "Elite Training Program" },
                { img: ach2, title: "BADMINTON ", subtitle: "New Academy Magazine" },
              ].map((card, idx) => (
                <div key={idx} className="flex items-center bg-white rounded-full shadow-[6px_8px_0_rgba(0,0,0,0.15)] px-3 py-2 min-w-[220px] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={card.img} alt={card.subtitle} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 pl-3 text-left">
                    <p className="text-sm text-muted-foreground font-medium leading-none">{card.title}</p>
                    <p className="text-sm font-semibold text-black border-b-2 border-dotted border-gray-400 inline-block mt-1">{card.subtitle}</p>
                  </div>

                  <div className="pl-2 pr-1">
                    <ChevronRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
