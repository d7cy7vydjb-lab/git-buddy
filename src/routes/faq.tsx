import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Research Peptide FAQ — Purity, COAs & EU Shipping | Halvin Research" },
      {
        name: "description",
        content:
          "Answers on HPLC purity, Certificates of Analysis, storage, reconstitution, EU customs, shipping times and our research-only policy.",
      },
      { property: "og:title", content: "Research Peptide FAQ | Halvin Research" },
      {
        property: "og:description",
        content: "Purity testing, COAs, storage, EU shipping and compliance questions answered.",
      },
    ],
  }),
  component: Faq,
});

const GROUPS = [
  {
    title: "Products & analysis",
    items: [
      {
        q: "Are these products approved for human use?",
        a: "No. Everything we sell is a laboratory reagent intended for in-vitro research by qualified professionals. Our products are not medicines, supplements, foods or cosmetics, and must never be administered to humans or animals.",
      },
      {
        q: "How is purity determined?",
        a: "Each lot is analysed by reverse-phase HPLC at 220 nm, with identity confirmed by ESI mass spectrometry. Peptides are released only when calculated purity is 99% or higher.",
      },
      {
        q: "Where do I find the Certificate of Analysis?",
        a: "Every product page has a COA download linked to the current batch. A printed copy referencing the lot number also travels with the shipment.",
      },
      {
        q: "How should material be stored?",
        a: "Store lyophilised powder at −20 °C, protected from light and moisture. Once reconstituted with bacteriostatic water, keep at 2–8 °C and use within approximately 21 days.",
      },
      {
        q: "Do you provide dosing or protocol advice?",
        a: "No. We cannot provide protocols, dosing guidance or any application advice. Experimental design is the responsibility of the purchasing researcher or institution.",
      },
    ],
  },
  {
    title: "Ordering & shipping",
    items: [
      {
        q: "Which countries do you ship to?",
        a: "We ship from inside the EU to the United Kingdom, Germany, Spain, Italy and the wider EEA. Standard (5–7 working days), express (2–3 working days) and overnight services are available.",
      },
      {
        q: "When is shipping free?",
        a: "Standard tracked shipping is free on orders of €300 or more. Below that, standard is €14, express €24 and overnight €39.",
      },
      {
        q: "How quickly do orders leave?",
        a: "Orders confirmed before 12:00 CET on a working day are dispatched the same day. Later orders leave the next working day.",
      },
      {
        q: "Is the packaging discreet?",
        a: "Yes. Parcels use unbranded outer cartons, a neutral commercial sender name and a laboratory-reagent customs declaration.",
      },
      {
        q: "Can I track my order?",
        a: "Tracking is emailed automatically when the parcel is collected by the carrier and covers the full journey to your delivery address.",
      },
    ],
  },
  {
    title: "Payment & compliance",
    items: [
      {
        q: "Which payment methods do you accept?",
        a: "Card (Visa, Mastercard, Amex), SEPA bank transfer and PayPal. Institutional purchase orders can be arranged through our accounts team.",
      },
      {
        q: "Do you invoice institutions?",
        a: "Yes. Send your VAT number and purchase order reference to our support team and we will issue a compliant invoice.",
      },
      {
        q: "Is there an age requirement?",
        a: "Yes. You must be at least 18 years old to browse or purchase from this catalogue.",
      },
      {
        q: "What are the limitations on use?",
        a: "Purchases are for laboratory research only. Resale for human consumption, compounding, or any clinical application is prohibited under our Terms & Conditions.",
      },
    ],
  },
];

function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        lead="Everything procurement teams usually ask before their first order."
      />
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-12">
          {GROUPS.map((g) => (
            <section key={g.title}>
              <h2 className="eyebrow">{g.title}</h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {g.items.map((item) => (
                  <details key={item.q} className="py-5">
                    <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="space-y-6">
          <div className="panel p-6">
            <h2 className="text-base font-semibold">Still stuck?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Our support team answers technical and logistics questions within one working day.
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
