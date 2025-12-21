
import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, CloudArrowUpIcon, FlagIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';
import { MCQ } from '../../../../types';

interface MCQUploadProps {
  editingMcq?: MCQ | null;
  onFinished?: () => void;
}

const MCQUpload: React.FC<MCQUploadProps> = ({ editingMcq, onFinished }) => {
  const { addMCQ, updateMCQ } = useData();
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [subject, setSubject] = useState('Physics');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [marks, setMarks] = useState('1');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isFlagged, setIsFlagged] = useState(false);
  const [flagReason, setFlagReason] = useState('');

  useEffect(() => {
    if (editingMcq) {
      setQuestion(editingMcq.question);
      setOptions(editingMcq.options || ['', '', '', '']);
      setCorrectAnswer(editingMcq.answer);
      setExplanation(editingMcq.explanation || '');
      setSubject(editingMcq.subject);
      setTopic(editingMcq.topic);
      setDifficulty(editingMcq.difficulty);
      setMarks(editingMcq.marks.toString());
      setIsFlagged(editingMcq.isFlagged);
      setFlagReason(editingMcq.flagReason || '');
    }
  }, [editingMcq]);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!question || !correctAnswer) {
      alert("Please fill in the question and correct answer.");
      return;
    }

    const mcqData = {
      question,
      type: 'Multiple Choice' as const,
      options: options.filter(opt => opt.trim() !== ''),
      answer: correctAnswer,
      explanation,
      subject,
      topic,
      difficulty,
      marks: parseInt(marks) || 1,
      isFlagged,
      flagReason: isFlagged ? flagReason : ''
    };

    if (editingMcq) {
      updateMCQ(editingMcq.id!, mcqData);
      alert("Question updated successfully!");
    } else {
      const newMCQ: MCQ = {
        ...mcqData,
        id: `mcq-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addMCQ(newMCQ);
      alert("Question successfully added to MCQ Bank!");
    }
    
    if (onFinished) {
      onFinished();
    } else {
      // Clear form for next entry if not in edit mode
      setQuestion('');
      setCorrectAnswer('');
      setExplanation('');
      setOptions(['', '', '', '']);
      setIsFlagged(false);
      setFlagReason('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto reveal-on-scroll">
      <div className="flex flex-col space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2">{editingMcq ? 'Edit Question' : 'MCQ Upload Panel'}</h2>
          <p className="text-atlas-text-muted text-sm uppercase tracking-widest font-semibold">{editingMcq ? 'Update existing content' : 'New Online Quiz Item'}</p>
        </div>

        <div className="bg-atlas-soft/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Subject</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary transition-all text-white appearance-none cursor-pointer"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Topic / Chapter</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Thermodynamics"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Marks</label>
                <input 
                  type="number" 
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Question</label>
              <textarea 
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type the MCQ question here..."
                className="w-full px-4 py-4 bg-atlas-dark border border-gray-700 rounded-2xl focus:outline-none focus:border-atlas-primary text-white resize-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider">Options</label>
                <span className="text-[10px] text-atlas-text-muted font-medium bg-atlas-gray px-2 py-0.5 rounded-full uppercase">Min 2 Required</span>
              </div>
              <div className="grid gap-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-atlas-gray text-[10px] font-bold text-atlas-primary border border-atlas-primary/20">
                      {idx + 1}
                    </div>
                    <input 
                      type="text" 
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 px-4 py-3 bg-atlas-dark border border-gray-800 rounded-xl focus:outline-none focus:border-atlas-primary text-white"
                    />
                    <button 
                      onClick={() => handleRemoveOption(idx)}
                      className="p-3 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleAddOption}
                className="group flex items-center gap-2 text-atlas-primary text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-atlas-primary/10 rounded-lg transition-all"
              >
                <PlusIcon className="h-4 w-4" />
                Add Option
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Correct Answer</label>
                <input 
                  type="text" 
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Option No / Text"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Explanation (Optional)</label>
                <textarea 
                  rows={1}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Briefly explain the solution..."
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white resize-none h-12"
                />
              </div>
            </div>

            {/* Flagging Section */}
            <div className="pt-6 border-t border-gray-800 space-y-6">
                <div className="flex items-center gap-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={isFlagged}
                            onChange={(e) => setIsFlagged(e.target.checked)}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        <span className="ml-3 text-sm font-bold text-gray-300 flex items-center gap-2">
                            <FlagIcon className={`h-4 w-4 ${isFlagged ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
                            Flag this question
                        </span>
                    </label>
                </div>
                
                {isFlagged && (
                    <div className="space-y-2 animate-fade-in-up">
                        <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Flag Reason (Optional)</label>
                        <textarea 
                            rows={2}
                            value={flagReason}
                            onChange={(e) => setFlagReason(e.target.value)}
                            placeholder="e.g. Question contains error, repetitive, or needs review..."
                            className="w-full px-4 py-3 bg-red-900/10 border border-red-900/30 rounded-xl focus:outline-none focus:border-red-500 text-white placeholder-red-300/30 resize-none"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-800">
              <button 
                onClick={() => onFinished?.()}
                className="px-8 py-3 bg-transparent text-gray-400 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-gray-700"
              >
                {editingMcq ? 'Cancel' : 'Reset'}
              </button>
              <button 
                onClick={handleSubmit}
                className={`px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 ${
                    editingMcq ? 'bg-white text-black hover:bg-gray-200' : 'bg-atlas-primary text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:bg-emerald-500 hover:-translate-y-1'
                }`}
              >
                {editingMcq ? 'Update Question' : 'Submit to Database'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default MCQUpload;