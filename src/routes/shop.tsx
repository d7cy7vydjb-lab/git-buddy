import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LayoutGrid, Rows3, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard, StockDot } from "@/components/site/ProductCard";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";
import {
  categories,
  categoryCount,
  categoryName,
  formatEUR,
  formatRef,
  productImage,
  products,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ShopSearch = {
  category?: string | undefined;
  sort?: string | undefined;
  max?: number | undefined;
  purity?: string | undefined;
  stock?: string | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const out: ShopSearch = {};
    if (typeof search["category"] === "string") out.category = search["category"];
    if (typeof search["sort"] === "string") out.sort = search["sort"];
    if (typeof search["purity"] === "string") out.purity = search["purity"];
    if (typeof search["stock"] === "string") out.stock = search["stock"];
    const max = Number(search["max"]);
    if (Number.isFinite(max) && max > 0) out.max = max;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Shop Research Peptides — 70 Verified Compounds | Halvin Research" },
      {
        name: "description",
        content:
          "Browse 70 research peptides with 99%+ HPLC purity, batch COAs and EUR pricing. Filter by category, price, purity and stock status.",
      },
      { property: "og:title", content: "Shop Research Peptides | Halvin Research" },
      {
        property: "og:description",
        content:
          "70 research-grade peptides with published HPLC data, EUR pricing and fast EU dispatch.",
      },
    ],
  }),
  component: Shop,
});

const SORTS = [
  { id: "popularity", label: "Popularity" },
  { id: "price-asc", label: "Price (low to high)" },
  { id: "price-desc", label: "Price (high to low)" },
  { id: "newest", label: "Newest" },
];

const MAX_PRICE = Math.max(...products.map((p) => p.price));

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { add } = useCart();

  const sort = search.sort ?? "popularity";
  const max = search.max ?? MAX_PRICE;

  const setSearch = (patch: ShopSearch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), resetScroll: false });

  const list = useMemo(() => {
    let out = products.filter((p) => p.price <= max);
    if (search.category) out = out.filter((p) => p.category === search.category);
    if (search.purity === "99") out = out.filter((p) => (p.purity ?? 0) >= 99);
    if (search.stock === "in-stock") out = out.filter((p) => p.stock !== "out-of-stock");
    const sorted = [...out];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "newest") sorted.sort((a, b) => b.added - a.added);
    else sorted.sort((a, b) => b.popularity - a.popularity);
    return sorted;
  }, [search.category, search.purity, search.stock, sort, max]);

  return (
    <>
      <PageHeader
        eyebrow={`${products.length} compounds in catalogue`}
        title="Research peptide catalogue"
        lead="Every listing ships with a batch-matched Certificate of Analysis. Prices in EUR, with GBP and USD shown for reference."
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="mb-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border text-sm lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          <div className={cn("space-y-8", filtersOpen ? "block" : "hidden lg:block")}>
            <div>
              <h2 className="eyebrow">Category</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setSearch({ category: undefined })}
                    className={cn(
                      "text-left transition-colors hover:text-accent",
                      !search.category ? "text-accent" : "text-muted-foreground",
                    )}
                  >
                    All categories ({products.length})
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSearch({ category: c.id })}
                      className={cn(
                        "text-left transition-colors hover:text-accent",
                        search.category === c.id ? "text-accent" : "text-muted-foreground",
                      )}
                    >
                      {c.name} ({categoryCount(c.id)})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Max price</h2>
              <input
                type="range"
                min={20}
                max={MAX_PRICE}
                step={5}
                value={max}
                onChange={(e) => setSearch({ max: Number(e.target.value) })}
                className="mt-4 w-full accent-accent"
              />
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                €20 — {formatEUR(max)}
              </p>
            </div>

            <div>
              <h2 className="eyebrow">Purity level</h2>
              <label className="mt-3 flex items-center gap-2.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={search.purity === "99"}
                  onChange={(e) => setSearch({ purity: e.target.checked ? "99" : undefined })}
                  className="h-4 w-4 accent-accent"
                />
                99%+ HPLC only
              </label>
            </div>

            <div>
              <h2 className="eyebrow">Stock status</h2>
              <label className="mt-3 flex items-center gap-2.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={search.stock === "in-stock"}
                  onChange={(e) => setSearch({ stock: e.target.checked ? "in-stock" : undefined })}
                  className="h-4 w-4 accent-accent"
                />
                Available now
              </label>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate({
                  search: {},
                  resetScroll: false,
                })
              }
              className="h-10 w-full rounded-md border border-border text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Reset filters
            </button>
          </div>
        </aside>

        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-4 sm:flex sm:justify-between">
            <p className="min-w-0 truncate text-sm text-muted-foreground">
              {list.length} of {products.length} products
              {search.category ? ` · ${categoryName(search.category)}` : ""}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <label className="sr-only" htmlFor="sort">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSearch({ sort: e.target.value })}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-accent"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="hidden rounded-md border border-border sm:flex">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={cn(
                    "grid h-10 w-10 place-items-center",
                    view === "grid" && "bg-secondary text-accent",
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={cn(
                    "grid h-10 w-10 place-items-center",
                    view === "list" && "bg-secondary text-accent",
                  )}
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {view === "grid" ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {list.map((p) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-4 py-4 sm:grid-cols-[72px_minmax(0,1fr)_auto]"
                >
                  <Link to="/product/$productId" params={{ productId: p.id }}>
                    <img
                      src={productImage(p)}
                      alt={p.name}
                      width={912}
                      height={912}
                      loading="lazy"
                      className="h-16 w-16 rounded-md object-cover sm:h-18 sm:w-18"
                    />
                  </Link>
                  <div className="min-w-0">
                    <p className="eyebrow">{categoryName(p.category)}</p>
                    <h3 className="truncate text-base font-semibold">
                      <Link to="/product/$productId" params={{ productId: p.id }}>
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{p.spec}</p>
                    <div className="mt-1.5">
                      <StockDot stock={p.stock} />
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end">
                    <div className="text-right">
                      <p className="font-display text-base font-semibold">{formatEUR(p.price)}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {formatRef(p.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={p.stock === "out-of-stock"}
                      onClick={() => {
                        add(p.id);
                        toast.success(`${p.name} added to cart`);
                      }}
                      className="h-9 rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground disabled:opacity-40"
                    >
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {list.length === 0 && (
            <p className="mt-16 text-center text-sm text-muted-foreground">
              No compounds match these filters.
            </p>
          )}

          <ResearchDisclaimer className="mt-12" />
        </div>
      </div>
    </>
  );
}
