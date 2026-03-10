import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany();
  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold">Categories</h2>
      <ul className="list-disc pl-5">{categories.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
      <p className="mt-3 text-sm text-slate-600">Create/edit/delete categories via API endpoints.</p>
    </div>
  );
}
