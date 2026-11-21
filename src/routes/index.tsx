import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/data/catalog";
import { FloatBtn, SiteFooter, Ticker, TopBar } from "@/components/site/chrome";
import {
  BgVideo,
  Catalog,
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
  padelAnswer,
} from "@/components/site/sections";

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
    ],
    links: [
      { rel: "canonical", href: SITE + "/" },
      { rel: "preconnect", href: "https://cdn.shopify.com" },
      { rel: "preconnect", href: "https://mokobara.com" },
    ],
    scripts: [
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
          <BgVideo src={VIDEO.hero} poster={img(LIFE.commute, 1200)} className="hero-video-media" label="background video" />
          <div className="hero-video-shade" aria-hidden="true" />
          <div className="hero-video-content">
            <p className="pill">The college edit</p>
            <h1 className="hero-title" id="page-title">
              The best laptop backpack for college, from class to court
            </h1>
            <p className="hero-sub">Campus in the morning. Court after class. One Mokobara that fits both.</p>
            <div className="hero-actions">
              <Link className="btn-yellow" to="/bag-finder-quiz">
                Take the 30-second quiz
              </Link>
              <Link className="arrow-link arrow-link-light" to="/what-to-carry-to-padel">
                First padel game <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <p className="hero-meta">Updated 21 November 2026 · Product facts and prices from mokobara.com</p>
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

        <section className="motion-band" aria-label="Designed for going places">
          <BgVideo src={VIDEO.goingPlaces} poster={img(LIFE.group, 1200)} className="motion-band-media" label="brand film" />
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
            <SectionHead
              eyebrow="Crowd favourites"
              title="Shop cabin luggage, travel backpacks and laptop bags"
              id="shop-title"
              link={{ href: "https://mokobara.com/collections/bags-and-backpacks", label: "Official store" }}
            />
            <Catalog />
          </div>
        </section>

        <section className="lifestyle" aria-label="Mokobara backpacks on the go">
          {[
            { src: LIFE.commute, alt: "Commuter wearing a Mokobara backpack on the way to class" },
            { src: LIFE.group, alt: "Three friends walking with Mokobara backpacks" },
            { src: LIFE.skate, alt: "Commuter carrying a Mokobara backpack in the city" },
            { src: LIFE.ride, alt: "Rider on a scooter with a Mokobara backpack" },
          ].map((p) => (
            <img key={p.src} src={img(p.src, 600)} alt={p.alt} loading="lazy" width={600} height={816} />
          ))}
        </section>


        <DetailsSection />

        <section className="mk-section mk-section-grey" aria-labelledby="explore-title">
          <div className="mk-shell">
            <SectionHead eyebrow="Explore the edit" title="Everything you need before you buy" id="explore-title" />
            <div className="explore-grid">
              {explore.map((e) => (
                <Link key={e.to} to={e.to} className="explore-card">
                  <span className="explore-num">{e.num}</span>
                  <h3>{e.title}</h3>
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
