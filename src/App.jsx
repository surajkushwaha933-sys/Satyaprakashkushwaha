import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhatIDoSection from './components/WhatIDoSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  return (
    <>
      <ParticlesBackground />
      <div className="grid-bg" />
      <Navbar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <WhatIDoSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <ExperienceSection />
        <div className="section-divider" />
        <EducationSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}

export default App;
