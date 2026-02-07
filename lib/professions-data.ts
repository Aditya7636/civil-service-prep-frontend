import type { AssessmentMethodId, SuccessProfileBehaviourId } from './assessment-data';

// UK Government Professions Data
// Source: https://www.gov.uk/government/publications/government-professions/government-professions

export type ProfessionCategoryId =
  | 'operational-delivery'
  | 'policy'
  | 'functional'
  | 'specialist';

export interface Profession {
  id: string;
  name: string;
  category: ProfessionCategoryId;
  description: string;
  slug: string;
  hasSpecificBehaviours?: boolean;
  alignedBehaviours?: SuccessProfileBehaviourId[];
  recommendedAssessments?: AssessmentMethodId[];
}

export interface ProfessionCategory {
  id: ProfessionCategoryId;
  name: string;
  description: string;
}

export const professionCategories: ProfessionCategory[] = [
  {
    id: 'operational-delivery',
    name: 'Operational Delivery',
    description: 'Frontline services and operational excellence',
  },
  {
    id: 'policy',
    name: 'Policy',
    description: 'Policy development and implementation',
  },
  {
    id: 'functional',
    name: 'Functional Professions',
    description: 'Core corporate and enabling functions',
  },
  {
    id: 'specialist',
    name: 'Specialist Professions',
    description: 'Technical and specialist expertise',
  },
];

export const professions: Profession[] = [
  {
    id: 'operational-delivery',
    name: 'Operational Delivery',
    category: 'operational-delivery',
    description: 'Managing frontline services, customer operations, and delivery of public services',
    slug: 'operational-delivery',
    alignedBehaviours: ['delivering-at-pace', 'managing-a-quality-service', 'working-together', 'communicating-and-influencing'],
    recommendedAssessments: ['csjt', 'interview', 'assessment-centre', 'role-play', 'group-exercise'],
  },
  {
    id: 'policy',
    name: 'Policy',
    category: 'policy',
    description: 'Developing, analyzing and implementing government policy',
    slug: 'policy',
    alignedBehaviours: ['seeing-the-big-picture', 'making-effective-decisions', 'communicating-and-influencing', 'working-together'],
    recommendedAssessments: ['application-form', 'written-analysis', 'presentation', 'interview', 'assessment-centre'],
  },
  {
    id: 'actuary',
    name: 'Actuary',
    category: 'functional',
    description: 'Risk assessment, financial modeling and actuarial analysis',
    slug: 'actuary',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'technical-assessment', 'written-analysis', 'interview'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    category: 'functional',
    description: 'Procurement, contract management and commercial strategy',
    slug: 'commercial',
    alignedBehaviours: ['making-effective-decisions', 'delivering-at-pace', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre', 'presentation'],
  },
  {
    id: 'communications',
    name: 'Communications',
    category: 'functional',
    description: 'Internal and external communications, media relations and campaigns',
    slug: 'communications',
    alignedBehaviours: ['communicating-and-influencing', 'seeing-the-big-picture', 'working-together'],
    recommendedAssessments: ['application-form', 'presentation', 'interview', 'written-analysis'],
  },
  {
    id: 'counter-fraud',
    name: 'Counter Fraud',
    category: 'functional',
    description: 'Fraud detection, investigation and prevention',
    slug: 'counter-fraud',
    alignedBehaviours: ['making-effective-decisions', 'delivering-at-pace', 'managing-a-quality-service'],
    recommendedAssessments: ['csjt', 'interview', 'assessment-centre', 'written-analysis'],
  },
  {
    id: 'debt',
    name: 'Debt',
    category: 'functional',
    description: 'Debt management, collection and recovery',
    slug: 'debt',
    alignedBehaviours: ['managing-a-quality-service', 'delivering-at-pace'],
    recommendedAssessments: ['csjt', 'interview', 'role-play', 'assessment-centre'],
  },
  {
    id: 'digital-data',
    name: 'Digital and Data',
    category: 'functional',
    description: 'Digital services, data analysis and technology delivery',
    slug: 'digital-data',
    hasSpecificBehaviours: true,
    alignedBehaviours: [
      'changing-and-improving',
      'making-effective-decisions',
      'working-together',
      'communicating-and-influencing',
      'delivering-at-pace',
    ],
    recommendedAssessments: ['csjt', 'technical-assessment', 'data-task', 'interview', 'presentation'],
  },
  {
    id: 'economics',
    name: 'Economics',
    category: 'functional',
    description: 'Economic analysis, forecasting and policy advice',
    slug: 'economics',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'written-analysis', 'presentation', 'interview', 'assessment-centre'],
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'functional',
    description: 'Financial management, accounting and budgeting',
    slug: 'finance',
    alignedBehaviours: ['making-effective-decisions', 'managing-a-quality-service'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview', 'assessment-centre'],
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'functional',
    description: 'Spatial analysis, mapping and geographic information systems',
    slug: 'geography',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'written-analysis', 'presentation', 'interview'],
  },
  {
    id: 'grants',
    name: 'Grants',
    category: 'functional',
    description: 'Grant administration, assessment and compliance',
    slug: 'grants',
    alignedBehaviours: ['managing-a-quality-service', 'making-effective-decisions'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre', 'written-analysis'],
  },
  {
    id: 'human-resources',
    name: 'Human Resources',
    category: 'functional',
    description: 'People management, recruitment and organizational development',
    slug: 'human-resources',
    alignedBehaviours: ['developing-self-and-others', 'working-together', 'leadership', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre', 'group-exercise'],
  },
  {
    id: 'internal-audit',
    name: 'Internal Audit',
    category: 'functional',
    description: 'Risk assurance, compliance and internal controls',
    slug: 'internal-audit',
    alignedBehaviours: ['making-effective-decisions', 'managing-a-quality-service'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview'],
  },
  {
    id: 'legal',
    name: 'Legal',
    category: 'functional',
    description: 'Legal advice, legislative drafting and litigation',
    slug: 'legal',
    alignedBehaviours: ['making-effective-decisions', 'communicating-and-influencing', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview', 'presentation'],
  },
  {
    id: 'project-delivery',
    name: 'Project Delivery',
    category: 'functional',
    description: 'Project and programme management across government',
    slug: 'project-delivery',
    alignedBehaviours: ['delivering-at-pace', 'leadership', 'working-together', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre', 'in-tray', 'group-exercise'],
  },
  {
    id: 'property',
    name: 'Property',
    category: 'functional',
    description: 'Estate management, facilities and property services',
    slug: 'property',
    alignedBehaviours: ['managing-a-quality-service', 'delivering-at-pace'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre'],
  },
  {
    id: 'operational-research',
    name: 'Operational Research',
    category: 'functional',
    description: 'Analytical modeling, optimization and decision science',
    slug: 'operational-research',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview', 'presentation'],
  },
  {
    id: 'risk-management',
    name: 'Risk Management',
    category: 'functional',
    description: 'Risk identification, assessment and mitigation',
    slug: 'risk-management',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview'],
  },
  {
    id: 'security',
    name: 'Security',
    category: 'functional',
    description: 'Physical and personnel security, protective security',
    slug: 'security',
    alignedBehaviours: ['managing-a-quality-service', 'delivering-at-pace', 'making-effective-decisions'],
    recommendedAssessments: ['csjt', 'interview', 'assessment-centre', 'role-play'],
  },
  {
    id: 'social-research',
    name: 'Social Research',
    category: 'functional',
    description: 'Social research, evaluation and evidence gathering',
    slug: 'social-research',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'written-analysis', 'presentation', 'interview'],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    category: 'functional',
    description: 'Statistical analysis, official statistics and data science',
    slug: 'statistics',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture'],
    recommendedAssessments: ['application-form', 'written-analysis', 'presentation', 'interview'],
  },
  {
    id: 'corporate-finance',
    name: 'Corporate Finance',
    category: 'specialist',
    description: 'Investment appraisal, financial modeling and corporate transactions',
    slug: 'corporate-finance',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview', 'presentation'],
  },
  {
    id: 'intelligence-analysis',
    name: 'Intelligence Analysis',
    category: 'specialist',
    description: 'Intelligence assessment, analysis and reporting',
    slug: 'intelligence-analysis',
    alignedBehaviours: ['making-effective-decisions', 'seeing-the-big-picture', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview', 'assessment-centre'],
  },
  {
    id: 'knowledge-information',
    name: 'Knowledge and Information Management',
    category: 'specialist',
    description: 'Information governance, records management and knowledge sharing',
    slug: 'knowledge-information',
    alignedBehaviours: ['managing-a-quality-service', 'working-together'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre'],
  },
  {
    id: 'clinical',
    name: 'Clinical',
    category: 'specialist',
    description: 'Healthcare professionals providing clinical expertise',
    slug: 'clinical',
    alignedBehaviours: ['managing-a-quality-service', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre'],
  },
  {
    id: 'occupational-psychology',
    name: 'Occupational Psychology',
    category: 'specialist',
    description: 'Psychological expertise in organizational and occupational contexts',
    slug: 'occupational-psychology',
    alignedBehaviours: ['developing-self-and-others', 'communicating-and-influencing', 'working-together'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre', 'presentation'],
  },
  {
    id: 'planning',
    name: 'Planning',
    category: 'specialist',
    description: 'Urban and regional planning, development control',
    slug: 'planning',
    alignedBehaviours: ['seeing-the-big-picture', 'making-effective-decisions'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview'],
  },
  {
    id: 'planning-inspection',
    name: 'Planning Inspection',
    category: 'specialist',
    description: 'Planning appeals, inquiries and inspections',
    slug: 'planning-inspection',
    alignedBehaviours: ['making-effective-decisions', 'communicating-and-influencing'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview'],
  },
  {
    id: 'science-engineering',
    name: 'Science and Engineering',
    category: 'specialist',
    description: 'Scientific and engineering expertise across disciplines',
    slug: 'science-engineering',
    alignedBehaviours: ['making-effective-decisions', 'changing-and-improving'],
    recommendedAssessments: ['application-form', 'technical-assessment', 'written-analysis', 'interview'],
  },
  {
    id: 'tax',
    name: 'Tax',
    category: 'specialist',
    description: 'Tax policy, compliance and administration',
    slug: 'tax',
    alignedBehaviours: ['making-effective-decisions', 'managing-a-quality-service'],
    recommendedAssessments: ['application-form', 'written-analysis', 'interview'],
  },
  {
    id: 'veterinary',
    name: 'Veterinary',
    category: 'specialist',
    description: 'Veterinary expertise and animal health',
    slug: 'veterinary',
    alignedBehaviours: ['managing-a-quality-service', 'delivering-at-pace'],
    recommendedAssessments: ['application-form', 'interview', 'assessment-centre'],
  },
];

export function getProfessionById(id: string): Profession | undefined {
  return professions.find((p) => p.id === id);
}

export function getProfessionBySlug(slug: string): Profession | undefined {
  return professions.find((p) => p.slug === slug);
}

export function getProfessionsByCategory(category: ProfessionCategoryId): Profession[] {
  return professions.filter((p) => p.category === category);
}

export function getCategoryById(id: ProfessionCategoryId): ProfessionCategory | undefined {
  return professionCategories.find((c) => c.id === id);
}
