import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerBusinessesTools(server: McpServer, env: Env) {
  server.tool(
    "ghl_list_businesses_v2",
    "List businesses for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.businesses.listBusinesses(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_business",
    "Create a new business.",
    {
      data: z.record(z.any()),
    },
    async ({ data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.businesses.createBusiness(data);
        return ok(`Business created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_business",
    "Get a business by ID.",
    {
      businessId: z.string(),
    },
    async ({ businessId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.businesses.getBusiness(businessId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_business",
    "Update a business.",
    {
      businessId: z.string(),
      data: z.record(z.any()),
    },
    async ({ businessId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.businesses.updateBusiness(businessId, data);
        return ok(`Business updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_business",
    "Delete a business.",
    {
      businessId: z.string(),
    },
    async ({ businessId }) => {
      try {
        const client = await resolveClient(env);
        await client.businesses.deleteBusiness(businessId);
        return ok(`Business ${businessId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
