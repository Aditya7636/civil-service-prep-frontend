'use client';

import { useEffect, useState } from 'react';
import { clearToast, getToast } from '../lib/toast';

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const toast = getToast();
    if (toast?.text) {
      setMessage(toast.text);
      clearToast();
    }
  }, []);

  if (!message) return null;

  return (
    <div className="govuk-notification-banner" role="alert" aria-live="polite">
      <div className="govuk-notification-banner__content">
        <p className="govuk-notification-banner__heading">{message}</p>
      </div>
    </div>
  );
}
