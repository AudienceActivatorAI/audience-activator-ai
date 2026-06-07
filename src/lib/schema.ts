import type { FaqItem } from "@/lib/faqs";
import { products } from "@/lib/products";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, PARENT_ORG_NAME, PARENT_ORG_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_ORG_NAME,
      url: PARENT_ORG_URL,
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
      slogan: "Intent. Identity. Activation.",
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function softwareApplicationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
    featureList: [
      "Shopper identity resolution",
      "Intent scoring",
      "BDC Copilot",
      "Super Pixel",
      "Marketplace Copilot",
      "Trade Copilot",
      "DealerOS command center",
    ],
  };
}

export function productSchema(input: {
  name: string;
  slug: string;
  description: string;
}): JsonLd {
  const url = `${SITE_URL}/products/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#product`,
    name: input.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    description: input.description,
    isPartOf: { "@id": `${SITE_URL}/#software` },
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqSchema(faqs: FaqItem[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function productsCollectionSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/products#webpage`,
    name: `${SITE_NAME} Products`,
    url: `${SITE_URL}/products`,
    description:
      "Dealer intelligence products — DealerOS, BDC Copilot, Super Pixel, Marketplace Copilot, Trade Copilot, and more. One software license for the full platform.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/products/${product.slug}`,
      })),
    },
  };
}

export function homePageSchema(faqs: FaqItem[] = []): JsonLd {
  const graph: JsonLd[] = [
    organizationSchema(),
    websiteSchema(),
    softwareApplicationSchema(),
  ];
  const faq = faqSchema(faqs);
  if (faq) graph.push(faq);
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function productsPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      productsCollectionSchema(),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ]),
    ],
  };
}

export function aboutPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        name: `About ${SITE_NAME}`,
        url: `${SITE_URL}/about`,
        description:
          "Audience Activator AI is Dealer Intelligence Infrastructure built by TredFi in Seattle.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "Person",
          name: "James Hamilton",
          jobTitle: "Managing Partner",
          worksFor: {
            "@type": "Organization",
            name: PARENT_ORG_NAME,
            url: PARENT_ORG_URL,
          },
          sameAs: "https://www.linkedin.com/in/tredfi/",
        },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  };
}
