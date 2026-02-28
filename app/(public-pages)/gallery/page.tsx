import fs from "node:fs/promises";
import path from "node:path";

import Link from "next/link";

import GalleryGridWithLightbox from "./GalleryGridWithLightbox";

export const runtime = "nodejs";

function isImageFile(fileName: string) {
  return /\.(jpe?g|png|webp|gif)$/i.test(fileName);
}

function sortByNumericName(a: string, b: string) {
  const aNum = Number.parseInt(a, 10);
  const bNum = Number.parseInt(b, 10);

  const aIsNum = Number.isFinite(aNum) && String(aNum) === a.split(".")[0];
  const bIsNum = Number.isFinite(bNum) && String(bNum) === b.split(".")[0];

  if (aIsNum && bIsNum) return aNum - bNum;
  if (aIsNum) return -1;
  if (bIsNum) return 1;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export default async function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  let images: string[] = [];
  try {
    const files = await fs.readdir(galleryDir);
    images = files.filter(isImageFile).sort(sortByNumericName);
  } catch {
    images = [];
  }

  return (
    <main className="bg-white">
      {/* Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[url('/banner/banner-bg.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center text-white z-10 p-[130px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Gallery</h1>
          <p className="text-gray-200">Home / Gallery</p>
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2 tracking-wider uppercase">
                Our Work
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Recent photos
              </h2>
            </div>
            <Link
              href="/"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>

          {images.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-700">
              No images found in <code className="font-mono">public/gallery</code>
              . Add your <code className="font-mono">.jpg/.jpeg</code> files
              there and refresh.
            </div>
          ) : (
            <GalleryGridWithLightbox images={images} />
          )}
        </div>
      </section>
    </main>
  );
}

