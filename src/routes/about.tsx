import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, Microscope, ScrollText, Warehouse } from "lucide-react";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Halvin Research — EU Peptide Reference Materials" },
      {
        name: "description",
        content:
          "Halvin Research supplies HPLC-verified peptide reference materials to laboratories in the UK, Germany, Spain and Italy, with independent testing on every lot.",
      },
      { property: "og:title", content: "About Halvin Research" },
      {
        property: "og:description",
        content:
          "Independent testing, EU warehousing and full analytical documentation for research laboratories.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="A supply chain built around analytical evidence"
        lead="Halvin Research exists because procurement teams were spending more time validating suppliers than running experiments."
      />
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            We supply lyophilised peptide reference materials and reconstitution solvents to
            research groups across the European Union and the United Kingdom. Every lot we list is
            characterised by reverse-phase HPLC and confirmed by mass spectrometry at an
            independent laboratory before it is released for sale.
          </p>
          <p>
            Stock is held in a temperature-controlled EU facility, which means shipments to
            Germany, Spain, Italy and the UK avoid extra-EU customs delays. Orders confirmed before
            12:00 CET leave the same working day, packed in unbranded cartons with a
            laboratory-reagent customs declaration.
          </p>
          <p>
            Our documentation is deliberately boring: catalogue code, batch number, assay method,
            retention time, calculated purity, storage recommendation. Nothing more, nothing
            implied. We make no therapeutic claims of any kind, and we decline orders where the
            stated use is not laboratory research.
          </p>
          <h2 className="pt-4 text-xl font-semibold text-foreground">How we work</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Microscope,
                title: "Independent verification",
                body: "Third-party HPLC and ESI-MS on every lot, archived for five years.",
              },
              {
                icon: Warehouse,
                title: "EU warehousing",
                body: "Cold storage inside the single market for fast, predictable delivery.",
              },
              {
                icon: ScrollText,
                title: "Traceable batches",
                body: "Each vial maps to a published COA and a unique lot reference.",
              },
              {
                icon: FlaskConical,
                title: "Research-only policy",
                body: "No medical guidance, no dosing advice, no consumer sales.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="panel p-5">
                <Icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="panel p-6">
            <h2 className="text-base font-semibold">Markets served</h2>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {["United Kingdom", "Germany", "Spain", "Italy", "Wider EEA"].map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-6">
            <h2 className="text-base font-semibold">Talk to us</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Bulk quotations, purchase orders and institutional invoicing are handled by our
              accounts team.
            </p>
            <Link
              to="/contact"
              className="mt-5 grid h-11 place-items-center rounded-md bg-accent text-sm font-semibold text-accent-foreground"
            >
              Contact support
            </Link>
          </div>
          <ResearchDisclaimer />
        </aside>
      </div>
    </>
  );
}
