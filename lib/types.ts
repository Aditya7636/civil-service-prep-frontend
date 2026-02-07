export type QuestionType = 'MCQ' | 'SJT' | 'NUMERICAL' | 'FREE_TEXT' | 'TECHNICAL';

export type BehaviourScore = {
  behaviour: string;
  score: number;
};

export type TestMetadata = {
  id: string;
  name: string;
  timeLimit: number;
  grade?: string;
  questions: Array<{
    id: string;
    prompt: string;
    type: QuestionType;
    options?: string[];
  }>;
};

export type TestListItem = {
  id: string;
  name: string;
  type?: string;
  timeLimit?: number;
  grade?: string;
};

export type AttemptListItem = {
  id: string;
  testId: string;
  testName: string;
  grade?: string;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED';
  startedAt: string;
  completedAt?: string;
  timeLimit?: number;
  expiresAt?: string;
  isExpired?: boolean;
};

export type AttemptListResponse = {
  items: AttemptListItem[];
  page: number;
  pageSize: number;
  total: number;
};

export type AdminAnalytics = {
  users: number;
  testsCompleted: number;
  conversionRate: number;
};

export type AdminQuestionListItem = {
  id: string;
  prompt: string;
  type: string;
  gradeId: string;
  difficulty: number;
};

export type AdminQuestionListResponse = {
  items: AdminQuestionListItem[];
  page: number;
  pageSize: number;
  total: number;
};

export type AdminTestListItem = {
  id: string;
  name: string;
  type: string;
  grade?: string;
  timeLimit: number;
  isPublished: boolean;
};

export type AdminTestListResponse = {
  items: AdminTestListItem[];
  page: number;
  pageSize: number;
  total: number;
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

export type CatalogBehaviour = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export type CatalogAssessmentMethod = {
  id: string;
  code: string;
  name: string;
  description: string;
  source: 'GOVUK' | 'INFERRED';
};

export type CatalogProfessionCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type CatalogProfession = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: {
    id: string;
    slug: string;
    name: string;
  };
  alignedBehaviours: CatalogBehaviour[];
  recommendedAssessments: CatalogAssessmentMethod[];
};

export type CatalogDDaTRoleCategory = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export type CatalogDDaTRole = {
  id: string;
  code: string;
  name: string;
  description: string;
  category: CatalogDDaTRoleCategory;
  keySkills: string[];
  typicalGrades: string[];
  keyResponsibilities: string[];
  alignedBehaviours: CatalogBehaviour[];
  requiredTests: Array<{
    id: string;
    type: string;
    name: string;
    description: string;
    typical: boolean;
    source: 'GOVUK' | 'INFERRED';
    assessmentMethod: { id: string; code: string; name: string } | null;
  }>;
};

export type CatalogCoverage = {
  totals: {
    behaviours: number;
    assessmentMethods: number;
    professions: number;
    ddatRoles: number;
  };
  professions: Array<{
    slug: string;
    name: string;
    behaviours: number;
    assessments: number;
  }>;
  ddatRoles: Array<{
    code: string;
    name: string;
    behaviours: number;
    assessments: number;
  }>;
};
