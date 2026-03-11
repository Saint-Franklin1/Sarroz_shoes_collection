import { NextRequest, NextResponse } from "next/server";
import { estimateDistanceFromShop } from "@/lib/geo";
import { calculateDeliveryFee } from "@/lib/deliveryCalculator";

export async function POST(req: NextRequest) {
  const { deliveryAddress } = await req.json();
  if (!deliveryAddress) return NextResponse.json({ message: "deliveryAddress is required" }, { status: 400 });

  const { distanceKm } = await estimateDistanceFromShop(deliveryAddress);
  const feeKes = await calculateDeliveryFee(distanceKm);

  return NextResponse.json({ distanceKm, feeKes });
}
