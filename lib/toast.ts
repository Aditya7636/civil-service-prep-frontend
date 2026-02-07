const TOAST_KEY = 'csp_toast';

export type ToastMessage = {
  text: string;
};

export function setToast(message: ToastMessage) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(TOAST_KEY, JSON.stringify(message));
}

export function getToast(): ToastMessage | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(TOAST_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ToastMessage;
  } catch {
    return null;
  }
}

export function clearToast() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(TOAST_KEY);
}
