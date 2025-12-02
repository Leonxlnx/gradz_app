import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/authContext';
import { supabase } from '../../services/supabaseClient';
import type { Quote, Challenge, Lecture, DailyContent } from '../types';
import { FireIcon, HomeIcon, CollectionIcon, HealthIcon, SettingsIcon, QuoteIcon, TargetIcon, BookIcon, HeartIcon } from '../components/Icons';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { gradzUser, updateGradzUser } = useAuth();
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [dailyLecture, setDailyLecture] = useState<Lecture | null>(null);
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [quoteExpanded, setQuoteExpanded] = useState(false);
  const [challengeExpanded, setChallengeExpanded] = useState(false);
  const [lectureExpanded, setLectureExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyContent();
  }, [gradzUser]);

  const loadDailyContent = async () => {
    if (!gradzUser) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      let { data: existingContent } = await supabase
        .from('daily_content')
        .select('*')
        .eq('user_id', gradzUser.id)
        .eq('date', today)
        .maybeSingle();

      if (!existingContent) {
        const [quotesResult, challengesResult, lecturesResult] = await Promise.all([
          supabase.from('quotes').select('*'),
          supabase.from('challenges').select('*'),
          supabase.from('lectures').select('*'),
        ]);

        const randomQuote = quotesResult.data?.[Math.floor(Math.random() * (quotesResult.data?.length || 1))];
        const randomChallenge = challengesResult.data?.[Math.floor(Math.random() * (challengesResult.data?.length || 1))];
        const randomLecture = lecturesResult.data?.[Math.floor(Math.random() * (lecturesResult.data?.length || 1))];

        const { data: newContent } = await supabase
          .from('daily_content')
          .insert({
            user_id: gradzUser.id,
            date: today,
            quote_id: randomQuote?.id,
            challenge_id: randomChallenge?.id,
            lecture_id: randomLecture?.id,
            challenge_accepted: false,
            lecture_read: false,
          })
          .select()
          .single();

        existingContent = newContent;
      }

      if (existingContent) {
        setDailyContent(existingContent);

        const [quoteResult, challengeResult, lectureResult] = await Promise.all([
          existingContent.quote_id ? supabase.from('quotes').select('*').eq('id', existingContent.quote_id).single() : null,
          existingContent.challenge_id ? supabase.from('challenges').select('*').eq('id', existingContent.challenge_id).single() : null,
          existingContent.lecture_id ? supabase.from('lectures').select('*').eq('id', existingContent.lecture_id).single() : null,
        ]);

        setDailyQuote(quoteResult?.data || null);
        setDailyChallenge(challengeResult?.data || null);
        setDailyLecture(lectureResult?.data || null);
      }

      updateStreak();
    } catch (error) {
      console.error('Error loading daily content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStreak = async () => {
    if (!gradzUser) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActivity = gradzUser.last_activity;

    if (lastActivity !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = lastActivity === yesterday ? gradzUser.streak + 1 : 1;

      await updateGradzUser({
        streak: newStreak,
        last_activity: today,
      });
    }
  };

  const handleQuoteOpen = async () => {
    setQuoteExpanded(true);
    if (dailyQuote && gradzUser) {
      await supabase.from('user_collections').insert({
        user_id: gradzUser.id,
        item_type: 'quote',
        item_id: dailyQuote.id,
      });
    }
  };

  const handleChallengeAccept = async () => {
    if (!dailyContent || !dailyChallenge) return;

    await supabase
      .from('daily_content')
      .update({ challenge_accepted: true })
      .eq('id', dailyContent.id);

    await supabase.from('user_collections').insert({
      user_id: gradzUser!.id,
      item_type: 'challenge',
      item_id: dailyChallenge.id,
    });

    setDailyContent({ ...dailyContent, challenge_accepted: true });
  };

  const handleLectureRead = async () => {
    if (!dailyContent || !dailyLecture) return;

    await supabase
      .from('daily_content')
      .update({ lecture_read: true })
      .eq('id', dailyContent.id);

    await supabase.from('user_collections').insert({
      user_id: gradzUser!.id,
      item_type: 'lecture',
      item_id: dailyLecture.id,
    });

    setDailyContent({ ...dailyContent, lecture_read: true });
  };

  if (!gradzUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#143328] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#143328]/70">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#143328] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#143328]/70">Loading your daily content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 pb-24">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <header className="mb-6 md:mb-8 text-center animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
            <h1 className="text-3xl md:text-5xl font-serif text-[#143328] hover:scale-105 transition-transform duration-300">
              Hi, {gradzUser?.name}!
            </h1>
            {gradzUser && gradzUser.streak > 0 && (
              <div className="bg-gradient-to-r from-[#E8A87C] to-[#E89F71] text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-pulse-slow">
                <FireIcon className="w-6 h-6" />
                <span>{gradzUser.streak} days</span>
              </div>
            )}
          </div>
          <p className="text-base md:text-lg text-[#143328]/70">Your daily dose of kindness & positivity</p>
        </header>

        <section className="mb-6 md:mb-8 animate-slide-in-up">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-xl md:text-2xl font-serif text-[#143328] flex items-center gap-2 hover:gap-3 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#C9E4CA] to-[#87C38F] p-2 rounded-xl shadow-md">
                <QuoteIcon className="w-5 h-5 md:w-6 md:h-6 text-[#143328]" />
              </div>
              Daily Quote
            </h2>
          </div>
          <div
            onClick={() => !quoteExpanded && handleQuoteOpen()}
            className={`group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-2xl cursor-pointer hover:scale-[1.02] hover:shadow-[#C9E4CA]/30 transition-all duration-500 border-2 border-white/60 hover:border-[#C9E4CA]/40 overflow-hidden ${
              quoteExpanded ? 'ring-4 ring-[#C9E4CA]/30 scale-[1.02] border-[#C9E4CA]/50' : ''
            }`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#C9E4CA]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative">
            {dailyQuote ? (
              <>
                <p className={`text-lg italic text-[#143328]/80 mb-4 ${quoteExpanded ? '' : 'line-clamp-2'}`}>
                  "{dailyQuote.text}"
                </p>
                <p className="font-bold text-[#143328]">— {dailyQuote.author}</p>
                {!quoteExpanded && (
                  <p className="text-sm text-[#143328]/50 mt-4">Tap to expand & save to collection</p>
                )}
                {quoteExpanded && (
                  <div className="mt-4 text-sm text-green-600 font-bold flex items-center gap-2">
                    <span className="inline-block w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                    Added to your collection
                  </div>
                )}
              </>
            ) : (
              <p className="text-[#143328]/50">No quote available today</p>
            )}
            </div>
          </div>
        </section>

        <section className="mb-6 md:mb-8 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-xl md:text-2xl font-serif text-[#143328] flex items-center gap-2">
              <div className="bg-gradient-to-br from-[#E8A87C] to-[#E89F71] p-2 rounded-xl shadow-md">
                <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              Practice Kindness
            </h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div
              onClick={() => setChallengeExpanded(!challengeExpanded)}
              className="group relative bg-gradient-to-br from-[#C9E4CA]/70 to-[#C9E4CA]/40 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-2xl cursor-pointer hover:scale-[1.02] hover:shadow-[#C9E4CA]/50 transition-all duration-500 border-2 border-white/60 hover:border-[#C9E4CA]/60 overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-[#C9E4CA]/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#143328] flex items-center gap-2"><TargetIcon className="w-6 h-6" /> Challenge</h3>
                {dailyContent?.challenge_accepted && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Accepted ✓</span>
                )}
              </div>
              {dailyChallenge ? (
                <>
                  <h4 className="font-bold text-lg text-[#143328] mb-2">{dailyChallenge.title}</h4>
                  {challengeExpanded && (
                    <>
                      <p className="text-[#143328]/80 mb-4">{dailyChallenge.description}</p>
                      {!dailyContent?.challenge_accepted && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChallengeAccept();
                          }}
                          className="w-full bg-[#143328] text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                        >
                          Accept Challenge
                        </button>
                      )}
                    </>
                  )}
                  {!challengeExpanded && (
                    <p className="text-sm text-[#143328]/50 mt-2">Tap to see details</p>
                  )}
                </>
              ) : (
                <p className="text-[#143328]/50">No challenge available today</p>
              )}
              </div>
            </div>

            <div
              onClick={() => setLectureExpanded(!lectureExpanded)}
              className="group relative bg-gradient-to-br from-[#E8A87C]/70 to-[#E8A87C]/40 backdrop-blur-2xl p-5 md:p-6 rounded-3xl shadow-2xl cursor-pointer hover:scale-[1.02] hover:shadow-[#E8A87C]/50 transition-all duration-500 border-2 border-white/60 hover:border-[#E8A87C]/60 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#E8A87C]/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#143328] flex items-center gap-2"><BookIcon className="w-6 h-6" /> Lecture</h3>
                {dailyContent?.lecture_read && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Read ✓</span>
                )}
              </div>
              {dailyLecture ? (
                <>
                  <h4 className="font-bold text-lg text-[#143328] mb-2">{dailyLecture.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-[#143328]/60 mb-3">
                    <span>⏱️ {dailyLecture.read_time} min read</span>
                  </div>
                  {lectureExpanded && (
                    <>
                      <p className="text-[#143328]/80 mb-4 whitespace-pre-line">{dailyLecture.content}</p>
                      {!dailyContent?.lecture_read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLectureRead();
                          }}
                          className="w-full bg-[#143328] text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                        >
                          Mark as Read
                        </button>
                      )}
                    </>
                  )}
                  {!lectureExpanded && (
                    <p className="text-sm text-[#143328]/50 mt-2">Tap to read</p>
                  )}
                </>
              ) : (
                <p className="text-[#143328]/50">No lecture available today</p>
              )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <nav className="fixed bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-50 animate-slide-up">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-2xl border-2 border-white/60 rounded-3xl shadow-2xl px-4 md:px-8 py-3 md:py-4 hover:shadow-[#143328]/20 transition-all duration-500">
          <div className="flex justify-around items-center">
            <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 text-[#143328] transition-all duration-300 relative">
              <div className="bg-gradient-to-br from-[#143328] to-[#1a4d3d] p-3 rounded-2xl shadow-lg scale-110 hover:scale-125 transition-transform duration-300">
                <HomeIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 w-1 h-1 bg-[#143328] rounded-full"></div>
            </button>
            <button onClick={() => onNavigate('collection')} className="flex flex-col items-center gap-1 text-[#143328]/50 hover:text-[#143328] transition-all duration-300 hover:scale-110 active:scale-95">
              <div className="p-3 hover:bg-[#143328]/10 rounded-2xl transition-colors duration-300">
                <CollectionIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </button>
            <button onClick={() => onNavigate('health')} className="flex flex-col items-center gap-1 text-[#143328]/50 hover:text-[#143328] transition-all duration-300 hover:scale-110 active:scale-95">
              <div className="p-3 hover:bg-[#143328]/10 rounded-2xl transition-colors duration-300">
                <HealthIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </button>
            <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-[#143328]/50 hover:text-[#143328] transition-all duration-300 hover:scale-110 active:scale-95">
              <div className="p-3 hover:bg-[#143328]/10 rounded-2xl transition-colors duration-300">
                <SettingsIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out both;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.3s both;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
