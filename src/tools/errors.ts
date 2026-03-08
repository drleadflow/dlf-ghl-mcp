import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err } from "./_helpers";
import { initErrorsDb, listErrors, clearError, clearAllErrors } from "../db/errors";

export function registerErrorTools(server: McpServer, env: Env) {
  server.tool(
    "ghl_list_errors",
    `List recent unresolved MCP tool errors captured from the auto-error-capture middleware.
Returns tool name, error text, args, and timestamp for each unresolved error.`,
    {
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .default(50)
        .optional()
        .describe("Max errors to return (default 50)"),
    },
    async ({ limit }) => {
      try {
        await initErrorsDb(env.GHL_DB);
        const errors = await listErrors(env.GHL_DB, limit ?? 50);
        if (errors.length === 0) {
          return ok("No unresolved errors.");
        }
        return ok(
          `${errors.length} unresolved error(s):\n\n${JSON.stringify(errors, null, 2)}`
        );
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_clear_errors",
    `Mark MCP error(s) as resolved.
Pass a specific error ID to resolve one, or set clearAll=true to resolve all unresolved errors.`,
    {
      id: z.string().optional().describe("Error ID to resolve"),
      clearAll: z
        .boolean()
        .default(false)
        .optional()
        .describe("Set true to resolve all unresolved errors"),
    },
    async ({ id, clearAll }) => {
      try {
        await initErrorsDb(env.GHL_DB);
        if (clearAll) {
          await clearAllErrors(env.GHL_DB);
          return ok("All unresolved errors marked as resolved.");
        }
        if (!id) return err({ message: "Provide an error ID or set clearAll=true." });
        await clearError(env.GHL_DB, id);
        return ok(`Error ${id} marked as resolved.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
