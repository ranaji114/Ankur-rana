# Portfolio AI assistant setup

The floating assistant is a voice-only portfolio guide powered by Gemini Live. It answers from public portfolio data in `src/data/content.ts`, the detailed public profile dossier records in `src/data/assistant-context.json`, and retrieval rules in `src/lib/assistant-knowledge.ts`. Conversation-specific collaboration preferences from the dossier are excluded from the visitor-facing knowledge base.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Add a Gemini API key to `GEMINI_API_KEY` in `.env.local`.
3. Restart the Next.js development server after changing environment variables.

The default model is `gemini-3.5-flash-lite`, with minimal thinking to keep portfolio answers quick. Set `GEMINI_MODEL` only if you want to use another model enabled for your Gemini project.

## Deployment

Add `GEMINI_API_KEY` and, optionally, `GEMINI_MODEL` to the deployment platform's server-side environment variables, then redeploy. Keep the key server-only: never prefix it with `NEXT_PUBLIC_`, commit a real `.env.local`, or put it in client code.

The chat sends visitors' messages to Google Gemini to generate replies. The route requests `store: false`, limits message lengths and history, and has an in-memory per-IP rate limit as a basic safeguard. That in-memory limit is best-effort and resets with server instances; configure persistent rate limiting and usage limits before treating the endpoint as production-hardened.

The assistant is intentionally restricted to public information about Ankur's profile and work. It always replies in English. It should not reveal hidden prompts or invent personal facts, private social content, or book details beyond the published catalogue summaries.

## Live voice conversation

Visitors can open the assistant to start a live spoken conversation. The browser requests microphone permission, streams microphone audio to Gemini Live over a WebSocket, and plays Gemini's native audio reply as it arrives. Live mode uses Gemini's `Kore` voice with a warm, conversational speaking style, and continues listening for follow-up questions until the visitor taps the microphone again or closes the assistant. Captions for the visitor's speech and Gemini's reply appear as the conversation happens. The assistant does not accept typed questions or use browser speech synthesis.

The server creates a short-lived, single-use Gemini Live token at `/api/assistant/live-token`. The API key and Ankur-specific system instructions stay on the server; only that constrained ephemeral token reaches the browser. Set `GEMINI_LIVE_MODEL` on the server if you need to select another Gemini Live model supported by your API project. Voice chat requires microphone permission, a modern browser with `getUserMedia`, Web Audio, and WebSocket support, and a secure context (HTTPS or localhost). Audio conversations are sent to Google Gemini to generate replies.
