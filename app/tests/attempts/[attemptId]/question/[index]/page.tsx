'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionRenderer } from '../../../../../../components/QuestionRenderer';
import { ErrorSummary } from '../../../../../../components/ErrorSummary';
import { ProgressIndicator } from '../../../../../../components/ProgressIndicator';
import { Timer } from '../../../../../../components/Timer';
import { fetchTestMetadata } from '../../../../../../lib/api';
import { loadAnswers, loadContext, saveAnswer } from '../../../../../../lib/storage';
import type { TestMetadata } from '../../../../../../lib/types';

export default function TestQuestionPage({
  params,
}: {
  params: { attemptId: string; index: string };
}) {
  const router = useRouter();
  const index = Number(params.index);
  const [test, setTest] = useState<TestMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const context = useMemo(() => loadContext(params.attemptId), [params.attemptId]);

  useEffect(() => {
    if (!context) {
      setError('Missing test context. Please restart the test.');
      return;
    }
    fetchTestMetadata(context.testId)
      .then(setTest)
      .catch(() => setError('Unable to load test details.'));
  }, [context]);

  const order = context?.questionOrder ?? [];
  const questionId = order[index - 1];
  const question = test?.questions.find((item) => item.id === questionId);
  const storedAnswer = loadAnswers(params.attemptId).find((a) => a.questionId === questionId);

  if (!context || !test) {
    return (
      <div>
        <h1 className="govuk-heading-l">Question</h1>
        {error ? <ErrorSummary message={error} /> : <p>Loading...</p>}
      </div>
    );
  }

  if (!question) {
    return (
      <div>
        <h1 className="govuk-heading-l">Question</h1>
        <ErrorSummary message="Question not found." />
      </div>
    );
  }

  const handleChange = (response: unknown) => {
    saveAnswer(params.attemptId, { questionId: question.id, response });
  };

  const handleNext = () => {
    if (index < 1 || index > order.length) {
      router.push(`/tests/attempts/${params.attemptId}/question/1`);
      return;
    }
    if (index < order.length) {
      router.push(`/tests/attempts/${params.attemptId}/question/${index + 1}`);
    } else {
      router.push(`/tests/attempts/${params.attemptId}/review`);
    }
  };

  const handlePrevious = () => {
    if (index > 1) {
      router.push(`/tests/attempts/${params.attemptId}/question/${index - 1}`);
    }
  };

  return (
    <div>
      <ProgressIndicator current={index} total={order.length} />
      <Timer startedAt={context.startedAt} timeLimitMinutes={context.timeLimit} />
      <QuestionRenderer
        questionId={question.id}
        prompt={question.prompt}
        type={question.type}
        options={question.options}
        initialResponse={storedAnswer?.response}
        onChange={handleChange}
      />
      <div className="govuk-button-group" role="group" aria-label="Question navigation">
        <button
          className="govuk-button govuk-button--secondary"
          type="button"
          onClick={handlePrevious}
          disabled={index <= 1}
        >
          Previous
        </button>
        <button className="govuk-button" type="button" onClick={handleNext}>
          {index < order.length ? 'Next' : 'Review answers'}
        </button>
      </div>
    </div>
  );
}
