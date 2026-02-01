import { Users, Calendar, Trophy, Target, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "80-100",
    label: "Active Students",
    description: "Currently training at our academy",
  },
  {
    icon: Calendar,
    value: "5-18",
    label: "Age Groups",
    description: "Years old players welcome",
  },
  {
    icon: Trophy,
    value: "50+",
    label: "Tournaments",
    description: "Participated annually",
  },
  {
    icon: Target,
    value: "2",
    label: "Professional Courts",
    description: "State-of-the-art facilities",
  },
  {
    icon: Clock,
    value: "12",
    label: "Hours Daily",
    description: "Training sessions available",
  },
  {
    icon: Award,
    value: "95%",
    label: "Success Rate",
    description: "Students achieving their goals",
  },
];

export const Stats = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container-custom mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Impact</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-4">
            WHO WE TRAIN & <span className="text-primary">WHAT WE OFFER</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and dedication to player development
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Value */}
              <div className="font-display text-4xl lg:text-5xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {stat.value}
              </div>

              {/* Label */}
              <h4 className="font-semibold text-foreground mb-1">{stat.label}</h4>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground">{stat.description}</p>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-radial from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
