import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { TestResult } from '../../../types';

const TakeTestPage: React.FC = () => {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const { tests, addTestResult, updateTestStatus } = useData();
    const { user } = useAuth()!;

    const test = tests.find(t => t.id === testId);

    const handleSubmit = () => {
        if (!test || !user) return;

        // Generate a mock result
        const score = Math.floor(Math.random() * 61) + 40; // Score between 40 and 100
        const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
        
        const newResult: TestResult = {
            testId: test.id,
            studentId: user.id,
            score: score,
            maxScore: 100,
            rank: Math.floor(Math.random() * 4) + 1, // Random rank 1-4
            grade: grade,
        };

        addTestResult(newResult);
        // In a real app, this status would be per-student
        // For this mock, we'll just mark the whole test as "Completed"
        updateTestStatus(test.id, 'Completed');

        alert('Test submitted! Redirecting to your dashboard.');
        navigate('/dashboard/student');
    };

    const handleDownload = (fileName: string) => {
        // Simulate file download
        const mockContent = `This is a mock question paper for the test: ${fileName}.\n\nQ1. What is the capital of France?\n...`;
        const blob = new Blob([mockContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.replace('.pdf', '.txt'); // Downloading as txt as we can't generate a PDF on the fly here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!test) {
        return (
            <div className="min-h-screen bg-atlas-black flex items-center justify-center text-center p-8">
                <div>
                    <h2 className="text-2xl font-bold text-red-500">Test not found!</h2>
                    <Link to="/dashboard/student" className="text-atlas-orange hover:underline mt-4 inline-block">Go back to Dashboard</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-atlas-black text-white font-sans">
             <div className="container mx-auto p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-atlas-orange">{test.title}</h1>
                    <p className="text-gray-400">Subject: {test.subject} | Date: {test.date}</p>
                </header>
                
                <div className="bg-atlas-gray p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                    <p className="text-gray-300 mb-6">Please download and review the questions in the provided paper. Once you are ready to submit, click the button below. This action is final and cannot be undone.</p>
                    
                    <div className="border border-dashed border-gray-600 p-8 rounded-lg text-center bg-atlas-black">
                        <p className="text-lg font-medium">Question Paper:</p>
                        <p className="text-atlas-orange text-2xl font-mono my-4">{test.pdfFileName}</p>
                        <button 
                            onClick={() => handleDownload(test.pdfFileName!)} 
                            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-500 transition"
                        >
                            Download Paper
                        </button>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                        <button onClick={() => navigate('/dashboard/student')} className="bg-gray-700 text-white font-bold py-3 px-8 rounded-md hover:bg-gray-600 transition">
                            Back to Dashboard
                        </button>
                        <button onClick={handleSubmit} className="bg-atlas-orange text-white font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition">
                            Submit Final Answers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeTestPage;