import { Link } from "@tanstack/react-router";
import { BadgeCheck, FlaskConical, Lock, Truck } from "lucide-react";
import logo from "@/assets/halvin-logo.png.asset.json";
import { NewsletterForm } from "@/components/site/NewsletterForm";

const LEGAL = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/shipping-policy", label: "Shipping Policy" },
  { to: "/returns", label: "Returns" },
  { to: "/contact", label: "Contact" },
] as const;

const SHOP = [
  { to: "/shop", label: "All peptides" },
  { to: "/categories", label: "Categories" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Research notes" },
  { to: "/about", label: "About us" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" width={32} height={32} className="h-8 w-8" loading="lazy" />
            <span className="font-display text-sm font-semibold tracking-tight">
              HALVIN RESEARCH
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Research-grade peptides for European scientists. Shipping from within the EU to the UK,
            Germany, Spain and Italy.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
            For research use only
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Catalogue</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {SHOP.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Policies</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Batch releases and COA updates. 10% off your first order.
          </p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {["Visa", "Mastercard", "PayPal", "SEPA", "Amex"].map((m) => (
              <span key={m} className="rounded border border-border px-2 py-1">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-3 py-5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-accent" /> 99%+ HPLC verified
          </span>
          <span className="inline-flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-accent" /> Third-party tested
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-accent" /> EU dispatch
          </span>
          <span className="inline-flex items-center gap-2">
            <Lock className="h-4 w-4 text-accent" /> Discreet packaging
          </span>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Halvin Research. All rights reserved.</p>
          <p className="max-w-xl">
            All products are sold strictly as laboratory reagents for in-vitro research. Not for
            human or veterinary consumption. Buyers must be 18 years or older.
          </p>
        </div>
      </div>
    </footer>
  );
}
