import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, FileCheck2, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import heroLab from "@/assets/hero-lab.jpg";
import { ProductCard } from "@/components/site/ProductCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import {
  ResearchDisclaimer,
  SectionHeading,
  Stars,
  TrustBar,
} from "@/components/site/blocks";
import { categories, categoryCount, featuredProducts, products } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Research Peptides for European Scientists | Halvin Research" },
      {
        name: "description",
        content:
          "99%+ HPLC-verified research peptides with a Certificate of Analysis on every batch. Fast EU shipping to the UK, Germany, Spain and Italy. For research use only.",
      },
      {
        property: "og:title",
        content: "Premium Research Peptides for European Scientists | Halvin Research",
      },
      {
        property: "og:description",
        content:
          "99%+ HPLC-verified research peptides, COA on every batch, discreet EU dispatch. Research use only.",
      },
    ],
  }),
  component: Home,
});

const TESTIMONIALS = [
  {
    quote:
      "COAs arrive with the shipment and the HPLC traces match the stated batch. That alone puts Halvin ahead of the three suppliers we used before.",
    name: "Dr. L. Marchetti",
    role: "Peptide chemistry group, Milan",
  },
  {
    quote:
      "Ordered Thursday afternoon, on the bench in Berlin Monday morning. Lyophilisate was intact and reconstituted cleanly.",
    name: "M. Keller",
    role: "Lab manager, Berlin",
  },
  {
    quote:
      "Mass spec confirmation on request is the reason we standardised our reference material sourcing here.",
    name: "Dr. A. Whitfield",
    role: "Analytical sciences, Manchester",
  },
  {
    quote:
      "Packaging is genuinely discreet and cold-chain held through Spanish customs without issue.",
    name: "Dr. R. Sáez",
    role: "Biochemistry faculty, Valencia",
  },
  {
    quote: "Batch-to-batch consistency has been excellent across nine orders. Support answers same day.",
    name: "J. Novak",
    role: "Contract research, Prague",
  },
];

const FAQ_PREVIEW = [
  {
    q: "Are these products approved for human use?",
    a: "No. Every compound we supply is a laboratory reagent for in-vitro research by qualified professionals. Nothing in our catalogue is a medicine, supplement or cosmetic.",
  },
  {
    q: "How is purity verified?",
    a: "Each batch is analysed by reverse-phase HPLC with mass spectrometry identity confirmation. The Certificate of Analysis is published on every product page and included with the shipment.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We dispatch from within the EU to the United Kingdom, Germany, Spain, Italy and the wider EEA. Standard, express and overnight services are available.",
  },
  {
    q: "Is shipping discreet?",
    a: "Yes. Orders travel in unbranded outer packaging with a neutral commercial sender description and a laboratory-reagent customs declaration.",
  },
];

function Home() {
  const reviewCount = products.reduce((n, p) => n + p.reviews, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroLab}
          alt="Laboratory vials of lyophilised research peptides"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="container-page relative py-24 md:py-36">
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            Premium Research Peptides for European Scientists
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            99%+ HPLC-Verified | Certificate of Analysis on Every Batch
          </p>
          <div className="mt-9">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-7 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop Peptides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
            {[
              ["70", "Catalogue SKUs"],
              ["99%+", "HPLC purity"],
              ["24h", "EU dispatch"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl font-semibold text-gold">{value}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TrustBar />

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Featured batches"
          title="Current reference compounds"
          lead="Six of our most requested research peptides, each with published HPLC and mass spectrometry data."
          action={
            <Link
              to="/shop"
              className="inline-flex h-10 items-center gap-2 self-start rounded-md border border-border px-4 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              View all 70 <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Browse the catalogue"
            title="Seven research categories"
            lead="Filter by research area or open the full catalogue with purity, price and stock filters."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div
                key={c.id}
                className="flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <span className="shrink-0 rounded border border-border px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    {categoryCount(c.id)} PRODUCTS
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.blurb}</p>
                <Link
                  to="/shop"
                  search={{ category: c.id }}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Browse <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Logistics & verification"
          title="Built for laboratory procurement"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Free shipping over €300",
              body: "Tracked EU delivery is complimentary on orders above €300. Below that, flat-rate options start at €14.",
            },
            {
              icon: Clock,
              title: "Same-day dispatch",
              body: "Orders confirmed before 12:00 CET leave our EU facility the same working day.",
            },
            {
              icon: PackageCheck,
              title: "Discreet packaging",
              body: "Unbranded outer cartons, neutral sender, laboratory-reagent customs declaration.",
            },
            {
              icon: FileCheck2,
              title: "HPLC & mass spec verified",
              body: "Every lot is tested by an independent laboratory. COA PDFs are downloadable per batch.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="panel p-6">
              <Icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <ResearchDisclaimer className="mt-8" />
      </section>

      <section className="border-y border-border bg-surface/30 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Researcher feedback"
            title="Trusted across European labs"
            action={
              <div className="self-start">
                <Stars value={5} />
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  4.9 / 5 · {reviewCount.toLocaleString("en-IE")} verified reviews
                </p>
              </div>
            }
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="panel flex flex-col p-6">
                <Stars value={5} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </p>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.role}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading eyebrow="Common questions" title="Before you order" />
            <div className="mt-8 divide-y divide-border border-y border-border">
              {FAQ_PREVIEW.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              Read the full FAQ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="panel flex flex-col justify-center p-8 md:p-10">
            <ShieldCheck className="h-6 w-6 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold">Get 10% off your first order</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Join the Halvin batch bulletin for new reference compounds, COA releases and
              restock alerts. No more than two emails a month.
            </p>
            <div className="mt-7">
              <NewsletterForm />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              18+ only · research professionals
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
