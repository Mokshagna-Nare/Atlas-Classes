
import React, { useState } from 'react';
import { SparklesIcon, InformationCircleIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';

// Define helper components outside to avoid potential TS/JSX scoping issues where internal components 
// might not correctly inherit prop definitions during JSX transformation.
// Fix: Making children optional to resolve "missing children" errors at call sites in this environment.
const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6 mt-10 first:mt-0">
    <div className="h-px flex-1 bg-gray-800"></div>
    <h3 className="text-sm font-bold text-atlas-primary uppercase tracking-widest">{children}</h3>
    <div className="h-px flex-1 bg-gray-800"></div>
  </div>
);

// Fix: Making children optional to resolve "missing children" errors at call sites in this environment.
const InputLabel = ({ children }: { children?: React.ReactNode }) => (
  <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider mb-2 block ml-1">
    {children}
  </label>
);

const CreateTest: React.FC = () => {
  const { mcqBank } = useData();
  const isBankEmpty = mcqBank.length === 0;

  // Form State
  const [formData, setFormData] = useState({
    // Test Details
    testName: '',
    testCode: '',
    grade: 'Grade 10',
    totalMarks: '',
    duration: '',
    instructions: '',
    // Subject & Section
    sectionName: 'Section A',
    subject: 'Physics',
    sectionMarks: '',
    numQuestions: '',
    sectionTimeLimit: '',
    sectionType: 'Mixed MCQs',
    // Selection Criteria
    topic: 'All Topics',
    difficulty: 'All Levels',
    questionType: 'MCQ – Single Correct',
    // Question Distribution
    numEasy: '',
    numMedium: '',
    numHard: '',
    marksPerQuestion: '',
    // Bloom's Taxonomy (%)
    remember: '0',
    understand: '0',
    apply: '0',
    analyze: '0',
    evaluate: '0',
    create: '0',
    // Test Rules
    questionOrder: 'Sequential',
    optionOrder: 'Fixed',
    negativeMarking: 'None',
    negativePercentage: '0',
    negativeScope: 'Per Question',
    // Availability
    startDate: '',
    endDate: '',
    attemptType: 'Single Attempt'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => {
    if (isBankEmpty) return;
    console.log("Previewing Test with Parameters:", formData);
    alert("Test generation parameters logged to console. In a real app, this would show a draft of the generated paper.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBankEmpty) return;
    console.log("Creating Test in Database:", formData);
    alert("Online test created successfully and added to the scheduled pool!");
  };

  return (
    <div className="max-w-6xl mx-auto reveal-on-scroll">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-2">Create Online Test</h2>
            <p className="text-atlas-text-muted text-sm font-semibold flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-atlas-primary" />
              Automatic test generator using pre-uploaded question bank
            </p>
          </div>
        </div>

        {/* Empty Bank Alert */}
        {isBankEmpty && (
          <div className="bg-atlas-primary/10 border border-atlas-primary/30 p-4 rounded-xl flex items-center gap-4 animate-fade-in-up">
            <div className="bg-atlas-primary/20 p-2 rounded-lg">
              <InformationCircleIcon className="h-6 w-6 text-atlas-primary" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">No questions available</h4>
              <p className="text-atlas-text-muted text-xs">Please upload MCQs via the <span className="text-atlas-primary font-bold">MCQ Upload Panel</span> before creating a test.</p>
            </div>
          </div>
        )}

        <div className={`bg-atlas-soft/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden ${isBankEmpty ? 'opacity-75 grayscale-[0.5]' : ''}`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <SectionTitle>Test Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <InputLabel>Test Name</InputLabel>
                <input 
                  type="text" 
                  name="testName"
                  disabled={isBankEmpty}
                  value={formData.testName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mid-Term Physics Assessment 2025"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Test Code / ID</InputLabel>
                <input 
                  type="text" 
                  name="testCode"
                  disabled={isBankEmpty}
                  value={formData.testCode}
                  onChange={handleInputChange}
                  placeholder="e.g. PHY-10-A"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Class / Grade</InputLabel>
                <select 
                  name="grade"
                  disabled={isBankEmpty}
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              <div>
                <InputLabel>Total Marks</InputLabel>
                <input 
                  type="number" 
                  name="totalMarks"
                  disabled={isBankEmpty}
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Duration (Minutes)</InputLabel>
                <input 
                  type="number" 
                  name="duration"
                  disabled={isBankEmpty}
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="60"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div className="md:col-span-3">
                <InputLabel>Test Instructions</InputLabel>
                <textarea 
                  name="instructions"
                  disabled={isBankEmpty}
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe rules, tools allowed, and behavior expectations..."
                  className="w-full px-4 py-4 bg-atlas-dark border border-gray-700 rounded-2xl focus:outline-none focus:border-atlas-primary text-white resize-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                />
              </div>
            </div>

            <SectionTitle>Subject & Section Division</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputLabel>Section Name</InputLabel>
                <input 
                  type="text" 
                  name="sectionName"
                  disabled={isBankEmpty}
                  value={formData.sectionName}
                  onChange={handleInputChange}
                  placeholder="Section A"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Subject</InputLabel>
                <select 
                  name="subject"
                  disabled={isBankEmpty}
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Mathematics</option>
                </select>
              </div>
              <div>
                <InputLabel>Section Marks</InputLabel>
                <input 
                  type="number" 
                  name="sectionMarks"
                  disabled={isBankEmpty}
                  value={formData.sectionMarks}
                  onChange={handleInputChange}
                  placeholder="25"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>No. of Questions</InputLabel>
                <input 
                  type="number" 
                  name="numQuestions"
                  disabled={isBankEmpty}
                  value={formData.numQuestions}
                  onChange={handleInputChange}
                  placeholder="10"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Time Limit (Min)</InputLabel>
                <input 
                  type="number" 
                  name="sectionTimeLimit"
                  disabled={isBankEmpty}
                  value={formData.sectionTimeLimit}
                  onChange={handleInputChange}
                  placeholder="15"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Section Type</InputLabel>
                <select 
                  name="sectionType"
                  disabled={isBankEmpty}
                  value={formData.sectionType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Mixed MCQs</option>
                  <option>Single Correct Only</option>
                  <option>Numerical Only</option>
                </select>
              </div>
            </div>

            <SectionTitle>Question Selection Criteria</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputLabel>Chapter / Topic</InputLabel>
                <select 
                  name="topic"
                  disabled={isBankEmpty}
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>All Topics</option>
                  <option>Thermodynamics</option>
                  <option>Kinematics</option>
                  <option>Optics</option>
                </select>
              </div>
              <div>
                <InputLabel>Difficulty Level</InputLabel>
                <select 
                  name="difficulty"
                  disabled={isBankEmpty}
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>All Levels</option>
                  <option>Easy Only</option>
                  <option>Medium Only</option>
                  <option>Hard Only</option>
                </select>
              </div>
              <div>
                <InputLabel>Question Type</InputLabel>
                <select 
                  name="questionType"
                  disabled={isBankEmpty}
                  value={formData.questionType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>MCQ – Single Correct</option>
                  <option>MCQ – Multiple Correct</option>
                  <option>Integer Type</option>
                </select>
              </div>
            </div>

            <SectionTitle>Question Distribution (By Difficulty)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <InputLabel>No. of Easy</InputLabel>
                <input 
                  type="number" 
                  name="numEasy"
                  disabled={isBankEmpty}
                  value={formData.numEasy}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>No. of Medium</InputLabel>
                <input 
                  type="number" 
                  name="numMedium"
                  disabled={isBankEmpty}
                  value={formData.numMedium}
                  onChange={handleInputChange}
                  placeholder="4"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>No. of Hard</InputLabel>
                <input 
                  type="number" 
                  name="numHard"
                  disabled={isBankEmpty}
                  value={formData.numHard}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Marks per Question</InputLabel>
                <input 
                  type="number" 
                  name="marksPerQuestion"
                  disabled={isBankEmpty}
                  value={formData.marksPerQuestion}
                  onChange={handleInputChange}
                  placeholder="4"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
            </div>

            <SectionTitle>Bloom’s Taxonomy Distribution (%)</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <InputLabel>Remember</InputLabel>
                <input 
                  type="number" 
                  name="remember"
                  disabled={isBankEmpty}
                  value={formData.remember}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-atlas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-atlas-primary text-white text-center disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Understand</InputLabel>
                <input 
                  type="number" 
                  name="understand"
                  disabled={isBankEmpty}
                  value={formData.understand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-atlas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-atlas-primary text-white text-center disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Apply</InputLabel>
                <input 
                  type="number" 
                  name="apply"
                  disabled={isBankEmpty}
                  value={formData.apply}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-atlas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-atlas-primary text-white text-center disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Analyze</InputLabel>
                <input 
                  type="number" 
                  name="analyze"
                  disabled={isBankEmpty}
                  value={formData.analyze}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-atlas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-atlas-primary text-white text-center disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Evaluate</InputLabel>
                <input 
                  type="number" 
                  name="evaluate"
                  disabled={isBankEmpty}
                  value={formData.evaluate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-atlas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-atlas-primary text-white text-center disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Create</InputLabel>
                <input 
                  type="number" 
                  name="create"
                  disabled={isBankEmpty}
                  value={formData.create}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-atlas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-atlas-primary text-white text-center disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
            </div>

            <SectionTitle>Test Rules</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <InputLabel>Question Order</InputLabel>
                <select 
                  name="questionOrder"
                  disabled={isBankEmpty}
                  value={formData.questionOrder}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Sequential</option>
                  <option>Random</option>
                </select>
              </div>
              <div>
                <InputLabel>Option Order</InputLabel>
                <select 
                  name="optionOrder"
                  disabled={isBankEmpty}
                  value={formData.optionOrder}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Fixed</option>
                  <option>Random</option>
                </select>
              </div>
              <div>
                <InputLabel>Negative Marking</InputLabel>
                <select 
                  name="negativeMarking"
                  disabled={isBankEmpty}
                  value={formData.negativeMarking}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>None</option>
                  <option>Enabled</option>
                </select>
              </div>
              <div>
                <InputLabel>Negative %</InputLabel>
                <input 
                  type="number" 
                  name="negativePercentage"
                  disabled={isBankEmpty}
                  value={formData.negativePercentage}
                  onChange={handleInputChange}
                  placeholder="25"
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Neg. Scope</InputLabel>
                <select 
                  name="negativeScope"
                  disabled={isBankEmpty}
                  value={formData.negativeScope}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Per Question</option>
                  <option>Section-wise</option>
                </select>
              </div>
            </div>

            <SectionTitle>Test Availability</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputLabel>Start Date & Time</InputLabel>
                <input 
                  type="datetime-local" 
                  name="startDate"
                  disabled={isBankEmpty}
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>End Date & Time</InputLabel>
                <input 
                  type="datetime-local" 
                  name="endDate"
                  disabled={isBankEmpty}
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20" 
                />
              </div>
              <div>
                <InputLabel>Attempt Type</InputLabel>
                <select 
                  name="attemptType"
                  disabled={isBankEmpty}
                  value={formData.attemptType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:border-atlas-primary text-white appearance-none text-sm disabled:cursor-not-allowed disabled:bg-atlas-gray/20"
                >
                  <option>Single Attempt</option>
                  <option>Multiple Attempts</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end items-center gap-4 pt-8 border-t border-gray-800">
              <button 
                type="button"
                onClick={handlePreview}
                disabled={isBankEmpty}
                className="px-8 py-3 bg-transparent text-gray-400 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/5 hover:text-white transition-all border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview Test
              </button>
              <button 
                type="submit"
                disabled={isBankEmpty}
                className="px-10 py-4 bg-atlas-primary text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                Create Test
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;