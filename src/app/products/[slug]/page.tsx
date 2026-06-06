import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { products, getProduct } from "@/lib/products";
import { getProductPage } from "@/lib/product-pages";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductPage(slug);
  if (!product || !content) return { title: "Product not found" };

  const title = product.name;
  return {
    title,
    description: content.heroDescription,
    openGraph: {
      title: `${title} · Audience Activator AI`,
      description: content.heroDescription,
    },
  };
}

export default async function ProductPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductPage(slug);

  if (!product || !content) notFound();

  return <ProductDetail product={product} content={content} />;
}
