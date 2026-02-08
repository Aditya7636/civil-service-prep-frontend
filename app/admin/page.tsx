'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', value: '2,543', icon: Users, color: 'text-[var(--navy-700)]' },
    { label: 'Tests Completed', value: '12,847', icon: FileText, color: 'text-[var(--teal-600)]' },
    { label: 'Active Subscriptions', value: '1,892', icon: TrendingUp, color: 'text-orange-500' },
    { label: 'Avg. Platform Score', value: '76%', icon: BarChart3, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="bg-white border-b-2 border-[var(--navy-700)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-[var(--navy-900)]">Admin Dashboard</h1>
          <p className="text-xl text-[var(--navy-600)] mt-2">Manage content, users, and analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-2 border-[var(--sand-300)]">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs">{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/admin/behaviours">
            <Card className="border-2 border-[var(--sand-300)] hover:border-[var(--navy-700)] transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle>Manage Behaviours</CardTitle>
                <CardDescription>
                  Create and edit behaviour content, STAR examples, and success criteria
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/questions">
            <Card className="border-2 border-[var(--sand-300)] hover:border-[var(--navy-700)] transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle>Manage Questions</CardTitle>
                <CardDescription>Add and edit test questions, answers, and rationales</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="border-2 border-[var(--sand-300)] hover:border-[var(--navy-700)] transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>View detailed usage statistics and user performance data</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
