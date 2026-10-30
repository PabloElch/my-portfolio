"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rxTo = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ryTo = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      rxTo(e.clientX); ryTo(e.clientY);
    };

    // Click physics
    const onMouseDown = () => {
      gsap.to(ring.current, { scale: 0.6, duration: 0.2, ease: "power2.out" });
      gsap.to(dot.current, { scale: 0.5, duration: 0.2, ease: "power2.out" });
    };
    const onMouseUp = () => {
      gsap.to(ring.current, { scale: 1, duration: 0.3, ease: "back.out(2)" });
      gsap.to(dot.current, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={dot} className={styles.dot} />
      <div ref={ring} className={styles.ring} />
    </>
  );
}