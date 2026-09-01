import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  categoryName,
  formatEUR,
  formatRef,
  productFormat,
  productImage,
  type Product,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function StockDot({ stock }: { stock: Product["stock"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          stock === "in-stock" && "bg-success",
          stock === "low-stock" && "bg-gold",
          stock === "out-of-stock" && "bg-destructive",
        )}
      />
      {stock === "in-stock" ? "In stock" : stock === "low-stock" ? "Low stock" : "Out of stock"}
    </span>
  );
}

export function FormatTag({ product }: { product: Product }) {
  const isPen = productFormat(product) === "pen";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
        isPen
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-border bg-secondary text-muted-foreground",
      )}
    >
      {isPen ? "Injection pen" : "Vial"}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const soldOut = product.stock === "out-of-stock";
  const isPen = productFormat(product) === "pen";

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent/50">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        <img
          src={productImage(product)}
          alt={`${product.name} ${isPen ? "research injection pen and carton" : "research vial"}`}
          width={912}
          height={912}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 top-3">
          <FormatTag product={product} />
        </span>
        {product.purity ? (
          <span className="absolute left-3 top-3 rounded border border-gold/40 bg-background/80 px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-gold backdrop-blur">
            {product.purity}% PURE
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow">{categoryName(product.category)}</p>
        <h3 className="mt-2 text-base font-semibold leading-snug">
          <Link to="/product/$productId" params={{ productId: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{product.spec}</p>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="font-display text-lg font-semibold">{formatEUR(product.price)}</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              {formatRef(product.price)}
            </p>
          </div>
          <StockDot stock={product.stock} />
        </div>

        <button
          type="button"
          disabled={soldOut}
          onClick={() => {
            add(product.id);
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-4 h-10 w-full rounded-md border border-border bg-secondary text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-foreground"
        >
          {soldOut ? "Notify me" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
