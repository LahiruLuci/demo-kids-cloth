import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { shopCategories, type ShopCategory } from "@/data/categories";

function CategoryPanel({ category, isFeatured }: { category: ShopCategory; isFeatured: boolean }) {
  return (
    <Link
      href={category.href}
      className={`group relative block min-h-0 overflow-hidden rounded-[28px] bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 ${
        isFeatured
          ? "aspect-[4/5] md:aspect-[16/9] lg:aspect-auto lg:h-full"
          : "aspect-[4/3] md:aspect-[4/3] lg:aspect-auto lg:h-full"
      }`}
    >
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes={isFeatured ? "(max-width: 767px) 100vw, 58vw" : "(max-width: 767px) 100vw, 42vw"}
        className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.04]"
        style={{ objectPosition: category.imagePosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-colors duration-700 ease-out motion-reduce:transition-none group-hover:from-black/75" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-9">
        <h3 className={`font-display font-medium leading-none transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:-translate-y-1 ${isFeatured ? "text-[clamp(2.625rem,4vw,3.25rem)]" : "text-[clamp(2rem,3vw,2.625rem)]"}`}>
          {category.title}
        </h3>
        <p className="mt-3 max-w-[24rem] text-sm leading-relaxed !text-white/85 sm:text-[15px]">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium !text-white transition-colors duration-300 motion-reduce:transition-none group-hover:underline">
          {category.ctaLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function ShopByCategory() {
  const [girls, boys, baby] = shopCategories;

  return (
    <section className="bg-[#f4f0e8] px-5 py-20 sm:px-6 md:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16 lg:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
            Shop by Category
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[0.98] tracking-tight text-neutral-900">
            Made for Every Little Moment
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:text-base">
            Easy everyday styles, playful favorites, and special pieces made for growing personalities.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:h-[clamp(680px,42vw,760px)] lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          <div className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <CategoryPanel category={girls} isFeatured />
          </div>
          <div className="md:col-span-1 lg:col-span-5">
            <CategoryPanel category={boys} isFeatured={false} />
          </div>
          <div className="md:col-span-1 lg:col-span-5">
            <CategoryPanel category={baby} isFeatured={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
