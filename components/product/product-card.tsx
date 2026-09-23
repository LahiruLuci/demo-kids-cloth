"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={product.href ?? "#"}
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-300 ease-out ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-300 ease-out ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div className={compact ? "mt-2.5 sm:mt-3" : "mt-4"}>
        {product.badge && (
          <span className={compact ? "inline-block rounded-full bg-[#7f9b87]/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#7f9b87] sm:text-[10px]" : "inline-block rounded-full bg-[#7f9b87]/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#7f9b87]"}>
            {product.badge}
          </span>
        )}
        <h3 className={compact ? "mt-1.5 line-clamp-2 font-body text-[13px] font-medium leading-snug text-neutral-900 transition-colors group-hover:text-neutral-700 sm:text-sm" : "mt-2 font-body text-base font-medium text-neutral-900 transition-colors group-hover:text-neutral-700 md:text-lg"}>
          {product.name}
        </h3>
        <p className={compact ? "mt-1 font-body text-[12px] leading-tight text-neutral-500 sm:text-[13px]" : "mt-1 font-body text-sm text-neutral-500 md:text-base"}>
          LKR {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
