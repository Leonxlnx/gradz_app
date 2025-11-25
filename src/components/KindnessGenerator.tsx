import { useState } from 'react';
import { Tape, Button } from './UI';
import { Sparkle } from './Icons';

const mockKindnessTasks = [
  "Send a heartfelt message to someone who helped you this year",
  "Leave a generous tip with a kind note for your server today",
  "Call a family member you haven't spoken to in a while",
  "Share a genuine compliment with a coworker or classmate",
  "Buy coffee for the person behind you in line",
  "Write a thank-you note to a teacher who made a difference",
  "Donate to a cause you believe in, any amount counts",
  "Help a neighbor carry their groceries",
  "Leave a positive review for a small business you love",
  "Share something that made you smile today with a friend",
  "Volunteer an hour of your time this week",
  "Pick up litter in your neighborhood while taking a walk",
];

export default function KindnessGenerator() {
  const [currentTask, setCurrentTask] = useState(
    "Click the button to get your daily kindness task!"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTask = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const randomTask = mockKindnessTasks[Math.floor(Math.random() * mockKindnessTasks.length)];
      setCurrentTask(randomTask);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="py-20 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <Tape length="medium" rotation={-1}>
            daily task
          </Tape>
        </div>

        <div className="relative">
          <div
            className="bg-butter/70 border-2 border-forest/20 rounded-2xl p-6 md:p-8 shadow-lg rotate-1 hover:rotate-0 transition-all duration-500 ease-out bg-noise"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 30px,
                rgba(20, 51, 40, 0.02) 30px,
                rgba(20, 51, 40, 0.02) 31px
              )`,
            }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkle className="w-6 h-6 text-forest" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-forest">
                  Kindness Generator
                </h2>
                <Sparkle className="w-6 h-6 text-forest" />
              </div>
              <p className="font-hand text-lg text-forest/70">
                Your daily dose of good deeds
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-forest/15 rounded-xl p-6 mb-6 min-h-[140px] flex items-center justify-center">
              <p className="text-lg md:text-xl font-serif text-forest leading-relaxed text-center">
                {isGenerating ? (
                  <span className="font-hand animate-pulse">Brewing something special...</span>
                ) : (
                  `"${currentTask}"`
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                variant="primary"
                onClick={generateTask}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Task'}
              </Button>
              <Button variant="outline">
                I Did It
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="font-hand text-base text-forest/60">
                Small acts create big ripples
              </p>
            </div>
          </div>

          <div className="absolute -bottom-4 right-6 z-20">
            <Tape length="short" rotation={10}>
              #001
            </Tape>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <div className="w-2 h-2 bg-forest rounded-full opacity-20" />
          <div className="w-2 h-2 bg-peach rounded-full opacity-20" />
          <div className="w-2 h-2 bg-matcha rounded-full opacity-20" />
        </div>
      </div>
    </div>
  );
}
