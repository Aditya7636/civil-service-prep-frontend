import type { AssessmentMethodId, SuccessProfileBehaviourId } from './assessment-data';

// DDaT (Digital, Data and Technology) Roles
// Based on the Government Digital Service (GDS) DDaT Capability Framework
// https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework

export interface DDaTRole {
  id: string;
  name: string;
  category: DDaTCategoryId;
  description: string;
  keySkills: string[];
  typicalGrades: string[];
  alignedBehaviours: SuccessProfileBehaviourId[];
  requiredTests: TestRequirement[];
  keyResponsibilities: string[];
}

export interface TestRequirement {
  type: 'technical' | 'situational' | 'aptitude' | 'written' | 'presentation' | 'portfolio' | 'assessment';
  name: string;
  description: string;
  typical: boolean;
  methodId?: AssessmentMethodId;
  source: 'govuk' | 'inferred';
}

export type DDaTCategoryId =
  | 'data'
  | 'digital'
  | 'it-operations'
  | 'product-delivery'
  | 'quality-assurance'
  | 'user-centred-design';

export interface DDaTCategory {
  id: DDaTCategoryId;
  name: string;
  description: string;
}

export const ddatCategories: DDaTCategory[] = [
  {
    id: 'data',
    name: 'Data',
    description: 'Data management, analysis, engineering, and science roles',
  },
  {
    id: 'digital',
    name: 'Digital',
    description: 'Software development, architecture, and technical leadership roles',
  },
  {
    id: 'it-operations',
    name: 'IT Operations',
    description: 'Infrastructure, operations, and service management roles',
  },
  {
    id: 'product-delivery',
    name: 'Product & Delivery',
    description: 'Product management, delivery management, and business analysis roles',
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance & Testing',
    description: 'Testing, quality assurance, and test engineering roles',
  },
  {
    id: 'user-centred-design',
    name: 'User-Centred Design',
    description: 'User research, design, content, and accessibility roles',
  },
];

const dataBehaviours: SuccessProfileBehaviourId[] = [
  'making-effective-decisions',
  'seeing-the-big-picture',
  'changing-and-improving',
  'communicating-and-influencing',
  'working-together',
];

const digitalBehaviours: SuccessProfileBehaviourId[] = [
  'changing-and-improving',
  'delivering-at-pace',
  'making-effective-decisions',
  'working-together',
  'communicating-and-influencing',
];

const itOpsBehaviours: SuccessProfileBehaviourId[] = [
  'managing-a-quality-service',
  'delivering-at-pace',
  'making-effective-decisions',
  'working-together',
];

const productBehaviours: SuccessProfileBehaviourId[] = [
  'seeing-the-big-picture',
  'leadership',
  'communicating-and-influencing',
  'working-together',
  'delivering-at-pace',
];

const qaBehaviours: SuccessProfileBehaviourId[] = [
  'managing-a-quality-service',
  'changing-and-improving',
  'delivering-at-pace',
  'making-effective-decisions',
  'working-together',
];

const ucdBehaviours: SuccessProfileBehaviourId[] = [
  'seeing-the-big-picture',
  'communicating-and-influencing',
  'working-together',
  'developing-self-and-others',
  'changing-and-improving',
];

const makeTest = (test: TestRequirement): TestRequirement => test;

const csjt = makeTest({
  type: 'situational',
  name: 'Civil Service Judgement Test (CSJT)',
  description: 'Situational judgement assessment of workplace scenarios.',
  typical: true,
  methodId: 'csjt',
  source: 'govuk',
});

const interview = makeTest({
  type: 'assessment',
  name: 'Structured Interview',
  description: 'Behavioural and technical interview questions.',
  typical: true,
  methodId: 'interview',
  source: 'govuk',
});

const writtenAnalysis = makeTest({
  type: 'written',
  name: 'Written Analysis',
  description: 'Written task assessing reasoning and communication.',
  typical: true,
  methodId: 'written-analysis',
  source: 'govuk',
});

const presentation = makeTest({
  type: 'presentation',
  name: 'Presentation Exercise',
  description: 'Short presentation on a role-relevant topic.',
  typical: true,
  methodId: 'presentation',
  source: 'govuk',
});

const groupExercise = makeTest({
  type: 'assessment',
  name: 'Group Exercise',
  description: 'Collaborative exercise to assess teamwork and influence.',
  typical: true,
  methodId: 'group-exercise',
  source: 'govuk',
});

const technicalAssessment = makeTest({
  type: 'technical',
  name: 'Technical Skills Assessment',
  description: 'Role-specific technical assessment aligned to required skills.',
  typical: true,
  methodId: 'technical-assessment',
  source: 'inferred',
});

const codingExercise = makeTest({
  type: 'technical',
  name: 'Coding Exercise',
  description: 'Hands-on coding task (language or stack specific).',
  typical: true,
  methodId: 'coding-exercise',
  source: 'inferred',
});

const dataTask = makeTest({
  type: 'technical',
  name: 'Data Analysis Task',
  description: 'Practical data task (SQL, analysis, or modelling).',
  typical: true,
  methodId: 'data-task',
  source: 'inferred',
});

const portfolioReview = makeTest({
  type: 'portfolio',
  name: 'Portfolio Review',
  description: 'Review of previous work, case studies, or design portfolio.',
  typical: true,
  methodId: 'portfolio-review',
  source: 'inferred',
});

export const ddatRoles: DDaTRole[] = [
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'data',
    description: 'Collects, organises and studies data to provide insight and support decisions.',
    keySkills: ['Data analysis', 'SQL', 'Data visualization', 'Excel', 'Statistical analysis'],
    typicalGrades: ['EO', 'HEO', 'SEO'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [dataTask, writtenAnalysis, presentation, interview, csjt],
    keyResponsibilities: ['Analyze data to provide insights', 'Create visualizations', 'Collaborate with stakeholders'],
  },
  {
    id: 'analytics-engineer',
    name: 'Analytics Engineer',
    category: 'data',
    description: 'Builds analytics-ready data models and pipelines for reporting and insight.',
    keySkills: ['SQL', 'Data modelling', 'ETL/ELT', 'Analytics tooling', 'Data quality'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [dataTask, technicalAssessment, writtenAnalysis, interview],
    keyResponsibilities: ['Model analytics data', 'Maintain data pipelines', 'Ensure data quality'],
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    category: 'data',
    description: 'Builds and optimises systems for data collection, storage and access.',
    keySkills: ['ETL/ELT', 'Python', 'SQL', 'Cloud platforms', 'Data warehousing'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [dataTask, technicalAssessment, codingExercise, interview, csjt],
    keyResponsibilities: ['Develop data pipelines', 'Maintain data infrastructure', 'Optimize data systems'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'data',
    description: 'Applies advanced analytics and machine learning to extract insights from data.',
    keySkills: ['Machine learning', 'Python/R', 'Statistics', 'Data modelling', 'AI/ML'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [dataTask, technicalAssessment, presentation, interview],
    keyResponsibilities: ['Develop predictive models', 'Analyze data', 'Collaborate with stakeholders'],
  },
  {
    id: 'machine-learning-engineer',
    name: 'Machine Learning Engineer',
    category: 'data',
    description: 'Builds and deploys machine learning systems into production environments.',
    keySkills: ['Machine learning', 'MLOps', 'Python', 'Model deployment', 'Cloud platforms'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [technicalAssessment, codingExercise, dataTask, interview],
    keyResponsibilities: ['Deploy ML models', 'Maintain ML pipelines', 'Collaborate with product teams'],
  },
  {
    id: 'data-architect',
    name: 'Data Architect',
    category: 'data',
    description: 'Designs and manages data architecture for scalable, secure systems.',
    keySkills: ['Data architecture', 'Data governance', 'System design', 'Cloud platforms', 'Data security'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: [...dataBehaviours, 'leadership'],
    requiredTests: [technicalAssessment, presentation, interview],
    keyResponsibilities: ['Design data architecture', 'Manage data standards', 'Ensure data security'],
  },
  {
    id: 'data-governance-manager',
    name: 'Data Governance Manager',
    category: 'data',
    description: 'Sets data governance standards, policies and assurance across organisations.',
    keySkills: ['Data governance', 'Policy', 'Risk management', 'Stakeholder management', 'Compliance'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: [...dataBehaviours, 'leadership'],
    requiredTests: [writtenAnalysis, interview, presentation],
    keyResponsibilities: ['Define data policy', 'Assure data quality', 'Lead governance forums'],
  },
  {
    id: 'data-ethicist',
    name: 'Data Ethicist',
    category: 'data',
    description: 'Ensures ethical use of data and AI, balancing innovation with safeguards.',
    keySkills: ['Ethics', 'Risk assessment', 'Policy', 'Stakeholder engagement', 'Data governance'],
    typicalGrades: ['SEO', 'G7'],
    alignedBehaviours: [...dataBehaviours, 'leadership'],
    requiredTests: [writtenAnalysis, interview, presentation],
    keyResponsibilities: ['Assess ethical risks', 'Define guidance', 'Advise on data use'],
  },
  {
    id: 'digital-evaluator',
    name: 'Digital Evaluator',
    category: 'data',
    description: 'Evaluates digital services and interventions to measure impact and improve outcomes.',
    keySkills: ['Evaluation design', 'Data analysis', 'Research methods', 'Impact measurement', 'Stakeholder engagement'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [writtenAnalysis, presentation, interview],
    keyResponsibilities: ['Design evaluations', 'Measure impact', 'Share findings and recommendations'],
  },
  {
    id: 'performance-analyst',
    name: 'Performance Analyst',
    category: 'data',
    description: 'Measures and analyses organisational performance to support decision-making.',
    keySkills: ['Performance metrics', 'KPI development', 'Data analysis', 'Reporting', 'Stakeholder management'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: dataBehaviours,
    requiredTests: [dataTask, writtenAnalysis, presentation, interview],
    keyResponsibilities: ['Analyze performance metrics', 'Develop KPIs', 'Collaborate with stakeholders'],
  },
  {
    id: 'software-developer',
    name: 'Software Developer',
    category: 'digital',
    description: 'Designs, builds, tests and maintains software applications.',
    keySkills: ['Programming', 'Web development', 'APIs', 'Testing', 'Version control'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: digitalBehaviours,
    requiredTests: [codingExercise, technicalAssessment, interview, csjt],
    keyResponsibilities: ['Develop software applications', 'Test and maintain applications', 'Collaborate with team'],
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    category: 'digital',
    description: 'Builds user-facing parts of applications and websites.',
    keySkills: ['HTML/CSS/JavaScript', 'React/Vue/Angular', 'Accessibility', 'Responsive design', 'Performance optimisation'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: digitalBehaviours,
    requiredTests: [codingExercise, technicalAssessment, interview],
    keyResponsibilities: ['Develop user-facing parts', 'Implement designs', 'Ensure accessibility'],
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    category: 'digital',
    description: 'Develops server-side logic, databases and APIs.',
    keySkills: ['Server-side languages', 'APIs', 'Databases', 'Security', 'Microservices'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: digitalBehaviours,
    requiredTests: [codingExercise, technicalAssessment, interview],
    keyResponsibilities: ['Develop server-side logic', 'Manage databases', 'Ensure security'],
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    category: 'digital',
    description: 'Improves deployment and infrastructure through automation and CI/CD.',
    keySkills: ['CI/CD', 'Cloud platforms', 'Infrastructure as code', 'Automation', 'Containers/Kubernetes'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: digitalBehaviours,
    requiredTests: [technicalAssessment, codingExercise, interview],
    keyResponsibilities: ['Implement CI/CD', 'Automate infrastructure', 'Ensure deployment efficiency'],
  },
  {
    id: 'technical-architect',
    name: 'Technical Architect',
    category: 'digital',
    description: 'Designs technical solutions and system architecture.',
    keySkills: ['Solution design', 'System architecture', 'Technical leadership', 'Cloud platforms', 'Security'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: [...digitalBehaviours, 'leadership', 'seeing-the-big-picture'],
    requiredTests: [technicalAssessment, presentation, interview],
    keyResponsibilities: ['Design technical solutions', 'Manage system architecture', 'Ensure best practices'],
  },
  {
    id: 'lead-developer',
    name: 'Lead Developer',
    category: 'digital',
    description: 'Leads development teams and ensures code quality and best practices.',
    keySkills: ['Technical leadership', 'Code review', 'Mentoring', 'Agile practices', 'System design'],
    typicalGrades: ['G7', 'G6'],
    alignedBehaviours: [...digitalBehaviours, 'leadership'],
    requiredTests: [technicalAssessment, interview, presentation],
    keyResponsibilities: ['Lead development teams', 'Mentor developers', 'Ensure code quality'],
  },
  {
    id: 'infrastructure-engineer',
    name: 'Infrastructure Engineer',
    category: 'it-operations',
    description: 'Manages and maintains IT infrastructure including servers, networks and cloud platforms.',
    keySkills: ['Cloud infrastructure', 'Networking', 'Server management', 'Monitoring', 'Security'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: itOpsBehaviours,
    requiredTests: [technicalAssessment, interview, csjt],
    keyResponsibilities: ['Manage IT infrastructure', 'Maintain servers', 'Ensure security'],
  },
  {
    id: 'application-operations-engineer',
    name: 'Application Operations Engineer',
    category: 'it-operations',
    description: 'Supports and operates applications in production to ensure reliability and performance.',
    keySkills: ['Service operations', 'Monitoring', 'Incident response', 'Release management', 'Scripting'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: itOpsBehaviours,
    requiredTests: [technicalAssessment, interview, csjt],
    keyResponsibilities: ['Operate applications', 'Monitor services', 'Manage incidents and releases'],
  },
  {
    id: 'site-reliability-engineer',
    name: 'Site Reliability Engineer (SRE)',
    category: 'it-operations',
    description: 'Ensures systems are reliable, scalable and efficient.',
    keySkills: ['System reliability', 'Monitoring', 'Incident management', 'Automation', 'Cloud platforms'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: itOpsBehaviours,
    requiredTests: [technicalAssessment, interview, csjt],
    keyResponsibilities: ['Ensure system reliability', 'Implement monitoring', 'Manage incidents'],
  },
  {
    id: 'cyber-security-specialist',
    name: 'Cyber Security Specialist',
    category: 'it-operations',
    description: 'Protects systems and data from security threats.',
    keySkills: ['Security architecture', 'Threat analysis', 'Risk management', 'Compliance', 'Incident response'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: itOpsBehaviours,
    requiredTests: [technicalAssessment, interview, csjt],
    keyResponsibilities: ['Protect systems and data', 'Implement security measures', 'Respond to incidents'],
  },
  {
    id: 'network-architect',
    name: 'Network Architect',
    category: 'it-operations',
    description: 'Designs and implements secure, efficient network infrastructure.',
    keySkills: ['Network design', 'Security', 'Cloud networking', 'Performance optimisation', 'Technical documentation'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: [...itOpsBehaviours, 'leadership', 'seeing-the-big-picture'],
    requiredTests: [technicalAssessment, presentation, interview],
    keyResponsibilities: ['Design network infrastructure', 'Ensure network security', 'Optimize performance'],
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'product-delivery',
    description: 'Defines product vision and strategy and prioritises delivery.',
    keySkills: ['Product strategy', 'Stakeholder management', 'User needs', 'Roadmapping', 'Agile practices'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: productBehaviours,
    requiredTests: [writtenAnalysis, presentation, groupExercise, interview, csjt],
    keyResponsibilities: ['Define product vision', 'Prioritize features', 'Collaborate with stakeholders'],
  },
  {
    id: 'delivery-manager',
    name: 'Delivery Manager',
    category: 'product-delivery',
    description: 'Ensures successful delivery of projects and products.',
    keySkills: ['Agile delivery', 'Team facilitation', 'Risk management', 'Stakeholder management', 'Process improvement'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: productBehaviours,
    requiredTests: [csjt, groupExercise, interview, writtenAnalysis],
    keyResponsibilities: ['Ensure successful delivery', 'Remove blockers', 'Facilitate agile ceremonies'],
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    category: 'product-delivery',
    description: 'Analyses business needs and translates them into technical requirements.',
    keySkills: ['Requirements gathering', 'Process analysis', 'Stakeholder engagement', 'Documentation', 'Agile methodologies'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: productBehaviours,
    requiredTests: [writtenAnalysis, interview, csjt],
    keyResponsibilities: ['Analyze business needs', 'Translate to technical requirements', 'Bridge teams'],
  },
  {
    id: 'service-owner',
    name: 'Service Owner',
    category: 'product-delivery',
    description: 'Responsible for the quality and performance of a service.',
    keySkills: ['Service management', 'User needs', 'Performance monitoring', 'Stakeholder management', 'Strategy'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: [...productBehaviours, 'leadership'],
    requiredTests: [presentation, interview, writtenAnalysis],
    keyResponsibilities: ['Ensure service quality', 'Monitor performance', 'Collaborate with stakeholders'],
  },
  {
    id: 'test-engineer',
    name: 'Test Engineer',
    category: 'quality-assurance',
    description: 'Designs and executes tests to ensure software quality.',
    keySkills: ['Test automation', 'Testing frameworks', 'Test planning', 'Bug tracking', 'Agile testing'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: qaBehaviours,
    requiredTests: [technicalAssessment, interview, csjt],
    keyResponsibilities: ['Design and execute tests', 'Implement automated testing', 'Identify defects'],
  },
  {
    id: 'qa-analyst',
    name: 'Quality Assurance Analyst',
    category: 'quality-assurance',
    description: 'Ensures products meet quality standards and test strategy.',
    keySkills: ['Quality assurance', 'Test strategy', 'Manual testing', 'Defect management', 'Quality metrics'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: qaBehaviours,
    requiredTests: [technicalAssessment, interview, csjt],
    keyResponsibilities: ['Ensure quality standards', 'Define test strategies', 'Validate product functionality'],
  },
  {
    id: 'performance-tester',
    name: 'Performance Tester',
    category: 'quality-assurance',
    description: 'Tests system performance, scalability and reliability.',
    keySkills: ['Performance testing', 'Load testing', 'Performance analysis', 'Testing tools', 'Reporting'],
    typicalGrades: ['SEO', 'G7'],
    alignedBehaviours: qaBehaviours,
    requiredTests: [technicalAssessment, interview],
    keyResponsibilities: ['Test system performance', 'Identify bottlenecks', 'Optimize performance'],
  },
  {
    id: 'test-manager',
    name: 'Test Manager',
    category: 'quality-assurance',
    description: 'Leads test strategy, resourcing and quality delivery.',
    keySkills: ['Test strategy', 'Leadership', 'Risk management', 'Stakeholder management', 'Quality governance'],
    typicalGrades: ['G7', 'G6'],
    alignedBehaviours: [...qaBehaviours, 'leadership'],
    requiredTests: [writtenAnalysis, interview, presentation],
    keyResponsibilities: ['Lead test strategy', 'Manage QA delivery', 'Report quality risks'],
  },
  {
    id: 'user-researcher',
    name: 'User Researcher',
    category: 'user-centred-design',
    description: 'Conducts research to understand user needs and behaviours.',
    keySkills: ['User research', 'Interview techniques', 'Usability testing', 'Research analysis', 'Stakeholder engagement'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ucdBehaviours,
    requiredTests: [portfolioReview, writtenAnalysis, presentation, interview],
    keyResponsibilities: ['Conduct user research', 'Provide insights', 'Collaborate with stakeholders'],
  },
  {
    id: 'interaction-designer',
    name: 'Interaction Designer',
    category: 'user-centred-design',
    description: 'Designs how users interact with digital products.',
    keySkills: ['Interaction design', 'Prototyping', 'User flows', 'Design tools', 'Accessibility'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ucdBehaviours,
    requiredTests: [portfolioReview, presentation, interview],
    keyResponsibilities: ['Design user interactions', 'Create user flows', 'Ensure accessibility'],
  },
  {
    id: 'service-designer',
    name: 'Service Designer',
    category: 'user-centred-design',
    description: 'Designs end-to-end services across channels.',
    keySkills: ['Service design', 'Journey mapping', 'Stakeholder engagement', 'Design thinking', 'Workshop facilitation'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ucdBehaviours,
    requiredTests: [portfolioReview, presentation, interview],
    keyResponsibilities: ['Design end-to-end services', 'Map user journeys', 'Collaborate with stakeholders'],
  },
  {
    id: 'content-designer',
    name: 'Content Designer',
    category: 'user-centred-design',
    description: 'Creates clear, user-centred content for digital services.',
    keySkills: ['Content design', 'Plain English', 'Accessibility', 'User needs', 'Content strategy'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ucdBehaviours,
    requiredTests: [portfolioReview, writtenAnalysis, interview],
    keyResponsibilities: ['Create user-centred content', 'Ensure accessibility', 'Collaborate with stakeholders'],
  },
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    category: 'user-centred-design',
    description: 'Creates visual designs for digital products and communications.',
    keySkills: ['Visual design', 'Branding', 'Design systems', 'Accessibility', 'Design tools'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ucdBehaviours,
    requiredTests: [portfolioReview, presentation, interview],
    keyResponsibilities: ['Create visual designs', 'Ensure brand standards', 'Ensure accessibility'],
  },
  {
    id: 'accessibility-specialist',
    name: 'Accessibility Specialist',
    category: 'user-centred-design',
    description: 'Ensures digital services are accessible to all users.',
    keySkills: ['WCAG standards', 'Accessibility testing', 'Assistive technology', 'Accessibility strategy', 'Training'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ucdBehaviours,
    requiredTests: [portfolioReview, writtenAnalysis, interview],
    keyResponsibilities: ['Ensure accessibility', 'Provide expertise', 'Collaborate with stakeholders'],
  },
  {
    id: 'head-of-design',
    name: 'Head of Design',
    category: 'user-centred-design',
    description: 'Leads design teams and sets design strategy.',
    keySkills: ['Design leadership', 'Strategy', 'Team management', 'Design standards', 'Stakeholder management'],
    typicalGrades: ['G6', 'SCS'],
    alignedBehaviours: [...ucdBehaviours, 'leadership'],
    requiredTests: [presentation, interview, writtenAnalysis],
    keyResponsibilities: ['Lead design teams', 'Set design strategy', 'Ensure design excellence'],
  },
];

export function getRolesByCategory(categoryId: DDaTCategoryId): DDaTRole[] {
  return ddatRoles.filter((role) => role.category === categoryId);
}

export function getRoleById(roleId: string): DDaTRole | undefined {
  return ddatRoles.find((role) => role.id === roleId);
}

export function getCategoryById(categoryId: DDaTCategoryId): DDaTCategory | undefined {
  return ddatCategories.find((cat) => cat.id === categoryId);
}
