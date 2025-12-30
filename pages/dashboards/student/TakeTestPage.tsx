
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useData } from '../../../contexts/DataContext';
import { Question, TestResult } from '../../../types';

const TakeTestPage: React.FC = () => {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth()!;
    const { tests, updateTestStatus, addTestResult } = useData();
    
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState<number>(3600); 
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const activeTest = tests.find(t => t.id === testId);
        if (activeTest && activeTest.questions) {
            setQuestions(activeTest.questions);
            setTimeLeft((activeTest.duration || 60) * 60);
            setIsLoading(false);
        } else {
            setTimeout(() => {
                alert("Test details or questions not found.");
                navigate('/dashboard/student');
            }, 500);
        }
    }, [testId, tests, navigate]);

    useEffect(() => {
        if (isLoading || isSubmitting) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isLoading, isSubmitting]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (option: string) => {
        const qId = currentIndex.toString();
        setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleFinish = async () => {
        setIsSubmitting(true);
        
        let totalScore = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let unattemptedCount = 0;
        const subjectBreakdown: Record<string, { score: number; maxScore: number }> = {};

        questions.forEach((q, idx) => {
            const qId = idx.toString();
            const userAnswer = selectedAnswers[qId];
            const sub = q.subject || 'General';
            
            if (!subjectBreakdown[sub]) {
                subjectBreakdown[sub] = { score: 0, maxScore: 0 };
            }
            subjectBreakdown[sub].maxScore += 4; // Assuming 4 marks per question

            if (!userAnswer) {
                unattemptedCount++;
            } else if (userAnswer === q.answer) {
                totalScore += 4;
                correctCount++;
                subjectBreakdown[sub].score += 4;
            } else {
                totalScore -= 1; // Negative marking
                wrongCount++;
                subjectBreakdown[sub].score -= 1;
            }
        });

        const maxPossible = questions.length * 4;
        const percentage = (totalScore / maxPossible) * 100;
        const grade = percentage >= 90 ? 'A+' : percentage >= 75 ? 'A' : percentage >= 60 ? 'B' : percentage >= 45 ? 'C' : 'D';

        // Fix: Added missing required 'totalStudents' property to satisfy TestResult interface
        const result: TestResult = {
            testId: testId!,
            studentId: user!.id,
            score: totalScore,
            maxScore: maxPossible,
            rank: 1, // Mock rank
            totalStudents: 10, // Default mock value
            grade,
            correctCount,
            wrongCount,
            unattemptedCount,
            subjectBreakdown,
            studentAnswers: selectedAnswers
        };

        setTimeout(() => {
            addTestResult(result);
            updateTestStatus(testId!, 'Completed');
            alert(`Test Submitted Successfully!\nScore: ${totalScore}/${maxPossible} (${percentage.toFixed(1)}%)\nGrade: ${grade}`);
            navigate('/dashboard/student');
        }, 1500);
    };

    if (isLoading) return (
        <div className="min-h-screen bg-atlas-dark flex flex-col items-center justify-center text-white p-6">
            <div className="w-16 h-16 border-4 border-atlas-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-bold animate-pulse">Initializing Secure Test Environment...</p>
        </div>
    );

    const currentQuestion = questions[currentIndex];
    const isAnswered = !!selectedAnswers[currentIndex.toString()];

    return (
        <div className="min-h-screen bg-atlas-dark text-white flex flex-col md:flex-row">
            <aside className="w-full md:w-80 bg-atlas-soft border-r border-gray-800 p-6 flex flex-col">
                <div className="mb-8">
                    <h2 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Test Progress</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-black text-atlas-primary">{formatTime(timeLeft)}</span>
                        <span className="text-xs font-bold text-gray-500">Remaining</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-atlas-primary transition-all duration-500" 
                            style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <h3 className="font-bold text-sm mb-4 text-white">Question Navigator</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, i) => {
                            const answered = !!selectedAnswers[i.toString()];
                            const isCurrent = currentIndex === i;
                            return (
                                <button 
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`aspect-square rounded-lg font-bold text-xs transition-all ${
                                        isCurrent ? 'bg-atlas-primary text-white scale-110 shadow-lg' : 
                                        answered ? 'bg-emerald-900/30 text-atlas-primary border border-atlas-primary/30' : 
                                        'bg-gray-800 text-gray-500 border border-transparent'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                    <button 
                        onClick={handleFinish}
                        disabled={isSubmitting}
                        className="w-full bg-atlas-primary py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-glow hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Finalizing...' : 'Submit Final Test'}
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-atlas-black/20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10 flex justify-between items-end border-b border-gray-800 pb-6">
                        <div>
                            <span className="text-atlas-primary font-black text-xs uppercase tracking-[0.2em]">Question {currentIndex + 1} of {questions.length}</span>
                            <h1 className="text-gray-400 text-sm mt-1">Subject: {currentQuestion.subject || 'General'}</h1>
                        </div>
                    </div>

                    <div className="animate-fade-in-up">
                        <div className="mb-10">
                            <h3 className="text-2xl md:text-3xl font-bold leading-relaxed text-white">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion.options?.map((opt, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleOptionSelect(opt)}
                                    className={`group flex items-center p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                        selectedAnswers[currentIndex.toString()] === opt 
                                        ? 'border-atlas-primary bg-atlas-primary/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                                        : 'border-gray-800 bg-atlas-soft/50 hover:border-gray-700 hover:bg-atlas-soft'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black mr-6 transition-colors ${
                                        selectedAnswers[currentIndex.toString()] === opt ? 'bg-atlas-primary text-white' : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700'
                                    }`}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    <span className={`text-lg font-medium ${selectedAnswers[currentIndex.toString()] === opt ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                        {opt}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 flex justify-between gap-4">
                        <button 
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="px-8 py-3 rounded-xl border border-gray-800 font-bold text-gray-400 hover:text-white hover:border-gray-600 transition-all disabled:opacity-30"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                            disabled={currentIndex === questions.length - 1}
                            className="px-8 py-3 rounded-xl bg-atlas-soft border border-gray-800 font-bold text-white hover:border-atlas-primary transition-all disabled:opacity-30"
                        >
                            Next Question
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TakeTestPage;
