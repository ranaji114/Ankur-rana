"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { author } from "@/data/content";
import { sound } from "@/lib/audio-haptics";

export function PortraitCard({ priority = false }: { priority?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    sound.play("hover");
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="portrait-3d-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Status Badge — Top Right */}
      <div className="portrait-badge-float portrait-badge-tl">
        <span className="live-pulse-dot" />
        <span>⚡ Exploring Code, Time &amp; Mind</span>
      </div>

      {/* Floating Status Badge — Bottom Left */}
      <div className="portrait-badge-float portrait-badge-br">
        <span>📍 India · Available for Systems</span>
      </div>

      {/* 3D Glass Frame */}
      <div
        className="portrait-frame-glass"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <div className="portrait-img-inner">
          <Image
            src={author.portrait}
            alt={`${author.name} portrait`}
            width={640}
            height={760}
            className="portrait-image"
            priority={priority}
            sizes="(max-width: 920px) 100vw, 520px"
          />

          {/* Dynamic Glare Reflection */}
          <div
            className="portrait-glare-sweep"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
              opacity: glarePos.opacity,
              transition: "opacity 200ms ease",
            }}
          />
        </div>

        {/* Digital Signature & Luxury Stamp */}
        <div className="signature-wrap">
          <svg
            className="signature-svg"
            viewBox="0 0 240 60"
            aria-label="Ankur Rana digital signature"
          >
            <path
              d="M15,45 Q35,10 50,42 Q60,15 75,40 T95,38 M115,22 Q130,45 145,28 Q155,42 170,25 M185,20 L215,35 M190,45 Q210,12 230,30"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 0,
                animation: "dash 2s ease-in-out forwards",
              }}
            />
          </svg>
          <span className="signature-stamp">EST. 2025 · AUTHOR &amp; DEV</span>
        </div>
      </div>
    </div>
  );
}
