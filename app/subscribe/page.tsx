'use client';

import { useMemo, useState } from 'react';
import { ErrorSummary } from '../../components/ErrorSummary';
import { createSubscription, fetchMe } from '../../lib/api';
import { setToast } from '../../lib/toast';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '£9.99 / month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER ?? '',
    features: ['Practice tests', 'Behaviour library', 'Progress dashboard'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '£19.99 / month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO ?? '',
    features: ['Everything in Starter', 'Mock interview scoring', 'Coach feedback'],
  },
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0].id);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const current = useMemo(() => PLANS.find((plan) => plan.id === selectedPlan), [selectedPlan]);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!current?.priceId) {
        throw new Error('Missing price id');
      }
      const me = await fetchMe();
      await createSubscription({ userId: me.id, priceId: current.priceId });
      setToast({ text: 'Subscription created.' });
    } catch {
      setError('Unable to start subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="govuk-heading-l">Subscribe</h1>
      <p className="govuk-body">Choose a plan to unlock full access.</p>
      {error && <ErrorSummary message={error} />}

      <form onSubmit={handleSubscribe}>
        <div className="govuk-radios" data-module="govuk-radios">
          {PLANS.map((plan) => (
            <div className="govuk-radios__item" key={plan.id}>
              <input
                className="govuk-radios__input"
                id={`plan-${plan.id}`}
                name="plan"
                type="radio"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={() => setSelectedPlan(plan.id)}
              />
              <label className="govuk-label govuk-radios__label" htmlFor={`plan-${plan.id}`}>
                {plan.name} — {plan.price}
              </label>
              <div className="govuk-hint">
                <ul className="govuk-list govuk-list--bullet">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button className="govuk-button" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Start subscription'}
        </button>
      </form>
    </div>
  );
}
