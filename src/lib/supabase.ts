import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface KindnessMessage {
  id: string;
  user_id: string | null;
  to_name: string;
  message: string;
  from_name: string;
  is_public: boolean;
  created_at: string;
}

export interface DailyTask {
  id: string;
  user_id: string | null;
  task_text: string;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}
