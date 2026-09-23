import HeroSection from "@/components/hero/hero-section";
import ShopByCategory from "@/components/home/shop-by-category";
import FeaturedProducts from "@/components/product/featured-products";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <ShopByCategory />
    </>
  );
}
