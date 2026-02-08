'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, FileText, Clock, ArrowRight } from 'lucide-react';
import { roleGrades, getAllGDDBehaviours, getAllGDDTests } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GDDFrameworksPage() {
  const [selectedGrade, setSelectedGrade] = useState('heo');

  const gddBehaviours = getAllGDDBehaviours();
  const gddTests = getAllGDDTests();

  const filteredBehaviours = selectedGrade ? gddBehaviours.filter((b) => b.gradeId === selectedGrade) : gddBehaviours;
  const filteredTests = selectedGrade ? gddTests.filter((t) => t.gradeId === selectedGrade) : gddTests;

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

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <Code className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl">GDD/DDaT Frameworks</h1>
          </div>
          <p className="text-lg text-white/80 max-w-3xl mb-6">
            Specialized preparation for Digital, Data and Technology roles with technical behaviours and practice
            tests
          </p>
          <a
            href="https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm border border-white/30 hover:border-white/50 px-4 py-2 rounded-lg transition-all"
          >
            View Official DDaT Framework
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="bg-white border-b border-[var(--sand-300)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <label htmlFor="grade-filter" className="font-semibold text-[var(--navy-900)]">
              Filter by grade:
            </label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger id="grade-filter" className="w-[200px] border-[var(--sand-300)] focus:ring-[var(--teal-500)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roleGrades.map((grade) => (
                  <SelectItem key={grade.id} value={grade.id}>
                    {grade.name} - {grade.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="behaviours" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="behaviours">DDaT Behaviours</TabsTrigger>
            <TabsTrigger value="tests">Practice Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="behaviours" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-4 text-[var(--navy-900)]">
                Technical Behaviours for {roleGrades.find((g) => g.id === selectedGrade)?.displayName}
              </h2>
              <p className="text-[var(--navy-600)] mb-6">
                DDaT-specific competencies aligned to the government capability framework
              </p>
            </div>

            {filteredBehaviours.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredBehaviours.map((behaviour) => (
                  <Card
                    key={behaviour.id}
                    className="border border-[var(--sand-300)] hover:border-[var(--teal-600)] hover:shadow-md transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg text-[var(--navy-900)]">{behaviour.name}</CardTitle>
                        <Badge className="bg-[var(--navy-800)] text-white text-xs">DDaT</Badge>
                      </div>
                      <p className="text-sm text-[var(--navy-600)] leading-relaxed">{behaviour.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-[var(--navy-900)] uppercase tracking-wide">Key skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {behaviour.keySkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="border-[var(--sand-300)] text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-[var(--navy-600)]">No behaviours available for this grade yet.</p>
            )}
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-4 text-[var(--navy-900)]">Practice Tests</h2>
              <p className="text-[var(--navy-600)] mb-6">
                Technical assessments aligned with DDaT roles and grade expectations
              </p>
            </div>

            {filteredTests.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTests.map((test) => (
                  <Card
                    key={test.id}
                    className="border border-[var(--sand-300)] hover:border-[var(--teal-600)] hover:shadow-md transition-all"
                  >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <Badge className={`${getTestTypeColor(test.type)} text-white text-xs`}>
                            {getTestTypeLabel(test.type)}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[var(--sand-300)]">
                            {test.role}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-[var(--navy-900)] leading-snug">{test.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-[var(--navy-600)]">{test.description}</p>
                        <div className="flex items-center gap-3 text-sm text-[var(--navy-600)]">
                          <FileText className="h-4 w-4" />
                          <span>{test.questions.length} questions</span>
                          <Clock className="h-4 w-4" />
                          <span>{test.timeLimit} mins</span>
                        </div>
                        <Button className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                          Start test
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <p className="text-[var(--navy-600)]">No tests available for this grade yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
