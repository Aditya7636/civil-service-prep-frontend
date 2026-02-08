'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { tests, roleGrades, getTestsByGrade } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, Target, Award, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function TestsPage() {
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState(user?.targetGrade || 'all');

  const filteredTests = selectedGrade && selectedGrade !== 'all' ? getTestsByGrade(selectedGrade) : tests;

  const getTestTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      SJT: 'Situational Judgement',
      MCQ: 'Multiple Choice',
      NUMERICAL: 'Numerical Reasoning',
      FREE_TEXT: 'Written Assessment',
      TECHNICAL: 'Technical Assessment',
    };
    return labels[type] || type;
  };

  const getTestTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      SJT: 'bg-[var(--teal-600)]',
      MCQ: 'bg-[var(--navy-700)]',
      NUMERICAL: 'bg-purple-600',
      FREE_TEXT: 'bg-orange-600',
      TECHNICAL: 'bg-pink-600',
    };
    return colors[type] || 'bg-[var(--teal-600)]';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl">Practice Tests</h1>
          </div>
          <p className="text-lg text-white/80 max-w-2xl">Realistic Civil Service assessments with instant feedback</p>
        </div>
      </div>

      <div className="bg-white border-b border-[var(--sand-300)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-[var(--teal-600)]" />
              <label htmlFor="grade-filter" className="font-semibold text-[var(--navy-900)]">
                Grade:
              </label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger id="grade-filter" className="w-[200px] border-[var(--sand-300)] focus:ring-[var(--teal-500)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="all" value="all">
                    All Grades
                  </SelectItem>
                  {roleGrades.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id}>
                      {grade.name} - {grade.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-[var(--navy-600)]">
              {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card
              key={test.id}
              className="border border-[var(--sand-300)] hover:border-[var(--teal-600)] hover:shadow-lg transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`${getTestTypeColor(test.type)} text-white text-xs`}>
                    {getTestTypeLabel(test.type)}
                  </Badge>
                  {test.difficulty && (
                    <Badge variant="outline" className="text-xs border-[var(--sand-300)]">
                      {test.difficulty}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg text-[var(--navy-900)] leading-snug">{test.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-[var(--navy-600)]">
                    <FileText className="h-4 w-4" />
                    <span>{test.questions?.length || 0} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--navy-600)]">
                    <Clock className="h-4 w-4" />
                    <span>{test.timeLimit} minutes</span>
                  </div>
                  {test.passingScore && (
                    <div className="flex items-center gap-2 text-sm text-[var(--navy-600)]">
                      <Award className="h-4 w-4" />
                      <span>Pass mark: {test.passingScore}%</span>
                    </div>
                  )}
                </div>

                <Link href={`/tests/${test.id}/attempt`}>
                  <Button className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                    Start Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-[var(--sand-400)] mx-auto mb-4" />
            <p className="text-lg text-[var(--navy-600)]">No tests available for this grade</p>
          </div>
        )}
      </div>
    </div>
  );
}
