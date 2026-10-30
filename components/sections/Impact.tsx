"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveText from "../WaveText";

gsap.registerPlugin(ScrollTrigger);

const impacts = [
  { num: "01", text: "Architected autonomous multi-agent systems to automate complex data retrieval and decision-making processes." },
  { num: "02", text: "Deployed AI-powered workflows using LLMs, OpenRouter, and RAG pipelines for real-world operations." },
  { num: "03", text: "Engineered high-performance, scalable web applications using Next.js, React, and TypeScript." },
  { num: "04", text: "Streamlined business operations by building robust API integrations and visual automations in Make.com." },
  { num: "05", text: "Developed fully automated video and audio pipelines using Remotion and AI text-to-speech generation." },
  { num: "06", text: "Shipped multiple digital products from initial concept and MVP planning to final cloud deployment." }
];

export default function Impact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".impact-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: "var(--section-y) var(--gutter)", borderBottom: "1px solid var(--line)", backgroundColor: "var(--bg)" }}>
      <style>{`
        .impact-card { transition: background-color 0.3s ease, border-color 0.3s ease; cursor: default; }
        .impact-card:hover { background-color: #ffffff; border-color: #ffffff !important; }
        .impact-card:hover .impact-number { color: rgba(0, 0, 0, 0.15) !important; }
        .impact-card:hover .impact-text { color: #050505 !important; }
        .impact-title { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 5rem); line-height: 0.9; text-transform: uppercase; margin: 0; font-weight: 400; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <WaveText text="Impact & Results" as="h2" className="impact-title" />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Results
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--line)", borderLeft: "1px solid var(--line)" }}>
        {impacts.map((impact, idx) => (
          <div key={idx} className="impact-card" style={{ padding: "2rem 1.5rem", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "2rem", minHeight: "180px" }}>
            <span className="impact-number" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#333333", lineHeight: 1, transition: "color 0.3s ease" }}>{impact.num}</span>
            <p className="impact-text" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 400, lineHeight: 1.5, color: "var(--fg)", margin: 0, transition: "color 0.3s ease" }}>{impact.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}