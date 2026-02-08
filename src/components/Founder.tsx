import { Quote } from "lucide-react";
import founderImg from "@/assets/coach-1.jpeg";

const timeline = [
  { year: "2018", event: "Founded Flick Badminton Academy" },
  { year: "2019", event: "Operating with 2 professional courts" },
  { year: "2022", event: "Opened advanced training programs" },
  { year: "2023", event: "100+ tournament victories milestone" },
];

export const Founder = () => {
  return (
    <section className="section-padding">
      <div className="container-custom mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Founder</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-6">
                MR. <span className="text-primary">DINESH</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With over 15 years of coaching experience, Mr. Dinesh founded Flick Badminton Academy with a simple vision: to make quality
                badminton training accessible to everyone while nurturing the next generation of champions.
              </p>
            </div>

            {/* Quote */}
            <div className="relative bg-card border border-border rounded-2xl p-6">
              <Quote className="w-10 h-10 text-primary/30 absolute top-4 left-4" />
              <p className="text-foreground italic text-lg pl-8">
                "Every champion was once a beginner who refused to give up. At Flick, we don't just 
                teach badminton – we build character, discipline, and a winning mindset."
              </p>
              <p className="text-primary font-semibold mt-4 pl-8">— Mr. Dinesh, Founder & Head of Badminton Operations</p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-display text-xl text-foreground mb-4">Academy Journey</h4>
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-16 text-primary font-display text-lg">{item.year}</div>
                  <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                  <div className="flex-1 h-px bg-border group-hover:bg-primary/50 transition-colors" />
                  <div className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-flick-green-light/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src={founderImg}
                  alt="Mr. Dinesh - Founder"
                  className="w-full h-[500px] lg:h-[600px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="font-display text-2xl">Since</div>
                <div className="font-display text-2xl">2018</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
