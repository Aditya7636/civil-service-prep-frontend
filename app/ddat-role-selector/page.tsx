'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { fetchCatalogDDaTCategories, fetchCatalogDDaTRoles } from '@/lib/api';
import type { CatalogDDaTRole, CatalogDDaTRoleCategory } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowLeft,
  Database,
  Code,
  Server,
  PackageCheck,
  TestTube,
  Palette,
  Sparkles,
  CheckCircle2,
  ClipboardCheck,
  Target,
} from 'lucide-react';

export default function DDaTRoleSelectorPage() {
  const router = useRouter();
  const { updateDDaTRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<CatalogDDaTRoleCategory[]>([]);
  const [roles, setRoles] = useState<CatalogDDaTRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryIcons: Record<string, any> = {
    data: Database,
    digital: Code,
    'it-operations': Server,
    'product-delivery': PackageCheck,
    'quality-assurance': TestTube,
    'user-centred-design': Palette,
  };

  useEffect(() => {
    Promise.all([fetchCatalogDDaTCategories(), fetchCatalogDDaTRoles()])
      .then(([fetchedCategories, fetchedRoles]) => {
        setCategories(fetchedCategories);
        setRoles(fetchedRoles);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load DDaT roles.');
        setLoading(false);
      });
  }, []);

  const selectedRoleData = roles.find((role) => role.code === selectedRole);
  const filteredRoles =
    selectedCategory === 'all' ? roles : roles.filter((role) => role.category.code === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/profession-selector')}
            className="text-white hover:bg-white/10 mb-4 -ml-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profession Selection
          </Button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl">Choose Your DDaT Role</h1>
          </div>
          <p className="text-base text-white/80 max-w-3xl">
            Select your specific Digital, Data and Technology role to receive targeted preparation materials aligned
            with the GDS DDaT Capability Framework.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[var(--navy-900)] uppercase tracking-wide mb-4">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[var(--navy-800)] text-white shadow-md'
                  : 'bg-white border-2 border-[var(--sand-300)] text-[var(--navy-700)] hover:border-[var(--navy-700)]'
              }`}
            >
              All Roles ({roles.length})
            </button>
            {categories.map((category) => {
              const Icon = categoryIcons[category.code] ?? Code;
              const roleCount = roles.filter((role) => role.category.code === category.code).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.code)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.code
                      ? 'bg-[var(--navy-800)] text-white shadow-md'
                      : 'bg-white border-2 border-[var(--sand-300)] text-[var(--navy-700)] hover:border-[var(--navy-700)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name} ({roleCount})
                </button>
              );
            })}
          </div>
          {selectedCategory !== 'all' && (
            <p className="text-sm text-[var(--navy-600)] mt-3">
              {categories.find((category) => category.code === selectedCategory)?.description}
            </p>
          )}
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {loading ? (
            <div className="text-sm text-[var(--navy-600)]">Loading roles...</div>
          ) : (
            filteredRoles.map((role) => {
              const Icon = categoryIcons[role.category.code] ?? Code;
              const isSelected = selectedRole === role.code;

              return (
                <Card
                  key={role.id}
                  onClick={() => setSelectedRole(role.code)}
                  onDoubleClick={() => {
                    setSelectedRole(role.code);
                    updateDDaTRole(role.code);
                    router.push('/grade-selector');
                  }}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-[var(--navy-800)] bg-gradient-to-br from-[var(--navy-50)] to-white shadow-lg ring-2 ring-[var(--navy-800)]/20'
                      : 'border-2 border-[var(--sand-300)] hover:border-[var(--navy-700)] hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-[var(--navy-800)]' : 'bg-[var(--sand-200)]'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-[var(--navy-700)]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-[var(--navy-900)] mb-1">{role.name}</h3>
                        <p className="text-xs text-[var(--navy-600)] mb-2">{role.category.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--navy-600)] leading-relaxed mb-3">{role.description}</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-[var(--navy-900)] mb-1">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {role.keySkills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2 py-0.5 bg-[var(--teal-100)] text-[var(--teal-900)] rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {role.keySkills.length > 3 && (
                            <span className="text-xs px-2 py-0.5 bg-[var(--sand-200)] text-[var(--navy-700)] rounded">
                              +{role.keySkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--navy-600)]">
                          <strong>Typical grades:</strong> {role.typicalGrades.join(', ')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {selectedRoleData && (
          <div className="border-2 border-[var(--navy-700)] bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white mb-8 rounded-2xl">
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-white mb-2">{selectedRoleData.name}</h4>
                  <p className="text-sm text-white/90 leading-relaxed mb-3">{selectedRoleData.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-4">
                    <div>
                      <strong>Category:</strong> {selectedRoleData.category.name}
                    </div>
                    <div>
                      <strong>Typical grades:</strong> {selectedRoleData.typicalGrades.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-[var(--teal-400)]" />
                    <h5 className="font-semibold text-white text-sm">Key Responsibilities</h5>
                  </div>
                  <ul className="space-y-2">
                    {selectedRoleData.keyResponsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2 text-sm text-white/90">
                        <CheckCircle2 className="h-4 w-4 text-[var(--teal-400)] flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--teal-400)]" />
                    <h5 className="font-semibold text-white text-sm">Aligned Behaviours</h5>
                  </div>
                  <ul className="space-y-2">
                    {selectedRoleData.alignedBehaviours.map((behaviour) => (
                      <li key={behaviour.id} className="flex items-start gap-2 text-sm text-white/90">
                        <span className="w-1.5 h-1.5 bg-[var(--teal-400)] rounded-full flex-shrink-0 mt-2"></span>
                        <span>{behaviour.name}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/70 mt-3 italic">
                    These behaviours are commonly assessed for this role
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck className="h-5 w-5 text-[var(--teal-400)]" />
                    <h5 className="font-semibold text-white text-sm">Typical Assessment Tests</h5>
                  </div>
                  <ul className="space-y-3">
                    {selectedRoleData.requiredTests.map((test) => (
                      <li key={test.id} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              test.type === 'TECHNICAL'
                                ? 'bg-[var(--teal-600)] text-white'
                                : test.type === 'SITUATIONAL'
                                  ? 'bg-[var(--navy-600)] text-white'
                                  : test.type === 'WRITTEN'
                                    ? 'bg-purple-600 text-white'
                                    : test.type === 'PRESENTATION'
                                      ? 'bg-orange-600 text-white'
                                      : 'bg-blue-600 text-white'
                            }`}
                          >
                            {test.type.replace('_', ' ')}
                          </span>
                          {test.typical && <span className="text-xs text-[var(--teal-400)] font-medium">★ Common</span>}
                        </div>
                        <p className="text-white/90 font-medium">{test.name}</p>
                        <p className="text-xs text-white/70">{test.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (selectedRole) {
                      updateDDaTRole(selectedRole);
                    }
                    router.push('/grade-selector');
                  }}
                  className="bg-white text-[var(--navy-900)] hover:bg-[var(--sand-100)] h-12 px-8 shadow-lg text-base rounded-lg inline-flex items-center"
                >
                  Continue to Grade Selection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[var(--teal-50)] border-[var(--teal-200)] border rounded-2xl">
          <div className="p-5">
            <p className="text-sm text-[var(--navy-700)]">
              <strong>Note:</strong> These roles are based on the Government Digital Service (GDS) DDaT Capability
              Framework. Your preparation content will include role-specific behaviour examples, technical guidance,
              and interview preparation tailored to your chosen role and grade level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
