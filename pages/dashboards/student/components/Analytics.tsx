
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { SparklesIcon, InformationCircleIcon, ChartBarIcon, TrophyIcon } from '../../../../components/icons';

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
            rank: res.rank,
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

    // Tooltip Style constant for consistency
    const tooltipStyle = {
        backgroundColor: '#111827',
        borderColor: '#374151',
        borderRadius: '12px',
        padding: '12px',
        color: '#fff',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
    };

    // 4. Insight Generation
    const weakSubjects = [...radarData]
        .sort((a, b) => a.proficiency - b.proficiency)
        .slice(0, 2);

    return (
        <div className="space-y-12 animate-fade-in-up pb-12">
            <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-3xl font-black text-white">Performance Analytics</h2>
                    <p className="text-atlas-text-muted text-xs font-bold uppercase tracking-widest mt-1">Holistic Academic Visualizer</p>
                 </div>
            </div>

            {/* Performance Trend Line Chart */}
            <div className="bg-atlas-dark p-8 rounded-3xl border border-gray-800 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                    <ChartBarIcon className="h-5 w-5 text-atlas-primary" /> Percentile Progress History
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                            <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <Tooltip 
                                contentStyle={tooltipStyle}
                                labelStyle={{ color: '#10B981', fontWeight: '900', marginBottom: '8px', fontSize: '12px' }}
                                itemStyle={{ color: '#fff', fontSize: '14px' }}
                            />
                            <Line type="monotone" name="Percentage Score" dataKey="score" stroke="#10B981" strokeWidth={5} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#0B0F19' }} activeDot={{ r: 8, strokeWidth: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subject Proficiency Radar */}
                <div className="bg-atlas-dark p-8 rounded-3xl border border-gray-800 shadow-2xl">
                    <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                        <SparklesIcon className="h-5 w-5 text-atlas-primary" /> Subject Proficiency Index
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4B5563' }} />
                                <Radar
                                    name="Proficiency"
                                    dataKey="proficiency"
                                    stroke="#10B981"
                                    fill="#10B981"
                                    fillOpacity={0.5}
                                />
                                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attempt Distribution Pie */}
                <div className="bg-atlas-dark p-8 rounded-3xl border border-gray-800 shadow-2xl">
                    <h3 className="text-lg font-bold text-white mb-8">Attempt Accuracy Ratio</h3>
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
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={tooltipStyle} 
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Test-wise Comparative Analysis Table */}
            <div className="bg-atlas-dark border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-atlas-black/50">
                    <div className="flex items-center gap-3">
                        <TrophyIcon className="h-6 w-6 text-atlas-primary" />
                        <h3 className="text-xl font-black text-white">Campus Benchmarking</h3>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-atlas-black/30 border-b border-gray-800">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Exam Title</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Date</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Result</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Campus Rank</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Percentile</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {studentResults.sort((a, b) => new Date(tests.find(t => t.id === b.testId)?.date || '').getTime() - new Date(tests.find(t => t.id === a.testId)?.date || '').getTime()).map(res => {
                            const test = tests.find(t => t.id === res.testId);
                            const perc = Math.round((res.score / res.maxScore) * 100);
                            return (
                                <tr key={res.testId} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6">
                                        <p className="text-sm font-bold text-white">{test?.title}</p>
                                        <p className="text-[10px] text-atlas-primary font-black uppercase mt-1">{test?.subject}</p>
                                    </td>
                                    <td className="p-6 text-xs text-gray-500 font-bold">{test?.date}</td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-white">{res.score}/{res.maxScore}</span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${res.grade === 'A+' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-atlas-primary/10 text-atlas-primary'}`}>{res.grade}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-atlas-primary/10 border border-atlas-primary/20 flex items-center justify-center">
                                                <span className="text-xs font-black text-atlas-primary">#{res.rank}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Global Rank</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <span className="text-sm font-black text-white">{perc}%</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* AI Improvement Insights */}
            <div className="bg-atlas-primary/5 border border-atlas-primary/20 p-10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <SparklesIcon className="h-24 w-24 text-atlas-primary" />
                </div>
                <div className="flex items-start gap-6 relative z-10">
                    <div className="p-4 bg-atlas-primary/10 rounded-2xl shadow-glow">
                        <InformationCircleIcon className="h-8 w-8 text-atlas-primary" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl font-black text-white mb-6">Learning Gap Analysis</h4>
                        <div className="grid md:grid-cols-2 gap-8">
                            {weakSubjects.length > 0 ? weakSubjects.map((sub, idx) => (
                                <div key={idx} className="bg-atlas-dark/60 p-6 rounded-2xl border border-gray-800 shadow-xl hover:border-atlas-primary transition-all">
                                    <p className="text-atlas-primary text-[10px] font-black uppercase tracking-widest mb-2">Priority: {sub.subject}</p>
                                    <p className="text-white font-bold text-lg mb-3">Critical Subject Enhancement</p>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Your proficiency in <span className="text-white font-bold">{sub.subject}</span> ({sub.proficiency}%) is below the campus benchmark. Focus on foundational concepts in this subject before the next Mock Exam.
                                    </p>
                                </div>
                            )) : (
                                <p className="text-gray-500 italic">Analysis engine is calibrating. Complete more assessments for detailed tips.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
