import type { Product } from "@/data/catalog";
import { img, inr } from "./chrome";

const srcSet = (path: string, widths: number[]) => widths.map((w) => `${path}?width=${w} ${w}w`).join(", ");

/* One self-contained, quotable sentence per product, built only from mokobara.com data. */
export function productSentence(item: Product) {
  const off = item.mrp > item.price ? Math.round((1 - item.price / item.mrp) * 100) : 0;
  const parts: string[] = [];
  if (item.litres) parts.push(`holds ${item.litres}L`);
  if (item.laptop) parts.push(`fits up to a ${item.laptop}-inch laptop`);
  if (item.kg) parts.push(`weighs ${item.kg} kg`);
  parts.push(`costs ${inr(item.price)} on mokobara.com${off ? ` (${off}% below its ${inr(item.mrp)} MRP)` : ""}`);
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
  return `The Mokobara ${item.name} ${list}.`;
}

export function CatalogCard({ item, headingLevel = 4 }: { item: Product; headingLevel?: 3 | 4 }) {
  const off = item.mrp > item.price ? Math.round((1 - item.price / item.mrp) * 100) : 0;
  const url = `https://mokobara.com/products/${item.handle}`;
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article className="cat-card">
      <a className="cat-tile" href={url} target="_blank" rel="noopener noreferrer">
        {off > 0 && <span className="badge">{off}% off</span>}
        <img src={img(item.img, 400)} srcSet={srcSet(item.img, [240, 400, 600])} sizes="(min-width: 1024px) 22vw, (min-width: 760px) 30vw, 48vw" alt={`Mokobara ${item.name}`} loading="lazy" decoding="async" width={400} height={480} />
      </a>
      <div className="cat-body">
        <H className="cat-name">{item.name}</H>
        <p className="price-row">
          <strong>{inr(item.price)}</strong>
          {item.mrp > item.price && <s>{inr(item.mrp)}</s>}
          {item.colours > 1 && <span className="colours">{item.colours} colours</span>}
        </p>
        <ul className="cat-specs">
          {item.laptop && <li>{item.laptop}" laptop</li>}
          {item.litres && <li>{item.litres}L</li>}
          {item.kg && <li>{item.kg} kg</li>}
        </ul>
        <ul className="cat-feat">
          {item.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="cat-summary">{productSentence(item)}</p>
        {item.dims && <p className="cat-dims">{item.dims}</p>}
        <a className="product-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Buy on mokobara.com: ${item.name}`}>
          Buy on mokobara.com
        </a>
      </div>
    </article>
  );
}
