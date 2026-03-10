import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SARROZ Shoes Collection",
  description: "Single-vendor ecommerce store for SARROZ Shoes Collection",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-6xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
