import { IFreeSample } from "../interface";

const freeSample: IFreeSample = {
    heading: 'Get your',
    headingAccent: 'sample access',
    subtitle:
        'Gain exclusive entry to thousands of verified dentist contacts. Our architectural verification process ensures precision that fuels your outreach strategy.',
    dentistData: [
        {
            specialty: 'Orthodontics',
            email: 'dr.smith@dentalcare.com',
            phone: '(555) 019-2234',
            dotClass: 'dot1',
        },
        {
            specialty: 'Periodontics',
            email: 'contact@janesperio.org',
            phone: '(555) 021-8890',
            dotClass: 'dot2',
        },
        {
            specialty: 'Endodontics',
            email: 'info@rootcanalpro.net',
            phone: '(555) 018-4456',
            dotClass: 'dot3',
        },
        {
            specialty: 'Orthodontics',
            email: 'dr.smith@dentalcare.com',
            phone: '(555) 019-2234',
            dotClass: 'dot1',
        },
        {
            specialty: 'Periodontics',
            email: 'contact@janesperio.org',
            phone: '(555) 021-8890',
            dotClass: 'dot2',
        },
    ],
    features: [
        {
            icon: 'shield-check',
            iconClass: 'fsFi1',
            title: 'TRY BEFORE YOU BUY',
            description: 'Risk-free quality assessment of our elite data sets.',
        },
        {
            icon: 'table',
            iconClass: 'fsFi2',
            title: 'AVAILABLE FOR ALL LISTS',
            description: 'Uniform quality across every specialty and region.',
        },
        {
            icon: 'bar-chart-line',
            iconClass: 'fsFi3',
            title: 'CHECK QUALITY & ACCURACY',
            description: 'Real-time verification metrics at your fingertips.',
        },
        {
            icon: 'lightning-charge',
            iconClass: 'fsFi4',
            title: 'INSTANT ACCESS',
            description: 'No delays. Immediate download for verified samples.',
        },
    ],
    cta: {
        href: '#',
        icon: 'bi bi-download',
        text: 'Get free sample today',
    },
    card: {
        accuracyPercent: '99%',
        cardTitle: 'Sample Data Preview - Dentist Contacts',
        recordCount: '12,450+',
        recordLabel: 'verified dentist records',
        complianceText: 'GDPR Compliant',
    },
};

const customDentistListData = {
    header: {
        title: "Build Custom Dentist Lists",
        highlight: "In Minutes",
        subtitle: "Quickly build a tailored list of dental specialists using our advanced filters — perfect for outreach, market research, or product promotion.",
    },
    howItWorks: {
        title: "How It Works",
        steps: [
            { id: 1, title: "Select Filters", desc: "Choose from dental specialty, state, city, ZIP code, credentials, and more.", color: "var(--blue-500)" },
            { id: 2, title: "Apply Segmentation", desc: "Refine your search with precision targeting — cosmetic, pediatric, orthodontics, etc.", color: "var(--teal-500)" },
            { id: 3, title: "Download Instantly", desc: "Get your customized CSV with emails, phones, faxes & NPI numbers.", color: "var(--blue-600)" },
        ],
    },
    features: [
        { title: "Instant Results", desc: "Build and download your custom list in seconds with real-time filtering.", color: "var(--blue-500)", icon: "BsLightning" },
        { title: "Verified Data", desc: "95%+ deliverability rate with multi-source verification and regular updates.", color: "var(--emerald-500)", icon: "BsCheckCircle" },
        { title: "GDPR Compliant", desc: "Fully compliant with GDPR, HIPAA, and CAN-SPAM regulations.", color: "var(--indigo-500)", icon: "BsShieldCheck" },
    ],
    smartFilters: {
        title: "Smart Filters",
        items: [
            { title: "Location", desc: "State, city, ZIP code, radius targeting", color: "var(--blue-500)", bg: "var(--blue-100)", icon: "BsGeoAlt" },
            { title: "Specialty", desc: "Cosmetic, pediatric, orthodontics & more", color: "var(--teal-500)", bg: "var(--teal-100)", icon: "BsHeartPulse" },
            { title: "Credentials", desc: "License, NPI number, DDS/DMD degree", color: "var(--indigo-500)", bg: "var(--indigo-100)", icon: "BsPersonVcard" },
            { title: "Practice Size", desc: "Solo, group, hospital, clinic size", color: "var(--amber-500)", bg: "var(--amber-100)", icon: "BsBuilding" },
        ],
    },
};

const dentalSpecialtyListData = {
    pageContent: {
        sectionTitle: "Explore <span class='shifting-accent'>Dental Specialty</span> Lists",
        sectionSubtitle: "Select a specialty to view available contacts and build your targeted marketing campaign.",
        ctaTitle: "Need a Custom Dental Contact List?",
        ctaDescription: "Filter by location, specialty, experience level, and more. Build your perfect targeted list in minutes.",
        ctaButtonText: "Explore All Specialties",
    },
    specialtyCards: [
        { 
            id: "1", 
            title: "General Dentistry", 
            description: "Primary dental care providers including family dentists and preventive care specialists.",
            icon: "BsPersonBadge", 
            iconColor: "blue" as const,
            contactCount: "45,230 contacts", 
            verificationRate: "99% verified" 
        },
        { 
            id: "2", 
            title: "Orthodontics", 
            description: "Specialists in teeth alignment, braces, and corrective jaw procedures.",
            icon: "BsEmojiSmile", 
            iconColor: "indigo" as const,
            contactCount: "12,450 contacts", 
            verificationRate: "98% verified" 
        },
        { 
            id: "3", 
            title: "Oral Surgery", 
            description: "Surgical specialists for extractions, implants, and reconstructive procedures.",
            icon: "BsScissors", 
            iconColor: "teal" as const,
            contactCount: "8,920 contacts", 
            verificationRate: "97% verified" 
        },
        { 
            id: "4", 
            title: "Endodontics", 
            description: "Root canal specialists and experts in saving damaged teeth.",
            icon: "BsCheckCircle", 
            iconColor: "amber" as const,
            contactCount: "6,780 contacts", 
            verificationRate: "98% verified" 
        },
    ],
};

const whyChooseUsData = {
    content: {
        badge: "Why Choose Us",
        title: "Stop Wasting Time on",
        highlight: "Bad Data",
        subtitle: "Join thousands of healthcare marketers who've switched to verified dentist contact data.",
        profile: {
            initials: "DR",
            name: "Dr. Robert Chen",
            specialty: "Orthodontist",
            status: "Verified",
        },
    },
    painPoints: [
        { title: "Bounced Emails", desc: "Outdated email lists cost you money and damage your sender reputation.", icon: "BsEnvelopeXFill", delayClass: "delay100" },
        { title: "Wrong Contacts", desc: "Reaching the wrong decision makers wastes your sales team's time.", icon: "BsPersonXFill", delayClass: "delay200" },
        { title: "Low ROI", desc: "Bad data leads to poor campaign performance and wasted marketing budget.", icon: "BsGraphDownArrow", delayClass: "delay300" },
        { title: "Compliance Issues", desc: "Unverified data puts you at risk of violating GDPR and CAN-SPAM regulations.", icon: "BsShieldX", delayClass: "delay400" },
    ],
    floatingBadges: [
        { title: "99%", subtitle: "Deliverability Rate", icon: "BsEnvelopeFill", positionClass: "topLeft" },
        { title: "45K+", subtitle: "Verified Contacts", icon: "BsPersonVcardFill", positionClass: "bottomRight" },
    ],
    mockupFields: [
        { label: "Email", value: "dr.chen@smileortho.com", icon: "BsEnvelopeFill" },
        { label: "Phone", value: "(555) 123-4567", icon: "BsTelephoneFill" },
        { label: "NPI", value: "1234567890", icon: "BsPersonVcardFill" },
    ],
    mockupActions: [
        { label: "Download", icon: "BsDownload" },
        { label: "Share", icon: "BsSendFill", secondary: true },
    ],
};

const productPriceListData = {
    pageContent: {
        title: "Transparent Pricing",
        description: "Choose the perfect plan for your marketing needs. No hidden fees, no surprises.",
        tableTitle: "Volume Pricing",
        tableSubtitle: "Discounts increase with volume",
        tableHeaders: ["Leads", "Cost Per Lead", "Total Price"],
        tabs: ["Monthly", "Yearly"],
        includedTitle: "What's Included",
        starterOfferTitle: "Starter Offer",
        starterSubtitle: "Perfect for small campaigns",
        starterLeads: "1,000",
        starterLeadsLabel: "verified leads",
        starterPrice: "$99",
        starterDescription: "Get started with our verified dentist contact data",
        starterButtonLabel: "Get Started",
        guaranteeLabel: "30-day money-back guarantee",
        footerBulkPricing: "Contact us for bulk pricing",
    },
    pricingTiers: [
        { leads: "1,000", costPerLead: "$0.099", totalPrice: "$99" },
        { leads: "5,000", costPerLead: "$0.079", totalPrice: "$395", isPopular: true },
        { leads: "10,000", costPerLead: "$0.069", totalPrice: "$690" },
        { leads: "25,000", costPerLead: "$0.059", totalPrice: "$1,475" },
        { leads: "50,000", costPerLead: "$0.049", totalPrice: "$2,450" },
    ],
    includedDataFields: [
        { label: "Email Address" },
        { label: "Phone Number" },
        { label: "Full Name" },
        { label: "Practice Name" },
        { label: "Specialty" },
        { label: "NPI Number" },
        { label: "Location (City, State, ZIP)", fullWidth: true },
        { label: "Website", fullWidth: true },
    ],
    trustBadges: [
        { label: "GDPR Compliant", icon: "BsShieldCheck" },
        { label: "Secure Payment", icon: "BsLock" },
        { label: "Verified Data", icon: "BsPatchCheck" },
    ],
};

const whatsIncludedDetailsData = {
    headerContent: {
        title: "Everything You Need for Successful Outreach",
        description: "Our comprehensive dentist contact lists include all the data fields you need to launch effective marketing campaigns.",
    },
    buildListTitle: "Build List",
    filterSections: [
        {
            label: "State",
            tags: [
                { id: 1, label: "California", removable: true, className: "filterTagState" },
                { id: 2, label: "Texas", removable: true, className: "filterTagState" },
                { id: 3, label: "Florida", removable: true, className: "filterTagState" },
            ],
        },
        {
            label: "Specialty",
            tags: [
                { id: 4, label: "General Dentistry", removable: true, className: "filterTagSpecialty" },
                { id: 5, label: "Orthodontics", removable: true, className: "filterTagSpecialtyPurple" },
            ],
        },
        {
            label: "Practice Type",
            tags: [
                { id: 6, label: "Private Practice", removable: true, className: "filterTagPractice" },
                { id: 7, label: "Group Practice", removable: true, className: "filterTagPractice" },
            ],
        },
    ],
    dentistData: [
        { id: 1, initials: "DS", name: "Dr. Sarah Mitchell", specialty: "Orthodontist — San Francisco, CA", verified: false, avatarClass: "avatarBlue" },
        { id: 2, initials: "RJ", name: "Dr. Robert Johnson", specialty: "General Dentist — Houston, TX", verified: false, avatarClass: "avatarGreen" },
        { id: 3, initials: "LP", name: "Dr. Lisa Patel", specialty: "Oral Surgeon — Miami, FL", verified: true, avatarClass: "avatarPurple" },
    ],
    loadingContent: {
        text: "Loading",
        count: "930,285",
        suffix: "dentist contacts...",
    },
    personalizeTitle: "Personalize List",
    personalizeSections: [
        {
            label: "Location",
            tags: [
                { id: 1, label: "State: California, Texas, Florida", removable: true, className: "pTagBlue" },
                { id: 2, label: "City: San Francisco, Houston", removable: true, className: "pTagBlue" },
                { id: 3, label: "ZIP: 94102, 77001", removable: true, className: "pTagBlue" },
            ],
        },
        {
            label: "Specialty",
            tags: [
                { id: 4, label: "General Dentistry", removable: true, className: "pTagGreen" },
                { id: 5, label: "Orthodontics", removable: true, className: "pTagPurple" },
                { id: 6, label: "Oral Surgery", removable: true, className: "pTagBlue" },
                { id: 7, label: "Endodontics", removable: true, className: "pTagGreen" },
            ],
        },
        {
            label: "Gender",
            tags: [
                { id: 8, label: "Male", removable: true, className: "genderTagMale" },
                { id: 9, label: "Female", removable: true, className: "genderTagFemale" },
            ],
        },
        {
            label: "Association",
            tags: [
                { id: 10, label: "ADA Member", removable: true, className: "associationTag" },
                { id: 11, label: "AAOMS", removable: true, className: "associationTag" },
                { id: 12, label: "AAO Member", removable: true, className: "associationTagPurple" },
            ],
        },
    ],
    verifiedTitle: "Verified & Structured Data",
    dataCards: [
        { id: 1, title: "Full Professional Profile", titleSuffix: "— Includes full name, credentials (suffix, prefix, title), gender, and NPI number.", description: "Complete dentist profiles with all identifying information for precise targeting.", isLast: false },
        { id: 2, title: "Specializations", titleSuffix: "— Primary and secondary specialties with associated specialty codes.", description: "50+ dental specialties covered including general dentistry, orthodontics, oral surgery, and more.", isLast: false },
        { id: 3, title: "Location Intelligence", titleSuffix: "— Practice address, city, state, ZIP code, county, and geographical coordinates.", description: "Precise location data for regional targeting and territory planning.", isLast: false },
        { id: 4, title: "Contact Information", titleSuffix: "— Direct email addresses, phone numbers, fax numbers, and website URLs.", description: "Multiple contact channels with deliverability verification and update timestamps.", isLast: false },
        { id: 5, title: "Practice Insights", titleSuffix: "— Practice size, type, years in operation, and patient volume estimates.", description: "Business intelligence to identify high-value practices and decision makers.", isLast: true },
    ],
    footerStats: [
        "100% Privacy Compliant",
        "CSV & Excel Export",
        "Instant Download",
    ],
};

export const PRODUCT_DETAILS_SEED_OBJECT = {
    freeSample,
    customDentistListData,
    dentalSpecialtyListData,
    whyChooseUsData,
    productPriceListData,
    whatsIncludedDetailsData,
};