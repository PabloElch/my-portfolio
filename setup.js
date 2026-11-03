const fs = require('fs');
const path = require('path');

// 1. Create the Resume Page
const resumeDir = path.join(__dirname, 'app', 'resume');
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });

const resumeContent = `
"use client";
import Link from "next/link";

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--fg)", fontFamily: "var(--font-sans)" }}>
      
      {/* Global Print Styles */}
      <style>{\`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .resume-container { border: none !important; }
          .resume-tag { border-color: #ccc !important; color: #333 !important; }
          .resume-text { color: #333 !important; }
          .resume-title { color: black !important; }
        }
        .resume-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; }
        @media (max-width: 900px) { .resume-grid { grid-template-columns: 1fr; gap: 2rem; } }
      \`}</style>

      {/* Top Navigation Bar */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem var(--gutter)", maxWidth: "1200px", margin: "0 auto" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--fg-faint)", border: "1px solid var(--line)", padding: "0.75rem 1.5rem", color: "#fff", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase" }}>
          <span>&larr;</span> Back to Website
        </Link>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handlePrint} style={{ background: "var(--fg-faint)", border: "1px solid var(--line)", padding: "0.75rem 1.5rem", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", cursor: "pointer" }}>
            Print
          </button>
          <button onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fff", border: "none", padding: "0.75rem 1.5rem", color: "#000", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold", cursor: "pointer" }}>
            <span>&darr;</span> Download PDF
          </button>
        </div>
      </div>

      {/* Main Resume Container */}
      <div className="resume-container" style={{ maxWidth: "1200px", margin: "0 auto", border: "1px solid var(--line)", padding: "4rem", backgroundColor: "var(--bg)" }}>
        
        {/* Header Section */}
        <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "2rem", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9, textTransform: "uppercase", margin: "0 0 1rem 0", fontWeight: 300, color: "var(--fg)" }}>
            Lencho Lemessa
          </h1>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2vw, 2rem)", fontWeight: 300, color: "var(--fg-dim)", margin: "0 0 2rem 0" }}>
            AI Automation Developer | Full-Stack Developer
          </h2>
          
          {/* Contact Info Row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>📞</span> +251 911 234 567
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>✉️</span> LENCHOLEMESSA@GMAIL.COM
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>📍</span> JIMMA, ETHIOPIA
            </div>
            <a href="https://github.com/PabloElch" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", textDecoration: "none" }}>
              <span>🐙</span> GITHUB
            </a>
            <a href="https://t.me/rise2power" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", textDecoration: "none" }}>
              <span>✈️</span> TELEGRAM
            </a>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="resume-grid">
          
          {/* LEFT COLUMN */}
          <div>
            {/* Profile */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Profile</h3>
              <p className="resume-text" style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--fg)" }}>
                AI Automation Developer specializing in agent architectures, workflow engineering, and digital transformation. I currently study Computer Science at Jimma University and design intelligent solutions to automate operations, improve decision-making, and modernize internal tools.
              </p>
            </div>

            {/* Professional Experience */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Professional Experience</h3>
              
              <ExperienceItem 
                title="Independent AI & Automation Developer" 
                company="Freelance & Personal Projects" 
                date="2025 - PRESENT"
                bullets={[
                  "Architecting autonomous multi-agent systems and automating complex workflows.",
                  "Building full-stack web applications with Next.js and React, integrating LLMs and modern APIs.",
                  "Developing programmatic video and audio generation pipelines using Remotion and TTS."
                ]}
              />
              
              <ExperienceItem 
                title="Computer Science Student & Builder" 
                company="Jimma University" 
                date="2023 - PRESENT"
                bullets={[
                  "Actively using AI coding agents to accelerate development, research, and debugging.",
                  "Focusing on modular architecture, responsive web design, and shipping MVPs.",
                  "Prioritizing free, open-source, and self-hostable technologies."
                ]}
              />
            </div>

            {/* Recent Projects */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Recent Projects</h3>
              
              <ProjectItem 
                title="Wutete — Academic Planning Suite" 
                date="2026"
                desc="Comprehensive academic planning platform for Ethiopian university students. Features GPA calculator, CGPA tracker, and target GPA planner."
                link="https://wutete.vercel.app/"
              />
              
              <ProjectItem 
                title="Lencho's Voice Lab — Kokoro TTS Host" 
                date="2026"
                desc="High-performance, self-hosted AI Voice Synthesis Studio. Open alternative to restrictive commercial platforms."
                link="https://lenchosxvoicelab.streamlit.app/"
              />

              <ProjectItem 
                title="Lenchoxos AI Studio — Text-to-Image" 
                date="2026"
                desc="Open-source image generation suite built on open-weight diffusion architectures for rendering high-fidelity visuals."
                link="https://lenchosimage.streamlit.app/"
              />
            </div>

            {/* Education */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Education</h3>
              
              <ExperienceItem 
                title="B.Sc. Computer Science" 
                company="Jimma University" 
                date="2023 - PRESENT"
                bullets={["Focusing on software engineering, algorithms, and modern application development."]}
              />
              <ExperienceItem 
                title="Full-Stack Web Development" 
                company="Self-Directed & AI-Assisted" 
                date="2024"
                bullets={["Building scalable web apps with React, Next.js, TypeScript, and modular architecture."]}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Skills */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Skills</h3>
              
              <SkillGroup title="Front-End Development" skills={["HTML5", "CSS3", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS", "TAILWIND CSS"]} />
              <SkillGroup title="Back-End & Data" skills={["NODE.JS", "PYTHON", "REST API", "LLM INTEGRATION", "MAKE.COM", "STREAMLIT"]} />
              <SkillGroup title="Cloud, Tooling & Observability" skills={["GIT", "GITHUB", "VERCEL", "VS CODE", "POWERSHELL"]} />
              <SkillGroup title="Design & Product" skills={["RESPONSIVE DESIGN", "UI/UX", "MVP DEVELOPMENT", "SEO BASICS"]} />
            </div>

            {/* Key Strengths */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Key Strengths</h3>
              <ul className="resume-text" style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--fg)", paddingLeft: "1rem", margin: 0 }}>
                <li style={{ marginBottom: "0.5rem" }}>Business process automation with measurable operational impact.</li>
                <li style={{ marginBottom: "0.5rem" }}>Production deployment of AI solutions (agents, RAG, LLM integrations).</li>
                <li style={{ marginBottom: "0.5rem" }}>Modern web architecture focused on performance and accessibility.</li>
              </ul>
            </div>

            {/* Interests */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", marginBottom: "1.5rem", fontWeight: 400 }}>Interests</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["Emerging technologies", "AI Agents", "Open Source", "Technical Research", "Problem Solving"].map((interest, i) => (
                  <span key={i} className="resume-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", border: "1px solid var(--line)", padding: "0.4rem 0.6rem", color: "var(--fg)" }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Components
function ExperienceItem({ title, company, date, bullets }: any) {
  return (
    <div style={{ marginBottom: "2rem", border: "1px solid var(--line)", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <h4 className="resume-title" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, margin: 0, color: "var(--fg)" }}>{title}</h4>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)" }}>{date}</span>
      </div>
      <div className="resume-text" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--fg-dim)", marginBottom: "1rem" }}>{company}</div>
      <ul className="resume-text" style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--fg)", paddingLeft: "1rem", margin: 0 }}>
        {bullets.map((b: string, i: number) => <li key={i} style={{ marginBottom: "0.4rem" }}>{b}</li>)}
      </ul>
    </div>
  );
}

function ProjectItem({ title, date, desc, link }: any) {
  return (
    <div style={{ marginBottom: "1.5rem", border: "1px solid var(--line)", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <h4 className="resume-title" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, margin: 0, color: "var(--fg)" }}>{title}</h4>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)" }}>{date}</span>
      </div>
      <p className="resume-text" style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--fg)", marginBottom: "1rem" }}>{desc}</p>
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
          <span key={i} className="resume-tag" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", border: "1px solid var(--line)", padding: "0.3rem 0.5rem", color: "var(--fg)" }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(resumeDir, 'page.tsx'), resumeContent.trim());

// 2. Update About.tsx to link to the new page
const aboutPath = path.join(__dirname, 'components', 'sections', 'About.tsx');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');
aboutContent = aboutContent.replace(
  '<a href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", color: "#000", padding: "1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold" }}>',
  '<a href="/resume" target="_blank" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", color: "#000", padding: "1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold" }}>'
);
fs.writeFileSync(aboutPath, aboutContent);

console.log("✅ Resume page created and linked! Run 'npm run dev'");