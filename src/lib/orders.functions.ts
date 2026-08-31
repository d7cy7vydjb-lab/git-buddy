import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendOrderEmail } from "@/lib/orders.server";

const orderSchema = z.object({
  reference: z.string().min(3).max(40),
  email: z.string().email(),
  customerName: z.string().min(1).max(120),
  shippingLabel: z.string().min(1).max(40),
  shippingEta: z.string().min(1).max(60),
  paymentLabel: z.string().min(1).max(40),
  lines: z
    .array(
      z.object({
        name: z.string().min(1).max(160),
        dosage: z.string().min(1).max(80),
        vials: z.number().int().min(1).max(999),
        lineTotal: z.string().min(1).max(32),
      }),
    )
    .min(1)
    .max(50),
  subtotal: z.string().min(1).max(32),
  shippingCost: z.string().min(1).max(32),
  vat: z.string().min(1).max(32),
  total: z.string().min(1).max(32),
});

export const sendOrderConfirmation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => sendOrderEmail(data));
