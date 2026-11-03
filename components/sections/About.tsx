"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveText from "../WaveText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: "var(--section-y) var(--gutter)", borderBottom: "1px solid var(--line)", position: "relative", backgroundColor: "var(--bg)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "2rem", textTransform: "uppercase" }}>
        | [ 01 / 04 ] &middot; ABOUT
      </div>

      <WaveText 
        text="From Code to Operations" 
        as="h2"
        className=""
        trigger={true}
      />
      {/* Overriding inline style for the title since WaveText handles the Tag */}
      <style>{`
        h2.wave-title { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 7rem); line-height: 1; text-transform: uppercase; margin: 0 0 4rem 0; font-weight: 400; }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          
          <WaveText 
            text="AI Automation Developer specializing in agent architectures, workflow engineering, and digital transformation. I currently study Computer Science and design intelligent solutions to automate operations, improve decision-making, and modernize internal tools."
            as="p"
            className="font-display big-text"
          />

          <WaveText 
            text="My expertise covers modern web development, cloud infrastructure, business-applied artificial intelligence, and process automation. I work on application development, system integration, and cloud administration. On a daily basis, I develop with React, Next.js, TypeScript, Python, and Node.js."
            as="p"
            className="font-sans small-text"
          />

          <WaveText 
            text="Passionate about innovation, I am particularly interested in artificial intelligence and AI agents, Machine Learning and data analysis, business process automation, SaaS development, cloud architecture and DevOps. Through my projects, I create custom web platforms and AI integrations for organizations looking to accelerate their digital growth."
            as="p"
            className="font-sans small-text"
          />
        </div>
        
        <div ref={cardRef} style={{ border: "1px solid var(--line)", background: "rgba(255, 255, 255, 0.02)", padding: "2rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "2rem", textTransform: "uppercase" }}>Profile</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
            <ProfileRow label="Based In" value="Jimma, ET" />
            <ProfileRow label="Role" value="AI Automation Dev" />
            <ProfileRow label="At" value="Open to Work" />
            <ProfileRow label="Focus" value="AI &middot; Automation &middot; Cloud" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a href="/resume" target="_blank" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", color: "#000", padding: "1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold" }}>
              <span>View Resume</span><span>&rarr;</span>
            </a>
            <a 
  href="/resume?download=true" 
  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", color: "#fff", padding: "1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", border: "1px solid var(--line)" }}
>
  <span>Download Resume</span>
  <span style={{ fontSize: "9px", color: "var(--fg-dim)" }}>PDF &darr;</span>
</a>
          </div>
        </div>
      </div>

      <style>{`
        .font-display { font-family: var(--font-display); font-weight: 300; margin: 0; line-height: 1.2; }
        .big-text { font-size: clamp(1.5rem, 2.5vw, 2.5rem); }
        .font-sans { font-family: var(--font-sans); color: var(--fg-dim); max-width: 90%; }
        .small-text { font-size: 16px; line-height: 1.7; margin: 0; }
        .wave-title { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 7rem); line-height: 1; text-transform: uppercase; margin: 0 0 4rem 0; font-weight: 400; }
      `}</style>
    </section>
  );
}

function ProfileRow({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.75rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", textAlign: "right" }} dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}