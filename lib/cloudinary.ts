import crypto from "crypto";

function cloudinarySign(params: Record<string, string | number>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) throw new Error("Missing CLOUDINARY_API_SECRET");

  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}

export function createCloudinarySignature(folder = "sarroz/products") {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { folder, timestamp };
  const signature = cloudinarySign(params);

  return {
    timestamp,
    folder,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}

export async function destroyCloudinaryAsset(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const timestamp = Math.floor(Date.now() / 1000);

  if (!cloudName || !apiKey || !publicId) return { skipped: true };

  const signature = cloudinarySign({ public_id: publicId, timestamp });

  const body = new URLSearchParams({
    public_id: publicId,
    api_key: apiKey,
    timestamp: String(timestamp),
    signature,
  });

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  return response.json();
}
