export default function FluidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-stone animate-gradient" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-matcha/20 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-peach/15 to-transparent rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-gradient-radial from-butter/10 to-transparent rounded-full blur-3xl animate-float-fast" />
      </div>

      <div className="absolute inset-0 bg-noise opacity-[0.015]" />

      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fluid">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.002 0.003"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="60s"
                values="0.002 0.003;0.003 0.004;0.002 0.003"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#cream-gradient)" filter="url(#fluid)" />
      </svg>
    </div>
  );
}
