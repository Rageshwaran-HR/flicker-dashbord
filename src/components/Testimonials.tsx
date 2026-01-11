import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id?: string | number;
  name?: string;
  role?: string;
  image?: string;
  rating?: number;
  text?: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Menon",
    role: "Parent of U-13 Student",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "My son has transformed completely since joining Flick Academy. The coaches are patient, professional, and truly care about each student's development. Highly recommended!",
  },
  {
    id: 2,
    name: "Arun Krishnan",
    role: "Adult Player",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As someone who started learning badminton at 35, I was nervous about joining. But the supportive environment at Flick made it enjoyable. Great facilities and excellent coaching!",
  },
  {
    id: 3,
    name: "Lakshmi Rajan",
    role: "Parent of District Champion",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "My daughter won her first district title after training here for just 2 years. The structured training program and tournament exposure made all the difference.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Former Student",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Flick Academy gave me the foundation to pursue badminton professionally. The discipline and techniques I learned here are invaluable. Forever grateful!",
  },
];

export const Testimonials = ({ testimonialsProp }: { testimonialsProp?: Testimonial[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = testimonialsProp && testimonialsProp.length ? testimonialsProp : defaultTestimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-card/30">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-4">
            WHAT PARENTS & <span className="text-primary">PLAYERS SAY</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our community of players and their families
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative">
                    {/* Quote Icon */}
                    <Quote className="w-16 h-16 text-primary/20 absolute top-8 right-8" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-flick-gold text-flick-gold" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
