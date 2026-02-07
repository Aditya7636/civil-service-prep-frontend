'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminGuard } from '../../components/AdminGuard';
import { ErrorSummary } from '../../components/ErrorSummary';
import { fetchAdminTests, publishTest, unpublishTest } from '../../lib/api';
import type { AdminTestListItem } from '../../lib/types';
import { setToast } from '../../lib/toast';

const PAGE_SIZE = 10;

export default function AdminTestsPage() {
  const [tests, setTests] = useState<AdminTestListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [published, setPublished] = useState<'ALL' | 'PUBLISHED' | 'UNPUBLISHED'>('ALL');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchAdminTests({
      q: query || undefined,
      published: published === 'ALL' ? undefined : published === 'PUBLISHED',
      page,
      pageSize: PAGE_SIZE,
    })
      .then((data) => {
        setTests(data.items);
        setTotal(data.total);
      })
      .catch(() => setError('Unable to load tests.'));
  }, [query, published, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleToggle = async (test: AdminTestListItem) => {
    try {
      if (test.isPublished) {
        await unpublishTest(test.id);
        setToast({ text: 'Test unpublished.' });
      } else {
        await publishTest(test.id);
        setToast({ text: 'Test published.' });
      }
      setTests((prev) =>
        prev.map((item) =>
          item.id === test.id ? { ...item, isPublished: !item.isPublished } : item,
        ),
      );
    } catch {
      setError('Unable to update test status.');
    }
  };

  return (
    <AdminGuard>
      <div>
        <h1 className="govuk-heading-l">Manage tests</h1>
        {error && <ErrorSummary message={error} />}

        <p className="govuk-body">
          <Link className="govuk-link" href="/admin/tests/new">
            Create a new test
          </Link>
        </p>

        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="query">
            Search
          </label>
          <input
            className="govuk-input"
            id="query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="published-filter">
            Published status
          </label>
          <select
            className="govuk-select"
            id="published-filter"
            value={published}
            onChange={(event) => {
              setPublished(event.target.value as typeof published);
              setPage(1);
            }}
          >
            <option value="ALL">All</option>
            <option value="PUBLISHED">Published</option>
            <option value="UNPUBLISHED">Unpublished</option>
          </select>
        </div>

        {tests.length === 0 && !error ? (
          <p className="govuk-body">No tests found.</p>
        ) : (
          <ul className="govuk-list govuk-list--spaced">
            {tests.map((test) => (
              <li key={test.id}>
                <h2 className="govuk-heading-s">{test.name}</h2>
                <p className="govuk-body">Type: {test.type}</p>
                <p className="govuk-body">Grade: {test.grade ?? '—'}</p>
                <p className="govuk-body">Time limit: {test.timeLimit} mins</p>
                <p className="govuk-body">
                  Status: {test.isPublished ? 'Published' : 'Unpublished'}
                </p>
                <div className="govuk-button-group" role="group" aria-label="Test actions">
                  <button
                    className="govuk-button govuk-button--secondary"
                    type="button"
                    onClick={() => handleToggle(test)}
                  >
                    {test.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link className="govuk-button govuk-button--secondary" href={`/admin/tests/new`}>
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="govuk-button-group" role="group" aria-label="Pagination">
            <button
              className="govuk-button govuk-button--secondary"
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1}
            >
              Previous
            </button>
            <button
              className="govuk-button govuk-button--secondary"
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
