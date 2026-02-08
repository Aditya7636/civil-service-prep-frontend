'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function AdminBehavioursPage() {
  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/admin" className="inline-flex items-center text-[var(--navy-700)] hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to admin dashboard
        </Link>

        <Card className="border border-[var(--sand-300)]">
          <CardHeader>
            <CardTitle>Manage Behaviours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--navy-600)]">
              Admin CMS for managing behaviours - feature coming soon in production build
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
