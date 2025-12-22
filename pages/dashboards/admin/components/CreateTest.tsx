
import React, { useState, useRef } from 'react';
import { SparklesIcon, XIcon, FlagIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://YOUR_URL.supabase.co', 'YOUR_KEY');

const CreateTest: React.FC = () => {
  const { mcqBank } = useData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    testName: '', duration: '60', subject: 'Physics',
    numEasy: '5', numMedium: '3', numHard: '2',
    startDate: '', endDate: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const { data: testId, error } = await supabase.rpc('generate_random_test', {
        p_name: formData.testName,
        p_duration: parseInt(formData.duration),
        p_start: new Date(formData.startDate).toISOString(),
        p_end: new Date(formData.endDate).toISOString(),
        p_easy_count: parseInt(formData.numEasy),
        p_med_count: parseInt(formData.numMedium),
        p_hard_count: parseInt(formData.numHard),
        p_subject: formData.subject
      });

      if (error) throw error;
      alert(`Test generated successfully! ID: ${testId}`);
    } catch (err: any) {
      alert(`Generation failed: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-atlas-dark rounded-3xl border border-gray-800">
      <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
        <SparklesIcon className="h-8 w-8 text-atlas-primary" /> Generate Proctored Test
      </h2>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            className="bg-atlas-soft border border-gray-700 p-4 rounded-xl text-white" 
            placeholder="Test Name" 
            onChange={(e) => setFormData({...formData, testName: e.target.value})} 
            required 
          />
          <select 
            className="bg-atlas-soft border border-gray-700 p-4 rounded-xl text-white"
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          >
            <option>Physics</option><option>Chemistry</option><option>Biology</option>
          </select>
        </div>
        
        <div className="bg-atlas-black/50 p-6 rounded-2xl border border-gray-800 grid grid-cols-3 gap-4">
          <input type="number" placeholder="Easy Qs" className="bg-atlas-dark p-3 rounded-lg border border-gray-700 text-white" onChange={(e) => setFormData({...formData, numEasy: e.target.value})} />
          <input type="number" placeholder="Med Qs" className="bg-atlas-dark p-3 rounded-lg border border-gray-700 text-white" onChange={(e) => setFormData({...formData, numMedium: e.target.value})} />
          <input type="number" placeholder="Hard Qs" className="bg-atlas-dark p-3 rounded-lg border border-gray-700 text-white" onChange={(e) => setFormData({...formData, numHard: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Start Window</label>
            <input type="datetime-local" className="w-full bg-atlas-soft border border-gray-700 p-4 rounded-xl text-white" onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">End Window</label>
            <input type="datetime-local" className="w-full bg-atlas-soft border border-gray-700 p-4 rounded-xl text-white" onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isGenerating}
          className="w-full bg-atlas-primary py-5 rounded-2xl font-black text-white text-xl shadow-glow hover:scale-[1.01] transition-all disabled:opacity-50"
        >
          {isGenerating ? 'Building Secure Test...' : 'Initialize Random Selection'}
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
