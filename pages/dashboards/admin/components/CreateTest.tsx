
import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, InformationCircleIcon, FlagIcon, XIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6 mt-10 first:mt-0">
    <div className="h-px flex-1 bg-gray-800"></div>
    <h3 className="text-sm font-bold text-atlas-primary uppercase tracking-widest">{children}</h3>
    <div className="h-px flex-1 bg-gray-800"></div>
  </div>
);

const InputLabel = ({ children }: { children?: React.ReactNode }) => (
  <label className="text-xs font-bold text-atlas-text-muted uppercase tracking-wider mb-2 block ml-1">
    {children}
  </label>
);

const ErrorText = ({ message }: { message?: string }) => (
  message ? (
    <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1 flex items-center gap-1 animate-fade-in-up">
      <XIcon className="h-3 w-3" /> {message}
    </p>
  ) : null
);

const CreateTest: React.FC = () => {
  const { mcqBank } = useData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  
  // Logical calculations for flagging
  const eligibleQuestions = mcqBank.filter(q => !q.isFlagged);
  const totalQuestions = mcqBank.length;
  const totalEligible = eligibleQuestions.length;
  const isBankEmpty = totalEligible === 0;

  // Form State
  const [formData, setFormData] = useState({
    testName: '',
    testCode: '',
    grade: 'Grade 10',
    totalMarks: '',
    duration: '',
    instructions: '',
    sectionName: 'Section A',
    subject: 'Physics',
    sectionMarks: '',
    numQuestions: '',
    sectionTimeLimit: '',
    sectionType: 'Mixed MCQs',
    topic: 'All Topics',
    difficulty: 'All Levels',
    questionType: 'MCQ – Single Correct',
    numEasy: '0',
    numMedium: '0',
    numHard: '0',
    marksPerQuestion: '4',
    remember: '0',
    understand: '0',
    apply: '0',
    analyze: '0',
    evaluate: '0',
    create: '0',
    questionOrder: 'Sequential',
    optionOrder: 'Fixed',
    negativeMarking: 'None',
    negativePercentage: '0',
    negativeScope: 'Per Question',
    startDate: '',
    endDate: '',
    attemptType: 'Single Attempt'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this specific field as user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Basic Required Fields
    if (!formData.testName.trim()) newErrors.testName = "Please enter a test name.";
    if (!formData.testCode.trim()) newErrors.testCode = "Test code is required.";
    if (!formData.totalMarks || parseInt(formData.totalMarks) <= 0) newErrors.totalMarks = "Total marks is required and must be positive.";
    if (!formData.duration || parseInt(formData.duration) <= 0) newErrors.duration = "Test duration is required.";
    
    // 2. Question Distribution Validation
    const easyReq = parseInt(formData.numEasy) || 0;
    const medReq = parseInt(formData.numMedium) || 0;
    const hardReq = parseInt(formData.numHard) || 0;

    if (easyReq < 0) newErrors.numEasy = "Enter a non-negative number.";
    if (medReq < 0) newErrors.numMedium = "Enter a non-negative number.";
    if (hardReq < 0) newErrors.numHard = "Enter a non-negative number.";

    if (easyReq === 0 && medReq === 0 && hardReq === 0) {
      newErrors.numEasy = "At least one question must be added.";
    }

    // 3. Availability Check (respecting unflagged questions)
    if (!isBankEmpty) {
      const subjectPool = eligibleQuestions.filter(q => q.subject === formData.subject);
      const availableEasy = subjectPool.filter(q => q.difficulty === 'Easy').length;
      const availableMedium = subjectPool.filter(q => q.difficulty === 'Medium').length;
      const availableHard = subjectPool.filter(q => q.difficulty === 'Hard').length;

      if (easyReq > availableEasy) newErrors.numEasy = `Not enough unflagged questions. Available: ${availableEasy}`;
      if (medReq > availableMedium) newErrors.numMedium = `Not enough unflagged questions. Available: ${availableMedium}`;
      if (hardReq > availableHard) newErrors.numHard = `Not enough unflagged questions. Available: ${availableHard}`;
    }

    // 4. Date Validation
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start >= end) {
        newErrors.endDate = "End date must be after start date.";
      }
    }

    setErrors(newErrors);

    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      // Scroll to the first error field for better UX
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }

    return !hasErrors;
  };

  const handlePreview = () => {
    if (isBankEmpty) return;
    if (validate()) {
      console.log("Previewing Test Configuration:", formData);
      alert("Test parameters are valid. Preview generated in console.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBankEmpty) return;
    if (validate()) {
      console.log("Creating Test in Database:", formData);
      alert("Online test created successfully using eligible unflagged questions!");
    }
  };

  // Helper to generate dynamic classes based on error state
  const getFieldClass = (name: string) => {
    const baseClass = "w-full px-4 py-3 bg-atlas-dark border rounded-xl focus:outline-none focus:ring-1 transition-all text-white disabled:cursor-not-allowed disabled:bg-atlas-gray/20 placeholder-gray-600";
    const errorClass = errors[name] 
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
      : "border-gray-700 focus:border-atlas-primary focus:ring-atlas-primary";
    return `${baseClass} ${errorClass}`;
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
              Automatic test generator using pre-uploaded unflagged bank
            </p>
          </div>
        </div>

        {/* Bank Status Banner */}
        <div className="bg-atlas-gray/40 border border-gray-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="bg-atlas-dark p-3 rounded-2xl border border-gray-800">
                    <InformationCircleIcon className="h-8 w-8 text-atlas-primary" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg">Question Bank Status</h4>
                    <p className="text-atlas-text-muted text-xs">Only eligible (unflagged) questions are used for generation.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="text-center px-6 border-r border-gray-800">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Items</p>
                    <p className="text-2xl font-black text-white">{totalQuestions}</p>
                </div>
                <div className="text-center px-6">
                    <p className="text-[10px] text-atlas-primary font-bold uppercase tracking-widest mb-1">Eligible Pool</p>
                    <p className="text-2xl font-black text-atlas-primary">{totalEligible}</p>
                </div>
            </div>
        </div>

        {/* Empty Bank Alert */}
        {isBankEmpty && (
          <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-xl flex items-center gap-4 animate-fade-in-up">
            <div className="bg-red-500/20 p-2 rounded-lg">
              <FlagIcon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">No eligible questions found</h4>
              <p className="text-atlas-text-muted text-xs">Ensure you have uploaded MCQs and that they are not flagged for review.</p>
            </div>
          </div>
        )}

        <div className={`bg-atlas-soft/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-opacity ${isBankEmpty ? 'opacity-75 grayscale-[0.5]' : ''}`}>
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            
            <SectionTitle>Test Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <InputLabel>Test Name*</InputLabel>
                <input 
                  type="text" 
                  name="testName"
                  disabled={isBankEmpty}
                  value={formData.testName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mid-Term Physics Assessment 2025"
                  className={getFieldClass('testName')} 
                />
                <ErrorText message={errors.testName} />
              </div>
              <div>
                <InputLabel>Test Code / ID*</InputLabel>
                <input 
                  type="text" 
                  name="testCode"
                  disabled={isBankEmpty}
                  value={formData.testCode}
                  onChange={handleInputChange}
                  placeholder="e.g. PHY-10-A"
                  className={getFieldClass('testCode')} 
                />
                <ErrorText message={errors.testCode} />
              </div>
              <div>
                <InputLabel>Class / Grade*</InputLabel>
                <select 
                  name="grade"
                  disabled={isBankEmpty}
                  value={formData.grade}
                  onChange={handleInputChange}
                  className={getFieldClass('grade')}
                >
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              <div>
                <InputLabel>Total Marks*</InputLabel>
                <input 
                  type="number" 
                  name="totalMarks"
                  disabled={isBankEmpty}
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  placeholder="100"
                  className={getFieldClass('totalMarks')} 
                />
                <ErrorText message={errors.totalMarks} />
              </div>
              <div>
                <InputLabel>Duration (Minutes)*</InputLabel>
                <input 
                  type="number" 
                  name="duration"
                  disabled={isBankEmpty}
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="60"
                  className={getFieldClass('duration')} 
                />
                <ErrorText message={errors.duration} />
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
                  className={getFieldClass('sectionName')} 
                />
              </div>
              <div>
                <InputLabel>Subject*</InputLabel>
                <select 
                  name="subject"
                  disabled={isBankEmpty}
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={getFieldClass('subject')}
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
                  className={getFieldClass('sectionMarks')} 
                />
              </div>
            </div>

            <SectionTitle>Question Distribution (By Difficulty)*</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <InputLabel>No. of Easy</InputLabel>
                <input 
                  type="number" 
                  name="numEasy"
                  disabled={isBankEmpty}
                  value={formData.numEasy}
                  onChange={handleInputChange}
                  className={getFieldClass('numEasy')} 
                />
                <ErrorText message={errors.numEasy} />
              </div>
              <div>
                <InputLabel>No. of Medium</InputLabel>
                <input 
                  type="number" 
                  name="numMedium"
                  disabled={isBankEmpty}
                  value={formData.numMedium}
                  onChange={handleInputChange}
                  className={getFieldClass('numMedium')} 
                />
                <ErrorText message={errors.numMedium} />
              </div>
              <div>
                <InputLabel>No. of Hard</InputLabel>
                <input 
                  type="number" 
                  name="numHard"
                  disabled={isBankEmpty}
                  value={formData.numHard}
                  onChange={handleInputChange}
                  className={getFieldClass('numHard')} 
                />
                <ErrorText message={errors.numHard} />
              </div>
              <div>
                <InputLabel>Marks per Question</InputLabel>
                <input 
                  type="number" 
                  name="marksPerQuestion"
                  disabled={isBankEmpty}
                  value={formData.marksPerQuestion}
                  onChange={handleInputChange}
                  className={getFieldClass('marksPerQuestion')} 
                />
              </div>
            </div>

            <SectionTitle>Test Availability*</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputLabel>Start Date & Time</InputLabel>
                <input 
                  type="datetime-local" 
                  name="startDate"
                  disabled={isBankEmpty}
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={getFieldClass('startDate')} 
                />
                <ErrorText message={errors.startDate} />
              </div>
              <div>
                <InputLabel>End Date & Time</InputLabel>
                <input 
                  type="datetime-local" 
                  name="endDate"
                  disabled={isBankEmpty}
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={getFieldClass('endDate')} 
                />
                <ErrorText message={errors.endDate} />
              </div>
              <div>
                <InputLabel>Attempt Type</InputLabel>
                <select 
                  name="attemptType"
                  disabled={isBankEmpty}
                  value={formData.attemptType}
                  onChange={handleInputChange}
                  className={getFieldClass('attemptType')}
                >
                  <option>Single Attempt</option>
                  <option>Multiple Attempts</option>
                </select>
              </div>
            </div>

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
                className="px-10 py-4 bg-atlas-primary text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
