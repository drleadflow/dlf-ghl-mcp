import { BaseGHLClient } from "./base";

export function knowledgeBaseMethods(client: BaseGHLClient) {
  return {
    // ========== KNOWLEDGE BASES ==========

    async listKnowledgeBases(locationId?: string) {
      return client.request<any>("GET", `/knowledge-base/`, {
        query: { locationId: locationId || client.locationId },
        version: "2021-04-15",
      });
    },

    async createKnowledgeBase(data: any) {
      return client.request<any>("POST", `/knowledge-base/`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async getKnowledgeBase(kbId: string) {
      return client.request<any>("GET", `/knowledge-base/${kbId}`, {
        version: "2021-04-15",
      });
    },

    async updateKnowledgeBase(kbId: string, data: any) {
      return client.request<any>("PUT", `/knowledge-base/${kbId}`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async deleteKnowledgeBase(kbId: string) {
      return client.request<any>("DELETE", `/knowledge-base/${kbId}`, {
        version: "2021-04-15",
      });
    },

    // ========== FAQs ==========

    async listFAQs(kbId: string) {
      return client.request<any>("GET", `/knowledge-base/${kbId}/faqs`, {
        version: "2021-04-15",
      });
    },

    async createFAQ(kbId: string, data: any) {
      return client.request<any>("POST", `/knowledge-base/${kbId}/faqs`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async updateFAQ(kbId: string, faqId: string, data: any) {
      return client.request<any>("PUT", `/knowledge-base/${kbId}/faqs/${faqId}`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async deleteFAQ(kbId: string, faqId: string) {
      return client.request<any>("DELETE", `/knowledge-base/${kbId}/faqs/${faqId}`, {
        version: "2021-04-15",
      });
    },

    // ========== CRAWLERS ==========

    async listCrawlers(knowledgeBaseId: string) {
      return client.request<any>("GET", `/knowledge-base/${knowledgeBaseId}/crawlers`, {
        version: "2021-04-15",
      });
    },

    async createCrawler(knowledgeBaseId: string, data: any) {
      return client.request<any>("POST", `/knowledge-base/${knowledgeBaseId}/crawlers`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async getCrawler(knowledgeBaseId: string, crawlerId: string) {
      return client.request<any>("GET", `/knowledge-base/${knowledgeBaseId}/crawlers/${crawlerId}`, {
        version: "2021-04-15",
      });
    },

    async updateCrawler(knowledgeBaseId: string, crawlerId: string, data: any) {
      return client.request<any>("PUT", `/knowledge-base/${knowledgeBaseId}/crawlers/${crawlerId}`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async deleteCrawler(knowledgeBaseId: string, crawlerId: string) {
      return client.request<any>("DELETE", `/knowledge-base/${knowledgeBaseId}/crawlers/${crawlerId}`, {
        version: "2021-04-15",
      });
    },
  };
}
