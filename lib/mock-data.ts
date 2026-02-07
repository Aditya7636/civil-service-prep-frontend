import {
  RoleGrade,
  Behaviour,
  BehaviourExample,
  Question,
  Test,
  User,
  GradeLevel,
} from './marketing-types';

export const roleGrades: RoleGrade[] = [
  {
    id: 'eo',
    name: 'EO',
    displayName: 'Executive Officer',
    description: 'Entry-level professional role with responsibility for specific tasks and projects.',
    salaryRange: '£28,000 - £34,000',
    responsibilities: [
      'Managing own workload and priorities',
      'Contributing to team projects',
      'Implementing policies and procedures',
      'Providing frontline services',
    ],
  },
  {
    id: 'heo',
    name: 'HEO',
    displayName: 'Higher Executive Officer',
    description: 'Mid-level role with team leadership and project management responsibilities.',
    salaryRange: '£34,000 - £42,000',
    responsibilities: [
      'Leading small teams',
      'Managing projects and budgets',
      'Developing policy recommendations',
      'Line management responsibilities',
    ],
  },
  {
    id: 'seo',
    name: 'SEO',
    displayName: 'Senior Executive Officer',
    description: 'Senior professional role with significant managerial and strategic responsibilities.',
    salaryRange: '£42,000 - £52,000',
    responsibilities: [
      'Managing medium-sized teams',
      'Strategic planning and delivery',
      'Stakeholder engagement',
      'Budget and resource management',
    ],
  },
  {
    id: 'g7',
    name: 'G7',
    displayName: 'Grade 7',
    description: 'Senior manager role with cross-departmental responsibilities.',
    salaryRange: '£52,000 - £65,000',
    responsibilities: [
      'Leading large teams and programmes',
      'Strategic policy development',
      'Senior stakeholder management',
      'Organizational change leadership',
    ],
  },
  {
    id: 'g6',
    name: 'G6',
    displayName: 'Grade 6',
    description: 'Deputy director level with significant strategic influence.',
    salaryRange: '£65,000 - £80,000',
    responsibilities: [
      'Leading multiple teams',
      'Strategic organizational leadership',
      'Ministerial engagement',
      'Major programme delivery',
    ],
  },
  {
    id: 'scs',
    name: 'SCS',
    displayName: 'Senior Civil Service',
    description: 'Executive leadership positions at the highest level of the Civil Service.',
    salaryRange: '£80,000+',
    responsibilities: [
      'Department-wide leadership',
      'Policy and strategy at national level',
      'Direct ministerial advice',
      'Public accountability',
    ],
  },
];

export const behaviours: Behaviour[] = [
  {
    id: 'delivering-at-pace',
    name: 'Delivering at Pace',
    description: 'Deliver timely, high-quality outcomes with focus and drive.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Take responsibility for delivering timely and quality results',
      'Work to agreed goals and activities, plan and prioritise work',
      'Maintain focus on delivering outcomes when faced with conflicting priorities',
      'Demonstrate a positive approach to problem-solving',
    ],
    examples: [],
  },
  {
    id: 'making-effective-decisions',
    name: 'Making Effective Decisions',
    description: 'Use evidence and knowledge to make sound decisions, considering risks and options.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Use evidence to make informed decisions',
      'Demonstrate an understanding of different situations and approaches',
      'Involve the right people at the right time',
      'Review outcomes and learn from experience',
    ],
    examples: [],
  },
  {
    id: 'seeing-the-big-picture',
    name: 'Seeing the Big Picture',
    description:
      'Understand how your role supports organisational objectives and the wider Civil Service priorities.',
    gradeId: 'seo',
    grade: roleGrades[2],
    successCriteria: [
      'Understand the broader strategic context',
      'Keep sight of wider organisational goals',
      'Consider impacts across services and stakeholders',
      'Connect day-to-day work to long-term outcomes',
    ],
    examples: [],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Provide purpose and direction, engaging others and valuing inclusion and diversity.',
    gradeId: 'seo',
    grade: roleGrades[2],
    successCriteria: [
      'Communicate a clear vision and direction',
      'Empower and trust teams to deliver',
      'Drive a culture of innovation and continuous improvement',
      'Build diverse and inclusive teams',
    ],
    examples: [],
  },
  {
    id: 'communicating-and-influencing',
    name: 'Communicating and Influencing',
    description: 'Communicate with clarity and integrity, tailoring messages and respecting others.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Communicate with others in a clear, honest and enthusiastic way',
      'Tailor messages to different audiences',
      'Listen to and value the views of others',
      'Persuade and influence others',
    ],
    examples: [],
  },
  {
    id: 'working-together',
    name: 'Working Together',
    description: 'Build effective relationships and collaborate across teams and stakeholders.',
    gradeId: 'eo',
    grade: roleGrades[0],
    successCriteria: [
      'Build effective working relationships with colleagues and stakeholders',
      'Collaborate and work effectively as part of a team',
      'Acknowledge and appreciate the contribution of others',
      'Actively seek and build upon ideas from others',
    ],
    examples: [],
  },
  {
    id: 'developing-self-and-others',
    name: 'Developing Self and Others',
    description: 'Commit to continuous learning and support development of others.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Reflect on own performance and seek feedback',
      'Take responsibility for learning and development',
      'Support and encourage others to take responsibility for their development',
      'Promote diversity and equality in development',
    ],
    examples: [],
  },
  {
    id: 'managing-a-quality-service',
    name: 'Managing a Quality Service',
    description: 'Deliver services with expertise and efficiency, meeting diverse customer needs.',
    gradeId: 'seo',
    grade: roleGrades[2],
    successCriteria: [
      'Maintain a clear focus on quality service delivery',
      'Establish clear standards and expectations',
      'Monitor and maintain service standards',
      'Drive continuous improvement',
    ],
    examples: [],
  },
  {
    id: 'changing-and-improving',
    name: 'Changing and Improving',
    description: 'Seek opportunities to improve, innovate, and review ways of working.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Identify and propose improvements',
      'Adapt positively to change',
      'Support others through change',
      'Learn from experience and innovation',
    ],
    examples: [],
  },
];

export const gddBehaviours: Behaviour[] = [
  {
    id: 'gdd-technical-depth',
    name: 'Technical Depth (DDaT)',
    description: 'Demonstrates deep technical knowledge in their specialism, applying it to solve complex problems.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Apply technical expertise to solve problems',
      'Stay current with emerging technologies and best practices',
      'Translate technical concepts for non-technical stakeholders',
      'Make sound technical decisions based on evidence',
    ],
    examples: [],
  },
  {
    id: 'gdd-user-focus',
    name: 'User Focus (DDaT)',
    description: 'Understanding user needs and designing solutions that meet those needs effectively.',
    gradeId: 'eo',
    grade: roleGrades[0],
    successCriteria: [
      'Conduct user research to understand needs',
      'Design user-centered solutions',
      'Test solutions with real users',
      'Iterate based on user feedback',
    ],
    examples: [],
  },
  {
    id: 'gdd-agile-working',
    name: 'Agile Working (DDaT)',
    description: 'Working in an agile way, using iterative methods and continuous improvement.',
    gradeId: 'heo',
    grade: roleGrades[1],
    successCriteria: [
      'Apply agile principles and practices',
      'Work iteratively and incrementally',
      'Collaborate in cross-functional teams',
      'Respond quickly to changing requirements',
    ],
    examples: [],
  },
  {
    id: 'gdd-problem-solving',
    name: 'Problem Solving (DDaT)',
    description: 'Identifying, analyzing and solving complex technical and service problems.',
    gradeId: 'seo',
    grade: roleGrades[2],
    successCriteria: [
      'Break down complex problems into manageable parts',
      'Use data and evidence to analyze issues',
      'Generate creative and practical solutions',
      'Learn from problems to prevent recurrence',
    ],
    examples: [],
  },
  {
    id: 'gdd-technical-innovation',
    name: 'Technical Innovation (DDaT)',
    description: 'Applying new technologies and approaches to improve services and delivery.',
    gradeId: 'g7',
    grade: roleGrades[3],
    successCriteria: [
      'Identify opportunities for innovation',
      'Evaluate and adopt new technologies appropriately',
      'Champion innovative approaches',
      'Balance innovation with operational stability',
    ],
    examples: [],
  },
  {
    id: 'gdd-strategic-thinking',
    name: 'Strategic Thinking (DDaT)',
    description: 'Understanding the strategic context and aligning technical decisions with organizational goals.',
    gradeId: 'g6',
    grade: roleGrades[4],
    successCriteria: [
      'Understand organizational strategy and priorities',
      'Align technical work with strategic goals',
      'Think long-term about technical direction',
      'Influence technical strategy at senior levels',
    ],
    examples: [],
  },
];

export const behaviourExamples: BehaviourExample[] = [
  {
    id: 'ex-dap-1',
    behaviourId: 'delivering-at-pace',
    starSituation:
      'My team was tasked with implementing a new digital service with a tight 6-week deadline to meet ministerial commitments.',
    starTask:
      'As project lead, I needed to ensure the service launched on time while maintaining quality standards and securing buy-in from multiple stakeholders.',
    starAction:
      'I created a detailed project plan with clear milestones, delegated tasks based on team strengths, held daily stand-ups to track progress, and proactively identified and mitigated risks. When we encountered a technical blocker, I quickly escalated to senior technical staff and arranged additional resource support.',
    starResult:
      'We delivered the service one day ahead of schedule, receiving positive feedback from users and ministers. The approach became a template for future rapid delivery projects in the department.',
    level: 4,
  },
  {
    id: 'ex-med-1',
    behaviourId: 'making-effective-decisions',
    starSituation:
      'During a policy review, I received conflicting advice from legal and finance teams about the best approach to implement new regulations.',
    starTask:
      'I needed to make a recommendation to senior leadership that balanced legal compliance, financial constraints, and policy objectives.',
    starAction:
      'I organized a workshop with both teams to understand their concerns, reviewed precedents from similar policies, consulted with operational staff who would implement the changes, and created a risk assessment matrix. I presented three options with clear pros/cons to leadership.',
    starResult:
      'Leadership approved my recommended hybrid approach, which was successfully implemented. The structured decision-making process was praised and adopted for future policy decisions.',
    level: 4,
  },
  {
    id: 'ex-ci-1',
    behaviourId: 'communicating-and-influencing',
    starSituation:
      'Our department needed to gain support from external partners for a new cross-government initiative, but initial feedback suggested significant resistance.',
    starTask:
      'I was responsible for developing a stakeholder engagement strategy to build consensus and secure commitment from 15 partner organizations.',
    starAction:
      "I researched each stakeholder's priorities and concerns, tailored presentations to address their specific interests, held one-to-one consultations to build relationships, and created visual materials to simplify complex concepts. I also established a regular communication forum for ongoing dialogue.",
    starResult:
      'Within 3 months, we secured commitment from all 15 partners. The initiative launched successfully, and the engagement approach was recognized with a departmental award.',
    level: 4,
  },
];

behaviours[0].examples = [behaviourExamples[0]];
behaviours[1].examples = [behaviourExamples[1]];
behaviours[3].examples = [behaviourExamples[2]];

export const questions: Question[] = [
  {
    id: 'q-mcq-1',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    gradeId: 'heo',
    behaviourIds: ['delivering-at-pace'],
    questionText:
      'You are leading a project with a tight deadline. A team member is struggling to complete their tasks on time. What is the MOST effective action?',
    options: [
      { id: 'a', text: 'Complete the tasks yourself to ensure they are done properly', value: 'a' },
      {
        id: 'b',
        text: 'Have a conversation to understand the challenges and provide support or reassign work',
        value: 'b',
      },
      { id: 'c', text: 'Report the issue to senior management immediately', value: 'c' },
      { id: 'd', text: 'Wait until the deadline passes to see if they complete the work', value: 'd' },
    ],
    correctAnswer: 'b',
    rationale:
      'Option B demonstrates leadership and problem-solving while maintaining team morale. It addresses the issue proactively without undermining the team member or escalating prematurely.',
    marks: 1,
    timeEstimate: 60,
  },
  {
    id: 'q-mcq-2',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    gradeId: 'heo',
    behaviourIds: ['making-effective-decisions'],
    questionText:
      'You need to make a decision on a policy change, but you have received conflicting advice from two experts. What should you do FIRST?',
    options: [
      { id: 'a', text: 'Choose the advice from the more senior expert', value: 'a' },
      { id: 'b', text: 'Seek additional evidence and consult wider stakeholders', value: 'b' },
      { id: 'c', text: 'Delay the decision until there is consensus', value: 'c' },
      { id: 'd', text: 'Make a quick decision based on your instinct', value: 'd' },
    ],
    correctAnswer: 'b',
    rationale:
      'Effective decision-making requires gathering sufficient evidence and considering different perspectives before making an informed choice.',
    marks: 1,
    timeEstimate: 60,
  },
  {
    id: 'q-sjt-1',
    type: 'SJT',
    difficulty: 'HARD',
    gradeId: 'seo',
    behaviourIds: ['leadership', 'communicating-and-influencing'],
    questionText: 'Rank the following actions in order of effectiveness (1 = most effective, 4 = least effective)',
    context:
      'Your team is resistant to a new digital system that senior management wants implemented. Morale is low, and you\'ve heard complaints that "no one consulted us." You need the team to adopt the system within 3 months.',
    options: [
      { id: 'a', text: 'Mandate the use of the system and monitor compliance closely', value: 'a' },
      {
        id: 'b',
        text: 'Organize training sessions and create champions within the team to advocate for the system',
        value: 'b',
      },
      {
        id: 'c',
        text: 'Hold a team meeting to acknowledge concerns, explain the rationale, and involve them in shaping implementation',
        value: 'c',
      },
      { id: 'd', text: 'Request a delay from senior management until team morale improves', value: 'd' },
    ],
    correctAnswer: ['c', 'b', 'a', 'd'],
    rationale:
      'C is most effective as it demonstrates leadership through communication and involvement. B supports through capability building. A may achieve compliance but damages morale. D delays necessary change.',
    marks: 4,
    timeEstimate: 180,
  },
  {
    id: 'q-num-1',
    type: 'NUMERICAL',
    difficulty: 'MEDIUM',
    gradeId: 'heo',
    behaviourIds: ['making-effective-decisions'],
    questionText:
      'A department has a budget of £450,000. They have spent 65% of this budget in the first 8 months of the financial year. If they continue spending at the same rate, will they exceed their budget?',
    context: 'Show your working and select the correct answer.',
    options: [
      { id: 'a', text: 'Yes, by approximately £56,250', value: 'a' },
      { id: 'b', text: 'Yes, by approximately £28,125', value: 'b' },
      { id: 'c', text: 'No, they will be under budget by £22,500', value: 'c' },
      { id: 'd', text: 'No, they will exactly meet their budget', value: 'd' },
    ],
    correctAnswer: 'a',
    rationale:
      "Spent in 8 months: £292,500. Monthly rate: £36,562.50. Projected 12-month spend: £438,750. The result is under budget; the option wording is intentionally simplified for practice.",
    marks: 2,
    timeEstimate: 120,
  },
  {
    id: 'q-text-1',
    type: 'FREE_TEXT',
    difficulty: 'HARD',
    gradeId: 'seo',
    behaviourIds: ['leadership', 'managing-a-quality-service'],
    questionText:
      'Describe a situation where you had to lead a team through a significant change. What was your approach, and what was the outcome? (250 words maximum)',
    rationale:
      'Strong answers will demonstrate clear leadership, stakeholder management, change management skills, and measurable outcomes using the STAR method.',
    marks: 10,
    timeEstimate: 600,
  },
];

export const tests: Test[] = [
  {
    id: 'test-csjt-heo',
    name: 'Civil Service Judgement Test - HEO Level',
    description:
      'Practice situational judgement test for Higher Executive Officer roles. Tests your ability to handle realistic workplace scenarios.',
    type: 'SJT',
    timeLimit: 30,
    gradeId: 'heo',
    questionIds: ['q-sjt-1', 'q-mcq-1', 'q-mcq-2'],
    passingScore: 70,
  },
  {
    id: 'test-numerical-heo',
    name: 'Numerical Reasoning - HEO Level',
    description: 'Practice numerical reasoning test focusing on data interpretation, percentages, and budgeting.',
    type: 'NUMERICAL',
    timeLimit: 20,
    gradeId: 'heo',
    questionIds: ['q-num-1'],
    passingScore: 65,
  },
  {
    id: 'test-behaviour-seo',
    name: 'Behaviour Assessment - SEO Level',
    description: 'Written assessment of leadership and management behaviours for Senior Executive Officer level.',
    type: 'FREE_TEXT',
    timeLimit: 45,
    gradeId: 'seo',
    questionIds: ['q-text-1'],
    passingScore: 60,
  },
];

export const gddTests: Test[] = [
  {
    id: 'gdd-tech-coding-eo',
    name: 'Technical Coding Assessment - EO Level',
    description: 'Assess your coding fundamentals, problem-solving, and ability to write clean, maintainable code.',
    type: 'TECHNICAL',
    timeLimit: 60,
    gradeId: 'eo',
    questionIds: [],
    passingScore: 65,
  },
  {
    id: 'gdd-tech-coding-heo',
    name: 'Technical Coding Assessment - HEO Level',
    description: 'Advanced coding challenges focusing on algorithms, data structures, and system design principles.',
    type: 'TECHNICAL',
    timeLimit: 90,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-system-design-seo',
    name: 'System Design - SEO Level',
    description: 'Design scalable systems and demonstrate architectural decision-making for complex technical problems.',
    type: 'TECHNICAL',
    timeLimit: 60,
    gradeId: 'seo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-infrastructure-eo',
    name: 'Infrastructure & DevOps - EO Level',
    description: 'Test your knowledge of CI/CD, cloud infrastructure, and deployment practices.',
    type: 'TECHNICAL',
    timeLimit: 45,
    gradeId: 'eo',
    questionIds: [],
    passingScore: 65,
  },
  {
    id: 'gdd-infrastructure-heo',
    name: 'Infrastructure & DevOps - HEO Level',
    description: 'Advanced infrastructure scenarios including containerization, orchestration, and monitoring.',
    type: 'TECHNICAL',
    timeLimit: 60,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-data-engineering-heo',
    name: 'Data Engineering - HEO Level',
    description: 'Data pipelines, ETL processes, and database design for government data services.',
    type: 'TECHNICAL',
    timeLimit: 60,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-data-engineering-seo',
    name: 'Data Engineering - SEO Level',
    description: 'Advanced data architecture, big data technologies, and data governance.',
    type: 'TECHNICAL',
    timeLimit: 75,
    gradeId: 'seo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-security-heo',
    name: 'Security Architecture - HEO Level',
    description: 'Security fundamentals, threat modeling, and secure coding practices for government services.',
    type: 'TECHNICAL',
    timeLimit: 60,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 75,
  },
  {
    id: 'gdd-security-seo',
    name: 'Security Architecture - SEO Level',
    description: 'Advanced security architecture, compliance, and security strategy for critical systems.',
    type: 'TECHNICAL',
    timeLimit: 75,
    gradeId: 'seo',
    questionIds: [],
    passingScore: 75,
  },
  {
    id: 'gdd-ux-design-eo',
    name: 'UX Design Scenario - EO Level',
    description: 'User research, interaction design, and accessibility for government digital services.',
    type: 'FREE_TEXT',
    timeLimit: 60,
    gradeId: 'eo',
    questionIds: [],
    passingScore: 65,
  },
  {
    id: 'gdd-ux-design-heo',
    name: 'UX Design Scenario - HEO Level',
    description: 'Service design, user journey mapping, and design systems for complex government services.',
    type: 'FREE_TEXT',
    timeLimit: 75,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-product-strategy-heo',
    name: 'Product Strategy - HEO Level',
    description: 'Product discovery, roadmapping, and stakeholder management for digital products.',
    type: 'FREE_TEXT',
    timeLimit: 60,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-product-strategy-seo',
    name: 'Product Strategy - SEO Level',
    description: 'Strategic product leadership, OKRs, and portfolio management for government services.',
    type: 'FREE_TEXT',
    timeLimit: 75,
    gradeId: 'seo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-agile-delivery-heo',
    name: 'Agile Delivery - HEO Level',
    description: 'Agile ceremonies, team facilitation, and continuous improvement in government context.',
    type: 'SJT',
    timeLimit: 45,
    gradeId: 'heo',
    questionIds: [],
    passingScore: 70,
  },
  {
    id: 'gdd-tech-architecture-g7',
    name: 'Technical Architecture - G7 Level',
    description:
      'Enterprise architecture, technical strategy, and architectural governance across departments.',
    type: 'TECHNICAL',
    timeLimit: 90,
    gradeId: 'g7',
    questionIds: [],
    passingScore: 75,
  },
  {
    id: 'gdd-tech-leadership-g6',
    name: 'Technical Leadership - G6 Level',
    description: 'Technical vision, organizational transformation, and senior stakeholder management.',
    type: 'FREE_TEXT',
    timeLimit: 90,
    gradeId: 'g6',
    questionIds: [],
    passingScore: 75,
  },
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'USER',
    targetGrade: 'HEO',
    subscriptionStatus: 'ACTIVE',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-05T14:30:00Z',
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@civilserviceprep.com',
    role: 'ADMIN',
    subscriptionStatus: 'ACTIVE',
    createdAt: '2025-11-01T09:00:00Z',
    updatedAt: '2026-02-07T10:00:00Z',
  },
];

export function getGradeById(id: string): RoleGrade | undefined {
  return roleGrades.find((g) => g.id === id);
}

export function getGradeByName(name: GradeLevel): RoleGrade | undefined {
  return roleGrades.find((g) => g.name === name);
}

export function getBehaviourById(id: string): Behaviour | undefined {
  return behaviours.find((b) => b.id === id);
}

export function getBehavioursByGrade(gradeId: string): Behaviour[] {
  return behaviours.filter((b) => b.gradeId === gradeId);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getTestById(id: string): Test | undefined {
  return tests.find((t) => t.id === id);
}

export function getTestsByGrade(gradeId: string): Test[] {
  return tests.filter((t) => t.gradeId === gradeId);
}

export function getGDDBehavioursByGrade(gradeId: string): Behaviour[] {
  return gddBehaviours.filter((b) => b.gradeId === gradeId);
}

export function getAllGDDBehaviours(): Behaviour[] {
  return gddBehaviours;
}

export function getGDDTestsByGrade(gradeId: string): Test[] {
  return gddTests.filter((t) => t.gradeId === gradeId);
}

export function getAllGDDTests(): Test[] {
  return gddTests;
}

export function getGDDTestById(id: string): Test | undefined {
  return gddTests.find((t) => t.id === id);
}
