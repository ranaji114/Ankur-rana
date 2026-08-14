"use client";

import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="ambient-container" aria-hidden="true">
      {/* Background ambient orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Dynamic Cursor Spotlight */}
      <div
        className="cursor-spotlight"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      />

      {/* Subtle Grid overlay */}
      <div className="ambient-grid-overlay" />
    </div>
  );
}
