import React from 'react';
import { ArrowRight, QuoteIcon } from './Icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'peach' | 'outline' | 'white' | 'glass' | 'black';
  withIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, withIcon, ...props }) => {
  const baseStyles = "group relative px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2 justify-center transform active:scale-95 font-sans border border-transparent overflow-hidden";
  
  const variants = {
    primary: "bg-gradz-green text-white hover:bg-gradz-green/90 shadow-xl shadow-gradz-green/20 hover:shadow-2xl hover:-translate-y-1",
    black: "bg-gradz-charcoal text-white hover:bg-black shadow-xl hover:shadow-2xl hover:-translate-y-1",
    secondary: "bg-gradz-matcha text-gradz-green hover:bg-gradz-matcha/80 shadow-lg shadow-gradz-matcha/30 hover:-translate-y-1",
    peach: "bg-gradz-peach text-gradz-charcoal hover:bg-gradz-peach/90 shadow-lg shadow-gradz-peach/30 hover:-translate-y-1",
    white: "bg-white text-gradz-green hover:bg-gradz-cream shadow-lg hover:shadow-xl hover:-translate-y-1",
    glass: "bg-white/20 backdrop-blur-md text-gradz-green border-white/40 hover:bg-white/30 hover:border-white",
    outline: "bg-transparent text-gradz-green border-gradz-green hover:bg-gradz-green hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withIcon && <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

export const Sticker: React.FC<{ children: React.ReactNode; className?: string; rotate?: string; color?: string }> = ({ children, className = '', rotate='rotate-0', color='bg-gradz-butter' }) => (
  <div className={`inline-flex items-center justify-center ${color} text-gradz-charcoal rounded-full px-5 py-3 font-bold text-xs uppercase tracking-widest border-2 border-gradz-charcoal shadow-[3px_3px_0px_0px_rgba(45,42,38,1)] transform ${rotate} hover:scale-110 transition-transform duration-300 ${className} z-20 font-sans select-none cursor-default`}>
    {children}
  </div>
);

export const BigHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h1 className={`font-serif font-variation-settings-bold tracking-tight ${className}`}>
    {children}
  </h1>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-[2.5rem] bg-white border border-gradz-stone shadow-xl p-8 ${className}`}>
    {children}
  </div>
);

export const Badge = ({ text, color = 'peach' }: { text: string, color?: 'peach' | 'matcha' | 'lilac' | 'blue' | 'orange' }) => {
  const colors = {
    peach: 'bg-gradz-peach text-gradz-charcoal border-gradz-charcoal',
    orange: 'bg-gradz-orange text-white border-gradz-charcoal',
    matcha: 'bg-gradz-matcha text-gradz-green border-gradz-green',
    lilac: 'bg-gradz-lilac text-gradz-charcoal border-gradz-charcoal',
    blue: 'bg-gradz-blue text-gradz-charcoal border-gradz-charcoal',
  };
  
  return (
    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colors[color]} shadow-sm font-sans inline-block`}>
      {text}
    </span>
  );
};

export const Tape = ({ className }: { className?: string }) => (
  <div className={`absolute h-10 w-32 bg-white/60 backdrop-blur-sm border-l border-r border-white/70 transform ${className} z-20 shadow-sm mix-blend-overlay`}></div>
);

export const Polaroid = ({ src, alt, caption, rotate = "rotate-0", className = "" }: { src: string, alt: string, caption?: string, rotate?: string, className?: string }) => (
    <div className={`bg-white p-3 pb-10 shadow-2xl transform ${rotate} transition-all duration-500 hover:rotate-0 hover:z-30 hover:scale-110 relative ${className} border border-gray-100 flex-shrink-0`}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 rotate-1 backdrop-blur-sm border-l border-r border-white/40 opacity-80"></div>
        <div className="aspect-[4/5] overflow-hidden bg-gray-100 shadow-inner">
            <img src={src} alt={alt} className="w-full h-full object-cover filter contrast-110 hover:brightness-110 transition-all duration-500" loading="lazy" />
        </div>
        {caption && (
            <p className="absolute bottom-3 left-0 w-full text-center font-hand text-xl text-gradz-charcoal rotate-1 opacity-80">{caption}</p>
        )}
    </div>
);

export const PhotoGridItem = ({ src, className }: { src: string, className?: string }) => (
    <div className={`rounded-3xl overflow-hidden shadow-lg border-4 border-white ${className} hover:scale-[1.02] transition-transform duration-500`}>
        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
    </div>
);

export const QuoteCard = ({ quote, author }: { quote: string, author: string }) => (
    <div className="bg-gradz-cream p-8 md:p-12 rounded-[3rem] border border-gradz-stone relative">
        <QuoteIcon className="w-12 h-12 text-gradz-peach mb-6 opacity-50" />
        <p className="text-2xl md:text-4xl font-serif text-gradz-green leading-tight mb-6">
            {quote}
        </p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-gradz-charcoal/20"></div>
            <span className="text-sm font-bold uppercase tracking-widest text-gradz-charcoal/60">{author}</span>
        </div>
    </div>
);

export const StickyNote: React.FC<{ children: React.ReactNode, color?: string, rotate?: string, className?: string }> = ({ children, color = "bg-gradz-butter", rotate = "rotate-2", className = "" }) => (
    <div className={`p-8 shadow-xl ${color} ${rotate} ${className} relative transition-transform duration-300 hover:scale-105 hover:z-10`}>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm transform -rotate-1"></div>
        {children}
    </div>
);