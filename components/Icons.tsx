import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="#143328"/>
    <path d="M25 42C34.3888 42 42 34.3888 42 25C42 15.6112 34.3888 8 25 8C15.6112 8 8 15.6112 8 25C8 34.3888 15.6112 42 25 42Z" fill="#FDFCF8"/>
    <path d="M25 35C30.5228 35 35 30.5228 35 25C35 19.4772 30.5228 15 25 15C19.4772 15 15 19.4772 15 25C15 30.5228 19.4772 35 25 35Z" fill="#D4E09B"/>
    <path d="M25 29C27.2091 29 29 27.2091 29 25C29 22.7909 27.2091 21 25 21C22.7909 21 21 22.7909 21 25C21 27.2091 22.7909 29 25 29Z" fill="#143328"/>
  </svg>
);

export const Sparkle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
);

export const Star = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
);

export const Flower = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4V9H19C20.1 9 21 9.9 21 11C21 12.1 20.1 13 19 13H14V18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18V13H5C3.9 13 3 12.1 3 11C3 9.9 3.9 9 5 9H10V4C10 2.9 10.9 2 12 2ZM12 0C9.8 0 8 1.8 8 4V7H5C2.8 7 1 8.8 1 11C1 13.2 2.8 15 5 15H8V18C8 20.2 9.8 22 12 22C14.2 22 16 20.2 16 18V15H19C21.2 15 23 13.2 23 11C23 8.8 21.2 7 19 7H16V4C16 1.8 14.2 0 12 0Z"/>
    <circle cx="12" cy="11" r="2" fill="white"/>
  </svg>
);

export const Sunburst = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0L56 34L90 20L70 50L90 80L56 66L50 100L44 66L10 80L30 50L10 20L44 34L50 0Z" fill="currentColor"/>
  </svg>
);

export const Squiggle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
    <path d="M5 10Q20 25 35 10T65 10T95 10"/>
  </svg>
);

export const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const Heart = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
  </svg>
);

export const Hand = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
);

export const Peace = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 22v-10"></path>
    <path d="M12 12L5.5 19.5"></path>
    <path d="M12 12l6.5 7.5"></path>
  </svg>
);

export const ScribbleUnderline = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C40 5 80 20 120 10C160 0 198 15 198 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export const ScribbleLoop = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
     <path d="M20 40C10 20 40 10 60 30C80 50 40 80 30 60C20 40 60 20 80 40" strokeLinecap="round"/>
  </svg>
);

export const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H17.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H8.0166V21H5.0166Z"/>
  </svg>
);

export const AbstractShape = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.5 15.5C124.5 -8.5 176.5 -0.5 189.5 38.5C202.5 77.5 174.5 111 164.5 139C154.5 167 175.5 195.5 145.5 198.5C115.5 201.5 87 177.5 58 174.5C29 171.5 -9 203.5 1.5 167C12 130.5 67 139.5 72.5 98.5C78 57.5 72.5 39.5 98.5 15.5Z" fill="currentColor"/>
    </svg>
);

export const Spiral = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M50 50 C 50 50, 60 40, 60 50 C 60 60, 40 60, 40 50 C 40 30, 70 30, 70 50 C 70 80, 20 80, 20 50 C 20 10, 90 10, 90 50" />
    </svg>
);

export const Sun = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="6" />
        <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const Smiley = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);