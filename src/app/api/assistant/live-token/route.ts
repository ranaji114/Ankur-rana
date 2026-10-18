import { assistantInstructions, getAssistantContext } from "@/lib/assistant-knowledge";

export const runtime = "nodejs";

const liveTokenCounts = new Map<string, { count: number; resetAt: number }>();

function json(data: Record<string, unknown>, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = liveTokenCounts.get(address);

  if (!current || current.resetAt <= now) {
    liveTokenCounts.set(address, { count: 1, resetAt: now + 10 * 60_000 });
    if (liveTokenCounts.size > 1000) {
      for (const [key, value] of liveTokenCounts) {
        if (value.resetAt <= now) liveTokenCounts.delete(key);
      }
    }
    return false;
  }

  current.count += 1;
  return current.count > 8;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return json({ error: "Voice chat is being started too often. Please wait a few minutes and try again." }, 429);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "Voice chat is not connected yet. Please try again later." }, 503);
  }

  const model = process.env.GEMINI_LIVE_MODEL || "gemini-3.8-live";
  const speechConfig = {
    voiceConfig: {
      prebuiltVoiceConfig: { voiceName: "Kore" },
    },
  };
  const setup = {
    model: `models/${model}`,
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig,
    },
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    systemInstruction: {
      parts: [
        {
          text: `${assistantInstructions}\n\nSpeak in clear, natural English with a warm, friendly, conversational delivery. Sound relaxed and human, not like a formal announcement. Use short natural sentences and keep spoken answers concise by default. Use the conversation context for follow-up questions.\n\n${getAssistantContext("everything about Ankur")}`,
        },
      ],
    },
  };
  const clientConfig = {
    generationConfig: setup.generationConfig,
    inputAudioTranscription: setup.inputAudioTranscription,
    outputAudioTranscription: setup.outputAudioTranscription,
  };

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/auth_tokens", {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uses: 1,
        expireTime: new Date(Date.now() + 30 * 60_000).toISOString(),
        newSessionExpireTime: new Date(Date.now() + 60_000).toISOString(),
        bidiGenerateContentSetup: setup,
      }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | { name?: string; error?: { message?: string } }
      | null;

    if (!response.ok || !payload?.name) {
      console.error("Gemini Live token request failed", response.status, payload?.error?.message ?? "No token returned");
      const message = response.status === 401 || response.status === 403
        ? "Gemini rejected the API key. Check that GEMINI_API_KEY is valid and enabled for Gemini Live."
        : response.status === 429
          ? "Gemini voice capacity or quota is temporarily unavailable. Please try again shortly."
          : response.status === 400
            ? "Gemini rejected the live voice setup. Check that the selected Live model is enabled for this API key."
            : "Voice chat could not connect. Please try again.";
      return json({ error: message }, 502);
    }

    return json({ token: payload.name, model, config: clientConfig });
  } catch (error) {
    console.error("Gemini Live token request failed", error);
    return json({ error: "Voice chat could not connect. Please try again." }, 502);
  }
}
