import { SVGProps } from 'react';

export function Sun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50" r="18" fill="currentColor" />
      <path
        d="M50 8 L50 22 M50 78 L50 92 M92 50 L78 50 M22 50 L8 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M75 25 L66 34 M34 66 L25 75 M75 75 L66 66 M34 34 L25 25"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Flower(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse cx="50" cy="35" rx="12" ry="18" fill="currentColor" opacity="0.8" />
      <ellipse cx="65" cy="50" rx="18" ry="12" fill="currentColor" opacity="0.8" />
      <ellipse cx="50" cy="65" rx="12" ry="18" fill="currentColor" opacity="0.8" />
      <ellipse cx="35" cy="50" rx="18" ry="12" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
      <path
        d="M50 50 Q48 70, 45 90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M45 65 Q35 68, 30 70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 10 L55 40 L85 45 L55 50 L50 80 L45 50 L15 45 L45 40 Z"
        fill="currentColor"
      />
      <path
        d="M25 20 L27 28 L35 30 L27 32 L25 40 L23 32 L15 30 L23 28 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M75 65 L77 73 L85 75 L77 77 L75 85 L73 77 L65 75 L73 73 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 20 Q15 5, 25 20 T45 20 T65 20 T85 20 T105 20 L115 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Spiral(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 50 Q65 50, 65 35 Q65 20, 50 20 Q35 20, 35 35 Q35 50, 50 50 Q65 50, 70 40 Q75 30, 70 20 Q60 5, 45 10 Q25 15, 20 35 Q15 55, 30 70 Q45 82, 65 75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Smiley(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="35" cy="42" r="4" fill="currentColor" />
      <circle cx="65" cy="42" r="4" fill="currentColor" />
      <path
        d="M30 60 Q50 75, 70 60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="10"
        y="55"
        fontFamily="Fraunces, serif"
        fontSize="48"
        fontWeight="700"
        fill="currentColor"
        style={{ letterSpacing: '-0.02em' }}
      >
        Gradz
      </text>
      <path
        d="M165 25 L170 35 L180 40 L170 45 L165 55 L160 45 L150 40 L160 35 Z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="185" cy="25" r="8" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 85 C50 85, 15 60, 15 38 C15 25, 23 18, 32 18 C40 18, 47 23, 50 30 C53 23, 60 18, 68 18 C77 18, 85 25, 85 38 C85 60, 50 85, 50 85 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 10 L57 38 L85 38 L63 55 L70 83 L50 68 L30 83 L37 55 L15 38 L43 38 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cloud(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30 50 C20 50, 15 42, 18 35 C20 30, 25 28, 30 28 C30 20, 38 12, 48 12 C58 12, 65 18, 68 25 C73 23, 78 24, 82 28 C88 34, 87 43, 80 48 C85 48, 90 52, 90 58 C90 64, 85 68, 78 68 L35 68 C28 68, 23 63, 23 57 C23 53, 26 50, 30 50 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}
