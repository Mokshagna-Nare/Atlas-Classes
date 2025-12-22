
import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { Institute } from '../../../../types';
import EditInstituteModal from './EditInstituteModal';
import AddInstituteModal from './AddInstituteModal';
import { ChartPieIcon, GlobeAltIcon, SparklesIcon, UserGroupIcon } from '../../../../components/icons';

const GlobalAnalytics = () => {
    const { institutes, results, tests } = useData();
    const totalStudents = 500; // Mock aggregate
    const totalTests = tests.length;
    const avgGlobalScore = (results.reduce((acc, r) => acc + r.score, 0) / (results.length || 1)).toFixed(1);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-atlas-dark p-6 rounded-3xl border border-gray-800">
                    <div className="flex items-center gap-4 mb-3">
                        <GlobeAltIcon className="h-5 w-5 text-atlas-primary" />
                        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Schools</h4>
                    </div>
                    <p className="text-3xl font-black text-white">{institutes.length}</p>
                </div>
                <div className="bg-atlas-dark p-6 rounded-3xl border border-gray-800">
                    <div className="flex items-center gap-4 mb-3">
                        <UserGroupIcon className="h-5 w-5 text-atlas-primary" />
                        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Total Students</h4>
                    </div>
                    <p className="text-3xl font-black text-white">{totalStudents}</p>
                </div>
                <div className="bg-atlas-dark p-6 rounded-3xl border border-gray-800">
                    <div className="flex items-center gap-4 mb-3">
                        <ChartPieIcon className="h-5 w-5 text-atlas-primary" />
                        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Total Tests</h4>
                    </div>
                    <p className="text-3xl font-black text-white">{totalTests}</p>
                </div>
                <div className="bg-atlas-dark p-6 rounded-3xl border border-atlas-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <div className="flex items-center gap-4 mb-3">
                        <SparklesIcon className="h-5 w-5 text-atlas-primary" />
                        <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Global Avg</h4>
                    </div>
                    <p className="text-3xl font-black text-atlas-primary">{avgGlobalScore}%</p>
                </div>
            </div>

            <div className="bg-atlas-dark border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                 <div className="p-6 border-b border-gray-800 bg-atlas-black/50">
                    <h3 className="text-lg font-bold text-white">Institute Performance Ranking</h3>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-atlas-black/30 border-b border-gray-800 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                        <tr>
                            <th className="p-6">Institute Name</th>
                            <th className="p-6">Tests Held</th>
                            <th className="p-6">Avg Performance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {institutes.map(inst => (
                            <tr key={inst.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-6 font-bold text-white">{inst.name}</td>
                                <td className="p-6 text-gray-400">{tests.filter(t => t.instituteId === inst.id).length}</td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden max-w-[100px]">
                                            <div className="h-full bg-atlas-primary rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                        <span className="text-sm font-black text-white">75.0%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

const ManageInstitutes: React.FC = () => {
  const { institutes, deleteInstitute } = useData();
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');
  const [editingInstitute, setEditingInstitute] = useState<Institute | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (institute: Institute) => setEditingInstitute(institute);
  const handleCloseModal = () => setEditingInstitute(null);
  const handleDelete = (instituteId: string) => {
    if (window.confirm('Are you sure you want to delete this institute? This action cannot be undone.')) {
        deleteInstitute(instituteId);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h2 className="text-3xl font-extrabold text-white">Network Management</h2>
            <p className="text-atlas-text-muted text-sm font-semibold uppercase tracking-widest mt-1">Control your partner ecosystem</p>
        </div>
        <div className="flex gap-2 bg-atlas-dark p-1.5 rounded-2xl border border-gray-800">
            <button onClick={() => setActiveTab('list')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'list' ? 'bg-atlas-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Directory</button>
            <button onClick={() => setActiveTab('analytics')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'bg-atlas-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Global Analytics</button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
          <GlobalAnalytics />
      ) : (
          <>
            <div className="flex justify-end">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-atlas-primary text-white font-black py-4 px-10 rounded-2xl shadow-lg hover:bg-emerald-500 transition-all hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
                >
                    Add Partner School
                </button>
            </div>
            <div className="bg-atlas-dark border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                <thead className="bg-atlas-black/50 border-b border-gray-800 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <tr>
                    <th className="p-6">ID</th>
                    <th className="p-6">Name</th>
                    <th className="p-6">Email</th>
                    <th className="p-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                    {institutes.map(institute => (
                    <tr key={institute.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="p-6 text-atlas-text-muted font-mono text-xs">{institute.id}</td>
                        <td className="p-6 font-bold text-white">{institute.name}</td>
                        <td className="p-6 text-gray-400">{institute.email}</td>
                        <td className="p-6 text-right">
                        <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(institute)} className="p-2 bg-atlas-soft border border-gray-700 rounded-lg text-blue-400 hover:text-white hover:bg-blue-500 transition-all">Edit</button>
                            <button onClick={() => handleDelete(institute.id)} className="p-2 bg-atlas-soft border border-gray-700 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-all">Delete</button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </>
      )}
      {editingInstitute && <EditInstituteModal institute={editingInstitute} onClose={handleCloseModal} />}
      {isAddModalOpen && <AddInstituteModal onClose={() => setIsAddModalOpen(false)} />}
    </div>
  );
};

export default ManageInstitutes;
