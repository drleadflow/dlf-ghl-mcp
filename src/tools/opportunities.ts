import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerOpportunitiesTools(server: McpServer, env: Env) {
  server.tool(
    "ghl_search_opportunities",
    "Search opportunities with optional filters: pipelineId, pipelineStageId, contactId, status, search text.",
    {
      pipelineId: z.string().optional().describe("Filter by pipeline ID"),
      pipelineStageId: z.string().optional().describe("Filter by pipeline stage ID"),
      contactId: z.string().optional().describe("Filter by contact ID"),
      status: z.string().optional().describe("Filter by status"),
      q: z.string().optional().describe("Search text"),
      limit: z.string().optional().describe("Max results"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ pipelineId, pipelineStageId, contactId, status, q, limit, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.opportunities.searchOpportunities({
          locationId,
          pipelineId,
          pipelineStageId,
          contactId,
          status,
          q,
          limit,
        });
        const opps = result.opportunities || [];
        if (opps.length === 0) return ok("No opportunities found.");
        const summary = opps.map((o: any) => ({
          id: o.id,
          name: o.name,
          value: o.value,
          status: o.status,
          pipelineId: o.pipelineId,
          pipelineStageId: o.pipelineStageId,
          contactId: o.contactId,
          createdAt: o.createdAt,
        }));
        return ok(`${opps.length} opportunity(ies):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_opportunity",
    "Get full details for a specific opportunity by ID.",
    { opportunityId: z.string().describe("Opportunity ID") },
    async ({ opportunityId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.opportunities.getOpportunity(opportunityId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_opportunity",
    "Create a new sales opportunity.",
    {
      name: z.string().describe("Opportunity name"),
      value: z.number().optional().describe("Deal value"),
      pipelineId: z.string().describe("Pipeline ID"),
      pipelineStageId: z.string().describe("Pipeline stage ID"),
      contactId: z.string().optional().describe("Associated contact ID"),
      status: z.string().optional().describe("Status"),
      locationId: z.string().optional().describe("Target location"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env, args.locationId);
        const result = await client.opportunities.createOpportunity(args);
        return ok(`Opportunity created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_opportunity",
    "Update an existing opportunity.",
    {
      opportunityId: z.string().describe("Opportunity ID"),
      name: z.string().optional(),
      value: z.number().optional(),
      status: z.string().optional(),
      pipelineStageId: z.string().optional(),
    },
    async ({ opportunityId, ...data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.opportunities.updateOpportunity(opportunityId, data);
        return ok(`Opportunity updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_opportunity",
    "Delete an opportunity by ID.",
    { opportunityId: z.string().describe("Opportunity ID") },
    async ({ opportunityId }) => {
      try {
        const client = await resolveClient(env);
        await client.opportunities.deleteOpportunity(opportunityId);
        return ok(`Opportunity ${opportunityId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_opportunity_status",
    "Update the status of an opportunity.",
    {
      opportunityId: z.string().describe("Opportunity ID"),
      status: z.string().describe("New status"),
    },
    async ({ opportunityId, status }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.opportunities.updateOpportunityStatus(opportunityId, status);
        return ok(`Opportunity status updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_pipelines",
    "List all sales pipelines in a location.",
    { locationId: z.string().optional().describe("Target location") },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.opportunities.listPipelines(locationId);
        const pipelines = result.pipelines || [];
        const summary = pipelines.map((p: any) => ({
          id: p.id,
          name: p.name,
          stages: p.stages?.length || 0,
          archived: p.archived,
        }));
        return ok(`${pipelines.length} pipeline(s):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_pipeline",
    "Get full details for a specific pipeline including its stages.",
    {
      pipelineId: z.string().describe("Pipeline ID"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ pipelineId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.opportunities.getPipeline(pipelineId, locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== PIPELINE MANAGEMENT ==========

  server.tool(
    "ghl_create_pipeline",
    "Create a new sales pipeline.",
    {
      name: z.string().describe("Pipeline name"),
      stages: z.array(z.record(z.any())).optional().describe("Pipeline stages"),
      locationId: z.string().optional().describe("Target location"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env, args.locationId);
        const result = await client.opportunities.createPipeline(args);
        return ok(`Pipeline created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_pipeline",
    "Update an existing pipeline.",
    {
      pipelineId: z.string().describe("Pipeline ID"),
      name: z.string().optional().describe("Updated pipeline name"),
      stages: z.array(z.record(z.any())).optional().describe("Updated pipeline stages"),
      data: z.record(z.any()).optional().describe("Additional pipeline data"),
    },
    async ({ pipelineId, ...data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.opportunities.updatePipeline(pipelineId, data);
        return ok(`Pipeline updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_pipeline",
    "Delete a pipeline by ID. WARNING: This cannot be undone.",
    {
      pipelineId: z.string().describe("Pipeline ID"),
    },
    async ({ pipelineId }) => {
      try {
        const client = await resolveClient(env);
        await client.opportunities.deletePipeline(pipelineId);
        return ok(`Pipeline ${pipelineId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== UPSERT OPPORTUNITY ==========

  server.tool(
    "ghl_upsert_opportunity",
    "Create or update an opportunity. Matches by pipeline and contact — creates if not found, updates if found.",
    {
      name: z.string().describe("Opportunity name"),
      pipelineId: z.string().describe("Pipeline ID"),
      pipelineStageId: z.string().describe("Pipeline stage ID"),
      contactId: z.string().optional().describe("Associated contact ID"),
      value: z.number().optional().describe("Deal value"),
      status: z.string().optional().describe("Status"),
      locationId: z.string().optional().describe("Target location"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env, args.locationId);
        const result = await client.opportunities.upsertOpportunity(args);
        return ok(`Opportunity upserted!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== OPPORTUNITY FOLLOWERS ==========

  server.tool(
    "ghl_add_opportunity_followers",
    "Add followers to an opportunity.",
    {
      opportunityId: z.string().describe("Opportunity ID"),
      followers: z.array(z.string()).describe("User IDs to add as followers"),
    },
    async ({ opportunityId, followers }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.opportunities.addOpportunityFollowers(opportunityId, { followers });
        return ok(`Followers added!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_remove_opportunity_followers",
    "Remove followers from an opportunity.",
    {
      opportunityId: z.string().describe("Opportunity ID"),
      followers: z.array(z.string()).describe("User IDs to remove as followers"),
    },
    async ({ opportunityId, followers }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.opportunities.removeOpportunityFollowers(opportunityId, { followers });
        return ok(`Followers removed!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
