import { featuredProducts } from "@/data/products";
import { newArrivals } from "@/data/new-arrivals";
import { type Product } from "@/types";

export const allProducts: Product[] = [...featuredProducts, ...newArrivals];

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductDetails(product: Product) {
  return {
    ...product,
    colors: product.colors ?? [
      { name: "Sage", value: "#9baa91" },
      { name: "Cream", value: "#eee8dc" },
      { name: "Rose", value: "#d9a9a7" },
    ],
    sizes: product.sizes ?? [
      { label: "2Y", available: true },
      { label: "3Y", available: true },
      { label: "4Y", available: true },
      { label: "5Y", available: true },
      { label: "6Y", available: false },
    ],
    shortDescription:
      product.shortDescription ?? "A comfortable everyday favorite made for little adventures.",
    details: product.details ?? [
      "Relaxed everyday fit.",
      "Soft, breathable fabric for easy movement.",
      "Thoughtful details made for growing personalities.",
    ],
    materialCare: product.materialCare ?? [
      "Soft-touch cotton blend.",
      "Machine wash cold with similar colors.",
      "Lay flat or hang to dry.",
    ],
    deliveryReturns: product.deliveryReturns ?? [
      "Islandwide delivery available for this demo store.",
      "Easy exchanges are supported in the demo experience.",
    ],
  };
}
