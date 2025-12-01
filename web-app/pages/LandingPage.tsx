import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl mb-8 p-4">
            <img src="/logo_gradz.png" alt="Gradz" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-4">
            Welcome to Gradz
          </h1>
          <p className="text-xl text-[#143328]/70 leading-relaxed">
            Cultivate kindness, positivity, and wellbeing in just 10 minutes a day.
          </p>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onGetStarted}
            className="w-full bg-[#143328] text-white py-5 px-8 rounded-2xl font-bold text-lg hover:bg-[#143328]/90 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Get Started
          </button>

          <button
            onClick={onLogin}
            className="w-full bg-white text-[#143328] py-5 px-8 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg border-2 border-[#143328]/20"
          >
            I already know Gradz
          </button>
        </div>

        <div className="mt-12 text-sm text-[#143328]/50">
          Transform your life in 10 days
        </div>
      </div>
    </div>
  );
};
