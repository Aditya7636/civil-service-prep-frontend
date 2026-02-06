import type { BehaviourScore } from '../lib/types';

export function BehaviourScoreCard({ score }: { score: BehaviourScore }) {
  return (
    <div className="govuk-summary-card">
      <div className="govuk-summary-card__title-wrapper">
        <h3 className="govuk-summary-card__title">{score.behaviour}</h3>
      </div>
      <div className="govuk-summary-card__content">
        <p className="govuk-body">Score: {score.score.toFixed(2)} / 4</p>
      </div>
    </div>
  );
}
