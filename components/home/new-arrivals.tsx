import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import { newArrivals, newArrivalsFeature } from "@/data/new-arrivals";

function FeaturedLook() {
  return (
    <Link
      href="/shop/new-arrivals"
      className="group relative block col-span-2 aspect-[4/3] min-h-0 overflow-hidden rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 md:aspect-[16/9] md:col-span-2 md:row-span-1 lg:aspect-auto lg:col-span-2 lg:row-span-2"
    >
      <Image
        src={newArrivalsFeature.image}
        alt={newArrivalsFeature.imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.025]"
        style={{ objectPosition: "center 42%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-colors duration-700 ease-out motion-reduce:transition-none group-hover:from-black/85" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] !text-white/75">
          The Weekend Edit
        </p>
        <h3 className="mt-3 max-w-[18rem] font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[0.98] !text-white">
          Ready for Little Adventures
        </h3>
        <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium !text-white group-hover:underline">
          Discover the Look
          <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function NewArrivals() {
  const [first, second, third, fourth, fifth, sixth, seventh] = newArrivals;

  return (
    <section className="w-full bg-[#fdfcf9] px-5 py-20 sm:px-6 md:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
              Just Landed
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,4.5rem)] font-medium leading-[0.96] tracking-tight text-neutral-900">
              New Arrivals
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600 sm:text-base">
              Fresh little looks made for everyday adventures.
            </p>
          </div>
          <Link
            href="/shop/new-arrivals"
            className="inline-flex items-center gap-2 self-start text-[13px] font-medium text-neutral-900 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 md:self-auto"
          >
            View All New Arrivals
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7">
          <div className="min-w-0"><ProductCard product={first} compact /></div>
          <div className="min-w-0"><ProductCard product={second} compact /></div>
          <div className="min-w-0"><ProductCard product={third} compact /></div>
          <div className="min-w-0"><ProductCard product={fourth} compact /></div>
          <FeaturedLook />
          <div className="min-w-0"><ProductCard product={fifth} compact /></div>
          <div className="min-w-0"><ProductCard product={sixth} compact /></div>
          <div className="min-w-0"><ProductCard product={seventh} compact /></div>
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Link
            href="/shop/new-arrivals"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-900 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          >
            View All New Arrivals
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
