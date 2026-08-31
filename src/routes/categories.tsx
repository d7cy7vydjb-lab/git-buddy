import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";
import { categories, categoryCount, formatEUR, products } from "@/lib/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Peptide Categories — 7 Research Areas | Halvin Research" },
      {
        name: "description",
        content:
          "Explore 70 research peptides across seven categories: fitness, anti-aging, medical, wellness, cognitive, hair growth and solvents.",
      },
      { property: "og:title", content: "Peptide Categories | Halvin Research" },
      {
        property: "og:description",
        content: "Seven research categories covering 70 HPLC-verified reference compounds.",
      },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <>
      <PageHeader
        eyebrow="Catalogue structure"
        title="Browse by research area"
        lead="Seven categories covering 70 reference compounds, each supplied with batch-matched analytical documentation."
      />
      <div className="container-page py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const inCat = products.filter((p) => p.category === c.id);
            const from = Math.min(...inCat.map((p) => p.price));
            return (
              <div key={c.id} className="flex flex-col rounded-lg border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{c.name}</h2>
                  <span className="shrink-0 rounded border border-border px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    {categoryCount(c.id)} PRODUCTS
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.blurb}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
                  From {formatEUR(from)}
                </p>
                <Link
                  to="/shop"
                  search={{ category: c.id }}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Browse <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
        <ResearchDisclaimer className="mt-12" />
      </div>
    </>
  );
}
