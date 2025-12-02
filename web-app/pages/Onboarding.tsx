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
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const steps: OnboardingStep[] = [
    'welcome',
    'problem',
    'solution',
    'testimonials',
    'how-it-works',
    'mood-check',
    'interests',
    'goal',
    'name',
    'commit',
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (data.interests.includes(interest)) {
      setData({ ...data, interests: data.interests.filter(i => i !== interest) });
    } else {
      setData({ ...data, interests: [...data.interests, interest] });
    }
  };

  const handleCommitHold = () => {
    setIsHolding(true);
    const interval = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(data);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const handleRelease = () => {
      setIsHolding(false);
      clearInterval(interval);
      setHoldProgress(0);
    };

    document.addEventListener('mouseup', handleRelease, { once: true });
    document.addEventListener('touchend', handleRelease, { once: true });
  };

  const renderStep = () => {
    switch (steps[step]) {
      case 'welcome':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <img src="/logo_gradz.png" alt="Gradz" className="h-24 mx-auto mb-8" />
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-6">
              Feel More Positive in 10 Days with Gradz
            </h1>
            <p className="text-xl text-[#143328]/70 mb-12 leading-relaxed">
              A proven method for more kindness, positivity, and mental wellbeing.
            </p>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Let's Go
            </button>
          </div>
        );

      case 'problem':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              The World is Loud & Hard
            </h1>
            <div className="space-y-6 mb-12">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-3"><PhoneIcon className="w-12 h-12 text-[#143328]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Endless Scrolling</h3>
                <p className="text-[#143328]/70">We spend hours on social media without real fulfillment.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-3"><NewsIcon className="w-12 h-12 text-[#143328]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Negative News</h3>
                <p className="text-[#143328]/70">Constant consumption of negative news burdens our psyche.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-3"><ChatIcon className="w-12 h-12 text-[#143328]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Online Hate</h3>
                <p className="text-[#143328]/70">Toxic comments and arguments dominate the internet.</p>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Continue
            </button>
          </div>
        );

      case 'solution':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Gradz is Different
            </h1>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#C9E4CA]/40 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4"><QuoteIcon className="w-16 h-16 text-[#143328]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Daily Quotes</h3>
                <p className="text-[#143328]/70">Inspiring quotes for every day</p>
              </div>
              <div className="bg-[#E8A87C]/40 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4"><TargetIcon className="w-16 h-16 text-[#143328]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Challenges</h3>
                <p className="text-[#143328]/70">Small tasks, big impact</p>
              </div>
              <div className="bg-[#F5F5DC]/60 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4"><BookIcon className="w-16 h-16 text-[#143328]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Lectures</h3>
                <p className="text-[#143328]/70">Knowledge about mindfulness & positivity</p>
              </div>
              <div className="bg-[#E8A87C]/30 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4"><FireIcon className="w-16 h-16 text-[#E8A87C]" /></div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Streaks</h3>
                <p className="text-[#143328]/70">Stay consistent and build habits</p>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Continue
            </button>
          </div>
        );

      case 'testimonials':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-12">
              What Others Say
            </h1>
            <div className="space-y-6 mb-12">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2 mb-4 justify-center">
                    {[...Array(t.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-[#fbbf24]" />
                    ))}
                  </div>
                  <p className="text-lg text-[#143328]/80 italic mb-4">"{t.text}"</p>
                  <p className="font-bold text-[#143328]">— {t.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Continue
            </button>
          </div>
        );

      case 'how-it-works':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-12">
              How It Works
            </h1>
            <div className="space-y-8 mb-12 text-left">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Open the App Daily</h3>
                  <p className="text-[#143328]/70">Just 10 minutes a day is enough.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Read Your Daily Quote</h3>
                  <p className="text-[#143328]/70">Let inspiring words guide you.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Accept a Challenge</h3>
                  <p className="text-[#143328]/70">Small actions with big impact.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Learn Something New</h3>
                  <p className="text-[#143328]/70">Expand your knowledge about mindfulness.</p>
                </div>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Got It!
            </button>
          </div>
        );

      case 'mood-check':
        return (
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#143328] mb-4 md:mb-8">
              How Are You Feeling Today?
            </h1>
            <p className="text-base md:text-xl text-[#143328]/70 mb-6 md:mb-12">
              Choose your current mood
            </p>
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-12">
              {moods.map((mood) => {
                const IconComponent = mood.icon === 'smile' ? SmileIcon : mood.icon === 'meh' ? MehIcon : FrownIcon;
                return (
                  <button
                    key={mood.value}
                    onClick={() => {
                      setData({ ...data, mood: mood.value });
                      setTimeout(next, 300);
                    }}
                    className={`w-full p-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-4 ${
                      data.mood === mood.value
                        ? 'bg-[#143328] text-white shadow-2xl'
                        : 'bg-white/80 text-[#143328] hover:bg-white shadow-lg'
                    }`}
                  >
                    <IconComponent className="w-10 h-10" />
                    {mood.label}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#143328] mb-4 md:mb-8">
              What Interests You?
            </h1>
            <p className="text-base md:text-xl text-[#143328]/70 mb-6 md:mb-12">
              Choose at least 3 topics
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-12">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 ${
                    data.interests.includes(interest)
                      ? 'bg-[#143328] text-white shadow-2xl'
                      : 'bg-white/80 text-[#143328] hover:bg-white shadow-lg'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              disabled={data.interests.length < 3}
              className={`py-4 px-12 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
                data.interests.length >= 3
                  ? 'bg-[#143328] text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue ({data.interests.length}/3)
            </button>
          </div>
        );

      case 'goal':
        return (
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#143328] mb-4 md:mb-8">
              What's Your Goal?
            </h1>
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-12">
              <button
                onClick={() => {
                  setData({ ...data, goal: 'learn' });
                  setTimeout(next, 300);
                }}
                className="w-full bg-white/80 hover:bg-white text-[#143328] p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="flex justify-center mb-3"><BookIcon className="w-16 h-16 text-[#143328]" /></div>
                <div className="text-2xl mb-2">Learn Kindness</div>
                <div className="text-base font-normal text-[#143328]/70">I want to learn more about kindness</div>
              </button>
              <button
                onClick={() => {
                  setData({ ...data, goal: 'give' });
                  setTimeout(next, 300);
                }}
                className="w-full bg-white/80 hover:bg-white text-[#143328] p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="flex justify-center mb-3"><HeartIcon className="w-16 h-16 text-[#E8A87C]" /></div>
                <div className="text-2xl mb-2">Give Kindness</div>
                <div className="text-base font-normal text-[#143328]/70">I want to actively spread kindness</div>
              </button>
              <button
                onClick={() => {
                  setData({ ...data, goal: 'both' });
                  setTimeout(next, 300);
                }}
                className="w-full bg-white/80 hover:bg-white text-[#143328] p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="flex justify-center mb-3"><SparklesIcon className="w-16 h-16 text-[#143328]" /></div>
                <div className="text-2xl mb-2">Both</div>
                <div className="text-base font-normal text-[#143328]/70">I want to combine both</div>
              </button>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="text-center max-w-xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#143328] mb-4 md:mb-8">
              What Should We Call You?
            </h1>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your Name"
              className="w-full p-6 rounded-2xl text-xl text-center border-2 border-[#143328]/20 focus:border-[#143328] outline-none mb-8 shadow-lg"
              autoFocus
            />
            <button
              onClick={next}
              disabled={!data.name.trim()}
              className={`py-4 px-12 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
                data.name.trim()
                  ? 'bg-[#143328] text-white hover:scale-105 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        );

      case 'commit':
        return (
          <div className="text-center max-w-xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#143328] mb-4 md:mb-8">
              Are You Ready, {data.name}?
            </h1>
            <p className="text-xl text-[#143328]/70 mb-12 leading-relaxed">
              Hold the button to commit to more kindness and positivity.
            </p>
            <div className="relative">
              <button
                onMouseDown={handleCommitHold}
                onTouchStart={handleCommitHold}
                className="w-full bg-[#143328] text-white py-8 rounded-2xl font-bold text-2xl transition-all duration-300 shadow-2xl relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-[#E8A87C] transition-all duration-100"
                  style={{ width: `${holdProgress}%` }}
                />
                <span className="relative z-10">
                  {holdProgress === 0 ? 'Hold to Confirm' : holdProgress < 100 ? 'Keep Holding...' : 'Done! ✨'}
                </span>
              </button>
              {holdProgress > 0 && holdProgress < 100 && (
                <div className="mt-4 text-sm text-[#143328]/60">
                  {Math.round(holdProgress)}%
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex flex-col p-4 md:p-6">
      <div className="mb-4 md:mb-8 flex-shrink-0">
        <div className="h-2 bg-white/50 rounded-full overflow-hidden max-w-4xl mx-auto">
          <div
            className="h-full bg-[#143328] transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 md:mt-4 text-xs md:text-sm text-[#143328]/60">
          Step {step + 1} of {steps.length}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-4xl animate-fade-in-up py-4">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};
