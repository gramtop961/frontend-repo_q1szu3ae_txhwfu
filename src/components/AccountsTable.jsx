import React from 'react';

const rows = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  address: `Gx${Math.random().toString(36).slice(2, 6)}...${Math.random().toString(36).slice(2, 8)}`,
  est: (Math.random() * 0.5 + 0.02).toFixed(3),
  status: Math.random() > 0.7 ? 'Claimed' : 'Pending',
}));

export default function AccountsTable() {
  return (
    <section id="accounts-table" className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">Accounts</h3>
          <p className="text-xs text-white/60">Preview of batch accounts and estimated amounts.</p>
        </div>
        <button className="rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15">Export CSV</button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-black/40">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-white/70">Address</th>
              <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-white/70">Est. SOL</th>
              <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-white/70">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-black/20">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-white/5">
                <td className="px-3 py-2 text-sm text-white/90 font-mono">{r.address}</td>
                <td className="px-3 py-2 text-right text-sm text-white">{r.est}</td>
                <td className="px-3 py-2 text-right text-sm">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.status === 'Claimed' ? 'bg-[#14F195]/20 text-[#14F195]' : 'bg-white/10 text-white/80'}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <details className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/80">
        <summary className="cursor-pointer select-none text-white">How batch claiming works</summary>
        <p className="mt-2 text-white/70">We gather claimable amounts across your selected accounts, run a simulation to estimate fees and success, then send a single consolidated transaction batch where possible.</p>
      </details>
    </section>
  );
}
