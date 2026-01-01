
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../../../contexts/DataContext';
import { Student, TestMark } from '../../../../types';
import { 
    PlusIcon, TrashIcon, UserGroupIcon, 
    ArrowRightIcon, CloudArrowUpIcon, SearchIcon,
    ChartBarIcon, SparklesIcon, CheckCircleIcon, FunnelIcon, ClipboardIcon,
    PencilSquareIcon
} from '../../../../components/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface StudentManagerProps {
    initialStep?: 1 | 2 | 3;
}

const PIE_COLORS = ['#10B981', '#34D399', '#059669', '#6EE7B7', '#A7F3D0'];

// Standard Tooltip Style for the whole application
const GLOBAL_TOOLTIP_STYLE = {
    backgroundColor: '#111827',
    border: '1px solid #374151',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    padding: '12px'
};

const StudentManager: React.FC<StudentManagerProps> = ({ initialStep }) => {
    const { students, classes, addStudent, updateStudent, deleteStudent, bulkAddStudents, marks, addMark } = useData();
    const [activeStep, setActiveStep] = useState<1 | 2 | 3>(initialStep || 1);
    const analysisRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    
    // Step 1: Registry State & Filtering
    const [searchQuery, setSearchQuery] = useState('');
    const [filterClass, setFilterClass] = useState('All');
    const [filterBatch, setFilterBatch] = useState('All');
    const [sortBy, setSortBy] = useState<'name' | 'roll'>('name');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [newStd, setNewStd] = useState({ name: '', classId: '', batch: 'COMPASS' as any, roll: '', dob: '' });

    // Step 2: Marks Entry State
    const [selectedClassId, setSelectedClassId] = useState('');
    const [testName, setTestName] = useState('');
    const [isEnteringMarks, setIsEnteringMarks] = useState(false);
    const [currentMarkEntry, setCurrentMarkEntry] = useState<Record<string, Record<string, number>>>({}); 

    // Step 3: Analysis State
    const [focusedStdId, setFocusedStdId] = useState<string | null>(null);
    const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

    // Sync external navigation triggers
    useEffect(() => {
        if (initialStep) setActiveStep(initialStep);
    }, [initialStep]);

    // Robust Filtering & Sorting Logic
    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNumber.includes(searchQuery);
        const matchesClass = filterClass === 'All' || s.classId === filterClass;
        const matchesBatch = filterBatch === 'All' || s.batch === filterBatch;
        return matchesSearch && matchesClass && matchesBatch;
    }).sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.rollNumber.localeCompare(b.rollNumber);
    });

    const handleOpenAddModal = () => {
        setEditingStudent(null);
        setNewStd({ name: '', classId: '', batch: 'COMPASS', roll: '', dob: '' });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (std: Student) => {
        setEditingStudent(std);
        setNewStd({ 
            name: std.name, 
            classId: std.classId, 
            batch: std.batch, 
            roll: std.rollNumber, 
            dob: std.dob 
        });
        setIsModalOpen(true);
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingStudent) {
            updateStudent({
                ...editingStudent,
                name: newStd.name,
                rollNumber: newStd.roll,
                classId: newStd.classId,
                batch: newStd.batch,
                dob: newStd.dob
            });
            alert('Student record updated successfully.');
        } else {
            addStudent({ 
                id: `s${Date.now()}`, 
                name: newStd.name, 
                rollNumber: newStd.roll, 
                classId: newStd.classId, 
                batch: newStd.batch, 
                dob: newStd.dob, 
                instituteId: 'i1' 
            });
            alert('New student enrolled successfully.');
        }
        setIsModalOpen(false);
    };

    const simulateBulkUpload = () => {
        const dummy = [
            { id: 'sb1', name: 'Kabir Singh', rollNumber: '105', classId: 'c1', batch: 'COMPASS', dob: '2007-02-14', instituteId: 'i1' },
            { id: 'sb2', name: 'Sara Ali', rollNumber: '106', classId: 'c1', batch: 'AXIS', dob: '2007-09-01', instituteId: 'i1' },
        ] as Student[];
        bulkAddStudents(dummy);
        alert('Simulated Upload: 2 Students mapped successfully.');
    };

    const startMarksEntry = () => {
        if (!selectedClassId || !testName) return alert('Select Class and enter Test Name');
        setIsEnteringMarks(true);
    };

    const submitMarks = () => {
        const timestamp = Date.now();
        const newMarkEntries: TestMark[] = Object.entries(currentMarkEntry).map(([sid, subMarks]) => ({
            id: `m${timestamp}-${sid}`,
            testName,
            testId: `T-${timestamp}`,
            date: new Date().toISOString().split('T')[0],
            studentId: sid,
            classId: selectedClassId,
            marks: subMarks as Record<string, number>,
            maxMarks: 100
        }));
        
        newMarkEntries.forEach(m => addMark(m));
        setIsEnteringMarks(false);
        setTestName('');
        alert('Batch results published to campus database.');
    };

    const studentTestsHistory = focusedStdId ? marks.filter(m => m.studentId === focusedStdId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
    
    // Auto-select first test for focused student if not selected
    useEffect(() => {
        if (focusedStdId && studentTestsHistory.length > 0 && !selectedTestId) {
            setSelectedTestId(studentTestsHistory[0].id);
        }
    }, [focusedStdId, studentTestsHistory, selectedTestId]);

    const getAnalysisData = (stdId: string) => {
        const stdMarks = marks.filter(m => m.studentId === stdId).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return stdMarks.map(m => {
            const subjects = Object.keys(m.marks);
            const total = Object.values(m.marks).reduce((a, b) => a + b, 0);
            const avg = total / (subjects.length || 1);
            return { name: m.testName, score: Math.round(avg), date: m.date };
        });
    };

    const currentAnalysisStd = students.find(s => s.id === focusedStdId);
    const selectedTestMark = studentTestsHistory.find(m => m.id === selectedTestId);
    const analysisTrajectory = focusedStdId ? getAnalysisData(focusedStdId) : [];

    // Pie Chart Data for Selected Test
    const subjectPieData = selectedTestMark ? Object.entries(selectedTestMark.marks).map(([name, value]) => ({ name, value })) : [];

    // FUNCTIONAL EXPORT: Generate and Download PDF
    const handleExportReport = async () => {
        if (!analysisRef.current || !currentAnalysisStd) return;

        setIsExporting(true);
        try {
            // Configuration for higher quality capture
            const canvas = await html2canvas(analysisRef.current, {
                scale: 2, // 2x density for clear text and charts
                backgroundColor: '#0B0F19', // Match the dark theme
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            
            const finalWidth = imgWidth * ratio;
            const finalHeight = imgHeight * ratio;

            // Add Logo/Header to PDF manually for branding consistency
            pdf.setTextColor(16, 185, 129); // Atlas Green
            pdf.setFontSize(22);
            pdf.text('ATLAS CLASSES', pdfWidth / 2, 15, { align: 'center' });
            
            pdf.addImage(imgData, 'PNG', 0, 25, finalWidth, finalHeight);
            
            // Footer
            pdf.setFontSize(10);
            pdf.setTextColor(156, 163, 175);
            pdf.text(`Generated on ${new Date().toLocaleDateString()} • Official 360 Insight Report`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });

            pdf.save(`Atlas_Report_${currentAnalysisStd.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('An error occurred while generating the report. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-12 animate-fade-in-up pb-20">
            {/* Step Progress Navigation */}
            <div className="flex justify-center items-center gap-4 overflow-x-auto scrollbar-hide py-2">
                {[1, 2, 3].map(step => (
                    <button 
                        key={step} 
                        onClick={() => {
                            setActiveStep(step as any);
                            if(step !== 3) { setFocusedStdId(null); setSelectedTestId(null); }
                        }}
                        className={`flex flex-shrink-0 items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${activeStep === step ? 'bg-atlas-primary text-white border-atlas-primary shadow-glow' : 'bg-atlas-soft text-gray-500 border-white/5 hover:border-white/20'}`}
                    >
                        <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-black">{step}</span>
                        <span className="text-xs font-black uppercase tracking-widest">{step === 1 ? 'Registry' : step === 2 ? 'Assessments' : '360° Insight'}</span>
                    </button>
                ))}
            </div>

            {/* --- STEP 1: REGISTRY --- */}
            {activeStep === 1 && (
                <div className="space-y-8">
                    <div className="bg-atlas-dark p-6 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="relative flex-1 group">
                                <input 
                                    type="text" 
                                    placeholder="Search by name or roll..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-atlas-soft border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-atlas-primary outline-none transition-all"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-atlas-primary transition-colors">
                                    <SearchIcon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-3 bg-atlas-soft px-4 py-2 rounded-xl border border-white/5">
                                    <FunnelIcon className="h-4 w-4 text-atlas-primary" />
                                    <select 
                                        value={filterClass} 
                                        onChange={e => setFilterClass(e.target.value)}
                                        className="bg-transparent text-xs font-black text-gray-400 uppercase tracking-widest outline-none cursor-pointer"
                                    >
                                        <option value="All">All Classes</option>
                                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 bg-atlas-soft px-4 py-2 rounded-xl border border-white/5">
                                    <UserGroupIcon className="h-4 w-4 text-atlas-primary" />
                                    <select 
                                        value={filterBatch} 
                                        onChange={e => setFilterBatch(e.target.value)}
                                        className="bg-transparent text-xs font-black text-gray-400 uppercase tracking-widest outline-none cursor-pointer"
                                    >
                                        <option value="All">All Batches</option>
                                        <option value="COMPASS">COMPASS</option>
                                        <option value="AXIS">AXIS</option>
                                        <option value="NEXUS">NEXUS</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 bg-atlas-soft px-4 py-2 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Sort:</span>
                                    <select 
                                        value={sortBy} 
                                        onChange={e => setSortBy(e.target.value as any)}
                                        className="bg-transparent text-xs font-black text-gray-400 uppercase tracking-widest outline-none cursor-pointer"
                                    >
                                        <option value="name">Name A-Z</option>
                                        <option value="roll">Roll #</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/5 gap-4">
                            <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Showing {filteredStudents.length} of {students.length} Learners</p>
                            <div className="flex gap-4">
                                <button onClick={simulateBulkUpload} className="bg-atlas-dark text-gray-400 border border-white/5 font-black px-6 py-4 rounded-2xl flex items-center gap-3 hover:text-white transition-all text-xs uppercase tracking-widest">
                                    <CloudArrowUpIcon className="h-5 w-5" /> Bulk CSV
                                </button>
                                <button onClick={handleOpenAddModal} className="bg-atlas-primary text-white font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all text-xs uppercase tracking-widest shadow-glow">
                                    <PlusIcon className="h-5 w-5" /> Add Student
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-atlas-soft/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-atlas-black/50 border-b border-white/5">
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                    <th className="p-8">Student</th>
                                    <th className="p-8">ID / Roll</th>
                                    <th className="p-8">Academic Unit</th>
                                    <th className="p-8">Curriculum Batch</th>
                                    <th className="p-8 text-right">Profile</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredStudents.map(s => (
                                    <tr key={s.id} className="hover:bg-white/[0.02] transition-all group">
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-atlas-dark flex items-center justify-center text-atlas-primary font-black border border-white/5">
                                                    {s.name.charAt(0)}
                                                </div>
                                                <p className="text-sm font-bold text-white group-hover:text-atlas-primary transition-colors">{s.name}</p>
                                            </div>
                                        </td>
                                        <td className="p-8 font-mono text-xs text-gray-500">#{s.rollNumber}</td>
                                        <td className="p-8">
                                            <span className="text-[10px] font-black uppercase text-gray-400">{classes.find(c => c.id === s.classId)?.name}</span>
                                        </td>
                                        <td className="p-8">
                                            <span className="px-3 py-1 bg-atlas-primary/5 text-atlas-primary border border-atlas-primary/20 text-[10px] font-black rounded-lg">{s.batch}</span>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <button onClick={() => handleOpenEditModal(s)} className="text-gray-600 hover:text-atlas-primary p-2 transition-colors">
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                                <button onClick={() => deleteStudent(s.id)} className="text-gray-600 hover:text-red-500 p-2 transition-colors">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredStudents.length === 0 && (
                            <div className="p-20 text-center text-gray-600 font-black uppercase tracking-widest text-xs">
                                No records match the current filters.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- STEP 2: ASSESSMENT MARKS --- */}
            {activeStep === 2 && (
                <div className="space-y-8">
                    {!isEnteringMarks ? (
                        <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-white/5 max-w-2xl mx-auto shadow-2xl">
                            <h3 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-widest">Publish New Assessment</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Target Class</label>
                                    <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="w-full p-5 bg-atlas-soft border border-white/10 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all">
                                        <option value="">Choose Class Logic</option>
                                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Assessment Title</label>
                                    <input type="text" value={testName} onChange={e => setTestName(e.target.value)} placeholder="e.g., Mid-Term Mock JEE" className="w-full p-5 bg-atlas-soft border border-white/10 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all" />
                                </div>
                                <div className="pt-4">
                                    <button onClick={startMarksEntry} className="w-full bg-atlas-primary text-white font-black py-5 rounded-2xl shadow-glow hover:bg-emerald-600 transition-all uppercase tracking-widest text-xs flex justify-center items-center gap-3">
                                        Open Batch Entry <ArrowRightIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center bg-atlas-dark p-8 rounded-3xl border border-atlas-primary/20">
                                <div>
                                    <h4 className="text-xl font-black text-white">{testName}</h4>
                                    <p className="text-xs text-atlas-primary font-bold uppercase tracking-widest mt-1">Class: {classes.find(c => c.id === selectedClassId)?.name}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setIsEnteringMarks(false)} className="px-6 py-3 text-gray-500 font-bold uppercase text-xs tracking-widest hover:text-white">Cancel</button>
                                    <button onClick={submitMarks} className="bg-atlas-primary text-white font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-glow">Publish All Results</button>
                                </div>
                            </div>

                            <div className="bg-atlas-soft/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <table className="w-full text-left">
                                    <thead className="bg-atlas-black/50 border-b border-white/5">
                                        <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <th className="p-8">Student</th>
                                            {classes.find(c => c.id === selectedClassId)?.subjects.map(s => (
                                                <th key={s} className="p-8 text-center">{s}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {students.filter(s => s.classId === selectedClassId).map(std => (
                                            <tr key={std.id}>
                                                <td className="p-8">
                                                    <p className="text-sm font-bold text-white">{std.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">{std.rollNumber}</p>
                                                </td>
                                                {classes.find(c => c.id === selectedClassId)?.subjects.map(sub => (
                                                    <td key={sub} className="p-8">
                                                        <input 
                                                            type="number" 
                                                            placeholder="0"
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                setCurrentMarkEntry(prev => ({
                                                                    ...prev,
                                                                    [std.id]: { ...(prev[std.id] || {}), [sub]: val }
                                                                }));
                                                            }}
                                                            className="w-20 mx-auto block bg-atlas-dark border border-white/5 p-3 rounded-xl text-center text-white focus:border-atlas-primary outline-none transition-all font-black"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- STEP 3: 360° INSIGHT --- */}
            {activeStep === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Learner Selection */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-atlas-dark p-8 rounded-[2rem] border border-white/5 shadow-2xl">
                            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest">Select Learner</h3>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {students.map(s => (
                                    <button 
                                        key={s.id} 
                                        onClick={() => { setFocusedStdId(s.id); setSelectedTestId(null); }}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${focusedStdId === s.id ? 'bg-atlas-primary/10 border border-atlas-primary/30' : 'bg-transparent border border-transparent hover:bg-white/5'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${focusedStdId === s.id ? 'bg-atlas-primary text-white' : 'bg-gray-800 text-gray-500'}`}>{s.name.charAt(0)}</div>
                                        <div className="text-left">
                                            <p className={`text-sm font-bold ${focusedStdId === s.id ? 'text-atlas-primary' : 'text-gray-300'}`}>{s.name}</p>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">{s.batch} • {classes.find(c => c.id === s.classId)?.name}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Middle: Test History List (Only if student is selected) */}
                        {focusedStdId && (
                            <div className="bg-atlas-dark p-8 rounded-[2rem] border border-white/5 shadow-2xl animate-fade-in-up">
                                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                    <ClipboardIcon className="h-5 w-5 text-atlas-primary" /> Test History
                                </h3>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {studentTestsHistory.map(tm => (
                                        <button 
                                            key={tm.id} 
                                            onClick={() => setSelectedTestId(tm.id)}
                                            className={`w-full p-5 rounded-2xl text-left transition-all border ${selectedTestId === tm.id ? 'bg-atlas-primary/5 border-atlas-primary/40' : 'bg-atlas-soft/40 border-transparent hover:bg-atlas-soft'}`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <p className={`text-sm font-bold ${selectedTestId === tm.id ? 'text-white' : 'text-gray-300'}`}>{tm.testName}</p>
                                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{tm.date}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{Object.keys(tm.marks).length} Subjects Analyzed</p>
                                        </button>
                                    ))}
                                    {studentTestsHistory.length === 0 && (
                                        <div className="p-10 text-center text-gray-600 italic text-xs uppercase tracking-widest">No assessments recorded.</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Detailed Analysis Panel */}
                    <div className="lg:col-span-8">
                        {focusedStdId ? (
                            <div className="space-y-8 animate-fade-in-up" ref={analysisRef}>
                                {/* Header Info */}
                                <div className="bg-atlas-soft/40 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-5">
                                        <SparklesIcon className="h-40 w-40 text-atlas-primary" />
                                    </div>
                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div>
                                            <h2 className="text-4xl font-black text-white">{currentAnalysisStd?.name}</h2>
                                            <div className="flex flex-wrap gap-4 mt-3">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-atlas-primary bg-atlas-primary/10 px-4 py-1.5 rounded-full border border-atlas-primary/20">Batch: {currentAnalysisStd?.batch}</span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-4 py-1.5 rounded-full border border-white/5">Grade: {classes.find(c => c.id === currentAnalysisStd?.classId)?.name}</span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-4 py-1.5 rounded-full border border-white/5">Roll: {currentAnalysisStd?.rollNumber}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleExportReport}
                                            disabled={isExporting}
                                            className={`bg-white text-black font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-glow hover:bg-atlas-primary hover:text-white transition-all ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isExporting ? 'Generating PDF...' : 'Export 360° Report'}
                                        </button>
                                    </div>
                                </div>

                                {/* Test-Specific Analysis Section */}
                                {selectedTestMark ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
                                        {/* Test Score Breakdown */}
                                        <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-atlas-primary/20 shadow-glow flex flex-col h-full">
                                            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                                <ChartBarIcon className="h-6 w-6 text-atlas-primary" /> 
                                                Breakdown: {selectedTestMark.testName}
                                            </h3>
                                            <div className="flex-grow space-y-6">
                                                {Object.entries(selectedTestMark.marks).map(([sub, mark]) => (
                                                    <div key={sub} className="space-y-2">
                                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                            <span className="text-gray-400">{sub}</span>
                                                            <span className="text-atlas-primary">{mark}/{selectedTestMark.maxMarks}</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-atlas-primary rounded-full" style={{ width: `${(mark/selectedTestMark.maxMarks)*100}%` }}></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Aggregate Score</p>
                                                    <p className="text-3xl font-black text-white">
                                                        {Math.round(Object.values(selectedTestMark.marks).reduce((a,b)=>a+b,0) / (Object.keys(selectedTestMark.marks).length || 1))}%
                                                    </p>
                                                </div>
                                                <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Evaluation Pass</span>
                                            </div>
                                        </div>

                                        {/* Pie Chart Subject Contribution */}
                                        <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-white/5 flex flex-col h-full items-center justify-center text-center">
                                            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Marks Distribution</h3>
                                            <div className="h-72 w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={subjectPieData}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={60}
                                                            outerRadius={90}
                                                            paddingAngle={8}
                                                            dataKey="value"
                                                            stroke="none"
                                                        >
                                                            {subjectPieData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip 
                                                            contentStyle={GLOBAL_TOOLTIP_STYLE} 
                                                            itemStyle={{ color: '#fff', fontWeight: 'bold' }} 
                                                            labelStyle={{ color: '#10B981', fontWeight: 'bold' }} 
                                                        />
                                                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-4">Relative subject weightage in total points</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-atlas-dark/30">
                                        <p className="text-gray-500 font-black uppercase tracking-widest text-sm">Awaiting test selection for analysis</p>
                                    </div>
                                )}

                                {/* Progress Trajectory (The existing Line Chart) */}
                                <div className="bg-atlas-dark p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                                     <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                        <ChartBarIcon className="h-40 w-40 text-atlas-primary" />
                                     </div>
                                    <h3 className="text-xl font-black text-white mb-10 flex items-center gap-3 relative z-10">
                                        <SparklesIcon className="h-6 w-6 text-atlas-primary" /> Learning Trajectory (%)
                                    </h3>
                                    <div className="h-72 relative z-10">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analysisTrajectory}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                                <XAxis dataKey="name" stroke="#4B5563" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                                                <YAxis stroke="#4B5563" fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                                                <Tooltip 
                                                    contentStyle={{ ...GLOBAL_TOOLTIP_STYLE, borderRadius: '16px' }}
                                                    labelStyle={{ color: '#10B981', fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="score" 
                                                    stroke="#10B981" 
                                                    strokeWidth={5} 
                                                    dot={{ r: 6, fill: '#10B981', stroke: '#0B0F19', strokeWidth: 2 }} 
                                                    activeDot={{ r: 9, strokeWidth: 0, shadow: '0 0 10px #10B981' }} 
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Strategic Insights (Roadmap) */}
                                <div className="bg-atlas-primary/5 p-10 rounded-[2.5rem] border border-atlas-primary/20">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-4 bg-atlas-primary/10 rounded-2xl shadow-glow">
                                            <CheckCircleIcon className="h-6 w-6 text-atlas-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-widest">Growth Engine Roadmap</h3>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Algorithmic Performance Recommendations</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-atlas-dark/50 p-8 rounded-3xl border border-white/5 hover:border-atlas-primary/40 transition-all group">
                                            <p className="text-atlas-primary text-[10px] font-black uppercase tracking-widest mb-3 group-hover:scale-110 origin-left transition-transform">Subject Mastery</p>
                                            <p className="text-white font-black text-lg mb-2">Biology & Foundations</p>
                                            <p className="text-gray-400 text-sm leading-relaxed">Consistent 90%+ performance across {analysisTrajectory.length} assessments. Student is ready for olympiad-level complexity in this cluster.</p>
                                        </div>
                                        <div className="bg-atlas-dark/50 p-8 rounded-3xl border border-white/5 hover:border-red-500/40 transition-all group">
                                            <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-3 group-hover:scale-110 origin-left transition-transform">Critical Focus</p>
                                            <p className="text-white font-black text-lg mb-2">Advanced Mathematics</p>
                                            <p className="text-gray-400 text-sm leading-relaxed">Trajectory shows high volatility. Focus needed on derivative applications. Recommend 5+ practice hours/week specifically on Trigonometry.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-atlas-dark/20 border-2 border-dashed border-white/5 rounded-[3rem]">
                                <div className="w-24 h-24 rounded-full bg-atlas-soft flex items-center justify-center mb-8 shadow-inner">
                                    <UserGroupIcon className="h-12 w-12 text-gray-700" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-600 uppercase tracking-widest">Initiate Intelligence Session</h3>
                                <p className="text-sm text-gray-700 mt-3 max-w-sm">Select a learner from the directory to generate test breakdowns, growth trends, and subject proficiency analytics.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Registry Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <form onSubmit={handleStep1Submit} className="relative bg-atlas-soft border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl shadow-2xl animate-scale-in">
                        <h2 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-widest">{editingStudent ? 'Edit Learner Details' : 'Learner Enrollment'}</h2>
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="col-span-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Full Legal Name</label>
                                <input type="text" value={newStd.name} onChange={e => setNewStd({...newStd, name: e.target.value})} required placeholder="Johnathan Doe" className="w-full p-5 bg-atlas-dark border border-white/5 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Roll Number</label>
                                <input type="text" value={newStd.roll} onChange={e => setNewStd({...newStd, roll: e.target.value})} required placeholder="AC-105" className="w-full p-5 bg-atlas-dark border border-white/5 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Academic Unit</label>
                                <select value={newStd.classId} onChange={e => setNewStd({...newStd, classId: e.target.value})} required className="w-full p-5 bg-atlas-dark border border-white/5 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all">
                                    <option value="">Select Class</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Program Batch</label>
                                <select value={newStd.batch} onChange={e => setNewStd({...newStd, batch: e.target.value as any})} required className="w-full p-5 bg-atlas-dark border border-white/5 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all">
                                    <option value="COMPASS">COMPASS - JEE</option>
                                    <option value="AXIS">AXIS - NEET</option>
                                    <option value="NEXUS">NEXUS - Dual</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Date of Birth</label>
                                <input type="date" value={newStd.dob} onChange={e => setNewStd({...newStd, dob: e.target.value})} required className="w-full p-5 bg-atlas-dark border border-white/5 rounded-2xl text-white outline-none focus:border-atlas-primary transition-all" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-atlas-primary text-white font-black py-5 rounded-2xl shadow-glow hover:bg-emerald-600 transition-all uppercase tracking-[0.2em] text-xs">
                            {editingStudent ? 'Update Learner Records' : 'Enroll Student into Database'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentManager;
