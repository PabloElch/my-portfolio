"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cols = 50;
      const rows = 25;
      const spacingX = width / cols;
      const spacingY = height / rows;

      // Draw horizontal lines
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x <= cols; x++) {
          const px = x * spacingX;
          
          const noise = Math.sin(x * 0.2 + time) * Math.cos(y * 0.1 + time * 0.5);
          const wave = Math.sin((x + y) * 0.15 + time * 1.5) * 35;
          const py = y * spacingY + (noise * 40) + wave;

          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        // Increased opacity from 0.15 to 0.6
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"; 
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          const px = x * spacingX;
          const noise = Math.sin(x * 0.2 + time) * Math.cos(y * 0.1 + time * 0.5);
          const wave = Math.sin((x + y) * 0.15 + time * 1.5) * 35;
          const py = y * spacingY + (noise * 40) + wave;

          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        // Increased opacity from 0.08 to 0.3
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; 
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ 
        padding: "var(--section-y) var(--gutter)", 
        borderBottom: "1px solid var(--line)",
        backgroundColor: "var(--bg)"
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "center" }}>
        
        <div ref={textRef} style={{ maxWidth: "500px", justifySelf: "end" }}>
          
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1.5rem", textTransform: "uppercase" }}>
            #02 &middot; WORKFLOWS
          </div>

          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "clamp(2.5rem, 4vw, 4rem)", 
            lineHeight: 1.1, 
            textTransform: "none", 
            margin: "0 0 1.5rem 0",
            fontWeight: 400
          }}>
            Data &amp; Process Automation
          </h2>

          <p style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: "18px", 
            lineHeight: 1.6, 
            color: "var(--fg-dim)",
            margin: 0
          }}>
            Architecting robust pipelines with Python, Node.js, and modern AI APIs. I build systems that synchronize data, eliminate repetitive tasks, and scale operations with absolute reliability.
          </p>

        </div>

        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "clamp(300px, 60vh, 600px)", 
          border: "1px solid var(--line)",
          overflow: "hidden",
          background: "#000",
          justifySelf: "start"
        }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        </div>

      </div>
    </section>
  );
}