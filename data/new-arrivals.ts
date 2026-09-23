import { type Product } from "@/types";
import { featuredProducts } from "@/data/products";

export const newArrivals: Product[] = [
  {
    ...featuredProducts[2],
    id: "arrival-meadow-cotton-dress",
    slug: "meadow-cotton-dress",
    name: "Meadow Cotton Dress",
    price: 5290,
    badge: "NEW",
    href: "/products/meadow-cotton-dress",
  },
  {
    ...featuredProducts[0],
    id: "arrival-little-explorer-tee",
    slug: "little-explorer-tee",
    name: "Little Explorer Tee",
    price: 3490,
    badge: undefined,
    href: "/products/little-explorer-tee",
  },
  {
    ...featuredProducts[1],
    id: "arrival-weekend-linen-shirt",
    slug: "weekend-linen-shirt",
    name: "Weekend Linen Shirt",
    price: 4490,
    badge: "JUST IN",
    href: "/products/weekend-linen-shirt",
  },
  {
    ...featuredProducts[3],
    id: "arrival-sunshine-play-set",
    slug: "sunshine-play-set",
    name: "Sunshine Play Set",
    price: 4890,
    badge: undefined,
    href: "/products/sunshine-play-set",
  },
  {
    ...featuredProducts[6],
    id: "arrival-adventure-cotton-shorts",
    slug: "adventure-cotton-shorts",
    name: "Adventure Cotton Shorts",
    price: 3990,
    badge: undefined,
    href: "/products/adventure-cotton-shorts",
  },
  {
    ...featuredProducts[4],
    id: "arrival-soft-knit-cardigan",
    slug: "soft-knit-cardigan",
    name: "Soft Knit Cardigan",
    price: 5990,
    badge: "NEW",
    href: "/products/soft-knit-cardigan",
  },
  {
    ...featuredProducts[7],
    id: "arrival-garden-party-dress",
    slug: "garden-party-dress",
    name: "Garden Party Dress",
    price: 6490,
    badge: undefined,
    href: "/products/garden-party-dress",
  },
];

export const newArrivalsFeature = {
  image:
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1600&q=85",
  imageAlt: "Children wearing relaxed outfits for a weekend adventure",
};
