import React from 'react';
import { BookOpenIcon, ClipboardCheckIcon, DesktopComputerIcon, AcademicCapIcon } from '../../../components/icons';

const missionItems = [
    {
        icon: <BookOpenIcon className="h-8 w-8 text-atlas-primary transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Content & Curriculum',
        description: 'Foundation courses (Grade 6–10) meticulously aligned with IIT-JEE/NEET requirements.',
    },
    {
        icon: <ClipboardCheckIcon className="h-8 w-8 text-atlas-primary transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Assessment',
        description: 'Weekly papers, professional evaluation, and detailed performance analysis.',
    },
    {
        icon: <DesktopComputerIcon className="h-8 w-8 text-atlas-primary transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Technology & Planning',
        description: 'Dedicated LMS access and structured Microplans for efficient lesson delivery.',
    },
    {
        icon: <AcademicCapIcon className="h-8 w-8 text-atlas-primary transition-transform duration-300 group-hover:scale-110"/>,
        title: 'Teacher Empowerment',
        description: 'Continuous Teacher Training and academic resource access.',
    },
];

const Mission: React.FC = () => {
    return (
        <section className="py-24 bg-atlas-soft relative overflow-hidden border-t border-gray-800">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-atlas-primary/5 via-transparent to-transparent opacity-50"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight text-white">Our Philosophy & Partnership Model</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-20 text-left">
                    <div className="bg-atlas-dark p-10 rounded-2xl border border-gray-700 shadow-xl hover:border-atlas-primary/30 transition-colors duration-300">
                        <h3 className="text-3xl font-bold text-atlas-primary mb-4">Mission</h3>
                        <p className="text-gray-300 text-xl leading-relaxed">"Providing accessible, affordable, and structured coaching to build a quality foundation of competitive skills in students everywhere."</p>
                    </div>
                    <div className="bg-atlas-dark p-10 rounded-2xl border border-gray-700 shadow-xl hover:border-atlas-primary/30 transition-colors duration-300">
                        <h3 className="text-3xl font-bold text-atlas-primary mb-4">Vision</h3>
                        <p className="text-gray-300 text-xl leading-relaxed">"Empowering every learner to rise from basics to brilliance and from classrooms to the world."</p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mb-20 bg-atlas-dark/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-atlas-primary"></div>
                    <h3 className="text-3xl font-bold mb-6 text-white">The <span className="text-atlas-primary">ATLAS</span> Advantage</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        We bring the structure, quality, and expertise of metropolitan coaching directly to your school, at an incredibly nominal and affordable fee. We believe high quality shouldn't mean high cost.
                    </p>
                </div>
                
                <h3 className="text-3xl font-bold mb-6 text-white">An All-Inclusive Partnership</h3>
                <p className="max-w-3xl mx-auto text-gray-400 mb-12 text-lg">
                    A seamless, all-inclusive solution allowing your school to focus solely on excellence. This collaboration delivers dual benefits through four core components.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {missionItems.map((item, index) => (
                        <div key={index} className="group bg-atlas-dark p-8 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 hover:border-atlas-primary/50 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-2">
                            <div className="flex-shrink-0 bg-gray-800 p-5 rounded-full mb-6 border border-gray-600 group-hover:border-atlas-primary group-hover:bg-atlas-primary/10 transition-all duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-atlas-primary transition-colors">{item.title}</h3>
                            <p className="text-gray-400 text-center text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;