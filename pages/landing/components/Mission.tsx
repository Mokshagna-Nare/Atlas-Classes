import React from 'react';
import { BookOpenIcon, ClipboardCheckIcon, DesktopComputerIcon, AcademicCapIcon } from '../../../components/icons';

const missionItems = [
    {
        icon: <BookOpenIcon className="h-8 w-8 text-atlas-orange transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Content & Curriculum',
        description: 'Foundation courses (Grade 6–10) meticulously aligned with IIT-JEE/NEET requirements.',
    },
    {
        icon: <ClipboardCheckIcon className="h-8 w-8 text-atlas-orange transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Assessment',
        description: 'Weekly papers, professional evaluation, and detailed performance analysis.',
    },
    {
        icon: <DesktopComputerIcon className="h-8 w-8 text-atlas-orange transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Technology & Planning',
        description: 'Dedicated LMS access and structured Microplans for efficient lesson delivery.',
    },
    {
        icon: <AcademicCapIcon className="h-8 w-8 text-atlas-orange transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Teacher Empowerment',
        description: 'Continuous Teacher Training and academic resource access.',
    },
];

const Mission: React.FC = () => {
    return (
        <section className="py-20 bg-atlas-gray relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiPjxwYXRoIGQ9Ik0wIDBoNjR2NjRIMHoiLz48cGF0aCBkPSJNMCAyNEw4IDMybDgtOFptMTYtMTZMMjQgOGw4LTh6TTQgNEwzNiA0ME0yOCAwTDAgMjgiLz48L3N2Zz4=')] opacity-50"></div>
            <div className="container mx-auto px-6 text-center relative">
                <h2 className="text-4xl font-extrabold mb-12 tracking-tight">Our Philosophy & Partnership Model</h2>

                <div className="grid md:grid-cols-2 gap-10 mb-16 text-left">
                    <div className="bg-atlas-black/50 backdrop-blur-sm p-8 rounded-xl border border-atlas-orange/20 shadow-lg">
                        <h3 className="text-3xl font-bold text-atlas-orange mb-4">Mission</h3>
                        <p className="text-gray-300 text-lg">"Providing accessible, affordable, and structured coaching to build a quality foundation of competitive skills in students everywhere."</p>
                    </div>
                    <div className="bg-atlas-black/50 backdrop-blur-sm p-8 rounded-xl border border-atlas-orange/20 shadow-lg">
                        <h3 className="text-3xl font-bold text-atlas-orange mb-4">Vision</h3>
                        <p className="text-gray-300 text-lg">"Empowering every learner to rise from basics to brilliance and from classrooms to the world."</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mb-16 bg-atlas-black/30 p-8 rounded-xl">
                    <h3 className="text-3xl font-bold mb-4">The <span className="text-atlas-orange">ATLAS</span> Advantage</h3>
                    <p className="text-gray-300 text-lg">
                        We bring the structure, quality, and expertise of metropolitan coaching directly to your school, at an incredibly nominal and affordable fee. We believe high quality shouldn't mean high cost.
                    </p>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">An All-Inclusive Partnership</h3>
                <p className="max-w-3xl mx-auto text-gray-400 mb-12">
                    A seamless, all-inclusive solution allowing your school to focus solely on excellence. This collaboration delivers dual benefits through four core components.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {missionItems.map((item, index) => (
                        <div key={index} className="group bg-atlas-black/50 backdrop-blur-sm p-6 rounded-xl shadow-md flex flex-col items-center border border-gray-800 hover:border-atlas-orange/50 transition-colors duration-300">
                            <div className="flex-shrink-0 bg-atlas-gray p-4 rounded-full mb-4 border border-gray-700 group-hover:bg-atlas-orange/10 transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-center text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;