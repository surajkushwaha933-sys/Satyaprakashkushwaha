import { useState, useEffect } from 'react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoText, setLogoText] = useState('SK');
  const [isFullName, setIsFullName] = useState(false);

  // Hacker Text Decryption Effect for Logo
  useEffect(() => {
    const full = "SATYAPRAKASH KUSHWAHA";
    const short = "SK";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let isFull = false;
    let scrambleInterval;

    const mainInterval = setInterval(() => {
      isFull = !isFull;
      setIsFullName(isFull);
      const target = isFull ? full : short;
      let iter = 0;
      
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        setLogoText(prev => {
          return target.split('').map((char, index) => {
            if (index < iter) return target[index];
            if (target[index] === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
        });
        iter += 1/2; // Faster scramble
        if (iter >= target.length) clearInterval(scrambleInterval);
      }, 30);
    }, 5000); // Swap every 5 seconds

    return () => {
      clearInterval(mainInterval);
      clearInterval(scrambleInterval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(3, 7, 18, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Logo Container */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick('home'); }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              textDecoration: 'none'
            }}
          >
            <span style={{
              backgroundImage: isFullName 
                ? 'linear-gradient(135deg, #06d6a0, #f72585)' 
                : 'var(--gradient-main)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              {logoText}
            </span>
            {!isFullName && <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>.</span>}
          </a>
        </div>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              style={{
                background: activeSection === link.id
                  ? 'rgba(6, 214, 160, 0.1)'
                  : 'transparent',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeSection === link.id
                  ? 'var(--accent-cyan)'
                  : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== link.id) {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'rgba(255,255,255,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.id) {
                  e.target.style.color = 'var(--text-muted)';
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--accent-cyan)',
            transition: 'all 0.3s',
            transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--accent-cyan)',
            transition: 'all 0.3s',
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: 'var(--accent-cyan)',
            transition: 'all 0.3s',
            transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(3, 7, 18, 0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: activeSection === link.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'color 0.3s',
                letterSpacing: '0.05em',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
