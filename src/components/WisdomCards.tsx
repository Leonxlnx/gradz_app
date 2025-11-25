import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const wisdomQuotes = [
  {
    quote: "No act of kindness, no matter how small, is ever wasted.",
    author: "AESOP",
    color: "bg-butter/90",
    rotation: -2,
  },
  {
    quote: "Be a little kinder than you have to be.",
    author: "E. LOCKHART",
    color: "bg-lilac/80",
    rotation: 3,
  },
  {
    quote: "Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world.",
    author: "DESMOND TUTU",
    color: "bg-peach/80",
    rotation: -3,
  },
  {
    quote: "Kindness is the language which the deaf can hear and the blind can see.",
    author: "MARK TWAIN",
    color: "bg-matcha/80",
    rotation: 2,
  },
];

export default function WisdomCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const cards = gsap.utils.toArray('.wisdom-card');

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 100,
        rotation: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Parallax effect on scroll
      gsap.to(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: (i) => (i % 2 === 0 ? -50 : -30),
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-cream py-24 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-matcha/5 via-transparent to-peach/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-peach/30 rounded-full mb-6">
            <Quote className="w-5 h-5" style={{ color: '#143328' }} />
            <span className="font-hand text-base font-semibold" style={{ color: '#143328' }}>
              VOICES OF REASON
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight" style={{ color: '#143328' }}>
            Wisdom
            <br />
            <span className="font-hand" style={{ color: '#E89F71' }}>From The</span>
            <br />
            Greats.
          </h1>
          <p className="text-lg font-medium leading-relaxed" style={{ color: '#143328' }}>
            A collection of sticky notes to remind you that kindness isn't soft—it's the hardest, most necessary thing we do.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('wisdom-cards');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="mt-8 inline-flex items-center gap-2 text-base font-bold group"
            style={{ color: '#143328' }}
          >
            SCROLL
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Wisdom Cards Grid */}
        <div id="wisdom-cards" ref={scrollContainerRef} className="space-y-12">
          {/* First Row - 2 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {wisdomQuotes.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className={`wisdom-card ${item.color} p-12 rounded-3xl shadow-2xl border-2 hover:shadow-3xl transition-all duration-700 ease-out hover:scale-[1.02] relative overflow-hidden group`}
                style={{
                  borderColor: '#143328',
                  transform: `rotate(${item.rotation}deg)`,
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 opacity-20">
                  <Quote className="w-16 h-16" style={{ color: '#143328' }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <blockquote>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-8" style={{ color: '#143328' }}>
                      "{item.quote}"
                    </p>
                    <footer className="border-t-2 pt-6" style={{ borderColor: '#143328' }}>
                      <cite className="not-italic text-sm font-bold tracking-widest" style={{ color: '#143328' }}>
                        {item.author}
                      </cite>
                    </footer>
                  </blockquote>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700 rounded-3xl pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Second Row - 2 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {wisdomQuotes.slice(2, 4).map((item, index) => (
              <div
                key={index + 2}
                className={`wisdom-card ${item.color} p-12 rounded-3xl shadow-2xl border-2 hover:shadow-3xl transition-all duration-700 ease-out hover:scale-[1.02] relative overflow-hidden group`}
                style={{
                  borderColor: '#143328',
                  transform: `rotate(${item.rotation}deg)`,
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 opacity-20">
                  <Quote className="w-16 h-16" style={{ color: '#143328' }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <blockquote>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-8" style={{ color: '#143328' }}>
                      "{item.quote}"
                    </p>
                    <footer className="border-t-2 pt-6" style={{ borderColor: '#143328' }}>
                      <cite className="not-italic text-sm font-bold tracking-widest" style={{ color: '#143328' }}>
                        {item.author}
                      </cite>
                    </footer>
                  </blockquote>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700 rounded-3xl pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Your Turn Card */}
          <div className="max-w-2xl mx-auto mt-16">
            <div
              className="wisdom-card bg-white p-16 rounded-3xl shadow-2xl border-2 hover:shadow-3xl transition-all duration-700 ease-out hover:scale-[1.02] relative overflow-hidden group text-center"
              style={{
                borderColor: '#143328',
                transform: 'rotate(-1deg)',
              }}
            >
              {/* Decorative circle */}
              <div className="absolute top-12 right-12 opacity-10">
                <div className="w-32 h-32 rounded-full" style={{
                  border: '8px solid #143328',
                  animation: 'spin-slow 20s linear infinite'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="mb-8">
                  <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto opacity-20">
                    <circle cx="50" cy="50" r="35" stroke="#143328" strokeWidth="8" fill="none" strokeDasharray="10 5" />
                  </svg>
                </div>
                <h3 className="text-5xl md:text-6xl font-serif font-bold mb-6" style={{ color: '#143328' }}>
                  Your Turn.
                </h3>
                <p className="text-xl font-medium mb-10 max-w-md mx-auto leading-relaxed" style={{ color: '#143328' }}>
                  Add your voice to the chorus of kindness. Share what moves you.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
                >
                  Join the Movement
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
