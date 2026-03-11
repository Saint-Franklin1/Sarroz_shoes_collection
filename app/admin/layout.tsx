import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
