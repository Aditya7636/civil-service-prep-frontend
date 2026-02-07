const STORAGE_KEY = 'csp_user_id';

export function getUserId() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY) ?? process.env.NEXT_PUBLIC_DEFAULT_USER_ID ?? '';
}

export function setUserId(userId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, userId);
}
