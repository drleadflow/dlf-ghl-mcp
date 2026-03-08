import { BaseGHLClient } from "./base";

export function conversationMethods(client: BaseGHLClient) {
  return {
    async searchConversations(locationId?: string, contactId?: string, query?: string, limit?: string) {
      const q: Record<string, string> = { locationId: locationId || client.locationId };
      if (contactId) q.contactId = contactId;
      if (query) q.q = query;
      if (limit) q.limit = limit;
      return client.request<{ conversations: any[] }>("GET", `/conversations/search`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async getConversation(conversationId: string) {
      return client.request<{ conversation: any }>("GET", `/conversations/${conversationId}`, {
        version: "2021-07-28",
      });
    },

    async createConversation(data: { contactId: string; locationId?: string }) {
      return client.request<{ conversation: any }>("POST", `/conversations/`, {
        body: { ...data, locationId: data.locationId || client.locationId },
        version: "2021-07-28",
      });
    },

    async updateConversation(conversationId: string, data: any) {
      return client.request<{ conversation: any }>("PUT", `/conversations/${conversationId}`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async deleteConversation(conversationId: string) {
      return client.request<any>("DELETE", `/conversations/${conversationId}`, {
        version: "2021-07-28",
      });
    },

    async getConversationMessages(conversationId: string, limit?: string) {
      const q: Record<string, string> = {};
      if (limit) q.limit = limit;
      return client.request<{ messages: any }>("GET", `/conversations/${conversationId}/messages`, {
        query: q,
        version: "2021-07-28",
      });
    },

    async sendConversationMessage(data: any) {
      return client.request<{ message: any; conversationId: string }>("POST", `/conversations/messages`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async sendMessage(data: any) {
      return client.request<{ message: any; conversationId: string }>("POST", `/conversations/messages`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async getMessage(messageId: string) {
      return client.request<any>("GET", `/conversations/messages/${messageId}`, {
        version: "2021-07-28",
      });
    },

    async cancelScheduledMessages(conversationId: string) {
      return client.request<any>("DELETE", `/conversations/${conversationId}/messages/schedule`, {
        version: "2021-07-28",
      });
    },

    async addOutboundCall(data: any) {
      return client.request<any>("POST", `/conversations/messages/outbound-call`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async uploadMessageAttachment(data: any) {
      return client.request<any>("POST", `/conversations/messages/attachments/upload`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async getTranscription(locationId: string, messageId: string) {
      return client.request<any>("GET", `/conversations/locations/${locationId}/messages/${messageId}/transcription`, {
        version: "2021-04-15",
      });
    },

    async downloadTranscription(locationId: string, messageId: string) {
      return client.request<any>("GET", `/conversations/locations/${locationId}/messages/${messageId}/transcription/download`, {
        version: "2021-04-15",
      });
    },

    async getRecording(locationId: string, messageId: string) {
      return client.request<any>("GET", `/conversations/messages/${messageId}/locations/${locationId}/recording`, {
        version: "2021-04-15",
      });
    },

    async cancelScheduledEmail(emailMessageId: string) {
      return client.request<any>("DELETE", `/conversations/messages/email/${emailMessageId}/schedule`, {
        version: "2021-04-15",
      });
    },

    async sendTypingIndicator(data: any) {
      return client.request<any>("POST", `/conversations/providers/live-chat/typing`, {
        body: data,
        version: "2021-04-15",
      });
    },

    async getEmailMessage(emailMessageId: string) {
      return client.request<any>("GET", `/conversations/messages/email/${emailMessageId}`, {
        version: "2021-07-28",
      });
    },

    async deleteEmailMessage(emailMessageId: string) {
      return client.request<any>("DELETE", `/conversations/messages/email/${emailMessageId}`, {
        version: "2021-07-28",
      });
    },

    async addInboundMessage(data: any) {
      return client.request<any>("POST", `/conversations/messages/inbound`, {
        body: data,
        version: "2021-07-28",
      });
    },

    async updateMessageStatus(messageId: string, status: string, error?: any) {
      return client.request<any>("PUT", `/conversations/messages/${messageId}/status`, {
        body: { status, ...(error ? { error } : {}) },
        version: "2021-07-28",
      });
    },

    async addMessageAttachments(messageId: string, attachmentUrls: string[]) {
      return client.request<any>("PUT", `/conversations/messages/${messageId}/attachments`, {
        body: { attachmentUrls },
        version: "2021-07-28",
      });
    },

    async exportMessages(locationId: string, params?: { lastMessageId?: string; limit?: string }) {
      const q: Record<string, string> = { locationId };
      if (params?.lastMessageId) q.lastMessageId = params.lastMessageId;
      if (params?.limit) q.limit = params.limit;
      return client.request<any>("GET", `/conversations/messages/export`, {
        query: q,
        version: "2021-07-28",
      });
    },
  };
}
