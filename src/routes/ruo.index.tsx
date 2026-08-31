import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileCheck2,
  FlaskConical,
  ScrollText,
  ShieldCheck,
  Snowflake,
  Truck,
} from "lucide-react";
import { ResearchDisclaimer, SectionHeading, TrustBar } from "@/components/site/blocks";
import { ProductCard } from "@/components/site/ProductCard";
import { featuredProducts, products } from "@/lib/catalog";

export const Route = createFileRoute("/ruo/")({
  head: () => ({
    meta: [
      { title: "Halvin Labs RUO Peptides — Research Use Only Supply" },
      {
        name: "description",
        content:
          "Halvin Labs supplies research-use-only peptides with third-party Certificates of Analysis, cold-chain shipping, storage guidance and EU compliance documentation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Halvin Labs RUO Peptides — Research Use Only Supply" },
      {
        property: "og:description",
        content:
          "RUO-grade peptides with COA, cold-chain logistics, storage protocols and compliance documentation for EU laboratories.",
      },
    ],
  }),
  component: RuoLanding,
});

const DOCS = [
  {
    to: "/ruo/certificate-of-analysis" as const,
    icon: FileCheck2,
    title: "Certificate of Analysis",
    blurb:
      "How every batch is assayed by HPLC and mass spectrometry, what each COA field means, and how to retrieve yours by batch number.",
  },
  {
    to: "/ruo/shipping" as const,
    icon: Truck,
    title: "RUO Shipping & Handling",
    blurb:
      "Cold-chain packing, dispatch cut-offs, EU and UK transit times, customs paperwork and what to inspect on arrival.",
  },
  {
    to: "/ruo/storage" as const,
    icon: Snowflake,
    title: "Storage & Reconstitution",
    blurb:
      "Lyophilised and reconstituted storage temperatures, bacteriostatic water handling, aliquoting and stability windows.",
  },
  {
    to: "/ruo/compliance" as const,
    icon: ScrollText,
    title: "Research Compliance",
    blurb:
      "Buyer eligibility, permitted in-vitro use, record-keeping, waste disposal and the declarations required at checkout.",
  },
];

const PILLARS = [
  {
    icon: FlaskConical,
    title: "Assayed per batch",
    body: "Reverse-phase HPLC purity plus mass-spec identity confirmation on every lot before release.",
  },
  {
    icon: ShieldCheck,
    title: "Documented chain",
    body: "Batch number, assay date, analyst and storage class recorded against each vial you receive.",
  },
  {
    icon: Snowflake,
    title: "Cold-chain intact",
    body: "Insulated, gel-packed dispatch from our EU facility with tracking issued the moment it ships.",
  },
];

function RuoLanding() {
  const catalogueSize = products.length;

  return (
    <>
      <section className="border-b border-border bg-surface/30">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="eyebrow">Halvin Labs · Research use only</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">
              RUO peptides supplied with the paperwork your lab actually needs
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
              Halvin Labs is the research-materials arm of Halvin Research. Every vial in our
              catalogue of {catalogueSize} peptides ships with a third-party Certificate of
              Analysis, defined storage class and full batch traceability — strictly for in-vitro
              laboratory work by qualified professionals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-7 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Shop RUO peptides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ruo/certificate-of-analysis"
                className="inline-flex h-12 items-center rounded-md border border-border px-7 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                View COA process
              </Link>
            </div>
          </div>
          <dl className="panel grid gap-5 p-6">
            {[
              ["Catalogue", `${catalogueSize} peptides`],
              ["Purity target", "99%+ by HPLC"],
              ["Dispatch", "Same day before 12:00 CET"],
              ["Documentation", "COA per batch"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {k}
                </dt>
                <dd className="text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TrustBar />

      <div className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="panel p-6">
              <Icon className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-base font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page pb-16">
        <SectionHeading
          eyebrow="Documentation"
          title="RUO reference library"
          lead="Four short documents cover everything from assay methodology to compliant disposal."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DOCS.map(({ to, icon: Icon, title, blurb }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/60"
            >
              <Icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{blurb}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container-page pb-16">
        <SectionHeading
          eyebrow="Main offer"
          title="Our peptides"
          lead="The most requested RUO compounds from the Halvin Labs catalogue."
          action={
            <Link
              to="/shop"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              All peptides <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <div className="container-page pb-20">
        <ResearchDisclaimer />
      </div>
    </>
  );
}
