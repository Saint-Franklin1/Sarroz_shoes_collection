"use client";

import { useState } from "react";


type EstimateResult = { distanceKm: number; feeKes: number };

export function CheckoutForm() {
  const [status, setStatus] = useState("");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  async function estimateDeliveryFee(formData: FormData) {
    const deliveryAddress = String(formData.get("deliveryAddress") || "");
    const response = await fetch("/api/delivery-estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryAddress }),
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.message || "Failed to estimate delivery");
      return;
    }

    setEstimate(data);
    setStatus(`Estimated distance: ${data.distanceKm} km, Fee: KES ${data.feeKes}`);
  }

  async function submitOrder(formData: FormData) {
    const items = JSON.parse(localStorage.getItem("sarroz-cart") || "[]").map((item: any) => ({
      productId: item.id,
      quantity: Number(item.quantity || 1),
    }));

    const payload = {
      ...Object.fromEntries(formData.entries()),
      distanceKm: estimate?.distanceKm,
      items,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setStatus(data.message || "Order submitted");
    if (res.ok) localStorage.removeItem("sarroz-cart");


export function CheckoutForm() {
  const [status, setStatus] = useState("");

  async function submitOrder(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify(payload) });
    const data = await res.json();
    setStatus(data.message || "Order submitted");
 main

  }

  return (
    <form action={submitOrder} className="space-y-3 rounded bg-white p-4 shadow">
      <input name="customerName" placeholder="Customer name" className="w-full rounded border p-2" required />
      <input name="phone" placeholder="Phone number" className="w-full rounded border p-2" required />
      <input name="email" placeholder="Email" className="w-full rounded border p-2" required type="email" />
      <input name="deliveryAddress" placeholder="Delivery address" className="w-full rounded border p-2" required />

        
      //codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-cmb1um

      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <button
        type="button"
        className="rounded border border-black px-4 py-2"
        onClick={async (event) => {
          const form = (event.currentTarget as HTMLButtonElement).form;
          if (!form) return;
          await estimateDeliveryFee(new FormData(form));
        }}
      >
        Auto-calculate distance & fee
      </button>

      {estimate && <p className="text-sm text-slate-600">Distance: {estimate.distanceKm} km | Delivery Fee: KES {estimate.feeKes}</p>}


main

      <select name="deliveryType" className="w-full rounded border p-2" defaultValue="HOME_DELIVERY">
        <option value="HOME_DELIVERY">Home Delivery</option>
        <option value="PICKUP">Pickup</option>
      </select>
      <select name="paymentMethod" className="w-full rounded border p-2" defaultValue="MPESA">
        <option value="MPESA">M-Pesa</option>
        <option value="PAYHERO">PayHero</option>
        <option value="PAYPAL">PayPal</option>
        <option value="PAY_ON_DELIVERY">Pay On Delivery</option>
      </select>
      <button className="rounded bg-black px-4 py-2 text-white" type="submit">Place Order</button>
      {status && <p className="text-sm text-green-600">{status}</p>}
    </form>
  );
}
