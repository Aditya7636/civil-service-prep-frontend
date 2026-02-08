'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { behaviours } from '@/lib/mock-data';
import { Video, Play, Square, Mic, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function MockInterviewRecorderPage() {
  const [selectedBehaviour, setSelectedBehaviour] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const mockQuestions = [
    'Describe a time when you had to deliver a project under tight deadlines.',
    'Tell me about a situation where you had to make a difficult decision with limited information.',
    'Give an example of when you had to influence stakeholders who initially disagreed with your approach.',
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
  };

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="bg-white border-b-2 border-[var(--navy-700)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Video className="h-10 w-10 text-[var(--navy-700)]" />
            <h1 className="text-4xl font-bold text-[var(--navy-900)]">Mock Interview</h1>
          </div>
          <p className="text-xl text-[var(--navy-600)] max-w-3xl">
            Practice your interview responses and receive behaviour-based feedback on your performance.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert className="mb-6 bg-[var(--sand-100)] border-[var(--warning)]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-[var(--navy-900)]">
            <strong>Demo mode:</strong> This is a prototype demonstration of the mock interview feature. In the
            production version, you would be able to record video/audio responses.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle>Setup your interview</CardTitle>
                <CardDescription>Select a behaviour to practice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bold text-[var(--navy-900)]">Select behaviour</label>
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

                {selectedBehaviour && (
                  <>
                    <div className="pt-4 border-t border-[var(--sand-300)]">
                      <p className="font-bold text-[var(--navy-900)] mb-3">Interview question:</p>
                      <div className="bg-[var(--sand-100)] p-4 border-l-4 border-[var(--navy-700)]">
                        <p className="text-[var(--navy-900)] text-lg">{mockQuestions[0]}</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="aspect-video bg-[var(--navy-900)] rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center text-white">
                          {isRecording ? (
                            <div className="space-y-3">
                              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto animate-pulse flex items-center justify-center">
                                <Mic className="h-8 w-8" />
                              </div>
                              <p className="text-lg">Recording...</p>
                            </div>
                          ) : hasRecorded ? (
                            <div className="space-y-3">
                              <Video className="h-16 w-16 mx-auto" />
                              <p>Recording complete!</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Video className="h-16 w-16 mx-auto" />
                              <p>Camera preview will appear here</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center gap-4">
                        {!isRecording && !hasRecorded && (
                          <Button onClick={handleStartRecording} className="bg-red-600 hover:bg-red-700 text-white">
                            <Play className="h-4 w-4 mr-2" />
                            Start recording
                          </Button>
                        )}
                        {isRecording && (
                          <Button onClick={handleStopRecording} className="bg-[var(--navy-900)] hover:bg-black text-white">
                            <Square className="h-4 w-4 mr-2" />
                            Stop recording
                          </Button>
                        )}
                        {hasRecorded && (
                          <>
                            <Button
                              onClick={() => {
                                setHasRecorded(false);
                                setIsRecording(false);
                              }}
                              variant="outline"
                            >
                              Re-record
                            </Button>
                            <Button
                              onClick={() => alert('In production, this would submit for AI analysis')}
                              className="bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white"
                            >
                              Submit for feedback
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-[var(--navy-700)]">
              <CardHeader>
                <CardTitle>Interview tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[var(--navy-600)]">
                {[
                  'Take a moment to structure your answer using STAR',
                  'Speak clearly and maintain eye contact with the camera',
                  'Aim for 3-4 minutes per response',
                  'Focus on YOUR actions, not the team’s',
                  'Include measurable results where possible',
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <span className="text-[var(--navy-700)]">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-[var(--sand-300)]">
              <CardHeader>
                <CardTitle>Previous interviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[var(--navy-600)]">
                <p>No previous recordings yet.</p>
                <Link href="/mock-interview/1/feedback" className="text-[var(--teal-600)] hover:text-[var(--teal-700)]">
                  View sample feedback
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
