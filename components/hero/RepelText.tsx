"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function RepelText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".char");
    if (!chars) return;

    const onMouseMove = (e: MouseEvent) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const distX = e.clientX - charX;
        const distY = e.clientY - charY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          gsap.to(char, { x: -(distX / dist) * force * 40, y: -(distY / dist) * force * 40, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(char, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        }
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(chars, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    // Reduced font size significantly
    <h1 ref={containerRef} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 0.95, textTransform: "uppercase", display: "flex", flexDirection: "column", gap: "0.05em", margin: 0 }}>
      {text.split(" ").map((word, i) => (
        <div key={i} style={{ display: "flex" }}>
          {word.split("").map((char, j) => (
            <span key={j} className="char" style={{ display: "inline-block", willChange: "transform" }}>{char}</span>
          ))}
        </div>
      ))}
    </h1>
  );
}