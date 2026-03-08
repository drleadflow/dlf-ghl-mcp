import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerKnowledgeBaseTools(server: McpServer, env: Env) {
  // ========== KNOWLEDGE BASES ==========

  server.tool(
    "ghl_kb_list",
    "List knowledge bases for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.knowledgeBase.listKnowledgeBases(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_create",
    "Create a new knowledge base.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.createKnowledgeBase(data);
        return ok(`Knowledge base created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_get",
    "Get a knowledge base by ID.",
    {
      kbId: z.string(),
    },
    async ({ kbId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.getKnowledgeBase(kbId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_update",
    "Update a knowledge base.",
    {
      kbId: z.string(),
      data: z.record(z.any()),
    },
    async ({ kbId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.updateKnowledgeBase(kbId, data);
        return ok(`Knowledge base updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_delete",
    "Delete a knowledge base.",
    {
      kbId: z.string(),
    },
    async ({ kbId }) => {
      try {
        const client = await resolveClient(env);
        await client.knowledgeBase.deleteKnowledgeBase(kbId);
        return ok(`Knowledge base ${kbId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== FAQs ==========

  server.tool(
    "ghl_kb_list_faqs",
    "List FAQs for a knowledge base.",
    {
      kbId: z.string(),
    },
    async ({ kbId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.listFAQs(kbId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_create_faq",
    "Create a FAQ in a knowledge base.",
    {
      kbId: z.string(),
      data: z.record(z.any()),
    },
    async ({ kbId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.createFAQ(kbId, data);
        return ok(`FAQ created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_update_faq",
    "Update a FAQ in a knowledge base.",
    {
      kbId: z.string(),
      faqId: z.string(),
      data: z.record(z.any()),
    },
    async ({ kbId, faqId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.updateFAQ(kbId, faqId, data);
        return ok(`FAQ updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_delete_faq",
    "Delete a FAQ from a knowledge base.",
    {
      kbId: z.string(),
      faqId: z.string(),
    },
    async ({ kbId, faqId }) => {
      try {
        const client = await resolveClient(env);
        await client.knowledgeBase.deleteFAQ(kbId, faqId);
        return ok(`FAQ ${faqId} deleted from knowledge base ${kbId}.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CRAWLERS ==========

  server.tool(
    "ghl_kb_list_crawlers",
    "List crawlers for a knowledge base.",
    {
      knowledgeBaseId: z.string(),
    },
    async ({ knowledgeBaseId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.listCrawlers(knowledgeBaseId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_create_crawler",
    "Create a crawler for a knowledge base.",
    {
      knowledgeBaseId: z.string(),
      data: z.record(z.any()),
    },
    async ({ knowledgeBaseId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.createCrawler(knowledgeBaseId, data);
        return ok(`Crawler created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_get_crawler",
    "Get a crawler by ID.",
    {
      knowledgeBaseId: z.string(),
      crawlerId: z.string(),
    },
    async ({ knowledgeBaseId, crawlerId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.getCrawler(knowledgeBaseId, crawlerId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_update_crawler",
    "Update a crawler for a knowledge base.",
    {
      knowledgeBaseId: z.string(),
      crawlerId: z.string(),
      data: z.record(z.any()),
    },
    async ({ knowledgeBaseId, crawlerId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.knowledgeBase.updateCrawler(knowledgeBaseId, crawlerId, data);
        return ok(`Crawler updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_kb_delete_crawler",
    "Delete a crawler from a knowledge base.",
    {
      knowledgeBaseId: z.string(),
      crawlerId: z.string(),
    },
    async ({ knowledgeBaseId, crawlerId }) => {
      try {
        const client = await resolveClient(env);
        await client.knowledgeBase.deleteCrawler(knowledgeBaseId, crawlerId);
        return ok(`Crawler ${crawlerId} deleted from knowledge base ${knowledgeBaseId}.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
