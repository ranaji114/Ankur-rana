"use client";

import { useRef } from "react";
import Image from "next/image";
import { author } from "@/data/content";
import { sound } from "@/lib/audio-haptics";

export function PortraitCard({ priority = false }: { priority?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || !frameRef.current || e.pointerType === "touch") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    cardRef.current.style.setProperty("--portrait-pointer-x", `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty("--portrait-pointer-y", `${(y / rect.height) * 100}%`);
    const offsetX = (x / rect.width) - 0.5;
    const offsetY = (y / rect.height) - 0.5;
    cardRef.current.style.setProperty("--portrait-depth-x", `${offsetX * 10}px`);
    cardRef.current.style.setProperty("--portrait-depth-y", `${offsetY * 10}px`);
    cardRef.current.style.setProperty("--portrait-orbit-x", `${offsetX * -5}px`);
    cardRef.current.style.setProperty("--portrait-orbit-y", `${offsetY * -5}px`);
    cardRef.current.style.setProperty("--portrait-satellite-x", `${offsetX * -16}px`);
    cardRef.current.style.setProperty("--portrait-satellite-y", `${offsetY * -16}px`);
    cardRef.current.style.setProperty("--portrait-rotate-x", `${((y - centerY) / centerY) * -8}deg`);
    cardRef.current.style.setProperty("--portrait-rotate-y", `${((x - centerX) / centerX) * 8}deg`);
    cardRef.current.dataset.pointerActive = "true";
  };

  const handleMouseEnter = () => {
    sound.play("hover");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--portrait-rotate-x", "0deg");
    cardRef.current.style.setProperty("--portrait-rotate-y", "0deg");
    cardRef.current.style.setProperty("--portrait-depth-x", "0px");
    cardRef.current.style.setProperty("--portrait-depth-y", "0px");
    cardRef.current.style.setProperty("--portrait-orbit-x", "0px");
    cardRef.current.style.setProperty("--portrait-orbit-y", "0px");
    cardRef.current.style.setProperty("--portrait-satellite-x", "0px");
    cardRef.current.style.setProperty("--portrait-satellite-y", "0px");
    cardRef.current.dataset.pointerActive = "false";
  };

  return (
    <div
      className="portrait-3d-card"
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onMouseEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <span className="portrait-depth-orbit" aria-hidden="true"><i /><i /><i /></span>
      <span className="portrait-depth-satellite" aria-hidden="true" />
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
        ref={frameRef}
      >
        <div className="portrait-img-inner">
          <Image
            src={author.portrait}
            alt={`${author.name} portrait`}
            width={640}
            height={760}
            className="portrait-image"
            priority={priority}
            loading={priority ? "eager" : undefined}
            sizes="(max-width: 920px) 100vw, 520px"
          />

          {/* Dynamic Glare Reflection */}
          <div
            className="portrait-glare-sweep"
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
