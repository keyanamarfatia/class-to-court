import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CatalogCard } from "@/components/site/catalog-card";
import { FloatBtn, SiteFooter, Ticker, TopBar, img, inr } from "@/components/site/chrome";
import { catalog, SITE, type Collection, type Product } from "@/data/catalog";
import { Byline, articleSchema, eeatMeta } from "./eeat";

export const find = (slug: string) => catalog.find((c) => c.slug === slug);

const num = (v?: string) => (v ? parseFloat(v.replace(/[^\d.]/g, "")) : NaN);
const litresMax = (v?: string) => (v ? Math.max(...(v.match(/\d+(\.\d+)?/g) ?? []).map(Number)) : NaN);

/* Every number here is computed from the mokobara.com data in src/data/catalog.ts. */
function stats(c: Collection) {
  const items = c.items as readonly Product[];
  const prices = items.map((i) => i.price);
  const withLaptop = items.filter((i) => i.laptop);
  const weights = items.filter((i) => i.kg).map((i) => ({ i, kg: num(i.kg) }));
  const lightest = weights.sort((a, b) => a.kg - b.kg)[0];
  const caps = items.map((i) => litresMax(i.litres)).filter((n) => !Number.isNaN(n));
  return {
    count: items.length,
    min: Math.min(...prices),
    max: Math.max(...prices),
    withLaptop,
    lightest,
    capMin: caps.length ? Math.min(...caps) : null,
    capMax: caps.length ? Math.max(...caps) : null,
    cheapest: [...items].sort((a, b) => a.price - b.price)[0],
  };
}

function faqs(c: Collection) {
  const s = stats(c);
  const laptopNames = s.withLaptop.map((i) => `${i.name} (${i.laptop}")`).join(", ");
  const list: { q: string; a: string }[] = [
    {
      q: `How much does ${c.title.replace("Mokobara ", "Mokobara ")} cost?`,
      a: `On mokobara.com (21 November 2026), the ${s.count} ${c.label.toLowerCase()} range from ${inr(s.min)} to ${inr(s.max)}. The most affordable is the ${s.cheapest.name} at ${inr(s.cheapest.price)}.`,
    },
  ];
  if (s.withLaptop.length)
    list.push({
      q: `Which Mokobara ${c.label.toLowerCase()} fit a laptop?`,
      a: `${s.withLaptop.length} of ${s.count} list a laptop fit: ${laptopNames}.`,
    });
  if (s.lightest)
    list.push({
      q: `What is the lightest Mokobara ${c.label.toLowerCase().replace(/s$/, "")}?`,
      a: `Of the models that list a weight, the ${s.lightest.i.name} is the lightest at ${s.lightest.i.kg} kg.`,
    });
  if (c.id === "cabin")
    list.push({
      q: "Which Mokobara cabin bag is best for a student flying home?",
      a: "If you carry a laptop, pick a model with a laptop compartment such as the Transit Cabin Overnighter (15.6\") or Em Cabin Pro (15.6\"). If you want the lightest bag, the Aviator Cabin Luggage weighs 2 kg.",
    });
  list.push({
    q: "Can I return it if it isn't right?",
    a: "Mokobara offers a 30-day trial on mokobara.com: if it isn't the one for you, you can return it for a full refund.",
  });
  return list;
}

export function collectionHead(slug: string) {
    const c = find(slug);
    if (!c) return { meta: [{ title: "Collection not found | Mokobara Travel Edit" }] };
    const s = stats(c);
    const title = `${c.title}: All ${s.count} Compared (2026) | Mokobara Travel Edit`;
    const description = `Compare all ${s.count} ${c.title} side by side: prices from ${inr(s.min)}, laptop fit, capacity and weight, taken from mokobara.com.`;
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: c.title,
      itemListElement: c.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `https://mokobara.com/products/${it.handle}`,
        image: it.img,
      })),
    };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Travel edit", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: c.label, item: SITE + c.path },
      ],
    };
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs(c).map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    };
    return {
      links: [{ rel: "canonical", href: SITE + c.path }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: img(c.items[0].img, 1200) },
        { property: "og:url", content: SITE + c.path },
        ...eeatMeta,
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleSchema({ path: c.path, headline: title, description, image: img(c.items[0].img, 1200) })) },
        { type: "application/ld+json", children: JSON.stringify(itemList) },
        { type: "application/ld+json", children: JSON.stringify(crumbs) },
        { type: "application/ld+json", children: JSON.stringify(faq) },
      ],
    };
  }

type Sort = "featured" | "low" | "high" | "off" | "light";

export function CollectionView({ slug }: { slug: string }) {
  const c = find(slug)!;
  const s = stats(c);
  const [sort, setSort] = useState<Sort>("featured");
  const [laptopOnly, setLaptopOnly] = useState(false);
  const [under, setUnder] = useState(false);

  const items = useMemo(() => {
    let list = [...(c.items as readonly Product[])];
    if (laptopOnly) list = list.filter((i) => i.laptop);
    if (under) list = list.filter((i) => i.price < 6000);
    const off = (i: Product) => 1 - i.price / i.mrp;
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "off") list.sort((a, b) => off(b) - off(a));
    if (sort === "light") list.sort((a, b) => (num(a.kg) || 99) - (num(b.kg) || 99));
    return list;
  }, [c, sort, laptopOnly, under]);

  const list = faqs(c);

  return (
    <main className="mk-page">
      <Ticker />
      <TopBar />

      <section className="col-hero">
        <div className="mk-shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Travel edit</Link> <span aria-hidden="true">/</span> <span>{c.label}</span>
          </nav>
          <p className="pill">{c.eyebrow}</p>
          <h1 className="col-title">{c.title}</h1>
          <p className="col-intro">{c.intro}</p>
          <p className="col-summary">
            According to mokobara.com on 21 November 2026, Mokobara lists {s.count} {c.label.toLowerCase()}, priced from{" "}
            {inr(s.min)} ({s.cheapest.name}) to {inr(s.max)}
            {s.capMin !== null ? `, with capacities from ${s.capMin}L to ${s.capMax}L` : ""}. {s.withLaptop.length} of the{" "}
            {s.count} list a laptop fit{s.lightest ? `, and the lightest listed is the ${s.lightest.i.name} at ${s.lightest.i.kg} kg` : ""}.
          </p>
          <Byline />
          <ul className="quick-stats col-stats">
            <li>
              <b>{s.count}</b>
              <span>Models</span>
            </li>
            <li>
              <b>{inr(s.min)}</b>
              <span>Starting price</span>
            </li>
            {s.capMin !== null && (
              <li>
                <b>
                  {s.capMin === s.capMax ? `${s.capMax}L` : `${s.capMin}–${s.capMax}L`}
                </b>
                <span>Capacity range</span>
              </li>
            )}
            <li>
              <b>{s.withLaptop.length}</b>
              <span>Fit a laptop</span>
            </li>
          </ul>
          <div className="col-switch" aria-label="Other collections">
            {catalog.map((o) => (
              <Link
                key={o.slug}
                to={o.path}
                className={o.slug === c.slug ? "active" : ""}
              >
                {o.label} <span>{o.items.length}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section col-list" aria-labelledby="all-title">
        <div className="mk-shell">
          <div className="col-toolbar">
            <h2 className="col-count" id="all-title">
              {items.length} {items.length === 1 ? "bag" : "bags"}
            </h2>
            <div className="col-filters">
              <button type="button" className={laptopOnly ? "on" : ""} onClick={() => setLaptopOnly((v) => !v)} aria-pressed={laptopOnly}>
                Fits a laptop
              </button>
              <button type="button" className={under ? "on" : ""} onClick={() => setUnder((v) => !v)} aria-pressed={under}>
                Under ₹6,000
              </button>
              <label className="col-sort">
                <span className="sr-only">Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="featured">Featured</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                  <option value="off">Biggest discount</option>
                  <option value="light">Lightest first</option>
                </select>
              </label>
            </div>
          </div>

          {items.length ? (
            <div className="cat-grid">
              {items.map((it) => (
                <CatalogCard key={it.handle} item={it} headingLevel={3} />
              ))}
            </div>
          ) : (
            <p className="col-empty">No bags match those filters. Try removing one.</p>
          )}
          <p className="price-note">
            Prices, colours and specs as listed on mokobara.com on 21 November 2026. Discounts are calculated from
            Mokobara's listed MRP. Specs not listed by Mokobara are left out.
          </p>
        </div>
      </section>

      <section className="mk-section mk-section-grey" aria-labelledby="col-faq-title">
        <div className="mk-shell">
          <p className="pill">Good to know</p>
          <h2 className="section-title" id="col-faq-title">
            {c.label} FAQ.
          </h2>
          <Accordion type="single" collapsible className="faq-accordion" style={{ marginTop: 20 }}>
            {list.map(({ q, a }, i) => (
              <AccordionItem value={`c-${i}`} key={q} className="faq-item">
                <AccordionTrigger className="faq-trigger">
                  <span className="faq-q">{q}</span>
                </AccordionTrigger>
                <AccordionContent className="faq-answer">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <Link className="btn-solid" to="/bag-finder-quiz">
              Not sure? Take the quiz
            </Link>
            <Link className="arrow-link" to="/what-to-carry-to-padel">
              From class to court
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatBtn />
    </main>
  );
}
