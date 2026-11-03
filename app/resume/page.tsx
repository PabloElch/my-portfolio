"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// --- SVG Icons ---
const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// 1. We move the actual content into its own component
function ResumeContent() {
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "var(--bg)";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

  const handleDownload = async () => {
    const element = document.getElementById("resume-content");
    if (!element) return;
    
    setIsGenerating(true);
    element.classList.add("pdf-mode");

    const html2pdf = (await import("html2pdf.js")).default;
    
    html2pdf().set({
      margin: 0.5,
      filename: 'Lencho_Lemessa_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(element).save().then(() => {
      element.classList.remove("pdf-mode");
      setIsGenerating(false);
    });
  };

  useEffect(() => {
    if (searchParams.get("download") === "true") {
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--fg)", fontFamily: "var(--font-sans)" }}>
      
      <style>{`
        .pdf-mode { background-color: #ffffff !important; color: #000000 !important; padding: 2rem !important; }
        .pdf-mode * { color: #000000 !important; border-color: #cccccc !important; }
        .pdf-mode .no-print { display: none !important; }
        .pdf-mode .print-tag { border: 1px solid #cccccc !important; }
        .pdf-mode .print-box { background: transparent !important; border: 1px solid #cccccc !important; }
      `}</style>

      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem var(--gutter)", maxWidth: "1200px", margin: "0 auto" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--fg-faint)", border: "1px solid var(--line)", padding: "0.75rem 1.5rem", color: "#fff", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase" }}>
          <span>&larr;</span> Back to Website
        </Link>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleDownload} disabled={isGenerating} style={{ background: "#fff", border: "none", padding: "0.75rem 1.5rem", color: "#000", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold", cursor: isGenerating ? "not-allowed" : "pointer", opacity: isGenerating ? 0.7 : 1 }}>
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", border: "1px solid var(--line)", padding: "4rem", backgroundColor: "var(--bg)" }}>
        
        <div id="resume-content" style={{ backgroundColor: "var(--bg)" }}>
          <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "2rem", marginBottom: "3rem" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9, textTransform: "uppercase", margin: "0 0 1rem 0", fontWeight: 300, color: "var(--fg)" }}>
              Lencho Lemessa
            </h1>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 300, color: "var(--fg-dim)", margin: "0 0 2rem 0" }}>
              AI Automation Developer | Full-Stack Developer
            </h2>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg)" }}>
              <a href="tel:+251900527920" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", textDecoration: "none" }}><PhoneIcon /> +251 900 527 920</a>
              <a href="mailto:lencholemessa@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", textDecoration: "none" }}><EmailIcon /> LENCHOLEMESSA@GMAIL.COM</a>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPinIcon /> JIMMA, ETHIOPIA</div>
              <a href="https://github.com/PabloElch" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", textDecoration: "none" }}><GithubIcon /> GITHUB</a>
              <a href="https://t.me/rise2power" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", textDecoration: "none" }}><TelegramIcon /> TELEGRAM</a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem" }}>
            <div>
              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Profile</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--fg)" }}>
                  AI Automation Developer specializing in agent architectures, workflow engineering, and digital transformation. I currently study Computer Science at Jimma University and design intelligent solutions to automate operations, improve decision-making, and modernize internal tools.
                </p>
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Professional Experience</h3>
                <ExperienceItem title="Independent AI & Automation Developer" company="Freelance & Personal Projects" date="2025 - PRESENT" bullets={["Architecting autonomous multi-agent systems and automating complex workflows.", "Building full-stack web applications with Next.js and React, integrating LLMs and modern APIs.", "Developing programmatic video and audio generation pipelines using Remotion and TTS."]} />
                <ExperienceItem title="Computer Science Student & Builder" company="Jimma University" date="2023 - PRESENT" bullets={["Actively using AI coding agents to accelerate development, research, and debugging.", "Focusing on modular architecture, responsive web design, and shipping MVPs.", "Prioritizing free, open-source, and self-hostable technologies."]} />
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Recent Projects</h3>
                <ProjectItem title="Wutete — Academic Planning Suite" date="2026" desc="Comprehensive academic planning platform for Ethiopian university students. Features GPA calculator, CGPA tracker, and target GPA planner." link="https://wutete.vercel.app/" />
                <ProjectItem title="Lencho's Voice Lab — Kokoro TTS Host" date="2026" desc="High-performance, self-hosted AI Voice Synthesis Studio. Open alternative to restrictive commercial platforms." link="https://lenchosxvoicelab.streamlit.app/" />
                <ProjectItem title="Lenchoxos AI Studio — Text-to-Image" date="2026" desc="Open-source image generation suite built on open-weight diffusion architectures for rendering high-fidelity visuals." link="https://lenchosimage.streamlit.app/" />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Education</h3>
                <ExperienceItem title="B.Sc. Computer Science" company="Jimma University" date="2023 - PRESENT" bullets={["Focusing on software engineering, algorithms, and modern application development."]} />
                <ExperienceItem title="Full-Stack Web Development" company="Self-Directed & AI-Assisted" date="2024" bullets={["Building scalable web apps with React, Next.js, TypeScript, and modular architecture."]} />
              </div>
            </div>

            <div>
              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Skills</h3>
                <SkillGroup title="Front-End Development" skills={["HTML5", "CSS3", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS", "TAILWIND CSS"]} />
                <SkillGroup title="Back-End & Data" skills={["NODE.JS", "PYTHON", "REST API", "LLM INTEGRATION", "MAKE.COM", "STREAMLIT"]} />
                <SkillGroup title="Cloud, Tooling & Observability" skills={["GIT", "GITHUB", "VERCEL", "VS CODE", "POWERSHELL"]} />
                <SkillGroup title="Design & Product" skills={["RESPONSIVE DESIGN", "UI/UX", "MVP DEVELOPMENT", "SEO BASICS"]} />
              </div>

              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Key Strengths</h3>
                <ul style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--fg)", paddingLeft: "1rem", margin: 0 }}>
                  <li style={{ marginBottom: "0.5rem" }}>Business process automation with measurable operational impact.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Production deployment of AI solutions (agents, RAG, LLM integrations).</li>
                  <li style={{ marginBottom: "0.5rem" }}>Modern web architecture focused on performance and accessibility.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Interests</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["Emerging technologies", "AI Agents", "Open Source", "Technical Research", "Problem Solving"].map((interest, i) => (
                    <span key={i} className="print-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", border: "1px solid var(--line)", padding: "0.4rem 0.6rem", color: "var(--fg)" }}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// 2. Wrap the export in Suspense
export default function Resume() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }} />}>
      <ResumeContent />
    </Suspense>
  );
}

// Helper Components
function ExperienceItem({ title, company, date, bullets }: any) {
  return (
    <div className="print-box" style={{ marginBottom: "2rem", border: "1px solid var(--line)", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, margin: 0, color: "var(--fg)" }}>{title}</h4>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)" }}>{date}</span>
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--fg-dim)", marginBottom: "1rem" }}>{company}</div>
      <ul style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--fg)", paddingLeft: "1rem", margin: 0 }}>
        {bullets.map((b: string, i: number) => <li key={i} style={{ marginBottom: "0.4rem" }}>{b}</li>)}
      </ul>
    </div>
  );
}

function ProjectItem({ title, date, desc, link }: any) {
  return (
    <div className="print-box" style={{ marginBottom: "1.5rem", border: "1px solid var(--line)", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, margin: 0, color: "var(--fg)" }}>{title}</h4>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)" }}>{date}</span>
      </div>
      <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--fg)", marginBottom: "1rem" }}>{desc}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {link.replace("https://", "").toUpperCase()} &nearr;
      </a>
    </div>
  );
}

function SkillGroup({ title, skills }: any) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "0.75rem", textTransform: "uppercase" }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {skills.map((s: string, i: number) => (
          <span key={i} className="print-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", border: "1px solid var(--line)", padding: "0.3rem 0.5rem", color: "var(--fg)" }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}