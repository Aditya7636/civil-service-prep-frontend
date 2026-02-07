'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAttempts, fetchTests } from '../lib/api';
import type { AttemptListItem, TestListItem } from '../lib/types';
import { ErrorSummary } from '../components/ErrorSummary';

export default function HomePage() {
  const [tests, setTests] = useState<TestListItem[]>([]);
  const [resumeAttempt, setResumeAttempt] = useState<AttemptListItem | null>(null);
  const [resumeBlocked, setResumeBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const minResumeMinutes = 2;

  useEffect(() => {
    fetchTests()
      .then(setTests)
      .catch(() => setError('Unable to load tests.'));
  }, []);

  useEffect(() => {
    fetchAttempts({ status: 'IN_PROGRESS', page: 1, pageSize: 5 })
      .then((result) => {
        const available = result.items.find((attempt) => !attempt.isExpired);
        if (available) {
          const expiresAt = available.expiresAt ? new Date(available.expiresAt).getTime() : 0;
          const remainingMinutes = expiresAt > 0 ? (expiresAt - Date.now()) / 60000 : 0;
          if (remainingMinutes >= minResumeMinutes) {
            setResumeAttempt(available);
          } else {
            setResumeBlocked(true);
          }
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <div>
      <h1 className="govuk-heading-l">Civil Service Practice Tests</h1>
      <p className="govuk-body">
        Select a test to begin. This platform is advisory and not affiliated with the Civil Service.
      </p>

      {error && <ErrorSummary message={error} />}

      {resumeAttempt && (
        <div className="govuk-inset-text">
          <p className="govuk-body">
            Resume your last attempt{resumeAttempt.testName ? `: ${resumeAttempt.testName}` : ''}.
          </p>
          <Link className="govuk-link" href={`/tests/attempts/${resumeAttempt.id}/question/1`}>
            Resume attempt
          </Link>
        </div>
      )}
      {resumeBlocked && !resumeAttempt && (
        <div className="govuk-inset-text">
          <p className="govuk-body">Your last attempt is too close to expiry to resume.</p>
        </div>
      )}

      {tests.length === 0 && !error ? (
        <p className="govuk-body">No tests available yet.</p>
      ) : (
        <ul className="govuk-list">
          {tests.map((test) => (
            <li key={test.id}>
              <Link className="govuk-link" href={`/tests/${test.id}/start`}>
                {test.name}
              </Link>
              {test.grade && <span className="govuk-body"> — {test.grade}</span>}
            </li>
          ))}
        </ul>
      )}

      <p className="govuk-body">
        <Link className="govuk-link" href="/attempts">
          View your attempts
        </Link>
      </p>
    </div>
  );
}
