import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Research Support | Halvin Research" },
      {
        name: "description",
        content:
          "Reach the Halvin Research team for COA requests, bulk quotations, institutional invoicing and order tracking. Replies within one working day.",
      },
      { property: "og:title", content: "Contact & Research Support | Halvin Research" },
      {
        property: "og:description",
        content: "COA requests, bulk quotations, invoicing and order tracking support.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Contact the research desk"
        lead="Analytical questions, bulk quotations, purchase orders and order tracking."
      />
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {sent ? (
            <div className="panel p-8">
              <h2 className="text-xl font-semibold">Message received</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Thank you — our team replies within one working day, Monday to Friday.
              </p>
            </div>
          ) : (
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {[
                ["Full name", "name", "text", true],
                ["Institution", "org", "text", false],
                ["Email", "email", "email", true],
                ["Order reference", "order", "text", false],
              ].map(([label, name, type, req]) => (
                <label key={name as string} className="text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
                  </span>
                  <input
                    name={name as string}
                    type={type as string}
                    required={Boolean(req)}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3.5 text-sm outline-none focus:border-accent"
                  />
                </label>
              ))}
              <label className="text-sm sm:col-span-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Subject
                </span>
                <select
                  name="subject"
                  className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-accent"
                >
                  {[
                    "COA / analytical documentation",
                    "Bulk quotation",
                    "Institutional invoicing",
                    "Order tracking",
                    "Other",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={7}
                  className="mt-2 w-full rounded-md border border-input bg-background p-3.5 text-sm outline-none focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="h-12 rounded-md bg-accent px-8 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-64"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="panel space-y-5 p-6 text-sm">
            <div className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">research@halvin.eu</p>
                <p className="text-muted-foreground">General &amp; analytical enquiries</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">Mon–Fri, 09:00–17:00 CET</p>
                <p className="text-muted-foreground">Same-day dispatch cut-off 12:00 CET</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">EU distribution centre</p>
                <p className="text-muted-foreground">
                  Serving the UK, Germany, Spain, Italy and the EEA
                </p>
              </div>
            </div>
          </div>
          <ResearchDisclaimer />
        </aside>
      </div>
    </>
  );
}
