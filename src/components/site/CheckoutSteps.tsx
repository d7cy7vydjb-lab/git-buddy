import { cn } from "@/lib/utils";

const STEPS = ["Cart", "Shipping", "Payment"];

export function CheckoutSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
      {STEPS.map((label, i) => {
        const step = i + 1;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "grid h-6 w-6 place-items-center rounded-full border",
                step <= current
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              {step}
            </span>
            <span className={step <= current ? "text-foreground" : "text-muted-foreground"}>
              {label}
            </span>
            {step < STEPS.length && <span className="ml-2 h-px w-8 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
