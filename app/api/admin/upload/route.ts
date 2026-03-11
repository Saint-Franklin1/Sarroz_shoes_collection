import { NextRequest, NextResponse } from "next/server";
 //codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6

//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-cmb1um

import { prisma } from "@/lib/prisma";
import { ensureAdminSession } from "@/lib/adminAuth";
import { createCloudinarySignature, destroyCloudinaryAsset } from "@/lib/cloudinary";

export async function GET() {
  if (!(await ensureAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(createCloudinarySignature());
  } catch {
    return NextResponse.json({ message: "Cloudinary config missing" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await ensureAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { productId, imageUrl } = await req.json();
  if (!productId || !imageUrl) return NextResponse.json({ message: "productId and imageUrl are required" }, { status: 400 });

  const currentCount = await prisma.productImage.count({ where: { productId } });
  if (currentCount >= 5) {
    return NextResponse.json({ message: "A product can only have up to 5 images" }, { status: 400 });
  }

  const image = await prisma.productImage.create({ data: { productId, imageUrl } });
  return NextResponse.json({ message: "Image saved", image });
}

export async function DELETE(req: NextRequest) {
  if (!(await ensureAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { imageId, publicId } = await req.json();
  if (!imageId) return NextResponse.json({ message: "imageId is required" }, { status: 400 });

  const image = await prisma.productImage.delete({ where: { id: imageId } });
  if (publicId) await destroyCloudinaryAsset(publicId);

  return NextResponse.json({ message: "Image removed", imageId: image.id });
//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-geagn6


export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  if (!imageBase64) return NextResponse.json({ message: "Image required" }, { status: 400 });
  return NextResponse.json({
    message: "Upload endpoint placeholder. Integrate Cloudinary signed upload in production.",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/sarroz/uploaded-image.jpg",
  });
 main

}
