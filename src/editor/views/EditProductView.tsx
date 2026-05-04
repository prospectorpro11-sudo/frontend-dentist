"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { triggerForm } from "@/shared/InternalService";
import { EditorAPI } from "@/services/EditorAPI";
import styles from "../editorWorkspace.module.scss";
import JsonPreviewPanel from "../components/JsonPreviewPanel";
import TemplateFormFields from "../components/TemplateFormFields";
import {
  buildTemplateJson,
  createEmptyTemplateFormState,
  toTemplateFormState,
} from "../utils/templateFormMapper";
import { normalizeEditorTemplates } from "../utils/editorApiHelpers";

type EditProductViewProps = {
  productId: string;
};

const EditProductView = ({ productId }: EditProductViewProps) => {
  const queryClient = useQueryClient();
  const editorAPI = useMemo(() => new EditorAPI(), []);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [promptInput, setPromptInput] = useState("");
  const [formState, setFormState] = useState(createEmptyTemplateFormState());

  const { data: productResponse, isLoading: isProductLoading } = useQuery({
    queryKey: ["editor-product", productId],
    queryFn: () => editorAPI.getSingleEstateProduct(productId),
    enabled: !!productId,
  });

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

  const currentProduct = useMemo(
    () => productResponse?.data || productResponse || null,
    [productResponse],
  );

  useEffect(() => {
    if (!currentProduct) return;

    let rewrittenJson: any = currentProduct?.rewrittenJson || {};
    if (typeof rewrittenJson === "string") {
      try {
        rewrittenJson = JSON.parse(rewrittenJson || "{}");
      } catch (_error) {
        rewrittenJson = {};
      }
    }
    setFormState(
      toTemplateFormState({
        templateName: rewrittenJson?.templateName || currentProduct?.templateName,
        productJsonObject: rewrittenJson,
      }),
    );
    setPromptInput(currentProduct?.promptInput || "");
    setSelectedTemplateId(currentProduct?.templateId || null);
  }, [currentProduct]);

  const onTemplateSelect = (templateId: string | null) => {
    setSelectedTemplateId(templateId);
    if (!templateId) return;

    const template = templates.find((item) => item.id === templateId);
    if (!template) return;

    setPromptInput(template.promptInput || "");
    setFormState(toTemplateFormState(template));
  };

  const previewJson = useMemo(() => buildTemplateJson(formState), [formState]);

  const updateProductMutation = useMutation({
    mutationFn: () =>
      editorAPI.updateSingleEstateProduct(productId, {
        rewrittenJson: previewJson,
        templateId: selectedTemplateId || currentProduct?.templateId || "",
        templateName: formState.templateName || currentProduct?.templateName || "",
        promptInput: promptInput.trim(),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["editor-products"] });
      await queryClient.invalidateQueries({ queryKey: ["editor-product", productId] });
      triggerForm({
        title: "Product updated",
        text: "The product page content has been saved.",
        icon: "success",
      });
    },
    onError: (error: Error) => {
      triggerForm({
        title: "Update failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  if (isProductLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>Loading product...</div>
      </div>
    );
  }

  if (!currentProduct?.id) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>Product not found.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerTitle}>Edit Product</h2>
          <p className={styles.headerDescription}>
            Update product page content and publish changes for{" "}
            <b>{currentProduct?.name || currentProduct?.slug || currentProduct.id}</b>.
          </p>
        </div>
        <div className={styles.buttonRow}>
          <Link href="/editor/products">
            <Button variant={BUTTON_VARIANT_ENUM.TERTIARY}>Back to Products</Button>
          </Link>
          <Link
            href={`/products/${currentProduct?.slug || currentProduct.id}`}
            target="_blank"
          >
            <Button variant={BUTTON_VARIANT_ENUM.SECONDARY}>View Page</Button>
          </Link>
          <Button
            variant={BUTTON_VARIANT_ENUM.ACTION}
            onClick={() => updateProductMutation.mutate()}
            isLoading={updateProductMutation.isPending}
          >
            Save Product
          </Button>
        </div>
      </div>

      <div className={styles.workspace}>
        <div className={styles.scrollCard}>
          <TemplateFormFields
            formState={formState}
            setFormState={setFormState}
            promptInput={promptInput}
            setPromptInput={setPromptInput}
            templateOptions={templateOptions}
            selectedTemplateId={selectedTemplateId}
            onTemplateSelect={onTemplateSelect}
            isTemplatesLoading={isTemplatesLoading}
            showTemplateLibrary
          />
        </div>
        <JsonPreviewPanel data={previewJson as Record<string, any>} />
      </div>
    </div>
  );
};

export default EditProductView;
