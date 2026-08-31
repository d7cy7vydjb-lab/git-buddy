import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/halvin-logo.png";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/ruo", label: "RUO" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3.5 lg:flex lg:justify-between">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-border/70 transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.55)]">
            <img
              src={logo}
              alt="Halvin Research molecular emblem"
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold tracking-tight">
              HALVIN <span className="text-primary">RESEARCH</span>
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted-foreground sm:block">
              EU RESEARCH PEPTIDE SUPPLY
            </span>
          </span>
        </Link>


        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex h-10 items-center gap-2 rounded-md border border-border px-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 font-mono text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className={cn("border-t border-border lg:hidden", open ? "block" : "hidden")}>
        <nav className="container-page flex flex-col py-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 text-sm text-muted-foreground last:border-0"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
