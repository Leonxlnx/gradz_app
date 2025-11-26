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
    <div ref={sectionRef} className="py-32 px-6 bg-cream relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-peach/10 via-transparent to-matcha/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-peach/30 rounded-full mb-6 shadow-lg">
            <TrendingUp className="w-5 h-5" style={{ color: '#143328' }} />
            <span className="font-hand text-base font-semibold tracking-wide" style={{ color: '#143328' }}>
              Real Impact, Real People
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight" style={{ color: '#143328' }}>
            Making Waves Together
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed" style={{ color: '#143328' }}>
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
                className="impact-card-modern bg-white p-10 rounded-3xl border-2 shadow-2xl hover:shadow-3xl hover:scale-[1.05] transition-all duration-700 ease-out group relative overflow-hidden"
                style={{
                  borderColor: '#143328',
                  transform: `rotate(${(index % 2 === 0 ? -1 : 1)}deg)`,
                }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundColor: stat.color }}
                >
                  <Icon className="w-10 h-10" style={{ color: '#143328' }} />
                </div>
                <div className="text-5xl md:text-6xl font-serif font-bold mb-3" style={{ color: '#143328' }}>
                  {count.toLocaleString()}{stat.suffix || ''}
                </div>
                <div className="text-sm font-bold tracking-wider uppercase" style={{ color: '#143328' }}>
                  {stat.label}
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-matcha/30 via-peach/30 to-butter/30 p-14 rounded-3xl border-2 shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-hidden group" style={{ borderColor: '#143328', transform: 'rotate(-1deg)' }}>
            {/* Quote decoration */}
            <div className="absolute top-8 left-8 opacity-10">
              <svg width="60" height="60" viewBox="0 0 100 100">
                <text x="10" y="70" fontSize="80" fill="#143328" fontFamily="serif">"</text>
              </svg>
            </div>

            <div className="text-center relative z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif italic mb-6 font-bold leading-tight" style={{ color: '#143328' }}>
                "In a world where you can be anything, be kind."
              </h3>
              <div className="border-t-2 pt-5 inline-block" style={{ borderColor: '#143328' }}>
                <p className="text-base font-bold tracking-widest" style={{ color: '#143328' }}>
                  THE GRADZ COMMUNITY
                </p>
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700 rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
