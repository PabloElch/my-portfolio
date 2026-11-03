"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rxTo = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ryTo = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      rxTo(e.clientX); ryTo(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target) {
        // Check if the mouse is over an element with data-cursor="dark"
        const isDarkTarget = target.closest('[data-cursor="dark"]');
        setIsDark(!!isDarkTarget);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={dot} className={`${styles.dot} ${isDark ? styles.dark : ""}`} />
      <div ref={ring} className={`${styles.ring} ${isDark ? styles.dark : ""}`} />
    </>
  );
}