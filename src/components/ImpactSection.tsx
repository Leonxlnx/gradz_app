import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray('.stat-number');

      stats.forEach((stat: any) => {
        const endValue = parseInt(stat.getAttribute('data-value'));
        const obj = { value: 0 };

        gsap.to(obj, {
          value: endValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            stat.textContent = Math.ceil(obj.value).toLocaleString();
          },
        });
      });

      gsap.from('.impact-card', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 70%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-24 px-6 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-5 py-2 bg-peach/40 rounded-full rotate-1">
            <span className="font-hand text-base font-semibold" style={{ color: '#143328' }}>making waves</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#143328' }}>
            Our Impact
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: '#143328' }}>
            Every message creates ripples of positivity
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="impact-card bg-white p-8 rounded-2xl border-2 shadow-lg rotate-1 hover:rotate-0 transition-all duration-500 ease-out" style={{ borderColor: '#143328' }}>
            <div className="text-center">
              <div
                className="stat-number text-5xl md:text-6xl font-serif font-bold mb-3"
                data-value="12450"
                style={{ color: '#143328' }}
              >
                0
              </div>
              <div className="text-base font-bold" style={{ color: '#143328' }}>
                Messages Sent
              </div>
              <div className="mt-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-matcha/40 border-2" style={{ borderColor: '#143328' }}></div>
              </div>
            </div>
          </div>

          <div className="impact-card bg-white p-8 rounded-2xl border-2 shadow-lg -rotate-1 hover:rotate-0 transition-all duration-500 ease-out" style={{ borderColor: '#143328' }}>
            <div className="text-center">
              <div
                className="stat-number text-5xl md:text-6xl font-serif font-bold mb-3"
                data-value="8932"
                style={{ color: '#143328' }}
              >
                0
              </div>
              <div className="text-base font-bold" style={{ color: '#143328' }}>
                Happy Smiles
              </div>
              <div className="mt-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-peach/40 border-2" style={{ borderColor: '#143328' }}></div>
              </div>
            </div>
          </div>

          <div className="impact-card bg-white p-8 rounded-2xl border-2 shadow-lg rotate-1 hover:rotate-0 transition-all duration-500 ease-out" style={{ borderColor: '#143328' }}>
            <div className="text-center">
              <div
                className="stat-number text-5xl md:text-6xl font-serif font-bold mb-3"
                data-value="156"
                style={{ color: '#143328' }}
              >
                0
              </div>
              <div className="text-base font-bold" style={{ color: '#143328' }}>
                Countries Reached
              </div>
              <div className="mt-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-butter/40 border-2" style={{ borderColor: '#143328' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-butter/40 p-8 rounded-2xl border-2 shadow-lg -rotate-1" style={{ borderColor: '#143328' }}>
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl font-serif italic mb-4 leading-relaxed font-bold" style={{ color: '#143328' }}>
              "In a world where you can be anything, be kind."
            </p>
            <footer className="font-hand text-lg font-bold" style={{ color: '#143328' }}>
              — The Gradz Community
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
