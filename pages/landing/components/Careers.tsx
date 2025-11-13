
import React from 'react';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  return (
    <section className="py-20 bg-atlas-gray">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Join Our Team</h2>
        <div className="w-24 h-1 bg-atlas-orange mx-auto mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-300 mb-10 text-lg">
          We are always looking for passionate and talented individuals to help us revolutionize education.
          Explore our open positions and become a part of our mission to empower students and elevate schools.
        </p>
        <Link
          to="/careers"
          className="bg-atlas-orange text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
        >
          View Openings
        </Link>
      </div>
    </section>
  );
};

export default Careers;
