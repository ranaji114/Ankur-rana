"use client";

const tickerItems = [
  "✦ EZRA: RUST COMPILER & BYTECODE VM",
  "✦ THE UNKNOWABLE REALITY (169 PAGES)",
  "✦ ZENODO QUANTUM PAPERS",
  "✦ 7 PUBLISHED KINDLE TITLES",
  "✦ THE ARCHITECTURE OF EXISTENCE",
  "✦ INDEPENDENT RESEARCHER",
  "✦ TIME & CONSCIOUSNESS",
  "✦ AI-ASSISTED DEVELOPMENT",
  "✦ LEARN AWADHI HERITAGE",
  "✦ SHRI KRISHNA FULL-STACK PLATFORM",
];

export function TickerStrip() {
  return (
    <div className="ticker-wrapper" aria-hidden="true">
      <div className="ticker-content">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <span key={idx} className="ticker-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
