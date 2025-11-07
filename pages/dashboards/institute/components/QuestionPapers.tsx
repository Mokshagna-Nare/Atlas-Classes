
import React from 'react';

const papers = [
    { id: 1, name: 'Physics_Mechanics_Final.pdf', date: '2024-09-15' },
    { id: 2, name: 'Chemistry_Organic_Midterm.pdf', date: '2024-09-22' },
    { id: 3, name: 'Math_Algebra_Weekly.pdf', date: '2024-10-01' },
];

const QuestionPapers: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-atlas-orange">Question Papers & Downloads</h2>
        <button className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">
          Upload Paper
        </button>
      </div>
      <div className="bg-atlas-black p-4 rounded-lg">
        <ul className="space-y-3">
            {papers.map(paper => (
                <li key={paper.id} className="flex justify-between items-center p-3 bg-atlas-gray rounded-md">
                    <div>
                        <p className="font-bold">{paper.name}</p>
                        <p className="text-sm text-gray-400">Uploaded on: {paper.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-blue-400 hover:underline">View</button>
                        <button className="text-green-400 hover:underline">Download</button>
                        <button className="text-red-500 hover:text-red-400">Delete</button>
                    </div>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionPapers;
