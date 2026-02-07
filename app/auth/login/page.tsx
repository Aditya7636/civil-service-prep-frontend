'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../../lib/api';
import { setToken } from '../../../lib/auth';
import { ErrorSummary } from '../../../components/ErrorSummary';
import { setToast } from '../../../lib/toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      setToken(result.token);
      setToast({ text: 'Signed in successfully.' });
      router.push('/');
    } catch {
      setError('Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="govuk-heading-l">Sign in</h1>
      {error && <ErrorSummary message={error} />}
      <form onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="govuk-button" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="govuk-body">
        Don’t have an account? <Link className="govuk-link" href="/auth/register">Create one</Link>
      </p>
    </div>
  );
}
