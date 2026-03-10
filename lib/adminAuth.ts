import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function ensureAdminSession() {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user?.email);
}
