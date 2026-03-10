import { prisma } from "@/lib/prisma";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ include: { product: true } });
  return (
    <div className="rounded bg-white p-4 shadow">
      {reviews.map((r) => <p key={r.id}>{r.product.name}: {r.rating}/5 - {r.comment} ({r.approved ? "Approved" : "Pending"})</p>)}
    </div>
  );
}
