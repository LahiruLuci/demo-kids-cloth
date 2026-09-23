export interface ShopCategory {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

export const shopCategories: ShopCategory[] = [
  {
    id: "girls",
    title: "Girls",
    description: "Playful pieces for every little moment",
    ctaLabel: "Shop Girls",
    href: "/shop/girls",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1400&q=85",
    imageAlt: "Girl wearing a light children's dress outdoors",
    imagePosition: "center 35%",
  },
  {
    id: "boys",
    title: "Boys",
    description: "Easy styles made for every adventure",
    ctaLabel: "Shop Boys",
    href: "/shop/boys",
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1200&q=85",
    imageAlt: "Boy wearing modern casual children's clothing",
    imagePosition: "center 35%",
  },
  {
    id: "baby",
    title: "Baby",
    description: "Soft little essentials for tiny days",
    ctaLabel: "Shop Baby",
    href: "/shop/baby",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&q=85",
    imageAlt: "Baby wearing soft everyday clothing",
    imagePosition: "center 45%",
  },
];
