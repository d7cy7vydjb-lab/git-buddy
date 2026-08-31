import { Link } from "@tanstack/react-router";
import { BadgeCheck, FlaskConical, PackageCheck, Star, Truck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-border bg-surface/30">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{lead}</p> : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{title}</h2>
        {lead ? <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}

const TRUST = [
  { icon: BadgeCheck, label: "99%+ Purity" },
  { icon: FlaskConical, label: "Third-Party Tested" },
  { icon: Truck, label: "Fast EU Shipping" },
  { icon: PackageCheck, label: "Discreet Packaging" },
];

export function TrustBar() {
  return (
    <div className="border-y border-border bg-surface/50">
      <div className="container-page grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
        {TRUST.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 border-b border-border px-4 py-5 text-center md:border-b-0"
          >
            <Icon className="h-4 w-4 shrink-0 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-gold text-gold" : "text-muted-foreground")}
        />
      ))}
    </span>
  );
}

export function ResearchDisclaimer({ className }: { className?: string }) {
  return (
    <div className={cn("panel p-5", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
        For research use only
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        All compounds are supplied strictly as reference materials for laboratory research and
        in-vitro experimentation by qualified professionals. They are not drugs, foods, cosmetics or
        medical devices, and must not be administered to humans or animals. See our{" "}
        <Link to="/terms" className="text-accent underline-offset-4 hover:underline">
          Terms &amp; Conditions
        </Link>
        .
      </p>
    </div>
  );
}
