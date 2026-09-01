import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ResearchDisclaimer, Stars } from "@/components/site/blocks";
import { FormatTag, StockDot } from "@/components/site/ProductCard";
import {
  batchNumber,
  categoryName,
  formatEUR,
  formatRef,
  getProduct,
  productFormat,
  productImage,
  relatedProducts,
  stockLabel,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | Halvin Research" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} ${product.spec} — ${product.purity ?? 99}% HPLC | Halvin Research`;
    const description = `${product.name} research reference material, ${product.spec}. HPLC-verified with batch Certificate of Analysis. ${formatEUR(product.price)} with EU dispatch. Research use only.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

const REVIEWS = [
  { name: "Dr. P. Lindqvist", body: "Clean single peak on our own HPLC run. Matches the supplied COA within tolerance.", stars: 5 },
  { name: "S. Barbieri", body: "Lyophilisate well formed, reconstituted without residue. Packaging arrived intact in Italy.", stars: 5 },
  { name: "Dr. H. Baumann", body: "Consistent across two lots. Documentation is thorough enough for our audit trail.", stars: 4 },
];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const soldOut = product.stock === "out-of-stock";
  const isPen = productFormat(product) === "pen";
  const related = relatedProducts(product);

  return (
    <>
      <div className="container-page py-8">
        <nav className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/shop" className="hover:text-accent">
            Shop
          </Link>
          <span className="px-2">/</span>
          <Link to="/shop" search={{ category: product.category }} className="hover:text-accent">
            {categoryName(product.category)}
          </Link>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <img
                src={productImage(product)}
                alt={`${product.name} ${product.spec} ${isPen ? "research injection pen and carton" : "research vial"}`}
                width={912}
                height={912}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {(isPen
                ? ["Pen", "Dose dial", "Carton"]
                : ["Vial", "Lyophilisate", "Packaging"]
              ).map((label) => (
                <div
                  key={label}
                  className="overflow-hidden rounded-md border border-border bg-surface"
                >
                  <img
                    src={productImage(product)}
                    alt={`${product.name} ${label.toLowerCase()} view`}
                    width={912}
                    height={912}
                    loading="lazy"
                    className="aspect-square w-full object-cover opacity-70"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{categoryName(product.category)}</p>
              <FormatTag product={product} />
            </div>
            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Stars value={product.rating} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {product.rating} / 5 · {product.reviews} reviews
              </span>
            </div>

            <div className="mt-7 flex items-end gap-4">
              <p className="font-display text-3xl font-semibold">{formatEUR(product.price)}</p>
              <p className="pb-1 font-mono text-xs text-muted-foreground">
                {formatRef(product.price)}
              </p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Price per pack of {product.spec}. VAT calculated at checkout.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <StockDot stock={product.stock} />
              <span className="text-sm text-muted-foreground">{stockLabel[product.stock]}</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex h-12 items-center rounded-md border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-11 place-items-center text-muted-foreground hover:text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-mono text-sm">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-12 w-11 place-items-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                disabled={soldOut}
                onClick={() => {
                  add(product.id, qty);
                  toast.success(`${qty} × ${product.name} added to cart`);
                }}
                className="h-12 flex-1 rounded-md bg-accent px-8 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {soldOut ? "Out of stock" : "Add to Cart"}
              </button>
            </div>

            <a
              href="#coa"
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-gold/40 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              <Download className="h-4 w-4" /> Download Certificate of Analysis (PDF)
            </a>

            {product.description ? (
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="eyebrow">Product description</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            ) : null}



            <dl className="mt-9 divide-y divide-border border-y border-border text-sm">
              {[
                ["Format", `Lyophilised powder — ${product.spec}`],
                ["Purity (HPLC)", product.purity ? `≥ ${product.purity}%` : "Sterile solution"],
                ["Identity", "Confirmed by mass spectrometry"],
                ["Catalogue code", product.abbr],
                ["Batch / lot", batchNumber(product)],
                ["Storage", "−20 °C, protected from light. Reconstituted: 2–8 °C, use within 21 days."],
                ["Reconstitution", "Bacteriostatic water; suggested working concentration per protocol."],
                ["Handling", "In-vitro laboratory research only. Not for human or veterinary use."],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="min-w-0">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="panel flex items-start gap-3 p-4">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-xs text-muted-foreground">
                  Free tracked EU shipping over €300. Same-day dispatch before 12:00 CET.
                </p>
              </div>
              <div className="panel flex items-start gap-3 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-xs text-muted-foreground">
                  Independent third-party testing on every lot, COA archived for five years.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="coa" className="mt-20">
          <h2 className="text-2xl font-semibold">Analytical documentation</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["HPLC purity report", `Batch ${batchNumber(product)} · RP-HPLC, 220 nm`],
              ["Mass spectrometry", "ESI-MS identity confirmation"],
              ["Sterility & endotoxin", "Applicable to solution products"],
            ].map(([title, meta]) => (
              <div key={title} className="panel flex flex-col p-6">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-2 flex-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {meta}
                </p>
                <button
                  type="button"
                  onClick={() => toast.info("COA download requires a verified research account.")}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <Download className="h-4 w-4" /> PDF
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold">Researcher reviews</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="panel p-6">
                <Stars value={r.stars} />
                <p className="mt-4 text-sm text-muted-foreground">“{r.body}”</p>
                <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-semibold">Related compounds</h2>
            <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$productId"
                  params={{ productId: p.id }}
                  className="w-56 shrink-0 snap-start rounded-lg border border-border bg-card transition-colors hover:border-accent/50"
                >
                  <img
                    src={productImage(p)}
                    alt={p.name}
                    width={912}
                    height={912}
                    loading="lazy"
                    className="aspect-square w-full rounded-t-lg object-cover"
                  />
                  <div className="p-4">
                    <h3 className="truncate text-sm font-semibold">{p.name}</h3>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">{p.spec}</p>
                    <p className="mt-2 font-display text-sm font-semibold">{formatEUR(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ResearchDisclaimer className="mt-16" />
      </div>
    </>
  );
}
