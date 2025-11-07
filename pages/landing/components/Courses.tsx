
import React from 'react';
import { COURSES_DATA } from '../../../constants';
import { Course } from '../../../types';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-atlas-gray p-8 rounded-lg shadow-lg hover:shadow-atlas-orange/20 border border-transparent hover:border-atlas-orange/50 transform hover:-translate-y-2 transition-all duration-300 flex flex-col">
        <h3 className="text-2xl font-bold text-atlas-orange mb-4">{course.title}</h3>
        <p className="text-gray-300 mb-6 flex-grow">{course.description}</p>
        <button className="mt-auto bg-transparent border border-atlas-orange text-atlas-orange font-semibold py-2 px-6 rounded-md hover:bg-atlas-orange hover:text-white transition duration-300">
            Know More
        </button>
    </div>
);

const Courses: React.FC = () => {
  return (
    <section className="py-20 bg-atlas-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Our Programs</h2>
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
