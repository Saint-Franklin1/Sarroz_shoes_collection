//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type AnalyticsSearchParams = {
  from?: string;
  to?: string;
};

function getDateRange(searchParams: AnalyticsSearchParams) {


import Link from "next/link";
import { prisma } from "@/lib/prisma";

function dateRange(searchParams: { from?: string; to?: string }) {
main
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const from = searchParams.from || sevenDaysAgo.toISOString().slice(0, 10);
  const to = searchParams.to || today.toISOString().slice(0, 10);
//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6

  
  return { from, to };
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6
  searchParams: AnalyticsSearchParams;
}) {
  const { from, to } = getDateRange(searchParams);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: new Date(from),
        lte: new Date(`${to}T23:59:59.999Z`),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },

  searchParams: { from?: string; to?: string };
}) {
  const { from, to } = dateRange(searchParams);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: new Date(from), lte: new Date(`${to}T23:59:59.999Z`) } },
    include: { items: { include: { product: true } } },

    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const paymentMix = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const statusMix = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {});

  const topProducts = new Map<string, number>();
  orders.forEach((order) => {
    order.items.forEach((item) => {
//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6
      const current = topProducts.get(item.product.name) || 0;
      topProducts.set(item.product.name, current + item.quantity);

      topProducts.set(item.product.name, (topProducts.get(item.product.name) || 0) + item.quantity);

    });
  });

  const topSelling = [...topProducts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase">From</label>
          <input type="date" name="from" defaultValue={from} className="w-full rounded border p-2" />
        </div>
      //codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase">To</label>
          <input type="date" name="to" defaultValue={to} className="w-full rounded border p-2" />
        </div>
  //codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6

        <button type="submit" className="rounded bg-black px-4 py-2 text-white md:self-end">
          Apply
        </button>

        <Link
          href={`/api/admin/analytics/export?from=${from}&to=${to}`}
          className="rounded border border-black px-4 py-2 text-center md:self-end"
        >
          Export CSV
        </Link>

        <button className="rounded bg-black px-4 py-2 text-white md:self-end">Apply</button>
        <Link href={`/api/admin/analytics/export?from=${from}&to=${to}`} className="rounded border border-black px-4 py-2 text-center md:self-end">Export CSV</Link>

      </form>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded bg-white p-4 shadow">Revenue: KES {totalRevenue.toLocaleString()}</div>
        <div className="rounded bg-white p-4 shadow">Orders: {totalOrders}</div>
        <div className="rounded bg-white p-4 shadow">AOV: KES {averageOrderValue.toFixed(2)}</div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Payment Method Mix</h3>
     
          //codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6
          {Object.entries(paymentMix).map(([method, count]) => {
            return (
              <p key={method}>
                {method}: {count}
              </p>
            );
          })}
          {!Object.keys(paymentMix).length && <p className="text-slate-500">No data</p>}
        </div>

        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Order Status Mix</h3>
          {Object.entries(statusMix).map(([status, count]) => {
            return (
              <p key={status}>
                {status}: {count}
              </p>
            );
          })}

          {Object.entries(paymentMix).map(([method, count]) => <p key={method}>{method}: {count}</p>)}
          {!Object.keys(paymentMix).length && <p className="text-slate-500">No data</p>}
        </div>
        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Order Status Mix</h3>
          {Object.entries(statusMix).map(([status, count]) => <p key={status}>{status}: {count}</p>)}
main
          {!Object.keys(statusMix).length && <p className="text-slate-500">No data</p>}
        </div>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h3 className="mb-2 font-semibold">Top Selling Products</h3>
        
//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6
        {topSelling.map(([name, quantity]) => {
          return (
            <p key={name}>
              {name} - {quantity} sold
            </p>
          );
        })}
        {!topSelling.length && <p className="text-slate-500">No sales in selected range.</p>}
      </div>

      
        {topSelling.map(([name, quantity]) => <p key={name}>{name} — {quantity} sold</p>)}
        {!topSelling.length && <p className="text-slate-500">No sales in selected range.</p>}
      </div>

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
 main

    </div>
  );
}
