import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Droplets,
  Footprints,
  Laptop,
  RotateCcw,
  Shirt,
  ShieldCheck,
  Sparkles,
  Train,
  Wind,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* Every product fact, price and image below comes from mokobara.com (checked 21 Nov 2026).
   Student concept: images are Mokobara's own and link back to the official store. */
const CDN = "https://cdn.shopify.com/s/files/1/0068/7341/5750";
const img = (path: string, w = 900) => `${path}?width=${w}`;

const LOGO = "https://mokobara.com/cdn/shop/files/Mokobara_SVG_White_Logo.svg";
const LIFE = {
  commute: "https://mokobara.com/cdn/shop/files/tz-story-city-commute.webp",
  group: "https://mokobara.com/cdn/shop/files/tz-story-three-up.webp",
  skate: "https://mokobara.com/cdn/shop/files/tz-story-skate.webp",
  ride: "https://mokobara.com/cdn/shop/files/tz-story-flower-ride.webp",
};

type BagId = "overnighter" | "backpackPro" | "backpack16" | "kaleido";

type Bag = {
  name: string;
  badge: string;
  tagline: string;
  price: string;
  mrp: string;
  colours: number;
  image: string;
  alt: string;
  facts: string[];
  url: string;
};

const bags: Record<BagId, Bag> = {
  overnighter: {
    name: "Overnighter Backpack",
    badge: "Class to court",
    tagline: "Packs like a suitcase, carries like a backpack",
    price: "₹8,999",
    mrp: "₹14,999",
    colours: 3,
    image: `${CDN}/files/The-Overnighter-Backpack_2.0_Headspace-1_5d7d9473-adbb-4b42-9714-43961b9644fc.jpg`,
    alt: "Mokobara Overnighter Backpack in Headspace, showing the detachable front sling pocket",
    facts: [
      "Fits a 16\" MacBook, 15.6\" for other laptops",
      "19L, expands to 23L",
      "Front pocket detaches into a sling bag",
      "USB port, air mesh back, padded straps",
    ],
    url: "https://mokobara.com/products/the-overnighter-backpack",
  },
  backpackPro: {
    name: "Backpack Pro 21L",
    badge: "Big laptop",
    tagline: "Everyday laptop backpack with a sleek front zip",
    price: "₹4,999",
    mrp: "₹10,999",
    colours: 5,
    image: `${CDN}/files/The-Backpack-Pro_DD-1.webp`,
    alt: "Mokobara Backpack Pro 21L in Deep Dive blue",
    facts: ["Fits 15.6\" laptops or a 16\" MacBook Pro", "Key holder and card holder up front", "Water-resistant nylon body"],
    url: "https://mokobara.com/products/the-backpack-pro-bags-online",
  },
  backpack16: {
    name: "Backpack 16L",
    badge: "Light",
    tagline: "The clean, lecture-only pick",
    price: "₹3,999",
    mrp: "₹8,999",
    colours: 7,
    image: `${CDN}/products/The-Backpack_DD-1-New.webp`,
    alt: "Mokobara Backpack 16L in Deep Dive blue",
    facts: ["Padded sleeve for a 15\" laptop", "Side pocket zips out to fit a water bottle", "Water-resistant nylon, vegan leather trims"],
    url: "https://mokobara.com/products/the-backpack-bags-online",
  },
  kaleido: {
    name: "Kaleido Backpack",
    badge: "Pocket-friendly",
    tagline: "Front pockets for every daily essential",
    price: "₹3,999",
    mrp: "₹6,999",
    colours: 0,
    image: `${CDN}/products/The-Kaleido-Backpack_Crypto-1_4b719e74-24e9-45e6-8009-08124f010bcc.webp`,
    alt: "Mokobara Kaleido Backpack in black",
    facts: ["Fits up to a 15.6\" laptop", "Microsuede lining keeps your laptop scratch-free", "Mesh side pocket for a bottle or umbrella"],
    url: "https://mokobara.com/products/the-kaleido-backpack",
  },
};

const bagOrder: BagId[] = ["overnighter", "backpackPro", "backpack16", "kaleido"];

const quizQuestions = [
  {
    id: "laptop",
    question: "What size is your laptop?",
    options: [
      { value: "15", label: "Up to 15\"" },
      { value: "16", label: "15.6\" or 16\"" },
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
    id: "style",
    question: "What matters more?",
    options: [
      { value: "light", label: "Light and simple" },
      { value: "pockets", label: "Lots of pockets" },
    ],
  },
] as const;

function pickBag(a: Record<string, string>): BagId {
  if (a.after === "court" || a.after === "weekend") return "overnighter";
  if (a.laptop === "16") return a.style === "pockets" ? "overnighter" : "backpackPro";
  return a.style === "pockets" ? "kaleido" : "backpack16";
}

const padelAnswer =
  "For your first padel game, carry your racket, court shoes, a water bottle, a towel and a change of clothes. Coming straight from class? The Mokobara Overnighter Backpack fits a 16-inch MacBook and expands from 19L to 23L to hold your kit. Then book a court at 7Padel by MS Dhoni on 7padel.in.";

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
    a: "Yes. The Mokobara Overnighter Backpack fits a 16-inch MacBook (15.6-inch for other laptops) and expands from 19L to 23L for shoes, clothes and a towel. Its front pocket detaches into a sling for your phone and keys on court.",
  },
  {
    q: "Do I need a separate bag for a padel racket?",
    a: "Mokobara backpacks are not racket bags, so keep your racket in its own cover. Your laptop, shoes, water bottle and clothes can all go in one Mokobara backpack like the Overnighter.",
  },
  {
    q: "What size bag do I need for padel straight after class?",
    a: "For a laptop plus kit, the expandable 23L Overnighter works. If you only carry a bottle and a towel, the Mokobara Backpack 16L has a side pocket that zips out to fit a water bottle.",
  },
];

/* Replace with the team's real "People also ask" questions from S2. */
const collegeFaqs = [
  {
    q: "What is the best laptop backpack for college?",
    a: "It depends on your day. For lectures only, the Mokobara Backpack 16L fits a 15-inch laptop. If you go somewhere after class, the Overnighter Backpack fits a 16-inch MacBook and expands from 19L to 23L.",
  },
  {
    q: "Which Mokobara backpack fits a 16-inch laptop?",
    a: "The Overnighter Backpack fits a 16-inch MacBook or a 15.6-inch laptop, and the Backpack Pro 21L fits 15.6-inch laptops or a 16-inch MacBook Pro.",
  },
  {
    q: "Are Mokobara backpacks water resistant?",
    a: "The Backpack 16L and Backpack Pro 21L use water-resistant nylon, the Overnighter uses water-resistant vegan leather and nylon, and the Kaleido uses water-resistant polyester.",
  },
  {
    q: "What if the backpack doesn't suit me?",
    a: "Mokobara offers a 30-day trial on mokobara.com: if it isn't the one for you, you can return it for a full refund. Bags also carry a 12-month limited warranty.",
  },
];

const hesitations = [
  {
    title: "Will it fit my laptop?",
    body: "Overnighter: 16\" MacBook. Backpack Pro: 15.6\" or 16\" MacBook Pro. Backpack 16L: 15\".",
    icon: Laptop,
  },
  { title: "Will it hurt on a long commute?", body: "The Overnighter has padded shoulder straps and a breathable air mesh back.", icon: Train },
  { title: "What if I don't like it?", body: "30-day trial with a full refund, plus a 12-month limited warranty on mokobara.com.", icon: ShieldCheck },
];

const comparison: { label: string; values: Record<BagId, string> }[] = [
  { label: "Laptop fit", values: { overnighter: "16\" MacBook / 15.6\"", backpackPro: "15.6\" / 16\" MacBook Pro", backpack16: "15\"", kaleido: "15.6\"" } },
  { label: "Capacity", values: { overnighter: "19L → 23L", backpackPro: "21L", backpack16: "16L", kaleido: "Not listed" } },
  { label: "Bottle pocket", values: { overnighter: "—", backpackPro: "—", backpack16: "Zip-out side pocket", kaleido: "Mesh side pocket" } },
  { label: "Stand-out detail", values: { overnighter: "Detachable sling + USB port", backpackPro: "Key + card holder", backpack16: "Vegan leather trims", kaleido: "Microsuede lining" } },
  { label: "Price*", values: { overnighter: "₹8,999", backpackPro: "₹4,999", backpack16: "₹3,999", kaleido: "₹3,999" } },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mokobara laptop backpacks for college",
  itemListElement: bagOrder.map((id, i) => ({ "@type": "ListItem", position: i + 1, name: bags[id].name, url: bags[id].url, image: bags[id].image })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [{ q: "What should I carry to my first padel game?", a: padelAnswer }, ...padelFaqs, ...collegeFaqs].map(({ q, a }) => ({
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
      { property: "og:image", content: img(LIFE.commute, 1200) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "laptop backpack for college, Mokobara backpack, what to carry to padel" },
    ],
    links: [
      { rel: "preconnect", href: "https://cdn.shopify.com" },
      { rel: "preload", as: "image", href: img(LIFE.commute, 1000) },
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
                onClick={() => {
                  setAnswers((p) => ({ ...p, [quizQuestions[step].id]: opt.value }));
                  setStep((s) => s + 1);
                }}
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
          <div className="quiz-result-tile">
            <img src={img(result.image, 700)} alt={result.alt} loading="lazy" width={700} height={840} />
          </div>
          <div>
            <h3 className="quiz-question">{result.name}</h3>
            <p className="quiz-result-tagline">{result.tagline}</p>
            <ul className="fact-list">
              {result.facts.slice(0, 3).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="price-row">
              <strong>{result.price}</strong> <s>{result.mrp}</s>
            </p>
            <div className="quiz-result-actions">
              <a className="btn-solid" href={result.url} target="_blank" rel="noopener noreferrer">
                View on mokobara.com
              </a>
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
              >
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

function SectionHead({ eyebrow, title, id, link }: { eyebrow: string; title: string; id: string; link?: { href: string; label: string } }) {
  return (
    <div className="section-head">
      <div>
        <p className="pill">{eyebrow}</p>
        <h2 className="section-title" id={id}>
          {/[?.!]$/.test(title) ? title : `${title}.`}
        </h2>
      </div>
      {link && (
        <a className="view-all" href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      )}
    </div>
  );
}

function Index() {
  return (
    <main className="mk-page">
      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              Student concept <b>•</b> The college edit 2026 <b>•</b> From class to court <b>•</b> Shop the real thing on
              mokobara.com <b>•</b>
            </span>
          ))}
        </div>
        <p className="sr-only">Student concept page. Visit the official Mokobara store at mokobara.com.</p>
      </div>

      <header className="mk-sidebar">
        <div className="sidebar-dark">
          <a className="wordmark" href="#top" aria-label="Mokobara college edit, back to top">
            <img src={LOGO} alt="Mokobara" width={130} height={28} />
          </a>
          <nav className="sidebar-nav" aria-label="Page sections">
            <a href="#backpacks">Backpacks</a>
            <a href="#compare">Compare</a>
            <a href="#quiz">Quiz</a>
            <a href="#padel">Padel</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
        <div className="sidebar-light">
          <a href="#quiz">
            Find my bag <ArrowRight aria-hidden="true" />
          </a>
          <a className="official-link" href="https://mokobara.com" target="_blank" rel="noopener noreferrer">
            Official store <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mk-main">
        <section className="hero" id="top" aria-labelledby="page-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="pill">The college edit</p>
              <h1 className="hero-title" id="page-title">
                The best laptop backpack for college, from class to court
              </h1>
              <p className="hero-sub">Campus in the morning. Court after class. One Mokobara that fits both.</p>
              <div className="hero-actions">
                <a className="btn-solid" href="#quiz">
                  Take the 30-second quiz
                </a>
                <a className="arrow-link" href="#padel">
                  First padel game <ArrowRight aria-hidden="true" />
                </a>
              </div>
              <p className="hero-meta">Updated 21 November 2026 · Product facts and prices from mokobara.com</p>
            </div>
            <div className="hero-media">
              <img
                src={img(LIFE.commute, 1000)}
                alt="Student on a city commute wearing a Mokobara backpack"
                width={1000}
                height={1359}
                fetchPriority="high"
              />
              <div className="hero-specs" aria-hidden="true">
                <span>16" MacBook</span>
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
                const b = bags[id];
                return (
                  <article className="product-card" key={id}>
                    <a className="product-tile" href={b.url} target="_blank" rel="noopener noreferrer">
                      <span className="badge">{b.badge}</span>
                      <img src={img(b.image, 700)} alt={b.alt} loading="lazy" width={700} height={840} />
                    </a>
                    <div className="product-body">
                      <h3 className="product-title">{b.name}</h3>
                      <p className="price-row">
                        <strong>{b.price}</strong> <s>{b.mrp}</s>
                        {b.colours > 0 && <span className="colours">{b.colours} colours</span>}
                      </p>
                      <ul className="fact-list">
                        {b.facts.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <a className="product-link" href={b.url} target="_blank" rel="noopener noreferrer">
                        View on mokobara.com
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="price-note">*Prices as shown on mokobara.com on 21 November 2026 and may change.</p>
          </div>
        </section>

        <section className="lifestyle" aria-label="Mokobara backpacks on the go">
          {[
            { src: LIFE.group, alt: "Three friends walking with Mokobara backpacks" },
            { src: LIFE.skate, alt: "Commuter carrying a Mokobara backpack in the city" },
            { src: LIFE.ride, alt: "Rider on a scooter with a Mokobara backpack" },
          ].map((p) => (
            <img key={p.src} src={img(p.src, 700)} alt={p.alt} loading="lazy" width={700} height={952} />
          ))}
          <p className="lifestyle-caption">
            <span className="pill">#GoingPlaces</span>
            Lecture, metro, court, repeat.
          </p>
        </section>

        <section className="mk-section mk-section-grey" id="compare" aria-labelledby="compare-title">
          <div className="mk-shell">
            <SectionHead eyebrow="Side by side" title="Mokobara college backpacks compared" id="compare-title" />
            <div className="table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Feature</span>
                    </th>
                    {bagOrder.map((id) => (
                      <th scope="col" key={id}>
                        {bags[id].name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {bagOrder.map((id) => (
                        <td key={id}>{row.values[id]}</td>
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
                    <Icon strokeWidth={1.4} aria-hidden="true" />
                  </div>
                  <h3 className="worry-title">{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-section mk-section-dark" id="padel" aria-labelledby="padel-title">
          <div className="mk-shell padel-grid">
            <div>
              <SectionHead eyebrow="From class to court" title="What should I carry to my first padel game?" id="padel-title" />
              <div className="answer-block">
                <p>{padelAnswer}</p>
              </div>
              <ul className="checklist" aria-label="First padel game checklist">
                {checklist.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <Icon strokeWidth={1.6} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
              <a className="btn-yellow" href="https://7padel.in" target="_blank" rel="noopener noreferrer">
                Book a court at 7padel.in
              </a>
            </div>
            <figure className="padel-media">
              <img
                src={img(`${CDN}/files/The-Overnighter-Backpack_2.0_Headspace-3_50892455-d978-4cb8-b445-4d9baedfa082.jpg`, 800)}
                alt="Mokobara Overnighter Backpack carried on the shoulder"
                loading="lazy"
                width={800}
                height={960}
              />
              <figcaption>Overnighter Backpack · 19L → 23L</figcaption>
            </figure>
          </div>
          <div className="mk-shell">
            <h2 className="section-title faq-subtitle" id="padel-faq-title">
              Padel bag FAQ.
            </h2>
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
            <img className="footer-logo" src={LOGO} alt="Mokobara" width={180} height={38} loading="lazy" />
            <p className="footer-tag">The Joy Is in the Details · #GoingPlaces</p>
            <a className="btn-yellow" href="https://mokobara.com" target="_blank" rel="noopener noreferrer">
              Visit the official store
            </a>
            <p className="footer-note">
              Student concept for a Schbang x Atlas SkillTech brief. Not affiliated with or commissioned by Mokobara or
              7Padel. Product facts, prices and images belong to Mokobara and are taken from mokobara.com; padel venue
              information from 7padel.in.
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
