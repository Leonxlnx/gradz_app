import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flower, Star, Heart, Sparkle } from './Icons';

export default function HappyDecorations() {
  const leftFlowerRef = useRef<HTMLDivElement>(null);
  const rightStarRef = useRef<HTMLDivElement>(null);
  const leftHeartRef = useRef<HTMLDivElement>(null);
  const rightSparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(leftFlowerRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(rightStarRef.current, {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: 'none',
    });

    gsap.to([leftFlowerRef.current, rightStarRef.current], {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to([leftHeartRef.current, rightSparkleRef.current], {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });

    gsap.to(leftHeartRef.current, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(rightSparkleRef.current, {
      rotation: 180,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      <div
        ref={leftFlowerRef}
        className="absolute left-8 top-1/4 opacity-30"
      >
        <Flower className="w-24 h-24 text-matcha" />
      </div>

      <div
        ref={rightStarRef}
        className="absolute right-8 top-1/3 opacity-30"
      >
        <Star className="w-20 h-20 text-butter" />
      </div>

      <div
        ref={leftHeartRef}
        className="absolute left-12 bottom-1/3 opacity-25"
      >
        <Heart className="w-16 h-16 text-peach" />
      </div>

      <div
        ref={rightSparkleRef}
        className="absolute right-12 bottom-1/4 opacity-30"
      >
        <Sparkle className="w-20 h-20 text-lilac" />
      </div>
    </div>
  );
}
