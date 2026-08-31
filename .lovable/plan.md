# Route order confirmations through your Resend domain

Right now the checkout emails go out from `onboarding@resend.dev`. That address only delivers to the Resend account owner, so mail to any other recipient is refused — that's the failure you're seeing. Your own Resend domain `uevenoueld.resend.app` fixes that, and every order will also copy an internal inbox so you see all of them in one place.

## What changes

1. **Send from your domain.** Confirmations go out as `Halvin Labs <orders@uevenoueld.resend.app>` instead of the shared Resend test address, so they can reach real customers.
2. **Copy every order to your inbox.** Each confirmation is BCC'd to one internal address at your domain, so you receive a copy of every RUO order with the peptide name, dosage and vial count.
3. **Internal copy is unbranded-safe.** The BCC uses the same email the customer receives — nothing extra is exposed, and if the copy address is not configured the customer email still sends normally.
4. **Failure reporting stays honest.** If Resend refuses a send, the reason is logged and the confirmation screen keeps telling the buyer the email didn't go out, as it does today.

## Connecting Resend properly

Today the project uses a raw `RESEND_API_KEY` you pasted earlier. I'll offer the Resend connector so the key is managed by Lovable and calls route through the connector gateway. If you'd rather keep the pasted key, the existing direct-to-Resend call keeps working — no other change needed.

## Details you'll be asked for

- The exact internal inbox that should receive the copy (for example `orders@uevenoueld.resend.app`). I'll store it as a project setting rather than hardcoding it, so you can change it later without a code change.

## Technical notes

- `src/lib/orders.server.ts`: replace the hardcoded `from` with `Halvin Labs <orders@uevenoueld.resend.app>`, add a `bcc` array populated from an `ORDER_NOTIFY_EMAIL` environment value (omitted when unset), and keep the existing non-OK response logging that returns `{ sent: false, reason: 'send-failed' }`.
- Optionally switch the `fetch` target from `https://api.resend.com/emails` to the connector gateway (`https://connector-gateway.lovable.dev/resend/emails`) with `Authorization: Bearer ${LOVABLE_API_KEY}` and `X-Connection-Api-Key: ${RESEND_API_KEY}`, if you link the Resend connector.
- No changes to `src/lib/orders.functions.ts`, the checkout route, or the RUO pages — the payload and validation already carry peptide name, dosage and vial count.
- Verify with a test checkout and confirm the send in Resend's dashboard log.
