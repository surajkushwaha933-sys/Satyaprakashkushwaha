import useScrollReveal from '../hooks/useScrollReveal';
import TiltWrapper from './TiltWrapper';

export default function AboutSection() {
  const ref = useScrollReveal();

  const highlights = [
    { value: '7+', label: 'Years Experience' },
    { value: '15+', label: 'Team Members Led' },
    { value: '20+', label: 'Countries Mapped' },
    { value: '100%', label: 'HAD Data Accuracy' },
  ];

  const expertise = [
    'Geospatial Data Engineering',
    'HD Mapping (Genesis/HAD)',
    'Global Map Management',
    'Navigation Attributes',
    'Data Validation Tools',
    'AI Workflow Automation',
  ];

  return (
    <section id="about" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal">
        <div className="section-label">About Me</div>
        <h2 className="section-title">
          Mapping the Future with <span className="gradient-text">Precision & AI</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
        gap: '3rem',
        marginTop: '3rem',
        alignItems: 'start',
      }}>
        {/* Left: Photo & Resume Button */}
        <div className="reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <TiltWrapper intensity={5}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              aspectRatio: '1',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
              <img 
                src="/profile.png" 
                alt="Satyaprakash Kushwaha"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.1) brightness(0.9)',
                }}
              />
              {/* Corner Accents */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                width: '40px', height: '40px', borderTop: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)',
              }} />
              <div style={{
                position: 'absolute', bottom: '20px', right: '20px',
                width: '40px', height: '40px', borderBottom: '2px solid var(--accent-blue)', borderRight: '2px solid var(--accent-blue)',
              }} />
            </div>
          </TiltWrapper>

          {/* Download Resume Button */}
          <TiltWrapper intensity={3}>
            <a 
              href="/resume.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn-filled"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                padding: '1.25rem', textDecoration: 'none', width: '100%', maxWidth: '380px',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📄</span>
              <span style={{ fontWeight: 700, letterSpacing: '0.1em' }}>VIEW & PRINT RESUME</span>
            </a>
          </TiltWrapper>
        </div>

        {/* Right: Bio & Stats */}
        <div className="reveal reveal-delay-2">
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            I am a <strong style={{ color: 'var(--accent-cyan)' }}>Senior GIS Specialist</strong> and{' '}
            <strong style={{ color: 'var(--accent-blue)' }}>AI Engineer</strong> with 7+ years of expertise in 
            Global Map Content Management, HD Mapping, and intelligent navigation systems.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Delivering high-precision geospatial data for platforms like <strong style={{ color: 'var(--text-primary)' }}>TomTom HOME</strong>, 
            I specialize in map zone optimization and team leadership across 20+ global markets.
          </p>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            {highlights.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  background: 'var(--gradient-main)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Expertise Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
            {expertise.map((item) => (
              <span key={item} className="skill-tag">{item}</span>
            ))}
          </div>

          {/* Global Coverage Card */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent-cyan)', marginBottom: '1rem',
            }}>
              🌍 GLOBAL COVERAGE
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Spearheaded map data operations for <strong style={{ color: 'var(--text-primary)' }}>North America, Europe, and APAC</strong>, 
              ensuring 100% data accuracy for global navigation systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
