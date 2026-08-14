"use client";

// Web Audio API lightweight synthesizer with subscriber pattern for React 19
type Listener = (enabled: boolean) => void;

class SoundFX {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private listeners: Set<Listener> = new Set();
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    this.initialized = true;
    const stored = localStorage.getItem("sound_fx_enabled");
    this.enabled = stored === "true";
  }

  public isEnabled(): boolean {
    if (typeof window !== "undefined" && !this.initialized) {
      this.init();
    }
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound_fx_enabled", String(this.enabled));
    }
    if (this.enabled) {
      this.play("pop");
    }
    this.listeners.forEach((fn) => fn(this.enabled));
    return this.enabled;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public play(type: "click" | "pop" | "switch" | "chime" | "hover" | "run" = "click") {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === "hover") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
      } else if (type === "pop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "switch") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "chime") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.04); // E5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "run") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(960, now + 0.12);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // Audio context may be restricted by browser autoplay policy
    }
  }
}

export const sound = typeof window !== "undefined" ? new SoundFX() : {
  isEnabled: () => false,
  toggle: () => false,
  play: () => {},
  subscribe: () => () => {},
};
