
export interface User {
  id: string;
  name: string;
  role: 'institute' | 'student' | 'admin';
  instituteId?: string;
}

// Added Course interface to resolve export error
export interface Course {
  id: number;
  title: string;
  description: string;
}

// Added FacultyMember interface to resolve export error
export interface FacultyMember {
  id: number;
  name: string;
  subject: string;
  subjects: string[];
  photoUrl: string;
  bio: string;
}

// Added Testimonial interface to resolve export error
export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  rating: number;
}

// Added Student interface to resolve export error
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
  fileContent: string; // Base64 encoded file content
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

// Backend-aligned Attempt structures
export interface TestAttempt {
    id: string;
    testId: string;
    studentId: string;
    startedAt: string;
    completedAt?: string;
    status: 'in_progress' | 'completed' | 'expired';
    score: number;
    maxScore: number;
    rank?: number;
    answers?: AttemptAnswer[];
}

export interface AttemptAnswer {
    questionIndex: number;
    selectedOption: string;
    isCorrect: boolean;
}

export interface TestResult {
    testId: string;
    studentId: string;
    score: number;
    maxScore: number;
    rank: number;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D';
    subjectBreakdown?: {
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
