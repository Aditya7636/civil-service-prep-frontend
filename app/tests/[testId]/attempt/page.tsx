'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { getTestById, getQuestionById } from '@/lib/mock-data';
import {
  formatTime,
  calculateTimeRemaining,
  autoSaveAnswer,
  getAutoSavedAnswer,
  scoreMCQAnswer,
  scoreSJTAnswer,
  scoreNumericalAnswer,
  scoreFreeTextAnswer,
} from '@/lib/test-engine';
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Answer, TestAttempt } from '@/lib/design-types';

export default function TestAttemptPage() {
  const params = useParams<{ testId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const test = params?.testId ? getTestById(params.testId) : undefined;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime] = useState(new Date().toISOString());
  const [attemptId] = useState(() => `attempt-${Date.now()}`);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!test) return;

    const initialTime = test.timeLimit * 60;
    setTimeRemaining(initialTime);

    const timer = setInterval(() => {
      const { remainingSeconds, isExpired } = calculateTimeRemaining(startTime, test.timeLimit);

      setTimeRemaining(remainingSeconds);

      if (isExpired) {
        clearInterval(timer);
        handleSubmit();
      }

      if (remainingSeconds === 300 && !showWarning) {
        setShowWarning(true);
      }
    }, 1000);

    test.questionIds.forEach((questionId) => {
      const saved = getAutoSavedAnswer(attemptId, questionId);
      if (saved) {
        setAnswers((prev) => ({ ...prev, [questionId]: saved }));
      }
    });

    return () => clearInterval(timer);
  }, [test, startTime, attemptId, showWarning]);

  if (!test || !user) {
    return (
      <div className="min-h-screen bg-[var(--sand-100)] flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Test not found</CardTitle>
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

  const questions = test.questionIds.map((id) => getQuestionById(id)).filter((q) => q !== undefined);
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  const currentAnswer = answers[currentQuestion.id] || '';
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    autoSaveAnswer(attemptId, currentQuestion.id, value);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const scoredAnswers: Answer[] = questions.map((question) => {
      const response = answers[question.id] || '';
      let result: { score: number; isCorrect?: boolean; feedback: string };

      switch (question.type) {
        case 'MCQ':
          result = scoreMCQAnswer(question, response as string);
          break;
        case 'SJT':
          result = scoreSJTAnswer(question, response as string[]);
          break;
        case 'NUMERICAL':
          result = scoreNumericalAnswer(question, response as string);
          break;
        case 'FREE_TEXT':
          result = scoreFreeTextAnswer(question, response as string);
          break;
        default:
          result = { score: 0, feedback: 'Unknown question type' };
      }

      return {
        id: `answer-${question.id}`,
        attemptId,
        questionId: question.id,
        response,
        isCorrect: result.isCorrect,
        score: result.score,
        maxScore: question.marks,
        feedback: result.feedback,
      };
    });

    const attempt: TestAttempt = {
      id: attemptId,
      userId: user.id,
      testId: test.id,
      test,
      answers: scoredAnswers,
      score: 0,
      behaviourScores: [],
      startedAt: startTime,
      completedAt: new Date().toISOString(),
      status: 'COMPLETED',
    };

    localStorage.setItem(`test-attempt-${attemptId}`, JSON.stringify(attempt));
    router.push(`/tests/${params?.testId}/results/${attemptId}`);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const timeWarning = timeRemaining <= 300;

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="bg-white border-b-2 border-[var(--navy-700)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--navy-900)]">{test.name}</h1>
              <p className="text-sm text-[var(--navy-600)]">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                timeWarning ? 'bg-red-600 text-white' : 'bg-[var(--sand-200)] text-[var(--navy-900)]'
              }`}
            >
              <Clock className="h-5 w-5" />
              <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showWarning && (
          <Alert className="mb-6 bg-orange-50 border-orange-200 text-orange-900">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>5 minutes remaining. Please wrap up your answers.</AlertDescription>
          </Alert>
        )}

        <Card className="border border-[var(--sand-300)] shadow-sm">
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[var(--navy-900)] mb-2">{currentQuestion.questionText}</h2>
              {currentQuestion.context && (
                <div className="bg-[var(--sand-100)] border-l-4 border-[var(--navy-700)] p-4 text-sm text-[var(--navy-700)]">
                  {currentQuestion.context}
                </div>
              )}
            </div>

            {currentQuestion.type === 'MCQ' && currentQuestion.options && (
              <RadioGroup value={currentAnswer as string} onValueChange={handleAnswerChange} className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-3 rounded-lg border border-[var(--sand-300)] p-4"
                  >
                    <RadioGroupItem value={option.value} id={option.id} />
                    <Label htmlFor={option.id} className="text-[var(--navy-900)]">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === 'SJT' && currentQuestion.options && (
              <div className="space-y-4">
                {currentQuestion.options.map((option) => {
                  const currentValues = (currentAnswer as string[]) || [];
                  const isSelected = currentValues.includes(option.value);
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        const updated = isSelected
                          ? currentValues.filter((value) => value !== option.value)
                          : [...currentValues, option.value];
                        handleAnswerChange(updated);
                      }}
                      className={`w-full text-left border rounded-lg p-4 transition-all ${
                        isSelected
                          ? 'border-[var(--teal-600)] bg-[var(--teal-50)]'
                          : 'border-[var(--sand-300)] hover:border-[var(--navy-700)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-[var(--teal-600)]' : 'border-[var(--sand-400)]'
                          }`}
                        >
                          {isSelected && <CheckCircle className="h-4 w-4 text-[var(--teal-600)]" />}
                        </div>
                        <span className="text-[var(--navy-900)]">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'NUMERICAL' && (
              <div className="space-y-2">
                <Label htmlFor="numerical-answer">Your answer</Label>
                <input
                  id="numerical-answer"
                  type="number"
                  value={currentAnswer as string}
                  onChange={(event) => handleAnswerChange(event.target.value)}
                  className="w-full border border-[var(--sand-300)] rounded-lg px-4 py-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)]"
                />
              </div>
            )}

            {currentQuestion.type === 'FREE_TEXT' && (
              <div className="space-y-2">
                <Label htmlFor="free-text-answer">Your response</Label>
                <Textarea
                  id="free-text-answer"
                  value={currentAnswer as string}
                  onChange={(event) => handleAnswerChange(event.target.value)}
                  className="min-h-[140px] border-[var(--sand-300)] focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)]"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="border-[var(--sand-300)]"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          {isLastQuestion ? (
            <Button onClick={handleSubmit} className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
              Submit test
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
