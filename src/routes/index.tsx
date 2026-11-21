import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
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

const comparison = [
  { label: "Laptop fit", overnighter: "Up to 16\"", backpack16: "Up to 15\" (16\" MacBook Pro)", em32: "Not listed" },
  { label: "Capacity", overnighter: "19L, expands to 23L", backpack16: "16L", em32: "32L" },
  { label: "Best for", overnighter: "Class, then court or gym", backpack16: "Lectures only", em32: "3–4 day trips" },
  { label: "Stand-out detail", overnighter: "Front pocket becomes a sling", backpack16: "Magnetic phone pocket", em32: "Bottle compartment + rain cover" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mokobara laptop backpacks for college",
  itemListElement: bagOrder.map((id, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: bags[id].name,
    url: bags[id].url,
  })),
};

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
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(itemListSchema) },
    ],
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
    <div className="quiz-panel">
      <div className="quiz-meta">
        <span>{done ? "Your match" : `Question ${step + 1} / ${quizQuestions.length}`}</span>
        <div className="quiz-progress" aria-hidden="true">
          <span style={{ width: `${(Math.min(step, quizQuestions.length) / quizQuestions.length) * 100}%` }} />
        </div>
      </div>

      {!done && (
        <div key={step} className="quiz-step">
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
          <div className="quiz-result-tile" aria-hidden="true">
            <result.icon strokeWidth={1.1} />
          </div>
          <div>
            <h3 className="quiz-question">{result.name}</h3>
            <p className="quiz-result-tagline">{result.tagline}</p>
            <ul className="fact-list">
              {result.facts.slice(0, 3).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="quiz-result-actions">
              <a className="btn-solid" href={result.url} target="_blank" rel="noopener noreferrer">
                View on mokobara.com
              </a>
              <button type="button" className="btn-outline" onClick={restart}>
                <RotateCcw aria-hidden="true" /> Retake
              </button>
            </div>
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
            <span className="faq-q">{q}</span>
          </AccordionTrigger>
          <AccordionContent className="faq-answer">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const badges: Record<BagId, string> = { overnighter: "Class to court", backpack16: "Light", em32: "Weekend" };

function SectionHead({ eyebrow, title, id, link }: { eyebrow: string; title: string; id: string; link?: { href: string; label: string } }) {
  return (
    <div className="section-head">
      <div>
        <p className="pill">{eyebrow}</p>
        <h2 className="section-title" id={id}>{/[?.!]$/.test(title) ? title : `${title}.`}</h2>
      </div>
      {link && (
        <a className="view-all" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {link.label}
        </a>
      )}
    </div>
  );
}

function Index() {
  return (
    <main className="mk-page">
      <div className="ticker" aria-label="Student concept, the college edit 2026">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Student concept <b>•</b> The college edit 2026 <b>•</b> From class to court <b>•</b></span>
          ))}
        </div>
      </div>

      <header className="mk-sidebar">
        <div className="sidebar-dark">
          <a className="wordmark" href="#top" aria-label="mokobara college edit, back to top">mokobara</a>
          <nav className="sidebar-nav" aria-label="Page sections">
            <a href="#backpacks">Backpacks</a>
            <a href="#compare">Compare</a>
            <a href="#quiz">Quiz</a>
            <a href="#padel">Padel</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
        <div className="sidebar-light">
          <a href="#quiz">Find my bag <ArrowRight aria-hidden="true" /></a>
        </div>
      </header>

      <div className="mk-main">
      <section className="hero" id="top" aria-labelledby="page-title">
        <div className="mk-shell hero-inner">
          <div className="hero-copy">
            <p className="pill">The college edit</p>
            <h1 className="hero-title" id="page-title">
              The best laptop backpack for college, from class to court
            </h1>
            <p className="hero-sub">Campus in the morning. Court after class. One Mokobara that fits both.</p>
            <div className="hero-actions">
              <a className="btn-solid" href="#quiz">Take the 30-second quiz</a>
              <a className="arrow-link" href="#padel">First padel game <ArrowRight aria-hidden="true" /></a>
            </div>
            <p className="hero-meta">Updated November 2026 · Product facts from mokobara.com</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <BriefcaseBusiness strokeWidth={0.9} />
            <div className="hero-specs">
              <span>16" laptop</span>
              <span>19L → 23L</span>
              <span>Detachable sling</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section" id="backpacks" aria-labelledby="products-title">
        <div className="mk-shell">
          <SectionHead
            eyebrow="The shortlist"
            title="Which Mokobara fits your college day?"
            id="products-title"
            link={{ href: "https://mokobara.com/collections/laptop-bags", label: "View all" }}
          />
          <div className="product-row">
            {bagOrder.map((id) => {
              const { name, icon: ProductIcon, tagline, facts, url } = bags[id];
              return (
                <article className="product-card" key={id}>
                  <a className="product-tile" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} on mokobara.com`}>
                    <span className="badge">{badges[id]}</span>
                    <ProductIcon strokeWidth={0.9} aria-hidden="true" />
                  </a>
                  <h3 className="product-title">{name}</h3>
                  <p className="product-tagline">{tagline}</p>
                  <ul className="fact-list">
                    {facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a className="product-link" href={url} target="_blank" rel="noopener noreferrer">
                    View on mokobara.com
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-grey" id="compare" aria-labelledby="compare-title">
        <div className="mk-shell">
          <SectionHead eyebrow="Side by side" title="Mokobara college backpacks compared" id="compare-title" />
          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Feature</span></th>
                  {bagOrder.map((id) => (
                    <th scope="col" key={id}>{bags[id].name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {bagOrder.map((id) => (
                      <td key={id}>{row[id]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mk-section" id="quiz" aria-labelledby="quiz-title">
        <div className="mk-shell">
          <SectionHead eyebrow="Your day, decoded" title="Quiz: Which Mokobara fits your plan?" id="quiz-title" />
          <Quiz />
        </div>
      </section>

      <section className="mk-section mk-section-grey" aria-labelledby="worries-title">
        <div className="mk-shell">
          <SectionHead eyebrow="Before you buy" title="Why students hesitate, and what fixes it" id="worries-title" />
          <div className="worry-grid">
            {hesitations.map(({ title, body, icon: Icon }, i) => (
              <article className="worry-card" key={title}>
                <div className="worry-top">
                  <span className="worry-num">0{i + 1}</span>
                  <Icon strokeWidth={1.3} aria-hidden="true" />
                </div>
                <h3 className="worry-title">{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-dark" id="padel" aria-labelledby="padel-title">
        <div className="mk-shell">
          <SectionHead eyebrow="From class to court" title="What should I carry to my first padel game?" id="padel-title" />
          <div className="answer-block">
            <p>{padelAnswer}</p>
          </div>
          <ul className="checklist" aria-label="First padel game checklist">
            {checklist.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <a className="btn-yellow" href="https://7padel.in" target="_blank" rel="noopener noreferrer">
            Book a court at 7padel.in
          </a>

          <h2 className="section-title faq-subtitle" id="padel-faq-title">Padel bag FAQ.</h2>
          <FaqList items={padelFaqs} prefix="padel" />
        </div>
      </section>

      <section className="mk-section" id="faq" aria-labelledby="faq-title">
        <div className="mk-shell">
          <SectionHead eyebrow="Good to know" title="College backpack FAQ" id="faq-title" />
          <FaqList items={collegeFaqs} prefix="college" />
        </div>
      </section>

      <footer className="mk-footer">
        <div className="mk-shell">
          <p className="wordmark wordmark-invert">mokobara</p>
          <p className="footer-tag">The Joy Is in the Details</p>
          <p className="footer-note">
            Student concept for a Schbang x Atlas SkillTech brief. Not affiliated with or commissioned by
            Mokobara or 7Padel. Product facts from mokobara.com and 7padel.in.
          </p>
        </div>
      </footer>
      </div>

      <a className="float-btn" href="#quiz" aria-label="Take the bag quiz">
        <BriefcaseBusiness aria-hidden="true" />
      </a>
    </main>
  );
}
