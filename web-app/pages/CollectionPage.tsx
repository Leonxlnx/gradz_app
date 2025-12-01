import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/authContext';
import { supabase } from '../../services/supabaseClient';
import type { Quote, Challenge, Lecture, UserCollection } from '../types';

interface CollectionPageProps {
  onNavigate: (view: string) => void;
}

interface CollectionItem extends UserCollection {
  item?: Quote | Challenge | Lecture;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ onNavigate }) => {
  const { gradzUser } = useAuth();
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'quote' | 'challenge' | 'lecture'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, [gradzUser]);

  const loadCollections = async () => {
    if (!gradzUser) return;

    try {
      const { data: collectionsData } = await supabase
        .from('user_collections')
        .select('*')
        .eq('user_id', gradzUser.id)
        .order('collected_at', { ascending: false });

      if (collectionsData) {
        const itemsWithDetails = await Promise.all(
          collectionsData.map(async (collection) => {
            let item;
            if (collection.item_type === 'quote') {
              const { data } = await supabase.from('quotes').select('*').eq('id', collection.item_id).single();
              item = data;
            } else if (collection.item_type === 'challenge') {
              const { data } = await supabase.from('challenges').select('*').eq('id', collection.item_id).single();
              item = data;
            } else if (collection.item_type === 'lecture') {
              const { data } = await supabase.from('lectures').select('*').eq('id', collection.item_id).single();
              item = data;
            }
            return { ...collection, item };
          })
        );

        setCollections(itemsWithDetails);
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCollections = collections.filter((c) => filter === 'all' || c.item_type === filter);

  const renderItem = (item: CollectionItem) => {
    if (!item.item) return null;

    const baseClasses = "bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-4";

    if (item.item_type === 'quote') {
      const quote = item.item as Quote;
      return (
        <div key={item.id} className={baseClasses}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">💭</span>
            <div className="flex-1">
              <p className="text-lg italic text-[#143328]/80 mb-2">"{quote.text}"</p>
              <p className="font-bold text-[#143328]">— {quote.author}</p>
              <p className="text-xs text-[#143328]/50 mt-2">
                Collected {new Date(item.collected_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (item.item_type === 'challenge') {
      const challenge = item.item as Challenge;
      return (
        <div key={item.id} className={`${baseClasses} bg-[#C9E4CA]/40`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">🎯</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#143328] mb-2">{challenge.title}</h3>
              <p className="text-[#143328]/80 mb-2">{challenge.description}</p>
              <div className="flex items-center gap-2">
                <span className="bg-[#143328] text-white px-2 py-1 rounded text-xs font-bold">
                  {challenge.difficulty}
                </span>
                <span className="text-xs text-[#143328]/50">
                  Accepted {new Date(item.collected_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (item.item_type === 'lecture') {
      const lecture = item.item as Lecture;
      return (
        <div key={item.id} className={`${baseClasses} bg-[#E8A87C]/40`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">📚</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#143328] mb-2">{lecture.title}</h3>
              <p className="text-sm text-[#143328]/70 mb-2">⏱️ {lecture.read_time} min read</p>
              <p className="text-xs text-[#143328]/50">
                Read {new Date(item.collected_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#143328] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#143328]/70">Loading your collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8A87C]/20 via-white to-[#C9E4CA]/20 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[#143328] mb-2">Your Collection</h1>
          <p className="text-lg text-[#143328]/70">All the wisdom you've gathered</p>
        </header>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
              filter === 'all' ? 'bg-[#143328] text-white' : 'bg-white/80 text-[#143328]'
            }`}
          >
            All ({collections.length})
          </button>
          <button
            onClick={() => setFilter('quote')}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
              filter === 'quote' ? 'bg-[#143328] text-white' : 'bg-white/80 text-[#143328]'
            }`}
          >
            💭 Quotes ({collections.filter((c) => c.item_type === 'quote').length})
          </button>
          <button
            onClick={() => setFilter('challenge')}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
              filter === 'challenge' ? 'bg-[#143328] text-white' : 'bg-white/80 text-[#143328]'
            }`}
          >
            🎯 Challenges ({collections.filter((c) => c.item_type === 'challenge').length})
          </button>
          <button
            onClick={() => setFilter('lecture')}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
              filter === 'lecture' ? 'bg-[#143328] text-white' : 'bg-white/80 text-[#143328]'
            }`}
          >
            📚 Lectures ({collections.filter((c) => c.item_type === 'lecture').length})
          </button>
        </div>

        {filteredCollections.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-serif text-[#143328] mb-2">No items yet</h2>
            <p className="text-[#143328]/70 mb-6">
              Start collecting by opening quotes, accepting challenges, and reading lectures!
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-[#143328] text-white py-3 px-8 rounded-xl font-bold hover:scale-105 transition-all duration-300"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div>{filteredCollections.map(renderItem)}</div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-[#143328]/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-around">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-bold">Home</span>
          </button>
          <button onClick={() => onNavigate('collection')} className="flex flex-col items-center gap-1 text-[#143328]">
            <span className="text-2xl">📚</span>
            <span className="text-xs font-bold">Collection</span>
          </button>
          <button onClick={() => onNavigate('health')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">💪</span>
            <span className="text-xs font-bold">Health</span>
          </button>
          <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-[#143328]/50">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-bold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
