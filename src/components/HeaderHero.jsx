import React from 'react';
import Spline from '@splinetool/react-spline';
import { ShieldCheck, Wallet } from 'lucide-react';

// Solana coin in "coin mode" with metallic rim and embossed tri-bar logo
const SolanaCoin = ({ lane = 'left', top, delay = 0, duration = 8, size = 40, offset = 0 }) => {
  const lanePosition =
    lane === 'left'
      ? '-left-4 md:left-6'
      : lane === 'right'
      ? '-right-4 md:right-6'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      className={`absolute ${lanePosition} pointer-events-none`}
      style={{ top, transform: lane === 'center' ? `translateX(calc(-50% + ${offset}px))` : undefined }}
      aria-hidden
    >
      <div
        className="relative rounded-full will-change-transform"
        style={{
          width: size,
          height: size,
          animation: `fall ${duration}s linear ${delay}s infinite`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 30px rgba(153,69,255,0.25), 0 6px 20px rgba(20,241,149,0.18)'
        }}
      >
        {/* Metallic holographic rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, #cbb7ff, #14F195, #80FFE8, #7A5CFF, #9945FF, #cbb7ff)',
            filter: 'saturate(115%)',
          }}
        />
        {/* Inner coin face */}
        <div
          className="absolute inset-[2px] rounded-full flex items-center justify-center"
          style={{
            background:
              'radial-gradient(60% 60% at 40% 35%, rgba(255,255,255,0.85), rgba(255,255,255,0.06) 60%), linear-gradient(140deg, rgba(203,183,255,0.25), rgba(20,241,149,0.12))',
            border: '1px solid rgba(255,255,255,0.45)',
            boxShadow:
              'inset 0 2px 8px rgba(255,255,255,0.35), inset 0 -8px 16px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(2px)'
          }}
        >
          {/* Embossed Solana tri-bars */}
          <div className="relative w-[70%] h-[70%]">
            <span
              className="absolute left-0 right-0 h-[16%] rounded-[8px]"
              style={{
                top: '16%',
                transform: 'skewX(-18deg)',
                background: 'linear-gradient(90deg, #14F195, #80FFE8 45%, #7A5CFF, #9945FF)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.35)'
              }}
            />
            <span
              className="absolute left-0 right-0 h-[16%] rounded-[8px]"
              style={{
                top: '42%',
                transform: 'skewX(-18deg)',
                background: 'linear-gradient(90deg, #14F195, #80FFE8 45%, #7A5CFF, #9945FF)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.35)'
              }}
            />
            <span
              className="absolute left-0 right-0 h-[16%] rounded-[8px]"
              style={{
                top: '68%',
                transform: 'skewX(-18deg)',
                background: 'linear-gradient(90deg, #14F195, #80FFE8 45%, #7A5CFF, #9945FF)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.35)'
              }}
            />
          </div>
        </div>

        {/* Subtle specular highlight sweep */}
        <div
          className="absolute -inset-[6%] rounded-full"
          style={{
            background: 'conic-gradient(from 210deg, transparent 0 25%, rgba(255,255,255,0.25) 26% 32%, transparent 33% 100%)',
            animation: `spec 4.5s ease-in-out ${delay + 0.4}s infinite`
          }}
        />
      </div>
    </div>
  );
};

// Falling lanes: sides + centered lane
const FallingCoins = () => (
  <div className="absolute inset-y-0 left-0 right-0 pointer-events-none" aria-hidden>
    <style>{`
      @keyframes fall {
        0% { transform: translateY(-25%) rotateZ(0deg) rotateY(0deg); opacity: 0; }
        10% { opacity: .95; }
        50% { transform: translateY(45%) rotateZ(140deg) rotateY(180deg); }
        100% { transform: translateY(120%) rotateZ(360deg) rotateY(360deg); opacity: 0; }
      }
      @keyframes spec {
        0% { opacity: 0; transform: rotate(0deg); }
        15% { opacity: .8; }
        35% { opacity: 0; }
        100% { transform: rotate(360deg); opacity: 0; }
      }
    `}</style>

    {/* Side glows */}
    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#9945FF22] to-transparent blur-2xl" />
    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#14F19522] to-transparent blur-2xl" />

    {/* Left lane */}
    {[...Array(6)].map((_, i) => (
      <SolanaCoin
        key={`l-${i}`}
        lane="left"
        top={`${-14 + i * 16}%`}
        duration={8 + i * 0.6}
        delay={i * 0.55}
        size={36 + (i % 3) * 4}
      />
    ))}

    {/* Right lane */}
    {[...Array(6)].map((_, i) => (
      <SolanaCoin
        key={`r-${i}`}
        lane="right"
        top={`${-10 + i * 17}%`}
        duration={7.5 + i * 0.6}
        delay={i * 0.5}
        size={36 + ((i + 1) % 3) * 4}
      />
    ))}

    {/* Center lane with slight horizontal jitter */}
    {[...Array(7)].map((_, i) => (
      <SolanaCoin
        key={`c-${i}`}
        lane="center"
        top={`${-12 + i * 14}%`}
        duration={6.8 + i * 0.7}
        delay={i * 0.48}
        size={40 + (i % 2) * 6}
        offset={(i % 2 === 0 ? -1 : 1) * (6 + i * 2)}
      />
    ))}
  </div>
);

const HeaderHero = ({ onConnect }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_80%_-10%,#CBB7FF30,transparent),linear-gradient(120deg,#CBB7FF10,#CFF7E010,#00000000)]">
      {/* Ambient glows (do not block pointer events) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#CBB7FF22] via-transparent to-[#CFF7E022] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl backdrop-blur bg-white/10 border border-white/20 shadow-sm shadow-[#CBB7FF]/40" />
          <div className="leading-tight">
            <p className="font-mono text-sm tracking-tight text-white/70">ClaimYourSOL</p>
            <h1 className="font-mono text-lg md:text-xl font-semibold text-white">2.0</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-xs text-white/70">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-300/90" />
            <span className="font-mono">Nunca acessamos seed / private key</span>
            <ShieldCheck size={14} className="text-emerald-300/80" />
          </div>
          <button
            onClick={onConnect}
            className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-[#2E2E2E] text-white border border-white/10 shadow-md shadow-[#CFF7E0]/20 hover:shadow-lg hover:shadow-[#CBB7FF]/20 transition">
            <Wallet size={18} className="opacity-80 group-hover:opacity-100" />
            <span className="font-semibold">Connect Wallet</span>
          </button>
        </div>
      </header>

      {/* Hero container - full-width cover Spline, no negative z-index */}
      <div className="relative z-0 h-[560px] md:h-[680px] lg:h-[760px]">
        <div className="absolute inset-0 overflow-hidden">
          <Spline
            scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          {/* Dark vertical fade for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b0b44] to-[#0b0b0bcc]" />
          {/* Falling Solana coins in coin mode */}
          <FallingCoins />
        </div>

        {/* Bottom meta over the animation */}
        <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/70">Taxa mostrada aqui antes de conectar</p>
            <p className="text-white text-2xl md:text-3xl font-semibold">3.0% <span className="text-white/60 text-base align-middle">(máx 5%)</span></p>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-xs md:text-sm font-mono bg-white/5 px-2 py-1 rounded-lg border border-white/10">Solana coins em modo moeda</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
