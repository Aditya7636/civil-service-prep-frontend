'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { behaviours } from '@/lib/mock-data';
import { Award, Lightbulb, Save, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function StatementBuilderPage() {
  const [selectedBehaviour, setSelectedBehaviour] = useState('');
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const wordLimit = 250;
  const totalWords = [situation, task, action, result]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleAnalyse = () => {
    setShowFeedback(true);
  };

  const handleSave = () => {
    alert('Statement saved!');
  };

  const mockFeedback = {
    strengths: [
      'Clear description of the situation and context',
      'Specific actions taken are well articulated',
      'Quantifiable results provided',
    ],
    improvements: [
      'Consider adding more detail about team collaboration',
      'Emphasize how your actions align with the behaviour criteria',
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="bg-white border-b-2 border-[var(--navy-700)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-10 w-10 text-[var(--navy-700)]" />
            <h1 className="text-4xl font-bold text-[var(--navy-900)]">Statement Builder</h1>
          </div>
          <p className="text-xl text-[var(--navy-600)] max-w-3xl">
            Craft compelling application statements using the STAR method. Get instant feedback and suggestions to
            improve your answers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle>Build your statement</CardTitle>
                <CardDescription>
                  Select a behaviour and structure your example using the STAR method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="behaviour">Select behaviour</Label>
                  <Select value={selectedBehaviour} onValueChange={setSelectedBehaviour}>
                    <SelectTrigger className="border-2 border-[var(--navy-900)]">
                      <SelectValue placeholder="Choose a behaviour..." />
                    </SelectTrigger>
                    <SelectContent>
                      {behaviours.map((behaviour) => (
                        <SelectItem key={behaviour.id} value={behaviour.id}>
                          {behaviour.name} ({behaviour.grade.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="situation" className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--navy-700)] text-white flex items-center justify-center text-xs font-bold">
                        S
                      </div>
                      Situation
                    </Label>
                    <p className="text-sm text-[var(--navy-600)]">
                      Describe the context and background. What was the scenario?
                    </p>
                    <Textarea
                      id="situation"
                      value={situation}
                      onChange={(event) => setSituation(event.target.value)}
                      className="min-h-[100px] border-2 border-[var(--navy-900)] focus-visible:ring-[var(--warning)]"
                      placeholder="Example: My team was tasked with..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task" className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--teal-600)] text-white flex items-center justify-center text-xs font-bold">
                        T
                      </div>
                      Task
                    </Label>
                    <p className="text-sm text-[var(--navy-600)]">
                      What was your specific responsibility or goal?
                    </p>
                    <Textarea
                      id="task"
                      value={task}
                      onChange={(event) => setTask(event.target.value)}
                      className="min-h-[100px] border-2 border-[var(--navy-900)] focus-visible:ring-[var(--warning)]"
                      placeholder="Example: I needed to..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="action" className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                        A
                      </div>
                      Action
                    </Label>
                    <p className="text-sm text-[var(--navy-600)]">
                      Describe the specific actions you took.
                    </p>
                    <Textarea
                      id="action"
                      value={action}
                      onChange={(event) => setAction(event.target.value)}
                      className="min-h-[120px] border-2 border-[var(--navy-900)] focus-visible:ring-[var(--warning)]"
                      placeholder="Example: I analysed..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="result" className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                        R
                      </div>
                      Result
                    </Label>
                    <p className="text-sm text-[var(--navy-600)]">
                      What was the outcome? Include measurable results where possible.
                    </p>
                    <Textarea
                      id="result"
                      value={result}
                      onChange={(event) => setResult(event.target.value)}
                      className="min-h-[100px] border-2 border-[var(--navy-900)] focus-visible:ring-[var(--warning)]"
                      placeholder="Example: As a result..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-4 border-t border-[var(--sand-300)]">
                  <div className="flex items-center gap-2">
                    <Badge className={`${totalWords > wordLimit ? 'bg-red-600' : 'bg-[var(--teal-600)]'} text-white`}>
                      {totalWords}/{wordLimit} words
                    </Badge>
                    <span className="text-xs text-[var(--navy-600)]">
                      {totalWords > wordLimit ? 'Over limit' : 'Word count OK'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSave} className="border-[var(--navy-700)]">
                      <Save className="h-4 w-4 mr-2" />
                      Save draft
                    </Button>
                    <Button onClick={handleAnalyse} className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get feedback
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showFeedback && (
              <Alert className="border-[var(--teal-600)] bg-[var(--teal-50)]">
                <Lightbulb className="h-4 w-4 text-[var(--teal-600)]" />
                <AlertDescription>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--navy-900)] mb-1">Strengths</p>
                      <ul className="space-y-1 text-sm text-[var(--navy-700)]">
                        {mockFeedback.strengths.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[var(--teal-600)]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--navy-900)] mb-1">Areas to improve</p>
                      <ul className="space-y-1 text-sm text-[var(--navy-700)]">
                        {mockFeedback.improvements.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-[var(--navy-700)]">
              <CardHeader>
                <CardTitle>Guidance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--teal-600)] text-white flex items-center justify-center text-sm font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--navy-900)]">Situation</p>
                    <p className="text-xs text-[var(--navy-600)]">
                      Provide context: what, when, who was involved.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--navy-700)] text-white flex items-center justify-center text-sm font-bold">
                    T
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--navy-900)]">Task</p>
                    <p className="text-xs text-[var(--navy-600)]">
                      Explain the goal and your responsibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--navy-900)]">Action</p>
                    <p className="text-xs text-[var(--navy-600)]">
                      Detail the steps you took, focusing on your contribution.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--navy-900)]">Result</p>
                    <p className="text-xs text-[var(--navy-600)]">
                      Share outcomes with metrics if possible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
