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
  alignedBehaviours: string[];
  requiredTests: TestRequirement[];
  keyResponsibilities: string[];
}

export interface TestRequirement {
  type: 'technical' | 'situational' | 'aptitude' | 'written' | 'presentation';
  name: string;
  description: string;
  typical: boolean; // Is this typically required for this role?
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
    description: 'Data management, analysis, engineering, and science roles'
  },
  {
    id: 'digital',
    name: 'Digital',
    description: 'Software development, architecture, and technical leadership roles'
  },
  {
    id: 'it-operations',
    name: 'IT Operations',
    description: 'Infrastructure, operations, and service management roles'
  },
  {
    id: 'product-delivery',
    name: 'Product & Delivery',
    description: 'Product management, delivery management, and business analysis roles'
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance & Testing',
    description: 'Testing, quality assurance, and test engineering roles'
  },
  {
    id: 'user-centred-design',
    name: 'User-Centred Design',
    description: 'User research, design, content, and accessibility roles'
  }
];

export const ddatRoles: DDaTRole[] = [
  // Data Roles
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'data',
    description: 'Collects, organises and studies data to provide business insight. Uses tools to extract, analyse and present data.',
    keySkills: ['Data analysis', 'SQL', 'Data visualization', 'Excel', 'Statistical analysis'],
    typicalGrades: ['EO', 'HEO', 'SEO'],
    alignedBehaviours: ['Analytical thinking', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'SQL Test', description: 'Assess proficiency in SQL queries', typical: true },
      { type: 'written', name: 'Data Analysis Report', description: 'Write a report on a data analysis project', typical: true }
    ],
    keyResponsibilities: ['Analyze data to provide insights', 'Create visualizations', 'Collaborate with stakeholders']
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    category: 'data',
    description: 'Builds and optimises systems for data collection, storage and access. Develops data pipelines and maintains data infrastructure.',
    keySkills: ['ETL/ELT', 'Python', 'SQL', 'Cloud platforms', 'Data warehousing'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Python Test', description: 'Assess proficiency in Python programming', typical: true },
      { type: 'technical', name: 'SQL Test', description: 'Assess proficiency in SQL queries', typical: true }
    ],
    keyResponsibilities: ['Develop data pipelines', 'Maintain data infrastructure', 'Optimize data systems']
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'data',
    description: 'Applies advanced analytics and machine learning to extract insights from data. Develops predictive models and algorithms.',
    keySkills: ['Machine learning', 'Python/R', 'Statistics', 'Data modelling', 'AI/ML'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Analytical thinking', 'Problem-solving', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Python Test', description: 'Assess proficiency in Python programming', typical: true },
      { type: 'technical', name: 'Machine Learning Test', description: 'Assess proficiency in machine learning techniques', typical: true }
    ],
    keyResponsibilities: ['Develop predictive models', 'Analyze data', 'Collaborate with stakeholders']
  },
  {
    id: 'data-architect',
    name: 'Data Architect',
    category: 'data',
    description: 'Designs and manages the organisation\'s data infrastructure and architecture. Ensures data systems are efficient, secure and scalable.',
    keySkills: ['Data architecture', 'Data governance', 'System design', 'Cloud platforms', 'Data security'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: ['Analytical thinking', 'Problem-solving', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Data Architecture Test', description: 'Assess proficiency in data architecture', typical: true },
      { type: 'technical', name: 'Cloud Platforms Test', description: 'Assess proficiency in cloud platforms', typical: true }
    ],
    keyResponsibilities: ['Design data architecture', 'Manage data infrastructure', 'Ensure data security']
  },
  {
    id: 'performance-analyst',
    name: 'Performance Analyst',
    category: 'data',
    description: 'Measures and analyses organisational performance. Provides insights to support decision-making and improve outcomes.',
    keySkills: ['Performance metrics', 'KPI development', 'Data analysis', 'Reporting', 'Stakeholder management'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'technical', name: 'Data Analysis Test', description: 'Assess proficiency in data analysis', typical: true },
      { type: 'written', name: 'Performance Report', description: 'Write a report on performance analysis', typical: true }
    ],
    keyResponsibilities: ['Analyze performance metrics', 'Develop KPIs', 'Collaborate with stakeholders']
  },

  // Digital/Software Development Roles
  {
    id: 'software-developer',
    name: 'Software Developer',
    category: 'digital',
    description: 'Designs, builds, tests and maintains software applications. Works across frontend, backend or full-stack development.',
    keySkills: ['Programming', 'Web development', 'APIs', 'Testing', 'Version control'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Programming Test', description: 'Assess proficiency in programming languages', typical: true },
      { type: 'technical', name: 'API Test', description: 'Assess proficiency in APIs', typical: true }
    ],
    keyResponsibilities: ['Develop software applications', 'Test and maintain applications', 'Collaborate with team']
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    category: 'digital',
    description: 'Builds user-facing parts of applications and websites. Implements designs and ensures accessibility and performance.',
    keySkills: ['HTML/CSS/JavaScript', 'React/Vue/Angular', 'Accessibility', 'Responsive design', 'Performance optimisation'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Frontend Development Test', description: 'Assess proficiency in frontend development', typical: true },
      { type: 'technical', name: 'Accessibility Test', description: 'Assess proficiency in accessibility standards', typical: true }
    ],
    keyResponsibilities: ['Develop user-facing parts', 'Implement designs', 'Ensure accessibility']
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    category: 'digital',
    description: 'Develops server-side logic, databases and APIs. Ensures application functionality, security and performance.',
    keySkills: ['Server-side languages', 'APIs', 'Databases', 'Security', 'Microservices'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Backend Development Test', description: 'Assess proficiency in backend development', typical: true },
      { type: 'technical', name: 'Security Test', description: 'Assess proficiency in security practices', typical: true }
    ],
    keyResponsibilities: ['Develop server-side logic', 'Manage databases', 'Ensure security']
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    category: 'digital',
    description: 'Combines development and operations to improve deployment and infrastructure. Implements CI/CD and automation.',
    keySkills: ['CI/CD', 'Cloud platforms', 'Infrastructure as code', 'Automation', 'Containers/Kubernetes'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'DevOps Test', description: 'Assess proficiency in DevOps practices', typical: true },
      { type: 'technical', name: 'Cloud Platforms Test', description: 'Assess proficiency in cloud platforms', typical: true }
    ],
    keyResponsibilities: ['Implement CI/CD', 'Automate infrastructure', 'Ensure deployment efficiency']
  },
  {
    id: 'technical-architect',
    name: 'Technical Architect',
    category: 'digital',
    description: 'Designs technical solutions and system architecture. Provides technical leadership and ensures best practices.',
    keySkills: ['Solution design', 'System architecture', 'Technical leadership', 'Cloud platforms', 'Security'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: ['Analytical thinking', 'Problem-solving', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Technical Architecture Test', description: 'Assess proficiency in technical architecture', typical: true },
      { type: 'technical', name: 'Cloud Platforms Test', description: 'Assess proficiency in cloud platforms', typical: true }
    ],
    keyResponsibilities: ['Design technical solutions', 'Manage system architecture', 'Ensure best practices']
  },
  {
    id: 'lead-developer',
    name: 'Lead Developer',
    category: 'digital',
    description: 'Provides technical leadership to development teams. Mentors developers and ensures code quality and best practices.',
    keySkills: ['Technical leadership', 'Code review', 'Mentoring', 'Agile practices', 'System design'],
    typicalGrades: ['G7', 'G6'],
    alignedBehaviours: ['Analytical thinking', 'Problem-solving', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Technical Leadership Test', description: 'Assess proficiency in technical leadership', typical: true },
      { type: 'technical', name: 'Code Review Test', description: 'Assess proficiency in code review', typical: true }
    ],
    keyResponsibilities: ['Lead development teams', 'Mentor developers', 'Ensure code quality']
  },

  // IT Operations Roles
  {
    id: 'infrastructure-engineer',
    name: 'Infrastructure Engineer',
    category: 'it-operations',
    description: 'Manages and maintains IT infrastructure including servers, networks and cloud platforms.',
    keySkills: ['Cloud infrastructure', 'Networking', 'Server management', 'Monitoring', 'Security'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Infrastructure Test', description: 'Assess proficiency in IT infrastructure', typical: true },
      { type: 'technical', name: 'Cloud Platforms Test', description: 'Assess proficiency in cloud platforms', typical: true }
    ],
    keyResponsibilities: ['Manage IT infrastructure', 'Maintain servers', 'Ensure security']
  },
  {
    id: 'site-reliability-engineer',
    name: 'Site Reliability Engineer (SRE)',
    category: 'it-operations',
    description: 'Ensures systems are reliable, scalable and efficient. Implements monitoring, alerting and incident response.',
    keySkills: ['System reliability', 'Monitoring', 'Incident management', 'Automation', 'Cloud platforms'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'SRE Test', description: 'Assess proficiency in SRE practices', typical: true },
      { type: 'technical', name: 'Cloud Platforms Test', description: 'Assess proficiency in cloud platforms', typical: true }
    ],
    keyResponsibilities: ['Ensure system reliability', 'Implement monitoring', 'Manage incidents']
  },
  {
    id: 'cyber-security-specialist',
    name: 'Cyber Security Specialist',
    category: 'it-operations',
    description: 'Protects systems and data from security threats. Implements security measures and responds to incidents.',
    keySkills: ['Security architecture', 'Threat analysis', 'Risk management', 'Compliance', 'Incident response'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Cyber Security Test', description: 'Assess proficiency in cyber security practices', typical: true },
      { type: 'technical', name: 'Incident Response Test', description: 'Assess proficiency in incident response', typical: true }
    ],
    keyResponsibilities: ['Protect systems and data', 'Implement security measures', 'Respond to incidents']
  },
  {
    id: 'network-architect',
    name: 'Network Architect',
    category: 'it-operations',
    description: 'Designs and implements network infrastructure. Ensures networks are secure, efficient and meet organisational needs.',
    keySkills: ['Network design', 'Security', 'Cloud networking', 'Performance optimisation', 'Technical documentation'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: ['Analytical thinking', 'Problem-solving', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Network Architecture Test', description: 'Assess proficiency in network architecture', typical: true },
      { type: 'technical', name: 'Cloud Networking Test', description: 'Assess proficiency in cloud networking', typical: true }
    ],
    keyResponsibilities: ['Design network infrastructure', 'Ensure network security', 'Optimize performance']
  },

  // Product & Delivery Roles
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'product-delivery',
    description: 'Defines product vision and strategy. Works with stakeholders to prioritise features and ensure products meet user needs.',
    keySkills: ['Product strategy', 'Stakeholder management', 'User needs', 'Roadmapping', 'Agile practices'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Product Management Test', description: 'Assess proficiency in product management practices', typical: true },
      { type: 'written', name: 'Product Strategy Report', description: 'Write a report on product strategy', typical: true }
    ],
    keyResponsibilities: ['Define product vision', 'Prioritize features', 'Collaborate with stakeholders']
  },
  {
    id: 'delivery-manager',
    name: 'Delivery Manager',
    category: 'product-delivery',
    description: 'Ensures successful delivery of projects and products. Removes blockers and facilitates agile ceremonies.',
    keySkills: ['Agile delivery', 'Team facilitation', 'Risk management', 'Stakeholder management', 'Process improvement'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Problem-solving', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Delivery Management Test', description: 'Assess proficiency in delivery management practices', typical: true },
      { type: 'written', name: 'Delivery Report', description: 'Write a report on delivery management', typical: true }
    ],
    keyResponsibilities: ['Ensure successful delivery', 'Remove blockers', 'Facilitate agile ceremonies']
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    category: 'product-delivery',
    description: 'Analyses business needs and translates them into technical requirements. Bridges business and technical teams.',
    keySkills: ['Requirements gathering', 'Process analysis', 'Stakeholder engagement', 'Documentation', 'Agile methodologies'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Business Analysis Test', description: 'Assess proficiency in business analysis practices', typical: true },
      { type: 'written', name: 'Requirements Document', description: 'Write a document on technical requirements', typical: true }
    ],
    keyResponsibilities: ['Analyze business needs', 'Translate to technical requirements', 'Bridge business and technical teams']
  },
  {
    id: 'service-owner',
    name: 'Service Owner',
    category: 'product-delivery',
    description: 'Responsible for the quality and performance of a service. Ensures services meet user needs and organisational goals.',
    keySkills: ['Service management', 'User needs', 'Performance monitoring', 'Stakeholder management', 'Strategy'],
    typicalGrades: ['G7', 'G6', 'SCS'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Service Ownership Test', description: 'Assess proficiency in service ownership practices', typical: true },
      { type: 'written', name: 'Service Strategy Report', description: 'Write a report on service strategy', typical: true }
    ],
    keyResponsibilities: ['Ensure service quality', 'Monitor performance', 'Collaborate with stakeholders']
  },

  // Quality Assurance & Testing Roles
  {
    id: 'test-engineer',
    name: 'Test Engineer',
    category: 'quality-assurance',
    description: 'Designs and executes tests to ensure software quality. Implements automated testing and identifies defects.',
    keySkills: ['Test automation', 'Testing frameworks', 'Test planning', 'Bug tracking', 'Agile testing'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Test Automation Test', description: 'Assess proficiency in test automation', typical: true },
      { type: 'technical', name: 'Testing Frameworks Test', description: 'Assess proficiency in testing frameworks', typical: true }
    ],
    keyResponsibilities: ['Design and execute tests', 'Implement automated testing', 'Identify defects']
  },
  {
    id: 'qa-analyst',
    name: 'Quality Assurance Analyst',
    category: 'quality-assurance',
    description: 'Ensures products meet quality standards. Defines test strategies and validates product functionality.',
    keySkills: ['Quality assurance', 'Test strategy', 'Manual testing', 'Defect management', 'Quality metrics'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Quality Assurance Test', description: 'Assess proficiency in quality assurance practices', typical: true },
      { type: 'technical', name: 'Manual Testing Test', description: 'Assess proficiency in manual testing', typical: true }
    ],
    keyResponsibilities: ['Ensure quality standards', 'Define test strategies', 'Validate product functionality']
  },
  {
    id: 'performance-tester',
    name: 'Performance Tester',
    category: 'quality-assurance',
    description: 'Tests system performance, scalability and reliability. Identifies performance bottlenecks and optimisations.',
    keySkills: ['Performance testing', 'Load testing', 'Performance analysis', 'Testing tools', 'Reporting'],
    typicalGrades: ['SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Performance Testing Test', description: 'Assess proficiency in performance testing', typical: true },
      { type: 'technical', name: 'Load Testing Test', description: 'Assess proficiency in load testing', typical: true }
    ],
    keyResponsibilities: ['Test system performance', 'Identify bottlenecks', 'Optimize performance']
  },

  // User-Centred Design Roles
  {
    id: 'user-researcher',
    name: 'User Researcher',
    category: 'user-centred-design',
    description: 'Conducts research to understand user needs and behaviours. Provides insights to inform design and product decisions.',
    keySkills: ['User research', 'Interview techniques', 'Usability testing', 'Research analysis', 'Stakeholder engagement'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'User Research Test', description: 'Assess proficiency in user research practices', typical: true },
      { type: 'written', name: 'Research Report', description: 'Write a report on user research', typical: true }
    ],
    keyResponsibilities: ['Conduct user research', 'Provide insights', 'Collaborate with stakeholders']
  },
  {
    id: 'interaction-designer',
    name: 'Interaction Designer',
    category: 'user-centred-design',
    description: 'Designs how users interact with digital products. Creates user flows, wireframes and prototypes.',
    keySkills: ['Interaction design', 'Prototyping', 'User flows', 'Design tools', 'Accessibility'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Interaction Design Test', description: 'Assess proficiency in interaction design', typical: true },
      { type: 'technical', name: 'Prototyping Test', description: 'Assess proficiency in prototyping', typical: true }
    ],
    keyResponsibilities: ['Design user interactions', 'Create user flows', 'Ensure accessibility']
  },
  {
    id: 'service-designer',
    name: 'Service Designer',
    category: 'user-centred-design',
    description: 'Designs end-to-end services across digital and offline channels. Maps user journeys and service blueprints.',
    keySkills: ['Service design', 'Journey mapping', 'Stakeholder engagement', 'Design thinking', 'Workshop facilitation'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Service Design Test', description: 'Assess proficiency in service design practices', typical: true },
      { type: 'written', name: 'Service Blueprint', description: 'Create a service blueprint', typical: true }
    ],
    keyResponsibilities: ['Design end-to-end services', 'Map user journeys', 'Collaborate with stakeholders']
  },
  {
    id: 'content-designer',
    name: 'Content Designer',
    category: 'user-centred-design',
    description: 'Creates clear, user-centred content for digital services. Ensures content meets user needs and accessibility standards.',
    keySkills: ['Content design', 'Plain English', 'Accessibility', 'User needs', 'Content strategy'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Content Design Test', description: 'Assess proficiency in content design practices', typical: true },
      { type: 'written', name: 'Content Document', description: 'Create a content document', typical: true }
    ],
    keyResponsibilities: ['Create user-centred content', 'Ensure accessibility', 'Collaborate with stakeholders']
  },
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    category: 'user-centred-design',
    description: 'Creates visual designs for digital products and communications. Ensures designs meet brand and accessibility standards.',
    keySkills: ['Visual design', 'Branding', 'Design systems', 'Accessibility', 'Design tools'],
    typicalGrades: ['HEO', 'SEO', 'G7'],
    alignedBehaviours: ['Problem-solving', 'Attention to detail', 'Communication'],
    requiredTests: [
      { type: 'technical', name: 'Visual Design Test', description: 'Assess proficiency in visual design', typical: true },
      { type: 'technical', name: 'Design Systems Test', description: 'Assess proficiency in design systems', typical: true }
    ],
    keyResponsibilities: ['Create visual designs', 'Ensure brand standards', 'Ensure accessibility']
  },
  {
    id: 'accessibility-specialist',
    name: 'Accessibility Specialist',
    category: 'user-centred-design',
    description: 'Ensures digital services are accessible to all users. Provides expertise on accessibility standards and testing.',
    keySkills: ['WCAG standards', 'Accessibility testing', 'Assistive technology', 'Accessibility strategy', 'Training'],
    typicalGrades: ['SEO', 'G7', 'G6'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'technical', name: 'Accessibility Testing Test', description: 'Assess proficiency in accessibility testing', typical: true },
      { type: 'technical', name: 'WCAG Standards Test', description: 'Assess proficiency in WCAG standards', typical: true }
    ],
    keyResponsibilities: ['Ensure accessibility', 'Provide expertise', 'Collaborate with stakeholders']
  },
  {
    id: 'head-of-design',
    name: 'Head of Design',
    category: 'user-centred-design',
    description: 'Leads design teams and sets design strategy. Ensures design excellence and user-centred practices across the organisation.',
    keySkills: ['Design leadership', 'Strategy', 'Team management', 'Design standards', 'Stakeholder management'],
    typicalGrades: ['G6', 'SCS'],
    alignedBehaviours: ['Analytical thinking', 'Communication', 'Stakeholder engagement'],
    requiredTests: [
      { type: 'situational', name: 'Design Leadership Test', description: 'Assess proficiency in design leadership practices', typical: true },
      { type: 'written', name: 'Design Strategy Report', description: 'Write a report on design strategy', typical: true }
    ],
    keyResponsibilities: ['Lead design teams', 'Set design strategy', 'Ensure design excellence']
  }
];

// Helper function to get roles by category
export function getRolesByCategory(categoryId: DDaTCategoryId): DDaTRole[] {
  return ddatRoles.filter(role => role.category === categoryId);
}

// Helper function to get role by ID
export function getRoleById(roleId: string): DDaTRole | undefined {
  return ddatRoles.find(role => role.id === roleId);
}

// Helper function to get category by ID
export function getCategoryById(categoryId: DDaTCategoryId): DDaTCategory | undefined {
  return ddatCategories.find(cat => cat.id === categoryId);
}