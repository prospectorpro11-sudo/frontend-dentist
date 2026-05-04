import instance from "./baseServices";

export interface IEditorFilterItem {
  field: string;
  value: string;
}

export interface IGenerateEstateProductPayload {
  templateId: string;
  filterList: IEditorFilterItem[];
  productName?: string;
  slug?: string;
  editorPrompt?: string;
  templateName?: string;
  promptInput?: string;
  productJsonObject?: Record<string, any>;
  rewrittenJson?: Record<string, any>;
}

export interface IProductTemplatePayload {
  templateName?: string;
  promptInput?: string;
  productJsonObject: Record<string, any>;
}

export class EditorAPI {
  async getAllEstateProducts() {
    const response = await instance.get("/editor/getAllEstateProduct");
    return response.data;
  }

  async getSingleEstateProduct(productId: string) {
    const response = await instance.get(
      `/editor/getSingleEstateProduct/${encodeURIComponent(productId)}`,
    );
    return response.data;
  }

  async generateEstateProduct(payload: IGenerateEstateProductPayload) {
    const response = await instance.post(
      "/editor/generateEstateProduct",
      payload,
      { timeout: 180000 },
    );
    return response.data;
  }

  async updateSingleEstateProduct(
    productId: string,
    payload: {
      rewrittenJson: Record<string, any>;
      templateId?: string;
      templateName?: string;
      promptInput?: string;
      name?: string;
      status?: string;
      productType?: string;
    },
  ) {
    const response = await instance.post(
      `/editor/updateSingleEstateProduct/${encodeURIComponent(productId)}`,
      payload,
    );
    return response.data;
  }

  async deleteEstateProduct(productId: string) {
    const response = await instance.post(
      `/editor/deleteEstateProduct/${encodeURIComponent(productId)}`,
      undefined,
    );
    return response.data;
  }

  async syncEstateProductStats(productId: string) {
    const response = await instance.post(
      `/editor/syncEstateProductStats/${encodeURIComponent(productId)}`,
      undefined,
      { timeout: 120000 },
    );
    return response.data;
  }

  async getAllProductTemplates() {
    const response = await instance.get("/editor/getAllProductTemplate");
    return response.data;
  }

  async saveProductTemplate(payload: IProductTemplatePayload) {
    const response = await instance.post(
      "/editor/saveProductTemplate",
      payload,
    );
    return response.data;
  }

  async updateProductTemplate(
    templateId: string,
    payload: IProductTemplatePayload,
  ) {
    const response = await instance.post(
      `/editor/updateProductTemplate/${encodeURIComponent(templateId)}`,
      payload,
    );
    return response.data;
  }

  async deleteProductTemplate(templateId: string) {
    const response = await instance.post(
      `/editor/deleteProductTemplate/${encodeURIComponent(templateId)}`,
      undefined,
    );
    return response.data;
  }
}
