import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trophy, Star } from "lucide-react";
import achievement1 from "@/assets/achievement-1.jpg";
import achievement2 from "@/assets/achievement-2.jpeg";
import achievement3 from "@/assets/achievement-3.jpeg";
import achievement4 from "@/assets/achievement-4.jpeg";
import achievement5 from "@/assets/achievement-5.jpeg";
import achievement6 from "@/assets/achievement-6.jpeg";

const achievements = [
  { id: 1, image: achievement1, title: "Junior League Winners", category: "U-13 Boys", year: "2024" },
  { id: 2, image: achievement2, title: "Mens Doubles Championship", category: "Open Category", year: "2024" },
  { id: 3, image: achievement3, title: "District Tournament", category: "U-15 Boys", year: "2023" },
  { id: 4, image: achievement4, title: "State Level Championship", category: "Junior Girls", year: "2023" },
  { id: 5, image: achievement5, title: "Intramural Tournament", category: "All Categories", year: "2024" },
  { id: 6, image: achievement6, title: "Academy Excellence Award", category: "Special Recognition", year: "2024" },
];

const stats = [
  { value: "50+", label: "Tournaments Won" },
  { value: "200+", label: "Medals Earned" },
  { value: "15+", label: "State Champions" },
  { value: "25+", label: "District Titles" },
];

export const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="achievements" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-flick-gold/5 rounded-full blur-3xl" />
      
      <div className="container-custom mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Our Pride & Glory</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl">
            ACHIEVEMENTS OF <span className="text-primary">FLICK</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Celebrating the victories and milestones of our talented players who've made us proud
          </p>
        </div>

        {/* Main Carousel Display */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Featured Achievement */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            {/* Main Image */}
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card aspect-[4/3]">
                <img
                  src={achievements[currentIndex].image}
                  alt={achievements[currentIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay (removed heavy white overlay) */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
                
                {/* Year badge */}
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full font-display text-lg">
                  {achievements[currentIndex].year}
                </div>

                {/* Content: add highlighted overlay behind text for readability */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-black/55 backdrop-blur-sm" />
                    <div className="relative z-10 p-4 md:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-flick-gold" />
                        <span className="text-flick-gold font-semibold">{achievements[currentIndex].category}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white uppercase leading-tight">
                        {achievements[currentIndex].title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and Navigation */}
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card/50 border border-border/50 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="font-display text-4xl md:text-5xl text-primary group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground mt-2 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {achievements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "w-8 bg-primary" 
                          : "w-2 bg-border hover:bg-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-xl border border-border bg-card/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-xl border border-border bg-card/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {achievements.map((achievement, index) => (
              <button
                key={achievement.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-32 md:w-40 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? "border-primary ring-2 ring-primary/30" 
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-xs font-medium bg-black/55 text-white px-2 py-1 rounded truncate block max-w-[85%]">
                    {achievement.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
