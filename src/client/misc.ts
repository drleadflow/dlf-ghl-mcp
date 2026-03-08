import { BaseGHLClient } from "./base";

export function miscMethods(client: BaseGHLClient) {
  return {
    // ========== ASSOCIATIONS ==========

    async listAssociations(locationId?: string, skip?: string, limit?: string) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (skip) q.skip = skip;
      if (limit) q.limit = limit;
      return client.request<any>("GET", `/associations/`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getAssociation(associationId: string) {
      return client.request<any>("GET", `/associations/${associationId}`, {
        version: "2021-07-28",
      });
    },

    async getAssociationByKey(keyName: string, locationId?: string) {
      return client.request<any>("GET", `/associations/key/${keyName}`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async createAssociation(data: any) {
      return client.request<any>("POST", `/associations/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async updateAssociation(associationId: string, data: any) {
      return client.request<any>("PUT", `/associations/${associationId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteAssociation(associationId: string) {
      return client.request<any>("DELETE", `/associations/${associationId}`, {
        version: "2021-07-28",
      });
    },

    // ========== COMPANIES ==========

    async listCompanies(locationId?: string) {
      return client.request<{ companies: any[] }>("GET", `/companies/`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async getCompany(companyId: string) {
      return client.request<any>("GET", `/companies/${companyId}`, {
        version: "2021-07-28",
      });
    },

    async createCompany(data: any) {
      return client.request<any>("POST", `/companies/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async updateCompany(companyId: string, data: any) {
      return client.request<any>("PUT", `/companies/${companyId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteCompany(companyId: string) {
      return client.request<any>("DELETE", `/companies/${companyId}`, {
        version: "2021-07-28",
      });
    },

    // ========== PHONE SYSTEM ==========

    async listNumberPools(locationId?: string) {
      return client.request<any>("GET", `/phone-system/number-pools`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async listActiveNumbers(locationId?: string, opts?: { pageSize?: number; page?: number; searchFilter?: string }) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (opts?.pageSize) q.pageSize = String(opts.pageSize);
      if (opts?.page) q.page = String(opts.page);
      if (opts?.searchFilter) q.searchFilter = opts.searchFilter;
      return client.request<any>("GET", `/phone-system/numbers`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async listPhoneNumbers(locationId?: string) {
      return client.request<any>("GET", `/phone-system/numbers/location/${locationId || client.locationId}`, {
        version: "2021-07-28",
      });
    },

    async getPhoneNumber(phoneNumberId: string) {
      return client.request<any>("GET", `/phone-system/numbers/${phoneNumberId}`, {
        version: "2021-07-28",
      });
    },

    async purchasePhoneNumber(data: any) {
      return client.request<any>("POST", `/phone-system/numbers`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deletePhoneNumber(phoneNumberId: string) {
      return client.request<any>("DELETE", `/phone-system/numbers/${phoneNumberId}`, {
        version: "2021-07-28",
      });
    },

    async releasePhoneNumber(phoneNumberId: string) {
      return client.request<any>("DELETE", `/phone-system/numbers/${phoneNumberId}`, {
        version: "2021-07-28",
      });
    },

    async updatePhoneNumber(phoneNumberId: string, data: any) {
      return client.request<any>("PUT", `/phone-system/numbers/${phoneNumberId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== PRODUCTS ==========

    async listProducts(locationId?: string, opts?: { limit?: any; skip?: any; offset?: any; status?: string; search?: string }) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (opts?.limit) q.limit = String(opts.limit);
      if (opts?.skip) q.skip = String(opts.skip);
      if (opts?.offset) q.offset = String(opts.offset);
      if (opts?.status) q.status = opts.status;
      if (opts?.search) q.search = opts.search;
      return client.request<{ products: any[]; total?: number }>("GET", `/products/`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getProduct(productId: string) {
      return client.request<{ product: any }>("GET", `/products/${productId}`, {
        version: "2021-07-28",
      });
    },

    async createProduct(data: any) {
      return client.request<{ product: any }>("POST", `/products/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async updateProduct(productId: string, data: any) {
      return client.request<{ product: any }>("PUT", `/products/${productId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteProduct(productId: string) {
      return client.request<any>("DELETE", `/products/${productId}`, {
        version: "2021-07-28",
      });
    },

    async listProductPrices(productId: string, opts?: { limit?: string; offset?: string }) {
      const q: Record<string, string> = {};
      if (opts?.limit) q.limit = opts.limit;
      if (opts?.offset) q.offset = opts.offset;
      return client.request<{ prices: any[] }>("GET", `/products/${productId}/price`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async deleteProductPrice(productId: string, priceId: string) {
      return client.request<any>("DELETE", `/products/${productId}/price/${priceId}`, {
        version: "2021-07-28",
      });
    },

    async listProductCollections(locationId?: string) {
      return client.request<any>("GET", `/products/collections`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async createProductCollection(data: any) {
      return client.request<any>("POST", `/products/collections`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async deleteProductCollection(collectionId: string) {
      return client.request<any>("DELETE", `/products/collections/${collectionId}`, {
        version: "2021-07-28",
      });
    },

    async listProductReviews(locationId?: string) {
      return client.request<any>("GET", `/products/reviews`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async getProductInventory(locationId?: string) {
      return client.request<any>("GET", `/products/inventory`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    // ========== CUSTOM OBJECTS ==========

    async listCustomObjects(locationId?: string) {
      return client.request<any>("GET", `/objects/`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async getObjectRecord(schemaKey: string, recordId: string) {
      return client.request<any>("GET", `/objects/${schemaKey}/records/${recordId}`, {
        version: "2021-07-28",
      });
    },

    async createObjectRecord(schemaKey: string, data: any) {
      return client.request<any>("POST", `/objects/${schemaKey}/records`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async updateObjectRecord(schemaKey: string, recordId: string, data: any) {
      return client.request<any>("PUT", `/objects/${schemaKey}/records/${recordId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteObjectRecord(schemaKey: string, recordId: string) {
      return client.request<any>("DELETE", `/objects/${schemaKey}/records/${recordId}`, {
        version: "2021-07-28",
      });
    },

    async searchObjectRecords(schemaKey: string, opts: { locationId?: string; page?: number; pageLimit?: number; query: string; searchAfter?: any[] }) {
      return client.request<any>("POST", `/objects/${schemaKey}/records/search`, {
        body: { ...opts, locationId: opts.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    // ========== CONVERSATIONS (misc overflow) ==========

    async deleteConversation(conversationId: string) {
      return client.request<any>("DELETE", `/conversations/${conversationId}`, {
        version: "2021-07-28",
      });
    },

    async addInboundMessage(body: any) {
      return client.request<any>("POST", `/conversations/messages/inbound`, {
        body,
        version: "2021-07-28",
      });
    },

    async getEmailMessage(emailId: string) {
      return client.request<any>("GET", `/conversations/messages/email/${emailId}`, {
        version: "2021-07-28",
      });
    },

    async updateMessageStatus(messageId: string, body: any) {
      return client.request<any>("PUT", `/conversations/messages/${messageId}/status`, {
        body,
        version: "2021-07-28",
      });
    },

    // ========== FUNNEL REDIRECTS ==========

    async listRedirects(locationId?: string) {
      return client.request<any>("GET", `/funnels/redirect`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async createRedirect(body: any) {
      return client.request<any>("POST", `/funnels/redirect`, {
        body: { ...body, locationId: body.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async deleteRedirect(redirectId: string) {
      return client.request<any>("DELETE", `/funnels/redirect/${redirectId}`, {
        version: "2021-07-28",
      });
    },

    // ========== ASSOCIATIONS EXPANDED ==========

    async getAssociationByObjectKey(objectKey: string) {
      return client.request<any>("GET", `/associations/objectKey/${objectKey}`, {
        version: "2021-07-28",
      });
    },

    async createRelation(data: any) {
      return client.request<any>("POST", `/associations/relations`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async getRelations(recordId: string) {
      return client.request<any>("GET", `/associations/relations/${recordId}`, {
        version: "2021-07-28",
      });
    },

    async deleteRelation(relationId: string) {
      return client.request<any>("DELETE", `/associations/relations/${relationId}`, {
        version: "2021-07-28",
      });
    },

    // ========== CUSTOM OBJECTS SCHEMA ==========

    async createCustomObject(data: any) {
      return client.request<any>("POST", `/objects/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async getObjectSchema(key: string) {
      return client.request<any>("GET", `/objects/${key}`, {
        version: "2021-07-28",
      });
    },

    async updateObjectSchema(key: string, data: any) {
      return client.request<any>("PUT", `/objects/${key}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== PRODUCT PRICES ==========

    async createProductPrice(productId: string, data: any) {
      return client.request<any>("POST", `/products/${productId}/price`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async getProductPrice(productId: string, priceId: string) {
      return client.request<any>("GET", `/products/${productId}/price/${priceId}`, {
        version: "2021-07-28",
      });
    },

    async updateProductPrice(productId: string, priceId: string, data: any) {
      return client.request<any>("PUT", `/products/${productId}/price/${priceId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== COURSES ==========

    async importCourse(data: any) {
      return client.request<any>("POST", `/courses/courses-exporter/public/import`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== PRODUCT REVIEWS (expanded) ==========

    async updateProductReview(reviewId: string, data: any, locationId?: string) {
      return client.request<any>("PUT", `/products/reviews/${reviewId}`, {
        query: { locationId: locationId || client.locationId },
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteProductReview(reviewId: string, locationId?: string) {
      return client.request<any>("DELETE", `/products/reviews/${reviewId}`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async bulkUpdateReviews(data: any) {
      return client.request<any>("POST", `/products/reviews/bulk-update`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async getReviewCount(productId: string, locationId?: string) {
      return client.request<any>("GET", `/products/reviews/count`, {
        query: { productId, locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    // ========== PRODUCT BULK ==========

    async bulkUpdateProducts(data: any) {
      return client.request<any>("POST", `/products/bulk-update`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async bulkEditProducts(data: any) {
      return client.request<any>("PUT", `/products/bulk-edit`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== STORE INTEGRATION ==========

    async addProductToStore(storeId: string, data: any) {
      return client.request<any>("POST", `/products/store/${storeId}/add`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async updateProductPriority(storeId: string, data: any) {
      return client.request<any>("PUT", `/products/store/${storeId}/priority`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async getProductStoreStats(storeId: string, locationId?: string) {
      return client.request<any>("GET", `/products/store/${storeId}/stats`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    // ========== INVENTORY (update) ==========

    async updateProductInventory(data: any) {
      return client.request<any>("PATCH", `/products/inventory`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== PRODUCT PRICES (by locationId) ==========

    async listProductPricesByLocation(productId: string, locationId?: string) {
      return client.request<{ prices: any[] }>("GET", `/products/${productId}/prices`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    // ========== BRAND BOARDS ==========

    async listBrandBoards(locationId: string) {
      return client.request<any>("GET", `/brand-boards`, {
        query: { locationId },
        version: "2021-07-28",
      });
    },

    async createBrandBoard(data: any) {
      return client.request<any>("POST", `/brand-boards`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async getBrandBoard(brandBoardId: string, locationId: string) {
      return client.request<any>("GET", `/brand-boards/${brandBoardId}`, {
        query: { locationId },
        version: "2021-07-28",
      });
    },

    async updateBrandBoard(brandBoardId: string, data: any) {
      return client.request<any>("PUT", `/brand-boards/${brandBoardId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteBrandBoard(brandBoardId: string, locationId: string) {
      return client.request<any>("DELETE", `/brand-boards/${brandBoardId}`, {
        query: { locationId },
        version: "2021-07-28",
      });
    },
  };
}
