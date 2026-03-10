import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/server/orders/createOrder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = await createOrder({ ...body, items: body.items || [] });
    return NextResponse.json({ message: "Order placed successfully", orderId: order.id });
  } catch {
    return NextResponse.json({ message: "Invalid checkout input" }, { status: 400 });
  }
}
