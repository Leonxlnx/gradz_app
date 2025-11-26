import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-matcha/20 to-peach/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold" style={{ color: '#143328' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-matcha/20 to-peach/20">
      <nav className="bg-white border-b-2 shadow-md" style={{ borderColor: '#143328' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold" style={{ color: '#143328' }}>
            Gradz Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 mb-8" style={{ borderColor: '#143328' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: '#A7C4A0', color: '#143328' }}>
              {profile.display_name?.[0]?.toUpperCase() || profile.email[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-1" style={{ color: '#143328' }}>
                Welcome, {profile.display_name || 'Friend'}!
              </h2>
              <p className="text-base font-medium" style={{ color: '#143328' }}>
                {profile.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl border-2 shadow-lg" style={{ borderColor: '#143328', backgroundColor: '#A7C4A0' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#143328' }}>0</h3>
              <p className="text-sm font-semibold" style={{ color: '#143328' }}>Messages Sent</p>
            </div>
            <div className="p-6 rounded-2xl border-2 shadow-lg" style={{ borderColor: '#143328', backgroundColor: '#E89F71' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#143328' }}>0</h3>
              <p className="text-sm font-semibold" style={{ color: '#143328' }}>Tasks Completed</p>
            </div>
            <div className="p-6 rounded-2xl border-2 shadow-lg" style={{ borderColor: '#143328', backgroundColor: '#F4D06F' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#143328' }}>0</h3>
              <p className="text-sm font-semibold" style={{ color: '#143328' }}>Days Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2" style={{ borderColor: '#143328' }}>
          <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#143328' }}>
            Your Kindness Journey
          </h2>
          <p className="text-base font-medium mb-6" style={{ color: '#143328' }}>
            More features coming soon! Start spreading kindness today.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#A7C4A0', color: '#143328' }}>
              Send Kindness
            </button>
            <button className="px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#E89F71', color: '#143328' }}>
              Get Daily Task
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
