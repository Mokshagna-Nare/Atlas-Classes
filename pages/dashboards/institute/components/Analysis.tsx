
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ALL_RESULTS, INSTITUTE_STUDENTS, STUDENT_TESTS } from '../../../../constants';
import { getPerformanceAnalysis } from '../../../../services/geminiService';

const Analysis: React.FC = () => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chartData = STUDENT_TESTS.filter(t => t.status === 'Completed').map(test => {
        const resultsForTest = ALL_RESULTS.filter(r => r.testId === test.id);
        const average = resultsForTest.reduce((acc, r) => acc + r.score, 0) / resultsForTest.length;
        const topScore = Math.max(...resultsForTest.map(r => r.score));
        return {
            name: test.title,
            averageScore: average,
            topScore: topScore,
        };
    });

    const handleAnalyze = async () => {
        setIsLoading(true);
        setAnalysis('');
        const results = await getPerformanceAnalysis(ALL_RESULTS);
        setAnalysis(results);
        setIsLoading(false);
    };
    
    useEffect(() => {
        handleAnalyze();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-atlas-orange">Performance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-atlas-black p-4 rounded-lg">
                    <h3 className="text-gray-400">Total Students</h3>
                    <p className="text-3xl font-bold">{INSTITUTE_STUDENTS.length}</p>
                </div>
                <div className="bg-atlas-black p-4 rounded-lg">
                    <h3 className="text-gray-400">Tests Conducted</h3>
                    <p className="text-3xl font-bold">{STUDENT_TESTS.filter(t => t.status === 'Completed').length}</p>
                </div>
                <div className="bg-atlas-black p-4 rounded-lg">
                    <h3 className="text-gray-400">Overall Average</h3>
                    <p className="text-3xl font-bold">{(ALL_RESULTS.reduce((acc, r) => acc + r.score, 0) / ALL_RESULTS.length).toFixed(2)}%</p>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Test Performance Trends</h3>
            <div className="h-80 bg-atlas-black p-4 rounded-lg mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444' }}/>
                        <Legend />
                        <Bar dataKey="averageScore" fill="#FF6B00" />
                        <Bar dataKey="topScore" fill="#FFA500" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-4">AI-Powered Insights</h3>
            <div className="bg-atlas-black p-4 rounded-lg">
                <button 
                    onClick={handleAnalyze} 
                    disabled={isLoading}
                    className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition disabled:bg-gray-500 mb-4"
                >
                    {isLoading ? 'Analyzing...' : 'Re-analyze with Gemini'}
                </button>
                {isLoading && <p className="text-center text-gray-400">Generating insights...</p>}
                {analysis && (
                    <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                        {analysis}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analysis;
