/* Full catalogue pulled from mokobara.com's own collections on 21 Nov 2026:
   /collections/explore-cabin-luggage, /collections/travel-bags-backpacks,
   /collections/laptop-bags + /collections/laptop-backpack.
   Prices, colours, specs, features and images are Mokobara's own. */

export type Product = {
  handle: string;
  name: string;
  price: number;
  mrp: number;
  colours: number;
  litres?: string;
  laptop?: string;
  dims?: string;
  kg?: string;
  img: string;
  features: string[];
};

const CDN = "https://cdn.shopify.com/s/files/1/0068/7341/5750/";

const p = (
  handle: string,
  name: string,
  price: number,
  mrp: number,
  colours: number,
  litres: string | null,
  laptop: string | null,
  dims: string | null,
  kg: string | null,
  img: string,
  features: string[],
): Product => ({
  handle,
  name,
  price,
  mrp,
  colours,
  litres: litres ?? undefined,
  laptop: laptop ?? undefined,
  dims: dims ?? undefined,
  kg: kg ?? undefined,
  img: CDN + img,
  features,
});

export const cabin: Product[] = [
  p("the-cabin-luggage", "Cabin Luggage", 9999, 11999, 11, "41", null, "37 x 22.8 x 57.8 cm", "3.27", "files/The-Cabin-Luggage_SY-45_1.jpg", ["German Makrolon polycarbonate shell, flexible and strong", "Built-in USB port to charge your phone on the go"]),
  p("the-aisle-trunk-cabin", "Aisle Trunk - Cabin", 4799, 10999, 5, "40", null, "55.5 x 34 x 25 cm", "3.12", "files/The-Aisle-Trunk_Cabin_Stardust-1.jpg", ["German Makrolon polycarbonate hard shell", "8 silent-run wheels for carpet and tiles"]),
  p("the-transit-cabin-pro", "Transit Cabin Pro", 6799, 13999, 6, "40", "15.6", "56 x 34.5 x 24 cm", "3.46", "files/The-Transit-Cabin-Pro-Shopify-New-Crypto-Sunray-10_a17afe76-eda0-401c-a99d-2dcdcd2c86da.jpg", ["8 Japanese Hinomoto wheels", "Keyless TSA lock secures front and main compartments"]),
  p("the-cabin-overnighter-luggage", "Cabin Overnighter Luggage", 11499, 18999, 4, "41", "14", "48 x 44.2 x 25 cm", "3.19", "files/The-Overnighter-Luggage_2.0_SLB-1_9f905c8f-723f-4a4e-ba4b-268f0f3927c8.jpg", ["Front tech compartment for quick airport security checks", "8 super silent Japanese Hinomoto wheels"]),
  p("the-cabin-pro", "Cabin Pro", 13599, 21999, 15, "40", "15", "57.8 x 37 x 24.3 cm", "3.65", "files/The-Cabin-Pro_2.0-1_-_Copy.jpg", ["Slim exterior pocket for laptop, power bank and passport", "Fits up to a 15\" laptop"]),
  p("the-transit-cabin-overnighter", "Transit Cabin Overnighter", 5999, 12999, 8, "44", "15.6", "45 x 48 x 24 cm", "3.49", "files/The-Transit-Cabin-Overnighter-3_2.0_WMAS-1_1.jpg", ["Front tech compartment for airport security checks", "8 silent-run wheels"]),
  p("the-aviator-cabin-luggage", "Aviator Cabin Luggage", 4499, 12999, 4, "37", null, "54.5 x 20.5 x 40 cm", "2", "files/The-Aviator-Luggage_Cabin_OOTB-1.webp", ["Mokobara's most lightweight luggage", "Ultra-strong polypropylene hard shell"]),
  p("the-aisle-cabin-pro", "Aisle Cabin Pro", 6499, 12999, 3, "41", "15.6", "57 x 35.5 x 24 cm", "3.65", "files/Aisle-Cabin-Pro_Money-moves_1.jpg", ["Quick-access tech compartment for a 15.6\" laptop", "German Makrolon polycarbonate hardshell"]),
  p("the-transit-cabin-luggage", "Transit Luggage - Cabin", 5799, 11999, 9, "40", null, "54 x 37.5 x 23.5 cm", "3.23", "files/The_Transit_Luggage_-_Cabin-25.jpg", ["German Makrolon polycarbonate hard shell", "8 smooth Japanese Hinomoto wheels"]),
  p("the-em-cabin-pro", "Em Cabin Pro", 6999, 11999, 5, "41", "15.6", "56 x 35.6 x 25 cm", "3.29", "files/The-Em-Cabin-Pro_GES-1.jpg", ["Fits a 15.6\" laptop, charger and documents", "Keyless TSA-approved lock"]),
];

export const travel: Product[] = [
  p("the-overnighter-backpack", "Overnighter Backpack", 8999, 14999, 3, "19 → 23", "16", "45 x 31 x 13.5 cm", null, "files/The-Overnighter-Backpack_2.0_Headspace-1_5d7d9473-adbb-4b42-9714-43961b9644fc.jpg", ["Fits a 16\" MacBook, 15.6\" for other laptops", "Front pocket detaches into a sling bag"]),
  p("boxer-studio-backpack", "Boxer Studio Backpack", 8999, 12999, 3, "22", null, "44 x 29 x 17 cm", "1.24", "files/Boxer-Studio-Backpack-1.jpg", ["Nylon with vegan-leather trims", "Internal zipper pockets and an ID slot"]),
  p("beetle-toggle-backpack", "Beetle Toggle Backpack", 8999, 12999, 3, "25", null, "44 x 32 x 18 cm", "1.13", "files/Beetle-Toggle-Backpack_MM-1.jpg", ["Nylon with vegan-leather trims", "2 slip pockets, 2 pen pockets and an ID slot"]),
  p("rogue-toggle-backpack", "Rogue Toggle Backpack", 9999, 13999, 2, "32", null, "50 x 31 x 18.5 cm", "1.26", "files/Rogue-Toggle-Backpack_MMG-1.jpg", ["Main compartment built tall for extra space", "Nylon with vegan leather trims"]),
  p("teleporter-toggle-backpack", "Teleporter Toggle Backpack", 10999, 14999, 3, "30", null, "43.5 x 30 x 19.5 cm", "1.7", "files/Teleporter-Toggle-Backpack_MMS-1_1c2bdf5d-f7be-4215-9570-de3b6df37826.jpg", ["6 quick-access pockets", "Reverse-coated nylon with vegan leather trims"]),
  p("marshal-terra-backpack", "Marshal Terra Backpack", 12999, 15999, 3, null, null, null, null, "files/Marshal-Terra-Backpack_Snowman-1.jpg", ["Luggage-like main compartment", "Spill-proof pocket and 2 zipper compartments"]),
  p("transit-z-backpack", "Transit Z Backpack", 6299, 9999, 4, "30", null, "47 x 31 x 19 cm", "1.3", "files/Transit-Z-Backpack-MMS-1_36e201af-6b54-4857-8c12-ebce675f7f66.jpg", ["Front bucket compartment with key and card holder", "Reverse-coated nylon"]),
  p("transit-z-perfect-camouflage", "Transit Z - Perfect Camouflage", 6499, 9999, 1, "30", null, "47 x 31 x 19 cm", "1.3", "files/Transit-Z-Backpack-Perfect-Camouflage-1.jpg", ["Front bucket compartment with key and card holder", "Reverse-coated nylon"]),
  p("the-astronaut-backpack", "Astronaut Backpack", 6899, 10999, 2, "25", "16", "45.5 x 32.5 x 17 cm", "1.42", "files/The-Astronaut-Backpack--Shopify-1.jpg", ["Zipper mesh compartment for up to a 2-day trip", "Reverse-coated nylon"]),
  p("transit-autopilot-backpack", "Transit Autopilot Backpack", 5999, 9999, 3, "30", null, "48 x 31 x 20 cm", "1.5", "files/Transit-Autopilot-Backpack_MMS-1.jpg", ["Card holder, mesh and zipper pockets inside", "Nylon with vegan leather trims"]),
  p("the-transit-backpack-pro", "Transit Backpack Pro", 7299, 11999, 3, null, "15.6", "47 x 29.5 x 17 cm", null, "files/The-Transit-Backpack-Pro_HG-1.webp", ["Water-resistant nylon", "Two quick-access front pockets"]),
  p("the-transit-backpack", "Transit Backpack - 30L", 4999, 9999, 5, "30", "16", "48 x 31 x 16 cm", null, "files/The_Transit_Backpack_30L_Crypto_Sunray_1.jpg", ["Designed for everyday use and 1–2 day trips", "Works for laptops up to 16\""]),
  p("the-aisle-backpack", "Aisle Backpack", 3799, 6999, 4, "19", null, "48 x 30 x 13 cm", "1.09", "files/TheAisleBackpack2_BearHug_-01.jpg", ["Lightweight Aerology Nylon", "Main compartment opens flat"]),
  p("the-hovercraft-backpack", "Hovercraft Backpack", 6499, 10999, 7, null, "15.6", "41 x 32 x 18 cm", null, "files/The-Hovercraft-Backpack_2.0-FA-1.jpg", ["Water-resistant nylon", "Quick-access front pocket"]),
  p("the-terra-work-backpack", "Terra Work Backpack", 9999, 16999, 6, "25", "16", "43 x 32 x 17.5 cm", null, "files/The-Terra-Work-Backpack_2.0_Crypto-1.jpg", ["10 thoughtfully designed pockets", "Premium water-resistant nylon"]),
  p("the-dodge-backpack", "Dodge Backpack", 6999, 12999, 2, "19", null, "45.5 x 29.5 x 14.5 cm", "1.67", "files/The-Dodge-Backpack-Light-Year-Shopify-1_f6c9e053-8315-4a45-bafa-14ae495e01fc.jpg", ["Custom-embroidered badges on the front", "Nylon with vegan leather trims"]),
];

export const laptop: Product[] = [
  p("the-backpack-pro-bags-online", "Backpack Pro - 21L", 4999, 10999, 5, "21", "16", "30 x 15.5 x 44 cm", null, "files/The-Backpack-Pro_DD-1.webp", ["Fits 15.6\" laptops or a 16\" MacBook Pro", "Water-resistant nylon body"]),
  p("the-backpack-bags-online", "Backpack - 16L", 3999, 8999, 7, "16", "15", "29 x 14 x 41 cm", null, "products/The-Backpack_DD-1-New.webp", ["Padded sleeve for a 15\" laptop", "Side pocket zips out to fit a water bottle"]),
  p("the-kaleido-backpack", "Kaleido Backpack", 3999, 6999, 6, "28", "15.6", "48.7 x 31.2 x 15.2 cm", null, "products/The-Kaleido-Backpack_Crypto-1_4b719e74-24e9-45e6-8009-08124f010bcc.webp", ["Microsuede lining keeps your laptop scratch-free", "Mesh side pocket for a bottle or umbrella"]),
  p("the-work-backpack", "Work Backpack", 8499, 13999, 5, null, "16", "45 x 31 x 13.5 cm", null, "files/The-Work-Backpack_2.0-Crypto-1_bb460c16-5301-4814-aed4-5f6ddfeae11b.jpg", ["Fits a 16\" MacBook, 15.6\" for other laptops", "180° flat-opening laptop compartment"]),
  p("the-terra-work-backpack", "Terra Work Backpack", 9999, 16999, 6, "25", "16", "43 x 32 x 17.5 cm", null, "files/The-Terra-Work-Backpack_2.0_Crypto-1.jpg", ["10 thoughtfully designed pockets", "Premium water-resistant nylon"]),
  p("the-transit-backpack", "Transit Backpack - 30L", 4999, 9999, 5, "30", "16", "48 x 31 x 16 cm", null, "files/The_Transit_Backpack_30L_Crypto_Sunray_1.jpg", ["Everyday use and 1–2 day trips", "Works for laptops up to 16\""]),
  p("the-transit-backpack-20l", "Transit Backpack - 20L", 4499, 8999, 5, "20", "15", "42 x 26 x 15.5 cm", null, "files/The_Transit_Backpack_20L-01.jpg", ["Sleek minimalist design", "Water-resistant materials and premium zippers"]),
  p("the-transit-backpack-pro", "Transit Backpack Pro", 7299, 11999, 3, null, "15.6", "47 x 29.5 x 17 cm", null, "files/The-Transit-Backpack-Pro_HG-1.webp", ["Water-resistant nylon", "Two quick-access front pockets"]),
  p("the-autopilot-backpack", "Autopilot Backpack", 4799, 7999, 3, null, "15.6", "48 x 31 x 22.5 cm", null, "files/The-Autopilot-Backpack_Crypto-1_10c48fe2-b23f-4bea-88b0-5a0e47fcb0c4.jpg", ["Two compartments to split tech from essentials", "Reverse-coated polyester and nylon"]),
  p("the-hovercraft-backpack", "Hovercraft Backpack", 6499, 10999, 7, null, "15.6", "41 x 32 x 18 cm", null, "files/The-Hovercraft-Backpack_2.0-FA-1.jpg", ["Water-resistant nylon", "Quick-access front pocket"]),
  p("the-radio-backpack", "Radio Backpack", 5999, 10999, 6, null, "15.6", "44 x 29.5 x 17 cm", null, "files/The-Radio-Backpack_2.0-FA-1_7baa7d60-0c25-4edd-bbe2-23e80ca476c4.jpg", ["Premium water-resistant material", "Two quick-access front pockets"]),
  p("the-spacewalk-backpack", "Spacewalk Backpack", 3999, 8999, 2, null, "15.6", "42 x 30 x 13.5 cm", null, "files/The_Spacewalk_Back_Pack_Homebrew_sunray_shopify_1_a44b1b90-6d3f-45ae-b4a0-d472073896b2.jpg", ["Vegan leather and water-resistant nylon", "Slip, pen and zippered pockets"]),
  p("the-sundae-backpack", "Sundae Backpack", 6299, 9999, 3, "20", "15", "41 x 30 x 16 cm", "0.95", "files/The-Sundae-Backpack_BG-1_50266684-76b8-418a-99a3-26a39efbc42f.jpg", ["Soft nylon with vegan leather trims", "Laptop compartment fits up to a 15\" laptop"]),
  p("the-bliss-backpack", "Bliss Backpack", 6999, 11999, 3, null, "14", "41 x 32 x 18.5 cm", null, "files/Bliss-Backpack_NewR3.webp", ["Water-resistant nylon with vegan leather trims", "Two front zippered compartments"]),
  p("the-briefcase-pro", "The Briefcase Pro", 6999, 12999, 4, null, "16", null, "1.4", "products/The-Briefcase-Pro_TB-1.webp", ["Water-resistant nylon and vegan leather", "Pen, zipper and slip pockets plus a laptop pocket"]),
  p("the-decaf-briefcase", "Decaf Briefcase", 6799, 10999, 3, null, "15", "38.5 x 28 x 8 cm", "1.05", "files/The-Decaf-Breifcase-CL-1.jpg", ["Retractable key holder", "Slip, pen and zipper pockets"]),
  p("the-aisle-laptop-sleeve-large", "Aisle Laptop Sleeve - 15.6\"", 1399, 2499, 3, null, "15.6", "38 x 28 x 2.5 cm", "0.21", "files/The-Aisle-Laptop-Sleeve_Large-Money-Moves--1.jpg", ["Aerology Nylon fabric", "Microsuede lining protects from scratches"]),
  p("the-aisle-laptop-sleeve", "Aisle Laptop Sleeve - 14\"", 999, 1999, 3, null, "14", "36 x 26 x 2.5 cm", null, "files/The-Aisle-Laptop-Sleeve_Small-Money-Moves--1.jpg", ["Aerology Nylon fabric", "Microsuede lining protects from scratches"]),
];

export const catalog = [
  {
    id: "cabin",
    slug: "cabin-luggage",
    path: "/cabin-luggage",
    label: "Cabin luggage",
    eyebrow: "For the flight home",
    title: "Mokobara cabin luggage",
    intro:
      "Every Mokobara cabin suitcase in one place: hard-shell carry-ons for the flight home, with laptop compartments on the Pro and Overnighter models.",
    items: cabin,
  },
  {
    id: "travel",
    slug: "travel-backpacks",
    path: "/travel-backpacks",
    label: "Travel backpacks",
    eyebrow: "For the weekend",
    title: "Mokobara travel backpacks",
    intro: "Every Mokobara travel backpack for weekend trips, from the expandable Overnighter to the Toggle series.",
    items: travel,
  },
  {
    id: "laptop",
    slug: "laptop-bags",
    path: "/laptop-bags",
    label: "Laptop bags",
    eyebrow: "For class",
    title: "Mokobara laptop bags",
    intro: "Every Mokobara laptop backpack, briefcase and sleeve for college, sorted by what fits your laptop.",
    items: laptop,
  },
] as const;

export const SITE = "https://class-to-court-carry.lovable.app";

export type Collection = (typeof catalog)[number];
