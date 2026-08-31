import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,760px)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Last updated {updated}
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-semibold">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
                {s.bullets ? (
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {s.bullets.map((b) => (
                      <li key={b.slice(0, 32)} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
        <ResearchDisclaimer className="h-fit" />
      </div>
    </>
  );
}
