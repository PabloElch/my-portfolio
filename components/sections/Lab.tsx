"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Lab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

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
      
      const cols = 80;
      const rows = 40;
      
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        const depth = y / rows;
        
        for (let x = 0; x <= cols; x++) {
          const px = (x / cols) * width;
          const baseY = (y / rows) * height;
          
          const peakCenter = cols * 0.5;
          const peakWidth = cols * 0.25;
          const peak = Math.exp(-Math.pow((x - peakCenter) / peakWidth, 2)) * 80;
          const peak2 = Math.exp(-Math.pow((x - cols * 0.8) / (cols * 0.15), 2)) * 40;
          const noise = Math.sin(x * 0.15 + time) * Math.cos(y * 0.2 + time * 0.5) * 15;
          
          const displacement = (peak + peak2 + noise) * (1 - depth * 0.8);
          const py = baseY - displacement;

          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        
        const opacity = Math.max(0.05, 1 - Math.pow(depth, 2));
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let x = 0; x <= cols; x += 4) {
        ctx.beginPath();
        const px = (x / cols) * width;
        
        for (let y = 0; y < rows; y++) {
          const depth = y / rows;
          const baseY = (y / rows) * height;
          
          const peakCenter = cols * 0.5;
          const peakWidth = cols * 0.25;
          const peak = Math.exp(-Math.pow((x - peakCenter) / peakWidth, 2)) * 80;
          const peak2 = Math.exp(-Math.pow((x - cols * 0.8) / (cols * 0.15), 2)) * 40;
          const noise = Math.sin(x * 0.15 + time) * Math.cos(y * 0.2 + time * 0.5) * 15;
          
          const displacement = (peak + peak2 + noise) * (1 - depth * 0.8);
          const py = baseY - displacement;

          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.stroke();
      }

      time += 0.015;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Text Reveal Animation
    const ctxGsap = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: "20vh", opacity: 0 },
        {
          y: "0vh", opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
          }
        }
      );
    }, containerRef);

    // Kinetic Typography Hover Effect (Exactly 5 closest letters)
    const letters = textRef.current?.querySelectorAll('.lab-letter');
    if (letters && letters.length > 0) {
      const letterArray = Array.from(letters);

      const onMouseMove = (e: MouseEvent) => {
        // 1. Calculate distances from mouse to the center of each letter
        const distances = letterArray.map((letter) => {
          const rect = letter.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
          return { el: letter, dist };
        });

        // 2. Sort by distance to find the closest letters
        distances.sort((a, b) => a.dist - b.dist);

        // 3. Apply styles
        distances.forEach((item, rank) => {
          if (rank < 5) {
            // These 5 get bold, solid white, wider, and push outward
            gsap.to(item.el, {
              color: "var(--fg)",
              WebkitTextStrokeWidth: "0px",
              fontWeight: 700,
              scaleX: 1.15, 
              marginLeft: "0.05em", // Creates the gap
              marginRight: "0.05em", // Creates the gap
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            // The rest stay thin and outlined
            gsap.to(item.el, {
              color: "transparent",
              WebkitTextStrokeWidth: "2px",
              fontWeight: 200,
              scaleX: 1,
              marginLeft: "0em",
              marginRight: "0em",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
      };
      
      const onMouseLeave = () => {
        gsap.to(letterArray, {
          color: "transparent",
          WebkitTextStrokeWidth: "2px",
          fontWeight: 200,
          scaleX: 1,
          marginLeft: "0em",
          marginRight: "0em",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      window.addEventListener("mousemove", onMouseMove);
      containerRef.current?.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        containerRef.current?.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animationFrameId);
        ctxGsap.revert();
      };
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      ctxGsap.revert();
    };
  }, []);

  const text = "LENCHO LEMESSA";

  return (
    <section 
      ref={containerRef}
      style={{ 
        height: "100vh", 
        width: "100vw", 
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderBottom: "1px solid var(--line)"
      }}
    >
      {/* 3D Wireframe Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: "absolute", 
          inset: 0, 
          width: "100%", 
          height: "100%",
          zIndex: 0
        }} 
      />

      {/* Massive Interactive Text */}
      <div style={{ 
        position: "relative", 
        zIndex: 10, 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        paddingBottom: "2vh"
      }}>
        <h1 
          ref={textRef}
          style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "clamp(4rem, 12vw, 16rem)", 
            lineHeight: 0.75, 
            color: "transparent", 
            WebkitTextStroke: "2px var(--fg)",
            textTransform: "uppercase",
            margin: 0,
            whiteSpace: "nowrap",
            textAlign: "center",
            letterSpacing: "-0.02em",
            display: "flex"
          }}
        >
          {text.split("").map((char, i) => (
            <span 
              key={i} 
              className="lab-letter"
              style={{ 
                display: "inline-block", 
                willChange: "transform, font-weight, color, margin",
                transformOrigin: "bottom center",
                fontWeight: 200,
                transition: "color 0.2s ease" // Smooth out the color just in case
              }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}