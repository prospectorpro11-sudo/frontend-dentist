"use client";

import Link from "next/link";
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import styles from "../editorWorkspace.module.scss";
import { triggerForm } from "@/shared/InternalService";
import { EditorAPI } from "@/services/EditorAPI";
import { normalizeEditorTemplates } from "../utils/editorApiHelpers";
import states from "@/seeds/states.json";
import specialization from "@/seeds/specialization.json";

type Option = {
  label: string;
  value: string;
};

type ProductType = "STATE" | "COUNTY" | "CITY" | "SPECIALITY";

const PRODUCT_TYPE_OPTIONS: Option[] = [
  { label: "State", value: "STATE" },
  { label: "County", value: "COUNTY" },
  { label: "City", value: "CITY" },
  { label: "Speciality", value: "SPECIALITY" },
];

type SpecialitySeedItem = {
  label: string;
  value: string;
};

const SPECIALITY_OPTIONS: Option[] = (
  specialization as SpecialitySeedItem[]
).map((item) => ({
  label: item.label,
  value: item.value,
}));

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

const slugify = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const GenerateProductView = () => {
  const queryClient = useQueryClient();
  const editorAPI = useMemo(() => new EditorAPI(), []);

  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [productType, setProductType] = useState<ProductType>("STATE");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState<Option | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [editorPrompt, setEditorPrompt] = useState("");
  const [lastGenerated, setLastGenerated] = useState<{
    id?: string;
    slug?: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const stateLabel = selectedState?.label?.trim() || "";
    const countyLabel = county.trim();
    const cityLabel = city.trim();
    const specialityLabel = selectedSpeciality?.label?.trim() || "";

    const generatedName =
      productType === "CITY"
        ? cityLabel || countyLabel || stateLabel
          ? `${cityLabel || countyLabel || stateLabel} Dentist Email List`
          : ""
        : productType === "COUNTY"
          ? countyLabel || stateLabel
            ? `${countyLabel || stateLabel} Dentist Email List`
            : ""
          : productType === "SPECIALITY"
            ? specialityLabel
              ? `${specialityLabel} Dentist Email List`
              : ""
            : stateLabel
              ? `${stateLabel} Dentist Email List`
              : "";

    setProductName(generatedName);
    setSlug(generatedName ? slugify(generatedName) : "");
  }, [
    productType,
    selectedState?.label,
    county,
    city,
    selectedSpeciality?.label,
  ]);

  const { data: templatesResponse, isLoading: isTemplatesLoading } = useQuery({
    queryKey: ["editor-templates"],
    queryFn: () => editorAPI.getAllProductTemplates(),
  });

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

  const stateOptions = useMemo(
    () =>
      (states as { label: string; value: string }[]).map((item) => ({
        label: item.label,
        value: item.value,
      })),
    [],
  );

  const generateProductMutation = useMutation({
    mutationFn: async () => {
      if (productType !== "SPECIALITY" && !selectedState?.label) {
        throw new Error("Select a state to continue.");
      }

      if (productType === "SPECIALITY" && !selectedSpeciality?.label) {
        throw new Error("Select a speciality to continue.");
      }

      if (!selectedTemplateId) {
        throw new Error("Select a template to continue.");
      }

      const nextName =
        productName.trim() ||
        (productType === "CITY" && city.trim()
          ? `${city.trim()} Dentist Email List`
          : productType === "COUNTY" && county.trim()
            ? `${county.trim()} Dentist Email List`
            : productType === "SPECIALITY" && selectedSpeciality?.label
              ? `${selectedSpeciality.label} Dentist Email List`
            : `${selectedState?.label || "State"} Dentist Email List`);
      const nextSlug = slugify(slug.trim() || nextName);
      const filterList = [
        ...(productType !== "SPECIALITY" && selectedState?.value
          ? [{ field: "State", value: selectedState.value }]
          : []),
        ...(productType === "COUNTY" || productType === "CITY"
          ? [{ field: "County", value: county.trim() || selectedState?.label || "State" }]
          : []),
        ...(productType === "CITY"
          ? [{ field: "City", value: city.trim() || county.trim() || selectedState?.label || "State" }]
          : []),
        ...(productType === "SPECIALITY"
          ? [{ field: "Specialization", value: selectedSpeciality?.value || "General Nursing" }]
          : []),
      ];

      const selectedTemplate = templates.find(
        (template) => template.id === selectedTemplateId,
      );

      return editorAPI.generateEstateProduct({
        templateId: selectedTemplateId,
        filterList,
        productName: nextName,
        slug: nextSlug,
        editorPrompt: editorPrompt.trim(),
        templateName: selectedTemplate?.templateName || "",
        promptInput: selectedTemplate?.promptInput || "",
        productJsonObject: (selectedTemplate?.productJsonObject ||
          {}) as Record<string, any>,
      });
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["editor-products"] });
      setLastGenerated({
        id: response?.id,
        slug: response?.slug || response?.id,
        name: response?.name,
      });

      triggerForm({
        title: "Product generated",
        text: "The product page draft has been created successfully.",
        icon: "success",
      });
    },
    onError: (error: Error) => {
      triggerForm({
        title: "Generation failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerTitle}>Generate Product</h2>
          <p className={styles.headerDescription}>
            Create a new Dentist Email List product page from a selected template and state.
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>Product Type</label>
              <Select
                styles={selectStyles}
                options={PRODUCT_TYPE_OPTIONS}
                value={PRODUCT_TYPE_OPTIONS.find((option) => option.value === productType) || PRODUCT_TYPE_OPTIONS[0]}
                onChange={(option: any) =>
                  setProductType((option?.value || "STATE") as ProductType)
                }
              />
            </div>
            {productType !== "SPECIALITY" ? (
              <div>
                <label className={styles.label}>State</label>
                <Select
                  styles={selectStyles}
                  options={stateOptions}
                  value={selectedState}
                  onChange={(option: any) => {
                    const next = option
                      ? { label: option.label, value: option.value }
                      : null;
                    setSelectedState(next);
                  }}
                  placeholder="Select state"
                />
              </div>
            ) : (
              <div>
                <label className={styles.label}>Speciality</label>
                <Select
                  styles={selectStyles}
                  options={SPECIALITY_OPTIONS}
                  value={selectedSpeciality}
                  onChange={(option: any) => {
                    const next = option
                      ? { label: option.label, value: option.value }
                      : null;
                    setSelectedSpeciality(next);
                  }}
                  placeholder="Select speciality"
                />
              </div>
            )}
          </div>

          {productType !== "SPECIALITY" ? (
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
                  isLoading={isTemplatesLoading}
                  placeholder="Select template"
                />
              </div>
              <div>
                <label className={styles.label}>County (Optional)</label>
                <input
                  className={styles.input}
                  value={county}
                  onChange={(event) => setCounty(event.target.value)}
                  placeholder="Los Angeles County"
                  disabled={productType === "STATE"}
                />
              </div>
            </div>
          ) : (
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
                  isLoading={isTemplatesLoading}
                  placeholder="Select template"
                />
              </div>
            </div>
          )}

          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>Product Name</label>
              <input
                className={styles.input}
                value={productName}
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
                placeholder="Alaska Dentist Email List"
              />
            </div>
            {productType !== "SPECIALITY" ? (
              <div>
                <label className={styles.label}>City (Optional)</label>
                <input
                  className={styles.input}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Los Angeles"
                  disabled={productType !== "CITY"}
                />
              </div>
            ) : null}
          </div>

          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>Slug</label>
              <input
                className={styles.input}
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="alaska-nurse-email-list"
              />
              <p className={styles.helper}>
                Final URL: <code>/products/{slug || "your-product-slug"}</code>
              </p>
            </div>
          </div>

          <div>
            <label className={styles.label}>Editor Prompt (Optional)</label>
            <textarea
              className={styles.textarea}
              value={editorPrompt}
              onChange={(event) => setEditorPrompt(event.target.value)}
              placeholder="Optional prompt to describe intent/context for this generated product."
            />
          </div>

          <div className={styles.buttonRow}>
            <Button
              variant={BUTTON_VARIANT_ENUM.TERTIARY}
              onClick={() => {
                setSelectedState(null);
                setProductType("STATE");
                setCounty("");
                setCity("");
                setSelectedSpeciality(null);
                setSelectedTemplateId(null);
                setProductName("");
                setSlug("");
                setEditorPrompt("");
                setLastGenerated(null);
              }}
            >
              Reset
            </Button>
            <Button
              variant={BUTTON_VARIANT_ENUM.ACTION}
              onClick={() => generateProductMutation.mutate()}
              isLoading={generateProductMutation.isPending}
            >
              Generate Product
            </Button>
            <Link href="/editor/products">
              <Button variant={BUTTON_VARIANT_ENUM.SECONDARY}>
                View Generated Products
              </Button>
            </Link>
          </div>

          {lastGenerated ? (
            <div className={styles.card}>
              <p className={styles.headerDescription}>
                Generated product: <b>{lastGenerated.name || lastGenerated.slug}</b>
              </p>
              <div className={styles.inlineActions}>
                <Link href={`/editor/products/${lastGenerated.id}`}>
                  <Button variant={BUTTON_VARIANT_ENUM.SECONDARY}>
                    Open Editor
                  </Button>
                </Link>
                <Link href={`/products/${lastGenerated.slug}`} target="_blank">
                  <Button variant={BUTTON_VARIANT_ENUM.TERTIARY}>
                    Open Product Page
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GenerateProductView;
