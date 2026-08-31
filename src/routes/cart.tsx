import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";
import { CheckoutSteps } from "@/components/site/CheckoutSteps";
import { FREE_SHIPPING_THRESHOLD, formatEUR, formatRef, productImage } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Halvin Research" },
      {
        name: "description",
        content:
          "Review your research peptide order, shipping threshold and totals before checkout. Prices in EUR.",
      },
      { property: "og:title", content: "Your Cart | Halvin Research" },
      { property: "og:description", content: "Review your research peptide order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 14;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      <PageHeader eyebrow="Step 1 of 3" title="Your cart" />
      <div className="container-page py-12">
        <CheckoutSteps current={1} />

        {items.length === 0 ? (
          <div className="panel mt-10 p-10 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground"
            >
              Browse the catalogue
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <ul className="divide-y divide-border border-y border-border">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 py-5">
                  <img
                    src={productImage(product)}
                    alt={product.name}
                    width={912}
                    height={912}
                    loading="lazy"
                    className="h-18 w-18 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold">
                          <Link to="/product/$productId" params={{ productId: product.id }}>
                            {product.name}
                          </Link>
                        </h2>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          {product.spec} · {formatEUR(product.price)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => remove(product.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex h-10 items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() => setQty(product.id, qty - 1)}
                          className="grid h-10 w-9 place-items-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center font-mono text-sm">{qty}</span>
                        <button
                          type="button"
                          aria-label="Increase"
                          onClick={() => setQty(product.id, qty + 1)}
                          className="grid h-10 w-9 place-items-center text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-base font-semibold">
                        {formatEUR(product.price * qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="panel h-fit p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatEUR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatEUR(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 font-display text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{formatEUR(subtotal + shipping)}</dd>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {formatRef(subtotal + shipping)}
                </p>
              </dl>
              {remaining > 0 && (
                <p className="mt-4 rounded-md border border-gold/30 p-3 text-xs text-gold">
                  Add {formatEUR(remaining)} more for free EU shipping.
                </p>
              )}
              <Link
                to="/checkout"
                className="mt-6 grid h-12 place-items-center rounded-md bg-accent text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Continue to shipping
              </Link>
            </aside>
          </div>
        )}

        <ResearchDisclaimer className="mt-12" />
      </div>
    </>
  );
}
