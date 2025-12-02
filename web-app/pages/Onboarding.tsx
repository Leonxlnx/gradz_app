import React, { useState } from 'react';
import { moods, interests, testimonials } from '../data/sampleContent';
import type { OnboardingStep } from '../types';
import {
  PhoneIcon, NewsIcon, ChatIcon, QuoteIcon, TargetIcon, BookIcon, FireIcon,
  SmileIcon, MehIcon, FrownIcon, HeartIcon, SparklesIcon, StarIcon
} from '../components/Icons';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  mood: string;
  interests: string[];
  goal: string;
  name: string;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<OnboardingData>({
    mood: '',
    interests: [],
    goal: '',
    name: '',
  });

  const steps: OnboardingStep[] = [
    'welcome',
    'mood-check',
    'interests',
    'goal',
    'name',
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (data.interests.includes(interest)) {
      setData({ ...data, interests: data.interests.filter(i => i !== interest) });
    } else if (data.interests.length < 3) {
      setData({ ...data, interests: [...data.interests, interest] });
    }
  };

  const renderStep = () => {
    switch (steps[step]) {
      case 'welcome':
        return (
          <div className="text-center space-y-4">
            <div className="animate-bounce-slow">
              <img src="/logo_gradz.png" alt="Gradz" className="h-16 md:h-20 mx-auto" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#143328] animate-fade-in">
              Feel More Positive in 10 Days
            </h1>
            <p className="text-base md:text-lg text-[#143328]/70 max-w-md mx-auto animate-fade-in-delay">
              A proven method for more kindness & wellbeing.
            </p>
            <button
              onClick={next}
              className="mt-6 bg-[#143328] text-white py-3 px-10 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl animate-fade-in-delay-2"
            >
              Let's Go
            </button>
          </div>
        );

      case 'mood-check':
        return (
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl font-serif text-[#143328]">
              How Are You Feeling?
            </h1>
            <p className="text-sm md:text-base text-[#143328]/70">
              Be honest, it's just us here.
            </p>
            <div className="space-y-2 max-w-md mx-auto">
              {moods.map((mood, i) => {
                const IconComponent = mood.icon === 'smile' ? SmileIcon : mood.icon === 'meh' ? MehIcon : FrownIcon;
                return (
                  <button
                    key={mood.value}
                    onClick={() => {
                      setData({ ...data, mood: mood.value });
                      setTimeout(next, 300);
                    }}
                    className="w-full p-4 rounded-2xl font-bold transition-all duration-500 hover:scale-105 flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm hover:bg-white text-[#143328] hover:shadow-2xl border-2 border-transparent hover:border-[#143328]/20"
                    style={{
                      animation: `slideInRight 0.5s ease-out ${0.1 * i}s both`
                    }}
                  >
                    <IconComponent className="w-7 h-7" />
                    <span className="text-base md:text-lg">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl font-serif text-[#143328]">
              What Interests You?
            </h1>
            <p className="text-sm md:text-base text-[#143328]/70">
              Choose exactly 3 topics
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              {interests.slice(0, 8).map((interest, i) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-2xl font-bold text-sm transition-all duration-500 hover:scale-105 ${
                    data.interests.includes(interest)
                      ? 'bg-[#143328] text-white shadow-2xl scale-105'
                      : 'bg-white/80 text-[#143328] hover:bg-white shadow-lg'
                  }`}
                  style={{
                    animation: `popIn 0.5s ease-out ${0.05 * i}s both`
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              disabled={data.interests.length !== 3}
              className={`mt-4 py-3 px-10 rounded-2xl font-bold transition-all duration-300 shadow-xl ${
                data.interests.length === 3
                  ? 'bg-[#143328] text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
              }`}
            >
              Continue ({data.interests.length}/3)
            </button>
          </div>
        );

      case 'goal':
        return (
          <div className="text-center space-y-3">
            <h1 className="text-2xl md:text-4xl font-serif text-[#143328]">
              What's Your Goal?
            </h1>
            <div className="space-y-2 max-w-md mx-auto">
              {[
                { id: 'learn', label: 'Learn Kindness', desc: 'Learn more about kindness', icon: BookIcon },
                { id: 'give', label: 'Give Kindness', desc: 'Spread kindness actively', icon: HeartIcon },
                { id: 'both', label: 'Both', desc: 'Combine both', icon: SparklesIcon }
              ].map((goal, i) => {
                const IconComponent = goal.icon;
                return (
                  <button
                    key={goal.id}
                    onClick={() => {
                      setData({ ...data, goal: goal.id });
                      setTimeout(next, 300);
                    }}
                    className="w-full bg-white/80 hover:bg-white text-[#143328] p-4 rounded-2xl font-bold hover:scale-105 transition-all duration-500 shadow-xl border-2 border-transparent hover:border-[#143328]/20"
                    style={{
                      animation: `slideInLeft 0.5s ease-out ${0.1 * i}s both`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-10 h-10 text-[#E8A87C]" />
                      <div className="text-left">
                        <div className="text-lg font-bold">{goal.label}</div>
                        <div className="text-xs font-normal text-[#143328]/70">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl font-serif text-[#143328]">
              What Should We Call You?
            </h1>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your Name"
              className="w-full max-w-md mx-auto p-4 rounded-2xl text-center border-2 border-[#143328]/20 focus:border-[#143328] outline-none shadow-lg animate-fade-in"
              autoFocus
            />
            <button
              onClick={next}
              disabled={!data.name.trim()}
              className={`py-3 px-10 rounded-2xl font-bold transition-all duration-300 shadow-xl ${
                data.name.trim()
                  ? 'bg-[#143328] text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Complete
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex flex-col">
      <div className="flex-shrink-0 p-4">
        <div className="h-1.5 bg-white/50 rounded-full overflow-hidden max-w-md mx-auto">
          <div
            className="h-full bg-[#143328] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-xs text-[#143328]/60">
          Step {step + 1} of {steps.length}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
        <div className="w-full max-w-2xl">
          {renderStep()}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};
