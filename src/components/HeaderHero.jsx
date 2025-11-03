import React from 'react';
import Spline from '@splinetool/react-spline';
import { ShieldCheck, Wallet } from 'lucide-react';

// Single coin with Solana-inspired tri-bar accent
const SolanaCoin = ({ side = 'left', top, delay, duration, offset = 0 }) => (
  <div
    className={`absolute ${
      side === 'left'
        ? '-left-4 md:left-4'
        : side === 'right'
        ? '-right-4 md:right-4'
        : 'left-1/2 -translate-x-1/2'
    } pointer-events-none`}
    style={{ top, transform: side === 'center' ? `translateX(calc(-50% + ${offset}px))` : undefined }}
    aria-hidden
  >
    <div
      className="relative w-8 h-8 md:w-10 md:h-10 rounded-full"
      style={{
        animation: `fall ${duration}s linear ${delay}s infinite`,
        background:
          'radial-gradient(55% 55% at 35% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.05) 60%), conic-gradient(from 120deg, #14F195, #9945FF, #14F195)',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow:
          'inset 0 1px 6px rgba(255,255,255,0.45), 0 10px 36px rgba(153,69,255,0.25), 0 6px 26px rgba(20,241,149,0.18)'
      }}
    >
      {/* Solana tri-bars */}
      <span
        className="absolute left-1.5 right-1.5 h-1.5 rounded-[6px]"
        style={{
          top: '26%',
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, #14F195, #80FFE8 40%, #7A5CFF, #9945FF)'
        }}
      />
      <span
        className="absolute left-1.5 right-1.5 h-1.5 rounded-[6px]"
        style={{
          top: '45%',
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, #14F195, #80FFE8 40%, #7A5CFF, #9945FF)'
        }}
      />
      <span
        className="absolute left-1.5 right-1.5 h-1.5 rounded-[6px]"
        style={{
          top: '64%',
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, #14F195, #80FFE8 40%, #7A5CFF, #9945FF)'
        }}
      />
    </div>
  </div>
);

// Animated Solana-themed tokens falling down sides and center
const FallingCoins = () => (
  <div className="absolute inset-y-0 left-0 right-0 pointer-events-none" aria-hidden>
    <style>{`
      @keyframes fall {
        0% { transform: translateY(-20%) rotate(0deg); opacity: .0; }
        10% { opacity: .95; }
        100% { transform: translateY(120%) rotate(360deg); opacity: .0; }
      }
    `}</style>

    {/* Side glows to frame the hero */}
    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#9945FF22] to-transparent blur-2xl" />
    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#14F19522] to-transparent blur-2xl" />

    {/* Left column tokens */}
    {[...Array(6)].map((_, i) => (
      <SolanaCoin
        key={`l-${i}`}
        side="left"
        top={`${-12 + i * 15}%`}
        duration={8 + i}
        delay={i * 0.7}
      />
    ))}

    {/* Right column tokens */}
    {[...Array(6)].map((_, i) => (
      <SolanaCoin
        key={`r-${i}`}
        side="right"
        top={`${-6 + i * 17}%`}
        duration={7 + i}
        delay={i * 0.65}
      />
    ))}

    {/* Center column tokens with slight horizontal jitter for depth */}
    {[...Array(7)].map((_, i) => (
      <SolanaCoin
        key={`c-${i}`}
        side="center"
        top={`${-10 + i * 14}%`}
        duration={6.5 + i * 0.8}
        delay={i * 0.6}
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
          {/* Falling Solana tokens layer (sides + center) */}
          <FallingCoins />
        </div>

        {/* Bottom meta over the animation */}
        <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/70">Taxa mostrada aqui antes de conectar</p>
            <p className="text-white text-2xl md:text-3xl font-semibold">3.0% <span className="text-white/60 text-base align-middle">(máx 5%)</span></p>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-xs md:text-sm font-mono bg-white/5 px-2 py-1 rounded-lg border border-white/10">Solana tokens caindo no centro</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
