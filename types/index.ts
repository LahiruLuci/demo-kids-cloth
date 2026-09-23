export interface Product {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  badge?: string;
  primaryImage: string;
  hoverImage: string;
  href?: string;
  colors?: { name: string; value: string }[];
  sizes?: { label: string; available: boolean }[];
  shortDescription?: string;
  details?: string[];
  materialCare?: string[];
  deliveryReturns?: string[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage: string;
  mobileBackgroundImage?: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  ctaLabel: string;
  ctaHref: string;
  product: Product;
}
