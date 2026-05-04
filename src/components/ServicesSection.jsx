import useScrollReveal from '../hooks/useScrollReveal';

const services = [
  {
    title: 'GIS & HD Mapping Services',
    description: 'High-definition mapping, lane-level data, and geospatial analysis for navigation platforms.',
    icon: '🗺️',
    accent: '#06d6a0',
    features: ['HD Map Creation', 'Lane Modeling', 'Spatial Analysis', 'Data Validation'],
  },
  {
    title: 'Lane-Level Data Processing',
    description: 'Precision lane connectivity, geometry modeling, and topology management.',
    icon: '🛣️',
    accent: '#4361ee',
    features: ['Lane Connectivity', 'Road Geometry', 'Topology Checks', 'Quality Assurance'],
  },
  {
    title: 'Speed & Restriction Mapping',
    description: 'Speed profile mapping, turn restrictions, and navigation rule modeling.',
    icon: '⚡',
    accent: '#7209b7',
    features: ['Speed Profiles', 'Turn Restrictions', 'Traffic Rules', 'Route Logic'],
  },
  {
    title: 'AI Automation Systems',
    description: 'Intelligent automation workflows, prompt engineering, and AI-powered solutions.',
    icon: '🤖',
    accent: '#f72585',
    features: ['AI Integration', 'Workflow Automation', 'Prompt Engineering', 'Data Extraction'],
  },
  {
    title: 'Website Development',
    description: 'Full-stack web development, IT operations, and digital platform management.',
    icon: '💻',
    accent: '#06d6a0',
    features: ['Web Development', 'IT Management', 'Performance Optimization', 'Deployment'],
  },
];

export default function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section id="services" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Services</div>
        <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>
          What I <span className="gradient-text">Offer</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Professional services tailored for geospatial, AI, and web technology needs.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: '1.25rem',
      }}>
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`glass-card reveal reveal-delay-${Math.min(idx + 1, 5)}`}
            style={{
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${service.accent}30`;
              e.currentTarget.style.boxShadow = `0 0 40px ${service.accent}12`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: `radial-gradient(circle, ${service.accent}08, transparent)`,
              pointerEvents: 'none',
            }} />

            {/* Icon */}
            <div style={{
              width: '55px', height: '55px', borderRadius: '16px',
              background: `${service.accent}10`,
              border: `1px solid ${service.accent}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', marginBottom: '1.25rem',
            }}>
              {service.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.1rem',
              fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem',
            }}>
              {service.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '0.85rem', color: 'var(--text-secondary)',
              lineHeight: 1.7, marginBottom: '1.5rem',
            }}>
              {service.description}
            </p>

            {/* Feature List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {service.features.map((f) => (
                <span key={f} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  letterSpacing: '0.05em', padding: '0.3rem 0.7rem',
                  borderRadius: '100px',
                  background: `${service.accent}08`,
                  color: `${service.accent}cc`,
                  border: `1px solid ${service.accent}15`,
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
