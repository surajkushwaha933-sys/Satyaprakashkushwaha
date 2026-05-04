import useScrollReveal from '../hooks/useScrollReveal';

const education = [
  {
    degree: 'Diploma in Mechanical Production Engineering',
    year: '2018',
    score: '72%',
    icon: '🎓',
    accent: '#06d6a0',
  },
  {
    degree: 'ADCA (Advanced Diploma in Computer Applications)',
    year: 'Completed',
    score: 'Certified',
    icon: '💻',
    accent: '#4361ee',
  },
  {
    degree: 'Class 12 (PCM)',
    year: '2014',
    score: '65%',
    icon: '📚',
    accent: '#7209b7',
  },
  {
    degree: 'Class 10',
    year: '2012',
    score: '80%',
    icon: '📖',
    accent: '#f72585',
  },
];

const certifications = [
  'ADCA Certification',
  'Self-learned AI & Automation',
  'Prompt Engineering',
];

const coreCompetencies = [
  'HD Mapping',
  'Lane-Level Data Systems',
  'Speed & Restrictions Modeling',
  'Autonomous Driving Data',
  'AI Systems & Automation',
  'Web Development',
  'IT Operations',
  'Team Leadership',
];

export default function EducationSection() {
  const ref = useScrollReveal();

  return (
    <section id="education" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal">
        <div className="section-label">Education & Certifications</div>
        <h2 className="section-title">
          Foundation & <span className="gradient-text">Growth</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
        gap: '2rem',
        marginTop: '2.5rem',
      }}>
        {/* Education Timeline */}
        <div className="reveal reveal-delay-1">
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--accent-cyan)', marginBottom: '1.5rem',
          }}>
            ⟫ EDUCATION
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {education.map((edu, idx) => (
              <div key={idx} className="glass-card" style={{
                padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: '45px', height: '45px', borderRadius: '12px', flexShrink: 0,
                  background: `${edu.accent}12`,
                  border: `1px solid ${edu.accent}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {edu.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                    fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem',
                  }}>
                    {edu.degree}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      letterSpacing: '0.1em', color: 'var(--text-muted)',
                    }}>
                      {edu.year}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      letterSpacing: '0.1em', color: edu.accent,
                    }}>
                      {edu.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications + Core Competencies */}
        <div className="reveal reveal-delay-2">
          {/* Certifications */}
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--accent-blue)', marginBottom: '1.5rem',
          }}>
            ⟫ CERTIFICATIONS
          </h3>

          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 0',
                borderBottom: idx < certifications.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '6px',
                  background: 'rgba(67, 97, 238, 0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: 'var(--accent-blue)', flexShrink: 0,
                }}>
                  ✓
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {cert}
                </span>
              </div>
            ))}
          </div>

          {/* Core Competencies */}
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--accent-purple)', marginBottom: '1.5rem',
          }}>
            ⟫ CORE COMPETENCIES
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {coreCompetencies.map((comp) => (
              <span key={comp} className="skill-tag" style={{
                background: 'rgba(114, 9, 183, 0.08)',
                borderColor: 'rgba(114, 9, 183, 0.15)',
              }}>
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
