import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  if (!imageBase64) return NextResponse.json({ message: "Image required" }, { status: 400 });
  return NextResponse.json({
    message: "Upload endpoint placeholder. Integrate Cloudinary signed upload in production.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/sarroz/uploaded-image.jpg",
  });
}
