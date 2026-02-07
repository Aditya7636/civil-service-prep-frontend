import Link from 'next/link';
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
} from '../components/marketing/icons';

export default function HomePage() {
  const platformFeatures = [
    {
      icon: BookOpen,
      title: 'Success Profile Behaviours',
      description:
        'Master all 9 core behaviours with STAR examples and guidance for every grade from EO to SCS',
    },
    {
      icon: FileText,
      title: 'Practice Tests & Assessments',
      description:
        'CSJT, numerical reasoning, and situational judgement tests with instant scoring and feedback',
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
              Comprehensive preparation platform covering Success Profile behaviours, practice tests, mock
              interviews, and application guidance for all grades and professions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
              <Link href="/register" className="inline-flex">
                <span className="bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white text-lg px-10 py-4 rounded-lg shadow-2xl hover:shadow-teal-600/50 transition-all inline-flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-6 w-6" />
                </span>
              </Link>
              <Link href="/login" className="inline-flex">
                <span className="border-2 border-white text-white hover:bg-white hover:text-[var(--navy-900)] text-lg px-10 py-4 rounded-lg transition-all inline-flex items-center">
                  Sign In
                </span>
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
                <div
                  key={feature.title}
                  className="border-2 border-[var(--sand-300)] hover:border-[var(--teal-600)] hover:shadow-xl transition-all group rounded-xl bg-white"
                >
                  <div className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[var(--teal-600)] to-[var(--teal-700)] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[var(--navy-900)]">{feature.title}</h3>
                    <p className="text-[var(--navy-600)] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
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
                step: '1',
                title: 'Create Account',
                text: 'Sign up in seconds with your email. No payment details required to start exploring.',
                color: 'bg-[var(--navy-900)]',
              },
              {
                step: '2',
                title: 'Choose Your Path',
                text: 'Select your profession and target grade to personalize your preparation content.',
                color: 'bg-[var(--teal-600)]',
              },
              {
                step: '3',
                title: 'Start Preparing',
                text: 'Access behaviours, tests, mock interviews, and track your progress to success.',
                color: 'bg-[var(--teal-700)]',
              },
            ].map((item) => (
              <div key={item.step} className="border-2 border-[var(--navy-700)] bg-white relative overflow-hidden rounded-xl">
                <div className={`absolute top-0 right-0 w-20 h-20 ${item.color} rounded-bl-full flex items-center justify-center`}>
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <div className="p-8 pt-10">
                  <h3 className="text-2xl font-semibold mb-3 text-[var(--navy-900)]">{item.title}</h3>
                  <p className="text-[var(--navy-600)] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="inline-flex">
              <span className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white text-lg px-10 py-4 rounded-lg shadow-xl inline-flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-[var(--sand-300)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4 text-[var(--navy-900)]">
                Built for Every Civil Service Candidate
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'First-Time Applicants',
                  items: [
                    'Learn Success Profiles framework from scratch',
                    'Understand STAR technique with examples',
                    'Practice tests to build confidence',
                  ],
                },
                {
                  title: 'Career Progression',
                  items: [
                    'Grade-specific behaviour examples (EO to SCS)',
                    'Advanced interview techniques for senior roles',
                    'Profession-specific preparation content',
                  ],
                },
                {
                  title: 'Career Changers',
                  items: [
                    'Translate private sector experience to CS behaviours',
                    'Understand government-specific competencies',
                    'Navigate the Civil Service application process',
                  ],
                },
                {
                  title: 'Technical Professionals',
                  items: [
                    'DDaT capability framework aligned content',
                    'Technical assessment practice and guidance',
                    'Role-specific examples for tech roles',
                  ],
                },
              ].map((card) => (
                <div key={card.title} className="border-2 border-[var(--sand-300)] bg-[var(--sand-50)] rounded-xl">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold mb-4 text-[var(--navy-900)]">{card.title}</h3>
                    <ul className="space-y-3">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[var(--teal-600)] flex-shrink-0 mt-0.5" />
                          <span className="text-[var(--navy-700)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Start Your Civil Service Journey?</h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed">
            Join thousands of successful candidates who prepared with our comprehensive platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <Link href="/register" className="inline-flex">
              <span className="bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white text-lg px-12 py-4 rounded-lg shadow-2xl hover:shadow-teal-600/50 transition-all inline-flex items-center">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-6 w-6" />
              </span>
            </Link>
          </div>

          <p className="text-sm text-white/70">No credit card required • Instant access • Cancel anytime</p>
        </div>
      </section>

      <section className="py-8 bg-[var(--sand-200)] border-t border-[var(--sand-300)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--navy-600)] text-center leading-relaxed">
            This is an independent preparation platform not affiliated with the UK Civil Service. All content is
            original, advisory, and designed to support your application journey. Always refer to official government
            sources for application requirements.
          </p>
        </div>
      </section>
    </div>
  );
}
