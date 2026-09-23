import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/product-detail";
import { allProducts, getProductBySlug, getProductDetails } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allProducts
    .filter((product) => product.slug)
    .map((product) => ({ slug: product.slug as string }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | Kids Clothing Store" };
  return {
    title: `${product.name} | Kids Clothing Store`,
    description: product.shortDescription ?? `Discover ${product.name}, made for little adventures.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={getProductDetails(product)} />;
}
