"use client";

import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

type PortraitStatus = "idle" | "connecting" | "listening" | "thinking" | "speaking";

export function AIGuidePortrait({
  status,
  className = "",
  overlayText = "",
  overlayLabel = "LIVE CAPTION",
  reducedMotion = false,
}: {
  status: PortraitStatus;
  className?: string;
  overlayText?: string;
  overlayLabel?: string;
  reducedMotion?: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  function followPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--portrait-tilt-x", `${-y * 5}deg`);
    event.currentTarget.style.setProperty("--portrait-tilt-y", `${x * 6}deg`);
  }

  function resetPointer() {
    frameRef.current?.style.setProperty("--portrait-tilt-x", "0deg");
    frameRef.current?.style.setProperty("--portrait-tilt-y", "0deg");
  }

  return (
    <div
      ref={frameRef}
      className={`ai-guide-portrait ${className}`}
      data-status={status}
      onPointerMove={followPointer}
      onPointerLeave={resetPointer}
      aria-label="Ankur Rana"
    >
      <div className="ai-guide-portrait-photo">
        <Image
          src="/assets/author/portrait-ankur.jpeg"
          alt="Ankur Rana in his study"
          fill
          priority={className.includes("large")}
          sizes={className.includes("large") ? "(max-width: 560px) 70vw, 368px" : "44px"}
          quality={88}
        />
        <span className="ai-guide-portrait-shine" />
      </div>
      <span className="ai-guide-portrait-orbit" aria-hidden="true" />
      <span className="ai-guide-portrait-status" aria-hidden="true" />
      {overlayText.trim() && (
        <div className="ai-guide-live-overlay" role="status" aria-live="polite">
          <span>{overlayLabel}</span>
          <p>{overlayText}</p>
        </div>
      )}
    </div>
  );
}
