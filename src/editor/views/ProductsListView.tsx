"use client";

import Link from "next/link";
import Select from "react-select";
import { Fragment, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { triggerForm } from "@/shared/InternalService";
import { EditorAPI } from "@/services/EditorAPI";
import styles from "../editorWorkspace.module.scss";
import {
  normalizeEditorProducts,
  normalizeEditorTemplates,
  formatEditorDate,
} from "../utils/editorApiHelpers";

const PRODUCT_GROUPS = [
  { key: "State", label: "State Products" },
  { key: "County", label: "County Products" },
  { key: "City", label: "City Products" },
  { key: "Speciality", label: "Speciality Products" },
] as const;

type ProductGroupKey = (typeof PRODUCT_GROUPS)[number]["key"];

const selectStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "9px",
    borderColor: "#c9d8e6",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#aebfd0",
    },
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 30,
  }),
};

const toGroupKey = (type = ""): ProductGroupKey | null => {
  const normalized = type.toLowerCase();
  if (normalized.includes("state")) return "State";
  if (normalized.includes("county")) return "County";
  if (normalized.includes("city")) return "City";
  if (normalized.includes("speciality") || normalized.includes("specialty")) return "Speciality";
  return null;
};

const getFilterValue = (
  filterList: Array<{ field: string; value: string }> = [],
  key = "",
) =>
  filterList.find(
    (item) => item.field?.toLowerCase() === key.toLowerCase(),
  )?.value || "";

const getScopeLabel = (product: {
  type: string;
  filterList?: Array<{ field: string; value: string }>;
}) => {
  const state = getFilterValue(product.filterList || [], "state");
  const county = getFilterValue(product.filterList || [], "county");
  const city = getFilterValue(product.filterList || [], "city");
  const speciality =
    getFilterValue(product.filterList || [], "specialization") ||
    getFilterValue(product.filterList || [], "speciality") ||
    getFilterValue(product.filterList || [], "specialty");
  const normalizedType = product.type.toLowerCase();

  if (normalizedType.includes("state")) return state || "N/A";
  if (normalizedType.includes("county")) return county || "N/A";
  if (normalizedType.includes("city")) return city || county || state || "N/A";
  if (normalizedType.includes("speciality") || normalizedType.includes("specialty")) {
    return speciality || "N/A";
  }

  return city || state || county || speciality || "N/A";
};

const ProductsListView = () => {
  const queryClient = useQueryClient();
  const editorAPI = useMemo(() => new EditorAPI(), []);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["editor-products"],
    queryFn: () => editorAPI.getAllEstateProducts(),
  });

  const { data: templatesResponse } = useQuery({
    queryKey: ["editor-templates"],
    queryFn: () => editorAPI.getAllProductTemplates(),
  });

  const products = useMemo(() => {
    const normalized = normalizeEditorProducts(productsResponse);
    if (normalized.length) return normalized;

    const rawProducts = Array.isArray(productsResponse)
      ? productsResponse
      : Array.isArray((productsResponse as any)?.data)
        ? (productsResponse as any).data
        : [];

    if (!rawProducts.length) return [];

    return rawProducts.map((product: any) => ({
      id: product?.id || product?.slug,
      name:
        product?.name ||
        product?.rewrittenJson?.mainHeader ||
        product?.slug ||
        "Untitled Product",
      slug: product?.slug || product?.id || "",
      type: product?.type || product?.productType || "State",
      filterList: Array.isArray(product?.filterList) ? product.filterList : [],
      template: product?.templateName || "Template",
      templateId: product?.templateId,
      status: product?.status || "Active",
      date: formatEditorDate(
        product?.updatedAtLocallyBackend ||
          product?.updatedAt ||
          product?.createdAt ||
          product?.date,
      ),
    }));
  }, [productsResponse]);
  const templates = useMemo(
    () => normalizeEditorTemplates(templatesResponse),
    [templatesResponse],
  );
  const templateOptions = useMemo(
    () =>
      templates.map((template) => ({
        label: template.templateName,
        value: template.id,
      })),
    [templates],
  );

  const filteredProducts = useMemo(() => {
    let next = [...products];

    if (selectedTemplateId) {
      next = next.filter((item) => item.templateId === selectedTemplateId);
    }

    if (search.trim()) {
      const matcher = search.trim().toLowerCase();
      next = next.filter((item) => {
        const combined =
          `${item.name} ${item.slug || ""} ${item.template} ${getScopeLabel(item)}`.toLowerCase();
        return combined.includes(matcher);
      });
    }

    return next;
  }, [products, selectedTemplateId, search]);

  const groupedProducts = useMemo(() => {
    const grouped: Record<ProductGroupKey, typeof filteredProducts> = {
      State: [],
      County: [],
      City: [],
      Speciality: [],
    };

    filteredProducts.forEach((product) => {
      const groupKey = toGroupKey(product.type);
      if (!groupKey) return;
      grouped[groupKey].push(product);
    });

    return grouped;
  }, [filteredProducts]);

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => editorAPI.deleteEstateProduct(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["editor-products"] });
      triggerForm({
        title: "Product deleted",
        text: "Selected product has been removed.",
        icon: "success",
      });
    },
    onError: (error: Error) => {
      triggerForm({
        title: "Delete failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  const syncStatsMutation = useMutation({
    mutationFn: (productId: string) => editorAPI.syncEstateProductStats(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["editor-products"] });
      triggerForm({
        title: "Stats synced",
        text: "Product stats were refreshed from filterList.",
        icon: "success",
      });
    },
    onError: (error: Error) => {
      triggerForm({
        title: "Sync failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  const onDelete = (productId?: string, productName?: string) => {
    if (!productId) {
      return;
    }

    const allowDelete = window.confirm(
      `Delete ${productName || "this product"} permanently?`,
    );

    if (allowDelete) {
      deleteProductMutation.mutate(productId);
    }
  };

  const onSyncStats = (productId?: string) => {
    if (!productId) return;
    syncStatsMutation.mutate(productId);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerTitle}>Generated Products</h2>
          <p className={styles.headerDescription}>
            Manage generated Dentist Email List product pages and open each one for content editing.
          </p>
        </div>
        <div className={styles.buttonRow}>
          <Link href="/editor">
            <Button variant={BUTTON_VARIANT_ENUM.ACTION}>Add Product</Button>
          </Link>
          <Link href="/editor/templates">
            <Button variant={BUTTON_VARIANT_ENUM.SECONDARY}>Manage Templates</Button>
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Template</label>
            <Select
              styles={selectStyles}
              options={templateOptions}
              value={
                templateOptions.find(
                  (option) => option.value === selectedTemplateId,
                ) || null
              }
              onChange={(option: any) =>
                setSelectedTemplateId(option ? option.value : null)
              }
              isClearable
              placeholder="All templates"
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>Search</label>
          <input
            className={styles.input}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name, scope, slug, or template"
          />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Scope</th>
                <th>Type</th>
                <th>Template</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isProductsLoading ? (
                <tr>
                  <td colSpan={7}>Loading products...</td>
                </tr>
              ) : null}

              {!isProductsLoading &&
              PRODUCT_GROUPS.every(({ key }) => groupedProducts[key].length === 0) ? (
                <tr>
                  <td colSpan={7}>
                    {isProductsError
                      ? `Failed to load products. ${
                          (productsError as Error)?.message || "Please retry."
                        }`
                      : "No products found for the selected filters."}
                  </td>
                </tr>
              ) : null}

              {(PRODUCT_GROUPS.some(({ key }) => groupedProducts[key].length > 0)
                ? PRODUCT_GROUPS
                : [{ key: "State", label: "All Products" } as const]
              ).map(({ key, label }) => {
                const items = groupedProducts[key];
                const fallbackItems =
                  label === "All Products" ? filteredProducts : items;
                if (!fallbackItems.length) return null;

                return (
                  <Fragment key={`${key}-section`}>
                    <tr className={styles.sectionRow}>
                      <td colSpan={7}>
                        <span className={styles.sectionTitle}>
                          {label} ({fallbackItems.length})
                        </span>
                      </td>
                    </tr>
                    {fallbackItems.map((product) => (
                      <tr key={product.id || product.slug || product.name}>
                        <td>
                          <div>{product.name}</div>
                          {product.slug ? (
                            <code>/products/{product.slug}</code>
                          ) : null}
                        </td>
                        <td>{getScopeLabel(product)}</td>
                        <td>{product.type}</td>
                        <td>{product.template}</td>
                        <td>
                          <span className={styles.pill}>{product.status}</span>
                        </td>
                        <td>{product.date}</td>
                        <td>
                          <div className={styles.inlineActions}>
                            <Link href={`/editor/products/${product.id}`}>
                              <Button variant={BUTTON_VARIANT_ENUM.SECONDARY}>
                                Edit
                              </Button>
                            </Link>
                            {product.slug ? (
                              <Link href={`/products/${product.slug}`} target="_blank">
                                <Button variant={BUTTON_VARIANT_ENUM.TERTIARY}>
                                  View
                                </Button>
                              </Link>
                            ) : null}
                            <Button
                              variant={BUTTON_VARIANT_ENUM.ACTION}
                              onClick={() => onSyncStats(product.id)}
                              disabled={!product.filterList?.length}
                              isLoading={
                                syncStatsMutation.isPending &&
                                syncStatsMutation.variables === product.id
                              }
                            >
                              Sync Stats
                            </Button>
                            <Button
                              variant={BUTTON_VARIANT_ENUM.DANGER}
                              onClick={() => onDelete(product.id, product.name)}
                              isLoading={
                                deleteProductMutation.isPending &&
                                deleteProductMutation.variables === product.id
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsListView;
