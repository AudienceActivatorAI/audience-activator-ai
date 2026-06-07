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
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Contact for dealer software license pricing",
      url: `${SITE_URL}/#cta`,
    },
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

export function homePageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      softwareApplicationSchema(),
    ],
  };
}
