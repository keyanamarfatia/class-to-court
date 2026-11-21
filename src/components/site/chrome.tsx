import { Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

export const LOGO = "https://mokobara.com/cdn/shop/files/Mokobara_SVG_White_Logo.svg";
export const img = (path: string, w = 900) => `${path}?width=${w}`;
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* On the homepage links are in-page anchors; elsewhere they point back to the homepage sections. */
export function Ticker() {
  return (
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
  );
}

export function TopBar({ home = false }: { home?: boolean }) {
  const h = (id: string) => (home ? `#${id}` : `/#${id}`);
  return (
    <header className="mk-topbar">
      <div className="topbar-inner">
        <Link className="topbar-logo" to="/" aria-label="Mokobara college edit, home">
          <img src={LOGO} alt="Mokobara" width={130} height={28} />
        </Link>
        <nav className="topbar-nav" aria-label="Site">
          <Link to="/collections/$slug" params={{ slug: "cabin-luggage" }} activeProps={{ className: "active" }}>
            Cabin luggage
          </Link>
          <Link to="/collections/$slug" params={{ slug: "travel-backpacks" }} activeProps={{ className: "active" }}>
            Travel backpacks
          </Link>
          <Link to="/collections/$slug" params={{ slug: "laptop-bags" }} activeProps={{ className: "active" }}>
            Laptop bags
          </Link>
          <a href={h("compare")}>Compare</a>
          <a href={h("quiz")}>Quiz</a>
          <a href={h("padel")}>Padel</a>
          <a href={h("faq")}>FAQ</a>
        </nav>
        <a className="topbar-cta" href={h("quiz")}>
          Find my bag <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-shell">
        <img className="footer-logo" src={LOGO} alt="Mokobara" width={180} height={38} loading="lazy" />
        <p className="footer-tag">The Joy Is in the Details · #GoingPlaces</p>
        <nav className="footer-links" aria-label="Collections">
          <Link to="/collections/$slug" params={{ slug: "cabin-luggage" }}>Cabin luggage</Link>
          <Link to="/collections/$slug" params={{ slug: "travel-backpacks" }}>Travel backpacks</Link>
          <Link to="/collections/$slug" params={{ slug: "laptop-bags" }}>Laptop bags</Link>
          <Link to="/">College edit home</Link>
        </nav>
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
  );
}

export function FloatBtn({ home = false }: { home?: boolean }) {
  return (
    <a className="float-btn" href={home ? "#quiz" : "/#quiz"} aria-label="Take the bag quiz">
      <BriefcaseBusiness aria-hidden="true" />
    </a>
  );
}
