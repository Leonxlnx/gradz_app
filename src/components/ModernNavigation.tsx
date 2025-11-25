import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function ModernNavigation() {
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
      <a href="#main" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest focus:text-cream focus:rounded-lg">
        Skip to main content
      </a>

      <nav role="navigation" aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b-2 shadow-md transition-all duration-300" style={{ borderColor: '#143328' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-serif font-bold hover:scale-105 transition-transform" style={{ color: '#143328' }}>
              Gradz
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-matcha/20 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" style={{ color: '#143328' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: '#143328' }} />
              )}
            </button>

            <ul className="hidden md:flex items-center gap-8">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-base font-bold hover:text-peach transition-colors"
                  style={{ color: '#143328' }}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how')}
                  className="text-base font-bold hover:text-peach transition-colors"
                  style={{ color: '#143328' }}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('impact')}
                  className="text-base font-bold hover:text-peach transition-colors"
                  style={{ color: '#143328' }}
                >
                  Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('community')}
                  className="text-base font-bold hover:text-peach transition-colors"
                  style={{ color: '#143328' }}
                >
                  Community
                </button>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-xl text-sm font-bold border-2 hover:bg-forest/10 transition-all"
                  style={{ borderColor: '#143328', color: '#143328' }}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <ul className="flex flex-col gap-4">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-base font-bold hover:bg-matcha/20 transition-colors"
                    style={{ color: '#143328' }}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('how')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-base font-bold hover:bg-matcha/20 transition-colors"
                    style={{ color: '#143328' }}
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('impact')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-base font-bold hover:bg-matcha/20 transition-colors"
                    style={{ color: '#143328' }}
                  >
                    Impact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('community')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-base font-bold hover:bg-matcha/20 transition-colors"
                    style={{ color: '#143328' }}
                  >
                    Community
                  </button>
                </li>
                <li className="pt-4 border-t-2" style={{ borderColor: '#143328' }}>
                  <Link
                    to="/login"
                    className="block w-full text-center px-6 py-3 rounded-xl text-sm font-bold border-2 hover:bg-forest/10 transition-all mb-3"
                    style={{ borderColor: '#143328', color: '#143328' }}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-6 py-3 rounded-xl text-sm font-bold shadow-md"
                    style={{ backgroundColor: '#143328', color: '#FDFCF8' }}
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
