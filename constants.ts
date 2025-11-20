
import { Course, FacultyMember, Testimonial, Student, Test, TestResult, Payment, Institute, AdminQuestionPaper } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: 'home' },
  { name: 'Courses', href: 'courses' },
  { name: 'Benefits', href: 'benefits' },
  { name: 'Mission', href: 'mission' },
  { name: 'Faculty', href: 'faculty' },
  { name: 'Careers', href: 'careers' },
  { name: 'Contact', href: 'contact' },
];

export const COURSES_DATA: Course[] = [
  {
    id: 1,
    title: 'COMPASS – Foundation for IIT-JEE',
    description: 'Focused conceptual foundation for Grades 6–10 aspiring for IIT-JEE, building strong analytical and problem-solving skills from an early age.',
  },
  {
    id: 2,
    title: 'AXIS – Foundation for NEET',
    description: 'Specialized medical foundation for Grades 6–10 aligned with NEET preparation, emphasizing biology, chemistry, and physics.',
  },
  {
    id: 3,
    title: 'NEXUS – Comprehensive Foundation',
    description: 'An integrated program covering both IIT-JEE and NEET base subjects, offering a holistic approach for students exploring both streams.',
  },
];

export const FACULTY_DATA: FacultyMember[] = [
  { id: 1, name: 'Dr. Ananya Sharma', subject: 'Physics', subjects: ['Mechanics', 'Electromagnetism', 'Optics'], experience: '15+ Years', photoUrl: 'https://picsum.photos/id/1027/100/100', qualifications: 'Ph.D. in Astrophysics', bio: 'Dr. Sharma is a passionate physicist with over 15 years of experience in making complex concepts accessible. Her research in quantum mechanics has been published in several international journals. She believes in fostering a deep curiosity for the physical world in her students.' },
  { id: 2, name: 'Prof. Rohan Verma', subject: 'Chemistry', subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'], experience: '12+ Years', photoUrl: 'https://picsum.photos/id/1005/100/100', qualifications: 'M.Sc. in Organic Chemistry', bio: 'Professor Verma specializes in organic chemistry and is known for his engaging teaching style and hands-on lab sessions. He has a knack for simplifying complex reaction mechanisms and has mentored numerous students for national science olympiads.' },
  { id: 3, name: 'Ms. Priya Singh', subject: 'Mathematics', subjects: ['Algebra', 'Calculus', 'Trigonometry'], experience: '10+ Years', photoUrl: 'https://picsum.photos/id/1025/100/100', qualifications: 'M.A. in Mathematics', bio: 'Ms. Singh is a dedicated mathematics educator who focuses on building strong foundational skills. She uses real-world examples to make abstract mathematical concepts relatable and has a proven track record of helping students overcome their fear of math.' },
  { id: 4, name: 'Mr. Vikram Kumar', subject: 'Biology', subjects: ['Botany', 'Zoology', 'Human Physiology'], experience: '14+ Years', photoUrl: 'https://picsum.photos/id/64/100/100', qualifications: 'M.Sc. in Biotechnology', bio: 'Mr. Kumar brings biology to life with his dynamic teaching methods and enthusiasm for the subject. He is an expert in preparing students for medical entrance exams, focusing on conceptual clarity and application-based learning.' },
  { id: 5, name: 'Dr. Meera Desai', subject: 'Physics', subjects: ['Thermodynamics', 'Modern Physics', 'Wave Theory'], experience: '18+ Years', photoUrl: 'https://picsum.photos/id/237/100/100', qualifications: 'Ph.D. in Nuclear Physics', bio: 'With nearly two decades of teaching experience, Dr. Desai is a veteran in the field of physics education. She is adept at breaking down intricate topics and is committed to developing critical thinking skills in her students.' },
  { id: 6, name: 'Prof. Arjun Mehta', subject: 'Chemistry', subjects: ['Biochemistry', 'Environmental Chemistry', 'Stoichiometry'], experience: '11+ Years', photoUrl: 'https://picsum.photos/id/433/100/100', qualifications: 'M.Phil. in Chemistry', bio: 'Professor Mehta is known for his innovative approach to teaching chemistry, often incorporating technology and interactive models. He focuses on building a strong understanding of fundamental principles to prepare students for advanced studies.' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    quote: 'Atlas Classes transformed our students’ learning approach with their structured curriculum and continuous assessments. The results have been outstanding.',
    author: 'Principal, ABC School',
    title: 'Partner Institute',
    rating: 5,
  },
  {
    id: 2,
    quote: 'I improved my confidence and scores significantly with their detailed assessment system. The micro-planning helped me stay on track.',
    author: 'Aarav, Grade 10',
    title: 'Student',
    rating: 5,
  },
  {
    id: 3,
    quote: 'The teacher empowerment program is exceptional. Our faculty feels more equipped and motivated to deliver high-quality education.',
    author: 'Director, XYZ Academy',
    title: 'Partner Institute',
    rating: 4,
  },
];

export const INSTITUTES_DATA: Institute[] = [
    { id: 'i1', name: 'ABC School', email: 'institute@atlas.com' },
    { id: 'i2', name: 'Global Tech Academy', email: 'admin@gta.edu' },
    { id: 'i3', name: 'Future Leaders Institute', email: 'contact@fli.org' },
];

export const ADMIN_QUESTION_PAPERS: AdminQuestionPaper[] = [
    { id: 'aqp1', subject: 'Physics', fileName: 'admin_physics_mechanics_final.pdf', accessibleInstituteIds: ['i1'], fileContent: 'VGhpcyBpcyBhIG1vY2sgUGh5c2ljcyBQREYgZmlsZS4=', mimeType: 'text/plain' },
    { id: 'aqp2', subject: 'Chemistry', fileName: 'admin_chem_organic_basics.pdf', accessibleInstituteIds: ['i1', 'i2'], fileContent: 'VGhpcyBpcyBhIG1vY2sgQ2hlbWlzdHJ5IFBERiBmaWxlLg==', mimeType: 'text/plain' },
];

export const INSTITUTE_STUDENTS: Student[] = [
    { id: 's1', name: 'Riya Sharma', instituteId: 'i1' },
    { id: 's2', name: 'Arjun Verma', instituteId: 'i1' },
    { id: 's3', name: 'Priya Patel', instituteId: 'i1' },
    { id: 's4', name: 'Rohan Kumar', instituteId: 'i1' },
];

export const STUDENT_TESTS: Test[] = [
    { id: 't1', title: 'Foundation Series Test A', date: '2024-09-15', status: 'Completed', instituteId: 'i1', subject: 'IIT-JEE Pattern', pdfFileName: 'series-a-test.pdf' },
    { id: 't2', title: 'Foundation Series Test B', date: '2024-09-22', status: 'Completed', instituteId: 'i1', subject: 'IIT-JEE Pattern', pdfFileName: 'series-b-test.pdf' },
    { id: 't3', title: 'Foundation Series Test C', date: '2024-10-01', status: 'Assigned', instituteId: 'i1', subject: 'IIT-JEE Pattern', pdfFileName: 'series-c-test.pdf' },
    { id: 't4', title: 'Biology Unit Test 1', date: '2024-10-10', status: 'Upcoming', instituteId: 'i1', subject: 'NEET Pattern', pdfFileName: 'biology-test-1.pdf' },
];

export const STUDENT_RESULTS: TestResult[] = [
    { 
      testId: 't1', 
      studentId: 's1', 
      score: 255, 
      maxScore: 300, 
      rank: 3, 
      grade: 'A',
      subjectBreakdown: {
        'Physics': { score: 90, maxScore: 100 },
        'Chemistry': { score: 75, maxScore: 100 },
        'Mathematics': { score: 90, maxScore: 100 }
      }
    },
    { 
      testId: 't2', 
      studentId: 's1', 
      score: 276, 
      maxScore: 300, 
      rank: 1, 
      grade: 'A+',
      subjectBreakdown: {
        'Physics': { score: 95, maxScore: 100 },
        'Chemistry': { score: 88, maxScore: 100 },
        'Mathematics': { score: 93, maxScore: 100 }
      }
    },
];

export let ALL_RESULTS: TestResult[] = [
    { 
      testId: 't1', 
      studentId: 's1', 
      score: 255, 
      maxScore: 300, 
      rank: 3, 
      grade: 'A',
      subjectBreakdown: {
        'Physics': { score: 90, maxScore: 100 },
        'Chemistry': { score: 75, maxScore: 100 },
        'Mathematics': { score: 90, maxScore: 100 }
      }
    },
    { testId: 't1', studentId: 's2', score: 234, maxScore: 300, rank: 4, grade: 'B' },
    { testId: 't1', studentId: 's3', score: 273, maxScore: 300, rank: 1, grade: 'A+' },
    { testId: 't1', studentId: 's4', score: 264, maxScore: 300, rank: 2, grade: 'A' },
    { 
      testId: 't2', 
      studentId: 's1', 
      score: 276, 
      maxScore: 300, 
      rank: 1, 
      grade: 'A+',
       subjectBreakdown: {
        'Physics': { score: 95, maxScore: 100 },
        'Chemistry': { score: 88, maxScore: 100 },
        'Mathematics': { score: 93, maxScore: 100 }
      }
    },
    { testId: 't2', studentId: 's2', score: 243, maxScore: 300, rank: 3, grade: 'A' },
    { testId: 't2', studentId: 's3', score: 225, maxScore: 300, rank: 4, grade: 'B' },
    { testId: 't2', studentId: 's4', score: 267, maxScore: 300, rank: 2, grade: 'A' },
];


export const STUDENT_PAYMENTS: Payment[] = [
    { id: 'p1', date: '2024-08-01', amount: 5000, status: 'Paid' },
    { id: 'p2', date: '2024-09-01', amount: 5000, status: 'Paid' },
    { id: 'p3', date: '2024-10-01', amount: 5000, status: 'Due' },
];
