import React from 'react';
import Spline from '@splinetool/react-spline';
import { ShieldCheck, Wallet } from 'lucide-react';

const HeaderHero = ({ onConnect }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_80%_-10%,#CBB7FF30,transparent),linear-gradient(120deg,#CBB7FF10,#CFF7E010,#00000000)]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#CBB7FF22] via-transparent to-[#CFF7E022] animate-[pulse_8s_ease-in-out_infinite] pointer-events-none" />
      </div>

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

      <div className="relative z-0 mx-auto max-w-7xl h-[340px] md:h-[440px] lg:h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b0b66] to-[#0b0b0bcc]" />
        <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/70">Taxa mostrada aqui antes de conectar</p>
            <p className="text-white text-2xl md:text-3xl font-semibold">3.0% <span className="text-white/60 text-base align-middle">(máx 5%)</span></p>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <img src="https://images.unsplash.com/photo-1619447019169-746572a5df47?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQaGFudG9tfGVufDB8MHx8fDE3NjIxNDAyMjh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Phantom" className="h-6 w-6 rounded" />
            <img src="https://images.unsplash.com/photo-1761762711662-00aa46a7b095?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTb2xmbGFyZXxlbnwwfDB8fHwxNzYyMTQwMjI4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Solflare" className="h-6 w-6" />
            <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/src/assets/brands/sollet.svg" alt="Sollet" className="h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
