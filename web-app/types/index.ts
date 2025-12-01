export interface GradzUser {
  id: string;
  name: string;
  email: string;
  streak: number;
  last_activity: string;
  onboarding_completed: boolean;
  mood?: string;
  interests: string[];
  goal?: string;
  push_notifications: boolean;
  reminder_time: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category?: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface Lecture {
  id: string;
  title: string;
  content: string;
  category?: string;
  read_time: number;
  created_at: string;
}

export interface UserCollection {
  id: string;
  user_id: string;
  item_type: 'quote' | 'challenge' | 'lecture';
  item_id: string;
  collected_at: string;
  notes?: string;
}

export interface DailyContent {
  id: string;
  user_id: string;
  date: string;
  quote_id?: string;
  challenge_id?: string;
  lecture_id?: string;
  challenge_accepted: boolean;
  lecture_read: boolean;
  created_at: string;
}

export interface HealthGoal {
  id: string;
  user_id: string;
  goal_text: string;
  completed: boolean;
  date: string;
  created_at: string;
}

export type OnboardingStep =
  | 'welcome'
  | 'problem'
  | 'solution'
  | 'testimonials'
  | 'how-it-works'
  | 'mood-check'
  | 'interests'
  | 'goal'
  | 'name'
  | 'commit';

export type WebAppView =
  | 'landing'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'mvp-welcome'
  | 'home'
  | 'collection'
  | 'health'
  | 'settings';
