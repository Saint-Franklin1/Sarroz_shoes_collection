import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.category.findMany());
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  return NextResponse.json(await prisma.category.create({ data: { name } }));
}
