
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Test, TestResult, Payment, Institute, AdminQuestionPaper, 
  AcademicClass, WeeklySchedule, Student, TestMark, MCQ 
} from '../types';
import { 
  STUDENT_TESTS, ALL_RESULTS, STUDENT_PAYMENTS, INSTITUTES_DATA, 
  ADMIN_QUESTION_PAPERS, INSTITUTE_STUDENTS 
} from '../constants';

interface DataContextType {
  // Global / Legacy
  tests: Test[];
  results: TestResult[];
  payments: Payment[];
  institutes: Institute[];
  adminQuestionPapers: AdminQuestionPaper[];
  mcqBank: MCQ[];
  
  // New Institute Entities
  classes: AcademicClass[];
  schedules: WeeklySchedule[];
  students: Student[];
  marks: TestMark[];

  // Operations
  addTest: (test: Test) => void;
  editTest: (test: Test) => void;
  deleteTest: (testId: string) => void;
  updateTestStatus: (testId: string, status: Test['status']) => void;
  addTestResult: (result: TestResult) => void;
  
  updatePaymentStatus: (paymentId: string, status: Payment['status']) => void;
  
  addInstitute: (inst: Partial<Institute>) => void;
  updateInstitute: (inst: Institute) => void;
  deleteInstitute: (id: string) => void;
  
  addAdminQuestionPaper: (paper: AdminQuestionPaper) => void;
  
  addClass: (cls: AcademicClass) => void;
  updateClass: (cls: AcademicClass) => void;
  deleteClass: (id: string) => void;
  
  addSchedule: (sch: WeeklySchedule) => void;
  deleteSchedule: (id: string) => void;
  
  addStudent: (std: Student) => void;
  updateStudent: (std: Student) => void;
  deleteStudent: (id: string) => void;
  bulkAddStudents: (stds: Student[]) => void;
  
  addMark: (mark: TestMark) => void;
  bulkAddMarks: (marks: TestMark[]) => void;

  // MCQ Operations
  addMCQ: (mcq: MCQ) => void;
  updateMCQ: (id: string, mcq: Partial<MCQ>) => void;
  deleteMCQ: (id: string) => void;
  flagMCQ: (id: string, reason: string) => void;
  unflagMCQ: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Simulated "Database" State ---
  const [tests, setTests] = useState<Test[]>(STUDENT_TESTS);
  const [results, setResults] = useState<TestResult[]>(ALL_RESULTS);
  // Fix: Added missing setter functions for payments, institutes, adminQuestionPapers, and mcqBank to satisfy handlers below
  const [payments, setPayments] = useState<Payment[]>(STUDENT_PAYMENTS);
  const [institutes, setInstitutes] = useState<Institute[]>(INSTITUTES_DATA);
  const [adminQuestionPapers, setAdminQuestionPapers] = useState<AdminQuestionPaper[]>(ADMIN_QUESTION_PAPERS);
  const [mcqBank, setMcqBank] = useState<MCQ[]>([]);

  // Simplified Class Naming (Class 6 to 10 only)
  const [classes, setClasses] = useState<AcademicClass[]>([
    { id: 'c6', name: 'Class 6', subjects: ['Mathematics', 'Science', 'Social'] },
    { id: 'c7', name: 'Class 7', subjects: ['Mathematics', 'Science', 'Social'] },
    { id: 'c8', name: 'Class 8', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'] },
    { id: 'c9', name: 'Class 9', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'] },
    { id: 'c10', name: 'Class 10', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'] },
  ]);

  const [schedules, setSchedules] = useState<WeeklySchedule[]>([
    { id: 'sc1', classId: 'c10', weekNumber: 1, subject: 'Physics', topic: 'Light Reflection and Refraction' },
    { id: 'sc2', classId: 'c9', weekNumber: 1, subject: 'Mathematics', topic: 'Number Systems' },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: 's1', name: 'Riya Sharma', rollNumber: '101', classId: 'c10', batch: 'COMPASS', dob: '2009-05-12', instituteId: 'i1' },
    { id: 's2', name: 'Aryan Khan', rollNumber: '102', classId: 'c10', batch: 'AXIS', dob: '2009-08-20', instituteId: 'i1' },
    { id: 's3', name: 'Zoya Verma', rollNumber: '201', classId: 'c9', batch: 'NEXUS', dob: '2010-11-15', instituteId: 'i1' },
    { id: 's4', name: 'Ishaan Gupta', rollNumber: '103', classId: 'c8', batch: 'COMPASS', dob: '2011-04-10', instituteId: 'i1' },
  ]);

  const [marks, setMarks] = useState<TestMark[]>([
    { 
      id: 'm1', testName: 'Unit Test 1', testId: 'UT-01', date: '2024-07-10', 
      studentId: 's1', classId: 'c10', 
      marks: { 'Mathematics': 85, 'Physics': 78, 'Chemistry': 92, 'Biology': 88 }, maxMarks: 100 
    },
    { 
      id: 'm2', testName: 'Revision Quiz', testId: 'RQ-01', date: '2024-08-15', 
      studentId: 's1', classId: 'c10', 
      marks: { 'Mathematics': 92, 'Physics': 82, 'Chemistry': 78, 'Biology': 95 }, maxMarks: 100 
    },
    { 
      id: 'm3', testName: 'Monthly Cumulative', testId: 'MC-01', date: '2024-09-05', 
      studentId: 's1', classId: 'c10', 
      marks: { 'Mathematics': 88, 'Physics': 90, 'Chemistry': 85, 'Biology': 82 }, maxMarks: 100 
    }
  ]);

  // --- Handlers ---
  const addTest = (newTest: Test) => setTests(prev => [...prev, newTest]);
  const editTest = (updatedTest: Test) => setTests(prev => prev.map(t => t.id === updatedTest.id ? updatedTest : t));
  const deleteTest = (testId: string) => setTests(prev => prev.filter(t => t.id !== testId));
  const updateTestStatus = (testId: string, status: Test['status']) => setTests(prev => prev.map(t => t.id === testId ? {...t, status} : t));
  const addTestResult = (res: TestResult) => setResults(prev => [...prev, res]);

  // Fix: Correctly using setPayments setter
  const updatePaymentStatus = (id: string, status: Payment['status']) => setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));

  // Fix: Correctly using setInstitutes setter
  const addInstitute = (inst: Partial<Institute>) => setInstitutes(prev => [...prev, { id: `i${Date.now()}`, name: inst.name!, email: inst.email! }]);
  // Fix: Correctly using setInstitutes setter
  const updateInstitute = (inst: Institute) => setInstitutes(prev => prev.map(i => i.id === inst.id ? inst : i));
  // Fix: Correctly using setInstitutes setter
  const deleteInstitute = (id: string) => setInstitutes(prev => prev.filter(i => i.id !== id));

  // Fix: Correctly using setAdminQuestionPapers setter
  const addAdminQuestionPaper = (paper: AdminQuestionPaper) => setAdminQuestionPapers(prev => [...prev, paper]);

  const addClass = (cls: AcademicClass) => setClasses(prev => [...prev, cls]);
  const updateClass = (cls: AcademicClass) => setClasses(prev => prev.map(c => c.id === cls.id ? cls : c));
  const deleteClass = (id: string) => setClasses(prev => prev.filter(c => c.id !== id));

  const addSchedule = (sch: WeeklySchedule) => setSchedules(prev => [...prev, sch]);
  const deleteSchedule = (id: string) => setSchedules(prev => prev.filter(s => s.id !== id));

  const addStudent = (std: Student) => setStudents(prev => [...prev, std]);
  const updateStudent = (std: Student) => setStudents(prev => prev.map(s => s.id === std.id ? std : s));
  const deleteStudent = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));
  const bulkAddStudents = (stds: Student[]) => setStudents(prev => [...prev, ...stds]);

  const addMark = (mark: TestMark) => setMarks(prev => [...prev, mark]);
  const bulkAddMarks = (newMarks: TestMark[]) => setMarks(prev => [...prev, ...newMarks]);

  // MCQ Handlers
  // Fix: Correctly using setMcqBank setter
  const addMCQ = (mcq: MCQ) => setMcqBank(prev => [...prev, mcq]);
  // Fix: Correctly using setMcqBank setter
  const updateMCQ = (id: string, updated: Partial<MCQ>) => setMcqBank(prev => prev.map(q => q.id === id ? { ...q, ...updated } : q as MCQ));
  // Fix: Correctly using setMcqBank setter
  const deleteMCQ = (id: string) => setMcqBank(prev => prev.filter(q => q.id !== id));
  // Fix: Correctly using setMcqBank setter
  const flagMCQ = (id: string, reason: string) => setMcqBank(prev => prev.map(q => q.id === id ? { ...q, isFlagged: true, flagReason: reason } : q));
  // Fix: Correctly using setMcqBank setter
  const unflagMCQ = (id: string) => setMcqBank(prev => prev.map(q => q.id === id ? { ...q, isFlagged: false, flagReason: '' } : q));

  return (
    <DataContext.Provider value={{ 
        tests, results, payments, institutes, adminQuestionPapers, mcqBank,
        classes, schedules, students, marks,
        addTest, editTest, deleteTest, updateTestStatus, addTestResult,
        updatePaymentStatus,
        addInstitute, updateInstitute, deleteInstitute,
        addAdminQuestionPaper,
        addClass, updateClass, deleteClass,
        addSchedule, deleteSchedule,
        addStudent, updateStudent, deleteStudent, bulkAddStudents,
        addMark, bulkAddMarks,
        addMCQ, updateMCQ, deleteMCQ, flagMCQ, unflagMCQ
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
