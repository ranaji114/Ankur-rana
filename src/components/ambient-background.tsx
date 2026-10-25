"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "precision-cursor";
    cursor.dataset.state = "idle";
    cursor.setAttribute("aria-hidden", "true");
    const core = document.createElement("span");
    core.className = "precision-cursor-core";
    const label = document.createElement("span");
    label.className = "precision-cursor-label";
    cursor.append(core, label);
    document.body.append(cursor);
    cursorRef.current = cursor;
    const interactiveSelector = [
      "a", "button", "input", "textarea", "select", "summary", "[role='button']", "[role='switch']",
      "[tabindex]:not([tabindex='-1'])", ".surface-card", ".hb-card", ".project-showcase-item",
      ".book-vault-card", ".research-paper-card", ".topic-card", ".path-card", ".skill-group",
      ".timeline-item", ".contact-form", ".page-scene-core", ".portrait-frame-glass", ".workflow-circuit-wrap",
    ].join(",");
    const surfaceSelector = ".surface-card,.hb-card,.project-showcase-item,.book-vault-card,.research-paper-card,.topic-card,.path-card,.skill-group,.timeline-item,.contact-form,.page-scene-core,.portrait-frame-glass,.workflow-circuit-wrap";
    let activeTarget: HTMLElement | null = null;
    let activeSurface: HTMLElement | null = null;

    const clearActiveTarget = () => {
      if (activeTarget) {
        activeTarget.removeAttribute("data-pointer-hover");
        activeTarget.style.setProperty("--magnet-x", "0px");
        activeTarget.style.setProperty("--magnet-y", "0px");
      }
      activeTarget = null;
      activeSurface?.removeAttribute("data-pointer-hover");
      activeSurface = null;
      cursorRef.current?.setAttribute("data-state", "idle");
      cursorRef.current?.removeAttribute("data-mode");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const { clientX, clientY } = event;
      spotlightRef.current?.style.setProperty("--pointer-x", `${clientX}px`);
      spotlightRef.current?.style.setProperty("--pointer-y", `${clientY}px`);
      cursorRef.current?.style.setProperty("--cursor-x", `${clientX}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${clientY}px`);

      const element = event.target instanceof Element ? event.target : null;
      const nextTarget = element?.closest<HTMLElement>(interactiveSelector) ?? null;
      const nextSurface = element?.closest<HTMLElement>(surfaceSelector) ?? null;
      if (nextTarget !== activeTarget) {
        if (activeTarget) {
          activeTarget.removeAttribute("data-pointer-hover");
          activeTarget.style.setProperty("--magnet-x", "0px");
          activeTarget.style.setProperty("--magnet-y", "0px");
        }
        activeTarget = nextTarget;
        activeTarget?.setAttribute("data-pointer-hover", "true");
      }
      if (nextSurface !== activeSurface) {
        activeSurface?.removeAttribute("data-pointer-hover");
        activeSurface = nextSurface;
      }
      if (activeSurface && activeSurface !== activeTarget) activeSurface.setAttribute("data-pointer-hover", "true");

      if (!nextTarget) {
        clearActiveTarget();
        return;
      }

      cursorRef.current?.setAttribute("data-state", "active");
      const cursorMode = nextSurface ? "surface" : nextTarget.matches("button,[role='button'],[role='switch']") ? "control" : "link";
      cursorRef.current?.setAttribute("data-mode", cursorMode);
      const rect = nextTarget.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      nextTarget.style.setProperty("--hover-x", `${localX}px`);
      nextTarget.style.setProperty("--hover-y", `${localY}px`);

      if (nextTarget.matches("a,button,[role='button'],[role='switch']")) {
        const pullX = (clientX - (rect.left + rect.width / 2)) * 0.11;
        const pullY = (clientY - (rect.top + rect.height / 2)) * 0.11;
        nextTarget.style.setProperty("--magnet-x", `${Math.max(-8, Math.min(8, pullX))}px`);
        nextTarget.style.setProperty("--magnet-y", `${Math.max(-8, Math.min(8, pullY))}px`);
      }
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) clearActiveTarget();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      cursor.remove();
      cursorRef.current = null;
    };
  }, []);

  return (
    <>
    <div className="ambient-container" aria-hidden="true">
      {/* Background ambient orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Dynamic Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="cursor-spotlight"
      />

      {/* Subtle Grid overlay */}
      <div className="ambient-grid-overlay" />
    </div>
    </>
  );
}
