import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sendOrderConfirmation } from "@/lib/orders.functions";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";
import { CheckoutSteps } from "@/components/site/CheckoutSteps";
import { FREE_SHIPPING_THRESHOLD, formatEUR, formatRef } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | Halvin Research" },
      {
        name: "description",
        content:
          "Three-step checkout with standard, express and overnight EU shipping for research-use-only peptide orders.",
      },
      { property: "og:title", content: "Secure Checkout | Halvin Research" },
      {
        property: "og:description",
        content: "Standard, express and overnight EU shipping for RUO peptide orders.",
      },
    ],
  }),
  component: Checkout,
});

const SHIPPING = [
  { id: "standard", label: "Standard", eta: "5–7 working days", price: 14 },
  { id: "express", label: "Express", eta: "2–3 working days", price: 24 },
];

const PAYMENT_LABEL = "Telegram order";

/** Telegram account that receives pre-filled research orders. */
const TELEGRAM_USERNAME = "halvinresearch";

function telegramOrderLink(text: string) {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
}


const COUNTRIES = ["United Kingdom", "Germany", "Spain", "Italy", "France", "Netherlands", "Ireland"];

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState<2 | 3>(2);
  const [shipping, setShipping] = useState("express");
  const [placed, setPlaced] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const sendConfirmation = useServerFn(sendOrderConfirmation);

  const selected = SHIPPING.find((s) => s.id === shipping) ?? SHIPPING[0]!;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD && shipping === "standard" ? 0 : selected.price;
  const vat = Math.round((subtotal + shippingCost) * 0.21);
  const total = subtotal + shippingCost + vat;

  if (placed) {
    return (
      <>
        <PageHeader eyebrow="Order confirmed" title="Thank you — your order is being prepared" />
        <div className="container-page py-14">
          <div className="panel max-w-2xl p-8">
            <CheckCircle2 className="h-6 w-6 text-success" />
            <h2 className="mt-4 text-xl font-semibold">Order {placed}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {emailed
                ? `A confirmation listing each peptide, its dosage and vial count has been emailed to ${contact.email}.`
                : "Your order is confirmed. We could not deliver the confirmation email — contact us and we will resend it."}{" "}
              Batch numbers and Certificates of Analysis follow with your tracking notification. Tracking is issued once the parcel leaves our EU facility — orders confirmed
              before 12:00 CET dispatch the same working day.
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Service</dt>
                <dd>
                  {selected.label} · {selected.eta}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Payment</dt>
                <dd>{PAYMENT_LABEL}</dd>
              </div>
            </dl>
            <Link
              to="/shop"
              className="mt-8 inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Back to catalogue
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Nothing to check out yet" />
        <div className="container-page py-14">
          <Link
            to="/shop"
            className="inline-flex h-11 items-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground"
          >
            Browse the catalogue
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow={`Step ${step} of 3`} title="Checkout" />
      <div className="container-page py-12">
        <CheckoutSteps current={step} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            {step === 2 ? (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  setContact({
                    name: String(form.get("name") ?? ""),
                    email: String(form.get("email") ?? ""),
                  });
                  setStep(3);
                }}
              >
                <section>
                  <h2 className="text-lg font-semibold">Shipping details</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Full name", "name", "text"],
                      ["Institution / company", "org", "text"],
                      ["Email", "email", "email"],
                      ["Phone", "phone", "tel"],
                      ["Address", "address", "text"],
                      ["City", "city", "text"],
                      ["Postcode", "postcode", "text"],
                    ].map(([label, name, type]) => (
                      <label key={name} className="text-sm">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                          {label}
                        </span>
                        <input
                          required={name !== "org" && name !== "phone"}
                          name={name}
                          type={type}
                          className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3.5 text-sm outline-none focus:border-accent"
                        />
                      </label>
                    ))}
                    <label className="text-sm">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        Country
                      </span>
                      <select
                        name="country"
                        className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-accent"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold">Delivery service</h2>
                  <div className="mt-5 space-y-3">
                    {SHIPPING.map((s) => (
                      <label
                        key={s.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-4 rounded-md border p-4 text-sm transition-colors",
                          shipping === s.id ? "border-accent" : "border-border",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shipping === s.id}
                            onChange={() => setShipping(s.id)}
                            className="h-4 w-4 accent-accent"
                          />
                          <span>
                            <span className="block font-semibold">{s.label}</span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {s.eta}
                            </span>
                          </span>
                        </span>
                        <span className="font-display font-semibold">
                          {subtotal >= FREE_SHIPPING_THRESHOLD && s.id === "standard"
                            ? "Free"
                            : formatEUR(s.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                <button
                  type="submit"
                  className="h-12 w-full rounded-md bg-accent text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-64"
                >
                  Continue to confirmation
                </button>
              </form>
            ) : (
              <form
                className="space-y-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submitting) return;
                  setSubmitting(true);
                  const ref = `HLV-${Math.floor(100000 + Math.random() * 899999)}`;
                  const message = [
                    `Halvin Research order ${ref}`,
                    `Name: ${contact.name || "Researcher"}`,
                    `Email: ${contact.email}`,
                    "",
                    ...items.map(
                      ({ product, qty }) =>
                        `• ${product.name} — ${product.spec} × ${qty} = ${formatEUR(product.price * qty)}`,
                    ),
                    "",
                    `Shipping: ${selected.label} (${selected.eta}) — ${shippingCost === 0 ? "Free" : formatEUR(shippingCost)}`,
                    `Subtotal: ${formatEUR(subtotal)}`,
                    `VAT (21%): ${formatEUR(vat)}`,
                    `Total: ${formatEUR(total)}`,
                    "",
                    "For laboratory research use only (RUO).",
                  ].join("\n");
                  window.open(telegramOrderLink(message), "_blank", "noopener,noreferrer");
                  try {

                    const result = await sendConfirmation({
                      data: {
                        reference: ref,
                        email: contact.email,
                        customerName: contact.name || "Researcher",
                        shippingLabel: selected.label,
                        shippingEta: selected.eta,
                        paymentLabel: PAYMENT_LABEL,
                        lines: items.map(({ product, qty }) => ({
                          name: product.name,
                          dosage: product.spec,
                          vials: qty,
                          lineTotal: formatEUR(product.price * qty),
                        })),
                        subtotal: formatEUR(subtotal),
                        shippingCost: shippingCost === 0 ? "Free" : formatEUR(shippingCost),
                        vat: formatEUR(vat),
                        total: formatEUR(total),
                      },
                    });
                    setEmailed(Boolean(result?.sent));
                    if (!result?.sent) {
                      toast.error("Order placed, but the confirmation email could not be sent.");
                    }
                  } catch {
                    setEmailed(false);
                    toast.error("Order placed, but the confirmation email could not be sent.");
                  } finally {
                    setSubmitting(false);
                    clear();
                    setPlaced(ref);
                  }
                }}
              >
                <section className="panel p-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold">Confirm on Telegram</h2>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    No card details are collected on this page. Confirming opens Telegram with your
                    order pre-filled — peptides, dosages, vial counts, shipping and total — so we can
                    verify the research order and arrange payment directly with you.
                  </p>
                  <dl className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Method</dt>
                      <dd className="font-semibold">Telegram @{TELEGRAM_USERNAME}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Amount due</dt>
                      <dd className="font-semibold">{formatEUR(total)}</dd>
                    </div>
                  </dl>
                </section>


                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    required
                    checked={ack}
                    onChange={(e) => setAck(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-accent"
                  />
                  <span>
                    I am 18 years or older, I am purchasing these materials for laboratory research
                    use only, and I accept the{" "}
                    <Link to="/terms" className="text-accent hover:underline">
                      Terms &amp; Conditions
                    </Link>
                    .
                  </span>
                </label>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-12 rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:border-accent"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-12 flex-1 disabled:opacity-60 rounded-md bg-accent text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:flex-none sm:px-10"
                  >
                    {submitting ? "Opening Telegram…" : `Send order on Telegram · ${formatEUR(total)}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="panel h-fit p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {qty} × {product.name}
                  </span>
                  <span>{formatEUR(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatEUR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{selected.label} shipping</dt>
                <dd>{shippingCost === 0 ? "Free" : formatEUR(shippingCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">VAT (21%)</dt>
                <dd>{formatEUR(vat)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatEUR(total)}</dd>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">{formatRef(total)}</p>
            </dl>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Tracking issued on dispatch
            </p>
          </aside>
        </div>

        <ResearchDisclaimer className="mt-12" />
      </div>
    </>
  );
}
