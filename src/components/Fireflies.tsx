import React, { useMemo } from "react";
type FirefliesProps = {
  count?: number;
  className?: string;
  trigger?: boolean; // can be any type that changes
};
export default function Fireflies({
  count = 28,
  className = "absolute inset-0",
  trigger,
}: FirefliesProps) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 4 + 1; // 4–10px
        const top = Math.random() * 100; // %
        const left = Math.random() * 100; // %
        const duration = Math.random() * 8 + 10; // 10–18s (slower movement)
        const flicker = Math.random() * 2 + 2; // 2–4s (gentle flicker)
        const delay = Math.random() * 6; // 0–6s
        const driftX = (Math.random() - 0.5) * 40; // -20–20px (smaller drift)
        const driftY = (Math.random() - 0.5) * 40;
        return {
          id: i,
          size,
          top,
          left,
          duration,
          flicker,
          delay,
          driftX,
          driftY,
        };
      }),
    [count, trigger]
  );

  return (
    <div className={`pointer-events-none ${className} `}>
      {flies.map((f) => (
        <span
          key={f.id}
          className="absolute rounded-full"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            background:
              "radial-gradient(circle, rgba(255,255,180,0.95) 0%, rgba(255,255,180,0.6) 45%, rgba(255,255,180,0) 70%)",
            filter: "blur(0.3px)",
            boxShadow:
              "0 0 6px 2px rgba(255,255,180,0.9), 0 0 18px 6px rgba(255,255,120,0.7), 0 0 36px 16px rgba(255,255,120,0.25)",
            animation: `
              float-${f.id} ${f.duration}s ease-in-out ${
              f.delay
            }s infinite alternate,
              flicker ${f.flicker}s ease-in-out ${f.delay / 2}s infinite
            `,
          }}
        />
      ))}

      {/* flicker keyframes */}
      <style>
        {`
          @keyframes flicker {
            0%, 100% { opacity: 0.2; transform: scale(0.95); }
            20% { opacity: 0.6; }
            50% { opacity: 1; transform: scale(1.05); }
            80% { opacity: 0.6; }
          }
        `}
      </style>

      {/* float animations for each firefly */}
      <style>
        {flies
          .map(
            (f) => `
            @keyframes float-${f.id} {
              0%   { transform: translate(0px, 0px); }
              50%  { transform: translate(${f.driftX}px, ${f.driftY}px); }
              100% { transform: translate(0px, 0px); }
            }
          `
          )
          .join("\n")}
      </style>
    </div>
  );
}
