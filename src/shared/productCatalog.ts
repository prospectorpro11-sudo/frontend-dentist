import states from "@/seeds/states.json";

const numberFormatter = new Intl.NumberFormat("en-US");

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const formatNumber = (value: number) => numberFormatter.format(value);

type SeedState = {
  id: string;
  label: string;
  value: string;
};

export type ProductStats = {
  totalContacts: number;
  verifiedEmails: number;
  directPhones: number;
  facilityCount: number;
};

export type ProductCatalogItem = {
  stateId: string;
  stateCode: string;
  stateName: string;
  slug: string;
  productName: string;
  shortDescription: string;
  detailIntro: string;
  idealFor: string[];
  includedFields: string[];
  qualityNotes: string[];
  stats: ProductStats;
};

const stateSeed = states as SeedState[];

export const productCatalog: ProductCatalogItem[] = stateSeed.map(
  (state, index) => {
    const totalContacts = 8400 + index * 235;
    const verifiedEmails = Math.round(totalContacts * 0.76);
    const directPhones = Math.round(totalContacts * 0.47);
    const facilityCount = 210 + index * 8;
    const productName = `${state.label} Nurse Email List`;
    const slug = `${toSlug(state.label)}-nurse-email-list`;

    return {
      stateId: state.id,
      stateCode: state.value,
      stateName: state.label,
      slug,
      productName,
      shortDescription: `Sample ${state.label} contact product with segmented nursing records for healthcare campaigns, recruiting, and B2B outreach.`,
      detailIntro: `This sample product page highlights how a ${state.label}-focused nursing contact list can be presented with clear statistics, buyer intent context, and conversion-ready content blocks.`,
      idealFor: [
        "Healthcare recruiters hiring regionally",
        "Continuing education enrollment campaigns",
        "B2B healthcare software outreach",
        "Medical event and webinar promotion",
      ],
      includedFields: [
        "Nurse full name",
        "Professional email address",
        "Practice state and city",
        "Facility name",
        "Specialty category",
        "License type",
        "NPI where available",
      ],
      qualityNotes: [
        "Sample dataset description text only",
        "Record counts shown as sample values",
        "Content blocks designed for SEO readability",
      ],
      stats: {
        totalContacts,
        verifiedEmails,
        directPhones,
        facilityCount,
      },
    };
  },
);

export const productCatalogSummary = {
  totalProducts: productCatalog.length,
  totalContacts: productCatalog.reduce(
    (sum, product) => sum + product.stats.totalContacts,
    0,
  ),
  totalVerifiedEmails: productCatalog.reduce(
    (sum, product) => sum + product.stats.verifiedEmails,
    0,
  ),
  averageFacilities: Math.round(
    productCatalog.reduce(
      (sum, product) => sum + product.stats.facilityCount,
      0,
    ) / productCatalog.length,
  ),
};

export const getProductBySlug = (slug: string) =>
  productCatalog.find((product) => product.slug === slug);

export const productSlugParams = productCatalog.map((product) => ({
  slug: product.slug,
}));

export const getDisplayStats = (stats: ProductStats) => [
  { label: "Total Contacts", value: formatNumber(stats.totalContacts) },
  { label: "Verified Emails", value: formatNumber(stats.verifiedEmails) },
  { label: "Direct Phones", value: formatNumber(stats.directPhones) },
  { label: "Facilities", value: formatNumber(stats.facilityCount) },
];

export const formatCatalogNumber = formatNumber;
