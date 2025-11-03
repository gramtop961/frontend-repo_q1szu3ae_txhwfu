import React from 'react';
import HeaderHero from './components/HeaderHero.jsx';
import ClaimCard from './components/ClaimCard.jsx';
import RiskSidebar from './components/RiskSidebar.jsx';
import AccountsTable from './components/AccountsTable.jsx';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-white">
      <HeaderHero />

      <main className="relative z-10 -mt-20 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <ClaimCard />
            </div>
            <div className="md:col-span-1">
              <RiskSidebar />
            </div>
          </div>

          <div className="mt-6">
            <AccountsTable />
          </div>
        </div>
      </main>

      {/* Mobile fixed CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 block bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 md:hidden">
        <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
          <div>
            <div className="text-xs text-white/70">Ready to claim?</div>
            <div className="text-sm font-semibold">Connect your wallet</div>
          </div>
          <button className="rounded-xl bg-[#14F195] px-3 py-2 text-sm font-semibold text-black shadow">Connect</button>
        </div>
      </div>
    </div>
  );
}
