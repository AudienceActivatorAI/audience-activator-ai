import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductDetail } from "@/components/product/product-detail";
import { products, getProduct } from "@/lib/products";
import { getProductPage } from "@/lib/product-pages";
import { getProductFaqs } from "@/lib/faqs";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
  const canonical = `/products/${slug}`;
  return {
    title,
    description: content.heroDescription,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description: content.heroDescription,
      url: `${SITE_URL}${canonical}`,
      type: "website",
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

  const faqs = getProductFaqs(slug);
  const graph = [
    productSchema({
      name: product.name,
      slug: product.slug,
      description: content.heroDescription,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.name, path: `/products/${product.slug}` },
    ]),
  ];
  const faq = faqSchema(faqs);
  if (faq) graph.push(faq);

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <>
      <JsonLd data={schemaGraph} />
      <ProductDetail product={product} content={content} />
    </>
  );
}
