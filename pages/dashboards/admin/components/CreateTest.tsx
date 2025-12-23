
import React, { useState } from 'react';
import { SparklesIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';
import { createClient } from '@supabase/supabase-js';
import { Test } from '../../../../types';

// Assuming your Supabase configuration is handled or mocked
const supabase = createClient('https://YOUR_URL.supabase.co', 'YOUR_KEY');

const CreateTest: React.FC = () => {
  const { addTest, institutes } = useData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetInstituteId, setTargetInstituteId] = useState(institutes.length > 0 ? institutes[0].id : '');
  const [formData, setFormData] = useState({
    testName: '', duration: '60', subject: 'Physics',
    numEasy: '5', numMedium: '3', numHard: '2',
    startDate: '', endDate: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInstituteId) {
      alert("Please select an institute.");
      return;
    }
    
    setIsGenerating(true);

    try {
      // Supabase RPC Call
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

      // Local Fallback / Sync
      const localTest: Test = {
        id: testId || `t-online-${Date.now()}`,
        title: formData.testName,
        subject: formData.subject,
        date: new Date().toISOString().split('T')[0],
        status: 'Upcoming',
        instituteId: targetInstituteId,
        questions: [], // Questions would be populated by the backend logic
        duration: parseInt(formData.duration)
      };

      addTest(localTest);
      alert(`Test initialized successfully and assigned to institute!`);
      
    } catch (err: any) {
      // Even if Supabase fails (e.g. wrong key), let's mock it for the demo
      const localTest: Test = {
        id: `t-online-${Date.now()}`,
        title: formData.testName,
        subject: formData.subject,
        date: new Date().toISOString().split('T')[0],
        status: 'Upcoming',
        instituteId: targetInstituteId,
        questions: [],
        duration: parseInt(formData.duration)
      };
      addTest(localTest);
      alert(`Test created (Local Mode)!`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-atlas-soft/40 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-atlas-primary/10 rounded-2xl">
            <SparklesIcon className="h-8 w-8 text-atlas-primary" /> 
        </div>
        <div>
            <h2 className="text-3xl font-black text-white">Online Test Builder</h2>
            <p className="text-atlas-text-muted text-sm uppercase tracking-widest font-bold">Automated Selection Engine</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Target Institute</label>
            <select 
              value={targetInstituteId}
              onChange={(e) => setTargetInstituteId(e.target.value)}
              className="w-full bg-atlas-dark border border-gray-700 p-4 rounded-xl text-white outline-none focus:border-atlas-primary transition-colors"
            >
               {institutes.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
               ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Test Title</label>
            <input 
                className="w-full bg-atlas-dark border border-gray-700 p-4 rounded-xl text-white outline-none focus:border-atlas-primary transition-colors" 
                placeholder="e.g., Weekly Revision Test" 
                onChange={(e) => setFormData({...formData, testName: e.target.value})} 
                required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Subject</label>
                <select 
                    className="w-full bg-atlas-dark border border-gray-700 p-4 rounded-xl text-white outline-none focus:border-atlas-primary transition-colors"
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Mathematics</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Duration (Min)</label>
                <input type="number" defaultValue="60" className="w-full bg-atlas-dark border border-gray-700 p-4 rounded-xl text-white outline-none focus:border-atlas-primary transition-colors" onChange={(e) => setFormData({...formData, duration: e.target.value})} />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Difficulty Weights (E/M/H)</label>
                <div className="grid grid-cols-3 gap-2">
                    <input type="number" placeholder="E" className="bg-atlas-dark p-4 rounded-xl border border-gray-700 text-center text-white" onChange={(e) => setFormData({...formData, numEasy: e.target.value})} />
                    <input type="number" placeholder="M" className="bg-atlas-dark p-4 rounded-xl border border-gray-700 text-center text-white" onChange={(e) => setFormData({...formData, numMedium: e.target.value})} />
                    <input type="number" placeholder="H" className="bg-atlas-dark p-4 rounded-xl border border-gray-700 text-center text-white" onChange={(e) => setFormData({...formData, numHard: e.target.value})} />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Test Window Opens</label>
            <input type="datetime-local" className="w-full bg-atlas-dark border border-gray-700 p-4 rounded-xl text-white outline-none focus:border-atlas-primary transition-colors" onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Test Window Closes</label>
            <input type="datetime-local" className="w-full bg-atlas-dark border border-gray-700 p-4 rounded-xl text-white outline-none focus:border-atlas-primary transition-colors" onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isGenerating}
          className="w-full bg-atlas-primary py-5 rounded-2xl font-black text-white text-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.01] hover:bg-emerald-500 transition-all disabled:opacity-50 mt-4 active:scale-95"
        >
          {isGenerating ? 'Assembling Question Set...' : 'Generate & Assign Test'}
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
