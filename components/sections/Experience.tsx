"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Education from "./Education";
import WaveText from "../WaveText";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { id: "#1", date: "2025 - PRESENT", title: "Independent AI & Automation Developer", company: "FREELANCE & PERSONAL PROJECTS", description: "Architecting autonomous multi-agent systems and automating complex workflows. Building full-stack web applications with Next.js and React, integrating LLMs and modern APIs to solve real-world problems and build digital products.", tags: ["AI Agents", "Make.com Automation", "Next.js & React", "API Integration", "Python", "LLM Workflows"] },
  { id: "#2", date: "2024 - PRESENT", title: "Content Automation Engineer", company: "AI MEDIA PROJECTS", description: "Developing automated video and audio pipelines. Orchestrating RSS-based AI summarization, text-to-speech generation, and automated distribution to Telegram and social media using programmatic video tools.", tags: ["Remotion", "OpenAI Whisper", "TTS", "Telegram Bots", "RSS Automation"] },
  { id: "#3", date: "2023 - PRESENT", title: "Computer Science Student & Builder", company: "JIMMA UNIVERSITY", description: "Studying CS while actively using AI coding agents to accelerate development and research. Focusing on modular architecture, responsive web design, and shipping MVPs with a focus on free and open-source technologies.", tags: ["Product Development", "AI-Assisted Dev", "TypeScript", "Problem Solving", "MVP Building"] }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".exp-row");
      rows.forEach((row: any) => {
        gsap.fromTo(row, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none reverse" }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: "var(--section-y) var(--gutter)", borderBottom: "1px solid var(--line)", backgroundColor: "var(--bg)" }}>
      <style>{`
        .exp-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 6rem); line-height: 0.9; text-transform: uppercase; margin: 0; font-weight: 400; }
      `}</style>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <WaveText text="Professional Experience" as="h2" className="exp-title" />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Path
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {experiences.map((exp, index) => (
          <div key={index} className="exp-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr 2fr", gap: "2rem", padding: "2.5rem 0", borderTop: "1px solid var(--line)", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold" }}>{exp.id}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase", lineHeight: 1.4 }}>{exp.date}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2vw, 2.2rem)", margin: 0, fontWeight: 400, lineHeight: 1.1 }}>{exp.title}</h3>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase" }}>{exp.company}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6, color: "var(--fg-dim)", margin: 0 }}>{exp.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {exp.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="hover-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", padding: "0.4rem 0.6rem", border: "1px solid var(--line)", color: "var(--fg-dim)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Education />
    </section>
  );
}