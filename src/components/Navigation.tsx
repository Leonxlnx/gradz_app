import { Button } from './UI';
import { Logo } from './Icons';

export default function Navigation() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-6">
      <div className="bg-cream/90 backdrop-blur-lg border border-forest/10 rounded-full px-6 py-2.5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-20 h-6 text-forest" />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-forest/70 hover:text-forest font-medium transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#how"
            className="text-sm text-forest/70 hover:text-forest font-medium transition-colors duration-300"
          >
            How It Works
          </a>
          <a
            href="#impact"
            className="text-sm text-forest/70 hover:text-forest font-medium transition-colors duration-300"
          >
            Impact
          </a>
          <a
            href="#community"
            className="text-sm text-forest/70 hover:text-forest font-medium transition-colors duration-300"
          >
            Community
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:block">
            Sign In
          </Button>
          <Button variant="primary">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
