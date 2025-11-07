
import React from 'react';

interface HeroProps {
    scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/education/1920/1080"
          alt="Academic background"
          className="w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-atlas-black via-transparent to-atlas-black"></div>
      </div>
      <div className="relative z-10 px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
          Empowering Every <span className="text-atlas-orange">Student</span>.
          <br />
          Elevating Every <span className="text-atlas-orange">School</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300">
          Smart Academic Solutions for Schools and Students.
        </p>
        <button 
          onClick={() => scrollToSection('courses')}
          className="bg-atlas-orange text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
