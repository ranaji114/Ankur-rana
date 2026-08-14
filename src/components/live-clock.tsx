"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-IN", options).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-clock-badge">
      <span className="live-pulse-dot" />
      <span>New Delhi, India (IST)</span>
      <span className="live-clock-time">{timeStr || "Loading..."}</span>
    </div>
  );
}
