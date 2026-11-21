import { createFileRoute } from "@tanstack/react-router";
import { NextSteps, PageHero, Shell, crumbSchema, img, LIFE, pageHead } from "@/components/site/sections";
import { CONTACT_EMAIL } from "@/components/site/eeat";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact Us | Mokobara College Edit (Student Concept)",
      description: "How to reach the student team behind the Mokobara College Edit, and where to contact Mokobara and 7Padel directly for orders and bookings.",
      image: img(LIFE.commute, 1200),
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact the Mokobara College Edit team",
          about: {
            "@type": "Organization",
            name: "Mokobara College Edit (student concept)",
            address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
            ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
          },
        },
        crumbSchema("Contact us", "/contact"),
      ],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="Contact us"
        eyebrow="Get in touch"
        title="Contact us"
        intro="This is a student project. Here's how to reach us, and where to go for anything about an order or a court booking."
      />
      <section className="mk-section">
        <div className="mk-shell about-grid">
          <article>
            <h2 className="section-title">The project team.</h2>
            <p>
              Keyana Marfatia, Vivaan Khubchandani, Mohammed Zaid Sayed, Kushal Chawla, Adnan Gilitwala and Aadhyan Rao, BBA Marketing, Atlas SkillTech University, Mumbai, Maharashtra, India.
              {CONTACT_EMAIL ? (
                <>
                  {" "}Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </>
              ) : null}
            </p>
          </article>
          <article>
            <h2 className="section-title">Orders, returns and warranty.</h2>
            <p>
              We don't sell anything. For Mokobara orders, the 30-day trial or the 12-month warranty, contact Mokobara through{" "}
              <a href="https://mokobara.com" target="_blank" rel="noopener noreferrer">mokobara.com</a>.
            </p>
          </article>
          <article>
            <h2 className="section-title">Padel court bookings.</h2>
            <p>
              Book courts, rent rackets and join matches with 7Padel by MS Dhoni on{" "}
              <a href="https://7padel.in" target="_blank" rel="noopener noreferrer">7padel.in</a>.
            </p>
          </article>
        </div>
      </section>
      <NextSteps />
    </Shell>
  ),
});
