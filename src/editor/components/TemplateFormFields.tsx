"use client";

import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import styles from "../editorWorkspace.module.scss";
import { TemplateFormState } from "../utils/templateFormMapper";

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

type TemplateFormFieldsProps = {
  formState: TemplateFormState;
  setFormState: Dispatch<SetStateAction<TemplateFormState>>;
  promptInput: string;
  setPromptInput: Dispatch<SetStateAction<string>>;
  templateOptions?: { label: string; value: string }[];
  selectedTemplateId?: string | null;
  onTemplateSelect?: (value: string | null) => void;
  isTemplatesLoading?: boolean;
  showTemplateLibrary?: boolean;
  showBenefitsAndDataFieldsSection?: boolean;
  showAboutMarketSection?: boolean;
  showWhoUsesDataSection?: boolean;
};

const TemplateFormFields = ({
  formState,
  setFormState,
  promptInput,
  setPromptInput,
  templateOptions = [],
  selectedTemplateId = null,
  onTemplateSelect,
  isTemplatesLoading = false,
  showTemplateLibrary = true,
  showBenefitsAndDataFieldsSection = true,
  showAboutMarketSection = true,
  showWhoUsesDataSection = true,
}: TemplateFormFieldsProps) => {
  const setField = (key: keyof TemplateFormState, value: string) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const productTypeOptions = [
    { value: "STATE", label: "State" },
    { value: "COUNTY", label: "County" },
    { value: "CITY", label: "City" },
    { value: "SPECIALITY", label: "Speciality" },
  ];

  return (
    <div className={styles.form}>
      {showTemplateLibrary ? (
        <div className={styles.card}>
          <div className={styles.form}>
            <div>
              <label className={styles.label}>Template Library</label>
              <Select
                styles={selectStyles}
                options={templateOptions}
                value={
                  templateOptions.find(
                    (option) => option.value === selectedTemplateId,
                  ) || null
                }
                onChange={(option: any) =>
                  onTemplateSelect?.(option ? option.value : null)
                }
                isLoading={isTemplatesLoading}
                isClearable
                placeholder="Select an existing template"
              />
            </div>
            <div>
              <label className={styles.label}>Prompt Input (Optional)</label>
              <textarea
                className={styles.textarea}
                placeholder="Optional prompt/context for generation"
                value={promptInput}
                onChange={(event) => setPromptInput(event.target.value)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.card}>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Template Name</label>
            <input
              className={styles.input}
              value={formState.templateName}
              onChange={(event) => setField("templateName", event.target.value)}
              placeholder="State Product Template"
            />
          </div>
          <div>
            <label className={styles.label}>Product Type</label>
            <Select
              styles={selectStyles}
              options={productTypeOptions}
              value={
                productTypeOptions.find(
                  (option) => option.value === formState.productType,
                ) || null
              }
              onChange={(option: any) =>
                setField("productType", option ? option.value : "STATE")
              }
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Meta Title</label>
            <input
              className={styles.input}
              value={formState.metaTitle}
              onChange={(event) => setField("metaTitle", event.target.value)}
              placeholder="Alaska Dentist Email List | Dentist Email List"
            />
          </div>
          <div>
            <label className={styles.label}>Main Header</label>
            <input
              className={styles.input}
              value={formState.mainHeader}
              onChange={(event) => setField("mainHeader", event.target.value)}
              placeholder="Alaska Dentist Email List"
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>Meta Description</label>
          <textarea
            className={styles.textarea}
            value={formState.metaDescription}
            onChange={(event) => setField("metaDescription", event.target.value)}
            placeholder="SEO description"
          />
        </div>
        <div>
          <label className={styles.label}>Main Header Description</label>
          <textarea
            className={styles.textarea}
            value={formState.mainHeaderDescription}
            onChange={(event) =>
              setField("mainHeaderDescription", event.target.value)
            }
            placeholder="Hero description content"
          />
        </div>
      </div>

      {showBenefitsAndDataFieldsSection ? (
        <div className={styles.card}>
          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>Banner Benefits</label>
              <textarea
                className={styles.codeArea}
                value={formState.bannerBenefitsText}
                onChange={(event) =>
                  setField("bannerBenefitsText", event.target.value)
                }
                placeholder={"One item per line\nVerified contacts\nUpdated regularly"}
              />
              <p className={styles.helper}>One benefit per line.</p>
            </div>
            <div>
              <label className={styles.label}>Available Data Fields</label>
              <textarea
                className={styles.codeArea}
                value={formState.availableDataFieldsText}
                onChange={(event) =>
                  setField("availableDataFieldsText", event.target.value)
                }
                placeholder={"One field per line\nDentist Name\nEmail\nCity"}
              />
              <p className={styles.helper}>One field per line.</p>
            </div>
          </div>
          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>Data Fields Section Title</label>
              <input
                className={styles.input}
                value={formState.dataFieldsTitle}
                onChange={(event) =>
                  setField("dataFieldsTitle", event.target.value)
                }
                placeholder="Available Data Fields"
              />
            </div>
            <div>
              <label className={styles.label}>
                Data Fields Section Description
              </label>
              <input
                className={styles.input}
                value={formState.dataFieldsDescription}
                onChange={(event) =>
                  setField("dataFieldsDescription", event.target.value)
                }
                placeholder="Section summary"
              />
            </div>
          </div>
        </div>
      ) : null}

      {showAboutMarketSection ? (
        <div className={styles.card}>
          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>About Market Title</label>
              <input
                className={styles.input}
                value={formState.aboutMarketTitle}
                onChange={(event) =>
                  setField("aboutMarketTitle", event.target.value)
                }
                placeholder="Explore Alaska's Nursing Market"
              />
            </div>
            <div>
              <label className={styles.label}>About Market Image URL</label>
              <input
                className={styles.input}
                value={formState.aboutMarketImage}
                onChange={(event) =>
                  setField("aboutMarketImage", event.target.value)
                }
                placeholder="/stateImages/alaska.png"
              />
            </div>
          </div>
          <div>
            <label className={styles.label}>About Market Highlights</label>
            <textarea
              className={styles.codeArea}
              value={formState.aboutMarketHighlightsText}
              onChange={(event) =>
                setField("aboutMarketHighlightsText", event.target.value)
              }
              placeholder={"One highlight per line\nHigh nurse demand\nStrong hospital network"}
            />
          </div>
        </div>
      ) : null}

      {showWhoUsesDataSection ? (
        <div className={styles.card}>
          <div className={styles.formRow}>
            <div>
              <label className={styles.label}>Who Uses Data Title</label>
              <input
                className={styles.input}
                value={formState.whoUsesDataTitle}
                onChange={(event) =>
                  setField("whoUsesDataTitle", event.target.value)
                }
                placeholder="Who Uses This Nursing Data"
              />
            </div>
            <div>
              <label className={styles.label}>Who Uses Data Description</label>
              <input
                className={styles.input}
                value={formState.whoUsesDataDescription}
                onChange={(event) =>
                  setField("whoUsesDataDescription", event.target.value)
                }
                placeholder="Audience summary"
              />
            </div>
          </div>
          <div className={styles.pairEditor}>
            <p className={styles.pairEditorTitle}>Who Uses Data Items</p>
            <textarea
              className={styles.codeArea}
              value={formState.whoUsesDataUsersText}
              onChange={(event) =>
                setField("whoUsesDataUsersText", event.target.value)
              }
              placeholder={
                "Title | Description\nHealthcare Recruiters | Hire nurses faster\nEducation Providers | Promote CE courses"
              }
            />
            <p className={styles.helper}>
              One item per line in `Title | Description` format.
            </p>
          </div>
        </div>
      ) : null}

      <div className={styles.card}>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Ideal Use Cases Title</label>
            <input
              className={styles.input}
              value={formState.featuresTitle}
              onChange={(event) => setField("featuresTitle", event.target.value)}
              placeholder="Ideal Use Cases"
            />
          </div>
          <div>
            <label className={styles.label}>Ideal Use Cases Description</label>
            <input
              className={styles.input}
              value={formState.featuresDescription}
              onChange={(event) =>
                setField("featuresDescription", event.target.value)
              }
              placeholder="Section description"
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>Ideal Use Cases</label>
          <textarea
            className={styles.codeArea}
            value={formState.featuresText}
            onChange={(event) => setField("featuresText", event.target.value)}
            placeholder={"One use case per line\nRecruitment campaigns\nContinuing education outreach"}
          />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Trusted Sources Title</label>
            <input
              className={styles.input}
              value={formState.sourcesTitle}
              onChange={(event) => setField("sourcesTitle", event.target.value)}
              placeholder="Trusted Data Sources"
            />
          </div>
          <div>
            <label className={styles.label}>Trusted Sources Description</label>
            <input
              className={styles.input}
              value={formState.sourcesDescription}
              onChange={(event) =>
                setField("sourcesDescription", event.target.value)
              }
              placeholder="Section description"
            />
          </div>
        </div>
        <div className={styles.pairEditor}>
          <p className={styles.pairEditorTitle}>Source Items</p>
          <textarea
            className={styles.codeArea}
            value={formState.sourcesText}
            onChange={(event) => setField("sourcesText", event.target.value)}
            placeholder={
              "One source per line\nState Nursing Board\nNPPES\nCMS"
            }
          />
          <p className={styles.helper}>One source item per line.</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>FAQ Title</label>
            <input
              className={styles.input}
              value={formState.faqTitle}
              onChange={(event) => setField("faqTitle", event.target.value)}
              placeholder="Frequently Asked Questions"
            />
          </div>
          <div>
            <label className={styles.label}>FAQ Badge Text</label>
            <input
              className={styles.input}
              value={formState.faqBadgeText}
              onChange={(event) => setField("faqBadgeText", event.target.value)}
              placeholder="FAQ"
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>FAQ Description</label>
          <textarea
            className={styles.textarea}
            value={formState.faqDescription}
            onChange={(event) =>
              setField("faqDescription", event.target.value)
            }
            placeholder="Section description"
          />
        </div>
        <div className={styles.pairEditor}>
          <p className={styles.pairEditorTitle}>FAQ Items</p>
          <textarea
            className={styles.codeArea}
            value={formState.faqItemsText}
            onChange={(event) => setField("faqItemsText", event.target.value)}
            placeholder={
              "Question | Answer\nHow fresh is this data? | We refresh records frequently."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateFormFields;
