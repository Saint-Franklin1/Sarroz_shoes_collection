import { prisma } from "@/lib/prisma";

export async function createReview(productId: string, rating: number, comment: string) {
  return prisma.review.create({ data: { productId, rating, comment } });
}
