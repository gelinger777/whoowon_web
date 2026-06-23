"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The signature element: a "tale of the tape" fight card for an all-time
 * rivalry. The two head-to-head totals tick up from zero on first paint —
 * an instrument coming online — and hold their final value. Honors
 * prefers-reduced-motion by snapping straight to the result.
 */

// Last seven meetings, most recent on the right. true = you won.
const STREAK = [true, false, true, true, false, true, true];

function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutExpo — fast then settling, like a counter locking in.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, durationMs]);

  return value;
}

export default function TaleOfTheTape() {
  const you = useCountUp(24);
  const rival = useCountUp(19);
  const wins = STREAK.filter(Boolean).length;

  return (
    <div className="tape" aria-label="All-time rivalry record: you 24, rival 19">
      <div className="tape-head">
        <span>Tale of the Tape</span>
        <span className="tape-rec">
          <span className="dot" />
          All-time
        </span>
      </div>

      <div className="tape-grid">
        <div className="fighter you">
          <div className="fighter-badge">Y</div>
          <div className="fighter-name">You</div>
          <div className="fighter-tag">★ 1,420 ELO</div>
        </div>

        <div className="tape-score" aria-hidden="true">
          <span className="num you">{you}</span>
          <span className="sep">—</span>
          <span className="num rival">{rival}</span>
        </div>

        <div className="fighter rival">
          <div className="fighter-badge">M</div>
          <div className="fighter-name">Marco</div>
          <div className="fighter-tag">1,388 ELO</div>
        </div>
      </div>

      <div className="streak">
        <div className="streak-label">
          <span>Last 7</span>
          <span className="hot">W{wins} · ON FIRE</span>
        </div>
        <div className="pips">
          {STREAK.map((won, i) => (
            <span key={i} className={`pip ${won ? "win" : "loss"}`} />
          ))}
        </div>
      </div>

      <div className="tape-foot">Tennis · Singles · Best of 3</div>
    </div>
  );
}
