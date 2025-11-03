import React from 'react';
import HeaderHero from './components/HeaderHero';
import ClaimCard from './components/ClaimCard';
import RiskSidebar from './components/RiskSidebar';
import AccountsTable from './components/AccountsTable';

function App() {
  const handleConnect = () => {
    alert('Connect Wallet (mock)');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <HeaderHero onConnect={handleConnect} />

      {/* Elevate the claim panel to the very top over the hero */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-56 md:-mt-64 lg:-mt-72 space-y-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ClaimCard />
          </div>
          <div className="lg:col-span-1">
            <RiskSidebar onSimulate={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} />
          </div>
        </div>

        <AccountsTable />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur bg-[#0b0b0bcc] border-t border-white/10 p-3">
        <div className="mx-auto max-w-7xl px-2 flex items-center justify-between">
          <p className="text-xs text-white/70">Taxa: <span className="font-mono">3.0% (máx 5%)</span></p>
          <button className="rounded-xl bg-[#2E2E2E] text-white px-4 py-2 border border-white/10">CTA — Simular Claim</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
