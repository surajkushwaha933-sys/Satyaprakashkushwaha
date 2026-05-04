import useScrollReveal from '../hooks/useScrollReveal';

const services = [
  {
    icon: '🗺️',
    title: 'HD Mapping & Lane-Level Systems',
    description: 'High-definition map creation with lane-level precision for navigation and ADAS platforms.',
    accent: '#06d6a0',
  },
  {
    icon: '🚗',
    title: 'Autonomous Driving Data (HAD / HGE)',
    description: 'Highly Automated Driving datasets and HD Genesis frameworks for self-driving vehicle systems.',
    accent: '#4361ee',
  },
  {
    icon: '⚡',
    title: 'Speed Profile Mapping & Traffic Modeling',
    description: 'Speed limit mapping, traffic flow analysis, and real-time traffic rule modeling.',
    accent: '#7209b7',
  },
  {
    icon: '🔄',
    title: 'Uber Restrictions & Navigation Logic',
    description: 'Turn restrictions, route optimization, and navigation logic for ride-sharing platforms.',
    accent: '#f72585',
  },
  {
    icon: '🤖',
    title: 'AI Systems & Automation',
    description: 'Intelligent automation workflows, prompt engineering, and AI-powered data processing systems.',
    accent: '#06d6a0',
  },
  {
    icon: '💻',
    title: 'Website Development & IT Operations',
    description: 'Full-stack web development, IT system management, and digital platform deployment.',
    accent: '#4361ee',
  },
];

export default function WhatIDoSection() {
  const ref = useScrollReveal();

  return (
    <section id="whatido" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>What I Do</div>
        <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>
          Expertise <span className="gradient-text">& Capabilities</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          From geospatial intelligence to AI automation — delivering precision at every level.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
        gap: '1.25rem',
      }}>
        {services.map((item, idx) => (
          <div
            key={idx}
            className={`glass-card reveal reveal-delay-${Math.min(idx + 1, 6)}`}
            style={{ padding: '2rem', cursor: 'default' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${item.accent}30`;
              e.currentTarget.style.boxShadow = `0 0 30px ${item.accent}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Icon */}
            <div style={{
              width: '50px', height: '50px', borderRadius: '14px',
              background: `${item.accent}12`,
              border: `1px solid ${item.accent}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', marginBottom: '1.25rem',
            }}>
              {item.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.1rem',
              fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)',
            }}>
              {item.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7,
            }}>
              {item.description}
            </p>

            {/* Bottom accent line */}
            <div style={{
              width: '40px', height: '2px', marginTop: '1.5rem',
              background: `linear-gradient(90deg, ${item.accent}, transparent)`,
              borderRadius: '2px',
            }} />
          </div>
        ))}
      </div>
    </section>
  );
}
