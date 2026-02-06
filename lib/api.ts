import type { AttemptResults, StartTestResponse, TestMetadata } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3001/api';

export async function fetchTestMetadata(testId: string): Promise<TestMetadata> {
  const response = await fetch(`${API_BASE}/tests/${testId}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to load test');
  }
  return response.json();
}

export async function startTest(testId: string, userId: string): Promise<StartTestResponse> {
  const response = await fetch(`${API_BASE}/tests/${testId}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
  const response = await fetch(`${API_BASE}/tests/${testId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attemptId, answers }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit test');
  }
  return response.json();
}

export async function fetchAttemptResults(attemptId: string, admin = false): Promise<AttemptResults> {
  const response = await fetch(
    `${API_BASE}/tests/attempts/${attemptId}/results?admin=${admin ? 'true' : 'false'}`,
    {
      cache: 'no-store',
    },
  );
  if (!response.ok) {
    throw new Error('Failed to load results');
  }
  return response.json();
}
