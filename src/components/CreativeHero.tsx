import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CreativeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <div className="absolute inset-0 bg-gradient-to-br from-stone/30 via-white/50 to-stone/20"></div>

      <div className="relative w-full h-full max-w-[1600px] mx-auto px-6">
        <div
          ref={polaroid1Ref}
          className="absolute top-[18%] left-[5%] w-64 md:w-72 lg:w-80 transform -rotate-12 hover:scale-105 hover:-rotate-6 transition-all duration-500 cursor-pointer shadow-2xl z-10"
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Friends together spreading joy"
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        <div
          ref={titleRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <h1 className="text-center whitespace-nowrap">
            <span className="block text-7xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85]" style={{ color: '#143328' }}>
              Make Earth
            </span>
            <span className="block text-8xl md:text-9xl lg:text-[11rem] font-hand -rotate-1 my-2" style={{ color: '#E89F71' }}>
              Softer
            </span>
            <span className="block text-7xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85]" style={{ color: '#143328' }}>
              Again.
            </span>
          </h1>
        </div>

        <div
          ref={polaroid2Ref}
          className="absolute bottom-[12%] right-[5%] w-64 md:w-72 lg:w-80 transform rotate-12 hover:scale-105 hover:rotate-6 transition-all duration-500 cursor-pointer shadow-2xl z-10"
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Capturing moments of kindness"
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        <div
          ref={stickerRef}
          className="absolute bottom-[18%] right-[28%] px-8 py-3 rounded-full shadow-xl rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer z-30"
          style={{ backgroundColor: '#E89F71' }}
        >
          <span className="font-hand text-lg md:text-xl font-bold whitespace-nowrap" style={{ color: '#143328' }}>
            GOOD VIBES ONLY
          </span>
        </div>
      </div>
    </div>
  );
}
