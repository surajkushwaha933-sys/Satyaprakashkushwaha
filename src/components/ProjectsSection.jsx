import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import TiltWrapper from './TiltWrapper';

const projects = [
  {
    id: 1,
    title: 'Nayra AI Assistant',
    status: 'In Development',
    icon: '🤖',
    accent: '#06d6a0',
    problem: 'Manual tasks and content workflows are time-consuming and repetitive.',
    solution: 'Built an AI assistant system with crawler functionality for intelligent automation.',
    features: ['Content generation', 'Data extraction', 'Automation workflows', 'Smart crawling'],
    tools: ['AI Tools', 'Prompt Engineering', 'Python', 'JavaScript'],
    result: 'Improved efficiency and automated repetitive workflows significantly.',
  },
  {
    id: 2,
    title: 'MyParikshaAI',
    status: 'In Development',
    icon: '📝',
    accent: '#4361ee',
    problem: 'Manual test creation is slow, inefficient, and error-prone.',
    solution: 'AI-based test platform for automated assessment generation.',
    features: ['Automated test paper generation', 'Question bank system', 'Student assessment', 'Multi-exam support'],
    tools: ['AI Tools', 'React', 'Python', 'Database'],
    result: 'Focus on IIT JEE, NEET, and Polytechnic entrance preparation.',
  },
  {
    id: 3,
    title: 'Physic Charcha Website',
    status: 'Completed',
    icon: '🌐',
    accent: '#7209b7',
    problem: 'Need for a dedicated online education platform with structured content.',
    solution: 'Built full website and handled complete IT system infrastructure.',
    features: ['Full website development', 'IT system management', 'Content management', 'Performance optimization'],
    tools: ['HTML', 'CSS', 'JavaScript', 'Web Hosting'],
    result: 'Functional platform with structured digital content serving students.',
  },
];

export default function ProjectsSection() {
  const ref = useScrollReveal();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="projects" className="section" ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <div className="reveal">
        <div className="section-label">Projects</div>
        <h2 className="section-title">
          Featured <span className="gradient-text">Work</span>
        </h2>
        <p className="section-subtitle">
          Real-world projects combining GIS expertise, AI innovation, and web technologies.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gap: '1.5rem',
        marginTop: '2.5rem',
      }}>
        {projects.map((project, idx) => {
          const isExpanded = expandedId === project.id;

          return (
            <TiltWrapper key={project.id} intensity={2}>
              <div
                className={`glass-card reveal reveal-delay-${idx + 1}`}
                style={{
                  padding: '2rem',
                  cursor: 'pointer',
                  borderColor: isExpanded ? `${project.accent}30` : undefined,
                  boxShadow: isExpanded ? `0 0 40px ${project.accent}10` : undefined,
                }}
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
              >
                {/* Header Row */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: '1rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '55px', height: '55px', borderRadius: '16px',
                      background: `${project.accent}12`,
                      border: `1px solid ${project.accent}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                        fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem',
                      }}>
                        {project.title}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '0.25rem 0.75rem', borderRadius: '100px',
                        background: project.status === 'Completed'
                          ? 'rgba(6, 214, 160, 0.15)'
                          : 'rgba(67, 97, 238, 0.15)',
                        color: project.status === 'Completed'
                          ? 'var(--accent-cyan)'
                          : 'var(--accent-blue)',
                        border: `1px solid ${project.status === 'Completed' ? 'rgba(6,214,160,0.25)' : 'rgba(67,97,238,0.25)'}`,
                      }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1.2rem',
                    color: 'var(--text-muted)', transition: 'transform 0.3s',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ▾
                  </div>
                </div>

                {/* Expanded Content */}
                <div style={{
                  maxHeight: isExpanded ? '600px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    {/* Problem */}
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#f72585', marginBottom: '0.5rem',
                      }}>
                        ⟫ PROBLEM
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {project.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: 'var(--accent-cyan)', marginBottom: '0.5rem',
                      }}>
                        ⟫ SOLUTION
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {project.solution}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: 'var(--accent-blue)', marginBottom: '0.5rem',
                      }}>
                        ⟫ FEATURES
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {project.features.map((f) => (
                          <li key={f} style={{
                            fontSize: '0.85rem', color: 'var(--text-secondary)',
                            padding: '0.2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
                          }}>
                            <span style={{ color: project.accent, fontSize: '0.5rem' }}>●</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tools & Result */}
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      {project.tools.map((t) => (
                        <span key={t} className="skill-tag" style={{ fontSize: '0.6rem' }}>{t}</span>
                      ))}
                    </div>
                    <div style={{
                      padding: '1rem 1.25rem', borderRadius: '12px',
                      background: `${project.accent}08`,
                      border: `1px solid ${project.accent}15`,
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: project.accent, marginBottom: '0.35rem',
                      }}>
                        RESULT
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {project.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltWrapper>
          );
        })}
      </div>
    </section>
  );
}
