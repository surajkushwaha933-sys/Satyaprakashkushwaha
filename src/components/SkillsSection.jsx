import useScrollReveal from '../hooks/useScrollReveal';
import TiltWrapper from './TiltWrapper';

const skillCategories = [
  {
    title: 'Domain Expertise',
    icon: '🌐',
    accent: '#06d6a0',
    skills: [
      'Geospatial Data Engineering',
      'Navigation Data Strategy',
      'Digital Mapping Systems',
      'HD Mapping (HD Genesis)',
      'Lane-Level Connectivity',
    ],
  },
  {
    title: 'Regions Handled',
    icon: '🌍',
    accent: '#4361ee',
    skills: [
      'North America (USA, Canada, Mexico)',
      'Europe (UK, Germany, France, Italy, Spain)',
      'Netherlands, Belgium, Switzerland, Austria',
      'Sweden, Norway, Finland, Poland, Czech Rep.',
      'Asia-Pacific (India, Australia, Singapore, Japan)',
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '🔧',
    accent: '#7209b7',
    skills: [
      'TomTom HOME & MyDrive Connect',
      'GIS Mapping Tools',
      'Map Editor',
      'Data Validation Tools',
      'QGIS & ArcGIS',
      'Vertex & Orbis',
    ],
  },
  {
    title: 'Mapping Operations',
    icon: '📍',
    accent: '#f72585',
    skills: [
      'Map Zone Optimization',
      'Road Network Digitization',
      'POI & Junction Attributes',
      'Geographic Rule Validation',
      'Partial Coverage Accuracy (RU, TR, UA)',
    ],
  },
  {
    title: 'AI & Automation',
    icon: '🤖',
    accent: '#06d6a0',
    skills: [
      'Prompt Engineering',
      'AI Workflow Automation',
      'AI Tools Integration',
      'AI + GIS Integration',
    ],
  },
];

export default function SkillsSection() {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Skills & Tools</div>
        <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>
          Technical <span className="gradient-text">Arsenal</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          A comprehensive toolkit built across GIS, navigation systems, programming, and AI technologies.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: '1.25rem',
      }}>
        {skillCategories.map((cat, idx) => (
          <TiltWrapper key={idx} intensity={5}>
            <div
              className={`glass-card reveal reveal-delay-${Math.min(idx + 1, 5)}`}
              style={{ padding: '2rem', height: '100%' }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: `${cat.accent}12`,
                  border: `1px solid ${cat.accent}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {cat.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1rem',
                  fontWeight: 700, color: 'var(--text-primary)',
                }}>
                  {cat.title}
                </h3>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    style={{
                      '--hover-color': cat.accent,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = `${cat.accent}40`;
                      e.target.style.background = `${cat.accent}15`;
                      e.target.style.color = cat.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.target.style.background = 'rgba(255,255,255,0.04)';
                      e.target.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom accent */}
              <div style={{
                width: '100%', height: '2px', marginTop: '1.5rem',
                background: `linear-gradient(90deg, ${cat.accent}40, transparent)`,
                borderRadius: '2px',
              }} />
            </div>
          </TiltWrapper>
        ))}
      </div>
    </section>
  );
}
