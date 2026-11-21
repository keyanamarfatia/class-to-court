import { createFileRoute } from "@tanstack/react-router";
import { CollegeFaqSection, NextSteps, PageHero, Shell, bags, collegeFaqs, crumbSchema, faqSchemaFor, img, pageHead } from "@/components/site/sections";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      path: "/faq",
      title: "Mokobara College Backpack FAQ: Laptop Fit, Water Resistance, Trial & Warranty",
      description: "Which Mokobara backpack fits a 16-inch laptop? Are they water resistant? What about the 30-day trial and warranty? Answers from mokobara.com.",
      image: img(bags.overnighter.image, 1200),
      schemas: [faqSchemaFor(collegeFaqs), crumbSchema("FAQ", "/faq")],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="FAQ"
        eyebrow="Good to know"
        title="Mokobara college backpack FAQ"
        intro="Quick, factual answers to what students ask before buying a Mokobara backpack, taken from mokobara.com."
      />
      <CollegeFaqSection head={false} />
      <NextSteps hide="/faq" />
    </Shell>
  ),
});
