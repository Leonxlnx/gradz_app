import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Polaroid, Sticker } from './UI';
import { Sun, Flower, Heart, Sparkle, Cloud } from './Icons';

export default function HeroParallax() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      { ref: polaroid1Ref, depth: 0.03 },
      { ref: polaroid2Ref, depth: 0.05 },
      { ref: icon1Ref, depth: 0.02 },
      { ref: icon2Ref, depth: 0.04 },
      { ref: icon3Ref, depth: 0.025 },
      { ref: icon4Ref, depth: 0.035 },
      { ref: stickerRef, depth: 0.015 },
    ];

    const quickToObjects = elements.map(({ ref, depth }) => ({
      element: ref.current,
      xTo: gsap.quickTo(ref.current, 'x', { duration: 0.6, ease: 'power2.out' }),
      yTo: gsap.quickTo(ref.current, 'y', { duration: 0.6, ease: 'power2.out' }),
      depth,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      quickToObjects.forEach(({ xTo, yTo, depth }) => {
        xTo(-deltaX * 100 * depth);
        yTo(-deltaY * 100 * depth);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    gsap.from(titleRef.current?.children || [], {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.3,
    });

    gsap.from([polaroid1Ref.current, polaroid2Ref.current], {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      delay: 0.8,
    });

    gsap.from([icon1Ref.current, icon2Ref.current, icon3Ref.current, icon4Ref.current, stickerRef.current], {
      scale: 0,
      rotate: 180,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(2)',
      delay: 1,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="fixed inset-0 w-full h-screen flex items-center justify-center z-0 overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <div className="relative w-full max-w-7xl px-6">
        <div ref={titleRef} className="text-center relative z-10 bg-white/70 backdrop-blur-sm rounded-3xl p-8">
          <h1 className="text-[10vw] md:text-[8vw] lg:text-[6rem] font-serif font-bold leading-[0.9] mb-3" style={{ color: '#143328' }}>
            Make Earth
          </h1>
          <h1 className="text-[12vw] md:text-[9vw] lg:text-[7rem] font-hand -rotate-2 inline-block my-6" style={{ color: '#D4734C' }}>
            Softer
          </h1>
          <h1 className="text-[10vw] md:text-[8vw] lg:text-[6rem] font-serif font-bold leading-[0.9] mt-3" style={{ color: '#143328' }}>
            Again.
          </h1>
          <p className="mt-8 text-lg md:text-xl font-semibold max-w-2xl mx-auto" style={{ color: '#143328' }}>
            A platform for spreading kindness, celebrating others, and building meaningful connections
          </p>
        </div>

        <div
          ref={polaroid1Ref}
          className="absolute top-[10%] left-[5%] md:left-[10%] w-32 md:w-40 lg:w-44 opacity-0 transition-opacity duration-1000"
          style={{ opacity: 1 }}
        >
          <Polaroid
            imageUrl="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=400"
            caption="spread joy daily"
            rotation={-8}
          />
        </div>

        <div
          ref={polaroid2Ref}
          className="absolute bottom-[15%] right-[5%] md:right-[12%] w-32 md:w-40 lg:w-44 opacity-0 transition-opacity duration-1000"
          style={{ opacity: 1 }}
        >
          <Polaroid
            imageUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
            caption="kindness matters"
            rotation={6}
          />
        </div>

        <div
          ref={icon1Ref}
          className="absolute top-[15%] right-[8%] md:right-[15%] transition-opacity duration-1000"
        >
          <Sun className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-butter opacity-70" />
        </div>

        <div
          ref={icon2Ref}
          className="absolute bottom-[20%] left-[8%] md:left-[15%] transition-opacity duration-1000"
        >
          <Flower className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-matcha opacity-70" />
        </div>

        <div
          ref={icon3Ref}
          className="absolute top-[35%] left-[3%] md:left-[5%] transition-opacity duration-1000"
        >
          <Heart className="w-10 h-10 md:w-12 md:h-12 text-peach opacity-60" />
        </div>

        <div
          ref={icon4Ref}
          className="absolute top-[25%] right-[3%] md:right-[5%] transition-opacity duration-1000"
        >
          <Cloud className="w-14 h-14 md:w-18 md:h-18 text-lilac opacity-60" />
        </div>

        <div
          ref={stickerRef}
          className="absolute bottom-[35%] right-[15%] hidden md:block transition-opacity duration-1000"
        >
          <Sticker color="butter" size="md" rotation={12}>
            <Sparkle className="w-8 h-8 text-forest" />
          </Sticker>
        </div>
      </div>
    </div>
  );
}
