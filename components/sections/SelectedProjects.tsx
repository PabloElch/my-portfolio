"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Wutete — Academic Planning Suite",
    description: "A comprehensive academic planning platform for Ethiopian university students. Features a GPA calculator, CGPA tracker, target GPA planner, and what-if simulator. Built with a focus on privacy and zero-account usage.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    status: "PERSONAL PROJECT · 2026",
    url: "https://wutete.vercel.app/",
  },
  {
    id: "02",
    title: "Lencho's Voice Lab — Kokoro TTS Host",
    description: "High-performance, self-hosted AI Voice Synthesis Studio. Designed as an open, lightning-fast alternative to restrictive commercial platforms like ElevenLabs. Provides a clean web UI to generate and stream natural-sounding speech.",
    tech: ["Python", "Streamlit", "Kokoro TTS", "AI Audio"],
    status: "PERSONAL PROJECT · 2026",
    url: "https://lenchosxvoicelab.streamlit.app/",
  },
  {
    id: "03",
    title: "Lenchoxos AI Studio — Text-to-Image",
    description: "An open-source, high-performance image generation suite built on cutting-edge open-weight diffusion architectures. Provides streamlined pipelines for rendering high-fidelity visuals, storybook illustrations, and web graphics with rapid Streamlit UI prototyping.",
    tech: ["Python", "Streamlit", "Diffusion Models", "AI Art"],
    status: "PERSONAL PROJECT · 2026",
    url: "https://lenchosimage.streamlit.app/",
  }
];

const WuteteMockup = () => (
  <div style={{ width: "100%", height: "100%", background: "#1a1a1a", color: "#fff", fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid #2a2a2a" }}>
      <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>Wutete</div>
      <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem", color: "#a0a0a0" }}>
        <span style={{ color: "#4ade80", borderBottom: "2px solid #4ade80", paddingBottom: "0.2rem" }}>Home</span>
        <span>GPA Calculator</span>
        <span>CGPA Calculator</span>
        <span>GPA Planner</span>
        <span>GPA Simulator</span>
        <span>Grade Scale</span>
      </div>
    </div>
    <div style={{ padding: "3rem 2rem", textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "0 0 1rem 0", lineHeight: 1.1 }}>
        Calculate your GPA.<br/>Plan your path.
      </h1>
      <p style={{ fontSize: "0.9rem", color: "#a0a0a0", maxWidth: "500px", lineHeight: 1.5, marginBottom: "2rem" }}>
        Wutete helps Ethiopian university students calculate GPA and CGPA, and plan what grades they need to reach their academic targets.
      </p>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button style={{ background: "#4ade80", color: "#000", border: "none", padding: "0.6rem 1.2rem", borderRadius: "6px", fontWeight: 600, fontSize: "0.85rem" }}>Calculate your GPA</button>
        <button style={{ background: "transparent", color: "#fff", border: "1px solid #333", padding: "0.6rem 1.2rem", borderRadius: "6px", fontWeight: 600, fontSize: "0.85rem" }}>Calculate CGPA</button>
        <button style={{ background: "transparent", color: "#fff", border: "1px solid #333", padding: "0.6rem 1.2rem", borderRadius: "6px", fontWeight: 600, fontSize: "0.85rem" }}>Plan your target</button>
      </div>
      <div style={{ fontSize: "0.75rem", color: "#666", marginBottom: "2rem" }}>
        No account required · Anonymous calculation · All processing in your browser
      </div>
      <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "12px", width: "100%", maxWidth: "600px", padding: "1.5rem", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div><h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>GPA Calculator</h3></div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "0.5rem" }}>University</div>
            <div style={{ background: "#1a1a1a", border: "1px solid #333", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center", width: "200px" }}>
              <span>Jimma University</span><span style={{ fontSize: "0.6rem" }}>?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VoiceLabMockup = () => (
  <div style={{ width: "100%", height: "100%", background: "#0e1117", color: "#fafafa", fontFamily: "'Segoe UI', Roboto, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", color: "#a0a0a0" }}>
      <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>&gt;&gt;</div>
      <div style={{ display: "flex", gap: "1rem", fontSize: "0.9rem" }}><span>Share</span> <span>?</span> <span>??</span> <span>?</span></div>
    </div>
    <div style={{ padding: "0 4rem", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", margin: "0 0 0.5rem 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontWeight: 700 }}>
          <span style={{ color: "#8c8cff" }}>??? LENCHOS</span> AUDIO STUDIO
        </h1>
        <p style={{ fontSize: "0.95rem", color: "#a0a0a0", margin: 0 }}>Built by <span style={{ color: "#8c8cff", fontWeight: "bold" }}>Lencho Lemessa</span> to deliver high-quality voice synthesis.</p>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid #333", marginBottom: "2rem" }}>
        <div style={{ padding: "0.5rem 1rem", borderBottom: "2px solid #ff4b4b", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", background: "#1e1e24" }}>??? Single Narration</div>
        <div style={{ padding: "0.5rem 1rem", color: "#888", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>?? 2-Person Conversation</div>
      </div>
      <h2 style={{ fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "0.5rem", margin: "0 0 1.5rem 0" }}>?? Single Narration Studio</h2>
      <div style={{ fontSize: "0.9rem", marginBottom: "0.5rem", color: "#fafafa" }}>Paste your story script here</div>
      <div style={{ flex: 1, border: "1px solid #333", borderRadius: "4px", background: "#0e1117", padding: "1rem" }}>
        <span style={{ color: "#666", fontSize: "0.95rem" }}>Type or paste your long story script here...</span>
      </div>
    </div>
  </div>
);

const ImageGenMockup = () => (
  <div style={{ width: "100%", height: "100%", background: "#f8f9fc", color: "#1a1a2e", fontFamily: "'Inter', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden", padding: "1.5rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.2rem", color: "#6366f1" }}>?</span>
        <h1 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Lenchxos <span style={{ color: "#6366f1" }}>AI Studio</span></h1>
      </div>
      <div style={{ background: "#e0e7ff", color: "#3730a3", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>By Lencho Lemessa</div>
    </div>
    <div style={{ display: "flex", gap: "2rem", flex: 1 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>Prompt Studio</h2>
        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 1rem 0" }}>Type your concept cleanly. The engine will synthesize your asset.</p>
        <textarea placeholder="A minimalist studio product shot..." style={{ flex: 1, border: "2px solid #cbd5e1", borderRadius: "12px", padding: "1rem", fontSize: "0.85rem", resize: "none", background: "#fff", outline: "none" }} />
        <button style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", padding: "0.8rem", fontSize: "0.95rem", fontWeight: 600, marginTop: "1rem", cursor: "pointer" }}>Generate Masterpiece</button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>Live Canvas</h2>
        <div style={{ flex: 1, border: "2px dashed #cbd5e1", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff" }}>
          <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>??</span>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.25rem 0" }}>Workspace Ready</h3>
        </div>
      </div>
    </div>
  </div>
);

export default function SelectedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX); yTo(e.clientY);
      };
      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: hoveredIndex !== null ? 1 : 0,
        opacity: hoveredIndex !== null ? 1 : 0,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (track && containerRef.current) {
      const getScrollAmount = () => window.innerWidth * 0.62 * (projects.length - 1);
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinType: "transform",
          scrub: 0.5, 
          start: "top top",
          end: () => "+=" + (getScrollAmount() * 0.4), 
        }
      });
    }
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={containerRef} style={{ height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "var(--bg)", borderBottom: "1px solid var(--line)", position: "relative" }}>
      
      {/* Fixed Cursor Element */}
      <div 
        ref={cursorRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "80px", height: "80px", borderRadius: "50%",
          backgroundColor: "#fff", color: "#000", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold",
          pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference",
          transform: "scale(0)", opacity: 0 // Initial state, GSAP takes over
        }}
      >
        VIEW
      </div>

      <div ref={trackRef} style={{ display: "flex", height: "100%", width: "max-content" }}>
        <div style={{ width: "38vw", flexShrink: 0, height: "100%", padding: "var(--gutter)", borderRight: "1px solid var(--line)", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "var(--bg)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "2rem", textTransform: "uppercase" }}>| [ 02 / 04 ] · WORK</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 4vw, 5rem)", lineHeight: 0.9, textTransform: "uppercase", margin: 0, fontWeight: 400 }}>Selected Projects</h2>
          </div>
          <div style={{ maxWidth: "400px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", lineHeight: 1.6, color: "var(--fg-dim)", marginBottom: "2rem" }}>A selection of SaaS products, headless platforms and internal tools — designed, built and shipped end to end.</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--fg-dim)" }}><span>SCROLL</span> <span>&rarr;</span></div>
          </div>
        </div>

        {projects.map((project, index) => (
          <div key={index} style={{ width: "62vw", flexShrink: 0, height: "100%", padding: "var(--gutter)", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid var(--line)" }}>
            <ProjectContent project={project} index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectContent({ project, index, hoveredIndex, setHoveredIndex }: any) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase" }}>
        <span>{project.id} / 04</span>
        <span>{project.status}</span>
      </div>
      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ position: "relative", display: "block", width: "100%", height: "45vh", border: "1px solid var(--line)", overflow: "hidden", marginBottom: "1.5rem", cursor: "none", textDecoration: "none" }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
        <div style={{ position: "absolute", inset: 0, filter: hoveredIndex === index ? "blur(0px) contrast(1) brightness(1)" : "blur(3px) contrast(3) brightness(1.5)", maskImage: hoveredIndex === index ? "none" : "radial-gradient(circle, black 1.5px, transparent 1.5px)", maskSize: "4px 4px", transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)", pointerEvents: "none", WebkitMaskImage: hoveredIndex === index ? "none" : "radial-gradient(circle, black 1.5px, transparent 1.5px)", WebkitMaskSize: "4px 4px" }}>
          {index === 0 ? <WuteteMockup /> : index === 1 ? <VoiceLabMockup /> : <ImageGenMockup />}
        </div>
      </a>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2vw, 2.2rem)", lineHeight: 1.1, margin: 0, fontWeight: 400 }}>{project.title}</h3>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.6, color: "var(--fg-dim)", marginBottom: "1rem" }}>{project.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {project.tech.map((t: string, tIdx: number) => (<span key={tIdx} className="hover-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", padding: "0.3rem 0.5rem", border: "1px solid var(--line)", color: "var(--fg-dim)" }}>{t}</span>))}
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", color: "#000", padding: "0.6rem 1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", fontWeight: "bold" }}>VIEW SITE</a>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", color: "#fff", border: "1px solid var(--line)", padding: "0.6rem 1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", cursor: "pointer" }}><span>VIEW DETAILS</span> <span>&rarr;</span></a>
          </div>
        </div>
      </div>
    </>
  );
}
