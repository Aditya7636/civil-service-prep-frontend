'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ErrorSummary } from '../../components/ErrorSummary';
import { createBehaviour, createQuestion, fetchAdminAnalytics } from '../../lib/api';
import { setToast } from '../../lib/toast';
import type { AdminAnalytics } from '../../lib/types';
import { AdminGuard } from '../../components/AdminGuard';

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [behaviourForm, setBehaviourForm] = useState({ name: '', description: '', gradeId: '' });
  const [questionForm, setQuestionForm] = useState({
    prompt: '',
    type: 'MCQ',
    gradeId: '',
    difficulty: 2,
    behaviourIds: '',
  });

  useEffect(() => {
    fetchAdminAnalytics()
      .then(setAnalytics)
      .catch(() => setError('Unable to load admin analytics.'));
  }, []);

  const handleCreateBehaviour = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBehaviour(behaviourForm);
      setToast({ text: 'Behaviour created.' });
      setBehaviourForm({ name: '', description: '', gradeId: '' });
    } catch {
      setError('Failed to create behaviour.');
    }
  };

  const handleCreateQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createQuestion({
        prompt: questionForm.prompt,
        type: questionForm.type,
        gradeId: questionForm.gradeId,
        difficulty: Number(questionForm.difficulty),
        behaviourIds: questionForm.behaviourIds
          ? questionForm.behaviourIds.split(',').map((id) => id.trim())
          : undefined,
      });
      setToast({ text: 'Question created.' });
      setQuestionForm({
        prompt: '',
        type: 'MCQ',
        gradeId: '',
        difficulty: 2,
        behaviourIds: '',
      });
    } catch {
      setError('Failed to create question.');
    }
  };

  return (
    <AdminGuard>
      <div>
        <h1 className="govuk-heading-l">Admin console</h1>
        {error && <ErrorSummary message={error} />}

        <p className="govuk-body">
          <Link className="govuk-link" href="/admin/tests/new">
            Create a new test
          </Link>
        </p>
        <p className="govuk-body">
          <Link className="govuk-link" href="/admin/tests">
            Manage tests
          </Link>
        </p>

        <h2 className="govuk-heading-m">Analytics</h2>
        {!analytics ? (
          <p className="govuk-body">Loading analytics...</p>
        ) : (
          <ul className="govuk-list">
            <li>Users: {analytics.users}</li>
            <li>Tests completed: {analytics.testsCompleted}</li>
            <li>Conversion rate: {analytics.conversionRate}%</li>
          </ul>
        )}

        <h2 className="govuk-heading-m">Create behaviour</h2>
        <form onSubmit={handleCreateBehaviour}>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="behaviour-name">
              Name
            </label>
            <input
              className="govuk-input"
              id="behaviour-name"
              value={behaviourForm.name}
              onChange={(event) => setBehaviourForm({ ...behaviourForm, name: event.target.value })}
              required
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="behaviour-description">
              Description
            </label>
            <textarea
              className="govuk-textarea"
              id="behaviour-description"
              rows={4}
              value={behaviourForm.description}
              onChange={(event) =>
                setBehaviourForm({ ...behaviourForm, description: event.target.value })
              }
              required
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="behaviour-grade">
              Grade ID
            </label>
            <input
              className="govuk-input"
              id="behaviour-grade"
              value={behaviourForm.gradeId}
              onChange={(event) => setBehaviourForm({ ...behaviourForm, gradeId: event.target.value })}
              required
            />
          </div>
          <button className="govuk-button" type="submit">
            Create behaviour
          </button>
        </form>

        <h2 className="govuk-heading-m">Create question</h2>
        <form onSubmit={handleCreateQuestion}>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="question-prompt">
              Prompt
            </label>
            <textarea
              className="govuk-textarea"
              id="question-prompt"
              rows={4}
              value={questionForm.prompt}
              onChange={(event) => setQuestionForm({ ...questionForm, prompt: event.target.value })}
              required
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="question-type">
              Type
            </label>
            <select
              className="govuk-select"
              id="question-type"
              value={questionForm.type}
              onChange={(event) => setQuestionForm({ ...questionForm, type: event.target.value })}
            >
              <option value="MCQ">MCQ</option>
              <option value="SJT">SJT</option>
              <option value="NUMERICAL">Numerical</option>
              <option value="FREE_TEXT">Free text</option>
              <option value="TECHNICAL">Technical</option>
            </select>
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="question-grade">
              Grade ID
            </label>
            <input
              className="govuk-input"
              id="question-grade"
              value={questionForm.gradeId}
              onChange={(event) => setQuestionForm({ ...questionForm, gradeId: event.target.value })}
              required
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="question-difficulty">
              Difficulty (1-5)
            </label>
            <input
              className="govuk-input"
              id="question-difficulty"
              type="number"
              min={1}
              max={5}
              value={questionForm.difficulty}
              onChange={(event) =>
                setQuestionForm({ ...questionForm, difficulty: Number(event.target.value) })
              }
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="question-behaviours">
              Behaviour IDs (comma separated)
            </label>
            <input
              className="govuk-input"
              id="question-behaviours"
              value={questionForm.behaviourIds}
              onChange={(event) =>
                setQuestionForm({ ...questionForm, behaviourIds: event.target.value })
              }
            />
          </div>
          <button className="govuk-button" type="submit">
            Create question
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}
