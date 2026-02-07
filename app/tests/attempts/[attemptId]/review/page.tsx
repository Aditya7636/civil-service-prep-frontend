'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchTestMetadata } from '../../../../../lib/api';
import { loadAnswers, loadContext } from '../../../../../lib/storage';
import type { TestMetadata } from '../../../../../lib/types';
import { ErrorSummary } from '../../../../../components/ErrorSummary';

export default function ReviewPage({ params }: { params: { attemptId: string } }) {
  const router = useRouter();
  const [test, setTest] = useState<TestMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const context = useMemo(() => loadContext(params.attemptId), [params.attemptId]);

  useEffect(() => {
    if (!context) {
      setError('Missing test context.');
      return;
    }
    fetchTestMetadata(context.testId)
      .then(setTest)
      .catch(() => setError('Unable to load test details.'));
  }, [context]);

  const answers = loadAnswers(params.attemptId);

  if (error) {
    return <ErrorSummary message={error} />;
  }

  if (!context || !test) {
    return <p className="govuk-body">Loading...</p>;
  }

  const unanswered = context.questionOrder.filter((questionId) => {
    const entry = answers.find((item) => item.questionId === questionId);
    if (!entry) return true;
    if (entry.response === null || entry.response === undefined) return true;
    if (typeof entry.response === 'string' && entry.response.trim().length === 0) return true;
    if (Array.isArray(entry.response) && entry.response.length === 0) return true;
    return false;
  });

  return (
    <div>
      <h1 className="govuk-heading-l">Review your answers</h1>
      <p className="govuk-body">Check your answers before submitting.</p>
      {unanswered.length > 0 && (
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">
            !
          </span>
          <strong className="govuk-warning-text__text">
            <span className="govuk-warning-text__assistive">Warning</span>
            You have {unanswered.length} unanswered question{unanswered.length > 1 ? 's' : ''}.
          </strong>
        </div>
      )}
      <ol className="govuk-list govuk-list--number">
        {context.questionOrder.map((questionId, index) => {
          const question = test.questions.find((item) => item.id === questionId);
          const answer = answers.find((item) => item.questionId === questionId);
          const isUnanswered = unanswered.includes(questionId);
          return (
            <li key={questionId}>
              <p className="govuk-body">
                <strong>Question {index + 1}:</strong> {question?.prompt ?? 'Question'}
              </p>
              <p className="govuk-body">
                Your answer:{' '}
                {isUnanswered ? (
                  <span className="govuk-tag govuk-tag--yellow">Unanswered</span>
                ) : (
                  String(answer?.response ?? 'Not answered')
                )}
              </p>
              <Link
                className="govuk-link"
                href={`/tests/attempts/${params.attemptId}/question/${index + 1}`}
              >
                Change answer
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="govuk-button-group" role="group" aria-label="Review actions">
        <button
          className="govuk-button"
          type="button"
          onClick={() => router.push(`/tests/attempts/${params.attemptId}/complete`)}
        >
          Continue to submit
        </button>
      </div>
    </div>
  );
}
