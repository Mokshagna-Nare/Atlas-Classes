import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Mission from './components/Mission';
import Faculty from './components/Faculty';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ChevronUpIcon } from '../../components/icons';
import { NAV_LINKS } from '../../constants';
import Careers from './components/Careers';
import Benefits from './components/Benefits';

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    courses: useRef<HTMLDivElement>(null),
    benefits: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    faculty: useRef<HTMLDivElement>(null),
    careers: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const handleScroll = () => {
    const pageYOffset = window.pageYOffset;
    
    // Back to top button visibility
    if (pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }

    // Active section highlighting
    let currentSection = 'home';
    NAV_LINKS.forEach((link) => {
      const ref = sectionRefs[link.href as keyof typeof sectionRefs];
      if (ref.current) {
        const sectionTop = ref.current.offsetTop - 100;
        const sectionHeight = ref.current.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          currentSection = link.href;
        }
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-atlas-black font-sans relative isolate overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,107,0,0.15),rgba(255,255,255,0))]"></div>
      
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <div ref={sectionRefs.home} id="home"><Hero scrollToSection={scrollToSection} /></div>
        <div ref={sectionRefs.courses} id="courses"><Courses /></div>
        <div ref={sectionRefs.benefits} id="benefits"><Benefits /></div>
        <div ref={sectionRefs.mission} id="mission"><Mission /></div>
        <div ref={sectionRefs.faculty} id="faculty"><Faculty /></div>
        <div ref={sectionRefs.careers} id="careers"><Careers /></div>
        <div ref={sectionRefs.contact} id="contact"><Contact /></div>
      </main>
      <Footer />
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-atlas-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default LandingPage;