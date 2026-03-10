import { prisma } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  const orders = await prisma.order.findMany({ include: { items: true } });
  const totalRevenue = orders.reduce((s, o) => s + Number(o.totalAmount), 0);
  const dailyRevenue = orders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString()).reduce((s, o) => s + Number(o.totalAmount), 0);

  const productCounts = new Map<string, number>();
  orders.forEach((o) => o.items.forEach((i) => productCounts.set(i.productId, (productCounts.get(i.productId) || 0) + i.quantity)));

  return (
    <div className="space-y-3">
      <div className="rounded bg-white p-4 shadow">Daily Revenue: KES {dailyRevenue.toLocaleString()}</div>
      <div className="rounded bg-white p-4 shadow">Total Revenue: KES {totalRevenue.toLocaleString()}</div>
      <div className="rounded bg-white p-4 shadow">Top Selling Product IDs: {[...productCounts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,3).map(([id])=>id).join(", ") || "N/A"}</div>
    </div>
  );
}
