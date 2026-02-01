import { useEffect } from "react";
import heroBg from "@/assets/hero-bg.png";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Upper",
    tag: "Competitive / Upper batch",
    highlighted: true,
    price: "₹2,000",
    cadence: "/month",
    description: "Focused upper-batch training for competitive players.",
    features: [
      "5 sessions / week",
      "Advanced technique & tactics",
      "Match-play focused",
      "Coach feedback & goal-setting",
    ],
  },
  {
    name: "Intermediate",
    tag: "Skill development",
    price: "₹1,800",
    cadence: "/month",
    description: "Structured intermediate training to close skill gaps.",
    features: [
      "4 sessions / week",
      "Technique refinement",
      "Conditioning",
      "Regular match practice",
    ],
  },
  {
    name: "Advanced",
    tag: "Performance",
    price: "₹1,800",
    cadence: "/month",
    description: "Advanced-level sessions focused on competition preparedness.",
    features: [
      "5 sessions / week",
      "Tactical training",
      "Tournament prep",
      "Optional video review",
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Flick Badminton Academy | Pricing";

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Explore Flick Badminton Academy pricing plans for beginners, intermediate, and competitive players. Book a free trial and choose the right training program.";

    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/#contact");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
        {/* Background image like hero */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/40" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/6 via-transparent to-transparent opacity-20" />

        <div className="relative z-10 container-custom mx-auto px-4 md:px-8 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Simple plans. Serious training.</span>
              </div>
            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wider leading-none mt-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              TRAINING
              <br />
              <span className="text-primary">PRICING</span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/85 mt-6 max-w-2xl animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Pick a plan that matches your level and goals. Start with a free trial, then
              upgrade when
              you’re ready.
            </p>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="lg" onClick={scrollToContact}>
                Book Your Free Trial
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => navigate("/")}
              >
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding pt-8">
        <div className="container-custom mx-auto">
          <div className="flex items-end justify-between gap-6 flex-col md:flex-row">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Plans</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2">
                FIND YOUR <span className="text-primary">FIT</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl">
                Transparent pricing with simple fees: <strong>Upper batch ₹2,000/month</strong>; <strong>Intermediate & Advanced other batches ₹1,800/month</strong>. Fees are fixed per batch and subject to limited court availability.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-10">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  "relative overflow-hidden border-border/80 bg-card/70 backdrop-blur-xl " +
                  (plan.highlighted
                    ? "ring-2 ring-primary/50 shadow-xl shadow-primary/10"
                    : "hover:border-primary/40")
                }
              >
                {plan.highlighted && (
                  <div className="absolute -top-20 -right-20 w-56 h-56 bg-primary/15 blur-3xl" />
                )}

                <CardHeader className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="font-display tracking-wider text-3xl">
                      {plan.name}
                    </CardTitle>
                    <Badge variant={plan.highlighted ? "default" : "secondary"}>{plan.tag}</Badge>
                  </div>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="flex items-end gap-2">
                    <div className="font-display text-5xl text-primary tracking-wider">
                      {plan.price}
                    </div>
                    <div className="text-muted-foreground pb-2">{plan.cadence}</div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm text-foreground/90 leading-6 pt-1">{feature}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="relative">
                  <Button
                    variant={plan.highlighted ? "glow" : "outline"}
                    className="w-full"
                    onClick={scrollToContact}
                  >
                    Enquire Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notes / CTA */}
      <section className="section-padding pt-8">
        <div className="container-custom mx-auto">
          <div className="glass-effect rounded-2xl p-8 md:p-10 border border-border/60 overflow-hidden relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-3xl" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl tracking-wider">
                  NOT SURE WHICH PLAN <span className="text-primary">TO PICK</span>?
                </h3>
                <p className="text-muted-foreground mt-3">
                  Book a free trial and we’ll recommend the right batch based on your level and goals.
                </p>
                <div className="mt-4 inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-semibold">
                  Fee structure: <span className="font-bold">Upper ₹2,000/month</span>; <span className="font-bold">Intermediate & Advanced ₹1,800/month</span>
                </div>
              </div>
              <Button variant="hero" size="lg" className="text-white" onClick={scrollToContact}>
                Book Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Pricing;
