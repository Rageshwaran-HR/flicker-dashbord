import { Instagram, Linkedin, Mail } from "lucide-react";
import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coach3 from "@/assets/coach-3.jpg";

const coaches = [
  {
    name: "Rajesh Kumar",
    role: "Head Coach",
    image: coach1,
    specialization: "Singles & Footwork",
    experience: "12+ years",
  },
  {
    name: "Priya Sharma",
    role: "Senior Coach",
    image: coach2,
    specialization: "Doubles & Strategy",
    experience: "8+ years",
  },
  {
    name: "Arjun Patel",
    role: "Assistant Coach",
    image: coach3,
    specialization: "Junior Training",
    experience: "5+ years",
  },
];

export const Coaches = () => {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Meet The Team</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-4">
            OUR WORLD CLASS <span className="text-primary">COACHES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from certified professionals who are passionate about developing champions
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay (removed heavy white overlay) */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
                
                {/* Social Links */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  {[Instagram, Linkedin, Mail].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xs text-primary font-medium">{coach.experience}</span>
                </div>
                <h3 className="font-display text-2xl text-white mb-1">{coach.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{coach.role}</p>
                <p className="text-white/80 text-sm">{coach.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
