import { createFileRoute, Link } from "@tanstack/react-router";
import { NextSteps, PageHero, Shell, crumbSchema, img, pageHead, LIFE } from "@/components/site/sections";
import { AUTHOR, personSchema, totals } from "@/components/site/eeat";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About the Mokobara College Edit: Who Made It and How We Compared the Bags",
      description: "A student concept by BBA Marketing students at Atlas SkillTech University. How we compared every Mokobara bag, where the facts come from, and what this site is not.",
      image: img(LIFE.commute, 1200),
      schemas: [
        { "@context": "https://schema.org", "@type": "AboutPage", name: "About the Mokobara College Edit", author: personSchema },
        crumbSchema("About", "/about"),
      ],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="About"
        eyebrow="Who made this"
        title="About the Mokobara College Edit"
        intro="A student concept that answers the bag questions college students actually search for, using only facts from Mokobara and 7Padel."
      />
      <section className="mk-section">
        <div className="mk-shell about-grid">
          <article>
            <h2 className="section-title">Who we are.</h2>
            <p>
              We are {AUTHOR.team}, {AUTHOR.role}. We built this site for Brief 1 (SEO) at Schbang x Atlas SkillTech on 21
              November 2026, using AI tools. Neither Mokobara nor 7Padel commissioned or reviewed it.
            </p>
          </article>
          <article>
            <h2 className="section-title">How we compared the bags.</h2>
            <p>
              On 21 November 2026 we pulled all {totals.products} products from Mokobara's own cabin luggage, travel backpack,
              laptop bag and laptop backpack collections on mokobara.com: names, prices, MRPs, colours, laptop fit, capacity,
              dimensions, weight and photos. Where Mokobara does not list a spec, we leave it blank rather than guess.
              Discounts are calculated from Mokobara's listed MRP.
            </p>
          </article>
          <article>
            <h2 className="section-title">Our sources.</h2>
            <p>
              Product facts, prices, photos and videos: <a href="https://mokobara.com" target="_blank" rel="noopener noreferrer">mokobara.com</a>.
              Padel facilities: <a href="https://7padel.in" target="_blank" rel="noopener noreferrer">7padel.in</a>. We do not
              publish ratings or reviews, because we have not collected any.
            </p>
          </article>
          <article>
            <h2 className="section-title">Buying.</h2>
            <p>
              Every "Buy on mokobara.com" button goes to the official store. Prices change, so check mokobara.com before you buy.
              Start with the <Link to="/bag-finder-quiz">bag finder quiz</Link> or the <Link to="/cabin-luggage">cabin luggage</Link> collection.
            </p>
          </article>
        </div>
      </section>
      <NextSteps />
    </Shell>
  ),
});
