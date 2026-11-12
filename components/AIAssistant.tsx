"use client";
import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  const { messages, sendMessage, status, error } = useChat();
  const showLoader = status === 'streaming' || status === 'submitted';

  // GENUINE LIVE CLOCK
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(formattedTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleQuickAction = (text: string) => {
    sendMessage({ text });
  };

  const handleBtnHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    e.currentTarget.style.borderColor = isEnter ? "#fff" : "var(--line)";
  };

  return (
    <>
      {isOpen && (
        <div className="chat-ui" style={{ 
          position: "fixed", bottom: "20px", right: "20px", 
          width: "380px", // Narrower
          height: "480px", // Shorter
          background: "#050505", border: "1px solid var(--line)", zIndex: 9999, 
          display: "flex", flexDirection: "column", boxShadow: "0 10px 40px rgba(0,0,0,0.8)" 
        }}>
          
          {/* Header */}
          <div style={{ padding: "1.25rem 1.25rem 1rem 1.25rem", borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ position: "relative", width: "28px", height: "28px", background: "transparent", color: "#ffffff", border: "1px solid #ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "bold" }}>
                  <span className="blinking-dot" style={{ top: "-3px", right: "-3px" }}></span>
                  LL
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>ASSISTANT</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--fg-dim)", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
                    <span style={{ width: "4px", height: "4px", background: "#4ade80", borderRadius: "50%" }}></span>
                    ONLINE · LOCAL ANSWERS
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", color: "var(--fg-dim)", fontSize: "16px", alignItems: "center" }}>
                {/* Only the Close button remains */}
                <button 
                  title="Close" 
                  onClick={() => setIsOpen(false)}
                  style={{ background: "transparent", border: "none", color: "var(--fg-dim)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-dim)"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Initial Message */}
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)" }}>
                  LL-BOT — {currentTime}
                </span>
                <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#fff", margin: 0, lineHeight: 1.6 }}>
                    Hi! I'm Lencho's assistant. Ask me about his projects, stack or availability.
                  </p>
                </div>
              </div>
            )}

            {/* Chat History */}
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-dim)", textAlign: m.role === 'user' ? 'right' : 'left' }}>
                  {m.role === 'user' ? 'YOU' : 'LL-BOT'}
                </span>
                <div style={{ 
                  borderLeft: m.role === 'user' ? "none" : "1px solid var(--line)", 
                  borderRight: m.role === 'user' ? "1px solid var(--line)" : "none", 
                  paddingLeft: m.role === 'user' ? "0" : "1rem", 
                  paddingRight: m.role === 'user' ? "1rem" : "0",
                  textAlign: m.role === 'user' ? 'right' : 'left'
                }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#fff", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {m.parts?.map((part, i) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)}
                  </p>
                </div>
              </div>
            ))}

            {error && (
              <div style={{ color: "#ff4444", fontSize: "12px", fontFamily: "var(--font-mono)", padding: "1rem", background: "rgba(255,0,0,0.1)", border: "1px solid #ff4444" }}>
                Error: {error.message}
              </div>
            )}

            {showLoader && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-dim)", paddingLeft: "1rem" }}>
                Thinking...
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div style={{ display: "flex", gap: "0.5rem", padding: "0 1.25rem 1rem 1.25rem", overflowX: "auto", flexShrink: 0 }}>
              <button 
                onClick={() => handleQuickAction("What are Lencho's projects?")} 
                onMouseEnter={(e) => handleBtnHover(e, true)}
                onMouseLeave={(e) => handleBtnHover(e, false)}
                style={{ background: "transparent", border: "1px solid var(--line)", color: "#fff", padding: "0.5rem 0.75rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 0.2s" }}
              >
                His Projects
              </button>
              <button 
                onClick={() => handleQuickAction("What is Lencho's tech stack?")} 
                onMouseEnter={(e) => handleBtnHover(e, true)}
                onMouseLeave={(e) => handleBtnHover(e, false)}
                style={{ background: "transparent", border: "1px solid var(--line)", color: "#fff", padding: "0.5rem 0.75rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 0.2s" }}
              >
                His Tech Stack
              </button>
              <button 
                onClick={() => handleQuickAction("What is Lencho's experience?")} 
                onMouseEnter={(e) => handleBtnHover(e, true)}
                onMouseLeave={(e) => handleBtnHover(e, false)}
                style={{ background: "transparent", border: "1px solid var(--line)", color: "#fff", padding: "0.5rem 0.75rem", fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 0.2s" }}
              >
                His Experience
              </button>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={onSubmit} style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--line)", display: "flex", gap: "1rem", alignItems: "center", flexShrink: 0 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--fg-dim)", fontFamily: "var(--font-mono)" }}>&gt;</span>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type your message..." 
                style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "13px", outline: "none" }} 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={showLoader} 
              style={{ 
                background: "#ffffff", color: "#000000", border: "none", 
                width: "32px", height: "32px", borderRadius: "2px", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                cursor: showLoader ? "not-allowed" : "pointer", fontSize: "14px" 
              }}
            >
              {showLoader ? "■" : "↑"}
            </button>
          </form>

        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button className="chat-ui" onClick={() => setIsOpen(true)} style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999, background: "#050505", border: "1px solid var(--line)", color: "#fff", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "relative", width: "24px", height: "24px", background: "transparent", color: "#ffffff", border: "1px solid #ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: "bold" }}>
            <span className="blinking-dot"></span>
            LL
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Assistant</span>
        </button>
      )}
    </>
  );
}