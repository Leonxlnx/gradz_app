import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'peach' | 'outline' | 'matcha';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-forest text-cream border-forest hover:bg-forest/90 shadow-sm hover:shadow-md',
    peach: 'bg-peach text-forest border-forest hover:bg-peach/90 shadow-sm hover:shadow-md',
    matcha: 'bg-matcha text-forest border-forest hover:bg-matcha/90 shadow-sm hover:shadow-md',
    outline: 'bg-cream text-forest border-forest hover:bg-forest hover:text-cream shadow-sm hover:shadow-md',
  };

  return (
    <button
      className={`px-5 py-2.5 text-sm rounded-full font-medium border-2 transition-all duration-300 ease-out ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  rotation?: 'none' | 'left' | 'right';
}

export function Card({ children, className = '', rotation = 'none' }: CardProps) {
  const rotations = {
    none: '',
    left: '-rotate-1',
    right: 'rotate-1',
  };

  return (
    <div
      className={`bg-white border-2 border-stone-200 rounded-[2.5rem] p-8 shadow-[0_8px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_0_0_rgba(0,0,0,0.08)] transition-all duration-300 ${rotations[rotation]} hover:rotate-0 bg-noise ${className}`}
    >
      {children}
    </div>
  );
}

interface StickerProps {
  children: ReactNode;
  color?: 'matcha' | 'peach' | 'butter' | 'lilac';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  className?: string;
}

export function Sticker({
  children,
  color = 'matcha',
  size = 'md',
  rotation = -3,
  className = ''
}: StickerProps) {
  const colors = {
    matcha: 'bg-matcha border-matcha/30',
    peach: 'bg-peach border-peach/30',
    butter: 'bg-butter border-butter/30',
    lilac: 'bg-lilac border-lilac/30',
  };

  const sizes = {
    sm: 'w-16 h-16 text-sm',
    md: 'w-24 h-24 text-base',
    lg: 'w-32 h-32 text-lg',
  };

  return (
    <div
      className={`${colors[color]} ${sizes[size]} rounded-full border-2 flex items-center justify-center font-hand text-forest shadow-[4px_4px_0_0_rgba(20,51,40,0.2)] ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}

interface TapeProps {
  children?: ReactNode;
  length?: 'short' | 'medium' | 'long';
  rotation?: number;
  className?: string;
}

export function Tape({ children, length = 'medium', rotation = -3, className = '' }: TapeProps) {
  const lengths = {
    short: 'w-20',
    medium: 'w-32',
    long: 'w-48',
  };

  return (
    <div
      className={`${lengths[length]} h-8 bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center font-hand text-xs text-forest/40 shadow-sm ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}

interface PolaroidProps {
  imageUrl?: string;
  caption: string;
  rotation?: number;
  className?: string;
}

export function Polaroid({ imageUrl, caption, rotation = 2, className = '' }: PolaroidProps) {
  return (
    <div
      className={`bg-white p-3 pb-16 shadow-[6px_6px_0_0_rgba(20,51,40,0.12)] hover:shadow-[8px_8px_0_0_rgba(20,51,40,0.18)] transition-all duration-500 ease-out hover:rotate-0 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={caption} className="w-full aspect-square object-cover mb-3" />
      ) : (
        <div className="w-full aspect-square bg-gradient-to-br from-matcha/20 to-peach/20 mb-3 flex items-center justify-center">
          <div className="w-16 h-16 bg-forest/10 rounded-full" />
        </div>
      )}
      <p className="font-hand text-base text-forest/80 text-center">{caption}</p>
    </div>
  );
}

interface QuoteCardProps {
  quote: string;
  author?: string;
  color?: 'butter' | 'peach' | 'matcha' | 'lilac';
  rotation?: number;
  className?: string;
}

export function QuoteCard({
  quote,
  author,
  color = 'butter',
  rotation = -2,
  className = ''
}: QuoteCardProps) {
  const colors = {
    butter: 'bg-butter/70',
    peach: 'bg-peach/70',
    matcha: 'bg-matcha/70',
    lilac: 'bg-lilac/70',
  };

  return (
    <div
      className={`${colors[color]} p-6 shadow-[4px_4px_0_0_rgba(20,51,40,0.12)] hover:shadow-[6px_6px_0_0_rgba(20,51,40,0.18)] transition-all duration-500 ease-out hover:rotate-0 bg-noise ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <blockquote className="text-forest">
        <p className="text-xl md:text-2xl font-serif italic leading-relaxed mb-3">
          "{quote}"
        </p>
        {author && (
          <footer className="font-hand text-lg text-forest/70 text-right">
            — {author}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
