import { assistantInstructions, getAssistantContext } from "@/lib/assistant-knowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const requestCounts = new Map<string, { count: number; resetAt: number }>();

function json(data: Record<string, unknown>, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  const maxLength = candidate.role === "user" ? 1200 : 6000;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0 &&
    candidate.content.length <= maxLength
  );
}

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = requestCounts.get(address);

  if (!current || current.resetAt <= now) {
    requestCounts.set(address, { count: 1, resetAt: now + 60_000 });
    if (requestCounts.size > 1000) {
      for (const [key, value] of requestCounts) {
        if (value.resetAt <= now) requestCounts.delete(key);
      }
    }
    return false;
  }

  current.count += 1;
  return current.count > 12;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return json({ error: "Too many questions in a short time. Please wait a minute and try again." }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Please send a valid message." }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ error: "Please send a valid message." }, 400);
  }

  const rawMessages = (body as Record<string, unknown>).messages;
  if (
    !Array.isArray(rawMessages) ||
    rawMessages.length < 1 ||
    rawMessages.length > 10 ||
    !rawMessages.every(isChatMessage) ||
    rawMessages[rawMessages.length - 1]?.role !== "user"
  ) {
    return json({ error: "This conversation is too long or contains an invalid message." }, 400);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "Ankur's AI guide is not connected yet. Please try again later." }, 503);
  }

  const messages = rawMessages as ChatMessage[];
  const question = messages.filter((message) => message.role === "user").slice(-3).map((message) => message.content).join("\n");
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const conversation = messages
    .map((message) => `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`)
    .join("\n\n");

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        system_instruction: `${assistantInstructions}\n\n${getAssistantContext(question)}`,
        input: conversation,
        generation_config: {
          thinking_level: "minimal",
          max_output_tokens: 450,
        },
        store: false,
        stream: true,
      }),
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: { message?: string; code?: string; type?: string } }
        | null;
      console.error("Portfolio assistant provider error", response.status, payload?.error?.message ?? "Unknown API error");
      if (response.status === 429) {
        const providerError = payload?.error;
        if (
          providerError?.code === "insufficient_quota" ||
          providerError?.type === "insufficient_quota" ||
          /no credits remaining|insufficient quota|quota exceeded|resource_exhausted/i.test(providerError?.message ?? "")
        ) {
          return json({ error: "Ankur's AI guide is temporarily unavailable. Please try again later." }, 503);
        }
        return json({ error: "The AI is receiving a lot of questions right now. Please try again shortly." }, 429);
      }
      return json({ error: "The AI could not answer just now. Please try again in a moment." }, 502);
    }

    if (!response.body) {
      return json({ error: "The AI could not answer just now. Please try again in a moment." }, 502);
    }

    const upstreamBody = response.body;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstreamBody.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        function send(data: Record<string, unknown>) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        }

        function readEvent(eventText: string) {
          const data = eventText
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trim())
            .join("\n");
          if (!data) return;

          try {
            const event = JSON.parse(data) as {
              event_type?: string;
              delta?: { type?: string; text?: string };
              error?: { message?: string };
            };
            if (event.event_type === "step.delta" && event.delta?.type === "text" && event.delta.text) {
              send({ text: event.delta.text });
            } else if (event.event_type === "error") {
              send({ error: "The AI could not answer just now. Please try again in a moment." });
            }
          } catch {
            // Ignore non-JSON keepalive frames from the provider stream.
          }
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
            let boundary = buffer.indexOf("\n\n");
            while (boundary !== -1) {
              readEvent(buffer.slice(0, boundary));
              buffer = buffer.slice(boundary + 2);
              boundary = buffer.indexOf("\n\n");
            }
          }
          buffer += decoder.decode();
          if (buffer.trim()) readEvent(buffer);
          send({ done: true });
        } catch (streamError) {
          console.error("Portfolio assistant stream failed", streamError);
          send({ error: "The AI connection was interrupted. Please try again." });
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream; charset=utf-8",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Portfolio assistant request failed", error);
    return json({ error: "The AI could not answer just now. Please try again in a moment." }, 502);
  }
}
