
import React, { useState } from 'react';
import { convertHtmlToTest } from '../../../../services/geminiService';
import { Question, Test } from '../../../../types';
import { SparklesIcon, DocumentTextIcon, ArrowRightIcon, UserGroupIcon, CodeBracketIcon } from '../../../../components/icons';
import { useData } from '../../../../contexts/DataContext';
import { useAuth } from '../../../../contexts/AuthContext';

const AIPaperGenerator: React.FC = () => {
    // Upload State
    const [htmlFile, setHtmlFile] = useState<File | null>(null);
    const [filePreviewName, setFilePreviewName] = useState('');

    // Common State
    const [isLoading, setIsLoading] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<Question[] | null>(null);
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [generatedSubject, setGeneratedSubject] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    // Admin Specific State
    const { addTest, institutes } = useData();
    const [targetInstituteId, setTargetInstituteId] = useState<string>(institutes.length > 0 ? institutes[0].id : '');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'text/html' || file.name.endsWith('.html') || file.name.endsWith('.htm')) {
                setHtmlFile(file);
                setFilePreviewName(file.name);
                setError('');
                setGeneratedQuestions(null);
            } else {
                setError('Please upload a valid HTML file (.html, .htm).');
                setHtmlFile(null);
            }
        }
    };

    const fileToText = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!htmlFile) {
            setError('Please select an HTML file first.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedQuestions(null);

        try {
            const htmlContent = await fileToText(htmlFile);
            // Calling our Gemini Service (which should be connected to a real Gemini implementation or backend)
            const result = await convertHtmlToTest(htmlContent);
            
            if (!result.questions || result.questions.length === 0) {
                throw new Error("No questions detected by AI engine.");
            }

            setGeneratedQuestions(result.questions);
            setGeneratedTitle(result.testTitle || filePreviewName.replace(/\.html?$/, ''));
            setGeneratedSubject(result.subject || 'General');
        } catch (err: any) {
            console.error(err);
            setError(`Extraction Error: ${err.message || 'The AI could not parse this document.'}`);
        }
        setIsLoading(false);
    };

    const handleSaveAsTest = () => {
        if (!generatedQuestions) return;
        if (!targetInstituteId) {
            alert('Please select an institute to assign this test.');
            return;
        }

        const selectedInstituteName = institutes.find(i => i.id === targetInstituteId)?.name || 'Target Institute';

        // Fix: Added missing required 'batch' property to satisfy Test interface
        const newTest: Test = {
            id: `t-ai-${Date.now()}`,
            title: generatedTitle,
            subject: generatedSubject,
            date: new Date().toISOString().split('T')[0],
            status: 'Upcoming',
            instituteId: targetInstituteId,
            batch: 'COMPASS', // Default batch assignment
            pdfFileName: filePreviewName,
            questions: generatedQuestions,
            duration: 60
        };

        addTest(newTest);
        alert(`Test successfully created and assigned to ${selectedInstituteName}!`);
        
        // Reset local state
        setGeneratedQuestions(null);
        setHtmlFile(null);
        setFilePreviewName('');
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                 <div>
                    <h2 className="text-3xl font-black text-white">AI Test Generator</h2>
                    <p className="text-atlas-text-muted text-sm mt-1 uppercase tracking-widest font-bold">Document Digitation Engine</p>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Control Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <form onSubmit={handleGenerate} className="bg-atlas-dark p-6 rounded-3xl border border-gray-800 shadow-xl space-y-6">
                        
                        <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Target Institution</label>
                            <select 
                                value={targetInstituteId} 
                                onChange={(e) => setTargetInstituteId(e.target.value)} 
                                className="w-full p-4 bg-atlas-soft border border-gray-700 rounded-xl focus:border-atlas-primary outline-none text-white text-sm"
                            >
                                {institutes.map(inst => (
                                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="border-t border-gray-800 pt-6">
                            <div className="text-center py-10 border-2 border-dashed border-gray-800 rounded-2xl bg-atlas-soft/30 group hover:border-atlas-primary/50 transition-all cursor-pointer relative">
                                 <input type="file" accept=".html,.htm" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10"/>
                                 <DocumentTextIcon className="h-12 w-12 text-gray-700 mx-auto mb-4 group-hover:text-atlas-primary transition-colors" />
                                 <p className="text-gray-400 font-bold text-sm mb-1">{filePreviewName || 'Upload HTML Source'}</p>
                                 <p className="text-[10px] text-gray-600 uppercase font-black">Click to Browse</p>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full flex justify-center items-center gap-3 bg-atlas-primary py-5 rounded-2xl font-black text-white text-sm uppercase tracking-widest shadow-glow hover:bg-emerald-500 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Extracting Intelligence...</span>
                            ) : (
                                <>
                                    <SparklesIcon className="h-5 w-5" />
                                    <span>Convert to Test</span>
                                </>
                            )}
                        </button>
                        {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
                    </form>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-8 bg-atlas-dark/30 p-8 rounded-3xl border border-gray-800 shadow-2xl min-h-[600px] flex flex-col backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-800">
                        <h3 className="text-xl font-black text-white">Live Extraction Preview</h3>
                        {generatedQuestions && (
                            <button 
                                onClick={handleSaveAsTest}
                                className="flex items-center gap-2 bg-white text-atlas-dark font-black py-3 px-6 rounded-xl hover:bg-atlas-primary hover:text-white transition-all shadow-glow active:scale-95 text-xs uppercase tracking-widest"
                            >
                                <span>Finalize & Assign</span>
                                <ArrowRightIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-6">
                        {isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6">
                                <div className="w-20 h-20 border-4 border-atlas-primary border-t-transparent rounded-full animate-spin shadow-glow"></div>
                                <p className="animate-pulse font-black text-xs uppercase tracking-widest">Generating Digital Diagrams & Mapping Questions...</p>
                            </div>
                        ) : !generatedQuestions ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-40">
                                <DocumentTextIcon className="h-24 w-24 mb-6" />
                                <p className="text-xs uppercase font-black tracking-[0.2em]">Awaiting Source Material</p>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-fade-in-up">
                                <div className="text-center bg-atlas-soft/50 p-8 rounded-3xl border border-gray-800">
                                    <h2 className="text-4xl font-black text-white mb-3">{generatedTitle}</h2>
                                    <div className="flex justify-center gap-3">
                                        <span className="bg-atlas-primary/20 text-atlas-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{generatedSubject}</span>
                                        <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{generatedQuestions.length} Items</span>
                                    </div>
                                </div>
                                
                                {generatedQuestions.map((q, index) => (
                                    <div key={index} className="bg-atlas-soft/20 p-8 rounded-3xl border border-gray-800/50 hover:border-atlas-primary/30 transition-all group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-atlas-dark text-atlas-primary font-black w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 text-sm">{index + 1}</span>
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Section: {q.type}</span>
                                            </div>
                                        </div>
                                        <p className="text-xl text-gray-200 font-bold mb-8 leading-relaxed">{q.question}</p>
                                        
                                        {q.diagramSvg && (
                                             <div className="mb-8 p-6 bg-white rounded-2xl flex items-center justify-center border border-gray-700 shadow-inner">
                                                 <div 
                                                    className="w-full max-w-sm"
                                                    dangerouslySetInnerHTML={{ __html: q.diagramSvg }} 
                                                 />
                                             </div>
                                        )}

                                        {q.options && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {q.options.map((opt, i) => (
                                                    <div key={i} className={`p-5 rounded-2xl border text-sm font-medium transition-all ${opt === q.answer ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-atlas-dark/50 border-gray-800 text-gray-500'}`}>
                                                        <span className="font-black mr-3 opacity-50">{String.fromCharCode(65 + i)}</span> {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="mt-8 pt-6 border-t border-gray-800 flex items-center gap-3">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Correct Response</span>
                                            <span className="text-sm font-black text-atlas-primary">{q.answer}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--brand-accent); }
            `}</style>
        </div>
    );
};

export default AIPaperGenerator;
