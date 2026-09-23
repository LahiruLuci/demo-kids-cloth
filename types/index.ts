export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  badge?: string;
  primaryImage: string;
  hoverImage: string;
  href?: string;
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
