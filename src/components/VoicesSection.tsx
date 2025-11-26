import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QuoteCard } from './UI';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    quote: "In a world where you can be anything, be kind.",
    author: "Jennifer Dukes Lee",
    color: "butter" as const,
    rotation: -3,
  },
  {
    quote: "Kindness is the language which the deaf can hear and the blind can see.",
    author: "Mark Twain",
    color: "peach" as const,
    rotation: 2,
  },
  {
    quote: "No act of kindness, no matter how small, is ever wasted.",
    author: "Aesop",
    color: "lilac" as const,
    rotation: -2,
  },
  {
    quote: "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.",
    author: "Princess Diana",
    color: "matcha" as const,
    rotation: 3,
  },
  {
    quote: "Be kind whenever possible. It is always possible.",
    author: "Dalai Lama",
    color: "butter" as const,
    rotation: -4,
  },
];

export default function VoicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth * 1.2}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-cream via-matcha/10 to-peach/10">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="absolute top-12 left-16 md:left-24 lg:left-32 z-20 max-w-md">
          <div className="mb-6 inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2" style={{ backgroundColor: '#D4A5C4', borderColor: '#143328' }}>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#143328' }}>VOICES OF REASON</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight" style={{ color: '#143328' }}>
            Wisdom
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-hand mb-4" style={{ color: '#E89F71' }}>
            From The
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight" style={{ color: '#143328' }}>
            Greats.
          </h2>
          <p className="text-base md:text-lg font-medium leading-relaxed max-w-sm" style={{ color: '#143328' }}>
            A collection of sticky notes to remind you that kindness isn't soft—it's the hardest, most necessary thing we do.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#143328' }}>SCROLL</span>
            <div className="flex gap-1">
              <div className="w-8 h-0.5" style={{ backgroundColor: '#143328' }}></div>
              <div className="w-4 h-0.5" style={{ backgroundColor: '#143328', opacity: 0.5 }}></div>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-10 px-12 items-center absolute left-0"
          style={{ paddingLeft: '40vw', willChange: 'transform' }}
        >
          {quotes.map((quote, index) => (
            <div key={index} className="flex-shrink-0 w-[420px]">
              <QuoteCard
                quote={quote.quote}
                author={quote.author}
                color={quote.color}
                rotation={quote.rotation}
              />
            </div>
          ))}
          <div className="flex-shrink-0 w-[300px]" />
        </div>
      </div>
    </div>
  );
}
