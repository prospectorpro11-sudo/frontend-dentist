import styles from "./whatsIncludedDetails.module.scss";
import classnames from "classnames";

interface FilterSectionData {
    label: string;
    tags: { id: number; label: string; removable: boolean; className: string }[];
}

interface DentistData {
    id: number;
    initials: string;
    name: string;
    specialty: string;
    verified: boolean;
    avatarClass: string;
}

interface PersonalizeSectionData {
    label: string;
    tags: { id: number; label: string; removable: boolean; className: string }[];
}

interface DataCardData {
    id: number;
    title: string;
    titleSuffix: string;
    description: string;
    isLast: boolean;
}

const headerContent = {
    title: "What's Included in Our Dentist Email List?",
    description: "Designed for outreach, education, and promotional purposes, this list includes verified data that's routinely cleaned and structured for usability.",
};

const buildListTitle = 'Build List';

const filterSections: FilterSectionData[] = [
    {
        label: 'State',
        tags: [
            { id: 1, label: 'California', removable: true, className: styles.filterTagState },
            { id: 2, label: 'Texas', removable: true, className: styles.filterTagState },
            { id: 3, label: 'Florida', removable: true, className: styles.filterTagState },
        ],
    },
    {
        label: 'Specialty',
        tags: [
            { id: 4, label: 'General Dentistry', removable: true, className: styles.filterTagSpecialty },
            { id: 5, label: 'Orthodontics', removable: true, className: styles.filterTagSpecialtyPurple },
        ],
    },
    {
        label: 'Practice Type',
        tags: [
            { id: 6, label: 'Private Practice', removable: true, className: styles.filterTagPractice },
            { id: 7, label: 'Group Practice', removable: true, className: styles.filterTagPractice },
        ],
    },
];

const dentistData: DentistData[] = [
    {
        id: 1,
        initials: 'DS',
        name: 'Dr. Sarah Mitchell',
        specialty: 'Orthodontist · San Francisco, CA',
        verified: false,
        avatarClass: styles.avatarBlue,
    },
    {
        id: 2,
        initials: 'RJ',
        name: 'Dr. Robert Johnson',
        specialty: 'General Dentist · Houston, TX',
        verified: false,
        avatarClass: styles.avatarGreen,
    },
    {
        id: 3,
        initials: 'LP',
        name: 'Dr. Lisa Patel',
        specialty: 'Oral Surgeon · Miami, FL',
        verified: true,
        avatarClass: styles.avatarPurple,
    },
];

const loadingContent = {
    text: 'Loading',
    count: '930,285',
    suffix: 'dentist contacts...',
};

const personalizeTitle = 'Personalize List';

const personalizeSections: PersonalizeSectionData[] = [
    {
        label: 'Location',
        tags: [
            { id: 1, label: 'State: California, Texas, Florida', removable: true, className: styles.pTagBlue },
            { id: 2, label: 'City: San Francisco, Houston', removable: true, className: styles.pTagBlue },
            { id: 3, label: 'ZIP: 94102, 77001', removable: true, className: styles.pTagBlue },
        ],
    },
    {
        label: 'Specialty',
        tags: [
            { id: 4, label: 'General Dentistry', removable: true, className: styles.pTagGreen },
            { id: 5, label: 'Orthodontics', removable: true, className: styles.pTagPurple },
            { id: 6, label: 'Oral Surgery', removable: true, className: styles.pTagBlue },
            { id: 7, label: 'Endodontics', removable: true, className: styles.pTagGreen },
        ],
    },
    {
        label: 'Gender',
        tags: [
            { id: 8, label: 'Male', removable: true, className: styles.genderTagMale },
            { id: 9, label: 'Female', removable: true, className: styles.genderTagFemale },
        ],
    },
    {
        label: 'Association',
        tags: [
            { id: 10, label: 'ADA Member', removable: true, className: styles.associationTag },
            { id: 11, label: 'AAOMS', removable: true, className: styles.associationTag },
            { id: 12, label: 'AAO Member', removable: true, className: styles.associationTagPurple },
        ],
    },
];

const verifiedTitle = 'Verified & Structured Data';

const dataCards: DataCardData[] = [
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
];

const footerStats: string[] = [
    '95%+ Deliverability',
    'GDPR Compliant',
    '930K+ Contacts',
    'One-Time Purchase',
];
const WhatsIncludedDetails = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.headerSection}>
                        <h1 className={styles.headerTitle}>
                            {headerContent.title}
                        </h1>
                        <p className={styles.headerDescription}>
                            {headerContent.description}
                        </p>
                    </div>

                    <div className={styles.mainContent}>
                        <div className={styles.leftPanel}>
                            <div className={styles.buildListCard}>
                                <h3 className={styles.buildListTitle}>{buildListTitle}</h3>

                                {filterSections.map(function (section) {
                                    return (
                                        <div className={styles.filterSection} key={section.label}>
                                            <div className={styles.filterLabel}>{section.label}</div>
                                            <div className={styles.filterTags}>
                                                {section.tags.map(function (tag) {
                                                    return (
                                                        <span
                                                            className={classnames(styles.filterTag, tag.className)}
                                                            key={tag.id}
                                                        >
                                                            {tag.label}{' '}
                                                            {tag.removable && (
                                                                <span className={styles.tagClose}>✕</span>
                                                            )}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className={styles.dentistList}>
                                    {dentistData.map(function (dentist) {
                                        return (
                                            <div className={styles.dentistCard} key={dentist.id}>
                                                <div className={classnames(styles.dentistAvatar, dentist.avatarClass)}>
                                                    {dentist.initials}
                                                </div>
                                                <div className={styles.dentistInfo}>
                                                    <div className={styles.dentistName}>{dentist.name}</div>
                                                    <div className={styles.dentistSpecialty}>
                                                        {dentist.specialty}
                                                    </div>
                                                </div>
                                                {dentist.verified && (
                                                    <span className={styles.verifiedBadge}>Verified</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.loadingSection}>
                                    <div className={styles.loadingSpinner} />
                                    <span className={styles.loadingText}>
                                        {loadingContent.text}{' '}
                                        <span className={styles.loadingTextBold}>{loadingContent.count}</span>{' '}
                                        {loadingContent.suffix}
                                    </span>
                                </div>
                                <div className={styles.loadingBar}>
                                    <div className={styles.loadingBarFill} />
                                </div>
                            </div>

                            <div className={styles.personalizePanel}>
                                <h4 className={styles.personalizeTitle}>{personalizeTitle}</h4>

                                {personalizeSections.map(function (section) {
                                    return (
                                        <div className={styles.personalizeSection} key={section.label}>
                                            <div className={styles.personalizeLabel}>{section.label}</div>
                                            <div className={styles.personalizeTags}>
                                                {section.tags.map(function (tag) {
                                                    return (
                                                        <span
                                                            className={classnames(styles.personalizeTag, tag.className)}
                                                            key={tag.id}
                                                        >
                                                            {tag.label}{' '}
                                                            {tag.removable && (
                                                                <span className={styles.pTagClose}>✕</span>
                                                            )}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.rightPanel}>
                            <h3 className={styles.verifiedTitle}>{verifiedTitle}</h3>

                            <div className={styles.dataCards}>
                                {dataCards.map(function (card) {
                                    return (
                                        <div
                                            className={classnames(
                                                styles.dataCard,
                                                card.isLast && styles.dataCardLast
                                            )}
                                            key={card.id}
                                        >
                                            <div className={styles.dataIcon}>
                                                <div className={styles.dataIconDot} />
                                            </div>
                                            <div className={styles.dataContent}>
                                                <div className={styles.dataCardTitle}>
                                                    {card.title}{' '}
                                                    <span className={styles.dataCardTitleSpan}>
                                                        {card.titleSuffix}
                                                    </span>
                                                </div>
                                                <div className={styles.dataCardDesc}>
                                                    {card.description}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.footerStats}>
                                {footerStats.map(function (stat, index) {
                                    return (
                                        <span className={styles.footerStat} key={index}>
                                            {stat}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhatsIncludedDetails;