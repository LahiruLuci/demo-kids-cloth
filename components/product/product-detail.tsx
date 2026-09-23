"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import { allProducts } from "@/lib/products";

interface ProductDetailProps {
  product: ReturnType<typeof import("@/lib/products").getProductDetails>;
}

type AccordionKey = "details" | "materialCare" | "deliveryReturns";
type GalleryImage = { src: string; alt: string };

export default function ProductDetail({ product }: ProductDetailProps) {
  const gallery = useMemo<GalleryImage[]>(() => {
    const images: GalleryImage[] = [
      { src: product.primaryImage, alt: product.name },
      { src: product.hoverImage, alt: `${product.name} alternate view` },
    ];
    return images.filter(
      (image, index, list) => image.src && list.findIndex((item) => item.src === image.src) === index
    );
  }, [product.name, product.primaryImage, product.hoverImage]);
  const relatedProducts = allProducts
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [bagMessage, setBagMessage] = useState("");
  const [isMobilePurchaseVisible, setIsMobilePurchaseVisible] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isViewerOpen) return;
      if (event.key === "Escape") setIsViewerOpen(false);
      if (event.key === "ArrowRight") setSelectedImage((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setSelectedImage((index) => (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = isViewerOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [gallery.length, isViewerOpen]);

  useEffect(() => {
    const onScroll = () => setIsMobilePurchaseVisible(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToBag = () => {
    if (!selectedSize) {
      setBagMessage("Please select a size.");
      return;
    }
    setBagMessage("Added to Bag ✓");
    window.setTimeout(() => setBagMessage(""), 2200);
  };

  const accordionContent: Record<AccordionKey, string[]> = {
    details: product.details,
    materialCare: product.materialCare,
    deliveryReturns: product.deliveryReturns,
  };

  return (
    <main className="bg-[#fdfcf9] text-neutral-900">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-6 md:px-10 md:pt-12 lg:px-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-neutral-500">
          <Link href="/" className="transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop/${product.category?.toLowerCase() ?? "kids"}`} className="transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">{product.category ?? "Kidswear"}</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,1fr)] lg:gap-14">
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => { setSelectedImage(index); setIsViewerOpen(true); }}
                className={`group relative overflow-hidden bg-[#f4f0e8] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${index === 0 ? "col-span-2 aspect-[4/5] sm:aspect-[5/6]" : "aspect-[4/5]"}`}
                aria-label={`Open image ${index + 1} of ${gallery.length}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes={index === 0 ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 1023px) 50vw, 28vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                />
              </button>
            ))}
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border-b border-neutral-200 pb-8">
              {product.badge && <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d8975]">{product.badge}</p>}
              <h1 className="mt-3 font-display text-[clamp(2.4rem,3.2vw,4rem)] font-medium leading-none tracking-tight text-neutral-900">{product.name}</h1>
              <p className="mt-5 text-xl text-neutral-900">LKR {product.price.toLocaleString()}</p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600">{product.shortDescription}</p>
            </div>

            <div className="border-b border-neutral-200 py-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-700">Color <span className="font-normal normal-case tracking-normal text-neutral-500">{selectedColor.name}</span></p>
              </div>
              <div className="mt-4 flex gap-3" role="radiogroup" aria-label="Choose color">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    role="radio"
                    aria-label={color.name}
                    aria-checked={selectedColor.name === color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full border-2 p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${selectedColor.name === color.name ? "border-neutral-900" : "border-transparent"}`}
                  >
                    <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: color.value }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-neutral-200 py-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-700">Select Size</p>
                <button type="button" onClick={() => setIsSizeGuideOpen(true)} className="text-xs underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">Size Guide</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    disabled={!size.available}
                    aria-pressed={selectedSize === size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`relative min-h-12 min-w-12 border px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${selectedSize === size.label ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900"} disabled:cursor-not-allowed disabled:text-neutral-300 disabled:line-through`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={addToBag} className="mt-7 flex h-14 w-full items-center justify-center bg-neutral-900 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#304038] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">Add to Bag</button>
            <p aria-live="polite" className={`mt-3 min-h-5 text-sm ${bagMessage.includes("Please") ? "text-[#9a5149]" : "text-[#6d8975]"}`}>{bagMessage}</p>
            <p className="text-center text-xs text-neutral-500">Easy exchanges · Thoughtfully packed · Islandwide delivery</p>

            <div className="mt-8">
              {(["details", "materialCare", "deliveryReturns"] as AccordionKey[]).map((key) => (
                <div key={key} className="border-t border-neutral-200">
                  <button type="button" onClick={() => setOpenAccordion(openAccordion === key ? null : key)} className="flex w-full items-center justify-between py-5 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" aria-expanded={openAccordion === key}>
                    {key === "details" ? "Product Details" : key === "materialCare" ? "Material & Care" : "Delivery & Returns"}
                    <span className="text-xl font-light">{openAccordion === key ? "−" : "+"}</span>
                  </button>
                  {openAccordion === key && <div className="pb-5 text-sm leading-relaxed text-neutral-600"><ul className="list-disc space-y-1 pl-5">{accordionContent[key].map((item) => <li key={item}>{item}</li>)}</ul></div>}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-20 overflow-hidden bg-[#f4f0e8] md:mt-28">
          <div className="grid items-center md:grid-cols-2">
            <div className="relative aspect-[4/3] min-h-[260px]">
              <Image src={gallery[0].src} alt={`${product.name} lifestyle detail`} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-8 sm:p-12 lg:p-16"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Made for everyday adventures</p><h2 className="mt-4 font-display text-3xl leading-tight text-neutral-900 sm:text-4xl">Soft pieces for big little days.</h2></div>
          </div>
        </section>

        <section className="mt-20 md:mt-28" aria-labelledby="related-title">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">More to Love</p>
          <h2 id="related-title" className="mt-4 text-center font-display text-4xl font-medium tracking-tight text-neutral-900">You May Also Like</h2>
          <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {relatedProducts.map((item) => <div key={item.id} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] md:w-auto"><ProductCard product={item} /></div>)}
          </div>
        </section>
      </div>

      {isMobilePurchaseVisible && <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-neutral-200 bg-[#fdfcf9]/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden"><span className="font-medium text-neutral-900">LKR {product.price.toLocaleString()}</span><button type="button" onClick={addToBag} className="h-11 flex-1 bg-neutral-900 text-xs font-semibold uppercase tracking-[0.1em] text-white">Add to Bag</button></div>}

      {isViewerOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 p-5" role="dialog" aria-modal="true" aria-label={`${product.name} image viewer`}><button type="button" onClick={() => setIsViewerOpen(false)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close image viewer"><X /></button><button type="button" onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Previous image"><ChevronLeft /></button><div className="relative h-[80vh] w-full max-w-5xl"><Image src={gallery[selectedImage].src} alt={gallery[selectedImage].alt} fill sizes="90vw" className="object-contain" /></div><button type="button" onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Next image"><ChevronRight /></button><p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white">{selectedImage + 1} / {gallery.length}</p></div>}
      {isSizeGuideOpen && <div className="fixed inset-0 z-40 flex items-center justify-center bg-neutral-950/40 p-5" role="dialog" aria-modal="true" aria-labelledby="size-guide-title"><div className="w-full max-w-md bg-[#fdfcf9] p-6 shadow-xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Demo sizing</p><h2 id="size-guide-title" className="mt-2 font-display text-3xl text-neutral-900">Size Guide</h2></div><button type="button" onClick={() => setIsSizeGuideOpen(false)} className="flex h-10 w-10 items-center justify-center text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" aria-label="Close size guide"><X /></button></div><div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200 text-sm"><div className="grid grid-cols-2 py-3 font-medium text-neutral-500"><span>Age</span><span>Height</span></div>{[["2Y", "86–92 cm"], ["3Y", "92–98 cm"], ["4Y", "98–104 cm"], ["5Y", "104–110 cm"], ["6Y", "110–116 cm"]].map(([age, height]) => <div key={age} className="grid grid-cols-2 py-3 text-neutral-800"><span>{age}</span><span>{height}</span></div>)}</div></div></div>}
    </main>
  );
}
