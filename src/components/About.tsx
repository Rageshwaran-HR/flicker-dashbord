import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Trophy, Zap } from "lucide-react";
import academyCourt from "@/assets/academy-court.jpg";

const features = [
  {
    icon: Target,
    title: "Performance Focused",
    description: "Training designed to maximize your competitive edge",
  },
  {
    icon: Users,
    title: "All Age Groups",
    description: "Programs for ages 5-18 and adult recreational players",
  },
  {
    icon: Trophy,
    title: "Tournament Ready",
    description: "Regular competitions to test and improve skills",
  },
  {
    icon: Zap,
    title: "Expert Coaching",
    description: "Learn from certified professional coaches",
  },
];

export const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-flick-green-light/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <img
                src={academyCourt}
                alt="Flick Academy Courts"
                className="w-full h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Stats (reduced white overlay) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-transparent via-transparent to-transparent p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "6", label: "Courts" },
                    { value: "15+", label: "Years" },
                    { value: "100+", label: "Champions" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="font-display text-3xl text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">About Us</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-6">
                A PLACE TO <span className="text-primary">GROW</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Flick Badminton Academy is Chennai's premier training facility, dedicated to nurturing 
                talent and building champions. Our state-of-the-art facility features professional-grade 
                courts, advanced training equipment, and a supportive environment where players of all 
                levels can thrive.
              </p>
              <p className="text-muted-foreground mt-4">
                Founded by Mr. Dinesh with a vision to make badminton accessible and excellence achievable, 
                we've trained hundreds of students who've gone on to compete at district, state, and 
                national levels.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="mt-6">
              Learn More About Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
