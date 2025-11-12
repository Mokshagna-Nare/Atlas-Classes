import React from 'react';
import { ALL_RESULTS, INSTITUTE_STUDENTS, STUDENT_TESTS } from '../../../../constants';

const Results: React.FC = () => {

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6 print:hidden">
                <h2 className="text-2xl font-bold text-atlas-orange">Student Results</h2>
                <button onClick={handlePrint} className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">
                    Download All Results (PDF)
                </button>
            </div>
            <div id="printable-results" className="overflow-x-auto bg-atlas-black rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="p-4">Student Name</th>
                            <th className="p-4">Test Title</th>
                            <th className="p-4">Score</th>
                            <th className="p-4">Rank</th>
                            <th className="p-4">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ALL_RESULTS.map((result, index) => {
                            const student = INSTITUTE_STUDENTS.find(s => s.id === result.studentId);
                            const test = STUDENT_TESTS.find(t => t.id === result.testId);
                            return (
                                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="p-4">{student?.name}</td>
                                    <td className="p-4">{test?.title}</td>
                                    <td className="p-4">{result.score} / {result.maxScore}</td>
                                    <td className="p-4">{result.rank}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            result.grade === 'A+' ? 'bg-green-500/20 text-green-400' :
                                            result.grade === 'A' ? 'bg-green-500/20 text-green-500' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {result.grade}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-results, #printable-results * {
                        visibility: visible;
                    }
                    #printable-results {
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