"use client";
import { useEffect, useRef } from "react";

export default function DitherCanvas({ isHovering }: { isHovering: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const dots: { x: number, y: number, ox: number, oy: number }[] = [];
    const spacing = 20;

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({ x, y, ox: x, oy: y });
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.tx = e.clientX - rect.left;
      mouse.current.ty = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;

      dots.forEach(dot => {
        const dx = mouse.current.x - dot.ox;
        const dy = mouse.current.y - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        let targetX = dot.ox;
        let targetY = dot.oy;

        if (dist < maxDist && isHovering) {
          const force = (1 - dist / maxDist);
          // Reduced scatter force from 80 to 25
          targetX = dot.ox - (dx / dist) * force * 25;
          targetY = dot.oy - (dy / dist) * force * 25;
        }

        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;

        const opacity = Math.min(1, Math.max(0.2, 1 - (dist / maxDist)));
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
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
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />;
}