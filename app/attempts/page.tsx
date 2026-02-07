'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAttempts, fetchMe } from '../../lib/api';
import { ErrorSummary } from '../../components/ErrorSummary';
import type { AttemptListItem } from '../../lib/types';

const PAGE_SIZE = 10;

export default function AttemptsPage() {
  const [attempts, setAttempts] = useState<AttemptListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'ALL' | 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED'>('ALL');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        await fetchMe();
        const result = await fetchAttempts({
          status: status === 'ALL' ? undefined : status,
          page,
          pageSize: PAGE_SIZE,
        });
        setAttempts(result.items);
        setTotal(result.total);
      } catch {
        setError('Unable to load your attempts. Please sign in.');
      }
    }
    load();
  }, [status, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <h1 className="govuk-heading-l">My attempts</h1>
      {error && <ErrorSummary message={error} />}

      {!error && (
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="status-filter">
            Filter by status
          </label>
          <select
            className="govuk-select"
            id="status-filter"
            name="status-filter"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as typeof status);
              setPage(1);
            }}
          >
            <option value="ALL">All</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>
      )}

      {!error && attempts.length === 0 && (
        <p className="govuk-body">No attempts yet.</p>
      )}

      {attempts.length > 0 && (
        <ul className="govuk-list govuk-list--spaced">
          {attempts.map((attempt) => (
            <li key={attempt.id}>
              <h2 className="govuk-heading-s">{attempt.testName}</h2>
              <p className="govuk-body">Status: {attempt.status}</p>
              <p className="govuk-body">Started: {new Date(attempt.startedAt).toLocaleString()}</p>
              <div className="govuk-button-group" role="group" aria-label="Attempt actions">
                <Link
                  className="govuk-button govuk-button--secondary"
                  href={`/tests/attempts/${attempt.id}/results`}
                >
                  View results
                </Link>
                {attempt.status === 'IN_PROGRESS' && !attempt.isExpired && (
                  <Link className="govuk-button" href={`/tests/attempts/${attempt.id}/question/1`}>
                    Resume
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!error && totalPages > 1 && (
        <nav className="govuk-pagination" role="navigation" aria-label="Pagination">
          <div className="govuk-pagination__prev">
            <button
              className="govuk-link"
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1}
            >
              Previous
            </button>
          </div>
          <p className="govuk-body">
            Page {page} of {totalPages}
          </p>
          <div className="govuk-pagination__next">
            <button
              className="govuk-link"
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
