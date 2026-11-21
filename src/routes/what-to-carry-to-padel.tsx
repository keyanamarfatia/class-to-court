import { createFileRoute } from "@tanstack/react-router";
import {
  MumbaiSection,
  NextSteps,
  PadelSection,
  PageHero,
  Shell,
  bags,
  crumbSchema,
  faqSchemaFor,
  img,
  padelAnswer,
  padelFaqs,
  pageHead,
} from "@/components/site/sections";

export const Route = createFileRoute("/what-to-carry-to-padel")({
  head: () =>
    pageHead({
      path: "/what-to-carry-to-padel",
      title: "What to Carry to Your First Padel Game: Class to Court Checklist",
      description: "Court shoes, water, towel, a change of clothes and one bag. What to pack for your first padel game straight from class, and where to play at 7Padel.",
      image: img(bags.overnighter.image, 1200),
      schemas: [
        faqSchemaFor([{ q: "What should I carry to my first padel game?", a: padelAnswer }, ...padelFaqs]),
        crumbSchema("First padel game guide", "/what-to-carry-to-padel"),
      ],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="Padel guide"
        eyebrow="From class to court"
        title="What to carry to your first padel game"
        intro="Padel is one of India's fastest-growing sports. Here's everything a new player needs, packed into one bag straight from class."
      />
      <PadelSection />
      <MumbaiSection />
      <NextSteps hide="/what-to-carry-to-padel" />
    </Shell>
  ),
});
