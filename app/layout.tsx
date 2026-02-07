import './globals.scss';
import type { ReactNode } from 'react';
import { ClientShell } from '../components/ClientShell';

export const metadata = {
  title: 'Civil Service Test Practice',
  description: 'Practice tests for UK Civil Service candidates',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="govuk-template__body">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
