import { Link } from "@tanstack/react-router";
import { catalog, SITE } from "@/data/catalog";

/* E-E-A-T: who wrote this, when, from which sources. */
export const AUTHOR = {
  name: "Keyana Marfatia",
  team: "Keyana Marfatia and team",
  role: "BBA Marketing students, Atlas SkillTech University, Mumbai",
};
export const PUBLISHED = "2026-11-21";
export const UPDATED = "2026-11-21";

export function Byline({ light = false }: { light?: boolean }) {
  return (
    <p className={`byline${light ? " byline-light" : ""}`}>
      By <Link to="/about">{AUTHOR.team}</Link> · {AUTHOR.role} · Updated{" "}
      <time dateTime={UPDATED}>21 November 2026</time> · Sources:{" "}
      <a href="https://mokobara.com" target="_blank" rel="noopener noreferrer">
        mokobara.com
      </a>
      ,{" "}
      <a href="https://7padel.in" target="_blank" rel="noopener noreferrer">
        7padel.in
      </a>
    </p>
  );
}

export const personSchema = {
  "@type": "Person",
  name: AUTHOR.name,
  jobTitle: "BBA Marketing student",
  affiliation: { "@type": "CollegeOrUniversity", name: "Atlas SkillTech University", address: "Mumbai, India" },
  url: SITE + "/about",
};

export const publisherSchema = {
  "@type": "Organization",
  "@id": SITE + "/#organization",
  name: "Mokobara College Edit (student concept)",
  url: SITE + "/",
  logo: { "@type": "ImageObject", url: SITE + "/logo.png", width: 512, height: 512 },
  founder: { "@type": "Person", name: "Keyana Marfatia" },
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  description: "A student concept guide to Mokobara bags for college students, made for a Schbang x Atlas SkillTech brief. Not affiliated with Mokobara.",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mokobara College Edit",
  url: SITE + "/",
  inLanguage: "en-IN",
  publisher: publisherSchema,
};

export const organizationSchema = { "@context": "https://schema.org", ...publisherSchema };

export function articleSchema(o: { path: string; headline: string; description: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: o.headline,
    description: o.description,
    image: o.image,
    url: SITE + o.path,
    mainEntityOfPage: SITE + o.path,
    inLanguage: "en-IN",
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    author: personSchema,
    publisher: publisherSchema,
    citation: ["https://mokobara.com", "https://7padel.in"],
  };
}

/* Product + Offer from Mokobara's own listing (no ratings: we have none and won't invent any). */
export function productSchema(p: { name: string; image: string; url: string; price: number; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": p.url + "#product",
    name: p.name,
    image: p.image,
    url: p.url,
    description: p.description,
    brand: { "@type": "Brand", name: "Mokobara", url: "https://mokobara.com" },
    offers: offerSchema(p, false),
  };
}

/* Standalone Offer (also nested above) so crawlers that only read top-level types find it. */
export function offerSchema(p: { name: string; url: string; price: number }, standalone = true) {
  return {
    ...(standalone ? { "@context": "https://schema.org" } : {}),
    "@type": "Offer",
    ...(standalone ? { "@id": p.url + "#offer", itemOffered: { "@id": p.url + "#product", name: p.name } } : {}),
    price: p.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    url: p.url,
    seller: { "@type": "Organization", name: "Mokobara", url: "https://mokobara.com" },
  };
}

export const totals = (() => {
  const all = catalog.flatMap((c) => c.items as readonly { handle: string; price: number }[]);
  const uniq = all.filter((it, i) => all.findIndex((x) => x.handle === it.handle) === i);
  return { products: uniq.length, min: Math.min(...uniq.map((u) => u.price)), max: Math.max(...uniq.map((u) => u.price)) };
})();
