import React, { useState } from 'react';
import { generateQuestionPaper } from '../../../../services/geminiService';
import { Question } from '../../../../types';
import { SparklesIcon } from '../../../../components/icons';

type QuestionType = 'Multiple Choice' | 'Short Answer' | 'True/False';

const AIPaperGenerator: React.FC = () => {
    const [topic, setTopic] = useState('Physics - Laws of Motion');
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('Medium');
    const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(['Multiple Choice', 'Short Answer']);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedPaper, setGeneratedPaper] = useState<Question[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTypeChange = (type: QuestionType) => {
        setQuestionTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic || questionTypes.length === 0) {
            setError('Please provide a topic and select at least one question type.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedPaper(null);
        try {
            const result = await generateQuestionPaper(topic, numQuestions, difficulty, questionTypes);
            setGeneratedPaper(result.questions);
        } catch (err) {
            setError('Failed to generate question paper. Please try again.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCopyToClipboard = () => {
        if (generatedPaper) {
            const paperText = generatedPaper.map((q, index) => {
                let text = `${index + 1}. ${q.question}\n`;
                if (q.type === 'Multiple Choice' && q.options) {
                    q.options.forEach(opt => text += `   - ${opt}\n`);
                }
                text += `Answer: ${q.answer}\n\n`;
                return text;
            }).join('');
            navigator.clipboard.writeText(paperText);
            alert('Copied to clipboard!');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-atlas-orange">AI Question Paper Generator</h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="md:col-span-4 space-y-4 bg-atlas-black p-4 sm:p-6 rounded-lg">
                    <div>
                        <label className="text-sm font-bold text-gray-300 block mb-2">Topic</label>
                        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-2 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange" required/>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-300 block mb-2">Number of Questions</label>
                        <select value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value))} className="w-full p-2 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-300 block mb-2">Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-300 block mb-2">Question Types</label>
                        <div className="space-y-2">
                            {(['Multiple Choice', 'Short Answer', 'True/False'] as QuestionType[]).map(type => (
                                <label key={type} className="flex items-center space-x-2 text-gray-300">
                                    <input type="checkbox" checked={questionTypes.includes(type)} onChange={() => handleTypeChange(type)} className="form-checkbox bg-atlas-gray border-gray-600 text-atlas-orange focus:ring-atlas-orange" />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-atlas-orange text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        <SparklesIcon className="h-5 w-5" />
                        <span>{isLoading ? 'Generating...' : 'Generate Paper'}</span>
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>

                {/* Result Section */}
                <div className="md:col-span-8 bg-atlas-black p-4 sm:p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-white">Generated Paper</h3>
                    {isLoading && <p className="text-center text-gray-400">Generating with Gemini... Please wait.</p>}
                    
                    {!isLoading && !generatedPaper && (
                        <div className="text-center text-gray-500 py-10">
                            <p>Your generated question paper will appear here.</p>
                        </div>
                    )}
                    
                    {generatedPaper && (
                        <div>
                            <div className="flex flex-col items-end mb-4 print:hidden">
                                <div className="flex space-x-2">
                                    <button onClick={handleCopyToClipboard} className="bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition">Copy Text</button>
                                    <button onClick={handlePrint} className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition">Save as PDF</button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">To save, open the print dialog and select "Save as PDF".</p>
                            </div>

                            <div id="printable-paper" className="bg-atlas-gray p-4 md:p-6 rounded-lg">
                                <div className="hidden print:block text-center mb-8">
                                    <h2 className="text-2xl font-bold text-black">Question Paper: {topic}</h2>
                                    <p className="text-md text-gray-700">Difficulty: {difficulty} | Total Questions: {numQuestions}</p>
                                </div>
                                <div className="space-y-6">
                                    {generatedPaper.map((q, index) => (
                                        <div key={index} className="border-b border-gray-700 pb-4 print:border-gray-300 print:break-inside-avoid">
                                            <p className="font-semibold text-gray-200 mb-2 print:text-black">{index + 1}. {q.question}</p>
                                            {q.type === 'Multiple Choice' && q.options && (
                                                <ul className="space-y-1 list-inside list-alpha pl-4 text-gray-400 print:text-gray-800">
                                                    {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
                                                </ul>
                                            )}
                                            <p className="mt-2 text-sm printable-answer">
                                                <span className="font-bold text-atlas-orange">Answer:</span>
                                                <span className="text-green-400 ml-2">{q.answer}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @media print {
                    body {
                        background-color: #fff !important;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #printable-paper, #printable-paper * {
                        visibility: visible;
                    }
                    #printable-paper {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 1.5rem;
                        color: #000 !important;
                        background-color: #fff !important;
                        border-radius: 0;
                    }
                    .printable-answer {
                        display: none !important;
                    }
                }
                .list-alpha { list-style-type: lower-alpha; }
            `}</style>
        </div>
    );
};

export default AIPaperGenerator;