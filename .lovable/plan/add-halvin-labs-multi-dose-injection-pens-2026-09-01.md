# Add Halvin Labs multi-dose injection pens

Your reference box is a pre-filled multi-dose pen with a dose-marked barrel, a strength ladder printed down the spine and a research-use notice. I'll add a full pen range to the shop in that same format, but branded to your store — "HALVIN LABS", the navy/gold identity already used on the site, and the RUO wording from your documentation pages instead of the reference brand's "single patient use" line.

## What gets added

16 new pen products alongside the 25 existing vials, each with its own generated Halvin Labs pen-and-box photo:

**Metabolic / GLP-1 pens**
- Retatrutide 64 Pen — 64mg multi-dose (2/4/8mg ladder)
- Retatrutide 24 Pen — 24mg multi-dose
- Tirzepatide 30 Pen — 30mg multi-dose
- Tirzepatide 60 Pen — 60mg multi-dose
- Semaglutide 8 Pen — 8mg multi-dose
- Semaglutide 15 Pen — 15mg multi-dose
- Cagrilintide 20 Pen — 20mg multi-dose
- Survodutide 30 Pen — 30mg multi-dose
- Mazdutide 24 Pen — 24mg multi-dose
- Liraglutide 18 Pen — 18mg multi-dose

**Performance / recovery pens**
- BPC-157 20 Pen — 20mg multi-dose
- TB-500 20 Pen — 20mg multi-dose
- Ipamorelin + CJC-1295 30 Pen — blend pen
- Tesamorelin 20 Pen — 20mg multi-dose
- AOD-9604 15 Pen — 15mg multi-dose
- MOTS-c 30 Pen — 30mg multi-dose

Pens go into your existing categories (metabolic and GLP-1 pens under Medical & Pharmaceutical, performance pens under Fitness & Bodybuilding) — no new categories, as you asked earlier.

## How they'll look and read

- Each pen gets its own product photo: teal-and-white carton, gold corner accent, HALVIN LABS mark, compound name and strength set large, dose ladder on the spine, and the pen laid in front with visible dose markings — matching the layout of your reference but in Halvin Labs branding.
- Card and product page show a "Pen" format tag so pens are visually distinct from vials at a glance.
- Specs read as `Pre-filled pen | 64mg multi-dose | 2/4/8mg increments` instead of the vial `10mg/mL | 10mL Vial` line.
- Each pen carries a short research description plus an explicit line that it is supplied for laboratory research use only and not for administration — the box art uses "For Research Purposes Only", never "single patient use".
- Prices scale with strength, in line with your existing pricing ladder (roughly €189–€449 across the range).

## Filtering

The shop gets a format filter so buyers can view **All / Vials / Pens**, and the pen range is surfaced as its own block on the RUO landing page.

## Technical notes

- `src/data/catalog.json`: append 16 products with a new optional `format: "pen"` field, `spec` written in pen terms, and `image` pointing at `/products/<id>.jpg`.
- `src/lib/catalog.ts`: add `format?: "vial" | "pen"` to the `Product` type, a `penProducts` helper, and a fallback image rule for pens.
- `public/products/`: 16 generated pen images (premium tier so the box typography is legible).
- `src/components/site/ProductCard.tsx` and `src/routes/product.$productId.tsx`: render a format badge when `format === "pen"`.
- `src/routes/shop.tsx`: add the All/Vials/Pens format filter alongside the existing controls.
- `src/routes/ruo.index.tsx`: add a pen-range section linking into the filtered shop view.
- Uploaded reference image is used as design reference only; it is not added to the project.
