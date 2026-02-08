import './globals.scss';
import type { ReactNode } from 'react';
import Layout from '../components/layout';
import { AuthProvider } from '../lib/auth-context';

export const metadata = {
  title: 'Civil Service Prep Platform',
  description: 'Civil Service preparation, practice tests, and interview prep.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
