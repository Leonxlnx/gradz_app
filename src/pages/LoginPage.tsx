import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../lib/auth';
import { Heart, ArrowRight } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThreeBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-cream/50 via-matcha/20 to-peach/30"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#143328' }}>
              <div className="w-7 h-7 rounded-full border-3" style={{ borderColor: '#FDFCF8' }}></div>
            </div>
            <span className="text-3xl font-serif font-bold" style={{ color: '#143328' }}>Gradz.</span>
          </Link>

          <div className="rounded-3xl shadow-2xl p-10 border border-white/40" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)' }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-pulse" style={{ backgroundColor: '#E89F71' }}>
                <Heart className="w-8 h-8" style={{ color: '#143328' }} />
              </div>
              <h1 className="text-4xl font-serif font-bold mb-2" style={{ color: '#143328' }}>
                Welcome Back
              </h1>
              <p className="text-base font-medium" style={{ color: '#143328' }}>
                Continue your kindness journey
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl border-2 border-red-500" style={{ background: 'rgba(255, 240, 240, 0.9)' }}>
                <p className="text-sm font-semibold text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full px-5 py-4 rounded-2xl border-2 font-medium focus:outline-none focus:ring-4 focus:ring-matcha/30 transition-all"
                  style={{ borderColor: '#143328', color: '#143328', background: 'rgba(255, 255, 255, 0.9)' }}
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
                  className="w-full px-5 py-4 rounded-2xl border-2 font-medium focus:outline-none focus:ring-4 focus:ring-matcha/30 transition-all"
                  style={{ borderColor: '#143328', color: '#143328', background: 'rgba(255, 255, 255, 0.9)' }}
                  placeholder="••••••••"
                  aria-label="Password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
                aria-busy={loading}
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-medium mb-4" style={{ color: '#143328' }}>
                Don't have an account?
              </p>
              <Link
                to="/signup"
                className="inline-block px-6 py-3 rounded-2xl text-sm font-bold border-2 hover:scale-105 transition-all"
                style={{ borderColor: '#143328', color: '#143328', background: 'rgba(255, 255, 255, 0.5)' }}
              >
                Create Account
              </Link>
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

          <div className="mt-6 text-center">
            <p className="text-xs font-medium" style={{ color: '#143328' }}>
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
