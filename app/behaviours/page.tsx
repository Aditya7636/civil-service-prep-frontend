'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { behaviours, roleGrades, getBehavioursByGrade } from '@/lib/mock-data';
import { getProfessionBySlug } from '@/lib/professions-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BehavioursPage() {
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState(user?.targetGrade || 'all');

  const filteredBehaviours =
    selectedGrade && selectedGrade !== 'all' ? getBehavioursByGrade(selectedGrade) : behaviours;

  const profession = useMemo(() => {
    if (user?.targetProfession) {
      return getProfessionBySlug(user.targetProfession);
    }
    return null;
  }, [user?.targetProfession]);

  const professionBehaviours = useMemo(() => {
    if (!profession?.relatedBehaviours) return [];
    return filteredBehaviours.filter((behaviour) => profession.relatedBehaviours?.includes(behaviour.id));
  }, [profession, filteredBehaviours]);

  const otherBehaviours = useMemo(() => {
    if (!profession?.relatedBehaviours) return filteredBehaviours;
    return filteredBehaviours.filter((behaviour) => !profession.relatedBehaviours?.includes(behaviour.id));
  }, [profession, filteredBehaviours]);

  const handleReset = () => {
    setSelectedGrade('all');
  };

  return (
    <div className="min-h-screen bg-[var(--sand-100)]">
      <div className="bg-[var(--sand-100)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-16 pb-12">
          <p className="text-xs uppercase tracking-wider text-[var(--navy-500)] mb-3 font-semibold">Success Profiles</p>
          <h1 className="text-[40px] md:text-[44px] font-semibold text-[var(--navy-900)] mb-4 leading-tight">
            Behaviour Library
          </h1>
          <p className="text-[17px] text-[var(--navy-600)] max-w-3xl leading-relaxed">
            Find the behaviours that matter for your grade and role. Use STAR-based guidance to improve answers.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[var(--sand-300)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-[var(--navy-900)]">Grade</label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-[220px] border border-[var(--sand-400)] bg-white">
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All grades</SelectItem>
                  {roleGrades.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id}>
                      {grade.name} - {grade.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedGrade && selectedGrade !== 'all' && (
                <button
                  onClick={handleReset}
                  className="text-sm text-[var(--teal-600)] hover:text-[var(--teal-700)] underline"
                >
                  Reset filters
                </button>
              )}
            </div>
            <p className="text-sm text-[var(--navy-600)]">
              Showing {filteredBehaviours.length} behaviour{filteredBehaviours.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        {filteredBehaviours.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <p className="text-lg text-[var(--navy-900)] mb-2 font-semibold">
                No behaviours available for this grade yet
              </p>
              <p className="text-[var(--navy-600)] mb-6">
                We&apos;re currently building content for all grade levels. Try selecting a different grade or view all
                behaviours.
              </p>
              <Button onClick={() => setSelectedGrade('all')} className="bg-[var(--teal-600)] hover:bg-[var(--teal-700)] text-white">
                View all behaviours
              </Button>
            </div>
          </div>
        ) : (
          <>
            {profession && professionBehaviours.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-[var(--teal-600)]" />
                  <h2 className="text-xl font-semibold text-[var(--navy-900)]">Key for {profession.name}</h2>
                </div>
                <p className="text-sm text-[var(--navy-600)] mb-6">
                  These behaviours are particularly important for your profession.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {professionBehaviours.map((behaviour) => (
                    <Card
                      key={behaviour.id}
                      className="border-2 border-[var(--teal-600)] hover:shadow-lg transition-all rounded-2xl bg-[var(--teal-50)]"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-2">
                            <span className="inline-block bg-[var(--teal-600)] text-white p-1.5 rounded-md mt-0.5">
                              <Briefcase className="h-4 w-4" />
                            </span>
                            <h3 className="text-[19px] font-semibold text-[var(--navy-900)] leading-snug">
                              {behaviour.name}
                            </h3>
                          </div>
                          <span className="inline-block bg-[var(--teal-600)] text-white px-3 py-1 text-xs rounded-full whitespace-nowrap flex-shrink-0">
                            {behaviour.grade.name}
                          </span>
                        </div>
                        <p className="text-[15px] text-[var(--navy-600)] mb-5 line-clamp-2 leading-relaxed">
                          {behaviour.description}
                        </p>
                        <Link href={`/behaviours/${behaviour.id}`}>
                          <Button
                            variant="ghost"
                            className="text-[var(--teal-600)] hover:text-[var(--teal-700)] p-0 h-auto font-medium"
                          >
                            View guide
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {otherBehaviours.length > 0 && (
                  <div className="border-t border-[var(--sand-300)] pt-8">
                    <h2 className="text-lg font-semibold text-[var(--navy-900)] mb-6">All other behaviours</h2>
                  </div>
                )}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {(profession && professionBehaviours.length > 0 ? otherBehaviours : filteredBehaviours).map((behaviour) => (
                <Card
                  key={behaviour.id}
                  className="border border-[var(--sand-300)] hover:border-[var(--teal-600)] transition-all hover:shadow-md rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-[19px] font-semibold text-[var(--navy-900)] leading-snug pr-2">
                        {behaviour.name}
                      </h3>
                      <span className="inline-block bg-[var(--teal-600)] text-white px-3 py-1 text-xs rounded-full whitespace-nowrap flex-shrink-0">
                        {behaviour.grade.name}
                      </span>
                    </div>
                    <p className="text-[15px] text-[var(--navy-600)] mb-5 line-clamp-2 leading-relaxed">
                      {behaviour.description}
                    </p>
                    <Link href={`/behaviours/${behaviour.id}`}>
                      <Button
                        variant="ghost"
                        className="text-[var(--teal-600)] hover:text-[var(--teal-700)] p-0 h-auto font-medium"
                      >
                        View guide
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
