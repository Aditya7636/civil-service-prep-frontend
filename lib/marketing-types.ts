export type UserRole = 'USER' | 'COACH' | 'ADMIN';
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'TRIAL' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  targetGrade?: string;
  targetProfession?: string;
  ddaTRole?: string;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
}

export type GradeLevel = 'EO' | 'HEO' | 'SEO' | 'G7' | 'G6' | 'SCS';

export interface RoleGrade {
  id: string;
  name: GradeLevel;
  displayName: string;
  description: string;
  salaryRange?: string;
  responsibilities: string[];
}

export interface Behaviour {
  id: string;
  name: string;
  description: string;
  gradeId: string;
  grade: RoleGrade;
  successCriteria: string[];
  examples: BehaviourExample[];
}

export interface BehaviourExample {
  id: string;
  behaviourId: string;
  starSituation: string;
  starTask: string;
  starAction: string;
  starResult: string;
  level: number;
}

export type QuestionType = 'MCQ' | 'SJT' | 'NUMERICAL' | 'FREE_TEXT' | 'TECHNICAL';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  gradeId: string;
  behaviourIds: string[];
  questionText: string;
  context?: string;
  options?: QuestionOption[];
  correctAnswer?: string | string[];
  rationale: string;
  marks: number;
  timeEstimate: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  type: QuestionType;
  timeLimit: number;
  gradeId: string;
  questionIds: string[];
  passingScore: number;
}
