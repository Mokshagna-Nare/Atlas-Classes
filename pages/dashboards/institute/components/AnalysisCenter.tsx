
import React from 'react';
import { useData } from '../../../../contexts/DataContext';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
    ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { ChartPieIcon, SparklesIcon, InformationCircleIcon } from '../../../../components/icons';

const GLOBAL_TOOLTIP_STYLE = {
    backgroundColor: '#111827',
    border: '1px solid #374151',
    borderRadius: '16px',
    padding: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
};

const AnalysisCenter: React.FC = () => {
    const { students, marks, classes } = useData();

    // Aggregated Data Simulation
    const classPerfData = classes.map(c => {
        const classMarks = marks.filter(m => m.classId === c.id);
        const count = classMarks.length;
        const avg = count > 0 
            ? (classMarks.reduce((acc, m) => {
                const stdAvg = Object.values(m.marks).reduce((a, b) => a + b, 0) / Object.keys(m.marks).length;
                return acc + stdAvg;
            }, 0) / count)
            : 0;
        return { name: c.name.split(' ')[1], performance: Math.round(avg) };
    });

    return (
        <div className="space-y-10 animate-fade-in-up">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-white">Advanced Campus Intelligence</h2>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mt-1">Holistic performance auditing</p>
                </div>
                <button className="bg-atlas-dark text-atlas-primary border border-atlas-primary/20 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-atlas-primary/5 transition-all">Generate Global Audit</button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-4">
                        <ChartPieIcon className="h-6 w-6 text-atlas-primary" /> Class-wise Benchmark (%)
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={classPerfData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#4B5563" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#4B5563" fontSize={11} axisLine={false} tickLine={false} domain={[0, 100]} />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
                                    contentStyle={GLOBAL_TOOLTIP_STYLE}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#10B981', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="performance" fill="#10B981" radius={[12, 12, 0, 0]} barSize={45} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-4">
                        <SparklesIcon className="h-6 w-6 text-atlas-primary" /> Campus Participation Growth
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                { name: 'Jan', val: 40 },
                                { name: 'Feb', val: 55 },
                                { name: 'Mar', val: 78 },
                                { name: 'Apr', val: 120 }
                            ]}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#4B5563" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                                <YAxis hide />
                                <Tooltip 
                                    contentStyle={GLOBAL_TOOLTIP_STYLE}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#10B981', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-atlas-primary/5 border border-atlas-primary/20 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-10 items-center shadow-2xl group">
                <div className="p-8 bg-atlas-primary/10 rounded-[2rem] shadow-glow border border-atlas-primary/30 group-hover:scale-110 transition-transform">
                    <InformationCircleIcon className="h-10 w-10 text-atlas-primary" />
                </div>
                <div className="flex-1">
                    <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">Aggregate Improvement Indices</h4>
                    <p className="text-gray-400 leading-relaxed mb-6">Based on latest test cycle <b>UT-101</b>, students in the <b>NEXUS</b> batch show a 15% higher accuracy in Integrated Science compared to JEE/NEET specialized tracks. Recommendation: Synchronize foundations across all batches.</p>
                    <div className="flex gap-4">
                        <span className="bg-atlas-dark text-emerald-400 text-[10px] font-black px-4 py-2 rounded-xl border border-emerald-400/20">92% Accuracy in PCM</span>
                        <span className="bg-atlas-dark text-yellow-400 text-[10px] font-black px-4 py-2 rounded-xl border border-yellow-400/20">74% Target in PCB</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisCenter;
