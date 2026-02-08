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
  relatedBehaviours?: string[]; // IDs of behaviours from mock-data
  relatedTests?: string[]; // IDs of tests from mock-data
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
  // Operational Delivery
  {
    id: 'operational-delivery',
    name: 'Operational Delivery',
    category: 'operational-delivery',
    description: 'Managing frontline services, customer operations, and delivery of public services',
    slug: 'operational-delivery',
    relatedBehaviours: ['delivering-at-pace', 'managing-a-quality-service', 'working-together'],
    relatedTests: ['test-sjt', 'test-service-delivery'],
  },

  // Policy
  {
    id: 'policy',
    name: 'Policy',
    category: 'policy',
    description: 'Developing, analyzing and implementing government policy',
    slug: 'policy',
    relatedBehaviours: ['making-effective-decisions', 'communicating-and-influencing', 'seeing-the-big-picture'],
    relatedTests: ['test-sjt', 'test-numerical'],
  },

  // Functional Professions
  {
    id: 'actuary',
    name: 'Actuary',
    category: 'functional',
    description: 'Risk assessment, financial modeling and actuarial analysis',
    slug: 'actuary',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    category: 'functional',
    description: 'Procurement, contract management and commercial strategy',
    slug: 'commercial',
    relatedBehaviours: ['making-effective-decisions', 'delivering-at-pace'],
  },
  {
    id: 'communications',
    name: 'Communications',
    category: 'functional',
    description: 'Internal and external communications, media relations and campaigns',
    slug: 'communications',
    relatedBehaviours: ['communicating-and-influencing'],
  },
  {
    id: 'counter-fraud',
    name: 'Counter Fraud',
    category: 'functional',
    description: 'Fraud detection, investigation and prevention',
    slug: 'counter-fraud',
    relatedBehaviours: ['making-effective-decisions', 'delivering-at-pace'],
  },
  {
    id: 'debt',
    name: 'Debt',
    category: 'functional',
    description: 'Debt management, collection and recovery',
    slug: 'debt',
    relatedBehaviours: ['managing-a-quality-service'],
  },
  {
    id: 'digital-data',
    name: 'Digital and Data',
    category: 'functional',
    description: 'Digital services, data analysis and technology delivery',
    slug: 'digital-data',
    hasSpecificBehaviours: true,
    relatedBehaviours: ['gdd-technical-depth', 'gdd-user-focus', 'gdd-agile-working'],
  },
  {
    id: 'economics',
    name: 'Economics',
    category: 'functional',
    description: 'Economic analysis, forecasting and policy advice',
    slug: 'economics',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'functional',
    description: 'Financial management, accounting and budgeting',
    slug: 'finance',
    relatedBehaviours: ['making-effective-decisions', 'managing-a-quality-service'],
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'functional',
    description: 'Spatial analysis, mapping and geographic information systems',
    slug: 'geography',
  },
  {
    id: 'grants',
    name: 'Grants',
    category: 'functional',
    description: 'Grant administration, assessment and compliance',
    slug: 'grants',
    relatedBehaviours: ['managing-a-quality-service'],
  },
  {
    id: 'human-resources',
    name: 'Human Resources',
    category: 'functional',
    description: 'People management, recruitment and organizational development',
    slug: 'human-resources',
    relatedBehaviours: ['developing-self-and-others', 'working-together'],
  },
  {
    id: 'internal-audit',
    name: 'Internal Audit',
    category: 'functional',
    description: 'Risk assurance, compliance and internal controls',
    slug: 'internal-audit',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'legal',
    name: 'Legal',
    category: 'functional',
    description: 'Legal advice, legislative drafting and litigation',
    slug: 'legal',
    relatedBehaviours: ['making-effective-decisions', 'communicating-and-influencing'],
  },
  {
    id: 'project-delivery',
    name: 'Project Delivery',
    category: 'functional',
    description: 'Project and programme management across government',
    slug: 'project-delivery',
    relatedBehaviours: ['delivering-at-pace', 'leadership'],
  },
  {
    id: 'property',
    name: 'Property',
    category: 'functional',
    description: 'Estate management, facilities and property services',
    slug: 'property',
    relatedBehaviours: ['managing-a-quality-service'],
  },
  {
    id: 'operational-research',
    name: 'Operational Research',
    category: 'functional',
    description: 'Analytical modeling, optimization and decision science',
    slug: 'operational-research',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'risk-management',
    name: 'Risk Management',
    category: 'functional',
    description: 'Risk identification, assessment and mitigation',
    slug: 'risk-management',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'security',
    name: 'Security',
    category: 'functional',
    description: 'Physical and personnel security, protective security',
    slug: 'security',
    relatedBehaviours: ['managing-a-quality-service'],
  },
  {
    id: 'social-research',
    name: 'Social Research',
    category: 'functional',
    description: 'Social research, evaluation and evidence gathering',
    slug: 'social-research',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    category: 'functional',
    description: 'Statistical analysis, official statistics and data science',
    slug: 'statistics',
    relatedBehaviours: ['making-effective-decisions'],
  },

  // Specialist Professions
  {
    id: 'corporate-finance',
    name: 'Corporate Finance',
    category: 'specialist',
    description: 'Investment appraisal, financial modeling and corporate transactions',
    slug: 'corporate-finance',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'intelligence-analysis',
    name: 'Intelligence Analysis',
    category: 'specialist',
    description: 'Intelligence assessment, analysis and reporting',
    slug: 'intelligence-analysis',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'knowledge-information',
    name: 'Knowledge and Information Management',
    category: 'specialist',
    description: 'Information governance, records management and knowledge sharing',
    slug: 'knowledge-information',
    relatedBehaviours: ['managing-a-quality-service'],
  },
  {
    id: 'clinical',
    name: 'Clinical',
    category: 'specialist',
    description: 'Healthcare professionals providing clinical expertise',
    slug: 'clinical',
    relatedBehaviours: ['managing-a-quality-service'],
  },
  {
    id: 'occupational-psychology',
    name: 'Occupational Psychology',
    category: 'specialist',
    description: 'Psychological expertise in organizational and occupational contexts',
    slug: 'occupational-psychology',
    relatedBehaviours: ['developing-self-and-others'],
  },
  {
    id: 'planning',
    name: 'Planning',
    category: 'specialist',
    description: 'Urban and regional planning, development control',
    slug: 'planning',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'planning-inspection',
    name: 'Planning Inspection',
    category: 'specialist',
    description: 'Planning appeals, inquiries and inspections',
    slug: 'planning-inspection',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'science-engineering',
    name: 'Science and Engineering',
    category: 'specialist',
    description: 'Scientific and engineering expertise across disciplines',
    slug: 'science-engineering',
    relatedBehaviours: ['making-effective-decisions'],
  },
  {
    id: 'tax',
    name: 'Tax',
    category: 'specialist',
    description: 'Tax policy, compliance and administration',
    slug: 'tax',
    relatedBehaviours: ['making-effective-decisions', 'managing-a-quality-service'],
  },
  {
    id: 'veterinary',
    name: 'Veterinary',
    category: 'specialist',
    description: 'Veterinary expertise and animal health',
    slug: 'veterinary',
    relatedBehaviours: ['managing-a-quality-service'],
  },
];

// Helper functions
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