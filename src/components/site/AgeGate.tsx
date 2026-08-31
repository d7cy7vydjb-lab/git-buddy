import { useEffect, useState } from "react";

const KEY = "halvin-age-verified";

export function AgeGate() {
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    try {
      setVerified(window.localStorage.getItem(KEY) === "true");
    } catch {
      setVerified(true);
    }
    setReady(true);
  }, []);

  if (!ready || verified) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/95 px-5 backdrop-blur">
      <div className="panel w-full max-w-md p-8 text-center shadow-elevated">
        <p className="eyebrow">Compliance check</p>
        <h2 className="mt-3 text-2xl font-semibold">Are you 18 or older?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Halvin Research supplies laboratory reagents for in-vitro research only. Products are not
          medicines and are not for human or veterinary use. You must be at least 18 years old to
          browse this catalogue.
        </p>
        <div className="mt-7 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(KEY, "true");
              } catch {
                /* ignore */
              }
              setVerified(true);
            }}
            className="h-11 flex-1 rounded-md bg-accent text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Yes, I am 18+
          </button>
          <a
            href="https://www.google.com"
            className="grid h-11 flex-1 place-items-center rounded-md border border-border text-sm font-semibold transition-colors hover:border-accent"
          >
            No, exit
          </a>
        </div>
      </div>
    </div>
  );
}
