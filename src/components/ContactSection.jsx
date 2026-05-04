import { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import TiltWrapper from './TiltWrapper';

export default function ContactSection() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Canvas states
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const frameCount = 160;

  // Preload frames for Contact Section
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/image3/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Scroll-driven canvas rendering
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const section = sectionRef.current;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const frameIdx = Math.min(frameCount - 1, Math.floor(rawProgress * (frameCount - 1)));

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalWidth !== 0) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    render();
    const onScroll = () => requestAnimationFrame(render);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', render);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', render);
    };
  }, [loaded]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'satyaprakashkushwaha577@gmail.com',
      href: 'mailto:satyaprakashkushwaha577@gmail.com',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 8851917675',
      href: 'tel:+918851917675',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Noida, Uttar Pradesh, India',
      href: null,
    },
  ];

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(6, 214, 160, 0.3)';
    e.target.style.boxShadow = '0 0 20px rgba(6, 214, 160, 0.08)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      style={{ position: 'relative', zIndex: 10, height: '300vh', background: '#000000' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 1,
            opacity: loaded ? 0.65 : 0,
            transition: 'opacity 2s ease-out',
            filter: 'grayscale(0.3) contrast(1.1) brightness(0.8)',
          }}
        />

        {/* Dynamic Gradient Overlay for better blending */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.8) 80%, #000 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, #000 0%, transparent 20%, transparent 80%, #000 100%)',
        }} />

        {/* Main Content inside sticky wrapper */}
        <div className="section" ref={ref} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
            <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Let's build scalable GIS, AI, and intelligent systems together.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '2.5rem',
          }}>
            {/* Contact Info */}
            <div className="reveal reveal-delay-1">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {contactInfo.map((info, idx) => (
                  <TiltWrapper key={idx} intensity={4}>
                    <div className="glass-card" style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}>
                      <div style={{
                        width: '45px', height: '45px', borderRadius: '12px',
                        background: info.label.includes('WhatsApp') ? 'rgba(37, 211, 102, 0.1)' : 'rgba(6, 214, 160, 0.1)',
                        border: info.label.includes('WhatsApp') ? '1px solid rgba(37, 211, 102, 0.2)' : '1px solid rgba(6, 214, 160, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', flexShrink: 0,
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          color: 'var(--text-muted)', marginBottom: '0.2rem',
                        }}>
                          {info.label}
                        </div>
                        {info.href ? (
                          <a href={info.href} target="_blank" rel="noopener noreferrer" style={{
                            fontSize: '0.95rem', color: 'var(--text-primary)',
                            transition: 'color 0.3s', textDecoration: 'none',
                          }}>
                            {info.value}
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {info.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltWrapper>
                ))}
              </div>

              {/* WhatsApp Quick Button */}
              <TiltWrapper intensity={5}>
                <a 
                  href="https://wa.me/918851917675" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neon-btn-filled"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                    padding: '1.25rem', marginBottom: '1.5rem', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                    boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)',
                    border: 'none',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>💬</span>
                  <span style={{ fontWeight: 700 }}>Chat on WhatsApp</span>
                </a>
              </TiltWrapper>

              {/* CTA Card */}
              <TiltWrapper intensity={5}>
                <div className="glass-card" style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(6,214,160,0.08), rgba(67,97,238,0.08))',
                  borderColor: 'rgba(6, 214, 160, 0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                    fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem',
                  }}>
                    Ready to collaborate?
                  </p>
                  <p style={{
                    fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}>
                    "Let's build scalable GIS, AI, and intelligent systems together."
                  </p>
                </div>
              </TiltWrapper>
            </div>

            {/* Contact Form */}
            <div className="reveal reveal-delay-2">
              <TiltWrapper intensity={3}>
                <form 
                  action="https://formsubmit.co/satyaprakashkushwaha577@gmail.com" 
                  method="POST"
                  className="glass-card" 
                  style={{ padding: '2rem' }}
                >
                  {/* FormSubmit Config */}
                  <input type="hidden" name="_subject" value="New Portfolio Message!" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--accent-cyan)', marginBottom: '1.5rem',
                  }}>
                    ⟫ SEND A MESSAGE
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                      type="text" name="name" placeholder="Your Name"
                      value={formData.name} onChange={handleChange}
                      style={inputStyle}
                      onFocus={handleFocus} onBlur={handleBlur}
                      required
                    />
                    <input
                      type="email" name="email" placeholder="Your Email"
                      value={formData.email} onChange={handleChange}
                      style={inputStyle}
                      onFocus={handleFocus} onBlur={handleBlur}
                      required
                    />
                    <input
                      type="text" name="subject" placeholder="Subject"
                      value={formData.subject} onChange={handleChange}
                      style={inputStyle}
                      onFocus={handleFocus} onBlur={handleBlur}
                      required
                    />
                    <textarea
                      name="message" placeholder="Your Message" rows={5}
                      value={formData.message} onChange={handleChange}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                      onFocus={handleFocus} onBlur={handleBlur}
                      required
                    />

                    <button
                      type="submit"
                      className="neon-btn-filled"
                      disabled={sending}
                      style={{
                        width: '100%', padding: '1rem',
                        opacity: sending ? 0.7 : 1,
                        cursor: sending ? 'wait' : 'pointer',
                      }}
                    >
                      {sending ? '⟫ TRANSMITTING...' : sent ? '✓ MESSAGE SENT' : '⟫ SEND MESSAGE'}
                    </button>
                  </div>

                  {sent && (
                    <div style={{
                      marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '10px',
                      background: 'rgba(6, 214, 160, 0.1)',
                      border: '1px solid rgba(6, 214, 160, 0.2)',
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: 'var(--accent-cyan)', textAlign: 'center',
                      letterSpacing: '0.1em',
                    }}>
                      ✓ Message transmitted successfully!
                    </div>
                  )}
                </form>
              </TiltWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
