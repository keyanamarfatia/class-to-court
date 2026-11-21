import { createFileRoute, redirect } from "@tanstack/react-router";
import { catalog } from "@/data/catalog";

/* Old URLs (/collections/cabin-luggage etc.) permanently redirect to the short ones. */
export const Route = createFileRoute("/collections/$slug")({
  beforeLoad: ({ params }) => {
    const c = catalog.find((x) => x.slug === params.slug);
    throw redirect({ to: c ? c.path : "/", statusCode: 301 });
  },
});
