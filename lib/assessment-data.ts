export type SuccessProfileBehaviourId =
  | 'seeing-the-big-picture'
  | 'changing-and-improving'
  | 'making-effective-decisions'
  | 'leadership'
  | 'communicating-and-influencing'
  | 'working-together'
  | 'developing-self-and-others'
  | 'managing-a-quality-service'
  | 'delivering-at-pace';

export type SuccessProfileBehaviour = {
  id: SuccessProfileBehaviourId;
  name: string;
  description: string;
};

export const successProfileBehaviours: SuccessProfileBehaviour[] = [
  {
    id: 'seeing-the-big-picture',
    name: 'Seeing the Big Picture',
    description:
      'Understand how your role supports organisational objectives and the wider Civil Service priorities.',
  },
  {
    id: 'changing-and-improving',
    name: 'Changing and Improving',
    description: 'Seek opportunities to improve, innovate, and review ways of working.',
  },
  {
    id: 'making-effective-decisions',
    name: 'Making Effective Decisions',
    description: 'Use evidence and knowledge to make sound decisions, considering risks and options.',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Provide purpose and direction, engaging others and valuing inclusion and diversity.',
  },
  {
    id: 'communicating-and-influencing',
    name: 'Communicating and Influencing',
    description: 'Communicate with clarity and integrity, tailoring messages and respecting others.',
  },
  {
    id: 'working-together',
    name: 'Working Together',
    description: 'Build effective relationships and collaborate across teams and stakeholders.',
  },
  {
    id: 'developing-self-and-others',
    name: 'Developing Self and Others',
    description: 'Commit to continuous learning and support development of others.',
  },
  {
    id: 'managing-a-quality-service',
    name: 'Managing a Quality Service',
    description: 'Deliver services with expertise and efficiency, meeting diverse customer needs.',
  },
  {
    id: 'delivering-at-pace',
    name: 'Delivering at Pace',
    description: 'Deliver timely, high-quality outcomes with focus and drive.',
  },
];

export type AssessmentMethodId =
  | 'application-form'
  | 'csjt'
  | 'personality-test'
  | 'interview'
  | 'assessment-centre'
  | 'presentation'
  | 'in-tray'
  | 'written-analysis'
  | 'group-exercise'
  | 'role-play'
  | 'oral-briefing'
  | 'technical-assessment'
  | 'coding-exercise'
  | 'data-task'
  | 'portfolio-review';

export type AssessmentMethod = {
  id: AssessmentMethodId;
  name: string;
  description: string;
  source: 'govuk' | 'inferred';
};

export const assessmentMethods: AssessmentMethod[] = [
  {
    id: 'application-form',
    name: 'Application Form (Written Examples)',
    description: 'Written examples demonstrating behaviours or experience.',
    source: 'govuk',
  },
  {
    id: 'csjt',
    name: 'Civil Service Judgement Test (CSJT)',
    description: 'Situational judgement test assessing behavioural responses.',
    source: 'govuk',
  },
  {
    id: 'personality-test',
    name: 'Personality Test',
    description: 'Personality-based assessment used in some recruitment processes.',
    source: 'govuk',
  },
  {
    id: 'interview',
    name: 'Interview',
    description: 'Structured interview assessing behaviours and experience.',
    source: 'govuk',
  },
  {
    id: 'assessment-centre',
    name: 'Assessment Centre',
    description: 'Multi-exercise assessment including simulations and interviews.',
    source: 'govuk',
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'Job-related presentation exercise.',
    source: 'govuk',
  },
  {
    id: 'in-tray',
    name: 'In-tray Exercise',
    description: 'Simulated inbox exercise to prioritise and respond.',
    source: 'govuk',
  },
  {
    id: 'written-analysis',
    name: 'Written Analysis/Exercise',
    description: 'Written task to assess analysis and communication.',
    source: 'govuk',
  },
  {
    id: 'group-exercise',
    name: 'Group Exercise/Discussion',
    description: 'Collaborative exercise to assess teamwork and influence.',
    source: 'govuk',
  },
  {
    id: 'role-play',
    name: 'Role-play',
    description: 'Simulated interaction to assess behaviour in context.',
    source: 'govuk',
  },
  {
    id: 'oral-briefing',
    name: 'Oral Briefing',
    description: 'Briefing exercise to assess clarity and decision-making.',
    source: 'govuk',
  },
  {
    id: 'technical-assessment',
    name: 'Technical Skills Assessment',
    description: 'Role-specific technical assessment aligned to required skills.',
    source: 'inferred',
  },
  {
    id: 'coding-exercise',
    name: 'Coding Exercise',
    description: 'Hands-on coding task for software and engineering roles.',
    source: 'inferred',
  },
  {
    id: 'data-task',
    name: 'Data Analysis Task',
    description: 'Practical data task (analysis, SQL, or modelling).',
    source: 'inferred',
  },
  {
    id: 'portfolio-review',
    name: 'Portfolio Review',
    description: 'Review of previous work, case studies, or design portfolio.',
    source: 'inferred',
  },
];
