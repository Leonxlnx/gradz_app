import React, { useState } from 'react';
import { moods, interests, testimonials } from '../data/sampleContent';
import type { OnboardingStep } from '../types';

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
            <div className="w-24 h-24 bg-white rounded-full shadow-xl mx-auto mb-8 p-4">
              <img src="/logo_gradz.png" alt="Gradz" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-6">
              Mit Gradz fühlst du dich in 10 Tagen positiver
            </h1>
            <p className="text-xl text-[#143328]/70 mb-12 leading-relaxed">
              Eine bewährte Methode für mehr Freundlichkeit, Positivität und mentales Wohlbefinden.
            </p>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Los geht's
            </button>
          </div>
        );

      case 'problem':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Die Welt ist laut & hart
            </h1>
            <div className="space-y-6 mb-12">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Endless Scrolling</h3>
                <p className="text-[#143328]/70">Wir verbringen Stunden in sozialen Medien ohne echte Erfüllung.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-3">📰</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Negative News</h3>
                <p className="text-[#143328]/70">Ständiger Konsum negativer Nachrichten belastet unsere Psyche.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Online Hate</h3>
                <p className="text-[#143328]/70">Toxische Kommentare und Streit prägen das Internet.</p>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Weiter
            </button>
          </div>
        );

      case 'solution':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Gradz ist anders
            </h1>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#C9E4CA]/40 p-8 rounded-2xl shadow-lg">
                <div className="text-5xl mb-4">💭</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Daily Quotes</h3>
                <p className="text-[#143328]/70">Inspirierende Zitate für jeden Tag</p>
              </div>
              <div className="bg-[#E8A87C]/40 p-8 rounded-2xl shadow-lg">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Challenges</h3>
                <p className="text-[#143328]/70">Kleine Aufgaben, große Wirkung</p>
              </div>
              <div className="bg-[#F5F5DC]/60 p-8 rounded-2xl shadow-lg">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Lectures</h3>
                <p className="text-[#143328]/70">Wissen über Achtsamkeit & Positivität</p>
              </div>
              <div className="bg-[#E8A87C]/30 p-8 rounded-2xl shadow-lg">
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="font-bold text-xl mb-2 text-[#143328]">Streaks</h3>
                <p className="text-[#143328]/70">Bleib dran und bau Gewohnheiten auf</p>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Weiter
            </button>
          </div>
        );

      case 'testimonials':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-12">
              Was andere sagen
            </h1>
            <div className="space-y-6 mb-12">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2 mb-4 justify-center">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-2xl">⭐</span>
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
              Weiter
            </button>
          </div>
        );

      case 'how-it-works':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-12">
              So funktioniert's
            </h1>
            <div className="space-y-8 mb-12 text-left">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Öffne die App täglich</h3>
                  <p className="text-[#143328]/70">Nur 10 Minuten am Tag reichen aus.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Lese dein Daily Quote</h3>
                  <p className="text-[#143328]/70">Lass dich von inspirierenden Worten leiten.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Nimm eine Challenge an</h3>
                  <p className="text-[#143328]/70">Kleine Taten mit großer Wirkung.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#143328] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-[#143328]">Lerne etwas Neues</h3>
                  <p className="text-[#143328]/70">Erweitere dein Wissen über Achtsamkeit.</p>
                </div>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-[#143328] text-white py-4 px-12 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Verstanden!
            </button>
          </div>
        );

      case 'mood-check':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Wie fühlst du dich heute?
            </h1>
            <p className="text-xl text-[#143328]/70 mb-12">
              Wähle deine aktuelle Stimmung
            </p>
            <div className="space-y-4 mb-12">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => {
                    setData({ ...data, mood: mood.value });
                    setTimeout(next, 300);
                  }}
                  className={`w-full p-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 ${
                    data.mood === mood.value
                      ? 'bg-[#143328] text-white shadow-2xl'
                      : 'bg-white/80 text-[#143328] hover:bg-white shadow-lg'
                  }`}
                >
                  <span className="text-4xl mr-4">{mood.emoji}</span>
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Was interessiert dich?
            </h1>
            <p className="text-xl text-[#143328]/70 mb-12">
              Wähle mindestens 3 Themen
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
              Weiter ({data.interests.length}/3)
            </button>
          </div>
        );

      case 'goal':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Was ist dein Ziel?
            </h1>
            <div className="space-y-4 mb-12">
              <button
                onClick={() => {
                  setData({ ...data, goal: 'learn' });
                  setTimeout(next, 300);
                }}
                className="w-full bg-white/80 hover:bg-white text-[#143328] p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="text-5xl mb-3">📚</div>
                <div className="text-2xl mb-2">Learn Kindness</div>
                <div className="text-base font-normal text-[#143328]/70">Ich möchte mehr über Freundlichkeit lernen</div>
              </button>
              <button
                onClick={() => {
                  setData({ ...data, goal: 'give' });
                  setTimeout(next, 300);
                }}
                className="w-full bg-white/80 hover:bg-white text-[#143328] p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="text-5xl mb-3">❤️</div>
                <div className="text-2xl mb-2">Give Kindness</div>
                <div className="text-base font-normal text-[#143328]/70">Ich möchte aktiv Freundlichkeit weitergeben</div>
              </button>
              <button
                onClick={() => {
                  setData({ ...data, goal: 'both' });
                  setTimeout(next, 300);
                }}
                className="w-full bg-white/80 hover:bg-white text-[#143328] p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="text-5xl mb-3">✨</div>
                <div className="text-2xl mb-2">Both</div>
                <div className="text-base font-normal text-[#143328]/70">Ich möchte beides kombinieren</div>
              </button>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Wie sollen wir dich nennen?
            </h1>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Dein Name"
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
              Weiter
            </button>
          </div>
        );

      case 'commit':
        return (
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-[#143328] mb-8">
              Bist du bereit, {data.name}?
            </h1>
            <p className="text-xl text-[#143328]/70 mb-12 leading-relaxed">
              Halte den Button gedrückt, um dein Versprechen für mehr Freundlichkeit und Positivität abzugeben.
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
                  {holdProgress === 0 ? 'Halten zum Bestätigen' : holdProgress < 100 ? 'Weiter halten...' : 'Fertig! ✨'}
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
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#143328] transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="text-center mt-4 text-sm text-[#143328]/60">
            Schritt {step + 1} von {steps.length}
          </div>
        </div>
        <div className="animate-fade-in-up">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};
