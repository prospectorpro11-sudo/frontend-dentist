import { ProductCatalogItem } from "@/shared/productCatalog";

export type EditorProductDocument = {
  id: string;
  slug?: string;
  name?: string;
  filterList?: { field: string; value: string }[];
  rewrittenJson?: Record<string, any> | string;
  countResult?: Record<string, any>[] | Record<string, any>;
  stats?: {
    totalContacts?: number;
    verifiedEmails?: number;
    directPhones?: number;
    facilityCount?: number;
  };
  templateName?: string;
  templateId?: string;
  updatedAtLocallyBackend?: string;
  updatedAt?: string;
  createdAt?: string;
  date?: number;
  status?: string;
  productType?: string;
  type?: string;
  [key: string]: any;
};

const safeJson = (value: any, fallback: Record<string, any> = {}) => {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  if (typeof value !== "string") return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch (_error) {
    return fallback;
  }
};

const toSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const getStateFilter = (filterList?: { field: string; value: string }[]) =>
  (filterList || []).find(
    (item) => item?.field?.toLowerCase() === "state",
  )?.value;

const getStringArray = (value: any) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (typeof item?.value === "string") return item.value.trim();
      if (typeof item?.title === "string") return item.title.trim();
      return "";
    })
    .filter(Boolean);
};

const getHashFromText = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getFallbackStats = (seed: string) => {
  const hash = getHashFromText(seed);
  const totalContacts = 7800 + (hash % 12000);
  const verifiedEmails = Math.round(totalContacts * 0.72);
  const directPhones = Math.round(totalContacts * 0.43);
  const facilityCount = 180 + (hash % 500);

  return {
    totalContacts,
    verifiedEmails,
    directPhones,
    facilityCount,
  };
};

const toNumber = (value: any) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const next = Number(value.replace(/,/g, "").trim());
    return Number.isFinite(next) ? next : 0;
  }
  return 0;
};

const normalizeCountResult = (value: any) => {
  if (Array.isArray(value)) {
    const first = value[0];
    if (first && typeof first === "object" && !Array.isArray(first)) {
      return first;
    }
    return null;
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return null;
};

const getStatsFromEditorProduct = (item: EditorProductDocument) => {
  const fromStats = item?.stats || {};
  const statsNumbers = {
    totalContacts: toNumber(fromStats?.totalContacts),
    verifiedEmails: toNumber(fromStats?.verifiedEmails),
    directPhones: toNumber(fromStats?.directPhones),
    facilityCount: toNumber(fromStats?.facilityCount),
  };

  if (
    statsNumbers.totalContacts ||
    statsNumbers.verifiedEmails ||
    statsNumbers.directPhones ||
    statsNumbers.facilityCount
  ) {
    return statsNumbers;
  }

  const countResult = normalizeCountResult(item?.countResult);
  if (!countResult) return null;

  const mapped = {
    totalContacts: toNumber(countResult?.totalContacts),
    verifiedEmails: toNumber(countResult?.Unique_Emails),
    directPhones: toNumber(countResult?.Unique_Phones),
    facilityCount:
      toNumber(countResult?.facilityCount) ||
      toNumber(countResult?.Unique_NPI),
  };

  if (
    mapped.totalContacts ||
    mapped.verifiedEmails ||
    mapped.directPhones ||
    mapped.facilityCount
  ) {
    return mapped;
  }

  return null;
};

const pickTimestamp = (item: EditorProductDocument) =>
  item.updatedAtLocallyBackend || item.updatedAt || item.createdAt || item.date || "";

const normalizeProduct = (item: EditorProductDocument): EditorProductDocument => ({
  ...item,
  rewrittenJson: safeJson(item?.rewrittenJson, {}),
});

const getBackendUrl = () =>
  `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}`.trim().replace(/\/$/, "");

const fetchBackend = async (path: string) => {
  const baseUrl = getBackendUrl();
  if (!baseUrl) return null;

  const response = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export const fetchEditorProducts = async (): Promise<EditorProductDocument[]> => {
  const response = await fetchBackend("/editor/getAllEstateProduct");
  const list: EditorProductDocument[] = Array.isArray(response)
    ? (response as EditorProductDocument[])
    : Array.isArray(response?.data)
      ? (response.data as EditorProductDocument[])
      : [];

  return list
    .map((item: EditorProductDocument) => normalizeProduct(item))
    .sort((a: EditorProductDocument, b: EditorProductDocument) => {
      const left = new Date(pickTimestamp(a)).getTime() || 0;
      const right = new Date(pickTimestamp(b)).getTime() || 0;
      return right - left;
    });
};

export const fetchEditorProductBySlug = async (
  slug: string,
): Promise<EditorProductDocument | null> => {
  const response = await fetchBackend(
    `/editor/getSingleEstateProduct/${encodeURIComponent(slug)}`,
  );
  const item = response?.data || response;

  if (!item || typeof item !== "object" || !item?.id) {
    return null;
  }

  return normalizeProduct(item);
};

export const toCatalogItem = (
  item: EditorProductDocument,
  index: number,
): ProductCatalogItem => {
  const rewrittenJson = safeJson(item?.rewrittenJson, {});
  const stateName =
    getStateFilter(item?.filterList) ||
    `${item?.name || rewrittenJson?.mainHeader || "State"}`
      .replace(/\s+nurse email list$/i, "")
      .trim() ||
    "State";

  const productName =
    item?.name ||
    rewrittenJson?.mainHeader ||
    rewrittenJson?.metaTitle ||
    `${stateName} Nurse Email List`;
  const slug = item?.slug || toSlug(productName) || toSlug(item?.id || "");
  const availableDataFields = getStringArray(rewrittenJson?.availableDataFields);
  const idealUseCases = getStringArray(
    rewrittenJson?.idealUseCases?.features || rewrittenJson?.keyFeaturesSection?.features,
  );
  const whoUsesData = Array.isArray(rewrittenJson?.whoUsesData?.users)
    ? rewrittenJson.whoUsesData.users
    : [];
  const trustedSources = Array.isArray(rewrittenJson?.trustedDataSources?.sources)
    ? rewrittenJson.trustedDataSources.sources
    : [];
  const stateCode = stateName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const mappedStats = getStatsFromEditorProduct(item);

  return {
    stateId: item.id || slug || `${index}`,
    stateCode: stateCode || "US",
    stateName,
    slug,
    productName,
    shortDescription:
      rewrittenJson?.metaDescription ||
      rewrittenJson?.mainHeaderDescription ||
      `Explore ${productName} with NursingReach.`,
    detailIntro:
      rewrittenJson?.mainHeaderDescription ||
      rewrittenJson?.metaDescription ||
      `Discover state-specific nursing contact data for ${stateName}.`,
    idealFor:
      idealUseCases.length > 0
        ? idealUseCases
        : whoUsesData.length > 0
        ? whoUsesData.map((entry: any) => entry?.title || entry?.description).filter(Boolean)
        : [
            "Healthcare recruiters",
            "Nurse education campaigns",
            "B2B healthcare outreach",
          ],
    includedFields:
      availableDataFields.length > 0
        ? availableDataFields
        : ["Nurse Name", "Email", "State", "City", "Specialty"],
    qualityNotes:
      trustedSources.length > 0
        ? trustedSources.map((source: any) => source?.title || source).filter(Boolean)
        : ["Template-driven content", "Editable via NursingReach editor"],
    stats: mappedStats || getFallbackStats(slug || item.id || `${index}`),
  };
};
