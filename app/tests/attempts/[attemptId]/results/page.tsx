'use client';

import { useEffect, useState } from 'react';
import { BehaviourScoreCard } from '../../../../../components/BehaviourScoreCard';
import { fetchAttemptResults } from '../../../../../lib/api';
import type { AttemptResults } from '../../../../../lib/types';

export default function ResultsPage({ params }: { params: { attemptId: string } }) {
  const [results, setResults] = useState<AttemptResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAttemptResults(params.attemptId)
      .then(setResults)
      .catch(() => setError('Unable to load results.'));
  }, [params.attemptId]);

  if (error) {
    return <p className="govuk-error-message">{error}</p>;
  }

  if (!results) {
    return <p className="govuk-body">Loading results...</p>;
  }

  const sortedScores = [...results.behaviourScores].sort((a, b) => b.score - a.score);
  const strengths = sortedScores.slice(0, 2);
  const development = sortedScores.slice(-2).reverse();

  return (
    <div>
      <h1 className="govuk-heading-l">Your results</h1>
      <p className="govuk-body">
        Overall score: <strong>{results.overallScore}%</strong>
      </p>

      <h2 className="govuk-heading-m">Behaviour breakdown</h2>
      <div className="govuk-grid-row">
        {results.behaviourScores.map((score) => (
          <div className="govuk-grid-column-one-half" key={score.behaviour}>
            <BehaviourScoreCard score={score} />
          </div>
        ))}
      </div>

      <h2 className="govuk-heading-m">Strengths</h2>
      <ul className="govuk-list govuk-list--bullet">
        {strengths.map((score) => (
          <li key={score.behaviour}>{score.behaviour}</li>
        ))}
      </ul>

      <h2 className="govuk-heading-m">Development areas</h2>
      <ul className="govuk-list govuk-list--bullet">
        {development.map((score) => (
          <li key={score.behaviour}>{score.behaviour}</li>
        ))}
      </ul>
    </div>
  );
}
