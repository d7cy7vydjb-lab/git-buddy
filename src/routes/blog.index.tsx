import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Research Notes — Peptide Analysis & Lab Practice | Halvin Research" },
      {
        name: "description",
        content:
          "Technical notes on HPLC certificates, cold-chain logistics, reconstitution practice and supplier qualification for research laboratories.",
      },
      { property: "og:title", content: "Research Notes | Halvin Research" },
      {
        property: "og:description",
        content:
          "Technical notes on peptide analysis, storage practice and procurement for EU laboratories.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Research notes"
        title="Notes from the analytical bench"
        lead="Method-focused writing on documentation, handling and procurement. No claims, no protocols."
      />
      <div className="container-page py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="panel flex flex-col p-7">
              <p className="eyebrow">{p.tag}</p>
              <h2 className="mt-3 text-xl font-semibold">
                <Link to="/blog/$slug" params={{ slug: p.slug }}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {new Date(p.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {p.readingTime}
                </span>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <ResearchDisclaimer className="mt-12" />
      </div>
    </>
  );
}
