import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Replacements Policy | Halvin Research" },
      {
        name: "description",
        content:
          "How to report damaged, incorrect or out-of-specification reference material, and the conditions under which replacements are issued.",
      },
      { property: "og:title", content: "Returns & Replacements | Halvin Research" },
      {
        property: "og:description",
        content: "Reporting windows and conditions for replacements of research reference material.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Policies"
      title="Returns & Replacements"
      lead="Reference materials are sensitive to handling once they leave our control, so our policy is built around prompt reporting."
      updated="1 August 2026"
      sections={[
        {
          heading: "Reporting window",
          paragraphs: [
            "Inspect every shipment on arrival. Damaged, missing or incorrectly supplied items must be reported within seven calendar days of delivery, with your order reference, the lot number and photographs of the vial and outer packaging.",
          ],
        },
        {
          heading: "What we replace",
          paragraphs: ["We replace or refund, at our discretion, in the following cases:"],
          bullets: [
            "The product supplied does not match the item ordered.",
            "The vial arrived broken, unsealed or with a collapsed lyophilisate indicating a vacuum breach.",
            "Independent analysis demonstrates the lot falls outside the specification stated on its Certificate of Analysis.",
          ],
        },
        {
          heading: "What we cannot accept",
          paragraphs: [
            "For contamination and traceability reasons we cannot accept the return of opened or reconstituted vials, nor items stored outside the recommended conditions. Change-of-mind returns are not available on temperature-sensitive reference material once dispatched.",
          ],
        },
        {
          heading: "Out-of-specification claims",
          paragraphs: [
            "Where a purity discrepancy is claimed, please supply the chromatogram, method conditions and integration parameters used. We will re-test our retained sample from the same lot and share the result regardless of outcome.",
          ],
        },
        {
          heading: "Refund timing",
          paragraphs: [
            "Approved refunds are issued to the original payment method within ten working days of resolution. Replacements ship by express service at no cost.",
          ],
        },
      ]}
    />
  ),
});
