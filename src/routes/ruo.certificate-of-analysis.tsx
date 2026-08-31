import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/ruo/certificate-of-analysis")({
  head: () => ({
    meta: [
      { title: "Certificate of Analysis — RUO Batch Testing | Halvin Labs" },
      {
        name: "description",
        content:
          "How Halvin Labs assays every RUO peptide batch by HPLC and mass spectrometry, what each Certificate of Analysis field means, and how to request yours.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Certificate of Analysis | Halvin Labs" },
      {
        property: "og:description",
        content: "Batch assay methodology and COA retrieval for Halvin Labs RUO peptides.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="RUO documentation"
      title="Certificate of Analysis"
      lead="Every Halvin Labs batch is released against an independent Certificate of Analysis. This page explains how it is produced and how to read it."
      updated="31 August 2026"
      sections={[
        {
          heading: "What a COA covers",
          paragraphs: [
            "A Certificate of Analysis is the release document for a single manufactured lot. It records the identity of the compound, the measured purity, the analytical methods used, the date of testing and the laboratory that performed it.",
            "Because the COA is lot-specific, two vials of the same peptide bought months apart will carry different batch numbers and different certificates. Always file the COA that matches the batch printed on your vial label.",
          ],
          bullets: [
            "Compound name, sequence and molecular formula",
            "Batch / lot number matching the vial label",
            "Net peptide content and fill weight",
            "Purity by reverse-phase HPLC, expressed as area percent",
            "Identity confirmation by mass spectrometry (observed vs. theoretical mass)",
            "Appearance, solubility and residual solvent notes",
            "Assay date, analyst reference and storage class",
          ],
        },
        {
          heading: "Analytical methods",
          paragraphs: [
            "Purity is determined by reverse-phase high-performance liquid chromatography (RP-HPLC) with UV detection at 214 nm, using a gradient appropriate to the peptide's hydrophobicity. The reported figure is the area percent of the main peak against all integrated peaks.",
            "Identity is confirmed by electrospray-ionisation mass spectrometry (ESI-MS). The observed monoisotopic mass must fall within tolerance of the theoretical mass calculated from the declared sequence.",
            "Where relevant, additional tests are reported: water content by Karl Fischer, acetate content by ion chromatography, and bacterial endotoxin screening for compounds intended for cell-culture work.",
          ],
        },
        {
          heading: "Batch traceability",
          paragraphs: [
            "Each vial label carries a batch number in the form HLV-<COMPOUND>-<LOT>. That identifier links the physical vial to its manufacturing record, its COA and its dispatch consignment.",
            "Retain the batch number in your laboratory notebook alongside experimental results. If a result appears anomalous, the batch number is the fastest route to comparing your material against the release data.",
          ],
        },
        {
          heading: "Requesting your COA",
          paragraphs: [
            "Order confirmation emails list the peptide, dosage and vial count for each line, and the certificates for the dispatched batches are attached or linked in the dispatch notification.",
            "If you need a COA before ordering, or a re-issue for archival purposes, contact us with the compound name and, where you already hold stock, the batch number. Certificates are retained for a minimum of five years from the assay date.",
          ],
        },
        {
          heading: "Limits of the document",
          paragraphs: [
            "A Certificate of Analysis attests to the analytical characteristics of the material as tested. It is not a certification of fitness for any medical, veterinary, food or cosmetic application, and it does not imply that the material is suitable for administration to humans or animals.",
          ],
        },
      ]}
    />
  ),
});
