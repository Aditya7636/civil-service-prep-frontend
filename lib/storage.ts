const ANSWER_KEY_PREFIX = 'test-answers:';
const CONTEXT_KEY_PREFIX = 'test-context:';

export type StoredAnswer = {
  questionId: string;
  response: unknown;
};

export type StoredContext = {
  testId: string;
  attemptId: string;
  questionOrder: string[];
  startedAt: string;
  timeLimit: number;
};

export function loadContext(attemptId: string): StoredContext | null {
  const raw = sessionStorage.getItem(`${CONTEXT_KEY_PREFIX}${attemptId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredContext;
  } catch {
    return null;
  }
}

export function saveContext(context: StoredContext) {
  sessionStorage.setItem(`${CONTEXT_KEY_PREFIX}${context.attemptId}`, JSON.stringify(context));
}

export function loadAnswers(attemptId: string): StoredAnswer[] {
  const raw = sessionStorage.getItem(`${ANSWER_KEY_PREFIX}${attemptId}`);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredAnswer[];
  } catch {
    return [];
  }
}

export function saveAnswer(attemptId: string, answer: StoredAnswer) {
  const existing = loadAnswers(attemptId);
  const updated = existing.filter((item) => item.questionId !== answer.questionId);
  updated.push(answer);
  sessionStorage.setItem(`${ANSWER_KEY_PREFIX}${attemptId}`, JSON.stringify(updated));
}

export function clearAttemptData(attemptId: string) {
  sessionStorage.removeItem(`${ANSWER_KEY_PREFIX}${attemptId}`);
  sessionStorage.removeItem(`${CONTEXT_KEY_PREFIX}${attemptId}`);
}
