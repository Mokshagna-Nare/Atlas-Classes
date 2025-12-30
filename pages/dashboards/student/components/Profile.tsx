
import React from 'react';
import { STUDENT_RESULTS } from '../../../../constants';
import { useAuth } from '../../../../contexts/AuthContext';
import { TrophyIcon, SignalIcon, CreditCardIcon, InformationCircleIcon, AcademicCapIcon } from '../../../../components/icons';

const Profile: React.FC = () => {
    const { user } = useAuth()!;
    const latestResult = STUDENT_RESULTS[STUDENT_RESULTS.length - 1];
    const totalScore = STUDENT_RESULTS.reduce((acc, r) => acc + r.score, 0);
    const totalMaxScore = STUDENT_RESULTS.reduce((acc, r) => acc + r.maxScore, 0);
    const averagePercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return 'text-emerald-400';
        if (percentage >= 80) return 'text-emerald-500';
        if (percentage >= 70) return 'text-yellow-400';
        if (percentage >= 60) return 'text-atlas-primary';
        return 'text-red-500';
    };

    const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; subtext?: string; valueClass?: string; }> = ({ icon, label, value, subtext, valueClass }) => (
      <div className="bg-atlas-dark p-6 rounded-3xl text-center border border-gray-800 shadow-xl transition-all hover:border-atlas-primary/30 group">
        <div className="flex justify-center items-center h-14 w-14 rounded-2xl bg-atlas-soft mx-auto mb-4 border border-gray-700 group-hover:bg-atlas-primary/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{label}</h3>
        <p className={`text-3xl font-black ${valueClass || 'text-white'}`}>{value}</p>
        {subtext && <p className="text-gray-500 text-xs mt-1 font-medium">{subtext}</p>}
      </div>
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-atlas-dark border border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <AcademicCapIcon className="h-32 w-32 text-atlas-primary" />
                </div>
                <div className="w-24 h-24 rounded-2xl bg-atlas-primary/10 border-2 border-atlas-primary flex items-center justify-center text-atlas-primary text-4xl font-black shadow-glow">
                    {user?.name?.charAt(0)}
                </div>
                <div className="text-center md:text-left relative z-10">
                    <h2 className="text-3xl font-black text-white">{user?.name}</h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                        <span className="bg-atlas-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                            Batch: {user?.batch || 'N/A'}
                        </span>
                        <span className="bg-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-gray-700">
                            ID: {user?.id}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                    <SignalIcon className="h-5 w-5 text-atlas-primary" />
                    Performance Snapshot
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                      icon={<SignalIcon className="h-6 w-6 text-atlas-primary"/>}
                      label="Aggregate Performance"
                      value={`${averagePercentage.toFixed(1)}%`}
                      valueClass={getGradeColor(averagePercentage)}
                      subtext="Across all assessments"
                    />
                    <StatCard 
                      icon={<TrophyIcon className="h-6 w-6 text-atlas-primary"/>}
                      label="Latest Performance"
                      value={`Rank #${latestResult.rank}`}
                      subtext={`out of ${latestResult.totalStudents} students`}
                    />
                    <StatCard 
                      icon={<CreditCardIcon className="h-6 w-6 text-atlas-primary"/>}
                      label="Current Standing"
                      value={latestResult.grade}
                      subtext="Latest Grade Awarded"
                      valueClass={getGradeColor(latestResult.score / latestResult.maxScore * 100)}
                    />
                </div>
            </div>

            <div className="mt-8 p-8 bg-atlas-primary/5 border border-atlas-primary/20 rounded-3xl flex gap-6 items-start">
                <div className="p-3 bg-atlas-primary/10 rounded-xl">
                    <InformationCircleIcon className="h-6 w-6 text-atlas-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">Campus Announcements</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-atlas-primary"></span>
                        Upcoming Mock Test scheduled for 2024-10-01.
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-atlas-primary"></span>
                        New study material uploaded for Batch <span className="text-atlas-primary font-bold">{user?.batch}</span>.
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
