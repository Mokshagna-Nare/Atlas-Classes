
import React, { useState } from 'react';
import { PlusIcon, TrashIcon, CloudArrowUpIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';
import { MCQ } from '../../../../types';

const MCQUpload: React.FC = () => {
  const { addMCQ } = useData();
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [subject, setSubject] = useState('Physics');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [marks, setMarks] = useState('1');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');

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

  const handleSaveDraft = () => {
    console.log("Draft Saved:", { subject, topic, difficulty, marks, question, options, correctAnswer, explanation });
    alert("Draft saved to console.");
  };

  const handleSubmit = () => {
    if (!question || !correctAnswer) {
      alert("Please fill in the question and correct answer.");
      return;
    }

    const newMCQ: MCQ = {
      id: `mcq-${Date.now()}`,
      question,
      type: 'Multiple Choice',
      options: options.filter(opt => opt.trim() !== ''),
      answer: correctAnswer,
      explanation,
      subject,
      topic,
      difficulty,
      marks: parseInt(marks) || 1
    };

    addMCQ(newMCQ);
    console.log("Submitted to Database:", newMCQ);
    alert("Question successfully added to MCQ Bank!");
    
    // Clear form
    setQuestion('');
    setCorrectAnswer('');
    setExplanation('');
    setOptions(['', '', '', '']);
  };

  return (
    <div className="max-w-4xl mx-auto reveal-on-scroll">
      <div className="flex flex-col space-y-8">
        {/* Header Area */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2">MCQ Upload Panel</h2>
          <p className="text-atlas-text-muted text-sm uppercase tracking-widest font-semibold">New Online Quiz Item</p>
        </div>

        <div className="bg-atlas-soft/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* Metadata Section: Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Subject</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white appearance-none cursor-pointer"
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
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white placeholder-gray-600" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white appearance-none cursor-pointer"
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
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white placeholder-gray-600" 
                />
              </div>
            </div>

            {/* Question Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Question</label>
              <textarea 
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type the MCQ question here..."
                className="w-full px-4 py-4 bg-atlas-dark border border-gray-700 rounded-2xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white placeholder-gray-600 resize-none"
              />
            </div>

            {/* Options Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider">Options</label>
                <span className="text-[10px] text-atlas-text-muted font-medium bg-atlas-gray px-2 py-0.5 rounded-full uppercase">Min 2 Required</span>
              </div>
              <div className="grid gap-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-atlas-gray text-[10px] font-bold text-atlas-primary border border-atlas-primary/20">
                      {idx + 1}
                    </div>
                    <input 
                      type="text" 
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 px-4 py-3 bg-atlas-dark border border-gray-800 rounded-xl focus:outline-none focus:border-atlas-primary transition-all text-white placeholder-gray-700"
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

            {/* Answer & Explanation Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Correct Answer</label>
                <input 
                  type="text" 
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Option No / Text"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white placeholder-gray-600" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider ml-1">Explanation (Optional)</label>
                <textarea 
                  rows={1}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Briefly explain the solution..."
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary focus:ring-1 focus:ring-atlas-primary transition-all text-white placeholder-gray-600 resize-none h-12"
                />
              </div>
            </div>

            {/* Bulk Upload Section */}
            <div className="pt-4">
              <div className="relative group overflow-hidden bg-atlas-gray/20 border-2 border-dashed border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center transition-all hover:border-atlas-primary/50 hover:bg-atlas-gray/40">
                <div className="bg-atlas-soft p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-500 shadow-xl border border-gray-800">
                  <CloudArrowUpIcon className="h-8 w-8 text-atlas-primary" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1">Bulk Upload via Excel / CSV</h4>
                <p className="text-atlas-text-muted text-xs mb-6">Import hundreds of questions at once</p>
                
                <label className="relative cursor-pointer">
                  <span className="bg-white text-black font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg">Choose File</span>
                  <input type="file" className="hidden" accept=".csv,.xlsx,.xls" />
                </label>
                <p className="mt-4 text-[10px] text-gray-600">No file chosen</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-800">
              <button 
                onClick={handleSaveDraft}
                className="px-8 py-3 bg-transparent text-gray-400 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-gray-700"
              >
                Save Draft
              </button>
              <button 
                onClick={handleSubmit}
                className="px-10 py-4 bg-atlas-primary text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Submit to Database
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default MCQUpload;