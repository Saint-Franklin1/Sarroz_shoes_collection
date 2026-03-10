"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem } from "@/components/CartItem";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem("sarroz-cart") || "[]");
    setItems(parsed);
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  function onRemove(id: string) {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("sarroz-cart", JSON.stringify(updated));
  }

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {items.map((item) => <CartItem key={item.id} item={item} onRemove={onRemove} />)}
      <p className="font-semibold">Subtotal: KES {subtotal.toLocaleString()}</p>
      <p className="text-sm text-slate-600">Estimated delivery fee is calculated at checkout.</p>
    </div>
  );
}
