import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { getStudyTips } from '../../../../services/geminiService';

const Results: React.FC = () => {
    const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
    const [tips, setTips] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { tests, results } = useData();
    const { user } = useAuth()!;

    // Filter results for the current student
    const studentResults = results.filter(r => r.studentId === user?.id);

    const handleGetTips = async (testId: string) => {
        const result = studentResults.find(r => r.testId === testId);
        const test = tests.find(t => t.id === testId);
        if (result && test) {
            setSelectedTestId(testId);
            setIsLoading(true);
            setTips('');
            const generatedTips = await getStudyTips(test.title, result.score);
            setTips(generatedTips);
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6 print:hidden">
                <h2 className="text-2xl font-bold text-atlas-orange">My Results</h2>
                <button onClick={handlePrint} className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">
                    Download All (PDF)
                </button>
            </div>
            <div id="printable-student-results" className="space-y-4">
                {studentResults.length > 0 ? studentResults.map(result => {
                    const test = tests.find(t => t.id === result.testId);
                    return (
                        <div key={`${result.testId}-${result.studentId}`} className="bg-atlas-black p-4 rounded-lg">
                            <div className="flex flex-wrap justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold">{test?.title}</h3>
                                    <p className="text-gray-400">Date: {test?.date}</p>
                                </div>
                                <div className="flex items-center space-x-6 mt-2 md:mt-0">
                                    <p><span className="text-gray-400">Score:</span> {result.score}/{result.maxScore}</p>
                                    <p><span className="text-gray-400">Rank:</span> {result.rank}</p>
                                    <p><span className="text-gray-400">Grade:</span> {result.grade}</p>
                                    <button
                                        onClick={() => handleGetTips(result.testId)}
                                        className="bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-blue-500 transition print:hidden"
                                    >
                                        Get Study Tips
                                    </button>
                                </div>
                            </div>
                            {selectedTestId === result.testId && (
                                <div className="mt-4 p-4 bg-atlas-gray border-l-4 border-atlas-orange rounded-r-lg print:hidden">
                                    {isLoading && <p>Generating tips with Gemini...</p>}
                                    {tips && (
                                        <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                                            {tips}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                }) : <p className="text-gray-500 text-center py-8">No results found yet. Complete a test to see your performance.</p>}
            </div>
             <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-student-results, #printable-student-results * {
                        visibility: visible;
                    }
                    #printable-student-results {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                     main {
                        padding: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Results;