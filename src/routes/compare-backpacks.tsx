import { createFileRoute } from "@tanstack/react-router";
import { CompareSection, NextSteps, PageHero, Shell, WorriesSection, bags, crumbSchema, img, itemListSchema, pageHead } from "@/components/site/sections";

export const Route = createFileRoute("/compare-backpacks")({
  head: () =>
    pageHead({
      path: "/compare-backpacks",
      title: "Mokobara Backpacks Compared: Overnighter vs Backpack Pro vs 16L vs Kaleido",
      description: "Compare Mokobara's best travel backpacks side by side: laptop fit, capacity, bottle pockets and price, with facts from mokobara.com.",
      image: img(bags.overnighter.image, 1200),
      schemas: [itemListSchema, crumbSchema("Compare backpacks", "/compare-backpacks")],
    }),
  component: () => (
    <Shell>
      <PageHero
        crumb="Compare backpacks"
        eyebrow="Side by side"
        title="Mokobara travel backpacks compared"
        intro="Four Mokobara backpacks for weekend trips and carry-on travel, compared on laptop fit, capacity, bottle pockets and price."
      />
      <CompareSection head={false} />
      <section className="mk-section" aria-labelledby="table-title">
        <div className="mk-shell">
          <h2 className="section-title" id="table-title">How do the 4 backpacks compare on price?</h2>
          <div className="table-wrap home-table">
              <table className="compare-table">
                <caption>Mokobara travel backpacks at a glance (mokobara.com, 21 November 2026)</caption>
                <thead>
                  <tr>
                    <th scope="col">Backpack</th>
                    <th scope="col">Laptop fit</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Price</th>
                    <th scope="col">MRP</th>
                    <th scope="col">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Overnighter Backpack</th><td>16" MacBook / 15.6"</td><td>19L → 23L</td><td>₹8,999</td><td>₹14,999</td><td>40%</td></tr>
                  <tr><th scope="row">Backpack Pro 21L</th><td>15.6" / 16" MacBook Pro</td><td>21L</td><td>₹4,999</td><td>₹10,999</td><td>55%</td></tr>
                  <tr><th scope="row">Kaleido Backpack</th><td>15.6"</td><td>28L</td><td>₹3,999</td><td>₹6,999</td><td>43%</td></tr>
                  <tr><th scope="row">Backpack 16L</th><td>15"</td><td>16L</td><td>₹3,999</td><td>₹8,999</td><td>56%</td></tr>
                </tbody>
              </table>
            </div>
        </div>
      </section>
      <WorriesSection />
      <NextSteps hide="/compare-backpacks" />
    </Shell>
  ),
});
