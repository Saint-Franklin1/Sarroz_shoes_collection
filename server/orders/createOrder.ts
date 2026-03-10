import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calculateDeliveryFee } from "@/lib/deliveryCalculator";
import { initializePayment } from "@/lib/payment";
import { sendAdminOrderEmail } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

const checkoutSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  deliveryAddress: z.string().min(4),
  deliveryType: z.enum(["HOME_DELIVERY", "PICKUP"]),
  paymentMethod: z.enum(["MPESA", "PAYHERO", "PAYPAL", "PAY_ON_DELIVERY"]),
  distanceKm: z.coerce.number().default(0),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).default([]),
});

export async function createOrder(payload: unknown) {
  const data = checkoutSchema.parse(payload);
  const products = await prisma.product.findMany({ where: { id: { in: data.items.map((i) => i.productId) } } });

  const subtotal = data.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    const price = Number(product?.discountPrice ?? product?.price ?? 0);
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = data.deliveryType === "PICKUP" ? 0 : await calculateDeliveryFee(data.distanceKm);
  const totalAmount = subtotal + deliveryFee;

  const order = await prisma.order.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      email: data.email,
      deliveryAddress: data.deliveryAddress,
      deliveryType: data.deliveryType,
      paymentMethod: data.paymentMethod,
      deliveryFee,
      totalAmount,
      items: {
        create: data.items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: Number(product?.discountPrice ?? product?.price ?? 0),
          };
        }),
      },
    },
    include: { items: { include: { product: true } } },
  });

  await initializePayment(data.paymentMethod, totalAmount);

  const itemsString = order.items.map((i) => `${i.product.name} x${i.quantity}`).join(", ");
  const message = `New SARROZ order\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nItems: ${itemsString}\nAddress: ${order.deliveryAddress}\nPayment: ${order.paymentMethod}\nTotal: KES ${Number(order.totalAmount).toLocaleString()}`;

  await Promise.all([
    sendWhatsAppNotification(message),
    sendAdminOrderEmail("New SARROZ Order", `<p>${message.replace(/\n/g, "<br/>")}</p>`),
  ]);

  return order;
}
