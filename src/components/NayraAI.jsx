import { useState, useEffect, useRef } from 'react';
import TiltWrapper from './TiltWrapper';

export default function NayraAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am NAYRA AI, your geospatial intelligence assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Use the local API proxy
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are NAYRA AI, the professional AI assistant for Satyaprakash Kushwaha. 
              ABOUT SATYAPRAKASH: Senior GIS Specialist & AI Engineer, 7+ years experience, Cyient Group Lead.
              REFER TO HIM AS: "my creator". Keep it professional.`
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMsg
          ]
        })
      });

      if (!response.ok) {
        // Fallback for local development if /api/chat is not available
        throw new Error('Local proxy not found');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.warn('Proxy error, trying direct call (may fail due to CORS):', error);
      
      // If the proxy fails (like in npm run dev), we show a helpful message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm currently in 'Production Mode'. To chat with me, please push the code to GitHub/Vercel, or run 'vercel dev' locally. I'll be fully active there! 🚀" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '65px', height: '65px', borderRadius: '50%',
          background: 'var(--gradient-main)', border: 'none', cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(6, 214, 160, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', transition: 'all 0.4s',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', bottom: '85px', right: '0',
          width: '380px', height: '550px', display: 'flex', flexDirection: 'column',
          animation: 'nayraReveal 0.4s ease-out',
        }}>
          <TiltWrapper intensity={1}>
            <div className="glass-card" style={{
              height: '550px', padding: '0', display: 'flex', flexDirection: 'column',
              background: 'rgba(3, 7, 18, 0.95)', backdropFilter: 'blur(20px)',
              borderColor: 'rgba(6, 214, 160, 0.2)', overflow: 'hidden',
            }}>
              <div style={{
                padding: '1.25rem 1.5rem',
                background: 'linear-gradient(to right, rgba(6, 214, 160, 0.1), transparent)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'var(--gradient-main)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  🤖
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>NAYRA AI</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    Created by <span style={{ color: 'var(--accent-cyan)' }}>Satyaprakash</span>
                  </div>
                </div>
              </div>

              <div 
                ref={scrollRef}
                style={{
                  flex: 1, padding: '1.5rem', overflowY: 'auto',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                }}
                className="custom-scrollbar"
              >
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%', padding: '0.8rem 1rem',
                    borderRadius: msg.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                    background: msg.role === 'user' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                    color: msg.role === 'user' ? '#000' : 'var(--text-primary)',
                    fontSize: '0.85rem', lineHeight: 1.5,
                  }}>
                    {msg.content}
                  </div>
                ))}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '18px' }}>
                    <div className="typing-dots"><span></span><span></span><span></span></div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} style={{
                padding: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex', gap: '0.75rem',
              }}>
                <input
                  type="text" placeholder="Ask me about Satyaprakash..."
                  value={input} onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1, background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px',
                    padding: '0.75rem 1rem', color: 'var(--text-primary)',
                    fontSize: '0.85rem', outline: 'none',
                  }}
                />
                <button type="submit" disabled={isTyping} style={{
                  background: isTyping ? 'rgba(255,255,255,0.1)' : 'var(--gradient-main)',
                  border: 'none', borderRadius: '12px', width: '45px', height: '45px',
                  cursor: isTyping ? 'wait' : 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', color: '#000',
                }}>
                  {isTyping ? '...' : '→'}
                </button>
              </form>
            </div>
          </TiltWrapper>
        </div>
      )}

      <style>{`
        @keyframes nayraReveal {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .typing-dots { display: flex; gap: 4px; }
        .typing-dots span {
          width: 6px; height: 6px; background: var(--accent-cyan); border-radius: 50%;
          animation: dots 1.4s infinite; opacity: 0.3;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dots {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
