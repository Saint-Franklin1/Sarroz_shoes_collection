"use client";

import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/admin",
    });
  }

  return (
    <form action={login} className="mx-auto mt-16 max-w-md space-y-3 rounded bg-white p-6 shadow">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input name="email" type="email" className="w-full rounded border p-2" placeholder="Admin email" required />
      <input name="password" type="password" className="w-full rounded border p-2" placeholder="Password" required />
      <button className="w-full rounded bg-black py-2 text-white">Sign In</button>
      <p className="text-xs text-slate-500">Password change required on first login.</p>
    </form>
  );
}
