export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Content {
  id: string;
  title: string;
  type: 'educational' | 'care-instruction';
  content: string;
  lastUpdated: string;
  status: 'draft' | 'published';
}

export interface Reminder {
  id: string;
  type: string;
  times: string[];
  isActive: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  description: string;
}

export interface Milestone {
  id: string;
  day: string;
  painLevel: number;
  visionClarity: number;
  notes: string;
  timestamp: string;
}