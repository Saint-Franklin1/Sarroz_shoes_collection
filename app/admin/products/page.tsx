import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/AdminTable";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true } });

     //codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-cmb1um

  return (
    <AdminTable
      headers={["Name", "Category", "Price", "Stock Status", "Qty"]}
      rows={products.map((p) => [p.name, p.category.name, `KES ${p.price}`, p.stockStatus, p.stockQuantity])}
    />
  );

  return <AdminTable headers={["Name", "Category", "Price", "Stock"]} rows={products.map((p) => [p.name, p.category.name, `KES ${p.price}`, p.stockStatus])} />;
 main

}
