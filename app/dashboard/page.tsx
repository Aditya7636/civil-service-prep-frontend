'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getProfessionBySlug } from '@/lib/professions-data';
import { roleGrades } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  FileText,
  Video,
  Award,
  TrendingUp,
  Target,
  Flame,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const targetGrade = roleGrades.find((grade) => grade.id === user.targetGrade);
  const targetProfession = user.targetProfession ? getProfessionBySlug(user.targetProfession) : null;

  const mockProgress = {
    testsCompleted: 5,
    averageScore: 78,
    studyStreak: 7,
    behavioursStudied: 4,
  };

  const mockBehaviourProgress = [
    { name: 'Delivering at Pace', score: 3, percentage: 75 },
    { name: 'Making Effective Decisions', score: 2, percentage: 50 },
    { name: 'Communicating and Influencing', score: 4, percentage: 100 },
    { name: 'Working Together', score: 3, percentage: 75 },
  ];

  const quickActions = [
    {
      icon: FileText,
      title: 'Continue Practice Test',
      description: 'CSJT - Question 12 of 25',
      href: '/tests',
      primary: true,
    },
    { icon: BookOpen, title: 'Study Behaviours', href: '/behaviours' },
    { icon: Video, title: 'Mock Interview', href: '/mock-interview' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2">Welcome back, {user.name}</h1>
              <div className="flex items-center gap-2 text-white/80">
                <Target className="h-4 w-4" />
                <p className="text-base">
                  Target grade: {targetGrade ? `${targetGrade.name} - ${targetGrade.displayName}` : 'Not set'}
                </p>
              </div>
              {targetProfession && (
                <div className="flex items-center gap-2 text-white/70 mt-2 text-sm">
                  <Award className="h-4 w-4" />
                  <span>Profession focus: {targetProfession.name}</span>
                </div>
              )}
            </div>
            {!user.targetGrade && (
              <Link href="/grade-selector">
                <Button className="bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white">Select grade</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 border-2 border-[var(--teal-600)] bg-gradient-to-r from-[var(--teal-600)] to-[var(--teal-700)] text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <PlayCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Continue where you left off</h3>
                  <p className="text-white/90 text-sm">Civil Service Judgement Test - 48% complete</p>
                </div>
              </div>
              <Button className="bg-white text-[var(--teal-700)] hover:bg-white/90">
                Resume Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-[var(--sand-300)]">
                <CardContent className="p-4">
                  <p className="text-xs text-[var(--navy-600)] mb-1">Tests completed</p>
                  <p className="text-2xl text-[var(--navy-900)]">{mockProgress.testsCompleted}</p>
                </CardContent>
              </Card>

              <Card className="border border-[var(--sand-300)]">
                <CardContent className="p-4">
                  <p className="text-xs text-[var(--navy-600)] mb-1">Average score</p>
                  <p className="text-2xl text-[var(--teal-600)]">{mockProgress.averageScore}%</p>
                </CardContent>
              </Card>

              <Card className="border border-[var(--sand-300)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <p className="text-xs text-[var(--navy-600)]">Study streak</p>
                  </div>
                  <p className="text-2xl text-orange-500">{mockProgress.studyStreak} days</p>
                </CardContent>
              </Card>

              <Card className="border border-[var(--sand-300)]">
                <CardContent className="p-4">
                  <p className="text-xs text-[var(--navy-600)] mb-1">Behaviours</p>
                  <p className="text-2xl text-[var(--navy-900)]">{mockProgress.behavioursStudied}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--navy-900)]">
                  <TrendingUp className="h-5 w-5 text-[var(--teal-600)]" />
                  Behaviour Progress
                </CardTitle>
                <CardDescription>Track performance across Success Profile behaviours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {mockBehaviourProgress.map((behaviour) => (
                  <div key={behaviour.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--navy-900)]">{behaviour.name}</span>
                      <Badge
                        className={`${
                          behaviour.score >= 3
                            ? 'bg-[var(--teal-600)]'
                            : behaviour.score >= 2
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                        } text-white text-xs`}
                      >
                        Level {behaviour.score}/4
                      </Badge>
                    </div>
                    <Progress value={behaviour.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl mb-4 text-[var(--navy-900)]">Quick actions</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.title} href={action.href}>
                      <Card
                        className={`border ${
                          action.primary
                            ? 'border-[var(--teal-600)] bg-[var(--teal-50)]'
                            : 'border-[var(--sand-300)]'
                        } hover:border-[var(--teal-600)] hover:shadow-lg transition-all`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                action.primary ? 'bg-[var(--teal-600)]' : 'bg-[var(--sand-200)]'
                              }`}
                            >
                              <Icon className={`h-5 w-5 ${action.primary ? 'text-white' : 'text-[var(--navy-700)]'}`} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--navy-900)]">{action.title}</p>
                              {action.description && (
                                <p className="text-xs text-[var(--navy-600)]">{action.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-[var(--teal-600)]">
                            Open <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="text-[var(--navy-900)]">Next steps</CardTitle>
                <CardDescription>Recommended based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-[var(--sand-100)] rounded-lg">
                  <p className="text-sm font-medium text-[var(--navy-900)]">Complete CSJT practice</p>
                  <p className="text-xs text-[var(--navy-600)]">15 minutes remaining</p>
                </div>
                <div className="p-3 bg-[var(--sand-100)] rounded-lg">
                  <p className="text-sm font-medium text-[var(--navy-900)]">Review STAR examples</p>
                  <p className="text-xs text-[var(--navy-600)]">2 behaviours left</p>
                </div>
                <Button className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                  Continue prep
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="text-[var(--navy-900)]">Upcoming milestones</CardTitle>
                <CardDescription>Keep momentum on track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[var(--navy-700)]">
                <div className="flex items-center justify-between">
                  <span>Mock interview session</span>
                  <Badge className="bg-[var(--navy-700)] text-white text-xs">2 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Statement builder draft</span>
                  <Badge className="bg-[var(--teal-600)] text-white text-xs">3 days</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
