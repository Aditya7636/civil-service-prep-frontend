'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { AuthNav } from './AuthNav';
import { Toast } from './Toast';

type ClientShellProps = {
  children: ReactNode;
};

export function ClientShell({ children }: ClientShellProps) {
  const pathname = usePathname();
  const marketingRoutes = new Set([
    '/',
    '/login',
    '/register',
    '/profession-selector',
    '/grade-selector',
    '/ddat-role-selector',
    '/behaviours',
    '/tests',
    '/dashboard',
    '/statement-builder',
    '/mock-interview',
    '/gdd-frameworks',
    '/admin',
    '/admin/behaviours',
  ]);
  const isMarketing = marketingRoutes.has(pathname);

  if (isMarketing) {
    return (
      <div className="marketing-shell">
        <Toast />
        <main id="main-content">{children}</main>
      </div>
    );
  }

  return (
    <div className="govuk-shell">
      <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
        Skip to main content
      </a>
      <header className="govuk-header" role="banner" data-module="govuk-header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__content">
            <span className="govuk-header__link govuk-header__link--homepage">
              Civil Service Prep
            </span>
          </div>
          <div className="govuk-header__content">
            <AuthNav />
          </div>
        </div>
      </header>
      <div className="govuk-width-container">
        <Toast />
        <main id="main-content" className="govuk-main-wrapper" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
