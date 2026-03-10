import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const admin = await prisma.adminUser.findUnique({ where: { email: credentials.email } });
        if (!admin) return null;

        const isValid = await compare(credentials.password, admin.passwordHash);
        if (!isValid) return null;

        return { id: admin.id, email: admin.email, mustChangePassword: admin.mustChangePassword };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.mustChangePassword = (user as { mustChangePassword?: boolean }).mustChangePassword;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { mustChangePassword?: boolean }).mustChangePassword = !!token.mustChangePassword;
      return session;
    },
  },
};
