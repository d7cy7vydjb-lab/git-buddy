import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/ruo/storage")({
  head: () => ({
    meta: [
      { title: "Storage & Reconstitution — RUO Peptides | Halvin Labs" },
      {
        name: "description",
        content:
          "Storage temperatures for lyophilised and reconstituted RUO peptides, bacteriostatic water handling, aliquoting practice and stability windows.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Storage & Reconstitution | Halvin Labs" },
      {
        property: "og:description",
        content: "Temperature classes, reconstitution practice and stability windows for RUO peptides.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="RUO documentation"
      title="Storage & Reconstitution"
      lead="Peptide integrity is decided in the freezer, not the assay. These are the storage classes and handling practices we recommend for Halvin Labs material."
      updated="31 August 2026"
      sections={[
        {
          heading: "Storage classes",
          paragraphs: [
            "Each vial label states a storage class. Follow the label in preference to any general guidance, since a small number of compounds are more heat- or light-sensitive than the rest of the catalogue.",
          ],
          bullets: [
            "Lyophilised, long term: −20 °C or below, desiccated and protected from light — stable for 24 months or more",
            "Lyophilised, short term: 2–8 °C for up to 30 days before use",
            "Reconstituted: 2–8 °C, used within 14–28 days depending on the compound",
            "Reconstituted, frozen aliquots: −20 °C, single freeze only, used within 8 weeks",
            "Solvents and bacteriostatic water: ambient, away from direct sunlight",
          ],
        },
        {
          heading: "Reconstitution practice",
          paragraphs: [
            "Allow the sealed vial to reach room temperature before opening; introducing solvent into a cold vial encourages condensation and accelerates degradation of the remaining powder.",
            "Add solvent slowly down the inner wall of the vial rather than directly onto the lyophilised cake. Swirl gently until dissolved — never vortex or shake, as mechanical shear and foaming denature peptide chains.",
            "Bacteriostatic water (0.9% benzyl alcohol) is the usual diluent for multi-draw work; sterile water suits single-use preparations. Record the diluent, concentration and date on the vial.",
          ],
        },
        {
          heading: "Aliquoting",
          paragraphs: [
            "Repeated freeze-thaw cycling is the largest avoidable source of potency loss. Split reconstituted material into single-experiment aliquots in low-binding tubes before freezing, so each tube is thawed exactly once.",
            "Label every aliquot with compound, batch number, concentration and preparation date. Where a study runs across several weeks, keep one aliquot untouched as a reference sample.",
          ],
        },
        {
          heading: "Signs of degradation",
          paragraphs: [
            "Discard material rather than risk an ambiguous result if you observe any of the following.",
          ],
          bullets: [
            "Cloudiness, visible particulates or fibrous strands after full dissolution",
            "Discolouration relative to the appearance stated on the COA",
            "A collapsed, oily or melted cake in an unopened lyophilised vial",
            "A loose crimp, cracked glass or a compromised stopper",
            "Storage outside the labelled class for an unknown duration",
          ],
        },
        {
          heading: "Disposal",
          paragraphs: [
            "Treat expired or degraded material as laboratory chemical waste and dispose of it through your institution's approved waste stream. Do not pour reconstituted peptide solutions to drain, and deface labels before discarding empty vials.",
          ],
        },
      ]}
    />
  ),
});
