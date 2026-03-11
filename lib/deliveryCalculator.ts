import { prisma } from "@/lib/prisma";

export async function calculateDeliveryFee(distanceKm: number) {
  const zones = await prisma.deliveryZone.findMany({ orderBy: { minKm: "asc" } });
  const zone = zones.find((z) => distanceKm >= z.minKm && (z.maxKm === null || distanceKm <= z.maxKm));
  return zone?.feeKes ?? 500;
}
