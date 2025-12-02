import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-12 animate-fade-in-up">
          <img src="/logo_gradz.png" alt="Gradz" className="h-28 mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-serif text-[#143328] mb-6 leading-tight">
            Welcome to <span className="text-[#E8A87C]">Gradz</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#143328]/70 leading-relaxed max-w-xl mx-auto">
            Your journey to kindness, positivity, and wellbeing starts here.
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onGetStarted}
            className="bg-[#143328] text-white py-6 px-16 rounded-2xl font-bold text-xl hover:bg-[#143328]/90 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Start Your Journey
          </button>
        </div>

        <div className="mt-16 text-base text-[#143328]/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Feel the difference in just 10 days
        </div>
      </div>
    </div>
  );
};
