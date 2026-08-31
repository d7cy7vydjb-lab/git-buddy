import catalog from "@/data/catalog.json";
import vialGold from "@/assets/vial-gold.jpg";
import vialNavy from "@/assets/vial-navy.jpg";
import vialDuo from "@/assets/vial-duo.jpg";
import vialSolvent from "@/assets/vial-solvent.jpg";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

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
};


export type Category = { id: string; name: string; blurb: string };

export const products = catalog.products as Product[];
export const categories = catalog.categories as Category[];

export const FREE_SHIPPING_THRESHOLD = 300;

/** Reference FX rates for display only. */
export const FX = { GBP: 0.85, USD: 1.08 };

export function formatEUR(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
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
  "tirzepatide",
  "retatrutide",
  "bpc-157-tb-500",
  "semaglutide",
  "cjc-1295-ipamorelin",
  "ghk-cu",
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
