
import React, { useState } from 'react';
import { STUDENT_RESULTS, STUDENT_TESTS } from '../../../../constants';
import { getStudyTips } from '../../../../services/geminiService';

const Results: React.FC = () => {
    const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
    const [tips, setTips] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetTips = async (testId: string) => {
        const result = STUDENT_RESULTS.find(r => r.testId === testId);
        const test = STUDENT_TESTS.find(t => t.id === testId);
        if (result && test) {
            setSelectedTestId(testId);
            setIsLoading(true);
            setTips('');
            const generatedTips = await getStudyTips(test.title, result.score);
            setTips(generatedTips);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-atlas-orange">My Results</h2>
                <button className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">
                    Download All (PDF)
                </button>
            </div>
            <div className="space-y-4">
                {STUDENT_RESULTS.map(result => {
                    const test = STUDENT_TESTS.find(t => t.id === result.testId);
                    return (
                        <div key={result.testId} className="bg-atlas-black p-4 rounded-lg">
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
                                        className="bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-blue-500 transition"
                                    >
                                        Get Study Tips
                                    </button>
                                </div>
                            </div>
                            {selectedTestId === result.testId && (
                                <div className="mt-4 p-4 bg-atlas-gray border-l-4 border-atlas-orange rounded-r-lg">
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
                })}
            </div>
        </div>
    );
};

export default Results;
