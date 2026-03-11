const SHOP_COORDS = {
  lat: Number(process.env.SHOP_LATITUDE || 0.5143),
  lon: Number(process.env.SHOP_LONGITUDE || 35.2698),
};

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

export function haversineDistanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return Number((R * c).toFixed(1));
}

export async function geocodeAddress(address: string) {
  const fallback = { lat: SHOP_COORDS.lat, lon: SHOP_COORDS.lon, source: "fallback" as const };
  if (!address?.trim()) return fallback;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", `${address}, Kenya`);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      headers: { "User-Agent": "sarroz-shoes-ecommerce/1.0" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return fallback;
    const data = (await response.json()) as Array<{ lat: string; lon: string }>;
    if (!data.length) return fallback;

    return { lat: Number(data[0].lat), lon: Number(data[0].lon), source: "nominatim" as const };
  } catch {
    return fallback;
  }
}

export async function estimateDistanceFromShop(address: string) {
  const destination = await geocodeAddress(address);
  const distanceKm = haversineDistanceKm(SHOP_COORDS, destination);
  return { distanceKm, destination };
}
