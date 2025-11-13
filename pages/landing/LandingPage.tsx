
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Mission from './components/Mission';
import Faculty from './components/Faculty';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ChevronUpIcon } from '../../components/icons';
import { NAV_LINKS } from '../../constants';
import Careers from './components/Careers';

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    courses: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    faculty: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
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
    <div className="bg-atlas-black font-sans">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <div ref={sectionRefs.home} id="home"><Hero scrollToSection={scrollToSection} /></div>
        <div ref={sectionRefs.courses} id="courses"><Courses /></div>
        <div ref={sectionRefs.mission} id="mission"><Mission /></div>
        <div ref={sectionRefs.faculty} id="faculty"><Faculty /></div>
        <div ref={sectionRefs.testimonials} id="testimonials"><Testimonials /></div>
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
