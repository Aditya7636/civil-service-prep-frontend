'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, AlertCircle } from '../../components/marketing/icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const [loading] = useState(false);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-[var(--sand-100)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-[var(--teal-600)] rounded-lg p-2">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl mb-2 text-[var(--navy-900)]">Welcome back</h1>
          <p className="text-[var(--navy-600)]">Sign in to continue your preparation</p>
        </div>

        <div className="border border-[var(--sand-300)] shadow-lg rounded-xl bg-white">
          <div className="p-6 border-b border-[var(--sand-300)]">
            <h2 className="text-xl text-[var(--navy-900)]">Sign in to your account</h2>
          </div>
          <div className="p-6">
            <form className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-900 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-[var(--navy-900)] text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full border border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg px-4 py-3"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[var(--navy-900)] text-sm font-medium">
                    Password
                  </label>
                  <span className="text-xs text-[var(--teal-600)] hover:text-[var(--teal-700)]">
                    Forgot password?
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full border border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg px-4 py-3"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white py-4 rounded-lg"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[var(--navy-600)]">Don't have an account? </span>
              <Link href="/register" className="text-[var(--teal-600)] hover:text-[var(--teal-700)] font-medium">
                Create one now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-[var(--navy-900)] text-white border-0 rounded-xl">
          <div className="p-4 text-sm">
            <p className="font-semibold mb-2">Demo credentials:</p>
            <p className="text-white/80">Email: any@example.com</p>
            <p className="text-white/80">Password: any password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
