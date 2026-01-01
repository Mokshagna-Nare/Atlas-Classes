
import React from 'react';
import { useData } from '../../../../contexts/DataContext';
import { 
  UserGroupIcon, AcademicCapIcon, 
  ChartBarIcon, SparklesIcon,
  PlusIcon, ArrowRightIcon
} from '../../../../components/icons';

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, trend?: string }> = ({ icon, label, value, trend }) => (
    <div className="bg-atlas-soft/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-atlas-primary/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-atlas-dark rounded-2xl group-hover:bg-atlas-primary/10 transition-colors border border-white/5">
                {icon}
            </div>
            {trend && <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-wider">{trend}</span>}
        </div>
        <h4 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-1">{label}</h4>
        <p className="text-4xl font-black text-white">{value}</p>
    </div>
);

interface HomeOverviewProps {
    onNavigate: (view: any, state?: any) => void;
}

const HomeOverview: React.FC<HomeOverviewProps> = ({ onNavigate }) => {
    const { students, classes, tests } = useData();

    const shortcuts = [
        { 
            title: 'Register New Student', 
            desc: 'Manual or Bulk CSV import', 
            view: 'students',
            state: { step: 1 } 
        },
        { 
            title: 'Create Academic Batch', 
            desc: 'Define subjects and class logic', 
            view: 'academics',
            state: { tab: 'classes' } 
        },
        { 
            title: 'Publish Test Marks', 
            desc: 'Update parent/student reports', 
            view: 'students',
            state: { step: 2 } 
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={<UserGroupIcon className="h-6 w-6 text-atlas-primary" />} 
                    label="Active Students" 
                    value={students.length} 
                    trend="+12% Month"
                />
                <StatCard 
                    icon={<AcademicCapIcon className="h-6 w-6 text-atlas-primary" />} 
                    label="Class Structures" 
                    value={classes.length} 
                />
                <StatCard 
                    icon={<ChartBarIcon className="h-6 w-6 text-atlas-primary" />} 
                    label="Total Assessments" 
                    value={tests.length} 
                    trend="Live now"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <PlusIcon className="h-40 w-40 text-atlas-primary" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-white mb-8">Strategic Shortcuts</h3>
                        <div className="grid gap-4">
                            {shortcuts.map((item, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => onNavigate(item.view, item.state)}
                                    className="flex items-center justify-between p-6 bg-atlas-soft/50 rounded-2xl border border-white/5 hover:border-atlas-primary/40 transition-all text-left group/btn hover:translate-x-2"
                                >
                                    <div>
                                        <p className="text-white font-bold mb-0.5">{item.title}</p>
                                        <p className="text-gray-500 text-xs">{item.desc}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-atlas-dark border border-white/5 text-gray-500 group-hover/btn:text-atlas-primary group-hover/btn:border-atlas-primary/50 transition-all">
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Campus Announcements (Mock) */}
                <div className="bg-atlas-primary/5 border border-atlas-primary/20 p-10 rounded-[2.5rem] relative group">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-atlas-primary/10 rounded-xl">
                            <SparklesIcon className="h-6 w-6 text-atlas-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-white">System Insights</h3>
                    </div>
                    <div className="space-y-6">
                        {[
                            'Final review of JEE Mock Test is complete.',
                            'Subject "Biology" for Class 12 needs schedule updates.',
                            'Next student sync scheduled for tonight at 12:00 AM.'
                        ].map((msg, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-atlas-primary mt-2 flex-shrink-0"></div>
                                <p className="text-gray-400 text-sm leading-relaxed">{msg}</p>
                            </div>
                        ))}
                        <div className="pt-6 mt-6 border-t border-atlas-primary/10">
                            <p className="text-xs font-black text-atlas-primary uppercase tracking-[0.2em]">Efficiency Score: 94%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeOverview;
