import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/AdminTable";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true } });
  return <AdminTable headers={["Name", "Category", "Price", "Stock"]} rows={products.map((p) => [p.name, p.category.name, `KES ${p.price}`, p.stockStatus])} />;
}
