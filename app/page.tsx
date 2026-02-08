'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  FileText,
  Video,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const platformFeatures = [
    {
      icon: BookOpen,
      title: 'Success Profile Behaviours',
      description: 'Master all 9 core behaviours with STAR examples and guidance for every grade from EO to SCS',
    },
    {
      icon: FileText,
      title: 'Practice Tests & Assessments',
      description: 'CSJT, numerical reasoning, and situational judgement tests with instant scoring and feedback',
    },
    {
      icon: Video,
      title: 'Mock Interview System',
      description: 'Record and review your competency-based interview responses with detailed scoring',
    },
    {
      icon: Target,
      title: 'Application Statement Builder',
      description: 'Build compelling 250-word statements using proven frameworks and examples',
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track your preparation journey with comprehensive dashboards and insights',
    },
    {
      icon: Award,
      title: 'Profession-Specific Content',
      description: 'Tailored preparation for 30+ government professions including DDaT framework',
    },
  ];

  const trustedBy = [
    'Over 10,000 candidates prepared',
    'Supporting EO to SCS applicants',
    '30+ government professions covered',
    'Aligned with official Success Profiles framework',
  ];

  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--navy-700)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Master Your UK Civil Service Application
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Comprehensive preparation platform covering Success Profile behaviours, practice tests, mock interviews,
              and application guidance for all grades and professions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white text-lg px-10 py-7 rounded-lg shadow-2xl hover:shadow-teal-600/50 transition-all"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[var(--navy-900)] text-lg px-10 py-7 rounded-lg transition-all"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
              {['No credit card required', 'Start immediately', 'Cancel anytime'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--teal-400)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-[var(--sand-100)] border-b border-[var(--sand-300)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--navy-700)]">
            {trustedBy.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--teal-600)]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-[var(--navy-900)]">Everything You Need to Succeed</h2>
            <p className="text-lg text-[var(--navy-600)] max-w-2xl mx-auto">
              A complete preparation platform designed specifically for UK Civil Service applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="border-2 border-[var(--sand-300)] hover:border-[var(--teal-600)] hover:shadow-xl transition-all group"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--teal-600)] to-[var(--teal-700)] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[var(--navy-900)]">{feature.title}</h3>
                    <p className="text-[var(--navy-600)] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[var(--sand-50)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-[var(--navy-900)]">Simple 3-Step Setup</h2>
            <p className="text-lg text-[var(--navy-600)]">Get started in under 2 minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: 'Create Account',
                description:
                  'Sign up in seconds with your email. No payment details required to start exploring.',
                accent: 'bg-[var(--navy-900)]',
              },
              {
                step: 2,
                title: 'Choose Your Path',
                description: 'Select your profession and target grade to personalize your preparation content.',
                accent: 'bg-[var(--teal-600)]',
              },
              {
                step: 3,
                title: 'Start Preparing',
                description:
                  'Access tests, behaviour guides, and interview practice tailored to your goals.',
                accent: 'bg-[var(--teal-700)]',
              },
            ].map((item) => (
              <Card key={item.step} className="border-2 border-[var(--navy-700)] bg-white relative overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-20 h-20 ${item.accent} rounded-bl-full flex items-center justify-center`}
                >
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <CardContent className="p-8 pt-10">
                  <h3 className="text-2xl font-semibold mb-3 text-[var(--navy-900)]">{item.title}</h3>
                  <p className="text-[var(--navy-600)] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
