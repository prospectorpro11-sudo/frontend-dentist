import { COMMON_URLS } from "@/shared/constant";
import {
    IAboutDentistEmailListSeed,
    IComparisonTableSeed,
    ICrmIntegrationSeed,
    ICustomDentistListSeed,
    IDataBeneficiariesSeed,
    IDentalSpecialtySeed,
    IFaq,
    IFreeSample,
    IProductPriceListSeed,
    IVerifiedSourceSeed,
    IWhatsIncludedDetailsSeed,
    IWhyChooseUsSeed,
} from "../shared/interface";

const freeSample: IFreeSample = {
    heading: 'Get your',
    headingAccent: 'sample access',
    subtitle:
        'Gain exclusive entry to thousands of verified dentist contacts. Our architectural verification process ensures precision that fuels your outreach strategy.',
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
        href: COMMON_URLS.freeSample,
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

const faq: IFaq = {
    stats: [
        { icon: 'bi-lightning-charge-fill', value: '24h', label: 'Response' },
        { icon: 'bi-heart-fill', value: '4.9★', label: 'Rating' },
        { icon: 'bi-people-fill', value: '2k+', label: 'Clients' },
    ],
    columns: [
        [
            {
                question: 'What is included in the Dentist Email List?',
                answer:
                    'Our dentist email list includes verified contact details such as dentist names, email addresses, phone numbers (when available), practice names, and location data - everything you need for targeted outreach.',
            },
            {
                question: 'How accurate is the data?',
                answer:
                    'We use advanced verification methods and regularly update our database to ensure high accuracy and deliverability, though no dataset can guarantee 100% accuracy. Most users see 95%+ deliverability rates.',
            },
            {
                question: 'How often is the database updated?',
                answer:
                    'Our database is continuously refreshed to provide the most up-to-date and relevant dentist contact information. We scan 500+ professional registries and public records daily.',
            },
            {
                question: 'What is the Prospector tool?',
                answer:
                    "The Prospector tool allows you to search, filter, and build targeted dentist lead lists in real time, and export them instantly for outreach campaigns. It's our flagship feature for precision targeting.",
            },
            {
                question: 'Can I filter dentists by location or specialty?',
                answer:
                    'Yes, you can filter dentists by country, state, city, and specialties such as orthodontists or pediatric dentists. Our advanced filters let you drill down to your exact target audience.',
            },
        ],
        [
            {
                question: 'Is this data compliant with regulations?',
                answer:
                    'We follow standard data sourcing practices and recommend users comply with regulations like GDPR and CAN-SPAM when using the data. All sourcing is fully transparent and auditable.',
            },
            {
                question: 'Can I export the email list?',
                answer:
                    'Yes, you can export selected leads in formats like CSV for use in CRMs or email marketing platforms. Instant delivery via secure download is always available.',
            },
            {
                question: 'Who is this product best for?',
                answer:
                    'This product is ideal for B2B marketers, lead generation agencies, SaaS companies, and sales teams targeting dental professionals. Anyone building a dental industry pipeline will benefit.',
            },
            {
                question: 'Do you offer bulk data or custom lists?',
                answer:
                    'Yes, we provide bulk data exports and custom-built dentist lists tailored to your targeting needs. Contact our team for enterprise-level requirements.',
            },
            {
                question: 'How can I improve my outreach results?',
                answer:
                    'To improve results, personalize your emails, segment your audience, avoid spammy messaging, and use the Prospector tool for better targeting. A/B test subject lines and keep messages concise.',
            },
        ],
    ],
};

const whatsIncludedDetails: IWhatsIncludedDetailsSeed = {
    header: {
        title: "What's Included in Our Dentist Email List?",
        description:
            "Designed for outreach, education, and promotional purposes, this list includes verified data that's routinely cleaned and structured for usability.",
    },
    buildListTitle: 'Build List',
    filterSections: [
        {
            label: 'State',
            tags: [
                { id: 1, label: 'California', removable: true, variant: 'filterTagState' },
                { id: 2, label: 'Texas', removable: true, variant: 'filterTagState' },
                { id: 3, label: 'Florida', removable: true, variant: 'filterTagState' },
            ],
        },
        {
            label: 'Specialty',
            tags: [
                { id: 4, label: 'General Dentistry', removable: true, variant: 'filterTagSpecialty' },
                { id: 5, label: 'Orthodontics', removable: true, variant: 'filterTagSpecialtyPurple' },
            ],
        },
        {
            label: 'Practice Type',
            tags: [
                { id: 6, label: 'Private Practice', removable: true, variant: 'filterTagPractice' },
                { id: 7, label: 'Group Practice', removable: true, variant: 'filterTagPractice' },
            ],
        },
    ],
    dentistData: [
        {
            id: 1,
            initials: 'DS',
            name: 'Dr. Sarah Mitchell',
            specialty: 'Orthodontist · San Francisco, CA',
            verified: false,
            avatarVariant: 'avatarBlue',
        },
        {
            id: 2,
            initials: 'RJ',
            name: 'Dr. Robert Johnson',
            specialty: 'General Dentist · Houston, TX',
            verified: false,
            avatarVariant: 'avatarGreen',
        },
        {
            id: 3,
            initials: 'LP',
            name: 'Dr. Lisa Patel',
            specialty: 'Oral Surgeon · Miami, FL',
            verified: true,
            avatarVariant: 'avatarPurple',
        },
    ],
    loadingContent: {
        text: 'Loading',
        count: '930,285',
        suffix: 'dentist contacts...',
    },
    personalizeTitle: 'Personalize List',
    personalizeSections: [
        {
            label: 'Location',
            tags: [
                { id: 1, label: 'State: California, Texas, Florida', removable: true, variant: 'pTagBlue' },
                { id: 2, label: 'City: San Francisco, Houston', removable: true, variant: 'pTagBlue' },
                { id: 3, label: 'ZIP: 94102, 77001', removable: true, variant: 'pTagBlue' },
            ],
        },
        {
            label: 'Specialty',
            tags: [
                { id: 4, label: 'General Dentistry', removable: true, variant: 'pTagGreen' },
                { id: 5, label: 'Orthodontics', removable: true, variant: 'pTagPurple' },
                { id: 6, label: 'Oral Surgery', removable: true, variant: 'pTagBlue' },
                { id: 7, label: 'Endodontics', removable: true, variant: 'pTagGreen' },
            ],
        },
        {
            label: 'Gender',
            tags: [
                { id: 8, label: 'Male', removable: true, variant: 'genderTagMale' },
                { id: 9, label: 'Female', removable: true, variant: 'genderTagFemale' },
            ],
        },
        {
            label: 'Association',
            tags: [
                { id: 10, label: 'ADA Member', removable: true, variant: 'associationTag' },
                { id: 11, label: 'AAOMS', removable: true, variant: 'associationTag' },
                { id: 12, label: 'AAO Member', removable: true, variant: 'associationTagPurple' },
            ],
        },
    ],
    verifiedTitle: 'Verified & Structured Data',
    dataCards: [
        {
            id: 1,
            title: 'Full Professional Profile',
            titleSuffix: '— Includes full name, credentials (suffix, prefix, title), gender, and NPI number.',
            description: 'Complete dentist profiles with all identifying information for precise targeting.',
            isLast: false,
        },
        {
            id: 2,
            title: 'Specializations',
            titleSuffix: '— Primary and secondary specialties with associated specialty codes.',
            description: '50+ dental specialties including orthodontics, oral surgery, endodontics, and more.',
            isLast: false,
        },
        {
            id: 3,
            title: 'Contact Information',
            titleSuffix: '— Verified email, phone, and fax numbers.',
            description: '95%+ email deliverability with validated phone and fax for multi-channel outreach.',
            isLast: false,
        },
        {
            id: 4,
            title: 'Practice Location',
            titleSuffix: '— Full mailing address (Address, City, State, ZIP, County, MSA).',
            description: 'Geo-target your campaigns with complete location data for all practice addresses.',
            isLast: false,
        },
        {
            id: 5,
            title: 'Licensing & Certifications',
            titleSuffix: '— State license details, license number, and any certifications.',
            description: 'Verify compliance and credentials with up-to-date licensing information.',
            isLast: true,
        },
    ],
    footerStats: ['95%+ Deliverability', 'GDPR Compliant', '930K+ Contacts', 'One-Time Purchase'],
};

const productPriceList: IProductPriceListSeed = {
    content: {
        title: 'Allergist & Dentist Contact List Pricing',
        description:
            'Access targeted healthcare contacts through our Prospector Tool with smart filters to ensure outreach precision. Volume discounts applied automatically.',
        tableTitle: 'Pricing Tiers',
        tableSubtitle: 'Select your preferred lead volume',
        tableHeaders: ['Leads', 'Cost / Lead', 'Total Price'],
        tabs: ['All Tiers', 'Popular'],
        includedTitle: 'Included Data Fields',
        starterOfferTitle: 'STARTER OFFER',
        starterSubtitle: 'Start with',
        starterLeads: '250',
        starterLeadsLabel: 'leads for only',
        starterPrice: '$39',
        starterDescription: 'Perfect for testing your outreach campaign before scaling up.',
        starterButtonLabel: 'Customize this List',
        guaranteeLabel: '100% data accuracy guarantee',
        footerBulkPricing: 'Bulk pricing on prospector',
    },
    pricingTiers: [
        { leads: '66', costPerLead: '$0.06', totalPrice: '$3.96' },
        { leads: '100', costPerLead: '$0.05', totalPrice: '$5.00' },
        { leads: '500', costPerLead: '$0.035', totalPrice: '$17.50' },
        { leads: '1,000', costPerLead: '$0.03', totalPrice: '$30.00' },
        { leads: '2,500', costPerLead: '$0.025', totalPrice: '$62.50', isPopular: true },
        { leads: '5,000', costPerLead: '$0.02', totalPrice: '$100.00' },
        { leads: '10,000', costPerLead: '$0.015', totalPrice: '$150.00' },
        { leads: '15,000', costPerLead: '$0.014', totalPrice: '$210.00' },
        { leads: '20,000', costPerLead: '$0.013', totalPrice: '$260.00' },
        { leads: '25,000', costPerLead: '$0.0125', totalPrice: '$312.50' },
        { leads: '50,000', costPerLead: '$0.01', totalPrice: '$500.00' },
        { leads: '100,000', costPerLead: '$0.008', totalPrice: '$800.00' },
    ],
    includedDataFields: [
        { label: 'Full Name + Credentials' },
        { label: 'Verified Emails' },
        { label: 'NPI & License' },
        { label: 'Phone & Fax Numbers' },
        { label: 'Mailing Addresses' },
        { label: 'State, ZIP, City' },
        { label: 'Specialty, License State, Graduation Year', fullWidth: true },
    ],
    trustBadges: [
        { label: 'HIPAA Compliant', icon: 'shield-check' },
        { label: 'Secure Data', icon: 'lock' },
        { label: 'Verified Sources', icon: 'patch-check' },
    ],
};

const customDentistList: ICustomDentistListSeed = {
    header: {
        title: 'Build Custom Dentist Lists',
        highlight: 'In Minutes',
        subtitle:
            'Quickly build a tailored list of dental specialists using our advanced filters — perfect for outreach, market research, or product promotion.',
    },
    howItWorks: {
        title: 'How It Works',
        steps: [
            {
                id: 1,
                title: 'Select Filters',
                desc: 'Choose from dental specialty, state, city, ZIP code, credentials, and more.',
                color: 'var(--blue-500)',
            },
            {
                id: 2,
                title: 'Apply Segmentation',
                desc: 'Refine your search with precision targeting — cosmetic, pediatric, orthodontics, etc.',
                color: 'var(--teal-500)',
            },
            {
                id: 3,
                title: 'Download Instantly',
                desc: 'Get your customized CSV with emails, phones, faxes & NPI numbers.',
                color: 'var(--blue-600)',
            },
        ],
    },
    features: [
        {
            title: 'Instant Results',
            desc: 'Build and download your custom list in seconds with real-time filtering.',
            color: 'var(--blue-500)',
            icon: 'lightning',
        },
        {
            title: 'Verified Data',
            desc: '95%+ deliverability rate with multi-source verification and regular updates.',
            color: 'var(--emerald-500)',
            icon: 'check-circle',
        },
        {
            title: 'GDPR Compliant',
            desc: 'Fully compliant with GDPR, HIPAA, and CAN-SPAM regulations.',
            color: 'var(--indigo-500)',
            icon: 'shield-check',
        },
    ],
    smartFilters: {
        title: 'Smart Filters',
        items: [
            {
                title: 'Location',
                desc: 'State, city, ZIP code, radius targeting',
                color: 'var(--blue-500)',
                bg: 'var(--blue-100)',
                icon: 'geo-alt',
            },
            {
                title: 'Specialty',
                desc: 'Cosmetic, pediatric, orthodontics & more',
                color: 'var(--teal-500)',
                bg: 'var(--teal-100)',
                icon: 'heart-pulse',
            },
            {
                title: 'Credentials',
                desc: 'License, NPI number, DDS/DMD degree',
                color: 'var(--indigo-500)',
                bg: 'var(--indigo-100)',
                icon: 'person-vcard',
            },
            {
                title: 'Practice Size',
                desc: 'Solo, group, hospital, clinic size',
                color: 'var(--amber-500)',
                bg: 'var(--amber-100)',
                icon: 'building',
            },
        ],
    },
};

const whyChooseUs: IWhyChooseUsSeed = {
    content: {
        badge: 'The Problem',
        title: 'Why Other List Providers',
        highlight: 'Fall Short',
        subtitle:
            'Most email list providers leave you stranded with outdated data, no support, and zero guarantees.',
        profile: {
            initials: 'DR',
            name: 'Dr. Sarah Mitchell',
            specialty: 'Cosmetic Dentistry • San Francisco, CA',
            status: 'Invalid',
        },
    },
    painPoints: [
        {
            title: 'No Delivery Guarantee',
            desc: "You're stuck if your messages bounce — no backup, no replacements, no recourse.",
            icon: 'envelope-x',
            delayClass: 'fadeInDelay1',
        },
        {
            title: 'No Sending Support',
            desc: 'You have to manage all outreach on your own with zero guidance or assistance.',
            icon: 'person-x',
            delayClass: 'fadeInDelay2',
        },
        {
            title: 'High Bounce Rates',
            desc: 'Risk of blacklisting and poor sender reputation that damages your campaigns long-term.',
            icon: 'graph-down',
            delayClass: 'fadeInDelay3',
        },
        {
            title: 'No Refunds',
            desc: "Bad data? You're out of luck — most providers offer zero refund or replacement options.",
            icon: 'cash',
            delayClass: 'fadeInDelay4',
        },
    ],
    floatingBadges: [
        { title: 'Not Sending', subtitle: 'Delivery failed', icon: 'send-x', positionClass: 'badge1', desc: '' },
        { title: 'High Bounce Rate', subtitle: '42% bounced', icon: 'warning', positionClass: 'badge2', desc: '' },
        { title: 'No Refund', subtitle: 'Request denied', icon: 'x-circle', positionClass: 'badge3', desc: '' },
        { title: 'Not Verified', subtitle: 'Data outdated', icon: 'shield-x', positionClass: 'badge4', desc: '' },
    ],
    mockupFields: [
        { label: 'Email Address', value: 'sm***@oldclinic.com', icon: 'envelope', masked: true },
        { label: 'Phone Number', value: '(415) ***-**89', icon: 'telephone', masked: true },
        { label: 'NPI Number', value: '1234567890', icon: 'vcard' },
        { label: 'Last Verified', value: '18 months ago', icon: 'calendar', danger: true },
    ],
    mockupActions: [
        { label: 'Send Email', icon: 'send' },
        { label: 'Export', icon: 'download', secondary: true },
    ],
};

const dentalSpecialtyList: IDentalSpecialtySeed = {
    content: {
        sectionTitle: 'Explore Dental Specialty',
        sectionTitleAccent: 'Lists',
        sectionSubtitle:
            'Select a specialty to view available contacts and build your targeted marketing campaign.',
        ctaTitle: 'Need a Custom Dental Contact List?',
        ctaDescription:
            'Filter by location, specialty, experience level, and more. Build your perfect targeted list in minutes.',
        ctaButtonText: 'Explore All Dental Lists',
    },
    specialtyCards: [
        {
            id: 'dental-surgeon',
            title: 'Dental Surgeon',
            description: 'Surgical procedures and oral surgery specialists',
            icon: 'person-badge',
            iconColor: 'blue',
            contactCount: '45,320 contacts',
            verificationRate: '98% verified',
        },
        {
            id: 'oral-surgeon',
            title: 'Oral Surgeon',
            description: 'Advanced oral and maxillofacial surgery experts',
            icon: 'scissors',
            iconColor: 'teal',
            contactCount: '38,750 contacts',
            verificationRate: '97% verified',
        },
        {
            id: 'general-dentist',
            title: 'General Dentist',
            description: 'Primary dental care and routine checkup providers',
            icon: 'check-circle',
            iconColor: 'indigo',
            contactCount: '52,180 contacts',
            verificationRate: '99% verified',
        },
        {
            id: 'pediatric-dentist',
            title: 'Pediatric Dentist',
            description: 'Children and adolescent dental care specialists',
            icon: 'emoji-smile',
            iconColor: 'amber',
            contactCount: '28,940 contacts',
            verificationRate: '96% verified',
        },
    ],
};

const crmIntegration: ICrmIntegrationSeed = {
    left: {
        chips: ['Export', 'Import', 'Launch'],
        headerTitle: 'Dentist Email List',
        headerSubtitle: '930K+ verified contacts',
        dataPanelTitle: 'Contacts',
        contacts: [
            { initials: 'JE', name: 'Dr. Evans', color: 'blue' },
            { initials: 'CM', name: 'Dr. Martinez', color: 'teal' },
            { initials: 'EW', name: 'Dr. Wilson', color: 'indigo' },
        ],
        csvText: 'CSV',
        integrationPanelTitle: 'Platforms',
        platforms: [
            { name: 'Salesforce', icon: 'cloud', color: 'sf' },
            { name: 'HubSpot', icon: 'diagram', color: 'hub' },
            { name: 'Mailchimp', icon: 'envelope-heart', color: 'mc' },
        ],
        featuresFooter: ['Export', 'Import', 'Launch'],
    },
    right: {
        title: 'Effortless CRM Integration for',
        titleAccent: 'Dental Professionals',
        description1:
            'Our medical email lists are available in CSV format, making them seamlessly compatible with top healthcare CRMs like Salesforce Health Cloud, HubSpot, and email marketing platforms such as Mailchimp.',
        description2:
            'Streamline your physician outreach, automate follow-ups, and optimize engagement with a hassle-free integration process.',
        buttonText: 'Discover More',
    },
};

const verifiedSource: IVerifiedSourceSeed = {
    content: {
        badge: 'VERIFIED & TRUSTED',
        title: 'Verified Sources of',
        titleAccent: 'Dental Data',
        subtitle:
            'Every contact in our database is sourced from authoritative, verified channels to ensure maximum accuracy and compliance.',
        sourcesListTitle: 'Our Verified Data Sources',
        ctaText: 'Learn More About Our Data Sources',
        diagramLabel: 'Sources of Dental Data',
    },
    sourceNodes: [
        { iconClass: 'bi bi-database', label: 'Public Directories', color: 'blue' },
        { iconClass: 'bi bi-people', label: 'Associations', color: 'teal' },
        { iconClass: 'bi bi-calendar-event', label: 'Conferences', color: 'indigo' },
        { iconClass: 'bi bi-award', label: 'Licensing Boards', color: 'amber' },
        { iconClass: 'bi bi-hospital', label: 'Clinic Records', color: 'emerald' },
        { iconClass: 'bi bi-journal-text', label: 'Publications', color: 'blue' },
        { iconClass: 'bi bi-envelope-check', label: 'Opt-in Data', color: 'teal' },
        { iconClass: 'bi bi-mortarboard', label: 'Academic', color: 'indigo' },
    ],
    verifiedDataSources: [
        { label: 'Public Dental Directories', color: 'blue' },
        { label: 'Dental Professional Associations', color: 'teal' },
        { label: 'Industry Conferences & Events', color: 'indigo' },
        { label: 'Dental Licensing Boards', color: 'emerald' },
        { label: 'Dental Trade Publications', color: 'amber' },
        { label: 'Hospital & Clinic Records', color: 'blue' },
        { label: 'Opt-in Subscriptions', color: 'teal' },
        { label: 'Research & Academic Institutions', color: 'indigo' },
        { label: 'Government Health Organizations', color: 'emerald' },
        { label: 'Accredited Certification Boards', color: 'amber' },
    ],
};

const dataBeneficiaries: IDataBeneficiariesSeed = {
    content: {
        title: 'Who Can',
        titleAccent: 'Benefit',
        titleSuffix: 'from this Data?',
        subtitle: 'Verified dentist contacts for targeted outreach',
        dataHubText: '930K+ Dentist Contacts',
    },
    nodes: [
        { iconClass: 'bi bi-megaphone', label: 'Healthcare Marketers', color: 'blue', positionClass: 'node1' },
        { iconClass: 'bi bi-briefcase', label: 'Recruiters & Staffing', color: 'teal', positionClass: 'node2' },
        { iconClass: 'bi bi-tools', label: 'Device Suppliers', color: 'indigo', positionClass: 'node3' },
        { iconClass: 'bi bi-capsule', label: 'Pharma Companies', color: 'amber', positionClass: 'node4' },
        { iconClass: 'bi bi-mortarboard', label: 'CME Providers', color: 'emerald', positionClass: 'node5' },
        { iconClass: 'bi bi-clipboard2-pulse', label: 'Clinical Studies', color: 'rose', positionClass: 'node6' },
    ],
};

const comparisonTable: IComparisonTableSeed = {
    content: {
        badge: 'WHY CHOOSE US',
        title: 'Why Dentist Email List',
        titleAccent: 'is the Best Choice?',
        subtitle:
            "We're not just another data provider—we're your end-to-end dental marketing partner with verified, targeted contacts.",
        featuresHeader: 'Features',
        recommendedLabel: 'Recommended',
        oursTitle: 'Dentist Email List',
        oursSubtitle: 'Premium Data',
        othersTitle: 'Others',
        othersSubtitle: 'Generic Providers',
        ctaTitle: 'Ready to Get Started?',
        ctaDescription: 'Join 5,000+ marketers using verified dentist contacts for targeted campaigns.',
        ctaButtonText: 'Build Your Dentist List',
    },
    rows: [
        {
            feature: 'Verified Dentist Contacts (95%+ Accuracy)',
            featureIcon: 'bi bi-shield-check',
            featureColor: 'blue',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'Built with real-time verification',
            otherLabel: 'No',
            otherDetail: 'Often outdated, no verification',
        },
        {
            feature: 'Free Sample Before You Buy',
            featureIcon: 'bi bi-gift',
            featureColor: 'teal',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'Instantly preview the data quality',
            otherLabel: 'No',
            otherDetail: 'No way to check before purchasing',
        },
        {
            feature: 'Email Sending Service',
            featureIcon: 'bi bi-envelope-paper',
            featureColor: 'indigo',
            oursStatus: 'soon',
            oursLabel: 'Coming Soon',
            oursDetail: 'Launch planned for Q2 2026',
            otherLabel: 'No',
            otherDetail: 'You must send emails yourself',
        },
        {
            feature: 'Guaranteed 95% Inbox Delivery',
            featureIcon: 'bi bi-inbox-check',
            featureColor: 'emerald',
            oursStatus: 'soon',
            oursLabel: 'Coming Soon',
            oursDetail: 'Delivery guarantee launching soon',
            otherLabel: 'No',
            otherDetail: 'No responsibility for delivery',
        },
        {
            feature: 'Real-Time Email Verification',
            featureIcon: 'bi bi-stars',
            featureColor: 'amber',
            oursStatus: 'soon',
            oursLabel: 'Coming Soon',
            oursDetail: 'Verification tools launching soon',
            otherLabel: 'No',
        },
        {
            feature: 'Advanced Targeting Filters',
            featureIcon: 'bi bi-funnel',
            featureColor: 'rose',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'State, specialty, license & more',
            otherLabel: 'No',
        },
        {
            feature: 'Instant Download Access',
            featureIcon: 'bi bi-download',
            featureColor: 'blue',
            oursStatus: 'yes',
            oursLabel: 'Yes',
            oursDetail: 'Get your list immediately after purchase',
            otherLabel: 'No',
            otherDetail: 'Delayed delivery, manual processing',
        },
    ],
};

const aboutDentistEmailList: IAboutDentistEmailListSeed = {
    content: {
        title: 'About Us –',
        titleAccent: 'Who We Are',
        subtitle:
            'Dentist Email List specializes in providing accurate, up-to-date, and compliant dentist contact databases for healthcare marketers, recruiters, and research firms.',
        mockupTitle: 'Dentist Email List',
        mockupSubtitle: 'Verified Contact Database Platform',
        verifyTitle: 'All Categories Verified',
        verifySubtitle: 'Real-time verification & 95%+ deliverability',
        verifyBadge: '95%+',
        ctaButtonText: 'Learn More About Us',
    },
    trustCards: [
        {
            iconClass: 'bi bi-building',
            title: 'Trusted by Industry Leaders',
            description:
                'From startups to Fortune 500 companies, thousands trust our verified dentist data for their marketing campaigns.',
            color: 'blue',
        },
        {
            iconClass: 'bi bi-headset',
            title: '24/7 Customer Support',
            description:
                'Our dedicated team provides expert guidance and assistance to ensure your campaign success at every step.',
            color: 'teal',
        },
        {
            iconClass: 'bi bi-arrow-repeat',
            title: 'Continuous Data Updates',
            description:
                'We continuously verify and update our database to ensure maximum deliverability and data accuracy above 95%.',
            color: 'indigo',
        },
    ],
    statCards: [
        {
            iconClass: 'bi bi-envelope-check-fill',
            value: '95%+',
            label: 'Deliverability',
            color: 'blue',
            positionClass: 'card1',
        },
        {
            iconClass: 'bi bi-shield-lock-fill',
            value: '100%',
            label: 'GDPR Ready',
            color: 'emerald',
            positionClass: 'card2',
        },
        {
            iconClass: 'bi bi-patch-check-fill',
            value: '930K+',
            label: 'Verified',
            color: 'teal',
            positionClass: 'card3',
        },
        {
            iconClass: 'bi bi-arrow-repeat',
            value: 'Daily',
            label: 'Updates',
            color: 'indigo',
            positionClass: 'card4',
        },
    ],
    categories: [
        { name: 'General Dentists', color: 'blue' },
        { name: 'Orthodontists', color: 'teal' },
        { name: 'Pediatric Dentists', color: 'indigo' },
        { name: 'Oral Surgeons', color: 'amber' },
        { name: 'Endodontists', color: 'emerald' },
        { name: 'Periodontists', color: 'rose' },
    ],
};

export const PRODUCT_DETAILS_SEED_OBJECT = {
    freeSample,
    faq,
    whatsIncludedDetails,
    productPriceList,
    customDentistList,
    whyChooseUs,
    dentalSpecialtyList,
    crmIntegration,
    verifiedSource,
    dataBeneficiaries,
    comparisonTable,
    aboutDentistEmailList,
};
