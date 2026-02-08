'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--sand-100)] flex items-center justify-center px-4">
      <Card className="max-w-md border border-[var(--sand-300)]">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[var(--navy-600)]">We couldn&apos;t load this page. Please try again.</p>
          <Link href="/">
            <Button className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">Go home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
