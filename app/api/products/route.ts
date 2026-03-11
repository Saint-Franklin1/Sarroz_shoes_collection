import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ include: { images: true, category: true } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stockQuantity = Number(body.stockQuantity ?? 0);
  const product = await prisma.product.create({
    data: {
      ...body,
      stockQuantity,
      stockStatus: stockQuantity > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    },
  });
  return NextResponse.json(product);
}
