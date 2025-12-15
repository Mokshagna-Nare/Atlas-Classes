
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { TestResult } from '../../../types';
import { DocumentTextIcon } from '../../../components/icons';

const TakeTestPage: React.FC = () => {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const { tests, addTestResult, updateTestStatus } = useData();
    const { user } = useAuth()!;
    
    // State for interactive test
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const test = tests.find(t => t.id === testId);

    if (!test) {
        return (
            <div className="min-h-screen bg-atlas-black flex items-center justify-center text-center p-8">
                <div>
                    <h2 className="text-2xl font-bold text-red-500">Test not found!</h2>
                    <Link to="/dashboard/student" className="text-atlas-primary hover:underline mt-4 inline-block">Go back to Dashboard</Link>
                </div>
            </div>
        );
    }

    const questions = test.questions || [];
    const hasQuestions = questions.length > 0;
    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (option: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: option
        }));
    };

    const calculateScore = () => {
        let score = 0;
        const total = questions.length;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.answer) {
                score++;
            }
        });
        // Assuming equal weightage for now, scaled to 100
        return Math.round((score / total) * 100);
    };

    const handleSubmit = () => {
        if (!user) return;
        setIsSubmitting(true);

        // If it's a generated test, calculate real score. If it's a PDF upload without parsed questions, verify via mock.
        const score = hasQuestions ? calculateScore() : Math.floor(Math.random() * 61) + 40; 
        const maxScore = hasQuestions ? 100 : 100;
        
        const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
        
        // Mock Subject Breakdown
        const breakdown = {
            [test.subject]: { score: score, maxScore: maxScore }
        };

        // Convert answers to Record<string, string> for storage
        const answersToStore: Record<string, string> = {};
        Object.keys(selectedAnswers).forEach(key => {
            answersToStore[key] = selectedAnswers[Number(key)];
        });

        const newResult: TestResult = {
            testId: test.id,
            studentId: user.id,
            score: score,
            maxScore: maxScore,
            rank: Math.floor(Math.random() * 5) + 1, 
            grade: grade,
            subjectBreakdown: breakdown,
            studentAnswers: answersToStore
        };

        // Simulating network delay
        setTimeout(() => {
            addTestResult(newResult);
            updateTestStatus(test.id, 'Completed');
            setIsSubmitting(false);
            alert(`Test submitted successfully! You scored ${score}/${maxScore}`);
            navigate('/dashboard/student');
        }, 1500);
    };

    const handleDownload = (fileName: string) => {
        const mockContent = `This is a mock question paper for the test: ${fileName}.\n\nQ1. What is the capital of France?\n...`;
        const blob = new Blob([mockContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.replace('.pdf', '.txt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- RENDER: Fallback for PDF-only tests ---
    if (!hasQuestions) {
        return (
            <div className="min-h-screen bg-atlas-black text-white font-sans flex items-center justify-center p-4">
                 <div className="w-full max-w-2xl bg-atlas-gray p-8 rounded-2xl border border-gray-700 shadow-2xl">
                    <header className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-atlas-primary mb-2">{test.title}</h1>
                        <p className="text-gray-400">Subject: {test.subject} | Date: {test.date}</p>
                    </header>
                    
                    <div className="bg-atlas-black/50 p-6 rounded-xl border border-gray-800 mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-white">Instructions</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            This test is based on a downloadable PDF paper. Please download the file, solve the questions offline, and then click submit to record your attendance.
                        </p>
                        
                        <div className="border-2 border-dashed border-gray-600 p-8 rounded-xl text-center bg-atlas-gray/20 hover:bg-atlas-gray/40 transition-colors">
                            <DocumentTextIcon className="h-12 w-12 text-atlas-primary mx-auto mb-4"/>
                            <p className="text-lg font-medium text-white mb-2">Question Paper</p>
                            <p className="text-atlas-primary font-mono text-sm mb-6 break-all">{test.pdfFileName}</p>
                            <button 
                                onClick={() => handleDownload(test.pdfFileName!)} 
                                className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Download Paper
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => navigate('/dashboard/student')} className="flex-1 bg-transparent border border-gray-600 text-gray-300 font-bold py-3 px-6 rounded-xl hover:bg-white/5 transition">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-atlas-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-900/40">
                            {isSubmitting ? 'Submitting...' : 'Mark as Completed'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDER: Interactive CBT Interface ---
    return (
        <div className="min-h-screen bg-atlas-black text-white font-sans flex flex-col md:flex-row">
            
            {/* Sidebar: Question Palette */}
            <aside className="w-full md:w-80 bg-atlas-gray border-r border-gray-800 flex flex-col h-auto md:h-screen sticky top-0">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-1 truncate" title={test.title}>{test.title}</h2>
                    <p className="text-xs text-atlas-primary font-bold uppercase tracking-wider">{test.subject}</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-4">Question Palette</p>
                    <div className="grid grid-cols-5 gap-3">
                        {questions.map((_, idx) => {
                            const isAnswered = selectedAnswers[idx] !== undefined;
                            const isCurrent = currentQuestionIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuestionIndex(idx)}
                                    className={`
                                        h-10 w-10 rounded-lg text-sm font-bold transition-all duration-200
                                        ${isCurrent ? 'ring-2 ring-white bg-atlas-primary text-white scale-110' : 
                                          isAnswered ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' : 
                                          'bg-atlas-black text-gray-400 border border-gray-700 hover:bg-gray-700'}
                                    `}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-700 bg-atlas-gray">
                    <div className="flex justify-between text-xs text-gray-400 mb-4">
                        <span>Answered: {Object.keys(selectedAnswers).length}</span>
                        <span>Remaining: {questions.length - Object.keys(selectedAnswers).length}</span>
                    </div>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="w-full bg-atlas-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/40 hover:bg-emerald-600 transition-all hover:-translate-y-1"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Test'}
                    </button>
                </div>
            </aside>

            {/* Main: Question Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-gray-800 rounded-full mb-8">
                            <div 
                                className="h-full bg-atlas-primary rounded-full transition-all duration-500" 
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="mb-8">
                            <span className="inline-block bg-atlas-black border border-gray-700 text-gray-300 px-3 py-1 rounded-md text-xs font-bold uppercase mb-4">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-white">
                                {currentQuestion.question}
                            </h3>
                            
                            {/* Diagram Display */}
                            {currentQuestion.diagramSvg ? (
                                <div className="mt-6 p-6 bg-white rounded-lg flex items-center justify-center max-w-lg mx-auto border border-gray-600">
                                     <div 
                                        className="w-full"
                                        dangerouslySetInnerHTML={{ __html: currentQuestion.diagramSvg }} 
                                     />
                                </div>
                            ) : currentQuestion.diagramDescription && (
                                <div className="mt-6 p-6 bg-black/30 border border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center text-center">
                                    <div className="bg-gray-800 p-3 rounded-full mb-2">
                                        <DocumentTextIcon className="h-6 w-6 text-gray-400"/>
                                    </div>
                                    <p className="text-sm text-gray-400 italic max-w-md">{currentQuestion.diagramDescription}</p>
                                    <span className="text-xs text-gray-600 mt-2">(Diagram placeholder)</span>
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            {currentQuestion.options?.map((option, idx) => {
                                const isSelected = selectedAnswers[currentQuestionIndex] === option;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                                            isSelected 
                                            ? 'border-atlas-primary bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                                            : 'border-gray-800 bg-atlas-gray hover:border-gray-600 hover:bg-gray-800'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                                            isSelected ? 'border-atlas-primary bg-atlas-primary text-white' : 'border-gray-600 text-gray-500 group-hover:border-gray-400'
                                        }`}>
                                            <span className="text-sm font-bold">{String.fromCharCode(65 + idx)}</span>
                                        </div>
                                        <span className={`text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="p-6 border-t border-gray-800 bg-atlas-black flex justify-between items-center z-10">
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-3 rounded-lg font-bold text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next Question
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TakeTestPage;
