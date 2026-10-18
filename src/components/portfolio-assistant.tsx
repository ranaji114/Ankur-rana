"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LoaderCircle, MessageCircle, Mic, MicOff, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

type VoiceStatus = "idle" | "connecting" | "listening" | "thinking" | "speaking";
type VoiceConnectStep = "microphone" | "service" | "setup" | null;
type LiveVoiceSocketMessage = {
  setupComplete?: Record<string, unknown>;
  serverContent?: {
    inputTranscription?: { text?: string };
    outputTranscription?: { text?: string };
    modelTurn?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> };
    turnComplete?: boolean;
    interrupted?: boolean;
  };
  error?: { message?: string };
};

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(https:\/\/[^\s)\]]+)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (!part.startsWith("https://")) return <span key={`${index}-${part}`}>{part}</span>;
        const url = part.replace(/[.,!?;:]+$/, "");
        const trailing = part.slice(url.length);
        return (
          <span key={`${index}-${part}`}>
            <a href={url} target="_blank" rel="noreferrer">{url}</a>{trailing}
          </span>
        );
      })}
    </>
  );
}

export function PortfolioAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("idle");
  const [voiceConnectStep, setVoiceConnectStep] = useState<VoiceConnectStep>(null);
  const [voicePreview, setVoicePreview] = useState<{ user: string; assistant: string }>({ user: "", assistant: "" });
  const conversationRef = useRef<HTMLDivElement>(null);
  const voiceSocketRef = useRef<WebSocket | null>(null);
  const voiceConnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voiceGenerationRef = useRef(0);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micNodesRef = useRef<AudioNode[]>([]);
  const playbackSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const playbackEndRef = useRef(0);
  const voiceTranscriptRef = useRef({ user: "", assistant: "" });

  function stopVoiceChat() {
    voiceGenerationRef.current += 1;
    if (voiceConnectTimeoutRef.current) clearTimeout(voiceConnectTimeoutRef.current);
    voiceConnectTimeoutRef.current = null;
    const socket = voiceSocketRef.current;
    voiceSocketRef.current = null;
    if (socket && socket.readyState < WebSocket.CLOSING) socket.close();
    micNodesRef.current.forEach((node) => {
      try { node.disconnect(); } catch { /* Node already disconnected. */ }
    });
    micNodesRef.current = [];
    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    micStreamRef.current = null;
    playbackSourcesRef.current.forEach((source) => {
      try { source.stop(); } catch { /* Source already stopped. */ }
    });
    playbackSourcesRef.current.clear();
    playbackEndRef.current = 0;
    const context = audioContextRef.current;
    audioContextRef.current = null;
    if (context && context.state !== "closed") void context.close().catch(() => undefined);
    voiceTranscriptRef.current = { user: "", assistant: "" };
    setVoicePreview({ user: "", assistant: "" });
    setVoiceStatus("idle");
    setVoiceConnectStep(null);
  }

  function downsampleTo16k(input: Float32Array, inputRate: number) {
    if (inputRate === 16000) return input;
    const ratio = inputRate / 16000;
    const output = new Float32Array(Math.floor(input.length / ratio));
    for (let index = 0; index < output.length; index += 1) {
      const start = Math.floor(index * ratio);
      const end = Math.min(Math.floor((index + 1) * ratio), input.length);
      let sum = 0;
      for (let sample = start; sample < end; sample += 1) sum += input[sample] ?? 0;
      output[index] = sum / Math.max(1, end - start);
    }
    return output;
  }

  function pcmBase64(samples: Float32Array) {
    const bytes = new Uint8Array(samples.length * 2);
    const view = new DataView(bytes.buffer);
    for (let index = 0; index < samples.length; index += 1) {
      const sample = Math.max(-1, Math.min(1, samples[index] ?? 0));
      view.setInt16(index * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    }
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + 0x8000, bytes.length)));
    }
    return btoa(binary);
  }

  function queueLiveAudio(data: string, mimeType: string, context: AudioContext) {
    const binary = atob(data);
    const pcm = new Int16Array(binary.length / 2);
    for (let index = 0; index < pcm.length; index += 1) {
      const low = binary.charCodeAt(index * 2);
      const high = binary.charCodeAt(index * 2 + 1);
      pcm[index] = (high << 8) | low;
    }
    const audio = context.createBuffer(1, pcm.length, Number(mimeType.match(/rate=(\d+)/)?.[1] || 24000));
    const channel = audio.getChannelData(0);
    for (let index = 0; index < pcm.length; index += 1) channel[index] = (pcm[index] ?? 0) / 32768;
    const source = context.createBufferSource();
    source.buffer = audio;
    source.connect(context.destination);
    const startAt = Math.max(context.currentTime + 0.015, playbackEndRef.current);
    playbackEndRef.current = startAt + audio.duration;
    playbackSourcesRef.current.add(source);
    setVoiceStatus("speaking");
    source.onended = () => {
      playbackSourcesRef.current.delete(source);
      if (!playbackSourcesRef.current.size && voiceSocketRef.current?.readyState === WebSocket.OPEN) setVoiceStatus("listening");
    };
    source.start(startAt);
  }

  async function readLiveSocketFrame(data: unknown) {
    if (typeof data === "string") return data;
    if (data instanceof Blob) return data.text();
    if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
    if (ArrayBuffer.isView(data)) return new TextDecoder().decode(data);
    return String(data);
  }

  async function startVoiceChat() {
    if (voiceStatus !== "idle") {
      stopVoiceChat();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !("AudioContext" in window)) {
      setError("Live voice chat needs a modern browser with microphone access. Try Chrome or Edge.");
      return;
    }

    const generation = voiceGenerationRef.current + 1;
    voiceGenerationRef.current = generation;
    setError("");
    setVoiceStatus("connecting");
    setVoiceConnectStep("microphone");
    voiceTranscriptRef.current = { user: "", assistant: "" };
    setVoicePreview({ user: "", assistant: "" });

    try {
      // Create the audio context directly in the click flow so browsers allow audio playback.
      const context = new AudioContext();
      audioContextRef.current = context;
      await context.resume();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (voiceGenerationRef.current !== generation) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      micStreamRef.current = stream;
      setVoiceConnectStep("service");

      const tokenResponse = await fetch("/api/assistant/live-token", { method: "POST" });
      const tokenPayload = await tokenResponse.json().catch(() => null) as
        | { token?: string; model?: string; config?: Record<string, unknown>; error?: string }
        | null;
      if (!tokenResponse.ok || !tokenPayload?.token || !tokenPayload.model) {
        throw new Error("Your voice conversation couldn’t start. Please try again shortly.");
      }
      if (voiceGenerationRef.current !== generation) return;

      const socket = new WebSocket(
        `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained?access_token=${encodeURIComponent(tokenPayload.token)}`,
      );
      voiceSocketRef.current = socket;
      setVoiceConnectStep("setup");
      voiceConnectTimeoutRef.current = setTimeout(() => {
        if (voiceGenerationRef.current !== generation) return;
        setError(socket.readyState === WebSocket.CONNECTING
          ? "A secure voice connection couldn’t be opened. Check your connection and try again."
          : "The voice conversation is taking longer than expected. Please try again.");
        stopVoiceChat();
      }, 18_000);
      socket.onopen = () => {
        if (voiceGenerationRef.current !== generation) return;
        socket.send(JSON.stringify({ setup: { model: `models/${tokenPayload.model}`, ...tokenPayload.config } }));
      };
      socket.onmessage = async (event) => {
        if (voiceGenerationRef.current !== generation) return;
        let payload: LiveVoiceSocketMessage;
        try { payload = JSON.parse(await readLiveSocketFrame(event.data)) as LiveVoiceSocketMessage; }
        catch { return; }

        if (payload.error) {
          setError(payload.error.message || "The live voice connection encountered a problem.");
          stopVoiceChat();
          return;
        }
        if (payload.setupComplete) {
          if (voiceConnectTimeoutRef.current) clearTimeout(voiceConnectTimeoutRef.current);
          voiceConnectTimeoutRef.current = null;
          setVoiceConnectStep(null);
          const microphone = context.createMediaStreamSource(stream);
          const processor = context.createScriptProcessor(2048, 1, 1);
          const mute = context.createGain();
          mute.gain.value = 0;
          processor.onaudioprocess = (audioEvent) => {
            if (socket.readyState !== WebSocket.OPEN || voiceGenerationRef.current !== generation) return;
            const mono = audioEvent.inputBuffer.getChannelData(0);
            const samples = downsampleTo16k(mono, context.sampleRate);
            socket.send(JSON.stringify({ realtimeInput: { audio: { data: pcmBase64(samples), mimeType: "audio/pcm;rate=16000" } } }));
          };
          microphone.connect(processor);
          processor.connect(mute);
          mute.connect(context.destination);
          micNodesRef.current = [microphone, processor, mute];
          setVoiceStatus("listening");
          return;
        }

        const content = payload.serverContent;
        if (!content) return;
        if (content.inputTranscription?.text) {
          voiceTranscriptRef.current.user += content.inputTranscription.text;
          setVoicePreview((current) => ({ ...current, user: voiceTranscriptRef.current.user }));
          setVoiceStatus("thinking");
        }
        if (content.outputTranscription?.text) {
          voiceTranscriptRef.current.assistant += content.outputTranscription.text;
          setVoicePreview((current) => ({ ...current, assistant: voiceTranscriptRef.current.assistant }));
        }
        for (const part of content.modelTurn?.parts || []) {
          if (part.inlineData?.data) queueLiveAudio(part.inlineData.data, part.inlineData.mimeType || "audio/pcm;rate=24000", context);
        }
        if (content.interrupted) {
          playbackSourcesRef.current.forEach((source) => {
            try { source.stop(); } catch { /* Source already stopped. */ }
          });
          playbackSourcesRef.current.clear();
          playbackEndRef.current = 0;
          setVoiceStatus("listening");
        }
        if (content.turnComplete) {
          const { user, assistant } = voiceTranscriptRef.current;
          if (user.trim()) setMessages((current) => [...current, { role: "user", content: user.trim() }]);
          if (assistant.trim()) setMessages((current) => [...current, { role: "assistant", content: assistant.trim() }]);
          voiceTranscriptRef.current = { user: "", assistant: "" };
          setVoicePreview({ user: "", assistant: "" });
          if (!playbackSourcesRef.current.size) setVoiceStatus("listening");
        }
      };
      socket.onerror = () => {
        if (voiceGenerationRef.current === generation) {
          setError("Voice chat couldn’t connect. Check your internet connection and try again.");
          stopVoiceChat();
        }
      };
      socket.onclose = (event) => {
        if (voiceGenerationRef.current === generation) {
          const detail = event.code === 1000
            ? "The live voice session ended. Tap the mic to start again."
            : "The voice connection ended unexpectedly. Please try again.";
          setError((current) => current || detail);
          stopVoiceChat();
        }
      };
    } catch (caught) {
      if (voiceGenerationRef.current === generation) {
        const message = caught instanceof DOMException && caught.name === "NotAllowedError"
          ? "Allow microphone access in your browser, then tap the mic again."
          : caught instanceof Error ? caught.message : "Live voice chat could not start. Please try again.";
        setError(message);
        stopVoiceChat();
      }
    }
  }

  function closeChat() {
    stopVoiceChat();
    setOpen(false);
  }

  useEffect(() => () => {
    stopVoiceChat();
  }, []);

  useEffect(() => {
    if (!open) return;
    conversationRef.current?.scrollTo({ top: conversationRef.current.scrollHeight, behavior: "smooth" });
  }, [open, messages, voicePreview]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        stopVoiceChat();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="portfolio-assistant-root">
      <AnimatePresence>
        {open && (
          <motion.section
            className="portfolio-assistant-panel"
            role="dialog"
            aria-labelledby="portfolio-assistant-title"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="portfolio-assistant-header">
              <div className="portfolio-assistant-avatar"><Sparkles size={17} /></div>
              <div className="portfolio-assistant-heading">
                <p id="portfolio-assistant-title">Ankur&apos;s AI</p>
                <span><i className={`is-${voiceStatus}`} /> {voiceStatus === "connecting" ? "Getting ready to talk" : voiceStatus === "thinking" ? "Thinking of a reply" : voiceStatus === "speaking" ? "Speaking with you" : voiceStatus === "listening" ? "Listening to you" : "Your portfolio voice guide"}</span>
              </div>
              <button className="portfolio-assistant-close" type="button" onClick={closeChat} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            <div className="portfolio-assistant-context-note">
              Ask about Ankur&apos;s background, education, projects, books, and ideas.
            </div>

            <div className="portfolio-assistant-messages" ref={conversationRef} aria-live="polite">
              {messages.length === 0 && (
                <div className="portfolio-assistant-welcome">
                  <span className="portfolio-assistant-kicker">A PERSONAL PORTFOLIO GUIDE</span>
                  <h2>Let&apos;s talk about Ankur.</h2>
                  <p>Ask naturally about his work and ideas. Speak your question and hear the reply, with captions appearing here.</p>
                </div>
              )}

              <div className={`portfolio-assistant-voice-visualizer is-${voiceStatus}`} aria-hidden="true">
                <span className="portfolio-assistant-orbit orbit-one" />
                <span className="portfolio-assistant-orbit orbit-two" />
                <span className="portfolio-assistant-orbit orbit-three" />
                <span className="portfolio-assistant-voice-core"><i /></span>
                <span className="portfolio-assistant-equalizer">{[0, 1, 2, 3, 4, 5, 6].map((bar) => <i key={bar} />)}</span>
              </div>
              <div className="portfolio-assistant-voice-caption" aria-live="polite">
                {voiceStatus === "connecting" ? "Getting your conversation ready…" : voiceStatus === "thinking" ? "I heard you — one moment…" : voiceStatus === "speaking" ? "Here’s my reply" : voiceStatus === "listening" ? "I’m listening. Go ahead." : "Tap below and start talking"}
              </div>

              {messages.map((message, index) => (
                <div className={`portfolio-assistant-message portfolio-assistant-message-${message.role}`} key={`${index}-${message.role}`}>
                  {message.role === "assistant" && <span className="portfolio-assistant-message-label"><Sparkles size={12} /> ANKUR&apos;S AI</span>}
                  <div className="portfolio-assistant-bubble"><MessageText text={message.content} /></div>
                </div>
              ))}
              {voicePreview.user && (
                <div className="portfolio-assistant-message portfolio-assistant-message-user">
                  <div className="portfolio-assistant-bubble">{voicePreview.user}</div>
                </div>
              )}
              {voicePreview.assistant && (
                <div className="portfolio-assistant-message portfolio-assistant-message-assistant">
                  <span className="portfolio-assistant-message-label"><Sparkles size={12} /> ANKUR&apos;S AI</span>
                  <div className="portfolio-assistant-bubble">{voicePreview.assistant}</div>
                </div>
              )}
              <div aria-hidden="true" />
            </div>

            {error && <p className="portfolio-assistant-error" role="status">{error}</p>}

            <div className="portfolio-assistant-voice-controls">
              <button
                aria-label={voiceStatus === "idle" ? "Start voice conversation" : voiceStatus === "connecting" ? "Cancel voice connection" : "End voice conversation"}
                aria-pressed={voiceStatus !== "idle"}
                title={voiceStatus === "idle" ? "Start voice conversation" : "End voice conversation"}
                className={`portfolio-assistant-mic-button is-${voiceStatus}`}
                onClick={() => void startVoiceChat()}
              >
                {voiceStatus === "connecting" ? <LoaderCircle size={20} className="portfolio-assistant-spin" /> : voiceStatus !== "idle" ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <span>{voiceStatus === "idle" ? "Start talking" : voiceStatus === "connecting" && voiceConnectStep === "microphone" ? "Allow microphone access" : voiceStatus === "connecting" ? "Starting your conversation…" : voiceStatus === "thinking" ? "One moment…" : voiceStatus === "speaking" ? "Tap to end conversation" : "Listening · pause when you’re done"}</span>
            </div>
            <div className="portfolio-assistant-disclaimer">Speak naturally · Your words appear as captions</div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        className={`portfolio-assistant-launcher ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close Ankur's AI chat" : "Ask Ankur's AI"}
        aria-expanded={open}
        onClick={() => {
          if (open) closeChat();
          else {
            setOpen(true);
            void startVoiceChat();
          }
        }}
        whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      >
        {open ? <X size={22} /> : <><MessageCircle size={21} /><span>Ask Ankur&apos;s AI</span><i /></>}
      </motion.button>
    </div>
  );
}
