"use client";

import { useState } from "react";

export function CheckoutForm() {
  const [status, setStatus] = useState("");

  async function submitOrder(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify(payload) });
    const data = await res.json();
    setStatus(data.message || "Order submitted");
  }

  return (
    <form action={submitOrder} className="space-y-3 rounded bg-white p-4 shadow">
      <input name="customerName" placeholder="Customer name" className="w-full rounded border p-2" required />
      <input name="phone" placeholder="Phone number" className="w-full rounded border p-2" required />
      <input name="email" placeholder="Email" className="w-full rounded border p-2" required type="email" />
      <input name="deliveryAddress" placeholder="Delivery address" className="w-full rounded border p-2" required />
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
