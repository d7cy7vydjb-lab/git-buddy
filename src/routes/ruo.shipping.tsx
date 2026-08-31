import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/ruo/shipping")({
  head: () => ({
    meta: [
      { title: "RUO Shipping & Handling — Cold Chain | Halvin Labs" },
      {
        name: "description",
        content:
          "Cold-chain packing, dispatch cut-offs, EU and UK transit times, customs paperwork and arrival inspection for Halvin Labs RUO peptide shipments.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "RUO Shipping & Handling | Halvin Labs" },
      {
        property: "og:description",
        content: "How RUO peptide consignments are packed, shipped and inspected on arrival.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="RUO documentation"
      title="RUO Shipping & Handling"
      lead="How research consignments leave our EU facility, how long they take, and what to check the moment the parcel lands."
      updated="31 August 2026"
      sections={[
        {
          heading: "Packing",
          paragraphs: [
            "Lyophilised peptides are stable at ambient temperature for the duration of normal transit, but every consignment is still packed to protect against heat excursions and mechanical shock.",
            "Vials are individually sleeved, seated in die-cut foam and enclosed in an insulated liner with conditioned gel packs. Outer packaging is plain and carries no compound names.",
          ],
          bullets: [
            "Insulated liner with conditioned gel packs",
            "Foam-seated vials, individually sleeved",
            "Tamper-evident seal across the outer carton",
            "Plain, unbranded outer packaging",
            "Packing list stating peptide, dosage and vial count per line",
          ],
        },
        {
          heading: "Dispatch and transit",
          paragraphs: [
            "Orders confirmed before 12:00 CET on a working day are dispatched the same day from our EU facility. Orders placed after the cut-off, at weekends or on public holidays leave on the next working day.",
            "Tracking is issued automatically when the consignment is collected. Standard service typically clears within 5–7 working days, express within 2–3, and overnight by the next working day for mainland EU addresses.",
          ],
        },
        {
          heading: "Customs and documentation",
          paragraphs: [
            "Consignments are declared accurately as research chemicals for laboratory use only, with the correct commodity codes and a declared value matching the invoice. We do not under-declare shipments.",
            "Deliveries outside the EU customs union, including the United Kingdom, may attract import duty or VAT payable by the recipient. Institutional buyers who hold a research exemption should supply the relevant reference at checkout so it can be attached to the paperwork.",
          ],
        },
        {
          heading: "On arrival",
          paragraphs: [
            "Inspect and log the consignment before it is put into storage. Anomalies are far easier to resolve within the first 48 hours.",
          ],
          bullets: [
            "Confirm the tamper seal is intact",
            "Check each vial for cracks, loose crimps or a collapsed cake",
            "Match the batch numbers on the vials to the packing list and COA",
            "Record receipt date and batch numbers in your inventory log",
            "Transfer to the storage class stated on the label without delay",
          ],
        },
        {
          heading: "Discrepancies",
          paragraphs: [
            "Report shortages, breakages or batch mismatches within 48 hours of delivery, quoting the order reference from your confirmation email and photographs of the packaging as received. Replacement or credit is arranged once the report is reviewed.",
          ],
        },
      ]}
    />
  ),
});
