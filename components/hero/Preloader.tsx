"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100, duration: 2.5, ease: "power2.inOut",
        onUpdate: () => setProgress(Math.floor(obj.val)),
        onComplete: () => {
          gsap.to(textRef.current, {
            opacity: 0, y: -50, duration: 0.6, ease: "power3.in",
            onComplete: () => {
              gsap.to(containerRef.current, {
                yPercent: -100, duration: 0.8, ease: "power4.inOut",
                onComplete: onComplete
              });
            }
          });
        }
      });
    });
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, background: "var(--bg)", zIndex: 10000, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "var(--gutter)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "12px", marginBottom: "2rem" }}>
        <div style={{ lineHeight: "1.8" }}>
          <div> &gt; init renderer <span style={{ color: "var(--fg-dim)" }}>ok</span></div>
          <div> &gt; load typefaces <span style={{ color: "var(--fg-dim)" }}>ok</span></div>
          <div> &gt; compile dither shader <span style={{ color: "var(--fg-dim)" }}>ok</span></div>
          <div> &gt; sync scroll engine <span style={{ color: "var(--fg-dim)" }}>ok</span></div>
        </div>
        <div>JIMMA, ET — 7.67°N</div>
      </div>
      <div ref={textRef} style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-hero)", lineHeight: 0.75, textTransform: "uppercase" }}>
        {progress.toString().padStart(3, "0")}
      </div>
    </div>
  );
}