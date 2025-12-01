import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/authContext';
import { supabase } from '../../services/supabaseClient';
import type { HealthGoal } from '../types';

interface HealthPageProps {
  onNavigate: (view: string) => void;
}

export const HealthPage: React.FC<HealthPageProps> = ({ onNavigate }) => {
  const { gradzUser } = useAuth();
  const [goals, setGoals] = useState<HealthGoal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, [gradzUser]);

  const loadGoals = async () => {
    if (!gradzUser) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('health_goals')
        .select('*')
        .eq('user_id', gradzUser.id)
        .eq('date', today)
        .order('created_at', { ascending: true });

      if (data) {
        setGoals(data);
      } else {
        const defaultGoals = [
          '10 Pushups',
          '5 Min Meditation',
          'Drink 8 glasses of water',
        ];

        const { data: newGoals } = await supabase
          .from('health_goals')
          .insert(
            defaultGoals.map((goal) => ({
              user_id: gradzUser.id,
              goal_text: goal,
              completed: false,
              date: today,
            }))
          )
          .select();

        if (newGoals) {
          setGoals(newGoals);
        }
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGoal = async (goal: HealthGoal) => {
    await supabase
      .from('health_goals')
      .update({ completed: !goal.completed })
      .eq('id', goal.id);

    setGoals(goals.map((g) => (g.id === goal.id ? { ...g, completed: !g.completed } : g)));
  };

  const addGoal = async () => {
    if (!newGoal.trim() || !gradzUser) return;

    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('health_goals')
      .insert({
        user_id: gradzUser.id,
        goal_text: newGoal.trim(),
        completed: false,
        date: today,
      })
      .select()
      .single();

    if (data) {
      setGoals([...goals, data]);
      setNewGoal('');
    }
  };

  const deleteGoal = async (goalId: string) => {
    await supabase.from('health_goals').delete().eq('id', goalId);
    setGoals(goals.filter((g) => g.id !== goalId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#143328] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#143328]/70">Loading your health goals...</p>
        </div>
      </div>
    );
  }

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[#143328] mb-2">Health & Wellness</h1>
          <p className="text-lg text-[#143328]/70">Track your daily health goals</p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-[#143328]">Today's Progress</span>
            <span className="text-2xl font-bold text-[#143328]">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C9E4CA] to-[#143328] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-serif text-[#143328] mb-4">Daily Goals</h2>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg flex items-center gap-4 transition-all duration-300 ${
                  goal.completed ? 'opacity-70' : ''
                }`}
              >
                <button
                  onClick={() => toggleGoal(goal)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    goal.completed ? 'bg-green-500 text-white' : 'border-2 border-[#143328]/30'
                  }`}
                >
                  {goal.completed && <span className="text-xl">✓</span>}
                </button>
                <span
                  className={`flex-1 text-lg ${
                    goal.completed ? 'line-through text-[#143328]/50' : 'text-[#143328]'
                  }`}
                >
                  {goal.goal_text}
                </span>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl mb-8">
          <h3 className="text-xl font-bold text-[#143328] mb-4">Add New Goal</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              placeholder="e.g., 20 Squats"
              className="flex-1 p-4 rounded-xl border-2 border-[#143328]/20 focus:border-[#143328] outline-none"
            />
            <button
              onClick={addGoal}
              className="bg-[#143328] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#C9E4CA]/40 to-[#E8A87C]/40 p-8 rounded-3xl shadow-xl text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h3 className="text-2xl font-serif text-[#143328] mb-3">Coming Soon</h3>
          <ul className="text-[#143328]/80 space-y-2">
            <li>🧘 Guided Meditation</li>
            <li>🌬️ Breathing Exercises</li>
            <li>💪 Fitness Workouts</li>
          </ul>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-[#143328]/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-around">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-bold">Home</span>
          </button>
          <button onClick={() => onNavigate('collection')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">📚</span>
            <span className="text-xs font-bold">Collection</span>
          </button>
          <button onClick={() => onNavigate('health')} className="flex flex-col items-center gap-1 text-[#143328]">
            <span className="text-2xl">💪</span>
            <span className="text-xs font-bold">Health</span>
          </button>
          <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-bold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
