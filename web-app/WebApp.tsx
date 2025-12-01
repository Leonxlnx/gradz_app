import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/authContext';
import { LandingPage } from './pages/LandingPage';
import { Onboarding, type OnboardingData } from './pages/Onboarding';
import { AuthPage } from './pages/AuthPage';
import { MVPWelcome } from './pages/MVPWelcome';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { HealthPage } from './pages/HealthPage';
import { SettingsPage } from './pages/SettingsPage';
import type { WebAppView } from './types';

const WebAppContent: React.FC = () => {
  const { user, gradzUser, loading, updateGradzUser } = useAuth();
  const [view, setView] = useState<WebAppView>('landing');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    if (!loading) {
      if (user && gradzUser) {
        if (!gradzUser.onboarding_completed) {
          setView('mvp-welcome');
        } else {
          setView('home');
        }
      } else {
        setView('landing');
      }
    }
  }, [user, gradzUser, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center">
        <div className="text-center">
          <img src="/logo_gradz.png" alt="Gradz" className="h-24 mx-auto mb-8 animate-pulse" />
          <div className="w-16 h-16 border-4 border-[#143328] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-[#143328]/70">Loading Gradz...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'landing':
        return (
          <LandingPage
            onGetStarted={() => setView('onboarding')}
            onLogin={() => setView('login')}
          />
        );

      case 'onboarding':
        return (
          <Onboarding
            onComplete={(data) => {
              setOnboardingData(data);
              setView('signup');
            }}
          />
        );

      case 'signup':
        return (
          <AuthPage
            mode="signup"
            onboardingData={onboardingData || undefined}
            onSuccess={() => setView('mvp-welcome')}
            onSwitchMode={() => setView('login')}
          />
        );

      case 'login':
        return (
          <AuthPage
            mode="login"
            onSuccess={() => {
              if (gradzUser?.onboarding_completed) {
                setView('home');
              } else {
                setView('mvp-welcome');
              }
            }}
            onSwitchMode={() => setView('signup')}
          />
        );

      case 'mvp-welcome':
        return (
          <MVPWelcome
            onContinue={async () => {
              if (gradzUser) {
                await updateGradzUser({ onboarding_completed: true });
                setView('home');
              }
            }}
          />
        );

      case 'home':
        return <HomePage onNavigate={(v) => setView(v as WebAppView)} />;

      case 'collection':
        return <CollectionPage onNavigate={(v) => setView(v as WebAppView)} />;

      case 'health':
        return <HealthPage onNavigate={(v) => setView(v as WebAppView)} />;

      case 'settings':
        return <SettingsPage onNavigate={(v) => setView(v as WebAppView)} />;

      default:
        return <LandingPage onGetStarted={() => setView('onboarding')} onLogin={() => setView('login')} />;
    }
  };

  return <>{renderView()}</>;
};

export const WebApp: React.FC = () => {
  return (
    <AuthProvider>
      <WebAppContent />
    </AuthProvider>
  );
};
