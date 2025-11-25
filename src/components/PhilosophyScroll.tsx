import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.set([text2Ref.current, text3Ref.current], { opacity: 0, y: 30 })
        .set([image2Ref.current, image3Ref.current], { opacity: 0, scale: 0.9 })
        .set(image1Ref.current, { zIndex: 3 })
        .set(image2Ref.current, { zIndex: 2 })
        .set(image3Ref.current, { zIndex: 1 })

        .to(text1Ref.current, { opacity: 0, y: -30, duration: 0.8, ease: 'power2.inOut' }, 1)
        .to(image1Ref.current, { scale: 0.9, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 1)

        .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.inOut' }, 1.4)
        .to(image2Ref.current, { opacity: 1, scale: 1, zIndex: 3, duration: 0.8, ease: 'power2.inOut' }, 1.4)
        .to(image1Ref.current, { zIndex: 2, duration: 0.1 }, 1.4)

        .to(text2Ref.current, { opacity: 0, y: -30, duration: 0.8, ease: 'power2.inOut' }, 2.8)
        .to(image2Ref.current, { scale: 0.9, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 2.8)

        .to(text3Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.inOut' }, 3.2)
        .to(image3Ref.current, { opacity: 1, scale: 1, zIndex: 4, duration: 0.8, ease: 'power2.inOut' }, 3.2)
        .to(image2Ref.current, { zIndex: 2, duration: 0.1 }, 3.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen relative overflow-hidden py-20">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-center">
        <div
          ref={frameRef}
          className="relative w-full h-[80vh] bg-cream/90 backdrop-blur-sm rounded-[3rem] border-4 border-forest shadow-hard-lg overflow-hidden"
        >
          <div
            ref={image1Ref}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 3 }}
          >
            <img
              src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Strength"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-matcha/30" />
          </div>

          <div
            ref={image2Ref}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 2, opacity: 0 }}
          >
            <img
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Focus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-peach/30" />
          </div>

          <div
            ref={image3Ref}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 1, opacity: 0 }}
          >
            <img
              src="https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Training"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-lilac/30" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center px-8">
              <div ref={text1Ref} className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                  Kindness is
                  <br />
                  <span className="text-peach font-hand drop-shadow-md">a muscle</span>
                </h2>
              </div>

              <div
                ref={text2Ref}
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 0 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                  Use it or
                  <br />
                  <span className="text-butter font-hand drop-shadow-md">lose it</span>
                </h2>
              </div>

              <div
                ref={text3Ref}
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 0 }}
              >
                <div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                    Empathy Gym
                  </h2>
                  <p className="text-xl md:text-2xl font-hand text-white/90 drop-shadow-md">
                    Train your heart daily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
