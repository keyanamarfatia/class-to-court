import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  BriefcaseBusiness,
  Laptop,
  Plane,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const products = [
  { name: "Overnighter Backpack", icon: BriefcaseBusiness },
  { name: "Backpack 16L", icon: Laptop },
  { name: "Em Travel Backpack 32L", icon: Plane },
];

const questions = ["01", "02", "03", "04", "05", "06"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Laptop Backpack for College (2026) | Mokobara" },
      {
        name: "description",
        content:
          "Fits a 16\" laptop, survives the commute, expands for the weekend. Find the Mokobara backpack that fits your college day. Take the 30-second quiz.",
      },
      { property: "og:title", content: "Best Laptop Backpack for College (2026) | Mokobara" },
      {
        property: "og:description",
        content:
          "Fits a 16\" laptop, survives the commute, expands for the weekend. Find the Mokobara backpack that fits your college day. Take the 30-second quiz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "laptop backpack for college, Mokobara backpack" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mokobara-page">
      <div className="site-shell">
        <header className="site-header">
          <a className="brand-lockup" href="#top" aria-label="Mokobara college edit, back to top">
            <span className="brand-mark" aria-hidden="true">m</span>
            <span className="brand-name">mokobara</span>
          </a>
          <p className="brand-tagline">The Joy Is in the Details</p>
          <span className="header-edition">COLLEGE EDIT <span aria-hidden="true">/</span> 2026</span>
        </header>

        <section className="hero-section" id="top" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" /> THE COLLEGE EDIT</p>
            <h1 className="hero-title" id="page-title">
              The Best Laptop Backpack for College, From Class to <em>Court</em>
            </h1>
            <p className="hero-subhead">Campus in the morning. Court after class.</p>
            <Button asChild size="lg" className="hero-cta">
              <a href="#quiz">
                Take the quiz
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="hero-art" aria-label="A carry-all for campus and court">
            <div className="hero-art-topline">
              <span>CLASS / COURT</span>
              <Sparkles aria-hidden="true" />
            </div>
            <div className="hero-art-center">
              <div className="bag-icon-frame">
                <BriefcaseBusiness aria-hidden="true" />
              </div>
              <p className="hero-art-title">One bag.<br />All day.</p>
            </div>
            <div className="hero-art-footer">
              <span><Laptop aria-hidden="true" /> 16&quot; laptop</span>
              <span className="art-footer-divider" aria-hidden="true" />
              <span><Plane aria-hidden="true" /> Weekend ready</span>
            </div>
            <span className="hero-art-index" aria-hidden="true">01</span>
          </div>
        </section>

        <section className="content-section product-section" aria-labelledby="products-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">THE SHORTLIST</p>
              <h2 className="section-title" id="products-title">Which Mokobara fits your college day?</h2>
            </div>
            <span className="section-count" aria-hidden="true">01 — 03</span>
          </div>
          <div className="product-grid">
            {products.map(({ name, icon: ProductIcon }, index) => (
              <article className="product-card" key={name}>
                <div className={`product-art product-art-${index + 1}`} aria-hidden="true">
                  <span className="product-card-number">0{index + 1}</span>
                  <ProductIcon />
                </div>
                <h3 className="product-title">{name}</h3>
                <p className="placeholder-copy">Product notes coming soon.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section quiz-section" id="quiz" aria-labelledby="quiz-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">YOUR COLLEGE DAY, DECODED</p>
              <h2 className="section-title" id="quiz-title">Quiz: Which Mokobara fits your plan?</h2>
            </div>
            <span className="section-count" aria-hidden="true">02 — 03</span>
          </div>
        </section>

        <section className="content-section padel-section" aria-labelledby="padel-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">FROM CLASS TO COURT</p>
              <h2 className="section-title" id="padel-title">What should I carry to my first padel game?</h2>
            </div>
            <span className="section-count" aria-hidden="true">03 — 03</span>
          </div>
          <div className="answer-box">
            <span className="answer-icon" aria-hidden="true"><Sparkles /></span>
            <p>Answer placeholder.</p>
          </div>
        </section>

        <section className="content-section faq-section" aria-labelledby="faq-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow section-eyebrow">GOOD TO KNOW</p>
              <h2 className="section-title" id="faq-title">FAQ</h2>
            </div>
          </div>
          <Accordion type="single" collapsible className="faq-accordion">
            {questions.map((number) => (
              <AccordionItem value={`question-${number}`} key={number} className="faq-item">
                <AccordionTrigger className="faq-trigger">
                  <span className="faq-number">{number}</span>
                  <span>Question placeholder {number}?</span>
                </AccordionTrigger>
                <AccordionContent className="faq-answer">Answer placeholder.</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <p>Student concept for a Schbang x Atlas SkillTech brief. Not affiliated with or commissioned by Mokobara or 7Padel.</p>
        </div>
      </footer>
    </main>
  );
}
