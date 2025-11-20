
export interface User {
  id: string;
  name: string;
  role: 'institute' | 'student' | 'admin';
  instituteId?: string;
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

export interface FacultyMember {
  id: number;
  name: string;
  subject: string;
  subjects: string[];
  experience: string;
  photoUrl: string;
  qualifications: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  instituteId: string;
}

export interface Test {
    id: string;
    title: string;
    date: string;
    status: 'Upcoming' | 'Completed' | 'Assigned';
    instituteId: string;
    subject: string;
    pdfFileName?: string;
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
}

export interface Payment {
    id: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Due';
}

export interface Question {
  question: string;
  type: 'Multiple Choice' | 'Short Answer' | 'True/False';
  options?: string[];
  answer: string;
}