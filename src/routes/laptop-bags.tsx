import { createFileRoute } from "@tanstack/react-router";
import { CollectionView, collectionHead } from "@/components/site/collection-page";

export const Route = createFileRoute("/laptop-bags")({
  head: () => collectionHead("laptop-bags"),
  component: () => <CollectionView slug="laptop-bags" />,
});
