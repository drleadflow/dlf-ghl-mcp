import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerAIAgentsTools(server: McpServer, env: Env) {
  // ========== VOICE AI AGENTS ==========

  server.tool(
    "ghl_list_voice_agents",
    "List all Voice AI agents for a location.",
    {
      locationId: z.string().optional(),
      page: z.number().optional(),
      pageSize: z.number().optional(),
      query: z.string().optional(),
    },
    async ({ locationId, page, pageSize, query }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.listVoiceAgents(locationId || client.locationId, {
          page: page != null ? String(page) : undefined,
          pageSize: pageSize != null ? String(pageSize) : undefined,
          query,
        });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_voice_agent",
    "Get a Voice AI agent by ID.",
    {
      agentId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ agentId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.getVoiceAgent(agentId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_voice_agent",
    "Create a new Voice AI agent.",
    {
      locationId: z.string().optional(),
      agentName: z.string(),
      businessName: z.string().optional(),
      welcomeMessage: z.string().optional(),
      agentPrompt: z.string().optional(),
      voiceId: z.string().optional(),
      language: z.string().optional(),
      patienceLevel: z.string().optional(),
      maxCallDuration: z.number().optional(),
    },
    async ({ locationId, agentName, businessName, welcomeMessage, agentPrompt, voiceId, language, patienceLevel, maxCallDuration }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.createVoiceAgent({
          agentName,
          businessName,
          welcomeMessage,
          agentPrompt,
          voiceId,
          language,
          patienceLevel,
          maxCallDuration,
          locationId: locationId || client.locationId,
        });
        return ok(`Voice agent created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_voice_agent",
    "Update a Voice AI agent.",
    {
      agentId: z.string(),
      locationId: z.string().optional(),
      body: z.record(z.any()),
    },
    async ({ agentId, locationId, body }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.updateVoiceAgent(
          agentId,
          locationId || client.locationId,
          body
        );
        return ok(`Voice agent updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_voice_agent",
    "Delete a Voice AI agent.",
    {
      agentId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ agentId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.aiAgents.deleteVoiceAgent(agentId, locationId || client.locationId);
        return ok(`Voice agent ${agentId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_voice_action",
    "Create an action for a Voice AI agent.",
    {
      agentId: z.string(),
      locationId: z.string().optional(),
      actionType: z.string(),
      name: z.string(),
      actionParameters: z.record(z.any()),
    },
    async ({ agentId, locationId, actionType, name, actionParameters }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.createVoiceAction({
          agentId,
          locationId: locationId || client.locationId,
          actionType,
          name,
          actionParameters,
        });
        return ok(`Voice action created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_voice_action",
    "Get a Voice AI agent action.",
    {
      actionId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ actionId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.getVoiceAction(actionId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_voice_action",
    "Update a Voice AI agent action.",
    {
      actionId: z.string(),
      agentId: z.string(),
      locationId: z.string().optional(),
      actionType: z.string(),
      name: z.string(),
      actionParameters: z.record(z.any()),
    },
    async ({ actionId, agentId, locationId, actionType, name, actionParameters }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.updateVoiceAction(actionId, {
          agentId,
          locationId: locationId || client.locationId,
          actionType,
          name,
          actionParameters,
        });
        return ok(`Voice action updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_voice_action",
    "Delete a Voice AI agent action.",
    {
      actionId: z.string(),
      locationId: z.string().optional(),
      agentId: z.string(),
    },
    async ({ actionId, locationId, agentId }) => {
      try {
        const client = await resolveClient(env, locationId);
        await client.aiAgents.deleteVoiceAction(actionId, locationId || client.locationId, agentId);
        return ok(`Voice action ${actionId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_call_logs",
    "List Voice AI call logs.",
    {
      locationId: z.string().optional(),
      agentId: z.string().optional(),
      contactId: z.string().optional(),
      callType: z.string().optional(),
      startDate: z.number().optional(),
      endDate: z.number().optional(),
      page: z.number().optional(),
      pageSize: z.number().optional(),
    },
    async ({ locationId, agentId, contactId, callType, startDate, endDate, page, pageSize }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.listCallLogs(locationId || client.locationId, {
          agentId,
          contactId,
          callType,
          startDate: startDate != null ? String(startDate) : undefined,
          endDate: endDate != null ? String(endDate) : undefined,
          page: page != null ? String(page) : undefined,
          pageSize: pageSize != null ? String(pageSize) : undefined,
        });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_call_log",
    "Get a specific Voice AI call log.",
    {
      callId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ callId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.getCallLog(callId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CONVERSATION AI AGENTS ==========

  server.tool(
    "ghl_search_conversation_agents",
    "Search Conversation AI agents (text-based agents for SMS, Live Chat, WhatsApp, Instagram, Facebook, WebChat).",
    {
      query: z.string().optional().describe("Search query to filter agents by name"),
      startAfter: z.string().optional().describe("Cursor for pagination"),
      limit: z.string().optional().describe("Number of results to return"),
    },
    async ({ query, startAfter, limit }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.searchConversationAgents({ query, startAfter, limit });
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_conversation_agent",
    "Get a Conversation AI agent by ID.",
    {
      agentId: z.string().describe("The conversation agent ID"),
    },
    async ({ agentId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.getConversationAgent(agentId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_conversation_agent",
    "Create a new Conversation AI agent (text-based agent for SMS, Live Chat, WhatsApp, etc). Requires name, personality, goal, and instructions.",
    {
      name: z.string().describe("Agent name"),
      personality: z.string().describe("Agent personality description"),
      goal: z.string().describe("Agent goal"),
      instructions: z.string().describe("Agent instructions"),
      businessName: z.string().optional().describe("Business name"),
      mode: z.enum(["off", "suggestive", "auto-pilot"]).optional().describe("Agent mode"),
      channels: z
        .array(z.enum(["IG", "FB", "SMS", "WebChat", "WhatsApp", "Live_Chat"]))
        .optional()
        .describe("Channels the agent operates on"),
      isPrimary: z.boolean().optional().describe("Whether this is the primary agent"),
      waitTime: z.number().optional().describe("Wait time before responding"),
      waitTimeUnit: z.string().optional().describe("Wait time unit (seconds/minutes)"),
      sleepEnabled: z.boolean().optional().describe("Enable sleep mode"),
      sleepTime: z.number().optional().describe("Sleep time value"),
      sleepTimeUnit: z.string().optional().describe("Sleep time unit"),
      autoPilotMaxMessages: z.number().optional().describe("Max messages in auto-pilot mode"),
      knowledgeBaseIds: z.array(z.string()).optional().describe("Knowledge base IDs to attach"),
      respondToImages: z.boolean().optional().describe("Whether agent can respond to images"),
      respondToAudio: z.boolean().optional().describe("Whether agent can respond to audio"),
    },
    async (params) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.createConversationAgent(params);
        return ok(`Conversation AI agent created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_conversation_agent",
    "Update a Conversation AI agent (uses PUT - send all fields you want to keep).",
    {
      agentId: z.string().describe("The conversation agent ID to update"),
      name: z.string().optional().describe("Agent name"),
      personality: z.string().optional().describe("Agent personality description"),
      goal: z.string().optional().describe("Agent goal"),
      instructions: z.string().optional().describe("Agent instructions"),
      businessName: z.string().optional().describe("Business name"),
      mode: z.enum(["off", "suggestive", "auto-pilot"]).optional().describe("Agent mode"),
      channels: z
        .array(z.enum(["IG", "FB", "SMS", "WebChat", "WhatsApp", "Live_Chat"]))
        .optional()
        .describe("Channels"),
      isPrimary: z.boolean().optional().describe("Whether this is the primary agent"),
      waitTime: z.number().optional().describe("Wait time before responding"),
      waitTimeUnit: z.string().optional().describe("Wait time unit"),
      sleepEnabled: z.boolean().optional().describe("Enable sleep mode"),
      sleepTime: z.number().optional().describe("Sleep time value"),
      sleepTimeUnit: z.string().optional().describe("Sleep time unit"),
      autoPilotMaxMessages: z.number().optional().describe("Max messages in auto-pilot mode"),
      knowledgeBaseIds: z.array(z.string()).optional().describe("Knowledge base IDs"),
      respondToImages: z.boolean().optional().describe("Whether agent can respond to images"),
      respondToAudio: z.boolean().optional().describe("Whether agent can respond to audio"),
    },
    async ({ agentId, ...data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.updateConversationAgent(agentId, data);
        return ok(`Conversation AI agent updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_conversation_agent",
    "Delete a Conversation AI agent.",
    {
      agentId: z.string().describe("The conversation agent ID to delete"),
    },
    async ({ agentId }) => {
      try {
        const client = await resolveClient(env);
        await client.aiAgents.deleteConversationAgent(agentId);
        return ok(`Conversation AI agent ${agentId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CONVERSATION AI ACTIONS ==========

  server.tool(
    "ghl_create_conversation_action",
    `Attach a new action to a Conversation AI agent.

CRITICAL: actionParameters MUST contain a top-level "name" string AND a "details" object. All action-specific config goes inside "details". Do NOT put action fields (calendarId, workflowId, etc.) flat at the top level of actionParameters.

Body sent to GHL API: { type, name, details: {...} }

--- ACTION TYPE SCHEMAS ---

appointmentBooking:
  { name: "Appointment Booking Action", details: { calendarId: "<id>", calendarActionType: "single", onlySendLink: false, triggerWorkflow: false, sleepAfterBooking: true, sleepTimeUnit: "days", sleepTime: 2, transferBot: false, rescheduleEnabled: true, cancelEnabled: true } }
  WARNING: Do NOT include transferEmployee (even as null) — omit the field entirely or the API returns 422.

stopBot:
  { name: "Goodbye Detection", details: { stopBotExamples: ["Bye","Goodbye","Not interested"], stopBotDetectionType: "Goodbye", stopBotTriggerCondition: "When the contact says goodbye", finalMessage: "Thank you, have a nice day.", enabled: true, reactivateEnabled: true, sleepTimeUnit: "hours", sleepTime: 24, tags: ["stop bot"] } }

humanHandOver:
  { name: "Failed to resolve issue", details: { enabled: true, triggerCondition: "Multiple attempts to resolve the issue has failed", examples: [], assignToUserId: "<userId>", skipAssignToUser: true, createTask: true, finalMessage: "I've escalated this to the team.", reactivateEnabled: false, sleepTimeUnit: null, sleepTime: null, tags: ["human handover"], handoverType: "failedToResolveIssue" } }
  WARNING: assignToUserId is REQUIRED even when skipAssignToUser is true. Omitting it causes a 400 error. handoverType options: "failedToResolveIssue" | "lackOfInformation"

updateContactField:
  { name: "Revenue", details: { contactFieldId: "<fieldId>", description: "Current revenue range", contactUpdateExamples: ["Under 100k a year", "1 million a year"] } }

advancedFollowup — contactStoppedReplying:
  { name: "Contact Stopped Replying", details: { enabled: true, scenarioId: "contactStoppedReplying", followupSequence: [ { id: 1, aiEnabledMessage: true, triggerWorkflow: false, followupTime: 1, followupTimeUnit: "days", customMessage: null, workflowId: null }, { id: 2, aiEnabledMessage: true, triggerWorkflow: false, followupTime: 2, followupTimeUnit: "days", customMessage: "", workflowId: "" } ] } }

advancedFollowup — contactRequested:
  { name: "Contact Requested", details: { enabled: true, scenarioId: "contactRequested", followupSequence: [ { id: 1, aiEnabledMessage: true, triggerWorkflow: false, followupTime: 2, followupTimeUnit: "hours", customMessage: null, workflowId: null, contactRequested: true } ] } }

triggerWorkflow:
  { name: "Trigger Workflow", details: { workflowId: "<workflowId>" } }`,
    {
      agentId: z.string().describe("The conversation agent ID"),
      type: z.string().describe("Action type: triggerWorkflow, updateContactField, appointmentBooking, stopBot, humanHandOver, advancedFollowup, transferBot"),
      actionParameters: z.record(z.any()).optional().describe("Must contain top-level 'name' (string) and 'details' (object). All action-specific config goes inside 'details' — never flat at the top level of actionParameters."),
    },
    async ({ agentId, type, actionParameters }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.createConversationAction(agentId, { type, ...actionParameters });
        return ok(`Conversation action created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_list_conversation_actions",
    "List all actions attached to a Conversation AI agent (booking, workflows, contact field updates, etc.).",
    {
      agentId: z.string().describe("The conversation agent ID"),
    },
    async ({ agentId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.listConversationActions(agentId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_conversation_action",
    "Get details of a specific action on a Conversation AI agent (shows calendarId, workflowId, field mappings, etc.).",
    {
      agentId: z.string().describe("The conversation agent ID"),
      actionId: z.string().describe("The action ID"),
    },
    async ({ agentId, actionId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.getConversationAction(agentId, actionId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_conversation_action",
    `Update an action on a Conversation AI agent.

Same structure rules as ghl_create_conversation_action apply:
- actionParameters must contain top-level "name" and "details" — never put action fields flat at the top level.
- For appointmentBooking: omit transferEmployee entirely (null value causes 422).
- For humanHandOver: assignToUserId is required even when skipAssignToUser is true.
- Send the full details object — partial updates may overwrite existing fields.`,
    {
      agentId: z.string().describe("The conversation agent ID"),
      actionId: z.string().describe("The action ID to update"),
      type: z.string().optional().describe("Action type"),
      actionParameters: z.record(z.any()).optional().describe("Must contain top-level 'name' and 'details'. See ghl_create_conversation_action for full schemas per action type."),
    },
    async ({ agentId, actionId, type, actionParameters }) => {
      try {
        const client = await resolveClient(env);
        const data: any = {};
        if (type) data.type = type;
        if (actionParameters) Object.assign(data, actionParameters);
        const result = await client.aiAgents.updateConversationAction(agentId, actionId, data);
        return ok(`Conversation action updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_conversation_action",
    "Remove an action from a Conversation AI agent. This permanently deletes the action.",
    {
      agentId: z.string().describe("The conversation agent ID"),
      actionId: z.string().describe("The action ID to delete"),
    },
    async ({ agentId, actionId }) => {
      try {
        const client = await resolveClient(env);
        await client.aiAgents.deleteConversationAction(agentId, actionId);
        return ok(`Conversation action ${actionId} deleted from agent ${agentId}.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CONVERSATION AI FOLLOWUP SETTINGS ==========

  server.tool(
    "ghl_update_followup_settings",
    "Update followup settings for a Conversation AI agent (channel switching, working hours, timezone, availability).",
    {
      agentId: z.string().describe("The conversation agent ID"),
      settings: z.record(z.any()).describe("Followup settings object (dynamicChannelSwitching, respectWorkingHours, timezone, availabilityIntervals, etc.)"),
    },
    async ({ agentId, settings }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.updateFollowupSettings(agentId, settings);
        return ok(`Followup settings updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CONVERSATION AI GENERATIONS ==========

  server.tool(
    "ghl_get_conversation_generation",
    "Get details of how the AI generated a specific response (system prompt, knowledge base chunks, action logs, intent).",
    {
      messageId: z.string().describe("The message ID to inspect"),
      source: z.enum(["conversation", "workflow"]).optional().describe("Source context (conversation or workflow)"),
    },
    async ({ messageId, source }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.getConversationGeneration(messageId, source);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== AGENT STUDIO ==========

  server.tool(
    "ghl_list_agent_studio_agents",
    "List Agent Studio agents for a location.",
    {
      locationId: z.string().optional(),
    },
    async ({ locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.listAgentStudioAgents(locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_agent_studio_agent",
    "Get an Agent Studio agent by ID.",
    {
      agentId: z.string(),
      locationId: z.string().optional(),
    },
    async ({ agentId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.aiAgents.getAgentStudioAgent(agentId, locationId || client.locationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_execute_agent_studio_agent",
    "Execute an Agent Studio agent.",
    {
      agentId: z.string(),
      data: z.record(z.any()),
    },
    async ({ agentId, data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.aiAgents.executeAgentStudioAgent(agentId, data);
        return ok(`Agent executed!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
