"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--sand-100)] flex items-center justify-center px-4">
      <Card className="max-w-md border border-[var(--sand-300)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[var(--navy-700)]" />
            Page not found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--navy-600)] mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <Button className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">Return home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
