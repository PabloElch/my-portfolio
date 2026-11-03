"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let xPos = 0;
    let momentum = 0;
    let baseDrift = -1.5; // Default drift is Left
    let halfWidth = 0;
    let lastScrollY = window.scrollY;

    const updateWidth = () => {
      halfWidth = track.scrollWidth / 2;
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    const ticker = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // 1. Detect scroll direction and add a small amount of momentum
      if (deltaY > 1) {
        momentum += deltaY * 0.08; // 0.08 makes it less sensitive to fast scrolling
        baseDrift = 1.5;           // Idle drift goes Right
      } else if (deltaY < -1) {
        momentum += deltaY * 0.08;
        baseDrift = -1.5;          // Idle drift goes Left
      }

      // 2. Friction: Quickly reduces momentum so it doesn't travel too far
      momentum *= 0.85;

      // 3. Apply movement (momentum + the current base drift)
      xPos += momentum + baseDrift;

      // 4. Infinite wrap logic
      if (halfWidth > 0) {
        if (xPos <= -halfWidth) {
          xPos += halfWidth; 
        } else if (xPos > 0) {
          xPos -= halfWidth; 
        }
      }

      // 5. Update position
      gsap.set(track, { x: xPos });
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("resize", updateWidth);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <section style={{ 
      position: "relative", 
      padding: "4rem 0", 
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)", 
      overflow: "hidden", 
      backgroundColor: "#0a0a0a", 
      backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      
      <div style={{ display: "flex", whiteSpace: "nowrap", width: "fit-content", position: "relative", zIndex: 10 }} ref={trackRef}>
        
        {[0, 1].map((blockIdx) => (
          <div key={blockIdx} style={{ display: "flex", alignItems: "center" }}>
            
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 8vw, 10rem)", lineHeight: 0.8, color: "var(--fg)", textTransform: "uppercase", fontWeight: 500 }}>
              DEPLOY
            </span>

            <span style={{ margin: "0 4vw", fontSize: "clamp(2rem, 3vw, 3rem)", color: "var(--fg-dim)" }}>*</span>

            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 8vw, 10rem)", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "1.5px var(--fg)", textTransform: "uppercase", fontWeight: 300 }}>
              AUTOMATE
            </span>

            <span style={{ margin: "0 4vw", fontSize: "clamp(2rem, 3vw, 3rem)", color: "var(--fg-dim)" }}>*</span>

            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 8vw, 10rem)", lineHeight: 0.8, color: "var(--fg)", textTransform: "uppercase", fontWeight: 500 }}>
              INTEGRATE
            </span>

            <span style={{ margin: "0 4vw", fontSize: "clamp(2rem, 3vw, 3rem)", color: "var(--fg-dim)" }}>*</span>

          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center", zIndex: 10, position: "relative" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-dim)", margin: 0, lineHeight: 1.6 }}>
          Software, AI and cloud serving real-world<br/>operations.
        </p>
      </div>

    </section>
  );
}