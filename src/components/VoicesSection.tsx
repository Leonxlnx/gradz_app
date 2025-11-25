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
        <div className="absolute top-12 left-12 z-20 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-forest/20 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2" style={{ color: '#143328' }}>
            Voices of Reason
          </h2>
          <p className="text-base font-hand font-semibold" style={{ color: '#E89F71' }}>
            Words that move us forward
          </p>
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
