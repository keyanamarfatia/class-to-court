import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Droplets,
  Footprints,
  Laptop,
  Plane,
  RotateCcw,
  Shirt,
  ShieldCheck,
  Sparkles,
  Train,
  Wind,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

/* All product facts below are taken from mokobara.com product pages. Do not add facts that
   are not on the brand's own site. */
type BagId = "overnighter" | "backpack16" | "em32";

const bags: Record<
  BagId,
  { name: string; icon: typeof Laptop; tagline: string; facts: string[]; url: string }
> = {
  overnighter: {
    name: "Overnighter Backpack",
    icon: BriefcaseBusiness,
    tagline: "The class-to-court pick",
    facts: [
      "Fits up to a 16\" laptop",
      "19L, expands to 23L",
      "Front pocket detaches into a sling bag",
      "Breathable air mesh back, padded straps",
    ],
    url: "https://mokobara.com/products/the-overnighter-backpack",
  },
  backpack16: {
    name: "Backpack 16L",
    icon: Laptop,
    tagline: "The light, lecture-only pick",
    facts: [
      "Fits up to a 15\" laptop or 16\" MacBook Pro",
      "Durable water-resistant materials",
      "Magnetic pocket for your phone",
    ],
    url: "https://mokobara.com/products/the-backpack-bags-online",
  },
  em32: {
    name: "Em Travel Backpack 32L",
    icon: Plane,
    tagline: "The weekend-trip pick",
    facts: [
      "Built-in water bottle compartment",
      "Rain cover compartment",
      "Water resistant",
    ],
    url: "https://www.mokobara.com/products/the-em-duffle-backpack-32l",
  },
};

const bagOrder: BagId[] = ["overnighter", "backpack16", "em32"];

const quizQuestions = [
  {
    id: "laptop",
    question: "What size is your laptop?",
    options: [
      { value: "15", label: "Up to 15\"" },
      { value: "16", label: "16\"" },
    ],
  },
  {
    id: "after",
    question: "After class, you're heading to…",
    options: [
      { value: "home", label: "Home or the canteen" },
      { value: "court", label: "Padel or the gym" },
      { value: "weekend", label: "A weekend trip" },
    ],
  },
  {
    id: "commute",
    question: "How's your commute?",
    options: [
      { value: "short", label: "Short and easy" },
      { value: "long", label: "Long, crowded train" },
    ],
  },
] as const;

function pickBag(answers: Record<string, string>): BagId {
  if (answers.after === "weekend") return "em32";
  if (answers.after === "court") return "overnighter";
  if (answers.laptop === "16" || answers.commute === "long") return "overnighter";
  return "backpack16";
}

const padelAnswer =
  "For your first padel game, carry your racket, court shoes, a water bottle, a towel and a change of clothes. Coming straight from class? The Mokobara Overnighter Backpack fits up to a 16-inch laptop and expands from 19L to 23L to hold your kit. Then book a court at 7Padel by MS Dhoni on 7padel.in.";

const checklist = [
  { label: "Racket", icon: Sparkles },
  { label: "Court shoes", icon: Footprints },
  { label: "Water bottle", icon: Droplets },
  { label: "Towel", icon: Wind },
  { label: "Change of clothes", icon: Shirt },
];

const padelFaqs = [
  {
    q: "Can one bag carry my laptop and padel kit?",
    a: "Yes. The Mokobara Overnighter Backpack fits up to a 16-inch laptop and expands from 19L to 23L for shoes, clothes and a towel. Its front pocket detaches into a sling for your phone and keys on court.",
  },
  {
    q: "Do I need a separate bag for a padel racket?",
    a: "Mokobara backpacks are not racket bags, so keep your racket in its own cover. Your laptop, shoes, water bottle and clothes can all go in one Mokobara backpack like the Overnighter.",
  },
  {
    q: "What size bag do I need for padel straight after class?",
    a: "For a laptop plus kit, the 23L Overnighter works. If you carry more, the Mokobara Em Travel Backpack 32L has a built-in water bottle compartment and a rain cover.",
  },
];

/* Replace these with the team's real "People also ask" questions from S2. */
const collegeFaqs = [
  {
    q: "What is the best laptop backpack for college?",
    a: "It depends on your day. For lectures only, the Mokobara Backpack 16L fits up to a 15-inch laptop. If you go somewhere after class, the Overnighter Backpack fits up to a 16-inch laptop and expands from 19L to 23L.",
  },
  {
    q: "What size backpack do I need for a 16-inch laptop?",
    a: "Look for a padded sleeve rated for 16 inches. The Mokobara Overnighter Backpack fits up to a 16-inch laptop, and the Backpack 16L fits a MacBook Pro up to 16 inches.",
  },
  {
    q: "Are Mokobara backpacks water resistant?",
    a: "The Mokobara Backpack 16L is made with durable water-resistant materials, and the Em Travel Backpack 32L is water resistant with its own rain cover compartment.",
  },
  {
    q: "What if the backpack doesn't suit me?",
    a: "Mokobara offers a 30-day trial on mokobara.com: if it isn't the one for you, you can return it for a full refund. Bags also carry a 12-month limited warranty.",
  },
];

const hesitations = [
  {
    title: "Will it fit my laptop?",
    body: "The Overnighter fits up to 16\". The Backpack 16L fits up to 15\" or a 16\" MacBook Pro.",
    icon: Laptop,
  },
  {
    title: "Will it hurt on a long commute?",
    body: "The Overnighter has padded shoulder straps and a breathable air mesh back.",
    icon: Train,
  },
  {
    title: "What if I don't like it?",
    body: "30-day trial with a full refund, plus a 12-month limited warranty on mokobara.com.",
    icon: ShieldCheck,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "What should I carry to my first padel game?", a: padelAnswer },
    ...padelFaqs,
    ...collegeFaqs,
  ].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const description =
  "Fits a 16\" laptop, survives the commute, expands for the weekend. Find the Mokobara backpack that fits your college day. Take the 30-second quiz.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Laptop Backpack for College (2026) | Mokobara" },
      { name: "description", content: description },
      { property: "og:title", content: "Best Laptop Backpack for College (2026) | Mokobara" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "laptop backpack for college, Mokobara backpack, what to carry to padel" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  }),
  component: Index,
});

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= quizQuestions.length;
  const result = done ? bags[pickBag(answers)] : null;

  const choose = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="quiz-card">
      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${(Math.min(step, quizQuestions.length) / quizQuestions.length) * 100}%` }} />
      </div>

      {!done && (
        <div key={step} className="quiz-step">
          <p className="quiz-step-count">
            Question {step + 1} of {quizQuestions.length}
          </p>
          <h3 className="quiz-question">{quizQuestions[step].question}</h3>
          <div className="quiz-options">
            {quizQuestions[step].options.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className="quiz-option"
                onClick={() => choose(quizQuestions[step].id, opt.value)}
              >
                {opt.label}
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="quiz-result" aria-live="polite">
          <p className="quiz-step-count">Your match</p>
          <h3 className="quiz-question">{result.name}</h3>
          <p className="quiz-result-tagline">{result.tagline}</p>
          <ul className="fact-list">
            {result.facts.slice(0, 3).map((f) => (
              <li key={f}>
                <Check aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
          <div className="quiz-result-actions">
            <Button asChild>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                View on mokobara.com <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline" onClick={restart}>
              <RotateCcw aria-hidden="true" /> Retake
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FaqList({ items, prefix }: { items: { q: string; a: string }[]; prefix: string }) {
  return (
    <Accordion type="single" collapsible className="faq-accordion">
      {items.map(({ q, a }, i) => (
        <AccordionItem value={`${prefix}-${i}`} key={q} className="faq-item">
          <AccordionTrigger className="faq-trigger">
            <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="faq-q">{q}</span>
          </AccordionTrigger>
          <AccordionContent className="faq-answer">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Index() {
  return (
    <main className="mokobara-page">
      <div className="site-shell">
        <header className="site-header">
          <a className="brand-lockup" href="#top" aria-label="Mokobara college edit, back to top">
            <span className="brand-mark" aria-hidden="true">m</span>
            <span className="brand-name">mokobara</span>
          </a>
          <p className="brand-tagline">The Joy Is in the Details</p>
          <span className="header-edition">COLLEGE EDIT <span aria-hidden="true">/</span> 2026</span>
        </header>

        <section className="hero-section" id="top" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" /> THE COLLEGE EDIT</p>
            <h1 className="hero-title" id="page-title">
              The Best Laptop Backpack for College, From Class to <em>Court</em>
            </h1>
            <p className="hero-subhead">Campus in the morning. Court after class. One bag that fits both.</p>
            <Button asChild size="lg" className="hero-cta">
              <a href="#quiz">
                Take the 30-second quiz
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="hero-art" aria-label="A carry-all for campus and court">
            <div className="hero-art-topline">
              <span>CLASS / COURT</span>
              <Sparkles aria-hidden="true" />
            </div>
            <div className="hero-art-center">
              <div className="bag-icon-frame">
                <BriefcaseBusiness aria-hidden="true" />
              </div>
              <p className="hero-art-title">One bag.<br />All day.</p>
            </div>
            <div className="hero-art-footer">
              <span><Laptop aria-hidden="true" /> 16&quot; laptop</span>
              <span className="art-footer-divider" aria-hidden="true" />
              <span><Plane aria-hidden="true" /> Weekend ready</span>
            </div>
            <span className="hero-art-index" aria-hidden="true">01</span>
          </div>
        </section>

        <section className="content-section product-section" aria-labelledby="products-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">THE SHORTLIST</p>
              <h2 className="section-title" id="products-title">Which Mokobara fits your college day?</h2>
            </div>
            <span className="section-count" aria-hidden="true">01 — 04</span>
          </div>
          <div className="product-grid">
            {bagOrder.map((id, index) => {
              const { name, icon: ProductIcon, tagline, facts, url } = bags[id];
              return (
                <article className="product-card" key={id}>
                  <div className={`product-art product-art-${index + 1}`} aria-hidden="true">
                    <span className="product-card-number">0{index + 1}</span>
                    <ProductIcon />
                  </div>
                  <h3 className="product-title">{name}</h3>
                  <p className="product-tagline">{tagline}</p>
                  <ul className="fact-list">
                    {facts.map((f) => (
                      <li key={f}>
                        <Check aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a className="product-link" href={url} target="_blank" rel="noopener noreferrer">
                    View on mokobara.com <ArrowRight aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section quiz-section" id="quiz" aria-labelledby="quiz-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">YOUR COLLEGE DAY, DECODED</p>
              <h2 className="section-title" id="quiz-title">Quiz: Which Mokobara fits your plan?</h2>
            </div>
            <span className="section-count" aria-hidden="true">02 — 04</span>
          </div>
          <Quiz />
        </section>

        <section className="content-section" aria-labelledby="worries-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">BEFORE YOU BUY</p>
              <h2 className="section-title" id="worries-title">Why students hesitate, and what fixes it</h2>
            </div>
            <span className="section-count" aria-hidden="true">03 — 04</span>
          </div>
          <div className="worry-grid">
            {hesitations.map(({ title, body, icon: Icon }) => (
              <article className="worry-card" key={title}>
                <Icon aria-hidden="true" />
                <h3 className="product-title">{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section padel-section" id="padel" aria-labelledby="padel-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">FROM CLASS TO COURT</p>
              <h2 className="section-title" id="padel-title">What should I carry to my first padel game?</h2>
            </div>
            <span className="section-count" aria-hidden="true">04 — 04</span>
          </div>
          <div className="answer-box">
            <span className="answer-icon" aria-hidden="true"><Sparkles /></span>
            <p>{padelAnswer}</p>
          </div>
          <ul className="checklist" aria-label="First padel game checklist">
            {checklist.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="hero-cta">
            <a href="https://7padel.in" target="_blank" rel="noopener noreferrer">
              Book a court at 7padel.in <ArrowRight aria-hidden="true" />
            </a>
          </Button>

          <h2 className="section-title faq-subtitle" id="padel-faq-title">Padel bag FAQ</h2>
          <FaqList items={padelFaqs} prefix="padel" />
        </section>

        <section className="content-section faq-section" aria-labelledby="faq-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">GOOD TO KNOW</p>
              <h2 className="section-title" id="faq-title">College backpack FAQ</h2>
            </div>
          </div>
          <FaqList items={collegeFaqs} prefix="college" />
        </section>
      </div>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <p>
            Student concept for a Schbang x Atlas SkillTech brief. Not affiliated with or commissioned by
            Mokobara or 7Padel. Product facts from mokobara.com and 7padel.in.
          </p>
        </div>
      </footer>
    </main>
  );
}
