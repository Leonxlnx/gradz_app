import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      gsap.from('.kindness-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.4,
      });

      gsap.to('.floating-shape', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="floating-shape absolute top-20 left-10 w-24 h-24 bg-matcha rounded-full opacity-20 blur-xl" />
      <div className="floating-shape absolute bottom-32 right-20 w-32 h-32 bg-peach rounded-full opacity-20 blur-xl" />
      <div className="floating-shape absolute top-1/3 right-1/4 w-20 h-20 bg-lilac rounded-full opacity-20 blur-xl" />

      <div className="max-w-6xl w-full text-center relative z-10">
        <div className="inline-block mb-6 px-6 py-2 bg-butter/30 rounded-full rotate-tape">
          <span className="font-hand text-2xl text-forest">spread joy daily</span>
        </div>

        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-serif font-bold mb-8 leading-[0.9] text-gradient"
        >
          Gradz
        </h1>

        <p className="text-xl md:text-2xl text-forest/80 mb-12 max-w-2xl mx-auto font-light">
          A beautiful space to share kindness, celebrate others, and make the world a little brighter
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="kindness-card bg-matcha/40 p-8 rounded-organic shadow-hard rotate-tape hover:rotate-0 transition-transform duration-300 border-2 border-forest">
            <Heart className="w-12 h-12 mb-4 text-forest" />
            <h3 className="text-2xl font-serif font-bold mb-3">Give Gratitude</h3>
            <p className="text-forest/70 leading-relaxed">
              Send heartfelt messages to people who deserve recognition
            </p>
          </div>

          <div className="kindness-card bg-peach/40 p-8 rounded-organic shadow-hard-sm -rotate-1 hover:rotate-0 transition-transform duration-300 border-2 border-forest">
            <Sparkles className="w-12 h-12 mb-4 text-forest" />
            <h3 className="text-2xl font-serif font-bold mb-3">Celebrate Others</h3>
            <p className="text-forest/70 leading-relaxed">
              Highlight achievements and spread positivity in the community
            </p>
          </div>

          <div className="kindness-card bg-lilac/40 p-8 rounded-organic shadow-hard-lg rotate-tape-alt hover:rotate-0 transition-transform duration-300 border-2 border-forest">
            <div className="w-12 h-12 mb-4 text-forest flex items-center justify-center text-3xl">
              ✨
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Build Connection</h3>
            <p className="text-forest/70 leading-relaxed">
              Create meaningful moments that strengthen relationships
            </p>
          </div>
        </div>

        <button className="mt-16 px-12 py-5 bg-forest text-cream rounded-full text-xl font-medium shadow-hard hover:shadow-hard-lg hover:translate-x-1 hover:translate-y-1 transition-all duration-200 border-2 border-forest">
          Start Spreading Kindness
        </button>
      </div>
    </div>
  );
}
