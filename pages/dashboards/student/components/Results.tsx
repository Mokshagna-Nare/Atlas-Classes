
import React, { useState, useEffect } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { XIcon, InformationCircleIcon, ChartBarIcon, SparklesIcon } from '../../../../components/icons';

interface ResultsProps {
    initialSelectedTestId?: string | null;
    onClearSelection?: () => void;
}

const Results: React.FC<ResultsProps> = ({ initialSelectedTestId, onClearSelection }) => {
    const { tests, results } = useData();
    const { user } = useAuth()!;
    const [reviewingTestId, setReviewingTestId] = useState<string | null>(null);

    useEffect(() => {
        if (initialSelectedTestId) {
            setReviewingTestId(initialSelectedTestId);
        }
    }, [initialSelectedTestId]);

    const studentResults = results.filter(r => r.studentId === user?.id);

    const handleCloseModal = () => {
        setReviewingTestId(null);
        if (onClearSelection) onClearSelection();
    };

    const ReviewModal = ({ testId }: { testId: string }) => {
        const test = tests.find(t => t.id === testId);
        const result = studentResults.find(r => r.testId === testId);
        if (!test || !result) return null;

        return (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:p-8 animate-scale-in">
                <div className="bg-atlas-soft border border-gray-800 w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-atlas-dark/50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-atlas-primary/10 rounded-2xl border border-atlas-primary/20">
                                <ChartBarIcon className="h-6 w-6 text-atlas-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white">{test.title}</h3>
                                <p className="text-atlas-text-muted text-[10px] uppercase tracking-[0.2em] font-black mt-1">Detailed Analysis • Score: {result.score}/{result.maxScore}</p>
                            </div>
                        </div>
                        <button onClick={handleCloseModal} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-colors text-white">
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
                        
                        {/* Subject Breakdown Analysis Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <SparklesIcon className="h-5 w-5 text-atlas-primary" />
                                <h4 className="text-lg font-bold text-white">Subject-wise Proficiency</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Object.entries(result.subjectBreakdown || {}).map(([subject, data]) => {
                                    const percentage = Math.round((data.score / data.maxScore) * 100);
                                    return (
                                        <div key={subject} className="bg-atlas-dark p-6 rounded-2xl border border-gray-800 hover:border-atlas-primary/30 transition-all">
                                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">{subject}</p>
                                            <div className="flex justify-between items-end mb-2">
                                                <p className="text-2xl font-black text-white">{percentage}%</p>
                                                <p className="text-xs text-gray-500 font-bold">{data.score}/{data.maxScore}</p>
                                            </div>
                                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-atlas-primary' : 'bg-red-500'}`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <hr className="border-gray-800" />

                        {/* Question Breakdown */}
                        <section className="space-y-6">
                            <h4 className="text-lg font-bold text-white flex items-center gap-3">
                                <InformationCircleIcon className="h-5 w-5 text-gray-500" /> 
                                Answer Key Review
                            </h4>
                            <div className="space-y-4">
                                {test.questions?.map((q, idx) => {
                                    const userAnswer = result.studentAnswers?.[idx.toString()];
                                    const isCorrect = userAnswer === q.answer;
                                    const isUnanswered = !userAnswer;

                                    return (
                                        <div key={idx} className={`p-6 rounded-2xl border transition-all ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : isUnanswered ? 'bg-gray-800/20 border-gray-800' : 'bg-red-500/5 border-red-500/20'}`}>
                                            <div className="flex gap-4">
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg ${isCorrect ? 'bg-emerald-500 text-white' : isUnanswered ? 'bg-gray-700 text-gray-400' : 'bg-red-500 text-white'}`}>
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-lg font-bold text-white mb-4">{q.question}</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-gray-800/50 border-gray-700'}`}>
                                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Your Response</p>
                                                            <p className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>{userAnswer || 'Not Attempted'}</p>
                                                        </div>
                                                        {!isCorrect && (
                                                            <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/20">
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Correct Answer</p>
                                                                <p className="font-bold text-emerald-400">{q.answer}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-white">Test History</h2>
                    <p className="text-atlas-text-muted text-xs font-bold uppercase tracking-widest mt-1">Review your completed exams</p>
                </div>
            </div>

            {studentResults.length === 0 ? (
                <div className="bg-atlas-soft border border-gray-800 p-12 rounded-3xl text-center">
                    <p className="text-gray-500 font-bold uppercase tracking-widest">No completed tests found in records</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {studentResults.map(result => {
                        const test = tests.find(t => t.id === result.testId);
                        return (
                            <div key={result.testId} className="group bg-atlas-soft/40 border border-gray-800 rounded-3xl overflow-hidden transition-all hover:border-atlas-primary/30 shadow-xl">
                                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white">{test?.title || 'Examination Result'}</h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{test?.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-800"></span>
                                            <span className="text-[10px] font-black text-atlas-primary uppercase tracking-widest">{test?.subject}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-center px-6 border-x border-gray-800">
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Total Score</p>
                                            <p className="text-2xl font-black text-atlas-primary">{result.score}/{result.maxScore}</p>
                                        </div>
                                        <div className="text-center min-w-[60px]">
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Grade</p>
                                            <p className={`text-2xl font-black ${result.grade === 'A+' ? 'text-emerald-400' : 'text-white'}`}>{result.grade}</p>
                                        </div>
                                        <button 
                                            onClick={() => setReviewingTestId(result.testId)}
                                            className="px-6 py-4 bg-atlas-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-all shadow-glow active:scale-95"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {reviewingTestId && <ReviewModal testId={reviewingTestId} />}
        </div>
    );
};

export default Results;
