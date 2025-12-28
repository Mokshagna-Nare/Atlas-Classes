
import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { TrashIcon, InformationCircleIcon, ClipboardCheckIcon, MapPinIcon } from '../../../../components/icons';

const ManageTests: React.FC = () => {
  const { tests, deleteTest, institutes } = useData();
  const [filterInstitute, setFilterInstitute] = useState('All');

  const filteredTests = tests.filter(test => 
    filterInstitute === 'All' || test.instituteId === filterInstitute
  );

  const getInstituteName = (id: string) => {
    return institutes.find(inst => inst.id === id)?.name || 'Unassigned Institute';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this test record?')) {
      deleteTest(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">Active Global Tests</h2>
          <p className="text-atlas-text-muted text-sm mt-1 uppercase tracking-widest font-bold">Network-Wide Exam Repository</p>
        </div>
        <div className="flex items-center gap-3 bg-atlas-dark p-2 rounded-2xl border border-gray-800">
           <MapPinIcon className="h-4 w-4 text-atlas-primary ml-2" />
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

      <div className="bg-atlas-soft border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-atlas-dark/80 border-b border-gray-800 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <th className="p-6">Test Detail</th>
              <th className="p-6">Assigned To</th>
              <th className="p-6">Content</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredTests.map(test => (
              <tr key={test.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-atlas-primary/10 rounded-2xl">
                        <ClipboardCheckIcon className="h-6 w-6 text-atlas-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{test.title}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black mt-1">{test.subject} • {test.date}</p>
                      </div>
                   </div>
                </td>
                <td className="p-6">
                    <span className="text-xs font-bold text-gray-300">{getInstituteName(test.instituteId)}</span>
                </td>
                <td className="p-6">
                    <span className="text-xs font-black text-atlas-primary">{(test.questions?.length || 0)} Questions</span>
                </td>
                <td className="p-6">
                   <span className={`px-2 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                      test.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-atlas-primary/10 text-atlas-primary'
                   }`}>
                      {test.status}
                   </span>
                </td>
                <td className="p-6 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(test.id)} 
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTests.length === 0 && (
          <div className="p-24 text-center flex flex-col items-center">
             <div className="bg-atlas-dark p-8 rounded-full mb-6 border border-gray-800">
                <InformationCircleIcon className="h-12 w-12 text-gray-700" />
             </div>
             <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No active tests found in repository</p>
             <p className="text-gray-600 text-sm mt-3 max-w-sm mx-auto">New tests created via AI Generator or Online Test Builder will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTests;
