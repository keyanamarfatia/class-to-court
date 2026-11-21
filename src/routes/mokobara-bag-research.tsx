import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { catalog } from "@/data/catalog";
import { totals } from "@/components/site/eeat";
import { NextSteps, PageHero, ReadMore, SectionHead, Shell, crumbSchema, faqSchemaFor, img, LIFE, pageHead } from "@/components/site/sections";

const inrN = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* Self-contained, number-rich answers (also published as FAQPage schema). All figures from mokobara.com / 7padel.in, 21 Nov 2026. */
const keyFacts = [
  {
    q: "Which Mokobara backpack fits a 16-inch laptop?",
    a: "Our research found 2 of Mokobara's 4 best college backpacks take a 16-inch MacBook. According to mokobara.com, the Overnighter fits a 16-inch MacBook (15.6 inches for other laptops), expands 21% from 19L to 23L and costs ₹8,999, 40% below its ₹14,999 MRP. The Backpack Pro 21L fits a 16-inch MacBook Pro for ₹4,999, 55% off.",
    bullets: ["Overnighter: 16-inch MacBook, 19L → 23L, ₹8,999 (40% off)", "Backpack Pro 21L: 16-inch MacBook Pro, ₹4,999 (55% off)", "Source: mokobara.com, 21 Nov 2026"]
  },
  {
    q: "How much does a Mokobara bag cost for students?",
    a: `In our own research, we went through all ${totals.products} Mokobara laptop bags, travel backpacks and cabin suitcases listed on mokobara.com on 21 November 2026 and compared every price and spec ourselves. Prices ranged from ${inrN(totals.min)} for the 14-inch Aisle Laptop Sleeve to ${inrN(totals.max)} for the Cabin Pro, and the Backpack 16L, Kaleido and Spacewalk backpacks all cost ₹3,999.`,
    bullets: ["Cheapest: Aisle Laptop Sleeve 14-inch, ₹999", "Most expensive: Cabin Pro, ₹13,599", "3 backpacks at ₹3,999: Backpack 16L, Kaleido, Spacewalk"]
  },
  {
    q: "Which Mokobara cabin bag is lightest?",
    a: "Our comparison of all 10 Mokobara cabin suitcases found the Aviator Cabin Luggage is the lightest at 2 kg, about 39% lighter than the 3.27 kg Cabin Luggage, and it holds 37L. Cabin capacities range from 37L to 44L, and 6 of the 10 models (60%) list a laptop compartment of 14 to 15.6 inches, per mokobara.com.",
    bullets: ["Lightest: Aviator, 2 kg, 37L, ₹4,499", "Heaviest listed: Cabin Pro and Aisle Cabin Pro, 3.65 kg", "Laptop compartment: 6 of 10 models (60%)"]
  },
  {
    q: "What does a new padel player need?",
    a: "Our checklist for a first padel game has 5 items: court shoes, a water bottle, a towel, a change of clothes and a racket, which 7Padel by MS Dhoni rents along with balls, per 7padel.in. Its venues add showers, changing rooms and air-conditioned indoor courts, so 1 Mokobara backpack of 19L to 23L covers class and court.",
    bullets: ["5 items: court shoes, bottle, towel, clothes, racket", "Rent: rackets and balls at 7Padel by MS Dhoni", "1 bag: Mokobara Overnighter, 19L → 23L"]
  },
];

const collectionFacts = (() => {
  const by = (id: string) => catalog.find((c) => c.id === id)!;
  const stat = (id: string) => {
    const items = by(id).items as readonly { price: number; laptop?: string; name: string }[];
    const prices = items.map((i) => i.price);
    return { n: items.length, min: Math.min(...prices), max: Math.max(...prices), lap: items.filter((i) => i.laptop).length };
  };
  const cab = stat("cabin"), lap = stat("laptop"), trv = stat("travel");
  const pct = (a: number, b: number) => Math.round((a / b) * 100);
  return [
    {
      path: "/cabin-luggage", label: "cabin bags", count: cab.n,
      bullets: [`${cab.n} models, ${inrN(cab.min)}–${inrN(cab.max)}`, "Capacity: 37L–44L", `Laptop compartment: ${cab.lap} of ${cab.n} (${pct(cab.lap, cab.n)}%)`],
      q: "What cabin luggage does Mokobara sell?",
      a: `Our research counted ${cab.n} Mokobara cabin suitcases on mokobara.com on 21 November 2026, priced from ${inrN(cab.min)} to ${inrN(cab.max)}. They hold 37L to 44L, and ${cab.lap} of ${cab.n} (${pct(cab.lap, cab.n)}%) list a laptop compartment, which makes them the pick for students flying home with a laptop.`,
    },
    {
      path: "/laptop-bags", label: "laptop bags", count: lap.n,
      bullets: [`${lap.n} bags, ${inrN(lap.min)}–${inrN(lap.max)}`, "Laptop fit: 14 to 16 inches", "16-inch laptop: 5 bags"],
      q: "How many Mokobara laptop bags are there?",
      a: `We found ${lap.n} Mokobara laptop backpacks, briefcases and sleeves on mokobara.com, from ${inrN(lap.min)} for the 14-inch Aisle Laptop Sleeve to ${inrN(lap.max)}. ${lap.lap} of ${lap.n} (${pct(lap.lap, lap.n)}%) list a laptop size, from 14 to 16 inches, and 5 of them take a 16-inch laptop.`,
    },
    {
      path: "/travel-backpacks", label: "travel backpacks", count: trv.n,
      bullets: [`${trv.n} backpacks, ${inrN(trv.min)}–${inrN(trv.max)}`, "Transit 30L: 1–2 day trips, ₹4,999", "Overnighter: 19L → 23L"],
      q: "Which Mokobara backpacks are best for weekend trips?",
      a: `Our comparison covers ${trv.n} Mokobara travel backpacks priced ${inrN(trv.min)} to ${inrN(trv.max)} on mokobara.com. The Transit Backpack 30L is built for 1 to 2 day trips at ₹4,999, 50% below MRP, and the Overnighter expands from 19L to 23L for a weekend away.`,
    },
  ];
})();


export const Route = createFileRoute("/mokobara-bag-research")({
  head: () =>
    pageHead({
      path: "/mokobara-bag-research",
      title: `We Compared All ${totals.products} Mokobara Bags (2026): Prices, Laptop Fit, Weight`,
      description: `Our original comparison of ${totals.products} Mokobara cabin bags, travel backpacks and laptop bags from mokobara.com: prices, laptop fit, capacity and weight.`,
      image: img(LIFE.group, 1200),
      schemas: [faqSchemaFor([...keyFacts, ...collectionFacts]), crumbSchema("Our research", "/mokobara-bag-research")],
    }),
  component: Research,
});

function Research() {
  return (
    <Shell>
      <PageHero
        crumb="Our research"
        eyebrow="The College Edit research"
        title={`What we found comparing ${totals.products} Mokobara bags`}
        intro="Every Mokobara cabin bag, travel backpack and laptop bag listed on mokobara.com on 21 November 2026, compared on price, laptop fit, capacity and weight."
      />
        <section className="mk-section key-facts" aria-labelledby="facts-title">
          <div className="mk-shell">
            <p className="pill">Key facts</p>
            <h2 className="section-title" id="facts-title">
              What did we find comparing {totals.products} Mokobara bags?
            </h2>
            <ul className="stat-tiles">
              <li><b>{totals.products}</b><span>bags compared</span></li>
              <li><b>{inrN(totals.min)}–{inrN(totals.max)}</b><span>price range</span></li>
              <li><b>6 of 10</b><span>cabin bags fit a laptop</span></li>
              <li><b>65%</b><span>max off MRP (Aviator)</span></li>
            </ul>
            <ReadMore label="How we compared them">
            <div className="facts-intro">
              <p>
                <strong>The Mokobara College Edit</strong> is our original comparison of all {totals.products} Mokobara
                laptop bags, travel backpacks and cabin suitcases listed on mokobara.com on 21 November 2026. As college
                students in Mumbai ourselves, we went through every listing first-hand. In our experience, the real question is
                which one bag lasts the whole day, and our research found:
              </p>
              <ul>
                <li><strong>{totals.products} products</strong> priced from {inrN(totals.min)} to {inrN(totals.max)}</li>
                <li><strong>5 laptop bags</strong> that take a 16-inch laptop</li>
                <li><strong>6 of 10 cabin bags</strong> (60%) with a laptop compartment</li>
                <li><strong>Up to 65% off MRP</strong> on the Aviator Cabin Luggage (₹4,499)</li>
              </ul>
            </div>
            </ReadMore>
            <div className="facts-grid">
              {keyFacts.map((f) => (
                <article key={f.q}>
                  <h3>{f.q}</h3>
                  <ul className="facts-list">
                    {f.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <ReadMore><p>{f.a}</p></ReadMore>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="mk-section mk-section-grey" id="shop" aria-labelledby="shop-title">
          <div className="mk-shell">
            <SectionHead eyebrow="Shop the range" title="Which Mokobara collection should I shop?" id="shop-title" />
            <div className="facts-grid">
              {collectionFacts.map((c) => (
                <article key={c.path}>
                  <h3>{c.q}</h3>
                  <ul className="facts-list">
                    {c.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <ReadMore><p>{c.a}</p></ReadMore>
                  <Link className="arrow-link" to={c.path}>
                    See all {c.count} {c.label} <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      <NextSteps hide="/mokobara-bag-research" />
    </Shell>
  );
}
