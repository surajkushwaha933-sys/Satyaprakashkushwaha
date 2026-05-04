import useScrollReveal from '../hooks/useScrollReveal';
import TiltWrapper from './TiltWrapper';

const experiences = [
  {
    company: 'Cyient Limited',
    location: 'Noida',
    roles: [
      {
        title: 'Senior GIS Specialist (Group Lead)',
        period: 'Aug 2021 – Present',
        isCurrent: true,
        responsibilities: [
          'Global Map Content Management for 20+ countries including USA, Canada, UK, Germany, France, and India',
          'Optimizing Map Zones for TomTom HOME and MyDrive Connect platforms across Europe (North, South, West, East)',
          'Digitizing road networks, junctions, and Points of Interest (POI) to global navigation standards',
          'Regional expertise in geographic rule validation and data improvement for diverse global territories',
          'Leading Quality Assurance in partial coverage regions such as Turkey, Russia, and Ukraine to enhance map accuracy',
          'Managing a team of 10–15 members for end-to-end HD mapping and HAD dataset workflows',
        ],
        impact: 'Successfully managed and optimized navigation data for 20+ global markets, ensuring precise door-to-door navigation for millions of users.',
      },
      {
        title: 'GIS Engineer',
        period: 'Aug 2018 – Aug 2021',
        isCurrent: false,
        responsibilities: [
          'Lane mapping projects',
          'Road geometry updates',
          'POI updates',
          'Restriction and navigation data processing',
        ],
        impact: null,
      },
    ],
  },
  {
    company: 'Physic Charcha',
    location: 'Part-Time',
    roles: [
      {
        title: 'IT & Web Systems Specialist',
        period: '2026 – Present',
        isCurrent: true,
        responsibilities: [
          'Website development',
          'IT system management',
          'Deployment & performance optimization',
        ],
        impact: null,
      },
    ],
  },
];

export default function ExperienceSection() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal">
        <div className="section-label">Experience</div>
        <h2 className="section-title">
          Professional <span className="gradient-text">Journey</span>
        </h2>
        <p className="section-subtitle">
          7+ years of driving innovation in geospatial intelligence and navigation systems.
        </p>
      </div>

      <div style={{ marginTop: '3rem', position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute', left: '20px', top: '0', bottom: '0',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-blue), var(--accent-purple), transparent)',
        }} className="timeline-line" />

        {experiences.map((exp, expIdx) => (
          <div key={expIdx} style={{ marginBottom: '2.5rem' }}>
            {/* Company Header */}
            <div className={`reveal reveal-delay-${expIdx + 1}`} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1.5rem', paddingLeft: '52px',
              position: 'relative',
            }}>
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute', left: '11px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'var(--bg-primary)',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 15px rgba(6, 214, 160, 0.3)',
                zIndex: 2,
              }} />

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                  fontWeight: 700, color: 'var(--text-primary)',
                }}>
                  {exp.company}
                </h3>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.1em', color: 'var(--text-muted)',
                }}>
                  📍 {exp.location}
                </span>
              </div>
            </div>

            {/* Roles */}
            {exp.roles.map((role, roleIdx) => (
              <TiltWrapper key={roleIdx} intensity={3}>
                <div
                  className={`glass-card reveal reveal-delay-${expIdx + roleIdx + 2}`}
                  style={{
                    marginLeft: '52px', marginBottom: '1rem',
                    padding: '1.75rem',
                    borderColor: role.isCurrent ? 'rgba(6, 214, 160, 0.15)' : undefined,
                  }}
                >
                  {/* Role Header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem',
                  }}>
                    <h4 style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                      fontWeight: 600, color: 'var(--text-primary)',
                    }}>
                      {role.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {role.isCurrent && (
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                          letterSpacing: '0.15em', padding: '0.2rem 0.6rem',
                          borderRadius: '100px', background: 'rgba(6, 214, 160, 0.15)',
                          color: 'var(--accent-cyan)', border: '1px solid rgba(6,214,160,0.25)',
                        }}>
                          CURRENT
                        </span>
                      )}
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        letterSpacing: '0.1em', color: 'var(--text-muted)',
                      }}>
                        {role.period}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {role.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} style={{
                        fontSize: '0.85rem', color: 'var(--text-secondary)',
                        padding: '0.3rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                        lineHeight: 1.6,
                      }}>
                        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.4rem', marginTop: '0.5rem', flexShrink: 0 }}>●</span>
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {/* Impact */}
                  {role.impact && (
                    <div style={{
                      marginTop: '1.25rem', padding: '1rem 1.25rem',
                      borderRadius: '12px', background: 'rgba(6, 214, 160, 0.06)',
                      border: '1px solid rgba(6, 214, 160, 0.12)',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'var(--accent-cyan)', marginBottom: '0.35rem',
                      }}>
                        ⟫ IMPACT
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {role.impact}
                      </p>
                    </div>
                  )}
                </div>
              </TiltWrapper>
            ))}
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 10px !important; }
        }
      `}</style>
    </section>
  );
}
