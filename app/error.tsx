'use client';

import { useEffect } from 'react';
import { ErrorSummary } from '../components/ErrorSummary';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 className="govuk-heading-l">Something went wrong</h1>
      <ErrorSummary message="We couldn't load this page. Please try again." />
    </div>
  );
}
