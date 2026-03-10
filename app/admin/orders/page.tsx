import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/AdminTable";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  return <AdminTable headers={["Customer", "Payment", "Status", "Total"]} rows={orders.map((o) => [o.customerName, o.paymentMethod, o.orderStatus, `KES ${o.totalAmount}`])} />;
}
