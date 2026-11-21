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
  },
  {
    q: "How much does a Mokobara bag cost for students?",
    a: `In our own research, we went through all ${totals.products} Mokobara laptop bags, travel backpacks and cabin suitcases listed on mokobara.com on 21 November 2026 and compared every price and spec ourselves. Prices ranged from ${inrN(totals.min)} for the 14-inch Aisle Laptop Sleeve to ${inrN(totals.max)} for the Cabin Pro, and the Backpack 16L, Kaleido and Spacewalk backpacks all cost ₹3,999.`,
  },
  {
    q: "Which Mokobara cabin bag is lightest?",
    a: "Our comparison of all 10 Mokobara cabin suitcases found the Aviator Cabin Luggage is the lightest at 2 kg, about 39% lighter than the 3.27 kg Cabin Luggage, and it holds 37L. Cabin capacities range from 37L to 44L, and 6 of the 10 models (60%) list a laptop compartment of 14 to 15.6 inches, per mokobara.com.",
  },
  {
    q: "What does a new padel player need?",
    a: "Our checklist for a first padel game has 5 items: court shoes, a water bottle, a towel, a change of clothes and a racket, which 7Padel by MS Dhoni rents along with balls, per 7padel.in. Its venues add showers, changing rooms and air-conditioned indoor courts, so 1 Mokobara backpack of 19L to 23L covers class and court.",
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
      q: "What cabin luggage does Mokobara sell?",
      a: `Our research counted ${cab.n} Mokobara cabin suitcases on mokobara.com on 21 November 2026, priced from ${inrN(cab.min)} to ${inrN(cab.max)}. They hold 37L to 44L, and ${cab.lap} of ${cab.n} (${pct(cab.lap, cab.n)}%) list a laptop compartment, which makes them the pick for students flying home with a laptop.`,
    },
    {
      path: "/laptop-bags", label: "laptop bags", count: lap.n,
      q: "How many Mokobara laptop bags are there?",
      a: `We found ${lap.n} Mokobara laptop backpacks, briefcases and sleeves on mokobara.com, from ${inrN(lap.min)} for the 14-inch Aisle Laptop Sleeve to ${inrN(lap.max)}. ${lap.lap} of ${lap.n} (${pct(lap.lap, lap.n)}%) list a laptop size, from 14 to 16 inches, and 5 of them take a 16-inch laptop.`,
    },
    {
      path: "/travel-backpacks", label: "travel backpacks", count: trv.n,
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
      { title: "Best Laptop Backpack for College (2026) | Mokobara" },
      { name: "description", content: description },
      { property: "og:title", content: "Best Laptop Backpack for College (2026) | Mokobara" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE + "/" },
      { property: "og:image", content: img(LIFE.commute, 1200) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "laptop backpack for college, Mokobara backpack, what to carry to padel" },
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
          articleSchema({ path: "/", headline: "The best laptop backpack for college, from class to court", description, image: img(LIFE.commute, 1200) }),
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
      { type: "application/ld+json", children: JSON.stringify({ ...crumbSchema("Best laptop backpack for college", "/"), itemListElement: [{ "@type": "ListItem", position: 1, name: "College edit", item: SITE + "/" }] }) },
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
              The best laptop backpack for college, from class to court
            </h1>
            <p className="hero-sub">Campus in the morning, court after class: the Mokobara Overnighter fits a 16-inch MacBook and expands from 19L to 23L, so one bag covers both.</p>
            <div className="hero-actions">
              <Link className="btn-yellow" to="/bag-finder-quiz">
                Take the 30-second quiz
              </Link>
              <Link className="arrow-link arrow-link-light" to="/what-to-carry-to-padel">
                First padel game <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <Byline light />
          </div>
          <a className="scroll-cue" href="#backpacks" aria-label="Scroll to the backpacks">
            <span />
          </a>
        </section>

        <section className="quick-answer mk-shell" aria-labelledby="quick-title">
          <p className="pill">Short answer</p>
          <h2 id="quick-title" className="sr-only">
            Short answer: the best Mokobara laptop backpack for college
          </h2>
          <p className="quick-text">
            For most college students, the <strong>Mokobara Overnighter Backpack</strong> is the pick: it fits a
            16-inch MacBook, expands from 19L to 23L for after-class plans, and its front pocket detaches into a sling.
            For lectures only, the lighter <strong>Backpack 16L</strong> fits a 15-inch laptop.
          </p>
          <ul className="quick-stats">
            <li><b>16"</b><span>MacBook fit</span></li>
            <li><b>23L</b><span>Expanded</span></li>
            <li><b>30 days</b><span>Trial on mokobara.com</span></li>
            <li><b>12 mo</b><span>Limited warranty</span></li>
          </ul>
        </section>

        <section className="mk-section key-facts" aria-labelledby="facts-title">
          <div className="mk-shell">
            <p className="pill">Key facts</p>
            <h2 className="section-title" id="facts-title">
              What we found comparing {totals.products} Mokobara bags
            </h2>
            <p className="facts-intro">
              As college students in Mumbai ourselves, we carry a laptop, chargers, a bottle and often kit for after class
              every day. In our experience, the question is never just "which bag is best" but "which one bag lasts the
              whole day", so we checked every Mokobara listing first-hand with that in mind.
            </p>
            <div className="facts-grid">
              {keyFacts.map((f) => (
                <article key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
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
                      <p className="cat-summary">{b.summary}</p>
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
            <SectionHead eyebrow="Explore the edit" title="Everything you need before you buy" id="explore-title" />
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
