import React from 'react';
import { COURSES_DATA } from '../../../constants';
import { Course } from '../../../types';
import { CodeBracketIcon, HeartIcon, Squares2X2Icon } from '../../../components/icons';

const courseIcons: { [key: string]: React.ReactNode } = {
    'COMPASS – Foundation for IIT-JEE': <CodeBracketIcon className="h-10 w-10 text-atlas-orange mb-4" />,
    'AXIS – Foundation for NEET': <HeartIcon className="h-10 w-10 text-atlas-orange mb-4" />,
    'NEXUS – Comprehensive Foundation': <Squares2X2Icon className="h-10 w-10 text-atlas-orange mb-4" />
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="group relative bg-atlas-gray p-8 rounded-xl shadow-lg border border-gray-800 transform hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-atlas-gray via-atlas-black to-atlas-black opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(255,107,0,0.15),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col flex-grow">
            {courseIcons[course.title]}
            <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
            <p className="text-gray-300 mb-6 flex-grow">{course.description}</p>
            <button className="mt-auto bg-atlas-orange/10 border border-atlas-orange/50 text-atlas-orange font-semibold py-2 px-6 rounded-md hover:bg-atlas-orange hover:text-white transition duration-300">
                Know More
            </button>
        </div>
    </div>
);

const Courses: React.FC = () => {
  return (
    <section className="py-20 bg-atlas-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Our Core Programs</h2>
        <div className="w-24 h-1 bg-atlas-orange mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-10">
          {COURSES_DATA.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;