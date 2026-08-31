import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/ruo/compliance")({
  head: () => ({
    meta: [
      { title: "Research Compliance — RUO Terms of Use | Halvin Labs" },
      {
        name: "description",
        content:
          "Buyer eligibility, permitted in-vitro use, record-keeping, export limits and disposal duties for Halvin Labs research-use-only peptides.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Research Compliance | Halvin Labs" },
      {
        property: "og:description",
        content: "Eligibility, permitted use, record-keeping and disposal duties for RUO material.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="RUO documentation"
      title="Research Compliance"
      lead="Research-use-only material carries obligations for the buyer as well as the supplier. These are the conditions under which Halvin Labs supplies peptides."
      updated="31 August 2026"
      sections={[
        {
          heading: "Buyer eligibility",
          paragraphs: [
            "Material is supplied only to buyers who are at least 18 years of age and who are acquiring it for laboratory research or in-vitro experimentation conducted by, or under the supervision of, appropriately qualified personnel.",
            "By completing checkout you confirm that declaration. We may decline or cancel any order where the stated use, destination or delivery details are inconsistent with research use.",
          ],
        },
        {
          heading: "Permitted use",
          paragraphs: [
            "Compounds are reference materials. They are not medicinal products, veterinary products, foods, food supplements, cosmetics or medical devices, and no claim of therapeutic effect is made or implied anywhere on this site.",
          ],
          bullets: [
            "In-vitro assays, binding studies and analytical method development are permitted",
            "Administration to humans is prohibited without exception",
            "Administration to animals outside an approved ethics protocol is prohibited",
            "Resale, relabelling or repackaging for human consumption is prohibited",
            "Compounding into any preparation intended for administration is prohibited",
          ],
        },
        {
          heading: "Record-keeping",
          paragraphs: [
            "Maintain a receipt log recording compound, batch number, quantity, delivery date and the responsible investigator. Reconcile usage against that log so that every vial is accounted for from receipt to disposal.",
            "Retain the Certificate of Analysis for each batch alongside your experimental records. Where your institution operates a controlled-materials inventory, register the material on arrival rather than at first use.",
          ],
        },
        {
          heading: "Local law and export",
          paragraphs: [
            "The legal status of individual research compounds differs between jurisdictions. It is the buyer's responsibility to confirm that possession and use of a compound are lawful at the delivery address and at the place of research.",
            "Do not re-export material received from us without confirming the applicable controls. We do not ship to jurisdictions where a compound is restricted, and orders identified as such are refunded rather than fulfilled.",
          ],
        },
        {
          heading: "Handling and safety",
          paragraphs: [
            "Handle all material as a substance of unknown toxicity: gloves, eye protection and a laboratory coat as a minimum, with weighing and reconstitution carried out in a fume hood or biosafety cabinet where local rules require it.",
            "Dispose of unused material, solutions and empty vials through your institution's chemical waste stream. Deface labels before discarding packaging.",
          ],
        },
        {
          heading: "Declarations at checkout",
          paragraphs: [
            "Each order requires an explicit acknowledgement that you are 18 or older, that the material is for laboratory research use only, and that you accept our Terms & Conditions. That acknowledgement is recorded with the order reference and repeated in your confirmation email.",
          ],
        },
      ]}
    />
  ),
});
