import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/authContext';
import { supabase } from '../../services/supabaseClient';
import type { Quote, Challenge, Lecture, DailyContent } from '../types';
import { FireIcon, HomeIcon, CollectionIcon, HealthIcon, SettingsIcon, QuoteIcon, TargetIcon, BookIcon } from '../components/Icons';

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
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-serif text-[#143328]">
              Hi, {gradzUser?.name}!
            </h1>
            {gradzUser && gradzUser.streak > 0 && (
              <div className="bg-[#E8A87C] text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <FireIcon className="w-6 h-6" />
                <span>{gradzUser.streak} days</span>
              </div>
            )}
          </div>
          <p className="text-lg text-[#143328]/70">Your daily dose of kindness & positivity</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-[#143328] mb-4 flex items-center gap-2"><QuoteIcon className="w-7 h-7" /> Daily Quote</h2>
          <div
            onClick={() => !quoteExpanded && handleQuoteOpen()}
            className={`bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-102 transition-all duration-300 ${
              quoteExpanded ? 'ring-4 ring-[#143328]/20' : ''
            }`}
          >
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
                  <div className="mt-4 text-sm text-green-600 font-bold">✓ Added to your collection</div>
                )}
              </>
            ) : (
              <p className="text-[#143328]/50">No quote available today</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-[#143328] mb-4">Practice Kindness</h2>

          <div className="space-y-6">
            <div
              onClick={() => setChallengeExpanded(!challengeExpanded)}
              className="bg-[#C9E4CA]/40 backdrop-blur-sm p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-102 transition-all duration-300"
            >
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

            <div
              onClick={() => setLectureExpanded(!lectureExpanded)}
              className="bg-[#E8A87C]/40 backdrop-blur-sm p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-102 transition-all duration-300"
            >
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
        </section>
      </div>

      <nav className="fixed bottom-6 left-6 right-6 z-50">
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-full shadow-2xl px-6 py-4">
          <div className="flex justify-around items-center">
            <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 text-[#143328] transition-all duration-300 scale-110">
              <div className="bg-[#143328] p-3 rounded-full">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
            </button>
            <button onClick={() => onNavigate('collection')} className="flex flex-col items-center gap-1 text-[#143328]/50 hover:text-[#143328] transition-all duration-300 hover:scale-110">
              <CollectionIcon className="w-6 h-6" />
            </button>
            <button onClick={() => onNavigate('health')} className="flex flex-col items-center gap-1 text-[#143328]/50 hover:text-[#143328] transition-all duration-300 hover:scale-110">
              <HealthIcon className="w-6 h-6" />
            </button>
            <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-[#143328]/50 hover:text-[#143328] transition-all duration-300 hover:scale-110">
              <SettingsIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
