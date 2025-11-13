import React from 'react';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  return (
    <section 
      className="py-24 bg-atlas-gray relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMCAuNWgzMS41VjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          Join Our Team
        </h2>
        <div className="w-24 h-1 bg-atlas-orange mx-auto mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-300 mb-10 text-lg leading-relaxed">
          We're a team of passionate innovators shaping the future of education. If you're driven by purpose and want to be part of something bigger, we'd love to hear from you.
        </p>
        <Link
          to="/careers"
          className="bg-atlas-orange text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg shadow-atlas-orange/20 hover:bg-orange-600 hover:shadow-xl hover:shadow-atlas-orange/40 transform hover:scale-105 transition-all duration-300"
        >
          View Openings
        </Link>
      </div>
    </section>
  );
};

export default Careers;