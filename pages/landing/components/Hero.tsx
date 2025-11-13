import React from 'react';

interface HeroProps {
    scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop"
          alt="Children in a school environment, eager to learn and grow"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyOTNSwwLjA1KSI+PHBhdGggZD0iTTAgLjUgMzIgLjVtMCAxNi0zMiAwTTIyIC41djMyTTcgLjV2MzIiLz48L3N2Zz4=')] opacity-70"></div>
      </div>
      <div className="relative z-10 px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
          Empowering Every <span className="text-atlas-orange">Student</span>.
          <br />
          Elevating Every <span className="text-atlas-orange">School</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300">
          We bring the structure, quality, and expertise of metropolitan coaching directly to your school, providing a true foundation for the future.
        </p>
        <button 
          onClick={() => scrollToSection('courses')}
          className="bg-atlas-orange text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 animate-glow"
        >
          Explore Our Programs
        </button>
      </div>
    </section>
  );
};

export default Hero;