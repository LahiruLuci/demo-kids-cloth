"use client";

import { useState } from "react";
import Image from "next/image";
import { type Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
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
      <div className="mt-4">
        {product.badge && (
          <span className="inline-block rounded-full bg-[#7f9b87]/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#7f9b87]">
            {product.badge}
          </span>
        )}
        <h3 className="mt-2 font-body text-base font-medium text-neutral-900 transition-colors group-hover:text-neutral-700 md:text-lg">
          {product.name}
        </h3>
        <p className="mt-1 font-body text-sm text-neutral-500 md:text-base">
          LKR {product.price.toLocaleString()}
        </p>
      </div>
    </a>
  );
}
