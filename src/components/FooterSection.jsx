export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'linear-gradient(180deg, transparent, rgba(3, 7, 18, 0.8))',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 6rem) 2rem',
      }}>
        {/* Top Row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem',
        }}>
          {/* Logo + Tagline */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 800, marginBottom: '0.75rem',
              background: 'var(--gradient-main)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Satyaprakash Kushwaha
            </div>
            <p style={{
              fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7,
            }}>
              Building intelligent systems at the intersection of GIS, AI, and digital technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent-cyan)', marginBottom: '1rem',
            }}>
              Navigation
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}>
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'none', border: 'none', padding: 0,
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    textAlign: 'left', transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent-cyan)', marginBottom: '1rem',
            }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:satyaprakashkushwaha577@gmail.com" style={{
                fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                satyaprakashkushwaha577@gmail.com
              </a>
              <a href="tel:+918851917675" style={{
                fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                +91 8851917675
              </a>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                📍 Noida, UP, India
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px', width: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          margin: '0 0 1.5rem',
        }} />

        {/* Bottom Row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.1em', color: 'var(--text-dim)',
          }}>
            © {currentYear} Satyaprakash Kushwaha. All rights reserved.
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            letterSpacing: '0.15em', color: 'var(--text-dim)',
          }}>
            ⟫ DESIGNED & BUILT WITH PRECISION
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,214,160,0.3)';
              e.currentTarget.style.color = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(6,214,160,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
