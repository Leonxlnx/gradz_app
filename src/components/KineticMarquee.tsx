import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KineticMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    const tl1 = gsap.timeline({ repeat: -1 });
    tl1.to(row1, {
      x: '-50%',
      duration: 30,
      ease: 'none',
    });

    const tl2 = gsap.timeline({ repeat: -1 });
    tl2.to(row2, {
      x: '0%',
      duration: 30,
      ease: 'none',
    });

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const updateSkew = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const skewAmount = Math.min(Math.max(scrollVelocity * 0.3, -8), 8);

      gsap.to([row1, row2], {
        skewX: skewAmount,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const scrollListener = () => {
      requestAnimationFrame(updateSkew);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      tl1.kill();
      tl2.kill();
    };
  }, []);

  const phrases1 = [
    'Radical Empathy',
    'Serious Fun',
    'Radical Empathy',
    'Serious Fun',
    'Radical Empathy',
    'Serious Fun',
  ];

  const phrases2 = [
    'Daily Kindness',
    'Joyful Impact',
    'Daily Kindness',
    'Joyful Impact',
    'Daily Kindness',
    'Joyful Impact',
  ];

  return (
    <div
      ref={marqueeRef}
      className="w-full py-8 overflow-hidden bg-matcha/20 border-y border-forest/20 relative"
      style={{ transform: 'rotate(-2deg)', marginTop: '-1.5rem', marginBottom: '-1.5rem' }}
    >
      <div className="absolute inset-0 bg-noise opacity-30" />

      <div ref={row1Ref} className="flex whitespace-nowrap mb-4 relative" style={{ width: '200%' }}>
        {phrases1.map((phrase, i) => (
          <div
            key={i}
            className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-forest px-6 flex-shrink-0"
          >
            {phrase}
            <span className="inline-block mx-6 text-peach text-2xl">•</span>
          </div>
        ))}
      </div>

      <div ref={row2Ref} className="flex whitespace-nowrap relative" style={{ width: '200%', transform: 'translateX(-50%)' }}>
        {phrases2.map((phrase, i) => (
          <div
            key={i}
            className="font-hand text-5xl md:text-6xl lg:text-7xl text-peach px-6 flex-shrink-0"
          >
            {phrase}
            <span className="inline-block mx-6 text-forest text-2xl">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
