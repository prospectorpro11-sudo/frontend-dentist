import CheckoutMainView from "@/mainViews/checkout/Checkout";
import { WEBSITE_SEO_TITLE } from "@/shared/constant";

export const metadata = {
  title: `Secure Checkout – Complete Your Order | ${WEBSITE_SEO_TITLE}`,
  description: `Securely complete your purchase on ${WEBSITE_SEO_TITLE}. Fast, encrypted checkout with multiple payment options for nursing professional contact lists.`,
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout` },
};

export default function CheckoutPage() {
  return <CheckoutMainView />;
}
