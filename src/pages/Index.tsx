import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Tournament } from "@/components/Tournament";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Founder } from "@/components/Founder";
import { Coaches } from "@/components/Coaches";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Update page title and meta description
    document.title = "Flick Badminton Academy | Premier Badminton Training in Chennai";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Join Chennai's premier badminton academy. Expert coaching for all ages, state-of-the-art facilities, and a track record of producing champions. Book your free trial today!");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Join Chennai's premier badminton academy. Expert coaching for all ages, state-of-the-art facilities, and a track record of producing champions. Book your free trial today!";
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const element = document.querySelector(location.hash);
    if (!element) return;

    const handle = window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => window.clearTimeout(handle);
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background section-bg-green pattern-stripes">
      <Navbar />
      <Hero />
      <Tournament />
      <About />
      <Achievements />
      <Founder />
      <Coaches />
      <Stats />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
