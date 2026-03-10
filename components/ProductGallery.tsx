import Image from "next/image";

export function ProductGallery({ images }: { images: { imageUrl: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.slice(0, 5).map((img, idx) => (
        <div className="relative h-44" key={idx}>
          <Image src={img.imageUrl} alt={`Product image ${idx + 1}`} fill className="rounded-md object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
