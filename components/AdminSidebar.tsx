import Link from "next/link";

export function AdminSidebar() {
  const links = ["products", "orders", "categories", "analytics", "discounts", "reviews"];
  return (
    <aside className="rounded bg-white p-4 shadow">
      <h3 className="mb-3 font-bold">Admin</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}><Link href={`/admin/${link}`} className="capitalize text-blue-700">{link}</Link></li>
        ))}
      </ul>
    </aside>
  );
}
