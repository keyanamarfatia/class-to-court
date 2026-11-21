import { createFileRoute } from "@tanstack/react-router";
import { NextSteps, PageHero, QuizSSection, Shell, bags, crumbSchema, img, pageHead } from "@/components/site/sections";

export const Route = createFileRoute("/bag-finder-quiz")({
  head: () =>
    pageHead({
      path: "/bag-finder-quiz",
      title: "Which Mokobara Bag Should I Buy? 30-Second Bag Finder Quiz",
      description: "Answer three questions about your laptop and your day and get the Mokobara backpack that fits: Overnighter, Backpack Pro, Backpack 16L or Kaleido.",
      image: img(bags.overnighter.image, 1200),
      schemas: [crumbSchema("Bag finder quiz", "/bag-finder-quiz")],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="Bag finder quiz"
        eyebrow="30 seconds"
        title="Which Mokobara bag should I buy?"
        intro="Three questions about your laptop, your plans after class and how you like to pack. One Mokobara that fits."
      />
      <QuizSSection />
      <NextSteps hide="/bag-finder-quiz" />
    </Shell>
  ),
});
