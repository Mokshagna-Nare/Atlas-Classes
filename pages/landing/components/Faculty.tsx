import React, { useState } from 'react';
import { FACULTY_DATA } from '../../../constants';
import { FacultyMember } from '../../../types';
import FacultyModal from './FacultyModal';

const FacultyCard: React.FC<{ member: FacultyMember; onClick: () => void; }> = ({ member, onClick }) => (
    <div 
        className="group relative bg-atlas-soft rounded-lg overflow-hidden text-center p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-800 cursor-pointer border border-gray-800 hover:border-atlas-primary/50"
        onClick={onClick}
    >
        <img 
            src={member.photoUrl} 
            alt={member.name} 
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-atlas-dark shadow-md group-hover:border-atlas-primary transition-colors duration-300" 
        />
        <div className="relative">
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-atlas-primary font-medium">{member.subject}</p>
            <p className="text-gray-500 text-sm">{member.experience} Experience</p>
        </div>
    </div>
);

const Faculty: React.FC = () => {
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

    const handleCardClick = (member: FacultyMember) => {
        setSelectedFaculty(member);
    };

    const handleCloseModal = () => {
        setSelectedFaculty(null);
    };

    return (
        <>
            <section className="py-20 bg-atlas-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-extrabold mb-4 text-white">Meet Our Faculty</h2>
                    <div className="w-24 h-1 bg-atlas-primary mx-auto mb-12"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {FACULTY_DATA.map((member) => (
                            <FacultyCard key={member.id} member={member} onClick={() => handleCardClick(member)} />
                        ))}
                    </div>
                </div>
            </section>
            {selectedFaculty && (
                <FacultyModal member={selectedFaculty} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default Faculty;