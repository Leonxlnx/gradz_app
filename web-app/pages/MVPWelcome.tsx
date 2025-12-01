import React from 'react';
import { RocketIcon, SparklesIcon, BookIcon, PartyIcon } from '../components/Icons';

interface MVPWelcomeProps {
  userName?: string;
  onContinue: () => void;
}

export const MVPWelcome: React.FC<MVPWelcomeProps> = ({ userName = 'there', onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl">
          <div className="w-24 h-24 bg-[#143328] rounded-full mx-auto mb-8 flex items-center justify-center">
            <RocketIcon className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-[#143328] mb-6">
            Welcome to Gradz MVP
          </h1>

          <p className="text-xl text-[#143328]/80 mb-8 leading-relaxed">
            You're experiencing an early version of Gradz. This is our <strong>Minimum Viable Product</strong> — the first step in our journey to bring more kindness and positivity into the world.
          </p>

          <div className="bg-[#C9E4CA]/30 p-6 rounded-2xl mb-8">
            <h3 className="font-bold text-lg text-[#143328] mb-3">What to expect:</h3>
            <ul className="text-left space-y-2 text-[#143328]/70">
              <li>• Core features are fully functional</li>
              <li>• Limited content library (expanding daily)</li>
              <li>• Design and UX improvements coming soon</li>
              <li>• Your feedback will shape the future of Gradz</li>
            </ul>
          </div>

          <p className="text-[#143328]/70 mb-8">
            Thank you for being an early supporter. Let's make the world a kinder place, one day at a time.
          </p>

          <button
            onClick={onContinue}
            className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <span className="flex items-center justify-center gap-2">Let's Begin! <PartyIcon className="w-6 h-6" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};
