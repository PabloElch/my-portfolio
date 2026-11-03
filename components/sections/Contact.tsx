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
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } 
        .blinking-cursor { animation: blink 1s step-end infinite; }
        .contact-title { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 7rem); line-height: 0.9; text-transform: uppercase; margin: 0 0 1.5rem 0; font-weight: 400; }
        .contact-subtitle { font-family: var(--font-display); font-size: 2rem; margin: 0 0 1rem 0; font-weight: 400; }
      `}</style>
      
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
              <ContactRow label="TEL" value="+251 900 52 79 20" href="tel:+251900527920" icon={<PhoneIcon />} />
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