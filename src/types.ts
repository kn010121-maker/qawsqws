export type AppView = 'home' | 'goal_spec' | 'experience' | 'analysis' | 'history' | 'community';

export interface TargetGoal {
  company: string;
  division: string;
  role: string;
}

export interface AcademicCredentials {
  university: string;
  major: string;
  gpa: number; // Out of 4.5
}

export interface LanguageScore {
  id: string;
  testType: string; // TOEIC, OPIc, TOEIC Speaking, TOEFL
  score: string; // e.g. 920 or AL
  grade?: string; // Optional grade like AL, IH, IM3
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ProjectEntry {
  id: string;
  role: string;
  organization: string;
  impact: string;
}

export interface AnalysisResult {
  id?: string;
  timestamp?: string;
  company: string;
  division: string;
  role: string;
  probability: number;
  level: 'High' | 'Moderate' | 'Low';
  summaryQuote: string;
  radar: {
    mySpecs: {
      gpa: number;
      language: number;
      experience: number;
      certificates: number;
      resumeScore: number;
    };
    avgPassers: {
      gpa: number;
      language: number;
      experience: number;
      certificates: number;
      resumeScore: number;
    };
  };
  radarInsight: string;
  coreStrengths: Array<{
    title: string;
    description: string;
  }>;
  strengthTags: string[];
  areasForOptimization: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
  studyResources?: Array<{
    title: string;
    category: string;
    url: string;
  }>;
}
