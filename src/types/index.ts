export type SkillCategory = 'all' | 'programming' | 'frontend' | 'backend' | 'database' | 'tools';

export interface SkillItem {
  name: string;
  category: 'programming' | 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  practicalRole: string;
  iconName: string;
  color?: string;
  highlightedIn?: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  visualType: 'hrms' | 'preppaglu' | 'streambox';
  accentColor: string;
  githubUrl: string;
  liveDemoUrl: string;
  // Deep Case Study fields
  problemStatement: string;
  objective: string;
  architectureDetails: string[];
  challenges: string[];
  learnings: string[];
  metrics?: { label: string; value: string }[];
}

export interface JourneyMilestone {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  icon: string;
  highlight?: boolean;
}

export interface ExploringTopic {
  title: string;
  area: string;
  description: string;
  currentFocus: string;
  status: 'In Depth' | 'Active Exploration' | 'Core Practice';
  tags: string[];
  icon: string;
}

export interface TerminalEntry {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}
