import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!(await ensureAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const from = req.nextUrl.searchParams.get("from");
  const to = req.nextUrl.searchParams.get("to");

  const where = from && to
    ? { createdAt: { gte: new Date(from), lte: new Date(`${to}T23:59:59.999Z`) } }
    : undefined;

  const orders = await prisma.order.findMany({ where, include: { items: { include: { product: true } } } });

  const header = "orderId,date,customer,payment,status,total,items\n";
  const rows = orders.map((order) => {
    const items = order.items.map((item) => `${item.product.name} x${item.quantity}`).join(" | ");
    return [
      order.id,
      order.createdAt.toISOString(),
      order.customerName,
      order.paymentMethod,
      order.orderStatus,
      Number(order.totalAmount).toFixed(2),
      `"${items.replaceAll('"', '""')}"`,
    ].join(",");
  }).join("\n");

  return new NextResponse(`${header}${rows}`, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=sarroz-analytics.csv",
    },
  });
}
