'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function InterviewFeedbackPage() {
  return (
    <div className="min-h-screen bg-[var(--sand-100)] flex items-center justify-center px-4">
      <Card className="max-w-md border border-[var(--sand-300)]">
        <CardHeader>
          <CardTitle>Interview Feedback</CardTitle>
          <CardDescription>This feature is coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/mock-interview">
            <Button className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to mock interview
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
