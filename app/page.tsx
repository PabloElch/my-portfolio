"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Preloader from "@/components/hero/Preloader";
import Meteor from "@/components/hero/Meteor";
import RepelText from "@/components/hero/RepelText";
import DitherCanvas from "@/components/hero/DitherCanvas";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Projects2 from "@/components/sections/Projects2";
import Projects3 from "@/components/sections/Projects3";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Impact from "@/components/sections/Impact";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Contact from "@/components/sections/Contact";
import Lab from "@/components/sections/Lab";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/Navbar";
import WaveText from "@/components/WaveText";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [currentTime, setCurrentTime] = useState("--:--");
  const heroTextRef = useRef<HTMLDivElement>(null);

  // Real-time clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(formattedTime);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        <Navbar />

        {/* --- HERO SECTION WRAPPER --- */}
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", borderBottom: "1px solid var(--line)", paddingTop: "80px" }}>
          
          {/* Info Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr 1fr", gap: "1rem", padding: "1rem var(--gutter)", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", color: "var(--fg-dim)", zIndex: 20, position: "relative" }}>
            <div>Lencho<br/>Lemessa</div>
            <div>Jimma, Ethiopia</div>
            <div>AI Automation Developer<br/>Agent Systems / Workflow Engineering</div>
            <div style={{ textAlign: "right" }}>Local Time<br/>{currentTime}</div>
          </div>

          {/* Hero Section Content */}
          <section 
            onMouseEnter={() => setIsHoveringHero(true)}
            onMouseLeave={() => setIsHoveringHero(false)}
            style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}
          >
            
            {/* Giant Background Text (LENCHO) */}
            <div style={{ position: "absolute", bottom: "-2vw", left: 0, width: "100%", zIndex: 0, pointerEvents: "none", display: "flex", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(6rem, 18vw, 24rem)", lineHeight: 0.75, color: "#fff", whiteSpace: "nowrap", letterSpacing: "-0.02em", display: "flex" }}>
                  {"LENCHO".split("").map((char, i) => {
                    if (char === "O") {
                      return (
                        <span key={i} style={{ position: "relative", display: "inline-block" }}>
                          {char}
                          <span style={{ position: "absolute", right: "1vw", bottom: "10%", writingMode: "vertical-rl", fontSize: "1vw", letterSpacing: "0.1em", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            lemessa
                          </span>
                        </span>
                      );
                    }
                    return <span key={i}>{char}</span>;
                  })}
              </div>
            </div>

            {/* Background Layers */}
            <DitherCanvas isHovering={isHoveringHero} />
            <Meteor />
            
            {/* Foreground Content */}
            <div ref={heroTextRef} style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "var(--gutter)", marginTop: "2vh" }}>
              <div style={{ maxWidth: "400px" }}>
                <WaveText text="[ 00 ] - OPEN TO COLLABORATIONS" as="div" className="hero-small-text" trigger={false} delay={0.5} />
                <div style={{ marginTop: "1.5rem" }}>
                  <RepelText text="AI AUTOMATION DEVELOPER" />
                </div>
              </div>
              
              <HeroCard />
            </div>

            {/* Bottom Bar of Hero */}
            <div style={{ position: "relative", zIndex: 10, padding: "1.5rem var(--gutter)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", color: "var(--fg-dim)", borderTop: "1px solid var(--line)" }}>
              <WaveText text="FULL-STACK DEVELOPER & AI ENGINEER — 2026" as="div" className="hero-bottom-text" trigger={false} delay={1} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>SCROLL &darr;</div>
            </div>
          </section>
        </div>

        <Marquee />
        <div id="about"><About /></div>
        <Journey />
        <Projects />
        <Projects2 />
        <Projects3 />
        <Skills />
        <Experience />
        <Impact />
        <div id="projects"><SelectedProjects /></div>
        <div id="contact"><Contact /></div>
        <div id="lab"><Lab /></div>
        <Footer />

      </main>
    </>
  );
}

// Magnetic Hero Card Component
function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  const cardCenter = useRef({ x: 0, y: 0 });
  const btn1Center = useRef({ x: 0, y: 0 });
  const btn2Center = useRef({ x: 0, y: 0 });

  const handleEnter = (e: React.MouseEvent, centerRef: React.MutableRefObject<{x:number, y:number}>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  const handleMove = (e: React.MouseEvent, centerRef: React.MutableRefObject<{x:number, y:number}>, ref: React.RefObject<HTMLElement | null>, strength: number) => {
    if (!ref.current) return;
    const x = (e.clientX - centerRef.current.x) * strength;
    const y = (e.clientY - centerRef.current.y) * strength;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  };

  const handleLeave = (ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={(e) => handleEnter(e, cardCenter)}
      onMouseMove={(e) => handleMove(e, cardCenter, cardRef, 0.05)}
      onMouseLeave={() => {
        handleLeave(cardRef);
        handleLeave(btn1Ref);
        handleLeave(btn2Ref);
      }}
      style={{ 
        width: "420px", background: "#050505", border: "1px solid var(--line)", 
        padding: "1.5rem", marginTop: "12vh", boxShadow: "0 10px 30px rgba(0,0,0,0.8)", 
        cursor: "none" 
      }}
    >
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", lineHeight: 1.6, marginBottom: "1.25rem", margin: 0, color: "var(--fg-dim)" }}>
        Full-stack developer and AI engineer. I design applications, agents and automations that save teams time — from prototype to cloud deployment.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        
        <button
          ref={btn1Ref}
          data-cursor="dark"
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          onMouseEnter={(e) => {
            handleEnter(e, btn1Center);
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.borderColor = "#fff";
          }}
          onMouseMove={(e) => { e.stopPropagation(); handleMove(e, btn1Center, btn1Ref, 0.2); }}
          onMouseLeave={(e) => {
            handleLeave(btn1Ref);
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "var(--line)";
          }}
          style={{ 
            flex: 1, padding: "0.75rem", border: "1px solid var(--line)", 
            background: "transparent", color: "#fff", fontFamily: "var(--font-mono)", 
            fontSize: "10px", textTransform: "uppercase", fontWeight: "bold",
            transition: "background 0.2s, color 0.2s, border-color 0.2s", cursor: "none"
          }}
        >
          See Projects
        </button>
        
        <button
          ref={btn2Ref}
          data-cursor="dark"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          onMouseEnter={(e) => handleEnter(e, btn2Center)}
          onMouseMove={(e) => { e.stopPropagation(); handleMove(e, btn2Center, btn2Ref, 0.2); }}
          onMouseLeave={() => handleLeave(btn2Ref)}
          style={{ 
            flex: 1, padding: "0.75rem", border: "1px solid #fff", 
            background: "#fff", color: "#000", fontFamily: "var(--font-mono)", 
            fontSize: "10px", textTransform: "uppercase", fontWeight: "bold",
            display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem",
            cursor: "none"
          }}
        >
          Get in Touch &rarr;
        </button>
        
      </div>
    </div>
  );
}