'use client';

import { useEffect, useState } from 'react';
import { fetchMe } from '../lib/api';
import { ErrorSummary } from './ErrorSummary';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    fetchMe()
      .then((user) => {
        setAllowed(user.role === 'ADMIN');
      })
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) {
    return <p className="govuk-body">Checking access...</p>;
  }

  if (!allowed) {
    return <ErrorSummary message="Admin access required." />;
  }

  return <>{children}</>;
}
