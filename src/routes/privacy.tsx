import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GDPR Compliance | Halvin Research" },
      {
        name: "description",
        content:
          "How Halvin Research collects, uses and protects personal data under the GDPR, including retention periods and your data subject rights.",
      },
      { property: "og:title", content: "Privacy Policy | Halvin Research" },
      {
        property: "og:description",
        content: "GDPR-aligned data collection, retention and data subject rights.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="How we handle personal data under the General Data Protection Regulation."
      updated="1 August 2026"
      sections={[
        {
          heading: "Data we collect",
          paragraphs: [
            "We collect only what is required to fulfil an order and meet our record-keeping obligations.",
          ],
          bullets: [
            "Contact and delivery details: name, institution, email, phone, shipping address.",
            "Order records: products, lot numbers, amounts, invoices and shipping documentation.",
            "Technical data: IP address and basic device information from server logs.",
            "Marketing data: your email address, if you subscribe to the batch bulletin.",
          ],
        },
        {
          heading: "Why we process it",
          paragraphs: [
            "We process order and contact data to perform the sales contract, to comply with tax and customs law, and to defend legal claims. Newsletter processing relies on your consent, which you may withdraw at any time using the unsubscribe link in any message.",
          ],
        },
        {
          heading: "Payment data",
          paragraphs: [
            "Card details are entered directly with our payment processor and are never stored on our systems. We receive only a transaction reference and the outcome of the authorisation.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "Invoices and order records are retained for the statutory period required by applicable tax law. Analytical documentation linked to a lot is archived for five years. Marketing consents are kept until withdrawal, plus a short audit period.",
          ],
        },
        {
          heading: "Sharing",
          paragraphs: [
            "We share data only with carriers, customs authorities, payment processors and our accountants, in each case limited to what is necessary. We do not sell personal data and we do not share it for third-party advertising.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You may request access, rectification, erasure, restriction, portability, or object to processing based on legitimate interests. Write to privacy@halvin.eu and we will respond within one month. You may also lodge a complaint with your national supervisory authority.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We use strictly necessary cookies and local browser storage to keep your cart and age confirmation between visits. No advertising or cross-site tracking cookies are set.",
          ],
        },
      ]}
    />
  ),
});
