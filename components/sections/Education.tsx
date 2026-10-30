"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  { year: "2023 - PRESENT", title: "B.Sc. Computer Science", institution: "Jimma University", description: "Focusing on software engineering, algorithms, and modern application development." },
  { year: "2024", title: "Full-Stack Web Development", institution: "Self-Directed & AI-Assisted", description: "Building scalable web apps with React, Next.js, TypeScript, and modular architecture." },
  { year: "2023", title: "AI & Automation Engineering", institution: "Project-Based Learning", description: "Orchestrating workflows with Make.com, integrating LLMs, and developing autonomous agents." }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      });
      // Cards
      gsap.fromTo(".edu-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ marginTop: "5rem" }} ref={containerRef}>
      <div ref={titleRef} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
        Education
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--line)", borderLeft: "1px solid var(--line)" }}>
        {educationData.map((edu, idx) => (
          <div key={idx} className="edu-card" style={{ padding: "2.5rem 2rem", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)" }}>{edu.year}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 1.8vw, 1.8rem)", lineHeight: 1.2, margin: 0, fontWeight: 400 }}>{edu.title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--fg)" }}>{edu.institution}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--fg-dim)", lineHeight: 1.5 }}>{edu.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}