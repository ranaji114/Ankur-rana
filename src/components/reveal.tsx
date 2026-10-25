"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "fade" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  scale?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 36,
  duration = 0.65,
  scale = 1,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const getInitial = () => {
    if (reduceMotion) return false;

    switch (direction) {
      case "left":
        return { opacity: 0, x: -distance, y: 0, scale: 0.985 };
      case "right":
        return { opacity: 0, x: distance, y: 0, scale: 0.985 };
      case "down":
        return { opacity: 0, x: 0, y: -distance, scale: 0.985 };
      case "scale":
        return { opacity: 0, x: 0, y: 16, scale: 0.94 };
      case "fade":
        return { opacity: 0, x: 0, y: 0 };
      case "up":
      default:
        return { opacity: 0, x: 0, y: distance, scale: 0.985 };
    }
  };

  const getAnimate = () => {
    if (reduceMotion) return undefined;
    return { opacity: 1, x: 0, y: 0, scale };
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
