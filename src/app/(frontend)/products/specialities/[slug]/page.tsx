import type { Metadata } from "next";
import { notFound } from "next/navigation";

// import ProductDetailMainView from "@/mainViews/productDetailMainView/ProductDetailMainView";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import {
  getProductBySlug,
} from "@/shared/productCatalog";
import {
  fetchEditorProductBySlug,
  toCatalogItem,
} from "@/server/editorProducts";
import ProductDetailsMainView from "@/mainViews/productDetailsMainView/ProductDetailsMainView";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

const getProductData = async (slug: string) => {
  try {
    const editorProduct = await fetchEditorProductBySlug(slug);
    if (editorProduct?.id) {
      return {
        product: toCatalogItem(editorProduct, 0),
        editorProduct,
      };
    }
  } catch (_error) {
    // Fallback to static catalog when backend lookup fails.
  }

  const fallbackProduct = getProductBySlug(slug);
  if (!fallbackProduct) {
    return {
      product: null,
      editorProduct: null,
    };
  }

  return {
    product: fallbackProduct,
    editorProduct: null,
  };
};

export const generateMetadata = async ({
  params,
}: ProductDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { product, editorProduct } = await getProductData(slug);
  const rewrittenJson =
    (editorProduct?.rewrittenJson as Record<string, any>) || {};

  if (!product) {
    return {
      title: `Product Not Found | ${WEBSITE_SEO_TITLE}`,
      description: "The requested product detail page could not be found.",
    };
  }

  const canonicalPath = `/products/${product.slug}`;
  const canonical = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${canonicalPath}`
    : canonicalPath;

  return {
    title: `${rewrittenJson?.metaTitle || product.productName} | ${WEBSITE_SEO_TITLE}`,
    description:
      rewrittenJson?.metaDescription ||
      product.shortDescription ||
      `Explore ${product.productName} with structured content sections and SEO-ready detail layout.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${rewrittenJson?.metaTitle || product.productName} | ${WEBSITE_SEO_TITLE}`,
      description: rewrittenJson?.metaDescription || product.shortDescription,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${rewrittenJson?.metaTitle || product.productName} | ${WEBSITE_SEO_TITLE}`,
      description: rewrittenJson?.metaDescription || product.shortDescription,
    },
    keywords: [
      product.productName,
      `${product.stateName} nurse leads`,
      `${product.stateName} nursing contacts`,
      "nurse email list",
      "healthcare outreach data",
    ],
  };
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const { product, editorProduct } = await getProductData(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsMainView product={product} editorProduct={editorProduct} />;
};

export default ProductDetailPage;
