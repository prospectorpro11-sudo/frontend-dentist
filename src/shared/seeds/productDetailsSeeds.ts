import { IFaq, IFreeSample } from "../interface";

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

export const PRODUCT_DETAILS_SEED_OBJECT = {
    freeSample,
    faq
};
