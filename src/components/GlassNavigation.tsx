import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function GlassNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <a href="#main" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', color: '#143328' }}>
        Skip to main content
      </a>

      <nav role="navigation" aria-label="Main navigation" className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-5xl">
        <div className="rounded-full px-4 py-2.5 shadow-xl border" style={{ background: 'rgba(253, 252, 248, 0.85)', backdropFilter: 'blur(20px)', borderColor: 'rgba(20, 51, 40, 0.08)' }}>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#143328' }}>
                <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: '#FDFCF8' }}></div>
              </div>
              <span className="text-lg md:text-xl font-serif font-bold" style={{ color: '#143328' }}>Gradz.</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" style={{ color: '#143328' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: '#143328' }} />
              )}
            </button>

            <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 border shadow-inner" style={{ background: 'rgba(20, 51, 40, 0.04)', borderColor: 'rgba(20, 51, 40, 0.08)' }}>
              <button
                onClick={() => scrollToSection('home')}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:bg-matcha/30"
                style={{ color: '#143328' }}
              >
                MISSION
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:bg-peach/30"
                style={{ color: '#143328' }}
              >
                STORIES
              </button>
              <button
                onClick={() => scrollToSection('impact')}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:bg-butter/30"
                style={{ color: '#143328' }}
              >
                IMPACT
              </button>
            </div>

            <Link
              to="/signup"
              className="hidden md:block px-5 py-2 rounded-full text-xs font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border"
              style={{ backgroundColor: '#143328', color: '#FDFCF8', borderColor: '#143328' }}
            >
              Join Club
            </Link>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 pb-4 pt-4 border-t border-white/20 animate-fade-in">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="px-5 py-3 rounded-full text-sm font-bold text-left"
                  style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
                >
                  HOME
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="px-5 py-3 rounded-full text-sm font-bold text-left hover:bg-white/20 transition-all"
                  style={{ color: '#143328' }}
                >
                  MISSION
                </button>
                <button
                  onClick={() => scrollToSection('community')}
                  className="px-5 py-3 rounded-full text-sm font-bold text-left hover:bg-white/20 transition-all"
                  style={{ color: '#143328' }}
                >
                  STORIES
                </button>
                <button
                  onClick={() => scrollToSection('impact')}
                  className="px-5 py-3 rounded-full text-sm font-bold text-left hover:bg-white/20 transition-all"
                  style={{ color: '#143328' }}
                >
                  COMMUNITY
                </button>
                <Link
                  to="/signup"
                  className="px-5 py-3 rounded-full text-sm font-bold text-center shadow-lg"
                  style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
                >
                  Join Club
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
