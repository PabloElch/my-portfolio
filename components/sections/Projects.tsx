"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
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
    const centerX = width / 2;
    const centerY = height / 2;

    const lines: { angle: number, length: number, speed: number, opacity: number }[] = [];
    
    for (let i = 0; i < 300; i++) {
      lines.push({
        angle: Math.random() * Math.PI * 2,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#050505";
      ctx.fill();

      lines.forEach(line => {
        const startRadius = 40;
        const endRadius = startRadius + line.length;
        
        const startX = centerX + Math.cos(line.angle) * startRadius;
        const startY = centerY + Math.sin(line.angle) * startRadius;
        const endX = centerX + Math.cos(line.angle) * endRadius;
        const endY = centerY + Math.sin(line.angle) * endRadius;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        line.length += line.speed;
        
        if (line.length > Math.max(width, height)) {
          line.length = 40;
          line.opacity = Math.random() * 0.5 + 0.1;
        }
      });

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
            start: "top 80%",
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
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "center" }}>
        
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "clamp(300px, 50vh, 500px)", // Fixed height to prevent massive stretching
          border: "1px solid var(--line)",
          overflow: "hidden",
          background: "#000"
        }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        </div>

        <div ref={textRef} style={{ maxWidth: "500px" }}>
          
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1.5rem", textTransform: "uppercase" }}>
            #01 &middot; AI &amp; AUTOMATION
          </div>

          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "clamp(2.5rem, 4vw, 4rem)", 
            lineHeight: 1.1, 
            textTransform: "none", 
            margin: "0 0 1.5rem 0",
            fontWeight: 400
          }}>
            Intelligent Workflows
          </h2>

          <p style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: "18px", 
            lineHeight: 1.6, 
            color: "var(--fg-dim)",
            margin: 0
          }}>
            Architecting autonomous multi-agent systems and RAG pipelines that streamline data retrieval and automate complex decision-making processes for real-world operations.
          </p>

        </div>

      </div>
    </section>
  );
}