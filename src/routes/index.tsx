import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITE, catalog } from "@/data/catalog";
import { Byline, articleSchema, eeatMeta, offerSchema, organizationSchema, productSchema, totals, websiteSchema } from "@/components/site/eeat";
import { crumbSchema, faqSchemaFor } from "@/components/site/sections";
import { FloatBtn, SiteFooter, Ticker, TopBar } from "@/components/site/chrome";
import {
  BgVideo,
  DetailsSection,
  LIFE,
  MumbaiSection,
  SectionHead,
  VIDEO,
  bagOrder,
  bags,
  catalogSchema,
  description,
  img,
  itemListSchema,
  srcSet,
  padelAnswer,
} from "@/components/site/sections";

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

const explore = [
  { to: "/compare-backpacks", num: "01", title: "Compare backpacks", body: "Overnighter vs Backpack Pro vs 16L vs Kaleido: laptop fit, capacity and price at a glance.", cta: "Compare" },
  { to: "/bag-finder-quiz", num: "02", title: "Bag finder quiz", body: "Three questions about your laptop and your day. One Mokobara that fits.", cta: "Take the quiz" },
  { to: "/what-to-carry-to-padel", num: "03", title: "First padel game guide", body: "What to pack from class to court, and where to play at 7Padel by MS Dhoni.", cta: "Read the guide" },
  { to: "/faq", num: "04", title: "College backpack FAQ", body: "Laptop fit, water resistance, the 30-day trial and the warranty, answered.", cta: "Read the FAQ" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Bag for a Weekend Trip (2026): Mokobara Travel Bags" },
      { name: "description", content: description },
      { property: "og:title", content: "Best Bag for a Weekend Trip (2026): Mokobara Travel Bags" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE + "/" },
      { property: "og:image", content: img(LIFE.commute, 1200) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "best bag for a weekend trip, weekend travel bag, cabin size bag, Mokobara travel bags, what to carry to padel" },
      ...eeatMeta,
    ],
    links: [
      { rel: "canonical", href: SITE + "/" },
      { rel: "preconnect", href: "https://cdn.shopify.com" },
      { rel: "preconnect", href: "https://mokobara.com" },
      { rel: "preload", as: "image", href: img(LIFE.commute, 1000), imageSrcSet: srcSet(LIFE.commute, [480, 750, 1000, 1400]), imageSizes: "100vw", fetchPriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchemaFor([...keyFacts, { q: "What should I carry to my first padel game?", a: padelAnswer }])),
      },
      { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          articleSchema({ path: "/", headline: "The best bag for a weekend trip, from class to court", description, image: img(LIFE.commute, 1200) }),
        ),
      },
      ...bagOrder.map((id) => ({
        type: "application/ld+json",
        children: JSON.stringify(
          productSchema({ name: `Mokobara ${bags[id].name}`, image: bags[id].image, url: bags[id].url, price: Number(bags[id].price.replace(/[^\d]/g, "")), description: bags[id].facts.join(". ") }),
        ),
      })),
      ...bagOrder.map((id) => ({
        type: "application/ld+json",
        children: JSON.stringify(offerSchema({ name: `Mokobara ${bags[id].name}`, url: bags[id].url, price: Number(bags[id].price.replace(/[^\d]/g, "")) })),
      })),
      { type: "application/ld+json", children: JSON.stringify({ ...crumbSchema("Best bag for a weekend trip", "/"), itemListElement: [{ "@type": "ListItem", position: 1, name: "College edit", item: SITE + "/" }] }) },
      { type: "application/ld+json", children: JSON.stringify(itemListSchema) },
      { type: "application/ld+json", children: JSON.stringify(catalogSchema) },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <main className="mk-page">
      <Ticker />
      <TopBar home />

      <div className="mk-main">
        <section className="hero-video" id="top" aria-labelledby="page-title">
          <BgVideo src={VIDEO.hero} poster={LIFE.commute} className="hero-video-media" label="background video" priority />
          <div className="hero-video-shade" aria-hidden="true" />
          <div className="hero-video-content">
            <p className="pill">The college edit</p>
            <h1 className="hero-title" id="page-title">
              The best bag for a weekend trip, from class to court
            </h1>
            <div className="hero-actions">
              <Link className="btn-yellow" to="/bag-finder-quiz">
                Take the 30-second quiz
              </Link>
            </div>
          </div>
          <a className="scroll-cue" href="#backpacks" aria-label="Scroll to the backpacks">
            <span />
          </a>
        </section>

        <section className="quick-answer mk-shell" aria-labelledby="quick-title">
          <p className="pill">Short answer</p>
          <h2 id="quick-title" className="sr-only">
            Short answer: the best Mokobara bag for a weekend trip
          </h2>
          <p className="quick-text">
            <strong>The best bag for a weekend trip is the Mokobara Overnighter Backpack.</strong> Our 2026 analysis of
            40 Mokobara bags found it fits a 16-inch MacBook, expands 21% from 19L to 23L and costs ₹8,999, 40% below MRP,
            according to mokobara.com. For lectures only, the <strong>Backpack 16L</strong> fits a 15-inch laptop for
            ₹3,999, 56% off.
          </p>
          <ul className="quick-stats">
            <li><b>16"</b><span>MacBook fit</span></li>
            <li><b>23L</b><span>Expanded</span></li>
            <li><b>30 days</b><span>Trial on mokobara.com</span></li>
            <li><b>12 mo</b><span>Limited warranty</span></li>
          </ul>
          <Byline />
        </section>

        <section className="mk-section key-facts" aria-labelledby="facts-title">
          <div className="mk-shell">
            <p className="pill">Key facts</p>
            <h2 className="section-title" id="facts-title">
              What did we find comparing {totals.products} Mokobara bags?
            </h2>
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
            <div className="facts-grid">
              {keyFacts.map((f) => (
                <article key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                  <ul className="facts-list">
                    {f.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-section" id="backpacks" aria-labelledby="products-title">
          <div className="mk-shell">
            <SectionHead
              eyebrow="The shortlist"
              title="Which Mokobara fits your college day?"
              id="products-title"
              link={{ href: "/laptop-bags", label: "View all laptop bags" }}
            />
            <div className="product-row">
              {bagOrder.map((id) => {
                const b = bags[id];
                return (
                  <article className="product-card" key={id}>
                    <a className="product-tile" href={b.url} target="_blank" rel="noopener noreferrer">
                      <span className="badge">{b.badge}</span>
                      <img src={img(b.image, 500)} srcSet={srcSet(b.image, [300, 500, 700])} sizes="(min-width: 1024px) 23vw, (min-width: 760px) 45vw, 74vw" alt={b.alt} loading="lazy" decoding="async" width={500} height={600} />
                    </a>
                    <div className="product-body">
                      <h3 className="product-title">Is the {b.name} right for you?</h3>
                      <p className="cat-summary">{b.summary}</p>
                      <p className="price-row">
                        <strong>{b.price}</strong> <s>{b.mrp}</s>
                        {b.colours > 0 && <span className="colours">{b.colours} colours</span>}
                      </p>
                      <ul className="fact-list">
                        {b.facts.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <a className="product-link" href={b.url} target="_blank" rel="noopener noreferrer" aria-label={`View on mokobara.com: ${b.name}`}>
                        View on mokobara.com
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="price-note">*Prices as shown on mokobara.com on 21 November 2026 and may change.</p>
            <div className="table-wrap home-table">
              <table className="compare-table">
                <caption>Mokobara college backpacks at a glance (mokobara.com, 21 November 2026)</caption>
                <thead>
                  <tr>
                    <th scope="col">Backpack</th>
                    <th scope="col">Laptop fit</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Price</th>
                    <th scope="col">MRP</th>
                    <th scope="col">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Overnighter Backpack</th><td>16" MacBook / 15.6"</td><td>19L → 23L</td><td>₹8,999</td><td>₹14,999</td><td>40%</td></tr>
                  <tr><th scope="row">Backpack Pro 21L</th><td>15.6" / 16" MacBook Pro</td><td>21L</td><td>₹4,999</td><td>₹10,999</td><td>55%</td></tr>
                  <tr><th scope="row">Kaleido Backpack</th><td>15.6"</td><td>28L</td><td>₹3,999</td><td>₹6,999</td><td>43%</td></tr>
                  <tr><th scope="row">Backpack 16L</th><td>15"</td><td>16L</td><td>₹3,999</td><td>₹8,999</td><td>56%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="motion-band" aria-label="Designed for going places">
          <BgVideo src={VIDEO.goingPlaces} poster={LIFE.group} className="motion-band-media" label="brand film" lazy />
          <div className="motion-band-shade" aria-hidden="true" />
          <div className="motion-band-content">
            <p className="pill">#GoingPlaces</p>
            <p className="motion-band-title">Lecture. Metro. Court. Repeat.</p>
            <a className="arrow-link arrow-link-light" href="#details">
              See the details <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mk-section mk-section-grey" id="shop" aria-labelledby="shop-title">
          <div className="mk-shell">
            <SectionHead eyebrow="Shop the range" title="Which Mokobara collection should I shop?" id="shop-title" />
            <div className="facts-grid">
              {collectionFacts.map((c) => (
                <article key={c.path}>
                  <h3>{c.q}</h3>
                  <p>{c.a}</p>
                  <ul className="facts-list">
                    {c.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Link className="arrow-link" to={c.path}>
                    See all {c.count} {c.label} <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>




        <DetailsSection />

        <section className="mk-section mk-section-grey" aria-labelledby="explore-title">
          <div className="mk-shell">
            <SectionHead eyebrow="Explore the edit" title="What else should I check before buying a Mokobara?" id="explore-title" />
            <p className="facts-intro">
              <strong>Before buying a Mokobara, check 4 things</strong>: laptop fit, capacity, price and returns. Our 2026
              analysis covers all 4 across 40 bags from mokobara.com: 3 of our 4 picks (75%) fit a 15.6-inch laptop or
              larger, prices run from ₹999 to ₹13,599, and every bag bought on mokobara.com comes with a 30-day trial and a 12-month limited warranty.
            </p>
            <div className="explore-grid">
              {explore.map((e) => (
                <Link key={e.to} to={e.to} className="explore-card">
                  <span className="explore-num">{e.num}</span>
                  <p className="explore-title">{e.title}</p>
                  <p>{e.body}</p>
                  <span className="arrow-link">
                    {e.cta} <ArrowRight aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mk-section mk-section-dark" aria-labelledby="padel-teaser-title">
          <div className="mk-shell">
            <p className="pill">From class to court</p>
            <h2 className="section-title" id="padel-teaser-title">
              What should I carry to my first padel game?
            </h2>
            <div className="answer-block" style={{ marginTop: 22 }}>
              <p>{padelAnswer}</p>
              <ul className="facts-list">
                <li><strong>5 essentials:</strong> court shoes, water bottle, towel, change of clothes, racket</li>
                <li><strong>No racket?</strong> 7Padel rents rackets and balls (7padel.in)</li>
                <li><strong>1 bag:</strong> Mokobara Overnighter, 16-inch MacBook, 19L → 23L</li>
              </ul>
            </div>
            <div className="hero-actions" style={{ marginTop: 22 }}>
              <Link className="btn-yellow" to="/what-to-carry-to-padel">
                Read the full padel guide
              </Link>
              <a className="arrow-link arrow-link-light" href="https://7padel.in" target="_blank" rel="noopener noreferrer">
                Book at 7padel.in <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <MumbaiSection />






        <SiteFooter />
      </div>

      <FloatBtn home />
    </main>
  );
}
