import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import ContactUsMainView from "@/mainViews/contactUsMainView/ContactUsMainView";

export const metadata: Metadata = {
    title: `Contact Us - ${WEBSITE_SEO_TITLE}`,
    description: `Get in touch with ${WEBSITE_SEO_TITLE} for inquiries about our dentist email lists, custom requests, or support.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us` },
};

const ContactUsPage = () => {
    return (
        <ContactUsMainView />
    );
};

export default ContactUsPage;