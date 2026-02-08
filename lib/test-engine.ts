import { Question, Answer, TestAttempt, BehaviourScore, Test } from './design-types';
import { getBehaviourById, getQuestionById } from './mock-data';

/**
 * Test Engine - Core functionality for managing tests and scoring
 */

// Score a single MCQ answer
export function scoreMCQAnswer(
  question: Question,
  response: string
): { isCorrect: boolean; score: number; feedback: string } {
  if (question.type !== 'MCQ') {
    throw new Error('Question is not MCQ type');
  }

  const isCorrect = response === question.correctAnswer;
  const score = isCorrect ? question.marks : 0;
  const feedback = isCorrect
    ? `Correct! ${question.rationale}`
    : `Incorrect. ${question.rationale}`;

  return { isCorrect, score, feedback };
}

// Score a Situational Judgement Test (ranking) answer
export function scoreSJTAnswer(
  question: Question,
  response: string[]
): { score: number; feedback: string } {
  if (question.type !== 'SJT' || !Array.isArray(question.correctAnswer)) {
    throw new Error('Question is not SJT type or missing correct answer array');
  }

  const correctOrder = question.correctAnswer as string[];
  let score = 0;
  const maxScore = question.marks;

  // Award points based on how close the ranking is to the ideal
  // Perfect match = full marks, each position off reduces score
  for (let i = 0; i < response.length; i++) {
    const correctPosition = correctOrder.indexOf(response[i]);
    const positionDifference = Math.abs(i - correctPosition);
    
    // Award partial marks: 0 difference = 1 point, 1 difference = 0.5 points, etc.
    if (positionDifference === 0) {
      score += 1;
    } else if (positionDifference === 1) {
      score += 0.5;
    }
  }

  // Normalize to question marks
  const normalizedScore = Math.min((score / correctOrder.length) * maxScore, maxScore);

  const percentage = (normalizedScore / maxScore) * 100;
  let feedback = `You scored ${normalizedScore.toFixed(1)}/${maxScore} (${percentage.toFixed(0)}%). ${question.rationale}`;

  return { score: normalizedScore, feedback };
}

// Score a numerical answer
export function scoreNumericalAnswer(
  question: Question,
  response: string
): { isCorrect: boolean; score: number; feedback: string } {
  if (question.type !== 'NUMERICAL') {
    throw new Error('Question is not NUMERICAL type');
  }

  const isCorrect = response === question.correctAnswer;
  const score = isCorrect ? question.marks : 0;
  const feedback = isCorrect
    ? `Correct! ${question.rationale}`
    : `Incorrect. ${question.rationale}`;

  return { isCorrect, score, feedback };
}

// Score a free text answer (simplified rubric scoring)
export function scoreFreeTextAnswer(
  question: Question,
  response: string
): { score: number; feedback: string } {
  if (question.type !== 'FREE_TEXT') {
    throw new Error('Question is not FREE_TEXT type');
  }

  // Simplified scoring based on word count and keywords (in production, use AI/manual review)
  const wordCount = response.trim().split(/\s+/).length;
  const hasStructure = response.toLowerCase().includes('situation') ||
                       response.toLowerCase().includes('task') ||
                       response.toLowerCase().includes('action') ||
                       response.toLowerCase().includes('result');

  let score = 0;
  const maxScore = question.marks;

  // Award points for word count (minimum 150 words for full answer)
  if (wordCount >= 150) {
    score += maxScore * 0.3;
  } else if (wordCount >= 100) {
    score += maxScore * 0.2;
  } else if (wordCount >= 50) {
    score += maxScore * 0.1;
  }

  // Award points for STAR structure
  if (hasStructure) {
    score += maxScore * 0.4;
  }

  // Award points for depth (simplified - check for specific keywords)
  const depthKeywords = ['led', 'managed', 'implemented', 'achieved', 'improved', 'delivered'];
  const hasDepth = depthKeywords.some(keyword => response.toLowerCase().includes(keyword));
  if (hasDepth) {
    score += maxScore * 0.3;
  }

  score = Math.min(score, maxScore);

  const feedback = `Estimated score: ${score.toFixed(1)}/${maxScore}. ${
    wordCount < 150 ? 'Consider providing more detail. ' : ''
  }${
    !hasStructure ? 'Structure your answer using STAR method (Situation, Task, Action, Result). ' : ''
  }In a real assessment, this would be manually graded by assessors.`;

  return { score, feedback };
}

// Calculate overall test score and behaviour scores
export function calculateTestScore(
  test: Test,
  answers: Answer[]
): {
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  behaviourScores: BehaviourScore[];
} {
  let totalScore = 0;
  let maxScore = 0;

  // Calculate total score
  answers.forEach((answer) => {
    totalScore += answer.score;
    maxScore += answer.maxScore;
  });

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const passed = percentage >= test.passingScore;

  // Calculate behaviour-level scores
  const behaviourScoreMap = new Map<string, { total: number; max: number; count: number }>();

  answers.forEach((answer) => {
    const question = getQuestionById(answer.questionId);
    if (!question) return;

    question.behaviourIds.forEach((behaviourId) => {
      if (!behaviourScoreMap.has(behaviourId)) {
        behaviourScoreMap.set(behaviourId, { total: 0, max: 0, count: 0 });
      }

      const current = behaviourScoreMap.get(behaviourId)!;
      current.total += answer.score;
      current.max += answer.maxScore;
      current.count += 1;
    });
  });

  const behaviourScores: BehaviourScore[] = Array.from(behaviourScoreMap.entries()).map(
    ([behaviourId, data]) => {
      const behaviour = getBehaviourById(behaviourId);
      const percentage = data.max > 0 ? (data.total / data.max) * 100 : 0;
      
      // Convert percentage to 0-4 scale
      let score = 0;
      if (percentage >= 90) score = 4;
      else if (percentage >= 75) score = 3;
      else if (percentage >= 60) score = 2;
      else if (percentage >= 40) score = 1;
      else score = 0;

      // Generate recommendations based on score
      const recommendations: string[] = [];
      if (score < 3) {
        recommendations.push(`Review ${behaviour?.name} success criteria and examples`);
        recommendations.push(`Practice more questions targeting ${behaviour?.name}`);
      }
      if (score >= 3) {
        recommendations.push(`Strong performance in ${behaviour?.name} - maintain this standard`);
      }

      return {
        behaviourId,
        behaviourName: behaviour?.name || behaviourId,
        score,
        recommendations,
      };
    }
  );

  return {
    totalScore,
    maxScore,
    percentage,
    passed,
    behaviourScores,
  };
}

// Process a complete test attempt
export function processTestAttempt(testAttempt: TestAttempt): TestAttempt {
  const test = testAttempt.test;
  const scoringResult = calculateTestScore(test, testAttempt.answers);

  return {
    ...testAttempt,
    score: scoringResult.percentage,
    behaviourScores: scoringResult.behaviourScores,
    status: 'COMPLETED',
    completedAt: new Date().toISOString(),
  };
}

// Shuffle array (for question randomization)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get randomized questions for a test
export function getRandomizedQuestions(test: Test): Question[] {
  const questions = test.questionIds
    .map(id => getQuestionById(id))
    .filter((q): q is Question => q !== undefined);

  // Optionally shuffle - for demo purposes, keep order for consistency
  // return shuffleArray(questions);
  return questions;
}

// Calculate time remaining
export function calculateTimeRemaining(
  startTime: string,
  timeLimitMinutes: number
): {
  remainingSeconds: number;
  isExpired: boolean;
} {
  const start = new Date(startTime).getTime();
  const now = Date.now();
  const elapsed = (now - start) / 1000; // seconds
  const timeLimit = timeLimitMinutes * 60; // convert to seconds
  const remainingSeconds = Math.max(0, timeLimit - elapsed);
  const isExpired = remainingSeconds === 0;

  return { remainingSeconds, isExpired };
}

// Format time for display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Auto-save functionality
export function autoSaveAnswer(
  attemptId: string,
  questionId: string,
  response: string | string[]
): void {
  // In production, this would call an API
  // For demo, store in localStorage
  const key = `attempt-${attemptId}-question-${questionId}`;
  localStorage.setItem(key, JSON.stringify(response));
}

// Retrieve auto-saved answer
export function getAutoSavedAnswer(
  attemptId: string,
  questionId: string
): string | string[] | null {
  const key = `attempt-${attemptId}-question-${questionId}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
}

// Clear auto-saved answers for a test attempt
export function clearAutoSavedAnswers(attemptId: string): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(`attempt-${attemptId}-`)) {
      localStorage.removeItem(key);
    }
  });
}
