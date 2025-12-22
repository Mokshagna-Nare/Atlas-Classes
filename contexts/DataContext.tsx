
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Test, TestResult, Payment, Institute, AdminQuestionPaper, MCQ } from '../types';
import { STUDENT_TESTS, ALL_RESULTS, STUDENT_PAYMENTS, INSTITUTES_DATA, ADMIN_QUESTION_PAPERS } from '../constants';

interface DataContextType {
  tests: Test[];
  results: TestResult[];
  payments: Payment[];
  institutes: Institute[];
  adminQuestionPapers: AdminQuestionPaper[];
  mcqBank: MCQ[];
  addTest: (test: Test) => void;
  editTest: (updatedTest: Test) => void;
  deleteTest: (testId: string) => void;
  addTestResult: (result: TestResult) => void;
  updateTestStatus: (testId: string, status: Test['status']) => void;
  updatePaymentStatus: (paymentId: string, status: Payment['status']) => void;
  updateInstitute: (updatedInstitute: Institute) => void;
  addAdminQuestionPaper: (paper: AdminQuestionPaper) => void;
  addInstitute: (institute: Omit<Institute, 'id'>) => void;
  deleteInstitute: (instituteId: string) => void;
  addMCQ: (mcq: MCQ) => void;
  updateMCQ: (id: string, updates: Partial<MCQ>) => void;
  deleteMCQ: (id: string) => void;
  flagMCQ: (id: string, reason?: string) => void;
  unflagMCQ: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tests, setTests] = useState<Test[]>(STUDENT_TESTS);
  const [results, setResults] = useState<TestResult[]>(ALL_RESULTS);
  const [payments, setPayments] = useState<Payment[]>(STUDENT_PAYMENTS);
  const [institutes, setInstitutes] = useState<Institute[]>(INSTITUTES_DATA);
  const [adminQuestionPapers, setAdminQuestionPapers] = useState<AdminQuestionPaper[]>(ADMIN_QUESTION_PAPERS);
  const [mcqBank, setMcqBank] = useState<MCQ[]>([]);

  const addTest = (newTest: Test) => setTests(prev => [...prev, newTest]);
  const editTest = (updatedTest: Test) => setTests(prev => prev.map(t => t.id === updatedTest.id ? updatedTest : t));
  const deleteTest = (testId: string) => setTests(prev => prev.filter(t => t.id !== testId));
  const addTestResult = (newResult: TestResult) => setResults(prev => [...prev, newResult]);
  const updateTestStatus = (testId: string, status: Test['status']) => setTests(prev => prev.map(t => t.id === testId ? {...t, status} : t));
  const updatePaymentStatus = (paymentId: string, status: Payment['status']) => setPayments(prev => prev.map(p => p.id === paymentId ? {...p, status} : p));
  const updateInstitute = (updatedInstitute: Institute) => setInstitutes(prev => prev.map(inst => inst.id === updatedInstitute.id ? updatedInstitute : inst));
  const addAdminQuestionPaper = (paper: AdminQuestionPaper) => setAdminQuestionPapers(prev => [...prev, paper]);
  const addInstitute = (institute: Omit<Institute, 'id'>) => {
    setInstitutes(prev => [...prev, { id: `i${Date.now()}`, ...institute }]);
  };
  const deleteInstitute = (instituteId: string) => setInstitutes(prev => prev.filter(inst => inst.id !== instituteId));

  const addMCQ = (mcq: MCQ) => setMcqBank(prev => [...prev, mcq]);
  const updateMCQ = (id: string, updates: Partial<MCQ>) => {
    setMcqBank(prev => prev.map(m => m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m));
  };
  const deleteMCQ = (id: string) => setMcqBank(prev => prev.filter(m => m.id !== id));
  const flagMCQ = (id: string, reason?: string) => updateMCQ(id, { isFlagged: true, flagReason: reason });
  const unflagMCQ = (id: string) => updateMCQ(id, { isFlagged: false, flagReason: undefined });

  return (
    <DataContext.Provider value={{ 
        tests, results, payments, institutes, adminQuestionPapers, mcqBank,
        addTest, editTest, deleteTest, addTestResult, updateTestStatus, updatePaymentStatus,
        updateInstitute, addAdminQuestionPaper, addInstitute, deleteInstitute,
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