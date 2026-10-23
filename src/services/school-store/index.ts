/**
 * SIMPLEIN SCHOOLS — School Data Repository & Indian Demonstration Dataset
 *
 * Fictional School: Sunrise Public School, Hyderabad, Telangana, India
 * Board / Curriculum: CBSE — Central Board of Secondary Education
 * Affiliation Number: CBSE/AFF/2026/1930284
 * Academic Year: 2026–27
 * Currency: INR (₹)
 * Timezone: Asia/Kolkata
 */

export interface SchoolProfile {
  id: string;
  name: string;
  affiliationNumber: string;
  board: string;
  establishedYear: number;
  principalName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  activeAcademicYear: string;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
}

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  terms: Array<{ id: string; name: string; startDate: string; endDate: string }>;
}

export interface ClassSection {
  id: string;
  grade: string;
  section: string;
  classTeacher: string;
  roomNumber: string;
  studentCount: number;
  capacity: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  type: "Core" | "Elective" | "Practical" | "Language";
  assignedTeacher: string;
  applicableGrades: string[];
}

export interface StudentRecord {
  id: string;
  admissionNo: string;
  rollNo: string;
  name: string;
  grade: string;
  section: string;
  guardianName: string;
  guardianPhone: string;
  attendanceRate: number;
  academicPerformance: string;
  status: "Active" | "Graduated" | "Transferred" | "Inactive";
}

export interface TeacherRecord {
  id: string;
  employeeCode: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  assignedClasses: string[];
  assignedSubjects: string[];
  status: "Active" | "On Leave" | "Resigned";
}

export interface HomeworkRecord {
  id: string;
  title: string;
  subject: string;
  grade: string;
  section: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  submissionCount: number;
  totalStudents: number;
  description: string;
}

export interface ExamRecord {
  id: string;
  title: string;
  term: string;
  startDate: string;
  endDate: string;
  grade: string;
  status: "Upcoming" | "In Progress" | "Completed" | "Published";
  subjects: Array<{ code: string; subject: string; date: string; time: string; maxMarks: number }>;
}

export interface NoticeRecord {
  id: string;
  title: string;
  category: "Academic" | "Administrative" | "Examination" | "Event" | "Holiday";
  audience: "All" | "Teachers" | "Parents" | "Students";
  priority: "High" | "Normal" | "Urgent";
  publishDate: string;
  author: string;
  content: string;
  pinned: boolean;
}

export interface TimetablePeriod {
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface FeeRecord {
  id: string;
  studentName: string;
  admissionNo: string;
  grade: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  receiptNo?: string;
  paidDate?: string;
}

export interface AdmissionEnquiry {
  id: string;
  applicantName: string;
  gradeApplying: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  submissionDate: string;
  status: "Enquiry" | "Form Submitted" | "Interview Scheduled" | "Approved" | "Waitlisted";
}

// Initial In-Memory Indian Demonstration Store
class SchoolStore {
  private profile: SchoolProfile = {
    id: "school-sunrise-01",
    name: "Sunrise Public School",
    affiliationNumber: "CBSE/AFF/2026/1930284",
    board: "CBSE — Central Board of Secondary Education",
    establishedYear: 2004,
    principalName: "Dr. Eleanor Vance (Principal) & Dr. Radhika Sundaram (Academic Director)",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 40 2335 8421",
    email: "office@sunrisepublic.edu.in",
    website: "https://sunrisepublic.edu.in",
    activeAcademicYear: "2026 - 2027",
    totalStudents: 1280,
    totalTeachers: 74,
    totalClasses: 32,
  };

  private academicYears: AcademicYear[] = [
    {
      id: "ay_2026_27",
      name: "Academic Year 2026 - 2027",
      startDate: "2026-06-08",
      endDate: "2027-04-10",
      isCurrent: true,
      terms: [
        { id: "term_1", name: "Term 1 (CBSE Mid-Term)", startDate: "2026-06-08", endDate: "2026-10-24" },
        { id: "term_2", name: "Term 2 (CBSE Annual)", startDate: "2026-11-02", endDate: "2027-04-10" },
      ],
    },
    {
      id: "ay_2025_26",
      name: "Academic Year 2025 - 2026",
      startDate: "2025-06-09",
      endDate: "2026-04-11",
      isCurrent: false,
      terms: [
        { id: "term_1_prev", name: "Term 1", startDate: "2025-06-09", endDate: "2025-10-20" },
        { id: "term_2_prev", name: "Term 2", startDate: "2025-11-03", endDate: "2026-04-11" },
      ],
    },
  ];

  private classes: ClassSection[] = [
    { id: "cls_10a", grade: "Class 10", section: "A", classTeacher: "Marcus Holloway", roomNumber: "R-302", studentCount: 38, capacity: 40 },
    { id: "cls_10b", grade: "Class 10", section: "B", classTeacher: "Sunita Rao", roomNumber: "R-303", studentCount: 36, capacity: 40 },
    { id: "cls_9a", grade: "Class 9", section: "A", classTeacher: "Dr. K. V. Raman", roomNumber: "R-201", studentCount: 40, capacity: 40 },
    { id: "cls_9b", grade: "Class 9", section: "B", classTeacher: "Devraj Mukherjee", roomNumber: "R-202", studentCount: 37, capacity: 40 },
    { id: "cls_8a", grade: "Class 8", section: "A", classTeacher: "Anita Deshmukh", roomNumber: "R-104", studentCount: 35, capacity: 38 },
    { id: "cls_7a", grade: "Class 7", section: "A", classTeacher: "Suresh Kumar", roomNumber: "R-102", studentCount: 34, capacity: 38 },
    { id: "cls_6b", grade: "Class 6", section: "B", classTeacher: "S. Padmavathi", roomNumber: "R-101", studentCount: 32, capacity: 36 },
  ];

  private subjects: Subject[] = [
    { id: "sub_math_10", code: "MAT-101", name: "Advanced Mathematics", department: "Mathematics", type: "Core", assignedTeacher: "Marcus Holloway", applicableGrades: ["Class 10"] },
    { id: "sub_phy_10", code: "PHY-102", name: "Physics & Mechanics", department: "Science", type: "Core", assignedTeacher: "Dr. K. V. Raman", applicableGrades: ["Class 10", "Class 9"] },
    { id: "sub_chem_10", code: "CHM-103", name: "Organic Chemistry", department: "Science", type: "Core", assignedTeacher: "Devraj Mukherjee", applicableGrades: ["Class 10"] },
    { id: "sub_bio_10", code: "BIO-104", name: "Biology & Life Sciences", department: "Science", type: "Core", assignedTeacher: "Sunita Rao", applicableGrades: ["Class 10", "Class 9"] },
    { id: "sub_eng_10", code: "ENG-105", name: "English Literature", department: "Languages", type: "Core", assignedTeacher: "Anita Deshmukh", applicableGrades: ["Class 10", "Class 9", "Class 8"] },
    { id: "sub_cs_10", code: "CSC-106", name: "Computer Science & Python", department: "Technology", type: "Elective", assignedTeacher: "Suresh Kumar", applicableGrades: ["Class 10", "Class 9"] },
    { id: "sub_tel_10", code: "TEL-107", name: "Telugu (First Language)", department: "Languages", type: "Language", assignedTeacher: "S. Padmavathi", applicableGrades: ["Class 10", "Class 9", "Class 8", "Class 7", "Class 6"] },
    { id: "sub_hin_10", code: "HIN-108", name: "Hindi (Second Language)", department: "Languages", type: "Language", assignedTeacher: "K. Meenakshi", applicableGrades: ["Class 10", "Class 9", "Class 8"] },
    { id: "sub_soc_10", code: "SOC-109", name: "Social Science", department: "Humanities", type: "Core", assignedTeacher: "Venkatasubramanian S.", applicableGrades: ["Class 10", "Class 9"] },
  ];

  private students: StudentRecord[] = [
    { id: "usr_student_1", admissionNo: "ADM-2026-0842", rollNo: "10A-01", name: "Aarav Sharma", grade: "Class 10", section: "A", guardianName: "Sunita Sharma", guardianPhone: "+91 98765 43214", attendanceRate: 94.8, academicPerformance: "A+ (92.4%)", status: "Active" },
    { id: "stu_pri_02", admissionNo: "ADM-2026-0911", rollNo: "06B-14", name: "Kavya Reddy", grade: "Class 6", section: "B", guardianName: "Sunita Sharma", guardianPhone: "+91 98765 43214", attendanceRate: 93.4, academicPerformance: "A (87.0%)", status: "Active" },
    { id: "stu_10a_02", admissionNo: "ADM-2026-0843", rollNo: "10A-02", name: "Ananya Rao", grade: "Class 10", section: "A", guardianName: "Srinivas Rao", guardianPhone: "+91 98765 43215", attendanceRate: 97.2, academicPerformance: "A+ (95.0%)", status: "Active" },
    { id: "stu_10a_03", admissionNo: "ADM-2026-0844", rollNo: "10A-03", name: "Arjun Kumar", grade: "Class 10", section: "A", guardianName: "Ramesh Kumar", guardianPhone: "+91 98765 43216", attendanceRate: 91.0, academicPerformance: "B+ (81.5%)", status: "Active" },
    { id: "stu_10a_04", admissionNo: "ADM-2026-0845", rollNo: "10A-04", name: "Sai Teja", grade: "Class 10", section: "A", guardianName: "Venkat Reddy", guardianPhone: "+91 98765 43217", attendanceRate: 95.0, academicPerformance: "A (89.2%)", status: "Active" },
    { id: "stu_10b_01", admissionNo: "ADM-2026-0850", rollNo: "10B-01", name: "Priya Nair", grade: "Class 10", section: "B", guardianName: "K. G. Nair", guardianPhone: "+91 98765 43218", attendanceRate: 96.5, academicPerformance: "A+ (93.0%)", status: "Active" },
    { id: "stu_09a_01", admissionNo: "ADM-2026-0780", rollNo: "09A-01", name: "Aditya Varma", grade: "Class 9", section: "A", guardianName: "R. K. Varma", guardianPhone: "+91 98765 43219", attendanceRate: 92.5, academicPerformance: "A (85.0%)", status: "Active" },
    { id: "stu_08a_01", admissionNo: "ADM-2026-0710", rollNo: "08A-01", name: "Sneha Iyer", grade: "Class 8", section: "A", guardianName: "Narayanan Iyer", guardianPhone: "+91 98765 43220", attendanceRate: 98.2, academicPerformance: "A+ (96.0%)", status: "Active" },
    { id: "stu_07a_01", admissionNo: "ADM-2026-0650", rollNo: "07A-01", name: "Rahul Verma", grade: "Class 7", section: "A", guardianName: "Ashok Verma", guardianPhone: "+91 98765 43221", attendanceRate: 93.8, academicPerformance: "B+ (82.0%)", status: "Active" },
    { id: "stu_06a_01", admissionNo: "ADM-2026-0601", rollNo: "06A-01", name: "Meera Joshi", grade: "Class 6", section: "A", guardianName: "Sandeep Joshi", guardianPhone: "+91 98765 43222", attendanceRate: 95.6, academicPerformance: "A (88.5%)", status: "Active" },
  ];

  private teachers: TeacherRecord[] = [
    { id: "usr_teacher_1", employeeCode: "FAC-1002", name: "Marcus Holloway", designation: "Senior Mathematics Faculty & 10-A Mentor", department: "Mathematics", email: "teacher@springfield.edu", phone: "+91 98765 43212", assignedClasses: ["Class 10-A", "Class 10-B"], assignedSubjects: ["Advanced Mathematics"], status: "Active" },
    { id: "tch_1003", employeeCode: "FAC-1003", name: "Dr. K. V. Raman", designation: "Physics Department Lead", department: "Science", email: "raman.k@sunrisepublic.edu.in", phone: "+91 98765 43218", assignedClasses: ["Class 10-A", "Class 9-A"], assignedSubjects: ["Physics & Mechanics"], status: "Active" },
    { id: "tch_1004", employeeCode: "FAC-1004", name: "Devraj Mukherjee", designation: "Chemistry Faculty", department: "Science", email: "devraj.m@sunrisepublic.edu.in", phone: "+91 98765 43219", assignedClasses: ["Class 10-A", "Class 9-B"], assignedSubjects: ["Organic Chemistry"], status: "Active" },
    { id: "tch_1005", employeeCode: "FAC-1005", name: "Sunita Rao", designation: "Biology Department Lead & 10-B Class Teacher", department: "Science", email: "sunita.r@sunrisepublic.edu.in", phone: "+91 98765 43223", assignedClasses: ["Class 10-B", "Class 9-A"], assignedSubjects: ["Biology & Life Sciences"], status: "Active" },
    { id: "tch_1006", employeeCode: "FAC-1006", name: "Anita Deshmukh", designation: "English Department Lead", department: "Languages", email: "anita.d@sunrisepublic.edu.in", phone: "+91 98765 43224", assignedClasses: ["Class 10-A", "Class 9-A", "Class 8-A"], assignedSubjects: ["English Literature"], status: "Active" },
    { id: "tch_1007", employeeCode: "FAC-1007", name: "Suresh Kumar", designation: "Computer Science Faculty", department: "Technology", email: "suresh.k@sunrisepublic.edu.in", phone: "+91 98765 43225", assignedClasses: ["Class 10-A", "Class 9-A"], assignedSubjects: ["Computer Science & Python"], status: "Active" },
    { id: "tch_1008", employeeCode: "FAC-1008", name: "S. Padmavathi", designation: "Telugu Senior Faculty", department: "Languages", email: "padmavathi.s@sunrisepublic.edu.in", phone: "+91 98765 43226", assignedClasses: ["Class 10-A", "Class 6-B"], assignedSubjects: ["Telugu (First Language)"], status: "Active" },
    { id: "tch_1009", employeeCode: "FAC-1009", name: "K. Meenakshi", designation: "Hindi Department Lead", department: "Languages", email: "meenakshi.k@sunrisepublic.edu.in", phone: "+91 98765 43227", assignedClasses: ["Class 10-A", "Class 9-B"], assignedSubjects: ["Hindi (Second Language)"], status: "Active" },
    { id: "tch_1010", employeeCode: "FAC-1010", name: "Venkatasubramanian S.", designation: "Social Science Faculty", department: "Humanities", email: "venkat.s@sunrisepublic.edu.in", phone: "+91 98765 43228", assignedClasses: ["Class 10-A", "Class 9-A"], assignedSubjects: ["Social Science"], status: "Active" },
  ];

  private homeworks: HomeworkRecord[] = [
    { id: "hw_101", title: "Quadratic Equations Problem Set 4", subject: "Advanced Mathematics", grade: "Class 10", section: "A", teacherName: "Marcus Holloway", assignedDate: "2026-10-18", dueDate: "2026-10-23", submissionCount: 34, totalStudents: 38, description: "Complete exercises 4.1 to 4.4 from NCERT Chapter 4. Show complete algebraic working for all discriminant proofs." },
    { id: "hw_102", title: "Electromagnetic Induction & Faraday's Law", subject: "Physics & Mechanics", grade: "Class 10", section: "A", teacherName: "Dr. K. V. Raman", assignedDate: "2026-10-19", dueDate: "2026-10-24", submissionCount: 30, totalStudents: 38, description: "Submit formal CBSE lab write-up including circuit diagram, observed galvanometer deflection, and Faraday's Law deduction." },
    { id: "hw_103", title: "Organic Reactions & IUPAC Nomenclature", subject: "Organic Chemistry", grade: "Class 10", section: "A", teacherName: "Devraj Mukherjee", assignedDate: "2026-10-17", dueDate: "2026-10-22", submissionCount: 36, totalStudents: 38, description: "Draw structural formulas and IUPAC designations for homologous series of alcohols, carboxylic acids, and aldehydes." },
    { id: "hw_104", title: "The Portrait of a Lady — Critical Analysis", subject: "English Literature", grade: "Class 10", section: "A", teacherName: "Anita Deshmukh", assignedDate: "2026-10-16", dueDate: "2026-10-25", submissionCount: 35, totalStudents: 38, description: "Analyze the grandmother-grandson relationship in Khushwant Singh's prose in 600 words with textual citations." },
    { id: "hw_105", title: "Python Lists & Dictionary Data Structures", subject: "Computer Science & Python", grade: "Class 10", section: "A", teacherName: "Suresh Kumar", assignedDate: "2026-10-18", dueDate: "2026-10-26", submissionCount: 32, totalStudents: 38, description: "Write a modular Python script to manage student roll numbers and grade tuples using dictionary comprehensions." },
  ];

  private exams: ExamRecord[] = [
    {
      id: "ex_midterm_2026",
      title: "Mid-Term Examination 2026",
      term: "Term 1",
      startDate: "2026-11-05",
      endDate: "2026-11-14",
      grade: "Class 10",
      status: "Upcoming",
      subjects: [
        { code: "MAT-101", subject: "Advanced Mathematics", date: "2026-11-05", time: "09:30 AM - 12:30 PM", maxMarks: 100 },
        { code: "PHY-102", subject: "Physics & Mechanics", date: "2026-11-07", time: "09:30 AM - 12:30 PM", maxMarks: 100 },
        { code: "CHM-103", subject: "Organic Chemistry", date: "2026-11-09", time: "09:30 AM - 12:30 PM", maxMarks: 100 },
        { code: "ENG-105", subject: "English Literature", date: "2026-11-11", time: "09:30 AM - 12:30 PM", maxMarks: 100 },
        { code: "CSC-106", subject: "Computer Science & Python", date: "2026-11-14", time: "09:30 AM - 12:30 PM", maxMarks: 100 },
      ],
    },
  ];

  private notices: NoticeRecord[] = [
    { id: "not_1", title: "Mid-Term Examination Timetable & Seating Protocol", category: "Examination", audience: "All", priority: "High", publishDate: "2026-10-20", author: "Dr. Eleanor Vance (Principal)", content: "The finalized timetable for the upcoming Term 1 CBSE Mid-Term examinations has been published. All students must report to designated examination halls by 09:00 AM sharp with authorized admit slips.", pinned: true },
    { id: "not_2", title: "Annual Science & Technology Innovation Expo 2026 (Hyderabad Zone)", category: "Event", audience: "All", priority: "Normal", publishDate: "2026-10-18", author: "Science Department", content: "Registrations are now open for the Hyderabad Inter-School Innovation Expo. Project abstracts must be vetted by class science teachers before November 1st.", pinned: false },
    { id: "not_3", title: "Parent-Teacher Academic Review Conferences (Term 1)", category: "Administrative", audience: "Parents", priority: "High", publishDate: "2026-10-15", author: "Vice-Principal Office", content: "Individual appointment slots for the Term 1 Parent-Teacher conference are now live on the Parent Portal. Please book your preferred slot.", pinned: true },
    { id: "not_4", title: "Telangana State Cultural Assembly & Telugu Bhasha Dinotsavam", category: "Event", audience: "All", priority: "Normal", publishDate: "2026-10-12", author: "Languages Department", content: "Special morning assembly showcasing regional arts, classical Telugu poetry recitation, and historical Telangana heritage projects.", pinned: false },
  ];

  private timetable: Record<string, TimetablePeriod[]> = {
    Monday: [
      { periodNumber: 1, startTime: "08:30 AM", endTime: "09:20 AM", subject: "Advanced Mathematics", teacher: "Marcus Holloway", room: "R-302" },
      { periodNumber: 2, startTime: "09:25 AM", endTime: "10:15 AM", subject: "Physics & Mechanics", teacher: "Dr. K. V. Raman", room: "Physics Lab" },
      { periodNumber: 3, startTime: "10:30 AM", endTime: "11:20 AM", subject: "Organic Chemistry", teacher: "Devraj Mukherjee", room: "Chemistry Lab" },
      { periodNumber: 4, startTime: "11:25 AM", endTime: "12:15 PM", subject: "English Literature", teacher: "Anita Deshmukh", room: "R-302" },
      { periodNumber: 5, startTime: "01:00 PM", endTime: "01:50 PM", subject: "Computer Science & Python", teacher: "Suresh Kumar", room: "Computer Lab 1" },
      { periodNumber: 6, startTime: "01:55 PM", endTime: "02:45 PM", subject: "Telugu / Hindi", teacher: "S. Padmavathi / K. Meenakshi", room: "R-302" },
    ],
  };

  private fees: FeeRecord[] = [
    { id: "fee_01", studentName: "Aarav Sharma", admissionNo: "ADM-2026-0842", grade: "Class 10-A", feeType: "Term 1 Tuition & Lab Fee", amount: 42500, dueDate: "2026-07-15", status: "Paid", receiptNo: "REC-2026-7841", paidDate: "2026-07-10" },
    { id: "fee_02", studentName: "Aarav Sharma", admissionNo: "ADM-2026-0842", grade: "Class 10-A", feeType: "Term 2 Tuition & Activity Fee", amount: 42500, dueDate: "2026-11-15", status: "Pending" },
    { id: "fee_03", studentName: "Kavya Reddy", admissionNo: "ADM-2026-0911", grade: "Class 6-B", feeType: "Term 1 Tuition & Digital Resources", amount: 36000, dueDate: "2026-07-15", status: "Paid", receiptNo: "REC-2026-7842", paidDate: "2026-07-12" },
    { id: "fee_04", studentName: "Ananya Rao", admissionNo: "ADM-2026-0843", grade: "Class 10-A", feeType: "Term 2 Tuition & Activity Fee", amount: 42500, dueDate: "2026-11-15", status: "Pending" },
    { id: "fee_05", studentName: "Arjun Kumar", admissionNo: "ADM-2026-0844", grade: "Class 10-A", feeType: "Annual Transportation Fee", amount: 18000, dueDate: "2026-09-01", status: "Overdue" },
    { id: "fee_06", studentName: "Sai Teja", admissionNo: "ADM-2026-0845", grade: "Class 10-A", feeType: "Term 1 Tuition & Lab Fee", amount: 42500, dueDate: "2026-07-15", status: "Paid", receiptNo: "REC-2026-7843", paidDate: "2026-07-14" },
  ];

  private admissions: AdmissionEnquiry[] = [
    { id: "adm_enq_01", applicantName: "Vivaan Malhotra", gradeApplying: "Class 9", parentName: "Anand Malhotra", parentPhone: "+91 98111 22334", parentEmail: "anand.m@gmail.com", submissionDate: "2026-10-19", status: "Interview Scheduled" },
    { id: "adm_enq_02", applicantName: "Sanya Kapoor", gradeApplying: "Class 6", parentName: "Pooja Kapoor", parentPhone: "+91 98222 33445", parentEmail: "pooja.k@gmail.com", submissionDate: "2026-10-18", status: "Form Submitted" },
    { id: "adm_enq_03", applicantName: "Reyansh Gupta", gradeApplying: "Class 10", parentName: "Sameer Gupta", parentPhone: "+91 98333 44556", parentEmail: "sameer.g@gmail.com", submissionDate: "2026-10-15", status: "Approved" },
  ];

  // Accessors
  getProfile() { return this.profile; }
  getAcademicYears() { return this.academicYears; }
  getClasses() { return this.classes; }
  getSubjects() { return this.subjects; }
  getStudents() { return this.students; }
  getTeachers() { return this.teachers; }
  getHomeworks() { return this.homeworks; }
  getExams() { return this.exams; }
  getNotices() { return this.notices; }
  getTimetable() { return this.timetable; }
  getFees() { return this.fees; }
  getAdmissions() { return this.admissions; }

  // Mutation helpers for demonstration state
  addStudent(student: Omit<StudentRecord, "id">) {
    const newRecord: StudentRecord = {
      ...student,
      id: `stu_${Date.now()}`,
    };
    this.students.unshift(newRecord);
    return newRecord;
  }

  addClass(cls: Omit<ClassSection, "id">) {
    const newCls: ClassSection = {
      ...cls,
      id: `cls_${Date.now()}`,
    };
    this.classes.unshift(newCls);
    return newCls;
  }

  addSubject(sub: Omit<Subject, "id">) {
    const newSub: Subject = {
      ...sub,
      id: `sub_${Date.now()}`,
    };
    this.subjects.unshift(newSub);
    return newSub;
  }

  addHomework(hw: Omit<HomeworkRecord, "id">) {
    const newHw: HomeworkRecord = {
      ...hw,
      id: `hw_${Date.now()}`,
    };
    this.homeworks.unshift(newHw);
    return newHw;
  }

  addNotice(notice: Omit<NoticeRecord, "id">) {
    const newNotice: NoticeRecord = {
      ...notice,
      id: `not_${Date.now()}`,
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }
}

export const SchoolData = new SchoolStore();
