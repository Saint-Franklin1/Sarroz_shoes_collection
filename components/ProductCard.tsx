import Link from "next/link";
import Image from "next/image";

export function ProductCard({ product }: { product: any }) {
  const mainImage = product.images?.[0]?.imageUrl || "https://res.cloudinary.com/demo/image/upload/v1/sarroz/fallback.jpg";

  const price = Number(product.discountPrice || product.price);
  const outOfStock = product.stockStatus === "OUT_OF_STOCK" || Number(product.stockQuantity || 0) <= 0;


//codex/build-full-stack-ecommerce-platform-for-sarroz-shoes-cmb1um
  const price = Number(product.discountPrice || product.price);
  const outOfStock = product.stockStatus === "OUT_OF_STOCK" || Number(product.stockQuantity || 0) <= 0;

 main

  return (
    <Link href={`/products/${product.id}`} className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md">
      <div className="relative h-52 w-full">
        <Image src={mainImage} alt={product.name} fill className="rounded-md object-cover" loading="lazy" />
      </div>
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-sm text-slate-600">{product.category?.name}</p>
      <div className="mt-2 flex items-center gap-2">

        <span className="font-bold">KES {price.toLocaleString()}</span>
        {product.discountPrice && <span className="text-sm text-slate-400 line-through">KES {Number(product.price).toLocaleString()}</span>}
      </div>
      <p className={`mt-1 text-xs ${outOfStock ? "text-red-600" : "text-emerald-700"}`}>
        {outOfStock ? "Out of stock" : `In stock (${product.stockQuantity})`}
      </p>

      <span className="font-bold">KES {Number(product.discountPrice || product.price).toLocaleString()}</span>
        {product.discountPrice && <span className="text-sm text-slate-400 line-through">KES {Number(product.price).toLocaleString()}</span>}
      </div>
       main

    </Link>
  );
}
