import React from "react";

interface GalleryItem {
  image?: { url: string; alt: string };
  title?: string;
  description?: string;
}
interface ComponentProps {
  header?: string;
  subheader?: string;
  images?: GalleryItem[];
}

export default function Gallery_1({
  header,
  subheader,
  images = [],
}: ComponentProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            {header}
          </h2>
          <p>{subheader}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img, i) => (
            <div key={`img-${i}`} className="rounded-lg border p-3">
              <div className="bg-muted aspect-[4/3] rounded-md" />
              {img.title && (
                <h3 className="mt-2 text-sm font-medium">{img.title}</h3>
              )}
              {img.description && (
                <p className="text-muted-foreground text-xs">
                  {img.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
