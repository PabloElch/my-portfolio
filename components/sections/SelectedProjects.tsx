"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", title: "Wutete — Academic Planning Suite", description: "A comprehensive academic planning platform for Ethiopian university students. Features a GPA calculator, CGPA tracker, target GPA planner, and what-if simulator. Built with a focus on privacy and zero-account usage.", tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"], status: "PERSONAL PROJECT · 2026", url: "https://wutete.vercel.app/" },
  { id: "02", title: "Lencho's Voice Lab — Kokoro TTS Host", description: "High-performance, self-hosted AI Voice Synthesis Studio. Designed as an open, lightning-fast alternative to restrictive commercial platforms like ElevenLabs. Provides a clean web UI to generate and stream natural-sounding speech.", tech: ["Python", "Streamlit", "Kokoro TTS", "AI Audio"], status: "PERSONAL PROJECT · 2026", url: "https://lenchosxvoicelab.streamlit.app/" },
  { id: "03", title: "Lenchoxos AI Studio — Text-to-Image", description: "An open-source, high-performance image generation suite built on cutting-edge open-weight diffusion architectures. Provides streamlined pipelines for rendering high-fidelity visuals, storybook illustrations, and web graphics with rapid Streamlit UI prototyping.", tech: ["Python", "Streamlit", "Diffusion Models", "AI Art"], status: "PERSONAL PROJECT · 2026", url: "https://lenchosimage.streamlit.app/" }
];

const WuteteMockup = () => (
  <div style={{ width: "100%", height: "100%", background: "#181818", color: "#fff", fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ display: "flex", gap: "0.4rem", padding: "0.5rem 1rem", background: "#111", borderBottom: "1px solid #333" }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56" }} />
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e" }} />
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f" }} />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1.5rem", borderBottom: "1px solid #222" }}>
      <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Wutete</div>
    </div>
    <div style={{ padding: "1.5rem", textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>Calculate your GPA.<br/>Plan your path.</h1>
    </div>
  </div>
);

const VoiceLabMockup = () => (
  <div style={{ width: "100%", height: "100%", background: "#0e1117", color: "#fafafa", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div style={{ padding: "1rem 2rem", textAlign: "center", marginBottom: "2rem" }}>
      <h1 style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>LENCHOS AUDIO STUDIO</h1>
    </div>
  </div>
);

const ImageGenMockup = () => (
  <div style={{ width: "100%", height: "100%", background: "#f8f9fc", color: "#1a1a2e", display: "flex", flexDirection: "column", overflow: "hidden", padding: "1.5rem" }}>
    <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Lenchoxos AI Studio</h1>
  </div>
);

export default function SelectedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
      const onMouseMove = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
      window.addEventListener("mousemove", onMouseMove);
    }

    const track = trackRef.current;
    if (track && containerRef.current) {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Fade up for the title
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      // Horizontal scroll
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5, 
          start: "top top",
          end: () => "+=" + (window.innerHeight * 2),
          snap: { snapTo: 1 / (projects.length - 1), duration: 0.5, ease: "power2.inOut" }
        }
      });
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={containerRef} style={{ height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "var(--bg)", borderBottom: "1px solid var(--line)", position: "relative", zIndex: 10 }}>
      <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#fff", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%, -50%) scale(0)", opacity: 0, transition: "opacity 0.2s ease, transform 0.2s ease", mixBlendMode: "difference" }} ref={(el) => { if (el) { el.style.opacity = hoveredIndex !== null ? "1" : "0"; el.style.transform = hoveredIndex !== null ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)"; } }}>
        VIEW
      </div>

      <div ref={trackRef} style={{ display: "flex", height: "100%", width: "max-content" }}>
        <div style={{ width: "38vw", flexShrink: 0, height: "100%", padding: "var(--gutter)", borderRight: "1px solid var(--line)", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "var(--bg)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "2rem", textTransform: "uppercase" }}>| [ 02 / 04 ] · WORK</div>
            <h2 ref={titleRef} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 4vw, 5rem)", lineHeight: 0.9, textTransform: "uppercase", margin: 0, fontWeight: 400 }}>Selected Projects</h2>
          </div>
          <div style={{ maxWidth: "400px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", lineHeight: 1.6, color: "var(--fg-dim)", marginBottom: "2rem" }}>A selection of SaaS products, headless platforms and internal tools — designed, built and shipped end to end.</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--fg-dim)" }}><span>SCROLL</span> <span>&rarr;</span></div>
          </div>
        </div>

        {projects.map((project, index) => (
          <div key={index} style={{ width: "62vw", flexShrink: 0, height: "100%", padding: "var(--gutter)", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase" }}>
              <span>{project.id} / 04</span><span>{project.status}</span>
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ position: "relative", display: "block", width: "100%", height: "45vh", border: "1px solid var(--line)", overflow: "hidden", marginBottom: "1.5rem", cursor: "none", textDecoration: "none" }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              <div style={{ position: "absolute", inset: 0, filter: hoveredIndex === index ? "blur(0px) contrast(1) brightness(1)" : "blur(4px) contrast(3) brightness(1.5)", maskImage: hoveredIndex === index ? "none" : "radial-gradient(circle, black 1.5px, transparent 1.5px)", maskSize: "4px 4px", transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)", pointerEvents: "none", WebkitMaskImage: hoveredIndex === index ? "none" : "radial-gradient(circle, black 1.5px, transparent 1.5px)", WebkitMaskSize: "4px 4px" }}>
                {index === 0 ? <WuteteMockup /> : index === 1 ? <VoiceLabMockup /> : <ImageGenMockup />}
              </div>
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2vw, 2.2rem)", lineHeight: 1.1, margin: 0, fontWeight: 400 }}>{project.title}</h3>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.6, color: "var(--fg-dim)", marginBottom: "1rem" }}>{project.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {project.tech.map((t: string, tIdx: number) => (
                    <span key={tIdx} className="hover-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", padding: "0.3rem 0.5rem", border: "1px solid var(--line)", color: "var(--fg-dim)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", color: "#000", padding: "0.6rem 1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", fontWeight: "bold" }}>VIEW SITE</a>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", color: "#fff", border: "1px solid var(--line)", padding: "0.6rem 1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", cursor: "pointer" }}><span>VIEW DETAILS</span> <span>&rarr;</span></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}