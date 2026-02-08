'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getQuestionById } from '@/lib/mock-data';
import { calculateTestScore } from '@/lib/test-engine';
import {
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Home,
  RotateCcw,
} from 'lucide-react';
import type { TestAttempt } from '@/lib/design-types';

export default function TestResultsPage() {
  const params = useParams<{ testId: string; attemptId: string }>();
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);

  useEffect(() => {
    if (params?.attemptId) {
      const stored = localStorage.getItem(`test-attempt-${params.attemptId}`);
      if (stored) {
        setAttempt(JSON.parse(stored));
      }
    }
  }, [params?.attemptId]);

  if (!attempt) {
    return (
      <div className="min-h-screen bg-[var(--sand-100)] flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Results not found</CardTitle>
            <CardDescription>Unable to load test results.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tests">
              <Button>Back to tests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const results = calculateTestScore(attempt.test, attempt.answers);
  const passed = results.passed;

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className={`${passed ? 'bg-[var(--teal-600)]' : 'bg-orange-500'} text-white border-b-4 border-[var(--navy-900)]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {passed ? <CheckCircle className="h-20 w-20" /> : <Award className="h-20 w-20" />}
            </div>
            <h1 className="text-4xl font-bold mb-4">{passed ? 'Test Passed!' : 'Test Complete'}</h1>
            <p className="text-xl mb-2">{attempt.test.name}</p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span>Your score:</span>
              <span className="text-3xl font-bold">{results.percentage.toFixed(0)}%</span>
              <span>
                ({results.totalScore}/{results.maxScore} marks)
              </span>
            </div>
            {!passed && <p className="mt-4 text-lg">Pass mark: {attempt.test.passingScore}% - Keep practicing!</p>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-[var(--navy-700)]" />
                  Overall Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[var(--navy-900)]">Score</span>
                    <span className="text-[var(--navy-600)]">
                      {results.totalScore} / {results.maxScore} marks
                    </span>
                  </div>
                  <Progress value={results.percentage} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-[var(--sand-100)] rounded-lg">
                    <div className="text-3xl font-bold text-[var(--navy-700)]">
                      {attempt.answers.filter((answer) => answer.isCorrect).length}
                    </div>
                    <div className="text-sm text-[var(--navy-600)]">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--sand-100)] rounded-lg">
                    <div className="text-3xl font-bold text-red-600">
                      {attempt.answers.filter((answer) => answer.isCorrect === false).length}
                    </div>
                    <div className="text-sm text-[var(--navy-600)]">Incorrect</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {results.behaviourScores.length > 0 && (
              <Card className="border-2 border-[var(--sand-300)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-[var(--navy-700)]" />
                    Behaviour Scores
                  </CardTitle>
                  <CardDescription>Your performance across Civil Service behaviours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {results.behaviourScores.map((behaviourScore) => {
                    const percentage = (behaviourScore.score / 4) * 100;

                    return (
                      <div key={behaviourScore.behaviourId} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-[var(--navy-900)]">{behaviourScore.behaviourName}</h3>
                          <Badge
                            className={`${
                              behaviourScore.score >= 3
                                ? 'bg-[var(--teal-600)]'
                                : behaviourScore.score >= 2
                                  ? 'bg-orange-500'
                                  : 'bg-red-600'
                            } text-white`}
                          >
                            Level {behaviourScore.score}/4
                          </Badge>
                        </div>
                        <Progress value={percentage} className="h-2" />

                        {behaviourScore.recommendations.length > 0 && (
                          <ul className="space-y-2 mt-3">
                            {behaviourScore.recommendations.map((rec) => (
                              <li key={rec} className="flex items-start gap-2 text-sm text-[var(--navy-600)]">
                                <span className="text-[var(--navy-700)] mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle>Question Review</CardTitle>
                <CardDescription>Review your answers with explanations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {attempt.answers.map((answer, idx) => {
                  const question = getQuestionById(answer.questionId);
                  if (!question) return null;

                  const isCorrect = answer.isCorrect !== false;
                  const scorePercentage = (answer.score / answer.maxScore) * 100;

                  return (
                    <div key={answer.id} className="space-y-3">
                      {idx > 0 && <Separator />}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-[var(--navy-600)] mb-1">
                            Question {idx + 1} ({question.type})
                          </p>
                          <p className="font-medium text-[var(--navy-900)]">{question.questionText}</p>
                        </div>
                        {question.type !== 'FREE_TEXT' && (
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-[var(--teal-600)]" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <span className="text-sm text-[var(--navy-700)]">
                              {answer.score}/{answer.maxScore}
                            </span>
                          </div>
                        )}
                      </div>
                      {question.rationale && (
                        <div className="bg-[var(--sand-100)] p-3 rounded-lg text-sm text-[var(--navy-600)]">
                          {question.rationale}
                        </div>
                      )}
                      {question.type !== 'FREE_TEXT' && (
                        <div className="flex items-center gap-3">
                          <Progress value={scorePercentage} className="h-2 flex-1" />
                          <span className="text-xs text-[var(--navy-600)]">{Math.round(scorePercentage)}%</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-[var(--navy-700)]">
              <CardHeader>
                <CardTitle>Next actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/tests/${params?.testId}/attempt`} className="block">
                  <Button className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake test
                  </Button>
                </Link>
                <Link href="/tests" className="block">
                  <Button className="w-full" variant="outline">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View all tests
                  </Button>
                </Link>
                <Link href="/dashboard" className="block">
                  <Button className="w-full" variant="ghost">
                    <Home className="h-4 w-4 mr-2" />
                    Back to dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
