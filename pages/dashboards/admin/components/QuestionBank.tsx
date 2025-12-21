
import React, { useState } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { MCQ } from '../../../../types';
import { FlagIcon, PencilSquareIcon, TrashIcon, XIcon, FunnelIcon, InformationCircleIcon } from '../../../../components/icons';

interface QuestionBankProps {
  onEdit: (mcq: MCQ) => void;
}

const QuestionBank: React.FC<QuestionBankProps> = ({ onEdit }) => {
  const { mcqBank, deleteMCQ, flagMCQ, unflagMCQ } = useData();
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterFlagStatus, setFilterFlagStatus] = useState<'All' | 'Flagged' | 'Unflagged'>('All');
  const [viewingMcq, setViewingMcq] = useState<MCQ | null>(null);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [targetFlagId, setTargetFlagId] = useState<string | null>(null);
  const [tempReason, setTempReason] = useState('');

  const filteredQuestions = mcqBank.filter(m => {
    const subjectMatch = filterSubject === 'All' || m.subject === filterSubject;
    const flagMatch = filterFlagStatus === 'All' || 
                    (filterFlagStatus === 'Flagged' && m.isFlagged) || 
                    (filterFlagStatus === 'Unflagged' && !m.isFlagged);
    return subjectMatch && flagMatch;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this question?")) {
      deleteMCQ(id);
    }
  };

  const handleOpenFlagModal = (id: string) => {
    setTargetFlagId(id);
    setTempReason('');
    setIsFlagModalOpen(true);
  };

  const handleConfirmFlag = () => {
    if (targetFlagId) {
      flagMCQ(targetFlagId, tempReason);
      setIsFlagModalOpen(false);
      setTargetFlagId(null);
    }
  };

  const QuestionDetailModal = () => {
      if (!viewingMcq) return null;
      return (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in-up">
              <div className="bg-atlas-soft border border-gray-700 w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative">
                  <button onClick={() => setViewingMcq(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition"><XIcon className="h-6 w-6"/></button>
                  
                  <div className="flex items-center gap-3 mb-6">
                       <span className="bg-atlas-primary/20 text-atlas-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Detail View</span>
                       {viewingMcq.isFlagged && <span className="bg-red-900/30 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><FlagIcon className="h-3 w-3" /> Flagged</span>}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 leading-relaxed">{viewingMcq.question}</h3>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-atlas-dark p-4 rounded-xl">
                          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Subject</p>
                          <p className="text-white font-semibold">{viewingMcq.subject}</p>
                      </div>
                      <div className="bg-atlas-dark p-4 rounded-xl">
                          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Difficulty</p>
                          <p className={`font-semibold ${viewingMcq.difficulty === 'Hard' ? 'text-red-400' : viewingMcq.difficulty === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'}`}>{viewingMcq.difficulty}</p>
                      </div>
                  </div>

                  <div className="space-y-3 mb-8">
                      <p className="text-[10px] text-gray-500 font-bold uppercase ml-1">Options</p>
                      {viewingMcq.options?.map((opt, i) => (
                          <div key={i} className={`p-4 rounded-xl border ${opt === viewingMcq.answer ? 'bg-emerald-900/10 border-emerald-500/50 text-emerald-300' : 'bg-atlas-dark border-gray-800 text-gray-400'}`}>
                              <span className="font-bold mr-3">{i + 1}.</span> {opt}
                          </div>
                      ))}
                  </div>

                  {viewingMcq.isFlagged && (
                       <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-xl mb-8">
                            <p className="text-[10px] text-red-400 font-bold uppercase mb-1">Flag Reason</p>
                            <p className="text-gray-300 text-sm italic">"{viewingMcq.flagReason || 'No reason provided.'}"</p>
                       </div>
                  )}

                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-800">
                      <button 
                        onClick={() => { onEdit(viewingMcq); setViewingMcq(null); }}
                        className="flex items-center gap-2 bg-atlas-gray hover:bg-atlas-gray/60 px-6 py-2 rounded-lg text-white font-bold text-sm transition"
                      >
                          <PencilSquareIcon className="h-4 w-4" /> Edit
                      </button>
                      <button 
                        onClick={() => setViewingMcq(null)}
                        className="bg-atlas-primary text-white font-bold py-2 px-8 rounded-lg hover:bg-emerald-600 transition"
                      >
                          Done
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  const FlagModal = () => {
    if (!isFlagModalOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 animate-fade-in-up">
            <div className="bg-atlas-soft border border-gray-700 w-full max-w-md rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Flag Question</h3>
                <p className="text-gray-400 text-sm mb-6">Explain why this question should be excluded from tests.</p>
                
                <textarea 
                    autoFocus
                    rows={4}
                    value={tempReason}
                    onChange={(e) => setTempReason(e.target.value)}
                    placeholder="Provide context for review..."
                    className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-2xl focus:outline-none focus:border-red-500 text-white resize-none mb-6"
                />

                <div className="flex justify-end gap-3">
                    <button onClick={() => setIsFlagModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold hover:text-white transition">Cancel</button>
                    <button onClick={handleConfirmFlag} className="bg-red-600 text-white font-bold px-8 py-2 rounded-xl hover:bg-red-500 transition">Confirm Flag</button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-6 reveal-on-scroll">
        <QuestionDetailModal />
        <FlagModal />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Question Bank</h2>
                <p className="text-atlas-text-muted text-sm font-semibold flex items-center gap-2 uppercase tracking-widest">
                    <InformationCircleIcon className="h-4 w-4" />
                    Manage {mcqBank.length} items from central repository
                </p>
            </div>
            
            {/* Table Filters */}
            <div className="flex items-center gap-3 bg-atlas-soft/40 backdrop-blur-xl p-2 rounded-2xl border border-gray-800 shadow-xl">
                 <div className="flex items-center gap-2 px-3 border-r border-gray-800">
                    <FunnelIcon className="h-4 w-4 text-atlas-primary" />
                    <select 
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-4"
                    >
                        <option value="All">All Subjects</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                 </div>
                 <div className="flex items-center gap-2 px-3">
                    <FlagIcon className="h-4 w-4 text-atlas-primary" />
                    <select 
                        value={filterFlagStatus}
                        onChange={(e) => setFilterFlagStatus(e.target.value as any)}
                        className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-4"
                    >
                        <option value="All">All Status</option>
                        <option value="Flagged">Flagged Only</option>
                        <option value="Unflagged">Unflagged Only</option>
                    </select>
                 </div>
            </div>
        </div>

        {/* Content Table */}
        <div className="bg-atlas-soft/40 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {filteredQuestions.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 bg-atlas-dark/50">
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Question</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subject</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Flagged</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {filteredQuestions.map((q) => (
                                <tr key={q.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-5 max-w-md">
                                        <p className="text-sm text-gray-300 font-medium truncate group-hover:text-white transition-colors cursor-pointer" onClick={() => setViewingMcq(q)}>
                                            {q.question}
                                        </p>
                                        <p className="text-[10px] text-gray-600 mt-1">{q.topic}</p>
                                    </td>
                                    <td className="p-5 whitespace-nowrap">
                                        <span className="text-xs font-bold text-atlas-primary bg-atlas-primary/5 px-2 py-1 rounded-lg border border-atlas-primary/20">
                                            {q.subject}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        {q.isFlagged ? (
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-900/10 px-2 py-1 rounded-lg border border-red-900/30 animate-pulse">
                                                <FlagIcon className="h-3 w-3" /> Flagged
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-600">No</span>
                                        )}
                                    </td>
                                    <td className="p-5 text-right whitespace-nowrap">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => q.isFlagged ? unflagMCQ(q.id!) : handleOpenFlagModal(q.id!)}
                                                title={q.isFlagged ? 'Unflag' : 'Flag'}
                                                className={`p-2 rounded-lg transition ${q.isFlagged ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-red-500 hover:bg-red-900/10'}`}
                                            >
                                                <FlagIcon className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => onEdit(q)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition" title="Edit">
                                                <PencilSquareIcon className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDelete(q.id!)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition" title="Delete">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-20 text-center flex flex-col items-center justify-center">
                    <div className="bg-atlas-gray p-6 rounded-full mb-6 text-gray-600">
                        <FunnelIcon className="h-16 w-16" />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">No matching questions</h4>
                    <p className="text-atlas-text-muted text-sm max-w-xs mx-auto">Try adjusting your filters or upload new questions via the MCQ Upload Panel.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default QuestionBank;