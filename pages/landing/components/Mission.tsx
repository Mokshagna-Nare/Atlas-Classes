
import React from 'react';
import { BookOpenIcon, ClipboardCheckIcon, DesktopComputerIcon, AcademicCapIcon } from '../../../components/icons';

const missionItems = [
    {
        icon: <BookOpenIcon className="h-12 w-12 text-atlas-orange mb-4"/>,
        title: 'Content & Curriculum',
        description: 'Foundation courses (Grade 6–10) meticulously aligned with IIT-JEE/NEET requirements.',
    },
    {
        icon: <ClipboardCheckIcon className="h-12 w-12 text-atlas-orange mb-4"/>,
        title: 'Assessment',
        description: 'Weekly papers, professional evaluation, and detailed performance analysis.',
    },
    {
        icon: <DesktopComputerIcon className="h-12 w-12 text-atlas-orange mb-4"/>,
        title: 'Technology & Planning',
        description: 'Dedicated LMS access and structured Microplans for efficient lesson delivery.',
    },
    {
        icon: <AcademicCapIcon className="h-12 w-12 text-atlas-orange mb-4"/>,
        title: 'Teacher Empowerment',
        description: 'Continuous Teacher Training and academic resource access.',
    },
];

const Mission: React.FC = () => {
    return (
        <section className="py-20 bg-atlas-gray">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4">Our Mission & Core Values</h2>
                <p className="max-w-3xl mx-auto text-gray-400 mb-12">
                    A seamless, all-inclusive solution allowing your school to focus solely on excellence. This collaboration delivers dual benefits through four core components.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {missionItems.map((item, index) => (
                        <div key={index} className="bg-atlas-black p-8 rounded-lg shadow-md flex flex-col items-center">
                            {item.icon}
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-center">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;
