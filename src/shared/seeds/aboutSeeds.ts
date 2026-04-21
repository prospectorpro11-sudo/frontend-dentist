import { IDataBeneficiariesSeed } from "../interface";

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
export const ABOUT_SEED_OBJECT = {
    dataBeneficiaries,
};
