export type SupportedPaymentMethod = "MPESA" | "PAYHERO" | "PAYPAL" | "PAY_ON_DELIVERY";

export async function initializePayment(method: SupportedPaymentMethod, amount: number) {
  switch (method) {
    case "MPESA":
      return { provider: "M-Pesa", status: "PENDING", reference: `MPESA-${Date.now()}` };
    case "PAYHERO":
      return { provider: "PayHero", status: "PENDING", reference: `PAYHERO-${Date.now()}` };
    case "PAYPAL":
      return { provider: "PayPal", status: "PENDING", reference: `PAYPAL-${Date.now()}` };
    default:
      return { provider: "Pay On Delivery", status: "PENDING", reference: `COD-${amount}-${Date.now()}` };
  }
}
