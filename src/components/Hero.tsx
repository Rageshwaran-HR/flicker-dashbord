import { Button } from "@/components/ui/button";
import { Play, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import academyCourt from "@/assets/academy-court.jpg";
import ach1 from "@/assets/achievement-1.jpg";
import ach2 from "@/assets/achievement-2.jpg";

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8">


          {/* Heading */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wider leading-none">
            UNLEASH YOUR
            <br />
            <span className="text-primary">POTENTIAL</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Expert Coaching for All Ages. World-class training, modern courts,
            and performance-driven programs.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" onClick={() => scrollToSection("#contact")}>
              Book Your Free Trial
            </Button>

            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => scrollToSection("#about")}
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Video
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-10 max-w-xl mx-auto">
            {[
              { value: "80+", label: "Students" },
              { value: "15+", label: "Years Experience" },
              { value: "50+", label: "Tournaments Won" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 🔥 Promo Cards (MATCHES IMAGE) */}
          <div className="pt-12">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  img: academyCourt,
                  title: "Batmintom",
                  subtitle: "Summer Camp 2025",
                },
                {
                  img: ach1,
                  title: "Batmintom",
                  subtitle: "Elite Training Program",
                },
                {
                  img: ach2,
                  title: "Batmintom",
                  subtitle: "New Academy Magazine",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="
                    flex items-center
                    bg-white
                    rounded-full
                    shadow-[6px_8px_0_rgba(0,0,0,0.15)]
                    px-3 py-2
                    min-w-[320px]
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={card.img}
                      alt={card.subtitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 pl-4 text-left">
                    <p className="text-sm text-gray-400 font-medium leading-none">
                      {card.title}
                    </p>

                    <p className="text-sm font-semibold text-black border-b-2 border-dotted border-gray-400 inline-block mt-1">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="pl-3 pr-2">
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
