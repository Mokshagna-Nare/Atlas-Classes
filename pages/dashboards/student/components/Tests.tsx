
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { Test } from '../../../../types';

type TestStatus = 'Upcoming' | 'Completed' | 'Assigned';

interface TestCardProps {
    test: Test;
    onViewResult: (testId: string) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, onViewResult }) => {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate(`/dashboard/student/test/${test.id}`);
    };

    return (
        <div className="bg-atlas-dark border border-gray-800 p-6 rounded-3xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 hover:border-atlas-primary/30 transition-all shadow-xl">
            <div className="flex-1">
                <p className="text-xl font-bold text-white">{test.title}</p>
                <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{test.date}</p>
                    <span className="w-1 h-1 rounded-full bg-gray-800"></span>
                    <p className="text-xs text-atlas-primary font-bold uppercase tracking-widest">{test.subject}</p>
                </div>
            </div>
            <div className="flex gap-3">
                {test.status === 'Upcoming' && (
                    <button 
                        onClick={handleStartTest} 
                        className="bg-atlas-primary text-white font-black py-3 px-8 rounded-xl hover:bg-emerald-500 transition-all shadow-glow active:scale-95 text-xs uppercase tracking-widest"
                    >
                        Start Test
                    </button>
                )}
                {test.status === 'Completed' && (
                    <button 
                        onClick={() => onViewResult(test.id)} 
                        className="border-2 border-atlas-primary text-atlas-primary font-black py-3 px-8 rounded-xl hover:bg-atlas-primary hover:text-white transition-all active:scale-95 text-xs uppercase tracking-widest"
                    >
                        View Detailed Result
                    </button>
                )}
                {test.status === 'Assigned' && (
                    <div className="px-6 py-3 bg-gray-800/50 rounded-xl border border-gray-700 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        Awaiting Activation
                    </div>
                )}
            </div>
        </div>
    );
};

const Tests: React.FC<{ onViewResult: (id: string) => void }> = ({ onViewResult }) => {
    const [activeTab, setActiveTab] = useState<TestStatus>('Upcoming');
    const { tests } = useData();
    const { user } = useAuth()!;

    // Filter tests for the specific institute
    const instituteTests = tests.filter(test => test.instituteId === user?.instituteId);
    const filteredTests = instituteTests.filter(test => test.status === activeTab);

    const TabButton: React.FC<{ status: TestStatus }> = ({ status }) => (
        <button
            onClick={() => setActiveTab(status)}
            className={`px-8 py-3 font-black text-xs uppercase tracking-widest transition-all border-b-2 ${
                activeTab === status 
                ? 'border-atlas-primary text-atlas-primary bg-atlas-primary/5' 
                : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
            }`}
        >
            {status}
        </button>
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h2 className="text-3xl font-black text-white">Academic Calendar</h2>
                <p className="text-atlas-text-muted text-xs font-bold uppercase tracking-widest mt-1">Manage and access your examinations</p>
            </div>
            
            <div className="flex border-b border-gray-800">
                <TabButton status="Upcoming" />
                <TabButton status="Assigned" />
                <TabButton status="Completed" />
            </div>

            <div className="space-y-4">
                {filteredTests.length > 0 ? (
                    filteredTests.map(test => <TestCard key={test.id} test={test} onViewResult={onViewResult} />)
                ) : (
                    <div className="py-20 text-center bg-atlas-soft/40 border border-gray-800 rounded-3xl">
                        <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">No {activeTab.toLowerCase()} tests in your queue.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tests;
