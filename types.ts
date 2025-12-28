
export interface User {
  id: string;
  name: string;
  role: 'institute' | 'student' | 'admin';
  instituteId?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  subject: string;
  subjects: string[];
  photoUrl: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export interface Student {
  id: string;
  name: string;
  instituteId: string;
}

export interface Institute {
  id: string;
  name: string;
  email: string;
}

export interface AdminQuestionPaper {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';
  fileName: string;
  accessibleInstituteIds: string[];
  fileContent: string; 
  mimeType: string;
}

export interface MCQ extends Question {
  subject: string;
  topic: string;
  difficulty: string;
  marks: number;
  isFlagged: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id?: string;
  question: string;
  subject?: string;
  type: 'Multiple Choice' | 'Short Answer' | 'True/False';
  options?: string[];
  answer: string;
  explanation?: string;
  diagramDescription?: string;
  diagramSvg?: string;
}

export interface Test {
    id: string;
    title: string;
    date: string;
    status: 'Upcoming' | 'Completed' | 'Assigned';
    instituteId: string;
    subject: string;
    pdfFileName?: string;
    questions?: Question[];
    duration?: number;
}

export interface TestResult {
    testId: string;
    studentId: string;
    score: number;
    maxScore: number;
    rank: number;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D';
    correctCount: number;
    wrongCount: number;
    unattemptedCount: number;
    subjectBreakdown: {
      [subject: string]: {
        score: number;
        maxScore: number;
      }
    };
    studentAnswers?: Record<string, string>;
}

export interface Payment {
    id: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Due';
}
