"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const storySelector = [
  ".page-hero", ".section", ".project-showcase-item", ".surface-card", ".skill-group",
  ".research-paper-card", ".topic-card", ".timeline-item", ".path-card", ".book-vault-card",
  ".contact-form", ".knowledge-graph-box", ".workflow-circuit-wrap", ".case-section-stacked",
].join(",");

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      root.style.setProperty("--page-scroll", `${progress}`);

      if (!reduced) {
        document.querySelectorAll<HTMLElement>(".story-section-visible").forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          section.style.setProperty("--story-drift", `${Math.max(-1, Math.min(1, distance))}`);
        });
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };

    const observed = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        node.classList.toggle("story-visible", entry.isIntersecting);
        if (node.matches(".section, .page-hero")) node.classList.toggle("story-section-visible", entry.isIntersecting);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    const attachStoryNodes = (rootNode: ParentNode) => {
      rootNode.querySelectorAll<HTMLElement>(storySelector).forEach((card) => {
        if (observed.has(card)) return;
        observed.add(card);
        card.style.setProperty("--story-delay", `${(observedCount++ % 4) * 75}ms`);
        observer.observe(card);
      });
    };
    let observedCount = 0;
    attachStoryNodes(document);
    const contentObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(storySelector)) attachStoryNodes(node.parentElement ?? node);
            else attachStoryNodes(node);
          }
        });
      }
    });
    const main = document.querySelector("main");
    if (main) contentObserver.observe(main, { childList: true, subtree: true });

    const onPointer = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(".surface-card, .skill-group, .research-paper-card, .topic-card, .timeline-item, .path-card, .book-vault-card, .contact-form, .project-showcase-item, .case-section-stacked");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--glass-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--glass-y", `${event.clientY - rect.top}px`);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      observer.disconnect();
      contentObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--page-scroll");
    };
  }, [pathname]);

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div ref={progressRef} className="scroll-progress-bar" />
    </div>
  );
}
