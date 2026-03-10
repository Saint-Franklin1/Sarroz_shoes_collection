import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/server/orders/createOrder";
import { rateLimitByIp } from "@/lib/rateLimit";
import { estimateDistanceFromShop } from "@/lib/geo";

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const limiter = rateLimitByIp(ip, 6, 15 * 60 * 1000);
  if (!limiter.allowed) {
    return NextResponse.json({ message: "Too many checkout attempts. Please retry later." }, { status: 429 });
  }

  try {
    const body = await req.json();
    if (body.website) {
      return NextResponse.json({ message: "Spam rejected" }, { status: 400 });
    }

    const estimated = await estimateDistanceFromShop(body.deliveryAddress);
    const { order } = await createOrder({ ...body, distanceKm: body.distanceKm || estimated.distanceKm }, ip);
    return NextResponse.json({ message: "Order placed successfully", orderId: order.id, distanceKm: estimated.distanceKm });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid checkout input";
    return NextResponse.json({ message }, { status: 400 });
  }
}
