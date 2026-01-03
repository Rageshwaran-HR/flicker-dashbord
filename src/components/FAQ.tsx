import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What age groups do you accept?",
    answer: "We accept students from ages 5 to 18 years for our junior programs, and we also have adult recreational and competitive programs for all ages above 18.",
  },
  {
    question: "Do I need prior experience to join?",
    answer: "No prior experience is needed! We have beginner programs designed to teach the fundamentals, as well as advanced programs for experienced players looking to compete.",
  },
  {
    question: "What are the training timings?",
    answer: "We offer flexible training slots from 6 AM to 8 PM on weekdays and extended hours on weekends. You can choose a batch that fits your schedule.",
  },
  {
    question: "Do you provide equipment?",
    answer: "Yes, we provide rackets for beginners during trial sessions. For regular training, students are encouraged to have their own equipment, though we do have recommendations for quality, budget-friendly options.",
  },
  {
    question: "How can I book a trial session?",
    answer: "You can book a free trial session by calling us at 98400 20875 or by filling out the contact form on our website. We'll schedule a convenient time for you to experience our training firsthand.",
  },
  {
    question: "What tournaments do your students participate in?",
    answer: "Our students regularly participate in district, state, and national-level tournaments. We also organize intramural tournaments within the academy to provide competitive experience.",
  },
];

export const FAQ = () => {
  return (
    <section className="section-padding">
      <div className="container-custom mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Header */}
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-2 mb-6">
              FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our training programs, facilities, and enrollment process. 
              Can't find what you're looking for? Feel free to contact us!
            </p>
            
            {/* Contact Card */}
            <div className="mt-8 p-6 bg-card border border-border rounded-2xl">
              <h4 className="font-semibold text-foreground mb-2">Still have questions?</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Our team is here to help you with any queries
              </p>
              <a
                href="tel:9840020875"
                className="text-primary font-display text-2xl hover:underline"
              >
                98400 20875
              </a>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
