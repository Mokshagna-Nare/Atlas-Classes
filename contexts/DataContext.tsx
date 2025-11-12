import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Test, TestResult, Payment } from '../types';
import { STUDENT_TESTS, ALL_RESULTS, STUDENT_PAYMENTS } from '../constants';

interface DataContextType {
  tests: Test[];
  results: TestResult[];
  payments: Payment[];
  addTest: (test: Test) => void;
  editTest: (updatedTest: Test) => void;
  deleteTest: (testId: string) => void;
  addTestResult: (result: TestResult) => void;
  updateTestStatus: (testId: string, status: Test['status']) => void;
  updatePaymentStatus: (paymentId: string, status: Payment['status']) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tests, setTests] = useState<Test[]>(STUDENT_TESTS);
  const [results, setResults] = useState<TestResult[]>(ALL_RESULTS);
  const [payments, setPayments] = useState<Payment[]>(STUDENT_PAYMENTS);

  const addTest = (newTest: Test) => {
    setTests(prevTests => [...prevTests, newTest]);
  };

  const editTest = (updatedTest: Test) => {
    setTests(prevTests => prevTests.map(test => test.id === updatedTest.id ? updatedTest : test));
  };

  const deleteTest = (testId: string) => {
    setTests(prevTests => prevTests.filter(test => test.id !== testId));
  };

  const addTestResult = (newResult: TestResult) => {
    setResults(prevResults => [...prevResults, newResult]);
    // Also update ALL_RESULTS for the analysis page to use it
    // In a real app this would be a single source of truth
    ALL_RESULTS.push(newResult);
  };

  const updateTestStatus = (testId: string, status: Test['status']) => {
      setTests(prevTests => prevTests.map(t => t.id === testId ? {...t, status} : t));
  }

  const updatePaymentStatus = (paymentId: string, status: Payment['status']) => {
    setPayments(prevPayments => prevPayments.map(p => p.id === paymentId ? {...p, status} : p));
  }

  return (
    <DataContext.Provider value={{ tests, results, payments, addTest, editTest, deleteTest, addTestResult, updateTestStatus, updatePaymentStatus }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};