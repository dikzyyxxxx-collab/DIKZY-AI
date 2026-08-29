"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ComicLogo from "../../components/ComicLogo";
import { THINKING_MODES, DEFAULT_MODE } from "../../lib/config";

export default function ChatPage() {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Aku Dikzy AI. Pilih mode pemikiran di atas, terus tanya apa aja — dari ngobrol santai sampe bikin kode!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ok = sessionStorage.getItem("dikzy_logged_in");
    if (!ok) {
      router.replace("/login");
    } else {
      setCheckedAuth(true);
    }
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleLogout() {
    sessionStorage.removeItem("dikzy_logged_in");
    router.push("/login");
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode }),
      });
      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ Gagal konek ke server: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!checkedAuth) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "760px",
        margin: "0 auto",
        padding: "16px",
      }}
    >
      {/* Header */}
      <header
        className="comic-panel"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          marginBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ComicLogo size={40} />
          <h1 style={{ fontSize: "1.8rem" }}>DIKZY AI</h1>
        </div>
        <button className="comic-btn" style={{ fontSize: "0.8rem", padding: "6px 14px" }} onClick={handleLogout}>
          KELUAR
        </button>
      </header>

      {/* Mode selector */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "14px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {Object.entries(THINKING_MODES).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className="comic-panel"
            style={{
              flex: "0 0 auto",
              padding: "10px 14px",
              cursor: "pointer",
              background: mode === key ? "var(--black)" : "var(--white)",
              color: mode === key ? "var(--white)" : "var(--black)",
              textAlign: "left",
              minWidth: "150px",
            }}
          >
            <div style={{ fontFamily: "var(--font-comic)", fontSize: "1.1rem" }}>
              {m.label}
            </div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, opacity: 0.85 }}>
              {m.tagline}
            </div>
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div
        className="comic-panel"
        style={{
          flex: 1,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: "50vh",
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}
          >
            <div
              className="comic-panel"
              style={{
                padding: "10px 14px",
                background: m.role === "user" ? "var(--black)" : "var(--gray-100)",
                color: m.role === "user" ? "var(--white)" : "var(--black)",
                whiteSpace: "pre-wrap",
                fontWeight: 700,
                fontSize: "0.95rem",
                boxShadow: "var(--comic-shadow-sm)",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="comic-panel" style={{ padding: "10px 14px", alignSelf: "flex-start" }}>
            <span className="comic-font">Dikzy lagi mikir...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
        <input
          className="comic-input"
          style={{ flex: 1 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Tanya ke ${THINKING_MODES[mode].label}...`}
          disabled={loading}
        />
        <button type="submit" className="comic-btn" disabled={loading}>
          KIRIM
        </button>
      </form>
    </main>
  );
      }
    
