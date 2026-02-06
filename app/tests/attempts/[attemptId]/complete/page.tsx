'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitTest } from '../../../../../lib/api';
import { clearAttemptData, loadAnswers, loadContext } from '../../../../../lib/storage';

export default function TestCompletionPage({ params }: { params: { attemptId: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const context = useMemo(() => loadContext(params.attemptId), [params.attemptId]);

  const handleSubmit = async () => {
    if (!context) {
      setError('Missing test context.');
      return;
    }
    setSubmitting(true);
    try {
      const answers = loadAnswers(params.attemptId).map((item) => ({
        questionId: item.questionId,
        response: item.response,
      }));
      await submitTest(context.testId, params.attemptId, answers);
      clearAttemptData(params.attemptId);
      router.push(`/tests/attempts/${params.attemptId}/results`);
    } catch (err) {
      setError('Unable to submit. Your test may have expired or already been submitted.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="govuk-heading-l">Submit your test</h1>
      <p className="govuk-body">
        Review your answers and submit when ready. Once submitted, you cannot change your answers.
      </p>
      {error && <p className="govuk-error-message">{error}</p>}
      <button
        className="govuk-button"
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit test'}
      </button>
    </div>
  );
}
