export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tag: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "reading-an-hplc-certificate-of-analysis",
    title: "How to read an HPLC Certificate of Analysis",
    excerpt:
      "Retention time, peak area, gradient conditions — what actually matters when you compare two suppliers' COAs.",
    date: "2026-08-12",
    readingTime: "6 min",
    tag: "Analytical methods",
    body: [
      "A Certificate of Analysis is only useful if it tells you how the number was produced. A single line reading 99.2% with no method attached is marketing, not data.",
      "Start with the chromatographic conditions. A reverse-phase run on a C18 column with a water/acetonitrile gradient and 0.1% TFA is standard for peptides. Detection at 214–220 nm captures the amide backbone; detection only at 280 nm biases toward aromatic residues and can flatter a sample.",
      "Next, look at how purity was calculated. Area percent of the main peak against total integrated area is conventional. Check that the integration window includes the late-eluting region where deletion and oxidation products often appear, and that the baseline is not truncated before the gradient wash.",
      "Identity is a separate question from purity. Purity says one species dominates; mass spectrometry says which species it is. A complete package pairs the HPLC trace with an ESI-MS spectrum whose observed monoisotopic mass sits within a few tenths of a Dalton of theory.",
      "Finally, confirm that the lot number on the certificate matches the label on the vial in front of you. Batch drift is the most common documentation failure we see when laboratories switch suppliers.",
    ],
  },
  {
    slug: "cold-chain-and-eu-customs",
    title: "Cold chain, customs and why EU-held stock matters",
    excerpt:
      "Lyophilised peptides tolerate transit well — until a parcel sits in a customs facility for nine days.",
    date: "2026-07-28",
    readingTime: "5 min",
    tag: "Logistics",
    body: [
      "Lyophilised peptides are relatively robust in transit. The dominant risk is not brief ambient exposure but time: a parcel held at a customs facility for over a week accumulates moisture exposure and thermal cycling that no ice pack was specified to cover.",
      "Holding stock inside the single market removes an entire category of that risk for EU destinations. Deliveries to Germany, Spain and Italy move as intra-community shipments, and UK-bound parcels clear a single border rather than two.",
      "Documentation quality is what actually determines clearance speed. A laboratory-reagent declaration with a correct commodity code, a stated non-consumable use and an invoice matching the parcel contents almost always clears without inspection.",
      "On arrival, inspect the cake before reconstituting. A collapsed or discoloured lyophilisate suggests a vacuum breach; that vial should be quarantined and reported rather than used.",
    ],
  },
  {
    slug: "reconstitution-and-storage-practice",
    title: "Reconstitution and storage practice in the lab",
    excerpt:
      "Solvent choice, aliquoting strategy and realistic stability windows for reconstituted reference material.",
    date: "2026-07-04",
    readingTime: "7 min",
    tag: "Laboratory practice",
    body: [
      "Bacteriostatic water is the usual choice for reconstituting peptide reference material because the benzyl alcohol content suppresses microbial growth in multi-use vials. Sterile water is appropriate for single-session use; acetic acid solutions help with sequences that are poorly soluble at neutral pH.",
      "Add solvent slowly down the vial wall rather than directly onto the cake, and let the material dissolve without vortexing. Mechanical shear and foaming both accelerate aggregation in longer sequences.",
      "Aliquot immediately. Repeated freeze–thaw cycles cause more measurable degradation than storage duration itself, so splitting a vial into single-use volumes at −20 °C or below preserves comparability across a study.",
      "Treat published stability windows as upper bounds under ideal conditions, not guarantees. For quantitative work, re-verify concentration rather than assuming the label value after several weeks of refrigerated storage.",
      "All of this applies to in-vitro laboratory research only. Nothing in this article constitutes guidance for use in humans or animals.",
    ],
  },
  {
    slug: "supplier-qualification-checklist",
    title: "A supplier qualification checklist for research peptides",
    excerpt:
      "Nine questions that separate a documented supply chain from a repackaged one.",
    date: "2026-06-19",
    readingTime: "4 min",
    tag: "Procurement",
    body: [
      "Ask for the analytical method, not just the number. If a supplier cannot describe the column, gradient and detection wavelength behind a purity claim, that claim is unverifiable.",
      "Ask how long certificates are archived. Five years lets you reconcile a result against the exact lot you used two projects ago.",
      "Ask whether testing is internal or independent. Both can be valid; only one is disclosable to a reviewer without conflict of interest.",
      "Ask what happens when a lot fails. A supplier with no rejection rate is not testing.",
      "Finally, confirm the stated use policy. A supplier that markets research materials with health claims has already told you how carefully it reads regulation.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
