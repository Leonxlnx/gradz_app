import React, { useState } from 'react';
import { useAuth } from '../lib/authContext';

interface SettingsPageProps {
  onNavigate: (view: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { gradzUser, updateGradzUser, signOut } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(gradzUser?.name || '');
  const [saving, setSaving] = useState(false);

  const handleNameUpdate = async () => {
    if (!newName.trim()) return;

    setSaving(true);
    try {
      await updateGradzUser({ name: newName.trim() });
      setEditingName(false);
    } catch (error) {
      console.error('Error updating name:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleNotifications = async () => {
    if (!gradzUser) return;
    await updateGradzUser({
      push_notifications: !gradzUser.push_notifications,
    });
  };

  const handleReminderTimeChange = async (time: string) => {
    await updateGradzUser({ reminder_time: time });
  };

  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[#143328] mb-2">Settings</h1>
          <p className="text-lg text-[#143328]/70">Manage your account & preferences</p>
        </header>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-serif text-[#143328] mb-6">Profile</h2>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#143328] mb-2">Your Name</label>
              {editingName ? (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 p-4 rounded-xl border-2 border-[#143328]/20 focus:border-[#143328] outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleNameUpdate}
                    disabled={saving}
                    className="bg-[#143328] text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingName(false);
                      setNewName(gradzUser?.name || '');
                    }}
                    className="bg-gray-200 text-[#143328] px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-lg text-[#143328]">{gradzUser?.name}</span>
                  <button
                    onClick={() => setEditingName(true)}
                    className="text-[#143328] hover:text-[#143328]/70 font-bold"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#143328] mb-2">Email</label>
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-lg text-[#143328]">{gradzUser?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#143328] mb-2">Current Streak</label>
              <div className="p-4 bg-gradient-to-r from-[#E8A87C]/30 to-[#C9E4CA]/30 rounded-xl flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                <span className="text-2xl font-bold text-[#143328]">{gradzUser?.streak || 0} days</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-serif text-[#143328] mb-6">Notifications</h2>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-[#143328]">Push Notifications</h3>
                <p className="text-sm text-[#143328]/70">Get daily reminders to practice kindness</p>
              </div>
              <button
                onClick={handleToggleNotifications}
                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                  gradzUser?.push_notifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                    gradzUser?.push_notifications ? 'ml-7' : 'ml-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#143328] mb-2">Reminder Time</label>
              <input
                type="time"
                value={gradzUser?.reminder_time || '09:00:00'}
                onChange={(e) => handleReminderTimeChange(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-[#143328]/20 focus:border-[#143328] outline-none"
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-serif text-[#143328] mb-6">About</h2>

            <div className="space-y-4">
              <a
                href="https://gradz.bolt.host"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#143328]">Visit Website</span>
                  <span className="text-2xl">🌐</span>
                </div>
              </a>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#143328]">Version</span>
                  <span className="text-[#143328]/70">v0.5 (Web MVP)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-4 px-8 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 hover:scale-105"
            >
              Logout
            </button>
          </div>
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
          <button onClick={() => onNavigate('health')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">💪</span>
            <span className="text-xs font-bold">Health</span>
          </button>
          <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-[#143328]">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-bold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
