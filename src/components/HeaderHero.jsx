import React, { useMemo } from 'react';
import Spline from '@splinetool/react-spline';

// Single coin SVG with metallic rim and embossed Solana tri-bar logo
function SolanaCoin({ size = 56, rotation = 0, delay = 0, duration = 8, x = '0%' }) {
  const id = useMemo(() => Math.random().toString(36).slice(2), []);
  const rimGradientId = `rim-${id}`;
  const faceGradientId = `face-${id}`;
  const specMaskId = `spec-${id}`;

  const fallStyle = {
    position: 'absolute',
    left: x,
    transform: `translateX(-50%) rotate(${rotation}deg)`,
    animation: `fall-${id} ${duration}s linear ${delay}s infinite`,
    willChange: 'transform, opacity',
  };

  return (
    <div style={fallStyle} className="pointer-events-none">
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={faceGradientId} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="60%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#141414" />
          </radialGradient>
          <conicGradient id={rimGradientId} />
          <linearGradient id={specMaskId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id={`emboss-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="1" result="offOut"/>
            <feGaussianBlur in="offOut" stdDeviation="1" result="blurOut"/>
            <feComposite in="SourceGraphic" in2="blurOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
          </filter>
        </defs>

        {/* Rim */}
        <circle cx="50" cy="50" r="49" fill="none" stroke="url(#faceGradientId)" strokeWidth="2" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#faceGradientId)" strokeWidth="1" opacity="0.5" />

        {/* Face */}
        <circle cx="50" cy="50" r="44" fill={`url(#${faceGradientId})`} />

        {/* Solana tri-bar logo (embossed) */}
        <g filter={`url(#emboss-${id})`}>
          <linearGradient id={`sol-${id}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14F195"/>
            <stop offset="50%" stopColor="#A066FF"/>
            <stop offset="100%" stopColor="#00FFA3"/>
          </linearGradient>
          {/* Top bar */}
          <path d="M30 37 h40 a3 3 0 0 1 3 3 v4 a3 3 0 0 1 -3 3 h-38 a3 3 0 0 1 -2.4 -1.2 l-4 -5.2 a2 2 0 0 1 1.6 -3.1 z" fill={`url(#sol-${id})`} opacity="0.95" />
          {/* Middle bar */}
          <path d="M27 48 h40 a3 3 0 0 1 3 3 v4 a3 3 0 0 1 -3 3 h-38 a3 3 0 0 1 -2.4 -1.2 l-4 -5.2 a2 2 0 0 1 1.6 -3.1 z" fill={`url(#sol-${id})`} opacity="0.95" />
          {/* Bottom bar */}
          <path d="M24 59 h40 a3 3 0 0 1 3 3 v4 a3 3 0 0 1 -3 3 h-38 a3 3 0 0 1 -2.4 -1.2 l-4 -5.2 a2 2 0 0 1 1.6 -3.1 z" fill={`url(#sol-${id})`} opacity="0.95" />
        </g>

        {/* Specular sweep */}
        <g style={{ mixBlendMode: 'screen' }}>
          <ellipse cx="50" cy="50" rx="40" ry="44" fill={`url(#${specMaskId})`} opacity="0.15">
            <animate attributeName="x" from="-100" to="100" dur={`${duration}s`} repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Fine rim highlight */}
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      </svg>

      <style>{`
        @keyframes fall-${id} {
          0% { transform: translate(-50%, -120%) rotate(${rotation}deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(-50%, 120vh) rotate(${rotation + 360}deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function CoinLane({ side = 'left' }) {
  const laneX = side === 'left' ? '20%' : side === 'right' ? '80%' : '50%';
  const coins = Array.from({ length: 7 }).map((_, i) => {
    const size = 40 + Math.round(Math.random() * 28);
    const rot = Math.round(Math.random() * 180) - 90;
    const delay = Math.random() * 6;
    const duration = 7 + Math.random() * 5;
    return (
      <SolanaCoin key={`${side}-${i}`} size={size} rotation={rot} delay={delay} duration={duration} x={laneX} />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{coins}</div>;
}

export default function HeaderHero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-black">
      {/* Spline background (full cover) */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient tint + vignette (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b0f]/30 via-transparent to-[#0b0b0f]/70" />
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 -120px 160px rgba(0,0,0,0.65), inset 0 40px 100px rgba(203,183,255,0.18)' }} />

      {/* Coin rain: left, center, right lanes */}
      <CoinLane side="left" />
      <CoinLane side="center" />
      <CoinLane side="right" />

      {/* Hero copy */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]"></span>
              ClaimYourSOL 2.0
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
              Batch-claim SOL airdrops with confidence
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
              A clean, pastel interface with real-time visual feedback. Connect, simulate, and claim across multiple accounts in one go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
