"use client";
import { useEffect, useRef } from "react";

export default function DitherCanvas({ isHovering }: { isHovering: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000 });
  
  const gridDots = useRef<{ x: number, y: number, ox: number, oy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const spacing = 24;
    gridDots.current = [];
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        gridDots.current.push({ x, y, ox: x, oy: y });
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.tx = e.clientX - rect.left;
      mouse.current.ty = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.current.tx = -1000;
      mouse.current.ty = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.1;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.1;

      gridDots.current.forEach(dot => {
        const dx = mouse.current.x - dot.ox;
        const dy = mouse.current.y - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // 1. Reduced the radius of the effect (from 220 to 140)
        const maxDist = 140; 
        
        let targetX = dot.ox;
        let targetY = dot.oy;

        if (dist < maxDist && isHovering) {
          const force = Math.pow(1 - dist / maxDist, 2);
          
          // 2. Reduced the push strength (from 90 to 45)
          targetX = dot.ox - (dx / dist) * force * 45;
          targetY = dot.oy - (dy / dist) * force * 45;
        }

        dot.x += (targetX - dot.x) * 0.12;
        dot.y += (targetY - dot.y) * 0.12;

        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillRect(dot.x, dot.y, 2.5, 2.5);
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
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />;
}