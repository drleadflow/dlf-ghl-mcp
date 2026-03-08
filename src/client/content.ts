import { BaseGHLClient } from "./base";

export function contentMethods(client: BaseGHLClient) {
  return {
    // ========== BLOGS ==========

    async listBlogs(locationId?: string, skip?: string, limit?: string, searchTerm?: string) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (skip) q.skip = skip;
      if (limit) q.limit = limit;
      if (searchTerm) q.searchTerm = searchTerm;
      return client.request<any>("GET", `/blogs/site/all`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getBlog(blogId: string) {
      return client.request<any>("GET", `/blogs/${blogId}`, {
        version: "2021-07-28",
      });
    },

    async createBlog(data: any) {
      return client.request<any>("POST", `/blogs/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async updateBlog(blogId: string, data: any) {
      return client.request<any>("PUT", `/blogs/${blogId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteBlog(blogId: string) {
      return client.request<any>("DELETE", `/blogs/${blogId}`, {
        version: "2021-07-28",
      });
    },

    // ========== BLOG POSTS ==========

    async listBlogPosts(locationId?: string, blogId?: string, limit?: string, offset?: string, searchTerm?: string, status?: string) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (blogId) q.blogId = blogId;
      if (limit) q.limit = limit;
      if (offset) q.offset = offset;
      if (searchTerm) q.searchTerm = searchTerm;
      if (status) q.status = status;
      return client.request<any>("GET", `/blogs/posts/all`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getBlogPost(postId: string) {
      return client.request<any>("GET", `/blogs/posts/${postId}`, {
        version: "2021-07-28",
      });
    },

    async createBlogPost(data: any) {
      return client.request<any>("POST", `/blogs/posts`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async updateBlogPost(postId: string, data: any) {
      return client.request<any>("PUT", `/blogs/posts/${postId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteBlogPost(postId: string) {
      return client.request<any>("DELETE", `/blogs/posts/${postId}`, {
        version: "2021-07-28",
      });
    },

    async listBlogCategories(locationId?: string, limit?: string, offset?: string) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (limit) q.limit = limit;
      if (offset) q.offset = offset;
      return client.request<any>("GET", `/blogs/categories`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async listBlogAuthors(locationId?: string, limit?: string, offset?: string) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (limit) q.limit = limit;
      if (offset) q.offset = offset;
      return client.request<any>("GET", `/blogs/authors`, {
        query: q,
        version: "2021-07-28",
      });
    },

    // ========== MEDIA ==========

    async listMedia(opts?: { locationId?: string; limit?: string; offset?: string; sortBy?: string; sortOrder?: string; type?: string }) {
      const q: Record<string, string> = {
        altId: opts?.locationId || client.locationId,
        altType: "location",
      };
      if (opts?.limit) q.limit = opts.limit;
      if (opts?.offset) q.offset = opts.offset;
      if (opts?.sortBy) q.sortBy = opts.sortBy;
      if (opts?.sortOrder) q.sortOrder = opts.sortOrder;
      if (opts?.type) q.type = opts.type;
      return client.request<{ medias: any[]; total?: number }>("GET", `/medias/`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async uploadMedia(data: any) {
      return client.request<any>("POST", `/medias/upload-file`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async uploadFile(data: any) {
      return client.request<any>("POST", `/medias/upload-file`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async createFolder(data: any) {
      return client.request<any>("POST", `/medias/create-folder`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteMedia(mediaId: string, locationId?: string) {
      return client.request<any>("DELETE", `/medias/${mediaId}`, {
        query: { altId: locationId || client.locationId, altType: "location" },
        version: "2021-07-28",
      });
    },

    async bulkDeleteMedia(data: any) {
      return client.request<any>("POST", `/medias/bulk-delete`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== DOCUMENTS & CONTRACTS ==========

    async listDocuments(locationId?: string, params?: {
      status?: string; paymentStatus?: string; limit?: any; skip?: any; query?: string;
      dateFrom?: string; dateTo?: string;
    }) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (params?.status) q.status = params.status;
      if (params?.limit) q.limit = String(params.limit);
      if (params?.skip) q.skip = String(params.skip);
      if (params?.query) q.query = params.query;
      return client.request<any>("GET", `/proposals/document`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async listDocumentTemplates(locationId?: string, params?: {
      type?: string; name?: string; limit?: string; skip?: string;
    }) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (params?.type) q.type = params.type;
      if (params?.name) q.name = params.name;
      if (params?.limit) q.limit = params.limit;
      if (params?.skip) q.skip = params.skip;
      return client.request<any>("GET", `/proposals/document/templates`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async sendDocument(data: any) {
      return client.request<any>("POST", `/proposals/document/${data.documentId}/send`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async sendDocumentTemplate(data: any) {
      return client.request<any>("POST", `/proposals/document/template`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== CUSTOM MENUS ==========

    async listCustomMenus(locationId?: string, params?: { skip?: any; limit?: any; query?: string }) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (params?.skip) q.skip = String(params.skip);
      if (params?.limit) q.limit = String(params.limit);
      if (params?.query) q.query = params.query;
      return client.request<any>("GET", `/custom-menus/`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getCustomMenu(customMenuId: string) {
      return client.request<any>("GET", `/custom-menus/${customMenuId}`, {
        version: "2021-07-28",
      });
    },

    async createCustomMenu(data: any) {
      return client.request<any>("POST", `/custom-menus/`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async updateCustomMenu(customMenuId: string, data: any) {
      return client.request<any>("PUT", `/custom-menus/${customMenuId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteCustomMenu(customMenuId: string) {
      return client.request<any>("DELETE", `/custom-menus/${customMenuId}`, {
        version: "2021-07-28",
      });
    },

    // ========== SNAPSHOTS ==========

    async listSnapshots(companyId: string) {
      return client.request<any>("GET", `/snapshots/`, {
        query: { companyId },
        version: "2021-07-28",
      });
    },

    async getSnapshots(companyId: string) {
      return client.request<any>("GET", `/snapshots/`, {
        query: { companyId },
        version: "2021-07-28",
      });
    },

    async getSnapshot(snapshotId: string) {
      return client.request<any>("GET", `/snapshots/${snapshotId}`, {
        version: "2021-07-28",
      });
    },

    async createSnapshotShare(companyId: string, data: any) {
      return client.request<any>("POST", `/snapshots/share/link`, {
        query: { companyId },
        body: data,
        version: "2021-07-28",
      });
    },

    async createSnapshotShareLink(companyId: string, data: any) {
      return client.request<any>("POST", `/snapshots/share/link`, {
        query: { companyId },
        body: data,
        version: "2021-07-28",
      });
    },

    async getSnapshotPushStatus(snapshotId: string, companyId: string, from: string, to: string, lastDoc: string, limit: string) {
      return client.request<any>("GET", `/snapshots/${snapshotId}/push`, {
        query: { companyId, from, to, lastDoc, limit },
        version: "2021-07-28",
      });
    },

    async getLastSnapshotPush(snapshotId: string, locationId: string, companyId: string) {
      return client.request<any>("GET", `/snapshots/${snapshotId}/push/last`, {
        query: { locationId, companyId },
        version: "2021-07-28",
      });
    },

    // ========== TEMPLATES ==========

    async listTemplates(locationId?: string, opts?: { originId?: string; deleted?: string; type?: string }) {
      const locId = locationId || client.locationId;
      const q: Record<string, string> = {};
      if (opts?.originId) q.originId = opts.originId;
      if (opts?.deleted) q.deleted = opts.deleted;
      if (opts?.type) q.type = opts.type;
      return client.request<{ templates: any[] }>("GET", `/locations/${locId}/templates`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getTemplate(templateId: string) {
      return client.request<any>("GET", `/locations/${client.locationId}/templates/${templateId}`, {
        version: "2021-07-28",
      });
    },

    async createTemplate(data: any) {
      return client.request<any>("POST", `/locations/${client.locationId}/templates`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async updateTemplate(templateId: string, data: any) {
      return client.request<any>("PUT", `/locations/${client.locationId}/templates/${templateId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteTemplate(templateId: string) {
      return client.request<any>("DELETE", `/locations/${client.locationId}/templates/${templateId}`, {
        version: "2021-07-28",
      });
    },

    // ========== MEDIA EXPANDED ==========

    async updateMedia(mediaId: string, data: any) {
      return client.request<any>("POST", `/medias/${mediaId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async updateMediaFiles(data: any) {
      return client.request<any>("PUT", `/medias/update-files`, {
        body: data,
        version: "2021-07-28",
      });
    },

    // ========== BLOG URL SLUG ==========

    async checkUrlSlug(locationId?: string, urlSlug?: string) {
      const q: Record<string, string> = {};
      if (locationId) q.locationId = locationId;
      if (urlSlug) q.urlSlug = urlSlug;
      return client.request<any>("GET", `/blogs/posts/url-slug-exists`, {
        query: q,
        version: "2021-07-28",
      });
    },

    // ========== FUNNEL EXTRAS ==========

    async getFunnelPageCount(locationId?: string, funnelId?: string) {
      const q: Record<string, string> = {};
      if (locationId) q.locationId = locationId;
      if (funnelId) q.funnelId = funnelId;
      return client.request<any>("GET", `/funnels/page/count`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async updateRedirect(redirectId: string, data: any) {
      return client.request<any>("PATCH", `/funnels/lookup/redirect/${redirectId}`, {
        body: data,
        version: "2021-07-28",
      });
    },
  };
}
