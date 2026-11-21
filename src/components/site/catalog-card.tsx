import type { Product } from "@/data/catalog";
import { img, inr } from "./chrome";

export function CatalogCard({ item, headingLevel = 4 }: { item: Product; headingLevel?: 3 | 4 }) {
  const off = item.mrp > item.price ? Math.round((1 - item.price / item.mrp) * 100) : 0;
  const url = `https://mokobara.com/products/${item.handle}`;
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article className="cat-card">
      <a className="cat-tile" href={url} target="_blank" rel="noopener noreferrer">
        {off > 0 && <span className="badge">{off}% off</span>}
        <img src={img(item.img, 500)} alt={`Mokobara ${item.name}`} loading="lazy" width={500} height={600} />
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
        {item.dims && <p className="cat-dims">{item.dims}</p>}
        <a className="product-link" href={url} target="_blank" rel="noopener noreferrer">
          Buy on mokobara.com
        </a>
      </div>
    </article>
  );
}
