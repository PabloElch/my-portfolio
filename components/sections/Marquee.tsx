"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Slow idle drift
    const tl = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 80, 
      ease: "none",
    });

    // Scroll velocity
    ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        let targetScale = 1;

        if (Math.abs(velocity) > 10) {
          targetScale = 1 + Math.min(Math.abs(velocity) / 500, 1.2);
        }
        
        gsap.to(tl, { 
          timeScale: targetScale, 
          duration: 0.8, 
          overwrite: true,
          ease: "power2.out"
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section style={{ 
      position: "relative", 
      // Reduced padding from 8rem to 4rem
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
      
      {/* Marquee Container */}
      <div style={{ display: "flex", whiteSpace: "nowrap", width: "fit-content", position: "relative", zIndex: 10 }} ref={trackRef}>
        
        {[0, 1].map((blockIdx) => (
          <div key={blockIdx} style={{ display: "flex", alignItems: "center" }}>
            
            {/* EMPLOY (Solid Normal) */}
            <span style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(4rem, 8vw, 10rem)", 
              lineHeight: 0.8, 
              color: "var(--fg)", 
              textTransform: "uppercase",
              fontWeight: 500 
            }}>
              EMPLOY
            </span>

            <span style={{ margin: "0 4vw", fontSize: "clamp(2rem, 3vw, 3rem)", color: "var(--fg-dim)" }}>*</span>

            {/* AUTOMATE (Skeleton Outline) */}
            <span style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(4rem, 8vw, 10rem)", 
              lineHeight: 0.8, 
              color: "transparent", 
              WebkitTextStroke: "1.5px var(--fg)", 
              textTransform: "uppercase",
              fontWeight: 300 
            }}>
              AUTOMATE
            </span>

            <span style={{ margin: "0 4vw", fontSize: "clamp(2rem, 3vw, 3rem)", color: "var(--fg-dim)" }}>*</span>

            {/* INTEGRATE (Solid Normal) */}
            <span style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(4rem, 8vw, 10rem)", 
              lineHeight: 0.8, 
              color: "var(--fg)", 
              textTransform: "uppercase",
              fontWeight: 500 
            }}>
              INTEGRATE
            </span>

            <span style={{ margin: "0 4vw", fontSize: "clamp(2rem, 3vw, 3rem)", color: "var(--fg-dim)" }}>*</span>

          </div>
        ))}
      </div>

      {/* Subtext neatly placed below */}
      {/* Reduced marginTop from 4rem to 2rem */}
      <div style={{ marginTop: "2rem", textAlign: "center", zIndex: 10, position: "relative" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-dim)", margin: 0, lineHeight: 1.6 }}>
          Software, AI and Cloud serving real-world<br/>operations.
        </p>
      </div>

    </section>
  );
}