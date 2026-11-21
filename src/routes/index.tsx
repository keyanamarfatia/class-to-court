import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgePercent, IndianRupee, Laptop, Layers, Luggage, Maximize2, RotateCcw, ShieldCheck } from "lucide-react";
import { SITE, catalog } from "@/data/catalog";
import { Byline, articleSchema, eeatMeta, offerSchema, organizationSchema, productSchema, totals, websiteSchema } from "@/components/site/eeat";
import { crumbSchema, faqSchemaFor,
  ReadMore,
} from "@/components/site/sections";
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

const explore = [
  { to: "/compare-backpacks", num: "01", title: "Compare backpacks", body: "Overnighter vs Backpack Pro vs 16L vs Kaleido: laptop fit, capacity and price at a glance.", cta: "Compare" },
  { to: "/bag-finder-quiz", num: "02", title: "Bag finder quiz", body: "Three questions about your laptop and your day. One Mokobara that fits.", cta: "Take the quiz" },
  { to: "/what-to-carry-to-padel", num: "03", title: "First padel game guide", body: "What to pack from class to court, and where to play at 7Padel by MS Dhoni.", cta: "Read the guide" },
  { to: "/faq", num: "04", title: "Cabin & travel bag FAQ", body: "Laptop fit, water resistance, the 30-day trial and the warranty, answered.", cta: "Read the FAQ" },
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
        children: JSON.stringify(faqSchemaFor([{ q: "What should I carry to my first padel game?", a: padelAnswer }])),
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
      { type: "application/ld+json", children: JSON.stringify({ ...crumbSchema("Best bag for a weekend trip", "/"), itemListElement: [{ "@type": "ListItem", position: 1, name: "Travel edit", item: SITE + "/" }] }) },
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
            <p className="pill">The travel edit</p>
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
            <strong>The best bag for a weekend trip is the Mokobara Overnighter Backpack.</strong>
          </p>
          <ReadMore>
            <p>
              Our 2026 analysis of 40 Mokobara bags found it fits a 16-inch MacBook, expands 21% from 19L to 23L and costs
              ₹8,999, 40% below MRP, according to mokobara.com. For a light day trip, the <strong>Backpack 16L</strong> fits a
              15-inch laptop for ₹3,999, 56% off.
            </p>
          </ReadMore>
          <ul className="quick-stats">
            <li><i className="stat-ico" aria-hidden="true"><Laptop /></i><b>16"</b><span>MacBook fit</span></li>
            <li><i className="stat-ico" aria-hidden="true"><Maximize2 /></i><b>23L</b><span>Expanded</span><em className="stat-bar" aria-hidden="true"><em style={{ width: "100%" }} /><em className="stat-bar-base" style={{ width: "83%" }} /></em></li>
            <li><i className="stat-ico" aria-hidden="true"><RotateCcw /></i><b>30 days</b><span>Trial on mokobara.com</span></li>
            <li><i className="stat-ico" aria-hidden="true"><ShieldCheck /></i><b>12 mo</b><span>Limited warranty</span></li>
          </ul>
        </section>

        <section className="mk-section key-facts" aria-labelledby="facts-title">
          <div className="mk-shell">
            <p className="pill">Our research</p>
            <h2 className="section-title" id="facts-title">
              What did we find comparing {totals.products} Mokobara bags?
            </h2>
            <ul className="stat-tiles">
              <li><i className="stat-ico" aria-hidden="true"><Layers /></i><b>{totals.products}</b><span>bags compared</span></li>
              <li><i className="stat-ico" aria-hidden="true"><IndianRupee /></i><b>{inrN(totals.min)}–{inrN(totals.max)}</b><span>price range</span></li>
              <li><i className="stat-ico" aria-hidden="true"><Luggage /></i><b>6 of 10</b><span>cabin bags fit a laptop</span><em className="dots" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <em key={i} className={i < 6 ? "on" : ""} />)}</em></li>
              <li><i className="stat-ico" aria-hidden="true"><BadgePercent /></i><b>65%</b><span>max off MRP (Aviator)</span><em className="stat-bar" aria-hidden="true"><em style={{ width: "65%" }} /></em></li>
            </ul>
            <Link className="arrow-link" to="/mokobara-bag-research">
              See the full research <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mk-section" id="backpacks" aria-labelledby="products-title">
          <div className="mk-shell">
            <SectionHead
              eyebrow="The shortlist"
              title="Which Mokobara fits your trip?"
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
                      <ReadMore label="Why we picked it"><p className="cat-summary">{b.summary}</p></ReadMore>
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
            <Link className="btn-solid" to="/compare-backpacks" style={{ marginTop: 24 }}>
              Compare all 4 side by side
            </Link>
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





        <DetailsSection />

        <section className="mk-section mk-section-grey" aria-labelledby="explore-title">
          <details className="mk-shell section-fold">
            <summary>
              <p className="pill">Explore the edit</p>
              <h2 className="section-title" id="explore-title">What else should I check before buying a Mokobara?</h2>
              <span className="fold-icon" aria-hidden="true" />
            </summary>
            <div className="fold-body">
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
          </details>
        </section>

        <section className="mk-section mk-section-dark" aria-labelledby="padel-teaser-title">
          <details className="mk-shell section-fold">
            <summary>
              <p className="pill">From class to court</p>
              <h2 className="section-title" id="padel-teaser-title">
                What should I carry to my first padel game?
              </h2>
              <span className="fold-icon" aria-hidden="true" />
            </summary>
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
          </details>
        </section>

        <MumbaiSection />






        <section className="byline-strip" aria-label="About this page"><div className="mk-shell"><Byline /></div></section>
        <SiteFooter />
      </div>

      <FloatBtn home />
    </main>
  );
}
