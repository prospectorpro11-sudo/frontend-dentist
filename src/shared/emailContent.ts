import dayjs from "dayjs";
import { WEBSITE_SEO_TITLE } from "./constant";
import { COLORS } from "./colors";


export const showHideSearchBar = false;

export const SOCIAL_LINKS = {
    instagram: "",
    facebook: "https://www.facebook.com/MediOutreach/",
    twitter: "https://x.com/medioutreach",
    youtube: "",
    linkedin: "https://www.linkedin.com/company/medioutreach/",
    pinterest: "https://www.pinterest.com/medioutreach/",
};
const GENERIC_CONTENT = {
    logoUrl: "https://www.buydoctorlist.com/_next/image?url=%2Fdoctor-logo.png&w=3840&q=75",
    footerLogoUrl: "https://www.buydoctorlist.com/_next/image?url=%2Fdoctor-white-logo.png&w=384&q=75",
    siteName: WEBSITE_SEO_TITLE,
    date: dayjs().format("YYYY-MMM-DD / h:mm A"),
    social: {
        instagram: SOCIAL_LINKS.instagram,
        facebook: SOCIAL_LINKS.facebook,
        twitter: SOCIAL_LINKS.twitter,
        youtube: SOCIAL_LINKS.youtube,
        linkedin: SOCIAL_LINKS.linkedin,
        pinterest: SOCIAL_LINKS.pinterest,
    },
    pages: {
        terms: `${process.env.NEXT_PUBLIC_BASE_URL}/terms-and-conditions`,
        privacy: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
        legalNotice: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-notice`,
        ccpa: `${process.env.NEXT_PUBLIC_BASE_URL}/ccpa`,
        gdpr: `${process.env.NEXT_PUBLIC_BASE_URL}/gdpr-ready`,
    },
    primaryColor: COLORS.PRIMARY,
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL,

    secondaryColor: COLORS.SECONDARY,
    lightPrimaryColor: COLORS.PRIMARY,
    whiteColor: "#fff",
    gradientColor1: "#1B3B51",
    gradientColor2: "#184C61",
    gradientColor3: "#1B3C51",
    gradientColor4: "#174E63",
};

const REMAIN_UNIQUE_CONTENT = {
    CONTACT_US: {
        title: "We appreciate your reaching out!",
    },
    CRYPTO_ORDER: {
        title: "Once the deposit is made, our representatives will verify the payment.",
        description: `After payment confirmation, you can access the download links at <a href='${process.env.NEXT_PUBLIC_BASE_URL}' style='color: ${COLORS.PRIMARY}'>${process.env.NEXT_PUBLIC_BASE_URL}/app/downloads</a>. Thank you.`,
    },
    PAYPAL_ORDER: {
        title: "We appreciate your recent order",
        description: `<p>Your order is now set to be processed and approved for download. Once approved, you will receive an email with instructions for downloading your database. We appreciate your patience in waiting for us to approve your database access.</p><br /><br /><p>Download links will be available soon on <a href='${process.env.NEXT_PUBLIC_BASE_URL}/app/downloads'>${process.env.NEXT_PUBLIC_BASE_URL}</a>. If you have any questions in the meantime, please do not hesitate to contact us.</p>`,
    },
    DOWNLOAD_FREE_SAMPLE: {
        title: "We appreciate your interest in our list.",
        description:
            "You can open this CSV file using MS Excel. <br /><br /> If you encounter any issues viewing the sample, please contact us via email, and we will provide assistance. <br /><br /> The free sample includes 50 records for each state. If you find this sample size inadequate for evaluating our lists effectively, <br /><br /> feel free to reach out to our customer support team.",
        linkTitle: "Explore more of our comparable databases:",
    },
    SIGN_UP_EMAIL: {
        title: `Hello and welcome to ${WEBSITE_SEO_TITLE}`,
        description:
            "Discover potential sales prospects effortlessly with our top-tier platform that offers business lists, email lists, and an expansive database of medical professionals, including doctors and various healthcare specialists. <br /><br /> Leverage our extensive collection of job titles to connect with key decision-makers in the medical field. Rest assured in the accuracy of our contact information, including phone numbers, email addresses, fax numbers, current company details, and office addresses, as we conduct regular verification to ensure reliability. <br /><br /> Our commitment to data precision and reliability means our contacts are revalidated every two to three months.",
    },
    SUPPORT: {
        title: "Details of Your Support Request",
        description:
            "Your message is under review, and we will reach out to you at the earliest opportunity. Meanwhile, feel free to respond to this email if you wish to provide additional details.",
    },
    VERIFY_EMAIL: {},
};


export const EMAIL_CONTENT = {
    CONTACT_US: {
        ...GENERIC_CONTENT,
        ...REMAIN_UNIQUE_CONTENT.CONTACT_US,
    },
    CRYPTO_ORDER: {
        ...GENERIC_CONTENT,
        ...REMAIN_UNIQUE_CONTENT.CRYPTO_ORDER,
    },
    PAYPAL_ORDER: {
        ...GENERIC_CONTENT,
        ...REMAIN_UNIQUE_CONTENT.PAYPAL_ORDER,
    },
    DOWNLOAD_FREE_SAMPLE: {
        ...GENERIC_CONTENT,
        ...REMAIN_UNIQUE_CONTENT.DOWNLOAD_FREE_SAMPLE,
    },
    SIGN_UP_EMAIL: {
        ...GENERIC_CONTENT,
        ...REMAIN_UNIQUE_CONTENT.SIGN_UP_EMAIL,
    },
    SUPPORT: {
        ...GENERIC_CONTENT,
        ...REMAIN_UNIQUE_CONTENT.SUPPORT,
    },
    VERIFY_EMAIL: {
        ...GENERIC_CONTENT,
    },
    RESPONSE_AFTER_DOWNLOAD_FREE_SAMPLE: (urlText1: string, urlText2: string, contactCount: number) => {
        return {
            ...GENERIC_CONTENT,
            title: `We're grateful for your interest in our ${urlText2 || urlText1}`,
            content1: `We're pleased to extend an offer for a complimentary sample. Kindly be aware that this offer is restricted to ${contactCount} contacts. Should you require a larger sample size, please feel free to reply to this email and inform us.`,
            content2: "Furthermore, if you're keen on discovering more of our offerings, we suggest you take a look at our related product line.",
            content3:
                "Should you have any inquiries, please feel free to contact us without hesitation. Our team is consistently here to provide support. <br /> Once more, we appreciate your interest in our products.",
        };
    },
};
