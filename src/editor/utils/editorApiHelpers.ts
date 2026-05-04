import dayjs from "dayjs";
import { IEditorProduct } from "@/shared/interface";

export interface IEditorTemplateItem {
  id: string;
  templateName: string;
  promptInput?: string;
  productJsonObject?: Record<string, any>;
  raw: any;
}

const getByPath = (obj: any, path: string) => {
  return path
    .split(".")
    .reduce((acc: any, key) => (acc == null ? undefined : acc[key]), obj);
};

const pickFirstNonEmpty = (obj: any, paths: string[], fallback: any = "") => {
  for (const path of paths) {
    const value = getByPath(obj, path);
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return fallback;
};

const getArrayFromResponse = (data: any, keys: string[]) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
    if (Array.isArray(data?.data?.[key])) return data.data[key];
  }

  return [];
};

export const formatEditorDate = (value?: any) => {
  if (!value) return "";
  const date = typeof value === "number" ? dayjs.unix(value) : dayjs(value);
  if (!date.isValid()) return String(value);
  return date.format("DD MMM YYYY / h:mm A");
};

const normalizeType = (value?: string) => {
  const normalized = value?.toString()?.toLowerCase() || "";
  if (normalized.includes("state")) return "State";
  if (normalized.includes("county")) return "County";
  if (normalized.includes("city")) return "City";
  if (normalized.includes("speciality") || normalized.includes("specialty")) return "Speciality";
  return value || "State";
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

export const normalizeEditorProducts = (data: any): IEditorProduct[] => {
  const products = getArrayFromResponse(data, [
    "products",
    "estateProducts",
    "items",
    "list",
  ]);

  return products.map((product: any) => {
    const createdAt =
      product?.updatedAtLocallyBackend ||
      product?.updatedAt ||
      product?.createdAt ||
      product?.date;
    const rewrittenJson =
      product?.rewrittenJson && typeof product.rewrittenJson === "string"
        ? safeJson(product.rewrittenJson, {})
        : product?.rewrittenJson || {};
    const normalizedType = normalizeType(
      rewrittenJson?.productType ||
        product?.productType ||
        product?.type,
    );
    const name =
      product?.name ||
      rewrittenJson?.mainHeader ||
      rewrittenJson?.metaTitle ||
      product?.slug ||
      "Untitled Product";

    const normalizedFilterList = Array.isArray(product?.filterList)
      ? product.filterList
          .map((item: any) => ({
            field: item?.field?.toString?.().trim?.() || "",
            value: item?.value?.toString?.().trim?.() || "",
          }))
          .filter((item: { field: string; value: string }) => item.field && item.value)
      : [];

    return {
      id: product?.id,
      name,
      slug: product?.slug || toSlug(name),
      type: normalizedType,
      filterList: normalizedFilterList,
      template: product?.templateName || "Template",
      templateId: product?.templateId,
      status: product?.status || "Active",
      date: formatEditorDate(createdAt),
    };
  });
};

const safeJson = (value: any, fallback: any) => {
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

export const normalizeEditorTemplates = (data: any): IEditorTemplateItem[] => {
  const templates = getArrayFromResponse(data, [
    "templates",
    "productTemplates",
    "items",
    "list",
  ]);

  return templates.map((template: any) => {
    const templateName = pickFirstNonEmpty(
      template,
      [
        "templateName",
        "name",
        "title",
        "productJsonObject.templateName",
      ],
      "Untitled Template",
    );

    return {
      id: pickFirstNonEmpty(
        template,
        ["id", "_id", "templateId", "uid"],
        templateName,
      ),
      templateName,
      promptInput: pickFirstNonEmpty(template, ["promptInput", "prompt"], ""),
      productJsonObject: safeJson(
        pickFirstNonEmpty(
          template,
          ["productJsonObject", "product_json_object", "product", "json"],
          {},
        ),
        {},
      ),
      raw: template,
    };
  });
};
