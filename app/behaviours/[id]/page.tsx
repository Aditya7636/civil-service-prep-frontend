'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBehaviourById } from '@/lib/mock-data';
import { BookOpen, ArrowLeft, CheckCircle, Star, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function BehaviourDetailPage() {
  const params = useParams<{ id: string }>();
  const behaviour = params?.id ? getBehaviourById(params.id) : undefined;

  if (!behaviour) {
    return (
      <div className="min-h-screen bg-[var(--sand-100)] flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Behaviour not found</CardTitle>
            <CardDescription>The behaviour you&apos;re looking for doesn&apos;t exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/behaviours">
              <Button className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to behaviours
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="bg-white border-b-2 border-[var(--navy-700)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/behaviours" className="inline-flex items-center text-[var(--navy-700)] hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to behaviour library
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="h-8 w-8 text-[var(--navy-700)]" />
                <h1 className="text-4xl font-bold text-[var(--navy-900)]">{behaviour.name}</h1>
              </div>
              <Badge className="bg-[var(--navy-700)] text-white text-sm px-3 py-1">
                {behaviour.grade.name} - {behaviour.grade.displayName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="text-2xl">What is {behaviour.name}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[var(--navy-900)] leading-relaxed">{behaviour.description}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CheckCircle className="h-6 w-6 text-[var(--teal-600)]" />
                  Success Criteria
                </CardTitle>
                <CardDescription>
                  What assessors are looking for at {behaviour.grade.name} level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {behaviour.successCriteria.map((criteria, idx) => (
                    <li key={criteria} className="flex items-start gap-3 p-3 bg-[var(--sand-100)] rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--navy-700)] text-white flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-[var(--navy-900)]">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="h-6 w-6 text-[var(--warning)]" />
                  STAR Method Examples
                </CardTitle>
                <CardDescription>Model answers demonstrating {behaviour.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {behaviour.examples && behaviour.examples.length > 0 ? (
                  <div className="space-y-6">
                    {behaviour.examples.map((example, idx) => (
                      <div key={example.id} className="space-y-4">
                        {idx > 0 && <Separator className="my-6" />}
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-[var(--navy-900)]">Example {idx + 1}</h3>
                          <Badge className="bg-[var(--teal-600)] text-white">Level {example.level}/4</Badge>
                        </div>

                        <div className="space-y-4">
                          <div className="border-l-4 border-[var(--navy-700)] pl-4 py-2 bg-[var(--sand-100)]">
                            <p className="font-bold text-[var(--navy-900)] mb-2">Situation</p>
                            <p className="text-[var(--navy-600)]">{example.starSituation}</p>
                          </div>

                          <div className="border-l-4 border-[var(--teal-600)] pl-4 py-2 bg-[var(--sand-100)]">
                            <p className="font-bold text-[var(--navy-900)] mb-2">Task</p>
                            <p className="text-[var(--navy-600)]">{example.starTask}</p>
                          </div>

                          <div className="border-l-4 border-orange-500 pl-4 py-2 bg-[var(--sand-100)]">
                            <p className="font-bold text-[var(--navy-900)] mb-2">Action</p>
                            <p className="text-[var(--navy-600)]">{example.starAction}</p>
                          </div>

                          <div className="border-l-4 border-purple-600 pl-4 py-2 bg-[var(--sand-100)]">
                            <p className="font-bold text-[var(--navy-900)] mb-2">Result</p>
                            <p className="text-[var(--navy-600)]">{example.starResult}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--navy-600)] text-center py-8">
                    STAR examples coming soon for this behaviour.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-[var(--teal-600)]">
              <CardHeader>
                <CardTitle>Practice this behaviour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/statement-builder" className="block">
                  <Button className="w-full bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white">
                    Build a statement
                  </Button>
                </Link>
                <Link href="/tests" className="block">
                  <Button className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                    Take a practice test
                  </Button>
                </Link>
                <Link href="/mock-interview" className="block">
                  <Button className="w-full" variant="outline">
                    Mock interview
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[var(--warning)]" />
                  Preparation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-[var(--navy-600)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--navy-700)] mt-1">•</span>
                    <span>Prepare 2-3 examples demonstrating this behaviour at your grade level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--navy-700)] mt-1">•</span>
                    <span>Use the STAR method to structure your responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--navy-700)] mt-1">•</span>
                    <span>Include measurable outcomes or impact where possible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
