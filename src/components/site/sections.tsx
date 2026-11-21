import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { Byline, articleSchema, eeatMeta } from "./eeat";
import {
  ArrowRight,
  BriefcaseBusiness,
  Pause,
  Play,
  Droplets,
  Footprints,
  Laptop,
  MapPin,
  RotateCcw,
  Shirt,
  ShieldCheck,
  Sparkles,
  Train,
  Wind,
} from "lucide-react";
import { catalog, SITE } from "@/data/catalog";
import { CatalogCard } from "@/components/site/catalog-card";
import { FloatBtn, SiteFooter, Ticker, TopBar } from "@/components/site/chrome";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* Every product fact, price and image below comes from mokobara.com (checked 21 Nov 2026).
   Student concept: images are Mokobara's own and link back to the official store. */
export const CDN = "https://cdn.shopify.com/s/files/1/0068/7341/5750";
export const img = (path: string, w = 900) => `${path}?width=${w}`;
export const srcSet = (path: string, widths: number[]) => widths.map((w) => `${path}?width=${w} ${w}w`).join(", ");

export const LOGO = "https://mokobara.com/cdn/shop/files/Mokobara_SVG_White_Logo.svg";
export const VIDEO = {
  hero: "https://mokobara.com/cdn/shop/videos/c/o/v/002646c7804e467fa65902775d78aa7f.mp4",
  goingPlaces:
    "https://mokobara.com/cdn/shop/videos/c/vp/cab38b3c736c4d4aaaab767c62f5a465/cab38b3c736c4d4aaaab767c62f5a465.HD-720p-4.5Mbps-96094946.mp4",
};

export const LIFE = {
  commute: "https://mokobara.com/cdn/shop/files/tz-story-city-commute.webp",
  group: "https://mokobara.com/cdn/shop/files/tz-story-three-up.webp",
  skate: "https://mokobara.com/cdn/shop/files/tz-story-skate.webp",
  ride: "https://mokobara.com/cdn/shop/files/tz-story-flower-ride.webp",
};

export type BagId = "overnighter" | "backpackPro" | "backpack16" | "kaleido";

export type Bag = {
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

export const bags: Record<BagId, Bag> = {
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

export const bagOrder: BagId[] = ["overnighter", "backpackPro", "backpack16", "kaleido"];

export const quizQuestions = [
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

export function pickBag(a: Record<string, string>): BagId {
  if (a.after === "court" || a.after === "weekend") return "overnighter";
  if (a.laptop === "16") return a.style === "pockets" ? "overnighter" : "backpackPro";
  return a.style === "pockets" ? "kaleido" : "backpack16";
}

export const padelAnswer =
  "For your first padel game, carry court shoes, a water bottle, a towel and a change of clothes. No racket yet? 7Padel by MS Dhoni rents rackets and balls and has changing rooms. Coming straight from class? The Mokobara Overnighter Backpack fits a 16-inch MacBook and expands from 19L to 23L to hold your kit.";

export const OV = `${CDN}/files/The-Overnighter-Backpack_2.0_Headspace`;
export const details = [
  { src: `${OV}-3_50892455-d978-4cb8-b445-4d9baedfa082.jpg`, title: "Front pocket turns into a sling", body: "Unclip it and carry just your phone, cards and keys to the court.", alt: "Overnighter front pocket detaching into a sling bag" },
  { src: `${OV}-7_2d6d6e9c-2342-4eb0-b931-b72851438572.jpg`, title: "19L to 23L when you need it", body: "Expand the body after class to fit shoes, a towel and a change of clothes.", alt: "Overnighter expanding from 19L to 23L" },
  { src: `${OV}-8_ad360e32-50b9-4c2d-beb0-918bbbd61166.jpg`, title: "Flat-opening tech compartment", body: "Laptop, iPad, books and chargers sit in their own padded section.", alt: "Overnighter flat-opening tech compartment with microsuede lining" },
  { src: `${OV}-10_dd0eb0e4-54a4-486a-99b1-40606551b06f.jpg`, title: "Built for the long commute", body: "Breathable air mesh back and padded, adjustable shoulder straps.", alt: "Overnighter air mesh back panel and padded shoulder straps" },
];

/* Mumbai stores as listed on the mokobara.com homepage, 21 Nov 2026. */
export const mumbaiStores = [
  "Ballard Pier",
  "Linking Road, Khar West",
  "Phoenix Palladium",
  "Oberoi Mall",
  "R City",
  "Phoenix Market City, Kurla",
  "Nexus Seawoods",
  "T2 International, Mumbai Airport",
];

export const sevenPadel = ["Air-conditioned indoor arenas", "Racket and ball rental", "Shower and changing rooms", "Night lighting for evening games"];

export const checklist = [
  { label: "Racket (or rent one)", icon: Sparkles },
  { label: "Court shoes", icon: Footprints },
  { label: "Water bottle", icon: Droplets },
  { label: "Towel", icon: Wind },
  { label: "Change of clothes", icon: Shirt },
];

export const padelFaqs = [
  {
    q: "Can one bag carry my laptop and padel kit?",
    a: "Yes. The Mokobara Overnighter Backpack fits a 16-inch MacBook (15.6-inch for other laptops) and expands from 19L to 23L for shoes, clothes and a towel. Its front pocket detaches into a sling for your phone and keys on court.",
  },
  {
    q: "Do I need a separate bag for a padel racket?",
    a: "Mokobara backpacks are not racket bags, so keep your racket in its own cover, or rent one: 7Padel offers racket and ball rental. Your laptop, shoes, water bottle and clothes can all go in one Mokobara backpack like the Overnighter.",
  },
  {
    q: "What size bag do I need for padel straight after class?",
    a: "For a laptop plus kit, the expandable 23L Overnighter works. If you only carry a bottle and a towel, the Mokobara Backpack 16L has a side pocket that zips out to fit a water bottle.",
  },
  {
    q: "Can I change after my padel game?",
    a: "Yes. 7Padel lists shower and changing rooms among its facilities. Pack a change of clothes in the Mokobara Overnighter's suitcase-style front compartment and head out straight from the court.",
  },
];

/* Replace with the team's real "People also ask" questions from S2. */
export const collegeFaqs = [
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

export const hesitations = [
  {
    title: "Will it fit my laptop?",
    body: "Overnighter: 16\" MacBook. Backpack Pro: 15.6\" or 16\" MacBook Pro. Backpack 16L: 15\".",
    icon: Laptop,
  },
  { title: "Will it hurt on a long commute?", body: "The Overnighter has padded shoulder straps and a breathable air mesh back.", icon: Train },
  { title: "What if I don't like it?", body: "30-day trial with a full refund, plus a 12-month limited warranty on mokobara.com.", icon: ShieldCheck },
];

export const comparison: { label: string; values: Record<BagId, string> }[] = [
  { label: "Laptop fit", values: { overnighter: "16\" MacBook / 15.6\"", backpackPro: "15.6\" / 16\" MacBook Pro", backpack16: "15\"", kaleido: "15.6\"" } },
  { label: "Capacity", values: { overnighter: "19L → 23L", backpackPro: "21L", backpack16: "16L", kaleido: "28L" } },
  { label: "Bottle pocket", values: { overnighter: "—", backpackPro: "—", backpack16: "Zip-out side pocket", kaleido: "Mesh side pocket" } },
  { label: "Stand-out detail", values: { overnighter: "Detachable sling + USB port", backpackPro: "Key + card holder", backpack16: "Vegan leather trims", kaleido: "Microsuede lining" } },
  { label: "Price", values: { overnighter: "₹8,999", backpackPro: "₹4,999", backpack16: "₹3,999", kaleido: "₹3,999" } },
];

export const visualCompare: Record<BagId, { laptop: string; laptopNote: string; litres: number | null; litresLabel: string; bottle: boolean; highlight: string }> = {
  overnighter: { laptop: "16\"", laptopNote: "MacBook · 15.6\" others", litres: 23, litresLabel: "19L → 23L", bottle: false, highlight: "Detachable sling + USB port" },
  backpackPro: { laptop: "16\"", laptopNote: "MacBook Pro · 15.6\" others", litres: 21, litresLabel: "21L", bottle: false, highlight: "Key + card holder" },
  backpack16: { laptop: "15\"", laptopNote: "laptop sleeve", litres: 16, litresLabel: "16L", bottle: true, highlight: "Vegan leather trims" },
  kaleido: { laptop: "15.6\"", laptopNote: "laptop sleeve", litres: 28, litresLabel: "28L", bottle: true, highlight: "Microsuede lining" },
};

export const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mokobara laptop backpacks for college",
  itemListElement: bagOrder.map((id, i) => ({ "@type": "ListItem", position: i + 1, name: bags[id].name, url: bags[id].url, image: bags[id].image })),
};

export const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mokobara laptop bags, travel backpacks and cabin luggage",
  itemListElement: catalog
    .flatMap((g) => g.items)
    .filter((it, i, arr) => arr.findIndex((x) => x.handle === it.handle) === i)
    .map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `https://mokobara.com/products/${it.handle}` })),
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [{ q: "What should I carry to my first padel game?", a: padelAnswer }, ...padelFaqs, ...collegeFaqs].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export const description =
  "Fits a 16\" laptop, survives the commute, expands for the weekend. Find the Mokobara backpack that fits your college day. Take the 30-second quiz.";

/* Performance: the poster <img> paints first (it is the LCP element). The video file is only
   attached after the page has loaded (hero) or when it scrolls near the viewport (lazy), and
   never on Save-Data connections or with reduced motion. */
export function BgVideo({
  src,
  poster,
  className,
  label,
  lazy = false,
  priority = false,
}: {
  src: string;
  poster: string;
  className?: string;
  label: string;
  lazy?: boolean;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const start = () => {
      if (v.src) return;
      v.src = src;
      v.play().then(() => setPlaying(true)).catch(() => {});
    };
    if (lazy) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
            io.disconnect();
          }
        },
        { rootMargin: "200px" },
      );
      io.observe(v);
      return () => io.disconnect();
    }
    // Phones: wait for the first scroll/tap (or 4s) so the video never competes with first paint.
    const small = window.matchMedia("(max-width: 759px)").matches;
    const kick = () => {
      if (!small) return void setTimeout(start, 600);
      const go = () => {
        cleanup();
        start();
      };
      const t = setTimeout(go, 4000);
      const evs = ["scroll", "touchstart", "pointerdown", "keydown"] as const;
      const cleanup = () => {
        clearTimeout(t);
        evs.forEach((e) => window.removeEventListener(e, go));
      };
      evs.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    return () => window.removeEventListener("load", kick);
  }, [src, lazy]);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.src) v.src = src;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    <>
      <img
        className={className}
        src={img(poster, 1000)}
        srcSet={srcSet(poster, [480, 750, 1000, 1400])}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1400}
        height={1904}
        {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
        decoding="async"
      />
      <video
        ref={ref}
        className={`${className ?? ""} bg-video${ready ? " is-ready" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => setReady(true)}
      />
      <button type="button" className="video-toggle" onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
    </>
  );
}

export function Quiz() {
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
            <img src={img(result.image, 600)} srcSet={srcSet(result.image, [360, 600, 800])} sizes="(min-width: 1024px) 40vw, 90vw" alt={result.alt} loading="lazy" decoding="async" width={600} height={720} />
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
              <a className="btn-solid" href={result.url} target="_blank" rel="noopener noreferrer" aria-label={`View on mokobara.com: ${result.name}`}>
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

export function Catalog() {
  const [tab, setTab] = useState<(typeof catalog)[number]["id"]>("cabin");
  const group = catalog.find((g) => g.id === tab)!;
  const shown = group.items.slice(0, 8);
  return (
    <>
      <div className="cat-tabs" role="tablist" aria-label="Product categories">
        {catalog.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={tab === g.id}
            className={tab === g.id ? "active" : ""}
            onClick={() => {
              setTab(g.id);
            }}
          >
            {g.label} <span>{g.items.length}</span>
          </button>
        ))}
      </div>
      <h3 className="cat-heading">
        {group.label} <span>· {group.eyebrow}</span>
      </h3>
      <div className="cat-grid" role="tabpanel">
        {shown.map((item) => (
          <CatalogCard key={item.handle} item={item} />
        ))}
      </div>
      <Link className="btn-solid cat-more" to={group.path}>
        View all {group.items.length} {group.label.toLowerCase()}
      </Link>
      <p className="price-note">
        Prices, colours and specs as listed on mokobara.com on 21 November 2026. Discounts are calculated from Mokobara's listed MRP.
      </p>
    </>
  );
}

export function FaqList({ items, prefix }: { items: { q: string; a: string }[]; prefix: string }) {
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

export function SectionHead({ eyebrow, title, id, link }: { eyebrow: string; title: string; id: string; link?: { href: string; label: string } }) {
  return (
    <div className="section-head">
      <div>
        <p className="pill">{eyebrow}</p>
        <h2 className="section-title" id={id}>
          {/[?.!]$/.test(title) ? title : `${title}.`}
        </h2>
      </div>
      {link && (
        <a className="view-all" href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link.label}
        </a>
      )}
    </div>
  );
}


export function CompareSection() {
  return (
    <>
  <section className="mk-section mk-section-grey" id="compare" aria-labelledby="compare-title">
    <div className="mk-shell">
      <SectionHead eyebrow="Side by side" title="Mokobara college backpacks compared" id="compare-title" />
      <div className="vs-grid">
        {bagOrder.map((id) => {
          const b = bags[id];
          const v = visualCompare[id];
          return (
            <article className={`vs-card${id === "overnighter" ? " vs-card-top" : ""}`} key={id}>
              {id === "overnighter" && <span className="vs-flag">Our pick</span>}
              <div className="vs-head">
                <img src={img(b.image, 160)} srcSet={srcSet(b.image, [80, 160])} sizes="64px" alt="" loading="lazy" decoding="async" width={160} height={192} />
                <div>
                  <h3>{b.name}</h3>
                  <p className="vs-price">{b.price}<s>{b.mrp}</s></p>
                </div>
              </div>
              <div className="vs-stat">
                <Laptop aria-hidden="true" />
                <div>
                  <b>{v.laptop}</b>
                  <span>{v.laptopNote}</span>
                </div>
              </div>
              <div className="vs-cap">
                <div className="vs-cap-top">
                  <span>Capacity</span>
                  <b>{v.litresLabel}</b>
                </div>
                <div className="vs-bar" aria-hidden="true">
                  <span style={{ width: v.litres ? `${(v.litres / 28) * 100}%` : "0%" }} />
                </div>
              </div>
              <ul className="vs-chips">
                <li className={v.bottle ? "yes" : "no"}>
                  <Droplets aria-hidden="true" /> {v.bottle ? "Bottle pocket" : "No bottle pocket"}
                </li>
                <li className="yes">
                  <Sparkles aria-hidden="true" /> {v.highlight}
                </li>
              </ul>
            </article>
          );
        })}
      </div>
      <p className="price-note">*Prices as shown on mokobara.com on 21 November 2026 and may change. Capacity bar is relative to the largest bag shown (28L).</p>
    </div>
  </section>
    </>
  );
}

export function DetailsSection() {
  return (
    <>
  <section className="mk-section" id="details" aria-labelledby="details-title">
    <div className="mk-shell">
      <SectionHead
        eyebrow="Overnighter, up close"
        title="The joy is in the details"
        id="details-title"
        link={{ href: bags.overnighter.url, label: "Shop Overnighter" }}
      />
      <div className="detail-grid">
        {details.map((d) => (
          <figure className="detail-card" key={d.title}>
            <img src={img(d.src, 500)} srcSet={srcSet(d.src, [300, 500, 700])} sizes="(min-width: 1024px) 23vw, (min-width: 760px) 45vw, 74vw" alt={d.alt} loading="lazy" decoding="async" width={500} height={600} />
            <figcaption>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
    </>
  );
}

export function QuizSSection() {
  return (
    <>
  <section className="mk-section mk-section-grey" id="quiz" aria-labelledby="quiz-title">
    <div className="mk-shell">
      <SectionHead eyebrow="Your day, decoded" title="Quiz: Which Mokobara fits your plan?" id="quiz-title" />
      <Quiz />
    </div>
  </section>
    </>
  );
}

export function WorriesSection() {
  return (
    <>
  <section className="mk-section" aria-labelledby="worries-title">
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
    </>
  );
}

export function PadelSection() {
  return (
    <>
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
        <div className="facility-box">
          <p className="facility-title">At 7Padel by MS Dhoni</p>
          <ul>
            {sevenPadel.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <a className="btn-yellow" href="https://7padel.in" target="_blank" rel="noopener noreferrer">
          Book a court at 7padel.in
        </a>
      </div>
      <figure className="padel-media">
        <img
          src={img(`${OV}-4_a42119ab-983a-45f1-b250-9bfa66de0c62.jpg`, 600)}
                srcSet={srcSet(`${OV}-4_a42119ab-983a-45f1-b250-9bfa66de0c62.jpg`, [400, 600, 800])}
                sizes="(min-width: 760px) 40vw, 92vw"
                decoding="async"
          alt="Two people wearing the Mokobara Overnighter Backpack"
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
    </>
  );
}

export function MumbaiSection() {
  return (
    <>
  <section className="mk-section mk-section-yellow" id="mumbai" aria-labelledby="mumbai-title">
    <div className="mk-shell mumbai-grid">
      <div>
        <p className="pill pill-dark">Mumbai</p>
        <h2 className="section-title" id="mumbai-title">
          Try it on in Mumbai, then hit the court.
        </h2>
        <p className="mumbai-text">
          Not sure about fit? Pack your laptop and try the Overnighter at a Mokobara store before you buy. Then find
          your nearest 7Padel court on 7padel.in.
        </p>
        <div className="hero-actions">
          <a className="btn-solid" href="https://mokobara.com" target="_blank" rel="noopener noreferrer">
            Find a store
          </a>
          <a className="arrow-link" href="https://7padel.in" target="_blank" rel="noopener noreferrer">
            Book 7Padel <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <ul className="store-list" aria-label="Mokobara stores in Mumbai">
        {mumbaiStores.map((st) => (
          <li key={st}>
            <MapPin aria-hidden="true" />
            {st}
          </li>
        ))}
      </ul>
    </div>
  </section>
    </>
  );
}

export function CollegeFaqSection() {
  return (
    <>
  <section className="mk-section" id="faq" aria-labelledby="faq-title">
    <div className="mk-shell">
      <SectionHead eyebrow="Good to know" title="College backpack FAQ" id="faq-title" />
      <FaqList items={collegeFaqs} prefix="college" />
    </div>
  </section>
    </>
  );
}

export function PageHero({ crumb, eyebrow, title, intro }: { crumb: string; eyebrow: string; title: string; intro: string }) {
  return (
    <section className="col-hero">
      <div className="mk-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">College edit</Link> <span aria-hidden="true">/</span> <span>{crumb}</span>
        </nav>
        <p className="pill">{eyebrow}</p>
        <h1 className="col-title">{title}</h1>
        <p className="col-intro">{intro}</p>
        <Byline />
      </div>
    </section>
  );
}

export function NextSteps({ hide }: { hide?: string }) {
  const items = [
    { to: "/cabin-luggage", label: "Cabin luggage" },
    { to: "/laptop-bags", label: "Laptop bags" },
    { to: "/compare-backpacks", label: "Compare backpacks" },
    { to: "/bag-finder-quiz", label: "Bag finder quiz" },
    { to: "/what-to-carry-to-padel", label: "Padel guide" },
    { to: "/faq", label: "FAQ" },
    { to: "/about", label: "About this site" },
  ].filter((i) => i.to !== hide);
  return (
    <section className="mk-section next-steps" aria-label="Keep exploring">
      <div className="mk-shell">
        <p className="pill">Keep exploring</p>
        <div className="col-switch">
          {items.map((i) => (
            <Link key={i.to} to={i.to}>
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const faqSchemaFor = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const crumbSchema = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "College edit", item: "https://class-to-court-carry.lovable.app/" },
    { "@type": "ListItem", position: 2, name, item: "https://class-to-court-carry.lovable.app" + path },
  ],
});

export function pageHead(o: { path: string; title: string; description: string; image: string; schemas: object[] }) {
  const url = "https://class-to-court-carry.lovable.app" + o.path;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: o.title },
      { name: "description", content: o.description },
      { property: "og:title", content: o.title },
      { property: "og:description", content: o.description },
      { property: "og:url", content: url },
      { property: "og:image", content: o.image },
      { name: "twitter:card", content: "summary_large_image" },
      ...eeatMeta,
    ],
    scripts: [articleSchema({ path: o.path, headline: o.title, description: o.description, image: o.image }), ...o.schemas].map((s) => ({
      type: "application/ld+json",
      children: JSON.stringify(s),
    })),
  };
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mk-page">
      <Ticker />
      <TopBar />
      {children}
      <SiteFooter />
      <FloatBtn />
    </main>
  );
}
