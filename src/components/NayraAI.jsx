import { useState, useEffect, useRef } from 'react';

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are NAYRA AI, the professional AI assistant created by Satyaprakash Kushwaha. 
ABOUT SATYAPRAKASH: Senior GIS Specialist & AI Engineer with 7+ years of experience. Currently Group Lead at Cyient. 
Expert in HD Mapping, Autonomous Driving Data, Lane-Level Systems, TomTom technologies, and AI/ML.
RULES: Always refer to Satyaprakash as "my creator". Keep responses concise, professional, and helpful.
If asked about yourself, say you are NAYRA AI — a custom AI assistant built into this portfolio.`;

export default function NayraAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I\'m NAYRA AI 🤖 Ask me anything about Satyaprakash!' }
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
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMsg
          ],
          model: GROQ_MODEL,
          temperature: 0.7,
          max_tokens: 400
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t process that.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Nayra AI Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ ${error.message || 'Connection error. Please try again!'}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #06d6a0, #4361ee)',
          border: '2px solid rgba(6, 214, 160, 0.4)',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(6, 214, 160, 0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)',
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window - Small, 3D, Transparent */}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: '65px', right: '0',
          width: '320px', height: '420px',
          display: 'flex', flexDirection: 'column',
          animation: 'nayraPopIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          perspective: '800px',
        }}>
          <div style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            background: 'rgba(3, 7, 18, 0.75)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(6, 214, 160, 0.15)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(6, 214, 160, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            overflow: 'hidden',
            transform: 'rotateX(2deg) rotateY(-1deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease',
          }}>
            {/* Header */}
            <div style={{
              padding: '0.8rem 1rem',
              background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.12), rgba(67, 97, 238, 0.08))',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #06d6a0, #4361ee)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem',
              }}>🤖</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#f0f0f0', fontSize: '0.8rem', letterSpacing: '0.05em' }}>NAYRA AI</div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
                  Created by <span style={{ color: '#06d6a0' }}>Suraj Satyaprakash</span>
                </div>
              </div>
              <div style={{
                marginLeft: 'auto', width: '6px', height: '6px',
                borderRadius: '50%', background: '#06d6a0',
                boxShadow: '0 0 8px #06d6a0',
                animation: 'nayraLive 2s infinite',
              }} />
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                flex: 1, padding: '0.8rem', overflowY: 'auto',
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
              }}
              className="custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%', padding: '0.5rem 0.7rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, rgba(6, 214, 160, 0.9), rgba(67, 97, 238, 0.9))'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                  color: msg.role === 'user' ? '#000' : 'rgba(255,255,255,0.85)',
                  fontSize: '0.75rem', lineHeight: 1.5,
                  backdropFilter: 'blur(10px)',
                }}>
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '0.5rem 0.8rem', borderRadius: '12px',
                }}>
                  <div className="nayra-dots"><span /><span /><span /></div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{
              padding: '0.7rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex', gap: '0.5rem',
              background: 'rgba(0,0,0,0.2)',
            }}>
              <input
                type="text" placeholder="Ask about Satyaprakash..."
                value={input} onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1, background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px',
                  padding: '0.55rem 0.75rem', color: '#f0f0f0',
                  fontSize: '0.75rem', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(6, 214, 160, 0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              />
              <button type="submit" disabled={isTyping} style={{
                background: isTyping ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #06d6a0, #4361ee)',
                border: 'none', borderRadius: '10px', width: '36px', height: '36px',
                cursor: isTyping ? 'wait' : 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: isTyping ? 'rgba(255,255,255,0.3)' : '#000',
                fontSize: '0.9rem', transition: 'all 0.2s',
              }}>
                {isTyping ? '•' : '→'}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes nayraPopIn {
          from { opacity: 0; transform: translateY(15px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes nayraLive {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #06d6a0; }
          50% { opacity: 0.4; box-shadow: 0 0 4px #06d6a0; }
        }
        .nayra-dots { display: flex; gap: 3px; }
        .nayra-dots span {
          width: 5px; height: 5px; background: #06d6a0; border-radius: 50%;
          animation: nayraBounce 1.4s infinite; opacity: 0.3;
        }
        .nayra-dots span:nth-child(2) { animation-delay: 0.2s; }
        .nayra-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes nayraBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
