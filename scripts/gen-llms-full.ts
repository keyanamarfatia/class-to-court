// Regenerate with: bun scripts/gen-llms-full.ts
import { writeFileSync } from "node:fs";
import { catalog, SITE } from "../src/data/catalog";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
let out = `# Mokobara Travel Edit: full catalogue\n\n> Every Mokobara cabin suitcase, travel backpack and laptop bag listed on mokobara.com on 21 November 2026, with price, MRP, laptop fit, capacity, dimensions, weight and key features. Student concept by Keyana Marfatia, Vivaan Khubchandani, Mohammed Zaid Sayed, Kushal Chawla, Adnan Gilitwala and Aadhyan Rao (BBA Marketing, Atlas SkillTech University). Not affiliated with Mokobara. Prices change: check mokobara.com before buying.\n\n`;
for (const c of catalog) {
  out += `## ${c.title} (${c.items.length} models)\n\nCollection page: ${SITE}${c.path}\n\n`;
  for (const p of c.items) {
    const spec = [p.laptop && `${p.laptop}" laptop`, p.litres && `${p.litres}L`, p.dims, p.kg && `${p.kg} kg`].filter(Boolean).join(", ");
    out += `- [${p.name}](https://mokobara.com/products/${p.handle}): ${inr(p.price)} (MRP ${inr(p.mrp)})${spec ? `; ${spec}` : ""}; ${p.features.join("; ")}.\n`;
  }
  out += "\n";
}
out += `## 7Padel by MS Dhoni\n\n- [7padel.in](https://7padel.in): Book padel courts online. Facilities listed: air-conditioned indoor arenas, night lighting, shower and changing rooms, equipment rental (rackets, balls), on-site refreshments and lounge.\n`;
writeFileSync("public/llms-full.txt", out);
console.log("wrote", out.length, "chars");
