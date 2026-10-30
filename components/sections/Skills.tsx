"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveText from "../WaveText";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { title: "Development", num: "01", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "Node.js", "Python"] },
  { title: "AI & Data", num: "02", skills: ["OpenRouter API", "LLM Integration", "AI Agents", "Prompt Engineering", "Whisper", "Text-to-Speech"] },
  { title: "Automation", num: "03", skills: ["Make.com", "API Automation", "RSS Automation", "Telegram Bots", "Data Management", "AI Workflows"] },
  { title: "Tools & Env", num: "04", skills: ["Git", "GitHub", "OpenCode", "VS Code", "PowerShell", "Vercel", "Flutter", "Android SDK"] },
  { title: "Media & Content", num: "05", skills: ["Remotion", "Video Automation", "Audio Processing", "Streamlit", "SEO Basics"] },
  { title: "Product Dev", num: "06", skills: ["MVP Development", "Product Planning", "Tech Specs", "Problem Solving", "Technical Research"] }
];

const expertiseAreas = [
  "Artificial Intelligence & AI Agents", "Business Process Automation", "Full-Stack Web Development", "LLM Integration & Prompt Engineering", "API & Workflow Engineering", "AI-Assisted Software Development"
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-cell", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });

      gsap.fromTo(".skill-tag", { y: 10, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.02, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });

      gsap.fromTo(expertiseRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: expertiseRef.current, start: "top 85%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: "var(--section-y) var(--gutter)", borderBottom: "1px solid var(--line)", backgroundColor: "var(--bg)" }}>
      <style>{`
        .skills-title { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 5rem); line-height: 0.9; text-transform: uppercase; margin: 0; font-weight: 400; }
      `}</style>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <WaveText text="Skills" as="h2" className="skills-title" />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Stack &middot; 35
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--line)", borderLeft: "1px solid var(--line)", position: "relative", marginBottom: "5rem" }}>
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-cell" style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "2rem 1.5rem", position: "relative" }}>
            <span style={{ position: "absolute", top: "-11px", left: "-6px", color: "var(--fg-dim)", fontFamily: "var(--font-mono)", fontSize: "14px", background: "var(--bg)", padding: "0 4px" }}>+</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", margin: 0, letterSpacing: "0.05em" }}>
                {category.title}
              </h3>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)" }}>{category.num}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-tag hover-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", padding: "0.3rem 0.5rem", border: "1px solid var(--line)", color: "var(--fg-dim)" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div ref={expertiseRef}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem" }}>
          Areas of Expertise
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", lineHeight: 1.3 }}>
          {expertiseAreas.map((area, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", marginRight: "1rem", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2vw, 2rem)", color: "var(--fg)", fontWeight: 300, letterSpacing: "0.02em" }}>{area}</span>
              {idx !== expertiseAreas.length - 1 && (
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2vw, 2rem)", color: "var(--fg-dim)", margin: "0 1rem", fontWeight: 300 }}>/</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}