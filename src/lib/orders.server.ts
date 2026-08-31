export type OrderEmailLine = {
  name: string;
  dosage: string;
  vials: number;
  lineTotal: string;
};

export type OrderEmailPayload = {
  reference: string;
  email: string;
  customerName: string;
  shippingLabel: string;
  shippingEta: string;
  paymentLabel: string;
  lines: OrderEmailLine[];
  subtotal: string;
  shippingCost: string;
  vat: string;
  total: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderOrderEmail(order: OrderEmailPayload) {
  const rows = order.lines
    .map(
      (l) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
          <strong style="color:#0b1220;">${escapeHtml(l.name)}</strong><br />
          <span style="font-size:12px;color:#64748b;">Dosage: ${escapeHtml(l.dosage)}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;color:#0b1220;">
          ${l.vials} ${l.vials === 1 ? "vial" : "vials"}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#0b1220;">
          ${escapeHtml(l.lineTotal)}
        </td>
      </tr>`,
    )
    .join("");

  const totalRows: Array<[string, string]> = [
    ["Subtotal", order.subtotal],
    [`${order.shippingLabel} shipping`, order.shippingCost],
    ["VAT (21%)", order.vat],
  ];
  const totals = totalRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 0;font-size:13px;color:#64748b;">${escapeHtml(label)}</td><td style="padding:4px 0;text-align:right;font-size:13px;color:#0b1220;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");


  return `<!doctype html>
<html><body style="margin:0;background:#f6f7f9;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a16207;">Halvin Labs — For research use only</p>
    <h1 style="margin:12px 0 0;font-size:22px;color:#0b1220;">Order ${escapeHtml(order.reference)} confirmed</h1>
    <p style="margin:14px 0 0;font-size:14px;color:#475569;line-height:1.6;">
      Thank you, ${escapeHtml(order.customerName)}. Your research order is being prepared for dispatch from our EU facility.
      Certificates of Analysis for the dispatched batches follow with your tracking notification.
    </p>

    <div style="margin-top:28px;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;padding:20px;">
      <h2 style="margin:0 0 10px;font-size:14px;color:#0b1220;">Peptides ordered</h2>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <thead>
          <tr>
            <th align="left" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#94a3b8;padding-bottom:6px;">Peptide</th>
            <th align="center" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#94a3b8;padding-bottom:6px;">Vials</th>
            <th align="right" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#94a3b8;padding-bottom:6px;">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:14px;">
        ${totals}
        <tr>
          <td style="padding-top:10px;font-size:15px;font-weight:bold;color:#0b1220;border-top:1px solid #e5e7eb;">Total</td>
          <td style="padding-top:10px;text-align:right;font-size:15px;font-weight:bold;color:#0b1220;border-top:1px solid #e5e7eb;">${escapeHtml(order.total)}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top:16px;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;padding:20px;font-size:13px;color:#475569;">
      <p style="margin:0;"><strong style="color:#0b1220;">Delivery:</strong> ${escapeHtml(order.shippingLabel)} — ${escapeHtml(order.shippingEta)}</p>
      <p style="margin:8px 0 0;"><strong style="color:#0b1220;">Payment:</strong> ${escapeHtml(order.paymentLabel)}</p>
      <p style="margin:8px 0 0;">Store lyophilised vials at −20 °C on arrival. See the storage and reconstitution guidance in our RUO documentation.</p>
    </div>

    <p style="margin:24px 0 0;font-size:11px;line-height:1.7;color:#94a3b8;">
      All compounds are supplied strictly as reference materials for laboratory research and in-vitro experimentation by qualified professionals.
      They are not drugs, foods, cosmetics or medical devices and must not be administered to humans or animals.
      You confirmed at checkout that you are 18 or older and are purchasing for research use only.
    </p>
  </div>
</body></html>`;
}

export async function sendOrderEmail(order: OrderEmailPayload) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return { sent: false, reason: "missing-api-key" as const };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "Halvin Labs <onboarding@resend.dev>",
      to: [order.email],
      subject: `Order ${order.reference} confirmed — Halvin Labs RUO`,
      html: renderOrderEmail(order),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error", res.status, detail);
    return { sent: false, reason: "send-failed" as const };
  }

  return { sent: true as const };
}
