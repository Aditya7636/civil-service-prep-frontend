'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearToken, getToken } from '../lib/auth';
import { clearAllAttempts } from '../lib/storage';
import { fetchMe } from '../lib/api';

export function AuthNav() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    setIsAuthed(!!token);
    if (token) {
      fetchMe()
        .then((user) => setName(user.name ?? user.email ?? null))
        .catch(() => setName(null));
    }
  }, []);

  const handleSignOut = () => {
    clearToken();
    clearAllAttempts();
    setIsAuthed(false);
    setName(null);
  };

  return (
    <nav aria-label="Account">
      <ul className="govuk-header__navigation" role="list">
        {!isAuthed ? (
          <>
            <li className="govuk-header__navigation-item">
              <Link className="govuk-header__link" href="/auth/login">
                Sign in
              </Link>
            </li>
            <li className="govuk-header__navigation-item">
              <Link className="govuk-header__link" href="/auth/register">
                Create account
              </Link>
            </li>
          </>
        ) : (
          <>
            {name && (
              <li className="govuk-header__navigation-item">
                <span className="govuk-header__link">{name}</span>
              </li>
            )}
            <li className="govuk-header__navigation-item">
              <button type="button" className="govuk-link" onClick={handleSignOut}>
                Sign out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
