"use client";
import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ 
      backgroundColor: "var(--bg)", 
      borderTop: "1px solid var(--line)",
      padding: "4rem var(--gutter) 2rem var(--gutter)",
      position: "relative",
      zIndex: 10
    }}>
      {/* Main Footer Content */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4rem", marginBottom: "6rem" }}>
        
        {/* Left Side: Logo & Bio */}
        <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ 
              width: "40px", height: "40px", border: "1px solid var(--line)", 
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "bold" 
            }}>
              LL
            </div>
            <div style={{ color: "var(--fg-dim)" }}>☆</div>
          </div>
          
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", fontWeight: "bold", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
            FULL-STACK & AI DEVELOPER — JIMMA, ETHIOPIA.
          </div>
          
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--fg-dim)", lineHeight: 1.6 }}>
            I help businesses automate, optimize, and modernize their operations through software development, cloud, and artificial intelligence.
          </p>
        </div>

        {/* Right Side: Link Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
          gap: "3rem",
          flex: "2 1 600px" 
        }}>
          
          {/* 01 Projects - Now scrolling to Selected Projects */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "0.5rem" }}>01</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, marginBottom: "1.5rem", margin: "0 0 1.5rem 0" }}>Projects</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <FooterLink label="WUTETE" href="#projects" />
              <FooterLink label="VOICE LAB" href="#projects" />
              <FooterLink label="AI STUDIO" href="#projects" />
            </div>
          </div>

          {/* 02 Social */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "0.5rem" }}>02</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, margin: "0 0 1.5rem 0" }}>Social</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <FooterLink label="GITHUB" href="https://github.com/PabloElch" external />
              <FooterLink label="TELEGRAM" href="https://t.me/rise2power" external />
              <FooterLink label="EMAIL" href="mailto:lencholemessa@gmail.com" external />
            </div>
          </div>

          {/* 03 Legal */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "0.5rem" }}>03</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, margin: "0 0 1.5rem 0" }}>Legal</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <FooterLink label="PRIVACY POLICY" href="#" />
              <FooterLink label="LEGAL NOTICE" href="#" />
              <FooterLink label="MANAGE COOKIES" href="#" />
            </div>
          </div>

          {/* 04 Jimma */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-dim)", marginBottom: "0.5rem" }}>04</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, margin: "0 0 1.5rem 0" }}>Jimma</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)" }}>JIMMA, ETHIOPIA</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)" }}>7.67°N · 36.83°E</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        borderTop: "1px solid var(--line)", 
        paddingTop: "2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        fontFamily: "var(--font-mono)", 
        fontSize: "11px", 
        color: "var(--fg-dim)", 
        textTransform: "uppercase" 
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div>© 2026 LENCHO LEMESSA. ALL RIGHTS RESERVED</div>
          <div>DESIGN & CODE — LENCHO LEMESSA · NEXT.JS, REACT, GSAP, WEBGL</div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>✦ 0 / 3 STARS FOUND</div>
          <button 
            onClick={scrollToTop}
            style={{ 
              background: "transparent", border: "none", color: "var(--fg-dim)", 
              fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem"
            }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

// Helper component for footer links
function FooterLink({ label, href, external = false }: { label: string, href: string, external?: boolean }) {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.substring(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      target={external ? "_blank" : "_self"} 
      rel={external ? "noopener noreferrer" : ""}
      style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "12px", 
        color: "var(--fg-dim)", 
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "color 0.2s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
      onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-dim)"}
    >
      {label}
      {external && <span style={{ fontSize: "10px" }}>&nearr;</span>}
    </a>
  );
}