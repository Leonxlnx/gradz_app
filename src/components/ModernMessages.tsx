import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Plus, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Message {
  id: string;
  to_name: string;
  message: string;
  from_name: string;
  created_at: string;
}

const colors = ['bg-matcha/40', 'bg-peach/40', 'bg-lilac/40', 'bg-butter/40'];

// Mock messages data - simulating database
const mockMessages: Message[] = [
  {
    id: '1',
    to_name: 'Mom',
    message: 'Thank you for always believing in me, even when I doubted myself. Your unwavering support shaped who I am today.',
    from_name: 'Sarah',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    to_name: 'Mr. Johnson',
    message: 'Your patience and dedication as my teacher changed my life. You saw potential in me that I did not see in myself.',
    from_name: 'Alex M.',
    created_at: '2024-01-14'
  },
  {
    id: '3',
    to_name: 'Best Friend',
    message: 'You were there during my darkest days. Your friendship is a light that never dims.',
    from_name: 'Jamie',
    created_at: '2024-01-13'
  },
  {
    id: '4',
    to_name: 'Stranger at the café',
    message: 'You smiled at me when I was having the worst day. That small gesture meant everything.',
    from_name: 'Anonymous',
    created_at: '2024-01-12'
  },
  {
    id: '5',
    to_name: 'My Neighbor',
    message: 'Thank you for helping me carry groceries every week. Your kindness makes our community better.',
    from_name: 'Elena R.',
    created_at: '2024-01-11'
  },
  {
    id: '6',
    to_name: 'The World',
    message: 'Let\'s make kindness contagious. One small act at a time.',
    from_name: 'The Gradz Team',
    created_at: '2024-01-10'
  }
];

export default function ModernMessages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from('.message-card-modern', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [messages]);

  return (
    <div ref={sectionRef} className="py-32 px-6 bg-white relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-butter/10 via-transparent to-lilac/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-matcha/30 rounded-full mb-6 shadow-lg">
            <MessageCircle className="w-5 h-5" style={{ color: '#143328' }} />
            <span className="font-hand text-base font-semibold tracking-wide" style={{ color: '#143328' }}>
              Community Stories
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight" style={{ color: '#143328' }}>
            Messages of Kindness
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed" style={{ color: '#143328' }}>
            Real messages from real people making the world softer
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-base font-semibold" style={{ color: '#143328' }}>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border-2 shadow-xl" style={{ borderColor: '#143328' }}>
            <MessageCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#143328' }} />
            <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: '#143328' }}>
              Be the First!
            </h3>
            <p className="text-base font-medium mb-6" style={{ color: '#143328' }}>
              No messages yet. Be the first to spread kindness!
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
            >
              <Plus className="w-5 h-5" />
              Share Your Message
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`message-card-modern ${colors[index % colors.length]} p-8 rounded-3xl border-2 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-700 ease-out relative overflow-hidden group`}
                  style={{
                    borderColor: '#143328',
                    transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (1 + Math.random())}deg)`,
                  }}
                >
                  {/* Quote mark decoration */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-12 h-12" style={{ color: '#143328' }} />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-white/90 rounded-full text-xs font-bold border-2 shadow-sm" style={{ borderColor: '#143328', color: '#143328' }}>
                        To: {msg.to_name}
                      </span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed mb-6 font-semibold" style={{ color: '#143328' }}>
                      "{msg.message}"
                    </p>
                    <div className="flex justify-end border-t-2 pt-4" style={{ borderColor: '#143328' }}>
                      <span className="font-hand text-xl font-bold" style={{ color: '#143328' }}>
                        — {msg.from_name}
                      </span>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700 rounded-3xl pointer-events-none"></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-20">
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
              >
                <Plus className="w-6 h-6" />
                Share Your Own Message
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
