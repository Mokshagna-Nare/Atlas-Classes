
import React from 'react';
import { STUDENT_RESULTS } from '../../../../constants';

const Profile: React.FC = () => {
    const latestResult = STUDENT_RESULTS[STUDENT_RESULTS.length - 1];
    const totalScore = STUDENT_RESULTS.reduce((acc, r) => acc + r.score, 0);
    const totalMaxScore = STUDENT_RESULTS.reduce((acc, r) => acc + r.maxScore, 0);
    const averagePercentage = (totalScore / totalMaxScore) * 100;

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return 'text-green-400';
        if (percentage >= 80) return 'text-green-500';
        if (percentage >= 70) return 'text-yellow-400';
        if (percentage >= 60) return 'text-orange-500';
        return 'text-red-500';
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-atlas-orange">Grade Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-atlas-black p-6 rounded-lg text-center">
                    <h3 className="text-gray-400 mb-2">Overall Performance</h3>
                    <p className={`text-5xl font-bold ${getGradeColor(averagePercentage)}`}>{averagePercentage.toFixed(1)}%</p>
                </div>
                <div className="bg-atlas-black p-6 rounded-lg text-center">
                    <h3 className="text-gray-400 mb-2">Latest Rank</h3>
                    <p className="text-5xl font-bold">{latestResult.rank}</p>
                    <p className="text-gray-500">in Physics - Mechanics</p>
                </div>
                <div className="bg-atlas-black p-6 rounded-lg text-center">
                    <h3 className="text-gray-400 mb-2">Latest Grade</h3>
                    <p className={`text-5xl font-bold ${getGradeColor(latestResult.score)}`}>{latestResult.grade}</p>
                     <p className="text-gray-500">{latestResult.score}/{latestResult.maxScore} Points</p>
                </div>
            </div>
            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-300">Notifications</h3>
                <p className="text-blue-400">Your fee for October is due. <a href="#/dashboard/student" onClick={(e) => { e.preventDefault(); alert('Redirecting to fees page...'); }} className="font-bold underline">Pay Now</a></p>
                <p className="text-blue-400">Upcoming test: Mathematics - Algebra on 2024-10-01.</p>
            </div>
        </div>
    );
};

export default Profile;
