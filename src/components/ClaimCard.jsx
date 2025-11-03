import React, { useState } from 'react';

export default function ClaimCard() {
  const [address, setAddress] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState(null);

  const simulate = async () => {
    setIsSimulating(true);
    setSimResult(null);
    await new Promise((r) => setTimeout(r, 900));
    setSimResult({ accounts: Math.max(1, Math.min(20, Math.floor(Math.random() * 12) + 3)), estSOL: (Math.random() * 1.2 + 0.1).toFixed(3) });
    setIsSimulating(false);
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md sm:p-6">
      <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }} />
      <div className="relative">
        <h2 className="text-lg font-semibold text-white">Claim panel</h2>
        <p className="mt-1 text-sm text-white/70">Paste a wallet or connect to preview claimable SOL.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Wallet address (simulated)"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white placeholder-white/40 outline-none ring-0 transition focus:border-[#CBB7FF]"
          />
          <button
            onClick={simulate}
            disabled={isSimulating}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#CBB7FF] to-[#14F195] px-4 py-2 text-sm font-semibold text-black shadow hover:opacity-95 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0"
          >
            {isSimulating ? 'Simulating…' : 'Simulate'}
          </button>
        </div>

        {simResult && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="text-xs text-white/50">Accounts</div>
              <div className="text-lg font-semibold text-white">{simResult.accounts}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="text-xs text-white/50">Estimated SOL</div>
              <div className="text-lg font-semibold text-white">{simResult.estSOL}</div>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
            Connect Wallet
          </button>
          <button className="inline-flex items-center justify-center rounded-xl bg-[#14F195] px-4 py-2 text-sm font-semibold text-black shadow hover:opacity-95 active:opacity-90">
            Claim SOL
          </button>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-[#CBB7FF] to-[#14F195]" />
          </div>
          <p className="mt-2 text-xs text-white/60">Simulation preview. Full flow available after connecting.</p>
        </div>
      </div>
    </div>
  );
}
