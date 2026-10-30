"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaveText({ 
  text, 
  className, 
  as: Tag = "h2", 
  trigger = true,
  delay = 0
}: { 
  text: string, 
  className?: string, 
  as?: any, 
  trigger?: boolean,
  delay?: number
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll(".wave-word");
    if (!words) return;

    gsap.fromTo(words,
      { y: 30, opacity: 0, rotateZ: 2 },
      {
        y: 0, 
        opacity: 1, 
        rotateZ: 0,
        duration: 0.8, 
        stagger: 0.03, // Fast wave effect
        ease: "power3.out",
        delay: delay,
        scrollTrigger: trigger ? { trigger: containerRef.current, start: "top 85%" } : undefined
      }
    );
  }, [trigger, delay]);

  return (
    <Tag ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="wave-word" style={{ display: "inline-block", marginRight: "0.25em", willChange: "transform, opacity" }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}