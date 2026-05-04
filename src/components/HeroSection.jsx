import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textContainerRef = useRef(null);
  const tiltRef = useRef(null);
  const imagesRef = useRef([]);
  
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hudName, setHudName] = useState('SK');

  const frameCount = 40;

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/images/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / frameCount) * 100));
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

  // Scroll-driven canvas rendering & zoom
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const section = sectionRef.current;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      
      // 1. Rotation phase (0 to 0.7 of scroll)
      const rotationProgress = Math.min(1, rawProgress / 0.7);
      const frameIdx = Math.min(frameCount - 1, Math.floor(rotationProgress * (frameCount - 1)));

      // 2. Cinematic Text Reveal phase (0.7 to 1.0 of scroll)
      const textProgress = Math.max(0, (rawProgress - 0.7) / 0.3); // Normalize to 0-1
      
      const zoomScale = 1 + (textProgress * 0.1); // Subtle zoom 1x to 1.1x
      const blurAmount = textProgress * 12; // Cinematic depth of field blur up to 12px
      const canvasOpacity = loaded ? 0.85 - (textProgress * 0.5) : 0; // Darken canvas behind text
      
      canvas.style.transform = `scale(${zoomScale})`;
      canvas.style.filter = `blur(${blurAmount}px)`;
      canvas.style.opacity = canvasOpacity;
      
      if (textContainerRef.current) {
        textContainerRef.current.style.opacity = textProgress;
        textContainerRef.current.style.transform = `translateY(${40 - textProgress * 40}px) scale(${0.9 + textProgress * 0.1})`;
        textContainerRef.current.style.pointerEvents = textProgress > 0.8 ? 'auto' : 'none';
      }

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

  // Hacker Text Decryption Effect (SK <-> SATYAPRAKASH KUSHWAHA)
  useEffect(() => {
    if (!loaded) return;
    const full = "SATYAPRAKASH KUSHWAHA";
    const short = "SK";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let isFull = false;
    let scrambleInterval;

    const mainInterval = setInterval(() => {
      isFull = !isFull;
      const target = isFull ? full : short;
      let iter = 0;
      
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        setHudName(prev => {
          return target.split('').map((char, index) => {
            if (index < iter) return target[index];
            if (target[index] === ' ') return ' '; // Preserve spaces
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
        });
        
        iter += 1/3;
        if (iter >= target.length) clearInterval(scrambleInterval);
      }, 30);
    }, 4000); // Swap every 4 seconds

    return () => {
      clearInterval(mainInterval);
      clearInterval(scrambleInterval);
    };
  }, [loaded]);

  // 3D Parallax Mouse Move Effect
  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // max 10 deg rotation
    const y = (clientY / window.innerHeight - 0.5) * 20;
    
    // Smoothly apply transform
    tiltRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '400vh',
        background: '#000000',
      }}
    >
      {/* Sticky container handling mouse events for parallax */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Loading Screen */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#000000',
          }}>
            {/* Animated ring */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              border: '2px solid rgba(6, 214, 160, 0.1)',
              borderTopColor: 'var(--accent-cyan)',
              animation: 'rotateGlow 1s linear infinite',
              marginBottom: '2rem',
            }} />
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.5em',
              textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: '1.5rem',
              animation: 'text-flicker 2s infinite',
            }}>
              ⟫ INITIALIZING NEURAL CORE...
            </div>
            <div style={{ width: '280px', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '3px',
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue), var(--accent-purple))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
                width: `${progress}%`, transition: 'width 0.3s ease-out',
              }} />
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)',
              marginTop: '0.75rem', letterSpacing: '0.2em',
            }}>
              {progress}% LOADED
            </div>
          </div>
        )}

        {/* Radial glow behind face (subtle) */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Canvas for face rotation */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 5,
            opacity: loaded ? 0.85 : 0,
            transition: 'opacity 1.5s ease-out',
          }}
        />

        {/* Dark overlay gradients on canvas */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.9) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.65) 100%)',
        }} />

        {/* HUD — Top Left */}
        <div style={{
          position: 'absolute', top: '6.5rem', left: '2rem', zIndex: 20,
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-cyan)',
          letterSpacing: '0.3em', lineHeight: '1.8', opacity: loaded ? 0.5 : 0,
          transition: 'opacity 1s ease-out 1s', pointerEvents: 'none',
        }}>
          <div>⟫ {hudName}</div>
          <div>⟫ SENIOR GIS SPECIALIST • AI ENGINEER</div>
          <div>⟫ 28.5355°N / 77.3910°E</div>
        </div>

        {/* HUD — Top Right */}
        <div style={{
          position: 'absolute', top: '6.5rem', right: '2rem', zIndex: 20,
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-dim)',
          letterSpacing: '0.25em', lineHeight: '1.8', textAlign: 'right',
          opacity: loaded ? 0.5 : 0, transition: 'opacity 1s ease-out 1.2s', pointerEvents: 'none',
        }}>
          <div>NOIDA, INDIA</div>
          <div>CYIENT LIMITED</div>
          <div>STATUS: ACTIVE</div>
        </div>

        {/* HUD — Bottom Right */}
        <div style={{
          position: 'absolute', bottom: '3rem', right: '2rem', zIndex: 20,
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-dim)',
          letterSpacing: '0.25em', lineHeight: '1.8', textAlign: 'right',
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease-out 1.5s', pointerEvents: 'none',
        }}>
          <div>SYS_ID: GIS_SPECIALIST</div>
          <div>EXP: 7+ YEARS • GROUP LEAD</div>
          <div style={{ color: 'var(--accent-cyan)', opacity: 0.6 }}>■ ALL SYSTEMS NOMINAL</div>
        </div>

        {/* Outer Text Container for Scroll Sync */}
        <div 
          ref={textContainerRef}
          style={{
            position: 'relative', zIndex: 15,
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out', // smooth scroll syncing
          }}
        >
          {/* Inner Tilt Container for 3D Parallax */}
          <div
            ref={tiltRef}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px',
              transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // super smooth mouse follow
            }}
          >
            {/* System tag */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: 'var(--accent-cyan)',
              marginBottom: '1.5rem',
            }}>
              ⟫ NEURAL CORE INITIALIZED
            </div>

            {/* Main Name */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1,
              marginBottom: '0.5rem', color: '#fff',
            }}>
              SATYAPRAKASH
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #06d6a0, #4361ee, #7209b7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                KUSHWAHA
              </span>
            </h1>

            {/* Title */}
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem',
            }}>
              Senior GIS Specialist | AI Engineer | HD Mapping | Autonomous Driving Data
            </p>

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', color: 'rgba(255,255,255,0.35)',
              maxWidth: '580px', lineHeight: 1.7, fontStyle: 'italic',
              marginBottom: '2.5rem',
            }}>
              "Building intelligent systems at the intersection of GIS, AI, and digital technology."
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
            }}>
              <a href="#projects" className="neon-btn-filled" style={{ transform: 'translateZ(20px)' }}>View Projects</a>
              <a href="#contact" className="neon-btn" style={{ transform: 'translateZ(10px)' }}>Contact Me</a>
            </div>

            {/* Global Experience Badge */}
            <div style={{
              marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.6rem 1.2rem', borderRadius: '100px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ fontSize: '1rem' }}>🌍</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.15em', color: 'var(--text-muted)',
              }}>
                USA • GERMANY • FRANCE • UK • NETHERLANDS
              </span>
            </div>
          </div>
        </div>

        {/* Social Links — Bottom Left */}
        <div style={{
          position: 'absolute', bottom: '3rem', left: '2rem', zIndex: 20,
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease-out 2s',
        }}>
          {[
            { href: 'https://github.com', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
            { href: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              style={{ color: 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(6,214,160,0.6))'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.filter = 'none'; }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon}/></svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
