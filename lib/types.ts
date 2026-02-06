export type QuestionType = 'MCQ' | 'SJT' | 'NUMERICAL' | 'FREE_TEXT' | 'TECHNICAL';

export type BehaviourScore = {
  behaviour: string;
  score: number;
};

export type TestMetadata = {
  id: string;
  name: string;
  timeLimit: number;
  questions: Array<{
    id: string;
    prompt: string;
    type: QuestionType;
    options?: string[];
  }>;
};

export type StartTestResponse = {
  testId: string;
  userId: string;
  attemptId: string;
  startedAt: string;
  questionOrder: string[];
};

export type AttemptResults = {
  attemptId: string;
  testId: string;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED';
  startedAt: string;
  completedAt?: string;
  overallScore: number;
  grade?: string;
  behaviourScores: BehaviourScore[];
  recommendations: string[];
  audit?: Array<{
    questionId: string;
    order: number;
    response: unknown;
    awardedScore: number | null;
    maxScore: number | null;
    manualOverride: boolean;
    manualScore: number | null;
    behaviourContributions: unknown;
    rubricBreakdown: unknown;
  }>;
};
