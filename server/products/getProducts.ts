import { prisma } from "@/lib/prisma";

export async function getProducts(search?: string) {
  return prisma.product.findMany({
    where: search ? { name: { contains: search, mode: "insensitive" } } : undefined,
    include: { images: true, category: true, reviews: { where: { approved: true } } },
    orderBy: { createdAt: "desc" },
  });
}
