const ANSWER_KEY_PREFIX = 'test-answers:';
const CONTEXT_KEY_PREFIX = 'test-context:';
const LAST_ATTEMPT_KEY = 'test-last-attempt';

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
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(`${CONTEXT_KEY_PREFIX}${attemptId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredContext;
  } catch {
    return null;
  }
}

export function saveContext(context: StoredContext) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    `${CONTEXT_KEY_PREFIX}${context.attemptId}`,
    JSON.stringify(context),
  );
  window.localStorage.setItem(LAST_ATTEMPT_KEY, context.attemptId);
}

export function loadAnswers(attemptId: string): StoredAnswer[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(`${ANSWER_KEY_PREFIX}${attemptId}`);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredAnswer[];
  } catch {
    return [];
  }
}

export function saveAnswer(attemptId: string, answer: StoredAnswer) {
  if (typeof window === 'undefined') return;
  const existing = loadAnswers(attemptId);
  const updated = existing.filter((item) => item.questionId !== answer.questionId);
  updated.push(answer);
  window.localStorage.setItem(`${ANSWER_KEY_PREFIX}${attemptId}`, JSON.stringify(updated));
}

export function clearAttemptData(attemptId: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(`${ANSWER_KEY_PREFIX}${attemptId}`);
  window.localStorage.removeItem(`${CONTEXT_KEY_PREFIX}${attemptId}`);
  const lastAttempt = window.localStorage.getItem(LAST_ATTEMPT_KEY);
  if (lastAttempt === attemptId) {
    window.localStorage.removeItem(LAST_ATTEMPT_KEY);
  }
}

export function clearAllAttempts() {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(window.localStorage);
  keys.forEach((key) => {
    if (key.startsWith(ANSWER_KEY_PREFIX) || key.startsWith(CONTEXT_KEY_PREFIX)) {
      window.localStorage.removeItem(key);
    }
  });
  window.localStorage.removeItem(LAST_ATTEMPT_KEY);
}

export function getLastAttemptId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(LAST_ATTEMPT_KEY);
}
