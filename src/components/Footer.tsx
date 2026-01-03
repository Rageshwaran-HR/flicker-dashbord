import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Tournaments", href: "#tournament" },
  { name: "Achievements", href: "#achievements" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const programs = [
  "Junior Training (5-12 yrs)",
  "Youth Development (13-18 yrs)",
  "Adult Recreational",
  "Competitive Training",
  "Private Coaching",
];

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${href}`);
    }
  };

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container-custom mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-display text-2xl text-primary-foreground">F</span>
              </div>
              <span className="font-display text-2xl tracking-wider text-foreground">FLICK</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Flick Badminton Academy is Chennai's premier training facility, 
              dedicated to nurturing talent and building champions since 2010.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">Programs</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program}>
                  <span className="text-muted-foreground text-sm">{program}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <a href="tel:9840020875" className="text-foreground hover:text-primary transition-colors font-semibold">
                    98400 20875
                  </a>
                  <p className="text-muted-foreground text-xs">Call for inquiries</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <a href="mailto:info@flickacademy.com" className="text-foreground hover:text-primary transition-colors text-sm">
                    info@flickacademy.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-muted-foreground text-sm">
                  Flick Badminton Academy,<br />
                  Chennai, Tamil Nadu
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Flick Badminton Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
