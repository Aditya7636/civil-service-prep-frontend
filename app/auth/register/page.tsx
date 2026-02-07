'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '../../../lib/api';
import { setToken } from '../../../lib/auth';
import { ErrorSummary } from '../../../components/ErrorSummary';
import { setToast } from '../../../lib/toast';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await register(name, email, password);
      setToken(result.token);
      setToast({ text: 'Account created and signed in.' });
      router.push('/');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="govuk-heading-l">Create account</h1>
      {error && <ErrorSummary message={error} />}
      <form onSubmit={handleSubmit}>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="name">
            Full name
          </label>
          <input
            className="govuk-input"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="email">
            Email
          </label>
          <input
            className="govuk-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="password">
            Password
          </label>
          <input
            className="govuk-input"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <p className="govuk-hint">Minimum 8 characters.</p>
        </div>
        <button className="govuk-button" type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <p className="govuk-body">
        Already have an account? <Link className="govuk-link" href="/auth/login">Sign in</Link>
      </p>
    </div>
  );
}
