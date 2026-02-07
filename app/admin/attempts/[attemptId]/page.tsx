'use client';

import { useEffect, useMemo, useState } from 'react';
import { ErrorSummary } from '../../../../components/ErrorSummary';
import { fetchAttemptResults, overrideAnswerScore } from '../../../../lib/api';
import type { AttemptResults } from '../../../../lib/types';
import { setToast } from '../../../../lib/toast';
import { AdminGuard } from '../../../../components/AdminGuard';

export default function AdminAttemptDetail({ params }: { params: { attemptId: string } }) {
  const [results, setResults] = useState<AttemptResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [manualOnly, setManualOnly] = useState(false);
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [manualScores, setManualScores] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchAttemptResults(params.attemptId, true)
      .then(setResults)
      .catch(() => setError('Unable to load audit details. Admin access required.'));
  }, [params.attemptId]);

  const filteredAudit = useMemo(() => {
    const audit = results?.audit ?? [];
    return audit.filter((item) => {
      if (manualOnly && !item.manualOverride) return false;
      if (!filter) return true;
      return item.questionId.toLowerCase().includes(filter.toLowerCase());
    });
  }, [results, filter, manualOnly]);

  if (error) {
    return <ErrorSummary message={error} />;
  }

  if (!results) {
    return <p className="govuk-body">Loading audit details...</p>;
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attempt-${results.attemptId}-audit.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    const header = [
      'order',
      'questionId',
      'awardedScore',
      'maxScore',
      'manualOverride',
      'manualScore',
    ];
    const rows = (results.audit ?? []).map((item) => [
      item.order,
      item.questionId,
      item.awardedScore ?? '',
      item.maxScore ?? '',
      item.manualOverride ? 'true' : 'false',
      item.manualScore ?? '',
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attempt-${results.attemptId}-audit.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOverride = async (questionId: string) => {
    const scoreValue = Number(manualScores[questionId]);
    if (Number.isNaN(scoreValue)) {
      setError('Manual score must be a number.');
      return;
    }
    setPending((prev) => ({ ...prev, [questionId]: true }));
    setError(null);
    try {
      await overrideAnswerScore({
        attemptId: results.attemptId,
        questionId,
        manualScore: scoreValue,
        note: notes[questionId],
      });
      setToast({ text: 'Manual score override saved.' });
      setResults((prev) => {
        if (!prev) return prev;
        const updatedAudit = (prev.audit ?? []).map((item) =>
          item.questionId === questionId
            ? { ...item, manualOverride: true, manualScore: scoreValue }
            : item,
        );
        return { ...prev, audit: updatedAudit };
      });
    } catch {
      setError('Unable to override score.');
    } finally {
      setPending((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  return (
    <AdminGuard>
      <div>
        <h1 className="govuk-heading-l">Attempt audit</h1>
        <p className="govuk-body">
          Attempt ID: <strong>{results.attemptId}</strong>
        </p>
        <p className="govuk-body">Status: {results.status}</p>
        <p className="govuk-body">Overall score: {results.overallScore}%</p>
        <div className="govuk-button-group" role="group" aria-label="Audit actions">
          <button className="govuk-button govuk-button--secondary" type="button" onClick={handleDownload}>
            Download JSON
          </button>
          <button className="govuk-button govuk-button--secondary" type="button" onClick={handleDownloadCsv}>
            Download CSV
          </button>
        </div>

        <h2 className="govuk-heading-m">Per-question audit</h2>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="filter">
            Filter by question ID
          </label>
          <input
            className="govuk-input"
            id="filter"
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
        <div className="govuk-form-group">
          <div className="govuk-checkboxes">
            <div className="govuk-checkboxes__item">
              <input
                className="govuk-checkboxes__input"
                id="manual-only"
                name="manual-only"
                type="checkbox"
                checked={manualOnly}
                onChange={(event) => setManualOnly(event.target.checked)}
              />
              <label className="govuk-label govuk-checkboxes__label" htmlFor="manual-only">
                Show manual overrides only
              </label>
            </div>
          </div>
        </div>
        {!results.audit || results.audit.length === 0 ? (
          <p className="govuk-body">No audit details available.</p>
        ) : (
          <div className="govuk-table">
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th className="govuk-table__header" scope="col">
                    Order
                  </th>
                  <th className="govuk-table__header" scope="col">
                    Question ID
                  </th>
                  <th className="govuk-table__header" scope="col">
                    Score
                  </th>
                  <th className="govuk-table__header" scope="col">
                    Response
                  </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {filteredAudit.map((item) => (
                  <tr className="govuk-table__row" key={item.questionId}>
                    <td className="govuk-table__cell">{item.order}</td>
                    <td className="govuk-table__cell">{item.questionId}</td>
                    <td className="govuk-table__cell">
                      {item.awardedScore ?? 0}/{item.maxScore ?? 0}
                      {item.manualOverride && <span className="govuk-tag">Manual</span>}
                    </td>
                    <td className="govuk-table__cell">
                      <details className="govuk-details" data-module="govuk-details">
                        <summary className="govuk-details__summary">
                          <span className="govuk-details__summary-text">View</span>
                        </summary>
                        <div className="govuk-details__text">
                          <pre className="govuk-body">{JSON.stringify(item.response, null, 2)}</pre>
                          <pre className="govuk-body">
                            {JSON.stringify(item.behaviourContributions, null, 2)}
                          </pre>
                          {item.rubricBreakdown && (
                            <pre className="govuk-body">{JSON.stringify(item.rubricBreakdown, null, 2)}</pre>
                          )}
                        </div>
                      </details>
                      <div className="govuk-form-group">
                        <label className="govuk-label" htmlFor={`score-${item.questionId}`}>
                          Manual score override
                        </label>
                        <input
                          className="govuk-input"
                          id={`score-${item.questionId}`}
                          type="number"
                          step="0.1"
                          value={manualScores[item.questionId] ?? ''}
                          onChange={(event) =>
                            setManualScores((prev) => ({
                              ...prev,
                              [item.questionId]: event.target.value,
                            }))
                          }
                        />
                        <label className="govuk-label" htmlFor={`note-${item.questionId}`}>
                          Note
                        </label>
                        <input
                          className="govuk-input"
                          id={`note-${item.questionId}`}
                          type="text"
                          value={notes[item.questionId] ?? ''}
                          onChange={(event) =>
                            setNotes((prev) => ({
                              ...prev,
                              [item.questionId]: event.target.value,
                            }))
                          }
                        />
                        <button
                          className="govuk-button govuk-button--secondary"
                          type="button"
                          onClick={() => handleOverride(item.questionId)}
                          disabled={pending[item.questionId]}
                        >
                          {pending[item.questionId] ? 'Saving...' : 'Save override'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
