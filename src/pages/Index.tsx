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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchCollection } from "../lib/firebase";

const Index = () => {
  const location = useLocation();
  const [testimonials, setTestimonials] = useState<any[] | null>(null);
  const [coaches, setCoaches] = useState<any[] | null>(null);

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

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [fetchedTestimonials, fetchedCoaches] = await Promise.all([
          fetchCollection("testimonials"),
          fetchCollection("coaches"),
        ]);
        // Debug: log fetched collections from Firestore
        try {
          console.log("fetched testimonials:", fetchedTestimonials);
        } catch (e) {
          console.log("unable to log fetched testimonials", e);
        }
        try {
          console.log("fetched coaches:", fetchedCoaches);
        } catch (e) {
          console.log("unable to log fetched coaches", e);
        }
        if (!mounted) return;
        setTestimonials(fetchedTestimonials);
        setCoaches(fetchedCoaches);
      } catch (e) {
        console.error("Error fetching home collections", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background section-bg-green pattern-stripes">
      <Navbar />
      <Hero />
      <Tournament />
      <About />
      <Achievements />
      <Founder />
      <Coaches coachesProp={coaches || undefined} />
      <Stats />
      <Testimonials testimonialsProp={testimonials || undefined} />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
