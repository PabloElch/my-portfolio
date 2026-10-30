"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Intersection Observer to track which section is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" } // Triggers when the section is roughly in the upper half of the screen
    );

    const sections = ["about", "projects", "lab", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      zIndex: 100, 
      display: "grid", 
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", 
      alignItems: "center", 
      padding: "1.5rem var(--gutter)", 
      borderBottom: "1px solid var(--line)", 
      fontFamily: "var(--font-mono)", 
      fontSize: "11px", 
      textTransform: "uppercase",
      backgroundColor: "rgba(5, 5, 5, 0.8)",
      backdropFilter: "blur(10px)"
    }}>
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        Lencho Lemessa
      </div>
      
      <NavLink label="01 About" active={activeSection === "about"} onClick={() => handleScroll("about")} />
      <NavLink label="02 Projects" active={activeSection === "projects"} onClick={() => handleScroll("projects")} />
      
      <div style={{ textAlign: "center" }}>
        <div style={{ border: "1px solid var(--line)", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          LL
        </div>
      </div>

      <NavLink label="03 Lab" active={activeSection === "lab"} onClick={() => handleScroll("lab")} align="right" />
      <NavLink label="04 Contact" active={activeSection === "contact"} onClick={() => handleScroll("contact")} align="right" />
    </nav>
  );
}

function NavLink({ label, active, onClick, align = "left" }: { label: string, active: boolean, onClick: () => void, align?: "left" | "right" }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        color: active ? "var(--fg)" : "var(--fg-dim)", 
        cursor: "pointer",
        textAlign: align,
        transition: "color 0.2s ease",
        textDecoration: active ? "underline" : "none",
        textUnderlineOffset: "6px",
        textDecorationColor: "#fff",
        textDecorationThickness: "1px"
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
      onMouseLeave={(e) => e.currentTarget.style.color = active ? "var(--fg)" : "var(--fg-dim)"}
    >
      {label}
    </div>
  );
}