import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CreativeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: 'power3.out',
      });

      gsap.from(polaroid1Ref.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -45,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
      });

      gsap.from(polaroid2Ref.current, {
        opacity: 0,
        scale: 0.5,
        rotation: 45,
        duration: 1.2,
        delay: 0.5,
        ease: 'back.out(1.7)',
      });

      gsap.from(stickerRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180,
        duration: 1,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.to(polaroid1Ref.current, {
        y: '-=20',
        rotation: '-=3',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(polaroid2Ref.current, {
        y: '+=15',
        rotation: '+=2',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
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
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-matcha/10"></div>

      <div className="relative w-full max-w-7xl px-6">
        <div ref={polaroid1Ref} className="absolute top-[15%] left-[8%] w-48 md:w-64 lg:w-72 transform -rotate-12 hover:scale-105 hover:-rotate-6 transition-all duration-500 cursor-pointer shadow-2xl">
          <div className="bg-white p-4 rounded-lg">
            <img
              src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Friends together spreading joy"
              className="w-full aspect-square object-cover rounded"
            />
            <p className="mt-3 font-hand text-center text-lg" style={{ color: '#143328' }}>spread joy daily</p>
          </div>
        </div>

        <div ref={titleRef} className="text-center relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-2" style={{ color: '#143328' }}>
            Make Earth
          </h1>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-hand -rotate-2 inline-block my-4" style={{ color: '#E89F71' }}>
            Softer
          </h1>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight" style={{ color: '#143328' }}>
            Again.
          </h1>
        </div>

        <div ref={polaroid2Ref} className="absolute bottom-[10%] right-[8%] w-48 md:w-64 lg:w-72 transform rotate-12 hover:scale-105 hover:rotate-6 transition-all duration-500 cursor-pointer shadow-2xl">
          <div className="bg-white p-4 rounded-lg">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Capturing moments of kindness"
              className="w-full aspect-square object-cover rounded"
            />
            <p className="mt-3 font-hand text-center text-lg" style={{ color: '#143328' }}>kindness matters</p>
          </div>
        </div>

        <div ref={stickerRef} className="absolute bottom-[15%] left-[15%] px-8 py-3 rounded-full shadow-lg rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer" style={{ backgroundColor: '#E89F71' }}>
          <span className="font-hand text-lg font-bold" style={{ color: '#143328' }}>GOOD VIBES ONLY</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 flex items-start justify-center p-2" style={{ borderColor: '#143328' }}>
          <div className="w-2 h-3 rounded-full" style={{ backgroundColor: '#143328' }}></div>
        </div>
      </div>
    </div>
  );
}
