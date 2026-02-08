'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { roleGrades } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Info, TrendingUp, Users } from 'lucide-react';

export default function GradeSelectorPage() {
  const { updateTargetGrade, user } = useAuth();
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<string>(user?.targetGrade || '');

  const handleSelectGrade = (gradeId: string) => {
    setSelectedGrade(gradeId);
  };

  const handleContinue = () => {
    if (!selectedGrade) return;
    updateTargetGrade(selectedGrade);
    router.push('/dashboard');
  };

  const selectedGradeData = roleGrades.find((grade) => grade.id === selectedGrade);

  const entryGrades = roleGrades.filter((grade) => ['aa', 'ao', 'eo'].includes(grade.id));
  const middleGrades = roleGrades.filter((grade) => ['heo', 'seo'].includes(grade.id));
  const seniorGrades = roleGrades.filter((grade) => ['g7', 'g6', 'scs'].includes(grade.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl mb-3">Select Your Target Grade</h1>
          <p className="text-lg text-white/80 max-w-3xl mb-6">
            Choose the Civil Service grade you&apos;re preparing for. Your selection personalizes behaviours, examples,
            and interview questions to the appropriate level of seniority and responsibility.
          </p>

          <div className="bg-[var(--teal-600)]/10 border border-[var(--teal-600)]/30 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-[var(--teal-400)] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/90">
              <p className="font-semibold mb-1">Grade levels and expectations</p>
              <p className="text-white/70">
                Each grade has different leadership expectations, decision-making authority, and behaviour complexity.
                Choose the grade you&apos;re applying for, not your current grade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[var(--teal-600)] rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--navy-900)]">Entry &amp; Operational Level</h2>
              <p className="text-sm text-[var(--navy-600)]">
                Focus on delivery, following processes, and developing skills
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {entryGrades.map((grade) => (
              <Card
                key={grade.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  selectedGrade === grade.id
                    ? 'border-4 border-[var(--teal-600)] shadow-lg'
                    : 'border-2 border-[var(--sand-300)] hover:border-[var(--teal-600)]'
                }`}
                onClick={() => handleSelectGrade(grade.id)}
                onDoubleClick={() => {
                  setSelectedGrade(grade.id);
                  updateTargetGrade(grade.id);
                  router.push('/dashboard');
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-[var(--teal-600)] mb-1">{grade.name}</div>
                      <h3 className="text-lg font-semibold text-[var(--navy-900)]">{grade.displayName}</h3>
                    </div>
                    {selectedGrade === grade.id && (
                      <CheckCircle2 className="h-7 w-7 text-[var(--teal-600)] flex-shrink-0" />
                    )}
                  </div>

                  {grade.salaryRange && (
                    <div className="mb-3 pb-3 border-b border-[var(--sand-300)]">
                      <p className="text-sm font-medium text-[var(--navy-700)]">{grade.salaryRange}</p>
                    </div>
                  )}

                  <p className="text-sm text-[var(--navy-600)] mb-4 leading-relaxed">{grade.description}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--navy-900)] uppercase tracking-wide">Key Focus Areas:</p>
                    <ul className="space-y-1.5">
                      {grade.responsibilities.slice(0, 3).map((resp) => (
                        <li key={resp} className="flex items-start gap-2 text-xs text-[var(--navy-700)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--teal-600)] flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[var(--navy-700)] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--navy-900)]">Middle Management</h2>
              <p className="text-sm text-[var(--navy-600)]">
                Team leadership, operational management, and professional expertise
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {middleGrades.map((grade) => (
              <Card
                key={grade.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  selectedGrade === grade.id
                    ? 'border-4 border-[var(--navy-700)] shadow-lg'
                    : 'border-2 border-[var(--sand-300)] hover:border-[var(--navy-700)]'
                }`}
                onClick={() => handleSelectGrade(grade.id)}
                onDoubleClick={() => {
                  setSelectedGrade(grade.id);
                  updateTargetGrade(grade.id);
                  router.push('/dashboard');
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-[var(--navy-700)] mb-1">{grade.name}</div>
                      <h3 className="text-lg font-semibold text-[var(--navy-900)]">{grade.displayName}</h3>
                    </div>
                    {selectedGrade === grade.id && (
                      <CheckCircle2 className="h-7 w-7 text-[var(--navy-700)] flex-shrink-0" />
                    )}
                  </div>

                  {grade.salaryRange && (
                    <div className="mb-3 pb-3 border-b border-[var(--sand-300)]">
                      <p className="text-sm font-medium text-[var(--navy-700)]">{grade.salaryRange}</p>
                    </div>
                  )}

                  <p className="text-sm text-[var(--navy-600)] mb-4 leading-relaxed">{grade.description}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--navy-900)] uppercase tracking-wide">Key Focus Areas:</p>
                    <ul className="space-y-1.5">
                      {grade.responsibilities.slice(0, 4).map((resp) => (
                        <li key={resp} className="flex items-start gap-2 text-xs text-[var(--navy-700)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--navy-700)] flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[var(--navy-900)] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--navy-900)]">Senior Leadership</h2>
              <p className="text-sm text-[var(--navy-600)]">
                Strategic direction, organizational leadership, and policy influence
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {seniorGrades.map((grade) => (
              <Card
                key={grade.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  selectedGrade === grade.id
                    ? 'border-4 border-[var(--navy-900)] shadow-lg'
                    : 'border-2 border-[var(--sand-300)] hover:border-[var(--navy-900)]'
                }`}
                onClick={() => handleSelectGrade(grade.id)}
                onDoubleClick={() => {
                  setSelectedGrade(grade.id);
                  updateTargetGrade(grade.id);
                  router.push('/dashboard');
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-[var(--navy-900)] mb-1">{grade.name}</div>
                      <h3 className="text-lg font-semibold text-[var(--navy-900)]">{grade.displayName}</h3>
                    </div>
                    {selectedGrade === grade.id && (
                      <CheckCircle2 className="h-7 w-7 text-[var(--navy-900)] flex-shrink-0" />
                    )}
                  </div>

                  {grade.salaryRange && (
                    <div className="mb-3 pb-3 border-b border-[var(--sand-300)]">
                      <p className="text-sm font-medium text-[var(--navy-700)]">{grade.salaryRange}</p>
                    </div>
                  )}

                  <p className="text-sm text-[var(--navy-600)] mb-4 leading-relaxed">{grade.description}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--navy-900)] uppercase tracking-wide">Key Focus Areas:</p>
                    <ul className="space-y-1.5">
                      {grade.responsibilities.slice(0, 4).map((resp) => (
                        <li key={resp} className="flex items-start gap-2 text-xs text-[var(--navy-700)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--navy-900)] flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedGradeData && (
          <div className="border-2 border-[var(--navy-700)] bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white mb-8 rounded-2xl">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">You selected: {selectedGradeData.displayName}</h4>
                  <p className="text-sm text-white/90 leading-relaxed mb-3">{selectedGradeData.description}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleContinue}
                  className="bg-white text-[var(--navy-900)] hover:bg-[var(--sand-100)] h-12 px-8 shadow-lg text-base rounded-lg inline-flex items-center"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
