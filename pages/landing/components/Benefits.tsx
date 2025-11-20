import React from 'react';

const schoolBenefits = [
    'Enhanced Brand Value',
    'Improved Quality & Standards',
    'Increased Revenue Generation',
    'Competitive Edge in the region',
    'Zero program infrastructure cost',
];

const studentBenefits = [
    'Builds Cognitive and Analytical Skills',
    'Early Preparation for IIT-JEE, NEET',
    'High-Quality, low Fee curriculum locally',
    'Eliminates costly metropolitan relocation',
    'Fuels confidence, ensures success',
];

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);


const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-atlas-soft border-y border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-white">A Partnership That Benefits Everyone</h2>
        <div className="w-24 h-1 bg-atlas-primary mx-auto mb-12"></div>
        <div className="grid md:grid-cols-2 gap-10 text-left">
            {/* School Benefits Card */}
            <div className="group relative bg-atlas-dark p-8 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-atlas-primary/50">
                <div className="absolute inset-0 bg-gradient-to-br from-atlas-dark via-gray-900 to-gray-900 opacity-50"></div>
                <div className="relative">
                    <h3 className="text-3xl font-bold text-atlas-primary mb-6">Benefit to the School</h3>
                    <ul className="space-y-4">
                        {schoolBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                <CheckIcon className="h-6 w-6 text-atlas-primary mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-300 text-lg">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Student & Parent Benefits Card */}
            <div className="group relative bg-atlas-dark p-8 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-atlas-primary/50">
                <div className="absolute inset-0 bg-gradient-to-br from-atlas-dark via-gray-900 to-gray-900 opacity-50"></div>
                <div className="relative">
                    <h3 className="text-3xl font-bold text-atlas-primary mb-6">Benefit to Students & Parents</h3>
                    <ul className="space-y-4">
                        {studentBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                                <CheckIcon className="h-6 w-6 text-atlas-primary mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-300 text-lg">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;