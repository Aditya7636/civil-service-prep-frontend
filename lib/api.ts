import type {
  AdminAnalytics,
  AdminQuestionListResponse,
  AdminTestListResponse,
  AttemptListResponse,
  AttemptResults,
  StartTestResponse,
  TestListItem,
  TestMetadata,
} from './types';
import { getToken } from './auth';

const API_BASE = '';

function buildHeaders() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchTests(): Promise<TestListItem[]> {
  const response = await fetch(`${API_BASE}/api/tests`, { cache: 'no-store', headers: buildHeaders() });
  if (!response.ok) {
    throw new Error('Failed to load tests');
  }
  const data = await response.json();
  return data.items ?? [];
}

export async function fetchTestMetadata(testId: string): Promise<TestMetadata> {
  const response = await fetch(`${API_BASE}/api/tests/${testId}`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to load test');
  }
  return response.json();
}

export async function startTest(testId: string, userId: string): Promise<StartTestResponse> {
  const response = await fetch(`${API_BASE}/api/tests/${testId}/start`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    throw new Error('Failed to start test');
  }
  return response.json();
}

export async function submitTest(
  testId: string,
  attemptId: string,
  answers: Array<{ questionId: string; response: unknown }>,
) {
  const response = await fetch(`${API_BASE}/api/tests/${testId}/submit`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ attemptId, answers }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit test');
  }
  return response.json();
}

export async function fetchAttemptResults(attemptId: string, admin = false): Promise<AttemptResults> {
  const response = await fetch(
    `${API_BASE}/api/tests/attempts/${attemptId}/results?admin=${admin ? 'true' : 'false'}`,
    {
      cache: 'no-store',
      headers: buildHeaders(),
    },
  );
  if (!response.ok) {
    throw new Error('Failed to load results');
  }
  return response.json();
}

export async function fetchAttempts(options?: {
  status?: 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED';
  page?: number;
  pageSize?: number;
}): Promise<AttemptListResponse> {
  const params = new URLSearchParams();
  if (options?.status) params.set('status', options.status);
  if (options?.page) params.set('page', String(options.page));
  if (options?.pageSize) params.set('pageSize', String(options.pageSize));
  const query = params.toString();
  const response = await fetch(`${API_BASE}/api/tests/attempts${query ? `?${query}` : ''}`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to load attempts');
  }
  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
}

export async function fetchMe() {
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Not authenticated');
  }
  return response.json();
}

export async function fetchAdminAnalytics(): Promise<AdminAnalytics> {
  const response = await fetch(`${API_BASE}/api/admin/analytics`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to load analytics');
  }
  return response.json();
}

export async function createBehaviour(payload: { name: string; description: string; gradeId: string }) {
  const response = await fetch(`${API_BASE}/api/admin/behaviours`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create behaviour');
  }
  return response.json();
}

export async function createQuestion(payload: {
  prompt: string;
  type: string;
  gradeId: string;
  difficulty: number;
  behaviourIds?: string[];
}) {
  const response = await fetch(`${API_BASE}/api/admin/questions`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create question');
  }
  return response.json();
}

export async function fetchAdminQuestions(options?: {
  q?: string;
  type?: string;
  gradeId?: string;
  page?: number;
  pageSize?: number;
}): Promise<AdminQuestionListResponse> {
  const params = new URLSearchParams();
  if (options?.q) params.set('q', options.q);
  if (options?.type) params.set('type', options.type);
  if (options?.gradeId) params.set('gradeId', options.gradeId);
  if (options?.page) params.set('page', String(options.page));
  if (options?.pageSize) params.set('pageSize', String(options.pageSize));
  const query = params.toString();
  const response = await fetch(
    `${API_BASE}/api/admin/questions${query ? `?${query}` : ''}`,
    {
      cache: 'no-store',
      headers: buildHeaders(),
    },
  );
  if (!response.ok) {
    throw new Error('Failed to load questions');
  }
  return response.json();
}

export async function fetchAdminTests(options?: {
  q?: string;
  published?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<AdminTestListResponse> {
  const params = new URLSearchParams();
  if (options?.q) params.set('q', options.q);
  if (typeof options?.published === 'boolean') params.set('published', String(options.published));
  if (options?.page) params.set('page', String(options.page));
  if (options?.pageSize) params.set('pageSize', String(options.pageSize));
  const query = params.toString();
  const response = await fetch(`${API_BASE}/api/admin/tests${query ? `?${query}` : ''}`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to load tests');
  }
  return response.json();
}

export async function overrideAnswerScore(payload: {
  attemptId: string;
  questionId: string;
  manualScore: number;
  note?: string;
}) {
  const response = await fetch(
    `${API_BASE}/api/admin/tests/attempts/${payload.attemptId}/answers/${payload.questionId}/override`,
    {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ manualScore: payload.manualScore, note: payload.note }),
    },
  );
  if (!response.ok) {
    throw new Error('Failed to override score');
  }
  return response.json();
}

export async function createSubscription(payload: { userId: string; priceId: string }) {
  const response = await fetch(`${API_BASE}/api/subscriptions/create`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }
  return response.json();
}

export async function createTest(payload: {
  name: string;
  type: string;
  timeLimit: number;
  gradeId: string;
}) {
  const response = await fetch(`${API_BASE}/api/admin/tests`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create test');
  }
  return response.json();
}

export async function addQuestionToTest(payload: {
  testId: string;
  questionId: string;
  order?: number;
}) {
  const response = await fetch(`${API_BASE}/api/admin/tests/${payload.testId}/questions`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ questionId: payload.questionId, order: payload.order }),
  });
  if (!response.ok) {
    throw new Error('Failed to add question to test');
  }
  return response.json();
}

export async function publishTest(testId: string) {
  const response = await fetch(`${API_BASE}/api/admin/tests/${testId}/publish`, {
    method: 'POST',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to publish test');
  }
  return response.json();
}

export async function unpublishTest(testId: string) {
  const response = await fetch(`${API_BASE}/api/admin/tests/${testId}/unpublish`, {
    method: 'POST',
    headers: buildHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to unpublish test');
  }
  return response.json();
}
