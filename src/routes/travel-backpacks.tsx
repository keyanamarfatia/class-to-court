import { createFileRoute } from "@tanstack/react-router";
import { CollectionView, collectionHead } from "@/components/site/collection-page";

export const Route = createFileRoute("/travel-backpacks")({
  head: () => collectionHead("travel-backpacks"),
  component: () => <CollectionView slug="travel-backpacks" />,
});
