import { ITemplateData } from "@/shared/interface";

export type TemplateFormState = {
  templateName: string;
  productType: string;
  metaTitle: string;
  metaDescription: string;
  mainHeader: string;
  mainHeaderDescription: string;
  bannerBenefitsText: string;
  aboutMarketTitle: string;
  aboutMarketImage: string;
  aboutMarketHighlightsText: string;
  whoUsesDataTitle: string;
  whoUsesDataDescription: string;
  whoUsesDataUsersText: string;
  availableDataFieldsText: string;
  dataFieldsTitle: string;
  dataFieldsDescription: string;
  featuresTitle: string;
  featuresDescription: string;
  featuresText: string;
  sourcesTitle: string;
  sourcesDescription: string;
  sourcesText: string;
  faqTitle: string;
  faqDescription: string;
  faqBadgeText: string;
  faqItemsText: string;
};

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const joinLines = (values: string[] = []) =>
  values
    .map((item) => `${item ?? ""}`.trim())
    .filter(Boolean)
    .join("\n");

const splitPairs = (value: string) =>
  splitLines(value).map((line) => {
    const [first = "", ...rest] = line.split("|");
    return {
      title: first.trim(),
      description: rest.join("|").trim(),
    };
  });

const joinPairs = (items: { title?: string; description?: string }[] = []) =>
  items
    .map((item) => `${(item?.title || "").trim()} | ${(item?.description || "").trim()}`.trim())
    .filter((item) => item !== "|" && item !== "")
    .join("\n");

const normalizeTemplateData = (value: any): ITemplateData => {
  if (!value) return {};
  if (typeof value === "object") return value;
  if (typeof value !== "string") return {};

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_error) {
    return {};
  }
};

export const createEmptyTemplateFormState = (): TemplateFormState => ({
  templateName: "",
  productType: "STATE",
  metaTitle: "",
  metaDescription: "",
  mainHeader: "",
  mainHeaderDescription: "",
  bannerBenefitsText: "",
  aboutMarketTitle: "",
  aboutMarketImage: "",
  aboutMarketHighlightsText: "",
  whoUsesDataTitle: "",
  whoUsesDataDescription: "",
  whoUsesDataUsersText: "",
  availableDataFieldsText: "",
  dataFieldsTitle: "",
  dataFieldsDescription: "",
  featuresTitle: "",
  featuresDescription: "",
  featuresText: "",
  sourcesTitle: "",
  sourcesDescription: "",
  sourcesText: "",
  faqTitle: "",
  faqDescription: "",
  faqBadgeText: "",
  faqItemsText: "",
});

export const toTemplateFormState = (rawTemplate: any): TemplateFormState => {
  const productJsonObject = normalizeTemplateData(rawTemplate?.productJsonObject || rawTemplate || {});
  const state = createEmptyTemplateFormState();
  const fallbackFeatureSection: {
    title?: string;
    description?: string;
    features?: string[];
  } = {};
  const idealUseCasesSection =
    productJsonObject?.idealUseCases || productJsonObject?.keyFeaturesSection || fallbackFeatureSection;

  return {
    ...state,
    templateName:
      rawTemplate?.templateName ||
      productJsonObject?.templateName ||
      "",
    productType:
      productJsonObject?.productType ||
      "STATE",
    metaTitle: productJsonObject?.metaTitle || "",
    metaDescription: productJsonObject?.metaDescription || "",
    mainHeader: productJsonObject?.mainHeader || "",
    mainHeaderDescription: productJsonObject?.mainHeaderDescription || "",
    bannerBenefitsText: joinLines(
      Array.isArray(productJsonObject?.bannerBenefits)
        ? productJsonObject.bannerBenefits
        : [],
    ),
    aboutMarketTitle: productJsonObject?.aboutMarket?.title || "",
    aboutMarketImage: productJsonObject?.aboutMarket?.image || "",
    aboutMarketHighlightsText: joinLines(
      Array.isArray(productJsonObject?.aboutMarket?.highlights)
        ? productJsonObject.aboutMarket.highlights.map((item: any) =>
            typeof item === "string" ? item : item?.text || "",
          )
        : [],
    ),
    whoUsesDataTitle: productJsonObject?.whoUsesData?.title || "",
    whoUsesDataDescription: productJsonObject?.whoUsesData?.description || "",
    whoUsesDataUsersText: joinPairs(
      Array.isArray(productJsonObject?.whoUsesData?.users)
        ? productJsonObject.whoUsesData.users
        : [],
    ),
    availableDataFieldsText: joinLines(
      Array.isArray(productJsonObject?.availableDataFields)
        ? productJsonObject.availableDataFields.map((item: any) => item?.value || item?.label || item || "")
        : [],
    ),
    dataFieldsTitle: productJsonObject?.dataFields?.title || "",
    dataFieldsDescription: productJsonObject?.dataFields?.description || "",
    featuresTitle: idealUseCasesSection?.title || "",
    featuresDescription: idealUseCasesSection?.description || "",
    featuresText: joinLines(
      Array.isArray(idealUseCasesSection?.features)
        ? idealUseCasesSection.features
        : [],
    ),
    sourcesTitle: productJsonObject?.trustedDataSources?.title || "",
    sourcesDescription: productJsonObject?.trustedDataSources?.description || "",
    sourcesText: joinLines(
      Array.isArray(productJsonObject?.trustedDataSources?.sources)
        ? productJsonObject.trustedDataSources.sources.map((source: any) =>
            typeof source === "string"
              ? source
              : source?.title || source?.name || source?.description || "",
          )
        : [],
    ),
    faqTitle: productJsonObject?.faqs?.title || "",
    faqDescription: productJsonObject?.faqs?.description || "",
    faqBadgeText: productJsonObject?.faqs?.badgeText || "",
    faqItemsText: joinPairs(
      Array.isArray(productJsonObject?.faqs?.list)
        ? productJsonObject.faqs.list.map((item: any) => ({
            title: item?.question || item?.title || "",
            description: item?.answer || item?.description || "",
          }))
        : [],
    ),
  };
};

export const buildTemplateJson = (
  formState: TemplateFormState,
): ITemplateData => {
  const availableDataFieldValues = splitLines(formState.availableDataFieldsText);
  const availableDataFields = availableDataFieldValues.map((value, index) => ({
    id: `${index + 1}`,
    value,
  }));
  const features = splitLines(formState.featuresText);
  const bannerBenefits = splitLines(formState.bannerBenefitsText);
  const aboutMarketHighlights = splitLines(formState.aboutMarketHighlightsText);
  const whoUsesDataUsers = splitPairs(formState.whoUsesDataUsersText).filter(
    (item) => item.title || item.description,
  );
  const trustedDataSources = splitLines(formState.sourcesText);
  const faqs = splitPairs(formState.faqItemsText).filter(
    (item) => item.title || item.description,
  );

  return {
    templateName: formState.templateName.trim(),
    productType: formState.productType.trim() || "STATE",
    metaTitle: formState.metaTitle.trim(),
    metaDescription: formState.metaDescription.trim(),
    mainHeader: formState.mainHeader.trim(),
    mainHeaderDescription: formState.mainHeaderDescription.trim(),
    bannerBenefits,
    aboutMarket: {
      title: formState.aboutMarketTitle.trim(),
      image: formState.aboutMarketImage.trim(),
      highlights: aboutMarketHighlights.map((text) => ({ text })),
    },
    whoUsesData: {
      title: formState.whoUsesDataTitle.trim(),
      description: formState.whoUsesDataDescription.trim(),
      users: whoUsesDataUsers,
    },
    availableDataFields,
    dataFields: {
      title: formState.dataFieldsTitle.trim(),
      description: formState.dataFieldsDescription.trim(),
      fields: availableDataFieldValues.join("; "),
    },
    idealUseCases: {
      title: formState.featuresTitle.trim(),
      description: formState.featuresDescription.trim(),
      features,
    },
    trustedDataSources: {
      title: formState.sourcesTitle.trim(),
      description: formState.sourcesDescription.trim(),
      sources: trustedDataSources,
    },
    faqs: {
      title: formState.faqTitle.trim(),
      description: formState.faqDescription.trim(),
      badgeText: formState.faqBadgeText.trim(),
      list: faqs.map((item) => ({
        question: item.title,
        answer: item.description,
      })),
    },
  };
};
