import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';
import type { GradzUser } from '../types';

interface AuthContextType {
  user: User | null;
  gradzUser: GradzUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateGradzUser: (updates: Partial<GradzUser>) => Promise<void>;
  refreshGradzUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [gradzUser, setGradzUser] = useState<GradzUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGradzUser = async (userId: string) => {
    const { data, error } = await supabase
      .from('gradz_users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!error && data) {
      setGradzUser(data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchGradzUser(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchGradzUser(session.user.id);
      } else {
        setGradzUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          name: name,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      const { error: insertError } = await supabase.from('gradz_users').insert({
        id: data.user.id,
        email,
        name,
        streak: 0,
        onboarding_completed: false,
        interests: [],
        push_notifications: true,
        reminder_time: '09:00:00',
      });

      if (insertError && insertError.code !== '23505') {
        console.error('Error creating user profile:', insertError);
        throw insertError;
      }

      await fetchGradzUser(data.user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setGradzUser(null);
  };

  const updateGradzUser = async (updates: Partial<GradzUser>) => {
    if (!user) return;

    const { error } = await supabase
      .from('gradz_users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) throw error;

    await fetchGradzUser(user.id);
  };

  const refreshGradzUser = async () => {
    if (user) {
      await fetchGradzUser(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      gradzUser,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      updateGradzUser,
      refreshGradzUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
