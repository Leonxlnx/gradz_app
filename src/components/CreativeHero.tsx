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
      {/* Enhanced background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-matcha/10"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(20, 51, 40, 0.03) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative w-full max-w-7xl px-6">
        {/* Enhanced polaroid 1 */}
        <div ref={polaroid1Ref} className="absolute top-[15%] left-[8%] w-48 md:w-64 lg:w-80 transform -rotate-12 hover:scale-105 hover:-rotate-6 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-3xl">
          <div className="bg-white p-5 rounded-2xl border-2" style={{ borderColor: '#143328' }}>
            <img
              src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Friends together spreading joy"
              className="w-full aspect-square object-cover rounded-lg"
            />
            <p className="mt-4 font-hand text-center text-xl" style={{ color: '#143328' }}>spread joy daily</p>
          </div>
        </div>

        {/* Enhanced title section */}
        <div ref={titleRef} className="text-center relative z-10 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-serif font-bold leading-tight mb-4" style={{ color: '#143328' }}>
            Make Earth
          </h1>
          <div className="my-6 md:my-8">
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-hand -rotate-2 inline-block px-6 py-2 relative" style={{ color: '#E89F71' }}>
              Softer
              <div className="absolute -bottom-2 left-0 right-0 h-1" style={{ backgroundColor: '#E89F71', opacity: 0.3, transform: 'rotate(-1deg)' }}></div>
            </h1>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-serif font-bold leading-tight" style={{ color: '#143328' }}>
            Again.
          </h1>
          <p className="mt-8 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: '#143328' }}>
            Join a global movement of kindness, one small act at a time.
          </p>
        </div>

        {/* Enhanced polaroid 2 */}
        <div ref={polaroid2Ref} className="absolute bottom-[10%] right-[8%] w-48 md:w-64 lg:w-80 transform rotate-12 hover:scale-105 hover:rotate-6 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-3xl">
          <div className="bg-white p-5 rounded-2xl border-2" style={{ borderColor: '#143328' }}>
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Capturing moments of kindness"
              className="w-full aspect-square object-cover rounded-lg"
            />
            <p className="mt-4 font-hand text-center text-xl" style={{ color: '#143328' }}>kindness matters</p>
          </div>
        </div>

        {/* Enhanced sticker */}
        <div ref={stickerRef} className="absolute bottom-[15%] left-[15%] px-10 py-4 rounded-full shadow-xl border-2 rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer" style={{ backgroundColor: '#E89F71', borderColor: '#143328' }}>
          <span className="font-hand text-xl font-bold" style={{ color: '#143328' }}>GOOD VIBES ONLY</span>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-14 rounded-full border-2 flex items-start justify-center p-2 shadow-lg" style={{ borderColor: '#143328' }}>
          <div className="w-2 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#143328' }}></div>
        </div>
      </div>
    </div>
  );
}
