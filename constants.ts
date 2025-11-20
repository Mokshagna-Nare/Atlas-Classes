
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
  { 
    id: 1, 
    name: 'Gopala Krishna', 
    subject: 'Academic Head', 
    subjects: ['Curriculum Strategy', 'Faculty Development', 'Student Mentorship'], 
    photoUrl: 'https://ui-avatars.com/api/?name=Gopala+Krishna&background=10B981&color=fff&size=200', 
    bio: 'As an Academic Head, Gopala Krishna leads the strategic direction of our curriculum, ensuring it meets the highest standards of competitive exam preparation and holistic student development.' 
  },
  { 
    id: 2, 
    name: 'Shaiksha Vali', 
    subject: 'Academic Head', 
    subjects: ['Pedagogy Expert', 'Operational Excellence', 'Performance Analysis'], 
    photoUrl: 'https://ui-avatars.com/api/?name=Shaiksha+Vali&background=10B981&color=fff&size=200', 
    bio: 'Shaiksha Vali brings extensive experience in educational leadership, focusing on optimizing teaching methodologies and ensuring that our delivery mechanisms are effective and student-centric.' 
  },
  { 
    id: 3, 
    name: 'Rajesh', 
    subject: 'Academic Head', 
    subjects: ['Strategic Planning', 'Resource Management', 'Quality Control'], 
    photoUrl: 'https://ui-avatars.com/api/?name=Rajesh&background=10B981&color=fff&size=200', 
    bio: 'Rajesh oversees the academic integrity of our programs, implementing rigorous quality control measures and driving continuous improvement in our educational offerings.' 
  },
  { 
    id: 4, 
    name: 'Mokshagna', 
    subject: 'Technical Head', 
    subjects: ['Platform Development', 'Data Analytics', 'EdTech Innovation'], 
    photoUrl: 'https://ui-avatars.com/api/?name=Mokshagna&background=10B981&color=fff&size=200', 
    bio: 'Mokshagna leads our technology initiatives, building the robust digital infrastructure that powers Atlas Classes seamlessly. He ensures our LMS and assessment platforms are cutting-edge.' 
  },
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
