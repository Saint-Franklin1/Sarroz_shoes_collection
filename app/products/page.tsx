import { getProducts } from "@/server/products/getProducts";
import { ProductCard } from "@/components/ProductCard";

export default async function ProductsPage({ searchParams }: { searchParams: { q?: string } }) {
  const products = await getProducts(searchParams.q);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Shoes</h1>
      <form className="flex gap-2">
        <input name="q" placeholder="Search shoes..." className="w-full rounded border bg-white p-2" defaultValue={searchParams.q} />
        <button className="rounded bg-black px-4 text-white">Search</button>
      </form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
