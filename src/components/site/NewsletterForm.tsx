import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-accent">
        <Check className="h-4 w-4" /> Subscribed — your 10% code is on its way.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
      className={cn("flex gap-2", compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row")}
    >
      <label className="sr-only" htmlFor={compact ? "nl-footer" : "nl-main"}>
        Email address
      </label>
      <input
        id={compact ? "nl-footer" : "nl-main"}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@institution.eu"
        className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
