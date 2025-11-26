import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KindnessCard {
  id: number;
  message: string;
  from: string;
  to: string;
  color: string;
  rotation: string;
}

const sampleKindness: KindnessCard[] = [
  {
    id: 1,
    message: "Thank you for always being there when I needed advice. Your wisdom changed my life!",
    from: "Sarah",
    to: "Mom",
    color: "bg-matcha/60",
    rotation: "rotate-2",
  },
  {
    id: 2,
    message: "Your mentorship helped me land my dream job. Forever grateful!",
    from: "Alex",
    to: "Professor Chen",
    color: "bg-peach/60",
    rotation: "-rotate-1",
  },
  {
    id: 3,
    message: "You inspire me every day to be a better person. Thank you for being you!",
    from: "Maya",
    to: "Best Friend",
    color: "bg-lilac/60",
    rotation: "rotate-3",
  },
  {
    id: 4,
    message: "Your kindness to strangers reminds me what humanity is all about.",
    from: "Community",
    to: "Local Hero",
    color: "bg-butter/60",
    rotation: "-rotate-2",
  },
  {
    id: 5,
    message: "Thanks for making me laugh when times were tough. You're a real one!",
    from: "Jamie",
    to: "Cousin",
    color: "bg-matcha/50",
    rotation: "rotate-1",
  },
  {
    id: 6,
    message: "Your dedication to helping others is truly inspiring. Keep shining!",
    from: "Team",
    to: "Coach",
    color: "bg-peach/50",
    rotation: "-rotate-3",
  },
];

export default function KindnessWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const [visibleCards] = useState(sampleKindness);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wall-card', {
        scrollTrigger: {
          trigger: wallRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, wallRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wallRef} className="py-24 px-6 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#143328' }}>
            Wall of Kindness
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: '#143328' }}>
            Real messages from real people spreading joy across the world
          </p>
          <div className="inline-block mt-4 px-4 py-2 bg-matcha/30 rounded-full -rotate-1">
            <span className="font-hand text-base font-semibold" style={{ color: '#143328' }}>pinned with love</span>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className={`wall-card break-inside-avoid ${card.color} ${card.rotation} p-6 rounded-2xl border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer`}
              style={{ borderColor: '#143328' }}
            >
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold border-2" style={{ borderColor: '#143328', color: '#143328' }}>
                  To: {card.to}
                </span>
              </div>
              <p className="text-base leading-relaxed mb-4 font-semibold" style={{ color: '#143328' }}>
                "{card.message}"
              </p>
              <div className="flex justify-end">
                <span className="font-hand text-lg font-bold" style={{ color: '#143328' }}>
                  — {card.from}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:bg-forest/90 transition-all duration-300 border-2" style={{ backgroundColor: '#143328', color: '#FDFCF8', borderColor: '#143328' }}>
            Add Your Message
          </button>
        </div>
      </div>
    </div>
  );
}
