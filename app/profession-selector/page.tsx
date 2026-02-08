'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { fetchCatalogProfessionCategories, fetchCatalogProfessions } from '@/lib/api';
import type { CatalogProfession, CatalogProfessionCategory } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProfessionSelectorPage() {
  const router = useRouter();
  const { updateTargetProfession } = useAuth();
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [professions, setProfessions] = useState<CatalogProfession[]>([]);
  const [categories, setCategories] = useState<CatalogProfessionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchCatalogProfessionCategories(), fetchCatalogProfessions()])
      .then(([fetchedCategories, fetchedProfessions]) => {
        setCategories(fetchedCategories);
        setProfessions(fetchedProfessions);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load professions.');
        setLoading(false);
      });
  }, []);

  const groupedProfessions = useMemo(() => {
    const map = new Map<string, CatalogProfession[]>();
    professions.forEach((profession) => {
      const list = map.get(profession.category.slug) ?? [];
      list.push(profession);
      map.set(profession.category.slug, list);
    });
    return map;
  }, [professions]);

  const handleProfessionSelect = (professionSlug: string) => {
    setSelectedProfession(professionSlug);
  };

  const handleContinue = () => {
    if (!selectedProfession) return;
    updateTargetProfession(selectedProfession);
    if (selectedProfession === 'digital-data') {
      router.push('/ddat-role-selector');
    } else {
      router.push('/grade-selector');
    }
  };

  const handleGeneralSelect = () => {
    updateTargetProfession('general');
    router.push('/grade-selector');
  };

  const selectedProfessionData = professions.find((profession) => profession.slug === selectedProfession);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl mb-2">Choose Your Profession</h1>
          <p className="text-base text-white/80 max-w-3xl">
            Select your government profession for tailored preparation, or start with general Civil Service content.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-[var(--navy-900)] mb-6">Choose your preparation path</h2>
          </div>

          <div className="space-y-6 mb-8">
            <Card
              className="border-2 border-[var(--navy-700)]/20 bg-gradient-to-br from-white via-white to-[var(--navy-50)] hover:border-[var(--navy-700)]/60 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={handleGeneralSelect}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--navy-700)]/8 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--navy-800)]/5 to-transparent rounded-tr-full"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--navy-800)] to-[var(--navy-900)] rounded-xl mb-4 shadow-lg">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--navy-900)] mb-2 group-hover:text-[var(--navy-700)] transition-colors">
                      General Civil Service Preparation
                    </h3>
                    <p className="text-base text-[var(--navy-600)] leading-relaxed mb-4 max-w-md">
                      A comprehensive preparation programme covering all core Success Profile elements applicable across
                      the entire Civil Service. Ideal for candidates applying to multiple roles or exploring different
                      departments.
                    </p>
                    <Button
                      className="bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white h-12 px-8 shadow-md hover:shadow-lg transition-all"
                      onClick={handleGeneralSelect}
                    >
                      Choose General Preparation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1 border-l-0 md:border-l-2 border-[var(--sand-300)] pl-0 md:pl-8">
                    <h4 className="text-sm font-semibold text-[var(--navy-900)] uppercase tracking-wide mb-4">
                      What&apos;s Included
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        ['All 9 Success Profile Behaviours', 'Complete coverage from EO to SCS level'],
                        ['Practice Tests Suite', 'CSJT, numerical, verbal reasoning tests'],
                        ['Statement Builder Tool', '250-word statement guidance for all behaviours'],
                        ['Mock Interview System', 'Record, review, and score your responses'],
                        ['Progress Analytics', 'Track your preparation across all areas'],
                        ['Multi-Grade Coverage', 'EO, HEO, SEO, Grade 7, Grade 6, SCS'],
                      ].map(([title, desc]) => (
                        <div key={title} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[var(--navy-700)] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-[var(--navy-900)]">{title}</p>
                            <p className="text-xs text-[var(--navy-600)]">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[var(--sand-300)]">
                      <p className="text-xs text-[var(--navy-600)] italic">
                        <strong>Best for:</strong> First-time applicants, career changers, or those applying to multiple
                        departments without a specific profession focus
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[var(--navy-700)]/20 bg-gradient-to-br from-white via-white to-[var(--navy-50)] hover:border-[var(--navy-700)]/60 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--navy-700)]/8 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--navy-800)]/5 to-transparent rounded-tr-full"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 md:w-80">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--navy-800)] to-[var(--navy-900)] rounded-xl mb-4 shadow-lg">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--navy-900)] mb-2">
                      Profession-Specific Preparation
                    </h3>
                    <p className="text-base text-[var(--navy-600)] leading-relaxed mb-6">
                      Targeted preparation tailored to one of 30+ government professions. Includes profession-relevant
                      behaviour examples, role-specific guidance, and contextual interview preparation.
                    </p>

                    <div className="space-y-3 mb-6">
                      <label htmlFor="profession-select-hz" className="text-sm font-semibold text-[var(--navy-900)]">
                        Select Your Government Profession
                      </label>
                      <Select value={selectedProfession} onValueChange={handleProfessionSelect}>
                        <SelectTrigger
                          id="profession-select-hz"
                          className="h-12 text-base border-2 border-[var(--sand-300)] focus:ring-[var(--navy-700)] focus:border-[var(--navy-700)]"
                        >
                          <SelectValue placeholder={loading ? 'Loading professions...' : 'Choose from professions...'} />
                        </SelectTrigger>
                        <SelectContent className="max-h-[400px]">
                          {categories.map((category) => (
                            <SelectGroup key={category.id}>
                              <SelectLabel className="text-[var(--navy-900)] font-semibold px-2 py-2 bg-[var(--teal-50)]">
                                {category.name}
                              </SelectLabel>
                              {(groupedProfessions.get(category.slug) ?? []).map((profession) => (
                                <SelectItem key={profession.slug} value={profession.slug} className="py-3 cursor-pointer">
                                  {profession.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                      {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleContinue}
                      disabled={!selectedProfession}
                      className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white h-12 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue with {selectedProfessionData ? selectedProfessionData.name : 'Selected Profession'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex-1 border-l-0 md:border-l-2 border-[var(--sand-300)] pl-0 md:pl-8">
                    <h4 className="text-sm font-semibold text-[var(--navy-900)] uppercase tracking-wide mb-4">
                      What&apos;s Included
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        ['Profession-Relevant Behaviours', 'Prioritized behaviours for your role'],
                        ['Role-Specific Examples', 'Contextual STAR examples for your profession'],
                        ['Targeted Test Prep', 'Tests commonly used for your profession'],
                        ['Profession Frameworks', 'Including DDaT capability framework where applicable'],
                        ['Contextual Guidance', 'Interview tips specific to your department'],
                        ['Everything from General', 'Plus all core features and test practice'],
                      ].map(([title, desc]) => (
                        <div key={title} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[var(--navy-700)] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-[var(--navy-900)]">{title}</p>
                            <p className="text-xs text-[var(--navy-600)]">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[var(--sand-300)]">
                      <p className="text-xs text-[var(--navy-600)] italic">
                        <strong>Best for:</strong> Candidates who know their target profession and want examples,
                        behaviours, and guidance tailored to their specific role and department
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedProfessionData && (
            <Card className="border-2 border-[var(--navy-700)] bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      You selected: {selectedProfessionData.name}
                    </h4>
                    <p className="text-sm text-white/90 leading-relaxed mb-3">{selectedProfessionData.description}</p>
                    {selectedProfession === 'digital-data' ? (
                      <p className="text-xs text-white/70">
                        Next, you&apos;ll choose your specific DDaT role (e.g., Data Engineer, Software Developer, User
                        Researcher) from the GDS DDaT Capability Framework, then select your target grade.
                      </p>
                    ) : (
                      <p className="text-xs text-white/70">
                        Your preparation content will be customized with examples and guidance relevant to{' '}
                        {selectedProfessionData.name} roles across all grade levels.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
