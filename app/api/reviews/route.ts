import { NextRequest, NextResponse } from "next/server";
import { createReview } from "@/server/reviews/createReview";

export async function POST(req: NextRequest) {
  const { productId, rating, comment } = await req.json();
  const review = await createReview(productId, rating, comment);
  return NextResponse.json({ message: "Review submitted for admin approval", review });
}
