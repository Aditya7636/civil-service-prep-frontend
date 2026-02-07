import './globals.scss';
import type { ReactNode } from 'react';
import { AuthNav } from '../components/AuthNav';
import { Toast } from '../components/Toast';

export const metadata = {
  title: 'Civil Service Test Practice',
  description: 'Practice tests for UK Civil Service candidates',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="govuk-template__body">
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
      </body>
    </html>
  );
}
