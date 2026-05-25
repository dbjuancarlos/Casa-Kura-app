import { useState, useRef, useEffect } from "react";
import "./KuraChatApp.css";

const SYSTEM_PROMPT = `Eres Kura, el asistente virtual de Casa Kura, una empresa mexicana de productos de limpieza y cuidado del hogar de alta calidad.

Tu personalidad:
- Cálida, amigable y profesional
- Hablas en español, con un tono cercano pero respetuoso
- Usas "tú" para dirigirte al cliente
- Eres experta en los productos de Casa Kura

Tu rol:
- Ayudar a los clientes a encontrar el producto ideal para sus necesidades
- Resolver dudas sobre uso, composición e ingredientes
- Proporcionar tips de limpieza y cuidado del hogar
- Informar sobre precios, disponibilidad y dónde comprar
- Procesar quejas y sugerencias con empatía

Líneas de productos Casa Kura:
- Kura Home: limpiadores multiusos, desengrasantes, quitamanchas
- Kura Nature: línea ecológica con ingredientes naturales y biodegradables
- Kura Pro: productos de uso profesional para limpieza profunda
- Kura Care: cuidado de telas, pieles y superficies delicadas

Valores de Casa Kura:
- Calidad premium accesible
- Compromiso con el medio ambiente
- Innovación en fórmulas efectivas
- Satisfacción garantizada

Si no conoces información específica de un producto o precio, sé honesta y ofrece conectar al cliente con el equipo de ventas.`;

export default function KuraChatApp() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Kura, tu asistente de Casa Kura. ¿En qué puedo ayudarte hoy? Puedo orientarte sobre nuestros productos de limpieza, resolver tus dudas o darte tips para el cuidado de tu hogar. 🏡",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-opus-4-7",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Error ${response.status}`);
      }

      const data = await response.json();
      const assistantContent = data.content?.[0]?.text ?? "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (err) {
      setError(err.message || "Ocurrió un error al conectar con Kura.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "¡Hola! Soy Kura, tu asistente de Casa Kura. ¿En qué puedo ayudarte hoy? Puedo orientarte sobre nuestros productos de limpieza, resolver tus dudas o darte tips para el cuidado de tu hogar. 🏡",
      },
    ]);
    setError(null);
  }

  return (
    <div className="kura-app">
      <header className="kura-header">
        <div className="kura-header-inner">
          <div className="kura-logo">
            <div className="kura-logo-icon">K</div>
            <div>
              <span className="kura-logo-name">Casa Kura</span>
              <span className="kura-logo-tagline">Asistente Virtual</span>
            </div>
          </div>
          <button
            className="kura-clear-btn"
            onClick={clearChat}
            aria-label="Nueva conversación"
          >
            Nueva conversación
          </button>
        </div>
      </header>

      <main className="kura-chat-window">
        <div className="kura-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`kura-message kura-message--${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="kura-avatar">K</div>
              )}
              <div className="kura-bubble">
                {msg.content.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="kura-message kura-message--assistant">
              <div className="kura-avatar">K</div>
              <div className="kura-bubble kura-bubble--typing">
                <span className="kura-dot" />
                <span className="kura-dot" />
                <span className="kura-dot" />
              </div>
            </div>
          )}

          {error && (
            <div className="kura-error">
              <span>⚠ {error}</span>
              <button onClick={() => setError(null)}>Cerrar</button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="kura-input-area">
        <div className="kura-input-inner">
          <textarea
            ref={inputRef}
            className="kura-textarea"
            placeholder="Escribe tu pregunta sobre productos Casa Kura…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            aria-label="Mensaje"
          />
          <button
            className="kura-send-btn"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            aria-label="Enviar mensaje"
          >
            {isLoading ? (
              <span className="kura-send-spinner" />
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            )}
          </button>
        </div>
        <p className="kura-disclaimer">
          Kura puede cometer errores. Verifica información importante con nuestro equipo.
        </p>
      </footer>
    </div>
  );
}
