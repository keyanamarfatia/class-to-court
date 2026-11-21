import { createFileRoute } from "@tanstack/react-router";
import { NextSteps, PageHero, Shell, crumbSchema, img, LIFE, pageHead } from "@/components/site/sections";

/* Real, independently published coverage of the two brands this site covers. Summaries are our own words. */
const coverage = [
  {
    brand: "Mokobara",
    outlet: "StartupIntros",
    date: "26 February 2024",
    title: "Mokobara raises a $12.1M Series B led by Peak XV Partners",
    url: "https://startupintros.com/news/mokobara-series-b-2024-02-26",
  },
  {
    brand: "Mokobara",
    outlet: "Outlook India",
    date: "2024",
    title: "Mokobara's Transit Backpack named among the best laptop bags in India",
    url: "https://outlookindia.com/whats-hot/10-best-laptop-bags-backpacks-in-india-2023--news-336061",
  },
  {
    brand: "7Padel",
    outlet: "DT Next",
    date: "August 2025",
    title: "MS Dhoni launches the first 7Padel centre in Chennai",
    url: "https://www.dtnext.in/news/sports/ms-dhoni-launches-first-7padel-centre-in-chennai-842576",
  },
  {
    brand: "7Padel",
    outlet: "Inc42",
    date: "2026",
    title: "PadelPark India merges with MS Dhoni's 7Padel",
    url: "https://inc42.com/buzz/padelpark-merges-with-ms-dhonis-7padel-to-scale-turf-sports/",
  },
  {
    brand: "7Padel",
    outlet: "Telangana Today",
    date: "5 October 2026",
    title: "MS Dhoni inaugurates 7Padel's sports and wellness facility in Jubilee Hills, Hyderabad",
    url: "https://telanganatoday.com/ms-dhoni-inaugurates-7padel-sports-and-wellness-facility-in-hyderabad",
  },
  {
    brand: "Padel in India",
    outlet: "Time Out Mumbai",
    date: "2026",
    title: "The best padel clubs in Mumbai, including 7Padel",
    url: "https://www.timeout.com/mumbai/best-padel-clubs",
  },
];

export const Route = createFileRoute("/press")({
  head: () =>
    pageHead({
      path: "/press",
      title: "Press: Mokobara and 7Padel in the News | Mokobara College Edit",
      description: "Independent press coverage of Mokobara and 7Padel by MS Dhoni, from funding news to new padel venues, collected for the Mokobara College Edit.",
      image: img(LIFE.commute, 1200),
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Mokobara and 7Padel in the news",
          hasPart: coverage.map((c) => ({ "@type": "NewsArticle", headline: c.title, url: c.url, publisher: { "@type": "Organization", name: c.outlet } })),
        },
        crumbSchema("Press", "/press"),
      ],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="Press"
        eyebrow="In the news"
        title="Mokobara and 7Padel in the news"
        intro="Independent coverage of the two brands behind this guide. Headlines are summarised in our own words; follow each link for the full story."
      />
      <section className="mk-section">
        <div className="mk-shell">
          <ul className="press-list">
            {coverage.map((c) => (
              <li key={c.url}>
                <span className="pill">{c.brand}</span>
                <h2>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.title}
                  </a>
                </h2>
                <p>
                  {c.outlet} · {c.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NextSteps />
    </Shell>
  ),
});
