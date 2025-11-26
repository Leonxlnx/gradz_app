import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
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

export default function ModernMessages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const { data, error } = await supabase
        .from('kindness_messages')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
    }

    loadMessages();
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
    <div ref={sectionRef} className="py-24 px-6 bg-gradient-to-br from-cream via-matcha/10 to-peach/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-matcha/30 rounded-full mb-4">
            <MessageCircle className="w-5 h-5" style={{ color: '#143328' }} />
            <span className="font-hand text-base font-semibold" style={{ color: '#143328' }}>
              Community Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#143328' }}>
            Messages of Kindness
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: '#143328' }}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`message-card-modern ${colors[index % colors.length]} p-6 rounded-2xl border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ease-out`}
                  style={{ borderColor: '#143328' }}
                >
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-bold border-2" style={{ borderColor: '#143328', color: '#143328' }}>
                      To: {msg.to_name}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed mb-4 font-semibold" style={{ color: '#143328' }}>
                    "{msg.message}"
                  </p>
                  <div className="flex justify-end">
                    <span className="font-hand text-lg font-bold" style={{ color: '#143328' }}>
                      — {msg.from_name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
              >
                <Plus className="w-5 h-5" />
                Share Your Own Message
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
