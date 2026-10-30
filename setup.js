const fs = require('fs');
const path = require('path');

const files = {
  'components/WaveText.tsx': `
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaveText({ 
  text, 
  className, 
  as: Tag = "h2", 
  trigger = true,
  delay = 0
}: { 
  text: string, 
  className?: string, 
  as?: any, 
  trigger?: boolean,
  delay?: number
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll(".wave-word");
    if (!words) return;

    gsap.fromTo(words,
      { y: 30, opacity: 0, rotateZ: 2 },
      {
        y: 0, 
        opacity: 1, 
        rotateZ: 0,
        duration: 0.8, 
        stagger: 0.03, // Fast wave effect
        ease: "power3.out",
        delay: delay,
        scrollTrigger: trigger ? { trigger: containerRef.current, start: "top 85%" } : undefined
      }
    );
  }, [trigger, delay]);

  return (
    <Tag ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="wave-word" style={{ display: "inline-block", marginRight: "0.25em", willChange: "transform, opacity" }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}
`,
  'components/sections/About.tsx': `
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
      <style>{\`
        h2.wave-title { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 7rem); line-height: 1; text-transform: uppercase; margin: 0 0 4rem 0; font-weight: 400; }
      \`}</style>

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
            <a href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", color: "#000", padding: "1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold" }}>
              <span>View Resume</span><span>&rarr;</span>
            </a>
            <a href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", color: "#fff", padding: "1rem", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", border: "1px solid var(--line)" }}>
              <span>Download Resume</span><span style={{ fontSize: "9px", color: "var(--fg-dim)" }}>PDF &darr;</span>
            </a>
          </div>
        </div>
      </div>

      <style>{\`
        .font-display { font-family: var(--font-display); font-weight: 300; margin: 0; line-height: 1.2; }
        .big-text { font-size: clamp(1.5rem, 2.5vw, 2.5rem); }
        .font-sans { font-family: var(--font-sans); color: var(--fg-dim); max-width: 90%; }
        .small-text { font-size: 16px; line-height: 1.7; margin: 0; }
        .wave-title { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 7rem); line-height: 1; text-transform: uppercase; margin: 0 0 4rem 0; font-weight: 400; }
      \`}</style>
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
`,
  'components/sections/Skills.tsx': `
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
      <style>{\`
        .skills-title { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 5rem); line-height: 0.9; text-transform: uppercase; margin: 0; font-weight: 400; }
      \`}</style>
      
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
`,
  'components/sections/Experience.tsx': `
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
      <style>{\`
        .exp-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 6rem); line-height: 0.9; text-transform: uppercase; margin: 0; font-weight: 400; }
      \`}</style>
      
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
`,
  'components/sections/Impact.tsx': `
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
      <style>{\`
        .impact-card { transition: background-color 0.3s ease, border-color 0.3s ease; cursor: default; }
        .impact-card:hover { background-color: #ffffff; border-color: #ffffff !important; }
        .impact-card:hover .impact-number { color: rgba(0, 0, 0, 0.15) !important; }
        .impact-card:hover .impact-text { color: #050505 !important; }
        .impact-title { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 5rem); line-height: 0.9; text-transform: uppercase; margin: 0; font-weight: 400; }
      \`}</style>

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
`,
  'components/sections/Contact.tsx': `
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveText from "../WaveText";

gsap.registerPlugin(ScrollTrigger);

const EmailIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>);
const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const MapPinIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const ArrowUpRightIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>);
const GithubIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>);
const TelegramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ padding: "var(--section-y) var(--gutter)", borderBottom: "1px solid var(--line)", backgroundColor: "var(--bg)", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <style>{\`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } 
        .blinking-cursor { animation: blink 1s step-end infinite; }
        .contact-title { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 7rem); line-height: 0.9; text-transform: uppercase; margin: 0 0 1.5rem 0; font-weight: 400; }
        .contact-subtitle { font-family: var(--font-display); font-size: 2rem; margin: 0 0 1rem 0; font-weight: 400; }
      \`}</style>
      
      <div style={{ position: "absolute", top: "10%", right: "5%", width: "450px", height: "450px", borderRadius: "50%", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)", backgroundSize: "14px 14px", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)", maskImage: "radial-gradient(circle, black 30%, transparent 70%)", boxShadow: "inset -60px -60px 100px rgba(0,0,0,0.9), inset 20px 20px 40px rgba(255,255,255,0.05)", zIndex: 0, pointerEvents: "none" }} />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1.5rem", textTransform: "uppercase" }}>| [ 04 / 04 ] · CONTACT</div>
          
          <WaveText text="Let's Work Together" as="h2" className="contact-title" />
          
          <a href="mailto:lencholemessa@gmail.com" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--fg-dim)", textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid var(--line)", paddingBottom: "1rem", width: "fit-content", transition: "color 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-dim)"}>lencholemessa@gmail.com <ArrowUpRightIcon /></a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <WaveText text="Let's Stay in Touch" as="h3" className="contact-subtitle" />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "var(--fg-dim)", lineHeight: 1.6, marginBottom: "2rem" }}>I am always open to new opportunities and collaborations.<br/>Feel free to contact me!</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              <ContactRow label="EMAIL" value="lencholemessa@gmail.com" href="mailto:lencholemessa@gmail.com" icon={<EmailIcon />} />
              <ContactRow label="TEL" value="+251 911 234 567" href="tel:+251911234567" icon={<PhoneIcon />} />
              <ContactRow label="BASE" value="Jimma, Ethiopia" icon={<MapPinIcon />} />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://github.com/PabloElch" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--fg-faint)", padding: "0.75rem 1.5rem", color: "#fff", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", border: "1px solid var(--line)", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--fg-faint)"}><GithubIcon /> GITHUB</a>
              <a href="https://t.me/rise2power" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--fg-faint)", padding: "0.75rem 1.5rem", color: "#fff", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", border: "1px solid var(--line)", transition: "background 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--fg-faint)"}><TelegramIcon /> TELEGRAM</a>
            </div>
          </div>

          <div ref={formRef} style={{ border: "1px solid var(--line)", padding: "2.5rem", position: "relative", background: "rgba(5,5,5,0.7)", backdropFilter: "blur(10px)", borderRadius: "4px" }}>
            <span style={{ position: "absolute", top: "-10px", left: "-6px", color: "var(--fg-dim)", fontFamily: "var(--font-mono)", fontSize: "14px", background: "var(--bg)", padding: "0 4px" }}>+</span>
            <span style={{ position: "absolute", bottom: "-10px", right: "-6px", color: "var(--fg-dim)", fontFamily: "var(--font-mono)", fontSize: "14px", background: "var(--bg)", padding: "0 4px" }}>+</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)", textTransform: "uppercase" }}>&gt; NEW_MESSAGE <span className="blinking-cursor">_</span></div>
              <div style={{ color: "var(--fg-dim)" }}>☆</div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <FormGroup num="01" label="NAME" placeholder="Your name" />
              <FormGroup num="02" label="EMAIL" placeholder="your@email.com" type="email" />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1rem" }}>03 &middot; MESSAGE</div>
                <textarea placeholder="Your message..." rows={4} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "18px", paddingBottom: "1rem", outline: "none", resize: "none" }} />
                <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", marginTop: "0.5rem" }}>0 / 1000 caractères</div>
              </div>
              <button type="submit" style={{ background: "#fff", color: "#000", border: "none", padding: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", fontWeight: "bold", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>SEND MESSAGE &rarr;</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href, icon }: { label: string, value: string, href?: string, icon: React.ReactNode }) {
  const content = (
    <div style={{ display: "grid", gridTemplateColumns: "60px 24px 1fr auto", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--line)", gap: "0.5rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", textTransform: "uppercase" }}>{label}</span>
      <span style={{ display: "flex", alignItems: "center", color: "var(--fg-dim)" }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#fff" }}>{value}</span>
      {href && <span style={{ color: "var(--fg-dim)", display: "flex", alignItems: "center" }}><ArrowUpRightIcon /></span>}
    </div>
  );
  if (href) return <a href={href} style={{ textDecoration: "none" }}>{content}</a>;
  return content;
}

function FormGroup({ num, label, placeholder, type = "text" }: { num: string, label: string, placeholder: string, type?: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "1rem" }}>{num} &middot; {label}</div>
      <input type={type} placeholder={placeholder} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "18px", paddingBottom: "1rem", outline: "none" }} />
    </div>
  );
}
`,
  'app/page.tsx': `
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
  const heroTextRef = useRef<HTMLDivElement>(null);

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
            <div style={{ textAlign: "right" }}>Local Time<br/>10:35</div>
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
              
              <div style={{ width: "340px", background: "#050505", border: "1px solid var(--line)", padding: "1.25rem", marginTop: "12vh", boxShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
                <WaveText text="Full-stack developer and AI engineer. I design applications, agents and automations that save teams time — from prototype to cloud deployment." as="p" className="hero-card-text" trigger={false} delay={0.8} />
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button style={{ background: "transparent", color: "#fff", border: "1px solid var(--line)", padding: "0.6rem 1rem", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", cursor: "pointer", width: "50%" }}>See Projects</button>
                  <button style={{ background: "#fff", color: "#000", border: "none", padding: "0.6rem 1rem", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", cursor: "pointer", fontWeight: "bold", width: "50%" }}>Get in Touch &rarr;</button>
                </div>
              </div>
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
`
};

Object.entries(files).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim());
});

console.log("✅ Wave text animations applied to all sections! Run 'npm run dev'");