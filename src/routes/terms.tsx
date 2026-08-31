import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Research Use Only | Halvin Research" },
      {
        name: "description",
        content:
          "Conditions of sale for Halvin Research reference materials, including research-only limitations, 18+ eligibility and permitted use.",
      },
      { property: "og:title", content: "Terms & Conditions | Halvin Research" },
      {
        property: "og:description",
        content: "Conditions of sale, research-only limitations and eligibility requirements.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      lead="These terms govern every purchase of reference material from Halvin Research."
      updated="1 August 2026"
      sections={[
        {
          heading: "1. Research use only",
          paragraphs: [
            "All products supplied by Halvin Research are laboratory reagents intended exclusively for in-vitro research and analytical use by appropriately qualified professionals.",
            "Products are not medicines, medical devices, foods, food supplements, cosmetics or veterinary products. They have not been evaluated or approved by any medicines regulator, and no representation is made regarding safety or efficacy in humans or animals.",
          ],
          bullets: [
            "Do not administer any product to humans or animals.",
            "Do not use any product in a clinical, diagnostic or therapeutic setting.",
            "Do not repackage, compound or resell products for consumption.",
          ],
        },
        {
          heading: "2. Eligibility",
          paragraphs: [
            "You must be at least 18 years of age to place an order. By completing a purchase you confirm that you are 18 or older, that you are acting in a professional research capacity, and that the intended use complies with all laws applicable in your jurisdiction.",
            "We may decline or cancel any order where the stated or apparent intended use falls outside laboratory research.",
          ],
        },
        {
          heading: "3. No medical claims or guidance",
          paragraphs: [
            "We do not provide dosing information, administration protocols, treatment guidance or any advice regarding use in living subjects, and we cannot respond to requests for such information. Experimental design remains the sole responsibility of the purchaser and their institution.",
          ],
        },
        {
          heading: "4. Product specification and analysis",
          paragraphs: [
            "Stated purity refers to the value calculated by reverse-phase HPLC for the specific lot identified on the accompanying Certificate of Analysis. Specifications may be updated between lots; the certificate supplied with your shipment prevails.",
            "Products should be inspected on receipt. Any discrepancy in lot number, quantity or physical appearance must be reported within seven days of delivery.",
          ],
        },
        {
          heading: "5. Orders, pricing and payment",
          paragraphs: [
            "Prices are displayed in euro. GBP and USD figures are indicative conversions for reference only, and the amount charged is the euro total. VAT is calculated at checkout according to the delivery destination.",
            "An order is accepted when we issue a confirmation email. We reserve the right to correct pricing errors before dispatch.",
          ],
        },
        {
          heading: "6. Liability",
          paragraphs: [
            "To the fullest extent permitted by law, our liability arising from the supply of any product is limited to the purchase price of that product. We accept no liability for loss arising from use of products outside the permitted research scope described in these terms.",
          ],
        },
        {
          heading: "7. Governing law",
          paragraphs: [
            "These terms are governed by the laws of the European Union member state in which our distribution entity is established, without prejudice to mandatory consumer protections applicable where you reside.",
          ],
        },
      ]}
    />
  ),
});
