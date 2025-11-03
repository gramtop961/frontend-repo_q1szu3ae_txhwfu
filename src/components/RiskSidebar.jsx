import React from 'react';

export default function RiskSidebar() {
  const items = [
    { title: 'Review program', desc: 'Verify the claiming program ID and authority.' },
    { title: 'Dry-run first', desc: 'Simulate the transaction before executing.' },
    { title: 'Check fees', desc: 'Network congestion can increase fees.' },
    { title: 'Hardware wallet', desc: 'Prefer a hardware wallet for high-value claims.' },
  ];

  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <h3 className="text-base font-semibold text-white">Risk checklist</h3>
      <ul className="mt-3 space-y-3">
        {items.map((it, idx) => (
          <li key={idx} className="rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[#14F195]"></span>
              <div>
                <div className="text-sm font-medium text-white">{it.title}</div>
                <div className="text-xs text-white/60">{it.desc}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const el = document.getElementById('accounts-table');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        className="mt-4 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
      >
        Review accounts
      </button>
    </aside>
  );
}
