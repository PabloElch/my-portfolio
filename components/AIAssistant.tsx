"use client";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const { messages, sendMessage, status, error } = useChat();
  const showLoader = status === 'streaming' || status === 'submitted';

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <>
      {isOpen && (
        <div style={{ position: "fixed", bottom: "90px", right: "20px", width: "380px", height: "500px", background: "#050505", border: "1px solid var(--line)", zIndex: 9999, display: "flex", flexDirection: "column", boxShadow: "0 10px 40px rgba(0,0,0,0.8)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "30px", height: "30px", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "bold" }}>LL</div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", color: "var(--fg-dim)", cursor: "pointer", fontSize: "18px" }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.length === 0 && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--fg-dim)", textAlign: "center", marginTop: "2rem" }}>
                Hi! I'm Lencho's AI assistant. Ask me anything.
              </p>
            )}
            {messages.map(m => (
              <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#fff' : 'var(--fg-faint)', color: m.role === 'user' ? '#000' : '#fff', padding: "0.75rem", borderRadius: "8px", maxWidth: "85%", fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.5, border: m.role === 'user' ? 'none' : '1px solid var(--line)', whiteSpace: "pre-wrap" }}>
                {m.parts?.map((part, i) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)}
              </div>
            ))}

            {/* Improved Error Display */}
            {error && (
              <div style={{ alignSelf: 'flex-start', color: "#ff4444", fontSize: "12px", fontFamily: "var(--font-mono)", padding: "0.5rem", background: "rgba(255,0,0,0.1)", border: "1px solid #ff4444", whiteSpace: "pre-wrap" }}>
                Error: {error.message || JSON.stringify(error)}
              </div>
            )}

            {showLoader && (
              <div style={{ alignSelf: 'flex-start', color: "var(--fg-dim)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>Thinking...</div>
            )}
          </div>

          <form onSubmit={onSubmit} style={{ padding: "1rem", borderTop: "1px solid var(--line)", display: "flex", gap: "0.5rem" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Lencho..." style={{ flex: 1, background: "transparent", border: "1px solid var(--line)", padding: "0.75rem", color: "#fff", fontFamily: "var(--font-sans)", fontSize: "13px", outline: "none" }} />
            <button type="submit" disabled={showLoader} style={{ background: "#fff", color: "#000", border: "none", padding: "0 1rem", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "bold", cursor: showLoader ? "not-allowed" : "pointer" }}>
              {showLoader ? "..." : "SEND"}
            </button>
          </form>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999, background: "#050505", border: "1px solid var(--line)", color: "#fff", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
        <div style={{ width: "24px", height: "24px", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: "bold" }}>LL</div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Assistant</span>
      </button>
    </>
  );
}