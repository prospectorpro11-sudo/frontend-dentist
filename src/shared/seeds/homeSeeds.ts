import {
    IBeyondEmail,
    IDataDescribe,
    IFaq,
    IFreeSample,
    IHomeBanner,
    IHomeSeeds,
    ILocationSegmentation,
    IProductList,
    IWhatsIncluded
} from '../interface';

const homeBanner: IHomeBanner = {
    liveBadgeText: 'Live Database',
    dateText: 'Jan 01, 2026',
    headingLine1: 'Build Your Targeted',
    headingAccent: 'Dentist Email List',
    description:
        'Get direct access to 930,000+ verified dentist contacts - emails, phones, faxes & licenses - all GDPR compliant, built for precision marketing campaigns.',
    buttons: {
        pricing: { href: '#', text: 'View Pricing', icon: 'currency' },
        sample: { href: '#', text: 'Download Free Sample', icon: 'gift' },
    },
    trustItems: [
        { icon: 'verified', label: 'Verified Contacts', iconClass: 'tsI1' },
        { icon: 'shield', label: 'GDPR Compliant', iconClass: 'tsI2' },
        { icon: 'star', label: '4.9 Rating', iconClass: 'tsI3' },
    ],
    stats: [
        { icon: 'people', value: '930,285', label: 'Total Contacts', iconClass: 'spIc1', highlight: true },
        { icon: 'email', value: '930,285', label: 'Emails', iconClass: 'spIc2' },
        { icon: 'phone', value: '930,285', label: 'Phones', iconClass: 'spIc3' },
        { icon: 'fax', value: '930,285', label: 'Faxes', iconClass: 'spIc4' },
        { icon: 'license', value: '930,285', label: 'Licenses', iconClass: 'spIc5', last: true },
    ],
    chamberPills: [
        { icon: 'geo', value: '95%', label: 'Delivery Rate', className: 'cPillTl', iconClass: 'cpIc1' },
        { icon: 'lock', value: '100%', label: 'GDPR', className: 'cPillTr', iconClass: 'cpIc2' },
        { icon: 'rocket', value: '+500k', label: 'Verified', className: 'cPillBl', iconClass: 'cpIc3' },
    ],
};

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

const productList: IProductList = {
    heading: 'Choose Your',
    headingAccent: 'Dentist Email List',
    subtitle:
        'Purchase targeted dentist email lists by specialty. All lists include verified emails and are ready for marketing.',
    products: [
        {
            category: 'General Dentists',
            description: 'Primary care & routine checkups',
            icon: 'tooth',
            colorClass: 'plCatBlue',
            count: '45,320',
        },
        {
            category: 'Family Dentists',
            description: 'All-ages dental care',
            icon: 'smile',
            colorClass: 'plCatTeal',
            count: '38,750',
        },
        {
            category: 'Pediatric Dentists',
            description: 'Children & adolescent care',
            icon: 'balloon',
            colorClass: 'plCatIndigo',
            count: '22,180',
        },
        {
            category: 'Emergency Dentists',
            description: 'Urgent & after-hours care',
            icon: 'hospital',
            colorClass: 'plCatRose',
            count: '15,430',
        },
        {
            category: 'Orthodontists',
            description: 'Braces & alignment specialists',
            icon: 'teeth',
            colorClass: 'plCatAmber',
            count: '19,870',
        },
        {
            category: 'Oral Surgeons',
            description: 'Surgical & maxillofacial care',
            icon: 'scissors',
            colorClass: 'plCatPurple',
            count: '8,920',
        },
    ],
    trustPills: [
        { icon: 'check', label: 'Verified Emails' },
        { icon: 'filter', label: 'Specialty Filtered' },
        { icon: 'deliverability', label: '95% Deliverability' },
    ],
};

const beyondEmail: IBeyondEmail = {
    sectionInfo: {
        headingLine: 'Go Beyond Just',
        headingAccent: 'Email Address',
        headingAccentClassName: 'shifting-accent',
        sub: 'ClinicalCurator provides deep firmographic insights. Know what practice management software they use, their preferred equipment.',
    },
    steps: [
        {
            number: '01',
            title: 'AI-Driven Sourcing',
            description: 'We scan 500+ professional registries and public records daily.',
        },
        {
            number: '02',
            title: 'Human Verification',
            description: 'Dedicated analysts validate each contact for accuracy and relevance.',
        },
        {
            number: '03',
            title: 'Real-time Cleansing',
            description: 'Continuous hygiene to keep your data fresh and deliverable.',
        },
    ],
    featureCards: [
        {
            id: 'delivery',
            variantClass: 'beFc1',
            icon: 'download',
            titleLine1: 'Instant delivery via',
            titleLine2: 'secure download',
        },
        {
            id: 'mobile',
            variantClass: 'beFc2',
            icon: 'phone',
            titleLine1: 'Mobile-optimized',
            titleLine2: 'data exports',
        },
        {
            id: 'formats',
            variantClass: 'beFc3',
            icon: 'mail',
            titleLine1: 'Multiple format',
            titleLine2: 'support',
        },
        {
            id: 'encrypted',
            variantClass: 'beFc4',
            icon: 'lock',
            titleLine1: 'End-to-end',
            titleLine2: 'encrypted transit',
        },
    ],
};

const whatsIncluded: IWhatsIncluded = {
    checklistItems: [
        { label: 'Full Name' },
        { label: 'Email Address' },
        { label: 'Phone Number' },
        { label: 'Mailing Address' },
        { label: 'License Number' },
        { label: 'Specialty' },
        { label: 'Workplace Information' },
        { label: 'Years of Experience' },
    ],
    tableData: [
        {
            name: 'Dr. Sarah Mitchell',
            initials: 'SM',
            avatarClass: 'wiIa1',
            email: 'sarah.m@dentalcare.com',
            phone: '(555) 012-3456',
        },
        {
            name: 'Dr. James Park',
            initials: 'JP',
            avatarClass: 'wiIa2',
            email: 'jpark@smilepros.org',
            phone: '(555) 034-7890',
        },
        {
            name: 'Dr. Amy Lee',
            initials: 'AL',
            avatarClass: 'wiIa3',
            email: 'alee@brightteeth.net',
            phone: '(555) 056-1234',
        },
        {
            name: 'Dr. Richard Chen',
            initials: 'RC',
            avatarClass: 'wiIa4',
            email: 'rchen@pearldental.com',
            phone: '(555) 078-5678',
        },
        {
            name: 'Dr. Maria King',
            initials: 'MK',
            avatarClass: 'wiIa5',
            email: 'mking@familycare.org',
            phone: '(555) 090-3456',
            fade: true,
        },
    ],
    footerItems: [
        { icon: 'check', label: 'One time payment' },
        { icon: 'download', label: 'Instant delivery via secure download' },
        { icon: 'time', label: 'Update January 2026' },
        { icon: 'customize', label: 'Custom Count Available' },
    ],
    stats: {
        verifiedRecords: '930,285 verified records',
        deliveryRate: { percentage: '95%', label: 'Delivery' },
        contacts: { count: '930k+', label: 'Contacts' },
        gdprCompliant: 'GDPR Compliant',
    },
    content: {
        heading: "What's",
        headingHighlight: 'Included',
        headingSuffix: 'in the Database?',
        subtitle:
            'Get complete and verified dentist contact information for effective, targeted marketing campaigns.',
        ctaText: 'Download Sample Database',
        websiteUrl: 'clinicalcurator.com/database',
    },
};

const dataDescribe: IDataDescribe = {
    topSection: {
        heading: 'Why Marketers Trust Our',
        headingLine2: '<span class="shifting-accent">Dentist Database</span>',
        subtitle:
            'Gain confidence in your marketing campaigns with our comprehensive and reliable dentist email database.',
        ctaText: 'Build Targeted Dentist List',
        ctaHref: '#',
    },
    panelData: [
        {
            heading: 'Fully Verified & Continuously Updated Contacts',
            subtitle:
                'Access a reliable database of contacts that are regularly checked and updated to ensure accuracy and better campaign results.',
            label: 'Our database optimize for:',
            checklist: [
                '95%+ email deliverability',
                'Low bounce rate',
                'Clean, permission-based records',
            ],
            panelVisual: {
                title: '95% Verified',
                accentColor: '#0ea5e9',
            },
        },
        {
            heading: 'Smart Targeting & Advanced Filters',
            subtitle:
                'Target your ideal customers with precision filters that help you reach the right audience at the right time.',
            label: 'Our targeting options include:',
            checklist: [
                'Location-based filtering',
                'Specialty-based targeting',
                'Experience-level filters',
            ],
            panelVisual: {
                title: 'Smart Filters',
                accentColor: '#14b8a6',
            },
        },
        {
            heading: 'High Deliverability & Clean Lists',
            subtitle:
                'Maximize your campaign success with verified emails and phone numbers that reach real professionals.',
            label: 'Our quality guarantees:',
            checklist: [
                'Low bounce rate guaranteed',
                'Clean, verified records',
                'Opt-in verified contacts',
            ],
            panelVisual: {
                title: '95%+ Delivery',
                accentColor: '#0284c7',
            },
        },
        {
            heading: 'Compliance & Data Security',
            subtitle:
                'Your marketing efforts are protected with industry-standard compliance and data security measures.',
            label: 'Our security standards:',
            checklist: [
                'Data encrypted at rest',
                'Consent tracking enabled',
                'Secure cloud storage',
            ],
            panelVisual: {
                title: 'GDPR Ready',
                accentColor: '#4f46e5',
            },
        },
    ],
    featureColumns: [
        {
            icon: 'shield',
            iconClass: 'pdCi1',
            title: 'Verified & Updated Contacts',
            description:
                'Gain confidence in your marketing campaigns with our verified and current data.',
        },
        {
            icon: 'filter',
            iconClass: 'pdCi2',
            title: 'Advanced Targeting Options',
            description:
                'Gain confidence in your marketing campaigns with our precise targeting filters.',
        },
        {
            icon: 'envelope',
            iconClass: 'pdCi3',
            title: 'High Deliverability',
            description: 'Gain confidence in your marketing campaigns with our 95%+ email delivery.',
        },
        {
            icon: 'shieldQuarter',
            iconClass: 'pdCi4',
            title: 'Compliance & Data Security',
            description: 'Gain confidence in your marketing campaigns with full GDPR compliance.',
        },
    ],
};

const locationSegmentation: ILocationSegmentation = {
    content: {
        badge: 'Real-Time Data',
        title: {
            prefix: 'Geo-Targeted',
            highlight: 'Dentist Database',
        },
        description:
            'Every contact pinned on the map. Target by state, city, or radius with surgical precision.',
        mapCard: {
            title: 'United States - Dentist Coverage',
            legend: [
                { label: 'High Density', active: true },
                { label: 'Medium', active: false },
                { label: 'Low', active: false },
            ],
            footer: [
                { icon: 'shield', text: '930K+ verified' },
                { icon: 'geo', text: '50 states', subtext: '25K cities' },
                { icon: 'refresh', text: 'Updated Jan 2026' },
            ],
        },
        features: [
            {
                id: 1,
                icon: 'map',
                badge: 'Most Used',
                title: 'State-Wise Targeting',
                desc: 'Filter any state and pull contacts instantly. From broad regional campaigns to hyper-local outreach.',
                linkText: 'Explore by state',
                linkUrl: '#',
            },
            {
                id: 2,
                icon: 'building',
                badge: 'Precision',
                title: 'City-Level Drill',
                desc: 'Pinpoint dental professionals in any city. 25,000+ cities mapped with real density data.',
                linkText: 'Explore cities',
                linkUrl: '#',
                variant: '2',
            },
            {
                id: 3,
                icon: 'target',
                badge: null,
                title: 'Zip-Code Radius',
                desc: 'Drop a pin and grab every dentist within 5, 10, 25 or custom mile radius. Perfect territory coverage.',
                linkText: 'Try radius search',
                linkUrl: '#',
                variant: '3',
            },
        ],
    },
    mapPoints: [
        {
            coords: [37.75, -119.25],
            dotType: 'state',
            label: 'California',
            card: {
                type: 'state',
                icon: 'bi-map-fill',
                title: 'California',
                count: '45,320',
                breatheType: 'state',
            },
        },
        {
            coords: [38.97, -95.24],
            dotType: 'city',
            label: 'Lawrence',
            card: {
                type: 'city',
                icon: 'bi-building-fill',
                title: 'Lawrence, KS',
                count: '9,520',
                breatheType: 'city',
            },
        },
        {
            coords: [40.75, -73.99],
            dotType: 'zip',
            label: '10001',
            card: {
                type: 'zip',
                icon: 'bi-geo-alt-fill',
                title: '10001',
                count: '1,240',
                breatheType: 'zip',
            },
        },
    ],
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

export const HOME_SEED_OBJECT: IHomeSeeds = {
    homeBanner,
    freeSample,
    productList,
    beyondEmail,
    whatsIncluded,
    dataDescribe,
    locationSegmentation,
    faq,
};
