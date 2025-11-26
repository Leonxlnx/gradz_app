import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ModernHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="main"
      ref={heroRef}
      className="fixed inset-0 w-full h-screen flex items-center justify-center z-0 overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <div className="relative w-full max-w-7xl px-6">
        <div ref={titleRef} className="text-center relative z-10 bg-white/90 backdrop-blur-md rounded-3xl p-12 border-2 shadow-2xl" style={{ borderColor: '#143328' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-matcha/30 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-5 h-5" style={{ color: '#143328' }} />
            <span className="text-sm font-bold" style={{ color: '#143328' }}>Join 10,000+ Kindness Makers</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6" style={{ color: '#143328' }}>
            Spread Kindness
            <br />
            <span className="font-hand" style={{ color: '#E89F71' }}>
              Every Single Day
            </span>
          </h1>

          <p className="text-lg md:text-xl font-semibold max-w-2xl mx-auto mb-8" style={{ color: '#143328' }}>
            Your daily acts of kindness matter. Track your impact, inspire others, and build a more compassionate world together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="group px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl text-base font-bold border-2 hover:bg-forest/10 transition-all duration-300"
              style={{ borderColor: '#143328', color: '#143328' }}
            >
              Sign In
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#143328' }}>12K+</div>
              <div className="text-sm font-semibold" style={{ color: '#143328' }}>Messages Sent</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#143328' }}>156</div>
              <div className="text-sm font-semibold" style={{ color: '#143328' }}>Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#143328' }}>98%</div>
              <div className="text-sm font-semibold" style={{ color: '#143328' }}>Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
