import { Metadata } from 'next';
import { WEBSITE_SEO_TITLE } from "@/shared/constant";
import AboutMainView from '@/mainViews/aboutMainView/AboutMainView';

export const metadata: Metadata = {
    title: `About Us - ${WEBSITE_SEO_TITLE}`,
    description: `Learn more about ${WEBSITE_SEO_TITLE}, your trusted source for verified dentist email lists and contact databases.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us` },
};

const AboutUsPage = () => {
    return (
        <AboutMainView />
    );
};

export default AboutUsPage;