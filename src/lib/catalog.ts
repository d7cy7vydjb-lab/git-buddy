import catalog from "@/data/catalog.json";
import vialGold from "@/assets/vial-gold.jpg";
import vialNavy from "@/assets/vial-navy.jpg";
import vialDuo from "@/assets/vial-duo.jpg";
import vialSolvent from "@/assets/vial-solvent.jpg";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductFormat = "vial" | "pen";

export type Product = {
  id: string;
  name: string;
  abbr: string;
  category: string;
  spec: string;
  price: number;
  purity: number | null;
  stock: StockStatus;
  rating: number;
  reviews: number;
  popularity: number;
  added: number;
  description?: string;
  image?: string | null;
  format?: ProductFormat;
};


export type Category = { id: string; name: string; blurb: string };

export const products = catalog.products as Product[];
export const categories = catalog.categories as Category[];

export function productFormat(product: Product): ProductFormat {
  return product.format ?? "vial";
}

export const penProducts = products.filter((p) => productFormat(p) === "pen");
export const vialProducts = products.filter((p) => productFormat(p) === "vial");

/** Per-category accent classes, driven by design tokens in styles.css. */
const CATEGORY_COLORS: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  "fitness-bodybuilding": {
    text: "text-cat-fitness",
    bg: "bg-cat-fitness/10",
    border: "border-cat-fitness/40",
    dot: "bg-cat-fitness",
  },
  "anti-aging-skincare": {
    text: "text-cat-anti-aging",
    bg: "bg-cat-anti-aging/10",
    border: "border-cat-anti-aging/40",
    dot: "bg-cat-anti-aging",
  },
  "medical-pharmaceutical": {
    text: "text-cat-medical",
    bg: "bg-cat-medical/10",
    border: "border-cat-medical/40",
    dot: "bg-cat-medical",
  },
  "wellness-supplements": {
    text: "text-cat-wellness",
    bg: "bg-cat-wellness/10",
    border: "border-cat-wellness/40",
    dot: "bg-cat-wellness",
  },
  "cognitive-brain-health": {
    text: "text-cat-cognitive",
    bg: "bg-cat-cognitive/10",
    border: "border-cat-cognitive/40",
    dot: "bg-cat-cognitive",
  },
  "hair-growth": {
    text: "text-cat-hair",
    bg: "bg-cat-hair/10",
    border: "border-cat-hair/40",
    dot: "bg-cat-hair",
  },
  "solutions-solvents": {
    text: "text-cat-solutions",
    bg: "bg-cat-solutions/10",
    border: "border-cat-solutions/40",
    dot: "bg-cat-solutions",
  },
};

const FALLBACK_CATEGORY_COLOR = {
  text: "text-accent",
  bg: "bg-accent/10",
  border: "border-accent/40",
  dot: "bg-accent",
};

export function categoryColor(id: string) {
  return CATEGORY_COLORS[id] ?? FALLBACK_CATEGORY_COLOR;
}

export const formatLabel: Record<ProductFormat, string> = {
  vial: "Vial",
  pen: "Pen",
};


export const FREE_SHIPPING_THRESHOLD = 300;

/** Reference FX rates for display only. */
export const FX = { GBP: 0.85, USD: 1.08 };

export function formatEUR(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatRef(value: number) {
  const gbp = Math.round(value * FX.GBP);
  const usd = Math.round(value * FX.USD);
  return `≈ £${gbp} / $${usd}`;
}

export function categoryName(id: string) {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function categoryCount(id: string) {
  return products.filter((p) => p.category === id).length;
}

export function productImage(product: Product) {
  if (product.image) return product.image;
  if (product.category === "solutions-solvents") return vialSolvent;
  if (/\+/.test(product.name) || /blend/i.test(product.name)) return vialDuo;
  if (["anti-aging-skincare", "hair-growth", "wellness-supplements"].includes(product.category))
    return vialGold;
  return vialNavy;
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function relatedProducts(product: Product, limit = 8) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export const FEATURED_IDS = [
  "bpc-157",
  "tb-500",
  "retatrutide",
  "ghk-cu",
  "cjc-1295-no-dac",
  "ipamorelin",
];


export const featuredProducts = FEATURED_IDS.map((id) => getProduct(id)).filter(
  (p): p is Product => Boolean(p),
);

export function batchNumber(product: Product) {
  const seed = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return `HLV-${product.abbr.toUpperCase()}-${2400 + (seed % 90)}`;
}

export const stockLabel: Record<StockStatus, string> = {
  "in-stock": "In stock — ships today",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};
