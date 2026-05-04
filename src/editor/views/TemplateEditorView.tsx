"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/button/Button";
import { BUTTON_VARIANT_ENUM } from "@/shared/enums";
import { triggerForm } from "@/shared/InternalService";
import { EditorAPI } from "@/services/EditorAPI";
import JsonPreviewPanel from "../components/JsonPreviewPanel";
import TemplateFormFields from "../components/TemplateFormFields";
import styles from "../editorWorkspace.module.scss";
import {
  buildTemplateJson,
  createEmptyTemplateFormState,
  toTemplateFormState,
} from "../utils/templateFormMapper";
import { normalizeEditorTemplates } from "../utils/editorApiHelpers";

const TemplateEditorView = () => {
  const queryClient = useQueryClient();
  const editorAPI = useMemo(() => new EditorAPI(), []);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [promptInput, setPromptInput] = useState("");
  const [formState, setFormState] = useState(createEmptyTemplateFormState());

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

  const previewJson = useMemo(() => {
    const nextJson = buildTemplateJson(formState) as Record<string, any>;
    nextJson.promptInput = promptInput.trim();
    delete nextJson.bannerBenefits;
    delete nextJson.availableDataFields;
    delete nextJson.dataFields;
    delete nextJson.aboutMarket;
    delete nextJson.whoUsesData;
    return nextJson;
  }, [formState, promptInput]);

  const resetEditor = () => {
    setSelectedTemplateId(null);
    setPromptInput("");
    setFormState(createEmptyTemplateFormState());
  };

  const onTemplateSelect = (templateId: string | null) => {
    setSelectedTemplateId(templateId);

    if (!templateId) {
      resetEditor();
      return;
    }

    const template = templates.find((item) => item.id === templateId);
    if (!template) {
      return;
    }

    setPromptInput(template.promptInput || "");
    setFormState(toTemplateFormState(template));
  };

  const saveTemplateMutation = useMutation({
    mutationFn: async () => {
      if (!formState.templateName.trim()) {
        throw new Error("Template name is required.");
      }

      return editorAPI.saveProductTemplate({
        templateName: formState.templateName.trim(),
        promptInput: promptInput.trim(),
        productJsonObject: previewJson,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["editor-templates"] });
      triggerForm({
        title: "Template saved",
        text: "Your template has been saved successfully.",
        icon: "success",
      });
      resetEditor();
    },
    onError: (error: Error) => {
      triggerForm({
        title: "Save failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTemplateId) {
        throw new Error("Select a template before updating.");
      }

      if (!formState.templateName.trim()) {
        throw new Error("Template name is required.");
      }

      return editorAPI.updateProductTemplate(selectedTemplateId, {
        templateName: formState.templateName.trim(),
        promptInput: promptInput.trim(),
        productJsonObject: previewJson,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["editor-templates"] });
      triggerForm({
        title: "Template updated",
        text: "Template changes have been saved.",
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

  const deleteTemplateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTemplateId) {
        throw new Error("Select a template before deleting.");
      }
      return editorAPI.deleteProductTemplate(selectedTemplateId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["editor-templates"] });
      triggerForm({
        title: "Template deleted",
        text: "Template was removed successfully.",
        icon: "success",
      });
      resetEditor();
    },
    onError: (error: Error) => {
      triggerForm({
        title: "Delete failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  const onDelete = () => {
    if (!selectedTemplateId) return;

    const allowDelete = window.confirm(
      "Delete the selected template permanently?",
    );

    if (allowDelete) {
      deleteTemplateMutation.mutate();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerTitle}>Template Editor</h2>
          <p className={styles.headerDescription}>
            Create and maintain reusable product-content templates for Dentist Email List product pages.
          </p>
        </div>
        <div className={styles.buttonRow}>
          <Button variant={BUTTON_VARIANT_ENUM.TERTIARY} onClick={resetEditor}>
            Clear
          </Button>
          <Button
            variant={BUTTON_VARIANT_ENUM.ACTION}
            onClick={() => {
              if (selectedTemplateId) {
                updateTemplateMutation.mutate();
                return;
              }
              saveTemplateMutation.mutate();
            }}
            isLoading={
              saveTemplateMutation.isPending || updateTemplateMutation.isPending
            }
          >
            {selectedTemplateId ? "Update Template" : "Save Template"}
          </Button>
          {selectedTemplateId ? (
            <Button
              variant={BUTTON_VARIANT_ENUM.DANGER}
              onClick={onDelete}
              isLoading={deleteTemplateMutation.isPending}
            >
              Delete
            </Button>
          ) : null}
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
            showBenefitsAndDataFieldsSection={false}
            showAboutMarketSection={false}
            showWhoUsesDataSection={false}
          />
        </div>
        <JsonPreviewPanel data={previewJson as Record<string, any>} />
      </div>
    </div>
  );
};

export default TemplateEditorView;
