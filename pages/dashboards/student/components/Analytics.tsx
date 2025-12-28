
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { SparklesIcon, InformationCircleIcon, ChartBarIcon } from '../../../../components/icons';

const Analytics: React.FC = () => {
    const { results, tests } = useData();
    const { user } = useAuth()!;

    const studentResults = results.filter(r => r.studentId === user?.id);

    if (studentResults.length === 0) {
        return (
            <div className="p-20 text-center flex flex-col items-center">
                 <div className="bg-atlas-dark p-8 rounded-full mb-6 border border-gray-800">
                    <InformationCircleIcon className="h-12 w-12 text-gray-700" />
                 </div>
                 <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No analytics data available yet</p>
                 <p className="text-gray-600 text-sm mt-3">Complete your first test to unlock detailed insights.</p>
            </div>
        );
    }

    // 1. Line Chart Data (Performance Over Time)
    const trendData = studentResults.map(res => {
        const test = tests.find(t => t.id === res.testId);
        return {
            name: test?.date || 'Unknown',
            score: Math.round((res.score / res.maxScore) * 100),
            testTitle: test?.title || 'Test'
        };
    }).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    // 2. Radar Data (Subject Proficiency)
    const subjectsMap: Record<string, { total: number; max: number }> = {};
    studentResults.forEach(res => {
        if (res.subjectBreakdown) {
            Object.entries(res.subjectBreakdown).forEach(([sub, data]) => {
                if (!subjectsMap[sub]) subjectsMap[sub] = { total: 0, max: 0 };
                subjectsMap[sub].total += data.score;
                subjectsMap[sub].max += data.maxScore;
            });
        }
    });

    const radarData = Object.entries(subjectsMap).map(([subject, data]) => ({
        subject,
        proficiency: Math.round((data.total / data.max) * 100),
        fullMark: 100
    }));

    // 3. Pie Data (Total Attempt Accuracy)
    const totals = studentResults.reduce((acc, curr) => ({
        correct: acc.correct + curr.correctCount,
        wrong: acc.wrong + curr.wrongCount,
        unattempted: acc.unattempted + curr.unattemptedCount
    }), { correct: 0, wrong: 0, unattempted: 0 });

    const pieData = [
        { name: 'Correct', value: totals.correct, color: '#10B981' },
        { name: 'Wrong', value: totals.wrong, color: '#EF4444' },
        { name: 'Unattempted', value: totals.unattempted, color: '#4B5563' }
    ];

    // 4. Insight Generation
    const weakSubjects = [...radarData]
        .sort((a, b) => a.proficiency - b.proficiency)
        .slice(0, 2);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-3xl font-black text-white">Learning Analytics</h2>
                    <p className="text-atlas-text-muted text-sm uppercase tracking-widest font-bold mt-1">Deep Dive Into Your Performance</p>
                 </div>
            </div>

            {/* Performance Trend Line Chart */}
            <div className="bg-atlas-dark/50 p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                    <ChartBarIcon className="h-5 w-5 text-atlas-primary" /> Progress Over Time (%)
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }}
                                labelStyle={{ color: '#10B981', fontWeight: 'bold', marginBottom: '4px' }}
                            />
                            <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#0B0F19' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subject Proficiency Radar */}
                <div className="bg-atlas-dark/50 p-8 rounded-3xl border border-gray-800 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                        <SparklesIcon className="h-5 w-5 text-atlas-primary" /> Subject Proficiency (%)
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4B5563' }} />
                                <Radar
                                    name="Proficiency"
                                    dataKey="proficiency"
                                    stroke="#10B981"
                                    fill="#10B981"
                                    fillOpacity={0.4}
                                />
                                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attempt Distribution Pie */}
                <div className="bg-atlas-dark/50 p-8 rounded-3xl border border-gray-800 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-8">Aggregate Attempt Accuracy</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* AI Improvement Insights */}
            <div className="bg-atlas-primary/5 border border-atlas-primary/20 p-8 rounded-3xl">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-atlas-primary/10 rounded-2xl">
                        <InformationCircleIcon className="h-6 w-6 text-atlas-primary" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-black text-white mb-4">Focused Recommendations</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            {weakSubjects.length > 0 ? weakSubjects.map((sub, idx) => (
                                <div key={idx} className="bg-atlas-dark/40 p-5 rounded-2xl border border-gray-800">
                                    <p className="text-atlas-primary text-xs font-black uppercase tracking-widest mb-2">Subject Focus: {sub.subject}</p>
                                    <p className="text-white font-bold text-lg mb-2">Targeted Enhancement</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Your proficiency in {sub.subject} ({sub.proficiency}%) is lower than your campus average. Review the concept videos for this subject's foundational units.
                                    </p>
                                </div>
                            )) : (
                                <p className="text-gray-500 italic">Continue appearing for tests to see subject-specific tips.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
