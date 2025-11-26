import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Globe, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ModernImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.impact-card-modern');

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => setAnimated(true),
        },
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Heart, value: 12450, label: 'Acts of Kindness', color: '#E89F71', delay: 0 },
    { icon: Users, value: 8932, label: 'Active Members', color: '#A7C4A0', delay: 200 },
    { icon: Globe, value: 156, label: 'Countries Reached', color: '#F4D06F', delay: 400 },
    { icon: TrendingUp, value: 98, label: 'Satisfaction Rate', suffix: '%', color: '#D4A5C4', delay: 600 },
  ];

  return (
    <div ref={sectionRef} className="py-24 px-6 bg-white relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-matcha/5 via-transparent to-peach/5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-peach/30 rounded-full mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#143328' }} />
            <span className="font-hand text-base font-semibold" style={{ color: '#143328' }}>
              Real Impact, Real People
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#143328' }}>
            Making Waves Together
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: '#143328' }}>
            Every message creates ripples of positivity across the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const [count, setCount] = useState(0);

            useEffect(() => {
              if (!animated) return;

              const timeout = setTimeout(() => {
                const duration = 2000;
                const steps = 60;
                const increment = stat.value / steps;
                let current = 0;

                const interval = setInterval(() => {
                  current += increment;
                  if (current >= stat.value) {
                    setCount(stat.value);
                    clearInterval(interval);
                  } else {
                    setCount(Math.floor(current));
                  }
                }, duration / steps);

                return () => clearInterval(interval);
              }, stat.delay);

              return () => clearTimeout(timeout);
            }, [animated, stat.value, stat.delay]);

            return (
              <div
                key={index}
                className="impact-card-modern bg-white p-8 rounded-2xl border-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 ease-out"
                style={{ borderColor: '#143328' }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                  style={{ backgroundColor: stat.color }}
                >
                  <Icon className="w-8 h-8" style={{ color: '#143328' }} />
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold mb-2" style={{ color: '#143328' }}>
                  {count.toLocaleString()}{stat.suffix || ''}
                </div>
                <div className="text-sm font-bold" style={{ color: '#143328' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-matcha/20 via-peach/20 to-butter/20 p-10 rounded-3xl border-2 shadow-xl" style={{ borderColor: '#143328' }}>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif italic mb-4 font-bold" style={{ color: '#143328' }}>
                "In a world where you can be anything, be kind."
              </h3>
              <p className="text-base font-bold" style={{ color: '#143328' }}>
                — The Gradz Community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
