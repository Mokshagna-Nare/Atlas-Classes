
import React from 'react';
import { STUDENT_TESTS } from '../../../../constants';

const Tests: React.FC = () => {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-atlas-orange">Manage Tests</h2>
            <button className="bg-atlas-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">
                Create New Test
            </button>
        </div>
        <div className="bg-atlas-black p-4 rounded-lg">
            <ul className="space-y-3">
                {STUDENT_TESTS.map(test => (
                    <li key={test.id} className="flex justify-between items-center p-3 bg-atlas-gray rounded-md">
                        <div>
                            <p className="font-bold">{test.title}</p>
                            <p className="text-sm text-gray-400">Date: {test.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className={`px-2 py-1 text-xs rounded-full ${
                                test.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                test.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                            }`}>
                                {test.status}
                            </span>
                            <button className="text-gray-400 hover:text-white">Edit</button>
                            <button className="text-red-500 hover:text-red-400">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default Tests;
