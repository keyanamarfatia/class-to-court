import { createFileRoute } from "@tanstack/react-router";
import { CollectionView, collectionHead } from "@/components/site/collection-page";

export const Route = createFileRoute("/cabin-luggage")({
  head: () => collectionHead("cabin-luggage"),
  component: () => <CollectionView slug="cabin-luggage" />,
});
