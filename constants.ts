
import { Course, FacultyMember, Testimonial, Student, Test, TestResult, Payment, Institute, AdminQuestionPaper } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: 'home' },
  { name: 'Courses', href: 'courses' },
  { name: 'Benefits', href: 'benefits' },
  { name: 'Mission', href: 'mission' },
  { name: 'Team', href: 'faculty' },
  { name: 'Careers', href: 'careers' },
  { name: 'Contact', href: 'contact' },
];

export const COURSES_DATA: Course[] = [
  { id: 1, title: 'COMPASS – Foundation for IIT-JEE', description: 'Focused conceptual foundation for Grades 6–10.' },
  { id: 2, title: 'AXIS – Foundation for NEET', description: 'Specialized medical foundation for Grades 6–10.' },
  { id: 3, title: 'NEXUS – Comprehensive Foundation', description: 'Integrated program covering both streams.' },
];

export const FACULTY_DATA: FacultyMember[] = [
  { id: 1, name: 'Gopala Krishna', subject: 'Academic Head', subjects: ['Curriculum'], photoUrl: 'https://ui-avatars.com/api/?name=Gopala+Krishna&background=10B981&color=fff', bio: 'Academic lead.' },
  { id: 2, name: 'Shaiksha Vali', subject: 'Academic Head', subjects: ['Pedagogy'], photoUrl: 'https://ui-avatars.com/api/?name=Shaiksha+Vali&background=10B981&color=fff', bio: 'Pedagogy expert.' },
  { id: 3, name: 'Rajesh', subject: 'Academic Head', subjects: ['Planning'], photoUrl: 'https://ui-avatars.com/api/?name=Rajesh&background=10B981&color=fff', bio: 'Standardization lead.' },
  { id: 4, name: 'Mokshagna', subject: 'Technical Head', subjects: ['Technology'], photoUrl: 'https://ui-avatars.com/api/?name=Mokshagna&background=10B981&color=fff', bio: 'Tech lead.' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  { id: 1, quote: 'Atlas Classes transformed our learning.', author: 'Principal', title: 'Partner', rating: 5 },
];

export const INSTITUTES_DATA: Institute[] = [
  { id: 'i1', name: 'ABC International School', email: 'institute@atlas.com' }
];

export const INSTITUTE_STUDENTS: Student[] = [
  { id: 's1', name: 'Riya Sharma', instituteId: 'i1', batch: 'COMPASS' },
  { id: 's2', name: 'Aryan Khan', instituteId: 'i1', batch: 'COMPASS' },
  { id: 's3', name: 'Zoya Verma', instituteId: 'i1', batch: 'AXIS' },
  { id: 's4', name: 'Ishaan Gupta', instituteId: 'i1', batch: 'COMPASS' },
  { id: 's5', name: 'Ananya Roy', instituteId: 'i1', batch: 'NEXUS' },
];

export const STUDENT_TESTS: Test[] = [
  { id: 't1', title: 'COMPASS - Weekly Test 1', subject: 'Math & Physics', batch: 'COMPASS', date: '2024-08-05', status: 'Completed', instituteId: 'i1', duration: 60 },
  { id: 't2', title: 'COMPASS - Monthly Cumulative Aug', subject: 'PCM', batch: 'COMPASS', date: '2024-08-25', status: 'Completed', instituteId: 'i1', duration: 180 },
  { id: 't3', title: 'COMPASS - Unit Test: Kinematics', subject: 'Physics', batch: 'COMPASS', date: '2024-09-05', status: 'Completed', instituteId: 'i1', duration: 60 },
  { id: 't4', title: 'COMPASS - Mock Exam: JEE Main', subject: 'PCM', batch: 'COMPASS', date: '2024-09-20', status: 'Completed', instituteId: 'i1', duration: 180 },
  { id: 't5', title: 'COMPASS - Upcoming Revision', subject: 'Chemistry', batch: 'COMPASS', date: '2024-10-05', status: 'Upcoming', instituteId: 'i1', duration: 60 },
];

export const STUDENT_RESULTS: TestResult[] = [
  {
    testId: 't1', studentId: 's1', score: 85, maxScore: 100, rank: 2, totalStudents: 25, grade: 'A', correctCount: 22, wrongCount: 3, unattemptedCount: 0,
    subjectBreakdown: { 
        'Mathematics': { score: 48, maxScore: 50 }, 
        'Physics': { score: 37, maxScore: 50 } 
    }
  },
  {
    testId: 't2', studentId: 's1', score: 245, maxScore: 300, rank: 3, totalStudents: 25, grade: 'A', correctCount: 65, wrongCount: 5, unattemptedCount: 5,
    subjectBreakdown: { 
        'Physics': { score: 82, maxScore: 100 }, 
        'Chemistry': { score: 78, maxScore: 100 }, 
        'Mathematics': { score: 85, maxScore: 100 } 
    }
  },
  {
    testId: 't3', studentId: 's1', score: 92, maxScore: 100, rank: 1, totalStudents: 25, grade: 'A+', correctCount: 23, wrongCount: 2, unattemptedCount: 0,
    subjectBreakdown: { 
        'Physics': { score: 92, maxScore: 100 } 
    }
  },
  {
    testId: 't4', studentId: 's1', score: 275, maxScore: 300, rank: 1, totalStudents: 30, grade: 'A+', correctCount: 70, wrongCount: 2, unattemptedCount: 3,
    subjectBreakdown: { 
        'Physics': { score: 95, maxScore: 100 }, 
        'Chemistry': { score: 88, maxScore: 100 }, 
        'Mathematics': { score: 92, maxScore: 100 } 
    }
  }
];

export const ALL_RESULTS: TestResult[] = [
  ...STUDENT_RESULTS,
  { testId: 't4', studentId: 's2', score: 210, maxScore: 300, rank: 5, totalStudents: 30, grade: 'B', correctCount: 55, wrongCount: 10, unattemptedCount: 10, subjectBreakdown: {} },
  { testId: 't4', studentId: 's4', score: 255, maxScore: 300, rank: 2, totalStudents: 30, grade: 'A', correctCount: 64, wrongCount: 3, unattemptedCount: 8, subjectBreakdown: {} },
];

export const ADMIN_QUESTION_PAPERS: AdminQuestionPaper[] = [];
export const STUDENT_PAYMENTS: Payment[] = [
    { id: 'p1', date: '2024-08-01', amount: 5000, status: 'Paid' },
    { id: 'p2', date: '2024-09-01', amount: 5000, status: 'Due' },
];
