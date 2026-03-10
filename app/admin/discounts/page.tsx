import { prisma } from "@/lib/prisma";

export default async function AdminDiscountsPage() {
  const codes = await prisma.discountCode.findMany();
  return <div className="rounded bg-white p-4 shadow">{codes.map((c) => <p key={c.id}>{c.code} - {c.discountPercentage}% ({c.active ? "Active" : "Inactive"})</p>)}</div>;
}
