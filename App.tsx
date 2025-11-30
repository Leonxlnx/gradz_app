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

type View = 'home' | 'mission' | 'stories' | 'community' | 'join-club' | 'newsletter-confirm';

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
            <Badge text="The Manifesto" color="matcha" />
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6 mb-8">The 2025 Protocol</h1>
            <p className="text-xl md:text-2xl text-gradz-charcoal/70 leading-relaxed">
                The digital age has connected us, but it hasn't necessarily made us closer. 
                We are rebooting human connection through serious intent and playful execution.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
             <div className="bg-gradz-cream p-10 rounded-[3rem] border border-gradz-stone">
                <h3 className="text-3xl font-serif text-gradz-green mb-4">1. Radical Noticing</h3>
                <p className="text-lg text-gradz-charcoal/80">Most "unkindness" is actually just distraction. We train you to lift your head up and actually see the humans around you.</p>
             </div>
             <div className="bg-white p-10 rounded-[3rem] border border-gradz-stone shadow-xl -rotate-1">
                <h3 className="text-3xl font-serif text-gradz-green mb-4">2. Action &gt; Sentiment</h3>
                <p className="text-lg text-gradz-charcoal/80">Feeling bad for someone does nothing. Feeling happy for someone does little. Doing something small changes everything.</p>
             </div>
             <div className="bg-white p-10 rounded-[3rem] border border-gradz-stone shadow-xl rotate-1">
                <h3 className="text-3xl font-serif text-gradz-green mb-4">3. Serious Fun</h3>
                <p className="text-lg text-gradz-charcoal/80">Altruism shouldn't feel like homework. It should feel like a heist. A reverse-heist where you leave good vibes behind.</p>
             </div>
             <div className="bg-gradz-peach/20 p-10 rounded-[3rem] border border-gradz-peach/50">
                <h3 className="text-3xl font-serif text-gradz-green mb-4">4. Ripple Effects</h3>
                <p className="text-lg text-gradz-charcoal/80">Mathematical chaos theory suggests a butterfly flapping its wings can cause a tornado. We believe a compliment can stop a war.</p>
             </div>
        </div>
    </div>
);

const ViewStories = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
         <div className="text-center mb-20 animate-fade-in-up">
            <Badge text="Field Reports" color="blue" />
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6">Kindness In The Wild</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { title: "The Coffee Chain", author: "Sarah J.", text: "I paid for the car behind me. The barista told me the streak lasted for 47 cars. 47 people smiled that morning." },
                { title: "The Lost Wallet", author: "Mike T.", text: "Found a wallet with $200. Returned it. The owner cried—it was his rent money. He invited me to dinner." },
                { title: "Flowers for Strangers", author: "Elena R.", text: "Bought a bouquet and handed single flowers to people looking sad on the subway. The vibe shift was palpable." },
                { title: "Garden Help", author: "Davie L.", text: "Saw my elderly neighbor struggling with leaves. Spent an hour raking. We drank lemonade and he told me about the war." },
                { title: "Library Notes", author: "Sam P.", text: "Hid encouraging notes in depressing books at the library. 'You are not alone' in a Kafka novel." },
                { title: "Rainy Day Umbrella", author: "Jessica K.", text: "Gave my umbrella to a lady with a baby waiting for the bus. I got soaked, but I felt electric." }
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
    </div>
);

const ViewCommunity = () => (
    <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="text-center mb-16 animate-fade-in-up">
            <Badge text="The Gallery" color="orange" />
            <h1 className="text-6xl md:text-8xl font-serif text-gradz-green mt-6">Faces of Peace</h1>
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
                <h1 className="text-5xl md:text-7xl font-serif text-gradz-green mb-6">Download Gradz</h1>
                <p className="text-lg text-gradz-charcoal/60">Choose your platform</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="relative bg-gray-100 p-10 rounded-3xl opacity-60 cursor-not-allowed">
                    <div className="absolute top-4 right-4 bg-gray-400 text-white text-xs px-3 py-1 rounded-full font-bold">Coming Soon</div>
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="h-14 mb-6 opacity-60"
                        />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">Google Play</h3>
                        <p className="text-gray-400 text-sm">Android</p>
                    </div>
                </div>

                <a
                    href="https://ukxandpzgxeebhkhpkow.supabase.co/storage/v1/object/public/apk-files/gradz%20VERSION%200.apk"
                    download="gradz-VERSION-0.apk"
                    className="group bg-gradz-green p-10 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    <div className="flex flex-col items-center text-center">
                        <svg className="w-16 h-16 text-white mb-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        <h3 className="text-xl font-bold text-white mb-2">APK Download</h3>
                        <p className="text-white/60 text-sm">Direct</p>
                    </div>
                </a>

                <div className="relative bg-gray-100 p-10 rounded-3xl opacity-60 cursor-not-allowed">
                    <div className="absolute top-4 right-4 bg-gray-400 text-white text-xs px-3 py-1 rounded-full font-bold">Coming Soon</div>
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                            alt="App Store"
                            className="h-14 mb-6 opacity-60"
                        />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">App Store</h3>
                        <p className="text-gray-400 text-sm">iOS</p>
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <nav className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-gradz-stone/50' : 'bg-transparent border border-transparent'}`}>
            
            {/* Logo Section */}
            {/* Wrapper-Breite angepasst auf 150px/180px */}
            <div onClick={() => navigateTo('home')} className="relative z-50 cursor-pointer group w-[150px] md:w-[180px] flex items-center h-10">
              <img
                src="/logo_gradz.png"
                alt="Gradz"
                // Neue Maße: w-[150px] h-[60px] (Mobil) und w-[180px] h-[75px] (Desktop)
                className="absolute top-1/2 left-0 -translate-y-1/2 w-[150px] h-[60px] md:w-[180px] md:h-[75px] object-contain transition-transform duration-500 group-hover:scale-110 origin-left"
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
                  Join Club
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
                  <div className="hero-float absolute top-[18%] left-[5%] w-64 md:w-72 lg:w-80 transform -rotate-12 hover:scale-105 hover:-rotate-6 transition-all duration-500 cursor-pointer shadow-2xl z-10">
                    <div className="bg-white p-4 rounded-lg">
                      <img src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Friends together spreading joy" className="w-full aspect-square object-cover" />
                    </div>
                  </div>

                  <div className="hero-float absolute bottom-[12%] right-[5%] w-64 md:w-72 lg:w-80 transform rotate-12 hover:scale-105 hover:rotate-6 transition-all duration-500 cursor-pointer shadow-2xl z-10">
                    <div className="bg-white p-4 rounded-lg">
                      <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Capturing moments of kindness" className="w-full aspect-square object-cover" />
                    </div>
                  </div>

                  <div className="hero-float absolute bottom-[18%] right-[28%] px-8 py-3 rounded-full shadow-xl rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer z-30" style={{ backgroundColor: '#E89F71' }}>
                    <span className="font-hand text-lg md:text-xl font-bold whitespace-nowrap" style={{ color: '#143328' }}>GOOD VIBES ONLY</span>
                  </div>
                </div>
              </div>

              <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
                
                {/* Giant Typography */}
                <div className="relative z-20 leading-[0.85] mb-12 select-none mix-blend-multiply mt-10">
                    <div className="hero-float relative">
                        <h1 className="text-[16vw] md:text-[11rem] font-serif font-medium tracking-tighter text-gradz-green">
                            Make Earth
                        </h1>
                    </div>
                    <div className="hero-float relative z-10 -mt-4 md:-mt-12">
                        <h1 className="text-[16vw] md:text-[12rem] font-hand text-gradz-peach transform -rotate-3">
                            Softer
                        </h1>
                    </div>
                    <div className="hero-float relative -mt-4 md:-mt-12">
                        <h1 className="text-[16vw] md:text-[11rem] font-serif font-medium tracking-tighter text-gradz-green">
                            Again.
                        </h1>
                    </div>
                </div>



                <div className="relative z-40 flex flex-col md:flex-row gap-5 mt-8 opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                    <Button onClick={() => document.getElementById('engine')?.scrollIntoView({behavior: 'smooth'})} variant="primary" withIcon className="text-lg px-12 py-6 shadow-2xl shadow-gradz-green/30">
                        Start Practice
                    </Button>
                    <Button onClick={() => navigateTo('mission')} variant="white" className="text-lg px-12 py-6 border border-gradz-stone text-gradz-charcoal">
                        Read Manifesto
                    </Button>
                </div>

              </div>
            </section>

            {/* NEW: Dual Animated Marquee */}
            <CreativeMarquee />

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
   
   <h2 className="text-4xl font-serif mb-6 leading-tight">The world is harsh.<br/>You don't have to be.</h2>
   <p className="text-gradz-matcha/60 text-lg mb-8">A project dedicated to the serious business of being nice.</p>
                  
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
                  <h4 className="font-bold text-gradz-peach mb-6 uppercase tracking-widest text-xs">Resources</h4>
                  <ul className="space-y-4 opacity-80 text-sm">
                      <li><a href="#" className="hover:text-white transition-colors">Kindness API</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Teacher Kit</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Posters</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Merch (Non-Profit)</a></li>
                  </ul>
               </div>

               <div className="lg:col-span-2">
                  <h4 className="font-bold text-gradz-peach mb-6 uppercase tracking-widest text-xs">Legal</h4>
                  <ul className="space-y-4 opacity-80 text-sm">
                      <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                  </ul>
               </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest opacity-40">
               <p className="mb-4 md:mb-0">© 2025 GRADZ INC. ALL RIGHTS RESERVED.</p>
               <div className="flex gap-6">
                   <span>DESIGNED WITH ♥ + AI</span>
                   <span>SF • NY • LDN</span>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}

export default App;