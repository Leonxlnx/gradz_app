import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { Logo, Sunburst, Sparkle, Flower, Squiggle, ArrowRight, Peace, ScribbleUnderline, Heart, QuoteIcon, AbstractShape, ScribbleLoop, Smiley, Sun, Star, Spiral } from './components/Icons';
import { Button, BigHeading, Sticker, Badge, Tape, Polaroid, PhotoGridItem, QuoteCard, StickyNote } from './components/UI';
import { KindnessGenerator } from './components/KindnessGenerator';
import { FluidBackground } from './components/FluidBackground';
import { subscribeToNewsletter } from './services/supabaseClient';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type View = 'home' | 'mission' | 'stories' | 'community' | 'join-club' | 'newsletter-confirm' | 'wisdom-quotes' | 'kindness-challenges' | 'mindful-lectures' | 'streak-system' | 'privacy' | 'terms' | 'cookies';

// --- Happy Decorations Component (Global Left Side Only) ---
const HappyDecorations = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Only Left Side / Background Floaters as requested */}
        <div className="absolute top-[15%] left-[5%] animate-float opacity-20">
            <Sun className="w-12 h-12 text-gradz-butter" />
        </div>
         <div className="absolute bottom-[15%] left-[10%] animate-spin-slow opacity-10" style={{animationDuration: '30s'}}>
             <Flower className="w-24 h-24 text-gradz-lilac" />
        </div>
        <div className="absolute top-[60%] left-[20%] opacity-10 animate-bounce" style={{animationDuration: '4s'}}>
            <Star className="w-8 h-8 text-gradz-matcha" />
        </div>
    </div>
);

// --- Scroll Reveal Text Component with GSAP ---
const ScrollRevealText: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!textRef.current) return;

    const words = wordsRef.current.filter(Boolean);

    gsap.fromTo(
      words,
      {
        opacity: 0.2,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    );
  }, { scope: textRef });

  const text = "A premium wellness platform designed to cultivate kindness, positivity, and mental well-being through daily micro-practices.";
  const words = text.split(' ');

  return (
    <section className="py-20 md:py-32 bg-gradz-cream relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div ref={textRef} className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl lg:text-5xl text-gradz-charcoal leading-relaxed font-medium">
            {words.map((word, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) wordsRef.current[index] = el;
                }}
                className="inline-block mr-2 md:mr-3"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

// --- NEW: Dual Kinetic Marquee ---
const CreativeMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Row 1: Left movement
    const row1 = row1Ref.current;
    if (row1) {
        const content = row1.innerHTML;
        row1.innerHTML = content + content + content + content; 
        gsap.to(row1, {
            xPercent: -25, // Adjusted for 4 copies
            duration: 30,
            ease: "none",
            repeat: -1
        });
    }

    // Row 2: Right movement 
    const row2 = row2Ref.current;
    if (row2) {
        const content = row2.innerHTML;
        row2.innerHTML = content + content + content + content;
        gsap.fromTo(row2, 
            { xPercent: -25 },
            { xPercent: 0, duration: 35, ease: "none", repeat: -1 }
        );
    }

    // Scroll velocity effect applied to container skew
    ScrollTrigger.create({
        trigger: document.body,
        onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skew = velocity / 300;
            gsap.to(containerRef.current, { skewX: skew, duration: 0.5, ease: "power2" });
        }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-20 bg-gradz-charcoal text-gradz-cream relative z-20 -mt-24 mb-10 transform -rotate-3 origin-center border-y-4 border-gradz-cream shadow-2xl overflow-hidden w-[150%] -ml-[25%]">
        {/* Row 1 */}
        <div ref={row1Ref} className="flex items-center whitespace-nowrap mb-6 opacity-90">
             <div className="flex items-center gap-20 px-4 text-7xl md:text-9xl font-serif italic">
                 <span>Radical Empathy</span>
                 <Star className="w-20 h-20 text-gradz-matcha" />
                 <span className="font-sans font-bold text-stroke text-transparent stroke-white">SERIOUS FUN</span>
                 <Smiley className="w-20 h-20 text-gradz-peach" />
                 <span>Kindness is Cool</span>
                 <Sun className="w-20 h-20 text-gradz-butter" />
             </div>
        </div>
        {/* Row 2 */}
        <div ref={row2Ref} className="flex items-center whitespace-nowrap opacity-70">
             <div className="flex items-center gap-20 px-4 text-6xl md:text-8xl font-sans font-bold uppercase tracking-tighter text-gradz-blue">
                 <span>Don't Be Boring</span>
                 <Flower className="w-16 h-16 text-gradz-lilac" />
                 <span className="font-serif italic text-gradz-cream normal-case font-light">Make someone smile</span>
                 <Spiral className="w-16 h-16 text-gradz-orange" />
                 <span>Change the World</span>
                 <Heart className="w-16 h-16 text-gradz-matcha" />
             </div>
        </div>
    </div>
  );
};

// --- NEW: Voices of Reason (Horizontal Scroll) ---
const VoicesHorizontalScroll = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
  
    useGSAP(() => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      if (!section || !trigger) return;
  
      // Explicitly recalculate width to ensure it scrolls fully
      const getScrollAmount = () => -(section.scrollWidth - window.innerWidth);
      
      const tween = gsap.to(section, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${section.scrollWidth - window.innerWidth}`, 
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      return () => {
          tween.kill();
      }
    }, { scope: triggerRef });
  
    return (
      <section ref={triggerRef} className="relative h-screen bg-gradz-cream overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-10 left-10 w-64 h-64 bg-gradz-matcha/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradz-peach/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

         <div className="absolute top-12 left-12 z-10">
             <Badge text="Voices of Reason" color="lilac" />
         </div>

         <div className="h-full flex items-center">
             <div ref={sectionRef} className="flex items-center gap-20 px-20 w-max">
                {/* Intro Block */}
                <div className="w-[80vw] md:w-[30vw] shrink-0">
                     <h2 className="text-6xl md:text-8xl font-serif text-gradz-green leading-[0.9]">
                        Wisdom <br/>
                        <span className="italic text-gradz-peach">From The</span> <br/>
                        Greats.
                     </h2>
                     <p className="mt-8 text-xl text-gradz-charcoal/60 max-w-md">
                        A collection of sticky notes to remind you that kindness isn't soft—it's the hardest, most necessary thing we do.
                     </p>
                     <div className="flex items-center gap-4 mt-8">
                         <span className="text-sm font-bold uppercase tracking-widest opacity-40">Scroll</span>
                         <ArrowRight className="w-8 h-8 text-gradz-charcoal animate-pulse" />
                     </div>
                </div>

                {/* Card 1 */}
                <div className="shrink-0 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <StickyNote color="bg-gradz-butter" className="w-[80vw] md:w-[500px] aspect-square flex flex-col justify-center p-12">
                        <QuoteIcon className="w-12 h-12 mb-6 opacity-30" />
                        <p className="font-serif text-4xl md:text-5xl text-gradz-charcoal leading-tight">
                            "No act of kindness, no matter how small, is ever wasted."
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-gradz-charcoal/20"></div>
                            <p className="font-sans font-bold uppercase tracking-widest opacity-60">Aesop</p>
                        </div>
                    </StickyNote>
                </div>

                 {/* Card 2 */}
                 <div className="shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <StickyNote color="bg-gradz-lilac" className="w-[80vw] md:w-[500px] aspect-square flex flex-col justify-center p-12">
                        <QuoteIcon className="w-12 h-12 mb-6 opacity-30" />
                        <p className="font-serif text-4xl md:text-5xl text-gradz-charcoal leading-tight">
                            "Be a little kinder than you have to be."
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-gradz-charcoal/20"></div>
                            <p className="font-sans font-bold uppercase tracking-widest opacity-60">E. Lockhart</p>
                        </div>
                    </StickyNote>
                </div>

                 {/* Card 3 */}
                 <div className="shrink-0 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <StickyNote color="bg-gradz-peach" className="w-[80vw] md:w-[500px] aspect-square flex flex-col justify-center p-12">
                        <QuoteIcon className="w-12 h-12 mb-6 opacity-30" />
                        <p className="font-serif text-4xl md:text-5xl text-gradz-charcoal leading-tight">
                            "Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world."
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-gradz-charcoal/20"></div>
                            <p className="font-sans font-bold uppercase tracking-widest opacity-60">Desmond Tutu</p>
                        </div>
                    </StickyNote>
                </div>
                
                {/* Card 4 */}
                 <div className="shrink-0 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <StickyNote color="bg-gradz-matcha" className="w-[80vw] md:w-[500px] aspect-square flex flex-col justify-center p-12">
                        <QuoteIcon className="w-12 h-12 mb-6 opacity-30" />
                        <p className="font-serif text-4xl md:text-5xl text-gradz-charcoal leading-tight">
                            "Kindness is the language which the deaf can hear and the blind can see."
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-gradz-charcoal/20"></div>
                            <p className="font-sans font-bold uppercase tracking-widest opacity-60">Mark Twain</p>
                        </div>
                    </StickyNote>
                </div>

                 {/* Outro */}
                 <div className="shrink-0 w-[40vw] flex items-center justify-center pr-20">
                     <div className="text-center">
                        <ScribbleLoop className="w-32 h-32 text-gradz-matcha mx-auto mb-6" />
                        <h3 className="text-4xl font-serif text-gradz-green">Your Turn.</h3>
                     </div>
                 </div>
             </div>
         </div>
      </section>
    );
};

// --- NEW: Proof of Humanity (Parallax Grid) ---
const ParallaxCommunity = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        tl.to(col1Ref.current, { y: -300, ease: "none" }, 0);
        tl.to(col2Ref.current, { y: 200, ease: "none" }, 0);
        tl.to(col3Ref.current, { y: -300, ease: "none" }, 0);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 mb-20 text-center relative z-10">
                <Badge text="The Gallery" color="orange" />
                <h2 className="text-6xl md:text-9xl font-serif text-gradz-green mt-4 mb-4">Proof of <span className="font-hand text-gradz-peach">Humanity</span></h2>
                <p className="text-xl text-gradz-charcoal/60">Real people. Real moments. 100% Vibe Certified.</p>
            </div>

            {/* Parallax Grid */}
            <div className="container mx-auto px-4 h-[120vh] overflow-hidden relative">
                <div className="grid grid-cols-3 gap-4 md:gap-8 -mt-20">
                    
                    {/* Column 1 - Moves UP */}
                    <div ref={col1Ref} className="flex flex-col gap-8">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Happy person" /></div>
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Friendship" /></div>
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Smiling woman" /></div>
                    </div>

                    {/* Column 2 - Moves DOWN */}
                    <div ref={col2Ref} className="flex flex-col gap-8 -mt-32">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Group hug" /></div>
                        <div className="aspect-[3/4] bg-gradz-matcha rounded-3xl flex items-center justify-center p-8 text-center">
                             <div className="space-y-4">
                                <Smiley className="w-16 h-16 text-gradz-green mx-auto" />
                                <h3 className="font-serif text-4xl text-gradz-green">1M+ <br/>Acts Generated</h3>
                             </div>
                        </div>
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Connection" /></div>
                         <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Workplace kindness" /></div>
                    </div>

                    {/* Column 3 - Moves UP */}
                    <div ref={col3Ref} className="flex flex-col gap-8">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Happy child" /></div>
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Joy" /></div>
                        <div className="aspect-[3/4] bg-gradz-peach rounded-3xl flex items-center justify-center p-8 text-center">
                             <div className="space-y-4">
                                <Peace className="w-16 h-16 text-gradz-charcoal mx-auto" />
                                <h3 className="font-serif text-4xl text-gradz-charcoal">Global <br/>Movement</h3>
                             </div>
                        </div>
                    </div>

                </div>
                
                {/* Gradient Overlay for Smooth Blend */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
                 <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-20"></div>
            </div>
        </section>
    );
}

const ScrollyTellingSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!wrapperRef.current) return;

        // Define timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=300%", // 300% height scroll duration
                pin: true,
                scrub: 0.5, // Smooth scrubbing
                anticipatePin: 1
            }
        });

        // Set initial states (Hidden elements)
        gsap.set([".slide-text-2", ".slide-text-3"], { autoAlpha: 0, y: 50 });
        gsap.set([".slide-bg-2", ".slide-bg-3"], { autoAlpha: 0, scale: 1.1, filter: "blur(5px)" });
        gsap.set(".slide-text-1", { autoAlpha: 1, y: 0 });

        // --------------------------------------
        // PHASE 1: From "Kindness is a Muscle" -> "Use it or Lose it"
        // --------------------------------------
        tl.to(".slide-text-1", { autoAlpha: 0, y: -50, duration: 1, ease: "power2.in" })
          
          // Background 2 comes in
          .to(".slide-bg-2", { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power1.inOut" }, "-=0.2")
          
          // Text 2 comes in
          .to(".slide-text-2", { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<+0.3");

        // --------------------------------------
        // PHASE 2: HOLD (Read time)
        // --------------------------------------
        tl.to({}, { duration: 0.5 });

        // --------------------------------------
        // PHASE 3: From "Use it or Lose it" -> "Empathy Gym"
        // --------------------------------------
        tl.to(".slide-text-2", { autoAlpha: 0, y: -50, duration: 1, ease: "power2.in" })
          
          // Background 3 comes in
          .to(".slide-bg-3", { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power1.inOut" }, "-=0.2")
          
          // Text 3 comes in
          .to(".slide-text-3", { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<+0.3");

    }, { scope: wrapperRef });

    return (
        <section ref={wrapperRef} className="relative w-full h-screen overflow-hidden bg-gradz-charcoal flex items-center justify-center">
            
            {/* Subtle texture overlay for the charcoal background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

            {/* The "Cinema Frame" Container - Images are contained here instead of full screen */}
            <div className="relative w-[90vw] md:w-[80vw] h-[60vh] md:h-[70vh] max-w-6xl bg-gradz-green rounded-[3rem] overflow-hidden border-4 border-gradz-cream/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                
                {/* Dynamic Image Layer inside the frame */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-gradz-charcoal z-40 opacity-20 mix-blend-multiply pointer-events-none"></div>
                    
                    {/* BG 1 */}
                    <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=1600" 
                         className="slide-bg-1 absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 z-0" 
                         alt="Focus and Strength" />
                    
                    {/* BG 2 */}
                    <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=80" 
                         className="slide-bg-2 absolute inset-0 w-full h-full object-cover z-10" 
                         alt="Gym Intensity" />
                    
                    {/* BG 3 */}
                    <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1600" 
                         className="slide-bg-3 absolute inset-0 w-full h-full object-cover z-20" 
                         alt="Community Connection" />
                </div>

                {/* Tape Decoration on the frame */}
                <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-90 opacity-80" />
                <Tape className="bottom-10 -right-4 rotate-45 opacity-60" />

                {/* Text Layer (Centered over the frame) */}
                <div className="relative z-50 h-full flex items-center justify-center px-6 pointer-events-none bg-black/20 backdrop-blur-[2px]">
                    <div className="max-w-4xl w-full text-center relative h-40 md:h-60"> 
                        
                        {/* Slide 1 Text */}
                        <div className="slide-text-1 absolute inset-0 flex flex-col items-center justify-center">
                             <Badge text="The Core Belief" color="matcha" />
                             <h2 className="text-4xl md:text-7xl font-serif text-gradz-cream mt-6 leading-tight drop-shadow-lg">
                                 Kindness is a <span className="italic text-gradz-matcha">muscle</span>.
                             </h2>
                        </div>

                        {/* Slide 2 Text */}
                        <div className="slide-text-2 absolute inset-0 flex flex-col items-center justify-center opacity-0">
                            <Badge text="Action &gt; Sentiment" color="orange" />
                            <h2 className="text-4xl md:text-7xl font-serif text-gradz-cream mt-6 leading-tight drop-shadow-lg">
                                Use it or <span className="underline decoration-gradz-peach decoration-4 underline-offset-8">lose it</span>.
                            </h2>
                        </div>

                        {/* Slide 3 Text */}
                        <div className="slide-text-3 absolute inset-0 flex flex-col items-center justify-center opacity-0">
                             <Badge text="The Solution" color="blue" />
                             <h2 className="text-4xl md:text-7xl font-serif text-gradz-cream mt-6 leading-tight drop-shadow-lg">
                                 Welcome to the <br/><span className="text-gradz-blue font-hand">Empathy Gym</span>.
                             </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ViewMission = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
            <Badge text="Our Mission" color="matcha" />
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-8">Why Gradz Exists</h1>
            <p className="text-xl md:text-2xl text-gradz-charcoal/70 leading-relaxed">
                In a world dominated by endless scrolling, negative news, and online hostility, Gradz offers a quiet sanctuary for personal growth and meaningful reflection.
            </p>
        </div>

        {/* The Problem Section */}
        <div className="max-w-4xl mx-auto mb-32">
            <h2 className="text-4xl md:text-6xl font-serif text-gradz-green mb-8 text-center">The Problem We Solve</h2>
            <p className="text-xl text-gradz-charcoal/80 mb-12 text-center leading-relaxed">
                Modern digital life is overwhelming. Social media algorithms optimize for outrage, news cycles focus on negativity, and online interactions often lack genuine human connection.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone text-center">
                    <div className="text-5xl font-bold text-gradz-peach mb-4">70%</div>
                    <p className="text-gradz-charcoal/80">of people feel more anxious after using social media</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone text-center">
                    <div className="text-5xl font-bold text-gradz-matcha mb-4">23%</div>
                    <p className="text-gradz-charcoal/80">less cortisol in kind people (stress hormone)</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone text-center">
                    <div className="text-5xl font-bold text-gradz-blue mb-4">3x</div>
                    <p className="text-gradz-charcoal/80">more likely to be kind after witnessing kindness</p>
                </div>
            </div>
        </div>

        {/* How It Works */}
        <div className="mb-32">
            <h2 className="text-4xl md:text-6xl font-serif text-gradz-green mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="bg-gradz-cream p-10 rounded-[3rem] border border-gradz-stone">
                    <h3 className="text-3xl font-serif text-gradz-green mb-4">Daily Wisdom Quotes</h3>
                    <p className="text-lg text-gradz-charcoal/80">Carefully curated quotes from philosophers, thought leaders, and wisdom traditions. Not generic posters—meaningful insights designed to shift perspective.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[3rem] border border-gradz-stone shadow-xl -rotate-1">
                    <h3 className="text-3xl font-serif text-gradz-green mb-4">50+ Kindness Challenges</h3>
                    <p className="text-lg text-gradz-charcoal/80">From simple acts like smiling at strangers to meaningful commitments like volunteering. Each challenge includes clear instructions and difficulty levels.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[3rem] border border-gradz-stone shadow-xl rotate-1">
                    <h3 className="text-3xl font-serif text-gradz-green mb-4">Mindful Lectures</h3>
                    <p className="text-lg text-gradz-charcoal/80">Over 50 in-depth articles covering the science of kindness, building self-compassion, creating meaningful connections, and more.</p>
                 </div>
                 <div className="bg-gradz-peach/20 p-10 rounded-[3rem] border border-gradz-peach/50">
                    <h3 className="text-3xl font-serif text-gradz-green mb-4">Streak System</h3>
                    <p className="text-lg text-gradz-charcoal/80">Consistency builds habits. Track your daily engagement and watch your kindness practice grow. Research shows it takes 66 days to form a new habit.</p>
                 </div>
            </div>
        </div>

        {/* The Science */}
        <div className="max-w-4xl mx-auto mb-32 bg-gradz-green text-gradz-cream p-12 rounded-[3rem]">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-center">The Science Behind Gradz</h2>
            <p className="text-xl mb-8 text-center opacity-90">Kindness isn't just a nice idea—it's scientifically proven to improve well-being:</p>
            <div className="space-y-6">
                <div>
                    <h4 className="text-2xl font-bold mb-3 text-gradz-matcha">Neurological Benefits</h4>
                    <p className="opacity-90">Acts of kindness release oxytocin, reducing blood pressure and improving heart health. Helping others triggers the brain's reward centers, releasing dopamine and serotonin.</p>
                </div>
                <div>
                    <h4 className="text-2xl font-bold mb-3 text-gradz-peach">Psychological Benefits</h4>
                    <p className="opacity-90">Performing 5 acts of kindness weekly increases happiness for up to 3 months. Grateful individuals report better sleep quality and reduced anxiety.</p>
                </div>
                <div>
                    <h4 className="text-2xl font-bold mb-3 text-gradz-butter">Social Benefits</h4>
                    <p className="opacity-90">Kindness is contagious. Kind individuals build stronger social connections and communities with higher kindness levels report better overall health.</p>
                </div>
            </div>
        </div>
    </div>
);

const ViewStories = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
         <div className="text-center mb-12 animate-fade-in-up">
            <Badge text="User Testimonials" color="blue" />
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-6">What Our Community Says</h1>
            <p className="text-xl text-gradz-charcoal/70 max-w-2xl mx-auto">Over 10,000 users have already begun their journey with Gradz.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
                { title: "Life-Changing Morning Routine", author: "Tristan P.", text: "This platform has genuinely changed my morning routine. The quotes are thoughtful and the challenges push me to be better." },
                { title: "Clean & Focused Design", author: "Oskar K.", text: "Clean design, no distractions. Just pure focus on becoming a kinder person. Exactly what I needed." },
                { title: "Insightful Progress Tracking", author: "Rijad B.", text: "The lectures are insightful and I love tracking my progress. Would recommend to anyone looking to grow." },
                { title: "Daily Dose of Positivity", author: "Sarah M.", text: "In a world full of negativity, Gradz is my daily reset. Five minutes of kindness makes my whole day better." },
                { title: "Science-Backed Wellness", author: "David Chen", text: "I love that it's backed by actual science. Not just feel-good fluff, but real neurological benefits. I can feel the difference." },
                { title: "Perfect for Busy Professionals", author: "Emma L.", text: "As someone with a hectic schedule, the micro-practices are perfect. Small acts, big impact. Highly recommend." }
            ].map((story, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gradz-stone hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradz-matcha rounded-full flex items-center justify-center text-xs font-bold">{story.author.charAt(0)}</div>
                        <span className="text-sm font-bold text-gradz-charcoal/50 uppercase tracking-wide">{story.author}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gradz-green mb-3">{story.title}</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed">"{story.text}"</p>
                </div>
            ))}
        </div>

        {/* Who Is This For Section */}
        <div className="max-w-4xl mx-auto mt-32">
            <h2 className="text-4xl md:text-6xl font-serif text-gradz-green mb-12 text-center">Who Is Gradz For?</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradz-matcha/20 p-8 rounded-3xl border border-gradz-matcha/30">
                    <h3 className="text-2xl font-bold text-gradz-green mb-4">Personal Growth Seekers</h3>
                    <p className="text-gradz-charcoal/80">If you want to become a better version of yourself—kinder, more patient, more grateful—Gradz provides the daily structure and content to make it happen.</p>
                </div>
                <div className="bg-gradz-peach/20 p-8 rounded-3xl border border-gradz-peach/30">
                    <h3 className="text-2xl font-bold text-gradz-green mb-4">Stress & Anxiety Relief</h3>
                    <p className="text-gradz-charcoal/80">The calming interface and positive content offer a respite from the chaos of modern life. Many users report feeling noticeably calmer after just a few minutes.</p>
                </div>
                <div className="bg-gradz-blue/20 p-8 rounded-3xl border border-gradz-blue/30">
                    <h3 className="text-2xl font-bold text-gradz-green mb-4">Students & Young Professionals</h3>
                    <p className="text-gradz-charcoal/80">Build positive habits early. The skills developed through Gradz—empathy, self-compassion, gratitude—are essential for success in both personal and professional life.</p>
                </div>
                <div className="bg-gradz-butter/30 p-8 rounded-3xl border border-gradz-butter/50">
                    <h3 className="text-2xl font-bold text-gradz-green mb-4">Anyone Wanting to Make a Difference</h3>
                    <p className="text-gradz-charcoal/80">Whether you want to improve your own life or impact others, Gradz shows you that meaningful change starts with small, consistent actions.</p>
                </div>
            </div>
        </div>
    </div>
);

const ViewCommunity = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="text-center mb-16 animate-fade-in-up">
            <Badge text="The Gallery" color="orange" />
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-4">Our Global Community</h1>
            <p className="text-xl text-gradz-charcoal/70 max-w-2xl mx-auto">Real people. Real moments. 10,000+ users spreading kindness worldwide.</p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
             {[
                 "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
                 "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
                 "https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?w=800",
                 "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800",
                 "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800",
                 "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
                 "https://images.unsplash.com/photo-1523825036634-aab3cce05919?w=800",
                 "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
                 "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"
             ].map((src, i) => (
                 <div key={i} className="break-inside-avoid">
                    <div className="relative group overflow-hidden rounded-[2rem] shadow-xl">
                        <img src={src} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Community" loading="lazy" />
                        <div className="absolute inset-0 bg-gradz-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                             <div className="flex items-center justify-between">
                                <span className="font-bold text-gradz-green">Verified Moment</span>
                                <Heart className="w-4 h-4 text-gradz-orange fill-current" />
                             </div>
                        </div>
                    </div>
                 </div>
             ))}
        </div>
    </div>
);

const ViewJoinClub = () => (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
        <div className="max-w-3xl w-full">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-serif text-gradz-green mb-6">Get Started with Gradz</h1>
                <p className="text-lg text-gradz-charcoal/60 max-w-xl mx-auto">Begin your transformation today. Choose your preferred platform below.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <div className="relative bg-gray-100 p-10 rounded-3xl opacity-60 cursor-not-allowed">
                    <div className="absolute top-4 right-4 bg-gray-400 text-white text-xs px-3 py-1 rounded-full font-bold">Coming Soon</div>
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="h-14 mb-6 opacity-60"
                        />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">Google Play</h3>
                        <p className="text-gray-400 text-sm">Android App Store</p>
                    </div>
                </div>

                <div className="relative bg-gray-100 p-10 rounded-3xl opacity-60 cursor-not-allowed">
                    <div className="absolute top-4 right-4 bg-gray-400 text-white text-xs px-3 py-1 rounded-full font-bold">Coming Soon</div>
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                            alt="App Store"
                            className="h-14 mb-6 opacity-60"
                        />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">App Store</h3>
                        <p className="text-gray-400 text-sm">iOS App Store</p>
                    </div>
                </div>
            </div>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif text-gradz-green mb-8">Or Try It Now</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <a
                        href="https://ukxandpzgxeebhkhpkow.supabase.co/storage/v1/object/public/apk-files/gradz%20VERSION%200.apk"
                        download="gradz-VERSION-0.apk"
                        className="group bg-gradz-green p-10 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer relative"
                    >
                        <div className="absolute top-4 right-4 bg-gradz-matcha text-gradz-green text-xs px-3 py-1 rounded-full font-bold">Available Now</div>
                        <div className="flex flex-col items-center text-center">
                            <svg className="w-16 h-16 text-white mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                            </svg>
                            <h3 className="text-xl font-bold text-white mb-2">APK Download</h3>
                            <p className="text-white/60 text-sm">Direct Install • Android</p>
                        </div>
                    </a>

                    <div className="relative bg-gradz-blue/20 p-10 rounded-3xl border-2 border-gradz-blue/30 cursor-not-allowed opacity-70">
                        <div className="absolute top-4 right-4 bg-gradz-blue text-white text-xs px-3 py-1 rounded-full font-bold">Coming Soon</div>
                        <div className="flex flex-col items-center text-center">
                            <svg className="w-16 h-16 text-gradz-blue mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                            </svg>
                            <h3 className="text-xl font-bold text-gradz-blue mb-2">Web Version</h3>
                            <p className="text-gradz-blue/60 text-sm">Use in Browser</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ViewNewsletterConfirm = () => (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
            <div className="mb-12">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradz-matcha rounded-full mb-8 p-4">
                    <img src="/favicon_gradz.png" alt="Gradz" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-5xl md:text-6xl font-serif text-gradz-green mb-6">Check Your Email</h1>
                <p className="text-xl text-gradz-charcoal/70 leading-relaxed max-w-lg mx-auto mb-8">
                    We've sent you a confirmation email. Please check your inbox and confirm your subscription to start receiving kindness updates from Gradz.
                </p>
                <div className="text-sm text-gradz-charcoal/50">
                    Didn't receive it? Check your spam folder or try subscribing again.
                </div>
            </div>
            <Button onClick={() => window.location.href = '/'} variant="black">
                Back to Home
            </Button>
        </div>
    </div>
);

const ViewWisdomQuotes = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
                <Badge text="Feature" color="matcha" />
                <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-8">Daily Wisdom Quotes</h1>
                <p className="text-xl md:text-2xl text-gradz-charcoal/70 leading-relaxed max-w-3xl mx-auto">
                    Start each day with profound insights from philosophers, thought leaders, and wisdom traditions. Not generic posters—meaningful reflections designed to shift perspective.
                </p>
            </div>

            <div className="grid gap-8 mb-16">
                {[
                    { quote: "Be kind, for everyone you meet is fighting a harder battle.", author: "Plato", category: "Philosophy" },
                    { quote: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop", category: "Wisdom" },
                    { quote: "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.", author: "Princess Diana", category: "Action" },
                    { quote: "Kindness is a language which the deaf can hear and the blind can see.", author: "Mark Twain", category: "Empathy" },
                    { quote: "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.", author: "Mahatma Gandhi", category: "Spirituality" },
                    { quote: "Wherever there is a human being, there is an opportunity for kindness.", author: "Seneca", category: "Stoicism" },
                    { quote: "Unexpected kindness is the most powerful, least costly, and most underrated agent of human change.", author: "Bob Kerrey", category: "Impact" },
                    { quote: "Be the reason someone believes in the goodness of people.", author: "Karen Salmansohn", category: "Inspiration" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-10 rounded-[2rem] shadow-lg border border-gradz-stone hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex items-start gap-4 mb-6">
                            <QuoteIcon className="w-12 h-12 text-gradz-peach flex-shrink-0" />
                            <p className="text-2xl md:text-3xl font-serif text-gradz-green leading-relaxed italic">"{item.quote}"</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gradz-charcoal">— {item.author}</p>
                            <span className="text-xs font-bold uppercase tracking-wider text-gradz-matcha bg-gradz-matcha/10 px-4 py-2 rounded-full">{item.category}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradz-green text-gradz-cream p-12 rounded-[3rem] text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Ready to start your daily practice?</h2>
                <p className="text-xl opacity-90 mb-8">Download Gradz and receive a new wisdom quote every morning.</p>
                <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} variant="white" className="!text-gradz-green">
                    Get Started
                </Button>
            </div>
        </div>
    </div>
);

const ViewKindnessChallenges = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
                <Badge text="Feature" color="peach" />
                <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-8">50+ Kindness Challenges</h1>
                <p className="text-xl md:text-2xl text-gradz-charcoal/70 leading-relaxed max-w-3xl mx-auto">
                    From simple acts like smiling at strangers to meaningful commitments like volunteering. Each challenge includes clear instructions and difficulty levels.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Smile at 5 Strangers", difficulty: "Easy", duration: "10 min", description: "Make eye contact and genuinely smile at 5 people you don't know today." },
                    { title: "Pay for Someone's Coffee", difficulty: "Easy", duration: "5 min", description: "Buy coffee for the person behind you in line. No explanation needed." },
                    { title: "Leave a Generous Tip", difficulty: "Easy", duration: "5 min", description: "Tip 50% or more on your next meal. Watch their reaction." },
                    { title: "Compliment 3 People", difficulty: "Easy", duration: "15 min", description: "Give genuine, specific compliments to three different people." },
                    { title: "Help Someone Carry Groceries", difficulty: "Medium", duration: "15 min", description: "Offer to help someone load their car or carry bags to their door." },
                    { title: "Write Thank You Notes", difficulty: "Medium", duration: "30 min", description: "Write handwritten thank you notes to 3 people who've impacted your life." },
                    { title: "Volunteer for 2 Hours", difficulty: "Medium", duration: "2 hours", description: "Find a local charity or community organization and volunteer your time." },
                    { title: "Random Acts of Kindness Day", difficulty: "Hard", duration: "All day", description: "Commit to doing 10 random acts of kindness in one day." },
                    { title: "Mentor Someone", difficulty: "Hard", duration: "Ongoing", description: "Offer to mentor someone in your field or share your expertise for free." },
                    { title: "Organize a Community Event", difficulty: "Hard", duration: "1 week", description: "Plan and execute a community cleanup, food drive, or social gathering." },
                    { title: "Give Blood", difficulty: "Medium", duration: "1 hour", description: "Donate blood at your local blood bank. One donation can save three lives." },
                    { title: "Cook for a Neighbor", difficulty: "Medium", duration: "2 hours", description: "Prepare a home-cooked meal and deliver it to an elderly or busy neighbor." }
                ].map((challenge, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gradz-stone hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full ${
                                challenge.difficulty === 'Easy' ? 'bg-gradz-matcha/20 text-gradz-matcha' :
                                challenge.difficulty === 'Medium' ? 'bg-gradz-peach/20 text-gradz-peach' :
                                'bg-gradz-orange/20 text-gradz-orange'
                            }`}>
                                {challenge.difficulty}
                            </span>
                            <span className="text-xs text-gradz-charcoal/50">{challenge.duration}</span>
                        </div>
                        <h3 className="text-2xl font-serif text-gradz-green mb-3">{challenge.title}</h3>
                        <p className="text-gradz-charcoal/80 leading-relaxed">{challenge.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gradz-peach/20 border border-gradz-peach/50 p-12 rounded-[3rem] text-center mt-16">
                <h2 className="text-3xl md:text-4xl font-serif text-gradz-green mb-4">Challenge yourself daily</h2>
                <p className="text-xl text-gradz-charcoal/80 mb-8">Track your progress and build a streak with the Gradz app.</p>
                <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} variant="primary">
                    Download Now
                </Button>
            </div>
        </div>
    </div>
);

const ViewMindfulLectures = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
                <Badge text="Feature" color="blue" />
                <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-8">Mindful Lectures</h1>
                <p className="text-xl md:text-2xl text-gradz-charcoal/70 leading-relaxed max-w-3xl mx-auto">
                    Over 50 in-depth articles covering the science of kindness, building self-compassion, creating meaningful connections, and more.
                </p>
            </div>

            <div className="grid gap-8">
                {[
                    {
                        title: "The Neuroscience of Kindness",
                        category: "Science",
                        readTime: "8 min read",
                        description: "Discover how acts of kindness release oxytocin, reduce cortisol, and trigger the brain's reward centers. Learn the biological mechanisms that make kindness so powerful for both giver and receiver."
                    },
                    {
                        title: "Building Self-Compassion",
                        category: "Psychology",
                        readTime: "10 min read",
                        description: "Self-compassion isn't self-indulgence—it's a critical foundation for mental health. Explore research-backed techniques to treat yourself with the same kindness you'd offer a good friend."
                    },
                    {
                        title: "The Ripple Effect: How One Act Changes Everything",
                        category: "Impact",
                        readTime: "6 min read",
                        description: "Kindness is contagious. Studies show that witnessing kindness makes us 3x more likely to perform kind acts ourselves. Understand the social dynamics of compassion."
                    },
                    {
                        title: "Gratitude Practices That Actually Work",
                        category: "Practice",
                        readTime: "12 min read",
                        description: "Beyond generic gratitude journals—discover evidence-based gratitude practices that measurably improve sleep quality, reduce anxiety, and increase overall life satisfaction."
                    },
                    {
                        title: "Empathy vs. Sympathy: Understanding the Difference",
                        category: "Emotional Intelligence",
                        readTime: "7 min read",
                        description: "Empathy connects. Sympathy creates distance. Learn to distinguish between these two responses and develop deeper, more meaningful connections with others."
                    },
                    {
                        title: "The Dark Side of Toxic Positivity",
                        category: "Mental Health",
                        readTime: "9 min read",
                        description: "Not all positive thinking is healthy. Understand the difference between genuine optimism and toxic positivity that invalidates real emotions and prevents healing."
                    },
                    {
                        title: "Mindfulness for Beginners",
                        category: "Meditation",
                        readTime: "11 min read",
                        description: "A practical, no-nonsense guide to starting a mindfulness practice. No spiritual jargon—just neuroscience-backed techniques for reducing stress and increasing present-moment awareness."
                    },
                    {
                        title: "Creating Meaningful Connections in a Digital Age",
                        category: "Relationships",
                        readTime: "10 min read",
                        description: "Social media promised connection but often delivers loneliness. Learn strategies to build authentic relationships in an increasingly digital world."
                    }
                ].map((lecture, i) => (
                    <div key={i} className="bg-white p-10 rounded-[2rem] shadow-lg border border-gradz-stone hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider bg-gradz-blue/20 text-gradz-blue px-4 py-2 rounded-full">
                                {lecture.category}
                            </span>
                            <span className="text-xs text-gradz-charcoal/50">{lecture.readTime}</span>
                        </div>
                        <h3 className="text-3xl font-serif text-gradz-green mb-4">{lecture.title}</h3>
                        <p className="text-lg text-gradz-charcoal/80 leading-relaxed">{lecture.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gradz-blue/20 border border-gradz-blue/30 p-12 rounded-[3rem] text-center mt-16">
                <h2 className="text-3xl md:text-4xl font-serif text-gradz-green mb-4">Deepen your understanding</h2>
                <p className="text-xl text-gradz-charcoal/80 mb-8">Access all 50+ lectures in the Gradz app.</p>
                <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} variant="primary">
                    Get Started
                </Button>
            </div>
        </div>
    </div>
);

const ViewStreakSystem = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
                <Badge text="Feature" color="orange" />
                <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-8">Streak System</h1>
                <p className="text-xl md:text-2xl text-gradz-charcoal/70 leading-relaxed max-w-3xl mx-auto">
                    Consistency builds habits. Track your daily engagement and watch your kindness practice grow. Research shows it takes 66 days to form a new habit.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gradz-matcha/20 p-10 rounded-[3rem] border border-gradz-matcha/30">
                    <h3 className="text-4xl font-bold text-gradz-green mb-4">Daily Check-ins</h3>
                    <p className="text-lg text-gradz-charcoal/80 mb-6">
                        Open the app each day to maintain your streak. Read your wisdom quote, complete a challenge, or browse a lecture—any engagement counts.
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradz-matcha rounded-full flex items-center justify-center text-white font-bold text-xl">✓</div>
                        <span className="text-gradz-charcoal/70">Mark your daily visit automatically</span>
                    </div>
                </div>

                <div className="bg-gradz-peach/20 p-10 rounded-[3rem] border border-gradz-peach/30">
                    <h3 className="text-4xl font-bold text-gradz-green mb-4">Milestone Rewards</h3>
                    <p className="text-lg text-gradz-charcoal/80 mb-6">
                        Reach key milestones and unlock achievements. Celebrate your commitment to personal growth.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradz-peach rounded-full flex items-center justify-center text-white text-sm">7</div>
                            <span className="text-gradz-charcoal/70">1 Week Streak</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradz-orange rounded-full flex items-center justify-center text-white text-sm">30</div>
                            <span className="text-gradz-charcoal/70">1 Month Streak</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradz-green rounded-full flex items-center justify-center text-white text-sm">100</div>
                            <span className="text-gradz-charcoal/70">100 Day Streak</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gradz-stone mb-16">
                <h2 className="text-4xl font-serif text-gradz-green mb-8 text-center">Why Streaks Work</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-gradz-matcha mb-4">66</div>
                        <p className="text-gradz-charcoal/80">Days to form a new habit (University College London study)</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-gradz-peach mb-4">2x</div>
                        <p className="text-gradz-charcoal/80">More likely to stick with goals when tracking progress</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-gradz-blue mb-4">92%</div>
                        <p className="text-gradz-charcoal/80">Of people fail at goals without accountability systems</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradz-green text-gradz-cream p-12 rounded-[3rem] text-center">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Start your streak today</h2>
                <p className="text-xl opacity-90 mb-8">Download Gradz and begin building your kindness habit.</p>
                <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} variant="white" className="!text-gradz-green">
                    Get Started
                </Button>
            </div>
        </div>
    </div>
);

const ViewPrivacy = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mb-8">Privacy Policy</h1>
            <p className="text-lg text-gradz-charcoal/60 mb-12">Last Updated: December 1, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Introduction</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        At Gradz, we believe privacy is a fundamental human right. This Privacy Policy explains how we collect, use, and protect your personal information when you use our wellness platform. We are committed to transparency and giving you control over your data.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Information We Collect</h2>
                    <h3 className="text-xl font-bold text-gradz-charcoal mb-3">Account Information</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">When you create an account, we collect your email address and chosen password (stored securely using industry-standard encryption).</p>

                    <h3 className="text-xl font-bold text-gradz-charcoal mb-3">Usage Data</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">We collect data about how you interact with Gradz, including which quotes you save, challenges you complete, and lectures you read. This helps us personalize your experience and improve our platform.</p>

                    <h3 className="text-xl font-bold text-gradz-charcoal mb-3">Device Information</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed">We automatically collect certain device information such as your IP address, browser type, operating system, and device identifiers. This information is used for security and analytics purposes.</p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">How We Use Your Information</h2>
                    <ul className="space-y-3 text-gradz-charcoal/80">
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> To provide and improve our services</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> To personalize your experience based on your preferences</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> To send you important updates about the platform (you can opt out of marketing emails)</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> To ensure platform security and prevent fraud</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> To comply with legal obligations</li>
                    </ul>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Data Sharing and Third Parties</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">
                        We do not sell your personal data to third parties. Period. We may share your information only in the following limited circumstances:
                    </p>
                    <ul className="space-y-3 text-gradz-charcoal/80">
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> With service providers who help us operate the platform (e.g., cloud hosting, analytics)</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> When required by law or to protect our legal rights</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> In the event of a merger, acquisition, or sale of assets (with notice to you)</li>
                    </ul>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Your Rights</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">You have the following rights regarding your personal data:</p>
                    <ul className="space-y-3 text-gradz-charcoal/80">
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> <strong>Access:</strong> Request a copy of your personal data</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> <strong>Correction:</strong> Request corrections to inaccurate data</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> <strong>Deletion:</strong> Request deletion of your account and associated data</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> <strong>Portability:</strong> Request your data in a machine-readable format</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> <strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                    </ul>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Data Security</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Contact Us</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at: <a href="mailto:privacy@gradz.app" className="text-gradz-green font-bold hover:underline">privacy@gradz.app</a>
                    </p>
                </section>
            </div>
        </div>
    </div>
);

const ViewTerms = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mb-8">Terms of Service</h1>
            <p className="text-lg text-gradz-charcoal/60 mb-12">Last Updated: December 1, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Agreement to Terms</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        By accessing and using Gradz, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Use License</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">
                        Gradz grants you a personal, non-transferable, non-exclusive license to access and use the platform for personal, non-commercial purposes. You may not:
                    </p>
                    <ul className="space-y-3 text-gradz-charcoal/80">
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> Modify, copy, or distribute platform content without permission</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> Use the platform for any commercial purpose without authorization</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> Attempt to reverse engineer or decompile any part of the platform</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> Remove any copyright or proprietary notations</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-peach font-bold">•</span> Transfer or sublicense your account to another person</li>
                    </ul>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">User Accounts</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Content and Intellectual Property</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        All content on Gradz, including text, graphics, logos, and software, is the property of Gradz or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not use any content without explicit permission.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Disclaimer</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        Gradz is a wellness platform and is not a substitute for professional medical, psychological, or therapeutic advice. The content provided is for informational and educational purposes only. Always seek the advice of qualified health professionals regarding any mental health concerns.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Limitation of Liability</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        Gradz and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for the service (if applicable).
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Modifications to Terms</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes via email or platform notification. Continued use of Gradz after changes constitutes acceptance of the modified terms.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Contact Information</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        For questions about these Terms of Service, contact us at: <a href="mailto:legal@gradz.app" className="text-gradz-green font-bold hover:underline">legal@gradz.app</a>
                    </p>
                </section>
            </div>
        </div>
    </div>
);

const ViewCookies = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mb-8">Cookie Policy</h1>
            <p className="text-lg text-gradz-charcoal/60 mb-12">Last Updated: December 1, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">What Are Cookies?</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience. Gradz uses cookies responsibly and transparently.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Types of Cookies We Use</h2>

                    <h3 className="text-xl font-bold text-gradz-charcoal mb-3 mt-6">Essential Cookies</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">
                        These cookies are necessary for the platform to function. They enable core functionality like user authentication, security features, and session management. You cannot opt out of essential cookies.
                    </p>

                    <h3 className="text-xl font-bold text-gradz-charcoal mb-3">Performance Cookies</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">
                        These cookies collect anonymous data about how users interact with Gradz. They help us understand which features are most popular, identify technical issues, and improve overall performance.
                    </p>

                    <h3 className="text-xl font-bold text-gradz-charcoal mb-3">Functional Cookies</h3>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        These cookies remember your preferences (such as language settings, theme choices, or saved quotes) to provide a personalized experience across sessions.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Third-Party Cookies</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">
                        Gradz uses select third-party services that may set their own cookies:
                    </p>
                    <ul className="space-y-3 text-gradz-charcoal/80">
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> <strong>Analytics:</strong> To understand user behavior and improve our platform</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> <strong>Hosting Services:</strong> For secure data storage and platform delivery</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-matcha font-bold">•</span> <strong>Authentication:</strong> For secure login and account management</li>
                    </ul>
                    <p className="text-gradz-charcoal/80 leading-relaxed mt-4">
                        We carefully vet all third-party providers to ensure they meet our privacy and security standards.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Managing Cookies</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed mb-4">
                        You have control over cookies. Most browsers allow you to:
                    </p>
                    <ul className="space-y-3 text-gradz-charcoal/80">
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> View which cookies are stored on your device</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> Delete all or specific cookies</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> Block third-party cookies</li>
                        <li className="flex items-start gap-3"><span className="text-gradz-blue font-bold">•</span> Block all cookies (though this may impact functionality)</li>
                    </ul>
                    <p className="text-gradz-charcoal/80 leading-relaxed mt-4">
                        Consult your browser's help documentation for instructions on managing cookies.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Updates to This Policy</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes and update the "Last Updated" date above.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gradz-stone">
                    <h2 className="text-3xl font-serif text-gradz-green mb-4">Questions?</h2>
                    <p className="text-gradz-charcoal/80 leading-relaxed">
                        If you have questions about our use of cookies, contact us at: <a href="mailto:privacy@gradz.app" className="text-gradz-green font-bold hover:underline">privacy@gradz.app</a>
                    </p>
                </section>
            </div>
        </div>
    </div>
);

function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  // --- GSAP Animations ---
  useGSAP(() => {
    // Setup QuickTo for smooth mouse movement
    xTo.current = gsap.quickTo(".hero-float", "x", { duration: 0.8, ease: "power3" });
    yTo.current = gsap.quickTo(".hero-float", "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        
        if (xTo.current && yTo.current) {
            xTo.current(x);
            yTo.current(y);
        }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: heroRef });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: View) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterLoading) return;

    setNewsletterLoading(true);
    try {
      await subscribeToNewsletter(newsletterEmail);
      navigateTo('newsletter-confirm');
      setNewsletterEmail('');
    } catch (error: any) {
      if (error.message === 'Email already subscribed') {
        alert('This email is already subscribed to our newsletter!');
      } else {
        alert('Failed to subscribe. Please try again.');
      }
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradz-cream text-gradz-charcoal font-sans selection:bg-gradz-peach selection:text-gradz-green overflow-x-hidden flex flex-col">
      <HappyDecorations />
      
      {/* --- Navigation --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-6'}`}>
        <div className="container mx-auto px-2 md:px-6 max-w-7xl">
          <nav className={`relative flex items-center justify-between px-3 md:px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-gradz-stone/50' : 'bg-transparent border border-transparent'}`}>

            {/* Logo Section */}
            <div onClick={() => navigateTo('home')} className="relative z-50 cursor-pointer group w-[120px] md:w-[180px] flex items-center h-10">
              <img
                src="/logo_gradz.png"
                alt="Gradz"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          
            {/* ... Rest der Navbar (Desktop Menu, Toggle, Actions) bleibt gleich ... */}
            <div className="hidden md:flex items-center gap-1 bg-white/40 p-1.5 rounded-full backdrop-blur-sm border border-white/50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm">
                {['home', 'mission', 'stories', 'community'].map((view) => (
                    <button 
                      key={view}
                      onClick={() => navigateTo(view as View)} 
                      className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeView === view ? 'bg-gradz-green text-white shadow-md transform scale-105' : 'text-gradz-charcoal/60 hover:text-gradz-green hover:bg-white'}`}
                    >
                      {view}
                    </button>
                ))}
            </div>
          
            <button 
                className="md:hidden z-50 w-10 h-10 flex items-center justify-center bg-gradz-stone/50 rounded-full ml-auto"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <div className="space-y-1.5">
                    <span className={`block w-6 h-0.5 bg-gradz-charcoal transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gradz-charcoal transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gradz-charcoal transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
            </button>
          
            <div className="hidden md:flex items-center gap-4">
               <Button onClick={() => navigateTo('join-club')} variant="black" className="!px-6 !py-2.5 !text-xs !h-auto">
                  Get Started
               </Button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-gradz-cream z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
            {['home', 'mission', 'stories', 'community'].map((view) => (
                <button
                    key={view}
                    onClick={() => navigateTo(view as View)}
                    className="text-5xl font-serif font-bold text-gradz-green hover:text-gradz-peach capitalize"
                >
                    {view}
                </button>
            ))}
            <Button onClick={() => navigateTo('join-club')} variant="black" className="!text-2xl !px-10 !py-4">
                Get Started
            </Button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow w-full">
        
        {activeView === 'home' && (
          <>
            {/* HERO SECTION */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">

              {/* THREE.JS FLUID BACKGROUND */}
              <FluidBackground />

              {/* POLAROID HERO */}
              <div className="absolute inset-0 w-full h-screen flex items-center justify-center z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-stone/30 via-white/50 to-stone/20"></div>

                <div className="relative w-full h-full max-w-[1600px] mx-auto px-6">
                  <div className="hero-float absolute top-[18%] left-[5%] w-64 md:w-72 lg:w-80 transform -rotate-12 hover:scale-105 hover:-rotate-6 transition-all duration-500 cursor-pointer shadow-2xl z-10 hidden md:block">
                    <div className="bg-white p-4 rounded-lg">
                      <img src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Friends together spreading joy" className="w-full aspect-square object-cover blur-sm" />
                    </div>
                  </div>

                  <div className="hero-float absolute bottom-[12%] right-[5%] w-64 md:w-72 lg:w-80 transform rotate-12 hover:scale-105 hover:rotate-6 transition-all duration-500 cursor-pointer shadow-2xl z-10 hidden md:block">
                    <div className="bg-white p-4 rounded-lg">
                      <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Capturing moments of kindness" className="w-full aspect-square object-cover blur-sm" />
                    </div>
                  </div>

                  <div className="hero-float absolute bottom-[18%] right-[28%] px-8 py-3 rounded-full shadow-xl rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer z-30" style={{ backgroundColor: '#E89F71' }}>
                    <span className="font-hand text-lg md:text-xl font-bold whitespace-nowrap" style={{ color: '#143328' }}>GOOD VIBES ONLY</span>
                  </div>
                </div>
              </div>

              <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
                
                {/* Giant Typography */}
                <div className="relative z-20 leading-[0.85] mb-12 select-none mt-10 px-4">
                    <div className="hero-float relative">
                        <h1 className="text-[12vw] md:text-[5.5rem] font-serif font-bold tracking-tighter text-gradz-green drop-shadow-md animate-fade-in-up">
                            Spread Kindness.
                        </h1>
                    </div>
                    <div className="hero-float relative z-10 -mt-3 md:-mt-6">
                        <h1 className="text-[13vw] md:text-[6rem] font-hand text-gradz-peach transform -rotate-3 drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            Feel
                        </h1>
                    </div>
                    <div className="hero-float relative -mt-3 md:-mt-6">
                        <h1 className="text-[12vw] md:text-[5.5rem] font-serif font-bold tracking-tighter text-gradz-green drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            The Difference.
                        </h1>
                    </div>
                </div>



                <div className="relative z-40 flex flex-col md:flex-row gap-5 mt-8 opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                    <Button onClick={() => document.getElementById('engine')?.scrollIntoView({behavior: 'smooth'})} variant="primary" withIcon className="text-lg px-12 py-6 shadow-2xl shadow-gradz-green/30">
                        Try It Now
                    </Button>
                    <Button onClick={() => navigateTo('mission')} variant="white" className="text-lg px-12 py-6 border border-gradz-stone text-gradz-charcoal">
                        Learn More
                    </Button>
                </div>

              </div>
            </section>

            {/* NEW: Dual Animated Marquee */}
            <CreativeMarquee />

            {/* REVEAL SECTION - Description with Scroll Animation */}
            <ScrollRevealText />

            {/* ENGINE SECTION */}
            <section id="engine" className="py-32 bg-gradz-cream relative overflow-hidden">
               <div className="container mx-auto px-4 relative z-10">
                  <KindnessGenerator />
               </div>
            </section>

            {/* SCROLLY TELLING SECTION */}
            <ScrollyTellingSection />

            {/* NEW: Voices of Reason (Pinned Horizontal Scroll) */}
            <VoicesHorizontalScroll />

            {/* NEW: Proof of Humanity (Parallax Grid) */}
            <ParallaxCommunity />
          </>
        )}

        {activeView === 'mission' && <ViewMission />}
        {activeView === 'stories' && <ViewStories />}
        {activeView === 'community' && <ViewCommunity />}
        {activeView === 'join-club' && <ViewJoinClub />}
        {activeView === 'newsletter-confirm' && <ViewNewsletterConfirm />}
        {activeView === 'wisdom-quotes' && <ViewWisdomQuotes />}
        {activeView === 'kindness-challenges' && <ViewKindnessChallenges />}
        {activeView === 'mindful-lectures' && <ViewMindfulLectures />}
        {activeView === 'streak-system' && <ViewStreakSystem />}
        {activeView === 'privacy' && <ViewPrivacy />}
        {activeView === 'terms' && <ViewTerms />}
        {activeView === 'cookies' && <ViewCookies />}

      </main>

      {/* --- PROFESSIONAL FOOTER --- */}
      <footer id="footer" className="bg-gradz-green pt-24 text-gradz-cream relative overflow-hidden mt-auto">
         {/* Top Curve */}
         <div className="absolute top-0 left-0 w-full h-12 bg-gradz-cream rounded-b-[3rem] z-10"></div>
         
         {/* Requested Right-Side Decorations are now here in the footer */}
         <div className="absolute top-20 right-10 animate-float opacity-20 pointer-events-none">
             <Smiley className="w-32 h-32 text-gradz-peach" />
         </div>
         <div className="absolute bottom-20 right-20 animate-spin-slow opacity-10 pointer-events-none">
             <Spiral className="w-40 h-40 text-gradz-orange" />
         </div>

         <div className="container mx-auto px-6 pb-12 relative z-10 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
               
               {/* Brand Column */}
<div className="lg:col-span-4">
   {/* Logo auf h-40 vergrößert (ca. 160px) */}
   <img src="/logo_gradz.png" alt="Gradz" className="h-40 mb-8 object-contain" />
   
   <h2 className="text-4xl font-serif mb-6 leading-tight">Spread Kindness.<br/>Feel The Difference.</h2>
   <p className="text-gradz-matcha/60 text-lg mb-8">A premium wellness platform cultivating kindness, positivity, and mental well-being through daily micro-practices.</p>
                  
                  {/* Newsletter Form */}
                  <form onSubmit={handleNewsletterSubmit} className="bg-white/5 p-1 rounded-full flex max-w-md border border-white/10 focus-within:border-gradz-matcha transition-colors">
                      <input
                        type="email"
                        placeholder="Get daily kindness prompts..."
                        className="bg-transparent flex-grow px-6 py-3 outline-none text-white placeholder:text-white/30 text-sm"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        disabled={newsletterLoading}
                      />
                      <button
                        type="submit"
                        className="bg-gradz-matcha text-gradz-green px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={newsletterLoading}
                      >
                        {newsletterLoading ? 'Joining...' : 'Join'}
                      </button>
                  </form>
               </div>
               
               {/* Links Columns */}
               <div className="lg:col-span-2 lg:col-start-7">
                  <h4 className="font-bold text-gradz-peach mb-6 uppercase tracking-widest text-xs">Platform</h4>
                  <ul className="space-y-4 opacity-80 text-sm">
                      <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home</button></li>
                      <li><button onClick={() => navigateTo('mission')} className="hover:text-white transition-colors">Mission</button></li>
                      <li><button onClick={() => navigateTo('stories')} className="hover:text-white transition-colors">Stories</button></li>
                      <li><button onClick={() => navigateTo('community')} className="hover:text-white transition-colors">Community</button></li>
                  </ul>
               </div>
               
               <div className="lg:col-span-2">
                  <h4 className="font-bold text-gradz-peach mb-6 uppercase tracking-widest text-xs">Features</h4>
                  <ul className="space-y-4 opacity-80 text-sm">
                      <li><button onClick={() => navigateTo('wisdom-quotes')} className="hover:text-white transition-colors">Daily Wisdom Quotes</button></li>
                      <li><button onClick={() => navigateTo('kindness-challenges')} className="hover:text-white transition-colors">50+ Kindness Challenges</button></li>
                      <li><button onClick={() => navigateTo('mindful-lectures')} className="hover:text-white transition-colors">Mindful Lectures</button></li>
                      <li><button onClick={() => navigateTo('streak-system')} className="hover:text-white transition-colors">Streak System</button></li>
                  </ul>
               </div>

               <div className="lg:col-span-2">
                  <h4 className="font-bold text-gradz-peach mb-6 uppercase tracking-widest text-xs">Legal</h4>
                  <ul className="space-y-4 opacity-80 text-sm">
                      <li><button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Privacy</button></li>
                      <li><button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">Terms</button></li>
                      <li><button onClick={() => navigateTo('cookies')} className="hover:text-white transition-colors">Cookie Policy</button></li>
                  </ul>
               </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest opacity-40">
               <p className="mb-4 md:mb-0">© 2025 GRADZ. VERSION 0.5 (MVP)</p>
               <div className="flex gap-6">
                   <span>PRIVACY-FIRST • AD-FREE FOREVER</span>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}

export default App;