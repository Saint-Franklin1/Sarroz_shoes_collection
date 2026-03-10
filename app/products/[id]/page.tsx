import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/ProductGallery";
import { RatingComponent } from "@/components/RatingComponent";

export const revalidate = 120;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return {};
  return {
    title: product.seoTitle || product.name,
    description: product.metaDescription || product.description.slice(0, 150),
  };
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { images: true, reviews: { where: { approved: true } } } });
  if (!product) notFound();

  const avg = product.reviews.length ? Math.round(product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length) : 0;
  const outOfStock = product.stockStatus === "OUT_OF_STOCK" || product.stockQuantity <= 0;

  return (
    <article className="grid gap-6 md:grid-cols-2">
      <ProductGallery images={product.images} />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <RatingComponent rating={avg} />
        <div className="my-3 flex items-center gap-2">
          <span className="text-2xl font-semibold">KES {Number(product.discountPrice || product.price).toLocaleString()}</span>
          {product.discountPrice && <span className="text-slate-400 line-through">KES {Number(product.price).toLocaleString()}</span>}
        </div>
        <p>{product.description}</p>
        <p className="mt-2 text-sm">Size range: {product.sizeRange}</p>
        <p className="text-sm">Color: {product.color}</p>
        <p className="text-sm">Stock: {outOfStock ? "OUT OF STOCK" : `IN STOCK (${product.stockQuantity})`}</p>
        <div className="mt-4 flex gap-3">
          <button disabled={outOfStock} className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-slate-400">Add to Cart</button>
          <a href={`https://wa.me/254715118292?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`} className="rounded bg-green-600 px-4 py-2 text-white">WhatsApp Order</a>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description,
        offers: { '@type': 'Offer', priceCurrency: 'KES', price: Number(product.discountPrice || product.price), availability: product.stockStatus === 'IN_STOCK' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' }
      }) }} />
    </article>
  );
}
