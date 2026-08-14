"use client";

import { useRef, useState } from "react";

export function SpotlightCard({
  children,
  className = "",
  style = {},
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card-wrapper ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      <div
        className="spotlight-border-glow"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, var(--accent-glow), transparent 70%)`,
          opacity: coords.opacity,
        }}
      />
      <div className="spotlight-card-content">{children}</div>
    </div>
  );
}
