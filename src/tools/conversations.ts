import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Env } from "../types";
import { ok, err, resolveClient } from "./_helpers";

export function registerConversationsTools(server: McpServer, env: Env) {
  server.tool(
    "ghl_search_conversations",
    "Search conversations in a location. Can filter by contact ID or text query.",
    {
      contactId: z.string().optional().describe("Filter by contact ID"),
      query: z.string().optional().describe("Text search query"),
      limit: z.string().optional().describe("Max results"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ contactId, query, limit, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.conversations.searchConversations(locationId, contactId, query, limit);
        const convos = result.conversations || [];
        if (convos.length === 0) return ok("No conversations found.");
        const summary = convos.map((c: any) => ({
          id: c.id,
          contactId: c.contactId,
          contactName: c.fullName || c.contactName || "N/A",
          lastMessageType: c.lastMessageType,
          lastMessageDate: c.lastMessageDate,
          unreadCount: c.unreadCount,
          type: c.type,
        }));
        return ok(`${convos.length} conversation(s):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_conversation",
    "Get full details for a specific conversation.",
    { conversationId: z.string().describe("Conversation ID") },
    async ({ conversationId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.getConversation(conversationId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_create_conversation",
    "Start a new conversation with a contact.",
    {
      contactId: z.string().describe("Contact ID to start conversation with"),
      locationId: z.string().optional().describe("Target location"),
    },
    async ({ contactId, locationId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.conversations.createConversation({ contactId, locationId });
        return ok(`Conversation created!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_conversation_messages",
    "Get messages in a conversation.",
    {
      conversationId: z.string().describe("Conversation ID"),
      limit: z.string().optional().describe("Max messages to return"),
    },
    async ({ conversationId, limit }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.getConversationMessages(conversationId, limit);
        // GHL nests messages: { messages: { messages: [...], lastMessageId, nextPage } }
        const wrapper = result.messages || {};
        const msgs = Array.isArray(wrapper) ? wrapper : (wrapper as any).messages || [];
        if (!Array.isArray(msgs) || msgs.length === 0) return ok("No messages in this conversation.");
        const summary = msgs.map((m: any) => ({
          id: m.id,
          direction: m.direction,
          type: m.type || m.messageType,
          body: m.body || m.message,
          dateAdded: m.dateAdded,
          status: m.status,
          contentType: m.contentType,
        }));
        return ok(`${msgs.length} message(s):\n\n${JSON.stringify(summary, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_send_message",
    `Send a message in a conversation. Supports SMS, Email, WhatsApp, etc.
For SMS: type="SMS", contactId, phone, message
For Email: type="Email", contactId, emailFrom, emailTo, subject, html or message`,
    {
      type: z.enum(["SMS", "Email", "WhatsApp", "GMB", "IG", "FB", "Custom", "Live_Chat"])
        .describe("Message channel type"),
      contactId: z.string().describe("Contact ID to message"),
      message: z.string().optional().describe("Message text (for SMS/WhatsApp/etc.)"),
      subject: z.string().optional().describe("Email subject"),
      html: z.string().optional().describe("Email HTML body"),
      emailFrom: z.string().optional().describe("From email address"),
      emailTo: z.string().optional().describe("To email address"),
      phone: z.string().optional().describe("Phone number for SMS/WhatsApp"),
      conversationId: z.string().optional().describe("Existing conversation ID"),
      conversationProviderId: z.string().optional().describe("Provider ID"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.sendMessage(args);
        return ok(`Message sent!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_get_message",
    "Get a single message by ID.",
    { messageId: z.string().describe("Message ID") },
    async ({ messageId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.getMessage(messageId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_cancel_scheduled_messages",
    "Cancel all scheduled messages for a conversation.",
    { conversationId: z.string().describe("Conversation ID") },
    async ({ conversationId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.cancelScheduledMessages(conversationId);
        return ok(`Scheduled messages cancelled.\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== UPDATE CONVERSATION ==========

  server.tool(
    "ghl_update_conversation",
    "Update a conversation (e.g. mark as read, starred, assign user).",
    {
      conversationId: z.string().describe("Conversation ID"),
      starred: z.boolean().optional().describe("Star/unstar the conversation"),
      unreadCount: z.number().optional().describe("Set unread count (0 to mark as read)"),
      assignedTo: z.string().optional().describe("Assign to user ID"),
    },
    async ({ conversationId, ...data }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.updateConversation(conversationId, data);
        return ok(`Conversation updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== OUTBOUND CALL ==========

  server.tool(
    "ghl_add_outbound_call",
    "Initiate an outbound call via conversations.",
    {
      type: z.string().optional().describe("Message type (e.g. Call)"),
      contactId: z.string().describe("Contact ID to call"),
      phone: z.string().optional().describe("Phone number to call"),
      locationId: z.string().optional().describe("Target location"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env, args.locationId);
        const result = await client.conversations.addOutboundCall(args);
        return ok(`Outbound call initiated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== UPLOAD MESSAGE ATTACHMENT ==========

  server.tool(
    "ghl_upload_message_attachment",
    "Upload an attachment for a conversation message.",
    {
      conversationId: z.string().describe("Conversation ID"),
      locationId: z.string().optional().describe("Target location"),
      attachmentUrl: z.string().describe("URL of the attachment to upload"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env, args.locationId);
        const result = await client.conversations.uploadMessageAttachment(args);
        return ok(`Attachment uploaded!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== TRANSCRIPTION ==========

  server.tool(
    "ghl_get_transcription",
    "Get the transcription for a voice message.",
    {
      locationId: z.string().describe("Location ID"),
      messageId: z.string().describe("Message ID"),
    },
    async ({ locationId, messageId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.conversations.getTranscription(locationId, messageId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_download_transcription",
    "Download the transcription file for a voice message.",
    {
      locationId: z.string().describe("Location ID"),
      messageId: z.string().describe("Message ID"),
    },
    async ({ locationId, messageId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.conversations.downloadTranscription(locationId, messageId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== RECORDING ==========

  server.tool(
    "ghl_get_recording",
    "Get the recording for a voice message.",
    {
      locationId: z.string().describe("Location ID"),
      messageId: z.string().describe("Message ID"),
    },
    async ({ locationId, messageId }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.conversations.getRecording(locationId, messageId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== CANCEL SCHEDULED EMAIL ==========

  server.tool(
    "ghl_cancel_scheduled_email",
    "Cancel a specific scheduled email by message ID.",
    { emailMessageId: z.string().describe("Email message ID") },
    async ({ emailMessageId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.cancelScheduledEmail(emailMessageId);
        return ok(`Scheduled email cancelled.\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== TYPING INDICATOR ==========

  server.tool(
    "ghl_send_typing_indicator",
    "Send a typing indicator in a live chat conversation.",
    {
      conversationId: z.string().describe("Conversation ID"),
      locationId: z.string().optional().describe("Target location"),
      isTyping: z.boolean().optional().describe("Whether typing is active"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env, args.locationId);
        const result = await client.conversations.sendTypingIndicator(args);
        return ok(`Typing indicator sent.\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== DELETE CONVERSATION ==========

  server.tool(
    "ghl_delete_conversation",
    "Delete a conversation by ID.",
    { conversationId: z.string().describe("Conversation ID to delete") },
    async ({ conversationId }) => {
      try {
        const client = await resolveClient(env);
        await client.conversations.deleteConversation(conversationId);
        return ok(`Conversation ${conversationId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== EMAIL MESSAGES ==========

  server.tool(
    "ghl_get_email_message",
    "Get a specific email message by ID.",
    { emailMessageId: z.string().describe("Email message ID") },
    async ({ emailMessageId }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.getEmailMessage(emailMessageId);
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_delete_email_message",
    "Delete a specific email message by ID.",
    { emailMessageId: z.string().describe("Email message ID to delete") },
    async ({ emailMessageId }) => {
      try {
        const client = await resolveClient(env);
        await client.conversations.deleteEmailMessage(emailMessageId);
        return ok(`Email message ${emailMessageId} deleted.`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== INBOUND & MESSAGE STATUS ==========

  server.tool(
    "ghl_add_inbound_message",
    "Add an inbound message to a conversation. Requires either conversationId or contactId.",
    {
      type: z.string().describe("Message type (e.g. SMS, Email, WhatsApp)"),
      conversationId: z.string().optional().describe("Existing conversation ID"),
      contactId: z.string().optional().describe("Contact ID (creates conversation if needed)"),
      message: z.string().optional().describe("Message body"),
      attachments: z.array(z.string()).optional().describe("Attachment URLs"),
    },
    async (args) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.addInboundMessage(args);
        return ok(`Inbound message added!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_update_message_status",
    "Update the status of an existing message (e.g. read, delivered, failed).",
    {
      messageId: z.string().describe("Message ID"),
      status: z.string().describe("New status (read, delivered, failed, pending, etc.)"),
      error: z.record(z.any()).optional().describe("Error details if status is failed"),
    },
    async ({ messageId, status, error }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.updateMessageStatus(messageId, status, error);
        return ok(`Message status updated!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  // ========== MESSAGE ATTACHMENTS & EXPORT ==========

  server.tool(
    "ghl_add_message_attachments",
    "Add attachment URLs to an existing message (max 5 URLs).",
    {
      messageId: z.string().describe("Message ID"),
      attachmentUrls: z.array(z.string()).max(5).describe("Attachment URLs to add (max 5)"),
    },
    async ({ messageId, attachmentUrls }) => {
      try {
        const client = await resolveClient(env);
        const result = await client.conversations.addMessageAttachments(messageId, attachmentUrls);
        return ok(`Attachments added!\n\n${JSON.stringify(result, null, 2)}`);
      } catch (e: any) {
        return err(e);
      }
    }
  );

  server.tool(
    "ghl_export_messages",
    "Export messages for a location with cursor-based pagination.",
    {
      locationId: z.string().optional().describe("Location ID"),
      lastMessageId: z.string().optional().describe("Cursor — last message ID from previous page"),
      limit: z.string().optional().describe("Number of messages to return"),
    },
    async ({ locationId, lastMessageId, limit }) => {
      try {
        const client = await resolveClient(env, locationId);
        const result = await client.conversations.exportMessages(
          locationId || client.locationId,
          { lastMessageId, limit }
        );
        return ok(JSON.stringify(result, null, 2));
      } catch (e: any) {
        return err(e);
      }
    }
  );
}
