// User & Auth Types
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

// Grade Types
export type GradeLevel = 'EO' | 'HEO' | 'SEO' | 'G7' | 'G6' | 'SCS';

export interface RoleGrade {
  id: string;
  name: GradeLevel;
  displayName: string;
  description: string;
  salaryRange?: string;
  responsibilities: string[];
}

// Behaviour Types
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

// Question & Test Types
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

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  test: Test;
  answers: Answer[];
  score: number;
  behaviourScores: BehaviourScore[];
  startedAt: string;
  completedAt?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
}

export interface Answer {
  id: string;
  attemptId: string;
  questionId: string;
  response: string | string[];
  isCorrect?: boolean;
  score: number;
  maxScore: number;
  feedback?: string;
}

export interface BehaviourScore {
  behaviourId: string;
  behaviourName: string;
  score: number;
  recommendations: string[];
}

// Interview Types
export interface InterviewMock {
  id: string;
  userId: string;
  gradeId: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript?: string;
  questions: InterviewQuestion[];
  scorecards: InterviewScorecard[];
  status: 'PREPARING' | 'RECORDING' | 'PROCESSING' | 'COMPLETED';
  createdAt: string;
  completedAt?: string;
}

export interface InterviewQuestion {
  id: string;
  behaviourId: string;
  questionText: string;
  order: number;
}

export interface InterviewScorecard {
  id: string;
  interviewId: string;
  behaviourId: string;
  behaviourName: string;
  score: number;
  strengths: string[];
  areasForImprovement: string[];
  notes: string;
}

// Statement Builder Types
export interface StatementDraft {
  id: string;
  userId: string;
  behaviourId: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  wordCount: number;
  maxWords: number;
  feedback?: StatementFeedback;
  createdAt: string;
  updatedAt: string;
}

export interface StatementFeedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: {
    section: 'situation' | 'task' | 'action' | 'result';
    comment: string;
  }[];
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId?: string;
  status: SubscriptionStatus;
  plan: 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  startDate: string;
  endDate?: string;
  features: string[];
}

// Analytics Types
export interface UserProgress {
  userId: string;
  testsCompleted: number;
  averageScore: number;
  behaviourProgress: {
    behaviourId: string;
    behaviourName: string;
    attemptsCount: number;
    averageScore: number;
    lastAttemptDate: string;
  }[];
}
