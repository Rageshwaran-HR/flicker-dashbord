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
  const [activeLink, setActiveLink] = useState("#home");

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ACTIVE LINK ON SCROLL ================= */
  useEffect(() => {
    const handleActiveOnScroll = () => {
      const offset = 120;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          setActiveLink(link.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleActiveOnScroll);
    handleActiveOnScroll();
    return () => window.removeEventListener("scroll", handleActiveOnScroll);
  }, []);

  /* ================= HELPERS ================= */
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveLink(href);
      setIsMobileMenuOpen(false);
      return;
    }
    if (location.pathname !== "/") navigate(`/${href}`);
    setIsMobileMenuOpen(false);
  };

  const useWhiteText = !isScrolled;

  const bgClass = isScrolled
    ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
    : "bg-transparent";

  /* ================= RENDER ================= */
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* ================= LOGO ================= */}
          <div className="flex items-center">
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
                alt="Logo"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <span
                className={`font-display text-lg tracking-wider transition-colors ${
                  useWhiteText
                    ? "text-white group-hover:text-[#95C11F]"
                    : "text-foreground group-hover:text-primary"
                }`}
              >
                FLICK
              </span>
            </a>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden lg:flex justify-center">
            <div className="flex gap-8">
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
                    className={`relative text-sm font-medium transition-colors ${
                      isActive
                        ? `${
                            useWhiteText ? "text-white" : "text-foreground"
                          } border-b-2 border-[#95C11F] pb-2`
                        : useWhiteText
                        ? "text-white/80 hover:text-white"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ================= CTA + MOBILE BUTTON ================= */}
          <div className="flex justify-end items-center gap-4">
            <div className="hidden lg:flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("#contact")}
                className={
                  useWhiteText
                    ? "text-white border-white/40 hover:border-white"
                    : ""
                }
              >
                <Phone className="w-4 h-4 mr-1" />
                Book Trial
              </Button>

              <Button
                size="sm"
                className="rounded-full bg-[#95C11F] text-white hover:bg-[#86b216]"
                onClick={() => navigate("/pricing")}
              >
                View Prices
              </Button>
            </div>

            <button
              className={`lg:hidden p-2 ${
                useWhiteText ? "text-white" : "text-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
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
                  className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 font-medium"
                >
                  {link.name}
                </a>
              ))}

              <div className="px-4 pt-4 flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#contact")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Your Trials
                </Button>
                <Button onClick={() => navigate("/pricing")}>
                  View Prices
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
