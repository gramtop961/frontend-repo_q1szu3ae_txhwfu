import React from 'react';
import Spline from '@splinetool/react-spline';
import { ShieldCheck, Wallet } from 'lucide-react';

const SideCoins = () => (
  <div className="absolute inset-y-0 left-0 right-0 pointer-events-none" aria-hidden>
    <style>{`
      @keyframes fall {
        0% { transform: translateY(-20%) rotate(0deg); opacity: .0; }
        10% { opacity: .9; }
        100% { transform: translateY(120%) rotate(360deg); opacity: .0; }
      }
    `}</style>
    {/* Soft side gradients to frame the hero, never blocking interaction */}
    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#CBB7FF22] to-transparent blur-2xl" />
    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#CFF7E022] to-transparent blur-2xl" />

    {/* Left column coins */}
    {[...Array(6)].map((_, i) => (
      <div
        key={`l-${i}`}
        className="absolute -left-4 md:left-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#CBB7FF] to-[#CFF7E0] shadow-[0_0_30px_6px_rgba(203,183,255,0.25)]"
        style={{
          top: `${-10 + i * 15}%`,
          animation: `fall ${8 + i}s linear ${i * 0.8}s infinite`,
          filter: 'saturate(1.2)'
        }}
      />
    ))}

    {/* Right column coins */}
    {[...Array(6)].map((_, i) => (
      <div
        key={`r-${i}`}
        className="absolute -right-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#CFF7E0] to-[#CBB7FF] shadow-[0_0_30px_6px_rgba(207,247,224,0.22)]"
        style={{
          top: `${-5 + i * 17}%`,
          animation: `fall ${7 + i}s linear ${i * 0.7}s infinite`,
          filter: 'saturate(1.2)'
        }}
      />
    ))}
  </div>
);

const HeaderHero = ({ onConnect }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_80%_-10%,#CBB7FF30,transparent),linear-gradient(120deg,#CBB7FF10,#CFF7E010,#00000000)]">
      {/* Ambient glows and side coins (do not block pointer events) */}
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
          {/* Side coins layer */}
          <SideCoins />
        </div>

        {/* Bottom meta over the animation */}
        <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/70">Taxa mostrada aqui antes de conectar</p>
            <p className="text-white text-2xl md:text-3xl font-semibold">3.0% <span className="text-white/60 text-base align-middle">(máx 5%)</span></p>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-xs md:text-sm font-mono bg-white/5 px-2 py-1 rounded-lg border border-white/10">Moedas também caindo nas laterais</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
