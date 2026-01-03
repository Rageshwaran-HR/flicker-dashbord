import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Tournament", href: "#tournament" },
  { name: "Achievements", href: "#achievements" },
  { name: "Review", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(href);
      setIsMobileMenuOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${href}`);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleActiveOnScroll = () => {
      const offset = 120; // distance from top to consider
      let current = activeLink;
      for (const link of navLinks) {
        const el = document.querySelector(link.href) as HTMLElement | null;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            current = link.href;
            break;
          }
        }
      }
      setActiveLink(current);
    };

    window.addEventListener("scroll", handleActiveOnScroll);
    handleActiveOnScroll();
    return () => window.removeEventListener("scroll", handleActiveOnScroll);
  }, [activeLink]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Left: Logo */}
          <div className="flex items-center col-span-1">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-3 group"
            >
              <img
                src="/img/logo.png"
                alt="Flick Badminton Academy Logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="hidden sm:block">
                <span className="font-display text-lg tracking-wider text-foreground group-hover:text-primary transition-colors">
                  FLICK
                </span>
              </div>
            </a>
          </div>

          {/* Center: Navigation */}
          <div className="hidden lg:flex justify-center col-span-1">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`relative text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-foreground border-b-2 border-[#95C11F] pb-2"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: CTA and mobile button */}
          <div className="flex items-center justify-end gap-4 col-span-1">
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => scrollToSection("#contact")}> 
                <Phone className="w-4 h-4 mr-1" />
                Book Trial
              </Button>
              <Button size="sm" className="rounded-full bg-[#95C11F] text-white hover:bg-[#86b216]" onClick={() => navigate("/pricing")}> 
                View Prices
              </Button>
            </div>

            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border animate-fade-in">
            <div className="py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="px-4 pt-4 flex flex-col gap-3">
                <Button variant="outline" onClick={() => scrollToSection("#contact")}>
                  <Phone className="w-4 h-4 mr-2" />
                  Book Your Trials
                </Button>
                <Button onClick={() => navigate("/pricing")}>View Prices</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
