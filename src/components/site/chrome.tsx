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
            Student concept <b>•</b> The travel edit 2026 <b>•</b> From class to court <b>•</b> Shop the real thing on
            mokobara.com <b>•</b>
          </span>
        ))}
      </div>
      <p className="sr-only">Student concept page. Visit the official Mokobara store at mokobara.com.</p>
    </div>
  );
}

export function TopBar(_: { home?: boolean }) {
  return (
    <header className="mk-topbar">
      <div className="topbar-inner">
        <Link className="topbar-logo" to="/" aria-label="Mokobara travel edit, home">
          <img src={LOGO} alt="Mokobara" width={130} height={28} />
        </Link>
        <nav className="topbar-nav" aria-label="Site">
          <Link to="/cabin-luggage" activeProps={{ className: "active" }}>
            Cabin luggage
          </Link>
          <Link to="/travel-backpacks" activeProps={{ className: "active" }}>
            Travel backpacks
          </Link>
          <Link to="/laptop-bags" activeProps={{ className: "active" }}>
            Laptop bags
          </Link>
          <Link to="/compare-backpacks" activeProps={{ className: "active" }}>Compare</Link>
          <Link to="/bag-finder-quiz" activeProps={{ className: "active" }}>Quiz</Link>
          <Link to="/what-to-carry-to-padel" activeProps={{ className: "active" }}>Padel</Link>
          <Link to="/faq" activeProps={{ className: "active" }}>FAQ</Link>
          <Link to="/about" activeProps={{ className: "active" }}>About</Link>
        </nav>
        <Link className="topbar-cta" to="/bag-finder-quiz">
          Find my bag <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

/* Official profiles, each checked by opening it on 21 Nov 2026. */
export const SOCIALS = [
  { label: "Mokobara on Instagram", href: "https://www.instagram.com/mokobara/" },
  { label: "Mokobara on LinkedIn", href: "https://www.linkedin.com/company/mokobara/" },
  { label: "Mokobara on YouTube", href: "https://www.youtube.com/@mokobara" },
  { label: "Mokobara on Wikipedia", href: "https://en.wikipedia.org/wiki/Mokobara" },
  { label: "Mokobara on Facebook", href: "https://www.facebook.com/mokobara/" },
  { label: "Mokobara on Crunchbase", href: "https://www.crunchbase.com/organization/mokobara" },
  { label: "7Padel on X", href: "https://x.com/7Padel_India" },
];

/* Real customer reviews of Mokobara's Mumbai stores on Google Maps. */
export const REVIEWS = [
  { label: "Mokobara store reviews on Google", href: "https://www.google.com/maps/search/Mokobara+store+Mumbai" },
  { label: "7Padel reviews on Google", href: "https://www.google.com/maps/search/7Padel+Mumbai" },
];

export const GITHUB = "https://github.com/keyanamarfatia/class-to-court";

export function SiteFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-shell">
        <img className="footer-logo" src={LOGO} alt="Mokobara" width={180} height={38} loading="lazy" />
        <p className="footer-tag">The Joy Is in the Details · #GoingPlaces</p>
        <nav className="footer-links" aria-label="Collections">
          <Link to="/cabin-luggage">Cabin luggage</Link>
          <Link to="/travel-backpacks">Travel backpacks</Link>
          <Link to="/laptop-bags">Laptop bags</Link>
          <Link to="/compare-backpacks">Compare</Link>
          <Link to="/bag-finder-quiz">Bag finder quiz</Link>
          <Link to="/what-to-carry-to-padel">Padel guide</Link>
          <Link to="/mokobara-bag-research">Our research</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About us</Link>
          <Link to="/press">Press</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/">Travel edit home</Link>
        </nav>
        <div className="footer-social" aria-label="Official brand profiles">
          <p>Follow the brands</p>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer me">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-social" aria-label="Customer reviews">
          <p>Read real reviews</p>
          <ul>
            {REVIEWS.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="footer-built">
          Contact the team:{" "}
          <a href="mailto:keyana.marfatia.bba2025@atlasskilltech.university">keyana.marfatia.bba2025@atlasskilltech.university</a>
        </p>
        <p className="footer-built">
          Built in the open with AI:{" "}
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            see every change on GitHub
          </a>
        </p>
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

export function FloatBtn(_: { home?: boolean }) {
  return (
    <Link className="float-btn" to="/bag-finder-quiz" aria-label="Take the bag quiz">
      <BriefcaseBusiness aria-hidden="true" />
    </Link>
  );
}
