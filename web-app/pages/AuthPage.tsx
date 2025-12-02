import React, { useState } from 'react';
import { useAuth } from '../lib/authContext';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onSuccess: () => void;
  onSwitchMode: () => void;
  onboardingData?: {
    mood: string;
    interests: string[];
    goal: string;
    name: string;
  };
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, onSuccess, onSwitchMode, onboardingData }) => {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const name = email.split('@')[0];
        await signUp(email, password, name);
        onSuccess();
      } else {
        await signIn(email, password);
        onSuccess();
      }
    } catch (err: any) {
      let errorMessage = 'An error occurred';

      if (err.message.includes('Invalid login credentials')) {
        errorMessage = 'Incorrect email or password';
      } else if (err.message.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email address';
      } else if (err.message.includes('User already registered')) {
        errorMessage = 'This email is already registered';
      } else if (err.message.includes('Password should be')) {
        errorMessage = 'Password must be at least 6 characters';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo_gradz.png" alt="Gradz" className="h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif text-[#143328] mb-3">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-lg text-[#143328]/70">
            {mode === 'login' ? 'Sign in to continue your journey' : 'Join the Gradz community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-[#143328] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-4 rounded-xl border-2 border-[#143328]/20 focus:border-[#143328] outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#143328] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border-2 border-[#143328]/20 focus:border-[#143328] outline-none transition-colors"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#143328] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#143328]/90 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onSwitchMode}
              className="text-[#143328]/70 hover:text-[#143328] transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
