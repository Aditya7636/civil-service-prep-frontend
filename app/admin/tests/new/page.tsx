'use client';

import { useEffect, useMemo, useState } from 'react';
import { ErrorSummary } from '../../../../components/ErrorSummary';
import {
  addQuestionToTest,
  createTest,
  fetchAdminQuestions,
  publishTest,
} from '../../../../lib/api';
import { setToast } from '../../../../lib/toast';
import type { AdminQuestionListItem } from '../../../../lib/types';
import { AdminGuard } from '../../../../components/AdminGuard';

const PAGE_SIZE = 10;

export default function AdminTestWizard() {
  const [error, setError] = useState<string | null>(null);
  const [testId, setTestId] = useState<string | null>(null);
  const [testForm, setTestForm] = useState({
    name: '',
    type: 'SJT',
    timeLimit: 30,
    gradeId: '',
  });
  const [questionId, setQuestionId] = useState('');
  const [order, setOrder] = useState('');
  const [added, setAdded] = useState<Array<{ questionId: string; order?: number }>>([]);
  const [published, setPublished] = useState(false);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<AdminQuestionListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!testId) return;
    fetchAdminQuestions({
      q: search || undefined,
      type: typeFilter || undefined,
      gradeId: gradeFilter || undefined,
      page,
      pageSize: PAGE_SIZE,
    })
      .then((data) => {
        setResults(data.items);
        setTotal(data.total);
      })
      .catch(() => setError('Failed to load question bank.'));
  }, [testId, search, typeFilter, gradeFilter, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const hasValidTest = useMemo(() => {
    return testForm.name.trim().length > 0 && testForm.gradeId.trim().length > 0;
  }, [testForm]);

  const handleCreateTest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasValidTest) {
      setError('Please complete all required fields.');
      return;
    }
    setError(null);
    try {
      const result = await createTest({
        name: testForm.name,
        type: testForm.type,
        timeLimit: Number(testForm.timeLimit),
        gradeId: testForm.gradeId,
      });
      setTestId(result.id);
      setToast({ text: 'Test created. Add questions below.' });
    } catch {
      setError('Failed to create test.');
    }
  };

  const handleAddQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!testId) {
      setError('Create the test first.');
      return;
    }
    setError(null);
    try {
      await addQuestionToTest({
        testId,
        questionId,
        order: order ? Number(order) : undefined,
      });
      setAdded((prev) => [...prev, { questionId, order: order ? Number(order) : undefined }]);
      setQuestionId('');
      setOrder('');
      setToast({ text: 'Question added to test.' });
    } catch {
      setError('Failed to add question to test.');
    }
  };

  const handleAddFromBank = async (question: AdminQuestionListItem) => {
    if (!testId) return;
    try {
      await addQuestionToTest({ testId, questionId: question.id });
      setAdded((prev) => [...prev, { questionId: question.id }]);
      setToast({ text: 'Question added to test.' });
    } catch {
      setError('Failed to add question to test.');
    }
  };

  const handleAddSelected = async () => {
    if (!testId) return;
    const ids = Object.keys(selectedIds).filter((id) => selectedIds[id]);
    if (ids.length === 0) return;
    try {
      await Promise.all(ids.map((id) => addQuestionToTest({ testId, questionId: id })));
      setAdded((prev) => [...prev, ...ids.map((id) => ({ questionId: id }))]);
      setSelectedIds({});
      setToast({ text: `${ids.length} question(s) added.` });
    } catch {
      setError('Failed to add selected questions.');
    }
  };

  const handlePublish = async () => {
    if (!testId) return;
    if (added.length === 0) {
      setError('Add at least one question before publishing.');
      return;
    }
    setError(null);
    try {
      await publishTest(testId);
      setPublished(true);
      setToast({ text: 'Test published.' });
    } catch {
      setError('Failed to publish test.');
    }
  };

  return (
    <AdminGuard>
      <div>
        <h1 className="govuk-heading-l">Create test</h1>
        {error && <ErrorSummary message={error} />}

        {!testId && (
          <form onSubmit={handleCreateTest}>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="test-name">
                Test name
              </label>
              <input
                className="govuk-input"
                id="test-name"
                value={testForm.name}
                onChange={(event) => setTestForm({ ...testForm, name: event.target.value })}
                required
              />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="test-type">
                Type
              </label>
              <select
                className="govuk-select"
                id="test-type"
                value={testForm.type}
                onChange={(event) => setTestForm({ ...testForm, type: event.target.value })}
              >
                <option value="CSJT">CSJT</option>
                <option value="SJT">SJT</option>
                <option value="NUMERICAL">Numerical</option>
                <option value="TECHNICAL">Technical</option>
                <option value="MIXED">Mixed</option>
              </select>
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="test-time">
                Time limit (minutes)
              </label>
              <input
                className="govuk-input"
                id="test-time"
                type="number"
                min={1}
                value={testForm.timeLimit}
                onChange={(event) =>
                  setTestForm({ ...testForm, timeLimit: Number(event.target.value) })
                }
              />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="test-grade">
                Grade ID
              </label>
              <input
                className="govuk-input"
                id="test-grade"
                value={testForm.gradeId}
                onChange={(event) => setTestForm({ ...testForm, gradeId: event.target.value })}
                required
              />
            </div>
            <button className="govuk-button" type="submit" disabled={!hasValidTest}>
              Create test
            </button>
          </form>
        )}

        {testId && (
          <div>
            <p className="govuk-body">
              Test created: <strong>{testId}</strong>
            </p>
            <div className="govuk-button-group" role="group" aria-label="Publish actions">
              <button className="govuk-button" type="button" onClick={handlePublish} disabled={published}>
                {published ? 'Published' : 'Publish test'}
              </button>
            </div>

            <h2 className="govuk-heading-m">Quick add by ID</h2>
            <form onSubmit={handleAddQuestion}>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="question-id">
                  Question ID
                </label>
                <input
                  className="govuk-input"
                  id="question-id"
                  value={questionId}
                  onChange={(event) => setQuestionId(event.target.value)}
                  required
                />
              </div>
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="question-order">
                  Order (optional)
                </label>
                <input
                  className="govuk-input"
                  id="question-order"
                  type="number"
                  min={1}
                  value={order}
                  onChange={(event) => setOrder(event.target.value)}
                />
              </div>
              <button className="govuk-button" type="submit">
                Add question
              </button>
            </form>

            <h2 className="govuk-heading-m">Question bank</h2>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="search">
                Search prompt
              </label>
              <input
                className="govuk-input"
                id="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="type-filter">
                Type
              </label>
              <select
                className="govuk-select"
                id="type-filter"
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">All</option>
                <option value="MCQ">MCQ</option>
                <option value="SJT">SJT</option>
                <option value="NUMERICAL">Numerical</option>
                <option value="FREE_TEXT">Free text</option>
                <option value="TECHNICAL">Technical</option>
              </select>
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="grade-filter">
                Grade ID
              </label>
              <input
                className="govuk-input"
                id="grade-filter"
                value={gradeFilter}
                onChange={(event) => {
                  setGradeFilter(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            {results.length === 0 ? (
              <p className="govuk-body">No questions found.</p>
            ) : (
              <div>
                <div className="govuk-button-group" role="group" aria-label="Bulk actions">
                  <button
                    className="govuk-button govuk-button--secondary"
                    type="button"
                    onClick={handleAddSelected}
                  >
                    Add selected
                  </button>
                </div>
                <ul className="govuk-list govuk-list--spaced">
                  {results.map((question) => (
                    <li key={question.id}>
                      <div className="govuk-checkboxes">
                        <div className="govuk-checkboxes__item">
                          <input
                            className="govuk-checkboxes__input"
                            id={`select-${question.id}`}
                            type="checkbox"
                            checked={!!selectedIds[question.id]}
                            onChange={(event) =>
                              setSelectedIds((prev) => ({
                                ...prev,
                                [question.id]: event.target.checked,
                              }))
                            }
                          />
                          <label className="govuk-label govuk-checkboxes__label" htmlFor={`select-${question.id}`}>
                            <strong>{question.type}</strong> — {question.prompt}
                          </label>
                        </div>
                      </div>
                      <button
                        className="govuk-button govuk-button--secondary"
                        type="button"
                        onClick={() => handleAddFromBank(question)}
                      >
                        Add to test
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {totalPages > 1 && (
              <div className="govuk-button-group" role="group" aria-label="Question bank pagination">
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

            {added.length > 0 && (
              <div>
                <h3 className="govuk-heading-s">Added questions</h3>
                <ul className="govuk-list">
                  {added.map((item) => (
                    <li key={`${item.questionId}-${item.order ?? 'none'}`}>
                      {item.questionId} {item.order ? `(order ${item.order})` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
