import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../lib/auth';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, displayName);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-matcha/20 to-peach/20 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2" style={{ borderColor: '#143328' }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2" style={{ color: '#143328' }}>
              Join Gradz
            </h1>
            <p className="text-base font-medium" style={{ color: '#143328' }}>
              Start your kindness journey today
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-2xl">
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-bold mb-2" style={{ color: '#143328' }}>
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2 focus:ring-matcha transition-all"
                style={{ borderColor: '#143328', color: '#143328' }}
                placeholder="Your name"
                aria-label="Display name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2" style={{ color: '#143328' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2 focus:ring-matcha transition-all"
                style={{ borderColor: '#143328', color: '#143328' }}
                placeholder="your@email.com"
                aria-label="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2" style={{ color: '#143328' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border-2 font-medium focus:outline-none focus:ring-2 focus:ring-matcha transition-all"
                style={{ borderColor: '#143328', color: '#143328' }}
                placeholder="••••••••"
                aria-label="Password"
              />
              <p className="text-xs mt-1 font-medium" style={{ color: '#143328' }}>
                Minimum 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
              aria-busy={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium" style={{ color: '#143328' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold hover:underline"
                style={{ color: '#E89F71' }}
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-medium hover:underline"
              style={{ color: '#143328' }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
