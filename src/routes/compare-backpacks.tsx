import { createFileRoute } from "@tanstack/react-router";
import { CompareSection, NextSteps, PageHero, Shell, WorriesSection, bags, crumbSchema, img, itemListSchema, pageHead } from "@/components/site/sections";

export const Route = createFileRoute("/compare-backpacks")({
  head: () =>
    pageHead({
      path: "/compare-backpacks",
      title: "Mokobara Backpacks Compared: Overnighter vs Backpack Pro vs 16L vs Kaleido",
      description: "Compare Mokobara's best college backpacks side by side: laptop fit, capacity, bottle pockets and price, with facts from mokobara.com.",
      image: img(bags.overnighter.image, 1200),
      schemas: [itemListSchema, crumbSchema("Compare backpacks", "/compare-backpacks")],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="Compare backpacks"
        eyebrow="Side by side"
        title="Mokobara college backpacks compared"
        intro="Four Mokobara backpacks students actually shortlist, compared on what matters for class: laptop fit, capacity, bottle pockets and price."
      />
      <CompareSection head={false} />
      <WorriesSection />
      <NextSteps hide="/compare-backpacks" />
    </Shell>
  ),
});
