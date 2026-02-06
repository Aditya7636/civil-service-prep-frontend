'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTestMetadata, startTest } from '../../../../lib/api';
import { saveContext } from '../../../../lib/storage';
import type { TestMetadata } from '../../../../lib/types';

export default function TestStartPage({ params }: { params: { testId: string } }) {
  const router = useRouter();
  const [test, setTest] = useState<TestMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    fetchTestMetadata(params.testId)
      .then(setTest)
      .catch(() => setError('Unable to load test details.'));
  }, [params.testId]);

  const handleStart = async () => {
    if (!test) return;
    setStarting(true);
    try {
      const response = await startTest(test.id, 'user-placeholder');
      saveContext({
        testId: test.id,
        attemptId: response.attemptId,
        questionOrder: response.questionOrder,
        startedAt: response.startedAt,
        timeLimit: test.timeLimit,
      });
      router.push(`/tests/attempts/${response.attemptId}/question/1`);
    } catch (err) {
      setError('Unable to start test.');
    } finally {
      setStarting(false);
    }
  };

  return (
    <div>
      <h1 className="govuk-heading-l">Start Test</h1>
      {error && <p className="govuk-error-message">{error}</p>}
      {!test ? (
        <p className="govuk-body">Loading test metadata...</p>
      ) : (
        <div>
          <h2 className="govuk-heading-m">{test.name}</h2>
          <p className="govuk-body">Time limit: {test.timeLimit} minutes</p>
          <button
            className="govuk-button"
            data-module="govuk-button"
            type="button"
            onClick={handleStart}
            disabled={starting}
          >
            {starting ? 'Starting...' : 'Start test'}
          </button>
        </div>
      )}
    </div>
  );
}
