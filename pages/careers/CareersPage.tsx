
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '../../components/icons';

const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-atlas-black text-white font-sans">
      <header className="bg-atlas-gray shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-atlas-orange">
            Atlas<span className="text-white">Classes</span>
          </Link>
          <Link to="/" className="flex items-center text-gray-300 hover:text-atlas-orange transition-colors">
             <ArrowLeftIcon className="h-4 w-4 mr-2" />
             Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Work With Us</h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Be part of a team that's shaping the future of education. We're passionate, innovative, and dedicated to making a difference.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-atlas-orange mb-6">Current Openings</h2>
          <div className="bg-atlas-gray p-8 rounded-lg shadow-lg border border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h3 className="text-2xl font-bold text-white">Marketing Intern</h3>
                    <div className="flex items-center space-x-4 text-gray-400 mt-1">
                        <span>Internship</span>
                        <span>•</span>
                        <span>Remote</span>
                        <span>•</span>
                        <span>3-Month Duration</span>
                    </div>
                </div>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdIPG5Pe3H2sIZP04LRzIcg0m7RnIKISOaYAaJVOYIgHdCd0A/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 bg-atlas-orange text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300 whitespace-nowrap"
                >
                    Apply Now
                </a>
            </div>
            <div className="border-t border-gray-700 my-6"></div>
            <div>
              <p className="text-gray-300 mb-4">
                We are looking for an enthusiastic and driven Marketing Intern to join our team. This role is focused on generating leads and building relationships with schools (classes 6-10) to introduce them to the programs Atlas Classes offers. You will be at the forefront of our expansion efforts, explaining our value proposition and converting prospects into potential clients.
              </p>
              <h4 className="font-bold text-white mt-4 mb-2">What We Offer:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Comprehensive training related to the internship work and our sales process.</li>
                <li>Hands-on experience in B2B marketing and lead generation.</li>
              </ul>
              <h4 className="font-bold text-white mt-4 mb-2">Responsibilities:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Actively seek out and generate new leads, primarily targeting schools with students in classes 6 to 10.</li>
                <li>Clearly and effectively explain the various educational programs that Atlas Classes offers.</li>
                <li>Engage with school administrators and decision-makers to convert leads into potential clients.</li>
                <li>Maintain a record of outreach and lead status.</li>
              </ul>
              <h4 className="font-bold text-white mt-4 mb-2">Requirements:</h4>
               <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Strong desire to learn along with professional drive.</li>
                <li>Excellent verbal and written communication skills.</li>
                <li>Self-motivated with a results-driven approach.</li>
                <li>Familiarity with marketing computer software and online applications (e.g. CRM tools, Online analytics) is a plus.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-atlas-gray py-6 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Atlas Classes. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
