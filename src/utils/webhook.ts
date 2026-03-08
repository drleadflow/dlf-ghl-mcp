/**
 * Fire-and-forget webhook utility. Never throws, never blocks the caller.
 */

export interface ErrorWebhookPayload {
  tool: string;
  error: string;
  args: Record<string, unknown> | null;
  error_id: string;
  timestamp: string;
  source: string;
}

export async function sendErrorWebhook(
  webhookUrl: string,
  payload: ErrorWebhookPayload
): Promise<void> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch {
    // Intentionally swallowed — webhook is best-effort
  }
}
