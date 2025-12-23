
import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { TrashIcon, InformationCircleIcon, ClipboardCheckIcon } from '../../../../components/icons';

const ManageTests: React.FC = () => {
  const { tests, deleteTest, institutes } = useData();
  const [filterInstitute, setFilterInstitute] = useState('All');

  const filteredTests = tests.filter(test => 
    filterInstitute === 'All' || test.instituteId === filterInstitute
  );

  const getInstituteName = (id: string) => {
    return institutes.find(inst => inst.id === id)?.name || 'Unknown Institute';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this test?')) {
      deleteTest(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Active Tests</h2>
          <p className="text-atlas-text-muted text-sm mt-1">Review all tests assigned across your school network.</p>
        </div>
        <div className="flex items-center gap-3 bg-atlas-dark p-2 rounded-2xl border border-gray-800">
           <select 
              value={filterInstitute} 
              onChange={(e) => setFilterInstitute(e.target.value)} 
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-4 pl-2"
           >
              <option value="All">All Institutes</option>
              {institutes.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
           </select>
        </div>
      </div>

      <div className="bg-atlas-soft/40 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-atlas-dark/50 border-b border-gray-800">
              <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Test Title</th>
              <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Assigned To</th>
              <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Questions</th>
              <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
              <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredTests.map(test => (
              <tr key={test.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-5">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-atlas-primary/10 rounded-lg">
                        <ClipboardCheckIcon className="h-4 w-4 text-atlas-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{test.title}</p>
                        <p className="text-[10px] text-gray-500">{test.subject} • {test.date}</p>
                      </div>
                   </div>
                </td>
                <td className="p-5">
                   <p className="text-xs text-gray-300 font-medium">{getInstituteName(test.instituteId)}</p>
                </td>
                <td className="p-5">
                   <span className="text-xs text-atlas-primary font-black">{(test.questions?.length || 0)}</span>
                </td>
                <td className="p-5">
                   <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                      test.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-atlas-primary/10 text-atlas-primary'
                   }`}>
                      {test.status}
                   </span>
                </td>
                <td className="p-5 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(test.id)} 
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTests.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center">
             <div className="bg-atlas-dark p-6 rounded-full mb-4">
                <InformationCircleIcon className="h-10 w-10 text-gray-700" />
             </div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No tests found in the repository</p>
             <p className="text-gray-600 text-sm mt-2">Start by generating a test through the AI or Online Test panel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTests;
