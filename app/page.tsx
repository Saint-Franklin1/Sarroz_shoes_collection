import Link from "next/link";
import { getProducts } from "@/server/products/getProducts";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="space-y-8">
      <section className="rounded-xl bg-black p-8 text-white">
        <h1 className="text-3xl font-bold">SARROZ Shoes Collection</h1>
        <p className="mt-2">Premium footwear delivered across Kenya.</p>
        <Link href="/products" className="mt-4 inline-block rounded bg-white px-4 py-2 text-black">Shop Now</Link>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Shoes</h2>
          <a href="https://wa.me/254715118292?text=Hello%20SARROZ%2C%20I%20need%20help%20with%20an%20order" className="text-green-600">WhatsApp Contact</a>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
