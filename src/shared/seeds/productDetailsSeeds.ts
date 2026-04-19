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

export const PRODUCT_DETAILS_SEED_OBJECT = {
    freeSample
};
