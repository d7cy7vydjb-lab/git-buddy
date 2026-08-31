import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — EU & UK Delivery | Halvin Research" },
      {
        name: "description",
        content:
          "Dispatch times, standard, express and overnight EU shipping rates, free delivery over €300, discreet packaging and customs handling.",
      },
      { property: "og:title", content: "Shipping Policy | Halvin Research" },
      {
        property: "og:description",
        content: "EU and UK delivery services, rates, dispatch cut-offs and customs handling.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Policies"
      title="Shipping Policy"
      lead="Dispatch times, services and rates for deliveries across the EU and the United Kingdom."
      updated="1 August 2026"
      sections={[
        {
          heading: "Dispatch",
          paragraphs: [
            "Orders confirmed before 12:00 CET on a working day are dispatched the same day from our EU facility. Orders placed later, at weekends or on public holidays leave the next working day.",
          ],
        },
        {
          heading: "Services and rates",
          paragraphs: ["All services are fully tracked from collection to delivery."],
          bullets: [
            "Standard — 5–7 working days — €14 (free on orders of €300 or more).",
            "Express — 2–3 working days — €24.",
            "Overnight — next working day to most EU metropolitan areas — €39.",
          ],
        },
        {
          heading: "Destinations",
          paragraphs: [
            "We ship to the United Kingdom, Germany, Spain, Italy and the wider EEA. Deliveries within the EU move as intra-community shipments; UK-bound parcels clear a single customs border.",
          ],
        },
        {
          heading: "Packaging",
          paragraphs: [
            "Parcels use unbranded outer cartons with a neutral commercial sender description and a laboratory-reagent customs declaration. Temperature-sensitive items are packed with insulated liners and gel packs where required.",
          ],
        },
        {
          heading: "Customs and duties",
          paragraphs: [
            "For UK deliveries, any import VAT or duty is determined by HMRC and is the responsibility of the recipient unless otherwise agreed in writing. We supply complete commercial documentation to minimise clearance delays.",
          ],
        },
        {
          heading: "Tracking and delays",
          paragraphs: [
            "Tracking is emailed automatically on collection. If a parcel shows no movement for three working days, contact support with your order reference and we will open a carrier investigation.",
          ],
        },
      ]}
    />
  ),
});
