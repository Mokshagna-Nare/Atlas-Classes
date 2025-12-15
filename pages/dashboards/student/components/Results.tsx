
import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { getStudyTips } from '../../../../services/geminiService';
import { ChevronDownIcon, ChevronUpIcon, StarIcon, SparklesIcon, XIcon, CheckCircleIcon } from '../../../../components/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Green/Emerald Palette for Charts
const COLORS = ['#10B981', '#34D399', '#059669', '#6EE7B7'];

const Results: React.FC = () => {
    const [expandedTestId, setExpandedTestId] = useState<string | null>(null);
    const [selectedTestForTips, setSelectedTestForTips] = useState<string | null>(null);
    const [tips, setTips] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [viewingDetailsId, setViewingDetailsId] = useState<string | null>(null);
    
    const { tests, results } = useData();
    const { user } = useAuth()!;

    // Filter results for the current student
    const studentResults = results.filter(r => r.studentId === user?.id);

    const toggleExpand = (testId: string) => {
        if (expandedTestId === testId) {
            setExpandedTestId(null);
        } else {
            setExpandedTestId(testId);
        }
    };

    const handleGetTips = async (testId: string, weakSubject: string) => {
        setSelectedTestForTips(testId);
        setIsLoading(true);
        setTips('');
        const generatedTips = await getStudyTips(weakSubject, 50); // Passing a lower score context to trigger improvement tips
        setTips(generatedTips);
        setIsLoading(false);
    };

    const handlePrint = () => {
        window.print();
    }

    // --- Modal for Detailed Review ---
    const DetailedReviewModal = () => {
        if (!viewingDetailsId) return null;
        
        const result = studentResults.find(r => r.testId === viewingDetailsId);
        const test = tests.find(t => t.id === viewingDetailsId);
        if (!result || !test || !test.questions) return null;

        const answers = result.studentAnswers || {};

        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in-up" style={{animationDuration: '0.2s'}}>
                <div className="bg-atlas-gray w-full max-w-4xl h-[90vh] rounded-2xl flex flex-col border border-gray-700 shadow-2xl relative">
                    <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-atlas-black/50 rounded-t-2xl">
                         <div>
                             <h3 className="text-xl font-bold text-white">Test Review: {test.title}</h3>
                             <p className="text-sm text-gray-400">Score: {result.score}/{result.maxScore} • {test.questions.length} Questions</p>
                         </div>
                         <button onClick={() => setViewingDetailsId(null)} className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition">
                             <XIcon className="h-6 w-6" />
                         </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {test.questions.map((q, idx) => {
                            const userAnswer = answers[idx.toString()];
                            const isCorrect = userAnswer === q.answer;
                            const isSkipped = !userAnswer;

                            return (
                                <div key={idx} className={`p-6 rounded-xl border ${isCorrect ? 'bg-emerald-900/10 border-emerald-900/50' : isSkipped ? 'bg-gray-800/30 border-gray-700' : 'bg-red-900/10 border-red-900/50'}`}>
                                    <div className="flex items-start gap-3 mb-4">
                                        <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${isCorrect ? 'bg-emerald-500 text-white' : isSkipped ? 'bg-gray-600 text-white' : 'bg-red-500 text-white'}`}>
                                            {idx + 1}
                                        </span>
                                        <p className="text-lg font-medium text-gray-200">{q.question}</p>
                                    </div>
                                    
                                    {q.diagramSvg && (
                                         <div className="ml-11 mb-4 p-4 bg-white rounded-lg flex items-center justify-center border border-gray-600 max-w-sm">
                                             <div 
                                                className="w-full"
                                                dangerouslySetInnerHTML={{ __html: q.diagramSvg }} 
                                             />
                                         </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-4 text-sm ml-11">
                                        <div className="p-3 bg-atlas-black rounded-lg border border-gray-700">
                                            <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Your Answer</span>
                                            <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {userAnswer || '(Skipped)'}
                                            </span>
                                        </div>
                                        <div className="p-3 bg-atlas-black rounded-lg border border-gray-700">
                                            <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Correct Answer</span>
                                            <span className="font-bold text-emerald-400">{q.answer}</span>
                                        </div>
                                    </div>
                                    
                                    {q.diagramDescription && !q.diagramSvg && (
                                        <div className="ml-11 mt-4 p-3 bg-black/20 rounded border border-gray-800 text-xs text-gray-500 italic">
                                            Diagram: {q.diagramDescription}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="p-6 border-t border-gray-700 bg-atlas-black/50 rounded-b-2xl text-right">
                        <button onClick={() => setViewingDetailsId(null)} className="px-6 py-2 bg-atlas-primary text-white font-bold rounded-lg hover:bg-emerald-600 transition">
                            Close Review
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div>
            {/* Modal */}
            <DetailedReviewModal />
            
            <div className="flex justify-between items-center mb-6 print:hidden">
                <h2 className="text-2xl font-bold text-atlas-primary">My Results & Analysis</h2>
                <button onClick={handlePrint} className="bg-atlas-primary text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition">
                    Download Report (PDF)
                </button>
            </div>
            <div id="printable-student-results" className="space-y-6">
                {studentResults.length > 0 ? studentResults.map(result => {
                    const test = tests.find(t => t.id === result.testId);
                    const isExpanded = expandedTestId === result.testId;
                    const canReview = test?.questions && test.questions.length > 0 && result.studentAnswers;
                    
                    // Process Subject Data for Chart
                    const subjectData = result.subjectBreakdown 
                        ? Object.keys(result.subjectBreakdown).map(subject => ({
                            name: subject,
                            value: result.subjectBreakdown![subject].score,
                            max: result.subjectBreakdown![subject].maxScore
                        })) 
                        : [];

                    // Find Weak Areas (Less than 80%)
                    const weakSubjects = subjectData.filter(s => (s.value / s.max) < 0.80);

                    return (
                        <div key={`${result.testId}-${result.studentId}`} className="bg-atlas-black border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-atlas-primary/30">
                            {/* Header Summary Row */}
                            <div 
                                className="p-4 flex flex-col md:flex-row justify-between items-center cursor-pointer bg-atlas-gray/50 hover:bg-atlas-gray transition-colors"
                                onClick={() => toggleExpand(result.testId)}
                            >
                                <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                                    <h3 className="text-xl font-bold text-white">{test?.title}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mt-1">
                                        <span>Date: {test?.date}</span>
                                        <span>•</span>
                                        <span>Pattern: {test?.subject}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Rank</p>
                                        <div className="flex items-center justify-center gap-1">
                                            {result.rank <= 3 && <StarIcon className="h-4 w-4 text-yellow-500" />}
                                            <span className="font-bold text-lg">{result.rank}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Grade</p>
                                        <span className={`font-bold text-lg ${
                                            result.grade.includes('A') ? 'text-emerald-400' : 'text-yellow-400'
                                        }`}>{result.grade}</span>
                                    </div>
                                    <div className="text-center min-w-[80px]">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Score</p>
                                        <span className="font-bold text-xl text-atlas-primary">{result.score}</span>
                                        <span className="text-gray-500 text-sm">/{result.maxScore}</span>
                                    </div>
                                    <div className="text-gray-400 print:hidden">
                                        {isExpanded ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Analysis View */}
                            {isExpanded && (
                                <div className="p-6 bg-black/40 border-t border-gray-800 animate-fade-in-up">
                                    {canReview && (
                                        <div className="mb-6 flex justify-end">
                                             <button 
                                                onClick={(e) => { e.stopPropagation(); setViewingDetailsId(result.testId); }}
                                                className="flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition shadow-lg"
                                             >
                                                 <CheckCircleIcon className="h-5 w-5" />
                                                 Review Answers
                                             </button>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-8">
                                        
                                        {/* Left Column: Chart */}
                                        <div className="h-64 w-full bg-atlas-gray/20 rounded-lg p-4 flex flex-col items-center justify-center relative">
                                            <h4 className="absolute top-4 left-4 text-sm font-semibold text-gray-400">Score Distribution</h4>
                                            {subjectData.length > 0 ? (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={subjectData}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={60}
                                                            outerRadius={80}
                                                            fill="#8884d8"
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {subjectData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
                                                            itemStyle={{ color: '#fff' }}
                                                        />
                                                        <Legend verticalAlign="bottom" height={36}/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <p className="text-gray-500">Detailed subject data not available.</p>
                                            )}
                                        </div>

                                        {/* Right Column: Subject Breakdown & Insights */}
                                        <div className="space-y-6">
                                            
                                            {/* Subject Scores List */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Subject Wise Analysis</h4>
                                                <div className="space-y-3">
                                                    {subjectData.map((subj, idx) => {
                                                        const percentage = (subj.value / subj.max) * 100;
                                                        const isWeak = percentage < 80;
                                                        return (
                                                            <div key={idx} className="bg-atlas-gray p-3 rounded-md">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                                                        <span className="font-medium">{subj.name}</span>
                                                                    </div>
                                                                    <span className={`text-sm font-bold ${isWeak ? 'text-red-400' : 'text-emerald-400'}`}>
                                                                        {subj.value}/{subj.max}
                                                                    </span>
                                                                </div>
                                                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                                    <div 
                                                                        className={`h-full rounded-full ${isWeak ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                                                        style={{ width: `${percentage}%` }}
                                                                    ></div>
                                                                </div>
                                                                {isWeak && (
                                                                     <p className="text-xs text-red-400 mt-1 text-right font-semibold">Needs Improvement</p>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* AI & Insights Section */}
                                            {weakSubjects.length > 0 ? (
                                                <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-red-500/20 p-2 rounded-full mt-1">
                                                            <SparklesIcon className="h-4 w-4 text-red-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-red-400 font-bold text-sm mb-1">Areas for Improvement</h4>
                                                            <p className="text-gray-400 text-sm mb-3">
                                                                You scored below 80% in <span className="text-white font-semibold">{weakSubjects.map(s => s.name).join(', ')}</span>. 
                                                                Focus on these areas to improve your overall rank.
                                                            </p>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleGetTips(result.testId, weakSubjects[0].name);
                                                                }}
                                                                className="text-xs bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 px-3 py-1.5 rounded transition-colors"
                                                            >
                                                                Get Improvement Plan for {weakSubjects[0].name}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                 <div className="bg-green-900/10 border border-green-900/30 p-4 rounded-lg flex items-center gap-3">
                                                    <StarIcon className="h-5 w-5 text-emerald-400" />
                                                    <div>
                                                        <h4 className="text-emerald-400 font-bold text-sm">Excellent Performance!</h4>
                                                        <p className="text-gray-400 text-sm">You are maintaining a strong hold (&gt;80%) on all subjects. Keep it up!</p>
                                                    </div>
                                                 </div>
                                            )}
                                            
                                            {/* AI Output Area */}
                                            {selectedTestForTips === result.testId && (
                                                <div className="mt-4 p-4 bg-atlas-gray rounded-lg border-l-2 border-atlas-primary animate-fade-in-up">
                                                    <h5 className="text-atlas-primary font-bold text-sm mb-2 flex items-center gap-2">
                                                        <SparklesIcon className="h-4 w-4" />
                                                        Atlas AI Analysis
                                                    </h5>
                                                    {isLoading ? (
                                                        <p className="text-sm text-gray-400 italic">Analyzing your performance patterns...</p>
                                                    ) : (
                                                        <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                                                            {tips}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    </div>
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
