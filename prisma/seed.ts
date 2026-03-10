import { PrismaClient, StockStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Rose92@.29", 12);

  await prisma.adminUser.upsert({
    where: { email: "roserocky92@gmail.com" },
    update: { phone: "0715118292", passwordHash, mustChangePassword: true },
    create: {
      email: "roserocky92@gmail.com",
      phone: "0715118292",
      passwordHash,
      mustChangePassword: true,
    },
  });

  for (const name of ["Sneakers", "Heels", "Sandals", "Kids Shoes", "Official Shoes"]) {
    await prisma.category.upsert({ where: { name }, update: {}, create: { name } });
  }

  const sneakerCategory = await prisma.category.findUnique({ where: { name: "Sneakers" } });
  if (sneakerCategory) {
    const product = await prisma.product.create({
      data: {
        name: "SARROZ Urban Runner",
        seoTitle: "SARROZ Urban Runner Sneakers",
        metaDescription: "Comfortable and stylish SARROZ sneakers for daily wear.",
        description: "Lightweight sneakers for all-day comfort.",
        price: 4500,
        discountPrice: 3900,
        categoryId: sneakerCategory.id,
        sizeRange: "38-45",
        color: "Black / White",
        stockStatus: StockStatus.IN_STOCK,
//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-cmb1um
        stockQuantity: 20,
 main
      },
    });

    await prisma.productImage.createMany({
      data: [
        { productId: product.id, imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/sarroz/shoe-1.jpg" },
        { productId: product.id, imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/sarroz/shoe-2.jpg" },
      ],
    });
  }

  const deliveryZones = [
    { label: "0-5 km", minKm: 0, maxKm: 5, feeKes: 100 },
    { label: "5-15 km", minKm: 5, maxKm: 15, feeKes: 200 },
    { label: "15-40 km", minKm: 15, maxKm: 40, feeKes: 350 },
    { label: "Outside city", minKm: 40, maxKm: null, feeKes: 500 },
  ];

  for (const zone of deliveryZones) {
    await prisma.deliveryZone.upsert({
      where: { label: zone.label },
      update: zone,
      create: zone,
    });
  }
}

main().finally(async () => prisma.$disconnect());
